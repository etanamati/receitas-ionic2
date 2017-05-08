import { FormGroup, ValidatorFn, FormControl, AbstractControl } from '@angular/forms';

export class ValidacoesGerais {

  static valoresIguais(formCtrl: FormControl): ValidatorFn {
    return (ctrl: AbstractControl): { [key: string]: any } => {
      if (formCtrl.value != ctrl.value){
        return {'retorno': 'erro'};
      }
      return null;
    };
  }

}