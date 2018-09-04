import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {
  transform(value: string, limit = 60, completeWords = false, ellipsis = '...') {
    if (value) {
      if (completeWords) {
        limit = value.substr(0, 20).lastIndexOf(' ');
      }
      return `${value.substr(0, limit)}${ellipsis}`;
    }
  }
}
