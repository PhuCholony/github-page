import { HttpClient } from '@angular/common/http'
import { Service, inject } from '@angular/core'

@Service()
export class SessionService {
  private readonly http = inject(HttpClient)
}
