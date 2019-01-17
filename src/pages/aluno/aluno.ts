import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';




@IonicPage()
@Component({
  selector: 'page-aluno',
  templateUrl: 'aluno.html',
})
export class AlunoPage {

  alunoForm: any = {};


  constructor(public navCtrl: NavController, public navParams: NavParams,
    formBuilder: FormBuilder) {

   /* this.alunoForm = formBuilder.group({

      nome: ['', Validators.required],
      datanascimento: ['', Validators.required],
      escola: ['', Validators.required],
      serie: ['', Validators.required],

      responsavel: ['', Validators.required],
      contato: ['', Validators.required],
      logradouro: ['', Validators.required],
      numero: ['', Validators.required],

      cep: ['', Validators.required],
      bairro: ['', Validators.required],
      cidade: ['', Validators.required],
      estado: ['', Validators.required],
      complemento: ['', Validators.required],
      observacao: ['', Validators.required],


    }); */
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AlunoPage');
  }
  salvar(){}

}
