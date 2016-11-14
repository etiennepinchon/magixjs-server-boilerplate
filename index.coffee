##############################################################
# REQUIRE

restify = require('restify')

##############################################################
# CONFIG

server_port = 80
server_dir = 'public/'

######################################################
# SERVER

server = restify.createServer
	name: 'server'
	version: '1.0.0'

server.use restify.acceptParser(server.acceptable)
server.use restify.queryParser()
server.use restify.bodyParser()
server.use CookieParser.parse
server.use restify.gzipResponse()

server.get /^\/build\/?.*/, restify.serveStatic directory: server_dir
server.get /^\/documents\/?.*/, restify.serveStatic directory: server_dir

server.get /\/?/, (req, res, next) ->
	res.writeHead 200
	fs.createReadStream(server_dir + '/index.html').pipe res
	next()

server.__port = server_port
server.start = (message)->
	server.listen server.__port, 'localhost', ->
		if message
			console.log(('MagiX: Project launched! Running! Address ' + server.url).green)

server.start(yes)
