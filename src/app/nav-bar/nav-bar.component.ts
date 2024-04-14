import {Component, ElementRef, OnInit} from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent implements OnInit{

  ngOnInit(): void {
    this.navBarState()
  }

  constructor(private elementRef: ElementRef) {}


  public select (el:any, all = false){
    el = el.trim()
    if (all) {
      return Array.from(document.querySelectorAll(el))
    } else {
      return document.querySelector(el)
    }
  }

  navBarState() {
    let navbarlinks: NodeListOf<HTMLAnchorElement> = document.querySelectorAll('#navbar .scrollto');
    const navbarlinksActive = () => {
      if (navbarlinks) {
        let position = window.scrollY + 200;
        Array.from(navbarlinks).forEach(navbarlink => {
          if (!navbarlink.hash) return;
          let section = document.querySelector(navbarlink.hash) as HTMLElement;
          if (!section) return;
          if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
            navbarlink.classList.add('active');
          } else {
            navbarlink.classList.remove('active');
          }
        });
      }
    };
    window.addEventListener('load', navbarlinksActive);
    window.addEventListener('scroll', navbarlinksActive);
  }


  toggleMobileNav() {
    const container = document.getElementById("navBarContainer");
    const mobileNavToggle = this.elementRef.nativeElement.querySelector('.mobile-nav-toggle');
    if (container){
      container.classList.toggle('mobile-nav-active');
      mobileNavToggle.classList.toggle('bi-list');
      mobileNavToggle.classList.toggle('bi-x');
    }
  }



}
