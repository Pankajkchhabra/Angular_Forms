import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { forbiddenNameValidators } from './shared/user-name.validators';
// import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  get userName() {
    return this.registerationForm.get('userName');
  }
  
  constructor( private fb: FormBuilder) {  }
  registerationForm = this.fb.group({
    userName: ['', [Validators.required, Validators.minLength(3), forbiddenNameValidators]],
    password: [''],
    confirmPassword: [''],
    address: this.fb.group( {
      city: [''],
      state: [''],
      postalCode: ['']
    })
  });

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


  }
}
