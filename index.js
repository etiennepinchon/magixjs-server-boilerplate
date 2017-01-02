var CookieParser, fs, restify, server, server_dir, server_port;

fs = require('fs');

restify = require('restify');

CookieParser = require('restify-cookies');

server_port = 8080;

server_dir = 'public/';

server_dir = __dirname + '/' + server_dir;

server = restify.createServer({
  name: 'server',
  version: '1.0.0'
});

server.use(restify.acceptParser(server.acceptable));

server.use(restify.queryParser());

server.use(restify.bodyParser());

server.use(CookieParser.parse);

server.get(/^\/build\/?.*/, restify.serveStatic({
  directory: server_dir
}));

server.get(/^\/documents\/?.*/, restify.serveStatic({
  directory: server_dir
}));

server.get(/\/?/, function(req, res, next) {
  return fs.readFile(server_dir + '/index.html', function(err, data) {
    if (err) {
      next(err);
      return;
    }
    res.setHeader('Content-Type', 'text/html');
    res.writeHead(200);
    res.end(data);
    next();
  });
});

server.__port = server_port;

server.start = function(message) {
  return server.listen(server.__port, 'localhost', function() {
    return console.log('MagiX: Project launched! Running! Address ' + server.url);
  });
};

server.start(true);
