const _font = require('./f')
const _fontDebug = require('../build')

/**
 * @param {string} url The full url of the web-font to load, e.g.,
`https://fonts.googleapis.com/css?display=swap&family=Limelight`.
 * @param {Object=} [defaultRanges] When the stylesheet was loaded before body was parsed, there's no way for the script to know which fonts to load based on `unicode-range` property of the `@font-face`. By passing an object with ranges, only specific fonts will be preloaded. Must be an object in the following format (taken directly from the stylesheet):
```js
{
  'U+0000-00FF, U+0131, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD': true
}
```
 */
module.exports = _font

module.exports.debug = _fontDebug