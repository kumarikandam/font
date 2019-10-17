# @lemuria/font

%NPM: @lemuria/font%

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

%TOC%

%~%