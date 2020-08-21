'use strict';
var Core = require('./hakurei').Core;
var Util = require('./hakurei').Util;

var SceneLoading = require('./hakurei').Scene.Loading;
var SceneTitle = require('./scene/title');
var SceneBattle = require('./scene/battle');
var CONSTANT = require('./constant');

var AssetsPreload = require('./assets');

var Game = function(canvas) {
	Core.apply(this, arguments);

	this.scene_manager.addScene("loading", new SceneLoading(this));
	this.scene_manager.addScene("title", new SceneTitle(this));
	this.scene_manager.addScene("battle", new SceneBattle(this));
};
Util.inherit(Game, Core);

Game.prototype.init = function () {
	Core.prototype.init.apply(this, arguments);

	// ローディング画面へ
	if (CONSTANT.DEBUG) {
		// デバッグ用画面遷移
		this.scene_manager.changeScene("loading", AssetsPreload, CONSTANT.DEBUG_SCENE);
	}
	else {
		this.scene_manager.changeScene("loading", AssetsPreload, "title");
	}
};

Game.prototype.setupDebug = function (dom) {
	if (!CONSTANT.DEBUG) return;

	this.debug_manager.setOn(dom);

	// ゲームスタート ボタン
	this.debug_manager.addMenuButton("Run", function (game) {
		game.startRun();
	});

	// ゲームストップ ボタン
	this.debug_manager.addMenuButton("Stop", function (game) {
		game.stopRun();
	});

	// キャプチャボタン
	this.debug_manager.addCaputureImageButton("画面キャプチャ");

	// FPS 表示
	this.debug_manager.addMenuButton("FPS表示", function (game) {
		game.debug_manager.setShowingFpsOn();
	});
	this.debug_manager.addMenuButton("FPS非表示", function (game) {
		game.debug_manager.setShowingFpsOff();
	});

};

module.exports = Game;
