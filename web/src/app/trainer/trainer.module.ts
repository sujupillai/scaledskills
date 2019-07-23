import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MaterialModule} from '../_material/material.module';
import {TrainerRoutingModule} from './trainer-routing.module';
import { TrainerAccountComponent } from './trainer-account/trainer-account.component';

@NgModule({
  declarations: [TrainerAccountComponent],
  imports: [
    CommonModule,
    TrainerRoutingModule,
    MaterialModule
  ]
})
export class TrainerModule { }
