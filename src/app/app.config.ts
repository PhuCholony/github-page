import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
} from '@angular/core'
import { provideHttpClient, withInterceptors } from '@angular/common/http'
import { provideServiceWorker } from '@angular/service-worker'

import { urlInterceptor } from './interceptors/url.interceptor'

import { environment as env } from '../env/environment.production'

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(withInterceptors([urlInterceptor])),
    provideServiceWorker('ngsw-worker.js', {
      enabled: env.ENABLE_PWA,
      registrationStrategy: 'registerWhenStable:30000',
    }),
  ],
}
