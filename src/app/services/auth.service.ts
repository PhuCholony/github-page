import { Service, signal } from '@angular/core'

import { JwtPayload } from '../lib/jwt'

export interface User {
  id: number
  url: string
  username: string
  avatar: string
}

export enum Role {
  Anonymous,
  Developer,
  Gamer,
  Press,
}

@Service()
export class AuthService {
  readonly auth = signal<boolean>(false)
  readonly user = signal<User | null>(null)
  readonly role = signal<Role>(Role.Anonymous)

  login(payload: JwtPayload): void {
    const user: User = {
      id: payload.uid,
      url: payload.profile,
      avatar: payload.avatar ?? '/avatar.webp',
      username: payload.username,
    }

    let role = Role.Gamer
    if (payload.account.developer) role = Role.Developer
    else if (payload.account.press) role = Role.Press

    this.auth.set(true)
    this.user.set(user)
    this.role.set(role)
  }

  logout(): void {
    this.auth.set(false)
    this.user.set(null)
    this.role.set(Role.Anonymous)
  }
}
