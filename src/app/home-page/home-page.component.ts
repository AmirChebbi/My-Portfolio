import { Component, OnInit, ElementRef } from '@angular/core';
import {animate, state, style, transition, trigger} from "@angular/animations";

declare const document: any;
declare const window: any;
declare const Waypoint: any;
declare const Isotope: any;
declare const Typed: any;
declare const AOS: any;
declare const GLightbox: any;
declare const Swiper: any;
declare const PureCounter: any;

@Component({
  selector: 'app-home-page',
  standalone:true,
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
  animations: [
    trigger('slideInOut', [
      state('in', style({
        transform: 'translateX(0%), opacity(0)'
      })),
      state('out', style({
        transform: 'translateX(100%), opacity(100%)'
      })),
      transition('in => out', animate('300ms ease-in-out')),
      transition('out => in', animate('300ms ease-in-out'))
    ])
  ]
})
export class HomePageComponent implements OnInit {

  constructor(private elRef: ElementRef) {}

  ngOnInit(): void {
    this.testimonialsSlider();
    this.heroSectionEffect();
    this.animation();
    this.backToTop();
    this.animateOnScroll()
  }

  public select (el:any, all = false){
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  animation(){
  let skillsContent :any = document.getElementById("skills-content");
    if (skillsContent) {
      new Waypoint({
        element: skillsContent,
        offset: '80%',
        handler: function() {
          let progress = document.querySelectorAll('.progress .progress-bar', true);
          progress.forEach((el:any) => {
            el.style.width = el.getAttribute('aria-valuenow') + '%'
          });
        }
      })
    }
  }

  backToTop(){
    let backtotop = this.select('.back-to-top')
    if (backtotop) {
      const toggleBacktotop = () => {
        if (window.scrollY > 100) {
          backtotop.classList.add('active')
        } else {
          backtotop.classList.remove('active')
        }
      }
      window.addEventListener('load', toggleBacktotop)
      window.addEventListener('scroll', toggleBacktotop);
    }
  }

  //hero section animation effect
  heroSectionEffect(){
    const typed = this.select('.typed')
    if (typed) {
      let typed_strings = typed.getAttribute('data-typed-items')
      typed_strings = typed_strings.split(',')
      new Typed('.typed', {
        strings: typed_strings,
        loop: true,
        typeSpeed: 100,
        backSpeed: 50,
        backDelay: 2000
      });
    }
  }

  testimonialsSlider(){
    new Swiper('.testimonials-slider', {
      speed: 600,
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false
      },
      slidesPerView: 'auto',
      pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true
      },
      breakpoints: {
        320: {
          slidesPerView: 1,
          spaceBetween: 20
        },

        1200: {
          slidesPerView: 3,
          spaceBetween: 20
        }
      }
    });
  }

  animateOnScroll(){
    const sections:NodeListOf<Element> = document.querySelectorAll("hidden")
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry)=>{
        if (entry.isIntersecting){
          entry.target.classList.remove("hidden");
          entry.target.classList.add("show");
        } else {
          entry.target.classList.remove("show");
        }
      })
    })
    sections.forEach((section) =>{
      observer.observe(section)
    })
  }



   /* window.addEventListener('load', () => {
      AOS.init({
        duration: 1000,
        easing: 'ease-in-out',
        once: true,
        mirror: false
      })
    }); */


}
