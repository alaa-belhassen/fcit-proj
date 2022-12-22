import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { TestService } from '../test.service';

class participant {
  "name": string;
  "participantid":number;
  "etat": string;
  "dmaj": string;
 
}

@Component({
  selector: 'app-consultefiche',
  templateUrl: './consultefiche.component.html',
  styleUrls: ['./consultefiche.component.scss']
})
export class ConsulteficheComponent implements OnInit , AfterViewInit {
  id:any;
  participantid:any;
  title ="";
  date="";
  nbrp=0;
  participants:participant[]=[]
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns = ['participantid', 'name', 'etat', 'dmaj'];
  dataSource: MatTableDataSource<participant>;


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    console.log(this.dataSource)
  }
  constructor(public testservice:TestService,public route:ActivatedRoute,private router:Router) { }
  
  ngOnInit(): void {
    this.id=this.route.snapshot.paramMap.get('id');
    this.participantid=this.id;
    this.fetchparticipant();
    this.getcardinfo();
    
  }


  
  fetchparticipant(){
    this.testservice.getParticipant(this.id).subscribe((data:any)=>{
      this.participants=data;
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      console.log("data received");
    })
  }
  getcardinfo(){
    this.testservice.getOneFormation(this.participantid).subscribe((data:any)=>{
      console.log(data);
      this.title=data.title;
      this.date=data.date;
      this.nbrp=data.nombreparticipant;
      console.log("data formation received succesfullly");
  })
}
  public evaluation(){
    let i=0;
    let json=JSON.parse( JSON.stringify(this.participants)  , (k,v)=>{
        if(k === "etat"){
          if(v ==="évaluer"){
            i+=1;
          }
        }
      })
      return i ;
    }

    public goBack(){
        this.router.navigate(['/','formateur','mesformations']);
      }
    

}
