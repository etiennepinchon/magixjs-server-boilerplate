App.run(function() {
	var hello;

	Font('Quicksand', '400,300');

	App.page = new Page({
	  backgroundColor: white
	});

	hello = new Text({
	  text: 'magiX',
	  width: 300,
	  fontSize: 90,
	  fontWeight: 300,
	  color: black,
	  spacing: 4
	});

	hello.center();

});
