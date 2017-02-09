// ============ 共通設定 ============
var Config = function () {}
// JSONファイルのディレクトリパス
// Config.prototype.scrollX = window.pageXOffset

// 画面のスクロール量
Config.prototype.scrollX = window.pageXOffset
Config.prototype.scrollY = window.pageXOffset

// 画面の幅と高さ
Config.prototype.documentWidth = $(window).width();
Config.prototype.documentHeight = $(window).height();


// ============ オーバーレイヤー ============
// コンストラクタ
var Overlayer = function (actionType, target) {
	// アクティブ・非アクティブの設定
	this.actionType = actionType;
	this.target = target;
}

// イベントのアクティブ・非アクティブ状態のフラグ
Overlayer.prototype.constructor = function () {

};

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

// ============ ポップアップメニュー ============
/* 機能
	・画面上のイベントハンドラの位置によってポップアップの配置が変わる
	　配置の調整タイミング
	　 ・イベントハンドラをクリックしたとき
	　 ・画面をスクロールしたとき
	　　　・配置の仕様
		※ポップアップの配置が切り替わるタイミング
		　　・矢印が出ている側の反対の面の場合：
		　　　→ポップアップ本体（矢印含む）の上下左右端が、画面の端から「limitMargin」で設定された余白に設置する場合
		　　・矢印が出ている側の垂直方向の場合：
			（1）上下に矢印が出ている場合
			　→イベントハンドラの中央から、上下それぞれに「limitMargin」「limitArrow」「矢印の高さ/2」の領域に、画面端が接したら位置を切り替える
			（2）左右に矢印が出ている場合
			　→イベントハンドラの中央から、左右それぞれに「limitMargin」「limitArrow」「矢印の幅/2」の領域に、画面端が接したら位置を切り替える
		　　●イベントハンドラが画面中央： 
			ポップアップ： イベントハンドラの右側
			ポップアップの矢印： イベントハンドラの天地中央
		　　●イベントハンドラが画面上部：
			・左右中央
			　・ポップアップ： イベントハンドラの下側
			　・ポップアップの矢印： イベントハンドラの左右中央
			・左上
			　→（1）（2）どちらにも該当する場合
			　　・ポップアップ： イベントハンドラの右側
			　　・ポップアップの矢印： イベントハンドラの天地中央
			・右上
			　→（1）（2）どちらにも該当する場合
			　　・ポップアップ： イベントハンドラの左側
			　　・ポップアップの矢印： イベントハンドラの天地中央
		　　●イベントハンドラが画面天地中央：
			・左右中央
			　・ポップアップ： イベントハンドラの右側
			　・ポップアップの矢印： イベントハンドラの天地中央
			・左
			　・ポップアップ： イベントハンドラの右側
			　・ポップアップの矢印： イベントハンドラの天地中央
			・右
			　・ポップアップの右側面が画面右側面の領域に設置するまで
			　　・ポップアップ： イベントハンドラの右側
			　　・ポップアップの矢印： イベントハンドラの天地中央
			　・ポップアップの右側面が画面右側面の領域に設置した場合
			　　・ポップアップ： イベントハンドラの右側
			　　・ポップアップの矢印： イベントハンドラの天地中央
		　　●イベントハンドラが画面下部：
			・左右中央
			　・ポップアップ： イベントハンドラの右側
			　・ポップアップの矢印： イベントハンドラの天地中央
			・左下
			　→（1）（2）どちらにも該当する場合
			　　・ポップアップ： イベントハンドラの右側
			　　・ポップアップの矢印： イベントハンドラの天地中央
			・右下
			　→（1）（2）どちらにも該当する場合
			　　・ポップアップ： イベントハンドラの右側
			　　・ポップアップの矢印： イベントハンドラの天地中央
	// ・
	// ・
	// ・
*/ 
// コンストラクタ
var PopupMenu = function () {}

// イベントのアクティブ・非アクティブ状態のフラグ
PopupMenu.prototype.actionFlg = false;
// ポップアップメニューのリスト
PopupMenu.prototype.config =  new Config();
// ポップアップメニューのリスト
PopupMenu.prototype.handler = '.common_popup';
// ポップアップメニューのリスト
PopupMenu.prototype.content = '.common_popup_content';
// ポップアップと画面の上下左右の最低余白量
PopupMenu.prototype.limitMargin = '10px';
// ポップアップ自身に対するポップアップの矢印の位置限界
PopupMenu.prototype.limitArrow = '10px';
// ポップアップとイベントハンドラの間の間隔
PopupMenu.prototype.popupMargin = '3px';

PopupMenu.prototype.init = function () {
	PopupMenu.prototype.setContent();
	PopupMenu.prototype.getPosition();
}

PopupMenu.prototype.setContent = function () {
	// return $.alax({
	// 	type: "post",
	// 	scriptCharset: 'utf-8',
	// 	url: this.config.jsonUrl + '/popup_data.json',

	// });
}


PopupMenu.prototype.getPosition = function () {
	// イベントハンドラとなる要素の位置からポップアップの出現位置を決める
		// イベントハンドラの幅と高さを取得
		var handlerSize = {
			'width': $(PopupMenu.prototype.handler).width(),
			'height': $(PopupMenu.prototype.handler).height()
		}
		// イベントハンドラの上下左右の位置を取得
		var position = $(PopupMenu.prototype.handler).offset();
		var handlerPosition = {
			'top': position.top,																		// 上
			'right': PopupMenu.prototype.config.documentWidth - (handlerSize.width + position.left),	// 右
			'bottom': PopupMenu.prototype.config.documentHeight - (handlerSize.height + position.top),	// 下
			'left': position.left																		// 左
		};
		// 画面中央 
			// → popupを要素の右に出す
}

PopupMenu.prototype.run = function () {
	$(this.handler).on('click', function () {
		PopupMenu.prototype.init();
		PopupMenu.prototype.mainProcess();
	});
}
PopupMenu.prototype.mainProcess = function () {
	if (PopupMenu.prototype.actionFlg = false) {
		PopupMenu.prototype.open();
	} else if (PopupMenu.prototype.actionFlg = true) {
		PopupMenu.prototype.close();
	}
}

PopupMenu.prototype.open = function () {
	PopupMenu.prototype.actionFlg = true;
}

PopupMenu.prototype.close = function () {
	PopupMenu.prototype.actionFlg = false;
}



// ============ スマホ:スライドメニュー ============
// コンストラクタ
var SlideMenu = function (handler) {}

// イベントハンドラー
SlideMenu.prototype.handler = '.sp_menu a';
// イベントのアクティブ・非アクティブ状態のフラグ
SlideMenu.prototype.activeFlg = false;
// スライドメニューのリスト
SlideMenu.prototype.contentItem = '.sp_menu_item';
// 閉じるボタン
SlideMenu.prototype.closeBtn = '.sp_menu_colse_btn';
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
	$('a', SlideMenu.prototype.closeBtn).on('click', function () {
		SlideMenu.prototype.close();
		SlideMenu.prototype.slideMenuCloseOverlayer.run();
	});
}

// スライドを開く
SlideMenu.prototype.open = function () {
	$(this.contentItem).animate({ 
		right: 0
	}, SlideMenu.prototype.slideSpeed);
	$(SlideMenu.prototype.closeBtn).addClass('active');
	SlideMenu.prototype.activeFlg = true;
}

// スライドを閉じる
SlideMenu.prototype.close = function () {
	$(this.contentItem).animate({ 
		right: SlideMenu.prototype.slideVolume
	}, SlideMenu.prototype.slideSpeed);
	$(SlideMenu.prototype.closeBtn).removeClass('active');
	SlideMenu.prototype.activeFlg = false;
}


// ============ prototype仕様検証用サンプル ============
// コンストラクタ
var Constructor = function (handler, comment) {
	this.handler = handler;
	this.comment = comment;
}

Constructor.prototype = {
	content: '.test5_content'
	,flg: false
	// 検証1：メンバ変数を読み込めるか
	,test1: function () {
		console.log (this.comment);
	}
	// 検証2：メンバ変数を複数指定しても読み込めるか
	,test2: function () {
		console.log ($(this.handler));
		console.log (this.comment);
	}
	// 検証3：メンバ変数をセレクタとして利用可能か
	,test3: function () {
		$(this.handler).text (this.comment);
	}
	,test4: function () {
		$(this.handler).on('click', function () {
			console.log('test4');
		});
	}
	// 検証4：メソッド内に別のメソッドを指定したときに、メンバ変数を呼び出せるか
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
	,test6: function () {
		$(this.handler).on('click', function () {
			console.log('content: ' + Constructor.prototype.content);
			console.log('this: ' + this);
			console.log('this.handler: ' + this.handler);
			console.log('this.comment: ' + this.comment);
		});
	}
}