'use strict';

var Hakurei = require('../../hakurei');

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
	yes_button
		.setMoveOnClick()
		.on("click", function () {
			// サブシーンは戻る
			self.parent.returnSubScene("main");

			// atsumaru_share_dialog サブシーン自体は表示させたくないので、main に遷移するまで少し待つ
			self.parent.core.time_manager.setTimeout(function () {
				// シェアモーダルを開く
				window.RPGAtsumaru.experimental.screenshot.displayModal();
			}, 5);
		})

	no_button
		.setMoveOnClick()
		.on("click", function () {
			// クリア画面を終えて、次のシーンへ
			self.parent.exit();
		})

	this.addObjects([modal, yes_button, no_button]);
};
Hakurei.Util.inherit(SceneClearAtsumaruShareDialog, Hakurei.Scene.Base);

SceneClearAtsumaruShareDialog.prototype.init = function(){
	Hakurei.Scene.Base.prototype.init.apply(this, arguments);
};

SceneClearAtsumaruShareDialog.prototype.update = function() {
	Hakurei.Scene.Base.prototype.update.apply(this, arguments);
};

module.exports = SceneClearAtsumaruShareDialog;
