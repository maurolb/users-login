import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service'
import {Router} from '@angular/router'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user = {
    username: '',
    password: '',
    email: ''
  }

  constructor(
    private authServices: AuthService,
    private router: Router
    ) { }

  ngOnInit(): void {
  }

  register(){
    this.authServices.register(this.user).subscribe(
      res => {
        console.log(res)
        localStorage.setItem('token', res.token)
        this.router.navigate(['/users'])
      },
      err => console.error(err)
    )
  }

}
