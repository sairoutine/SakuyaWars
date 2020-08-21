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
		this.core.scene_manager.setFadeOut(60, "white");

		// 次のシーンへ
		this.core.scene_manager.changeScene("battle");
	}
};

Scene.prototype.draw = function(){
	BaseScene.prototype.draw.apply(this, arguments);
	var ctx = this.core.ctx;

	ctx.save();
	ctx.fillStyle = "white";
	ctx.fillRect(0, 0, this.width, this.height);
	ctx.restore();

	ctx.save();
	ctx.fillStyle = "black";
	ctx.font = "25px 'MyFont'";
	ctx.textAlign = 'center';

	ctx.fillText("サクヤ大戦", this.width/2, this.height/2);
	ctx.fillText("Touch to Start!!", this.width/2, this.height/2 + 200);

	ctx.restore();

	/*
	var bg = this.core.image_loader.getImage("title");
	ctx.save();
	ctx.translate(this.width/2 - 250, this.height/2 + 100);
	ctx.drawImage(bg, -bg.width/2, -bg.height/2);
	ctx.restore();
	*/
};

module.exports = Scene;
