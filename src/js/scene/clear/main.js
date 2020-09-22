'use strict';

var BaseScene = require('../../hakurei').Scene.Base;

var Util = require('../../hakurei').Util;
var CONSTANT = require('../../constant');

var SceneClearMain = function(core) {
	BaseScene.apply(this, arguments);

	// スクリーンショットモーダルを一度表示したか否か
	this._is_showed_screenshot_modal = false;
};
Util.inherit(SceneClearMain, BaseScene);

SceneClearMain.prototype.init = function(){
	BaseScene.prototype.init.apply(this, arguments);

	// スクリーンショットモーダルを一度表示したか否か
	this._is_showed_screenshot_modal = false;

	// RPGアツマール環境なら
	if (this._isEnableToSetRecordInAtsumaru()) {
		var score = Util.clamp(this.core.totalScore(), -999999999999999, +999999999999999);

		// スコアボードへスコアを設定する
		window.RPGAtsumaru.scoreboards.setRecord(CONSTANT.BOARD_ID_IN_ATSUMARU, score)
			.catch(function(err) {
				switch(err.code) {
				case "BAD_REQUEST":
					// ゲーム側で何か間違えているとき＝指定したボードIDが大きすぎるかマイナスの場合などに発生
					console.error(err);
					break;
				case "INTERNAL_SERVER_ERROR":
					// サーバー側で何らかの問題＝通信不良やメンテ等で発生
					console.error(err);
					break;
				default:
					console.error(err);
				}
			});
	}
};

SceneClearMain.prototype.update = function() {
	BaseScene.prototype.update.apply(this, arguments);
	if (this.core.input_manager.isLeftClickPush()) {
		// RPGアツマール環境かつ一度もスクショ確認モーダルを表示してないなら
		if (this._isEnableToScreenshotInAtsumaru() && !this._is_showed_screenshot_modal) {
			// スクショ確認モーダルを表示
			this.parent.changeSubScene("atsumaru_share_dialog");

			this._is_showed_screenshot_modal = true;
		}
		else {
			// クリア画面を終えて、次のシーンへ
			this.parent.exit();
		}
	}
};

// RPGアツマール環境でスクショを取るモーダルを表示できるか否か
SceneClearMain.prototype._isEnableToScreenshotInAtsumaru = function(){
	return(window.RPGAtsumaru && window.RPGAtsumaru.screenshot && window.RPGAtsumaru.screenshot.displayModal);
};

// RPGアツマール環境でスコアを設定できるか否か
SceneClearMain.prototype._isEnableToSetRecordInAtsumaru = function(){
	return(window.RPGAtsumaru && window.RPGAtsumaru.scoreboards && window.RPGAtsumaru.scoreboards.setRecord);
};









module.exports = SceneClearMain;
