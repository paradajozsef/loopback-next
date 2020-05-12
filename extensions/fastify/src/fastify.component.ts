// Copyright IBM Corp. 2020. All Rights Reserved.
// Node module: @loopback/fastify
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import {
  Application,
  Component,
  Constructor,
  CoreBindings,
  inject,
  Server,
} from '@loopback/core';
import {createEmptyApiSpec} from '@loopback/openapi-v3';
import {FastifyServerConfig} from './fastify.config';
import {FastifyBindings} from './fastify.keys';
import {FastifyServer} from './fastify.server';

export class FastifyComponent implements Component {
  servers: {
    [name: string]: Constructor<Server>;
  } = {
    FastifyServer,
  };
  constructor(
    @inject(CoreBindings.APPLICATION_INSTANCE) app: Application,
    @inject(FastifyBindings.CONFIG, {optional: true})
    config: FastifyServerConfig = {},
  ) {
    const apiSpec = createEmptyApiSpec();
    // Merge the OpenAPI `servers` spec from the config into the empty one
    if (config?.openApiSpec?.servers) {
      Object.assign(apiSpec, {servers: config.openApiSpec.servers});
    }
    app.bind(FastifyBindings.API_SPEC).to(apiSpec);
  }
}
