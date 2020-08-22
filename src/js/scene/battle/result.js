
/*

体力1000あって、体力が残ってるほどスコアが高い。→減点法。
アークナイツだと、陣地に入った敵の数に応じてスコアが下がる。
→ 勝利までの時間が短いとボーナス。

ボム使わずにクリアするとボーナス。変なことするとボーナス。
めーさくだけのユニットで統一すると +1000点とか。

*/
'use strict';

var BaseScene = require('../../hakurei').Scene.Base;

var Util = require('../../hakurei').Util;

var Scene = function(core) {
	BaseScene.apply(this, arguments);
};
Util.inherit(Scene, BaseScene);

Scene.prototype.init = function(){
	BaseScene.prototype.init.apply(this, arguments);
};

Scene.prototype.update = function(){
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

Scene.prototype.draw = function(){
	BaseScene.prototype.draw.apply(this, arguments);
	var ctx = this.core.ctx;

	ctx.save();
	ctx.fillStyle = "black";
	ctx.font = "48px 'MyFont'";
	ctx.textAlign = 'center';

	ctx.fillText("ステージ クリア！", this.width/2, this.height/2);

	ctx.restore();
};

module.exports = Scene;
