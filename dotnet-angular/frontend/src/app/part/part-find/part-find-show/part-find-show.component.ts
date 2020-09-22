import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Part } from '../../part.model';
import { Subscription } from 'rxjs';
import { PartService } from '../../part.service';
import { AuthService } from 'src/app/shared/auth.service';
import { ActivatedRoute, Params } from '@angular/router';
import { DaysService } from '../../../shared/days/days.service';

@Component({
  selector: 'app-part-find-show',
  templateUrl: './part-find-show.component.html',
  styleUrls: ['./part-find-show.component.css']
})
export class PartFindShowComponent implements OnInit, OnDestroy {
  @Input() partInput: Part;
  isFetching = false;
  isError = false;
  error = '';
  editMode = false;
  part: Part;
  partNumber = "";
  id = '';
  subscriptions: Subscription[] = [];

  constructor(
    private partServ: PartService,
    private route: ActivatedRoute,
    private dayServ: DaysService
  ) { }

  ngOnInit() {
    if (this.partInput){
      this.partNumber = this.partInput.partNumber;
      this.part = this.partInput
    } else {
      this.subscriptions.push(
        this.route.params.subscribe((params: Params) =>{
          this.partNumber = params['part'];
          this.getPart();
        })
      );      
    }
    this.subscriptions.push(
      this.partServ.partChanged.subscribe(()=>{
        if (!this.partInput){
          this.getPart();
        }
      })
    )
    this.subscriptions.push(
      this.partServ.partUpdated.subscribe(()=>{
        this.editMode = false;
        if (!this.partInput){
          this.getPart();
        }
      })
    )
  }

  onDelete(part){
    if (confirm("Are you sure you want to delete " +part+ "?")){
      this.partServ.deletePart(part).subscribe(()=>{
        setTimeout(()=>{this.partServ.partChanged.next()},)}
      );
    }
  }

  onEdit(){
    this.editMode = true;
  }

  getPart() {
    this.isFetching = true;
    this.partServ.fetchPart(this.partNumber)
      .subscribe(part => {
        this.part = part;
        this.dayServ.dates = [];
        this.isFetching = false;
      }, error => {
        this.isFetching = false;
        this.isError = true;
        this.error = error.message
      }
    );
  } 

  changeActive(){
    if (this.part.active == 'Active'){
      let active = {
        active: 'Inactive'
      }
      this.partServ.changeActive(active, this.part.partNumber).subscribe(()=>{
        this.partServ.partChanged.next();
      })
    } else{
      let active = {
        active: 'Active'
      }
      this.partServ.changeActive(active, this.part.partNumber).subscribe(()=>{
        this.partServ.partChanged.next();
      })
    }
  }

  cancelRevEdit($event){
    this.editMode = $event;
  }

  ngOnDestroy(){
    this.subscriptions.forEach((sub)=>{sub.unsubscribe()})
  }
  //Removes observable subscriptions

}
