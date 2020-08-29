'use strict';

var serif_script = require("../serif/start");

var util = require('../hakurei').Util;
var base_scene = require('./scenario_base');

var SceneScenarioStart = function(game) {
	base_scene.apply(this, arguments);
};

util.inherit(SceneScenarioStart, base_scene);

// シナリオ開始時
SceneScenarioStart.prototype.notifySerifStart = function() {
	// シーン遷移前の BGM 止める
	//this.core.audio_loader.stopBGM();
};

// シナリオ終了後
SceneScenarioStart.prototype.notifySerifEnd = function() {
	this.core.scene_manager.changeScene("battle");
};

// セリフスクリプト
SceneScenarioStart.prototype.serifScript = function() {
	return serif_script;
};

// BGM
SceneScenarioStart.prototype.bgm = function() {
	// 最初のシナリオは、タイトル画面のBGMそのままなので何も必要がない
	return "";
};

// 背景
SceneScenarioStart.prototype.background = function() {
	return "";
};


module.exports = SceneScenarioStart;
