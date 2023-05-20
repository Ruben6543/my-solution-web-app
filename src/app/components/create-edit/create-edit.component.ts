import { Component, ViewEncapsulation } from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field'; 

@Component({
  selector: 'app-create-edit',
  standalone: true,
  imports: [
    MatFormFieldModule
  ],
  templateUrl: './create-edit.component.html',
  styleUrls: ['./create-edit.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CreateEditComponent {
  email = new FormControl('', [Validators.required, Validators.email]);

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }
}
