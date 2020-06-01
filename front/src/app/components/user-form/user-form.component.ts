import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service'
import {Router} from '@angular/router'

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

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
        this.router.navigate(['/users'])
      },
      err => console.error(err)
    )
  }

}
