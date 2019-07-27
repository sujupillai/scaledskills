import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  activeProfileTab: number = 0;
  expandedTab: number = -1;
  scrollTop;
  tabArray = []
  constructor() { }

  ngOnInit() {
    this.tabArray = [
      { 'name': 'Personal', 'label': 'Personal', 'displayOrder': '0' },
      { 'name': 'Credentials', 'label': 'Password', 'displayOrder': '1' },
      { 'name': 'Keywords', 'label': 'Keywords', 'displayOrder': '2' },
      { 'name': 'About', 'label': 'About', 'displayOrder': '3' },
      { 'name': 'Certifications Earned', 'label': 'Certifications Earned', 'displayOrder': '4' },
      { 'name': 'Social Media', 'label': 'Social Media', 'displayOrder': '5' }
    ]
  }
  activeTab = (number, className: string): void => {
    this.activeProfileTab = number;
    const elementList = document.querySelectorAll('.' + className);
    let element;
    if (number == -1) {
      element = elementList[0] as HTMLElement;
    } else {
      element = elementList[number] as HTMLElement;
    }
    setTimeout(() => {
      const yCoordinate = element.getBoundingClientRect().top + window.pageYOffset;
      const yOffset = -50;

      window.scrollTo({
        top: yCoordinate + yOffset,
        behavior: 'smooth'
      });
    }, 300);

  }
}
