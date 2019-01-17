import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CriaAlunoPage } from './cria-aluno';

@NgModule({
  declarations: [
    CriaAlunoPage,
  ],
  imports: [
    IonicPageModule.forChild(CriaAlunoPage),
  ],
})
export class CriaAlunoPageModule {}
