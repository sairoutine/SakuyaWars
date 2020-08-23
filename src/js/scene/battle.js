
/*

◆ TODO:
スペルカードを使うと全体攻撃となる

デバッグ用にユニットや敵のHPを表示したい
デバッグ用にPやBを回復したい
セリフスキップを入れたい
リザルト画面
称号の組み込み
遠距離攻撃の敵、紅魔館にすぐたどり着く。。。
→ よって、一旦遠距離攻撃を削除したので、復活させる
ダメージを与えたときのエフェクトを表示する
AP表示量を表示する→ユニット

// FB1
ただ、現状通常咲夜を連打で出すだけで勝ててしまうので、妖精の攻撃力体力を増やすなどしてすこし難度をあげたほうがいいかもしれません（咲夜はいっぱい出てきて楽しい）
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

var UNIT_CLASSES = [
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
	//EnemyBlueLong,
	//EnemyBlueShort,
	EnemyPinkLong,
	EnemyPinkShort,
	//EnemyRedLong,
	//EnemyRedShort,
	EnemyWhiteLong,
	EnemyWhiteShort,
];

var Scene = function(core) {
	BaseScene.apply(this, arguments);

	// 自陣
	this.fort = new Fort(this);

	// スペルカード演出
	this.spellcard_anime = new SpellCardAnime(this);

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
	this._remaining_time_to_use_timestop_frame = 0;

	// 時を止めてる際の残り時間(frame)
	this._remaining_timestop_frame = 0;

	// スペカ演出を表示するか否か
	this._is_show_spellcard_anime = false;

	this.addObject(this.fort);
	this.addObjects(this.units);
	this.addObjects(this.enemies);
};
Util.inherit(Scene, BaseScene);

Scene.prototype.init = function(stage_no){
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
	// TODO: コンストラクタですべてのボスを初期化して、ここでは初期化しないようにしたい
	if (this.boss !== null) { // stage 2 以降は前のステージのボスを削除する
		this.removeObject(this.boss);
	}
	this.boss = new BOSS_CLASSES[this.stage_no](this);
	this.boss.init();
	this.boss.x(726);
	this.boss.y(410);
	this.addObject(this.boss);

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
	this._remaining_time_to_use_timestop_frame = 0;

	// スペカ演出を表示するか否か
	this._is_show_spellcard_anime = false;

	//this.core.scene_manager.setFadeIn(60, "white");

	this.changeSubScene("ready");
};


Scene.prototype.generateUnit = function(unit_num){
	var unit = new UNIT_CLASSES[unit_num](this);

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

Scene.prototype.generateEnemy = function(enemy_num){
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
Scene.prototype.canSpellCard = function() {
	return this._remaining_time_to_use_timestop_frame === 0;
};

// スペルカード使用
Scene.prototype.useSpellCard = function() {
	// TODO: アニメのいい感じのところで、全体にダメージ

	// 時を止めるスペカが使えるようになるまでの残り時間を戻す(frame)
	this._remaining_time_to_use_timestop_frame = CONSTANT.TIME_TO_USE_TIMESTOP_FRAME;

	// スペルカード演出を再生
	this._is_show_spellcard_anime = true;
	var self = this;
	this.spellcard_anime.playAnimationOnce(function () {
		self._is_show_spellcard_anime = false;
	});

	this._remaining_timestop_frame = CONSTANT.TIMESTOP_FRAME;
};

// 時を止めてる最中か否か
Scene.prototype.isTimeStop = function() {
	return this._remaining_timestop_frame > 0;
};

// ゲームクリアになった
Scene.prototype.notifyStageClear = function(){
	this.changeSubScene("result");
};

// ゲームオーバーになった
Scene.prototype.notifyGameover = function(){
	if (this.currentSubScene() instanceof SceneBattleMain) {
		this.changeSubScene("gameover");
	}
};

// 次のステージが存在するか否か
Scene.prototype.hasNextStage = function(){
	return(BACKGROUND_IMAGES[this.stage_no + 1] ? true : false);
};

// 次のステージへ遷移
Scene.prototype.changeNextStage = function(){
	this.core.scene_manager.changeScene("battle", this.stage_no + 1);
};

// 現在のステージをやり直す
Scene.prototype.restart = function(){
	this.core.scene_manager.changeScene("battle", this.stage_no);
};



Scene.prototype.update = function(){
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

	// 左クリック位置を出力
	if (CONSTANT.DEBUG) {
		if(this.core.input_manager.isLeftClickPush()) {
			var x = this.core.input_manager.mousePositionX();
			var y = this.core.input_manager.mousePositionY();

			console.log("x: " + x + ", y: " + y);
		}
	}
};

Scene.prototype.draw = function(){
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

module.exports = Scene;
