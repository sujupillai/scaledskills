import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatNativeDateModule } from '@angular/material/core';
import { MaterialModule } from '../../_material/material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {InputTextModule} from 'primeng/inputtext';
import {CheckboxModule} from 'primeng/checkbox';
import {ButtonModule} from 'primeng/button';
import {CardModule} from 'primeng/card';
import {EditorModule} from 'primeng/editor';
@NgModule({
  declarations: [],
  imports: [
    CommonModule, MatNativeDateModule, MaterialModule, ReactiveFormsModule, FormsModule, InputTextModule, CheckboxModule, ButtonModule, EditorModule
  ],
  exports: [
    CommonModule, MatNativeDateModule, MaterialModule, ReactiveFormsModule, FormsModule, InputTextModule, CheckboxModule, ButtonModule, CardModule, EditorModule
  ]
})
export class FormModule { }
