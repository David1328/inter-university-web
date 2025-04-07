import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private route: Router) {

  }
  seeMenu:boolean=false;
  title = 'inter-university-web';
  ngOnInit(): void {
    const userString = localStorage.getItem('user');
    if ((userString ? JSON.parse(userString) : null) != null) {
      this.seeMenu=true
    }
  }
  cerrarSesion(){
    localStorage.removeItem('user');
    window.location.reload();
  }
}