# @lemuria/font

[![npm version](https://badge.fury.io/js/%40lemuria%2Ffont.svg)](https://npmjs.org/package/@lemuria/font)

`@lemuria/font` Loads A Web Font Stylesheet (e.g., _Google Fonts_) Without Render Blocking And Multiple Layout Updates.

The core function of this package should be placed in the `head` tag of the document where loading of the font is required. It will create an XHR request to the stylesheet, extract URLs of fonts referenced in it, add preload links to them, and only after each one of them has loaded, embed the stylesheet into the document. This allows to:

- Loads the stylesheet asynchronously without blocking the main thread.
- Prevents updating of layouts when a) stylesheet is loaded, b) each single font is loaded; and only updates the layout **once** when everything is ready.
- Allows to load the stylesheet faster than waiting for `onload` event when set on the link which has to await for the main thread unlike XHR, e.g.,
    ```html
    <!-- slower that @lemuria/font -->
    <link rel="preload"
      href="https://fonts.googleapis.com/css?display=swap&family=Gentium+Basic"
      crossorigin as="style" onload="this.rel='stylesheet';this.onload=null">
    ```

<img src="docs/advanced.jpg" alt="advanced google font preloading performance diagram">

```sh
yarn add @lemuria/font
```

## Table Of Contents

- [Table Of Contents](#table-of-contents)
- [API](#api)
- [`font(url, defaultRanges=): void`](#fonturl-stringdefaultranges-object-void)
- [Copyright](#copyright)

<p align="center"><a href="#table-of-contents">
  <img src="/.documentary/section-breaks/0.svg?sanitize=true">
</a></p>

## API

The compiled function should be added to the head:

```js
(function(){function u(e){var h=0;return function(){return h<e.length?{done:!1,value:e[h++]}:{done:!0}}}function v(e){var h="undefined"!=typeof Symbol&&Symbol.iterator&&e[Symbol.iterator];return h?h.call(e):{next:u(e)}};window["@lemuria/font"]=function(e){function h(n,p,a){a=void 0===a?"":a;performance.mark("xhr-start"+a);var c=new XMLHttpRequest;c.onreadystatechange=function(){4==c.readyState&&(200==c.status?(p(c.responseText),performance.mark("xhr-end"+a),performance.measure("xhr"+a,"xhr-start"+a,"xhr-end"+a)):console.error("Error loading webfont: server responded with code %s at %s",c.status,n))};c.open("GET",n);try{c.send(null)}catch(k){console.error(k)}}performance.mark("agf-start");(function(n,p){function a(d){d&&
(performance.mark("link-preload-end"+d),performance.measure("link-preload","link-preload-start"+d,"link-preload-end"+d));r++;r>=k.length&&(d=document.createElement("style"),d.innerHTML=c,document.head.appendChild(d),performance.mark("agf-end"),performance.measure("@lemuria/font","agf-start","agf-end"))}var c;h(n.href,function(d){c=d;for(var w=/url\((.+?)\).*?;\s+unicode-range: (.+?);/g,m={},t=[],q;q=w.exec(d);){var l=v(q);l.next();q=l.next().value;l=l.next().value;t.push({url:q,a:l});m[l]=1}m=Object.keys(m).reduce(function(b,
f){var g=f.split(/,\s/).map(function(x){return x.replace("U+","\\u").replace("-","-\\u")}).join("").toLowerCase();b[f]=new RegExp("["+g+"]");return b},{});var y=document.body?document.body.innerText:"",z=Object.keys(m).reduce(function(b,f){m[f].test(y)&&(b[f]=!0);return b},{});k=t.filter(function(b){return b.a in z}).map(function(b){return b.url});if(!k.length)return a();k.forEach(function(b,f){var g=document.createElement("link");g.href=b;g.rel="preload";g.as="font";performance.mark("link-preload-start"+
f);g.onload=function(){return a(f)};g.setAttribute("crossorigin",!0);document.head.appendChild(g)})},"-"+(void 0===p?"link":p));var k=[],r=0})({href:e},"js")};}).call(this);

//# sourceMappingURL=font.js.map
```

Then it can be called:

```js
window['@lemuria/font']('https://fonts.googleapis.com/css?display=swap&family=Gentium+Basic')
```

`Display:swap` does not really matter, it is there to please _Lighthouse_.

If a function needs to be added on the server for SSR, it can be imported via the default export (see the SSR example below):

```js
import font from '@lemuria/font'
```

<p align="center"><a href="#table-of-contents">
  <img src="/.documentary/section-breaks/1.svg?sanitize=true">
</a></p>

## <code><ins>font</ins>(</code><sub><br/>&nbsp;&nbsp;`url: string,`<br/>&nbsp;&nbsp;`defaultRanges=: Object,`<br/></sub><code>): <i>void</i></code>
 - <kbd><strong>url*</strong></kbd> <em>`string`</em>: The full url of the web-font to load, e.g.,
`https://fonts.googleapis.com/css?display=swap&family=Limelight`.
 - <kbd>defaultRanges</kbd> <em>`Object`</em> (optional): When the stylesheet was loaded before body was parsed, there's no way for the script to know which fonts to load based on `unicode-range` property of the `@font-face`. By passing an object with ranges, only specific fonts will be preloaded. Must be an object in the following format:
```js
{ 'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD': true }
```

```jsx
import font from '../src'
import idio from '@idio/idio'
import render from '@depack/render'

(async () => {
  const FONT = 'Gentium+Basic:400,400i,700|Limelight'
  const URL = `https://fonts.googleapis.com/css?display=swap&family=${FONT}`

  const { app, url } = await idio({
    async render(ctx) {
      ctx.body = render(<html>
        <head>
          <link rel="dns-prefetch" href="//fonts.googleapis.com"/>
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin/>
          <link rel="preload" href={URL} crossOrigin as="fetch"/>
          <script dangerouslySetInnerHTML={{ __html:
            `(${font.toString()})('${URL}')` }}/>
          <style>
            {`h1 { font-family: 'Limelight', cursive }
              p { font-family: 'Gentium Basic', serif }
            `}
          </style>
        </head>
        <body>
          <h1>Hello World</h1>
          <p>Example text.</p>
        </body>
      </html>, { addDoctype: true })
    },
  })
  console.log(url)
})()
```

<p align="center"><a href="#table-of-contents">
  <img src="/.documentary/section-breaks/2.svg?sanitize=true">
</a></p>

## Copyright

<table>
  <tr>
    <th>
      <a href="https://artd.eco">
        <img width="100" src="https://raw.githubusercontent.com/wrote/wrote/master/images/artdeco.png"
          alt="Art Deco">
      </a>
    </th>
    <th>© <a href="https://artd.eco">Art Deco</a>   2019</th>
    <th>
      <a href="https://www.technation.sucks" title="Tech Nation Visa">
        <img width="100" src="https://raw.githubusercontent.com/idiocc/cookies/master/wiki/arch4.jpg"
          alt="Tech Nation Visa">
      </a>
    </th>
    <th><a href="https://www.technation.sucks">Tech Nation Visa Sucks</a></th>
  </tr>
</table>

<p align="center"><a href="#table-of-contents">
  <img src="/.documentary/section-breaks/-1.svg?sanitize=true">
</a></p>