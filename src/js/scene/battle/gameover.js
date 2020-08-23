'use strict';

var BaseScene = require('./base');
var Util = require('../../hakurei').Util;

var SceneBattleReady = function(core) {
	BaseScene.apply(this, arguments);

	this._t = 0;
};
Util.inherit(SceneBattleReady, BaseScene);

SceneBattleReady.prototype.init = function(){
	BaseScene.prototype.init.apply(this, arguments);

	this._t = 0;

	this.core.audio_loader.stopBGM();

	this.core.audio_loader.playSound("gameover01");
};


SceneBattleReady.prototype.update = function(){
	BaseScene.prototype.update.apply(this, arguments);

	// GameOver 画像の透過を減らす
	if (this.frame_count > 60 && this._t <= 1) {
		this._t += 0.005;
	}

	if (this.core.input_manager.isLeftClickPush()) {
		this.parent.restart();
	}
};

SceneBattleReady.prototype.draw = function(){
	BaseScene.prototype.draw.apply(this, arguments);

	var ctx = this.core.ctx;

	// 爆発
	var bg_image = this.core.image_loader.getImage("explosion");
	ctx.save();
	ctx.translate(this.width/2, this.height/2);
	ctx.drawImage(bg_image, -bg_image.width/2, -bg_image.height/2);
	ctx.restore();

	// Gameover
	var bg_image = this.core.image_loader.getImage("gameover");
	ctx.save();
	ctx.globalAlpha = this._t;
	ctx.translate(this.width/2, this.height/2);
	ctx.drawImage(bg_image, -bg_image.width/2, -bg_image.height/2);
	ctx.restore();
};

module.exports = SceneBattleReady;
