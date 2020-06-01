import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  API_URI = 'http://localhost:7000'
  

  constructor(private http: HttpClient) { }

  getUsers(){
    return this.http.get<any>(`${this.API_URI}/users`)
  }

  getUser(id){
    return this.http.get<any>(`${this.API_URI}/users/${id}`)
  }

  saveUser(user){
    return this.http.post<any>(`${this.API_URI}/users`, user)
  }

  deleteUser(id){
    return this.http.delete<any>(`${this.API_URI}/users/${id}`)
  }

  updateUser(id, updatedUser){
    return this.http.put<any>(`${this.API_URI}/users/${id}`, updatedUser)
  }

}