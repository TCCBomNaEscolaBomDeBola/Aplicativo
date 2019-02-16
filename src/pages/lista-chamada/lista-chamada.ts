import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { CriaAulaPage } from '../cria-aula/cria-aula';
import { AulaProvider, Aula } from '../../providers/aula/aula';
import { ChamadaPage } from '../chamada/chamada';


@IonicPage()
@Component({
  selector: 'page-lista-chamada',
  templateUrl: 'lista-chamada.html',
})
export class ListaChamadaPage {
  nome_usuario: any;
  aulas: any[];
  model: Aula;
  aul: any[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public rest: RestProvider, public aula: AulaProvider, public toast: ToastController, public alertCtrl: AlertController) {
    this.model = new Aula();
  }

  ionViewDidEnter() {
    this.getAllAlunos();
    this.nome_usuario = window.sessionStorage.getItem('nome');
  }

  getAllAlunos() {
    this.aula.getAll()
      .then((result: any[]) => {
        this.aulas = result;
      });
  }
  editarAula(aula) {
    window.sessionStorage.setItem("turma", aula.id_turma);
    this.navCtrl.push(ChamadaPage);
  }

  teste() {
    let dados;
    this.rest.getAluno()
      .then((result: any[]) => {


        const turma = result && result.length > 0 ?
          result[0].Turmas :  // primeira turma no array
          null; // vazio se nao existir
        ///element.Turmas
        ///console.log(element.Tumas);
        turma.forEach(element => {
          element.Nome;
          console.log('carol' + element.Nome);
        });
      })
  }

  deletarAula(aula: Aula) {
    let alert = this.alertCtrl.create({

      title: 'Deletar Aula',
      message: 'Deseja realmente deletar esta aula?',
      buttons: [
        {
          text: 'CANCELAR',
          role: 'cancel',
          handler: () => {
          }
        },
        {
          text: 'DELETAR',
          handler: () => {
            this.aula.remove(aula.id)
            console.log('id da aula ' + aula.id)
            //Removendo do array de aluno
            var index = this.aul.indexOf(aula);
            this.aul.splice(index, 1);
            this.toast.create({ message: 'Aula removida com sucesso.', 
            duration: 1000, position: 'botton' }).present();
          }
        }
      ]

    });
    alert.present();
  }

  adicionarAula() {
    this.navCtrl.push(CriaAulaPage);
  }




}
