# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [2.3.4](https://github.com/domonda/domonda-js/compare/@domonda/form@2.3.3...@domonda/form@2.3.4) (2020-05-15)

**Note:** Version bump only for package @domonda/form





## 2.3.3 (2020-05-15)

**Note:** Version bump only for package @domonda/form





## [2.3.2](https://github.com/domonda/domonda-js/compare/@domonda/form@2.3.1...@domonda/form@2.3.2) (2020-04-20)

**Note:** Version bump only for package @domonda/form





## [2.3.1](https://github.com/domonda/domonda-js/compare/@domonda/form@2.3.0...@domonda/form@2.3.1) (2020-03-18)


### Bug Fixes

* **defaultValues:** immutable proper unchanged default values merge ([5812d8c](https://github.com/domonda/domonda-js/commit/5812d8ca97e618c67d917489b60f4d9101aa9e29))





# [2.3.0](https://github.com/domonda/domonda-js/compare/@domonda/form@2.2.4...@domonda/form@2.3.0) (2019-12-02)


### Features

* **Form,FormField:** `transformers` allow the values to be transformed on the fly before notifying any of the subscribers ([7dafca0](https://github.com/domonda/domonda-js/commit/7dafca0e342b7d96f29cc06e6be149e19414c207))





## [2.2.4](https://github.com/domonda/domonda-js/compare/@domonda/form@2.2.3...@domonda/form@2.2.4) (2019-11-30)


### Bug Fixes

* **FormField:** dont set (create path for) undefined values ([caff778](https://github.com/domonda/domonda-js/commit/caff7787947274e2816921bef17a56ad4dea93d8))





## [2.2.3](https://github.com/domonda/domonda-js/compare/@domonda/form@2.2.2...@domonda/form@2.2.3) (2019-11-21)

**Note:** Version bump only for package @domonda/form





## [2.2.2](https://github.com/domonda/domonda-js/compare/@domonda/form@2.2.1...@domonda/form@2.2.2) (2019-10-15)


### Bug Fixes

* **Form:** default values can be an array (not recommended though) ([28cee7d](https://github.com/domonda/domonda-js/commit/28cee7d468a3981a31ba77a1665b0d5539c9f7f1))





## [2.2.1](https://github.com/domonda/domonda-js/compare/@domonda/form@2.2.0...@domonda/form@2.2.1) (2019-10-08)

**Note:** Version bump only for package @domonda/form





# [2.2.0](https://github.com/domonda/domonda-js/compare/@domonda/form@2.1.6...@domonda/form@2.2.0) (2019-10-01)


### Bug Fixes

* **FormField:** override existing values with incoming change ([d6e5469](https://github.com/domonda/domonda-js/commit/d6e5469))


### Features

* **Form:** introduce `disableOnSubmit` option ([67257d0](https://github.com/domonda/domonda-js/commit/67257d0))
* introduce `disabled` and `readOnly` states ([b43f21a](https://github.com/domonda/domonda-js/commit/b43f21a))
* **FormField:** deep equality for changed state ([0c86167](https://github.com/domonda/domonda-js/commit/0c86167))


### Performance Improvements

* **FormField:** first check for `disabled` or `readOnly` changes ([cc9c4bf](https://github.com/domonda/domonda-js/commit/cc9c4bf))
* **FormField:** use plumb `tag`s for filtering ([5c9a0e6](https://github.com/domonda/domonda-js/commit/5c9a0e6))





## [2.1.6](https://github.com/domonda/domonda-js/compare/@domonda/form@2.1.5...@domonda/form@2.1.6) (2019-09-25)

**Note:** Version bump only for package @domonda/form





## [2.1.5](https://github.com/domonda/domonda-js/compare/@domonda/form@2.1.4...@domonda/form@2.1.5) (2019-09-13)

**Note:** Version bump only for package @domonda/form





## [2.1.4](https://github.com/domonda/domonda-js/compare/@domonda/form@2.1.3...@domonda/form@2.1.4) (2019-09-10)

**Note:** Version bump only for package @domonda/form





## [2.1.3](https://github.com/domonda/domonda-js/compare/@domonda/form@2.1.2...@domonda/form@2.1.3) (2019-09-09)

**Note:** Version bump only for package @domonda/form





## [2.1.2](https://github.com/domonda/domonda-js/compare/@domonda/form@2.1.1...@domonda/form@2.1.2) (2019-09-06)

**Note:** Version bump only for package @domonda/form





## [2.1.1](https://github.com/domonda/domonda-js/compare/@domonda/form@2.1.0...@domonda/form@2.1.1) (2019-09-04)

**Note:** Version bump only for package @domonda/form





# [2.1.0](https://github.com/domonda/domonda-js/compare/@domonda/form@2.0.1...@domonda/form@2.1.0) (2019-08-29)


### Bug Fixes

* **FormField:** set internal values only on change ([2ba8c16](https://github.com/domonda/domonda-js/commit/2ba8c16))


### Features

* **equality:** use `fast-equals` ([e86cb8d](https://github.com/domonda/domonda-js/commit/e86cb8d))
* **FormTag:** introduce and use plumb tags ([640672a](https://github.com/domonda/domonda-js/commit/640672a))
* **submit:** autosubmit even if currently submitting ([1088a2e](https://github.com/domonda/domonda-js/commit/1088a2e))





## [2.0.1](https://github.com/domonda/domonda-js/compare/@domonda/form@2.0.0...@domonda/form@2.0.1) (2019-08-02)

**Note:** Version bump only for package @domonda/form





# [2.0.0](https://github.com/domonda/domonda-js/compare/@domonda/form@1.2.2...@domonda/form@2.0.0) (2019-08-01)


### Bug Fixes

* **Form:** plumb might be disposed before submit finishes ([e8e06d9](https://github.com/domonda/domonda-js/commit/e8e06d9))


### Features

* **plumb:** replace RxJS with plumb ([d37439b](https://github.com/domonda/domonda-js/commit/d37439b))


### BREAKING CHANGES

* **plumb:** RxJS is not used for the form anymore. We use domonda-plumb instead.





## [1.2.2](https://github.com/domonda/domonda-js/compare/@domonda/form@1.2.1...@domonda/form@1.2.2) (2019-07-31)

**Note:** Version bump only for package @domonda/form





## [1.2.1](https://github.com/domonda/domonda-js/compare/@domonda/form@1.2.0...@domonda/form@1.2.1) (2019-07-26)


### Bug Fixes

* **FormState:** correctly handle changed state ([ce4514b](https://github.com/domonda/domonda-js/commit/ce4514b))
* **FormState:** correctly handle default value changes for non-existant field paths ([8f3d233](https://github.com/domonda/domonda-js/commit/8f3d233))





# [1.2.0](https://github.com/domonda/domonda-js/compare/@domonda/form@1.1.1...@domonda/form@1.2.0) (2019-07-19)


### Bug Fixes

* **Form:** update fields on reset after submit ([94a6403](https://github.com/domonda/domonda-js/commit/94a6403))


### Features

* **FormField:** guarantee changed flag consistency ([deaa987](https://github.com/domonda/domonda-js/commit/deaa987))





## [1.1.1](https://github.com/domonda/domonda-js/compare/@domonda/form@1.1.0...@domonda/form@1.1.1) (2019-07-19)


### Bug Fixes

* **Form:** correctly reset form ([cd79d95](https://github.com/domonda/domonda-js/commit/cd79d95))
* **Form:** submit handler can return whatever ([0a9e42b](https://github.com/domonda/domonda-js/commit/0a9e42b))





# [1.1.0](https://github.com/domonda/domonda-js/compare/@domonda/form@1.0.2...@domonda/form@1.1.0) (2019-07-17)


### Bug Fixes

* **FormField:** correctly handle change ([f9ce7dd](https://github.com/domonda/domonda-js/commit/f9ce7dd))
* **FormField:** pass validation tests ([719c20c](https://github.com/domonda/domonda-js/commit/719c20c))
* **FormField:** values should not be on the form field ([1609abb](https://github.com/domonda/domonda-js/commit/1609abb))
* dispatched submit is cancelable ([cada13a](https://github.com/domonda/domonda-js/commit/cada13a))


### Features

* **validation:** debounce only if necessary ([187d9c2](https://github.com/domonda/domonda-js/commit/187d9c2))


### Performance Improvements

* **FormField:** store curr validaiton message locally ([b9afc91](https://github.com/domonda/domonda-js/commit/b9afc91))





## [1.0.2](https://github.com/domonda/domonda-js/compare/@domonda/form@1.0.1...@domonda/form@1.0.2) (2019-07-09)


### Bug Fixes

* **config:** handle el properly and add more tests ([cffcdb7](https://github.com/domonda/domonda-js/commit/cffcdb7))


### Features

* export `eqality` from index ([e7c1170](https://github.com/domonda/domonda-js/commit/e7c1170))





## [1.0.1](https://github.com/domonda/domonda-js/compare/@domonda/form@1.0.0...@domonda/form@1.0.1) (2019-07-04)


### Bug Fixes

* copy npm necessary files and flatten lib ([0f63f20](https://github.com/domonda/domonda-js/commit/0f63f20))
* publish with public access ([d61715c](https://github.com/domonda/domonda-js/commit/d61715c))





# 1.0.0 (2019-07-04)


### Features

* **@domonda/form:** introduce ([53c26f0](https://github.com/domonda/domonda-js/commit/53c26f0))
