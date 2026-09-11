import { importSPKI, jwtVerify } from 'jose'

import { JwtPayload } from '../services/auth.service'

export class Jwt {
  static async decode(jwt: string): Promise<JwtPayload> {
    const publicKeyFetch = await fetch('/public_key.pem')
    const spki = await publicKeyFetch.text()
    const publicKey = await importSPKI(spki, 'RS256')
    const { payload } = await jwtVerify<JwtPayload>(jwt, publicKey)
    return payload
  }
}
