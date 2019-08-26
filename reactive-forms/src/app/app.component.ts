import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators, FormGroup, FormArray } from '@angular/forms';
import { forbiddenNameValidator } from './shared/user-name.validator';
import { PasswordValidator } from './shared/password.validator';
// import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { RegisterationService } from './registeration.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  registerationForm: FormGroup;

  get userName() {
    return this.registerationForm.get('userName');
  }

  get email() {
    return this.registerationForm.get('email');
  }

  get alternateEmails() {
    return this.registerationForm.get('alternateEmails') as FormArray;
  }  
  
  addAlternateEmails() {
    this.alternateEmails.push(this.fb.control(''));
  }

  constructor( private fb: FormBuilder, private registerationService: RegisterationService) {  }

  ngOnInit(){
    this.registerationForm = this.fb.group({
      userName: ['', [Validators.required, Validators.minLength(3), forbiddenNameValidator(/password/)]],
      email: [''],
      subscribe: [false],
      password: [''],
      confirmPassword: [''],
      address: this.fb.group( {
        city: [''],
        state: [''],
        postalCode: ['']
      }),
      alternateEmails: this.fb.array([])
    }, {validator: PasswordValidator});


    this.registerationForm.get('subscribe').valueChanges
    .subscribe(checkedValue => {
      const email = this.registerationForm.get('email');
      if(checkedValue) {
        email.setValidators(Validators.required);
      } else {
        email.clearValidators();
      }
      
      email.updateValueAndValidity();
    });
  } // end of ngOnInit function




  // registerationForm = new FormGroup( {
  //   userName: new FormControl('TestName'),
  //   password: new FormControl(''),
  //   confirmPassword: new FormControl(''),
  //   address: new FormGroup({
  //     city: new FormControl(''),
  //     state: new FormControl(''),
  //     postalCode: new FormControl(''),
  //   })
  // });

  loadApiData() {
    // // setValue method is strict, it require values to be populated for all the controls
    // // this.registerationForm.setValue({
    // //   userName: 'Team',
    // //   password: 'Bing',
    // //   confirmPassword: 'Bing',
    // //   address: {
    // //     city: 'Newark',
    // //     state: 'CA',
    // //     postalCode: '95206'
    // //   }
    // // });

    // // patchValue method is relaxed, few controls can be populated
    this.registerationForm.patchValue({
      userName: 'Team',
      password: 'Bing',
      confirmPassword: 'Bing'
    });
  } // end of loadApiData function

  onSubmit() {
    // console.log(this.registerationForm.value);
    this.registerationService.register(this.registerationForm.value).subscribe(
      response => console.log('Success!', response),
      error => console.error('Error!', error)      
    );
    // this._registerationService.register(this.registerationForm.value)
    // .subscribe(
    //   response => console.log( 'Success', response),
    //   error => console.error('Error', error)
    // );
    
  } // end of onsubmit function

}
