import { Component, OnInit } from '@angular/core';
import {UsersService} from '../../services/users.service'
import {Router} from '@angular/router'
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  user = {
    id: '',
    username: '',
    email: '',
    oldPassword: '',
    newPassword: ''
  }

  constructor(
    private usersService: UsersService,
    private router: Router,
    private activatedRoute: ActivatedRoute
    ) { }

  ngOnInit(){
    const params = this.activatedRoute.snapshot.params
    if(params.id){
      this.usersService.getUser(params.id).subscribe(
        res => {
          console.log(res)
          this.user = res
        },
        err => console.error(err)
      )
    }
  }

  updateUser(){
    this.usersService.updateUser(this.user.id, this.user).subscribe(
      res => {
        console.log(res)
        this.router.navigate(['/users'])
      },
      err => console.error(err)
    )
  }

}
