## API

The compiled function should be added to the head:

%EXAMPLE: compile/font%

Then it can be called:

```js
window['@lemuria/font']('https://fonts.googleapis.com/css?display=swap&family=Gentium+Basic')
```

`Display:swap` does not really matter, it is there to please _Lighthouse_.

If a function needs to be added on the server for SSR, it can be imported via the default export (see the SSR example below):

```js
import font from '@lemuria/font'
```

%~%

<typedef noArgTypesInToc>types/api.xml</typedef>

%EXAMPLE: example%

%~%