import { ElementRef, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScrollStateService {
  trendingScrollState = signal(0)

  pagesScroll: Record<string, number> = {
    'trending': 0,
    'search': 0
  }

  isNearOfTheBottom(element: HTMLElement): boolean {
    const scrollTop = element.scrollTop // cantidad de scroll que se ha hecho desde el inicio de la página
    const clientHeight = element.clientHeight // altura del viewpoint
    const scrollHeight = element.scrollHeight // altura total del div con los gifs

    const isNear = scrollTop + clientHeight + 400 >= scrollHeight

    this.trendingScrollState.set(scrollTop)

    return isNear
  }
}
