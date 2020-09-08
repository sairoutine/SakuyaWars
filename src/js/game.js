'use strict';
var Core = require('./hakurei').Core;
var Util = require('./hakurei').Util;

var SceneLoading = require('./scene/loading');
var SceneTitle = require('./scene/title');
var SceneScenarioStart = require('./scene/scenario_start');
var SceneBattle = require('./scene/battle');
var SceneScenarioEnd = require('./scene/scenario_end');
var SceneClear = require('./scene/clear');
var CONSTANT = require('./constant');

var AssetsPreload = require('./assets');

var Game = function(canvas) {
	Core.apply(this, arguments);

	this.scene_manager.addScene("loading", new SceneLoading(this));
	this.scene_manager.addScene("scenario_start", new SceneScenarioStart(this));
	this.scene_manager.addScene("title", new SceneTitle(this));
	this.scene_manager.addScene("battle", new SceneBattle(this));
	this.scene_manager.addScene("scenario_end", new SceneScenarioEnd(this));
	this.scene_manager.addScene("clear", new SceneClear(this));
};
Util.inherit(Game, Core);

Game.prototype.init = function () {
	Core.prototype.init.apply(this, arguments);

	// ローディング画面へ
	if (CONSTANT.DEBUG) {
		this.scene_manager.changeScene("loading", AssetsPreload, CONSTANT.DEBUG_SCENE);
	}
	else {
		this.scene_manager.changeScene("loading", AssetsPreload, "title");
	}
};

Game.prototype.setupDebug = function (dom) {
	if (!CONSTANT.DEBUG) return;

	this.debug_manager.setOn(dom);

	// ゲームスタート／ストップ ボタン
	this.debug_manager.addMenuButton("Run/Stop", function (game) {
		if(game.isRunning()) {
			game.stopRun();
		}
		else {
			game.startRun();
		}
	});

	// キャプチャボタン
	this.debug_manager.addCaputureImageButton("画面キャプチャ");

	// FPS 表示
	this.debug_manager.addMenuButton("FPS表示／非表示", function (game) {
		if (game.debug_manager.isShowingFps()) {
			game.debug_manager.setShowingFpsOff();
		}
		else {
			game.debug_manager.setShowingFpsOn();
		}
	});

	// 当たり判定 表示
	this.debug_manager.addMenuButton("当たり判定表示／非表示", function (game) {
		if (game.debug_manager.isShowingCollisionArea()) {
			game.debug_manager.setShowingCollisionAreaOff();
		}
		else {
			game.debug_manager.setShowingCollisionAreaOn();
		}
	});

	this.debug_manager.addMenuButton("HP表示／非表示", function (game) {
		var flag = game.debug_manager.get("is_show_hp") || false;
		game.debug_manager.set("is_show_hp", !flag);
	});

	this.debug_manager.addMenuButton("ボス撃破", function (game) {
		if(game.scene_manager.currentScene() instanceof SceneBattle) {
			game.scene_manager.currentScene().destroyBoss();
		}
		else {
			window.alert("バトル中に押してください");
		}
	});

	this.debug_manager.addMenuButton("スペカを使用可にする", function (game) {
		if(game.scene_manager.currentScene() instanceof SceneBattle) {
			game.scene_manager.currentScene().enableSpellCard();
		}
		else {
			window.alert("バトル中に押してください");
		}
	});

};

module.exports = Game;
