import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  inputTxt!: string;
  sum!: number;
  counter!: number;
  output!: number;
  msg!: string;
  color!: string;
  outputTxt!: string;
  isError: boolean = false

  constructor() { };

  ngOnInit(): void {
    this.inputTxt = "";
    this.msg = "";
  }
  
  validate(newInput: any){
    this.inputTxt = newInput.toString();
    this.counter = 0;
    this.sum = 0;
    let inputArray: number[] = this.inputTxt.padStart(8, '0').split("").map(Number);
    let controlArray: number[] = [1,2,1,2,1,2,1,2,1];
    inputArray.forEach((digit: number, i: number)=>{
      (digit * controlArray[i]) > 9 ?
      this.sum += (digit * controlArray[i]).toString().split("").map(Number).reduce((a, b) => a + b)
      : this.sum += (digit * controlArray[i]);
    });
    for (this.counter = 0; this.counter < 10; this.counter++){
      if ((this.counter + this.sum) % 10 === 0){
          break;
      }
    }
    this.output = this.counter;
    this.msg = "";
    this.outputTxt = "";
    if (isNaN(Number(this.inputTxt))=== true){
      this.msg = "יש להקליד מספרים בלבד";
      this.isError = true;
    } else{
      if ((this.inputTxt.length === 9) && ((this.sum) % 10 !== 0)){
        this.outputTxt = `מספר הזהות ${this.inputTxt.padStart(9, '0')} לא תקין`;
        this.isError = true;
      } else {
        if ((this.inputTxt.length === 9) && ((this.sum) % 10 === 0)){
          this.outputTxt = `מספר הזהות ${this.inputTxt.padStart(9, '0')} תקין`;
          this.isError = false;
        } else {
          if (this.inputTxt.length === 0){
            this.msg = "הקלד ספרות כדי לקבל את ספרת הביקורת";
            this.isError = false;
          } else {
            this.msg = `ספרת הביקורת עבור ${this.inputTxt.padStart(8, '0')} היא`;
            this.outputTxt = this.output.toString();
            this.isError = false;
          }
        }
      }
    }
  }

  clearVal(event: any){
    if (event){
      this.msg = "";
      this.outputTxt = "";
    }
  }

}
