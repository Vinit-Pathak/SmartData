import { HttpInterceptorFn } from '@angular/common/http';

export const customInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');
  if(token != null){
    const cloneReq = req.clone({
      setHeaders:{
        Authorization: `Bearer ${token}`  
      }
    })
    return next(cloneReq);
  }
  return next(req);
};
