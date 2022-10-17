import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  constructor(private formBuilder: FormBuilder) { }

  public array = [...Array(9).keys()];
  public activeElementRow!: string;
  public activeElementColumn!: string ;
  public form!: FormGroup;
  public sudoku_matrix!: FormArray;


  // TODO: povezati form group/form array sa template-om i 
  // prikazati stvarne brojeve u sudoku gridu


  ngOnInit(): void { 
    this.form = this.formBuilder.group({
      details: new FormArray([])
    });
    this.sudoku_matrix = this.form.controls['details'] as FormArray;
    this.generateForm();
  }

  public onClick($event: any) {    
    this.activeElementRow = $event.target.parentElement?.id[0];
    this.activeElementColumn = $event.target.parentElement?.id[1];
  }

  public generateForm() {
    let sudoku_matrix__row;
    for (let i = 0; i < 9; i++) {      
      this.sudoku_matrix.setControl(i, new FormArray([]));
      sudoku_matrix__row = (this.sudoku_matrix.at(i) as FormArray);
      
      for (let j = 0; j < 9; j++) {
        sudoku_matrix__row.setControl(j, new FormControl({
          row: i,
          column: j,
          computed: false,
          value: undefined
        }));
      }
    }
  }

  public setField(number: number){
    let fieldControl = ((this.sudoku_matrix.at(parseInt(this.activeElementRow)) as FormArray).at(parseInt(this.activeElementColumn))) as FormControl;
    fieldControl.setValue({
      ...fieldControl.value,
      value: number
    });
  }
}
