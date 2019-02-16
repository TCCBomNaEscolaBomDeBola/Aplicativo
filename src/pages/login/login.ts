import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { HomePage } from '../home/home';
import { BancodedadosProvider } from '../../providers/bancodedados/bancodedados';
import { SQLiteObject } from '@ionic-native/sqlite';
import { RestProvider } from '../../providers/rest/rest';
import { TabsPage } from '../tabs/tabs';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  usuario: string;
  senha: string;
  usuario1: string;
  tabBarElement: any;
  splash = true;
  teste: string;
  tipo: boolean;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private toast: ToastController, public loadingCtrl: LoadingController, formBuilder: FormBuilder, public restprovider: RestProvider,
    private bancodedados: BancodedadosProvider,
    public alertCtrl: AlertController
  ) {
    this.tabBarElement = document.querySelector('.tabbar');

  }
  ionViewDidLoad() {
    this.tabBarElement.style.display = 'none';
    setTimeout(() => {
      this.splash = false;
      this.tabBarElement.style.display = 'flex';
    }, 4000);

  }
  OcultarMostrarSenha() {
    this.tipo = !this.tipo;
  }

  logarApp() {
    return this.bancodedados.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'select nome from usuarios where senha =? and email =?',
          data = [this.senha, this.usuario];
        console.log('Usuario' + this.usuario);
        console.log("senha" + this.senha);
        return db.executeSql(sql, data)
          .then((data: any) => {
            if (data.rows.length > 0) {
              this.navCtrl.push(TabsPage);
              let usuarios: any[] = [];
              for (var i = 0; i < data.rows.length; i++) {
                var usuario = data.rows.item(i);
                usuarios.push(usuario);
                let retorno = window.sessionStorage.setItem('nome', usuario.nome);
              }
              return usuarios;
            } else {
              const alert = this.alertCtrl.create({
                title: 'Dados Incorretos',
                subTitle: 'Certifique que todos os dados estão corretos e tente novamente.',
                buttons: ['OK']
              });
              alert.present();
            }
          });
      });
  }
}










