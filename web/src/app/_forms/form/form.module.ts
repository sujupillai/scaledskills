import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatNativeDateModule } from '@angular/material/core';
import { MaterialModule } from '../../_material/material.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [],
  imports: [
    CommonModule, MatNativeDateModule , MaterialModule, ReactiveFormsModule
  ],
  exports:[
    CommonModule, MatNativeDateModule , MaterialModule, ReactiveFormsModule
  ]
})
export class FormModule { }
