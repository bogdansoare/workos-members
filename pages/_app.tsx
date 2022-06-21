import type { AppProps } from 'next/app'
import useSWR from 'swr'
import { membersFetcher } from '@/lib/data'
import { Box } from '@/components/box'
import { Loading } from '@/components/loading'
import { TabLink } from '@/components/tab-link'
import { globalStyles } from '@/styles/global'

function MyApp({ Component, pageProps }: AppProps) {
  globalStyles()

  const { error, data } = useSWR('members', membersFetcher)

  if (error) return <Box>Failed to load</Box>

  if (!data) {
    return <Loading />
  }

  return (
    <Box
      css={{
        maxWidth: '$container',
        marginLeft: 'auto',
        marginRight: 'auto',
        paddingLeft: '$4',
        paddingRight: '$4',
        paddingBottom: '$10',
      }}
    >
      <Box
        as="nav"
        css={{
          position: 'sticky',
          top: 0,
          display: 'flex',
          gap: '$1',
          paddingTop: '$4',
          paddingBottom: '$4',
          mixBlendMode: 'difference',
          zIndex: 1,
        }}
      >
        <TabLink href="/" label="Members" />
        <TabLink href="/groups" label="Groups" />
      </Box>

      <main>
        <Component members={data.users} {...pageProps} />
      </main>
    </Box>
  )
}

export default MyApp
