import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { InputObject } from '../app.component';

interface ValidatorTexts {
  onlyDigits: string,
  invalid: (x: any) => string,
  valid: (x: any) => string,
  ready: string,
  controlDigit: (x: any) => string
}
@Component({
  selector: 'validator',
  templateUrl: './validator.component.html',
  styleUrl: './validator.component.css'
})
export class ValidatorComponent implements OnInit{
  validatorTexts: ValidatorTexts = {
    onlyDigits: 'יש להקליד מספרים בלבד',
    invalid: (x) => `מספר הזהות ${x.padStart(9, '0')} לא תקין`,
    valid: (x) => `מספר הזהות ${x.padStart(9, '0')} תקין`,
    ready: 'הקלד ספרות כדי לקבל את ספרת הביקורת',
    controlDigit: (x) => `ספרת הביקורת עבור ${x.padStart(8, '0')} היא`
  }
  @Input() isHeb!: boolean;
  @Input() inputTxt!: InputObject;
  @Input() isValidatorCleared!: boolean
  sum!: number;
  counter!: number;
  output!: number;
  h3Output!: string;
  h2Output!: string;
  isError: boolean = false

  constructor() { }

  ngOnInit(): void { 
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['inputTxt'] && !changes['inputTxt']['firstChange']) {
      this.validate(changes['inputTxt']['currentValue']['value'])
    }
    if (changes['isValidatorCleared']){
      changes['isValidatorCleared']['currentValue'] ?
      this.clear() : null
    }
    if (changes['isHeb']){
      changes['isHeb']['currentValue'] ?
      this.validatorTexts = {
        onlyDigits: 'יש להקליד מספרים בלבד',
        invalid: (x) => `מספר הזהות ${x.padStart(9, '0')} לא תקין`,
        valid: (x) => `מספר הזהות ${x.padStart(9, '0')} תקין`,
        ready: 'הקלד ספרות כדי לקבל את ספרת הביקורת',
        controlDigit: (x) => `ספרת הביקורת עבור ${x.padStart(8, '0')} היא`
      } :
      this.validatorTexts = {
        onlyDigits: 'Only digits please',
        invalid: (x) => `ID ${x.padStart(9, '0')} is invalid`,
        valid: (x) => `ID ${x.padStart(9, '0')} is valid`,
        ready: 'Type digits to receive the control digit',
        controlDigit: (x) => `The control digit for ${x.padStart(8, '0')} is`
      }
    }
  }

  clear(){
    this.h3Output = '';
    this.h2Output = '';
  }

  validate(newInput: string){
    this.counter = 0;
    this.sum = 0;
    let inputArray: number[] = newInput.padStart(8, '0').split('').map(Number);
    let controlArray: number[] = [1,2,1,2,1,2,1,2,1];
    inputArray.forEach((digit: number, i: number)=>{
      (digit * controlArray[i]) > 9 ?
      this.sum += (digit * controlArray[i]).toString().split('').map(Number).reduce((a, b) => a + b)
      : this.sum += (digit * controlArray[i]);
    });
    for (this.counter = 0; this.counter < 10; this.counter++){
      if ((this.counter + this.sum) % 10 === 0){
          break;
      }
    }
    this.output = this.counter;
    this.clear();
    if (isNaN(Number(newInput))=== true){
      this.h3Output = this.validatorTexts.onlyDigits;
      this.isError = true;
    } else{
      if ((newInput.length === 9) && ((this.sum) % 10 !== 0)){
        this.h2Output = this.validatorTexts.invalid(newInput);
        this.isError = true;
      } else {
        if ((newInput.length === 9) && ((this.sum) % 10 === 0)){
          this.h2Output = this.validatorTexts.valid(newInput);
          this.isError = false;
        } else {
          if (newInput.length === 0){
            this.h3Output = this.validatorTexts.ready;
            this.isError = false;
          } else {
            this.h3Output = this.validatorTexts.controlDigit(newInput);
            this.h2Output = this.output.toString();
            this.isError = false;
          }
        }
      }
    }
  }
}
