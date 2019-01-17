import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite';
import { BancodedadosProvider } from '../bancodedados/bancodedados';


@Injectable()
export class VoluntarioProvider {

  constructor(private dbProvider: BancodedadosProvider) {
    console.log('');
  }

  public insert(voluntario: Voluntario) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'insert into voluntario (nome, email, contato, senha) values ( ?, ?, ?, ?)';
        let data = [voluntario.nome, voluntario.email, voluntario.contato, voluntario.senha];
        return db.executeSql(sql, data)
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

  public update(voluntario: Voluntario) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'update voluntario set  nome = ?, email = ?,  contato = ?, senha = ?  where id = ?';
        let data = [voluntario.nome, voluntario.email,  voluntario.contato, voluntario.senha, voluntario.id];
        return db.executeSql(sql, data)
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

  public remove(id: number) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'delete from voluntario where id = ?';
        let data = [id];
        return db.executeSql(sql, data)
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }


  public get(id: number) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'select * from voluntario where id = ?';
        let data = [id];
        return db.executeSql(sql, data)
          .then((data: any) => {
            if (data.rows.length > 0) {
              let item = data.rows.item(0);
              let voluntario = new Voluntario();
              voluntario.id = item.id;
              voluntario.nome = item.nome;
              voluntario.email = item.email;
              voluntario.contato = item.contato;
              voluntario.senha = item.senha;
              return voluntario;
            }
            return null;
          })
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }



  /* public getAll(voluntario: string = null) {
     return this.dbProvider.getDB()
       .then((db: SQLiteObject) => {
         let sql = 'select v.nome,v.email,v.id from voluntario v'
         var data = [''];
        // 
         if (voluntario) {
           sql += ' and v.nome like ?'
           data.push('%' + voluntario + '%');
         }
         return db.executeSql(sql, data)
           .then((data: any) => {
             if (data.rows.length > 0) {
               let voluntarios: any[] = [];
               for (var i = 0; i < data.rows.length; i++) {
                 var vol = data.rows.item(i);
                 voluntarios.push(vol);
               }
               return voluntarios;
             } else {
               return [];
             }
           })
           .catch((e) => console.error(e));
       })
       .catch((e) => console.error(e));
   }
 }*/

  public getAll() {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        return db.executeSql('select * from voluntario', [])
          .then((data: any) => {
            if (data.rows.length > 0) {
              let voluntarios: any[] = [];
              for (var i = 0; i < data.rows.length; i++) {
                var vol = data.rows.item(i);
                voluntarios.push(vol);
              }
              return voluntarios;
            } else {
              return [];
            }
          })
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }
}



export class Voluntario {

  id: number;
  nome: string;
  email: string;
  contato: string;
  senha: string;

}








