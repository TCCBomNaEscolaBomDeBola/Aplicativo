import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { SQLiteObject } from '@ionic-native/sqlite';
import { BancodedadosProvider } from '../../providers/bancodedados/bancodedados';
import { AlunoProvider, Aluno } from '../../providers/aluno/aluno';
import { EstadosProvider } from '../../providers/estados/estados';
import { CriaTurmaAlunoPage } from '../cria-turma-aluno/cria-turma-aluno';
import {TurmaProvider} from '../../providers/turma/turma';
import { TurmaAluVolProvider } from '../../providers/turma-alu-vol/turma-alu-vol';



@IonicPage()
@Component({
  selector: 'page-cria-aluno',
  templateUrl: 'cria-aluno.html',
})
export class CriaAlunoPage {

  model: Aluno;
  alunoForm: any = {};
  tabBarElement: any;
  splash = true;
  estados: any[];
  turma: any[]

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private toast: ToastController, formBuilder: FormBuilder, public bancodedados: BancodedadosProvider, public AlunoProvider: AlunoProvider, private estadosProvider: EstadosProvider, public TurmaAlVol: TurmaAluVolProvider, public turmaP: TurmaProvider) {

    this.model = new Aluno();

    if (this.navParams.data.id) {
      this.AlunoProvider.get(this.navParams.data.id)
        .then((result: any) => {
          this.model = result;
        })

    }
    this.alunoForm = formBuilder.group({

      nome: ['', Validators.required],
      data: ['', Validators.required],
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

    this.estadosProvider.getAll()
      .then((result: any[]) => {
        this.estados = result;
      })
      .catch(() => {
        this.toast.create({ message: 'Erro ao carregar os estados.', duration: 3000, position: 'botton' }).present();
      });

  

  }


  salvar() {
    this.SalvarAluno()
      .then(() => {
        this.toast.create({ message: 'Aluno salvo com sucesso.', duration: 1000, position: 'botton' }).present();
        this.navCtrl.pop();
      })
      .catch(() => {
        this.toast.create({ message: 'Erro ao salvar o aluno.', duration: 1000, position: 'botton' }).present();
      });
  }

  private SalvarAluno() {
    return this.AlunoProvider.insert(this.model);
  }


}


