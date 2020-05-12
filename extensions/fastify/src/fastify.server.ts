// Copyright IBM Corp. 2020. All Rights Reserved.
// Node module: @loopback/fastify
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import {
  Application,
  Context,
  CoreBindings,
  inject,
  Server,
} from '@loopback/core';
import {
  FastifyServerConfig,
  FastifyServerResolvedConfig,
} from './fastify.config';
import {FastifyBindings} from './fastify.keys';

export class FastifyServer extends Context implements Server {
  listening: boolean;
  readonly config: FastifyServerResolvedConfig;

  /**
   *
   * Creates an instance of FastifyServer.
   *
   * @param app - The application instance (injected via
   * CoreBindings.APPLICATION_INSTANCE).
   * @param config - The configuration options (injected via
   * FastifyBindings.CONFIG).
   *
   */
  constructor(
    @inject(CoreBindings.APPLICATION_INSTANCE) app: Application,
    @inject(FastifyBindings.CONFIG, {optional: true})
    config: FastifyServerConfig = {},
  ) {
    super(app);
    this.config = resolveConfig(config);

    this.bind(FastifyBindings.PORT).to(this.config.port);
    this.bind(FastifyBindings.HOST).to(config.host);
    this.bind(FastifyBindings.PATH).to(config.path);

    // todo
  }

  async start(): Promise<void> {
    // TODO
  }

  async stop(): Promise<void> {
    // TODO
  }
}

function resolveConfig(
  config: FastifyServerConfig,
): FastifyServerResolvedConfig {
  const result: FastifyServerResolvedConfig = {
    port: 3000,
    openApiSpec: {},
    ...config,
  };

  // Can't check falsiness, 0 is a valid port.
  if (result.port == null) {
    result.port = 3000;
  }

  if (result.host == null) {
    // Set it to '' so that the http server will listen on all interfaces
    result.host = undefined;
  }

  return result;
}
