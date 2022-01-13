import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2'; 
@Component({
  selector: 'app-edit-school',
  templateUrl: './edit-school.component.html',
  styleUrls: ['./edit-school.component.scss']
})
export class EditSchoolComponent implements OnInit {

  userId:string = '';
  userDetails:any = [];
  dataLoaded:boolean = false;

  editUserForm : FormGroup = new FormGroup({});

  constructor(private activatedRoute: ActivatedRoute,
              private userService : UserService,
              private formBuilder : FormBuilder,
              private _snackBar : MatSnackBar,
              private _rount : Router) { }

  ngOnInit(): void {
    this.dataLoaded = false;


    this.activatedRoute.params.subscribe(data =>{
      this.userId = data.id
    });

    if(this.userId !== ' ' ){
      this.userService.viewSchool1(this.userId)
      .toPromise()
      .then(data=>{
        this.userDetails = data;
        //Object.assign(this.userDetails, data);
        console.log(this.userDetails);
        // console.log(this.userDetails);
        this.editUserForm = this.formBuilder.group({
          'school_name' : new FormControl(this.userDetails.result[0].school_name),
        })

        this.dataLoaded = true;
      })
      .catch(err =>{
        console.log(err);
      })
     
    }
    
    
 
  }


  updateUser(){
      console.log(this.editUserForm.value);
      this.userService.updateSchool(this.userId,this.editUserForm.value).subscribe(data =>{
        console.log("success");
        console.log(this.editUserForm.value);
        this._rount.navigate(["/school/list"]); 
      }, err => {
        console.log(this.editUserForm.value);
        console.log(err);
        this._rount.navigate(["/school/list"]); 
      }
      )

  }confirmBox(){  
    Swal.fire({  
      title: 'Are you sure want to Updated?',  
      text: 'You will not be able to recover this file!',  
      icon: 'warning',  
      showCancelButton: true,  
      confirmButtonText: 'Yes, Updated it!',  
      cancelButtonText: 'No,'  
    }).then((result) => {  
      if (result.value) {  
        this.updateUser();
        Swal.fire(  
          'Updated!',  
          'Your imaginary file has been Updated.',  
          'success'  
        )  
      } else if (result.dismiss === Swal.DismissReason.cancel) {  
        Swal.fire(  
          'Cancelled',  
          'Your imaginary file is safe :)',  
          'error'  
        )  
      }  
    })  
    
  }  

}
