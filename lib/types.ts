import type { NextPage } from 'next'
import members from './members.json'

export type Member = typeof members['users'][keyof typeof members['users']]

export type MemberList = Record<string, Member>

export type Page = NextPage<{
  members: MemberList
}>
