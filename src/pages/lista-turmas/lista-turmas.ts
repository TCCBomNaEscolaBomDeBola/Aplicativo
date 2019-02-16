import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { TurmaProvider } from '../../providers/turma/turma';

/**
 * Generated class for the ListaTurmasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-lista-turmas',
  templateUrl: 'lista-turmas.html',
})
export class ListaTurmasPage {
  turmas: any[] = [];
  nome_usuario: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public turma: TurmaProvider, public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    this.getAllTurma();
    this.nome_usuario = window.sessionStorage.getItem('nome');

  }

  getAllTurma() {
    this.turma.getAll()
      .then((result: any[]) => {
        this.turmas = result;
      });
  }
  visualizar(turma) {
    let alert = this.alertCtrl.create({
      title: 'Informações da Turma',
      subTitle: `Turma: ${turma.nome} <br>
                 Idade Minima: ${turma.IdadeMinima} <br>
                 Idade Máxima: ${turma.IdadeMaxima} <br>
                 Horário Inicial: ${turma.HorarioInicial} <br>
                 Horário Final: ${turma.HorarioFinal} <br>
                 Dia: ${turma.DiaSemana} <br>
  `,
      buttons: ['Ok']

    });
    alert.present();

  }

}
