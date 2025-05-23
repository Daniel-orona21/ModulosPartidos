import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservationService } from '../../services/reservation.service';
import { Match, Seat } from '../../interfaces/match.interface';
import { Subject, takeUntil } from 'rxjs';
import { SeatFilterPipe } from '../../pipes/seat-filter.pipe';

export enum ReservationStep {
  MATCH_SELECTION = 'match-selection',
  SEAT_SELECTION = 'seat-selection',
  SUMMARY = 'summary',
  PAYMENT = 'payment',
  CONFIRMATION = 'confirmation'
}

@Component({
  selector: 'app-lugares',
  imports: [CommonModule, SeatFilterPipe],
  templateUrl: './lugares.component.html',
  styleUrl: './lugares.component.css'
})
export class LugaresComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  
  currentStep: ReservationStep = ReservationStep.MATCH_SELECTION;
  ReservationStep = ReservationStep;
  
  matches: Match[] = [];
  selectedMatch: Match | null = null;
  availableSeats: Seat[] = [];
  selectedSeats: Seat[] = [];
  totalPrice: number = 0;
  
  loading = false;
  processingPayment = false;

  constructor(private reservationService: ReservationService) {}

  ngOnInit() {
    // Always start fresh - clear any previous selections
    this.clearAllSelections();
    this.loadMatches();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private clearAllSelections() {
    // Reset component state
    this.currentStep = ReservationStep.MATCH_SELECTION;
    this.selectedMatch = null;
    this.availableSeats = [];
    this.selectedSeats = [];
    this.totalPrice = 0;
    
    // Clear service state
    this.reservationService.setSelectedMatch(null);
    this.reservationService.setSelectedSeats([]);
  }

  private loadMatches() {
    this.loading = true;
    this.reservationService.getMatches()
      .pipe(takeUntil(this.destroy$))
      .subscribe(matches => {
        this.matches = matches;
        this.loading = false;
      });
  }

  onMatchSelect(match: Match) {
    this.selectedMatch = match;
    this.generateSeats();
    this.currentStep = ReservationStep.SEAT_SELECTION;
    this.scrollToTop();
  }

  private generateSeats() {
    if (this.selectedMatch) {
      this.availableSeats = this.reservationService.generateSeatsForMatch(this.selectedMatch.id);
    }
  }

  onSeatClick(seat: Seat) {
    if (seat.isOccupied) return;
    
    seat.isSelected = !seat.isSelected;
    this.selectedSeats = this.availableSeats.filter(s => s.isSelected);
    this.calculateTotal();
  }

  private calculateTotal() {
    this.totalPrice = this.selectedSeats.reduce((total, seat) => total + seat.price, 0);
  }

  goToSummary() {
    if (this.selectedSeats.length > 0) {
      this.currentStep = ReservationStep.SUMMARY;
      this.scrollToTop();
    }
  }

  goToPayment() {
    this.currentStep = ReservationStep.PAYMENT;
    this.scrollToTop();
  }

  processPayment() {
    this.processingPayment = true;
    
    // Simulate payment processing
    setTimeout(() => {
      this.processingPayment = false;
      this.currentStep = ReservationStep.CONFIRMATION;
      this.scrollToTop();
    }, 3000);
  }

  startNewReservation() {
    this.clearAllSelections();
    this.scrollToTop();
  }

  goBack() {
    switch (this.currentStep) {
      case ReservationStep.SEAT_SELECTION:
        this.currentStep = ReservationStep.MATCH_SELECTION;
        break;
      case ReservationStep.SUMMARY:
        this.currentStep = ReservationStep.SEAT_SELECTION;
        break;
      case ReservationStep.PAYMENT:
        this.currentStep = ReservationStep.SUMMARY;
        break;
    }
    this.scrollToTop();
  }

  formatDate(date: Date): string {
    return new Intl.DateTimeFormat('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  }

  getSectionName(section: string): string {
    const sectionNames: { [key: string]: string } = {
      'A': 'Tribuna VIP',
      'B': 'Tribuna Preferente',
      'C': 'Tribuna General',
      'D': 'Grada Popular'
    };
    return sectionNames[section] || section;
  }

  goToStep(step: ReservationStep) {
    // Only allow navigation to valid steps based on current progress
    switch (step) {
      case ReservationStep.MATCH_SELECTION:
        this.currentStep = step;
        break;
      case ReservationStep.SEAT_SELECTION:
        if (this.selectedMatch) {
          this.currentStep = step;
        }
        break;
      case ReservationStep.SUMMARY:
      case ReservationStep.PAYMENT:
        if (this.selectedSeats.length > 0) {
          this.currentStep = step;
        }
        break;
    }
    
    this.scrollToTop();
  }

  private scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
