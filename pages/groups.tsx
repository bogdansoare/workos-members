import Head from 'next/head'
import { motion } from 'framer-motion'
import * as Tooltip from '@radix-ui/react-tooltip'
import { Box } from '@/components/box'
import { SrOnly } from '@/components/sr-only'
import { Avatar } from '@/components/avatar'
import { useStore } from '@/lib/store'
import type { Page, Member } from '@/lib/types'
import { focusStyles } from '@/styles/focus'

const avatarListVariants = {
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
  hidden: {
    opacity: 0,
  },
}

const avatarListItemVariants = {
  visible: { opacity: 1, x: 0 },
  hidden: { opacity: 0, x: -10 },
}

function Group({ name, members }: { name: string; members: Member[] }) {
  return (
    <Box
      as="li"
      css={{
        paddingTop: '$4',
        paddingBottom: '$4',
        borderBottom: '1px solid $colors$gray6',
      }}
    >
      <Box
        css={{
          display: 'flex',
          flexDirection: 'column',
          gap: '$4',
          '@bp1': {
            flexDirection: 'row',
            alignItems: 'center',
            gap: '$6',
          },
        }}
      >
        <Box css={{ '@bp1': { width: '120px' } }}>{name}</Box>
        {members.length > 0 ? (
          <Box
            as={motion.ul}
            initial="hidden"
            animate="visible"
            variants={avatarListVariants}
            css={{ display: 'flex', flexWrap: 'wrap', gap: '$2' }}
          >
            {members.map((member) => (
              <Box
                as={motion.li}
                key={member.first}
                variants={avatarListItemVariants}
              >
                <Tooltip.Root delayDuration={0}>
                  <Tooltip.Trigger asChild>
                    <Box
                      as="button"
                      css={{
                        display: 'flex',
                        borderRadius: '$round',
                        ...focusStyles,
                      }}
                    >
                      <Avatar
                        src={member.photo}
                        alt={`${member.first} ${member.last}`}
                        size="small"
                      />
                    </Box>
                  </Tooltip.Trigger>
                  <Tooltip.Content asChild side="top" sideOffset={4}>
                    <Box
                      as={motion.div}
                      initial={{ opacity: 0, y: 4, scaleX: 0.95 }}
                      animate={{ opacity: 1, y: 0, scaleX: 1 }}
                      css={{
                        paddingTop: '$1',
                        paddingBottom: '$1',
                        paddingLeft: '$2',
                        paddingRight: '$2',
                        fontSize: '$1',
                        lineHeight: 1,
                        backgroundColor: '$gray4',
                        borderRadius: '$3',
                      }}
                    >
                      {member.first} {member.last}
                    </Box>
                  </Tooltip.Content>
                </Tooltip.Root>
              </Box>
            ))}
          </Box>
        ) : (
          <Box css={{ color: '$gray11', fontSize: '$1' }}>No members</Box>
        )}
      </Box>
    </Box>
  )
}

const Groups: Page = ({ members }) => {
  const admins = useStore((state) => state.admins)

  const groupedMembers = Object.entries(members).reduce<{
    standard: Member[]
    admin: Member[]
  }>(
    (acc, [memberId, member]) => {
      if (admins.includes(memberId)) {
        acc.admin.push(member)
      } else {
        acc.standard.push(member)
      }

      return acc
    },
    {
      standard: [],
      admin: [],
    }
  )

  return (
    <>
      <Head>
        <title>Groups</title>
      </Head>

      <SrOnly as="h1">Groups</SrOnly>

      <Box as="ul">
        <Group name="Standard Group" members={groupedMembers.standard} />
        <Group name="Admin Group" members={groupedMembers.admin} />
      </Box>
    </>
  )
}

export default Groups
