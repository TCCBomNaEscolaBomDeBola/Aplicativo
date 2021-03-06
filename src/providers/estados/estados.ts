import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite';
import { BancodedadosProvider } from '../bancodedados/bancodedados';


@Injectable()
export class EstadosProvider {

  constructor(private dbProvider: BancodedadosProvider) {
    console.log('Hello EstadosProvider Provider');
  }

  public getAll() {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        return db.executeSql('select * from estados', [])
          .then((data: any) => {
            if (data.rows.length > 0) {
              let estados: any[] = [];
              for (var i = 0; i < data.rows.length; i++) {
                var estado = data.rows.item(i);
                estados.push(estado);
              }
              return estados;
            } else {
              return [];
            }
          })
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }
}





