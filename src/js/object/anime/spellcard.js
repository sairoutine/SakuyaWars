'use strict';

// スペルカードアニメ SpriteStudio JSON
var AnimeJson = require('./spell_anime_1');

var BaseObject = require('../../hakurei').Object.Base;
var Util = require('../../hakurei').Util;

var SsaPlayer = require('../../vendor/SsaPlayer');

var SsImageList = SsaPlayer.SsImageList;
var SsAnimation = SsaPlayer.SsAnimation;
var SsSprite = SsaPlayer.SsSprite;

// アニメの index は 0 固定
var DATA_INDEX = 0;

var SsAnimeBase = function(scene) {
	BaseObject.apply(this, arguments);

	this.ss = new SsSprite();

	this.anime_frame = 0;
	this.loop_count = 0;
};
Util.inherit(SsAnimeBase, BaseObject);

SsAnimeBase.prototype.init = function(){
	BaseObject.prototype.init.apply(this, arguments);

	var jsonData = AnimeJson;
	this.imageList = this._getImageList(jsonData[DATA_INDEX].images);

	this.changeAnimation();
};

SsAnimeBase.prototype.changeAnimation = function() {
	this.anime_frame = 0;
	this.loop_count = 0;

	var jsonData = AnimeJson;

	this._canvas_width = jsonData[DATA_INDEX].animation.CanvasWidth;
	if(this._canvas_width < jsonData[DATA_INDEX].animation.MarginWidth) {
		this._canvas_width = jsonData[DATA_INDEX].animation.MarginWidth;
	}
	this._canvas_height = jsonData[DATA_INDEX].animation.CanvasHeight;
	if(this._canvas_height < jsonData[DATA_INDEX].animation.MarginHeight) {
		this._canvas_height = jsonData[DATA_INDEX].animation.MarginHeight;
	}

	this.animation = new SsAnimation(jsonData[DATA_INDEX].animation, this.imageList);

	this.ss.setAnimation(this.animation);

	// canvas 内での位置調整
	this.ss.x = jsonData[DATA_INDEX].animation.MarginWidth * this.scaleWidth();
	this.ss.y = jsonData[DATA_INDEX].animation.MarginHeight * this.scaleHeight();

	return true;
};

SsAnimeBase.prototype.playAnimationOnce = function(_callback){
	var ss = this.ss;
	//var max_loop = ss.getLoop();

	// アニメーション後のコールバック
	if (typeof _callback !== "undefined") {
		var callback = function () {
			ss.setEndCallBack(null);
			// 1 -> 0に戻すと、またアニメが無限ループしちゃうので
			//ss.setLoop(max_loop);
			_callback();
		};

		ss.setEndCallBack(callback);
	}
	else {
		ss.setEndCallBack(null);
	}

	this.ss.setLoop(1);
	this.changeAnimation();
};

SsAnimeBase.prototype.playAnimationInfinity = function(){
	this.ss.setLoop(0);
	this.changeAnimation();
};

// sprite studio 用の SsImageList 代替オブジェクトを生成
SsAnimeBase.prototype._getImageList = function (imageFiles) {
	var imageList = new SsImageList([], "");

	for (var i = 0; i < imageFiles.length; i++) {
		var image_file_name = imageFiles[i];

		// 拡張子を取り除く
		var image_name_and_ext = image_file_name.split(/(?=\.[^.]+$)/);

		imageList.imagePaths[i] = null;
		imageList.images[i] = this.core.image_loader.getImage(image_name_and_ext[0]);
	}

	return imageList;
};

SsAnimeBase.prototype.getFrameNo = function(){
	return Math.floor(this.anime_frame);
};

SsAnimeBase.prototype.update = function(){
	BaseObject.prototype.update.apply(this, arguments);

	// update ss state
	this.ss.rootScaleX = this.scaleWidth();
	this.ss.rootScaleY = this.scaleHeight();

	this._updateCurrentAnimeFrameNo();
};

// 画面更新
SsAnimeBase.prototype.draw = function(){
	BaseObject.prototype.draw.apply(this, arguments);
	if (!this.isShow()) return;
	var ctx = this.core.ctx;

	var frame_no = this.getFrameNo();
	var canvas = this._getAnimeImage(frame_no);

	// draw
	ctx.save();
	ctx.translate(this.x(), this.y());
	ctx.drawImage(canvas, -this.width()/2, -this.height()/2);

	ctx.restore();
};

SsAnimeBase.prototype._updateCurrentAnimeFrameNo = function() {
	var max_frame = this.ss.inner.animation.getFrameCount();

	// 何も表示しないアニメだと、frameの最大数が 0になる(何も描画しなくてよい)
	if (max_frame === 0) {
		return;
	}

	var max_loop = this.ss.inner.loop;
	if (max_loop === 0) {
		this.anime_frame += this.ss.inner.animation.getFPS() / 60;
		this.anime_frame %= max_frame;
	}
	else if(this.loop_count < max_loop) {
		this.anime_frame += this.ss.inner.animation.getFPS() / 60;

		// 最終フレームを再生し終えたら
		if (this.anime_frame >= max_frame - 1) {
			this.loop_count++;

			// 最終ループに達してしまったら
			if (this.loop_count >= max_loop) {
				// 停止時コールバック呼び出し
				if (this.ss.inner.endCallBack != null) {
					this.ss.inner.endCallBack();
				}
			}
		}

		this.anime_frame %= max_frame;
	}
};

SsAnimeBase.prototype._getAnimeImage = function(frame_no){
	// create canvas
	var canvas = document.createElement('canvas');
	canvas.width  = this.width();
	canvas.height = this.height();
	var ctx2 = canvas.getContext('2d');

	// こうしないとなぜかエラーになる場合がある
	if(!this.ss.inner.animation.ssaData.ssa[frame_no]) {
		return canvas;
	}

	this.ss.inner.animation.drawFunc(ctx2, frame_no, this.ss.x, this.ss.y, this.ss.flipH, this.ss.flipV, this.ss.inner.partStates, this.ss.rootScaleX, this.ss.rootScaleY);

	return canvas;
};
SsAnimeBase.prototype.width = function() {
	return this._canvas_width * this.scaleWidth();
};
SsAnimeBase.prototype.height = function() {
	return this._canvas_height * this.scaleHeight();
};

SsAnimeBase.prototype.isShow = function(){
	// 何も表示しないアニメだと、frameの最大数が 0になる(何も描画しなくてよい)
	return this.ss.inner.animation.getFrameCount() > 0 ? true : false;
};
SsAnimeBase.prototype.jsonAnimeMap = function() {
	return {};
};

SsAnimeBase.prototype.scaleWidth = function(){
	return 1;
};
SsAnimeBase.prototype.scaleHeight = function(){
	return 1;
};

module.exports = SsAnimeBase;
