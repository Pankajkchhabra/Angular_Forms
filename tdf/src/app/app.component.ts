import { EnrollmentService } from './enrollment.service';
import { Component } from '@angular/core';
import { User } from './user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
   title = 'tdf';
   topics = ['Angular', 'React', 'Vue' ];
   topicHasError = true;
   submitted = false;
   errorMsg = '';
   userModel = new User('Rob', 'Rob@test.com', '5108246539', 'default', 'morning', true);


  constructor(private _enrollmentService: EnrollmentService) {}

   validateTopic(value) {
    if ( value === 'default') {
      this.topicHasError = true;
    } else {
      this.topicHasError = false;
    }
   }

   onSubmit() {
    this.submitted = true;
    this._enrollmentService.enroll(this.userModel)
      .subscribe(
        data => console.log('Success!', data),
        error => this.errorMsg = error.statusText
        );
   }

  }
