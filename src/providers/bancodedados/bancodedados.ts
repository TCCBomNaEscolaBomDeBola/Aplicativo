import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { HttpClient } from '@angular/common/http';
import { RestProvider } from '../rest/rest';

@Injectable()
export class BancodedadosProvider {

  voluntario: any;
  aluno: any;
  usuario: any;
  turma: any;
  todos_alunos: any[] = [];

  constructor(private sqlite: SQLite, public http: HttpClient, private restapiServiceProvider: RestProvider) { }

  /**
   * Cria um banco caso não exista ou pega um banco existente com o nome no parametro
   */
  public getDB() {
    return this.sqlite.create({
      name: 'fgfdgdggdgdgd.db',
      location: 'default'
    });
  }


  /**
   * Cria a estrutura inicial do banco de dados
   */
  public createDatabase() {
    return this.getDB()
      .then((db: SQLiteObject) => {

        // Criando as tabelas
        this.createTables(db);

        // Inserindo dados estados
        this.inserirEstados(db);

        // Inserindo dados de usuário
        this.InsertUsuarioItems(db);
        console.log(this.InsertUsuarioItems);

        this.InsertTodosAlunosItems(db);
        console.log(this.InsertTodosAlunosItems);

        // Inserindo dados na  tabela turmas
        this.InsertTurmaItems(db);

        // Inserindo dados alunos
        //this.InsertAlunos(db);


      })
      .catch(e => console.log(e));
  }

  /**
   * Criando as tabelas no banco de dados
   * @param db
   */
  private createTables(db: SQLiteObject) {
    // Criando as tabelas
    db.sqlBatch([
      ['CREATE TABLE IF NOT EXISTS todosAlunos (id integer  primary key, nome TEXT, turma integer,FOREIGN KEY(turma) REFERENCES turmas (id))'],
      ['CREATE TABLE IF NOT EXISTS voluntario (id integer  primary key AUTOINCREMENT NOT NULL, nome TEXT, email TEXT, contato TEXT, senha TEXT, turma integer,FOREIGN KEY(turma) REFERENCES turmas (id))'],
      ['CREATE TABLE IF NOT EXISTS aula (id integer primary key AUTOINCREMENT NOT NULL, dataInicio TEXT, dataFim TEXT, turma integer,FOREIGN KEY(turma) REFERENCES turmas (id))'],
      ['CREATE TABLE IF NOT EXISTS aluno (id integer  primary key AUTOINCREMENT NOT NULL, nome TEXT, data TEXT, escola TEXT, serie TEXT, responsavel TEXT, contato TEXT, logradouro TEXT, numero integer, cep TEXT, bairro TEXT, cidade TEXT, estado TEXT, complemento TEXT, observacao TEXT, turma integer, FOREIGN KEY(turma) REFERENCES turmas (id))'],
      ['CREATE TABLE IF NOT EXISTS usuarios (id integer primary key AUTOINCREMENT NOT NULL,nome TEXT, email TEXT,senha TEXT)'],
      ['CREATE TABLE IF NOT EXISTS turmas (id integer primary key ,nome TEXT,IdadeMinima integer,IdadeMaxima integer,HorarioInicial TEXT,HorarioFinal TEXT, DiaSemana TEXT)'],
      // ['CREATE TABLE IF NOT EXISTS turma_voluntario (id integer primary key AUTOINCREMENT NOT NULL, id_voluntario integer, id_turma, FOREIGN KEY(id_voluntario) REFERENCES voluntario(id),FOREIGN KEY(id_turma) REFERENCES turma(id))'],
      ['CREATE TABLE IF NOT EXISTS estados (id integer primary key AUTOINCREMENT NOT NULL, nome TEXT)']
    ])
      .then(() => console.log('Tabelas criadas'))
      .catch(e => console.error('Erro ao criar as tabelas', e));
  }



  /**
   * Incluindo os dados padrões
   * @param db
   */

  private InsertUsuarioItems(db: SQLiteObject) {
    this.restapiServiceProvider.getVoluntario()
      .then((result: any[]) => {
        this.usuario = result;
        this.usuario.forEach(usuarios => {
          let sql = 'select * from usuarios where email =? and senha = ?';
          let data = [usuarios.email, usuarios.senha];
          return db.executeSql(sql, data)
            .then((data: any) => {
              //Se não existe nenhum registro
              if (data.rows.length === 0) {
                db.sqlBatch([
                  ['insert into usuarios (nome,senha,email) values ( ?, ?, ?)', [usuarios.Nome, usuarios.Senha, usuarios.Email]],
                ])
                  .then(() => console.log('Usuarios incluídos' + this.usuario))
                  .catch(e => console.error('Erro ao incluir Usuários', this.usuario));
              } else {
                // db.sqlBatch([
                // ['update usuarios set pessoa_id =?, login = ?, senha = ?, empresa = ?, nome_empresa = ? where pessoa_id = ? ', [usuarios.pessoa_id, usuarios.login, usuarios.senha, usuarios.empresa, usuarios.nome_empresa, usuarios.pessoa_id]],
                //])
                //.then(() => console.log('Dados padrões incluídos'))
                //.catch(e => console.error('Erro ao incluir dados padrões', e));
              }
            })
        })
      })
  }

  private InsertTodosAlunosItems(db: SQLiteObject) {
    this.restapiServiceProvider.getAluno()
      .then((result: any[]) => {

        this.todos_alunos = result;
        this.todos_alunos.forEach(alunos => {
          const turma = result && result.length > 0 ?
            alunos.Turmas :  // primeira turma no array
            null; // vazio se nao existir
          ///element.Turmas
          ///console.log(element.Tumas);
         turma.forEach(element => {
           window.sessionStorage.setItem("turma", element.Id);
           console.log('carol' + element.Id);
          
          let sql = 'delete from todosAlunos';
          let data = [];
          return db.executeSql(sql, data)
            .then((data: any) => {
              let turma = window.sessionStorage.getItem("turma");
              //Se não existe nenhum registro
             // if (data.rows.length === 0) {
                db.sqlBatch([
                  ['insert into todosAlunos (id,nome,turma) values ( ?, ?, ?)', [alunos.Id, alunos.Nome,  element.Id]],
                ])
                  .then(() => console.log('Todos os alunos incluídos' + this.todos_alunos))
                  .catch(e => console.error('Erro ao incluir Todos Alunos', this.todos_alunos));
             // } else {
                // db.sqlBatch([
                // ['update usuarios set pessoa_id =?, login = ?, senha = ?, empresa = ?, nome_empresa = ? where pessoa_id = ? ', [usuarios.pessoa_id, usuarios.login, usuarios.senha, usuarios.empresa, usuarios.nome_empresa, usuarios.pessoa_id]],
                //])
                //.then(() => console.log('Dados padrões incluídos'))
                //.catch(e => console.error('Erro ao incluir dados padrões', e));
             // }
              })
            })
        })
      })
  }


  private InsertTurmaItems(db: SQLiteObject) {
    this.restapiServiceProvider.getTurma()
      .then((result: any[]) => {
        this.turma = result;
        this.turma.forEach(turmas => {
          let sql = 'select * from turmas where id =?';
          let data = [turmas.id];
          return db.executeSql(sql, data)
            .then((data: any) => {
              //Se não existe nenhum registro
              if (data.rows.length === 0) {
                db.sqlBatch([
                  ['insert into turmas (id,nome,IdadeMinima,IdadeMaxima,HorarioInicial,HorarioFinal,DiaSemana) values (?, ?, ?, ?, ?, ?, ?)', [turmas.Id, turmas.Nome, turmas.IdadeMinima, turmas.IdadeMaxima, turmas.HorarioInicial, turmas.HorarioFinal, turmas.DiaSemana]],
                ])
                  .then(() => console.log('Turmas incluídas' + this.turma))
                  .catch(e => console.error('Erro ao incluir Turmas', this.turma));
              } else {
              }
            })
        })
      })
  }




  private inserirEstados(db: SQLiteObject) {

    db.executeSql('select COUNT(id) as qtd from estados', {})
      .then((data: any) => {
        //Se não existe nenhum registro
        if (data.rows.item(0).qtd == 0) {

          // Inserindo dados
          db.sqlBatch([
            ['insert into estados (nome) values (?)', ['Acre']],
            ['insert into estados (nome) values (?)', ['Alagoas']],
            ['insert into estados (nome) values (?)', ['Amapá']],
            ['insert into estados (nome) values (?)', ['Amazonas']],
            ['insert into estados (nome) values (?)', ['Bahia']],
            ['insert into estados (nome) values (?)', ['Ceará']],
            ['insert into estados (nome) values (?)', ['Distrito Federal']],
            ['insert into estados (nome) values (?)', ['Espírito Santo']],
            ['insert into estados (nome) values (?)', ['Goiás']],
            ['insert into estados (nome) values (?)', ['Maranhão']],
            ['insert into estados (nome) values (?)', ['Mato Grosso']],
            ['insert into estados (nome) values (?)', ['Mato Grosso do Sul']],
            ['insert into estados (nome) values (?)', ['Minas Gerais']],
            ['insert into estados (nome) values (?)', ['Pará']],
            ['insert into estados (nome) values (?)', ['Paraíba']],
            ['insert into estados (nome) values (?)', ['Paraná']],
            ['insert into estados (nome) values (?)', ['Pernambuco']],
            ['insert into estados (nome) values (?)', ['Piauí']],
            ['insert into estados (nome) values (?)', ['Rio de Janeiro ']],
            ['insert into estados (nome) values (?)', ['Rio Grande do Sul']],
            ['insert into estados (nome) values (?)', ['Rio Grande do Norte']],
            ['insert into estados (nome) values (?)', ['Rondônia']],
            ['insert into estados (nome) values (?)', ['Roraima']],
            ['insert into estados (nome) values (?)', ['Santa Catarina']],
            ['insert into estados (nome) values (?)', ['São Paulo']],
            ['insert into estados (nome) values (?)', ['Sergipe']],
            ['insert into estados (nome) values (?)', ['Tocantins']],

          ])
            .then(() => console.log('Dados padrões incluídos'))
            .catch(e => console.error('Erro ao incluir dados padrões', e));
        }
      })
      .catch(e => console.error('Erro ao consultar a qtd de estados', e));
  }

}





