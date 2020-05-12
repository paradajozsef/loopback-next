// Copyright IBM Corp. 2020. All Rights Reserved.
// Node module: @loopback/fastify
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import {ServerObject} from '@loopback/openapi-v3';
import fastify from 'fastify';

export type FastifyServerOptions = Partial<FastifyServerResolvedOptions>;

export interface FastifyServerResolvedOptions {
  port: number;
  openApiSpec: OpenApiSpecOptions;
}

/**
 * Options to customize how OpenAPI spec is generated
 */
export interface OpenApiSpecOptions {
  /**
   * A flag to force `servers` to be set from the http request for the OpenAPI
   * spec
   */
  setServersFromRequest?: boolean;

  /**
   * Configure servers for OpenAPI spec
   */
  servers?: ServerObject[];

  /**
   * Set this flag to `false` to disable OAS schema consolidation. If not set,
   * the value defaults to `true`.
   */
  consolidate?: boolean;
}

/**
 * Valid configuration for the FastifyServer constructor.
 */
export type FastifyServerConfig = FastifyServerOptions &
  fastify.ServerOptions &
  fastify.ListenOptions;

export type FastifyServerResolvedConfig = FastifyServerResolvedOptions &
  fastify.ServerOptions &
  fastify.ListenOptions;

