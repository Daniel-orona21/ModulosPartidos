import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { InformacionComponent } from './pages/informacion/informacion.component';
import { HorariosComponent } from './pages/horarios/horarios.component';
import { LugaresComponent } from './pages/lugares/lugares.component';
import { ResultadosComponent } from './pages/resultados/resultados.component';

export const routes: Routes = [
    {path: '', redirectTo: '/login', pathMatch: 'full' },
    {path: 'login', component: LoginComponent},
    {
        path: 'home',
        component: HomeComponent,
        children: [
            { path: '', redirectTo: 'info', pathMatch: 'full'},
            { path: 'info', component: InformacionComponent},
            { path: 'horarios', component: HorariosComponent},
            { path: 'lugares', component: LugaresComponent},
            { path: 'resultados', component: ResultadosComponent},
        ]
    },
    { path: '**', redirectTo: '/login' }
];
