'use strict';

var Util = require('../hakurei').Util;
var BaseScene = require('../hakurei').Scene.Base;

var SceneOmake = function(core) {
	BaseScene.apply(this, arguments);
};
Util.inherit(SceneOmake, BaseScene);

SceneOmake.prototype.init = function(score){
	BaseScene.prototype.init.apply(this, arguments);

	this.core.scene_manager.setFadeIn(60, "black");
	this.core.scene_manager.setFadeOut(60, "black");
};


SceneOmake.prototype.update = function() {
	BaseScene.prototype.update.apply(this, arguments);

	if (this.core.input_manager.isLeftClickPush()) {
		this.core.scene_manager.changeScene("title");
	}
};

SceneOmake.prototype.draw = function() {
	var ctx = this.core.ctx;

	// おまけ 画像
	var bg_image = this.core.image_loader.getImage("gameclear2");
	ctx.save();
	ctx.translate(this.width/2, this.height/2);
	ctx.drawImage(bg_image, -bg_image.width/2, -bg_image.height/2);
	ctx.restore();

	// テキスト表示
	ctx.save();
	ctx.font = "16px 'MyFont'";
	ctx.textAlign = "left";
	ctx.textBaseline = "middle";

	ctx.fillStyle = "white"; Util.hexToRGBString("#141e46");
	ctx.fillText("咲夜さんが11体いるぞ。探してみよう！", 10, 10);

	ctx.restore();

	BaseScene.prototype.draw.apply(this, arguments);
};

module.exports = SceneOmake;
