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