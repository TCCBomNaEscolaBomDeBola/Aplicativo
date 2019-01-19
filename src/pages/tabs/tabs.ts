import { Component } from '@angular/core';
import { ListarAlunoPage } from '../listar-aluno/listar-aluno';
import { ListaVoluntarioPage } from '../lista-voluntario/lista-voluntario';
import {ListaChamadaPage} from '../lista-chamada/lista-chamada';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  tab1Root = ListarAlunoPage;
  tab2Root = ListaVoluntarioPage;
  tab3Root = ListaChamadaPage;
 
  constructor() {

  }
}
