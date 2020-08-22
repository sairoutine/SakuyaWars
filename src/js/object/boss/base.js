'use strict';
var BaseObject = require('../../hakurei').Object.Base;
var Util = require('../../hakurei').Util;

var OFFSET_Y_MAX = 8;
var OFFSET_Y_SPAN = 6;

var Base = function(scene) {
	BaseObject.apply(this, arguments);

	// 妖精なので上下に少し動いて浮遊する
	this._offset_y = 0;
	this._is_reverse = false;
};
Util.inherit(Base, BaseObject);

// HP
Util.defineProperty(Base, "hp");

Base.prototype.init = function(){
	BaseObject.prototype.init.apply(this, arguments);

	// 妖精なので上下に少し動いて浮遊する
	this._offset_y = 0;
	this._is_reverse = false;

	this.hp(this.maxHP());
};

Base.prototype.update = function(){
	BaseObject.prototype.update.apply(this, arguments);

	// 時が止まってる最中は何も行動できない
	if(this.scene.isTimeStop()) {
		return;
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

Base.prototype.draw = function(){
	BaseObject.prototype.draw.apply(this, arguments);
	var ctx = this.core.ctx;

	var image = this.core.image_loader.getImage(this.normalImage());
	ctx.save();
	ctx.translate(this.x(), this.y() + this._offset_y);
	ctx.drawImage(image, -image.width/2, -image.height/2);
	ctx.restore();

};

// 攻撃
Base.prototype.attack = function(unit){
	var damage = this.damage();

	unit.hp(unit.hp() - damage);

	if (unit.hp() <= 0) {
		// 死亡
		unit.die();
	}
};

// 死亡
Base.prototype.die = function(){
	this.scene.notifyStageClear();
};

// 最大HP
Base.prototype.maxHP = function(){
	return 0;
};

// ダメージ力
Base.prototype.damage = function(){
	return 0;
};

// 通常時の画像
Base.prototype.normalImage = function(){
	return "";
};

module.exports = Base;
