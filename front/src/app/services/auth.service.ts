import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private URL = 'http://localhost:7000/auth'

  constructor(private http: HttpClient, private router: Router) { }

  register(user){
    return this.http.post<any>(this.URL + '/register', user)
  }

  login(user){
    return this.http.post<any>(this.URL + '/login', user)
  }

  loggedIn(){
    if (localStorage.getItem('token')){
      return true
    }
  }

  logout(){
    localStorage.removeItem('token')
    this.router.navigate(['/auth/login'])
  }

  getToken(){
    return localStorage.getItem('token')
  }
}
