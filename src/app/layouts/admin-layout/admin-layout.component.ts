import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";


@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit {
  visibleSidebar1: boolean;
  display: boolean;
  constructor(){
    this.visibleSidebar1 = false;
    this.display = true;
  }
  ngOnInit(): void {
    this.display = true;
  }

  // define a method to toggle the display property using the sidebar service
  toggleSidebar(): void {
    this.display = !this.display;
  }




}
