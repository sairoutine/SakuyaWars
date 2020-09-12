'use strict';

var BaseScene = require('../../hakurei').Scene.Base;

var Util = require('../../hakurei').Util;

var STATUS_WAIT           = 0;
var STATUS_SHOW_FRAME     = 1;
var STATUS_SHOW_SCORE     = 2;
var STATUS_CAN_NEXT_STAGE = 3;

// 1ページにボーナスを何個表示するか
var BONUSES_PER_PAGE = 7;

var SceneBattleResult = function(core) {
	BaseScene.apply(this, arguments);

	this._status = STATUS_WAIT;

	// フレームのアニメーション用情報
	this._frame_y = 0;
	this._is_reverse_frame_y = false;

	// ボーナス一覧の現在ページ
	this._bonuses_current_page = 0;

	// リザルトに表示する情報一覧
	this._time_text = "";
	this._score  = 0;
	this._bonuses = [];
};
Util.inherit(SceneBattleResult, BaseScene);

SceneBattleResult.prototype.init = function(){
	BaseScene.prototype.init.apply(this, arguments);

	this._status = STATUS_WAIT;

	// フレームのアニメーション用情報
	this._frame_y = 0;
	this._is_reverse_frame_y = false;

	// ボーナス一覧の現在ページ
	this._bonuses_current_page = 0;

	// リザルトに表示する情報一覧
	this._time_text = this.parent.getElapsedSecondsText();
	this._score  = this.parent.mission_manager.calcScore(this.parent.getElapsedSeconds());
	this._bonuses = this.parent.mission_manager.calcAccomplishedMissions();
};

SceneBattleResult.prototype.update = function(){
	BaseScene.prototype.update.apply(this, arguments);

	if (this._status === STATUS_WAIT) {
		// リザルト画面を表示するまでNフレーム待つ
		if (this.frame_count > 60) {
			this._status = STATUS_SHOW_FRAME;
		}
	}
	if (this._status === STATUS_SHOW_FRAME) {
		// リザルト画面のウィンドウを上から下へ表示する
		// 上から下に移動したあと、少し上に戻すことで、ウィンドウが少し跳ねたように見せる
		if (this._is_reverse_frame_y === false) {
			this._frame_y += 15;

			if (this._frame_y >= this.height/2 + 50) {
				this._is_reverse_frame_y = true;
			}
		}
		else {
			this._frame_y -= 5;

			if (this._frame_y < this.height/2) {
				this._frame_y = this.height/2;

				this.core.audio_loader.playSound("result");

				// フレームの移動が終わったので次へ
				this._status = STATUS_SHOW_SCORE;
			}
		}
	}
	else if (this._status === STATUS_SHOW_SCORE) {
		if ((this._bonuses_current_page+1) * BONUSES_PER_PAGE < this._bonuses.length) {
			// クリックするたびにボーナス一覧をページングさせる
			if (this.core.input_manager.isLeftClickPush()) {
				this.core.audio_loader.playSound("result");

				this._bonuses_current_page++;
			}
		}
		else {
			// ボーナス一覧のページングが終わったので次へ
			this._status = STATUS_CAN_NEXT_STAGE;
		}
	}
	else if (this._status === STATUS_CAN_NEXT_STAGE) {
		if (this.core.input_manager.isLeftClickPush()) {
			// スコアを合計スコアに加算
			this.core.addTotalScore(this._score);

			// 次のステージ or エンディングへ
			if (this.parent.hasNextStage()) {
				this.parent.changeNextStage();
			}
			else {
				this.core.scene_manager.changeScene("scenario_end");
			}
		}
	}
	else {
		// ここにはこないはず
	}
};

SceneBattleResult.prototype.draw = function(){
	BaseScene.prototype.draw.apply(this, arguments);
	var ctx = this.core.ctx;

	if (this._status !== STATUS_WAIT) {
		// 画面全体を半透明の紺色で覆う
		ctx.save();
		ctx.fillStyle = Util.hexToRGBString('#141E46');
		ctx.globalAlpha = 0.5;
		ctx.translate(this.width/2, this.height/2);
		ctx.fillRect(
			-this.width/2,
			-this.height/2,
			this.width,
			this.height
		);
		ctx.restore();

		// フレームの表示
		var result_frame = this.core.image_loader.getImage("result_frame");
		ctx.save();
		ctx.translate(this.width/2, this._frame_y);
		ctx.drawImage(result_frame, -result_frame.width/2, -result_frame.height/2);
		ctx.restore();
	}

	if (this._status !== STATUS_WAIT && this._status !== STATUS_SHOW_FRAME) {
		// クリア時間の表示
		ctx.save();
		ctx.font = "32px 'MyFont'";
		drawWithLine(ctx, 85, 170, "クリア時間 : " + this._time_text);
		ctx.restore();

		// ボーナス一覧の表示
		ctx.save();
		ctx.font = "32px 'MyFont'";
		drawWithLine(ctx, 85, 210, "ボーナス");
		ctx.restore();

		for (var i = 0; i < BONUSES_PER_PAGE; i++) {
			var idx = i + this._bonuses_current_page * BONUSES_PER_PAGE;
			var bonus = this._bonuses[idx];

			if (bonus) {
				ctx.save();
				ctx.font = "24px 'MyFont'";
				drawWithLine(ctx, 120, 250 + i*30, bonus.text() + ":");
				drawWithLine(ctx, 630, 250 + i*30, "×" +  bonus.num() + "倍");
				ctx.restore();
			}
		}

		// 合計スコアの表示
		ctx.save();
		ctx.font = "36px 'MyFont'";
		drawWithLine(ctx, 85, 500, "スコア : " + this._score);
		ctx.restore();
	}
};

var drawWithLine = function (ctx, x, y, text) {
	ctx.strokeStyle = "black";
	ctx.lineWidth = 3.0;
	ctx.strokeText(text, x, y);

	ctx.fillStyle = "white";
	ctx.fillText(text, x, y);
};

module.exports = SceneBattleResult;
