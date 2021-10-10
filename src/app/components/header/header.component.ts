import { Component, OnInit } from '@angular/core';
import { AUTH_OPTIONS } from 'src/app/constants/header.constants';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isAuth = false;
  AUTH_OPTIONS = AUTH_OPTIONS;

  constructor() { }

  ngOnInit(): void {
  }

}
