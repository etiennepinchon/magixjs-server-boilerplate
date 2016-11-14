var restify, server, server_dir, server_port;

restify = require('restify');

server_port = 80;

server_dir = 'public/';

server = restify.createServer({
  name: 'server',
  version: '1.0.0'
});

server.use(restify.acceptParser(server.acceptable));

server.use(restify.queryParser());

server.use(restify.bodyParser());

server.use(CookieParser.parse);

server.use(restify.gzipResponse());

server.get(/^\/build\/?.*/, restify.serveStatic({
  directory: server_dir
}));

server.get(/^\/documents\/?.*/, restify.serveStatic({
  directory: server_dir
}));

server.get(/\/?/, function(req, res, next) {
  res.writeHead(200);
  fs.createReadStream(server_dir + '/index.html').pipe(res);
  return next();
});

server.__port = server_port;

server.start = function(message) {
  return server.listen(server.__port, 'localhost', function() {
    if (message) {
      return console.log(('MagiX: Project launched! Running! Address ' + server.url).green);
    }
  });
};

server.start(true);
