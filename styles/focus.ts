import { CSS } from '@stitches/react'

export const focusStyles: CSS = {
  '@supports selector(:focus-visible)': {
    '&:focus': {
      outline: 'none',
    },
  },
  '&:focus-visible': {
    boxShadow: '0 0 0 2px $colors$loContrast, 0 0 0 4px $colors$blueA9',
  },
}
