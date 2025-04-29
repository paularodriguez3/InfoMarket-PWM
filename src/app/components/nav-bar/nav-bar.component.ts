import { Component, HostListener } from '@angular/core';
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  imports: [
    NgClass
  ],
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  isDesktopMenuVisible = false;
  isMobileMenuVisible = false;

  toggleDesktopMenu(): void {
    if (window.innerWidth >= 769) {
      this.isDesktopMenuVisible = !this.isDesktopMenuVisible;
    }
  }

  toggleMobileMenu(): void {
    if (window.innerWidth < 769) {
      this.isMobileMenuVisible = !this.isMobileMenuVisible;
    }
  }

  @HostListener('window:resize')
  onResize(): void {
    if (window.innerWidth >= 769) {
      this.isMobileMenuVisible = false;
    } else {
      this.isDesktopMenuVisible = false;
    }
  }
}
