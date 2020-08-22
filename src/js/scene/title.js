'use strict';

var BaseScene = require('../hakurei').Scene.Base;

var Util = require('../hakurei').Util;

var Scene = function(core) {
	BaseScene.apply(this, arguments);
};
Util.inherit(Scene, BaseScene);

Scene.prototype.init = function(){
	BaseScene.prototype.init.apply(this, arguments);
	this.core.scene_manager.setFadeIn(60, "white");
};

Scene.prototype.update = function(){
	BaseScene.prototype.update.apply(this, arguments);

	if (this.core.input_manager.isLeftClickPush()) {
		// フェードアウトする
		//this.core.scene_manager.setFadeOut(60, "white");

		// 次のシーンへ
		this.core.scene_manager.changeScene("scenario_start");
	}
};

Scene.prototype.draw = function(){
	BaseScene.prototype.draw.apply(this, arguments);
	var ctx = this.core.ctx;

	// 背景
	var title = this.core.image_loader.getImage("title");
	ctx.save();
	ctx.translate(this.width/2, this.height/2);
	ctx.drawImage(title, -title.width/2, -title.height/2);
	ctx.restore();

	ctx.save();
	ctx.fillStyle = 'rgb( 0, 0, 0 )';
	ctx.globalAlpha = 0.8;
	ctx.translate(this.width/2, this.height/2);
	ctx.fillRect(
		-this.width/2,
		-this.height/2,
		this.width,
		this.height
	);
	ctx.restore();

	// Touch to Start
	ctx.save();
	ctx.fillStyle = "white";
	ctx.font = "25px 'MyFont'";
	ctx.textAlign = 'center';

	ctx.fillText("Touch to Start!!", this.width/2, this.height/2 + 200);

	ctx.restore();

	// タイトルロゴ
	var logo = this.core.image_loader.getImage("logo");
	ctx.save();
	ctx.translate(408, 312);
	ctx.drawImage(logo, -logo.width/2, -logo.height/2);
	ctx.restore();
};

module.exports = Scene;
