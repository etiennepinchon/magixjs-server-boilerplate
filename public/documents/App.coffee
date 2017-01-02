# Import font
Font 'Quicksand', '700,400,300'

# Create page
App.page = new Page
	backgroundColor: '#6600FF'

hello = new Text
	text: 'Hello!'
	width: auto
	fontSize: 90
	fontWeight: 700
	color: white
	spacing: 4
	
hello.center()
