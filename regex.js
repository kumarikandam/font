import { readFileSync, writeFileSync } from 'fs'
const FONT = 'compile/font-perf.js'
const FN = 'compile/f-perf.js'
const file = readFileSync(FONT, 'utf8')
const fn = readFileSync(FN, 'utf8')

let upd = file
  .replace(/,?performance..+?\(.+?\)/g, '')
  .replace(/{.&&\(\);/, '{')

writeFileSync(FONT.replace('-perf', ''), upd)

upd = fn
  .replace(/,?performance..+?\(.+?\)/g, '')
  .replace(/{.&&\(\);/, '{')

writeFileSync(FN.replace('-perf', ''), upd)