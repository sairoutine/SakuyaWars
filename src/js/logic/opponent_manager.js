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

	// 時が止まってる最中は何も行動できない
	if(this.scene.isTimeStop()) {
		return;
	}

	// とりあえず仮で時間経過で敵を生成する
	if (this.frame_count % 300 === 0) {
		this.scene.generateEnemy(0);
	}
};

OpponentManager.prototype.draw = function(){
	BaseObject.prototype.draw.apply(this, arguments);
};

module.exports = OpponentManager;
