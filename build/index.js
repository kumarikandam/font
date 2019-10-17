/* eslint-env browser */
const GOOGLE_URL = 'https://fonts.googleapis.com/css?display=swap&family='

/**
 * @param {string} address The address to load.
 * @param {function(string)} cb The callback to call on complete.
 * @param {string} [marker] Performance annotation.
 */
const prefetch = (address, cb, marker = '') => {
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

/**
 * Loads A Web Font Stylesheet (e.g., Google Fonts) Without Render Blocking And Multiple Layout Updates.
 * @param {string} url The font URL.
 */
function font(url) {
  const FONT = url

  performance.mark('agf-start')

  preloadDone({ href: FONT }, 'js')

  function preloadDone(linkEl, marker = 'link') {
    const href = linkEl.href
    let CSS

    prefetch(href, (result) => {
      CSS = result
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
      const validRanges = Object.keys(ranges).reduce((acc, range) => {
        const reg = ranges[range]
        const valid = reg.test(body)
        if (valid) acc[range] = true
        return acc
      }, {})

      urls = fonts.filter(({ range }) => {
        return range in validRanges
      }).map(({ url: u }) => u)
      if (!urls.length) return loadedCb()

      urls.forEach((address, i) => {
        const link = document.createElement('link')
        link.href = address
        link.rel = 'preload'
        link.as = 'font'
        performance.mark('link-preload-start'+i)
        link.onload = () => loadedCb(i)
        link.setAttribute('crossorigin', true)
        document.head.appendChild(link)
      })
    }, '-' + marker)

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
        style.innerHTML = CSS
        document.head.appendChild(style)

        performance.mark('agf-end')
        performance.measure('@lemuria/font', 'agf-start', 'agf-end')
      }
    }
  }
}

module.exports = font