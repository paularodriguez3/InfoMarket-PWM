import {Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {RouterModule} from '@angular/router';
import {FirebaseService} from '../../services/firebase.service';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  imports: [RouterModule, NgIf],
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @ViewChild('searchBar') searchRef!: ElementRef;
  @ViewChild('inputBar') inputRef!: ElementRef;

  isSearchActive = false;
  logoUrl: string = '';

  constructor(private firebaseService: FirebaseService) {}

  async ngOnInit() {
    this.logoUrl = await this.firebaseService.getImageUrl('logo/infomarket_logo.png');
  }

  toggleSearch(): void {
    const searchEl = this.searchRef.nativeElement as HTMLElement;
    const inputEl = this.inputRef.nativeElement as HTMLInputElement;

    if (this.isSearchActive) {
      searchEl.classList.remove('active');
      inputEl.blur();
    } else {
      searchEl.classList.add('active');
      setTimeout(() => inputEl.focus(), 50);
    }

    this.isSearchActive = !this.isSearchActive;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const searchEl = this.searchRef.nativeElement as HTMLElement;
    const target = event.target as Node;

    if (!searchEl.contains(target) && this.isSearchActive) {
      searchEl.classList.remove('active');
      this.isSearchActive = false;
    }
  }
}
