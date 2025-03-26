import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@environments/environment';
import type { GiphyResponse } from '../interfaces/giphy.interfaces';
import { Gif } from '../interfaces/gif.interface';
import { GifMapper } from '../mapper/gif.mapper';
import { map, Observable, tap } from 'rxjs';

const { GIPHY_API_KEY, GIPHY_BASE_URL } = environment

const LOCAL_STORAGE_HISTORY_KEY = 'history'

const loadSearchHistoryFromLocalStorage = (): Record<string, Gif[]> => {
  const history = localStorage.getItem(LOCAL_STORAGE_HISTORY_KEY) ?? '{}'

  return JSON.parse(history)
}

@Injectable({
  providedIn: 'root'
})
export class GifsService {
  private http = inject(HttpClient)

  trendingGifs = signal<Gif[]>([])
  trendingGifsLoading = signal(false)
  trendingGifsGroup = computed<Gif[][]>(() => {
    const groups = []

    for (let i = 0; i < this.trendingGifs().length; i += 3) {
      groups.push(this.trendingGifs().slice(i, i + 3))
    }

    return groups
  })
  private trendingPage = signal(0)

  searchHistory = signal<Record<string, Gif[]>>(loadSearchHistoryFromLocalStorage())
  searchHistoryKeys = computed(() => Object.keys(this.searchHistory()))
  searchHistoryGifs = computed(() => {
    let allGroups: Record<string, Gif[][]> = {}
    let subGroup = []

    for (let key in this.searchHistory()) {
      const keyGifs = this.searchHistory()[key]

      for (let i = 0; i < keyGifs.length; i += 3) {
        subGroup.push(keyGifs.slice(i, i + 3))
      }

      allGroups[key] = subGroup
    }

    return allGroups
  })
  searchedGifsLoading = signal(false)

  saveSearchHistoryToLocalStorage = effect(() => {
    const historyString = JSON.stringify(this.searchHistory())
    localStorage.setItem(LOCAL_STORAGE_HISTORY_KEY, historyString)
  })

  loadTrendingGifs(): void {
    if (this.trendingGifsLoading()) return

    this.trendingGifsLoading.set(true)

    this.http.get<GiphyResponse>(`${GIPHY_BASE_URL}/trending`, {
      params: {
        api_key: GIPHY_API_KEY,
        limit: 24,
        offset: this.trendingPage() * 24
      }
    }).subscribe({
      next: resp => {
        const newGifs = GifMapper.mapGiphyItemsToGifArray(resp.data)
        this.trendingGifs.update(gifs => [...gifs, ...newGifs])
        this.trendingPage.update(page => page + 1)
        this.trendingGifsLoading.set(false)
      }
    })
  }

  searchGifs(query: string): Observable<Gif[][]> {
    this.searchedGifsLoading.set(true)

    return this.http.get<GiphyResponse>(`${GIPHY_BASE_URL}/search`, {
      params: {
        api_key: GIPHY_API_KEY,
        limit: 25,
        q: query
      }
    }).pipe(
      map( ({ data }) => GifMapper.mapGiphyItemsToGifArray(data)),
      tap(items => {
        this.searchHistory.update(history => ({
          ...history,
          [query.toLowerCase()]: items
        }))
      }),
      map(() => {
        console.log(this.searchHistoryGifs())
        return this.searchHistoryGifs()[query]
      })
    )
  }

  getHistoryGifs(query: string): Gif[][] {
    return this.searchHistoryGifs()[query] ?? []
  }
}
