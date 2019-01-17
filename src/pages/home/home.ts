import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlunoPage } from '../aluno/aluno';
import { CriaVoluntarioPage } from '../cria-voluntario/cria-voluntario';
import { ListaVoluntarioPage } from '../lista-voluntario/lista-voluntario';
import { ListarAlunoPage } from '../listar-aluno/listar-aluno';
import { CriaAlunoPage } from '../cria-aluno/cria-aluno';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  tabBarElement: any;

  constructor(public navCtrl: NavController) {
    this.tabBarElement = document.querySelector('.tabbar');
  }

  ionViewDidLoad() {
    this.tabBarElement.style.display = 'none';
    //setTimeout(() => {
    //this.splash = false;
    // this.tabBarElement.style.display = 'flex';
    // }, );
  }

  OpenAluno() {
    this.navCtrl.push(ListarAlunoPage);
  }

  OpenListaVoluntario() {
    this.navCtrl.push(ListaVoluntarioPage);
  }




}
