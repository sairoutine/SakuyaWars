'use strict';

// セリフウィンドウの縦の長さ
var MESSAGE_WINDOW_HEIGHT = 100;

var MESSAGE_WINDOW_OUTLINE_MARGIN = 10;

// セリフの文字が表示される速さ
var TYPOGRAPHY_SPEED = 1;

var Util = require('../hakurei').Util;
var BaseScene = require('../hakurei').Scene.Base;

var SerifManager = require('../hakurei').Manager.Scenario;

var SceneScenarioBase = function(game) {
	BaseScene.apply(this, arguments);

	this.serif = new SerifManager(this.core, {
		typography_speed: TYPOGRAPHY_SPEED,
	});
};

Util.inherit(SceneScenarioBase, BaseScene);

SceneScenarioBase.prototype.init = function(){
	BaseScene.prototype.init.apply(this, arguments);
	this.serif.init(this.serifScript());

	// セリフ開始
	this.serif.start();

	this.notifySerifStart();
};

SceneScenarioBase.prototype.beforeDraw = function(){
	BaseScene.prototype.beforeDraw.apply(this, arguments);

	// BGM 再生
	if (this.frame_count === 60 && this.bgm()) {
		this.core.audio_loader.playBGM(this.bgm());
	}

	if(this.core.input_manager.isLeftClickPush()) {
		if(this.serif.isEnd()) {
			this.notifySerifEnd();
		}
		else {
			// セリフを送る
			this.serif.next();
		}
	}
};

// 画面更新
SceneScenarioBase.prototype.draw = function(){
	BaseScene.prototype.draw.apply(this, arguments);

	// 背景表示
	this._showBackground();

	// メッセージウィンドウ表示
	this._showMessageWindow();

	// メッセージ表示
	this._showMessage();
};

// 背景画像表示
SceneScenarioBase.prototype._showBackground = function(){
	var ctx = this.core.ctx;
	var background_name = this.serif.getCurrentBackgroundImageName() ? this.serif.getCurrentBackgroundImageName() : this.background();
	var background = this.core.image_loader.getImage(background_name);
	ctx.drawImage(background,
		0,
		0,
		background.width,
		background.height,
		0,
		0,
		this.core.width,
		this.core.height);
};

SceneScenarioBase.prototype._showMessageWindow = function(){
	var ctx = this.core.ctx;
	// show message window
	ctx.save();

	ctx.globalAlpha = 0.5;
	ctx.fillStyle = 'rgb( 0, 0, 0 )';
	ctx.fillRect(
		MESSAGE_WINDOW_OUTLINE_MARGIN,
		this.core.height - 125,
		this.core.width - MESSAGE_WINDOW_OUTLINE_MARGIN * 2,
		MESSAGE_WINDOW_HEIGHT
	);

	ctx.restore();
};

// セリフ表示
SceneScenarioBase.prototype._showMessage = function() {
	var ctx = this.core.ctx;

	// セリフの色
	var font_color = this.serif.getCurrentOption().font_color;
	if(font_color) {
		font_color = Util.hexToRGBString(font_color);
	}
	else {
		font_color = 'rgb(255, 255, 255)';
	}

	// 縁取りの色
	var outline_color = this.serif.getCurrentOption().outline_color;
	if(outline_color) {
		outline_color = Util.hexToRGBString(outline_color);
	}
	else {
		outline_color = 'rgb(0, 0, 0)';
	}

	var y;
	// セリフ表示
	var lines = this.serif.getCurrentPrintedSentences();
	if (lines.length) {
		// セリフテキストの y 座標初期位置
		y = this.core.height - 125 + 40;

		for(var i = 0, len = lines.length; i < len; i++) {
			ctx.save();
			ctx.font = "18px 'MyFont'";
			ctx.textAlign = 'left';
			//ctx.textBaseline = 'middle';

			ctx.strokeStyle = outline_color;
			ctx.lineWidth = 4.0;
			ctx.strokeText(lines[i], MESSAGE_WINDOW_OUTLINE_MARGIN * 2 + 20, y); // 1行表示

			ctx.fillStyle = font_color;
			ctx.fillText(lines[i], MESSAGE_WINDOW_OUTLINE_MARGIN * 2 + 20, y); // 1行表示

			ctx.restore();

			y+= 30;
		}
	}

};


// 立ち絵＆セリフ終了後
SceneScenarioBase.prototype.notifySerifEnd = function() {
	throw new Error("notifySerifEnd method must be defined.");
};

SceneScenarioBase.prototype.notifySerifStart = function() {
	throw new Error("notifySerifStart method must be defined.");
};

// セリフスクリプト
SceneScenarioBase.prototype.serifScript = function() {
	throw new Error("serifScript method must be defined.");
};

// 背景画像名
SceneScenarioBase.prototype.background = function() {
	throw new Error("background method must be defined.");
};

// BGM
SceneScenarioBase.prototype.bgm = function() {
};


module.exports = SceneScenarioBase;
