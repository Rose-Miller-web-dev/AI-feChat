import { Component, OnInit } from '@angular/core';
import {UserService} from "../services/user.service";
import {User} from "../models/user";


export interface RouteInfo {
  path: string;
  title: string;
  type: string;
  collapse?: string;
  icontype: string;
  // icon: string;
  children?: ChildrenItems[];
}

export interface ChildrenItems {
  path: string;
  title: string;
  ab: string;
  type?: string;
}


export const ROUTES: RouteInfo[] = [
  // { path: '/home',     title: 'Home',         icontype:'nc-home',       type: 'link' },
    { path: '/dashboard',     title: 'Dashboard',         icontype:'nc-icon nc-bank',       type: 'link', },
    { path: '/speech',     title: 'Speech Recognition',         icontype:'nc-icon nc-headphones',       type: 'link', },
  { path: '/chat',     title: 'Chat with AI',         icontype:'nc-icon nc-headphones',       type: 'link', },

  { path: '/med',     title: ' Medical Terms Recognition',         icontype:'nc-icon nc-headphones',       type: 'link', },
    { path: '/asr-workspace',     title: 'ASR Workspace',         icontype:'nc-icon nc-bullet-list-67',       type: 'link', },
    { path: '/kws',     title: 'Keyword Spotting',         icontype:'nc-icon nc-bullet-list-67',       type: 'link', },
    { path: '/speaker',     title: 'Speaker',         icontype:'nc-icon nc-layout-11', type: 'sub',  collapse: 'speaker',
      children: [
        { path: 'enroll',     title: 'Speaker Enrollment' ,  ab:'' },
        { path: 'identify',     title: 'Speaker Recognition',  ab:'' }
      ],
    },

  // { path: '/speaker/enroll',     title: 'Speaker Enrollment',          icontype:'nc-icon nc-badge',       type: 'link', },
  //   { path: '/speaker/identify',     title: 'Speaker Recognition',          icontype:'nc-icon nc-zoom-split',       type: 'link', },

  { path: '/speaker/analyzer',     title: 'Diarization&Tracking',          icontype:'nc-icon nc-watch-time',       type: 'link', },

  { path: '/tts',     title: 'Speech Synthesis',          icontype:'nc-icon nc-sound-wave',       type: 'link', },
  { path: '/vc',     title: 'Voice Cloning',          icontype:'nc-icon nc-single-copy-04',       type: 'link', },

  // { path: '/image-generator',     title: 'Image Generation',          icontype: 'nc-image',       type: 'link', },
    { path: '/aboutus',     title: 'About Us',          icontype:'nc-icon nc-paper',       type: 'link', },

  // { path: '/login',     title: 'Login',         icon:'nc-paper',       class: '' },

  // { path: '/icons',         title: 'Icons',             icon:'nc-diamond',    class: '' },
    // { path: '/maps',          title: 'Maps',              icon:'nc-pin-3',      class: '' },
    // { path: '/notifications', title: 'Notifications',     icon:'nc-bell-55',    class: '' },
    // { path: '/user',          title: 'User Profile',      icon:'nc-single-02',  class: '' },
    // { path: '/table',         title: 'Table List',        icon:'nc-tile-56',    class: '' },
    // { path: '/typography',    title: 'Typography',        icon:'nc-caps-small', class: '' },
    // { path: '/upgrade',       title: 'Upgrade to PRO',    icon:'nc-spaceship',  class: 'active-pro' },
];

@Component({
    moduleId: module.id,
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.component.html',
  // styleUrls: ['./sidebar.component.css'
  // ]
})

export class SidebarComponent implements OnInit {
    public menuItems: any[];

  loggedInUsername = '';
  isLogged = false;
  public user!: User;

  constructor(
    private userService: UserService

  ) {
  }

    ngOnInit() {

      this.menuItems = ROUTES.filter(menuItem => menuItem);

      const name = localStorage.getItem("name");
      const isLoggedIn = localStorage.getItem('isLoggedIn');
      if (isLoggedIn === 'true') {
        const name = localStorage.getItem('name');
        this.menuItems = ROUTES.filter(menuItem => {
          if (menuItem.path === '/med' && name === 'mm mm') {
            return menuItem;
          } else if (menuItem.path !== '/med') {
            return menuItem;
          }
        });
      } else {
        // User is not logged in, hide the ASR workspace

        this.menuItems = ROUTES.filter(menuItem => menuItem.path !== '/asr-workspace'
          );
        this.menuItems = this.menuItems.filter(menuItem => menuItem.path !==  '/dashboard'
        );
        this.menuItems = this.menuItems.filter(menuItem => menuItem.path !==  '/kws'
        );
        this.menuItems = this.menuItems.filter(menuItem => {
          if (menuItem.path === '/med' && name === 'mm mm') {
            return menuItem;
          } else if (menuItem.path !== '/med') {
            return menuItem;
          }
        });
      }

    }
}
