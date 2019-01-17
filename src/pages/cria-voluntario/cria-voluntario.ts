import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { SQLiteObject } from '@ionic-native/sqlite';
import { BancodedadosProvider } from '../../providers/bancodedados/bancodedados';
import { VoluntarioProvider, Voluntario } from '../../providers/voluntario/voluntario';
import {ListaVoluntarioPage} from '../lista-voluntario/lista-voluntario';
 
@IonicPage()
@Component({
  selector: 'page-cria-voluntario',
  templateUrl: 'cria-voluntario.html',
})
export class CriaVoluntarioPage {

  model: Voluntario;
  voluntarioForm: any = {};
  tabBarElement: any;
  splash = true;
 
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private toast: ToastController, formBuilder: FormBuilder, public database: BancodedadosProvider, public voluntarioProvider: VoluntarioProvider) {

    this.model = new Voluntario();

    if (this.navParams.data.id) {
      this.voluntarioProvider.get(this.navParams.data.id)
        .then((result: any) => {
          this.model = result;
        })

    }
    this.voluntarioForm = formBuilder.group({

      nome: ['', Validators.required],
      contato: ['', Validators.required],
      senha: ['', Validators.required],
      email: ['', Validators.required],
      
    });

  }
  ionViewDidLoad() { }
  salvar() {
    this.SalvarVoluntario()
      .then(() => {
        this.toast.create({ message: 'Voluntário salvo com sucesso.', duration: 1000, position: 'botton' }).present();
        this.navCtrl.pop();
      })
      .catch(() => {
        this.toast.create({ message: 'Erro ao salvar o voluntário.', duration: 1000, position: 'botton' }).present();
      });
  }

  private SalvarVoluntario() {
    if (this.model.id) {
      return this.voluntarioProvider.update(this.model);
      
    } else {
      return this.voluntarioProvider.insert(this.model);
    }
  }


}


