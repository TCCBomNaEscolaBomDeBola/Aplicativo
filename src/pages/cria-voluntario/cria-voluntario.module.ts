import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CriaVoluntarioPage } from './cria-voluntario';

@NgModule({
  declarations: [
    CriaVoluntarioPage,
  ],
  imports: [
    IonicPageModule.forChild(CriaVoluntarioPage),
  ],
})
export class CriaVoluntarioPageModule {}
