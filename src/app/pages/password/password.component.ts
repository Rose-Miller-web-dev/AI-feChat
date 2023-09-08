import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserP } from '../../models/userP';
import { HttpErrorResponse } from '@angular/common/http';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent implements OnInit {

  constructor(private router:Router, private userService: UserService, private activatedRoute: ActivatedRoute) { }

  resetLink: boolean = false;
  user: any;



  ngOnInit(): void {
    this.user = localStorage.getItem('name');
    //this.getUsers();
  }

  public home(){
    this.router.navigate(['/speech']);
  }

  public changepassword(changepass: NgForm): void{
    this.userService.changePass(changepass).subscribe(
      (response: any) => {
        alert(response.message)
        setTimeout(() => {this.router.navigate(['/speech']);},1000);
      },
      (errors: HttpErrorResponse) =>{
       alert(errors.error.message);
      }
      );
  }


}
