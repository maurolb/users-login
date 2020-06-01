import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service'
import {Router} from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user = {
    username: '',
    password: ''
  }

  constructor(
    private authServices: AuthService,
    private router: Router
    ) { }

  ngOnInit(): void {
  }

  register(){
    this.authServices.login(this.user).subscribe(
      res => {
        console.log(res)
        localStorage.setItem('token', res.token)
        this.router.navigate(['/users'])
      },
      err => console.error(err)
    )
  }

}

