import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'bucket';
  private currentWindowWidth: number | undefined;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.determineWhetherEnableScrollbar();
  }

  ngOnInit(): void {
    this.determineWhetherEnableScrollbar();
  }

  // display a horizontal scrollbar when users resize the browser window
  private determineWhetherEnableScrollbar(): void {
    this.currentWindowWidth = window.innerWidth;
    if (this.currentWindowWidth && this.currentWindowWidth < screen.width) {
      document.body.style.overflow = 'auto';
      document.body.style.minWidth = screen.width + 'px';
    } else {
      document.body.style.overflow = '';
      document.body.style.minWidth = '';
    }
  }
}
