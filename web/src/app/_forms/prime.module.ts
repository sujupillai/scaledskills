import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatNativeDateModule } from '@angular/material/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { EditorModule } from 'primeng/editor';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { RadioButtonModule } from 'primeng/radiobutton';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CalendarModule } from 'primeng/calendar';
import { ChipsModule } from 'primeng/chips';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { InputSwitchModule } from 'primeng/inputswitch';
import { TableModule } from 'primeng/table';
import { FileUploadModule } from 'primeng/fileupload';
import { MultiSelectModule } from 'primeng/multiselect';
import { DataViewModule } from 'primeng/dataview';
import { RatingModule } from 'primeng/rating';
import { CarouselModule } from 'primeng/carousel';
import { TooltipModule } from 'primeng/tooltip';
import { DialogModule } from 'primeng/dialog';
import { CaptchaModule } from 'primeng/captcha';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import {PasswordModule} from 'primeng/password';

@NgModule({
  declarations: [],
  imports: [
    CommonModule, MatNativeDateModule, ReactiveFormsModule, FormsModule, InputTextModule, CheckboxModule, ButtonModule, EditorModule, DropdownModule, InputTextareaModule, RadioButtonModule, AutoCompleteModule, CalendarModule, ChipsModule, ToggleButtonModule, InputSwitchModule, TableModule, FileUploadModule, MultiSelectModule, DataViewModule, RatingModule, CarouselModule, TooltipModule, DialogModule, CaptchaModule, DynamicDialogModule, PasswordModule
  ],
  exports: [
    CommonModule, MatNativeDateModule, ReactiveFormsModule, FormsModule, InputTextModule, CheckboxModule, ButtonModule, CardModule, EditorModule, DropdownModule, InputTextareaModule, RadioButtonModule, AutoCompleteModule, CalendarModule, ChipsModule, ToggleButtonModule, InputSwitchModule, TableModule, FileUploadModule, MultiSelectModule, DataViewModule, RatingModule, CarouselModule, TooltipModule, DialogModule, CaptchaModule, DynamicDialogModule, PasswordModule
  ]
})
export class NgPrimeModule { }