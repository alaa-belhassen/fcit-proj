import { AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild  } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DoneComponent } from '../done/done.component';
import { ProfileformateurComponent } from '../_profileformateur/profileformateur.component';
import { TestService } from '../test.service';
import { CdkAriaLive } from '@angular/cdk/a11y';
import { addEvaluation, Evaluation } from '../Models/evaluation';
@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.scss']
})
export class PopUpComponent implements OnInit,AfterViewInit {
  
  public inputcp="";
  public inputpa="";
  constructor(private dialogRef: MatDialogRef<PopUpComponent>,private dialogRef2:MatDialog,@Inject(MAT_DIALOG_DATA) public data:any,public Testservice:TestService) { }

  ngOnInit(): void {
    console.log(this.inputcp)
  }
  ngAfterViewInit():void{
  
  }
  
  list=[{name:"comprondre le principe de la POO",index:2},{name:"maitriser la définition d'une classe",index:3},{name:"maitrise le concept d'objet",index:4},{name:"connaitre le principe de l'encapsulation",index:5},{name:"savoir manipuler les méthodes",index:6}]
  list2=[{name:"comprondre le principe de la POO",index:7},{name:"maitriser la définition d'une classe",index:8},{name:"maitrise le concept d'objet",index:9},{name:"connaitre le principe de l'encapsulation",index:10},{name:"savoir manipuler les méthodes",index:11}]
  public Evaluer(){
    this.Testservice.Evaluer(this.data.id).subscribe(()=>{
      console.log('Evaluation done');
    })
  }
  lvl=[1,1,1,1,1,1,1,1,1,1,1,1];
  changed(number:number,index:number){
    this.lvl[index]=number
  }
  evaluation = new addEvaluation();
  
  eval=['assimulation_et_realistaion','autonomie','evc_obj1','evc_obj2','evc_obj3','evc_obj4','evc_obj5','evt_obj1','evt_obj2','evt_obj3','evt_obj4','evt_obj5']
  //inserting data to evaluation 
  insertEval(){
    this.evaluation.commentaire=this.inputcp;
    this.evaluation.pointfort=this.inputpa;
    this.evaluation.participantid=this.data.id;
    this.evaluation.assimulation_et_realistaion=this.lvl[1];
    this.evaluation.autonomie=this.lvl[0];
    this.evaluation.evc_obj1=this.lvl[2];
    this.evaluation.evc_obj2=this.lvl[3];
    this.evaluation.evc_obj3=this.lvl[4];
    this.evaluation.evc_obj4=this.lvl[5];
    this.evaluation.evc_obj5=this.lvl[6];
    this.evaluation.evt_obj1=this.lvl[7];
    this.evaluation.evt_obj2=this.lvl[8];
    this.evaluation.evt_obj3=this.lvl[9];
    this.evaluation.evt_obj4=this.lvl[10];
    this.evaluation.evt_obj5=this.lvl[11];
  }
  //inserting evaluation to database
  addEvaluation(){
   this.insertEval();
    console.log(this.evaluation);
    this.Testservice.addevaluation(this.evaluation).subscribe(()=>{
      console.log('evaluation added successfully')
    })
  }
  //modif evaluation from database
  modifEvaluation(){
    this.insertEval();
    this.Testservice.editEvaluation(this.evaluation).subscribe(()=>{
      console.log('evaluation modifier')
    })
  }

  closeDialog(){
    console.log(this.inputcp)
    if((this.inputcp!=="")&&(this.inputpa!=="")){
      this.Evaluer();
      if(this.data.etat==="évaluer"){
        this.modifEvaluation();
      }else{
        this.addEvaluation();
      }
     
      this.dialogRef.close();
      this.dialogRef2.open(DoneComponent);
    }
  
  }

}
