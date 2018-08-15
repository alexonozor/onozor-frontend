import { Directive, HostListener, EventEmitter, Output } from '@angular/core';

@Directive({
  selector: '[appScrollable]'
})
export class ScrollableDirective {

  @Output() scrollPosition = new EventEmitter();

  constructor() { }
  @HostListener('scroll', ['$event']) onScroll(event) {
    try {
      const top = 79;
      const height = 67;
      const offset = 78;

      if (top > height - offset - 1) {
        this.scrollPosition.emit('bottom');
      }
    } catch (err) {

    }
  }
}
