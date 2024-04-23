import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import {
  Component,
  ViewChild,
  afterNextRender,
  PLATFORM_ID,
  inject,
  ElementRef,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  @ViewChild('content') contentRef!: ElementRef;
  platformId = inject(PLATFORM_ID);
  title = 'ssr-app';

  constructor() {
    console.log(isPlatformBrowser(this.platformId));
    console.log(isPlatformServer(this.platformId));

    afterNextRender(() => {
      // Safe to check `scrollHeight` because this will only run in the browser, not the server.
      console.log(
        'content height: ' + this.contentRef.nativeElement.scrollHeight
      );
    });
  }
}
