import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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

  constructor(public navCtrl: NavController, public navParams: NavParams, public database: BancodedadosProvider) {
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
  FazerChamada(){
  /*  return this.banco.getDB()
    .then((db: SQLiteObject) => {
      // for( let id  of this.modelo)
      this.modelo.forEach((value, key) => {
        (key + ': ' + value);
        console.log('id turma' + key)
        let sql = 'select * from turma_aluno where id_turma =? and id_aluno=?';
        let data = [key, this.id_aluno];
        return db.executeSql(sql, data)
          .then((data: any) => {
            if (data.rows.length === 0) {
              console.log('id do aluno' + this.id_aluno);
              db.sqlBatch([
                ['insert into turma_aluno (id_aluno,id_turma) values (?,?)', [this.id_aluno, key]],
              ])
              this.toast.create({ message: 'Turma cadastrada.', duration: 2000, position: 'botton' }).present();
              this.navCtrl.push(ListarAlunoPage);
            } else {
              this.toast.create({ message: 'Turma já cadastrada.', duration: 1000, position: 'botton' }).present()
            }
          })
      })

    })
}*/

  }
}
