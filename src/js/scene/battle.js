
/*

◆ TODO:
GameClear 画像の組み込みと、スコア表示

敵のパラメータ調整
ステージごとに敵のAI調整
味方のパラメータ調整
ボスのパラメータ調整
ミッション難易度調整
スコア計算調整
フレームごとのP回復数調整
ゲームクリア画像の閾値調整
→ 軽いコストの咲夜は画面に30体くらい出せるレベル
→ 基本的に咲夜1体で妖精1体が勝つか負けるかの調整をする(相性によって勝てるし、勝てない)

oggのm4a化
アツマールにアップ
スマホでテストプレイ
テストプレイ依頼
*/




'use strict';

var BaseScene = require('../hakurei').Scene.Base;
var SceneBattleMain = require('./battle/main');
var SceneBattleReady = require('./battle/ready');
var SceneBattleGameover = require('./battle/gameover');
var SceneBattleResult = require('./battle/result');

var Fort = require('../object/fort');
var SpellCardAnime = require('../object/anime/spellcard');
var MissionManager = require('../logic/mission_manager');

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

var EnemyBlueLong = require('../object/enemy/blue_long');
var EnemyBlueShort = require('../object/enemy/blue_short');
var EnemyPinkLong = require('../object/enemy/pink_long');
var EnemyPinkShort = require('../object/enemy/pink_short');
var EnemyRedLong = require('../object/enemy/red_long');
var EnemyRedShort = require('../object/enemy/red_short');
var EnemyWhiteLong = require('../object/enemy/white_long');
var EnemyWhiteShort = require('../object/enemy/white_short');

var UIImage = require('../hakurei').Object.UI.Image;
var UIText = require('../hakurei').Object.UI.Text;
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
var UNITS_CLASSES = [
	UnitSakuyaNormal1,
	UnitSakuyaNormal2,
	UnitSakuyaTea,
	UnitSakuyaMeisaku,
	UnitSakuyaBazooka,
	UnitSakuyaMMD,
	UnitSakuyaMagician,
	UnitSakuyaMandoragora,
	UnitSakuyaTupai,
	UnitSakuyaYoyomu,
];

var ENEMY_CLASSES = [
	EnemyBlueLong,
	EnemyBlueShort,
	EnemyPinkLong,
	EnemyPinkShort,
	EnemyRedLong,
	EnemyRedShort,
	EnemyWhiteLong,
	EnemyWhiteShort,
];

var SceneBattle = function(core) {
	BaseScene.apply(this, arguments);

	// 自陣
	this.fort = new Fort(this);
	this.fort.x(90);
	this.fort.y(416);

	// ボス一覧
	this._bosses = [];
	for (var i = 0, len = BOSS_CLASSES.length; i < len; i++) {
		var boss = new BOSS_CLASSES[i](this);
		boss.x(726);
		boss.y(410);
		this._bosses.push(boss);
	}

	// スペルカード演出
	this.spellcard_anime = new SpellCardAnime(this);
	this.spellcard_anime.x(this.width/2);
	this.spellcard_anime.y(this.height/2);

	// ミッション管理
	this.mission_manager = new MissionManager(this);

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
	this.addObject(this.mission_manager);
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

	// P ポイントの数
	this.p_num = CONSTANT.P_MAX;

	// ボムの数
	this.b_num = 0;

	// 召喚した敵一覧
	this.enemies = new Container(this);

	// 召喚したユニット一覧
	this.units = new Container(this);

	// 時を止めるスペカが使えるようになるまでの残り時間(frame)
	this._remaining_time_to_use_timestop_frame = CONSTANT.TIME_TO_USE_TIMESTOP_FRAME;

	// 時を止めてる際の残り時間(frame)
	this._remaining_timestop_frame = 0;

	// スペカ演出を表示するか否か
	this._is_show_spellcard_anime = false;

	// ユニット一覧のページング位置
	this._current_paging_position = 0;

	// ---
	this.addObjects(this.enemies);
	this.addObjects(this.units);
};
Util.inherit(SceneBattle, BaseScene);

// ユニット生成ボタン生成
SceneBattle.prototype._setupUnitButtons = function() {
	var self = this;
	for (var i = 0, len = UNITS_CLASSES.length; i < len; i++) {
		var unit_per_page_no = i % UNIT_BUTTONS_POSITIONS.length;
		var x = UNIT_BUTTONS_POSITIONS[unit_per_page_no].x;
		var y = UNIT_BUTTONS_POSITIONS[unit_per_page_no].y;

		var button_image = UNITS_CLASSES[i].buttonImage();
		var consume_p = UNITS_CLASSES[i].consumedP();

		// ボタン画像
		var ui_image = (function (i) {
			return new UIImage(self, {
				imageName: button_image,
				x: x,
				y: y,
				children: [
					// 消費P
					new UIText(self, {
						text: consume_p.toString() + "P",
						textColor: "black",
						//textColor: Util.hexToRGBString("#945ae8"),
						textSize:  "18px",
						textAlign: "center",
						textFont:  "MyFont",
						lineColor: "white",
						lineWidth: 4,
						x: x,
						y: y + 35,
					}),
				],
			})
				.setMoveOnClick()
				.on("click",function () {
					// バトル開始後にしかユニット生成できない
					if (self.currentSubScene() instanceof SceneBattleMain) {
						// ユニット生成
						var is_generated = self._generateUnit(i);

						if (is_generated) {
							self.core.audio_loader.playSound("summon_unit");
						}
					}
				})
		})(i);

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
		// バトル開始後にしかページングできない
		if (self.currentSubScene() instanceof SceneBattleMain) {
			self._current_paging_position = self._current_paging_position === 0 ? 1 : 0;

			// ユニット一覧のボタンを、現在のページのものだけ表示する
			self._showUnitButtonsInCurrentPage();
		}
	};

	this._unit_paging_left_button
		.setMoveOnClick()
		.on("click", unit_paging_button_func)


	this._unit_paging_right_button
		.setMoveOnClick()
		.on("click", unit_paging_button_func)


};

// スペルカード ボタン生成
SceneBattle.prototype._setupSpellCardButton = function() {
	var self = this;
	// スペルカード ボタン
	this._spellcard_button = new UIImage(this, {
		imageName: "btn_spell_off",
		x: 86,
		y: 573.5,
	})
		.setMoveOnClick()
		.on("click", function () {
			// バトル開始後、かつスペルカードが使えるならば
			if (self.currentSubScene() instanceof SceneBattleMain && self._canSpellCard()) {
				// スペルカード発動
				self.core.audio_loader.playSound("use_spellcard");
				self._useSpellCard();
			}
		})
};



SceneBattle.prototype.init = function(stage_no){
	BaseScene.prototype.init.apply(this, arguments);

	this.stage_no = stage_no || 0;

	// デバッグ用 stage No
	if (CONSTANT.DEBUG) {
		this.stage_no = CONSTANT.DEBUG_STAGE_NO;
	}

	// スペルカード演出
	this.spellcard_anime.init();

	// 現在のボス
	this.currentBoss().init();

	// ユニット一覧のボタンを、現在のページのものだけ表示する
	this._showUnitButtonsInCurrentPage();

	// P ポイントの数
	this.p_num = CONSTANT.P_MAX;

	// ボムの数
	this.b_num = 0;

	// 召喚した敵一覧 初期化
	this.enemies.removeAllObject();

	// 召喚したユニット一覧 初期化
	this.units.removeAllObject();

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

// ユニット生成
SceneBattle.prototype._generateUnit = function(unit_num){
	var Klass = UNITS_CLASSES[unit_num];
	var unit = new Klass(this);

	// P消費できるかチェック
	if (this.p_num < unit.consumedP()) {
		return false;
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

	// ユニットを生成したことをミッション管理へ通知
	this.mission_manager.notifyUnitGenerated(unit);

	return true;
};


// 現在のステージのボス
SceneBattle.prototype.currentBoss = function() {
	return this._bosses[this.stage_no];
};


// ボスを撃破する
SceneBattle.prototype.destroyBoss = function() {
	this.currentBoss().reduceHP(this.currentBoss().maxHP());
};

// スペルカードを使用できるようにする
SceneBattle.prototype.enableSpellCard = function() {
	this._remaining_time_to_use_timestop_frame = 0;
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

	// スペルカードを使用したことをミッション管理へ通知
	this.mission_manager.notifySpellCardUsed();
};

// 敵生成
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

// 経過時間を返す
SceneBattle.prototype.getElapsedSeconds = function(){
	return this.getSubScene("main").getElapsedSeconds();
};

// 経過時間をテキストで返す
SceneBattle.prototype.getElapsedSecondsText = function(){
	return this.getSubScene("main").getElapsedSecondsText();
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

	this.currentBoss().update();
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

	// ボス描画
	this.currentBoss().draw();

	// 各種オブジェクトやサブシーンの描画
	BaseScene.prototype.draw.apply(this, arguments);

	// スペルカード演出
	if (this._is_show_spellcard_anime) {
		this.spellcard_anime.draw();
	}
};

module.exports = SceneBattle;
