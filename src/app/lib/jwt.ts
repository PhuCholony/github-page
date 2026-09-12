import { importSPKI, jwtVerify } from 'jose'

export interface JwtPayload {
  kid: `${string}-${string}-${string}-${string}-${string}`
  iss: string
  sub: string
  uid: number
  iat: number
  exp: number
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
    const spki = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAp1JtBykNOQg6O4GzQrwk
dIZb9S/M5Lf9F5Td7k63mZ8rHKadSs/As88Wp8vX1l11DXukPg0GpaCSH34yaqrG
fPrOoXDI64GT9/eFTFWXg5Iw7nHyzejbC2B9mHrfPb27UvTH9j4gaguh5CnkMz0P
Mp3Zmvd++f7d7T4MAvTXCA9br8kGDaV6ycuxAUPK1sRyBdIeQ0AVVCmo+ZqSK/6s
EWXNejgNeuaYIRr0teiw2lDlBhtbhvrrNnUIMKpdEieHVgwo7Tc3yAudDPFiApzY
3cwZcgaoVuDxOtnJ5EQactl+YpjjDiSA5djVGtXCj6RPEZVVSS6kA5rhGj8FsSZ+
bQIDAQAB
-----END PUBLIC KEY-----`
    const publicKey = await importSPKI(spki, 'RS256')
    const { payload } = await jwtVerify<JwtPayload>(jwt, publicKey)
    return payload
  }
}
