import { Component } from '@angular/core';
import { Platform, Config } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { BancodedadosProvider } from '../providers/bancodedados/bancodedados'
import { LoginPage } from '../pages/login/login';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = LoginPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, dbProvider: BancodedadosProvider) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();

      //Criando o banco de dados
      dbProvider.createDatabase()

        .then(() => {
          // fechando a SplashScreen somente quando o banco for criado
          //  
          this.openTabsPage(splashScreen);

        })
        .catch(() => {
          // ou se houver erro na criação do banco
          this.openTabsPage(splashScreen);
        });
    });

  }



  private openTabsPage(splashScreen: SplashScreen) {
    splashScreen.hide();
    this.rootPage = LoginPage;
  }
}
