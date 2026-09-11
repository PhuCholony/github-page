import { HttpClient } from '@angular/common/http'
import { Service, signal, inject } from '@angular/core'

export interface User {
  id: number
}

export enum Role {
  Anonymous,
  Customer,
  Moderator,
  Administrator,
}

@Service()
export class AuthService {
  private readonly http = inject(HttpClient)

  readonly auth = signal<boolean>(false)
  readonly user = signal<User | null>(null)
  readonly role = signal<Role>(Role.Anonymous)

  checkJwt(jwt: string) {
    return this.http.get<{
      statusCode: number
      message: string
    }>(`/auth/token`, {
      headers: { Authorization: `Bearer ${jwt}` },
    })
  }
}
