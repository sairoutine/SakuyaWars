'use strict';
// 200x400 で、左半分を攻撃範囲として取っているので、描画位置をずらす
var RENDER_MARGIN = 100;

// 死亡を表示する期間
var DEAD_FRAME = 30;

// 攻撃を表示する期間
var ATTACK_FRAME = 30;

// 攻撃しない期間
var STOPPING_FRAME = 30;

// 状態一覧
var STATUS_WALKING = 0;
var STATUS_STOPPING = 1;
var STATUS_ATTACKING = 2;
var STATUS_DEAD = 3;

var BaseObject = require('../../hakurei').Object.Base;
var Util = require('../../hakurei').Util;

var UnitBase = function(scene) {
	BaseObject.apply(this, arguments);

	this._status = STATUS_WALKING;

	this._remaining_dead_frame = 0;
	this._remaining_attacking_frame = 0;
	this._remaining_stopping_frame = 0;
};
Util.inherit(UnitBase, BaseObject);

// HP
Util.defineProperty(UnitBase, "hp");

UnitBase.prototype.init = function(){
	BaseObject.prototype.init.apply(this, arguments);

	this._status = STATUS_WALKING;

	this._remaining_dead_frame = 0;
	this._remaining_attacking_frame = 0;
	this._remaining_stopping_frame = 0;

	this.hp(this.maxHP());
};

UnitBase.prototype.update = function(){
	BaseObject.prototype.update.apply(this, arguments);

	var self = this;

	var is_any_unit_near_here;

	// 死亡判定
	// 死亡判定は死亡中以外の全ステータス共通で行う
	if (!this.isDead() && this.hp() <= 0) {
		this._status = STATUS_DEAD;

		this.core.audio_loader.playSound(this.deadSound());

		this._remaining_dead_frame = DEAD_FRAME;
	}

	if (this.isWalking()) {
		if (!this.isStandType()) {
			// キャラが移動する
			// TODO: 画面端で止まるようにする
			this.x(this.x() + this.speed());
		}

		// 近くに敵がいないか走査
		is_any_unit_near_here = false;
		this.scene.enemies.forEach(function(enemy) {
			if(self.intersect(enemy)) {
				is_any_unit_near_here = true;
			}
		});
		// ボスがいないか
		if (self.intersect(this.scene.boss)) {
			is_any_unit_near_here = true;
		}

		// 近くに敵がいれば攻撃モードへ
		if (is_any_unit_near_here) {
			this._status = STATUS_ATTACKING;

			this.core.audio_loader.playSound(this.attackSound());

			this._remaining_attacking_frame = ATTACK_FRAME;
		}
	}
	else if (this.isStopping()) {
		// 必ず停止しないといけない時間をへらす
		this._remaining_stopping_frame--;

		// 必ず停止しないといけない時間が終わったら
		if (this._remaining_stopping_frame <= 0) {
			// 近くに敵がいないか走査
			is_any_unit_near_here = false;
			this.scene.enemies.forEach(function(enemy) {
				if(self.intersect(enemy)) {
					is_any_unit_near_here = true;
				}
			});
			// ボスがいないか
			if (self.intersect(this.scene.boss)) {
				is_any_unit_near_here = true;
			}

			if (is_any_unit_near_here) {
				// 近くに敵がいれば攻撃モードへ
				this._status = STATUS_ATTACKING;

				this.core.audio_loader.playSound(this.attackSound());

				this._remaining_attacking_frame = ATTACK_FRAME;
			}
			else {
				// 近くに敵がいなければ歩行開始
				this._status = STATUS_WALKING;
			}
		}
	}
	else if (this.isAttacking()) {
		// 攻撃中であれば、攻撃時間をへらす
		this._remaining_attacking_frame--;

		// 攻撃時間がなくなれば少し攻撃せず待機
		if (this._remaining_attacking_frame <= 0) {
			this._status = STATUS_STOPPING;

			this._remaining_stopping_frame = STOPPING_FRAME;
		}
		else { // 攻撃時間がまだあれば
			var target_enemy;

			// 近くにいるボスにダメージを与える
			var boss = this.scene.boss;
			if (self.intersect(boss)) {
				target_enemy = boss;
			}

			// 近くにいるユニットにダメージを与える
			this.scene.enemies.forEach(function(enemy) {
				if(self.intersect(enemy)) {
					target_enemy = enemy;
				}
			});

			if (target_enemy) {
				var damage = self.damage();

				target_enemy.reduceHP(damage);
			}


		}
	}
	else if (this.isDead()) {
		// 死亡中であれば、死亡アニメの表示時間をへらす
		this._remaining_dead_frame--;

		// 死亡アニメの表示時間も終了すれば、ゲームから除外する
		if (this._remaining_dead_frame <= 0) {
			this.scene.units.removeObject(this);

			return;
		}
	}
};

UnitBase.prototype.draw = function(){
	BaseObject.prototype.draw.apply(this, arguments);

	var ctx = this.core.ctx;

	var image, t;
	if (this.isWalking()) {
		if (this.isStandType()) {
			// 攻撃画像が3枚ある場合
			if (this.attackImage1() && this.attackImage2() && this.attackImage3()) {
				t = ((this.scene.frame_count / 20)|0) % 3;
				if (t === 0) {
					image = this.core.image_loader.getImage(this.attackImage1());
				}
				else if (t === 1) {
					image = this.core.image_loader.getImage(this.attackImage2());
				}
				else {
					image = this.core.image_loader.getImage(this.attackImage3());
				}
			}
			// 攻撃画像が2枚ある場合
			else if (this.attackImage1() && this.attackImage2()) {
				if (((this.scene.frame_count / 20)|0) % 2 === 0) {
					image = this.core.image_loader.getImage(this.attackImage1());
				}
				else {
					image = this.core.image_loader.getImage(this.attackImage2());
				}
			}
			// 攻撃画像が1枚ある場合
			else if (this.attackImage1()) {
				image = this.core.image_loader.getImage(this.attackImage1());
			}
			else {
				// ここにはこないはず
			}
		}
		else {
			if (((this.scene.frame_count / 20)|0) % 2 === 0) {
				image = this.core.image_loader.getImage(this.walkImage1());
			}
			else {
				image = this.core.image_loader.getImage(this.walkImage2());
			}
		}
	}
	else if (this.isStopping()) {
		image = this.core.image_loader.getImage(this.stoppingImage());
	}
	else if (this.isDead()) {
		image = this.core.image_loader.getImage(this.deadImage());
	}
	else if (this.isAttacking()) {
		// 攻撃画像が3枚ある場合
		if (this.attackImage1() && this.attackImage2() && this.attackImage3()) {
			t = ((this.scene.frame_count / 20)|0) % 3;
			if (t === 0) {
				image = this.core.image_loader.getImage(this.attackImage1());
			}
			else if (t === 1) {
				image = this.core.image_loader.getImage(this.attackImage2());
			}
			else {
				image = this.core.image_loader.getImage(this.attackImage3());
			}
		}
		// 攻撃画像が2枚ある場合
		else if (this.attackImage1() && this.attackImage2()) {
			if (((this.scene.frame_count / 20)|0) % 2 === 0) {
				image = this.core.image_loader.getImage(this.attackImage1());
			}
			else {
				image = this.core.image_loader.getImage(this.attackImage2());
			}
		}
		// 攻撃画像が1枚ある場合
		else if (this.attackImage1()) {
			image = this.core.image_loader.getImage(this.attackImage1());
		}
		else {
			// ここにはこないはず
		}
	}
	else {
		// ここにはこないはず
	}

	ctx.save();
	ctx.translate(this.x(), this.y());
	ctx.drawImage(image, -image.width/2 + RENDER_MARGIN, -image.height/2);
	ctx.restore();
};

UnitBase.prototype.reduceHP = function(damage){
	this.hp(this.hp() - damage);
};

// 歩行しないタイプか否か
UnitBase.prototype.isStandType = function(){
	return !this.walkImage1() && !this.walkImage2();
};

// 歩行中か否か
UnitBase.prototype.isWalking = function(){
	return this._status === STATUS_WALKING;
};

// 待機中か否か
UnitBase.prototype.isStopping = function(){
	return this._status === STATUS_STOPPING;
};

// 攻撃中か否か
UnitBase.prototype.isAttacking = function(){
	return this._status === STATUS_ATTACKING;
};

// 死亡アニメを表示中か否か
UnitBase.prototype.isDead = function() {
	return this._status === STATUS_DEAD;
};

UnitBase.prototype.isCollision = function(obj) {
	return !this.isDead();
};

// 立ち画像
UnitBase.prototype.stoppingImage = function(){
	return "";
};

// 攻撃する時の画像1
UnitBase.prototype.attackImage1 = function(){
	return "";
};

// 攻撃する時の画像2
UnitBase.prototype.attackImage2 = function(){
	return "";
};

// 攻撃する時の画像3
UnitBase.prototype.attackImage3 = function(){
	return "";
};

// 死んだ時の画像
UnitBase.prototype.deadImage = function(){
	return "";
};

// 歩くアニメの画像1
UnitBase.prototype.walkImage1 = function(){
	return "";
};

// 歩くアニメの画像2
UnitBase.prototype.walkImage2 = function(){
	return "";
};


UnitBase.prototype.deadSound = function(){
	return "unit_default_damage";
};

UnitBase.prototype.attackSound = function(){
	return "unit_default_attack2";
};


// 最大HP
UnitBase.prototype.maxHP = function(){
	return 100;
};

// ダメージ力
UnitBase.prototype.damage = function(){
	return 1;
};

// 歩くスピード
UnitBase.prototype.speed = function(){
	return 0;
};

// ユニット生成に必要なPの数
UnitBase.prototype.consumedP = function(){
	return 0;
};


module.exports = UnitBase;
