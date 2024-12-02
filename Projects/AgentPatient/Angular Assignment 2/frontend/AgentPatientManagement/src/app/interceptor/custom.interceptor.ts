import { HttpInterceptorFn } from '@angular/common/http';

export const customInterceptor: HttpInterceptorFn = (req, next) => {
  // debugger;
  const token = localStorage.getItem('token');
  
  if(token != null){
    const cloneReq = req.clone({
      setHeaders:{
        Authorization: `Bearer ${token}`  // Add token to request headers
      }
    })
    return next(cloneReq);
  }
  return next(req);
};
