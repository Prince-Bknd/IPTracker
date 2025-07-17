import { detectIPVersion } from "./ipUtils"
import type { IPData } from "../types/IpData"

export const fetchIPData = async (version: "4" | "6"): Promise<IPData | null> => {
  const apis =
    version === "4"
      ? ["https://ipapi.co/json/", "https://ipinfo.io/json", "https://api.ipify.org?format=json"]
      : ["https://api64.ipify.org?format=json", "https://ipapi.co/json/"]

  for (const api of apis) {
    try {
      const response = await fetch(api)
      if (!response.ok) continue

      const data = await response.json()
      let normalizedData: IPData

      if (api.includes("ipapi.co")) {
        if (data.error) continue
        normalizedData = { ...data, version: detectIPVersion(data.ip) }
      } else if (api.includes("ipinfo.io")) {
        const [lat, lng] = (data.loc || "0,0").split(",")
        normalizedData = {
          ip: data.ip,
          city: data.city,
          region: data.region,
          country: data.country,
          country_code: data.country,
          timezone: data.timezone,
          isp: data.org,
          org: data.org,
          postal: data.postal,
          latitude: Number.parseFloat(lat),
          longitude: Number.parseFloat(lng),
          version: detectIPVersion(data.ip),
        }
      } else {
        const ip = data.ip || data
        normalizedData = { ip, version: detectIPVersion(ip) }
      }

      if (detectIPVersion(normalizedData.ip) === version) {
        return normalizedData
      }
    } catch {
      continue
    }
  }
  return null
}
