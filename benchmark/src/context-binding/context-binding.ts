// Copyright IBM Corp. 2018,2020. All Rights Reserved.
// Node module: @loopback/benchmark
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import {Context, inject, Provider, ValueFactory} from '@loopback/context';
import Benchmark from 'benchmark';

/**
 * First option - use a factory function
 */
const factory: ValueFactory = ({context}) => {
  const user = context.getSync('user');
  return `Hello, ${user}`;
};

/**
 * First option - use a factory function
 */
const asyncFactory: ValueFactory = async ({context}) => {
  const user = await context.get('user');
  return `Hello, ${user}`;
};

/**
 * Third option - use a value factory provider class with static method
 * parameter injection
 */
class StaticGreetingProvider {
  static value(@inject('user') user: string) {
    return `Hello, ${user}`;
  }
}

class AsyncStaticGreetingProvider {
  static value(@inject('user') user: string) {
    return Promise.resolve(`Hello, ${user}`);
  }
}

/**
 * Fourth option - use a regular provider class
 */
class GreetingProvider implements Provider<string> {
  @inject('user')
  private user: string;

  value() {
    return `Hello, ${this.user}`;
  }
}

class AsyncGreetingProvider implements Provider<string> {
  @inject('user')
  private user: string;

  value() {
    return Promise.resolve(`Hello, ${this.user}`);
  }
}

setupContextBindings();

function setupContextBindings() {
  const ctx = new Context();
  ctx.bind('user').to('John');
  ctx.bind('greeting1').toDynamicValue(factory);
  ctx.bind('greeting2').toDynamicValue(asyncFactory);
  ctx.bind('greeting3').toDynamicValue(StaticGreetingProvider);
  ctx.bind('greeting4').toDynamicValue(AsyncStaticGreetingProvider);
  ctx.bind('greeting5').toProvider(GreetingProvider);
  ctx.bind('greeting6').toProvider(AsyncGreetingProvider);
  return ctx;
}

function runBenchmark(ctx: Context) {
  const options: Benchmark.Options = {
    initCount: 100,
    onComplete: (e: Benchmark.Event) => {
      const benchmark = e.target as Benchmark;
      console.log('%s %d', benchmark, benchmark.count);
    },
  };
  const suite = new Benchmark.Suite('context-bindings');
  suite
    .add('factoryFunction - getSync', () => ctx.getSync('greeting1'), options)
    .add('factoryFunction', () => ctx.get('greeting1'), options)
    .add('asyncFactoryFunction', () => ctx.get('greeting2'), options)
    .add('factoryProvider - getSync', () => ctx.getSync('greeting3'), options)
    .add('factoryProvider', () => ctx.get('greeting3'), options)
    .add('asyncFactoryProvider', () => ctx.get('greeting4'), options)
    .add('provider - getSync', () => ctx.getSync('greeting5'), options)
    .add('provider', () => ctx.get('greeting5'), options)
    .add('asyncProvider', () => ctx.get('greeting6'), options)
    .run({async: true});
}

if (require.main === module) {
  let tests = process.argv.slice(2);
  if (!tests.length) {
    tests = ['1000'];
  }
  const ctx = setupContextBindings();
  tests.forEach(n => {
    runBenchmark(ctx);
    console.log('\n');
  });
}
