import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListaVoluntarioPage } from './lista-voluntario';

@NgModule({
  declarations: [
    ListaVoluntarioPage,
  ],
  imports: [
    IonicPageModule.forChild(ListaVoluntarioPage),
  ],
})
export class ListaVoluntarioPageModule {}
