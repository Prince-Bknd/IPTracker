export const detectIPVersion = (ip: string): string => {
  return ip.includes(":") ? "6" : "4"
}

export const isPrivateIP = (ip: string): boolean => {
  const privateRanges = [/^10\./, /^172\.(1[6-9]|2[0-9]|3[0-1])\./, /^192\.168\./, /^127\./, /^169\.254\./]
  return privateRanges.some((range) => range.test(ip))
}

export const getAddressClass = (ip: string): string => {
  if (ip.startsWith("10.") || ip.startsWith("192.168.") || ip.match(/^172\.(1[6-9]|2[0-9]|3[0-1])\./)) {
    return "Private Range"
  }
  if (ip.startsWith("127.")) {
    return "Loopback"
  }
  if (ip.startsWith("169.254.")) {
    return "Link-Local"
  }
  return "Public Range"
}
