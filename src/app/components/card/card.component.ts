import { Component, Input } from '@angular/core';
import { CardInterface } from '../../interfaces/card-interface';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-card',
  imports: [CommonModule, MatButtonModule, MatMenuModule, MatIconModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent {
  trips = [
    {
      name: 'Ecuador',
      date: '2025-08-15',
      backgroundImageUrl:
        'https://images.pexels.com/photos/30785381/pexels-photo-30785381.jpeg',
    },
    {
      name: 'Germany',
      date: '2025-09-10',
      backgroundImageUrl:
        'https://images.pexels.com/photos/28954966/pexels-photo-28954966.jpeg',
    },
    {
      name: 'Chamonix',
      date: '2025-07-01',
      backgroundImageUrl:
        'https://images.pexels.com/photos/158089/aiguille-du-midi-chamonix-mountain-station-mont-blanc-158089.jpeg',
    },
    {
      name: 'Pirineos Aragoneses',
      date: '2025-07-01',
      backgroundImageUrl:
        'https://images.pexels.com/photos/2166822/pexels-photo-2166822.jpeg',
    },

    {
      name: 'Germany',
      date: '2025-09-10',
      backgroundImageUrl:
        'https://images.pexels.com/photos/28954966/pexels-photo-28954966.jpeg',
    },
    {
      name: 'Ecuador',
      date: '2025-08-15',
      backgroundImageUrl:
        'https://images.pexels.com/photos/30785381/pexels-photo-30785381.jpeg',
    },

    {
      name: 'Pirineos Aragoneses',
      date: '2025-07-01',
      backgroundImageUrl:
        'https://images.pexels.com/photos/2166822/pexels-photo-2166822.jpeg',
    },
    {
      name: 'Ecuador',
      date: '2025-08-15',
      backgroundImageUrl:
        'https://images.pexels.com/photos/30785381/pexels-photo-30785381.jpeg',
    },
    {
      name: 'Chamonix',
      date: '2025-07-01',
      backgroundImageUrl:
        'https://images.pexels.com/photos/158089/aiguille-du-midi-chamonix-mountain-station-mont-blanc-158089.jpeg',
    },
    {
      name: 'Germany',
      date: '2025-09-10',
      backgroundImageUrl:
        'https://images.pexels.com/photos/28954966/pexels-photo-28954966.jpeg',
    },
  ];

  getBackgroungImageStyle(url: string): string {
    return `url('${url}')`;
  }
}
