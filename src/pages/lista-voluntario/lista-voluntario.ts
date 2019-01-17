import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { VoluntarioProvider, Voluntario } from '../../providers/voluntario/voluntario';
import { RestProvider } from '../../providers/rest/rest';
import { CriaVoluntarioPage } from '../cria-voluntario/cria-voluntario';
import { BancodedadosProvider } from '../../providers/bancodedados/bancodedados';



@Component({

  selector: 'page-lista-voluntario',
  templateUrl: 'lista-voluntario.html',
})
export class ListaVoluntarioPage {

  model: Voluntario;
  voluntarios: any[] = [];
  searchText: string = null;
  modelo: any[] = [];
  user: any;
  nome_usuario : any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private toast: ToastController,
    private voluntarioProvider: VoluntarioProvider,
    private restProvider: RestProvider,
    public alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private database : BancodedadosProvider
  ) {

    this.model = new Voluntario();

    if (this.navParams.data.id) {
      this.voluntarioProvider.get(this.navParams.data.id)
        .then((result: any) => {
          this.model = result;
        })
    }
  }
  ionViewDidEnter() {
    this.getAllVoluntarios();

    this.nome_usuario = window.sessionStorage.getItem('nome');
  }

  getAllVoluntarios() {
    this.voluntarioProvider.getAll()
      .then((result: any[]) => {
        this.voluntarios = result;
      });
  }


  editarVoluntario(id: number) {
    this.navCtrl.push('EditaVoluntarioPage', { id: id });
  }

  deletarVoluntario(voluntario: Voluntario) {
    let alert = this.alertCtrl.create({

      title: 'Deletar Voluntário',
      message: 'Deseja realmente deletar este voluntário?',
      buttons: [
        {
          text: 'CANCELAR',
          role: 'cancel',
          handler: () => {
          }
        },
        {
          text: 'DELETAR',
          handler: () => {
            this.voluntarioProvider.remove(voluntario.id)
            //Removendo do array de voluntários
            var index = this.voluntarios.indexOf(voluntario);
            this.voluntarios.splice(index, 1);
            this.toast.create({ message: 'Voluntário removido com sucesso.', duration: 1000, position: 'botton' }).present();
          }
        }
      ]

    });
    alert.present();
  }
  adicionarVoluntario() {
    this.navCtrl.push(CriaVoluntarioPage);
  }

  enviarVoluntario(voluntario: Voluntario) {
    let alert = this.alertCtrl.create({
      title: 'Enviar Voluntário',
      message: 'Deseja realmente enviar este Voluntário?',
      buttons: [
        {
          text: 'CANCELAR',
          role: 'cancel',
          handler: () => {
          }
        },
        {
          text: 'ENVIAR',
          handler: () => {
            let vol = { "nome": voluntario.nome, "contato": voluntario.contato, "senha": voluntario.senha, "email": voluntario.email };
            this.restProvider.enviaVoluntario(vol).then((result) => {
              this.toast.create({ message: 'Registro ' + voluntario.id + ' enviado com sucesso.', duration: 1000, position: 'botton' }).present();
              this.navCtrl.setRoot(this.navCtrl.getActive().component);
            

            }, (err) => {
              this.toast.create({ message: 'Não foi possivel enviar o registro ' + voluntario.id, duration: 4000, position: 'botton' }).present();
            })
          }
        }
      ]
    });
    alert.present();
  }





  //filterVoluntarios(ev: any) {
  //this.getAllVoluntarios();
  //}

  enviarTodos() {
    let loading = this.loadingCtrl.create({
      content: 'Aguarde...',
    });

    loading.present();
    for (let voluntario of this.voluntarios) {
      let vol = { "nome": voluntario.nome, "contato": voluntario.contato, "login": voluntario.login, "senha": voluntario.senha, "email": voluntario.email };
      this.restProvider.enviaVoluntario(vol).then((result) => {
        loading.dismiss();
        this.toast.create({ message: 'Registro ' + voluntario.id + ' enviado com sucesso.', duration: 1000, position: 'botton' }).present();
        this.navCtrl.setRoot(this.navCtrl.getActive().component);
      });
      () => {
        let alert = this.alertCtrl.create({
          title: 'Error',
          subTitle: 'Não foi possivel. Tente novamente.',
          buttons: ['Ok']
        })
        loading.dismiss();
        alert.present();
      }
    }


    //filterVoluntarios(ev: any) {
    //this.getAllVoluntarios();
    //}
  }


}


