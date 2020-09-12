'use strict';

var BaseObject = require('./base');
var Util = require('../../hakurei').Util;
var CONSTANT = require('../../constant');

var SakuyaMeisaku = function(scene) {
	BaseObject.apply(this, arguments);
};
Util.inherit(SakuyaMeisaku, BaseObject);

SakuyaMeisaku.prototype.init = function(){
	BaseObject.prototype.init.apply(this, arguments);
};

SakuyaMeisaku.prototype.update = function(){
	BaseObject.prototype.update.apply(this, arguments);
};

SakuyaMeisaku.prototype.draw = function(){
	BaseObject.prototype.draw.apply(this, arguments);
};

// 立ち画像
SakuyaMeisaku.prototype.stoppingImage = function(){
	return "unit_meisaku_stand";
};

// 攻撃する時の画像 一覧
SakuyaMeisaku.prototype.attackImages = function(){
	return ["unit_meisaku_attack1", "unit_meisaku_attack2", "unit_meisaku_attack3"];
};

// 死んだ時の画像
SakuyaMeisaku.prototype.deadImage = function(){
	return "unit_meisaku_damage";
};

// 敵にダメージを与えたときのエフェクト
SakuyaMeisaku.prototype.attackEffect = function(){
	return "effect_hit";
};

// ユニット生成 ボタン画像
SakuyaMeisaku.buttonImage = function(){
	return "btn_icon_sakuya_meisaku";
};

SakuyaMeisaku.prototype.deadSound = function(){
	return "unit_meisaku_damage";
};

// 攻撃の当たり判定
SakuyaMeisaku.prototype.attackCollisionWidth = function(){
	return 200;
};
SakuyaMeisaku.prototype.attackCollisionHeight = function(){
	return 200;
};

// 本体の当たり判定
SakuyaMeisaku.prototype.bodyCollisionWidth = function(){
	return 100;
};
SakuyaMeisaku.prototype.bodyCollisionHeight = function(){
	return 200;
};

// ユニットの種類
SakuyaMeisaku.prototype.type = function(){
	return CONSTANT.UNIT_TYPE_MEISAKU;
};

// ユニット生成に必要なPの数
SakuyaMeisaku.consumedP = function(){
	return 60;
};

// 最大HP
SakuyaMeisaku.prototype.maxHP = function(){
	return 100;
};


// ダメージ力
SakuyaMeisaku.prototype.damage = function(){
	return 300;
};

// 歩くスピード
SakuyaMeisaku.prototype.speed = function(){
	return 0.0;
};

module.exports = SakuyaMeisaku;
