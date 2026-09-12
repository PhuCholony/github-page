import { Service, signal } from '@angular/core'

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

  login(user: User, role: Role): void {
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
