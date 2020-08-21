'use strict';

var BaseScene = require('../../hakurei').Scene.Base;

var Util = require('../../hakurei').Util;

var SceneBattleBase = function(core) {
	BaseScene.apply(this, arguments);

};
Util.inherit(SceneBattleBase, BaseScene);

module.exports = SceneBattleBase;
