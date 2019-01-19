import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CriaChamadaPage } from './cria-chamada';

@NgModule({
  declarations: [
    CriaChamadaPage,
  ],
  imports: [
    IonicPageModule.forChild(CriaChamadaPage),
  ],
})
export class CriaChamadaPageModule {}
