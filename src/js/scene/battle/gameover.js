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
		this.core.scene_manager.changeScene("title");
	}
};

SceneBattleReady.prototype.draw = function(){
	BaseScene.prototype.draw.apply(this, arguments);

	var ctx = this.core.ctx;

	ctx.save();
	ctx.fillStyle = "black";
	ctx.font = "25px 'MyFont'";
	ctx.textAlign = 'center';

	ctx.fillText("ゲームオーバー！", this.width/2, this.height/2);

	ctx.restore();
};

module.exports = SceneBattleReady;
