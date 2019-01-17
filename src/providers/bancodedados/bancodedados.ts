import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { HttpClient } from '@angular/common/http';
import { RestProvider } from '../rest/rest';

@Injectable()
export class BancodedadosProvider {

  voluntario: any;
  aluno: any;
  usuario: any;

  constructor(private sqlite: SQLite, public http: HttpClient, private restapiServiceProvider: RestProvider) { }

  /**
   * Cria um banco caso não exista ou pega um banco existente com o nome no parametro
   */
  public getDB() {
    return this.sqlite.create({
      name: 'bbdb.db',
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
      ['CREATE TABLE IF NOT EXISTS voluntario (id integer  primary key AUTOINCREMENT NOT NULL, nome TEXT, email TEXT, contato TEXT, senha TEXT)'],
      ['CREATE TABLE IF NOT EXISTS aluno (id integer  primary key AUTOINCREMENT NOT NULL, nome TEXT, data TEXT, escola TEXT, serie TEXT, responsavel TEXT, contato TEXT, logradouro TEXT, numero integer, cep TEXT, bairro TEXT, cidade TEXT, estado TEXT, complemento TEXT, observacao TEXT )'],
      ['CREATE TABLE IF NOT EXISTS usuarios (id integer primary key AUTOINCREMENT NOT NULL,nome TEXT, email TEXT,senha TEXT)'],
      ['CREATE TABLE IF NOT EXISTS turmas (id integer primary key AUTOINCREMENT NOT NULL,nome TEXT)'],
      ['CREATE TABLE IF NOT EXISTS estados (id integer primary key AUTOINCREMENT NOT NULL, nome TEXT)']
      // ['CREATE TABLE IF NOT EXISTS chamada (id integer primary key AUTOINCREMENT NOT NULL, barra integer, quantidade integer, responsavel integer, deposito_id integer, empresa integer, lote TEXT, FOREIGN KEY(deposito_id) REFERENCES depositos(id), FOREIGN KEY(responsavel) REFERENCES usuarios(pessoa_id))']
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
        console.log('usuario' + this.usuario);
        this.usuario.forEach(usuarios => {
         let sql = 'select * from usuarios where email =? and senha = ?';
          let data = [usuarios.email,usuarios.senha];
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
      
  






  private insertConfiguracaoItems(db: SQLiteObject) {

    db.executeSql('select COUNT(id) as qtd from configuracao', {})
      .then((data: any) => {
        //Se não existe nenhum registro
        if (data.rows.item(0).qtd == 0) {

          // Inserindo dados
          db.sqlBatch([
            ['insert into configuracao (endereco_ip) values (?)', ['10.0.8.120']],
            ['insert into configuracao (endereco_ip) values (?)', ['10.0.8.102']],
          ])
            .then(() => console.log('Dados padrões incluídos'))
            .catch(e => console.error('Erro ao incluir dados padrões', e));
        }
      })
      .catch(e => console.error('Erro ao consultar a qtd de subgrupo de produtos', e));
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





