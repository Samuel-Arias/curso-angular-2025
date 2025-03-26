import { Component, inject } from '@angular/core';
import { GifsListComponent } from "../../components/gifs-list/gifs-list.component";
import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'app-trending-page',
  imports: [GifsListComponent],
  templateUrl: './trending-page.component.html',
  styles: ``
})
export class TrendingPageComponent {
  gifService = inject(GifsService)

  constructor() {
    this.gifService.loadTrendingGifs()
  }
}
