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
