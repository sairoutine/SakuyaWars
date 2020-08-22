'use strict';
var BaseObject = require('../../hakurei').Object.Base;
var Util = require('../../hakurei').Util;

var OFFSET_Y_MAX = 8;
var OFFSET_Y_SPAN = 6;

// ダメージを受けたときに仰け反る場合の区間
var DAMAGE_SHOWING_TIME = 10;

var BossBase = function(scene) {
	BaseObject.apply(this, arguments);

	// 妖精なので上下に少し動いて浮遊する
	this._offset_y = 0;
	this._is_reverse = false;

	// ダメージを受けたときの画像を表示している残り時間
	this._damage_showing_time = 0;
};
Util.inherit(BossBase, BaseObject);

// HP
Util.defineProperty(BossBase, "hp");

BossBase.prototype.init = function(){
	BaseObject.prototype.init.apply(this, arguments);

	// 妖精なので上下に少し動いて浮遊する
	this._offset_y = 0;
	this._is_reverse = false;

	// ダメージを受けたときの画像を表示している残り時間
	this._damage_showing_time = 0;

	this.hp(this.maxHP());
};

BossBase.prototype.update = function(){
	BaseObject.prototype.update.apply(this, arguments);

	// 時が止まってる最中は何も行動できない
	if(this.scene.isTimeStop()) {
		return;
	}

	// ダメージを受けたときの画像を表示している残り時間をへらす
	if (this._damage_showing_time > 0) {
		this._damage_showing_time--;
	}

	// 妖精なので上下に少し動いて浮遊する
	if (this.frame_count % OFFSET_Y_SPAN === 0) {
		if (this._is_reverse) {
			this._offset_y--;

			if (this._offset_y <= 0) {
				this._is_reverse = !this._is_reverse;
			}
		}
		else {
			this._offset_y++;

			if (this._offset_y >= OFFSET_Y_MAX) {
				this._is_reverse = !this._is_reverse;
			}
		}
	}

	// ユニットへ攻撃
	var boss = this;
	this.scene.units.forEach(function(unit) {
		if(boss.intersect(unit)) {

			// 攻撃する
			boss.attack(unit);
		}
	});

};

BossBase.prototype.draw = function(){
	BaseObject.prototype.draw.apply(this, arguments);
	var ctx = this.core.ctx;

	var image;
	if (this._damage_showing_time > 0) {
		// ダメージを受けている時の画像
		image = this.core.image_loader.getImage(this.damageImage());
	}
	else {
		// 通常時の画像
		image = this.core.image_loader.getImage(this.normalImage());
	}

	ctx.save();
	ctx.translate(this.x(), this.y() + this._offset_y);
	ctx.drawImage(image, -image.width/2, -image.height/2);
	ctx.restore();

};

// 攻撃
BossBase.prototype.attack = function(unit){
	var damage = this.damage();

	unit.hp(unit.hp() - damage);

	// ダメージを受けた
	unit.onDamaged();

	if (unit.hp() <= 0) {
		// 死亡
		unit.die();
	}
};

// ダメージを受けたときの処理
BossBase.prototype.onDamaged = function(){
	if (this._damage_showing_time <= 0) {
		this._damage_showing_time = DAMAGE_SHOWING_TIME;
	}
};

// 死亡
BossBase.prototype.die = function(){
	this.scene.notifyStageClear();
};

// 最大HP
BossBase.prototype.maxHP = function(){
	return 0;
};

// ダメージ力
BossBase.prototype.damage = function(){
	return 0;
};

// 通常時の画像
BossBase.prototype.normalImage = function(){
	return "";
};

// ダメージを受けた時の画像
BossBase.prototype.damageImage = function(){
	return "";
};


module.exports = BossBase;
