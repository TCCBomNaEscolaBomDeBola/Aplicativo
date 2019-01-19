import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AlunoPage } from '../pages/aluno/aluno';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { ListaVoluntarioPage } from '../pages/lista-voluntario/lista-voluntario';
import { CriaVoluntarioPage } from '../pages/cria-voluntario/cria-voluntario';
import { CriaAlunoPage } from '../pages/cria-aluno/cria-aluno';
import { ListarAlunoPage } from '../pages/listar-aluno/listar-aluno';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { RestProvider } from '../providers/rest/rest';
import { HttpClientModule } from '@angular/common/http';
import { SQLite } from '@ionic-native/sqlite';
import { ConfiguracaoPage } from '../pages/configuracao/configuracao';
import { VoluntarioProvider } from '../providers/voluntario/voluntario';
import { AlunoProvider } from '../providers/aluno/aluno';
import { BrMaskerModule } from 'brmasker-ionic-3';
import { BancodedadosProvider } from '../providers/bancodedados/bancodedados';
import { EstadosProvider } from '../providers/estados/estados';
import {ListaChamadaPage} from '../pages/lista-chamada/lista-chamada';
 

 
@NgModule({
  declarations: [
    MyApp,
   HomePage,
    AlunoPage,
    TabsPage,
    CriaAlunoPage,
    ListaVoluntarioPage,
    CriaVoluntarioPage,
    ListarAlunoPage,
    LoginPage,
    ConfiguracaoPage,
    ListaChamadaPage
    
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    BrMaskerModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    AlunoPage,
    TabsPage,
    CriaAlunoPage,
    ListaVoluntarioPage,
    CriaVoluntarioPage,
    ListarAlunoPage,
    LoginPage,
    ConfiguracaoPage,
    ListaChamadaPage

  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    RestProvider, 
    SQLite,
    VoluntarioProvider,
    AlunoProvider,
    BancodedadosProvider,
    EstadosProvider,
    EstadosProvider,
 
  ]
})
export class AppModule {}
