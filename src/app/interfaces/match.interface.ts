export interface Team {
  id: number;
  name: string;
  shield: string;
}

export interface Match {
  id: number;
  homeTeam: Team;
  awayTeam: Team;
  date: Date;
  time: string;
  venue: string;
  price: number;
  availableSeats: number;
}

export interface Seat {
  id: string;
  section: string;
  row: string;
  number: number;
  price: number;
  isOccupied: boolean;
  isSelected: boolean;
}

export interface Reservation {
  match: Match;
  seats: Seat[];
  totalPrice: number;
} 