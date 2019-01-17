import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListarAlunoPage } from './listar-aluno';

@NgModule({
  declarations: [
    ListarAlunoPage,
  ],
  imports: [
    IonicPageModule.forChild(ListarAlunoPage),
  ],
})
export class ListarAlunoPageModule {}
