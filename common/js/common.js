// ============ 共通設定 ============
var Config = function () {}
// JSONファイルのディレクトリパス
// Config.prototype.scrollX = window.pageXOffset

// 画面のスクロール量
// Config.prototype.scrollX = $(window).scrollLeft();
// Config.prototype.scrollY = $(window).scrollTop();

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

// コンストラクタ
var PopupMenu = function () {}

// イベントのアクティブ・非アクティブ状態のフラグ
PopupMenu.prototype.actionFlg = false;
// 共通設定
PopupMenu.prototype.config =  new Config();
// ポップアップメニューのイベントハンドラー
PopupMenu.prototype.handler = '.common_popup_btn';
// ポップアップメニューのリスト
PopupMenu.prototype.content = '.common_popup_content';
// ポップアップメニューの矢印
PopupMenu.prototype.contentArrow = '.common_popup_tri';
// ポップアップと画面の上下左右の最低余白量
PopupMenu.prototype.limitMargin = 20;
// ポップアップ自身に対するポップアップの矢印の位置限界
PopupMenu.prototype.limitArrow = 10;
// ポップアップとイベントハンドラの間の間隔
PopupMenu.prototype.popupMargin = 3;

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
	// ポップアップの本体の幅と高さ
	var contentSize = {
		'width': $(PopupMenu.prototype.content).width(),
		'height': $(PopupMenu.prototype.content).height()
	}
	// 矢印の幅と高さを取得
	var arrowSize = {
		'width': $(PopupMenu.prototype.contentArrow).width(),
		'height': $(PopupMenu.prototype.contentArrow).height()
	}
	// イベントハンドラの上下左右の位置を取得
	var position = $(PopupMenu.prototype.handler).offset();
	var handlerPosition = {
		'top': position.top,	// 上
		'left': position.left,	// 左
	}
	// イベントハンドラの水平/垂直方向の中心までの座標
	var handlerPositionCenter = {
		'vertical': handlerPosition.top + handlerSize.height/2,
		'horizontal': handlerPosition.left + handlerSize.width/2,
	}
	// 
	var arrowPositionCenter = {
		'vertical': PopupMenu.prototype.limitArrow + arrowSize.height/2,
		'horizontal': PopupMenu.prototype.limitArrow + arrowSize.height/2,
	}
	var setFrame = function (arrowDirection) {
		$(PopupMenu.prototype.content).css('width', contentSize.width);
		switch (arrowDirection) {
			case 'top': 
				$(PopupMenu.prototype.contentArrow).css(
					{
						'top': 'auto',
						'right': 'auto',
						'bottom': '1px',
						'left': PopupMenu.prototype.limitArrow + 'px',
						'transform': 'rotate(' + 90 + 'deg)',
					}
				).addClass('rotate_class_top');
				$(PopupMenu.prototype.content).css(
					{
						'top': handlerPosition.top - (contentSize.height + PopupMenu.prototype.popupMargin + arrowSize.width) + 'px',
						'right': 'auto',
						'bottom': 'auto',
						'left': handlerPositionCenter.horizontal - (arrowSize.height/2 + PopupMenu.prototype.limitArrow) + 'px',
					}
				);
				break;
			case 'right': 
				$(PopupMenu.prototype.contentArrow).css(
					{
						'top': PopupMenu.prototype.limitArrow + 'px',
						'right': 'auto',
						'bottom': 'auto',
						'left': '-' + (arrowSize.width - 1) + 'px',
						'transform': 'rotate(' + 180 + 'deg)'
					}
				);
				$(PopupMenu.prototype.content).css(
					{
						'top': handlerPositionCenter.vertical - (arrowSize.height/2 + PopupMenu.prototype.limitArrow) + 'px',
						'right': 'auto',
						'bottom': 'auto',
						'left': (handlerPosition.left + handlerSize.width) + (PopupMenu.prototype.popupMargin + arrowSize.width) + 'px',
					}
				);
				break;
			case 'bottom':
				$(PopupMenu.prototype.contentArrow).css(
					{
						'top': '1px',
						'right': 'auto',
						'bottom': 'auto',
						'left': PopupMenu.prototype.limitArrow + 'px',
						'transform': 'rotate(' + 270 + 'deg)'
					}
				).addClass('rotate_class_bottom');
				$(PopupMenu.prototype.content).css(
					{
						'top': (handlerPosition.top + handlerSize.height) + (PopupMenu.prototype.popupMargin + arrowSize.width) + 'px',
						'right': 'auto',
						'bottom': 'auto',
						'left': handlerPositionCenter.horizontal - (arrowSize.height/2 + PopupMenu.prototype.limitArrow) + 'px',
					}
				);
				break;
			case 'left':
				$(PopupMenu.prototype.contentArrow).css(
					{
						'top': PopupMenu.prototype.limitArrow + 'px',
						'right': '-' + (arrowSize.width - 1) + 'px',
						'bottom': 'auto',
						'left': 'auto',
					}
				);
				$(PopupMenu.prototype.content).css(
					{
						'top': handlerPositionCenter.vertical - (arrowSize.height/2 + PopupMenu.prototype.limitArrow) + 'px',
						'right': 'auto',
						'bottom': 'auto',
						'left': handlerPosition.left - (PopupMenu.prototype.popupMargin + arrowSize.width + contentSize.width) + 'px',
					}
				);
				break;


			// ポップアップが画面の下面に設置(ポップアップが上側にある状態)
			case 'touchrightTop': 
				$(PopupMenu.prototype.contentArrow).css(
					{
						'top': 'auto',
						'right': 'auto',
						'bottom': '1px',
						'left': contentSize.width + PopupMenu.prototype.limitMargin - ( PopupMenu.prototype.config.documentWidth - (handlerPositionCenter.horizontal - arrowSize.height/2) ) + 'px',
						'transform': 'rotate(' + 90 + 'deg)',
					}
				).addClass('rotate_class_top');
				$(PopupMenu.prototype.content).css(
					{
						'top': handlerPosition.top - (contentSize.height + PopupMenu.prototype.popupMargin + arrowSize.width) + 'px',
						'right': 'auto',
						'bottom': 'auto',
						'left': PopupMenu.prototype.config.documentWidth - (contentSize.width + PopupMenu.prototype.limitMargin) + 'px',
					}
				);
				break;
			// ポップアップが画面の下面に設置(ポップアップが右側にある状態)
			case 'touchbottomRight':
				$(PopupMenu.prototype.contentArrow).css(
					{
						'top': contentSize.height + PopupMenu.prototype.limitMargin - ( PopupMenu.prototype.config.documentHeight - (handlerPositionCenter.vertical - arrowSize.height/2) ) + 'px',
						'right': 'auto',
						'bottom': 'auto',
						'left': '-' + (arrowSize.width - 1) + 'px',
						'transform': 'rotate(' + 180 + 'deg)'
					}
				);
				$(PopupMenu.prototype.content).css(
					{
						'top': PopupMenu.prototype.config.documentHeight - (contentSize.height + PopupMenu.prototype.limitMargin) + 'px',
						'right': 'auto',
						'bottom': 'auto',
						'left': (handlerPosition.left + handlerSize.width) + (PopupMenu.prototype.popupMargin + arrowSize.width) + 'px',
					}
				);
				break;
			// ポップアップが画面の右面に設置(ポップアップが下側にある状態)
			case 'touchrightBottom':
				$(PopupMenu.prototype.contentArrow).css(
					{
						'top': '1px',
						'right': 'auto',
						'bottom': 'auto',
						'left': contentSize.width + PopupMenu.prototype.limitMargin - ( PopupMenu.prototype.config.documentWidth - (handlerPositionCenter.horizontal - arrowSize.height/2) ) + 'px',
						'transform': 'rotate(' + 270 + 'deg)'
					}
				).addClass('rotate_class_bottom');
				$(PopupMenu.prototype.content).css(
					{
						'top': (handlerPosition.top + handlerSize.height) + (PopupMenu.prototype.popupMargin + arrowSize.width) + 'px',
						'right': 'auto',
						'bottom': 'auto',
						'left': PopupMenu.prototype.config.documentWidth - (contentSize.width + PopupMenu.prototype.limitMargin) + 'px',
					}
				);
				break;
			// ポップアップが画面の下面に設置(ポップアップが右側にある状態)
			case 'touchbottomLeft':
				$(PopupMenu.prototype.contentArrow).css(
					{
						'top': contentSize.height + PopupMenu.prototype.limitMargin - ( PopupMenu.prototype.config.documentHeight - (handlerPositionCenter.vertical - arrowSize.height/2) ) + 'px',
						'right': '-' + (arrowSize.width - 1) + 'px',
						'bottom': 'auto',
						'left': 'auto',
					}
				);
				$(PopupMenu.prototype.content).css(
					{
						'top': PopupMenu.prototype.config.documentHeight - (contentSize.height + PopupMenu.prototype.limitMargin) + 'px',
						'right': 'auto',
						'bottom': 'auto',
						'left': handlerPosition.left - (PopupMenu.prototype.popupMargin + arrowSize.width + contentSize.width) + 'px',
					}
				);
				break;
		}
	}

	//●イベントハンドラが画面上部(ポップアップを表示させたときに、ポップアップの上面が「limitMargin」で設定した余白に接した以後の状態)：
	if ( handlerPositionCenter.vertical - $(window).scrollTop() < arrowPositionCenter.vertical) {

		//・左上
		if ( handlerPositionCenter.horizontal - $(window).scrollLeft() < arrowPositionCenter.horizontal) {
			console.log('topleft');
			setFrame('bottom');

		//・左右中央
		} else if ( handlerPositionCenter.horizontal - $(window).scrollLeft() >= arrowPositionCenter.horizontal && handlerPositionCenter.horizontal - $(window).scrollLeft() <= PopupMenu.prototype.config.documentWidth - (contentSize.width - arrowPositionCenter.horizontal)) {
			console.log('topmiddle');
			setFrame('bottom');

		// ポップアップの右側面がlimitMarginで設定した余白の範囲に設置
		} else if ( handlerPositionCenter.horizontal - $(window).scrollLeft() > PopupMenu.prototype.config.documentWidth - (contentSize.width - arrowPositionCenter.horizontal) && handlerPositionCenter.horizontal - $(window).scrollLeft() <= PopupMenu.prototype.config.documentWidth - arrowPositionCenter.horizontal) {
			console.log('top-right: arrow move');
			setFrame('touchrightBottom');

		//・右上
		} else if ( handlerPositionCenter.horizontal - $(window).scrollLeft() > PopupMenu.prototype.config.documentWidth - (arrowPositionCenter.horizontal)) {
			console.log('topright');
			setFrame('bottom');

		}

	//●イベントハンドラが画面天地中央(ポップアップを表示させたときに、ポップアップの上面と下面が「limitMargin」で設定した余白に接していない状態)：
	} else if ( handlerPositionCenter.vertical - $(window).scrollTop() >= arrowPositionCenter.vertical && handlerPositionCenter.vertical <= (PopupMenu.prototype.config.documentHeight - PopupMenu.prototype.limitMargin) - (contentSize.height - arrowPositionCenter.vertical)) {

		//・左
		if ( (handlerPosition.left + handlerSize.width) - $(window).scrollLeft() < PopupMenu.prototype.limitMargin + arrowSize.width) {
			console.log('middleleft');
			setFrame('right');

		//・左右中央
		} else if ( (handlerPosition.left + handlerSize.width) - $(window).scrollLeft() >= PopupMenu.prototype.limitMargin + arrowSize.width && handlerPosition.left - $(window).scrollLeft() <= PopupMenu.prototype.config.documentWidth - (PopupMenu.prototype.limitMargin + contentSize.width + arrowSize.width)) {
			console.log('middlemiddle');
			setFrame('right');

		//・右
		} else if ( handlerPosition.left - $(window).scrollLeft() > PopupMenu.prototype.config.documentWidth - (PopupMenu.prototype.limitMargin + contentSize.width + arrowSize.width)) {
			console.log('middleright');
			setFrame('left');
		}

	// ポップアップの下側面がlimitMarginで設定した余白の範囲に設置
	} else if ( handlerPositionCenter.vertical - $(window).scrollLeft() > (PopupMenu.prototype.config.documentHeight - PopupMenu.prototype.limitMargin) - (contentSize.height - arrowPositionCenter.vertical) && handlerPositionCenter.vertical - $(window).scrollTop() <= PopupMenu.prototype.config.documentHeight - arrowPositionCenter.vertical) {
		//・左
		if ( (handlerPosition.left + handlerSize.width) - $(window).scrollLeft() < PopupMenu.prototype.limitMargin + arrowSize.width) {
			console.log('middle-left: arrow move');
			setFrame('touchbottomRight');

		//・左右中央
		} else if ( (handlerPosition.left + handlerSize.width) - $(window).scrollLeft() >= PopupMenu.prototype.limitMargin + arrowSize.width && handlerPosition.left - $(window).scrollLeft() <= PopupMenu.prototype.config.documentWidth - (PopupMenu.prototype.limitMargin + contentSize.width + arrowSize.width)) {
			console.log('middle-middle: arrow move');
			setFrame('touchbottomRight');

		//・右
		} else if ( handlerPosition.left - $(window).scrollLeft() > PopupMenu.prototype.config.documentWidth - (PopupMenu.prototype.limitMargin + contentSize.width + arrowSize.width)) {
			console.log('middle-right: arrow move');
			setFrame('touchbottomLeft');
		}

	//●イベントハンドラが画面下部(ポップアップを表示させたときに、ポップアップの下面が「limitMargin」で設定した余白に接した以後の状態)：
	} else if ( handlerPositionCenter.vertical - $(window).scrollTop() > PopupMenu.prototype.config.documentHeight - arrowPositionCenter.vertical) {

		//・左下
		if ( handlerPositionCenter.horizontal - $(window).scrollLeft() < arrowPositionCenter.horizontal) {
			console.log('bottomleft');
			setFrame('top');

		//・左右中央
		} else if ( handlerPositionCenter.horizontal - $(window).scrollLeft() >= arrowPositionCenter.horizontal && handlerPositionCenter.horizontal - $(window).scrollLeft() <= PopupMenu.prototype.config.documentWidth - (contentSize.width - arrowPositionCenter.horizontal)) {
			console.log('bottommiddle');
			setFrame('top');

		// ポップアップの右側面がlimitMarginで設定した余白の範囲に設置
		} else if ( handlerPositionCenter.horizontal - $(window).scrollLeft() > PopupMenu.prototype.config.documentWidth - (contentSize.width - arrowPositionCenter.horizontal) && handlerPositionCenter.horizontal - $(window).scrollLeft() <=  PopupMenu.prototype.config.documentWidth - arrowPositionCenter.horizontal) {
			console.log('bottom-right: arrow move');
			setFrame('touchrightTop');

		//・右下
		} else if ( handlerPositionCenter.horizontal - $(window).scrollLeft() >  PopupMenu.prototype.config.documentWidth - arrowPositionCenter.horizontal) {
			console.log('bottomright');
			setFrame('top');

		}
	}
}

PopupMenu.prototype.run = function () {
	$(this.handler).on('click', function () {
		PopupMenu.prototype.mainProcess();
	});
		$(window).resize(function () {
			if (PopupMenu.prototype.actionFlg == true) {
				// popupの位置調整
			}
		});
		$(window).scroll (function () {
			if (PopupMenu.prototype.actionFlg == true) {
				// popupの位置調整
				console.log('x:' + $(window).scrollLeft() + ', y:' + $(window).scrollTop());
				// PopupMenu.prototype.init();
			}
		});

}
PopupMenu.prototype.mainProcess = function () {
	if (PopupMenu.prototype.actionFlg == false) {
		PopupMenu.prototype.init();
		PopupMenu.prototype.open();
	} else if (PopupMenu.prototype.actionFlg == true) {
		PopupMenu.prototype.close();
	}
}

PopupMenu.prototype.open = function () {
	$(PopupMenu.prototype.content).addClass('active');
	PopupMenu.prototype.actionFlg = true;
}

PopupMenu.prototype.close = function () {
	$(PopupMenu.prototype.contentArrow).attr('style', '');
	$(PopupMenu.prototype.content).removeClass('active').attr('style', '');
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
SlideMenu.prototype.closeBtn = '.sp_menu_close_btn';
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
	,handler: 'test7'
	,comment: 'hello7'
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
	,test7: function () {
		$(window).scroll (function () {
			console.log(Constructor.prototype.handler + ', ' + Constructor.prototype.comment);
		});
	}
}