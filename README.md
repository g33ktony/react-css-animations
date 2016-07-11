# react-css-animations
[![Travis][travis-image]][travis-url]

[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

CSS animations made easy with React. All CSS animation properties are inlined,
and vendor prefixed. Animation event listeners are also vendor prefixed.

## Installation
```bash
  $ npm i --save react-css-animations
```
## Usage

```css
@keyframes myAnimation {
  /* ... */
}
```

```js
import React from 'react'
import CSSAnimation from 'react-css-animations'

export default function MyAnimatedComponent() {
  return (
    <CSSAnimation
      name='myAnimation'
      iterationCount={5}
      delay={500}
      duration={1000}
      onStart={() => console.log('Animation started!')}
      onIteration={() => console.log('Animation iteration!')}
      onEnd={() => console.log('Animation ended!')}
    >
      <p>Foo bar</p>
    </CSSAnimation>
  )
}
```

 ## API

### CSSAnimation {React.Component}
Props:
* `onStart` {Function} - Called on "animationstart" event. (`noop`)
* `onIteration` {Function} - Called on "animationiteration" event. (`noop`)
* `onEnd` {Function} - Called on "animationend" event. (`noop`)
* `name` {String} - CSS "animation-name" property. (`""`)
* `timingFunction` {String} - CSS "animation-timing-function" property. (`"linear"`)
* `direction` {String} - CSS "animation-direction" property. (`"normal"`)
* `fillMode` {String} - CSS "animation-fill-mode" property. (`"none"`)
* `playState` {String} - CSS "animation-play-state" property. (`"running"`)
* `delay` {Number} - CSS "animation-delay" property in milliseconds. (`0`)
* `duration` {Number} - CSS "animation-duration" property in milliseconds. (`0`)
* `iterationCount` {Number} - CSS "animation-iteration-count". (`1`)
* `infinite` {Boolean} - Overides `iterationCount`, i.e. "animation-iteration-count: infinite". (`false`)

## LICENSE
MIT

[travis-image]: https://travis-ci.org/nickpisacane/react-css-animations.svg?branch=master
[travis-url]: https://travis-ci.org/nickpisacane/react-css-animations
