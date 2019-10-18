## API

The compiled function should be added first thing to the head:

%EXAMPLE: compile/font%

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

%EXAMPLE: compile/font-perf%
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

%~%

<typedef noArgTypesInToc>types/api.xml</typedef>

%EXAMPLE: example, ../src => @lemuria/font%

%~%