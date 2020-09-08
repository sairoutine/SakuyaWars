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

var Collision = require('../collision');

var UnitBase = function(scene) {
	BaseObject.apply(this, arguments);

	this._attack_collision = new Collision(scene, this.attackCollisionWidth(), this.attackCollisionHeight());
	this._body_collision = new Collision(scene, this.bodyCollisionWidth(), this.bodyCollisionHeight());
	this.addSubObjects([this._attack_collision, this._body_collision]);

	this._status = this.isStandType() ? STATUS_STOPPING : STATUS_WALKING;

	this._remaining_dead_frame = 0;
	this._remaining_attacking_frame = 0;
	this._remaining_stopping_frame = 0;
};
Util.inherit(UnitBase, BaseObject);

// HP
Util.defineProperty(UnitBase, "hp");

UnitBase.prototype.init = function(){
	BaseObject.prototype.init.apply(this, arguments);

	this._status = this.isStandType() ? STATUS_STOPPING : STATUS_WALKING;

	this._remaining_dead_frame = 0;
	this._remaining_attacking_frame = 0;
	this._remaining_stopping_frame = 0;

	this.hp(this.maxHP());
};

UnitBase.prototype.update = function(){
	BaseObject.prototype.update.apply(this, arguments);

	// 死亡判定
	// 死亡判定は死亡中以外の全ステータス共通で行う
	if (!this.isDead() && this.hp() <= 0) {
		this._status = STATUS_DEAD;

		// ユニットが死亡したことをミッション管理へ通知
		this.scene.mission_manager.notifyUnitDied();

		this.core.audio_loader.playSound(this.deadSound());

		this._remaining_dead_frame = DEAD_FRAME;
	}

	if (this.isWalking()) {
		// 歩行しないタイプのユニットはここにこないはず
		if (this.isStandType()) {
			throw new Error("stand type unit can't walk");
		}

		// キャラが移動する
		this.x(this.x() + this.speed());

		// 近くに攻撃対象がいれば攻撃する
		this._attackIfTargetIsNearby();
	}
	else if (this.isStopping()) {
		// 必ず停止しないといけない時間をへらす
		this._remaining_stopping_frame--;

		// 必ず停止しないといけない時間が終わったら
		if (this._remaining_stopping_frame <= 0) {
			// 近くに攻撃対象がいれば攻撃する
			var is_attacked = this._attackIfTargetIsNearby();

			if (!is_attacked && !this.isStandType()) {
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
			this.scene.units.removeObject(this);

			return;
		}
	}
};

// 近くに攻撃対象がいれば攻撃する
UnitBase.prototype._attackIfTargetIsNearby = function () {
	var self = this;
	var target = null;

	// 近くにボスがいないか
	// NOTE: ボスと敵が同時に近くにいるときは、敵が優先して攻撃対象となる
	//       よって、ボス→敵の順番に走査する
	if (self.attackCollision().intersect(this.scene.boss)) {
		target = this.scene.boss;
	}

	// 近くに敵がいないか走査
	this.scene.enemies.forEach(function(enemy) {
		if(self.attackCollision().intersect(enemy)) {
			target = enemy;
		}
	});

	// 近くに攻撃対象がいればダメージを与える
	if (target) {
		// 近くに攻撃対象がいれば攻撃モードへ変更
		this._status = STATUS_ATTACKING;
		this._remaining_attacking_frame = ATTACK_FRAME;

		// ダメージを与える
		var damage = self.damage();
		target.reduceHP(damage);

		// 攻撃対象が死亡していたらミッション管理へ通知
		if (target.hp() <= 0) {
			this.scene.mission_manager.notifyEnemyKilled(this, target);
		}

		// 攻撃SE再生
		this.core.audio_loader.playSound(this.attackSound());
	}

	// 攻撃したかどうかを返す
	return target ? true : false;
};

UnitBase.prototype.draw = function(){
	BaseObject.prototype.draw.apply(this, arguments);

	var ctx = this.core.ctx;

	// デバッグ用にHPを表示
	if (this.core.debug_manager.get("is_show_hp")) {
		ctx.save();
		ctx.fillStyle = "blue";
		ctx.textAlign = 'center';
		ctx.font = "12px 'MyFont'";
		ctx.fillText(this.hp() + ' / ' + this.maxHP(), this.x(), this.y() - 100);
		ctx.restore();
	}

	var image;
	if (this.isWalking()) {
		if (((this.scene.frame_count / 20)|0) % 2 === 0) {
			image = this.core.image_loader.getImage(this.walkImage1());
		}
		else {
			image = this.core.image_loader.getImage(this.walkImage2());
		}
	}
	else if (this.isStopping()) {
		image = this.core.image_loader.getImage(this.stoppingImage());
	}
	else if (this.isDead()) {
		image = this.core.image_loader.getImage(this.deadImage());
	}
	else if (this.isAttacking()) {
		var attack_images = this.attackImages();

		if (attack_images.length === 0) {
			throw new Error("Specify attackImages.");
		}

		var percentage = (ATTACK_FRAME - this._remaining_attacking_frame) / ATTACK_FRAME;
		var i = ((percentage * attack_images.length)|0) % attack_images.length;
		image = this.core.image_loader.getImage(attack_images[i]);
	}
	else {
		// ここにはこないはず
		throw new Error("Illegal status.");
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

UnitBase.prototype.attackCollision = function(){
	return this._attack_collision;
};

UnitBase.prototype.bodyCollision = function(){
	return this._body_collision;
};

// 静的メソッド→動的メソッド
UnitBase.prototype.consumedP = function(){
	var Klass = this.constructor;
	return Klass.consumedP();
};

// 立ち画像
UnitBase.prototype.stoppingImage = function(){
	throw new Error("stoppingImage method must be defined.");
};

// 攻撃する時の画像 一覧
UnitBase.prototype.attackImages = function(){
	return [];
};

// 死んだ時の画像
UnitBase.prototype.deadImage = function(){
	throw new Error("deadImage method must be defined.");
};

// 歩くアニメの画像1(歩行しないタイプの場合は指定しないこと)
UnitBase.prototype.walkImage1 = function(){
	return "";
};

// 歩くアニメの画像2(歩行しないタイプの場合は指定しないこと)
UnitBase.prototype.walkImage2 = function(){
	return "";
};

// 敵にダメージを与えたときのエフェクト
UnitBase.prototype.attackEffect = function(){
	return "effect_hit";
};

// ユニット生成 ボタン画像
UnitBase.buttonImage = function(){
	throw new Error("buttonImage method must be defined.");
};

// 死亡時の音
UnitBase.prototype.deadSound = function(){
	return "unit_default_damage";
};

// 攻撃時の音
UnitBase.prototype.attackSound = function(){
	return "unit_default_attack2";
};

// ユニットの種類
UnitBase.prototype.type = function(){
	throw new Error("type method must be defined.");
};

// 攻撃の当たり判定
UnitBase.prototype.attackCollisionWidth = function(){
	throw new Error("attackCollisionWidth method must be defined.");
};
UnitBase.prototype.attackCollisionHeight = function(){
	throw new Error("attackCollisionHeight method must be defined.");
};

// 本体の当たり判定
UnitBase.prototype.bodyCollisionWidth = function(){
	throw new Error("bodyCollisionWidth method must be defined.");
};
UnitBase.prototype.bodyCollisionHeight = function(){
	throw new Error("bodyCollisionHeight method must be defined.");
};

// 最大HP
UnitBase.prototype.maxHP = function(){
	throw new Error("maxHP method must be defined.");
};

// ダメージ力
UnitBase.prototype.damage = function(){
	throw new Error("damage method must be defined.");
};

// 歩くスピード
UnitBase.prototype.speed = function(){
	throw new Error("speed method must be defined.");
};

// ユニット生成に必要なPの数
UnitBase.consumedP = function() {
	throw new Error("consumedP method must be defined.");
};

module.exports = UnitBase;
