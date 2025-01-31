import * as crypto from 'crypto'

export const generate256BitHash = (input: string): string => {
  const hash = crypto.createHash('sha256')
  return hash.update(input).digest('hex').toUpperCase()
}

export const generateMD5Hash = (input: string): string => {
  const normalizedInput = input.trim().toLowerCase()

  const hash = crypto.createHash('md5').update(normalizedInput).digest('hex')

  return hash.toUpperCase()
}
