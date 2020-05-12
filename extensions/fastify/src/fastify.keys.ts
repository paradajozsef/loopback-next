// Copyright IBM Corp. 2017,2020. All Rights Reserved.
// Node module: @loopback/rest
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import {BindingKey, Context, CoreBindings} from '@loopback/core';
import {OpenApiSpec, OperationObject} from '@loopback/openapi-v3';
import {FastifyServer} from './fastify.server';
import {Reply, Request} from './fastify.types';

/**
 * RestServer-specific bindings
 */
export namespace FastifyBindings {
  /**
   * Binding key for setting and injecting RestComponentConfig
   */
  export const CONFIG = CoreBindings.APPLICATION_CONFIG.deepProperty('fastify');
  /**
   * Binding key for setting and injecting the host name of RestServer
   */
  export const HOST = BindingKey.create<string | undefined>('fastify.host');
  /**
   * Binding key for setting and injecting the port number of RestServer
   */
  export const PORT = BindingKey.create<number>('fastify.port');
  /**
   * Binding key for setting and injecting the socket path of the RestServer
   */
  export const PATH = BindingKey.create<string | undefined>('fastify.path');
  /**
   * Binding key for setting and injecting the URL of RestServer
   */
  export const URL = BindingKey.create<string>('fastify.url');

  /**
   * Binding key for the server itself
   */
  export const SERVER = BindingKey.create<FastifyServer>(
    'servers.FastifyServer',
  );

  /** TODO
   * Binding key for setting and injecting Reject action's error handling
   * options.
   *
   * See https://github.com/strongloop/strong-error-handler#options for
   * the list of available options. Please note that the flag `log` is not used
   * by `@loopback/rest`.
  export const ERROR_WRITER_OPTIONS = BindingKey.create<ErrorWriterOptions>(
    'rest.errorWriterOptions',
  );
   */

  /**
   * Binding key for setting and injecting an OpenAPI spec
   */
  export const API_SPEC = BindingKey.create<OpenApiSpec>('fastify.apiSpec');

  /**
   * Request-specific bindings
   */
  export namespace Current {
    /**
     * Binding key for setting and injecting an OpenAPI operation spec
     */
    export const OPERATION_SPEC = BindingKey.create<OperationObject>(
      'fastify.current.operationSpec',
    );

    /**
     * Binding key for setting and injecting Fastify's request object
     */
    export const REQUEST = BindingKey.create<Request>(
      'fastify.current.request',
    );

    /**
     * Binding key for setting and injecting Fastify's reply object
     */
    export const REPLY = BindingKey.create<Reply>('fastify.current.reply');

    /**
     * Binding key for setting and injecting the http request context
     */
    export const CONTEXT = BindingKey.create<Context>(
      'fastify.current.context',
    );
  }
}
