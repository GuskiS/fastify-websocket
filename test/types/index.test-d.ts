const wsPlugin = require('../..');
const fastify = require('fastify');
import { SocketStream } from '../..';
import { WebsocketHandler, FastifyRequest, FastifyInstance } from 'fastify';
import { expectType } from 'tsd';
import * as Websocket from 'ws';

const app: FastifyInstance = fastify();
app.register(wsPlugin);

expectType<Websocket.Server>(app.websocketServer);

const handler: WebsocketHandler = (
  connection: SocketStream,
  req: FastifyRequest,
  params
) => {
  expectType<SocketStream>(connection);
  expectType<{ [key: string]: any } | undefined>(params);
};

app.get('/', { websocket: true }, handler);
