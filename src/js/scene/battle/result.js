'use strict';

var BaseScene = require('../../hakurei').Scene.Base;

var Util = require('../../hakurei').Util;

var SceneBattleResult = function(core) {
	BaseScene.apply(this, arguments);
};
Util.inherit(SceneBattleResult, BaseScene);

SceneBattleResult.prototype.init = function(){
	BaseScene.prototype.init.apply(this, arguments);
};

SceneBattleResult.prototype.update = function(){
	BaseScene.prototype.update.apply(this, arguments);

	if (this.core.input_manager.isLeftClickPush()) {
		if (this.parent.hasNextStage()) {
			this.parent.changeNextStage();
		}
		else {
			this.core.scene_manager.changeScene("scenario_end");
		}
	}
};

SceneBattleResult.prototype.draw = function(){
	BaseScene.prototype.draw.apply(this, arguments);
	var ctx = this.core.ctx;

	ctx.save();
	ctx.fillStyle = "black";
	ctx.font = "48px 'MyFont'";
	ctx.textAlign = 'center';

	ctx.fillText("ステージ クリア！", this.width/2, this.height/2);

	ctx.restore();
};

module.exports = SceneBattleResult;
