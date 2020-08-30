'use strict';

var BaseScene = require('../../hakurei').Scene.Base;

var Util = require('../../hakurei').Util;

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
	return(window.RPGAtsumaru && window.RPGAtsumaru.experimental.screenshot && window.RPGAtsumaru.experimental.screenshot.displayModal);
};

module.exports = SceneClearMain;
