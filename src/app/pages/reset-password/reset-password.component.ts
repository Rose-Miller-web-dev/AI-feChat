import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  constructor(private router:Router, private userService: UserService, private activatedRoute: ActivatedRoute) { }

  resetLink: boolean = false;
  message: any;
  token: any;
  loading: boolean = false;
  ngOnInit(): void {

    this.activatedRoute.queryParams
    .subscribe(params => {
      console.log(params);
      this.token = params['token']// price
    }
  );
  }

  public resetPass(resetPass: NgForm): void{
    this.loading = true
    this.userService.resetPass(resetPass.value.email).subscribe(
      (response: any) => {
        this.resetLink = true
        this.loading = false
        this.message = response.message;
      },
      (errors: HttpErrorResponse) =>{
       alert(errors.error.message);
       this.message = errors.error.message;
      }
      );
  }


  public resetChangePass(resetChangePass: NgForm): void{
    this.userService.resetChangePass(resetChangePass,this.token).subscribe(
      (response: any) => {
        alert(response.message)
        setTimeout(() => {this.router.navigate(['/login']);},1000);
        this.resetLink = true
      },
      (errors: HttpErrorResponse) =>{
       alert(errors.error.message);
      }
      );
  }

}
