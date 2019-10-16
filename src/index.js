import { debuglog } from 'util'

const LOG = debuglog('@lemuria/font')

/**
 * Loads A Web Font Stylesheet (e.g., Google Fonts) Without Render Blocking And Multiple Layout Updates.
 * @param {_@lemuria/font.Config} [config] Options for the program.
 * @param {boolean} [config.shouldRun=true] A boolean option. Default `true`.
 * @param {string} config.text A text to return.
 */
export default async function font(config = {}) {
  const {
    shouldRun = true,
    text,
  } = config
  if (!shouldRun) return
  LOG('@lemuria/font called with %s', text)
  return text
}

/* documentary types/index.xml */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {_@lemuria/font.Config} Config Options for the program.
 */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {Object} _@lemuria/font.Config Options for the program.
 * @prop {boolean} [shouldRun=true] A boolean option. Default `true`.
 * @prop {string} text A text to return.
 */
