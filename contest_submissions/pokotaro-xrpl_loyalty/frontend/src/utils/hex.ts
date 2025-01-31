export const stringToHex = (str: string): string => {
  return Buffer.from(str).toString('hex').toUpperCase()
}

export const hexToString = (hex: string): string => {
  const bytes = []
  for (let i = 0; i < hex.length; i += 2) {
    bytes.push(Number.parseInt(hex.substring(i, i + 2), 16))
  }
  return String.fromCharCode.apply(null, bytes)
}
