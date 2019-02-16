import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CriaAulaPage } from './cria-aula';

@NgModule({
  declarations: [
    CriaAulaPage,
  ],
  imports: [
    IonicPageModule.forChild(CriaAulaPage),
  ],
})
export class CriaAulaPageModule {}
