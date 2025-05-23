import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-informacion',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './informacion.component.html',
  styleUrl: './informacion.component.css'
})
export class InformacionComponent implements OnInit {


  ngOnInit(): void {
    const titulo = document.querySelector('.titulo-texto') as HTMLElement;
    const info = document.querySelector('.info-recorte') as HTMLElement;
    const div1 = document.querySelector('.div1') as HTMLElement;
    const div3 = document.querySelector('.div3') as HTMLElement;
    const div4 = document.querySelector('.div4') as HTMLElement;
    const video = document.querySelector('.video-fondo') as HTMLElement;
    const videoWrapper = document.querySelector('.video-wrapper') as HTMLElement;
    const shadowOverlay = document.querySelector('.shadow-overlay') as HTMLElement;

    setTimeout(() => {
      video.classList.add('visible');
      videoWrapper.classList.add('visible');
      shadowOverlay.classList.add('visible');
      titulo.classList.add('visible');
      div1.classList.add('visible');
      info.classList.add('visible');
      div3.classList.add('visible');
    }, 0);
    setTimeout(() => {
      div4.classList.add('visible');
    }, 300);
  }
}
