import { HttpClient } from '@angular/common/http'
import { Service, inject } from '@angular/core'

import { Cookie } from '../utils/cookie'
import { Jwt, JwtPayload } from '../lib/jwt'

@Service()
export class SessionService {
  private readonly http = inject(HttpClient)

  authenticate(): boolean {
    return typeof Cookie.get('AT') == 'string'
  }

  async verify(): Promise<JwtPayload> {
    return Jwt.decode(Cookie.get('AT') || '')
  }

  refresh() {
    return this.http.put('/auth/token', null, { credentials: 'include' })
  }
}
