'use strict';

var Util = require('../hakurei').util;
var BaseObject = require('../hakurei').Object.Base;

var OpponentManager = function(scene) {
	BaseObject.apply(this, arguments);
};
Util.inherit(OpponentManager, BaseObject);

OpponentManager.prototype.init = function(serif_idx){
	BaseObject.prototype.init.apply(this, arguments);

};

OpponentManager.prototype.update = function(){
	BaseObject.prototype.update.apply(this, arguments);

	var scene = this.scene.parent;

	// 時が止まってる最中は何も行動できない
	if(scene.isTimeStop()) {
		return;
	}

	var interval = 0;
	if (scene.stage_no === 0) {
		interval = 60;
	}
	else if (scene.stage_no === 1) {
		interval = 50;
	}
	else if (scene.stage_no === 2) {
		interval = 40;
	}
	else if (scene.stage_no === 3) {
		interval = 30;
	}

	// とりあえず仮で時間経過でランダムに敵を生成する
	if (this.frame_count % interval === 0) {
		var no = Util.getRandomInt(0,3);
		scene.generateEnemy(no);
	}
};

OpponentManager.prototype.draw = function(){
	BaseObject.prototype.draw.apply(this, arguments);
};

module.exports = OpponentManager;
