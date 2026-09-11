import { HttpClient } from '@angular/common/http'
import { inject, Service } from '@angular/core'

@Service()
export class HomeService {
  private readonly http = inject(HttpClient)
}
