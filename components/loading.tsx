import { motion } from 'framer-motion'
import * as React from 'react'
import { Box } from '@/components/box'
import { MotionText, MotionTextVariants } from '@/components/motion-text'

const spring = {
  type: 'spring',
  mass: 0.1,
  damping: 20,
  stiffness: 200,
}

const DELAY_FACTOR = 0.03

const variantsOne: MotionTextVariants = {
  char: {
    state1: (context) => ({
      y: '0',
      transition: {
        ...spring,
        delay: context.char.index * DELAY_FACTOR,
      },
    }),
    state2: (context) => ({
      y: '100%',
      transition: {
        ...spring,
        delay: (context.charCount - context.char.index) * DELAY_FACTOR,
      },
    }),
  },
}

const variantsTwo: MotionTextVariants = {
  // animation states for each individual char
  char: {
    state1: (context) => ({
      y: '-100%',
      transition: {
        ...spring,
        delay: context.char.index * DELAY_FACTOR,
      },
    }),
    state2: (context) => ({
      y: '0%',
      transition: {
        ...spring,
        delay: (context.charCount - context.char.index) * DELAY_FACTOR,
      },
    }),
  },
}

const TEXT = 'Loading...'

export function Loading() {
  return (
    <Box
      css={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}
      aria-label="Loading"
    >
      <Box
        as={motion.div}
        initial="state1"
        animate="state2"
        exit="state1"
        whileHover="state1"
        css={{
          position: 'relative',
          fontSize: '$4',
          fontWeight: 700,
          lineHeight: 1.1,
        }}
        aria-hidden="true"
      >
        <MotionText text={TEXT} variants={variantsOne} />
        <MotionText
          text={TEXT}
          style={{ position: 'absolute', inset: 0 }}
          variants={variantsTwo}
        />
      </Box>
    </Box>
  )
}
