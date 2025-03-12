import { Component } from "@angular/core";

@Component({
  template: `
    <h1>Counter: {{ counter }}</h1>
    <button (click)="decreaseBy(1)" >-1</button>
    <button (click)="resetTo(10)" >reset</button>
    <button (click)="increaseBy(1)" >+1</button>
  `,
  styles: `
    button {
      border: none;
      outline: none;
      background-color: #007bff;
      padding: 10px 30px;
      color: white;
      border-radius: 10000px;
      cursor: pointer;

      transition: background-color 0.2s ease-in-out;
    }

    button:not(button:first-of-type) {
      margin-left: 10px;
    }

    button:hover {
      background-color:rgb(3, 108, 221);
    }

    button:active {
      background-color: rgb(3, 65, 131);
    }
  `
})
export class CounterPageComponent {
  counter = 10

  increaseBy (value: number) {
    this.counter += value
  }

  decreaseBy (value: number) {
    this.counter -= value

    if (this.counter < 0) this.counter = 0
  }

  resetTo (value: number) {
    this.counter = value
  }
}
