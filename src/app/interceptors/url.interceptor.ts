import { HttpInterceptorFn } from '@angular/common/http'

import { environment as env } from '../../env/environment.production'

export const urlInterceptor: HttpInterceptorFn = (req, next) => {
  // Ensure external API calls or local JSON assets (e.g., assets/i18n/)
  // aren't broken by accidentally appending the base API path to them.
  if (!req.url.startsWith('https://') && !req.url.startsWith('http://')) {
    // Only prepend the base URL if the request path is relative
    const apiRequest = req.clone({
      url: `${env.API_URL}${req.url}`,
    })
    return next(apiRequest)
  }
  return next(req)
}
