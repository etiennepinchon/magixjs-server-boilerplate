##############################################################
# REQUIRE

fs 	= require('fs')
restify 		= require('restify')
CookieParser 	= require('restify-cookies')

##############################################################
# CONFIG

server_port = 8080
server_dir = 'public/'

######################################################
# SERVER

server_dir = __dirname + '/' + server_dir
server = restify.createServer
	name: 'server'
	version: '1.0.0'

server.use restify.acceptParser(server.acceptable)
server.use restify.queryParser()
server.use restify.bodyParser()
server.use CookieParser.parse
#server.use restify.gzipResponse()

server.get /^\/build\/?.*/, restify.serveStatic directory: server_dir
server.get /^\/documents\/?.*/, restify.serveStatic directory: server_dir

server.get /\/?/, (req, res, next) ->
	fs.readFile server_dir + '/index.html', (err, data) ->
		if err
			next err
			return
		res.setHeader 'Content-Type', 'text/html'
		res.writeHead 200
		res.end data
		next()
		return

server.__port = server_port
server.start = (message)->
	server.listen server.__port, 'localhost', ->
		console.log('MagiX: Project launched! Running! Address ' + server.url)

server.start(yes)
