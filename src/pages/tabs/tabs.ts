import { Component } from '@angular/core';
//import { HomePage } from '../home/home';
import { ListarAlunoPage } from '../listar-aluno/listar-aluno';
import { ListaVoluntarioPage } from '../lista-voluntario/lista-voluntario';
import { HomePage } from '../home/home';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  tab1Root = ListarAlunoPage;
  tab2Root = ListaVoluntarioPage;
 
  constructor() {

  }
}
