import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { SQLiteObject } from '@ionic-native/sqlite';
import { BancodedadosProvider } from '../../providers/bancodedados/bancodedados';
import { VoluntarioProvider, Voluntario } from '../../providers/voluntario/voluntario';
import { ListaVoluntarioPage } from '../lista-voluntario/lista-voluntario';
import { TurmaAluVolProvider } from '../../providers/turma-alu-vol/turma-alu-vol';
import { TurmaProvider } from '../../providers/turma/turma';

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
  turma: any[];

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private toast: ToastController, formBuilder: FormBuilder, private bancodedados: BancodedadosProvider, public voluntarioProvider: VoluntarioProvider, public turmaAlVol: TurmaAluVolProvider, public turmaP: TurmaProvider) {

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
      turma: ['', Validators.required]

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






