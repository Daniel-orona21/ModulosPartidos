import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-horarios',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './horarios.component.html',
  styleUrls: ['./horarios.component.css']
})
export class HorariosComponent implements AfterViewInit {
  // No necesitamos inicializar las clases .visible ya que no usamos ese sistema de animación en el nuevo diseño

  ngAfterViewInit() {
    // Agregar funcionalidad para el cambio de días en móvil
    const mobileDayButtons = document.querySelectorAll('.mobile-day-btn');
    const mobileDayMatches = document.querySelectorAll('.mobile-day-matches');
    
    mobileDayButtons.forEach(button => {
      button.addEventListener('click', (event) => {
        // Obtener el número del día del botón clickeado
        const dayNumber = (button as HTMLElement).querySelector('.day-number')?.textContent?.trim();
        
        // Quitar clase active de todos los botones y añadirla al clickeado
        mobileDayButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        // Ocultar todos los matches y mostrar solo los del día seleccionado
        mobileDayMatches.forEach(matchesContainer => {
          matchesContainer.classList.remove('active');
          const containerDay = (matchesContainer as HTMLElement).getAttribute('data-day');
          if (containerDay === dayNumber) {
            matchesContainer.classList.add('active');
          }
        });
      });
    });

    // Controlar el menú de hamburguesa
    this.setupHamburgerMenu();
  }

  private setupHamburgerMenu() {
    const hamburgerBtn = document.querySelector('.hamburger-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileMenuClose = document.querySelector('.mobile-menu-close');
    const mobileFilterBtns = document.querySelectorAll('.mobile-filter-btn');

    // Abrir el menú al hacer clic en el botón de hamburguesa
    hamburgerBtn?.addEventListener('click', () => {
      mobileMenu?.classList.add('active');
      document.body.style.overflow = 'hidden'; // Evitar scroll del body cuando el menú está abierto
    });

    // Cerrar el menú al hacer clic en el botón de cerrar
    mobileMenuClose?.addEventListener('click', () => {
      mobileMenu?.classList.remove('active');
      document.body.style.overflow = ''; // Restaurar scroll del body
    });

    // Cerrar el menú al hacer clic fuera del contenido del menú
    mobileMenu?.addEventListener('click', (e) => {
      if (e.target === mobileMenu) {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
      }
    });

    // Manejar clicks en botones de filtro móviles
    mobileFilterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Quitar active de todos los botones y añadirlo al clickeado
        mobileFilterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // También activar el botón correspondiente en desktop (para mantener la consistencia)
        const btnText = (btn as HTMLElement).textContent?.trim();
        const desktopBtns = document.querySelectorAll('.filter-btn');
        desktopBtns.forEach(desktopBtn => {
          if (desktopBtn.textContent?.trim() === btnText) {
            desktopBtn.classList.add('active');
          } else {
            desktopBtn.classList.remove('active');
          }
        });

        // Cerrar el menú después de seleccionar una opción
        mobileMenu?.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }
}
