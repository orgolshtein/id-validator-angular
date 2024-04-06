import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'id-input',
  templateUrl: './id-input.component.html',
  styleUrl: './id-input.component.css'
})
export class IdInputComponent implements OnInit{
  @Output() updateInput = new EventEmitter<string>();
  @Output() clearVal = new EventEmitter<boolean>();
  newInput: string = "";
  
  constructor() { }
  
  ngOnInit(): void {
  }

  clickOnEnter(event: any){
    if (event.key === "Enter") {
        event.preventDefault();
        document.querySelector("button")!.click();
    }
  }

  updateNewInput(){
    this.updateInput.emit(this.newInput);
  }

  clearValidator(){
    this.clearVal.emit(true);
    setTimeout(()=>{this.clearVal.emit(false)},100)
  }
  
}
