// Copyright IBM Corp. 2017,2020. All Rights Reserved.
// Node module: @loopback/rest
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import {FastifyReply, FastifyRequest} from 'fastify';
import http from 'http';
import http2 from 'http2';

export type RawRequest = http.IncomingMessage | http2.Http2ServerRequest;
export type Request = FastifyRequest<RawRequest>;

export type RawResponse = http.ServerResponse | http2.Http2ServerResponse;
export type Reply = FastifyReply<RawResponse>;
