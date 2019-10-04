# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [2.0.0](https://github.com/domonda/domonda-js/compare/@domonda/react-plumb@1.2.1...@domonda/react-plumb@2.0.0) (2019-10-04)


### Bug Fixes

* **usePlumbState:** guarantee latest change delivery ([0dd5e11](https://github.com/domonda/domonda-js/commit/0dd5e11))


### Features

* **useForceUpdate:** introduce ([33d9bce](https://github.com/domonda/domonda-js/commit/33d9bce))


### BREAKING CHANGES

* **usePlumbState:** Drop `setWithTimeout` prop as it is not necessary anymore. The latest value will always be delivered.





## [1.2.1](https://github.com/domonda/domonda-js/compare/@domonda/react-plumb@1.2.0...@domonda/react-plumb@1.2.1) (2019-10-01)

**Note:** Version bump only for package @domonda/react-plumb





# [1.2.0](https://github.com/domonda/domonda-js/compare/@domonda/react-plumb@1.1.1...@domonda/react-plumb@1.2.0) (2019-09-25)


### Features

* **useDebouncedState:** set state after a delay ([c2697fd](https://github.com/domonda/domonda-js/commit/c2697fd))
* **useSafeState:** calls `setState` only if mounted ([8cca5aa](https://github.com/domonda/domonda-js/commit/8cca5aa))





## [1.1.1](https://github.com/domonda/domonda-js/compare/@domonda/react-plumb@1.1.0...@domonda/react-plumb@1.1.1) (2019-09-13)

**Note:** Version bump only for package @domonda/react-plumb





# [1.1.0](https://github.com/domonda/domonda-js/compare/@domonda/react-plumb@1.0.0...@domonda/react-plumb@1.1.0) (2019-09-10)


### Features

* **usePlumbState:** ignore tag changes when value stays the same ([34db368](https://github.com/domonda/domonda-js/commit/34db368))





# 1.0.0 (2019-09-10)


### Bug Fixes

* **usePlumb:** avoid calling next on initial render ([613587f](https://github.com/domonda/domonda-js/commit/613587f))


### Features

* **domonda-react-plumb:** introduce ([1e8c670](https://github.com/domonda/domonda-js/commit/1e8c670))
* **PlumbContext:** introduce ([dce360b](https://github.com/domonda/domonda-js/commit/dce360b))
* **usePlumb:** introduce ([a742e1d](https://github.com/domonda/domonda-js/commit/a742e1d))
* **usePlumbState:** introduce `stateIsEqual` ([f109000](https://github.com/domonda/domonda-js/commit/f109000))
* **useValueIsEqual:** introduce ([10050c1](https://github.com/domonda/domonda-js/commit/10050c1))
