import { Injectable } from '@angular/core';
import {HttpInterceptor, HttpErrorResponse, HttpRequest, HttpHandler, HttpEvent, HttpResponse} from '@angular/common/http'
import {AuthService} from '../services/auth.service'
import {tap, catchError} from 'rxjs/operators'
import { Observable } from 'rxjs/Observable';
import { throwError } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{

  constructor(private authService: AuthService) { }


  intercept(req:HttpRequest<any>, next:HttpHandler): Observable<HttpEvent<any>> {
    const tokenizeReq = req.clone({
      headers: req.headers.set('authorization',`${this.authService.getToken()}`)
    })
    return next
    .handle(tokenizeReq)
    .pipe(
      tap((ev: HttpEvent<any>)=>{
        if(ev instanceof HttpResponse){
          console.log('procesing response', ev)
        }
      }),
      catchError(response => {
        if (response instanceof HttpErrorResponse) {
          console.log('Processing http error', response);
        }

        return throwError(response);	 
      })
    )
  }

}
