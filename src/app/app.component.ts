import { Component, QueryList, ViewChildren } from '@angular/core';
import {Subject} from "rxjs";
import {debounceTime, distinctUntilChanged} from "rxjs/operators";
'rxjs/operators';
@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  @ViewChildren('names') names:QueryList<any>;
  @ViewChildren('types') types:QueryList<any>;
  currentIndex = 0;
// subscription
  txtQueryChanged: Subject<string> = new Subject<string>();
  selectedName: string;
  selectedType: string;

  data = [
    {name:"one", type:1},
    {name:"two", type:2},
    {name:"three", type:3},
  ];

   constructor() {
         this.txtQueryChanged
           .pipe(debounceTime(1000), distinctUntilChanged())
            .subscribe(model => {
              this.names.toArray()[this.currentIndex] = model;
              console.log('changes done to index: '+ this.currentIndex)
       // api call
   });
   }

   onFieldChange(index, query:string){
     this.currentIndex = index;
      this.txtQueryChanged.next(query);
    }

  showData(index){
    let namesArray = this.names.toArray();
    let typesArray = this.types.toArray();

    this.selectedName = namesArray[index].nativeElement.innerHTML;
    this.selectedType = typesArray[index].nativeElement.innerHTML;
  }
}
