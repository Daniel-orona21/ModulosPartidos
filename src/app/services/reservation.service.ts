import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Match, Seat, Reservation, Team } from '../interfaces/match.interface';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private matches: Match[] = [
    {
      id: 1,
      homeTeam: { id: 1, name: 'Real Madrid', shield: 'madrid.png' },
      awayTeam: { id: 2, name: 'Barcelona', shield: 'barca.png' },
      date: new Date('2024-03-15'),
      time: '20:00',
      venue: 'Santiago Bernabéu',
      price: 150,
      availableSeats: 45
    },
    {
      id: 2,
      homeTeam: { id: 3, name: 'Manchester United', shield: 'manchester.png' },
      awayTeam: { id: 4, name: 'Manchester City', shield: 'manchester.png' },
      date: new Date('2024-03-18'),
      time: '17:30',
      venue: 'Old Trafford',
      price: 120,
      availableSeats: 32
    },
    {
      id: 3,
      homeTeam: { id: 5, name: 'Liverpool', shield: 'liverpool.png' },
      awayTeam: { id: 6, name: 'Arsenal', shield: 'arsenal.png' },
      date: new Date('2024-03-22'),
      time: '15:00',
      venue: 'Anfield',
      price: 110,
      availableSeats: 28
    },
    {
      id: 4,
      homeTeam: { id: 7, name: 'Chelsea', shield: 'chelsea.png' },
      awayTeam: { id: 8, name: 'Bayern Munich', shield: 'bayern.png' },
      date: new Date('2024-03-25'),
      time: '21:00',
      venue: 'Stamford Bridge',
      price: 135,
      availableSeats: 52
    },
    {
      id: 5,
      homeTeam: { id: 9, name: 'Juventus', shield: 'juventus.png' },
      awayTeam: { id: 10, name: 'AC Milan', shield: 'milan.png' },
      date: new Date('2024-03-28'),
      time: '18:45',
      venue: 'Allianz Stadium',
      price: 95,
      availableSeats: 38
    },
    {
      id: 6,
      homeTeam: { id: 11, name: 'Paris Saint-Germain', shield: 'paris.png' },
      awayTeam: { id: 12, name: 'Olympique Lyon', shield: 'lyon.png' },
      date: new Date('2024-04-02'),
      time: '20:30',
      venue: 'Parc des Princes',
      price: 125,
      availableSeats: 41
    },
    {
      id: 7,
      homeTeam: { id: 13, name: 'Borussia Dortmund', shield: 'dortmund.png' },
      awayTeam: { id: 14, name: 'Bayern Munich', shield: 'bayern.png' },
      date: new Date('2024-04-05'),
      time: '18:30',
      venue: 'Signal Iduna Park',
      price: 108,
      availableSeats: 47
    },
    {
      id: 8,
      homeTeam: { id: 15, name: 'Atlético Madrid', shield: 'atletico.png' },
      awayTeam: { id: 16, name: 'Sevilla', shield: 'sevilla.png' },
      date: new Date('2024-04-08'),
      time: '16:15',
      venue: 'Wanda Metropolitano',
      price: 88,
      availableSeats: 35
    }
  ];

  private selectedMatchSubject = new BehaviorSubject<Match | null>(null);
  private selectedSeatsSubject = new BehaviorSubject<Seat[]>([]);

  selectedMatch$ = this.selectedMatchSubject.asObservable();
  selectedSeats$ = this.selectedSeatsSubject.asObservable();

  getMatches(): Observable<Match[]> {
    return new Observable(observer => {
      observer.next(this.matches);
      observer.complete();
    });
  }

  setSelectedMatch(match: Match | null) {
    this.selectedMatchSubject.next(match);
    // Reset seats when changing match
    this.selectedSeatsSubject.next([]);
  }

  generateSeatsForMatch(matchId: number): Seat[] {
    const seats: Seat[] = [];
    const sections = ['A', 'B', 'C', 'D'];
    const rowsPerSection = 10;
    const seatsPerRow = 12;

    sections.forEach(section => {
      for (let row = 1; row <= rowsPerSection; row++) {
        for (let seat = 1; seat <= seatsPerRow; seat++) {
          seats.push({
            id: `${section}${row}-${seat}`,
            section,
            row: row.toString(),
            number: seat,
            price: this.getSeatPrice(section, row),
            isOccupied: Math.random() < 0.3, // 30% occupied randomly
            isSelected: false
          });
        }
      }
    });

    return seats;
  }

  private getSeatPrice(section: string, row: number): number {
    const basePrice = 80;
    const sectionMultiplier = section === 'A' ? 1.5 : section === 'B' ? 1.3 : section === 'C' ? 1.1 : 1;
    const rowMultiplier = row <= 3 ? 1.4 : row <= 6 ? 1.2 : 1;
    
    return Math.round(basePrice * sectionMultiplier * rowMultiplier);
  }

  setSelectedSeats(seats: Seat[]) {
    this.selectedSeatsSubject.next(seats);
  }

  getSelectedMatch(): Match | null {
    return this.selectedMatchSubject.value;
  }

  getSelectedSeats(): Seat[] {
    return this.selectedSeatsSubject.value;
  }

  calculateTotal(): number {
    const seats = this.getSelectedSeats();
    return seats.reduce((total, seat) => total + seat.price, 0);
  }
} 