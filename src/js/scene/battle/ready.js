'use strict';

var BaseScene = require('./base');
var Util = require('../../hakurei').Util;

var SceneBattleReady = function(core) {
	BaseScene.apply(this, arguments);
};
Util.inherit(SceneBattleReady, BaseScene);

SceneBattleReady.prototype.init = function(){
	BaseScene.prototype.init.apply(this, arguments);

	// BGM再生
	if(!this.core.audio_loader.isPlayingBGM("battle")) {
		this.core.audio_loader.playBGM("battle");
	}
};


SceneBattleReady.prototype.update = function(){
	BaseScene.prototype.update.apply(this, arguments);

	if (this.frame_count > 240) {
		this.parent.changeSubScene("main");
	}
};

SceneBattleReady.prototype.draw = function(){
	BaseScene.prototype.draw.apply(this, arguments);

	var ctx = this.core.ctx;

	ctx.save();
	ctx.fillStyle = "black";
	ctx.font = "64px 'MyFont'";
	ctx.textAlign = 'center';

	if (60 >= this.frame_count && this.frame_count > 0) {
		ctx.fillText("3", this.width/2, this.height/2);
	}
	else if (120 >= this.frame_count && this.frame_count > 60) {
		ctx.fillText("2", this.width/2, this.height/2);
	}
	else if (180 >= this.frame_count && this.frame_count > 120) {
		ctx.fillText("1", this.width/2, this.height/2);
	}
	else if (240 >= this.frame_count && this.frame_count > 180) {
		ctx.fillText("Start !!", this.width/2, this.height/2);
	}

	ctx.restore();
};

module.exports = SceneBattleReady;
