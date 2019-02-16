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
        let sql = 'insert into voluntario (nome, email, contato, senha,turma) values ( ?, ?, ?, ?, ?)';
        let data = [voluntario.nome, voluntario.email, voluntario.contato, voluntario.senha, voluntario.turma];
        return db.executeSql(sql, data)
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

  public update(voluntario: Voluntario) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'update voluntario set  nome = ?, email = ?,  contato = ?, senha = ? , turma =? where id = ?';
        let data = [voluntario.nome, voluntario.email, voluntario.contato, voluntario.senha, voluntario.turma, voluntario.id];
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
              voluntario.turma = item.turma
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
        return db.executeSql('SELECT v.*, t.nome as nome_turma FROM voluntario v  inner join turmas t on v.turma = t.id ', [])
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

  public NomeTurma(turma: number) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        return db.executeSql('SELECT nome from turmas where id = ?', [turma])
          .then((data: any) => {
            if (data.rows.length > 0) {
              let voluntarios: any[] = [];
              for (var i = 0; i < data.rows.length; i++) {
                var vol = data.rows.item(i);
                voluntarios.push(vol);
                // retorna o nome da turma
                return vol.nome;
              }
            }
          })
      })
  }
}


export class Voluntario {

  id: number;
  nome: string;
  email: string;
  contato: string;
  senha: string;
  turma: number;

}








