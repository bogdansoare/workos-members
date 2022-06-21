import { globalCss } from '../lib/stitches.config'

export const globalStyles = globalCss({
  '@font-face': {
    fontFamily: 'CabinetGrotesk-Variable',
    src: 'url("/fonts/CabinetGrotesk-Variable.woff2") format("woff2")',
    fontWeight: '100 900',
    fontDisplay: 'swap',
    fontStyle: 'normal',
  },
  '*, ::before, ::after': {
    boxSizing: 'border-box',
  },
  '*': {
    margin: 0,
    border: 0,
  },
  body: {
    fontFamily: '$main',
    fontSize: '$2',
    color: '$hiContrast',
    backgroundColor: '$loContrast',
    '-webkit-font-smoothing': 'antialiased',
  },
  '[type=button], [type=reset], [type=submit], button': {
    '-webkit-appearance': 'button',
    backgroundColor: 'transparent',
    backgroundImage: 'none',
  },
  'button, input, optgroup, select, textarea': {
    fontFamily: 'inherit',
    fontSize: '100%',
    lineHeight: 'inherit',
    color: 'inherit',
    margin: 0,
    padding: 0,
  },
  'img, picture, video, canvas, svg': {
    display: 'block',
    maxWidth: '100%',
  },
  'h1, h2, h3, h4, h5, h6': {
    fontSize: 'inherit',
    fontWeight: 'inherit',
  },
  ul: {
    paddingLeft: 0,
    listStyle: 'none',
  },
})
