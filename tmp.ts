import { renderFile, render } from "./deps.ts"

render('The answer to everything is <%= it.answer %>', { answer: 42 })