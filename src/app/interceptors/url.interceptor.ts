import { HttpInterceptorFn } from '@angular/common/http';

import { environment as env } from '../../env/environment.development';

export const urlInterceptor: HttpInterceptorFn = (req, next) => {
  if (!req.url.startsWith('http://') && !req.url.startsWith('https://')) {
    const apiRequest = req.clone({
      url: `${env.API_URL}${req.url}`,
    });
    return next(apiRequest);
  }

  return next(req);
};
