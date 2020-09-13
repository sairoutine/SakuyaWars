'use strict';
var Util = require('../hakurei').Util;
var BaseObject = require('../hakurei').Object.Base;
var CONSTANT = require('../constant');

// ミッションカテゴリ 定数一覧
var MISSION_CATEGORY_DESTROY_ENEMY                   = 0; //*敵をX体以上撃破
var MISSION_CATEGORY_DESTROY_MAX_ENEMY_PER_UNIT_TYPE = 1; //*1ユニットで敵をX体以上撃破
var MISSION_CATEGORY_DIE_UNIT                        = 2; //*咲夜がN体死亡
var MISSION_CATEGORY_ELAPSE_TIME                     = 3; //*X秒以下で1ステージクリア
var MISSION_CATEGORY_NOT_DIE_UNIT                    = 4; //*咲夜をひとりも死亡させず1ステージクリア
var MISSION_CATEGORY_NOT_USE_SPELLCARD               = 5; //*スペルを一度も使用せず1ステージクリア
var MISSION_CATEGORY_RESTRICT_UNIT_TYPE              = 6; //*○○咲夜のみで1ステージクリア
var MISSION_CATEGORY_USE_UNIT_TYPE                   = 7; //*○○咲夜をN体使用

var MISSION_CATEGORY_CRITERIA = {};
//*敵をX体以上撃破
MISSION_CATEGORY_CRITERIA[MISSION_CATEGORY_DESTROY_ENEMY] = function (mission_manager, parameters) {
	return mission_manager.killed_enemy_num_all >= parameters[0];
};
//*1ユニットで敵をX体以上撃破
MISSION_CATEGORY_CRITERIA[MISSION_CATEGORY_DESTROY_MAX_ENEMY_PER_UNIT_TYPE] = function (mission_manager, parameters) {
	var max_killed_enemy_num_per_unit_type = 0;
	for (var unit_type in mission_manager.killed_enemy_num_per_unit_type) {
		var killed_enemy_num = mission_manager.killed_enemy_num_per_unit_type[unit_type] || 0;
		if (killed_enemy_num >= max_killed_enemy_num_per_unit_type) {
			max_killed_enemy_num_per_unit_type = killed_enemy_num;
		}
	}

	return max_killed_enemy_num_per_unit_type >= parameters[0];
};
//*咲夜がN体死亡
MISSION_CATEGORY_CRITERIA[MISSION_CATEGORY_DIE_UNIT] = function (mission_manager, parameters) {
	return mission_manager.unit_died_num >= parameters[0];
};
//*X秒以下で1ステージクリア
MISSION_CATEGORY_CRITERIA[MISSION_CATEGORY_ELAPSE_TIME] = function (mission_manager, parameters) {
	return mission_manager.elapsed_time <= parameters[0];
};
//*咲夜をひとりも死亡させず1ステージクリア
MISSION_CATEGORY_CRITERIA[MISSION_CATEGORY_NOT_DIE_UNIT] = function (mission_manager, parameters) {
	return mission_manager.unit_died_num === 0;
};
//*スペルを一度も使用せず1ステージクリア
MISSION_CATEGORY_CRITERIA[MISSION_CATEGORY_NOT_USE_SPELLCARD] = function (mission_manager, parameters) {
	return mission_manager.used_spellcard_num === 0;
};
//*○○咲夜のみで1ステージクリア
MISSION_CATEGORY_CRITERIA[MISSION_CATEGORY_RESTRICT_UNIT_TYPE] = function (mission_manager, parameters) {
	// 該当のユニットは必ず1度は使っていないとダメ
	var used_unit_num1 = mission_manager.used_unit_num_per_unit_type[parameters[0]] || 0;
	if (used_unit_num1 === 0) {
		return false;
	}

	// 該当のユニット以外は使っていたらダメ
	for (var unit_type in mission_manager.used_unit_num_per_unit_type) {
		var used_unit_num2 = mission_manager.used_unit_num_per_unit_type[unit_type] || 0;
		if (unit_type !== parameters[0]) {
			if (used_unit_num2 > 0) {
				return false;
			}
		}
	}

	return true;
};
//*○○咲夜をN体使用
MISSION_CATEGORY_CRITERIA[MISSION_CATEGORY_USE_UNIT_TYPE] = function (mission_manager, parameters) {
	var used_unit_num = mission_manager.used_unit_num_per_unit_type[parameters[0]] || 0;
	return used_unit_num >= parameters[1];
};

// ミッション一覧
var MISSIONS = [
	{
		"name": "まずは抱えボムをなくせ",
		"category": MISSION_CATEGORY_DIE_UNIT,
		"bonus": 2,
		"parameters": [20],
	},
	{
		"name": "なんてこった！咲夜がピチュっちゃった！",
		"category": MISSION_CATEGORY_DIE_UNIT,
		"bonus": 3,
		"parameters": [10],
	},
	{
		"name": "紅魔館は燃えているか",
		"category": MISSION_CATEGORY_DIE_UNIT,
		"bonus": 4,
		"parameters": [5],
	},
	{
		"name": "私の屍を越えてゆけ",
		"category": MISSION_CATEGORY_DIE_UNIT,
		"bonus": 5,
		"parameters": [3],
	},

	{
		"name": "散弾ではなぁ！",
		"category": MISSION_CATEGORY_USE_UNIT_TYPE,
		"bonus": 2,
		"parameters": [CONSTANT.UNIT_TYPE_BAZOOKA, 1],
	},
	{
		"name": "マグネット・コーティング",
		"category": MISSION_CATEGORY_USE_UNIT_TYPE,
		"bonus": 3,
		"parameters": [CONSTANT.UNIT_TYPE_BAZOOKA, 5],
	},
	{
		"name": "君は刻の涙を見る",
		"category": MISSION_CATEGORY_USE_UNIT_TYPE,
		"bonus": 4,
		"parameters": [CONSTANT.UNIT_TYPE_BAZOOKA, 10],
	},
	{
		"name": "こんなにうれしいことはない",
		"category": MISSION_CATEGORY_USE_UNIT_TYPE,
		"bonus": 5,
		"parameters": [CONSTANT.UNIT_TYPE_BAZOOKA, 20],
	},

	{
		"name": "ムー大陸に投稿",
		"category": MISSION_CATEGORY_USE_UNIT_TYPE,
		"bonus": 2,
		"parameters": [CONSTANT.UNIT_TYPE_TUPAI, 1],
	},
	{
		"name": "出た！？出っ歯の妖怪",
		"category": MISSION_CATEGORY_USE_UNIT_TYPE,
		"bonus": 3,
		"parameters": [CONSTANT.UNIT_TYPE_TUPAI, 5],
	},
	{
		"name": "遊星からの吸血鬼X",
		"category": MISSION_CATEGORY_USE_UNIT_TYPE,
		"bonus": 4,
		"parameters": [CONSTANT.UNIT_TYPE_TUPAI, 10],
	},
	{
		"name": "ばちこん☆",
		"category": MISSION_CATEGORY_USE_UNIT_TYPE,
		"bonus": 5,
		"parameters": [CONSTANT.UNIT_TYPE_TUPAI, 20],
	},

	{
		"name": "赤いマフラー",
		"category": MISSION_CATEGORY_USE_UNIT_TYPE,
		"bonus": 2,
		"parameters": [CONSTANT.UNIT_TYPE_YOYOMU, 1],
	},
	{
		"name": "春を求めて",
		"category": MISSION_CATEGORY_USE_UNIT_TYPE,
		"bonus": 3,
		"parameters": [CONSTANT.UNIT_TYPE_YOYOMU, 5],
	},
	{
		"name": "ファンタズム",
		"category": MISSION_CATEGORY_USE_UNIT_TYPE,
		"bonus": 4,
		"parameters": [CONSTANT.UNIT_TYPE_YOYOMU, 10],
	},
	{
		"name": "パーフェクトチェリーブロッサム",
		"category": MISSION_CATEGORY_USE_UNIT_TYPE,
		"bonus": 5,
		"parameters": [CONSTANT.UNIT_TYPE_YOYOMU, 20],
	},

	{
		"name": "パチュリーのへそくり",
		"category": MISSION_CATEGORY_USE_UNIT_TYPE,
		"bonus": 2,
		"parameters": [CONSTANT.UNIT_TYPE_MANDORAGORA, 1],
	},
	{
		"name": "耳を塞げ",
		"category": MISSION_CATEGORY_USE_UNIT_TYPE,
		"bonus": 3,
		"parameters": [CONSTANT.UNIT_TYPE_MANDORAGORA, 5],
	},
	{
		"name": "うちの地元じゃマンドレイク",
		"category": MISSION_CATEGORY_USE_UNIT_TYPE,
		"bonus": 4,
		"parameters": [CONSTANT.UNIT_TYPE_MANDORAGORA, 10],
	},
	{
		"name": "お薬増やしましょう",
		"category": MISSION_CATEGORY_USE_UNIT_TYPE,
		"bonus": 5,
		"parameters": [CONSTANT.UNIT_TYPE_MANDORAGORA, 20],
	},

	{
		"name": "青色の紅茶",
		"category": MISSION_CATEGORY_USE_UNIT_TYPE,
		"bonus": 2,
		"parameters": [CONSTANT.UNIT_TYPE_TEA, 1],
	},
	{
		"name": "スコーンはまだ？",
		"category": MISSION_CATEGORY_USE_UNIT_TYPE,
		"bonus": 3,
		"parameters": [CONSTANT.UNIT_TYPE_TEA, 5],
	},
	{
		"name": "七色の紅茶",
		"category": MISSION_CATEGORY_USE_UNIT_TYPE,
		"bonus": 4,
		"parameters": [CONSTANT.UNIT_TYPE_TEA, 10],
	},
	{
		"name": "メイド、図書館、永遠に",
		"category": MISSION_CATEGORY_USE_UNIT_TYPE,
		"bonus": 5,
		"parameters": [CONSTANT.UNIT_TYPE_TEA, 20],
	},

	{
		"name": "タネなし手品",
		"category": MISSION_CATEGORY_USE_UNIT_TYPE,
		"bonus": 2,
		"parameters": [CONSTANT.UNIT_TYPE_MAGICIAN, 1],
	},
	{
		"name": "フーディーニ再臨",
		"category": MISSION_CATEGORY_USE_UNIT_TYPE,
		"bonus": 3,
		"parameters": [CONSTANT.UNIT_TYPE_MAGICIAN, 5],
	},
	{
		"name": "ハンドパワ～～",
		"category": MISSION_CATEGORY_USE_UNIT_TYPE,
		"bonus": 4,
		"parameters": [CONSTANT.UNIT_TYPE_MAGICIAN, 10],
	},
	{
		"name": "メンタリズムではありません",
		"category": MISSION_CATEGORY_USE_UNIT_TYPE,
		"bonus": 5,
		"parameters": [CONSTANT.UNIT_TYPE_MAGICIAN, 20],
	},

	{
		"name": "いつもの",
		"category": MISSION_CATEGORY_USE_UNIT_TYPE,
		"bonus": 2,
		"parameters": [CONSTANT.UNIT_TYPE_NORMAL1, 1],
	},
	{
		"name": "原作のような安心感",
		"category": MISSION_CATEGORY_USE_UNIT_TYPE,
		"bonus": 3,
		"parameters": [CONSTANT.UNIT_TYPE_NORMAL1, 10],
	},
	{
		"name": "月面人説",
		"category": MISSION_CATEGORY_USE_UNIT_TYPE,
		"bonus": 4,
		"parameters": [CONSTANT.UNIT_TYPE_NORMAL1, 20],
	},
	{
		"name": "吸血鬼ハンター説",
		"category": MISSION_CATEGORY_USE_UNIT_TYPE,
		"bonus": 5,
		"parameters": [CONSTANT.UNIT_TYPE_NORMAL1, 40],
	},

	{
		"name": "なんか書いとけ",
		"category": MISSION_CATEGORY_USE_UNIT_TYPE,
		"bonus": 2,
		"parameters": [CONSTANT.UNIT_TYPE_NORMAL2, 1],
	},
	{
		"name": "射幸心を煽るメッセージを挿入",
		"category": MISSION_CATEGORY_USE_UNIT_TYPE,
		"bonus": 3,
		"parameters": [CONSTANT.UNIT_TYPE_NORMAL2, 8],
	},
	{
		"name": "なんか書いとけ",
		"category": MISSION_CATEGORY_USE_UNIT_TYPE,
		"bonus": 4,
		"parameters": [CONSTANT.UNIT_TYPE_NORMAL2, 15],
	},
	{
		"name": "sm7905073",
		"category": MISSION_CATEGORY_USE_UNIT_TYPE,
		"bonus": 5,
		"parameters": [CONSTANT.UNIT_TYPE_NORMAL2, 30],
	},

	{
		"name": "モデリング：ゆたろう",
		"category": MISSION_CATEGORY_USE_UNIT_TYPE,
		"bonus": 2,
		"parameters": [CONSTANT.UNIT_TYPE_MMD, 1],
	},
	{
		"name": "good apple",
		"category": MISSION_CATEGORY_USE_UNIT_TYPE,
		"bonus": 3,
		"parameters": [CONSTANT.UNIT_TYPE_MMD, 2],
	},
	{
		"name": "細かすぎて伝わらない",
		"category": MISSION_CATEGORY_USE_UNIT_TYPE,
		"bonus": 4,
		"parameters": [CONSTANT.UNIT_TYPE_MMD, 3],
	},
	{
		"name": "紳士の社交場",
		"category": MISSION_CATEGORY_USE_UNIT_TYPE,
		"bonus": 5,
		"parameters": [CONSTANT.UNIT_TYPE_MMD, 4],
	},

	{
		"name": "めーさく劇場",
		"category": MISSION_CATEGORY_USE_UNIT_TYPE,
		"bonus": 2,
		"parameters": [CONSTANT.UNIT_TYPE_MEISAKU, 1],
	},
	{
		"name": "日本めーさく劇場",
		"category": MISSION_CATEGORY_USE_UNIT_TYPE,
		"bonus": 3,
		"parameters": [CONSTANT.UNIT_TYPE_MEISAKU, 5],
	},
	{
		"name": "世界めーさく劇場",
		"category": MISSION_CATEGORY_USE_UNIT_TYPE,
		"bonus": 4,
		"parameters": [CONSTANT.UNIT_TYPE_MEISAKU, 10],
	},
	{
		"name": "さくめーもいいぞ。",
		"category": MISSION_CATEGORY_USE_UNIT_TYPE,
		"bonus": 5,
		"parameters": [CONSTANT.UNIT_TYPE_MEISAKU, 20],
	},

	{
		"name": "地元じゃ負け知らず",
		"category": MISSION_CATEGORY_DESTROY_MAX_ENEMY_PER_UNIT_TYPE,
		"bonus": 2,
		"parameters": [3],
	},
	{
		"name": "ワンマンアーミー",
		"category": MISSION_CATEGORY_DESTROY_MAX_ENEMY_PER_UNIT_TYPE,
		"bonus": 3,
		"parameters": [5],
	},
	{
		"name": "お主こそ万夫不当の豪傑よ",
		"category": MISSION_CATEGORY_DESTROY_MAX_ENEMY_PER_UNIT_TYPE,
		"bonus": 4,
		"parameters": [10],
	},
	{
		"name": "完全で瀟洒な従者",
		"category": MISSION_CATEGORY_DESTROY_MAX_ENEMY_PER_UNIT_TYPE,
		"bonus": 5,
		"parameters": [20],
	},

	{
		"name": "新春かくし芸大会",
		"category": MISSION_CATEGORY_RESTRICT_UNIT_TYPE,
		"bonus": 5,
		"parameters": [CONSTANT.UNIT_TYPE_MAGICIAN],
	},
	{
		"name": "畑泥棒対策",
		"category": MISSION_CATEGORY_RESTRICT_UNIT_TYPE,
		"bonus": 5,
		"parameters": [CONSTANT.UNIT_TYPE_MANDORAGORA],
	},
	{
		"name": "もはやUMAに非ず",
		"category": MISSION_CATEGORY_RESTRICT_UNIT_TYPE,
		"bonus": 5,
		"parameters": [CONSTANT.UNIT_TYPE_TUPAI],
	},
	{
		"name": "忍者は何人じゃ？",
		"category": MISSION_CATEGORY_RESTRICT_UNIT_TYPE,
		"bonus": 5,
		"parameters": [CONSTANT.UNIT_TYPE_YOYOMU],
	},
	{
		"name": "原理としては別時間の自分を云々",
		"category": MISSION_CATEGORY_RESTRICT_UNIT_TYPE,
		"bonus": 5,
		"parameters": [CONSTANT.UNIT_TYPE_NORMAL2],
	},
	{
		"name": "それがドリームチームだ",
		"category": MISSION_CATEGORY_RESTRICT_UNIT_TYPE,
		"bonus": 5,
		"parameters": [CONSTANT.UNIT_TYPE_NORMAL1],
	},
	{
		"name": "MMD合作",
		"category": MISSION_CATEGORY_RESTRICT_UNIT_TYPE,
		"bonus": 5,
		"parameters": [CONSTANT.UNIT_TYPE_MMD],
	},

	{
		"name": "名将の采配",
		"category": MISSION_CATEGORY_NOT_DIE_UNIT,
		"bonus": 5,
		"parameters": [],
	},

	{
		"name": "あー忙しい忙しい！",
		"category": MISSION_CATEGORY_ELAPSE_TIME,
		"bonus": 2,
		"parameters": [60],
	},
	{
		"name": "お掃除が終わらないじゃない",
		"category": MISSION_CATEGORY_ELAPSE_TIME,
		"bonus": 3,
		"parameters": [45],
	},
	{
		"name": "幻想郷最速？",
		"category": MISSION_CATEGORY_ELAPSE_TIME,
		"bonus": 4,
		"parameters": [30],
	},
	{
		"name": "光速より速く動ける",
		"category": MISSION_CATEGORY_ELAPSE_TIME,
		"bonus": 5,
		"parameters": [20],
	},

	{
		"name": "タイムストッパない咲夜",
		"category": MISSION_CATEGORY_NOT_USE_SPELLCARD,
		"bonus": 3,
		"parameters": [],
	},

	{
		"name": "妖精キラー",
		"category": MISSION_CATEGORY_DESTROY_ENEMY,
		"bonus": 2,
		"parameters": [15],
	},
	{
		"name": "妖精バスター",
		"category": MISSION_CATEGORY_DESTROY_ENEMY,
		"bonus": 3,
		"parameters": [30],
	},
	{
		"name": "世紀末覇者",
		"category": MISSION_CATEGORY_DESTROY_ENEMY,
		"bonus": 4,
		"parameters": [50],
	},
	{
		"name": "いったい何の恨みがあって……",
		"category": MISSION_CATEGORY_DESTROY_ENEMY,
		"bonus": 5,
		"parameters": [100],
	},
];

var MissionManager = function(scene) {
	BaseObject.apply(this, arguments);

	// 咲夜が死亡したとき回数
	this.unit_died_num = 0;

	// 敵を倒した数
	this.killed_enemy_num_all = 0;

	// ユニットごとの敵を倒した数
	this.killed_enemy_num_per_unit_type = {};

	// ユニットごとの召喚数
	this.used_unit_num_per_unit_type = {};

	// ユニットが死んだ数
	this.unit_died_num = 0;

	// 経過時間
	this.elapsed_time = 0;

	// スペカ使用数
	this.used_spellcard_num = 0;

	// --

	// キャッシュした達成済ミッション一覧
	this._cached_accomplished_missions = [];

	// 成績に変更があって、再計算しないといけないかどうか
	this._is_cache_need_recalculation = true;
};
Util.inherit(MissionManager, BaseObject);

MissionManager.prototype.init = function(){
	BaseObject.prototype.init.apply(this, arguments);

	// 咲夜が死亡したとき回数
	this.unit_died_num = 0;

	// 敵を倒した数
	this.killed_enemy_num_all = 0;

	// ユニットごとの敵を倒した数
	this.killed_enemy_num_per_unit_type = {};

	// ユニットごとの召喚数
	this.used_unit_num_per_unit_type = {};

	// ユニットが死んだ数
	this.unit_died_num = 0;

	// 経過時間
	this.elapsed_time = 0;

	// スペカ使用数
	this.used_spellcard_num = 0;

	// --

	// キャッシュした達成済ミッション一覧
	this._cached_accomplished_missions = [];

	// 成績に変更があって、再計算しないといけないかどうか
	this._is_cache_need_recalculation = true;
};

// 咲夜が死亡したときに呼ぶ
MissionManager.prototype.notifyUnitDied = function() {
	this._is_cache_need_recalculation = true;

	this.unit_died_num++;
};

// 咲夜を生成したときに呼ぶ
MissionManager.prototype.notifyUnitGenerated = function(unit) {
	this._is_cache_need_recalculation = true;

	// 既に生成済であれば
	if (unit.type() in this.used_unit_num_per_unit_type) {
		// 加算
		this.used_unit_num_per_unit_type[unit.type()]++;
	}
	else {
		// 初期化
		this.used_unit_num_per_unit_type[unit.type()] = 1;
	}
};

// 敵を撃破したときに呼ぶ
MissionManager.prototype.notifyEnemyKilled = function(unit, enemy){
	this._is_cache_need_recalculation = true;

	// 敵を倒した数
	this.killed_enemy_num_all++;

	// 既に生成済であれば
	if (unit.type() in this.killed_enemy_num_per_unit_type) {
		// 加算
		this.killed_enemy_num_per_unit_type[unit.type()]++;
	}
	else {
		// 初期化
		this.killed_enemy_num_per_unit_type[unit.type()] = 1;
	}
};

// スペルカードを使用したときに呼ぶ
MissionManager.prototype.notifySpellCardUsed = function(){
	this._is_cache_need_recalculation = true;

	this.used_spellcard_num++;
};

// 1秒経過したときに呼ぶ
MissionManager.prototype.notifySecondsGoneBy = function(){
	this._is_cache_need_recalculation = true;

	this.elapsed_time++;
};

// リザルト画面用に、スコアのテキストと倍率の一覧を返す
MissionManager.prototype.calcAccomplishedMissions = function() {
	// キャッシュが利用可能ならそれを返して終了する
	if (!this._is_cache_need_recalculation) {
		return this._cached_accomplished_missions;
	}

	// キャッシュを再計算する必要があるので計算する
	this._cached_accomplished_missions = [];

	for (var i = 0; i < MISSIONS.length; i++) {
		var text       = MISSIONS[i].name;
		var category   = MISSIONS[i].category;
		var num        = MISSIONS[i].bonus;
		var parameters = MISSIONS[i].parameters;
		var criteria   = MISSION_CATEGORY_CRITERIA[category];

		if (!(category in MISSION_CATEGORY_CRITERIA)) {
			// ここにはこないはず
			throw new Error("Can't find category: " + category);
		}

		// 実績の条件を満たしていれば
		if (criteria(this, parameters)) {
			var bonus = new Bonus(this.scene);
			bonus.text(text);
			bonus.num(num);
			this._cached_accomplished_missions.push(bonus);
		}
	}

	this._is_cache_need_recalculation = false;

	return this._cached_accomplished_missions;
};

// そのステージで獲得したスコアを計算して返す
MissionManager.prototype.calcScore = function(time) {
	var bonus = 1;
	var accomplished_missions = this.calcAccomplishedMissions();
	for (var i = 0; i < accomplished_missions.length; i++) {
		bonus += accomplished_missions[i].num();
	}

	return 1001 * (6000-time) * bonus;
};


// 達成したボーナス
var Bonus = function(scene) {
	BaseObject.apply(this, arguments);
};
Util.inherit(Bonus, BaseObject);

Util.defineProperty(BaseObject, "text");
Util.defineProperty(BaseObject, "num");

module.exports = MissionManager;

