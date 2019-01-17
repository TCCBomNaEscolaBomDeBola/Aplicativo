import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { AlunoProvider, Aluno } from '../../providers/aluno/aluno';
import { RestProvider } from '../../providers/rest/rest';
import { CriaAlunoPage } from '../cria-aluno/cria-aluno';


@Component({
  selector: 'page-listar-aluno',
  templateUrl: 'listar-aluno.html',
})
export class ListarAlunoPage {

  model: Aluno;
  alunos: any[] = [];
  searchText: string = null;
  modelo: any[] = [];
  user: any;
  nome_usuario:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private toast: ToastController, private alunoProvider: AlunoProvider, private restProvider: RestProvider, public alertCtrl: AlertController, private loadingCtrl: LoadingController, ) {

    this.model = new Aluno();

    if (this.navParams.data.id) {
      this.alunoProvider.get(this.navParams.data.id)
        .then((result: any) => {
          this.model = result;
        })
    }
  }
  ionViewDidEnter() {
    this.getAllAlunos();
    this.nome_usuario = window.sessionStorage.getItem('nome');
  }

  getAllAlunos() {
    this.alunoProvider.getAll()
      .then((result: any[]) => {
        this.alunos = result;
      });
  }


  editarAluno(id: number) {
    this.navCtrl.push('EditarAlunoPage', { id: id });
  }

  deletarAluno(aluno: Aluno) {
    let alert = this.alertCtrl.create({

      title: 'Deletar Aluno',
      message: 'Deseja realmente deletar este aluno?',
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
            this.alunoProvider.remove(aluno.id)
            //Removendo do array de aluno
            var index = this.alunos.indexOf(aluno);
            this.alunos.splice(index, 1);
            this.toast.create({ message: 'Aluno removido com sucesso.', duration: 1000, position: 'botton' }).present();
          }
        }
      ]

    });
    alert.present();
  }
  adicionarAluno() {
    this.navCtrl.push(CriaAlunoPage);
  }

  enviarAluno(aluno: Aluno) {
    let alert = this.alertCtrl.create({
      title: 'Enviar Aluno',
      message: 'Deseja realmente enviar este Aluno?',
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
            let alu = { "nome": aluno.nome, "dataNasc": aluno.data, "escola": aluno.escola, "serie": aluno.serie, "responsavel": aluno.responsavel, "contato": aluno.contato, "logradouro": aluno.logradouro, "numero": aluno.numero, "cep": aluno.cep, "bairro": aluno.bairro, "cidade": aluno.cidade, "estado": aluno.estado, "complemento": aluno.complemento, "observacao": aluno.observacao };
            this.restProvider.enviaAluno(alu).then((result) => {
              this.toast.create({ message: 'Registro ' + aluno.id + ' enviado com sucesso.', duration: 1000, position: 'botton' }).present();
              this.navCtrl.setRoot(this.navCtrl.getActive().component);

            }, (err) => {
              this.toast.create({ message: 'Não foi possivel enviar o registro ' + aluno.id, duration: 4000, position: 'botton' }).present();
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
    for (let aluno of this.alunos) {
      let alu = { "nome": aluno.nome, "dataNasc": aluno.data, "escola": aluno.escola, "serie": aluno.serie, "responsavel": aluno.responsavel, "contato": aluno.contato, "logradouro": aluno.logradouro, "numero": aluno.numero, "cep": aluno.cep, "bairro": aluno.bairro, "cidade": aluno.cidade, "estado": aluno.estado, "complemento": aluno.complemento, "observacao": aluno.observacao };
      this.restProvider.enviaAluno(alu).then((result) => {
        loading.dismiss();
        this.toast.create({ message: 'Registro ' + aluno.id + ' enviado com sucesso.', duration: 1000, position: 'botton' }).present();
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


    /* enviarTodos() {
       let alert = this.alertCtrl.create({
   
         title: 'Enviar todos Alunos',
         message: 'Deseja realmente enviar todos os Alunos?',
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
               for (let aluno of this.alunos) {
                 let alu = { "nome": aluno.nome, "dataNasc": aluno.data, "escola": aluno.escola, "serie": aluno.serie, "responsavel": aluno.responsavel, "contato": aluno.contato, "logradouro": aluno.logradouro, "numero": aluno.numero, "cep": aluno.cep, "bairro": aluno.bairro, "cidade": aluno.cidade, "estado": aluno.estado, "complemento": aluno.complemento, "observacao": aluno.observacao };
                 this.restProvider.EnviaAluno(alu).then((result) => {
                   this.toast.create({ message: 'Registro ' + aluno.id + ' enviado com sucesso.', duration: 1000, position: 'botton' }).present();
                   this.navCtrl.setRoot(this.navCtrl.getActive().component);
   
                 }, (err) => {
                   this.toast.create({ message: 'Não foi possivel enviar o registro ' + aluno.id, duration: 4000, position: 'botton' }).present();
                 })
               }
             }
           }
         ]
   
       });
       alert.present();
     }
   
   
   } */
  }

}



