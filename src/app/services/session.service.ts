import { HttpClient } from '@angular/common/http'
import { Service, inject } from '@angular/core'

import { Cookie } from '../utils/cookie'
import { Jwt, JwtPayload } from '../lib/jwt'

@Service()
export class SessionService {
  private readonly http = inject(HttpClient)

  create(): void {
    if (this.authenticate()) return
    const csrfToken = crypto.randomUUID()
    window.sessionStorage.setItem('csrf-token', csrfToken)
    window.open(
      `https://itch.io/user/oauth?client_id=20d6d200a84c78b3bcd91f33af78691e&scope=profile%3Ame&response_type=token&redirect_uri=http%3A%2F%2Flocalhost%3A4200%2Foauth.html&state=${csrfToken}`,
      '_blank',
    )
  }

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
