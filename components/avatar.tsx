import Image from 'next/image'
import { Box } from '@/components/box'

type AvatarSize = 'small' | 'medium'

type AvatarProps = {
  src: string
  alt: string
  size?: AvatarSize
}

const sizes: Record<AvatarSize, number> = {
  small: 32,
  medium: 48,
}

export function Avatar({ src, alt, size = 'medium' }: AvatarProps) {
  return (
    <Box
      as={Image}
      src={src}
      alt={alt}
      width={sizes[size]}
      height={sizes[size]}
      css={{ borderRadius: '$round' }}
    />
  )
}
