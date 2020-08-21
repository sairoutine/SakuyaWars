
/*
近距離攻撃 咲夜さん
遠距離攻撃 咲夜さん
紅茶を入れる咲夜さん
重火器を使う咲夜さん
メーリン(定期的にクリックしないと攻撃しないやつ)
→ メーリンを起こす咲夜(めーさく)
ジョジョみたいに戦う咲夜さん
もっぷを持って往復する咲夜さん
まんどらごらを引き抜いて範囲攻撃するやつ
→ この辺は1mapに1体。
MMDの咲夜さん

めーさくとさくめいで能力が違うとか。
*/
'use strict';

var BaseObject = require('../../hakurei').Object.Base;
var Util = require('../../hakurei').Util;

var Base = function(scene) {
	BaseObject.apply(this, arguments);
};
Util.inherit(Base, BaseObject);

Base.prototype.init = function(){
	BaseObject.prototype.init.apply(this, arguments);
};

Base.prototype.update = function(){
	BaseObject.prototype.update.apply(this, arguments);

	// TODO: 画面端で止まるようにする
	// キャラが移動する
	this.x(this.x() + this.speed());
};

Base.prototype.draw = function(){
	BaseObject.prototype.draw.apply(this, arguments);
};

// 歩くスピード
Base.prototype.speed = function(){
	return 0;
};

// ユニット生成に必要なPの数
Base.prototype.consumedP = function(){
	return 0;
};

module.exports = Base;
