
/*

◆ TODO:
リファクタ → object系


デバッグ用にユニットや敵のHPを表示したい
デバッグ用にPやBを回復したい
セリフスキップを入れたい
リザルト画面
称号の組み込み
遠距離攻撃の敵、紅魔館にすぐたどり着く。。。
→ よって、一旦遠距離攻撃を削除したので、復活させる
ダメージを与えたときのエフェクトを表示する
AP表示量を表示する→ユニット
ボタンを押下するとへこむようにしたい

// FB1
ただ、現状通常咲夜を連打で出すだけで勝ててしまうので、妖精の攻撃力体力を増やすなどしてすこし難度をあげたほうがいいかもしれません（咲夜はいっぱい出てきて楽しい）

// FB2
もう一点、無移動組は攻撃と攻撃の間にインターバル（walk絵1枚）を挟むことはできますでしょうか？
*/
/*

体力1000あって、体力が残ってるほどスコアが高い。→減点法。
アークナイツだと、陣地に入った敵の数に応じてスコアが下がる。
→ 勝利までの時間が短いとボーナス。

ボム使わずにクリアするとボーナス。変なことするとボーナス。
めーさくだけのユニットで統一すると +1000点とか。

*/




'use strict';

var BaseScene = require('../hakurei').Scene.Base;
var SceneBattleMain = require('./battle/main');
var SceneBattleReady = require('./battle/ready');
var SceneBattleGameover = require('./battle/gameover');
var SceneBattleResult = require('./battle/result');

var Fort = require('../object/fort');
var SpellCardAnime = require('../object/anime/spellcard');

var Clownpiece = require('../object/boss/clownpiece');
var Lunachild = require('../object/boss/lunachild');
var Starsapphire = require('../object/boss/starsapphire');
var Sunnymilk = require('../object/boss/sunnymilk');

var UnitSakuyaNormal1 = require('../object/unit/sakuya_normal1');
var UnitSakuyaNormal2 = require('../object/unit/sakuya_normal2');
var UnitSakuyaTea = require('../object/unit/sakuya_tea');
var UnitSakuyaMeisaku = require('../object/unit/sakuya_meisaku');
var UnitSakuyaBazooka = require('../object/unit/sakuya_bazooka');
var UnitSakuyaMMD = require('../object/unit/sakuya_mmd');
var UnitSakuyaMagician = require('../object/unit/sakuya_magician');
var UnitSakuyaMandoragora = require('../object/unit/sakuya_mandoragora');
var UnitSakuyaTupai = require('../object/unit/sakuya_tupai');
var UnitSakuyaYoyomu = require('../object/unit/sakuya_yoyomu');

//var EnemyBlueLong = require('../object/enemy/blue_long');
//var EnemyBlueShort = require('../object/enemy/blue_short');
var EnemyPinkLong = require('../object/enemy/pink_long');
var EnemyPinkShort = require('../object/enemy/pink_short');
//var EnemyRedLong = require('../object/enemy/red_long');
//var EnemyRedShort = require('../object/enemy/red_short');
var EnemyWhiteLong = require('../object/enemy/white_long');
var EnemyWhiteShort = require('../object/enemy/white_short');

var UIImage = require('../hakurei').Object.UI.Image;
var Container = require('../hakurei').Object.Container;
var Util = require('../hakurei').Util;
var CONSTANT = require('../constant');

var BOSS_CLASSES = [
	Sunnymilk,
	Starsapphire,
	Lunachild,
	Clownpiece,
];

var BACKGROUND_IMAGES = [
	"battle_bg1",
	"battle_bg2",
	"battle_bg3",
	"battle_bg4",
];

// ユニットボタン一覧の1ページに表示する、それぞれのボタン位置
var UNIT_BUTTONS_POSITIONS = [
	{x: 286, y: 574},
	{x: 396, y: 574},
	{x: 506, y: 574},
	{x: 616, y: 574},
	{x: 726, y: 574},
];

// ユニットの種類一覧
var UNITS = [
	{
		"image": "btn_icon_sakuya_normalkinkyori",
		"class": UnitSakuyaNormal1,
	},
	{
		"image": "btn_icon_sakuya_normalenkyori",
		"class": UnitSakuyaNormal2,
	},
	{
		"image": "btn_icon_sakuya_tea",
		"class": UnitSakuyaTea,
	},
	{
		"image": "btn_icon_sakuya_meisaku",
		"class": UnitSakuyaMeisaku,
	},
	{
		"image": "btn_icon_sakuya_bazooka",
		"class": UnitSakuyaBazooka,
	},
	{
		"image": "btn_icon_sakuya_mmd",
		"class": UnitSakuyaMMD,
	},
	{
		"image": "btn_icon_sakuya_magic",
		"class": UnitSakuyaMagician,
	},
	{
		"image": "btn_icon_sakuya_mandoragora",
		"class": UnitSakuyaMandoragora,
	},
	{
		"image": "btn_icon_sakuya_tupai",
		"class": UnitSakuyaTupai,
	},
	{
		"image": "btn_icon_sakuya_yoyomu",
		"class": UnitSakuyaYoyomu,
	},
];

var ENEMY_CLASSES = [
	//EnemyBlueLong,
	//EnemyBlueShort,
	EnemyPinkLong,
	EnemyPinkShort,
	//EnemyRedLong,
	//EnemyRedShort,
	EnemyWhiteLong,
	EnemyWhiteShort,
];

var SceneBattle = function(core) {
	BaseScene.apply(this, arguments);

	// 自陣
	this.fort = new Fort(this);

	// スペルカード演出
	this.spellcard_anime = new SpellCardAnime(this);

	// ユニットボタン一覧
	this._unit_buttons = [];
	this._setupUnitButtons();

	// ユニットボタンのページング ボタン
	this._unit_paging_left_button  = null;
	this._unit_paging_right_button = null;
	this._setupPagingButtons();

	this._spellcard_button = null;
	this._setupSpellCardButton();

	this.addObject(this.fort);
	this.addObjects(this._unit_buttons);
	this.addObjects([this._unit_paging_left_button, this._unit_paging_right_button, this._spellcard_button]);

	// サブシーン
	this.addSubScene("ready", new SceneBattleReady(core));
	this.addSubScene("main", new SceneBattleMain(core));
	this.addSubScene("gameover", new SceneBattleGameover(core));
	this.addSubScene("result", new SceneBattleResult(core));

	// ---

	// ステージNo
	this.stage_no = 0;

	// ボス
	this.boss = null;

	// P ポイントの数
	this.p_num = CONSTANT.P_MAX;

	// ボムの数
	this.b_num = 0;

	// 召喚したユニット一覧
	this.units = new Container(this);

	// 召喚した敵一覧
	this.enemies = new Container(this);

	// 時を止めるスペカが使えるようになるまでの残り時間(frame)
	this._remaining_time_to_use_timestop_frame = CONSTANT.TIME_TO_USE_TIMESTOP_FRAME;

	// 時を止めてる際の残り時間(frame)
	this._remaining_timestop_frame = 0;

	// スペカ演出を表示するか否か
	this._is_show_spellcard_anime = false;

	// ユニット一覧のページング位置
	this._current_paging_position = 0;

	// ---
	this.addObjects(this.units);
	this.addObjects(this.enemies);
};
Util.inherit(SceneBattle, BaseScene);

// ユニット生成ボタン生成
SceneBattle.prototype._setupUnitButtons = function() {
	var self = this;
	for (var i = 0, len = UNITS.length; i < len; i++) {
		var unit_per_page_no = i % UNIT_BUTTONS_POSITIONS.length;
		var x = UNIT_BUTTONS_POSITIONS[unit_per_page_no].x;
		var y = UNIT_BUTTONS_POSITIONS[unit_per_page_no].y;

		var button_image = UNITS[i].image;

		var onclick_func = (function (i) {
			return function () {
				self.core.audio_loader.playSound("summon_unit");

				self.generateUnit(i);
			};
		})(i);

		var ui_image = new UIImage(this, {
			imageName: button_image,
			x: x,
			y: y,
		})
			.on("click", onclick_func)
			.on("touch", onclick_func);

		this._unit_buttons.push(ui_image);
	}
};

// ページングボタン生成
SceneBattle.prototype._setupPagingButtons = function() {
	var self = this;
	// ユニットボタンのページング ボタン
	this._unit_paging_left_button  = new UIImage(this, {
		imageName: "btn_arrow_l",
		x: 211,
		y: 574,
	});
	this._unit_paging_right_button  = new UIImage(this, {
		imageName: "btn_arrow_r",
		x: 801,
		y: 574,
	});

	var unit_paging_button_func = function () {
		self._current_paging_position = self._current_paging_position === 0 ? 1 : 0;

		// ユニット一覧のボタンを、現在のページのものだけ表示する
		self._showUnitButtonsInCurrentPage();
	};

	this._unit_paging_left_button
		.on("click", unit_paging_button_func)
		.on("touch", unit_paging_button_func);

	this._unit_paging_right_button
		.on("click", unit_paging_button_func)
		.on("touch", unit_paging_button_func);
};

// スペルカード ボタン生成
SceneBattle.prototype._setupSpellCardButton = function() {
	var self = this;
	// スペルカード ボタン
	this._spellcard_button = new UIImage(this, {
		imageName: "btn_spell_off",
		x: 86,
		y: 573.5,
	});

	var spellcard_button_func = function () {
		// スペルカードが使えるならば
		if (self._canSpellCard()) {
			// スペルカード発動
			self.core.audio_loader.playSound("use_spellcard");
			self._useSpellCard();
		}
	};

	this._spellcard_button
		.on("click", spellcard_button_func)
		.on("touch", spellcard_button_func);
};



SceneBattle.prototype.init = function(stage_no){
	BaseScene.prototype.init.apply(this, arguments);

	this.stage_no = stage_no || 0;

	// デバッグ用 stage No
	if (CONSTANT.DEBUG) {
		this.stage_no = CONSTANT.DEBUG_STAGE_NO;
	}

	// 自陣
	this.fort.x(90);
	this.fort.y(416);

	// スペルカード演出
	this.spellcard_anime.init();
	this.spellcard_anime.x(this.width/2);
	this.spellcard_anime.y(this.height/2);

	// ボス
	if (this.boss !== null) { // stage 2 以降は前のステージのボスを削除する
		this.removeObject(this.boss);
	}
	this.boss = new BOSS_CLASSES[this.stage_no](this);
	this.boss.init();
	this.boss.x(726);
	this.boss.y(410);
	this.addObject(this.boss);

	// ユニット一覧のボタンを、現在のページのものだけ表示する
	this._showUnitButtonsInCurrentPage();

	// P ポイントの数
	this.p_num = CONSTANT.P_MAX;

	// ボムの数
	this.b_num = 0;

	// 召喚したユニット一覧 初期化
	this.units.removeAllObject();

	// 召喚した敵一覧 初期化
	this.enemies.removeAllObject();

	// 時を止めてる際の残り時間(frame)
	this._remaining_timestop_frame = 0;

	// 時を止めるスペカが使えるようになるまでの残り時間(frame)
	this._remaining_time_to_use_timestop_frame = CONSTANT.TIME_TO_USE_TIMESTOP_FRAME;

	// スペカ演出を表示するか否か
	this._is_show_spellcard_anime = false;

	// ユニット一覧のページング位置
	this._current_paging_position = 0;

	this.changeSubScene("ready");
};

// ユニット一覧のボタンを、現在のページのものだけ表示する
SceneBattle.prototype._showUnitButtonsInCurrentPage = function(){
	for (var i = 0, len = this._unit_buttons.length; i < len; i++) {
		var button = this._unit_buttons[i];

		var start = UNIT_BUTTONS_POSITIONS.length * this._current_paging_position;
		var end   = UNIT_BUTTONS_POSITIONS.length * (this._current_paging_position+1) - 1;

		if (start <= i && i <= end) {
			button.show();
		}
		else {
			button.hide();
		}
	}
};

SceneBattle.prototype.generateUnit = function(unit_num){
	var Klass = UNITS[unit_num].class;
	var unit = new Klass(this);

	// P消費できるかチェック
	if (this.p_num < unit.consumedP()) {
		return;
	}

	// P消費
	this.p_num -= unit.consumedP();

	// ユニット追加
	var x = Util.getRandomInt(CONSTANT.UNIT_GENERATED_AREA_LEFT_X, CONSTANT.UNIT_GENERATED_AREA_RIGHT_X);
	var y = Util.getRandomInt(CONSTANT.UNIT_GENERATED_AREA_UP_Y, CONSTANT.UNIT_GENERATED_AREA_DOWN_Y);

	unit.init();
	unit.x(x);
	unit.y(y);

	this.units.addObject(unit);
};

SceneBattle.prototype.generateEnemy = function(enemy_num){
	var enemy = new ENEMY_CLASSES[enemy_num](this);

	// ユニット追加
	var x = Util.getRandomInt(CONSTANT.ENEMY_GENERATED_AREA_LEFT_X, CONSTANT.ENEMY_GENERATED_AREA_RIGHT_X);
	var y = Util.getRandomInt(CONSTANT.ENEMY_GENERATED_AREA_UP_Y, CONSTANT.ENEMY_GENERATED_AREA_DOWN_Y);

	enemy.init();
	enemy.x(x);
	enemy.y(y);

	this.enemies.addObject(enemy);
};


// スペルカードを使用できるか否か
SceneBattle.prototype._canSpellCard = function() {
	return this._remaining_time_to_use_timestop_frame === 0;
};

// スペルカード使用
SceneBattle.prototype._useSpellCard = function() {
	// 時を止めるスペカが使えるようになるまでの残り時間を戻す(frame)
	this._remaining_time_to_use_timestop_frame = CONSTANT.TIME_TO_USE_TIMESTOP_FRAME;

	// スペルカード演出を再生
	this._is_show_spellcard_anime = true;

	var self = this;
	this.spellcard_anime.playAnimationOnce(function () {
		self._is_show_spellcard_anime = false;
	});

	// 時間を止めている期間を設定する
	this._remaining_timestop_frame = CONSTANT.TIMESTOP_FRAME;
};

// 時を止めてる最中か否か
SceneBattle.prototype.isTimeStop = function() {
	return this._remaining_timestop_frame > 0;
};

// ゲームクリアになった
SceneBattle.prototype.notifyStageClear = function(){
	this.changeSubScene("result");
};

// ゲームオーバーになった
SceneBattle.prototype.notifyGameover = function(){
	if (this.currentSubScene() instanceof SceneBattleMain) {
		this.changeSubScene("gameover");
	}
};

// 次のステージが存在するか否か
SceneBattle.prototype.hasNextStage = function(){
	return(BACKGROUND_IMAGES[this.stage_no + 1] ? true : false);
};

// 次のステージへ遷移
SceneBattle.prototype.changeNextStage = function(){
	this.core.scene_manager.changeScene("battle", this.stage_no + 1);
};

// 現在のステージをやり直す
SceneBattle.prototype.restart = function(){
	this.core.scene_manager.changeScene("battle", this.stage_no);
};



SceneBattle.prototype.update = function(){
	BaseScene.prototype.update.apply(this, arguments);

	this.spellcard_anime.update();

	// P は時間経過で自動回復する
	if (this.frame_count % CONSTANT.FRAME_TO_RECOVER_P === 0) {
		if (this.p_num < CONSTANT.P_MAX) {
			this.p_num += 1;
		}
	}

	// 時を止めてる時間を経過させる
	if (this._remaining_timestop_frame > 0) {
		this._remaining_timestop_frame--;
	}

	// 時を止めるスペカが使えるようになるまでの残り時間をへらす
	if (!this.isTimeStop() && this._remaining_time_to_use_timestop_frame > 0) {
		this._remaining_time_to_use_timestop_frame--;
	}

	// スペルカードが使えれば、スペルカードボタンを有効にする
	if(this._canSpellCard()) {
		this._spellcard_button.imageName("btn_spell_on");
	}
	else {
		this._spellcard_button.imageName("btn_spell_off");
	}

	// 左クリック位置を出力
	if (CONSTANT.DEBUG) {
		if(this.core.input_manager.isLeftClickPush()) {
			var x = this.core.input_manager.mousePositionX();
			var y = this.core.input_manager.mousePositionY();

			console.log("x: " + x + ", y: " + y);
		}
	}
};

SceneBattle.prototype.draw = function(){
	var ctx = this.core.ctx;

	// 背景
	var bg_name = BACKGROUND_IMAGES[this.stage_no];
	var bg_image = this.core.image_loader.getImage(bg_name);
	ctx.save();
	ctx.translate(this.width/2, this.height/2);
	ctx.drawImage(bg_image, -bg_image.width/2, -bg_image.height/2);
	ctx.restore();

	// Pの表示 現在
	ctx.save();
	ctx.font = "36px 'MyFont'";
	ctx.textAlign = "center";
	ctx.textBaseline = "middle";

	ctx.strokeStyle = Util.hexToRGBString("#FFFFFF");
	ctx.lineWidth = 4.0;
	ctx.strokeText(this.p_num, 639, 36);

	ctx.fillStyle = Util.hexToRGBString("#945ae8");
	ctx.fillText(this.p_num, 639, 36);

	ctx.restore();

	// Pの表示 最大
	ctx.save();
	ctx.font = "36px 'MyFont'";
	ctx.textAlign = "center";
	ctx.textBaseline = "middle";

	ctx.fillStyle = Util.hexToRGBString("#141e46");
	ctx.fillText("/" + CONSTANT.P_MAX + "P", 740, 35);

	ctx.restore();

	// 各種オブジェクトやサブシーンの描画
	BaseScene.prototype.draw.apply(this, arguments);

	// スペルカード演出
	if (this._is_show_spellcard_anime) {
		this.spellcard_anime.draw();
	}
};

module.exports = SceneBattle;
