
$(function () {
	var slideMenu = new SlideMenu('.sp_menu a');
	slideMenu.run();
});

$(function () {
	var constructor1 = new Constructor('.test1', 'hello1');
	var constructor2 = new Constructor('.test2', 'hello2');
	var constructor3 = new Constructor('.test3', 'hello3');
	var constructor4 = new Constructor('.test4', 'hello4');
	var constructor5 = new Constructor('.test5', 'hello5');

	constructor1.test1();
	constructor2.test2();
	constructor3.test3();
	constructor4.test4();
	constructor5.test5();
});
