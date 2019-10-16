/* alanode example/ */
import font from '../src'

(async () => {
  const res = await font({
    text: 'example',
  })
  console.log(res)
})()