# @lemuria/font

[![npm version](https://badge.fury.io/js/@lemuria/font.svg)](https://npmjs.org/package/@lemuria/font)

`@lemuria/font` is Loads A Web Font Stylesheet (e.g., Google Fonts) Without Render Blocking And Multiple Layout Updates.

```sh
yarn add @lemuria/font
```

## Table Of Contents

- [Table Of Contents](#table-of-contents)
- [API](#api)
- [`font(arg1: string, arg2?: boolean)`](#mynewpackagearg1-stringarg2-boolean-void)
  * [`_@lemuria/font.Config`](#type-_@lemuria/fontconfig)
- [Copyright](#copyright)

<p align="center"><a href="#table-of-contents">
  <img src="/.documentary/section-breaks/0.svg?sanitize=true">
</a></p>

## API

The package is available by importing its default function:

```js
import font from '@lemuria/font'
```

<p align="center"><a href="#table-of-contents">
  <img src="/.documentary/section-breaks/1.svg?sanitize=true">
</a></p>

## <code><ins>font</ins>(</code><sub><br/>&nbsp;&nbsp;`arg1: string,`<br/>&nbsp;&nbsp;`arg2?: boolean,`<br/></sub><code>): <i>void</i></code>

Call this function to get the result you want.

<strong><a name="type-_@lemuria/fontconfig">`_@lemuria/font.Config`</a></strong>: Options for the program.

|   Name    |       Type       |    Description    | Default |
| --------- | ---------------- | ----------------- | ------- |
| shouldRun | <em>boolean</em> | A boolean option. | `true`  |
| __text*__ | <em>string</em>  | A text to return. | -       |

```js
/* alanode example/ */
import font from '@lemuria/font'

(async () => {
  const res = await font({
    text: 'example',
  })
  console.log(res)
})()
```
```
example
```

<p align="center"><a href="#table-of-contents">
  <img src="/.documentary/section-breaks/2.svg?sanitize=true">
</a></p>

## Copyright

(c) [Art Deco][1] 2019

[1]: https://artd.eco

<p align="center"><a href="#table-of-contents">
  <img src="/.documentary/section-breaks/-1.svg?sanitize=true">
</a></p>