//import { HttpClient, Headers } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Voluntario } from '../voluntario/voluntario';

@Injectable()
export class RestProvider {
  api_aluno = 'http://api.bomnaescolaebomdebola.com/api/aluno';
  api_voluntario = 'http://api.bomnaescolaebomdebola.com/api/voluntario';

  constructor(public http: HttpClient) {
  }


  public getVoluntario() {
    return new Promise(resolve => {
      this.http.get(this.api_voluntario).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);

      });
    });
  }


 public getVoluntarios():Observable<Voluntario[]>{
    return this.http.get<Voluntario[]>(this.api_voluntario);
  }
  
  public getAluno() {

    return new Promise(resolve => {

      this.http.get(this.api_aluno).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  enviaAluno(data) {
    let headers = new HttpHeaders();
    headers.append("Content-Type", "application/json");
    return new Promise((resolve, reject) => {
      this.http.post(this.api_aluno, data, { headers: headers })
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });

  }

  enviaVoluntario(data) {
    let headers = new HttpHeaders();
    headers.append("Content-Type", "application/json");
    return new Promise((resolve, reject) => {
      this.http.post(this.api_voluntario, data, { headers: headers })
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });

  }

  LoginVoluntario(login: string, senha: string) {
    return new Promise(resolve => {
      this.http.get(this.api_voluntario + '/' + login + '/' + senha).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

}





