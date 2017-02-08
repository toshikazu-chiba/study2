// ============ オーバーレイヤー ============
// コンストラクタ
var Overlayer = function (actionType, target) {
	// アクティブ・非アクティブの設定
	this.actionType = actionType;
	this.target = target;
}

// イベントのアクティブ・非アクティブ状態のフラグ
Overlayer.prototype.activeFlg = false;
// オーバーレイヤーのセレクター
Overlayer.prototype.currentDom = '.common_overlayar';

Overlayer.prototype.run = function () {
	Overlayer.prototype.mainProcess();
}
Overlayer.prototype.mainProcess = function () {
	// オーバーレイヤーを開く
	if (!Overlayer.prototype.activeFlg) {
		Overlayer.prototype.open();
	// オーバーレイヤーを閉じる
	} else if (Overlayer.prototype.activeFlg) {
		Overlayer.prototype.close();
	}
}

// オーバーレイヤーを開く
Overlayer.prototype.open = function () {
	$(Overlayer.prototype.currentDom).addClass('active');
	Overlayer.prototype.activeFlg = true;
}

// オーバーレイヤーを閉じる
Overlayer.prototype.close = function () {
	$(Overlayer.prototype.currentDom).removeClass('active');
	Overlayer.prototype.activeFlg = false;
}

// ============ スマホ:スライドメニュー ============
// コンストラクタ
var SlideMenu = function (handler) {
	// イベントハンドラー
	this.handler = handler;
}

// イベントのアクティブ・非アクティブ状態のフラグ
SlideMenu.prototype.activeFlg = false;
// スライドメニューのセレクタ
SlideMenu.prototype.content = '.sp_menu_item';
// 閉じるボタン
SlideMenu.prototype.colseBtn = '.sp_menu_colse_btn';
// スライドの移動量
SlideMenu.prototype.slideVolume = '-250px';
// スライドスピード
SlideMenu.prototype.slideSpeed = 500;
// オーバーレイヤーを開く
SlideMenu.prototype.slideMenuOpenOverlayer = new Overlayer('open');
// オーバーレイヤーを閉じる
SlideMenu.prototype.slideMenuCloseOverlayer = new Overlayer('close', SlideMenu.prototype.close);


SlideMenu.prototype.run = function () {
	// スライドを開く
	$(this.handler).on('click', function () {
		SlideMenu.prototype.open();
		SlideMenu.prototype.slideMenuOpenOverlayer.run();
	});
	// スライドを閉じる
	$('a', SlideMenu.prototype.colseBtn).on('click', function () {
		SlideMenu.prototype.close();
		SlideMenu.prototype.slideMenuCloseOverlayer.run();
	});
}

// スライドを開く
SlideMenu.prototype.open = function () {
	$(this.content).animate({ 
		right: 0
	}, SlideMenu.prototype.slideSpeed);
	$(SlideMenu.prototype.colseBtn).addClass('active');
	SlideMenu.prototype.activeFlg = true;
}

// スライドを閉じる
SlideMenu.prototype.close = function () {
	$(this.content).animate({ 
		right: SlideMenu.prototype.slideVolume
	}, SlideMenu.prototype.slideSpeed);
	$(SlideMenu.prototype.colseBtn).removeClass('active');
	SlideMenu.prototype.activeFlg = false;
}

// ============ 仕様検証用サンプル ============
// コンストラクタ
var Constructor = function (handler, comment) {
	this.handler = handler;
	this.comment = comment;
}

Constructor.prototype = {
	content: '.test5_content'
	,flg: false
	,test1: function () {
		console.log (this.comment);
	}
	,test2: function () {
		console.log ($(this.handler));
		console.log (this.comment);
	}
	,test3: function () {
		$(this.handler).text (this.comment);
	}
	,test4: function () {
		$(this.handler).on('click', function () {
			console.log('test4');
		});
	}
	,test5: function () {
		$(this.handler).on('click', function () {
			switch (Constructor.prototype.flg) {
				case false:
					$(Constructor.prototype.content).addClass('active');
					$(Constructor.prototype.content).animate ({
						height: '300px'
					}, 500);
					Constructor.prototype.flg = true;
					break; 
				case true:
					$(Constructor.prototype.content).animate ({
							height: 0
					}, 500);
					$(Constructor.prototype.content).removeClass('active');
					Constructor.prototype.flg = false;
					break; 
			}
		});
	}
}