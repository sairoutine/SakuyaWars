'use strict';

var BaseScene = require('./base');
var Util = require('../../hakurei').Util;
var OpponentManager = require('../../logic/opponent_manager');


var SceneBattleMain = function(core) {
	BaseScene.apply(this, arguments);

	// 敵AI
	this.opponent_manager = new OpponentManager(this);

	// 経過時間
	this._elapsed_seconds = 0;

	this.addObject(this.opponent_manager);
};
Util.inherit(SceneBattleMain, BaseScene);

SceneBattleMain.prototype.init = function(){
	BaseScene.prototype.init.apply(this, arguments);

	// ユニット一覧のページング位置
	this.current_paging_position = 0;

	// 経過時間
	this._elapsed_seconds = 0;
};

SceneBattleMain.prototype.getElapsedSeconds = function(){
	return this._elapsed_seconds;
};

SceneBattleMain.prototype.getElapsedSecondsText = function(){
	var minutes = (this._elapsed_seconds / 60) | 0;
	minutes = ('00' + minutes ).slice(-2);
	var seconds = this._elapsed_seconds % 60;
	seconds = ('00' + seconds ).slice(-2);

	return minutes.toString() + ":" + seconds.toString();
};

SceneBattleMain.prototype.update = function(){
	BaseScene.prototype.update.apply(this, arguments);

	// 時が止まってなければ時間を経過させる
	if (!this.parent.isTimeStop()) {
		// 1秒経過したら1秒カウントアップする
		if (this.frame_count % 60 === 0) {
			// MM:NN という表記なので、MMが3桁になる場合、桁あふれしないように時刻を止める
			if (this._elapsed_seconds < 6000) {
				this._elapsed_seconds++;

				// 1秒経過したことをミッション管理へ通知
				this.parent.mission_manager.notifySecondsGoneBy();
			}
		}
	}
};

SceneBattleMain.prototype.draw = function(){
	var ctx = this.core.ctx;
	BaseScene.prototype.draw.apply(this, arguments);

	// 時間経過秒数を表示
	ctx.save();
	ctx.font = "36px 'MyFont'";
	ctx.textAlign = "center";
	ctx.textBaseline = "middle";
	ctx.fillStyle = Util.hexToRGBString("#141e46");
	ctx.fillText(this.getElapsedSecondsText(), 73, 32);

	ctx.restore();
};

module.exports = SceneBattleMain;
