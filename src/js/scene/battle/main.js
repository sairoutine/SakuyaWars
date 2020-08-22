'use strict';

var BaseScene = require('./base');
var Util = require('../../hakurei').Util;
var UIParts = require('../../hakurei').Object.UIParts;

var SceneBattleMain = function(core) {
	BaseScene.apply(this, arguments);

	// ユニット一覧のページング位置
	this.current_paging_position = 0;

	// 経過時間
	this._elapsed_seconds = 0;


	// ユニットボタン一覧
	this._unit_buttons = [
		new UIParts(this,  286, 574, 100, 80, _buttonDrawer("btn_icon_sakuya_normalkinkyori")),
		new UIParts(this,  396, 574, 100, 80, _buttonDrawer("btn_icon_sakuya_normalenkyori")),
		new UIParts(this,  506, 574, 100, 80, _buttonDrawer("btn_icon_sakuya_tea")),
		new UIParts(this,  616, 574, 100, 80, _buttonDrawer("btn_icon_sakuya_meisaku")),
		new UIParts(this,  726, 574, 100, 80, _buttonDrawer("btn_icon_sakuya_bazooka")),
	];

	// ユニットボタンのページング位置
	this._unit_paging_left_button  = new UIParts(this,  211, 574, 30, 80, _buttonDrawer("btn_arrow_l"));
	this._unit_paging_right_button = new UIParts(this,  801, 574, 30, 80, _buttonDrawer("btn_arrow_r"));

	// スペルカード ボタン
	this._spellcard_button = new UIParts(this,  86, 573.5, 180, 107, _buttonSpellCardDrawer("btn_spell_on", "btn_spell_off"));

	this.addObjects(this._unit_buttons);
	this.addObjects([this._unit_paging_left_button, this._unit_paging_right_button, this._spellcard_button]);
};
Util.inherit(SceneBattleMain, BaseScene);

SceneBattleMain.prototype.init = function(){
	BaseScene.prototype.init.apply(this, arguments);

	// ユニット一覧のページング位置
	this.current_paging_position = 0;

	// 経過時間
	this._elapsed_seconds = 0;
};


SceneBattleMain.prototype.update = function(){
	BaseScene.prototype.update.apply(this, arguments);

	// 時が止まってなければ時間を経過させる
	if (!this.parent.isTimeStop()) {
		// 1秒経過したら1秒カウントアップする
		if (this.frame_count % 60 === 0) {
			// MM:NN という表記なので、MMが3桁になる場合、桁あふれしないように時刻を止める
			if (this._elapsed_seconds < 6000) {
				this._elapsed_seconds++;
			}
		}
	}

	// スペルカードが使えれば、スペルカードボタンを有効にする
	if(this.parent.canSpellCard()) {
		this._spellcard_button.canspellcard = true;
	}
	else {
		this._spellcard_button.canspellcard = false;
	}

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
			if (this.parent.canSpellCard()) {
				this.parent.useSpellCard();
			}
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
	var ctx = this.core.ctx;
	BaseScene.prototype.draw.apply(this, arguments);

	var minutes = (this._elapsed_seconds / 60) | 0;
	minutes = ('00' + minutes ).slice(-2);
	var seconds = this._elapsed_seconds % 60;
	seconds = ('00' + seconds ).slice(-2);

	// 時間経過秒数を表示
	ctx.save();
	ctx.font = "36px 'MyFont'";
	ctx.textAlign = "center";
	ctx.textBaseline = "middle";
	ctx.fillStyle = Util.hexToRGBString("#141e46");
	ctx.fillText(minutes.toString() + ":" + seconds.toString(), 73, 32);

	ctx.restore();
};

function _buttonDrawer (image_name) {
	return function() {
		var ctx = this.core.ctx;

		var offset_x = 0;
		var offset_y = 0;
		if (this.isclick) {
			offset_x = 3;
			offset_y = 3;
		}

		var image = this.core.image_loader.getImage(image_name);
		ctx.save();
		ctx.drawImage(image,
			this.getCollisionLeftX() + offset_x,
			this.getCollisionUpY() + offset_y,
			this.collisionWidth(),
			this.collisionHeight()
		);
		ctx.restore();
	};
}

function _buttonSpellCardDrawer (on_name, off_name) {
	return function() {
		var ctx = this.core.ctx;

		var offset_x = 0;
		var offset_y = 0;
		if (this.isclick) {
			offset_x = 3;
			offset_y = 3;
		}

		var image;
		if (this.canspellcard) {
			image = this.core.image_loader.getImage(on_name);
		}
		else {
			image = this.core.image_loader.getImage(off_name);
		}

		ctx.save();
		ctx.drawImage(image,
			this.getCollisionLeftX() + offset_x,
			this.getCollisionUpY() + offset_y,
			this.collisionWidth(),
			this.collisionHeight()
		);
		ctx.restore();
	};

}

module.exports = SceneBattleMain;
