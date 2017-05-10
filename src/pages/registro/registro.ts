import { AutenticacaoService } from './../../services/autenticacao';
import { Validators, FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { ValidacoesGerais } from "../../services/validacoesGerais";

/**
 * Generated class for the Registro page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-registro',
  templateUrl: 'registro.html',
})
export class RegistroPage {

  form: FormGroup;

  constructor(private navCtrl: NavController, 
              private navParams: NavParams,
              private loadingCtrl: LoadingController, 
              private autenticacaoService: AutenticacaoService,
              private alertCtrl: AlertController,
              private formBuilder: FormBuilder) {
    this.buildValidacoes();
  }

  buildValidacoes(){
    const formCtrl: FormControl = new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)]));
    const formCtrlConfirmaSenha: FormControl = new FormControl('', Validators.compose([Validators.required, ValidacoesGerais.valoresIguais(formCtrl)]));
    this.form = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      senha: formCtrl,
      confirmacaoSenha: formCtrlConfirmaSenha
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Registro');
  }

  registra() {
    const loading = this.loadingCtrl.create({
      content: 'Fazendo o registro da aplicação'
    });
    loading.present();

    if (this.validaConfirmacaoSenha(this.form.value.senha, this.form.value.confirmacaoSenha)){
      this.autenticacaoService.registra(this.form.value.email, this.form.value.senha)
        .then(data => {
          loading.dismiss();
          })
        .catch(error => {
          loading.dismiss();
          const alert = this.alertCtrl.create({
            title: 'Falha no registro',
            message: error.message,
            buttons: ['Ok']
          });
          alert.present();
        });
    } else {
      const alert = this.alertCtrl.create({
            title: 'Senha',
            message: 'Confirmação de senha inválida!',
            buttons: ['Ok']
          });
      alert.present();  
    }
  }

  validaConfirmacaoSenha(senha: string, confirmacaoSenha: string){
    if (senha == confirmacaoSenha){
      return true;
    } else {
      return false;
    }
  }
}
