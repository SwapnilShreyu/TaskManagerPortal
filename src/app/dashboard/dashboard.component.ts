import { Component,ChangeDetectionStrategy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { loginservice } from '../login/login.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Overlay } from '@angular/cdk/overlay';
import { ScrollStrategyOptions } from '@angular/cdk/overlay';
import { Router } from '@angular/router';



export interface User {

  id:string;
  srNo:string;
  status: string;
  role: string;
  title:string;
  assignedTo:string;
  description:string;

  


}


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  
  
  
})
export class DashboardComponent {


  form!: FormGroup;
  Isvisible:boolean = true;
  Message="";
  IsEditButton = "";
  IsClickOnEditButton:boolean = false;
  index: number = 0;
  Title = "";
  Description = "";
  AssignedTo = "";
  Status = "";
  selectedStatus="";
  UserRole:string = '';
  UserID:string = '';
  UserMaster:any[] = [];
  StatusMaster:any[] = [];
  constructor(
    private _loginservice:loginservice,private _formBuilder: FormBuilder,private router: Router,private scroll: ScrollStrategyOptions
  )
  {

  }
  scrollStrategy = this.scroll.reposition();

ngOnInit()
{
  debugger;
  
  this.UserRole =  localStorage.getItem('Role') || '{}';
  this.UserID =  localStorage.getItem('userID') || '{}';
   this.form = this._formBuilder.group({
    SrNo :['' ],
  Title :[ '',Validators.required],
  AssignedTo :['',Validators.required],
  Description :[ '',Validators.required],
  Status :['',Validators.required],
    
  });
  //this.form.controls['Status'].disable();
  this.GetAllUserDetails();
  this.getAllTaskData();
  this.GetListOfStatus();
 
}
 
  //displayedColumns: string[] = ['SrNo','Title', 'AssignedTo', 'Description','Status','actions'];
  displayedColumns: string[] = ['Title', 'AssignedTo', 'Description','Status','actions'];
  dataSource = new MatTableDataSource();


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
 
  /// To Edit user Info
  editUser(user:User) {
    debugger;
this.IsEditButton = "Active";
if(this.UserRole == 'Admin')
{
this.form.controls['AssignedTo'].enable();
}
else
{
  this.form.controls['AssignedTo'].disable();
}

// this.form = this._formBuilder.group({
//  SrNo :['' ],
//   Title :[ '',Validators.required],
//   AssignedTo :['',Validators.required],
//   Description :[ '',Validators.required],
//   Status :[{ value: '', disabled: true }],
  
// });

    this.Isvisible = false;
  //   console.log('Edit user:', user);

  //   this.form.patchValue({

  //     Title: 'abc',
  //     AssignedTo:user.assignedTo,
  //     Description:user.description,
  //     Status:user.status
  //   })

  if (!this.form) {
    console.warn('Form not initialized yet!');
    return;
  }

  if (user) {
    this.form.patchValue({
      SrNo:user.srNo,
      Title: user.title,
      AssignedTo: user.assignedTo,
      Description: user.description,
      Status: user.status
    });
  }
  this.Isvisible = false;
  }

/// To Delete user Info
  delete(user:User)
  {
    debugger;
    var payLoadObj = {
      ID:user.id,
      // 'ID':
      'Title':user.title,
      'AssignedTo':user.assignedTo,
      'Description':user.description,
      'Status':user.status
   
    
    }
    console.log(payLoadObj);
    debugger;
    this._loginservice.DeleteTask(payLoadObj).subscribe((data) =>{
      debugger;
      if(data!=null)
      {
        // const to: string = this._loginservice.getRedirectUrl() || '/dashboard';
        // this.router.navigate(['/dashboard']);

        this.ShowDashboard();
      }
    });

  }

  LogOut()
  {
    debugger;
    const to: string = this._loginservice.getRedirectUrl() || '';
    this.router.navigate([to]); 

  }
  
  // deleteUser(user: User) {
  //   // const index = this.dataSource.data.findIndex(u => u.name === user.name);
  //   // if (index >= 0) {
  //   //   this.dataSource.data.splice(index, 1);
  //   //   this.dataSource._updateChangeSubscription(); // Refresh the table
  //   // }
  // }

  /// Get all task as per userwise
  getAllTaskData()
  {
   this.dataSource = new MatTableDataSource();
  var userid = localStorage.getItem('userID');
    this._loginservice.GetAllTaskDetails(userid).subscribe((data) => {
      debugger;
      if(data !=null)
      {
        console.log(data);
        
        this.dataSource = data;
      }
    });

  }

  /// To fetch user details
  GetAllUserDetails()
  {

this.UserMaster = [];  
    this._loginservice.GetAllUserDetails().subscribe((data) => {
      debugger;
      if(data !=null)
      {
        console.log(data);
        debugger;
    
        this.UserMaster = data; 
        //this.dataSource = data;
      }
    });

      
  }


  /// get Status List i.e. Pending,WIP,Completed
  GetListOfStatus()
  {

  
    this._loginservice.GetListOfStatus().subscribe((data) => {
      debugger;
      if(data !=null)
      {
        console.log(data);
        debugger;
    
        this.StatusMaster = data; 
        //this.dataSource = data;
      }
    });

      
  }
 
  /// Submit to save new task
  Submit()
  {
    debugger;
    var payLoadObj = {
      'Title':this.form.controls['Title'].value,
      'AssignedTo':this.form.controls['AssignedTo'].value,
      'Description':this.form.controls['Description'].value,
      'Status':this.form.controls['Status'].value
   

    
    }
    console.log(payLoadObj);
    debugger;
    this._loginservice.SaveTaskDetails(payLoadObj).subscribe((data) =>{
      //if(data!=null)
      {
        // const to: string = this._loginservice.getRedirectUrl() || '/dashboard';
        // this.router.navigate(['/dashboard']); 

        this.ShowDashboard();

      }
    });

  }


  /// Update Exisiting task details
  Update()
  {
    debugger;
    var payLoadObj = {
      'SrNo':this.form.controls['SrNo'].value,
      'Title':this.form.controls['Title'].value,
      'AssignedTo':this.form.controls['AssignedTo'].value,
      'Description':this.form.controls['Description'].value,
      'Status':this.form.controls['Status'].value
   

    
    }
    console.log(payLoadObj);
    debugger;
    this._loginservice.AssignNewUserToTask(payLoadObj).subscribe((data) =>{
      debugger;
     // if(data!=null)
      {
        // const to: string = this._loginservice.getRedirectUrl() || '/dashboard';
        // this.router.navigate(['/dashboard']);
        this.ShowDashboard();
      }
    });

  }

  CancelClick()
  {

  }

  /// Show dashboard
  ShowDashboard()
  {
    this.Isvisible = true;
    this.getAllTaskData();
  }

  /// Create Form
  create()
  {
this.Isvisible = false;
this.IsEditButton =="NotActive";
    debugger;
    this.form = this._formBuilder.group({
      SrNo :['' ],
      Title :[ '',Validators.required],
      AssignedTo :['',Validators.required],
      Description :[ '',Validators.required],
      Status :[ '',Validators.required],
      
    });

    if(this.UserRole !='Admin')
    {
      debugger;
      const tempUser = this.UserMaster.filter(x=>x.username == this.UserID);
      this.UserMaster = [];
      this.UserMaster = tempUser;
    }
    
  }
  
  }

