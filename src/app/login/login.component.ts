import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TestService } from '../test.service';
import { Users } from '../Models/Users';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  firstNameAutofilled: boolean = false;
  lastNameAutofilled: boolean = false;
  login ="";
  password ="";
  users: Users[] = [];

  @HostListener('window:keydown',['$event']) goNextEvent(event:any){
    if(event.keyCode===13){
      this.logit2();
    }
  }
  constructor(
    public test: TestService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getallUsers();
  }
   getallUsers(){
    this.test.getUsers().subscribe((data:any)=>{
      console.log(data)
      this.users=data;
    })
  }
 // ************* old log in ******************* 
  /*getUsersByEmail() {
    this.test.getUserByEmail(this.login).subscribe((data: any) => {
      console.log(data);
      this.users = data;
    });
  }*/
  // log in process 

 
  /*logit(){
    console.log(this.login)
    let role="";
    let trouve=false;
    this.users.forEach((user)=>{
      console.log("saluet");
      if(user.mail === this.login){
          if ( user.password === this.password){
              trouve=true;
              role=user.role;
          }else{
            this.showEror=true;
          }
      }else{
        this.showEror=true;
      }
   
    })
   

    if(trouve){
      console.log("welcome "+this.login);
      if(role==="admin"){
        this.router.navigate(['admin'],{relativeTo: this.route});
      }else if(role==="formateur"){
        this.router.navigate(['formateur'],{relativeTo: this.route});
      }
      
    }
  }*/
  
   // *************  new log in ******************* 
   showEror=false;
  logit2(){
  let  trouve =  this.users.find(user => (user.mail === this.login)&&(user.password=== this.password) ) 
   console.log(trouve);
   if (trouve === undefined){
    this.showEror=true;
   }
   console.log(localStorage.getItem('login'))
   if(trouve){
    console.log("welcome "+trouve.mail);
    localStorage.setItem('login',trouve.mail);
    localStorage.setItem('role',trouve.role);
      if(trouve.role==="admin"){
        this.router.navigate(['admin'],{relativeTo: this.route});
      }else if(trouve.role==="formateur"){
        this.router.navigate(['formateur'],{relativeTo: this.route});
      }
   }
  }
}
