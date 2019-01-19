import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CriaTurmaAlunoPage } from './cria-turma-aluno';

@NgModule({
  declarations: [
    CriaTurmaAlunoPage,
  ],
  imports: [
    IonicPageModule.forChild(CriaTurmaAlunoPage),
  ],
})
export class CriaTurmaAlunoPageModule {}
