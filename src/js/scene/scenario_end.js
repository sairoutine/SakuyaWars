'use strict';

var serif_script = require("../serif/end");

var util = require('../hakurei').util;
var base_scene = require('./scenario_base');

var SceneScenarioEnd = function(game) {
	base_scene.apply(this, arguments);
};

util.inherit(SceneScenarioEnd, base_scene);

// シナリオ開始時
SceneScenarioEnd.prototype.notifySerifStart = function() {

};

// シナリオ終了後
SceneScenarioEnd.prototype.notifySerifEnd = function() {
	this.core.scene_manager.changeScene("title");
};

// セリフスクリプト
SceneScenarioEnd.prototype.serifScript = function() {
	return serif_script;
};

// BGM
SceneScenarioEnd.prototype.bgm = function() {
	return "result";
};

// 背景
SceneScenarioEnd.prototype.background = function() {
	return "";
};

module.exports = SceneScenarioEnd;
