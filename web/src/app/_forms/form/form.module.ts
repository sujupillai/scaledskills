import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatNativeDateModule } from '@angular/material/core';
import { MaterialModule } from '../../_material/material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [],
  imports: [
    CommonModule, MatNativeDateModule, MaterialModule, ReactiveFormsModule, FormsModule
  ],
  exports: [
    CommonModule, MatNativeDateModule, MaterialModule, ReactiveFormsModule, FormsModule
  ]
})
export class FormModule { }
