'use strict';

var BaseScene = require('./base');
var Util = require('../../hakurei').Util;
var UIParts = require('../../hakurei').Object.UIParts;

var SceneBattleMain = function(core) {
	BaseScene.apply(this, arguments);

	// ユニット一覧のページング位置
	this.current_paging_position = 0;

	// ユニットボタン一覧
	this._unit_buttons = [
		new UIParts(this,  400, 550, 180 * 0.5, 30 * 1.5, _buttonDrawer("咲夜1")),
		new UIParts(this,  475, 550, 180 * 0.5, 30 * 1.5, _buttonDrawer("咲夜2")),
		new UIParts(this,  550, 550, 180 * 0.5, 30 * 1.5, _buttonDrawer("咲夜3")),
		new UIParts(this,  625, 550, 180 * 0.5, 30 * 1.5, _buttonDrawer("咲夜4")),
		new UIParts(this,  700, 550, 180 * 0.5, 30 * 1.5, _buttonDrawer("咲夜5")),
	];

	this._unit_paging_left_button  = new UIParts(this,  325, 550, 180 * 0.5, 30 * 1.5, _buttonDrawer("←"));
	this._unit_paging_right_button = new UIParts(this,  775, 550, 180 * 0.5, 30 * 1.5, _buttonDrawer("→"));

	// スペルカード ボタン
	this._spellcard_button = new UIParts(this,  75, 550, 180 * 0.5, 30 * 1.5, _buttonDrawer("SPELLCARD"));

	this.addObjects(this._unit_buttons);
	this.addObjects([this._unit_paging_left_button, this._unit_paging_right_button, this._spellcard_button]);
};
Util.inherit(SceneBattleMain, BaseScene);

SceneBattleMain.prototype.init = function(){
	BaseScene.prototype.init.apply(this, arguments);

	// ユニット一覧のページング位置
	this.current_paging_position = 0;
};


SceneBattleMain.prototype.update = function(){
	BaseScene.prototype.update.apply(this, arguments);

	var x = this.core.input_manager.mousePositionX();
	var y = this.core.input_manager.mousePositionY();

	// ユーザーの押下処理 判定
	if(this.core.input_manager.isLeftClickPush()) {
		// ユニット生成
		for (var i = 0, len = this._unit_buttons.length; i < len; i++) {
			var unit_button = this._unit_buttons[i];

			if(unit_button.checkCollisionWithPosition(x, y)) {
				this.parent.generateUnit(i);

				//this._pass_button.setVariable("isclick", true);
			}
		}

		// スペルカード発動
		if(this._spellcard_button.checkCollisionWithPosition(x, y)) {
			this.parent.useSpellCard();

			//this._pass_button.setVariable("isclick", true);
		}
	}
	/*
	else {
		var buttons = [this._high_button, this._low_button, this._same_button, this._pass_button, this._restart_button];
		for (var i = 0, len = buttons.length; i < len; i++) {
			var button = buttons[i];
			if(button.checkCollisionWithPosition(x, y)) {
				button.setVariable("onmouse", true);
			}
			else {
				button.setVariable("onmouse", false);
			}

			button.setVariable("isclick", false);
		}

	}
	*/
};

SceneBattleMain.prototype.draw = function(){
	BaseScene.prototype.draw.apply(this, arguments);
};

function _buttonDrawer (text) {
	return function() {
		var ctx = this.core.ctx;

		if (this.is_not_show) return;

		/*
		var logo;
		if (this.onmouse) {
			logo = this.core.image_loader.getImage("button_gray");
		}
		else {
			logo = this.core.image_loader.getImage("button_white");
		}
		*/

		var offset_x = 0;
		var offset_y = 0;
		if (this.isclick) {
			offset_x = 3;
			offset_y = 3;
		}

		ctx.save();
		/*
		ctx.drawImage(logo,
			this.getCollisionLeftX() + offset_x,
			this.getCollisionUpY() + offset_y,
			this.collisionWidth(),
			this.collisionHeight()
		);
		*/
		ctx.textAlign = 'center';
		ctx.textBaseline = 'middle';
		ctx.font = "24px 'MyFont'";
		ctx.fillStyle = "black";

		ctx.fillText(text, this.x() + offset_x, this.y() + offset_y);

		ctx.restore();
	};
}

module.exports = SceneBattleMain;
