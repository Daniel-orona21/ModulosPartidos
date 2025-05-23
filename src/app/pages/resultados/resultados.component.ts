import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface DashboardMetric {
  id: string;
  title: string;
  value: string | number;
  change: number;
  changeType: 'increase' | 'decrease';
  subtitle: string;
  chartData: number[];
  icon: string;
  period: string;
}

interface RecentMatch {
  id: string;
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  date: Date;
  status: 'completed' | 'live' | 'upcoming';
  league: string;
}

interface TopScorer {
  id: string;
  name: string;
  team: string;
  goals: number;
  matches: number;
  average: number;
}

interface ChartData {
  label: string;
  value: number;
  color?: string;
}

interface LineChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
  }[];
}

@Component({
  selector: 'app-resultados',
  imports: [CommonModule],
  templateUrl: './resultados.component.html',
  styleUrl: './resultados.component.css'
})
export class ResultadosComponent implements OnInit {
  
  dashboardMetrics: DashboardMetric[] = [];
  recentMatches: RecentMatch[] = [];
  topScorers: TopScorer[] = [];
  loading = false;

  // Chart data
  goalsPerMonthData: LineChartData = { labels: [], datasets: [] };
  leagueAttendanceData: ChartData[] = [];
  performanceData: ChartData[] = [];
  revenueByMonthData: ChartData[] = [];

  ngOnInit() {
    this.loadDashboardData();
  }

  private loadDashboardData() {
    this.loading = true;
    
    // Simulate loading delay
    setTimeout(() => {
      this.dashboardMetrics = [
        {
          id: 'total-matches',
          title: 'Partidos Totales',
          value: 2847,
          change: 12.5,
          changeType: 'increase',
          subtitle: 'vs mes anterior',
          chartData: [120, 132, 101, 134, 90, 230, 210, 145, 167, 189, 201, 187],
          icon: 'sports_soccer',
          period: 'Último mes'
        },
        {
          id: 'goals-scored',
          title: 'Goles Marcados',
          value: 8945,
          change: 8.2,
          changeType: 'increase',
          subtitle: 'vs temporada anterior',
          chartData: [89, 95, 87, 92, 101, 98, 105, 112, 94, 88, 95, 102],
          icon: 'sports_soccer',
          period: 'Esta temporada'
        },
        {
          id: 'attendance',
          title: 'Asistencia Promedio',
          value: '45,678',
          change: -2.8,
          changeType: 'decrease',
          subtitle: 'vs temporada anterior',
          chartData: [45, 47, 44, 46, 43, 41, 42, 45, 47, 46, 44, 45],
          icon: 'group',
          period: 'Por partido'
        },
        {
          id: 'revenue',
          title: 'Ingresos por Entradas',
          value: '$2.4M',
          change: 15.7,
          changeType: 'increase',
          subtitle: 'vs mes anterior',
          chartData: [180, 195, 210, 185, 220, 240, 235, 250, 230, 245, 260, 275],
          icon: 'attach_money',
          period: 'Este mes'
        }
      ];

      // Goals per month chart data
      this.goalsPerMonthData = {
        labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
        datasets: [{
          label: 'Goles por Mes',
          data: [245, 289, 312, 278, 295, 334, 356, 398, 367, 389, 423, 456]
        }]
      };

      // League attendance data
      this.leagueAttendanceData = [
        { label: 'La Liga', value: 42000 },
        { label: 'Premier League', value: 38500 },
        { label: 'Bundesliga', value: 35200 },
        { label: 'Serie A', value: 31800 },
        { label: 'Ligue 1', value: 28900 }
      ];

      // Performance data (wins/draws/losses)
      this.performanceData = [
        { label: 'Victorias', value: 65 },
        { label: 'Empates', value: 25 },
        { label: 'Derrotas', value: 10 }
      ];

      // Revenue by month
      this.revenueByMonthData = [
        { label: 'Ene', value: 1.8 },
        { label: 'Feb', value: 2.1 },
        { label: 'Mar', value: 2.4 },
        { label: 'Abr', value: 2.0 },
        { label: 'May', value: 2.7 },
        { label: 'Jun', value: 3.2 }
      ];

      this.recentMatches = [
        {
          id: '1',
          homeTeam: 'Real Madrid',
          awayTeam: 'Barcelona',
          homeScore: 2,
          awayScore: 1,
          date: new Date('2024-01-15T20:00:00'),
          status: 'completed',
          league: 'La Liga'
        },
        {
          id: '2',
          homeTeam: 'Manchester United',
          awayTeam: 'Liverpool',
          homeScore: 1,
          awayScore: 3,
          date: new Date('2024-01-14T17:30:00'),
          status: 'completed',
          league: 'Premier League'
        },
        {
          id: '3',
          homeTeam: 'Bayern Munich',
          awayTeam: 'Borussia Dortmund',
          homeScore: 0,
          awayScore: 0,
          date: new Date('2024-01-16T19:00:00'),
          status: 'live',
          league: 'Bundesliga'
        },
        {
          id: '4',
          homeTeam: 'PSG',
          awayTeam: 'Olympique Lyon',
          homeScore: 0,
          awayScore: 0,
          date: new Date('2024-01-17T21:00:00'),
          status: 'upcoming',
          league: 'Ligue 1'
        }
      ];

      this.topScorers = [
        {
          id: '1',
          name: 'Lionel Messi',
          team: 'PSG',
          goals: 28,
          matches: 25,
          average: 1.12
        },
        {
          id: '2',
          name: 'Erling Haaland',
          team: 'Manchester City',
          goals: 26,
          matches: 23,
          average: 1.13
        },
        {
          id: '3',
          name: 'Kylian Mbappé',
          team: 'PSG',
          goals: 24,
          matches: 24,
          average: 1.00
        },
        {
          id: '4',
          name: 'Robert Lewandowski',
          team: 'Barcelona',
          goals: 22,
          matches: 26,
          average: 0.85
        }
      ];

      this.loading = false;
    }, 1000);
  }

  formatDate(date: Date): string {
    return new Intl.DateTimeFormat('es-ES', {
      day: '2-digit',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  }

  getChangeIcon(changeType: 'increase' | 'decrease'): string {
    return changeType === 'increase' ? 'trending_up' : 'trending_down';
  }

  getChangeClass(changeType: 'increase' | 'decrease'): string {
    return changeType === 'increase' ? 'positive' : 'negative';
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'completed': return 'completed';
      case 'live': return 'live';
      case 'upcoming': return 'upcoming';
      default: return '';
    }
  }

  getStatusText(status: string): string {
    switch (status) {
      case 'completed': return 'Finalizado';
      case 'live': return 'En vivo';
      case 'upcoming': return 'Próximo';
      default: return '';
    }
  }

  getChartPoints(data: number[]): string {
    if (!data || data.length === 0) return '';
    
    const width = 200;
    const height = 40;
    const padding = 5;
    
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

  // Line chart methods
  getLineChartPath(data: number[]): string {
    if (!data || data.length === 0) return '';
    
    const width = 400;
    const height = 200;
    const padding = 40;
    
    const maxValue = Math.max(...data);
    const minValue = Math.min(...data);
    const range = maxValue - minValue || 1;
    
    const points = data.map((value, index) => {
      const x = padding + (index * (width - 2 * padding)) / (data.length - 1);
      const y = height - padding - ((value - minValue) / range) * (height - 2 * padding);
      return `${x},${y}`;
    });
    
    return `M${points.join(' L')}`;
  }

  getLineChartArea(data: number[]): string {
    if (!data || data.length === 0) return '';
    
    const width = 400;
    const height = 200;
    const padding = 40;
    
    const maxValue = Math.max(...data);
    const minValue = Math.min(...data);
    const range = maxValue - minValue || 1;
    
    const points = data.map((value, index) => {
      const x = padding + (index * (width - 2 * padding)) / (data.length - 1);
      const y = height - padding - ((value - minValue) / range) * (height - 2 * padding);
      return `${x},${y}`;
    });
    
    const firstX = padding;
    const lastX = padding + (width - 2 * padding);
    const bottomY = height - padding;
    
    return `M${firstX},${bottomY} L${points.join(' L')} L${lastX},${bottomY} Z`;
  }

  // Bar chart methods
  getBarHeight(value: number, maxValue: number): number {
    return (value / maxValue) * 160; // 160px max height
  }

  getMaxValue(data: ChartData[]): number {
    return Math.max(...data.map(d => d.value));
  }

  // Donut chart methods
  getDonutPath(data: ChartData[], index: number): string {
    const total = data.reduce((sum, item) => sum + item.value, 0);
    const radius = 70;
    const innerRadius = 45;
    
    let currentAngle = -90; // Start at top
    for (let i = 0; i < index; i++) {
      currentAngle += (data[i].value / total) * 360;
    }
    
    const angle = (data[index].value / total) * 360;
    const endAngle = currentAngle + angle;
    
    const startAngleRad = (currentAngle * Math.PI) / 180;
    const endAngleRad = (endAngle * Math.PI) / 180;
    
    const x1 = 80 + radius * Math.cos(startAngleRad);
    const y1 = 80 + radius * Math.sin(startAngleRad);
    const x2 = 80 + radius * Math.cos(endAngleRad);
    const y2 = 80 + radius * Math.sin(endAngleRad);
    
    const x3 = 80 + innerRadius * Math.cos(endAngleRad);
    const y3 = 80 + innerRadius * Math.sin(endAngleRad);
    const x4 = 80 + innerRadius * Math.cos(startAngleRad);
    const y4 = 80 + innerRadius * Math.sin(startAngleRad);
    
    const largeArcFlag = angle > 180 ? 1 : 0;
    
    return `M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2} L ${x3} ${y3} A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${x4} ${y4} Z`;
  }

  getDonutPercentage(value: number, total: number): number {
    return Math.round((value / total) * 100);
  }

  getTotalValue(data: ChartData[]): number {
    return data.reduce((sum, item) => sum + item.value, 0);
  }

  // Method to get team logo based on team name
  getTeamLogo(teamName: string): string {
    const teamLogos: { [key: string]: string } = {
      'Real Madrid': '/madrid.png',
      'Barcelona': '/barca.png',
      'Manchester United': '/manchester.png',
      'Liverpool': '/liverpool.png',
      'Bayern Munich': '/bayern.png',
      'Borussia Dortmund': '/dortmund.png',
      'PSG': '/paris.png',
      'Olympique Lyon': '/lyon.png',
      'Arsenal': '/arsenal.png',
      'Chelsea': '/chelsea.png',
      'Atletico Madrid': '/atletico.png',
      'Sevilla': '/sevilla.png',
      'AC Milan': '/milan.png',
      'Juventus': '/juventus.png',
      'Manchester City': '/manchester.png' // Using the same for both Manchester teams
    };

    return teamLogos[teamName] || '/favicon.ico'; // Fallback to default icon
  }
}
