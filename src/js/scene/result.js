

/*

体力1000あって、体力が残ってるほどスコアが高い。→減点法。
アークナイツだと、陣地に入った敵の数に応じてスコアが下がる。
→ 勝利までの時間が短いとボーナス。

ボム使わずにクリアするとボーナス。変なことするとボーナス。
めーさくだけのユニットで統一すると +1000点とか。

*/
'use strict';

var BaseScene = require('../hakurei').Scene.Base;

var Util = require('../hakurei').Util;

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
		// タイトルへ戻る
		// TODO: 最終スコア画面へ or 最終シナリオ画面へ
		this.core.scene_manager.changeScene("title");
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

	ctx.fillText("ゲームクリア！", this.width/2, this.height/2);

	ctx.restore();
};

module.exports = Scene;
