// Copyright IBM Corp. 2018,2020. All Rights Reserved.
// Node module: @loopback/repository
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import {Application, Constructor} from '@loopback/core';
import {FastifyComponent} from './fastify.component';

/**
 * A replacement for `typeof Target` to be used in mixin class definitions.
 * Example use:
 *
 * ```ts
 * export function MyMixin<T extends MixinTarget<Application>>(superClass: T) {
 *   return class extends superClass {
 *     // contribute new class members
 *   }
 * };
 */
export type MixinTarget<T extends object> = Constructor<
  {
    // Enumerate only public members to avoid the following compiler error:
    //   Property '(name)' of exported class expression
    //   may not be private or protected.ts(4094)
    [p in keyof T]: T[p];
  }
>;

export function FastifyMixin<T extends MixinTarget<Application>>(
  superClass: T,
) {
  return class extends superClass {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    constructor(...args: any[]) {
      super(...args);
      this.component(FastifyComponent);
    }
  };
}

class MyApp extends FastifyMixin(Application) {
  foo() {
    this.controller(Object);
  }
}
