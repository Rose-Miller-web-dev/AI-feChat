import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { ActivatedRoute, Route, Router } from '@angular/router';
import { User } from '../../models/user';
import { Role } from '../../models/role';
import { UserService } from '../../services/user.service';
import { UserP } from '../../models/userP';
import { RoleService } from '../../services/role.service';

@Component({
  selector: 'app-accordions',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: []
})

export class RegisterComponent implements OnInit{
  public users: User[] = [];
  public user!: User;
  public roles: Role [] = [];
  update: Boolean = false;
  newDiv: Boolean = true;
  public idY: number=0;
  value: number = 0;
  selectedRole!: Role;
  token: any;
  registered: boolean = false;
  loading: boolean = false;

  project: any = {};
  stateArr: any[] = [
    {
      name: 'Active',
      value: true,
    },
    {
      name: 'InActive',
      value: false,
    },
  ];

  constructor(private router:Router, private userService: UserService,  private activatedRoute: ActivatedRoute, private role: RoleService) {}

  ngOnInit(){

    this.activatedRoute.queryParams
      .subscribe(params => {
        console.log(params); // { orderby: "price" }
        this.token = params['token']// price
      }
    );

    this.getUsers();


    if(this.token){

      this.confirmRegister(this.token);

    }


  }

  public getRoles(): void {
    this.role.getRoles().subscribe(
      (response: Role[]) => {
        this.roles = response;
      },
      (errors: HttpErrorResponse) =>{
        alert(errors.error.message)
      }
      );
  }



  public Register(addUserForm: NgForm): void {
    this.loading = true
    this.userService.registerNew(addUserForm).subscribe(
      (response: any) => {
        this.loading = false
        this.registered = true
      },
      (errors: HttpErrorResponse) =>{
        this.loading = false
       alert(errors.error.message);
      }
      );
  }

  public confirmRegister(token: String): void {
    this.userService.confirmRegistration(token).subscribe(
      (response: any) => {
        alert(response.message)
        setTimeout(() => {this.router.navigate(['login']);},1000);
       // this.getUsers();
      },
      (errors: HttpErrorResponse) =>{
       alert(errors.error.message);
      }
      );
  }
  public home(){
    this.router.navigate(['/speech']);
  }

  public getUsers(): void {
    this.userService.getUsers().subscribe(
      (response: User[]) => {
        this.users = response;

      },
      (errors: HttpErrorResponse) =>{
        alert(errors.error.message);
      }
      );
  }

  public getUser(id: number): User {
    this.userService.getUser(id).subscribe(
      (response: User) => {
        this.user = response;
      this.selectedRole = this.user.roles[0];

      },
      (errors: HttpErrorResponse) =>{
        alert(errors.error.message);
      }
      );
      return this.user;
  }

  public updateUser(updateUser: NgForm): void {

      this.userService.updateUser(updateUser).subscribe(
      (response: User) => {
        alert("Succesfully updated");
        this.getUsers();
        setTimeout(() => {this.router.navigate(['user']);},1000);

      },
      (errors: HttpErrorResponse) =>{
        alert(errors.error.message);
      }
      );
  }
}
