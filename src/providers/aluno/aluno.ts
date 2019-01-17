import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite';
import { BancodedadosProvider } from '../bancodedados/bancodedados';





@Injectable()
export class AlunoProvider {



  constructor(private dbProvider: BancodedadosProvider) {
    console.log('Hello AlunoProvider Provider');
  }

  public insert(aluno: Aluno) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'insert into aluno (nome, data, escola, serie, responsavel, contato, logradouro, numero, cep, bairro, cidade, estado, complemento, observacao) values ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
        let data = [aluno.nome, aluno.data, aluno.escola, aluno.serie, aluno.responsavel, aluno.contato, aluno.logradouro, aluno.numero, aluno.cep, aluno.bairro, aluno.cidade, aluno.estado, aluno.complemento, aluno.observacao];
        return db.executeSql(sql, data)
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

  public update(aluno: Aluno) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'update aluno set  nome = ?, data = ?, escola = ? , serie = ?, responsavel = ? , contato = ?, logradouro = ?, numero = ? , cep = ? , bairro = ?, cidade = ? , estado = ? , complemento = ?, observacao = ? where id = ?';
        let data = [aluno.nome, aluno.data, aluno.escola, aluno.serie, aluno.responsavel, aluno.contato, aluno.logradouro, aluno.numero, aluno.cep, aluno.bairro, aluno.cidade, aluno.estado, aluno.complemento, aluno.observacao, aluno.id];
        return db.executeSql(sql, data)
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

  public remove(id: number) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'delete from aluno where id = ?';
        let data = [id];
        return db.executeSql(sql, data)
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }


  public get(id: number) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'select * from aluno where id = ?';
        let data = [id];
        return db.executeSql(sql, data)
          .then((data: any) => {
            if (data.rows.length > 0) {
              let item = data.rows.item(0);
              let aluno = new Aluno();
              aluno.id = item.id;
              aluno.nome = item.nome;
              aluno.data = item.data;
              aluno.escola = item.escola;
              aluno.serie = item.serie;
              aluno.responsavel = item.responsavel;
              aluno.contato = item.contato;
              aluno.logradouro = item.logradouro;
              aluno.numero = item.numero;
              aluno.cep = item.cep;
              aluno.bairro = item.bairro;
              aluno.cidade = item.cidade;
              aluno.estado = item.estado;
              aluno.complemento = item.complemento;
              aluno.observacao = item.observacao;
              return aluno;
            }
            return null;
          })
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }


  public getAll() {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        return db.executeSql('select * from aluno', [])
          .then((data: any) => {
            if (data.rows.length > 0) {
              let alunos: any[] = [];
              for (var i = 0; i < data.rows.length; i++) {
                var alu = data.rows.item(i);
                alunos.push(alu);
              }
              return alunos;
            } else {
              return [];
            }
          })
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }
}



export class Aluno {

  id: number;
  nome: string;
  data: string;
  escola: string;
  serie: string;
  responsavel: string;
  contato: string;
  logradouro: string;
  numero: string;
  cep: string;
  bairro: string;
  cidade: string;
  estado: string;
  complemento: string;
  observacao: string;

}

