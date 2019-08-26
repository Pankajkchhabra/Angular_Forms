import { AbstractControl, ValidatorFn } from '@angular/forms';

//// The  below code test if control value has admin text in it or not. It does not accept more than one parameter.
// export function forbiddenNameValidators(control: AbstractControl): {[key: string]: any } | null {
// const forbidden = /admin/.test(control.value);
// return forbidden ? { 'forbiddenName': {value: control.value}} : null;
// }

/////// create a validatior function that accept a string as parameter and return a function
export function forbiddenNameValidator( forbiddenName: RegExp): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any } | null => {
        const forbidden = forbiddenName.test(control.value);
        return forbidden ? {'forbiddenName': {value: control.value}} : null;
    };
}
