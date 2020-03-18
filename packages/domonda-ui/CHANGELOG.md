# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [8.4.1](https://github.com/domonda/domonda-js/compare/@domonda/ui@8.4.0...@domonda/ui@8.4.1) (2020-03-18)


### Bug Fixes

* **Checkbox:** detect if the input is controlled or not in order to provide correct checked states ([a83c81c](https://github.com/domonda/domonda-js/commit/a83c81c19cc6c5f126ac06ab823e8373d7a6e4b9))





# [8.4.0](https://github.com/domonda/domonda-js/compare/@domonda/ui@8.3.0...@domonda/ui@8.4.0) (2020-03-18)


### Bug Fixes

* **Text:** inline is truly `display: inline` ([0c99120](https://github.com/domonda/domonda-js/commit/0c9912021bfecb917b44047f74363dc63b0af871))


### Features

* **Checkbox:** display checked status even when preventing default ([5a49ae3](https://github.com/domonda/domonda-js/commit/5a49ae32452ae2d0d79db43026a81df1bb5e2ae7))





# [8.3.0](https://github.com/domonda/domonda-js/compare/@domonda/ui@8.2.1...@domonda/ui@8.3.0) (2020-02-25)


### Bug Fixes

* **Checkbox:** width fits the content, not the fill width of the container ([9c046b1](https://github.com/domonda/domonda-js/commit/9c046b1174a2a15fa9b7b14c4c5fcfd231fcb30f))
* **Text:** inherit font-size from parent ([a4ef2e3](https://github.com/domonda/domonda-js/commit/a4ef2e3881eecc795b176b9cd24bdcbbd275c593)), closes [#32](https://github.com/domonda/domonda-js/issues/32)


### Features

* **Radio:** introduce radio input ([28cc66b](https://github.com/domonda/domonda-js/commit/28cc66b3263ffa69b18a897313894cebf7395ad4))





## [8.2.1](https://github.com/domonda/domonda-js/compare/@domonda/ui@8.2.0...@domonda/ui@8.2.1) (2020-01-17)

**Note:** Version bump only for package @domonda/ui





# [8.2.0](https://github.com/domonda/domonda-js/compare/@domonda/ui@8.1.3...@domonda/ui@8.2.0) (2020-01-13)


### Bug Fixes

* **Alert:** add right margin to text when actions are present ([23d3e03](https://github.com/domonda/domonda-js/commit/23d3e03bc767277a9a04520860d41d9a1ac78207))
* **Text:** explicit style props take precidence when using inherit ([0250ee6](https://github.com/domonda/domonda-js/commit/0250ee600d4222f54e26659cc7acf03a79427d35))


### Features

* **Text:** introduce `inherit` prop for style inheritance ([0c5d322](https://github.com/domonda/domonda-js/commit/0c5d32239c7d30a434ccf644098839085920e55d))


### Performance Improvements

* **styles:** use memoized derived style over hot function ([4fc76a0](https://github.com/domonda/domonda-js/commit/4fc76a01e8ac3fb250af371baeb0ebe3d5a72394))





## [8.1.3](https://github.com/domonda/domonda-js/compare/@domonda/ui@8.1.2...@domonda/ui@8.1.3) (2019-12-12)


### Bug Fixes

* **Checkbox:** input position is relative to the parent ([e4b4502](https://github.com/domonda/domonda-js/commit/e4b45027a253ebdeaa93b1dda10bb67f000d69d4))
* **Select:** caret vertically centered ([d7d9821](https://github.com/domonda/domonda-js/commit/d7d98212206f8ee86ea70a4f147bffa03d35d030))
* **Select:** vertically center caret ([a76e289](https://github.com/domonda/domonda-js/commit/a76e2893eed328ae6dff3d4f7927173935dff32b))





## [8.1.2](https://github.com/domonda/domonda-js/compare/@domonda/ui@8.1.1...@domonda/ui@8.1.2) (2019-12-04)


### Bug Fixes

* **Accordion:** vertically center items ([99fd338](https://github.com/domonda/domonda-js/commit/99fd33823f90a4243e121a7994629165b4258e5e))
* **Flex:** default wrap is `nowrap` allowing for correct height interpolation in Safari ([0db2c16](https://github.com/domonda/domonda-js/commit/0db2c16a53dd4147e6405b72f98d88ecb4f84727))
* **Input,Checkbox:** explicit items alignment to avoid stretching ([96480ec](https://github.com/domonda/domonda-js/commit/96480ec6d1822849d556bf28ff2821b552e0d78e))
* **RowSticky:** increase z-index over highlighted item ([a16f4cb](https://github.com/domonda/domonda-js/commit/a16f4cb1117832789449b854de2d2e5e1230b14f))


### Performance Improvements

* **Autocomplete:** reduce reflows by using the same Popper instance ([de29ac4](https://github.com/domonda/domonda-js/commit/de29ac448c7b4a0a535c3b8b685caf8fe1da9cd5))





## [8.1.1](https://github.com/domonda/domonda-js/compare/@domonda/ui@8.1.0...@domonda/ui@8.1.1) (2019-12-02)


### Bug Fixes

* **palette:** increate contrast threshold ([fa821fa](https://github.com/domonda/domonda-js/commit/fa821fad850593d315503d322b4501de035a8518))
* **TextArea:** remove usage of naked class ([7a4829a](https://github.com/domonda/domonda-js/commit/7a4829a2ce3db00751405493a993da99ff27a1a3))





# [8.1.0](https://github.com/domonda/domonda-js/compare/@domonda/ui@8.0.3...@domonda/ui@8.1.0) (2019-11-30)


### Bug Fixes

* **Input:** position start/end svgs with `naked` input ([a3e3f48](https://github.com/domonda/domonda-js/commit/a3e3f485f437535c4ac8b4371b9ec63069499023))


### Features

* **Autocomplete:** introduce `inlineMenu` variant & `MenuItemProps` ([1fa0b1e](https://github.com/domonda/domonda-js/commit/1fa0b1edb6f79ae9838652ad61d9df44eac5aeca))





## [8.0.3](https://github.com/domonda/domonda-js/compare/@domonda/ui@8.0.2...@domonda/ui@8.0.3) (2019-11-26)


### Bug Fixes

* **Text:** use `block` display to support parent text alignments ([5420cfe](https://github.com/domonda/domonda-js/commit/5420cfe3081ca1ed2ad2e597856f6c5880e9d6de))





## [8.0.2](https://github.com/domonda/domonda-js/compare/@domonda/ui@8.0.1...@domonda/ui@8.0.2) (2019-11-26)


### Bug Fixes

* **Button:** consistent height even with SVGs ([3416593](https://github.com/domonda/domonda-js/commit/34165934ad898b63716b6354bfec2bd8f6fbf240))
* **Checkbox:** nicer `disabled` state ([4edd8e6](https://github.com/domonda/domonda-js/commit/4edd8e696e338543c9b32d8b9efbb1724f7bf907))
* **layout:** use flex display to make content fit ([fa7694f](https://github.com/domonda/domonda-js/commit/fa7694f1b504f22f49bd3aa868785d17e987125c))
* **RowItem:** :hover color over :visited color ([0626e7b](https://github.com/domonda/domonda-js/commit/0626e7bbf00488c67a78cfd9b33c39ff152b7ce4))
* **Text:** height matches Input/Select height on `contained` variant ([568d2b5](https://github.com/domonda/domonda-js/commit/568d2b59694641a7732da907050b0bcf518c7f2f))
* **TextArea:** behave nicely in flex containers ([67c5199](https://github.com/domonda/domonda-js/commit/67c519988d6f7e4c925c876f9a0eb060dfb3f9de))
* **TextArea:** cannot be of `naked` variant ([9b221d5](https://github.com/domonda/domonda-js/commit/9b221d545431f3b649e2791cb1b9a39803ba3b93))
* **theme:** theme fields are partial ([d7200cd](https://github.com/domonda/domonda-js/commit/d7200cd0da641709852ef9038f71b8c199ffe4d4))


### Performance Improvements

* **Input,TextArea:** no placeholder manipulation on :invalid state (reduces reflow area) ([6ee6288](https://github.com/domonda/domonda-js/commit/6ee62889af5d7f25e059ffbd7312a862b52fd55a))





## [8.0.1](https://github.com/domonda/domonda-js/compare/@domonda/ui@8.0.0...@domonda/ui@8.0.1) (2019-11-21)

**Note:** Version bump only for package @domonda/ui





# [8.0.0](https://github.com/domonda/domonda-js/compare/@domonda/ui@7.0.0...@domonda/ui@8.0.0) (2019-11-21)


### Bug Fixes

* **Avatar:** adjust sizes fit rows nicely ([64839b5](https://github.com/domonda/domonda-js/commit/64839b53d34081763a37f9827a0ca0e353fc8d8d))
* **Flex:** vertically center item children ([3491787](https://github.com/domonda/domonda-js/commit/349178713db5606a772acafa44744cf8803c0da3))
* **Input,TextArea:** remove inset shadow from iOS ([180083d](https://github.com/domonda/domonda-js/commit/180083d9feaa883af3b937d01bad92f3e6d723ee))
* **Svg:** remove line height ([4645bc1](https://github.com/domonda/domonda-js/commit/4645bc110b10aca0da6c51b48f22484042ce6a51))
* **Svg:** use flex display to fit content ([01cbff6](https://github.com/domonda/domonda-js/commit/01cbff6f2e167c8348a571b2da08424516cfaa93))
* micro layout adjustments ([db9141b](https://github.com/domonda/domonda-js/commit/db9141bcb6a813e9afc311169f42e0cb0142e538))


### Features

* **Accordion:** introduce ([66de4eb](https://github.com/domonda/domonda-js/commit/66de4ebb2598d6950d138f3d3957461f55509441))
* **Alert:** design improvements ([32e6002](https://github.com/domonda/domonda-js/commit/32e6002d34f3d835301250137e5c60606e1aabf4))
* **Badge:** introduce ([14b9183](https://github.com/domonda/domonda-js/commit/14b918308fb0fd7aa3e2d3d85a2f3a998b750fea))
* **Button:** less present icons & rework color styling ([02c7e38](https://github.com/domonda/domonda-js/commit/02c7e38648bc829f7636fb45d27a36b82ff06a06))
* **Input:** ellipsis on overflowing text ([15d9ac0](https://github.com/domonda/domonda-js/commit/15d9ac035e870be8499d881063d9c0a7bcc1ba78))
* **Input:** introduce start and end SVG adornments ([2e44c03](https://github.com/domonda/domonda-js/commit/2e44c0350d7ce998feaed6d68116f06c61dc01ee))
* **Label:** drop text transform (letters are not uppercase anymore) ([b3fc2aa](https://github.com/domonda/domonda-js/commit/b3fc2aab25887e9cc2070e593e4df08aa041451d))
* **Pill:** introduce ([81302c3](https://github.com/domonda/domonda-js/commit/81302c30cb4ecad4d4c0ba07c5d142d06f76cbb9))
* **Row:** :visited style on anchor row items ([358bcd3](https://github.com/domonda/domonda-js/commit/358bcd3fe22789b252d5c1cedc052eeafe90dcea))
* **Row:** props extend element attributes ([66473ad](https://github.com/domonda/domonda-js/commit/66473adf0b464bca66ff995ad8d4d0d15e9e1ce7))
* **shape:** add `tiny` variant ([2cc4b9c](https://github.com/domonda/domonda-js/commit/2cc4b9cf5c9b94ce46d5dd29cd1d5f79f3c79634))
* **storybook:** add link to designer ([0acf61d](https://github.com/domonda/domonda-js/commit/0acf61d1a92791f25a3b4dd29bc17027f00f2873))
* **theme:** decreate spread for default shadows ([6407c51](https://github.com/domonda/domonda-js/commit/6407c512986ef384c100f81c1b779a8c693fadc4))


### BREAKING CHANGES

* **Svg:** The `Svg` element has now display set to `flex`. Refactor your layout accordingly.
* **Alert:** The `onClose` handler in the `Alert` component is replaced with an `actions` element. This allows you to add any custom actions you want to the `Alert` itself.





# [7.0.0](https://github.com/domonda/domonda-js/compare/@domonda/ui@6.3.0...@domonda/ui@7.0.0) (2019-11-06)


### Bug Fixes

* **Button:** disabled state on text and link variants ([0629dc0](https://github.com/domonda/domonda-js/commit/0629dc0949274d369a56b29ffda02543d85adf4f))
* **Button:** no text decoration by default ([cae060e](https://github.com/domonda/domonda-js/commit/cae060edf4e77e26a3f0bf8bea0daebab91fb37f))
* **Checkbox:** input over checkbox makes all handlers work ([9218080](https://github.com/domonda/domonda-js/commit/9218080e9051d49c6b2a6eacbae248673f486a7c))
* **Checkbox:** make focusable ([34c3704](https://github.com/domonda/domonda-js/commit/34c37040f06dda113ae12c0239b0658412130ffb))
* **Checkbox:** props extend InputHTMLAttributes ([5c2e0e3](https://github.com/domonda/domonda-js/commit/5c2e0e3f5a3f49febfc9127314c3bba66f66cc80))
* **Input/Select/Button:** pixel perfect height fit ([60591f7](https://github.com/domonda/domonda-js/commit/60591f7150b354cc24eb062b201dba63329ab8f6))
* **Label:** define displayName for easier jss navigation ([58f25c5](https://github.com/domonda/domonda-js/commit/58f25c5aae96458062b5ccf2b72182b172f7732c))
* **Row:** omit item prop from RowItem for string components ([f4b2872](https://github.com/domonda/domonda-js/commit/f4b287214bafeba04c9a31e405ae492263edeeeb))
* **svg:** fill is `currentColor` to always have correct color ([af2addf](https://github.com/domonda/domonda-js/commit/af2addfd9156cd88720a3da81fa4ec3b4613a501))


### Features

* **Alert:** introduce an inline message alert ([a21a4d0](https://github.com/domonda/domonda-js/commit/a21a4d01a78b0e1f3026b8702cefa11e61be3d67))
* **Autocomplete:** flatten `placeholder` Input prop ([fc06822](https://github.com/domonda/domonda-js/commit/fc068224032ddd6e40176d867e8d2a457aa83444))
* **Avatar:** introduce ([c2d4d2b](https://github.com/domonda/domonda-js/commit/c2d4d2bb635761b30cdabf6f18c57e134b067bc5))
* **Button:** domonda button design with svg icons ([dd6d883](https://github.com/domonda/domonda-js/commit/dd6d88378a97b4c0e8f5a83330ab45e80c0896fa))
* **Button:** re-design and drop `IconButton` ([9adac60](https://github.com/domonda/domonda-js/commit/9adac60e6833de3776334ed31b7d9e320f1d1ee9))
* **ButtonGroup:** introduce ([91334b4](https://github.com/domonda/domonda-js/commit/91334b4f5f0aac225cd8fe76db9a3f4e9fba1344))
* **Checkbox:** introduce ([346e101](https://github.com/domonda/domonda-js/commit/346e10143143c6413ef7d398bef7473d7ba4eab7))
* **Input:** introduce `naked` variant ([8af25b7](https://github.com/domonda/domonda-js/commit/8af25b76450e59dc543926c533519bb91e6bcdce))
* **Input:** rename `TextField` to `Input` ([5412168](https://github.com/domonda/domonda-js/commit/5412168ae74f0039de77bb631846e01e76b06a30))
* **Label:** inline optional, block by default ([d48c5aa](https://github.com/domonda/domonda-js/commit/d48c5aa66ae4b90ebe4f2eed92a9b2f273ecbf89))
* **Label:** introduce ([e85a004](https://github.com/domonda/domonda-js/commit/e85a00441be58c1af29d42857c558ba7b461023c))
* **MenuItem:** text is of regular weight ([d97b542](https://github.com/domonda/domonda-js/commit/d97b5420c714fa1c0329c2dd45d98bed10508e1b))
* **palette:** domonda design language ([b8356ec](https://github.com/domonda/domonda-js/commit/b8356eca943bfc0a14bcfc643083a94c93204d86))
* **Paper:** introduce `bordered` prop ([6955af4](https://github.com/domonda/domonda-js/commit/6955af45135925066bd467f3a1cd8c1431675294))
* **Row:** introduce story ([cb6cf40](https://github.com/domonda/domonda-js/commit/cb6cf40b0d772d0096cc1976708b690e3f774602))
* **Select:** re-design ([1ae5e13](https://github.com/domonda/domonda-js/commit/1ae5e13484f6f728af7a66cace9bc3e7ed315214))
* **shadows:** fixed list of possible shadows ([fc2ed41](https://github.com/domonda/domonda-js/commit/fc2ed41c1d75b7db17a05c2cbacdcce7344735e3))
* **shape:** fixed list for borderRadiuses ([b422df0](https://github.com/domonda/domonda-js/commit/b422df00c95a2cb37e76028af8fdd909e4c885fb))
* **spacing:** fixed list of possible spaces ([3c23df4](https://github.com/domonda/domonda-js/commit/3c23df4294afcc0e4dcc4cb22970f7bec7081443))
* **Svg:** container for raw SVGs ([fb9e263](https://github.com/domonda/domonda-js/commit/fb9e2630d4817e463eefac0ef25a9b16843f3639))
* **SvgIcon:** removed ([e134bee](https://github.com/domonda/domonda-js/commit/e134bee59630bdb2a2b194170dd5b1e4c28aa868))
* **Text:** introduce `contained` style ([2f68f21](https://github.com/domonda/domonda-js/commit/2f68f212693c303ccfba820a23407625037dcb03))
* **TextArea:** introduce ([b772c83](https://github.com/domonda/domonda-js/commit/b772c83631e805b1d4d8e788ab61735034aa5d6e))
* **TextField:** re-design ([dd444cc](https://github.com/domonda/domonda-js/commit/dd444ccdccc5c29701849a80b7e4f694749d8cf9))
* **typography:** domonda design language ([d209ef3](https://github.com/domonda/domonda-js/commit/d209ef390acede9220994148bcd237f8ae90d484))


### BREAKING CHANGES

* **SvgIcon:** SvgIcon is dropped in favor of native svg support.
* **Input:** `TextField` component no longer exists in favor of the rename to `Input`.
* **Button:** Button `variant` and `size` props have changed. IconButton no longer exists, it is dropped in favor of just using the Button with an svg inside of it.
* **Alert:** This component supersedes usage of `SuccessInline` and `ErrInline`. The same effect can be achieved with the `Alert` using the `color` prop.
* **palette:** The palette has changed in favor of following the domonda design language. Please take a look at the new shape and features in: `styles/palette` to help you refactor accordingly.
* **shape:** Shape no longer has just one `borderRadius`. You must specify the `borderRadius[‘small’ | ‘pill’]` when applying the shape.
* **shadows:** Shadow is no longer a “magic” number. It has a fixed list of posible shadows which the user has to conform to.
* **spacing:** Spacing is no longer a “magic” number. It has a fixed list of posible spaces which the user has to conform to.
* **typography:** Prop `variant` does not exist on `Text` anymore. The “variant” is now derived by combining the typography’s: `size`, `weight` and `font`.





# [6.3.0](https://github.com/domonda/domonda-js/compare/@domonda/ui@6.2.0...@domonda/ui@6.3.0) (2019-10-17)


### Features

* **MenuItem:** introduce `disabled` prop ([865936d](https://github.com/domonda/domonda-js/commit/865936daffdad3b382cc0796474b66a0505be3a7))





# [6.2.0](https://github.com/domonda/domonda-js/compare/@domonda/ui@6.1.0...@domonda/ui@6.2.0) (2019-10-15)


### Bug Fixes

* **Autocomplete:** adjust definitions for `PopperProps` ([ee5cd04](https://github.com/domonda/domonda-js/commit/ee5cd0402d8bc27db122f6c8294b1122bc659634))
* **Autocomplete:** use `MenuList` over collapsable `Menu` ([6ddf52c](https://github.com/domonda/domonda-js/commit/6ddf52c04b51c25688941a3212e6991460ad2d59))


### Features

* **Autocomplete:** customizable menu width and height ([736467c](https://github.com/domonda/domonda-js/commit/736467cc1e79e8c852001235c2a0624d7e7b7074))
* **Autocomplete:** use `Paper`, smaller adjustments and more props ([d9c5381](https://github.com/domonda/domonda-js/commit/d9c53812c94441a7a0f320cef2ada9a3cc2fc2a9))
* **MenuList:** implement ([cb0215a](https://github.com/domonda/domonda-js/commit/cb0215a56c392e36e4bcbafbb4b45a4597a46fb2))





# [6.1.0](https://github.com/domonda/domonda-js/compare/@domonda/ui@6.0.1...@domonda/ui@6.1.0) (2019-10-15)


### Bug Fixes

* `classes` prop is partial by definition ([a35de49](https://github.com/domonda/domonda-js/commit/a35de497d74eff9b2dd58245ef016d15322d6ff3))


### Features

* **Menu:** introduce possibility to toggle menu ([efcc339](https://github.com/domonda/domonda-js/commit/efcc3396eedd5896cb78b328f6416102f3ee0cfb))





## [6.0.1](https://github.com/domonda/domonda-js/compare/@domonda/ui@6.0.0...@domonda/ui@6.0.1) (2019-10-08)


### Bug Fixes

* **RowHeader:** check fontSize type before calc ([90b751d](https://github.com/domonda/domonda-js/commit/90b751d))





# [6.0.0](https://github.com/domonda/domonda-js/compare/@domonda/ui@5.2.0...@domonda/ui@6.0.0) (2019-10-04)


### Features

* **useForceUpdate:** drop (moved to @domonda/react-plumb) ([9d02e73](https://github.com/domonda/domonda-js/commit/9d02e73))


### BREAKING CHANGES

* **useForceUpdate:** `useForceUpdate` is moved to `@domonda/react-plumb` and does not exist here anymore.





# [5.2.0](https://github.com/domonda/domonda-js/compare/@domonda/ui@5.1.1...@domonda/ui@5.2.0) (2019-10-02)


### Features

* **Autocomplete:** introduce `readOnly` prop ([738d13c](https://github.com/domonda/domonda-js/commit/738d13c))
* **Select:** introduce `readOnly` prop ([6acf417](https://github.com/domonda/domonda-js/commit/6acf417))





## [5.1.1](https://github.com/domonda/domonda-js/compare/@domonda/ui@5.1.0...@domonda/ui@5.1.1) (2019-10-02)


### Bug Fixes

* **Text:** drop unnecessary log ([fdeaee2](https://github.com/domonda/domonda-js/commit/fdeaee2))





# [5.1.0](https://github.com/domonda/domonda-js/compare/@domonda/ui@5.0.0...@domonda/ui@5.1.0) (2019-10-01)


### Bug Fixes

* **useSize:** setting the ref causes a re-render ([d6564ea](https://github.com/domonda/domonda-js/commit/d6564ea))


### Features

* **typography:** introduce `label` variant ([f299089](https://github.com/domonda/domonda-js/commit/f299089))





# [5.0.0](https://github.com/domonda/domonda-js/compare/@domonda/ui@4.1.2...@domonda/ui@5.0.0) (2019-09-25)


### Bug Fixes

* **RowItem:** remove outline on :active ([ee2bc67](https://github.com/domonda/domonda-js/commit/ee2bc67))


### Code Refactoring

* **useDebouncedState:** drop (moved to @domonda/react-plumb) ([68d6a8f](https://github.com/domonda/domonda-js/commit/68d6a8f))


### Features

* **MenuItem:** add focus styles and cleanup ([3ff5dc3](https://github.com/domonda/domonda-js/commit/3ff5dc3))
* introduce `disableCloseAutoFocus` to prevent focusing the close button ([c217e17](https://github.com/domonda/domonda-js/commit/c217e17))
* **useMemoRenderer:** memoized component renderer as a hook ([8493f1d](https://github.com/domonda/domonda-js/commit/8493f1d))


### BREAKING CHANGES

* **useDebouncedState:** `useDebouncedState` is moved to `@domonda/react-plumb` and does not exist here anymore.





## [4.1.2](https://github.com/domonda/domonda-js/compare/@domonda/ui@4.1.1...@domonda/ui@4.1.2) (2019-09-13)

**Note:** Version bump only for package @domonda/ui





## [4.1.1](https://github.com/domonda/domonda-js/compare/@domonda/ui@4.1.0...@domonda/ui@4.1.1) (2019-09-10)

**Note:** Version bump only for package @domonda/ui





# [4.1.0](https://github.com/domonda/domonda-js/compare/@domonda/ui@4.0.1...@domonda/ui@4.1.0) (2019-09-09)


### Features

* **Flex:** introduce `zeroMinWidth` ([dff881c](https://github.com/domonda/domonda-js/commit/dff881c))
* **RowItem:** introduce `clickable` state ([477a616](https://github.com/domonda/domonda-js/commit/477a616))
* **Text:** introduce `withPlaceholder` and `wrap` ([225bfdf](https://github.com/domonda/domonda-js/commit/225bfdf))





## [4.0.1](https://github.com/domonda/domonda-js/compare/@domonda/ui@4.0.0...@domonda/ui@4.0.1) (2019-09-06)


### Performance Improvements

* **Autocomplete:** optimizations and improvements ([507dc8a](https://github.com/domonda/domonda-js/commit/507dc8a))
* **Popper:** avoid creating new `popperOptions` instance on every render ([5264eaf](https://github.com/domonda/domonda-js/commit/5264eaf))





# [4.0.0](https://github.com/domonda/domonda-js/compare/@domonda/ui@3.2.1...@domonda/ui@4.0.0) (2019-09-04)


### Bug Fixes

* **Button:** forward ref and expose classes ([9681549](https://github.com/domonda/domonda-js/commit/9681549))
* **Err:** forward ref to underlying `Flex` ([97ddc94](https://github.com/domonda/domonda-js/commit/97ddc94))
* **overflowing:** drop unnecessary translateZ(0) ([3921000](https://github.com/domonda/domonda-js/commit/3921000))
* **Select.stories:** proper dom nesting and drop `selected` prop ([b34ccc3](https://github.com/domonda/domonda-js/commit/b34ccc3))
* **TrapFocus:** correct `tabIndex` warning ([cbeff5f](https://github.com/domonda/domonda-js/commit/cbeff5f))
* **TrapFocus:** drop invalid warning about `tabIndex` ([fcb9160](https://github.com/domonda/domonda-js/commit/fcb9160))


### Features

* major cleanup and consistency improvements ([3f28060](https://github.com/domonda/domonda-js/commit/3f28060))
* **Grow:** introduce ([c07606e](https://github.com/domonda/domonda-js/commit/c07606e))
* **Popover:** introduce ([2e57e8d](https://github.com/domonda/domonda-js/commit/2e57e8d))
* **Table:** drop in favor of `Row` ([ef78144](https://github.com/domonda/domonda-js/commit/ef78144))


### Performance Improvements

* **Autocomplete:** easier virtualization and smaller optimization ([ed2d605](https://github.com/domonda/domonda-js/commit/ed2d605))


### BREAKING CHANGES

* **Table:** `Table` component has been dropped in favor of the `Row` component.





## [3.2.1](https://github.com/domonda/domonda-js/compare/@domonda/ui@3.2.0...@domonda/ui@3.2.1) (2019-09-03)


### Bug Fixes

* **zIndex:** proper popover and modal control ([1ad0c6b](https://github.com/domonda/domonda-js/commit/1ad0c6b))





# [3.2.0](https://github.com/domonda/domonda-js/compare/@domonda/ui@3.1.0...@domonda/ui@3.2.0) (2019-09-02)


### Bug Fixes

* **transition:** correct getTransitionProps return type ([d947360](https://github.com/domonda/domonda-js/commit/d947360))


### Features

* **Backdrop:** introduce ([4ec297f](https://github.com/domonda/domonda-js/commit/4ec297f))
* **Dialog:** introduce ([e2770dc](https://github.com/domonda/domonda-js/commit/e2770dc))
* **Fade:** introduce ([16dfc33](https://github.com/domonda/domonda-js/commit/16dfc33))
* **Modal:** introduce ([44c0891](https://github.com/domonda/domonda-js/commit/44c0891))
* **Paper:** introduce ([6beeabd](https://github.com/domonda/domonda-js/commit/6beeabd))
* **react-transition-group:** introduce & extend ([ae4e35e](https://github.com/domonda/domonda-js/commit/ae4e35e))
* **theme:** introduce zIndex ([50f9ae0](https://github.com/domonda/domonda-js/commit/50f9ae0))





# [3.1.0](https://github.com/domonda/domonda-js/compare/@domonda/ui@3.0.2...@domonda/ui@3.1.0) (2019-08-29)


### Features

* **peerDeps:** require react@^16.9.0 ([ab92e0c](https://github.com/domonda/domonda-js/commit/ab92e0c))





## [3.0.2](https://github.com/domonda/domonda-js/compare/@domonda/ui@3.0.1...@domonda/ui@3.0.2) (2019-08-02)


### Bug Fixes

* **Flex:** use `style` prop ([b81de78](https://github.com/domonda/domonda-js/commit/b81de78))





## [3.0.1](https://github.com/domonda/domonda-js/compare/@domonda/ui@3.0.0...@domonda/ui@3.0.1) (2019-08-01)

**Note:** Version bump only for package @domonda/ui





# [3.0.0](https://github.com/domonda/domonda-js/compare/@domonda/ui@2.1.0...@domonda/ui@3.0.0) (2019-07-31)


### Bug Fixes

* **Row:** export in index ([72fa842](https://github.com/domonda/domonda-js/commit/72fa842))


### Features

* **RowItem:** style anchor ([f681de9](https://github.com/domonda/domonda-js/commit/f681de9))
* **styles:** expose constants for palette and typography ([685760a](https://github.com/domonda/domonda-js/commit/685760a))
* **Text:** introduce `Component` prop ([daa2665](https://github.com/domonda/domonda-js/commit/daa2665))


### Performance Improvements

* **Autocomplete:** mount `AutoSizer` when opening ([5a4dd8f](https://github.com/domonda/domonda-js/commit/5a4dd8f))
* **Box:** remove dynamic styles ([811960c](https://github.com/domonda/domonda-js/commit/811960c))
* **Button:** remove dynamic styles ([b3a4c85](https://github.com/domonda/domonda-js/commit/b3a4c85))
* **Divider:** remove dynamic styles ([d7bdb0f](https://github.com/domonda/domonda-js/commit/d7bdb0f))
* **Flex:** remove dynamic styles ([29ffba6](https://github.com/domonda/domonda-js/commit/29ffba6))
* **Grid:** remove dynamic styles ([ba6600f](https://github.com/domonda/domonda-js/commit/ba6600f))
* **Text:** remove dynamic styles ([8d234b6](https://github.com/domonda/domonda-js/commit/8d234b6))


### BREAKING CHANGES

* **Button:** removed prop `colorVariant` from `Button`





# [2.1.0](https://github.com/domonda/domonda-js/compare/@domonda/ui@2.0.0...@domonda/ui@2.1.0) (2019-07-26)


### Features

* **Autocomplete:** expose `ListProps` ([1cc8728](https://github.com/domonda/domonda-js/commit/1cc8728))
* **Row:** introduce ([468f7f2](https://github.com/domonda/domonda-js/commit/468f7f2))





# [2.0.0](https://github.com/domonda/domonda-js/compare/@domonda/ui@1.1.0...@domonda/ui@2.0.0) (2019-07-19)


### Bug Fixes

* **MenuItem:** lighter hover background ([9b8d07e](https://github.com/domonda/domonda-js/commit/9b8d07e))
* **TextField:** nicer disabled state ([1ce5d5f](https://github.com/domonda/domonda-js/commit/1ce5d5f))


### Code Refactoring

* **Select:** rename `NativeSelect` to `Select` ([a16ea94](https://github.com/domonda/domonda-js/commit/a16ea94))


### Features

* **Select:** improvements and stories ([14378c8](https://github.com/domonda/domonda-js/commit/14378c8))
* **TextField:** improvements and `dense` mode ([30065c9](https://github.com/domonda/domonda-js/commit/30065c9))


### BREAKING CHANGES

* **Select:** `NativeSelect` has been renamed to `Select`.





# [1.1.0](https://github.com/domonda/domonda-js/compare/@domonda/ui@1.0.7...@domonda/ui@1.1.0) (2019-07-17)


### Bug Fixes

* **Flex:** fill considering spacing ([4ada098](https://github.com/domonda/domonda-js/commit/4ada098)), closes [#4](https://github.com/domonda/domonda-js/issues/4)


### Features

* **jss:** auto-install and explicit instance usage ([dfc1f00](https://github.com/domonda/domonda-js/commit/dfc1f00))





## [1.0.7](https://github.com/domonda/domonda-js/compare/@domonda/ui@1.0.6...@domonda/ui@1.0.7) (2019-07-08)


### Bug Fixes

* move `styles.d` definitions to `createStyles` ([95f858d](https://github.com/domonda/domonda-js/commit/95f858d))





## [1.0.6](https://github.com/domonda/domonda-js/compare/@domonda/ui@1.0.5...@domonda/ui@1.0.6) (2019-07-08)


### Features

* **makeStyles:** implement `makeStyles` hook ([e3ae160](https://github.com/domonda/domonda-js/commit/e3ae160))
* **Table:** improvements ([f61d217](https://github.com/domonda/domonda-js/commit/f61d217))
* dont set displayNames in production ([cfa2d76](https://github.com/domonda/domonda-js/commit/cfa2d76))





## [1.0.5](https://github.com/domonda/domonda-js/compare/@domonda/ui@1.0.4...@domonda/ui@1.0.5) (2019-07-05)


### Features

* **jss:** omit class name prefix on prod build ([b5585d0](https://github.com/domonda/domonda-js/commit/b5585d0))





## [1.0.4](https://github.com/domonda/domonda-js/compare/@domonda/ui@1.0.3...@domonda/ui@1.0.4) (2019-07-05)


### Bug Fixes

* ensure all components have a displayName ([2688d68](https://github.com/domonda/domonda-js/commit/2688d68))


### Features

* **jss:** minify class names on in production ([bfcf968](https://github.com/domonda/domonda-js/commit/bfcf968))





## [1.0.3](https://github.com/domonda/domonda-js/compare/@domonda/ui@1.0.2...@domonda/ui@1.0.3) (2019-07-05)


### Bug Fixes

* **deps:** add missing `deepmerge` dependency ([7501c3e](https://github.com/domonda/domonda-js/commit/7501c3e))
* **deps:** add missing `react-virtualized` dependency ([5436975](https://github.com/domonda/domonda-js/commit/5436975))





## [1.0.2](https://github.com/domonda/domonda-js/compare/@domonda/ui@1.0.1...@domonda/ui@1.0.2) (2019-07-04)

**Note:** Version bump only for package @domonda/ui





## [1.0.1](https://github.com/domonda/domonda-js/compare/@domonda/ui@1.0.0...@domonda/ui@1.0.1) (2019-07-04)


### Bug Fixes

* copy npm necessary files and flatten lib ([0f63f20](https://github.com/domonda/domonda-js/commit/0f63f20))
* publish with public access ([d61715c](https://github.com/domonda/domonda-js/commit/d61715c))





# 1.0.0 (2019-07-04)


### Features

* **@domonda/ui:** introduce ([33da8f2](https://github.com/domonda/domonda-js/commit/33da8f2))
