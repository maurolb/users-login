import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service'

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users:any = []

  constructor(private usersService: UsersService) { }

  ngOnInit(){
    this.getUsers()
  }

  getUsers(){
    this.usersService.getUsers().subscribe(
      res =>{
        this.users = res
      },
      err => console.error(err)
    )
  }

  borrarUser(id){
    this.usersService.deleteUser(id).subscribe(
      res => {
        console.log(res)
        this.getUsers()
      },
      err => console.error(err)
    )
  }

}
