import { Component, signal, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Home } from './pages/home/home';
import { Header } from './pages/header/header';
import { AuthService } from './core/services/auth';
import { CommonModule } from '@angular/common';
import { Footer } from './pages/footer/footer';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, CommonModule, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  constructor(public auth: AuthService) {}
  ngOnInit() {
    this.auth.loadUser(); // 🔥 مهم جدًا
  }

  protected readonly title = signal('FrontEnd');
}
