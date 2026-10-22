import { IMAGE_LOADER, ImageLoaderConfig, NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  imports: [NgOptimizedImage],
  providers: [
    {
      provide: IMAGE_LOADER,
      useValue: (config: ImageLoaderConfig) => {
        return `upload/${config.src}`;
      },
    },
  ],
  selector: 'app-profile',
  styleUrl: './profile.component.css',
  templateUrl: './profile.component.html',
})
export class ProfileComponent {}
