import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Evaluation,addEvaluation } from './Models/evaluation';
import { information  } from './Models/informationformation'  ;
@Injectable({
  providedIn: 'root',
})
export class TestService {
  
  formation = 'http://localhost:5001/formation';
  objectifs = 'http://localhost:5001/objectifs';
  participant = 'http://localhost:5001/participant';
  users = 'http://localhost:5001/users';
  evaluation = 'http://localhost:5001/evaluation';
  formateur = 'http://localhost:5001/formateurs';
  constructor(private http: HttpClient) {}
  public getUsers() {
    return this.http.get(`${this.users}/orm`);
  }
  public getUserByEmail(email:any) {
    return this.http.get(`${this.users}/${email}`);
  }
  public getFormation() {
    return this.http.get(`${this.formation}/orm`);
  }
  public getOneFormation(id: any) {
    return this.http.get(`${this.formation}/orm/${id}`);
  }
  public getParticipant(id: any) {
    return this.http.get(`${this.participant}/orm/${id}`);
  }
  public Evaluer(id: any) {
    return this.http.get(`${this.participant}/update/${id}`);
  }
  public evaluationTerminer(id: any,informations:information) {
    return this.http.put(`${this.formation}/update/${id}`,informations);
  }
  
  public addevaluation(evaluations:addEvaluation){
    return this.http.post(`${this.evaluation}/orm`,evaluations)
  }

  public editEvaluation(evaluations:addEvaluation){
    return this.http.put(`${this.evaluation}/update/${evaluations.participantid}`,evaluations)
  }
  //Getting All formations from the back
  getAllFormation() {
    return this.http.get(`${this.formation}`);
  }
  //Posting the new Formation in the back
  postFormation(newFormation: {}) {
    console.log(newFormation);
    this.http.post(`${this.formation}`, newFormation).subscribe((res) => {
      console.log(res);
    });
  }
  //Adding the objectives related to the new formation
  postObjectifs(newFormation) {
    console.log(newFormation);
    for (var i = 0; i < newFormation.Objectifs.length; i++) {
      let id = Math.floor(Math.random() * 100 + 1);
      let obj = {
        idObjectif: id,
        contenu: newFormation.Objectifs[i],
        idFormation: newFormation.idFormation,
      };

      this.http.post(`${this.objectifs}`, obj).subscribe((res) => {
        console.log(res);
      });
    }
  }
  //Adding the participants related to the new formation
  postParticipants(newFormation) {
    console.log(newFormation);
    for (var i = 1; i < newFormation.NbreParticipants; i++) {
      let id = Math.floor(Math.random() * 100 + i);
      let p = {
        idParticipant: id,
        participant: newFormation.Participants[i][0],
        identifiant: newFormation.Participants[i][1],
        email: newFormation.Participants[i][2],
        idFormation: newFormation.idFormation,
      };
      console.log(p);
      this.http.post(`${this.participant}`, p).subscribe((res) => {
        console.log(res);
      });
    }
  }
  //Searching Formation By ID
  getFormationById(id) {
    let data = this.http.get(`${this.formation}/${id}`);
    console.warn('FORMATION FROM SERVICE ==', data);
    return data;
  }
  //Getting objectifs by id
  getObjectifsByFormation(id) {
    let data = this.http.get(`${this.objectifs}/${id}`);
    console.warn('DATA FROM SERVICE ==', data);
    return data;
  }
  //Get Liste Participants by IdFormation
  getParticipantsByFormation(id) {
    let data = this.http.get(`${this.participant}/${id}`);
    console.warn('DATA FROM SERVICE ==', data);
    return data;
  }
  //Get Evaluation by idFormation
  getEvalByFormation(id) {
    let data = this.http.get(`${this.evaluation}/${id}`);
    // console.warn('DATA FROM SERVICE ==', data);
    return data;
  }
  //Posting the new Formateur in the back
  postFormateur(newFormateur: {}) {
    console.log(newFormateur);
    this.http.post(`${this.formateur}`, newFormateur).subscribe((res) => {
      console.log(res);
    });
  }

  //Delete Formateur
  deleteFormateur(CIN: number) {
    console.log(CIN);
    this.http.delete(`${this.formateur}/${CIN}`).subscribe((res) => {
      console.log(res);
    });
  }

  //Update Formateur
  updateFormateur(newFormateur: {}, CIN) {
    console.log('NEWfORMATEUR000', newFormateur);
    this.http.put(`${this.formateur}/${CIN}`, newFormateur).subscribe((res) => {
      console.log(res);
    });
  }

  //Getting the formateurs' data from the API
  getFormateurs() {
    return this.http.get(`${this.formateur}`);
  }

  //Searching Formations by Title
  getDataByTitle(title) {
    let data = this.http.get(`${this.formation}/title/${title}`);
    console.warn('DATA FROM SERVICE ==', data);
    return data;
  }
}
