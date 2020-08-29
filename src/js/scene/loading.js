'use strict';

var BaseScene = require('../hakurei').Scene.Loading;
var CONSTANT = require('../constant');

var Util = require('../hakurei').Util;

var SceneLoading = function(core) {
	BaseScene.apply(this, arguments);

};
Util.inherit(SceneLoading, BaseScene);

SceneLoading.prototype.init = function(){
	BaseScene.prototype.init.apply(this, arguments);
};

SceneLoading.prototype._loadSounds = function(sounds) {
	var ext = Util.canPlayOgg() ? ".ogg" : ".m4a";

	for (var key2 in sounds) {
		var conf2 = sounds[key2];

		// デバッグ用ミュート
		var volume2 = CONSTANT.DEBUG_MUTE ? 0 : conf2.volume;

		this.core.audio_loader.loadSound(key2, conf2.path + ext, volume2);
	}
};

SceneLoading.prototype._loadBGMs = function(bgms) {
	var ext = Util.canPlayOgg() ? ".ogg" : ".m4a";

	for (var key3 in bgms) {
		var conf3 = bgms[key3];

		// デバッグ用ミュート
		var volume = CONSTANT.DEBUG_MUTE ? 0 : conf3.volume;

		this.core.audio_loader.loadBGM(key3, conf3.path + ext, volume, conf3.loopStart, conf3.loopEnd);
	}
};

SceneLoading.prototype.draw = function(){
	BaseScene.prototype.draw.apply(this, arguments);
	var ctx = this.core.ctx;

	// 背景
	ctx.save();
	ctx.fillStyle = "black";
	ctx.fillRect(0, 0, this.width, this.height);
	ctx.restore();


	this._drawLoading();
};

SceneLoading.prototype._drawLoading = function(){
	var ctx = this.core.ctx;

	var per_frame = this.frame_count % 60;
	var DOT_SPAN = 15;

	var dot = "";
	if (DOT_SPAN > per_frame && per_frame >= 0) {
		dot = "";
	}
	else if (DOT_SPAN*2 > per_frame && per_frame >= DOT_SPAN*1) {
		dot = ".";
	}
	else if (DOT_SPAN*3 > per_frame && per_frame >= DOT_SPAN*2) {
		dot = "..";
	}
	else {
		dot = "...";
	}

	// Loading メッセージ
	ctx.save();
	ctx.fillStyle = "white";
	ctx.textAlign = 'left';
	ctx.font = "30px 'MyFont'";
	ctx.fillText('Now Loading' + dot, this.core.width - 250, this.core.height - 50);
	ctx.restore();

	// プログレスバー
	ctx.save();
	ctx.fillStyle = "white";
	ctx.fillRect(0, this.core.height - 20, this.core.width * this.progress(), 50);
	ctx.restore();
};


module.exports = SceneLoading;
