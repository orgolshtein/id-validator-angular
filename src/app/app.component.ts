import { Component, OnInit } from '@angular/core';

export interface InputObject {
  value: string
};
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  inputTxt: InputObject = {value: ''};
  isValidatorCleared!: boolean;

  constructor() { };

  ngOnInit(): void {
  }

  setNewvalue(newValue: string){
    this.inputTxt = {...this.inputTxt, value: newValue}
  }

  clearDirective(clear: boolean){
    this.isValidatorCleared = clear
  }
}
