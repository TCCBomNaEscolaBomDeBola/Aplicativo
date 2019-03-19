import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { SQLiteObject } from '@ionic-native/sqlite';
import { BancodedadosProvider } from '../../providers/bancodedados/bancodedados';



@IonicPage()
@Component({
  selector: 'page-chamada',
  templateUrl: 'chamada.html',
})
export class ChamadaPage {

  chamada: any[] = [];
  modelo: any[] = [];
  presenca: any;
  teste: any[] = [];


  constructor(public navCtrl: NavController, public navParams: NavParams, public database: BancodedadosProvider, public toast: ToastController) {
  }

  ionViewDidLoad() {

    this.getAll();
    console.log('ionViewDidLoad ChamadaPage');
  }

  getAll() {
    let turma = window.sessionStorage.getItem("turma");
    return this.database.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'select ta.*  from todosAlunos ta  inner join turmas t on (t.id = ta.turma) where t.id=?';
        let data = [turma];
        console.log("turma" + turma);

        return db.executeSql(sql, data)
          .then((data: any) => {
            if (data.rows.length > 0) {
              let products: any[] = [];
              for (var i = 0; i < data.rows.length; i++) {
                var product = data.rows.item(i);
                products.push(product);
                this.chamada = products;
                console.log(this.chamada);
              }
              return products;
            } else {
              return [];
            }
          })
      })
  }
  FazerChamada(c) {
    let turma = window.sessionStorage.getItem("turma");
    return this.database.getDB()
      .then((db: SQLiteObject) => {
        this.modelo.forEach((value, id_aluno) => {
          (id_aluno + ': ' + value);
          let sql = 'select * from chamada where aluno =? and presenca=? and turma=?';
          let data = [id_aluno, "P", turma];
          return db.executeSql(sql, data)
            .then((data: any) => {
              if (data.rows.length === 0) {
                db.sqlBatch([
                  ['insert into chamada (aluno,presenca,turma) values (?,?,?)', [id_aluno, "P", turma]],
                ])
                console.log("aluno:" + id_aluno + "turma:" + turma);
                this.toast.create({ message: 'Chamada Realizada.', duration: 2000, position: 'botton' }).present();
              } else {
               }
            })
          //   })
        })
        this.teste.forEach((value, id_aluno) => {
          (id_aluno + ': ' + value);
          let sql = 'select * from chamada where aluno =? and presenca=? and turma=?';
          let data = [id_aluno, "F", turma];
          return db.executeSql(sql, data)
            .then((data: any) => {
              if (data.rows.length === 0) {
                db.sqlBatch([
                  ['insert into chamada (aluno,presenca,turma) values (?,?,?)', [id_aluno, "F", turma]],
                ])
                console.log("aluno:" + id_aluno + "turma:" + turma);
                this.toast.create({ message: 'Chamada Realizada.', duration: 2000, position: 'botton' }).present();
              }

            })
        })

      })
  }
}
