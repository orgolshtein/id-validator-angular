import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'validator',
  templateUrl: './validator.component.html',
  styleUrl: './validator.component.css'
})
export class ValidatorComponent implements OnInit{
  @Input() inputTxt!: string;
  @Input() output!: number;
  @Input() sum!: number;
  @Input() msg!: string;
  @Input() color!: string;
  @Input() outputTxt!: string;
  @Input() isError!: boolean;
  constructor() { }
  
  ngOnInit(): void { 
  }
}
