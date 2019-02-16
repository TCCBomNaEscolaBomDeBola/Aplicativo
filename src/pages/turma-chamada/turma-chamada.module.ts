import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TurmaChamadaPage } from './turma-chamada';

@NgModule({
  declarations: [
    TurmaChamadaPage,
  ],
  imports: [
    IonicPageModule.forChild(TurmaChamadaPage),
  ],
})
export class TurmaChamadaPageModule {}
