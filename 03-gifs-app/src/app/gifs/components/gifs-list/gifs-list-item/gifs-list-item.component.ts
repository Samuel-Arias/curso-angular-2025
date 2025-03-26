import { Component, input } from '@angular/core';
import { Gif } from 'src/app/gifs/interfaces/gif.interface';

@Component({
  selector: 'gifs-list-item',
  imports: [],
  templateUrl: './gifs-list-item.component.html',
  styles: ``
})
export class GifsListItemComponent {
  gif = input.required<Partial<Gif>>()
}
