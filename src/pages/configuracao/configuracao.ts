import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
//import { DatabaseProvider } from '../../providers/database/database';
import { SQLiteObject } from '@ionic-native/sqlite';
import { AlertController } from 'ionic-angular';
//import { LoginPage } from '../login/login';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@IonicPage()
@Component({
  selector: 'page-configuracao',
  templateUrl: 'configuracao.html',
})
export class ConfiguracaoPage {
  tabBarElement: any;
  configuracaoForm: any = {};
  ip: string;
  inputtext : string;

  constructor(public navCtrl: NavController, public navParams: NavParams, formBuilder: FormBuilder, public alertCtrl: AlertController,public http: HttpClient ) {
    this.tabBarElement = document.querySelector('.tabbar');



   // if (this.navParams.data.ip) {
     /// this.productProvider.get(this.navParams.data.ip)
       // .then((result: any) => {
       //   this.model = result;
       // })
    //}

    this.configuracaoForm = formBuilder.group({

      ip: ['', Validators.required],


    });
  }

  ionViewDidLoad() {
    this.tabBarElement.style.display = 'none';
    setTimeout(() => {

      this.tabBarElement.style.display = 'flex';
    }, );
  }

  Enviar() {
   
  }

 
}
