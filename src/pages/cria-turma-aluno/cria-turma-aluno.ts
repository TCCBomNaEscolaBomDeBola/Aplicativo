import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { TurmaProvider } from '../../providers/turma/turma';
import { SQLiteObject } from '@ionic-native/sqlite';
import { BancodedadosProvider } from '../../providers/bancodedados/bancodedados';
import { ListarAlunoPage } from '../listar-aluno/listar-aluno';
import { TurmaAluVolProvider } from '../../providers/turma-alu-vol/turma-alu-vol';

@IonicPage()
@Component({
  selector: 'page-cria-turma-aluno',
  templateUrl: 'cria-turma-aluno.html',
})
export class CriaTurmaAlunoPage {
  turma: any[];
  aluno: any;
  id_aluno: any;
  modelo: any[] = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, public Turma: TurmaProvider, public toast: ToastController, public banco: BancodedadosProvider, public TurmaAlVol: TurmaAluVolProvider) {
  }

  ionViewDidLoad() {

    // recebe o id e nome do aluno
    this.id_aluno = this.TurmaAlVol.getAluno();
    this.aluno = this.TurmaAlVol.GetNomeAluno();

    this.Turma.getAll()
      .then((result: any[]) => {
        this.turma = result;
      })
      .catch(() => {
        this.toast.create({ message: 'Erro ao carregar as turmas.', duration: 3000, position: 'botton' }).present();
      });
  }

  enviar() {
    return this.banco.getDB()
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
  }

}


