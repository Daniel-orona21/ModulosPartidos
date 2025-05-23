import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { Router, RouterModule, NavigationEnd } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';
import { filter } from 'rxjs/operators';
import { TvDashboardComponent } from '../tv-dashboard/tv-dashboard.component';

@Component({
  selector: 'app-home',
  standalone: true, 
  imports: [RouterModule, CommonModule, TvDashboardComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('fadeAnimation', [
      transition('* => *', [
        style({ opacity: 0 }),
        animate('1000ms ease', style({ opacity: 1 }))
      ])
    ])
  ]
})
export class HomeComponent implements OnInit, OnDestroy {
  isSidebarCollapsed = false;
  animationState = 0;
  isTVMode = false;
  resizeTimeout: any;

  constructor(public router: Router) {}

  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.animationState++;
    });

    this.checkTVMode();
  }

  ngOnDestroy() {
    if (this.resizeTimeout) {
      clearTimeout(this.resizeTimeout);
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    if (this.resizeTimeout) {
      clearTimeout(this.resizeTimeout);
    }
    this.resizeTimeout = setTimeout(() => {
      this.checkTVMode();
    }, 250);
  }

  private checkTVMode() {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    
    this.isTVMode = screenWidth >= 2400;
    
    console.log(`Screen: ${screenWidth}x${screenHeight}, TV Mode: ${this.isTVMode}`);
  }
}
