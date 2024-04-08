import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'id-input',
  templateUrl: './id-input.component.html',
  styleUrl: './id-input.component.css'
})
export class IdInputComponent implements OnInit{
  @Input() isHeb!: boolean;
  @Output() updateInput = new EventEmitter<string>();
  @Output() clearVal = new EventEmitter<boolean>();
  newInput: string = '';
  buttonText: string = 'תשובה';
  buttonDisabled: boolean = false;
  
  constructor() { }
  
  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges){
    changes['isHeb']['currentValue'] ?
    this.buttonText = 'תשובה' : this.buttonText = 'Answer';
  }

  clickOnEnter(event: any){
    if (event.key === 'Enter') {
        event.preventDefault();
        document.querySelector('button')!.click();
    }
  }

  updateNewInput(){
    this.updateInput.emit(this.newInput);
    this.buttonDisabled = true;
  }

  clearValidator(){
    this.clearVal.emit(true);
    this.buttonDisabled = false;
    setTimeout(()=>{this.clearVal.emit(false)},100)
  }
  
}
