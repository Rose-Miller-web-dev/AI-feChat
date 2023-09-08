import {Component, OnInit} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{

  // constructor(
  //   public translate: TranslateService,
  // ){
  //   // this.authService.currentUser.subscribe(user => {
  //   //   this.loggedInUsername = user ? user.username : null;
  //   // });
  //   // Register translation languages
  //   translate.addLangs([ 'en','tr']);
  //   // Set default language
  //   translate.setDefaultLang('en');
  //   translate.use('en');
  // }
  ngOnInit() {

  }
  // //Switch language
  // translateLanguageTo(lang: string) {
  //   this.translate.use(lang);
  // }
}
