import { importSPKI, jwtVerify } from 'jose'

export interface JwtPayload {
  kid: `${string}-${string}-${string}-${string}-${string}`
  iss: string
  sub: string
  uid: number
  iat: number
  exp: number
  nbf?: number
  aud: string[]
  profile: string
  avatar?: string
  account: {
    developer: boolean
    gamer: boolean
    press: boolean
  }
}

export class Jwt {
  static async decode(jwt: string): Promise<JwtPayload> {
    const publicKeyFetch = await fetch('/public_key.pem')
    const spki = await publicKeyFetch.text()
    const publicKey = await importSPKI(spki, 'RS256')
    const { payload } = await jwtVerify<JwtPayload>(jwt, publicKey)
    return payload
  }
}
