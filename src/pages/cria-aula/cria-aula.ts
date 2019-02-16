import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { TurmaProvider } from '../../providers/turma/turma';
import { SQLiteObject } from '@ionic-native/sqlite';
import { BancodedadosProvider } from '../../providers/bancodedados/bancodedados';
import { ListaChamadaPage } from '../lista-chamada/lista-chamada';
import {AulaProvider, Aula} from '../../providers/aula/aula';
 

@IonicPage()
@Component({
  selector: 'page-cria-aula',
  templateUrl: 'cria-aula.html',
})
export class CriaAulaPage {
  model: Aula;
  turmas: any[];
  aulaForm: any = {};
  datainicial: any;
  dataFinal: any;
  turma: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public turmaP: TurmaProvider, formBuilder: FormBuilder, public toast: ToastController, public banco: BancodedadosProvider,public AulaProvider:AulaProvider) {
    
    this.model = new Aula();

    this.aulaForm = formBuilder.group({
      datainicial: ['', Validators.required],
      dataFinal: ['', Validators.required],
      turma: ['', Validators.required],
    });

  }


  ionViewDidLoad() {
    this.turmaP.getAll()
      .then((result: any[]) => {
        this.turmas = result;
      })
      .catch(() => {
        this.toast.create({ message: 'Erro ao carregar as turmas.', duration: 3000, position: 'botton' }).present();
      });
  }

  salvar() {
    this.SalvarAula()
      .then(() => {
        this.toast.create({ message: 'Aula salva com sucesso.', duration: 1000, position: 'botton' }).present();
        this.navCtrl.pop();
      })
      .catch(() => {
        this.toast.create({ message: 'Erro ao salvar a aula.', duration: 1000, position: 'botton' }).present();
      });
  }

  private SalvarAula() {
    return this.AulaProvider.insert(this.model);
  }


}
