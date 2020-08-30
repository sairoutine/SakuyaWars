'use strict';

var Hakurei = require('../../hakurei');

// ボタン押下時にボタンが動くPX(x, y)
var BUTTON_MOVE_PX = 3;

var SceneClearAtsumaruShareDialog = function(core) {
	Hakurei.Scene.Base.apply(this, arguments);

	// 確認モーダル
	var modal = new Hakurei.Object.UI.Group(this, {
		x: this.width/2,
		y: this.height/2,
		width: 360,
		height: 120,
		backgroundColor: "black",
		alpha: 0.8,
		children: [
			new Hakurei.Object.UI.Text(this, {
				x: this.width/2,
				y: this.height/2 - 20,
				text: "結果をTwitterにシェアする？",
				textColor: "white",
				textSize: "22px",
				textAlign: "center",
				textFont: "MyFont",
			}),
		],
	});

	// シェアするボタン
	var yes_button = new Hakurei.Object.UI.Image(this, {
		imageName: "button_white",
		x: this.width/2 + 90,
		y: this.height/2 + 20,
		children: [
			// ボタン内の文字列
			new Hakurei.Object.UI.Text(this, {
				text: "シェアする",
				textColor: "black",
				textSize:  "20px",
				textAlign: "center",
				textBaseline: "middle",
				textFont:  "MyFont",
				x: this.width/2 + 90,
				y: this.height/2 + 20,
			}),
		],
	});

	// シェアしないボタン
	var no_button = new Hakurei.Object.UI.Image(this, {
		imageName: "button_white",
		x: this.width/2 - 90,
		y: this.height/2 + 20,
		children: [
			// ボタン内の文字列
			new Hakurei.Object.UI.Text(this, {
				text: "シェアしない",
				textColor: "black",
				textSize:  "20px",
				textAlign: "center",
				textBaseline: "middle",
				textFont:  "MyFont",
				x: this.width/2 - 90,
				y: this.height/2 + 20,
			}),
		],
	});

	var self = this;
	var yes_button_func = function () {
		// サブシーンは戻る
		self.parent.returnSubScene("main");

		// atsumaru_share_dialog サブシーン自体は表示させたくないので、main に遷移するまで少し待つ
		self.parent.core.time_manager.setTimeout(function () {
			// シェアモーダルを開く
			window.RPGAtsumaru.experimental.screenshot.displayModal();
		}, 5);
	};

	var no_button_func = function () {
		// クリア画面を終えて、次のシーンへ
		self.parent.exit();
	};

	yes_button
		.on("click", yes_button_func)
		.on("touch", yes_button_func)
		.on("clickstart", onclickstart_func)
		.on("clickend", onclickend_func)
		.on("touchstart", onclickstart_func)
		.on("touchend", onclickend_func);

	no_button
		.on("click", no_button_func)
		.on("touch", no_button_func)
		.on("clickstart", onclickstart_func)
		.on("clickend", onclickend_func)
		.on("touchstart", onclickstart_func)
		.on("touchend", onclickend_func);

	this.addObjects([modal, yes_button, no_button]);
};
Hakurei.Util.inherit(SceneClearAtsumaruShareDialog, Hakurei.Scene.Base);

SceneClearAtsumaruShareDialog.prototype.init = function(){
	Hakurei.Scene.Base.prototype.init.apply(this, arguments);
};

SceneClearAtsumaruShareDialog.prototype.update = function() {
	Hakurei.Scene.Base.prototype.update.apply(this, arguments);
};

var onclickstart_func = function () {
	this.x(this.x() + BUTTON_MOVE_PX);
	this.y(this.y() + BUTTON_MOVE_PX);

	for (var i = 0, len = this.objects.length; i < len; i++) {
		var child = this.objects[i];
		child.x(child.x() + BUTTON_MOVE_PX);
		child.y(child.y() + BUTTON_MOVE_PX);
	}
};

var onclickend_func = function () {
	this.x(this.x() - BUTTON_MOVE_PX);
	this.y(this.y() - BUTTON_MOVE_PX);

	for (var i = 0, len = this.objects.length; i < len; i++) {
		var child = this.objects[i];
		child.x(child.x() - BUTTON_MOVE_PX);
		child.y(child.y() - BUTTON_MOVE_PX);
	}
};


module.exports = SceneClearAtsumaruShareDialog;
