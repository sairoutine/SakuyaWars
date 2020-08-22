'use strict';
var CONSTANT = {
	DEBUG: true,
	DEBUG_MUTE: false,
	DEBUG_SCENE: "battle",
	DEBUG_STAGE_NO: 0,

	// 時を止める時間
	TIMESTOP_FRAME: 300,
	// 時を止めるスペカを使えるようになるまでの時間
	TIME_TO_USE_TIMESTOP_FRAME: 20 * 60,

	// Pポイントの最大数
	P_MAX: 600,

	// 何フレームごとにPが回復するか
	FRAME_TO_RECOVER_P: 30,

	// ユニットの生成位置
	UNIT_GENERATED_AREA_LEFT_X:  100,
	UNIT_GENERATED_AREA_RIGHT_X: 200,
	UNIT_GENERATED_AREA_UP_Y:  400,
	UNIT_GENERATED_AREA_DOWN_Y: 500,

	// 敵の生成位置
	ENEMY_GENERATED_AREA_LEFT_X:  650,
	ENEMY_GENERATED_AREA_RIGHT_X: 700,
	ENEMY_GENERATED_AREA_UP_Y:  400,
	ENEMY_GENERATED_AREA_DOWN_Y: 500,
};
module.exports = CONSTANT;
