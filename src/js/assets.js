'use strict';

// ゲームに必要な素材

var AssetsConfig = {};
AssetsConfig.images = {
	"logo": "./image/logo.png",
	"title": "./image/title.png",

	"battle_bg1": "./image/UI_Battle_bg1.jpg",
	"battle_bg2": "./image/UI_Battle_bg2.jpg",
	"battle_bg3": "./image/UI_Battle_bg3.jpg",
	"battle_bg4": "./image/UI_Battle_bg4.jpg",

	"ed_illust1": "./image/ed/ED1.png",
	"ed_illust2": "./image/ed/ED2.png",
	"ed_illust3": "./image/ed/ED3.png",
	"ed_illust4": "./image/ed/ED4.png",

	// http://commons.nicovideo.jp/material/nc215570
	"explosion": "./image/explosion.jpg",
	"gameover": "./image/gameover.jpg",

	"fort": "./image/koumakan_01.png",
	"SS_Battle_spell1": "./image/SS_Battle_spell1.png",

	"btn_arrow_l": "./image/UI_Battle_btn_arrow_l.png",
	"btn_arrow_r": "./image/UI_Battle_btn_arrow_r.png",
	"btn_spell_on": "./image/UI_Battle_btn_spell_on.png",
	"btn_spell_off": "./image/UI_Battle_btn_spell_off.png",

	"btn_icon_sakuya_bazooka": "./image/UI_Battle_icon_Sakuya_bazooka.png",
	"btn_icon_sakuya_meisaku": "./image/UI_Battle_icon_Sakuya_meisaku.png",
	"btn_icon_sakuya_normalenkyori": "./image/UI_Battle_icon_Sakuya_normalenkyori.png",
	"btn_icon_sakuya_normalkinkyori": "./image/UI_Battle_icon_Sakuya_normalkinkyori.png",
	"btn_icon_sakuya_tea": "./image/UI_Battle_icon_Sakuya_tea.png",
	"btn_icon_sakuya_mmd": "./image/UI_Battle_icon_Sakuya_MMD.png",
	"btn_icon_sakuya_magic": "./image/UI_Battle_icon_Sakuya_magic.png",
	"btn_icon_sakuya_mandoragora": "./image/UI_Battle_icon_Sakuya_mandoragora.png",
	"btn_icon_sakuya_tupai": "./image/UI_Battle_icon_Sakuya_tupai.png",
	"btn_icon_sakuya_yoyomu": "./image/UI_Battle_icon_Sakuya_yoyomu.png",

	// --- ユニット
	"unit_kinkyori_attack1": "./image/units/kinkyori/Sakuya_normalkinkyori_attack_01.png",
	"unit_kinkyori_attack2": "./image/units/kinkyori/Sakuya_normalkinkyori_attack_02.png",
	"unit_kinkyori_damage": "./image/units/kinkyori/Sakuya_normalkinkyori_damage_01.png",
	"unit_kinkyori_stand": "./image/units/kinkyori/Sakuya_normalkinkyori_stand_01.png",
	"unit_kinkyori_walk1": "./image/units/kinkyori/Sakuya_normalkinkyori_walk_01.png",
	"unit_kinkyori_walk2": "./image/units/kinkyori/Sakuya_normalkinkyori_walk_02.png",

	// --- 敵
	"enemy_blue_long_attack": "./image/enemy/blue_long/Enemy_blul_attack_01.png",
	"enemy_blue_long_damage": "./image/enemy/blue_long/Enemy_blul_damage_01.png",
	"enemy_blue_long_walk01": "./image/enemy/blue_long/Enemy_blul_walk_01.png",
	"enemy_blue_long_walk02": "./image/enemy/blue_long/Enemy_blul_walk_02.png",

	"enemy_blue_short_attack": "./image/enemy/blue_short/Enemy_blus_attack_01.png",
	"enemy_blue_short_damage": "./image/enemy/blue_short/Enemy_blus_damage_01.png",
	"enemy_blue_short_walk01": "./image/enemy/blue_short/Enemy_blus_walk_01.png",
	"enemy_blue_short_walk02": "./image/enemy/blue_short/Enemy_blus_walk_02.png",

	"enemy_pink_long_attack": "./image/enemy/pink_long/Enemy_pnkl_attack_01.png",
	"enemy_pink_long_damage": "./image/enemy/pink_long/Enemy_pnkl_damage_01.png",
	"enemy_pink_long_walk01": "./image/enemy/pink_long/Enemy_pnkl_walk_01.png",
	"enemy_pink_long_walk02": "./image/enemy/pink_long/Enemy_pnkl_walk_02.png",

	"enemy_pink_short_attack": "./image/enemy/pink_short/Enemy_blus_attack_01.png",
	"enemy_pink_short_damage": "./image/enemy/pink_short/Enemy_blus_damage_01.png",
	"enemy_pink_short_walk01": "./image/enemy/pink_short/Enemy_blus_walk_01.png",
	"enemy_pink_short_walk02": "./image/enemy/pink_short/Enemy_blus_walk_02.png",

	"enemy_red_long_attack": "./image/enemy/red_long/Enemy_redl_attack_01.png",
	"enemy_red_long_damage": "./image/enemy/red_long/Enemy_redl_damage_01.png",
	"enemy_red_long_walk01": "./image/enemy/red_long/Enemy_redl_walk_01.png",
	"enemy_red_long_walk02": "./image/enemy/red_long/Enemy_redl_walk_02.png",

	"enemy_red_short_attack": "./image/enemy/red_short/Enemy_reds_attack_01.png",
	"enemy_red_short_damage": "./image/enemy/red_short/Enemy_reds_damage_01.png",
	"enemy_red_short_walk01": "./image/enemy/red_short/Enemy_reds_walk_01.png",
	"enemy_red_short_walk02": "./image/enemy/red_short/Enemy_reds_walk_02.png",

	"enemy_white_long_attack": "./image/enemy/white_long/Enemy_whtl_attack_01.png",
	"enemy_white_long_damage": "./image/enemy/white_long/Enemy_whtl_damage_01.png",
	"enemy_white_long_walk01": "./image/enemy/white_long/Enemy_whtl_walk_01.png",
	"enemy_white_long_walk02": "./image/enemy/white_long/Enemy_whtl_walk_02.png",

	"enemy_white_short_attack": "./image/enemy/white_short/Enemy_whts_attack_01.png",
	"enemy_white_short_damage": "./image/enemy/white_short/Enemy_whts_damage_01.png",
	"enemy_white_short_walk01": "./image/enemy/white_short/Enemy_whts_walk_01.png",
	"enemy_white_short_walk02": "./image/enemy/white_short/Enemy_whts_walk_02.png",

	// --- ボス

	// クラウンピース
	"boss_clownpiece_normal": "./image/boss/BOSS_clownpiece_normal_01.png",
	"boss_clownpiece_damage": "./image/boss/BOSS_clownpiece_damage_01.png",

	// ルナチャイルド
	"boss_lunachild_normal": "./image/boss/BOSS_luna_normal_01.png",
	"boss_lunachild_damage": "./image/boss/BOSS_luna_damage_01.png",

	// スターサファイア
	"boss_starsapphire_normal": "./image/boss/BOSS_star_normal_01.png",
	"boss_starsapphire_damage": "./image/boss/BOSS_star_damage_01.png",

	// スターサファイア
	"boss_sunnymilk_normal": "./image/boss/BOSS_sunny_normal_01.png",
	"boss_sunnymilk_damage": "./image/boss/BOSS_sunny_damage_01.png",
};

AssetsConfig.sounds = {
};

AssetsConfig.bgms = {
};

AssetsConfig.fonts = {
	"MyFont": {
		path: "LightNovelPop.ttf",
		format: "truetype",
	},
};


module.exports = AssetsConfig;
