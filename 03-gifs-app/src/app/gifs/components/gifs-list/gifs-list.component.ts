import { Component, ElementRef, inject, input, viewChild } from '@angular/core';
import { GifsListItemComponent } from "./gifs-list-item/gifs-list-item.component";
import { Gif } from '../../interfaces/gif.interface';
import { GifsService } from '../../services/gifs.service';
import { ScrollStateService } from 'src/app/shared/services/scroll-state.service';

@Component({
  selector: 'gifs-list',
  imports: [GifsListItemComponent],
  templateUrl: './gifs-list.component.html',
  styles: ``
})
export class GifsListComponent {
  gifService = inject(GifsService)
  scrollStateService = inject(ScrollStateService)

  // gifsList = input.required<Gif[]>()
  gifsListGroup = input.required<Gif[][]>()

  scrollDivRef = viewChild<ElementRef<HTMLDivElement>>('groupDiv')

  ngAfterViewInit(): void {
    const scrollDiv = this.scrollDivRef()?.nativeElement
    if (!scrollDiv) return

    scrollDiv.scrollTop = this.scrollStateService.trendingScrollState()
  }

  onScroll() {
    const scrollDiv = this.scrollDivRef()?.nativeElement
    if (!scrollDiv) return

    const condition = this.scrollStateService.isNearOfTheBottom(scrollDiv)

    if (condition) this.gifService.loadTrendingGifs()
  }
}
