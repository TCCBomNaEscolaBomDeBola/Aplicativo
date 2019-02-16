//import { HttpClient, Headers } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Voluntario } from '../voluntario/voluntario';
import 'rxjs/add/operator/map';

@Injectable()
export class RestProvider {
  api_aluno = 'http://api.bomnaescolaebomdebola.com/api/aluno';
  api_voluntario = 'http://api.bomnaescolaebomdebola.com/api/voluntario';
  api_turma = 'http://api.bomnaescolaebomdebola.com/api/turma';
  api_aula = 'http://api.bomnaescolaebomdebola.com/api/aula';

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
  


  public getTurma() {
    return new Promise(resolve => {
      this.http.get(this.api_turma).subscribe(data => {
        resolve(data);
      }, erro => {
        console.log(erro);
      });
    });
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
  

  public getAula() {
    return new Promise(resolve => {
      this.http.get(this.api_aula).subscribe(data => {
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

}





