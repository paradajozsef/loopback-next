# @loopback/fastify

A lightweight REST server powered by [fastify](https://fastify.io) 🏎

## Stability: ⚠️Experimental⚠️

> Experimental packages provide early access to advanced or experimental
> functionality to get community feedback. Such modules are published to npm
> using `0.x.y` versions. Their APIs and functionality may be subject to
> breaking changes in future releases.

_WARNING: This is a speculative project with a low priority and a high chance of
getting abandoned. Use at your own risk!_

## Design goals

- A lightweight bridge between LoopBack Controllers and Fastify HTTP engine.
  [KISS](https://en.wikipedia.org/wiki/KISS_principle) and
  [YAGNI](https://en.wikipedia.org/wiki/You_aren%27t_gonna_need_it)!

- Don't reinvent the wheel, outsource as much work to Fastify ecosystem as
  possible. Use Fastify concepts for middleware, logging, etc.

- Prefer runtime performance over flexibility & extensibility. Users are
  encouraged to use `@loopback/rest` if extensibility is important in their
  projects.

_Use this experiment to drive refactoring and cleanup of `@loopback/rest` and
related packages, to extract reusable blocks that can be shared by both packages
and possibly 3rd-parties too._

## Installation

```sh
npm i @loopback/fastify
```

## Basic use

Use `FastifyMixin` to add a fastify instance to your `Application`.

```ts
export class MyApplication extends FastifyMixin(
  BootMixin(ServiceMixin(RepositoryMixin(Application))),
) {
  constructor(options: ApplicationConfig = {}) {
    super(options);
    this.projectRoot = __dirname;

    // Use the same controller classes as with `@loopback/rest`
    this.controller(MyController);

    // Access the fastify instance via `this.fastify`
    this.fastify.register(require('fastify-cors'), {
      // CORS options
    });
  }
}
```

## MVP scope

A Todo example app with REST API Explorer.

- [ ] FastifyMixin (replacing RestServer and RestApplication)
- [ ] Controller registration (`app.controller()`)
- [ ] OpenAPI-based routing
- [ ] OpenAPI-based parameter parsing & response schemas
- [ ] Benchmark
- [ ] Error handler (based on strong-error-handler?)
- [ ] Serving static files (`app.static()`)
- [ ] REST API Explorer, preferably using `@loopback/rest-explorer`

## Post MVP

- Logging powered by fastify's Pino-based loggers (per-app, per-request)
- OpenAPI schema enhancers & consolidation
- File uploads & downloads
- Route-based endpoints
- Redirect routes (can we use Fastify API instead?)
- Multiple servers per one application

## Contributions

- [Guidelines](https://github.com/strongloop/loopback-next/blob/master/docs/CONTRIBUTING.md)
- [Join the team](https://github.com/strongloop/loopback-next/issues/110)

## Tests

Run `npm test` from the root folder.

## Contributors

See
[all contributors](https://github.com/strongloop/loopback-next/graphs/contributors).

## License

MIT
