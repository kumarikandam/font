const _font = require('./f')
const _fontDebug = require('../build')
const _fontPerf = require('./f-perf')

/**
 * @methodType {_lemuria.font}
 */
module.exports = _font

module.exports.debug = _fontDebug
module.exports.performance = _fontPerf