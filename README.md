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
  * [Fallback](#fallback)
  * [SSR](#ssr)
- [`font(url, defaultRanges=): void`](#fonturl-stringdefaultranges-object-void)
- [Copyright](#copyright)

<p align="center"><a href="#table-of-contents">
  <img src="/.documentary/section-breaks/0.svg?sanitize=true">
</a></p>

## API

The compiled function should be added first thing to the head:

```js
(function(){window["@lemuria/font"]=function(q,k){function x(a){for(var f=/url\((.+?)\).*?;\s+unicode-range: (.+?);/g,b={},d=[],h;h=f.exec(a);){var r=h[2];d.push({url:h[1],a:r});b[r]=1}b=Object.keys(b).reduce(function(c,e){var g=e.split(/,\s/).map(function(l){return l.replace("U+","\\u").replace("-","-\\u")}).join("").toLowerCase();c[e]=new RegExp("["+g+"]");return c},{});var t=document.body?document.body.textContent:"",y=t?Object.keys(b).reduce(function(c,e){b[e].test(t)&&(c[e]=!0);return c},{}):Object.keys(b).reduce(function(c,
e){e in k&&(c[e]=!0);return c},{});m=d.filter(function(c){return c.a in y}).map(function(c){return c.url});if(!m.length)return u();var v=document.createDocumentFragment();m.forEach(function(c,e){var g=document.createElement("link");g.href=c;g.rel="preload";g.as="font";var l=e+1;;g.onload=function(){return u(l)};g.setAttribute("crossorigin",!0);v.appendChild(g)});document.head.appendChild(v)}k=void 0===k?{}:k;var n=document.createElement("link");if(function(a,
f){if(!a||!a.supports)return!1;try{return a.supports(f)}catch(b){return!1}}(n.relList,"preload")){var z=function(a,f,b){b=void 0===b?"":b;;var d=new XMLHttpRequest;d.onreadystatechange=function(){4==d.readyState&&(200==d.status?(f(d.responseText)):console.error("Error loading webfont: server responded with code %s at %s",d.status,a))};d.open("GET",a);try{d.send(null)}catch(h){console.error(h)}};
;var p;(function(a,f){z(a.href,function(b){p=b;x(p)},"-"+(void 0===f?"link":f))})({href:q},"js");var m=[],w=0,u=function(a){w++;w>=m.length&&(a=document.createElement("style"),a.innerHTML=p,document.head.appendChild(a))}}else n.rel="stylesheet",n.href=q,document.head.appendChild(n)};}).call(this);
```

Then it can be called:

```js
window['@lemuria/font']('https://fonts.googleapis.com/css?display=swap&family=Gentium+Basic')
```

The `display=swap` param does not really matter, it is there to please _Lighthouse_.

There are additional elements to be added to the head for optimisation. Overall you get:

```html
<!DOCTYPE html>
<html>
  <head>
    <link rel="dns-prefetch" href="//fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="preload" crossorigin as="fetch"
      href="https://fonts.googleapis.com/css?display=swap&family=Gentium+Basic">
    <script>
      // <@lemuria/font copy-paste source>
      window['@lemuria/font']
        ('https://fonts.googleapis.com/css?display=swap&family=Gentium+Basic')
    </script>
    <link rel="stylesheet" href="style.css">
  </head>
  <body>
    <h1> Summertime </h1>
    <p> and the livin's easy </p>
  </body>
</html>
```

<details>
<summary><em>The debug version with performance markers:</em></summary>

```js
(function(){window["@lemuria/font"]=function(q,k){function x(a){for(var f=/url\((.+?)\).*?;\s+unicode-range: (.+?);/g,b={},d=[],h;h=f.exec(a);){var r=h[2];d.push({url:h[1],a:r});b[r]=1}b=Object.keys(b).reduce(function(c,e){var g=e.split(/,\s/).map(function(l){return l.replace("U+","\\u").replace("-","-\\u")}).join("").toLowerCase();c[e]=new RegExp("["+g+"]");return c},{});var t=document.body?document.body.textContent:"",y=t?Object.keys(b).reduce(function(c,e){b[e].test(t)&&(c[e]=!0);return c},{}):Object.keys(b).reduce(function(c,
e){e in k&&(c[e]=!0);return c},{});m=d.filter(function(c){return c.a in y}).map(function(c){return c.url});if(!m.length)return u();var v=document.createDocumentFragment();m.forEach(function(c,e){var g=document.createElement("link");g.href=c;g.rel="preload";g.as="font";var l=e+1;performance.mark("link-preload-start"+l);g.onload=function(){return u(l)};g.setAttribute("crossorigin",!0);v.appendChild(g)});document.head.appendChild(v)}k=void 0===k?{}:k;var n=document.createElement("link");if(function(a,
f){if(!a||!a.supports)return!1;try{return a.supports(f)}catch(b){return!1}}(n.relList,"preload")){var z=function(a,f,b){b=void 0===b?"":b;performance.mark("xhr-start"+b);var d=new XMLHttpRequest;d.onreadystatechange=function(){4==d.readyState&&(200==d.status?(f(d.responseText),performance.mark("xhr-end"+b),performance.measure("xhr"+b,"xhr-start"+b,"xhr-end"+b)):console.error("Error loading webfont: server responded with code %s at %s",d.status,a))};d.open("GET",a);try{d.send(null)}catch(h){console.error(h)}};
performance.mark("agf-start");var p;(function(a,f){z(a.href,function(b){p=b;x(p)},"-"+(void 0===f?"link":f))})({href:q},"js");var m=[],w=0,u=function(a){a&&(performance.mark("link-preload-end"+a),performance.measure("link-preload","link-preload-start"+a,"link-preload-end"+a));w++;w>=m.length&&(a=document.createElement("style"),a.innerHTML=p,document.head.appendChild(a),performance.mark("agf-end"),performance.measure("@lemuria/font","agf-start","agf-end"))}}else n.rel="stylesheet",n.href=q,document.head.appendChild(n)};}).call(this);
```
</details>

### Fallback

If the browser does not support `preload` rel on links, the style will just be added as a stylesheet, since there's no benefit to this package. Even if the fonts' urls to be extracted from the stylesheet, and downloaded with XHR, they wouldn't be cached and the re-download will be forced by style.

### SSR

If a function needs to be added on the server for SSR, it can be imported via the default export (see the SSR example below):

```js
import font, {
  debug as debugFont,
  performance as performanceFont,
} from '@lemuria/font'
```

<p align="center"><a href="#table-of-contents">
  <img src="/.documentary/section-breaks/1.svg?sanitize=true">
</a></p>

## <code><ins>font</ins>(</code><sub><br/>&nbsp;&nbsp;`url: string,`<br/>&nbsp;&nbsp;`defaultRanges=: Object,`<br/></sub><code>): <i>void</i></code>
 - <kbd><strong>url*</strong></kbd> <em>`string`</em>: The full url of the web-font to load, e.g.,
`https://fonts.googleapis.com/css?display=swap&family=Limelight`.
 - <kbd>defaultRanges</kbd> <em>`Object`</em> (optional): When the stylesheet was loaded before body was parsed, there's no way for the script to know which fonts to load based on `unicode-range` property of the `@font-face`. By passing an object with ranges, only specific fonts will be preloaded. Must be an object in the following format (taken directly from the stylesheet):
```js
{
  'U+0000-00FF, U+0131, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD': true
}
```

```jsx
import font, {
  debug as fontDebug, // unminified version
} from '@lemuria/font'
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