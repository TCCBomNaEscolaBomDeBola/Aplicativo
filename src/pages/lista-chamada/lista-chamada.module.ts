import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListaChamadaPage } from './lista-chamada';

@NgModule({
  declarations: [
    ListaChamadaPage,
  ],
  imports: [
    IonicPageModule.forChild(ListaChamadaPage),
  ],
})
export class ListaChamadaPageModule {}
