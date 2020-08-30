/*
まずは抱えボムをなくせ	咲夜がX体死亡	easy
なんてこった！咲夜がピチュっちゃった！		normal
紅魔館は燃えているか		hard
私の屍を越えてゆけ		lunatic
散弾ではなぁ！	バズーカ咲夜X体使用	easy
マグネット・コーティング		normal
君は刻の涙を見る		hard
こんなにうれしいことはない		lunatic
ムー大陸に投稿	ツパイ咲夜をX体使用	easy
出た！？出っ歯の妖怪		normal
遊星からの吸血鬼X		hard
ばちこん☆		lunatic
赤いマフラー	妖々夢咲夜をX体使用	easy
春を求めて		normal
ファンタズム		hard
パーフェクトチェリーブロッサム		lunatic
パチュリーのへそくり	マンドラゴラ咲夜をX体使用	easy
耳を塞げ		normal
うちの地元じゃマンドレイク		hard
お薬増やしましょう		lunatic
青色の紅茶	紅茶咲夜をX体使用	easy
スコーンはまだ？		normal
七色の紅茶		hard
メイド、図書館、永遠に		lunatic
タネなし手品	マジシャン咲夜をX体使用	easy
フーディーニ再臨		normal
ハンドパワ～～		hard
メンタリズムではありません		lunatic
いつもの	通常近距離咲夜をX体使用	easy
原作のような安心感		normal
月面人説		hard
吸血鬼ハンター説		lunatic
なんか書いとけ	通常遠距離咲夜をX体使用	easy
射幸心を煽るメッセージを挿入		normal
なんか書いとけ		hard
sm7905073		lunatic
モデリング：ゆたろう	MMD咲夜をX体使用	easy
good apple		normal
細かすぎて伝わらない		hard
紳士の社交場		lunatic
めーさく劇場	めーさく咲夜をX体使用	easy
日本めーさく劇場		normal
世界めーさく劇場		hard
さくめーもいいぞ。		lunatic
地元じゃ負け知らず	1ユニットで敵をX体以上撃破	easy
ワンマンアーミー		normal
お主こそ万夫不当の豪傑よ		hard
完全で瀟洒な従者		lunatic
新春かくし芸大会	マジシャン咲夜のみで1ステージクリア	
これは8点ですね	めーさくのみで1ステージクリア	
いったい何が始まるんです？	バズーカ咲夜のみで1ステージクリア	
畑泥棒対策	マンドラゴラのみで1ステージクリア	
もはやUMAに非ず	ツパイのみで1ステージクリア	
忍者は何人じゃ？	妖々夢咲夜のみで1ステージクリア	
原理としては別時間の自分を云々	通常遠距離のみで1ステージクリア	
それがドリームチームだ	通常近距離のみで1ステージクリア	
MMD合作	MMDのみで1ステージクリア	
名将の采配	咲夜をひとりも死亡させず1ステージクリア	
あー忙しい忙しい！	X秒以下で1ステージクリア	easy
お掃除が終わらないじゃない		normal
幻想郷最速？		hard
←光速より速く動ける		lunatic
タイムストッパない咲夜	スペルを一度も使用せず1ステージクリア	
妖精キラー	1ステージで敵をX体以上撃破	easy
妖精バスター		normal
世紀末覇者		hard
いったい何の恨みがあって……		lunatic
*/

// ミッションカテゴリ
/*
*咲夜がN体死亡
*○○咲夜をN体使用
*1ユニットで敵をX体以上撃破
*○○咲夜のみで1ステージクリア
*咲夜をひとりも死亡させず1ステージクリア
*X秒以下で1ステージクリア
*スペルを一度も使用せず1ステージクリア
*1ステージで敵をX体以上撃破
*/
'use strict';

var Util = require('../hakurei').util;
var BaseObject = require('../hakurei').Object.Base;

var MissionManager = function(scene) {
	BaseObject.apply(this, arguments);
};
Util.inherit(MissionManager, BaseObject);

MissionManager.prototype.init = function(){
	BaseObject.prototype.init.apply(this, arguments);

	// 全てのミッション達成を初期化する
	// TODO:
};

// 咲夜が死亡したときに呼ぶ
MissionManager.prototype.notifyUnitDied = function(){
//*咲夜がN体死亡
//*咲夜をひとりも死亡させず1ステージクリア
};

// 咲夜を生成したときに呼ぶ
MissionManager.prototype.notifyUnitGenerated = function(unit) {
//*○○咲夜をN体使用
//*○○咲夜のみで1ステージクリア
};

// 敵を撃破したときに呼ぶ
MissionManager.prototype.notifyEnemyKilled = function(unit, enemy){
//*1ユニットで敵をX体以上撃破
//*1ステージで敵をX体以上撃破
};

// スペルカードを使用したときに呼ぶ
MissionManager.prototype.notifySpellCardUsed = function(){
//*スペルを一度も使用せず1ステージクリア
};

// 1秒経過したときに呼ぶ
MissionManager.prototype.notifySecondsGoneBy = function(){
//*X秒以下で1ステージクリア
};

// リザルト画面用に、スコアのテキストと倍率の一覧を返す
MissionManager.prototype.calcAccomplishedMissions = function() {
	// TODO:
	return [
		{
			"text": "なんてこった！咲夜がピチュっちゃった！",
			"num": 3,
		},
		{
			"text": "なんてこった！咲夜がピチュっちゃった！",
			"num": 3,
		},
		{
			"text": "なんてこった！咲夜がピチュっちゃった！",
			"num": 3,
		},
		{
			"text": "なんてこった！咲夜がピチュっちゃった！",
			"num": 3,
		},
		{
			"text": "なんてこった！咲夜がピチュっちゃった！",
			"num": 3,
		},
		{
			"text": "なんてこった！咲夜がピチュっちゃった！",
			"num": 3,
		},
		{
			"text": "なんてこった！咲夜がピチュっちゃった！",
			"num": 3,
		},
		{
			"text": "紅魔館は燃えているか",
			"num": 3,
		},
		{
			"text": "紅魔館は燃えているか",
			"num": 3,
		},
		{
			"text": "紅魔館は燃えているか",
			"num": 3,
		},
		{
			"text": "紅魔館は燃えているか",
			"num": 3,
		},
		{
			"text": "紅魔館は燃えているか",
			"num": 3,
		},
		{
			"text": "紅魔館は燃えているか",
			"num": 3,
		},
		{
			"text": "紅魔館は燃えているか",
			"num": 3,
		},
	];
};

// そのステージで獲得したスコアを計算して返す
MissionManager.prototype.calcScore = function(time) {
	// TODO:
	return "2123456789";
};

module.exports = MissionManager;

