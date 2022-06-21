import Link from 'next/link'
import { useRouter } from 'next/router'
import { motion } from 'framer-motion'
import { Box } from '@/components/box'
import { focusStyles } from '@/styles/focus'

type TabLinkProps = { label: string; href: string }

export function TabLink({ label, href }: TabLinkProps) {
  const router = useRouter()

  const isActive = router.asPath === href

  return (
    <Link href={href} passHref>
      <Box
        as={motion.a}
        aria-current={isActive ? 'page' : 'false'}
        whileTap={{ scale: 0.95 }}
        css={{
          position: 'relative',
          paddingTop: '$2',
          paddingBottom: '$2',
          paddingLeft: '$6',
          paddingRight: '$6',
          color: isActive ? '$loContrast' : '$gray11',
          textDecoration: 'none',
          borderRadius: '$pill',
          '&:hover': {
            color: isActive ? '$loContrast' : '$hiContrast',
          },
          ...focusStyles,
        }}
      >
        {isActive && (
          <Box
            as={motion.div}
            layoutId="active-tab"
            css={{
              position: 'absolute',
              inset: 0,
              backgroundColor: '$hiContrast',
              borderRadius: '$pill',
            }}
          />
        )}
        <Box as="span" css={{ position: 'relative', fontWeight: 500 }}>
          {label}
        </Box>
      </Box>
    </Link>
  )
}
