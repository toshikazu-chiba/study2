$(function () {

	// スマホ:スライドメニュー
	var SlideMenu = function (handler, content, contentWidth) {
		// イベントハンドラー
		this.handler = $(handler);
		// スライドメニューのセレクタ
		this.content = $(content);
		// スライドメニューの幅
		this.contentWidth = contentWidth;
		// オーバーレイヤーを開く
		this.openOverlayer = new Overlayer(this.handler, 'open');
		// オーバーレイヤーを閉じる
		this.closeOverlayer = new Overlayer(this.handler, 'close');
	}

	SlideMenu.prototype = {
		// イベントのアクティブ・非アクティブ状態のフラグ
		activeFlg: false
		// スライドの移動量
		,slideVolume: this.contentWidth
		// スライドスピード
		,slideSpeed: 500

		,run: function () {
			SlideMenu.prototype.mainProcess();
		}

		,mainProcess: function () {
			this.handler.on('click', function () {
				// スライドを開く
				if (!SlideMenu.prototype.activeFlg) {
					SlideMenu.prototype.open();
				// スライドを閉じる
				} else if (SlideMenu.prototype.activeFlg) {
					SlideMenu.prototype.open();
				}
			});
		}

		// スライドを開く
		,open: function () {
			SlideMenu.prototype.content.animate({
				right: 0
			}, SlideMenu.prototype.slideSpeed);
			SlideMenu.prototype.openOverlayer;
			SlideMenu.prototype.activeFlg = true;
		}

		// スライドを閉じる
		,close: function () {
			SlideMenu.prototype.content.animate({
				right: SlideMenu.prototype.slideVolume
			}, SlideMenu.prototype.slideSpeed);
			SlideMenu.prototype.closeOverlayer;
			SlideMenu.prototype.activeFlg = false;
		}
	};

	// オーバーレイヤー
	var Overlayer = function (handler, actionType) {
		// イベントハンドラー
		this.handler = $(handler);
		// アクティブ・非アクティブの設定
		this.actionType = actionType;
	}

	Overlayer.prototype = {

		// イベントのアクティブ・非アクティブ状態のフラグ
		activeFlg: false
		// オーバーレイヤーのセレクター
		,currentDom: $('.overlayer')

		,run: function () {
			Overlayer.prototype.mainProcess();
		}
		,mainProcess: function () {

			this.handler.on('click', function () {
				// オーバーレイヤーを開く
				if (!SlideMenu.prototype.activeFlg) {
					Overlayer.prototype.open();
				// オーバーレイヤーを閉じる
				} else if (SlideMenu.prototype.activeFlg) {
					Overlayer.prototype.open();
				}
			});
		}

		// オーバーレイヤーを開く
		,open: function () {
			$(this).removeClass('active');
			Overlayer.prototype.activeFlg = true;
		}

		// オーバーレイヤーを閉じる
		,close: function () {
			$(this).removeClass('active');
			Overlayer.prototype.activeFlg = false;
		}
	}
});

