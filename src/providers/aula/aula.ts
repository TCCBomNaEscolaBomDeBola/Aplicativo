import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite';
import { BancodedadosProvider } from '../bancodedados/bancodedados';


@Injectable()
export class AulaProvider {

  constructor(public http: HttpClient, public dbProvider: BancodedadosProvider) {


  }
  public insert(aula: Aula) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'insert into aula (dataInicio, dataFim, turma) values ( ?, ?, ?)';
        let data = [aula.datainicial, aula.dataFinal, aula.turma];
        return db.executeSql(sql, data)
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

  public remove(id: number) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'delete from aula where id = ?';
        let data = [id];
        return db.executeSql(sql, data)
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }


  public getAll() {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        return db.executeSql('select a.dataInicio, a.id, a.dataFim, t.nome , t.id as id_turma from aula a inner join turmas t on (t.id = a.turma) ', [])
          .then((data: any) => {
            if (data.rows.length > 0) {
              let aulas: any[] = [];
              for (var i = 0; i < data.rows.length; i++) {
                var turma = data.rows.item(i);
                aulas.push(turma);
              }
              return aulas;
            } else {
              return [];
            }
          })
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }


}


export class Aula {

  id: number;
  datainicial: string;
  dataFinal: string;
  turma: number;

}

