import { equal, ok } from '@zoroaster/assert'
import Context from '../context'
import font from '../../src'

/** @type {Object.<string, (c: Context)>} */
const T = {
  context: Context,
  'is a function'() {
    equal(typeof font, 'function')
  },
  async 'calls package without error'() {
    await font()
  },
  async 'gets a link to the fixture'({ fixture }) {
    const text = fixture`text.txt`
    const res = await font({
      text,
    })
    ok(res, text)
  },
}

export default T