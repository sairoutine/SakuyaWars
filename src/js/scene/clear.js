'use strict';

var Util = require('../hakurei').Util;
var BaseScene = require('../hakurei').Scene.Base;

var SceneClearMain = require('./clear/main');
var SceneClearAtsumaruShareDialog = require('./clear/atsumaru_share_dialog');

var SceneClear = function(core) {
	BaseScene.apply(this, arguments);

	// サブシーン
	this.addSubScene("main", new SceneClearMain(core));
	this.addSubScene("atsumaru_share_dialog", new SceneClearAtsumaruShareDialog(core));

	// スコア
	this._score = 0;
};
Util.inherit(SceneClear, BaseScene);

SceneClear.prototype.init = function(score){
	BaseScene.prototype.init.apply(this, arguments);

	this.core.scene_manager.setFadeIn(60, "black");

	this.core.audio_loader.stopBGM();

	// スコア
	this._score = score || 0;

	// サブシーン遷移
	this.changeSubScene("main");
};


SceneClear.prototype.update = function(){
	BaseScene.prototype.update.apply(this, arguments);
};

SceneClear.prototype.draw = function(){
	var ctx = this.core.ctx;

	// Game Clear 画像
	var bg_image = this.core.image_loader.getImage("gameover");
	ctx.save();
	ctx.translate(this.width/2, this.height/2);
	ctx.drawImage(bg_image, -bg_image.width/2, -bg_image.height/2);
	ctx.restore();

	BaseScene.prototype.draw.apply(this, arguments);
};

// クリア画面を終えて、次のシーンへ
SceneClear.prototype.exit = function(){
	this.core.scene_manager.setFadeOut(60, "black");
	this.core.scene_manager.changeScene("title");
};

module.exports = SceneClear;
