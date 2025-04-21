// import { Component, EventEmitter, OnInit, ViewEncapsulation,Input,Output } from '@angular/core';
// import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
// import { Router } from '@angular/router';
// import {loginservice} from './login.service';
// import { environment } from 'src/environment';

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css']

// })
// export class LoginComponent {

//   loginForm: FormGroup;
//   loading:boolean = false;
//   message:string="";
  
//   constructor(private fb: FormBuilder,private _apihandlerser:loginservice,private _router: Router) {
//     this.loginForm = this.fb.group({
//       userid: ['', [Validators.required]],
//       password: ['', [Validators.required]]
//     });
//   }

//   onSubmit() {
//     debugger;
//     //if (this.loginForm.valid) 
//       {
//       console.log('Form Data:', this.loginForm.value);
//       var payLoadObj = {
//         'Username': this.loginForm.value.userid,              
//         'Password':  this.loginForm.value.password          
//        }  
      

//       this._apihandlerser
//             .authenticate(payLoadObj)
//             .subscribe((data) => {
//                 this.loading = false; // hide our loading indicator
//                 // navigate back to our redirect url if empty goto our dashboard
//                 //this.ngxService.stop();
//                 const authData = JSON.parse(data);
           
//                 if (authData.results.status !== -1) {
//                     debugger;
//                    // const to: string = this._apihandlerser.getRedirectUrl() || '/dashboard';
//                     //this._router.navigate([to]);
//                 } else {
//                     this.message = authData.results.msg;
//                 }

//             },
//                 // error => {
//                 //     this.loading = false;
//                 //     this.message = error;
//                 //    this.ngxService.stop();
//                 //     console.error('auth error', error);
//                 // }
//             );
//     }
//   }
// }

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { loginservice } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private _loginservice: loginservice,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      userId: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }
ngOnInit()
{
  this._loginservice.GetAllUserDetails();
  if (this._loginservice.isAuthenticated()) {
    // let's check if the token will expire soon
    
        // const to: string = this._loginservice.getRedirectUrl() || '/dashboard';
        // this.router.navigate([to]);
    //}
}

//this.createForm();
}
///To Validate User
  onSubmit() {
    if (this.loginForm.valid) {
      var payLoadObj = {
                'Username': this.loginForm.value.userId,              
                'Password':  this.loginForm.value.password          
               }  
      const { userId, password } = this.loginForm.value;
             //  debugger
      this._loginservice.authenticate(payLoadObj).subscribe((data) => {
                
        if(data.hasOwnProperty("errormessage"))
        {
          
           this.errorMessage = "Invalid Credentials";
            // invalid username password
        
        }
        else
        {
        debugger;
        localStorage.setItem('userID', payLoadObj["Username"]);  
        localStorage.setItem('Role', data.role);   
        localStorage.setItem('token', data.token); 
        if (this._loginservice.isAuthenticated() )
        {
        const to: string = this._loginservice.getRedirectUrl() || '/dashboard';
        this.router.navigate(['/dashboard']);}      
        }
      
       
      }
     
      )}
      
    }
  }

