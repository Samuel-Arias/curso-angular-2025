import { Component, inject, signal } from '@angular/core';
import { GifsListComponent } from "../../components/gifs-list/gifs-list.component";
import { GifsService } from '../../services/gifs.service';
import { Gif } from '../../interfaces/gif.interface';

@Component({
  selector: 'app-search-page',
  imports: [GifsListComponent],
  templateUrl: './search-page.component.html',
  styles: ``
})
export class SearchPageComponent {
  private gifService = inject(GifsService)

  // gifs = signal<Gif[]>([])
  groupGifs = signal<Gif[][]>([])

  onSearch(query: string): void {
    this.gifService.searchGifs(query).subscribe({
      next: gifs => this.groupGifs.set(gifs)
    })
  }
}
