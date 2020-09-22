'use strict';
var Hakurei = require('../hakurei');
var CONSTANT = require('../constant');

var SceneTitle = function(core) {
	Hakurei.Scene.Base.apply(this, arguments);

	// スコアボード ボタン以外の領域
	var scene_manager = this.core.scene_manager;
	var area_without_button = new Hakurei.Object.UI.Group(this, {
		x: this.width/2,
		y: this.height/2 - 45,
		width: this.width,
		height: this.height - 45,
	})
		.on("click", function () {
			// 次のシーンへ
			scene_manager.changeScene("scenario_start");
		});

	this.addObject(area_without_button);


	// RPGアツマール環境ならランキングボタンを表示する
	if (this._isEnableToDisplayScoreBoardInAtsumaru()) {
		// スコアボードを表示するボタン
		var show_scoreboard_button = new Hakurei.Object.UI.Image(this, {
			imageName: "button_white",
			x: this.width - 80,
			y: this.height - 40,
			children: [
				// ボタン内の文字列
				new Hakurei.Object.UI.Text(this, {
					text: "ランキング",
					textColor: "black",
					textSize:  "20px",
					textAlign: "center",
					textBaseline: "middle",
					textFont:  "MyFont",
					x: this.width - 80,
					y: this.height - 40,
				}),
			],
		})
			.setMoveOnClick()
			.on("click", function () {
				// ランキングモーダルを開く
				window.RPGAtsumaru.scoreboards.display(CONSTANT.BOARD_ID_IN_ATSUMARU);
			});

		this.addObject(show_scoreboard_button);
	}
};
Hakurei.Util.inherit(SceneTitle, Hakurei.Scene.Base);

SceneTitle.prototype.init = function(){
	Hakurei.Scene.Base.prototype.init.apply(this, arguments);
	this.core.scene_manager.setFadeIn(60, "black");

	// 合計スコアを初期化
	this.core.initTotalScore();

	this.core.audio_loader.playBGM("title");
};

// RPGアツマール環境でスコアボードを表示できるか否か
SceneTitle.prototype._isEnableToDisplayScoreBoardInAtsumaru = function(){
	return(window.RPGAtsumaru && window.RPGAtsumaru.scoreboards && window.RPGAtsumaru.scoreboards.display);
};

SceneTitle.prototype.update = function(){
	Hakurei.Scene.Base.prototype.update.apply(this, arguments);
};

SceneTitle.prototype.draw = function(){
	var ctx = this.core.ctx;

	// 背景
	var title = this.core.image_loader.getImage("title");
	ctx.save();
	ctx.translate(this.width/2, this.height/2);
	ctx.drawImage(title, -title.width/2, -title.height/2);
	ctx.restore();

	ctx.save();
	ctx.fillStyle = 'rgb( 0, 0, 0 )';
	ctx.globalAlpha = 0.8;
	ctx.translate(this.width/2, this.height/2);
	ctx.fillRect(
		-this.width/2,
		-this.height/2,
		this.width,
		this.height
	);
	ctx.restore();

	// Touch to Start
	ctx.save();
	ctx.fillStyle = "white";
	ctx.font = "32px 'MyFont'";
	ctx.textAlign = 'center';

	ctx.fillText("Touch to Start!!", this.width/2, this.height/2 + 200);

	ctx.restore();

	// タイトルロゴ
	var logo = this.core.image_loader.getImage("logo");
	ctx.save();
	ctx.translate(408, 312);
	ctx.drawImage(logo, -logo.width/2, -logo.height/2);
	ctx.restore();

	// ボタン
	Hakurei.Scene.Base.prototype.draw.apply(this, arguments);
};

module.exports = SceneTitle;
