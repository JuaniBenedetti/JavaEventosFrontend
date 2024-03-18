import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
})
export class LandingPage implements OnInit {

  iniciarSesion: boolean = true;

  constructor(
    public platform: Platform,
    private router: Router
  ) { }

  ngOnInit() {}

  navigateTo(sesionIniciada: boolean) {
    sesionIniciada ? this.router.navigate(['/home']) : null;
  }
}
