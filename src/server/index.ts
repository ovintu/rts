import * as http from 'http';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as path from 'path';
import * as compression from 'compression';
import * as routes from './routes';
import * as socketIo from "socket.io";
import { Init } from './db/redis';
import rtsIo = require("./services/io");

var _clientDir = '../client';
var app = express();
var server: any;

export function init(port: number, mode: string) {

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(bodyParser.text());
  app.use(compression());

  // DB Init
  Init();

  /**
   * Dev Mode.
   * @note Dev server will only give for you middleware.
   */
  if (mode == 'dev') {
    app.all('/*', function(req, res, next) {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Headers', 'X-Requested-With');
      next();
    });

    routes.init(app);

    let root = path.resolve(process.cwd());
    let clientRoot = path.resolve(process.cwd(), './dist/dev/client');
    app.use(express.static(root));
    app.use(express.static(clientRoot));

    var renderIndex = (req: express.Request, res: express.Response) => {
      res.sendFile(path.resolve(__dirname, _clientDir + '/index.html'));
    };
    app.get('/*', renderIndex);

    /**
     * Api Routes for `Development`.
     */
  }
  else {
    /**
     * Prod Mode.
     * @note Prod mod will give you static + middleware.
     */

    /**
     * Api Routes for `Production`.
     */
    routes.init(app);
    /**
     * Static.
     */
    app.use('/js', express.static(path.resolve(__dirname, _clientDir + '/js')));
    app.use('/css', express.static(path.resolve(__dirname, _clientDir + '/css')));
    app.use('/assets', express.static(path.resolve(__dirname, _clientDir + '/assets')));

    /**
     * Spa Res Sender.
     * @param req {any}
     * @param res {any}
     */
    var renderIndex = function (req: express.Request, res: express.Response) {
      res.sendFile(path.resolve(__dirname, _clientDir + '/index.html'));
    };

    /**
     * Prevent server routing and use @ng2-router.
     */
    app.get('/*', renderIndex);
  }

  this.server = http.createServer(app);

  rtsIo.io = socketIo(this.server);
  this.server.listen(port);

  //add error handler
  this.server.on("error", (error: any) => {
    console.log("ERROR", error);
  });

  //start listening on port
  this.server.on("listening", () => {
    console.log('==> Listening on port %s. Open up http://localhost:%s/ in your browser.', port, port);            
  });

  return server;
};

