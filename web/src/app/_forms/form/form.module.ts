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
import {DropdownModule} from 'primeng/dropdown';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {RadioButtonModule} from 'primeng/radiobutton';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {CalendarModule} from 'primeng/calendar';
import {ChipsModule} from 'primeng/chips';
import {ToggleButtonModule} from 'primeng/togglebutton';
import {InputSwitchModule} from 'primeng/inputswitch';
import {TableModule} from 'primeng/table';
@NgModule({
  declarations: [],
  imports: [
    CommonModule, MatNativeDateModule, MaterialModule, ReactiveFormsModule, FormsModule, InputTextModule, CheckboxModule, ButtonModule, EditorModule, DropdownModule, InputTextareaModule, RadioButtonModule, AutoCompleteModule, CalendarModule, ChipsModule, ToggleButtonModule, InputSwitchModule, TableModule
  ],
  exports: [
    CommonModule, MatNativeDateModule, MaterialModule, ReactiveFormsModule, FormsModule, InputTextModule, CheckboxModule, ButtonModule, CardModule, EditorModule, DropdownModule, InputTextareaModule, RadioButtonModule, AutoCompleteModule, CalendarModule, ChipsModule, ToggleButtonModule, InputSwitchModule, TableModule
  ]
})
export class FormModule { }
