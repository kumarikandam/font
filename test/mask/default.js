import makeTestSuite from '@zoroaster/mask'
import Context from '../context'
import font from '../../src'

// export default
makeTestSuite('test/result', {
  async getResults() {
    const res = await font({
      text: this.input,
    })
    return res
  },
  context: Context,
})