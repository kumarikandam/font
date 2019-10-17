/* eslint-env browser */
const GOOGLE_URL = 'https://fonts.googleapis.com/css?display=swap&family='

/**
 * Loads A Web Font Stylesheet (e.g., Google Fonts) Without Render Blocking And Multiple Layout Updates.
 * @param {string} url The full url of the web-font to load, e.g., `https://fonts.googleapis.com/css?display=swap&family=Limelight`.
 * @param {Object=} [defaultRanges] When the stylesheet was loaded before body was parsed, there's no way for the script to know which fonts to load based on `unicode-range` property of the `@font-face`. By passing an object with ranges, only specific fonts will be preloaded. Must be an object in the following format (taken directly from the stylesheet):
```js
{
  'U+0000-00FF, U+0131, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD': true
}
```
 */
export default function font(url, defaultRanges = {}) {
  /**
   * @param {string} address The address to load.
   * @param {function(string)} cb The callback to call on complete.
   * @param {string} [marker] Performance annotation.
   */
  const fetchStylesheet = (address, cb, marker = '') => {
    performance.mark('xhr-start'+marker)
    const xhr = new XMLHttpRequest()
    xhr.onreadystatechange = () => {
      if(xhr.readyState == 4) {
        if (xhr.status == 200) {
          cb(xhr.responseText)
          performance.mark('xhr-end'+marker)
          performance.measure('xhr'+marker, 'xhr-start'+marker, 'xhr-end'+marker)
        } else {
          console.error('Error loading webfont: server responded with code %s at %s', xhr.status, address)
        }
      }
    }
    xhr.open('GET', address)
    try {
      xhr.send(null)
    } catch (err) {
      console.error(err)
    }
  }

  const FONT = url

  performance.mark('agf-start')

  let FONT_CSS
  startPreload({ href: FONT }, 'js')

  function parseBody(result) {
    const re = /url\((.+?)\).*?;\s+unicode-range: (.+?);/g
    let ranges = {}
    const fonts = []
    let a
    while((a = re.exec(result))) {
      const [, u, range] = a
      fonts.push({ url: u, range })
      ranges[range] = 1
    }
    ranges = Object.keys(ranges).reduce((acc, range) => {
      const reg = range
        .split(/,\s/)
        .map((r) => r.replace('U+', '\\u').replace('-', '-\\u'))
        .join('').toLowerCase()
      acc[range] = new RegExp(`[${reg}]`)
      return acc
    }, {})

    const body = document.body ? document.body.innerText : ''
    const validRanges = body ? Object.keys(ranges).reduce((acc, range) => {
      const reg = ranges[range]
      const valid = reg.test(body)
      if (valid) acc[range] = true
      return acc
    }, {}) : Object.keys(ranges).reduce((acc, range) => {
      const valid = range in defaultRanges
      if (valid) acc[range] = true
      return acc
    }, {})

    urls = fonts.filter(({ range }) => {
      return range in validRanges
    }).map(({ url: u }) => u)
    if (!urls.length) return loadedCb()

    const fragment = document.createDocumentFragment()
    urls.forEach((address, i) => {
      const link = document.createElement('link')
      link.href = address
      link.rel = 'preload'
      link.as = 'font'
      performance.mark('link-preload-start'+i)
      link.onload = () => loadedCb(i)
      link.setAttribute('crossorigin', true)
      fragment.appendChild(link)
    })
    document.head.appendChild(fragment)
  }

  function startPreload(linkEl, marker = 'link') {
    const href = linkEl.href
    fetchStylesheet(href, (res) => {
      FONT_CSS = res
      parseBody(FONT_CSS)
    }, '-' + marker)
  }
  let urls = []
  let loaded = 0
  /**
   * @param {number} [i] The index of the link
   */
  const loadedCb = (i) => {
    if (i) {
      performance.mark('link-preload-end'+i)
      performance.measure('link-preload', 'link-preload-start'+i, 'link-preload-end'+i)
    }
    loaded++
    if (loaded >= urls.length) {
      const style = document.createElement('style')
      style.innerHTML = FONT_CSS
      document.head.appendChild(style)

      performance.mark('agf-end')
      performance.measure('@lemuria/font', 'agf-start', 'agf-end')
    }
  }
}

export const debug = font

// latin: 'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD'