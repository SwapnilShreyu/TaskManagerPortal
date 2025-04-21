
import { catchError, map, Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { ApiHandler } from 'src/app/providers/api-handler.service';
import { Injectable } from '@angular/core';

import { JwtHelper } from '../helpers/jwt-helper';
import { environment } from '../../environment';

@Injectable({
  providedIn: 'root'
})
export class loginservice {
    private _jwt: JwtHelper = new JwtHelper();
    //private redirectUrl = environment.endpoint;
   private redirectUrl: string = "";
   // public message: string;

  constructor(private http: HttpClient) { }
  

  authenticate(data : any): Observable<any> {
   // debugger;
    //return this.http.post<any>(this.redirectUrl + 'api/Login', data)
    return this.http.post<any>(environment.endpoint +'api/Login', data)
    .pipe(map((data: any) => {
      return data;
    }),    
      catchError((error) => {    // handle error
        if (error.status == 404) {
          //Handle Response code here
        }
        return throwError(error);
      })
    );
  }

  SaveTaskDetails(data : any): Observable<any> {
    // debugger;
     //return this.http.post<any>(this.redirectUrl + 'api/Login', data)
     return this.http.post<any>(environment.endpoint +'api/TaskDetails/CreateNewTask', data)
     .pipe(map((data: any) => {
       return data;
     }),    
       catchError((error) => {    // handle error
         if (error.status == 404) {
           //Handle Response code here
         }
         return throwError(error);
       })
     );
   }


   AssignNewUserToTask(data : any): Observable<any> {
    // debugger;
     //return this.http.post<any>(this.redirectUrl + 'api/Login', data)
     return this.http.post<any>(environment.endpoint +'api/TaskDetails/AssignNewUserToTask', data)
     .pipe(map((data: any) => {
       return data;
     }),    
       catchError((error) => {    // handle error
         if (error.status == 404) {
           //Handle Response code here
         }
         return throwError(error);
       })
     );
   }

   DeleteTask(data : any): Observable<any> {
    // debugger;
     //return this.http.post<any>(this.redirectUrl + 'api/Login', data)
     return this.http.post<any>(environment.endpoint +'api/TaskDetails/DeleteTask', data)
     .pipe(map((data: any) => {
       return data;
     }),    
       catchError((error) => {    // handle error
         if (error.status == 404) {
           //Handle Response code here
         }
         return throwError(error);
       })
     );
   }


  GetAllTaskDetails(UserID : any): Observable<any> {
    debugger;
    //return this.http.post<any>(this.redirectUrl + 'api/Login', data)
    return this.http.get<any>(environment.endpoint +'api/TaskDetails/GetListOfTask/' + UserID )
    .pipe(map((data: any) => {
      return data;
    }),    
      catchError((error) => {    // handle error
        if (error.status == 404) {
          
        }
        return throwError(error);
      })
    );
  }

  GetAllUserDetails(): Observable<any> {
    debugger;
    //return this.http.post<any>(this.redirectUrl + 'api/Login', data)
    return this.http.get<any>(environment.endpoint +'api/UserDetails/GetUserDetails/', )
    .pipe(map((data: any) => {
      return data;
    }),    
      catchError((error) => {    // handle error
        if (error.status == 404) {
          
        }
        return throwError(error);
      })
    );
  }

  GetListOfStatus(): Observable<any> {
    debugger;
    //return this.http.post<any>(this.redirectUrl + 'api/Login', data)
    return this.http.get<any>(environment.endpoint +'api/UserDetails/GetStatusDetails/', )
    .pipe(map((data: any) => {
      return data;
    }),    
      catchError((error) => {    // handle error
        if (error.status == 404) {
          
        }
        return throwError(error);
      })
    );
  }

  /**
   * check for expiration and if token is still existing or not
   * @return {boolean}
   */
  isAuthenticated(): boolean {
    return localStorage.getItem('token') != null && !this._jwt.isTokenExpired();
  }

  setRedirectUrl(url: string): void {
    debugger;
    this.redirectUrl = url;
  }

  /**
   * this is used to alert our caller if we should go get token for next request or
   * to be carried out request
   *
   * @param threshold_seconds  is like a threshold to check if we should or not check for token
   * default we use 2min before the token expires
   *
   * @return {boolean}
   */
  shouldIGetToken(threshold_seconds: number = 120): boolean {
    const expDate = this._jwt.getTokenExpirationDate().valueOf() - (threshold_seconds * 1000);

    return new Date().valueOf() > expDate;
  }
  getRedirectUrl(): string {
    return this.redirectUrl;
  }


  // authenticate(email: string, password: string): Observable<string> {
  //   return this._apiHandler.callService('/api/TokenAuth/token', RequestMethod.Post, { Username: email, Password: password })
  //     .map(res => <string>res.text())
  //     .do((token: string) => {
  //       // const authData = JSON.parse(token);
  //       // debugger;
  //       // console.log(authData);
  //       // if (authData.results.status === 1) {
      
  //       //   localStorage.setItem('token', authData.data.accessToken);
  //       //   localStorage.setItem('isChecker', authData.data.userinfo.isChecker);
  //       //   localStorage.setItem('userID', authData.data.userinfo.userID);
  //       //   localStorage.setItem('userinfo', JSON.stringify(authData.data.userinfo));
  //       //   localStorage.setItem('curr_quarter_date',authData.data.currdate);
  //       //   localStorage.setItem('departmentname',authData.data.departmentname);
  //       //   localStorage.setItem('auditstatus',authData.data.auditstatus);
  //       //   localStorage.setItem('LastQTRDateforExcptional',authData.data.auditstatusforexcptionalLastQtrDate);
  //       //   localStorage.setItem('CurrentQTRDateforExcptional',authData.data.auditstatusforexcptionalcurqtrdate);
  //       //   localStorage.setItem('AuditStatusforExcptional',authData.data.auditstatusforexcptionalAuditStaus);
  //       //   this._userService.set(this._jwt.decodeToken());
  //       // } else {
  //       //   return authData.results;
  //       // }
  //     });
  // }

}