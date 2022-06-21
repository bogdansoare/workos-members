import Head from 'next/head'
import { motion } from 'framer-motion'
import * as TogglePrimitive from '@radix-ui/react-toggle'
import { Box } from '@/components/box'
import { SrOnly } from '@/components/sr-only'
import { Avatar } from '@/components/avatar'
import { styled } from '@/lib/stitches.config'
import { useStore } from '@/lib/store'
import type { Page } from '@/lib/types'
import { focusStyles } from '@/styles/focus'

const listVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
}

const listItemVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
}

const memberInfoVariants = {
  standard: { x: 0 },
  admin: { x: 50 },
}

const AdminToggleButton = styled(motion.button, {
  display: 'flex',
  alignItems: 'center',
  paddingTop: '$1',
  paddingBottom: '$1',
  paddingLeft: '$2',
  paddingRight: '$2',
  borderRadius: 4,
  fontSize: '$1',
  color: '$indigo11',
  backgroundColor: '$indigo2',
  border: '1px solid $colors$indigo7',
  cursor: 'pointer',
  '&:hover': { borderColor: '$indigo8' },
  '&[data-state=on]': {
    backgroundColor: '$cyan1',
    borderColor: '$cyan7',
    color: '$cyan11',
    '&:hover': { borderColor: '$cyan8' },
  },
  ...focusStyles,
})

const Home: Page = ({ members }) => {
  const state = useStore()

  return (
    <>
      <Head>
        <title>Members</title>
      </Head>

      <SrOnly as="h1">Members</SrOnly>

      <Box
        as={motion.ul}
        variants={listVariants}
        initial="hidden"
        animate="show"
      >
        {Object.entries(members).map(([memberId, member]) => {
          const isAdmin = state.admins.includes(memberId)

          return (
            <Box
              as={motion.li}
              key={memberId}
              variants={listItemVariants}
              css={{
                paddingTop: '$4',
                paddingBottom: '$4',
                borderBottom: '1px solid $colors$gray6',
              }}
            >
              <Box
                css={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  flexDirection: 'column',
                  gap: '$4',
                  '@bp1': {
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: '$16',
                  },
                }}
              >
                <Box
                  as={motion.div}
                  animate={isAdmin ? 'admin' : 'standard'}
                  variants={memberInfoVariants}
                  initial={false}
                  css={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '$3',
                    flex: 1,
                  }}
                >
                  <Avatar
                    src={member.photo}
                    alt={`${member.first} ${member.last}`}
                  />
                  <Box css={{ flex: 1, minWidth: 0 }}>
                    <Box css={{ fontWeight: 700, lineHeight: 1.1 }}>
                      {member.first} {member.last}
                    </Box>
                    <SrOnly>
                      {isAdmin ? 'Admin member' : 'Standard member'}
                    </SrOnly>
                    <Box css={{ fontSize: '$1', color: '$gray11' }}>
                      {member.role}
                    </Box>
                  </Box>
                </Box>

                <TogglePrimitive.Root
                  asChild
                  pressed={isAdmin}
                  onPressedChange={(pressed) => {
                    if (pressed) {
                      state.addAdmin(memberId)
                    } else {
                      state.removeAdmin(memberId)
                    }
                  }}
                >
                  <AdminToggleButton
                    whileTap={{ scale: 0.95 }}
                    aria-label={
                      isAdmin
                        ? `Demote ${member.first} ${member.last} to standard`
                        : `Promote ${member.first} ${member.last} to admin`
                    }
                  >
                    {isAdmin ? 'Demote to Standard' : 'Promote to Admin'}
                  </AdminToggleButton>
                </TogglePrimitive.Root>
              </Box>
            </Box>
          )
        })}
      </Box>
    </>
  )
}

export default Home
