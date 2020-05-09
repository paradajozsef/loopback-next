# Context binding benchmark

This directory contains a simple benchmarking to measure the performance of
different styles of context bindings.

## Basic use

```sh
npm run -s benchmark:context
```

For example:

```
npm run -s benchmark:context
```

## Base lines

```
factoryFunction - getSync x 1,355,496 ops/sec ±0.86% (89 runs sampled) 71729
factoryFunction x 1,282,558 ops/sec ±1.22% (90 runs sampled) 69158
asyncFactoryFunction x 386,701 ops/sec ±1.69% (88 runs sampled) 21441
factoryProvider - getSync x 629,167 ops/sec ±0.91% (93 runs sampled) 33437
factoryProvider x 600,332 ops/sec ±0.86% (89 runs sampled) 32014
asyncFactoryProvider x 348,149 ops/sec ±1.50% (80 runs sampled) 21240
provider - getSync x 433,978 ops/sec ±1.03% (87 runs sampled) 24909
provider x 399,416 ops/sec ±1.00% (91 runs sampled) 21647
asyncProvider x 326,206 ops/sec ±1.41% (86 runs sampled) 18164
```
