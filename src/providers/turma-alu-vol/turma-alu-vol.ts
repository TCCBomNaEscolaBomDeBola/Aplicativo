import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable()
export class TurmaAluVolProvider {

  private id_aluno: string;
  private id_voluntario: string;
  private nome_voluntario: string;
  private nome_aluno: string;

  constructor(public http: HttpClient) {
    console.log('Hello TurmaAluVolProvider Provider');
  }

  public setAluno(aluno: string) {
    this.id_aluno = aluno;

  }

  public getAluno() {
    return this.id_aluno;
  }

  public SetVoluntario(voluntario: string) {
    this.id_voluntario = voluntario;
  }

  public getVoluntario() {
    return this.id_voluntario;
  }

  public SetNomeVoluntario(nome: string) {
    this.nome_voluntario = nome;

  }
  public GetNomeVoluntario() {
    return this.nome_voluntario;

  }

  public SetNomeAluno(nome: string) {
    this.nome_aluno = nome;
  }
  
  public GetNomeAluno() {
    return this.nome_aluno;
  }
}


