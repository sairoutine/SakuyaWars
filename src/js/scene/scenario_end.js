'use strict';

var serif_script = require("../serif/end");

var util = require('../hakurei').util;
var base_scene = require('./scenario_base');

var SceneScenarioStart = function(game) {
	base_scene.apply(this, arguments);
};

util.inherit(SceneScenarioStart, base_scene);

SceneScenarioStart.prototype.notifySerifStart = function() {
	this.core.audio_loader.playBGM("result");
};

// シナリオ終了後
SceneScenarioStart.prototype.notifySerifEnd = function() {
	this.core.scene_manager.changeScene("title");
};

// セリフスクリプト
SceneScenarioStart.prototype.serifScript = function() {
	return serif_script;
};

// BGM
SceneScenarioStart.prototype.bgm = function() {
	// TODO:
};

// 背景
SceneScenarioStart.prototype.background = function() {
	return "";
};

module.exports = SceneScenarioStart;
