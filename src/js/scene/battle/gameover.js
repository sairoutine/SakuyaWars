'use strict';

var BaseScene = require('./base');
var Util = require('../../hakurei').Util;

var SceneBattleReady = function(core) {
	BaseScene.apply(this, arguments);
};
Util.inherit(SceneBattleReady, BaseScene);

SceneBattleReady.prototype.init = function(){
	BaseScene.prototype.init.apply(this, arguments);
};


SceneBattleReady.prototype.update = function(){
	BaseScene.prototype.update.apply(this, arguments);

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


	ctx.save();
	ctx.textAlign = 'center';

	ctx.fillStyle = "black";
	ctx.font = "48px 'MyFont'";
	ctx.fillText("ゲームオーバー！", this.width/2, this.height/2);

	ctx.fillStyle = "black";
	ctx.font = "24px 'MyFont'";
	ctx.fillText("リトライする？", this.width/2, this.height/2 + 100);

	ctx.restore();
};

module.exports = SceneBattleReady;
