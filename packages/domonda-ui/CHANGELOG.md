# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

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
