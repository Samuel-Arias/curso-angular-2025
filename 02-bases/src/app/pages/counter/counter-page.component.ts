import { ChangeDetectionStrategy, Component, signal } from "@angular/core";

@Component({
  template: `
    <h1>Counter: {{ counter }}</h1>
    <h1>Counter signal: {{ counterSignal() }}</h1>
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
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CounterPageComponent {
  counter = 10
  counterSignal = signal(10)

  increaseBy (value: number) {
    this.counter += value
    this.counterSignal.update(currentValue => currentValue + value)
  }

  decreaseBy (value: number) {
    this.counter -= value
    this.counterSignal.update(currentValue => currentValue - value)

    if (this.counter < 0 && this.counterSignal() < 0) {
      this.counter = 0
      this.counterSignal.set(0)
    }
  }

  resetTo (value: number) {
    this.counter = value
    this.counterSignal.set(value)
  }
}
