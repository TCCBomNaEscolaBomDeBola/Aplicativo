import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { TurmaProvider } from '../../providers/turma/turma';
import { FormBuilder, Validators } from '@angular/forms';
import { RestProvider } from '../../providers/rest/rest';

/**
 * Generated class for the TurmaChamadaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-turma-chamada',
  templateUrl: 'turma-chamada.html',
})
export class TurmaChamadaPage {
  turma: any[] = [];
  turmas: any;
  aulas: any;
  turmaForm: any = {}
  aturma: any[] = []
  constructor(public navCtrl: NavController, formBuilder: FormBuilder, public navParams: NavParams, public Turma: TurmaProvider, public toast: ToastController, public rest: RestProvider) {

    // this.turmaForm = formBuilder.group({

    // turmas: ['', Validators.required],


    //});


  }

  ionViewDidLoad() {

  }




}
