import { Component, OnInit } from '@angular/core';

export interface InputObject {
  value: string
};

interface MainText {
  title: string,
  line1: string,
  line2: string,
  footerText: string
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  mainText: MainText = {
    title: 'אימות מספר זהות',
    line1: 'הקלד/י עד 8 ספרות ולחץ/י "תשובה" כדי לקבל את ספרת הביקורת',
    line2: 'או הקלד/י 9 ספרות ולחץ/י "תשובה" כדי לאמת את מספר הזהות המלא',
    footerText: 'נבנה על ידי אור גולשטיין:'
  }
  inputTxt: InputObject = {value: ''};
  isValidatorCleared!: boolean;
  isHeb: boolean = true;

  constructor() { };

  ngOnInit(): void {
    // document.title = `${this.mainText.title} | JavaScript`;
  }

  switchLang(){
    this.clearDirective(true);
    if ((document.querySelector("#lang-selector") as HTMLInputElement).value === "hebrew"){
        this.isHeb = true;
        (document.querySelector("#main-container") as HTMLInputElement).classList.add("he-text");
        this.mainText = {
          title: 'אימות מספר זהות',
          line1: 'הקלד/י עד 8 ספרות ולחץ/י "תשובה" כדי לקבל את ספרת הביקורת',
          line2: 'או הקלד/י 9 ספרות ולחץ/י "תשובה" כדי לאמת את מספר הזהות המלא',
          footerText: 'נבנה על ידי אור גולשטיין:'
        }
    } else {
      this.isHeb = false;
        (document.querySelector("#main-container") as HTMLInputElement).classList.remove("he-text");
        this.mainText = {
          title: 'Israeli ID Validator',
          line1: 'Type up to 8 digits and click "Answer" to receive the control digit',
          line2: 'or type 9 digits and click "Answer" to validate the full ID',
          footerText: 'Created by Or Golshtein:'
        }
    }
    document.title = `${this.mainText.title} | Angular`;
  }

  setNewvalue(newValue: string){
    this.inputTxt = {...this.inputTxt, value: newValue}
  }

  clearDirective(clear: boolean){
    this.isValidatorCleared = clear
  }
}
