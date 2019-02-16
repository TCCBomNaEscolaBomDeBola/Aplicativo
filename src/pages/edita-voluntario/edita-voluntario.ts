import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { SQLiteObject } from '@ionic-native/sqlite';
import { BancodedadosProvider } from '../../providers/bancodedados/bancodedados';
import { VoluntarioProvider, Voluntario } from '../../providers/voluntario/voluntario';
import { TurmaProvider } from '../../providers/turma/turma';



@IonicPage()
@Component({
  selector: 'page-edita-voluntario',
  templateUrl: 'edita-voluntario.html',
})
export class EditaVoluntarioPage {

  model: Voluntario;
  voluntarioForm: any = {};
  tabBarElement: any;
  splash = true;
  turma: any[];

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private toast: ToastController, formBuilder: FormBuilder, public database: BancodedadosProvider, public voluntarioProvider: VoluntarioProvider, public turmaP: TurmaProvider) {

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
      turma: ['', Validators.required],


    });

  }
  ionViewDidLoad() {
    this.turmaP.getAll()
      .then((result: any[]) => {
        this.turma = result;
      })
      .catch(() => {
        this.toast.create({ message: 'Erro ao carregar as turmas.', duration: 3000, position: 'botton' }).present();
      });

  }
  editar() {
    this.EditarVoluntario()
      .then(() => {
        this.toast.create({ message: 'Voluntário editado com sucesso.', duration: 1000, position: 'botton' }).present();
        this.navCtrl.pop();
      })
      .catch(() => {
        this.toast.create({ message: 'Erro ao editar o voluntário.', duration: 1000, position: 'botton' }).present();
      });
  }

  private EditarVoluntario() {
    if (this.model.id) {
      return this.voluntarioProvider.update(this.model);
    } else {
      return this.voluntarioProvider.insert(this.model);
    }
  }


}


