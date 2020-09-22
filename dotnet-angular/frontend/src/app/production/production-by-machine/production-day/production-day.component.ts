import { Component, OnInit, Input } from '@angular/core';
import { ProductionService } from '../../production.service';
import { Production } from '../../production.model';
import { Machine } from 'src/app/machine/machine.model';
import { OpService } from 'src/app/job/job-ops/operation.service';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-production-day',
  templateUrl: './production-day.component.html',
  styleUrls: ['./production-day.component.css']
})
export class ProductionDayComponent implements OnInit {
  @Input() editMode: boolean;
  @Input() date: string;
  @Input() mach: Machine;
  production: Production[] = [];
  day: Production;
  night: Production;
  oNight: Production;
  found: Production;
  ready = false;

  constructor(
    private proServ: ProductionService,
    private opServ: OpService,
    private auth: AuthService
  ) { }

  ngOnInit() {
    this.getProduction();
  }

  changeAvg(avg: boolean, id){
    let newAvg = {
      average: !avg
    };
    this.proServ.setAverage(newAvg, id).subscribe(()=>{
      this.proServ.proChanged.next();
    });
  }

  getProduction(){
    this.production = [];
    let search = "formach=" + this.auth.splitJoin(this.mach.machine) 
      + "&job=" + this.mach.currentJob 
      + "&op=" + this.opServ.slashToDash(this.mach.currentOp) 
      + "&date=" + this.date;
    this.proServ.fetchProduction(search)
      .subscribe((prod)=>{
        this.production = prod
        let used = 0;
        if (prod.length > 0){
          prod.forEach(pro=>{
            if (pro.shift == "Day"){
              this.day = pro;
            } else if (pro.shift == "Night"){
              this.night = pro;
            } else if (pro.shift == "Over-Night"){
              this.oNight = pro;
            } else {
              this.found = pro;
            }
            used += 1;
            if (used == prod.length){
              this.ready = true;
            }
          })
        } else {
          this.ready = true;
        }
      }
    );
  }

}
