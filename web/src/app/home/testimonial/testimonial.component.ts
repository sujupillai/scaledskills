import { Component, AfterViewInit, ChangeDetectorRef, OnInit } from '@angular/core';
import { NguCarouselConfig } from '@ngu/carousel';
@Component({
  selector: 'app-testimonial',
  templateUrl: './testimonial.component.html',
  styleUrls: ['./testimonial.component.scss']
})
export class TestimonialComponent implements AfterViewInit, OnInit {
  TestimonialDataSource = [1, 2]
  TestimonialCarouselConfig: NguCarouselConfig = {
    grid: { xs: 1, sm: 1, md: 1, lg: 1, all: 0 },
    load: 1,
    interval: { timing: 4000, initialDelay: 1000 },
    loop: false,
    touch: false,
    velocity: 0.2
  }
  constructor(private cdr: ChangeDetectorRef) { }
  ngAfterViewInit() {
    this.cdr.detectChanges();
  }
  ngOnInit() {
  }

}
