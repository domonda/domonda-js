# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [2.8.3](https://github.com/domonda/domonda-js/compare/@domonda/react-form@2.8.2...@domonda/react-form@2.8.3) (2020-05-18)


### Bug Fixes

* **FormMaskedField:** value is in sync with form ([2e633be](https://github.com/domonda/domonda-js/commit/2e633be10a914d37ebecaa7c9b927911b59668d8)), closes [#54](https://github.com/domonda/domonda-js/issues/54)





## [2.8.2](https://github.com/domonda/domonda-js/compare/@domonda/react-form@2.8.1...@domonda/react-form@2.8.2) (2020-05-15)


### Bug Fixes

* **FormMaskedInput:** value is null when raw input value is an empty string ([91a3c13](https://github.com/domonda/domonda-js/commit/91a3c137beaf00873a5db6973bbb0afd5c270971))





## 2.8.1 (2020-05-15)


### Features

* **FormMaskedField:** use `imask` ([#48](https://github.com/domonda/domonda-js/issues/48)) ([3cc0e62](https://github.com/domonda/domonda-js/commit/3cc0e6258265aa00b76ec4576b742ada58b5e341))
* **workspace:** rework ([#46](https://github.com/domonda/domonda-js/issues/46)) ([ed7279f](https://github.com/domonda/domonda-js/commit/ed7279f7c26255208d4f303002d087d66c51b252))


### BREAKING CHANGES

* **FormMaskedField:** Drop prefix/suffix support for `FormNumberInput`. This feature will return in the future.





# [2.8.0](https://github.com/domonda/domonda-js/compare/@domonda/react-form@2.7.2...@domonda/react-form@2.8.0) (2020-05-06)


### Features

* **FormDateField:** expose `registerLocale` function ([#45](https://github.com/domonda/domonda-js/issues/45)) ([9763dfe](https://github.com/domonda/domonda-js/commit/9763dfe7171ceefc868abbbee2bb31256f3d1c9d))





## [2.7.2](https://github.com/domonda/domonda-js/compare/@domonda/react-form@2.7.1...@domonda/react-form@2.7.2) (2020-04-20)


### Bug Fixes

* **DateInput:** use tooltip z-index ([#40](https://github.com/domonda/domonda-js/issues/40)) ([d5f92a7](https://github.com/domonda/domonda-js/commit/d5f92a7ae84d760c272755ae2d1d9f5b3ba58160))





## [2.7.1](https://github.com/domonda/domonda-js/compare/@domonda/react-form@2.7.0...@domonda/react-form@2.7.1) (2020-03-18)

**Note:** Version bump only for package @domonda/react-form





# [2.7.0](https://github.com/domonda/domonda-js/compare/@domonda/react-form@2.6.0...@domonda/react-form@2.7.0) (2020-03-18)


### Bug Fixes

* **defaultValues:** immutable proper unchanged default values merge ([5812d8c](https://github.com/domonda/domonda-js/commit/5812d8ca97e618c67d917489b60f4d9101aa9e29))
* **Form:** merging default values behaves as expected ([bfb1e79](https://github.com/domonda/domonda-js/commit/bfb1e79bc3c75d87af7113d13c336913db2ce821))


### Features

* **FormArrayField:** introduce array helper allowing for easier array manipulation ([#35](https://github.com/domonda/domonda-js/issues/35)) ([cf37f79](https://github.com/domonda/domonda-js/commit/cf37f79541ac5065b8baa0212249a2d78b598008))





# [2.6.0](https://github.com/domonda/domonda-js/compare/@domonda/react-form@2.5.4...@domonda/react-form@2.6.0) (2020-02-25)


### Features

* **FormRadioField:** introduce ([7700010](https://github.com/domonda/domonda-js/commit/770001013d11a1e16404249c7172f263a17a5ed8))





## [2.5.4](https://github.com/domonda/domonda-js/compare/@domonda/react-form@2.5.3...@domonda/react-form@2.5.4) (2020-01-17)

**Note:** Version bump only for package @domonda/react-form





## [2.5.3](https://github.com/domonda/domonda-js/compare/@domonda/react-form@2.5.2...@domonda/react-form@2.5.3) (2020-01-13)

**Note:** Version bump only for package @domonda/react-form





## [2.5.2](https://github.com/domonda/domonda-js/compare/@domonda/react-form@2.5.1...@domonda/react-form@2.5.2) (2019-12-12)

**Note:** Version bump only for package @domonda/react-form





## [2.5.1](https://github.com/domonda/domonda-js/compare/@domonda/react-form@2.5.0...@domonda/react-form@2.5.1) (2019-12-04)

**Note:** Version bump only for package @domonda/react-form





# [2.5.0](https://github.com/domonda/domonda-js/compare/@domonda/react-form@2.4.12...@domonda/react-form@2.5.0) (2019-12-02)


### Bug Fixes

* **FormDateField:** dont strip time when showing time ([6506264](https://github.com/domonda/domonda-js/commit/650626472e79b82c6578402ca1426501e07b33e1))
* **FormDateField:** forward `showTimeSelect` props ([72ac031](https://github.com/domonda/domonda-js/commit/72ac0318e5bb8a751e045a0f45998bf4fe840127))


### Features

* **Form,FormField:** `transformers` allow the values to be transformed on the fly before notifying any of the subscribers ([7dafca0](https://github.com/domonda/domonda-js/commit/7dafca0e342b7d96f29cc06e6be149e19414c207))





## [2.4.12](https://github.com/domonda/domonda-js/compare/@domonda/react-form@2.4.11...@domonda/react-form@2.4.12) (2019-11-30)


### Bug Fixes

* **FormDateField:** dont strip time when selecting time in the picker ([058d9e4](https://github.com/domonda/domonda-js/commit/058d9e42695ead7d0d7af853eaed2e500d975dc8))
* **FormField:** dont set (create path for) undefined values ([caff778](https://github.com/domonda/domonda-js/commit/caff7787947274e2816921bef17a56ad4dea93d8))





## [2.4.11](https://github.com/domonda/domonda-js/compare/@domonda/react-form@2.4.10...@domonda/react-form@2.4.11) (2019-11-26)

**Note:** Version bump only for package @domonda/react-form





## [2.4.10](https://github.com/domonda/domonda-js/compare/@domonda/react-form@2.4.9...@domonda/react-form@2.4.10) (2019-11-26)

**Note:** Version bump only for package @domonda/react-form





## [2.4.9](https://github.com/domonda/domonda-js/compare/@domonda/react-form@2.4.8...@domonda/react-form@2.4.9) (2019-11-21)

**Note:** Version bump only for package @domonda/react-form





## [2.4.8](https://github.com/domonda/domonda-js/compare/@domonda/react-form@2.4.7...@domonda/react-form@2.4.8) (2019-11-21)

**Note:** Version bump only for package @domonda/react-form





## [2.4.7](https://github.com/domonda/domonda-js/compare/@domonda/react-form@2.4.6...@domonda/react-form@2.4.7) (2019-11-06)

**Note:** Version bump only for package @domonda/react-form





## [2.4.6](https://github.com/domonda/domonda-js/compare/@domonda/react-form@2.4.5...@domonda/react-form@2.4.6) (2019-10-17)

**Note:** Version bump only for package @domonda/react-form





## [2.4.5](https://github.com/domonda/domonda-js/compare/@domonda/react-form@2.4.4...@domonda/react-form@2.4.5) (2019-10-15)

**Note:** Version bump only for package @domonda/react-form





## [2.4.4](https://github.com/domonda/domonda-js/compare/@domonda/react-form@2.4.3...@domonda/react-form@2.4.4) (2019-10-15)


### Bug Fixes

* `classes` prop is partial by definition ([a35de49](https://github.com/domonda/domonda-js/commit/a35de497d74eff9b2dd58245ef016d15322d6ff3))





## [2.4.3](https://github.com/domonda/domonda-js/compare/@domonda/react-form@2.4.2...@domonda/react-form@2.4.3) (2019-10-08)


### Bug Fixes

* **Form:** initialize with correct `disabled` and `readOnly` flags ([38b2dc8](https://github.com/domonda/domonda-js/commit/38b2dc8))





## [2.4.2](https://github.com/domonda/domonda-js/compare/@domonda/react-form@2.4.1...@domonda/react-form@2.4.2) (2019-10-04)

**Note:** Version bump only for package @domonda/react-form





## [2.4.1](https://github.com/domonda/domonda-js/compare/@domonda/react-form@2.4.0...@domonda/react-form@2.4.1) (2019-10-02)

**Note:** Version bump only for package @domonda/react-form





# [2.4.0](https://github.com/domonda/domonda-js/compare/@domonda/react-form@2.3.0...@domonda/react-form@2.4.0) (2019-10-02)


### Bug Fixes

* **useFormMaskedField:** decimal numbers with suffixes ([8f27212](https://github.com/domonda/domonda-js/commit/8f27212)), closes [#24](https://github.com/domonda/domonda-js/issues/24)
* **useFormMaskedField:** value after suffix fix, decimal positioning fix and smaller optimization ([179f912](https://github.com/domonda/domonda-js/commit/179f912))


### Features

* **FormMaskedField:** introduce `isAllowed` check prop ([1f5f924](https://github.com/domonda/domonda-js/commit/1f5f924)), closes [#25](https://github.com/domonda/domonda-js/issues/25)





# [2.3.0](https://github.com/domonda/domonda-js/compare/@domonda/react-form@2.2.2...@domonda/react-form@2.3.0) (2019-10-01)


### Features

* **Form:** introduce `disabled` and `readOnly` props ([0b6b540](https://github.com/domonda/domonda-js/commit/0b6b540))
* **Form:** introduce `disableOnSubmit` option ([67257d0](https://github.com/domonda/domonda-js/commit/67257d0))
* **FormField:** digest the `disabled` and `readOnly` states from the form ([281b1b8](https://github.com/domonda/domonda-js/commit/281b1b8))


### Performance Improvements

* **FormState:** avoid unnecessary calculation ([3488607](https://github.com/domonda/domonda-js/commit/3488607))





## [2.2.2](https://github.com/domonda/domonda-js/compare/@domonda/react-form@2.2.1...@domonda/react-form@2.2.2) (2019-09-25)

**Note:** Version bump only for package @domonda/react-form





## [2.2.1](https://github.com/domonda/domonda-js/compare/@domonda/react-form@2.2.0...@domonda/react-form@2.2.1) (2019-09-13)

**Note:** Version bump only for package @domonda/react-form





# [2.2.0](https://github.com/domonda/domonda-js/compare/@domonda/react-form@2.1.6...@domonda/react-form@2.2.0) (2019-09-10)


### Bug Fixes

* **FormState.test:** drop `only` ([0a2f9da](https://github.com/domonda/domonda-js/commit/0a2f9da))


### Features

* **react-plumb:** introduce ([63bcc72](https://github.com/domonda/domonda-js/commit/63bcc72))





## [2.1.6](https://github.com/domonda/domonda-js/compare/@domonda/react-form@2.1.5...@domonda/react-form@2.1.6) (2019-09-09)

**Note:** Version bump only for package @domonda/react-form





## [2.1.5](https://github.com/domonda/domonda-js/compare/@domonda/react-form@2.1.4...@domonda/react-form@2.1.5) (2019-09-06)

**Note:** Version bump only for package @domonda/react-form





## [2.1.4](https://github.com/domonda/domonda-js/compare/@domonda/react-form@2.1.3...@domonda/react-form@2.1.4) (2019-09-04)

**Note:** Version bump only for package @domonda/react-form





## [2.1.3](https://github.com/domonda/domonda-js/compare/@domonda/react-form@2.1.2...@domonda/react-form@2.1.3) (2019-09-03)

**Note:** Version bump only for package @domonda/react-form





## [2.1.2](https://github.com/domonda/domonda-js/compare/@domonda/react-form@2.1.1...@domonda/react-form@2.1.2) (2019-09-02)

**Note:** Version bump only for package @domonda/react-form





## [2.1.1](https://github.com/domonda/domonda-js/compare/@domonda/react-form@2.1.0...@domonda/react-form@2.1.1) (2019-08-29)


### Bug Fixes

* **Form:** expose submit handler type ([4835089](https://github.com/domonda/domonda-js/commit/4835089))





# [2.1.0](https://github.com/domonda/domonda-js/compare/@domonda/react-form@2.0.1...@domonda/react-form@2.1.0) (2019-08-29)


### Bug Fixes

* **defaultValues:** reset unchanged values on default values change ([cb73c75](https://github.com/domonda/domonda-js/commit/cb73c75))
* **FormMaskedField:** handle custom decimal symbol ([7ab24b2](https://github.com/domonda/domonda-js/commit/7ab24b2))


### Features

* **equality:** use `fast-equals` ([e86cb8d](https://github.com/domonda/domonda-js/commit/e86cb8d))
* **FormDateField:** expose `inputRef` ([201f71d](https://github.com/domonda/domonda-js/commit/201f71d))
* **peerDeps:** require react@^16.9.0 ([ab92e0c](https://github.com/domonda/domonda-js/commit/ab92e0c))





## [2.0.1](https://github.com/domonda/domonda-js/compare/@domonda/react-form@2.0.0...@domonda/react-form@2.0.1) (2019-08-02)

**Note:** Version bump only for package @domonda/react-form





# [2.0.0](https://github.com/domonda/domonda-js/compare/@domonda/react-form@1.3.1...@domonda/react-form@2.0.0) (2019-08-01)


### Bug Fixes

* **FormField:** dispose on unmount ([5900800](https://github.com/domonda/domonda-js/commit/5900800))
* **useFormDateField:** correctly dispose plumb ([70f5a2f](https://github.com/domonda/domonda-js/commit/70f5a2f))
* **useFormField:** dispose only if neccessary ([73739ae](https://github.com/domonda/domonda-js/commit/73739ae))
* **usePlump:** better state management ([208a5b7](https://github.com/domonda/domonda-js/commit/208a5b7))


### Features

* **plumb:** replace RxJS with plumb ([d37439b](https://github.com/domonda/domonda-js/commit/d37439b))
* **usePlumb:** introduce `setWithTimeout` ([72ac263](https://github.com/domonda/domonda-js/commit/72ac263))


### BREAKING CHANGES

* **plumb:** RxJS is not used for the form anymore. We use domonda-plumb instead.





## [1.3.1](https://github.com/domonda/domonda-js/compare/@domonda/react-form@1.3.0...@domonda/react-form@1.3.1) (2019-07-31)


### Bug Fixes

* **useValue:** avoid setting state when unmounted ([c4e3dcc](https://github.com/domonda/domonda-js/commit/c4e3dcc))





# [1.3.0](https://github.com/domonda/domonda-js/compare/@domonda/react-form@1.2.1...@domonda/react-form@1.3.0) (2019-07-26)


### Bug Fixes

* **FormState:** correctly handle changed state ([ce4514b](https://github.com/domonda/domonda-js/commit/ce4514b))
* **FormState:** correctly handle default value changes for non-existant field paths ([8f3d233](https://github.com/domonda/domonda-js/commit/8f3d233))
* **hooks/useValue:** test and correct behaviour ([2a0234a](https://github.com/domonda/domonda-js/commit/2a0234a))


### Features

* **FormChangedState:** introduce ([27496de](https://github.com/domonda/domonda-js/commit/27496de))
* **FormLockedState:** introduce ([d475ccf](https://github.com/domonda/domonda-js/commit/d475ccf))


### Performance Improvements

* **useValue:** filter out stream values which match the state ([8090ae8](https://github.com/domonda/domonda-js/commit/8090ae8))





## [1.2.1](https://github.com/domonda/domonda-js/compare/@domonda/react-form@1.2.0...@domonda/react-form@1.2.1) (2019-07-19)


### Bug Fixes

* **Form:** update fields on reset on default values change ([40077f2](https://github.com/domonda/domonda-js/commit/40077f2))
* **FormDateField:** use portal for picker ([eb22f16](https://github.com/domonda/domonda-js/commit/eb22f16))
* **storybook:** use same react instance ([2dcbf93](https://github.com/domonda/domonda-js/commit/2dcbf93))





# [1.2.0](https://github.com/domonda/domonda-js/compare/@domonda/react-form@1.1.0...@domonda/react-form@1.2.0) (2019-07-19)


### Bug Fixes

* **Form:** shallowly compare default values ([b76e8dd](https://github.com/domonda/domonda-js/commit/b76e8dd))


### Features

* **Form:** implement `resetOnDefaultValuesChange` ([eee8e1e](https://github.com/domonda/domonda-js/commit/eee8e1e))
* **FormState:** changed and invalid selectors ([0a74cce](https://github.com/domonda/domonda-js/commit/0a74cce))





# [1.1.0](https://github.com/domonda/domonda-js/compare/@domonda/react-form@1.0.1...@domonda/react-form@1.1.0) (2019-07-17)

**Note:** Version bump only for package @domonda/react-form





## 1.0.1 (2019-07-17)


### Bug Fixes

* **FormState:** update hook on form change ([6933f0f](https://github.com/domonda/domonda-js/commit/6933f0f))


### Features

* introduce Fields and initial implementation ([fc6e49a](https://github.com/domonda/domonda-js/commit/fc6e49a))
* **domonda-react-form:** introduce ([4a43111](https://github.com/domonda/domonda-js/commit/4a43111))
