import members from './members.json'

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function randomInteger(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export async function membersFetcher() {
  await sleep(randomInteger(0, 4000))

  return members
}
