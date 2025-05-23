import { Pipe, PipeTransform } from '@angular/core';
import { Seat } from '../interfaces/match.interface';

@Pipe({
  name: 'seatFilter',
  standalone: true
})
export class SeatFilterPipe implements PipeTransform {
  transform(seats: Seat[], section: string): Seat[] {
    if (!seats || !section) {
      return seats;
    }
    return seats.filter(seat => seat.section === section).slice(0, 48);
  }
} 