import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite';
import { BancodedadosProvider } from '../bancodedados/bancodedados';


@Injectable()
export class TurmaProvider {

  constructor(private dbProvider: BancodedadosProvider) {
    console.log('Hello TurmaProvider Provider');
  }

  public getAll() {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        return db.executeSql('select * from turmas', [])
          .then((data: any) => {
            if (data.rows.length > 0) {
              let turmas: any[] = [];
              for (var i = 0; i < data.rows.length; i++) {
                var turma = data.rows.item(i);
                turmas.push(turma);
              }
              return turmas;
            } else {
              return [];
            }
          })
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }
}





