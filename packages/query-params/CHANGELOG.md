# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [2.0.0](https://github.com/domonda/domonda-js/compare/@domonda/query-params@1.5.9...@domonda/query-params@2.0.0) (2020-07-20)


### Features

* null for params without values and undefined for missing params ([67e4e5a](https://github.com/domonda/domonda-js/commit/67e4e5a9922cfd2bb1c769993c9a1420c64287ed))


### BREAKING CHANGES

* Query params now treat null and undefined differently. If there is a parameter in the URL but no value - its treated as `null`; however, if the paramter is completely missing from the URL - then its `undefined`. BEWARE: because of this, the `defaultValue` will be used exclusively if the value is `undefined` (since `null` is treated as a set value).





## [1.5.9](https://github.com/domonda/domonda-js/compare/@domonda/query-params@1.5.8...@domonda/query-params@1.5.9) (2020-07-01)

**Note:** Version bump only for package @domonda/query-params





## [1.5.8](https://github.com/domonda/domonda-js/compare/@domonda/query-params@1.5.7...@domonda/query-params@1.5.8) (2020-05-18)


### Bug Fixes

* **parseQueryParams:** numbers can be negative too ([89cbbb0](https://github.com/domonda/domonda-js/commit/89cbbb08d6bda38866d814284d2a66acb77fe480))
* **parseQueryParams:** parse array of number-like strings to string ([53e259c](https://github.com/domonda/domonda-js/commit/53e259c6c3f6def72decca160d6cc7b86e380353))





## [1.5.7](https://github.com/domonda/domonda-js/compare/@domonda/query-params@1.5.6...@domonda/query-params@1.5.7) (2020-05-18)


### Bug Fixes

* **parseQueryParams:** parse strings which look like numbers ([85b1e16](https://github.com/domonda/domonda-js/commit/85b1e166e119c6995e1de14c9be3e8098c80065c))





## [1.5.6](https://github.com/domonda/domonda-js/compare/@domonda/query-params@1.5.5...@domonda/query-params@1.5.6) (2020-05-15)

**Note:** Version bump only for package @domonda/query-params





## 1.5.5 (2020-05-15)

### Bug Fixes

* **useQueryParams:** update params when `onPathname` changes ([#50](https://github.com/domonda/domonda-js/issues/50)) ([e53778c](https://github.com/domonda/domonda-js/commit/e53778cfe85e3fb318018bef81f6dde7853cea01))





## [1.5.4](https://github.com/domonda/domonda-js/compare/@domonda/query-params@1.5.3...@domonda/query-params@1.5.4) (2020-05-06)

**Note:** Version bump only for package @domonda/query-params





## [1.5.3](https://github.com/domonda/domonda-js/compare/@domonda/query-params@1.5.2...@domonda/query-params@1.5.3) (2020-04-20)

**Note:** Version bump only for package @domonda/query-params





## [1.5.2](https://github.com/domonda/domonda-js/compare/@domonda/query-params@1.5.1...@domonda/query-params@1.5.2) (2020-03-18)

**Note:** Version bump only for package @domonda/query-params





## [1.5.1](https://github.com/domonda/domonda-js/compare/@domonda/query-params@1.5.0...@domonda/query-params@1.5.1) (2020-02-25)

**Note:** Version bump only for package @domonda/query-params





# [1.5.0](https://github.com/domonda/domonda-js/compare/@domonda/query-params@1.4.4...@domonda/query-params@1.5.0) (2020-01-17)


### Features

* **defaultQueryParams:** following the model, gives the query params populated with default values ([0f9eca0](https://github.com/domonda/domonda-js/commit/0f9eca0be2c5dfa78a463ad7530d214ddb5de39d))
* **partial params:** setParams function now allows partial params which get merged with default values as per model ([4b98106](https://github.com/domonda/domonda-js/commit/4b98106ad258632a0b06f7e70f406cfa93bee29f))





## [1.4.4](https://github.com/domonda/domonda-js/compare/@domonda/query-params@1.4.3...@domonda/query-params@1.4.4) (2020-01-13)


### Bug Fixes

* **useQueryParams:** respect `onPathname` changes ([58495e9](https://github.com/domonda/domonda-js/commit/58495e9fe6ec7bd859e9e2f4111c282cfe2817eb))





## [1.4.3](https://github.com/domonda/domonda-js/compare/@domonda/query-params@1.4.2...@domonda/query-params@1.4.3) (2019-12-12)

**Note:** Version bump only for package @domonda/query-params





## [1.4.2](https://github.com/domonda/domonda-js/compare/@domonda/query-params@1.4.1...@domonda/query-params@1.4.2) (2019-12-04)

**Note:** Version bump only for package @domonda/query-params





## [1.4.1](https://github.com/domonda/domonda-js/compare/@domonda/query-params@1.4.0...@domonda/query-params@1.4.1) (2019-11-26)


### Bug Fixes

* **useQueryParams:** always replace location with current params ([51910da](https://github.com/domonda/domonda-js/commit/51910daa2c6acb765e8457b62a4198e637eb0a1f))


### Performance Improvements

* **useQueryParams:** block listener when replacing internally ([82cbbd0](https://github.com/domonda/domonda-js/commit/82cbbd03f55ff9d05c718d7c54e132b01117db68))





# [1.4.0](https://github.com/domonda/domonda-js/compare/@domonda/query-params@1.3.3...@domonda/query-params@1.4.0) (2019-11-21)


### Bug Fixes

* **useQueryParams:** same object reference when params are shallowly equal ([f2a533c](https://github.com/domonda/domonda-js/commit/f2a533c34e68fd0f82501c2a17e5f8353443b1fa))


### Features

* **useQueryParams:** introduce `selector` & further perf optimizations ([01e2f8f](https://github.com/domonda/domonda-js/commit/01e2f8fdf0443a49c8e6e0cd09e79c7cd243ea4f))


### Performance Improvements

* **useQueryParams:** rerender only when pathname matches ([d8806c8](https://github.com/domonda/domonda-js/commit/d8806c8cb20fa27bd00e38205162fa06c7226bf1))
* **useQueryParams:** rerendering optimizations ([0a03d07](https://github.com/domonda/domonda-js/commit/0a03d074afe3c38233cce6d205f8fa24f063dce3))





## [1.3.3](https://github.com/domonda/domonda-js/compare/@domonda/query-params@1.3.2...@domonda/query-params@1.3.3) (2019-11-06)


### Bug Fixes

* **useQueryParams:** pass most recent state to update function ([bae8109](https://github.com/domonda/domonda-js/commit/bae8109c5138964524f6df89094f38db55be5e5d))





## [1.3.2](https://github.com/domonda/domonda-js/compare/@domonda/query-params@1.3.1...@domonda/query-params@1.3.2) (2019-10-17)

**Note:** Version bump only for package @domonda/query-params





## [1.3.1](https://github.com/domonda/domonda-js/compare/@domonda/query-params@1.3.0...@domonda/query-params@1.3.1) (2019-10-15)

**Note:** Version bump only for package @domonda/query-params





# [1.3.0](https://github.com/domonda/domonda-js/compare/@domonda/query-params@1.2.3...@domonda/query-params@1.3.0) (2019-10-08)


### Features

* **useQueryParams:** add support for updater function ([dd49647](https://github.com/domonda/domonda-js/commit/dd49647))





## [1.2.3](https://github.com/domonda/domonda-js/compare/@domonda/query-params@1.2.2...@domonda/query-params@1.2.3) (2019-10-04)

**Note:** Version bump only for package @domonda/query-params





## [1.2.2](https://github.com/domonda/domonda-js/compare/@domonda/query-params@1.2.1...@domonda/query-params@1.2.2) (2019-10-01)

**Note:** Version bump only for package @domonda/query-params





## [1.2.1](https://github.com/domonda/domonda-js/compare/@domonda/query-params@1.2.0...@domonda/query-params@1.2.1) (2019-09-25)

**Note:** Version bump only for package @domonda/query-params





# [1.2.0](https://github.com/domonda/domonda-js/compare/@domonda/query-params@1.1.6...@domonda/query-params@1.2.0) (2019-09-13)


### Features

* **queryParams:** implement deep freeze on parsed query params to prevent mutations and add mutation test ([448319a](https://github.com/domonda/domonda-js/commit/448319a))
* **useQueryParams:** introduce some tests ([4822f7d](https://github.com/domonda/domonda-js/commit/4822f7d))





## [1.1.6](https://github.com/domonda/domonda-js/compare/@domonda/query-params@1.1.5...@domonda/query-params@1.1.6) (2019-09-10)

**Note:** Version bump only for package @domonda/query-params





## [1.1.5](https://github.com/domonda/domonda-js/compare/@domonda/query-params@1.1.4...@domonda/query-params@1.1.5) (2019-09-09)

**Note:** Version bump only for package @domonda/query-params





## [1.1.4](https://github.com/domonda/domonda-js/compare/@domonda/query-params@1.1.3...@domonda/query-params@1.1.4) (2019-09-06)

**Note:** Version bump only for package @domonda/query-params





## [1.1.3](https://github.com/domonda/domonda-js/compare/@domonda/query-params@1.1.2...@domonda/query-params@1.1.3) (2019-09-04)

**Note:** Version bump only for package @domonda/query-params





## [1.1.2](https://github.com/domonda/domonda-js/compare/@domonda/query-params@1.1.1...@domonda/query-params@1.1.2) (2019-09-02)

**Note:** Version bump only for package @domonda/query-params





## [1.1.1](https://github.com/domonda/domonda-js/compare/@domonda/query-params@1.1.0...@domonda/query-params@1.1.1) (2019-08-30)


### Bug Fixes

* **useQueryParams:** `disableReplace` is a boolean ([7b5cbff](https://github.com/domonda/domonda-js/commit/7b5cbff))
* **useQueryParams:** guarantee location consistency ([271966e](https://github.com/domonda/domonda-js/commit/271966e))





# [1.1.0](https://github.com/domonda/domonda-js/compare/@domonda/query-params@1.0.0...@domonda/query-params@1.1.0) (2019-08-29)


### Features

* **equality:** use `fast-equals` ([e86cb8d](https://github.com/domonda/domonda-js/commit/e86cb8d))
* **peerDeps:** require react@^16.9.0 ([ab92e0c](https://github.com/domonda/domonda-js/commit/ab92e0c))





# 1.0.0 (2019-08-27)


### Features

* **query-params:** introduce ([f44649e](https://github.com/domonda/domonda-js/commit/f44649e))
