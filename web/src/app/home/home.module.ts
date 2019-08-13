import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { HomeRoutingModule } from './home-routing.module';
import { NguCarouselModule } from '@ngu/carousel';
import { AboutComponent } from './about/about.component';
import { BannerComponent } from './home/banner/banner.component';
import { CategoryComponent } from './home/category/category.component';
import { HomeProgressComponent } from './home/home-progress/home-progress.component';
import { WorkshopComponent } from './home/workshop/workshop.component';
import { HomeWorkshopComponent } from './home/home-workshop/home-workshop.component';
import { HomeLearnerComponent } from './home/home-learner/home-learner.component';
import { HomeTrainerComponent } from './home/home-trainer/home-trainer.component';
import { HomeSearchComponent } from './home/home-search/home-search.component';
import {FormModule} from '../_forms/form/form.module';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { TermsUseComponent } from './terms-use/terms-use.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { HomeAddComponent } from './home/home-add/home-add.component';
import { HomeBannerComponent } from './home-banner/home-banner.component';
import { TestimonialComponent } from './testimonial/testimonial.component'

@NgModule({
  declarations: [HomeComponent, AboutComponent, BannerComponent, CategoryComponent, HomeProgressComponent, WorkshopComponent, HomeWorkshopComponent, HomeLearnerComponent, HomeTrainerComponent, HomeSearchComponent, ContactUsComponent, TermsUseComponent, PrivacyPolicyComponent, HomeAddComponent, HomeBannerComponent, TestimonialComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    NguCarouselModule,
    FormModule
  ]
})
export class HomeModule { }
