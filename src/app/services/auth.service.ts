import { Service, signal } from '@angular/core'

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
  readonly auth = signal<boolean>(false)
  readonly user = signal<User | null>(null)
  readonly role = signal<Role>(Role.Anonymous)
}
