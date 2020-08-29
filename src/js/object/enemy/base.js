'use strict';

// 200x400 で、左半分を攻撃範囲として取っているので、描画位置をずらす
var RENDER_MARGIN = 100;

// 死亡を表示する期間
var DEAD_FRAME = 30;

// 攻撃を表示する期間
var ATTACK_FRAME = 30;

// 攻撃しない期間
var STOPPING_FRAME = 30;

var STATUS_WALKING = 0;
var STATUS_STOPPING = 1;
var STATUS_ATTACKING = 2;
var STATUS_DEAD = 3;

var CONSTANT = require('../../constant');
var BaseObject = require('../../hakurei').Object.Base;
var Util = require('../../hakurei').Util;

var EnemyBase = function(scene) {
	BaseObject.apply(this, arguments);

	this._status = STATUS_WALKING;

	this._remaining_dead_frame = 0;
	this._remaining_attacking_frame = 0;
	this._remaining_stopping_frame = 0;
};
Util.inherit(EnemyBase, BaseObject);

// HP
Util.defineProperty(EnemyBase, "hp");

EnemyBase.prototype.init = function(){
	BaseObject.prototype.init.apply(this, arguments);

	this._status = STATUS_WALKING;

	this._remaining_dead_frame = 0;
	this._remaining_attacking_frame = 0;
	this._remaining_stopping_frame = 0;

	this.hp(this.maxHP());
};

EnemyBase.prototype.update = function(){
	BaseObject.prototype.update.apply(this, arguments);

	// 時が止まってる最中は何も行動できない
	if(this.scene.isTimeStop()) {
		return;
	}

	// 死亡判定
	// 死亡判定は死亡中以外の全ステータス共通で行う
	if (!this.isDead() && this.hp() <= 0) {
		this._status = STATUS_DEAD;

		this.core.audio_loader.playSound("enemy_damage");

		this._remaining_dead_frame = DEAD_FRAME;
	}

	if (this.isWalking()) {
		// キャラが移動する
		this.x(this.x() - this.speed());

		// 自陣に到達したらゲームオーバー
		var fort = this.scene.fort;
		if (this.intersect(fort)) {
			this.scene.notifyGameover();
		}

		// 近くに敵がいれば攻撃する
		this._attackIfTargetIsNearby();
	}
	else if (this.isStopping()) {
		// 必ず停止しないといけない時間をへらす
		this._remaining_stopping_frame--;

		// 必ず停止しないといけない時間が終わったら
		if (this._remaining_stopping_frame <= 0) {
			// 近くに敵がいれば攻撃する
			var is_attacked = this._attackIfTargetIsNearby();

			if (!is_attacked) {
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
			// なにもしない
		}
	}
	else if (this.isDead()) {
		// 死亡中であれば、死亡アニメの表示時間をへらす
		this._remaining_dead_frame--;

		// 死亡アニメの表示時間も終了すれば、ゲームから除外する
		if (this._remaining_dead_frame <= 0) {
			this.scene.enemies.removeObject(this);

			return;
		}
	}
};

// 近くに攻撃対象がいれば攻撃する
EnemyBase.prototype._attackIfTargetIsNearby = function () {
	var self = this;
	// 近くに攻撃対象がいないか走査
	var target = null;
	this.scene.units.forEach(function(unit) {
		if(self.intersect(unit)) {
			target = unit;
		}
	});

	// 近くに攻撃対象がいればダメージを与える
	if (target) {
		var damage = self.damage();

		target.reduceHP(damage);
	}

	// 近くに攻撃対象がいれば攻撃モードへ変更
	if (target) {
		this._status = STATUS_ATTACKING;

		this.core.audio_loader.playSound("enemy_attack");

		this._remaining_attacking_frame = ATTACK_FRAME;
	}

	// 攻撃したかどうかを返す
	return target ? true : false;
};

EnemyBase.prototype.draw = function(){
	BaseObject.prototype.draw.apply(this, arguments);

	var ctx = this.core.ctx;

	// デバッグ用にHPを表示
	if (CONSTANT.DEBUG) {
		ctx.save();
		ctx.fillStyle = "red";
		ctx.textAlign = 'center';
		ctx.font = "12px 'MyFont'";
		ctx.fillText(this.hp() + ' / ' + this.maxHP(), this.x(), this.y() - 50);
		ctx.restore();
	}

	var image;
	if (this.isWalking() || this.isStopping()) { // 移動中と停止中に表示するものは同じ
		if (this.scene.isTimeStop()) {
			// 時間が止まっているときは、アニメも固定にする
			image = this.core.image_loader.getImage(this.walkImage1());
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
	else if (this.isDead()) {
		image = this.core.image_loader.getImage(this.deadImage());
	}
	else if (this.isAttacking()) {
		image = this.core.image_loader.getImage(this.attackImage());
	}
	else {
		// ここにはこないはず
		throw new Error("Illegal status.");
	}

	ctx.save();
	ctx.translate(this.x(), this.y());
	ctx.drawImage(image, -image.width/2 - RENDER_MARGIN, -image.height/2);
	ctx.restore();
};

EnemyBase.prototype.reduceHP = function(damage){
	this.hp(this.hp() - damage);
};

// 歩行中か否か
EnemyBase.prototype.isWalking = function(){
	return this._status === STATUS_WALKING;
};

// 待機中か否か
EnemyBase.prototype.isStopping = function(){
	return this._status === STATUS_STOPPING;
};

// 攻撃中か否か
EnemyBase.prototype.isAttacking = function(){
	return this._status === STATUS_ATTACKING;
};

// 死亡アニメを表示中か否か
EnemyBase.prototype.isDead = function() {
	return this._status === STATUS_DEAD;
};

EnemyBase.prototype.isCollision = function(obj) {
	return !this.isDead();
};

// 攻撃する時の画像
EnemyBase.prototype.attackImage = function(){
	throw new Error("attackImage method must be defined.");
};

// 死んだ時の画像
EnemyBase.prototype.deadImage = function(){
	throw new Error("deadImage method must be defined.");
};

// 歩くアニメの画像1
EnemyBase.prototype.walkImage1 = function(){
	throw new Error("walkImage1 method must be defined.");
};

// 歩くアニメの画像2
EnemyBase.prototype.walkImage2 = function(){
	throw new Error("walkImage2 method must be defined.");
};

// 最大HP
EnemyBase.prototype.maxHP = function(){
	throw new Error("maxHP method must be defined.");
};

// ダメージ力
EnemyBase.prototype.damage = function(){
	throw new Error("damage method must be defined.");
};

// 歩くスピード
EnemyBase.prototype.speed = function(){
	throw new Error("speed method must be defined.");
};

module.exports = EnemyBase;
