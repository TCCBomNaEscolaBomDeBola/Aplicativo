import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListaTurmasPage } from './lista-turmas';

@NgModule({
  declarations: [
    ListaTurmasPage,
  ],
  imports: [
    IonicPageModule.forChild(ListaTurmasPage),
  ],
})
export class ListaTurmasPageModule {}
