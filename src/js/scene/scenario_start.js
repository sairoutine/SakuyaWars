'use strict';

var serif_script = require("../serif/start");

var util = require('../hakurei').util;
var base_scene = require('./scenario_base');

var SceneScenarioStart = function(game) {
	base_scene.apply(this, arguments);
};

util.inherit(SceneScenarioStart, base_scene);

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
	// TODO:
};

// 背景
SceneScenarioStart.prototype.background = function() {
	return "scenario_start_background";
};


module.exports = SceneScenarioStart;
