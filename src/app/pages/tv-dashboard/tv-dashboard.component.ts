import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';

interface TVWidget {
  id: string;
  type: 'metric' | 'matches' | 'schedule' | 'scorers' | 'chart' | 'results';
  title: string;
  data: any;
  icon: string;
  color: string;
}

@Component({
  selector: 'app-tv-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tv-dashboard.component.html',
  styleUrls: ['./tv-dashboard.component.css'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translateX(100%)', opacity: 0 }),
        animate('800ms ease-in-out', style({ transform: 'translateX(0%)', opacity: 1 }))
      ]),
      transition(':leave', [
        animate('800ms ease-in-out', style({ transform: 'translateX(-100%)', opacity: 0 }))
      ])
    ])
  ]
})
export class TvDashboardComponent implements OnInit, OnDestroy {
  widgets: TVWidget[] = [];
  currentWidgetIndex = 0;
  autoSlideInterval: any;
  progressInterval: any;
  progressWidth = 0;
  readonly SLIDE_DURATION = 5000; // 5 segundos por slide

  ngOnInit() {
    this.initializeWidgets();
    this.startAutoSlide();
  }

  ngOnDestroy() {
    if (this.autoSlideInterval) {
      clearInterval(this.autoSlideInterval);
    }
    if (this.progressInterval) {
      clearInterval(this.progressInterval);
    }
  }

  private initializeWidgets() {
    this.widgets = [
      // Widget de métricas principales
      {
        id: 'total-matches',
        type: 'metric',
        title: 'Partidos Totales',
        data: {
          value: '2,847',
          change: '+12.5%',
          subtitle: 'vs mes anterior',
          chartData: [120, 132, 101, 134, 90, 230, 210, 145, 167, 189, 201, 187]
        },
        icon: 'sports_soccer',
        color: '#dc2626'
      },
      // Widget de goles
      {
        id: 'goals-scored',
        type: 'metric',
        title: 'Goles Marcados',
        data: {
          value: '8,945',
          change: '+8.2%',
          subtitle: 'esta temporada',
          chartData: [89, 95, 87, 92, 101, 98, 105, 112, 94, 88, 95, 102]
        },
        icon: 'sports_soccer',
        color: '#dc2626'
      },
      // Widget de partidos próximos
      {
        id: 'upcoming-matches',
        type: 'matches',
        title: 'Próximos Partidos',
        data: [
          {
            homeTeam: 'Real Madrid',
            awayTeam: 'Barcelona',
            date: '17 Ene 21:00',
            league: 'La Liga'
          },
          {
            homeTeam: 'Manchester United',
            awayTeam: 'Arsenal',
            date: '18 Ene 18:30',
            league: 'Premier League'
          },
          {
            homeTeam: 'Bayern Munich',
            awayTeam: 'PSG',
            date: '19 Ene 20:00',
            league: 'Champions League'
          }
        ],
        icon: 'schedule',
        color: '#6b7280'
      },
      // Widget de horarios de hoy
      {
        id: 'today-schedule',
        type: 'schedule',
        title: 'Horarios de Hoy',
        data: [
          {
            time: '14:00',
            event: 'Entrenamiento Juvenil',
            location: 'Campo A',
            status: 'active'
          },
          {
            time: '16:30',
            event: 'Partido Liga Local',
            location: 'Campo Principal',
            status: 'upcoming'
          },
          {
            time: '19:00',
            event: 'Entrenamiento Senior',
            location: 'Campo B',
            status: 'upcoming'
          },
          {
            time: '21:00',
            event: 'Partido Nocturno',
            location: 'Campo Principal',
            status: 'upcoming'
          }
        ],
        icon: 'today',
        color: '#6b7280'
      },
      // Widget de máximos goleadores
      {
        id: 'top-scorers',
        type: 'scorers',
        title: 'Máximos Goleadores',
        data: [
          { name: 'Lionel Messi', team: 'PSG', goals: 28 },
          { name: 'Erling Haaland', team: 'Manchester City', goals: 26 },
          { name: 'Kylian Mbappé', team: 'PSG', goals: 24 },
          { name: 'Robert Lewandowski', team: 'Barcelona', goals: 22 }
        ],
        icon: 'emoji_events',
        color: '#dc2626'
      },
      // Widget de asistencia
      {
        id: 'attendance',
        type: 'metric',
        title: 'Asistencia Promedio',
        data: {
          value: '45,678',
          change: '-2.8%',
          subtitle: 'vs temporada anterior',
          chartData: [45, 47, 44, 46, 43, 41, 42, 45, 47, 46, 44, 45]
        },
        icon: 'group',
        color: '#6b7280'
      },
      // Widget de lugares disponibles
      {
        id: 'results',
        type: 'results',
        title: 'Resultados Recientes',
        data: [
          {
            homeTeam: 'Real Madrid',
            homeShield: 'madrid.png',
            homeScore: 3,
            awayTeam: 'Barcelona',
            awayShield: 'barca.png',
            awayScore: 1,
            date: '15 Ene',
            league: 'La Liga'
          },
          {
            homeTeam: 'Manchester United',
            homeShield: 'manchester.png',
            homeScore: 2,
            awayTeam: 'Arsenal',
            awayShield: 'arsenal.png',
            awayScore: 2,
            date: '14 Ene',
            league: 'Premier League'
          },
          {
            homeTeam: 'Bayern Munich',
            homeShield: 'bayern.png',
            homeScore: 4,
            awayTeam: 'Juventus',
            awayShield: 'juventus.png',
            awayScore: 0,
            date: '13 Ene',
            league: 'Champions League'
          },
          {
            homeTeam: 'PSG',
            homeShield: 'paris.png',
            homeScore: 1,
            awayTeam: 'Chelsea',
            awayShield: 'chelsea.png',
            awayScore: 3,
            date: '12 Ene',
            league: 'Champions League'
          }
        ],
        icon: 'scoreboard',
        color: '#dc2626'
      },
      // Widget de ingresos
      {
        id: 'revenue',
        type: 'metric',
        title: 'Ingresos por Entradas',
        data: {
          value: '$2.4M',
          change: '+15.7%',
          subtitle: 'este mes',
          chartData: [180, 195, 210, 185, 220, 240, 235, 250, 230, 245, 260, 275]
        },
        icon: 'attach_money',
        color: '#dc2626'
      }
    ];
  }

  private startAutoSlide() {
    this.resetProgress();
    this.startProgress();
    
    this.autoSlideInterval = setInterval(() => {
      this.nextWidget();
    }, this.SLIDE_DURATION);
  }

  private startProgress() {
    this.progressWidth = 0;
    const increment = 100 / (this.SLIDE_DURATION / 100); // Incremento cada 100ms
    
    this.progressInterval = setInterval(() => {
      this.progressWidth += increment;
      if (this.progressWidth >= 100) {
        this.progressWidth = 100;
      }
    }, 100);
  }

  private resetProgress() {
    if (this.progressInterval) {
      clearInterval(this.progressInterval);
    }
    this.progressWidth = 0;
  }

  nextWidget() {
    this.currentWidgetIndex = (this.currentWidgetIndex + 1) % this.widgets.length;
    this.resetProgress();
    this.startProgress();
  }

  prevWidget() {
    this.currentWidgetIndex = this.currentWidgetIndex === 0 
      ? this.widgets.length - 1 
      : this.currentWidgetIndex - 1;
    this.resetProgress();
    this.startProgress();
  }

  getCurrentWidget(): TVWidget {
    return this.widgets[this.currentWidgetIndex];
  }

  getChartPoints(data: number[]): string {
    if (!data || data.length === 0) return '';
    
    const width = 400;
    const height = 80;
    const padding = 10;
    
    const maxValue = Math.max(...data);
    const minValue = Math.min(...data);
    const range = maxValue - minValue || 1;
    
    const points = data.map((value, index) => {
      const x = padding + (index * (width - 2 * padding)) / (data.length - 1);
      const y = height - padding - ((value - minValue) / range) * (height - 2 * padding);
      return `${x},${y}`;
    });
    
    return points.join(' ');
  }

  formatDate(): string {
    return new Date().toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  formatTime(): string {
    return new Date().toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit'
    });
  }
}
