import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AdminLayoutRoutes } from './admin-layout.routing';

import { DashboardComponent }       from '../../pages/dashboard/dashboard.component';
import { UserComponent }            from '../../pages/user/user.component';
import { TypographyComponent }      from '../../pages/typography/typography.component';
import { IconsComponent }           from '../../pages/icons/icons.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// import {SpeechComponent} from "../../pages/speech/speech.component";
// import {EnrollComponent} from "../../pages/speaker/enroll/enroll.component";
// import {IdentifyComponent} from "../../pages/speaker/identify/identify.component";
// import {TtsComponent} from "../../pages/tts/tts.component";
// // import {ImageGeneratorComponent} from "../../pages/image-generator/image-generator.component";
// import {AboutusComponent} from "../../pages/aboutus/aboutus.component";
// import {AsrWorkspaceComponent} from "../../pages/asr-workspace/asr-workspace.component";
//
// import {LoginComponent} from "../../pages/login/login.component";
// import {ResetPasswordComponent} from "../../pages/reset-password/reset-password.component";
// import {PasswordComponent} from "../../pages/password/password.component";
import {RegisterComponent} from "../../pages/register/register.component";
import {NavbarModule} from "../../shared/navbar/navbar.module";
import { SidebarModule } from "primeng/sidebar";
// import {KwsComponent} from "../../pages/kws/kws.component";
// import {CloningComponent} from "../../pages/cloning/cloning.component";
// import {AnalyzerComponent} from "../../pages/speaker/analyzer/analyzer.component";
import {AppModule} from "../../app.module";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    NgbModule,
    NavbarModule,
    SidebarModule
  ],
  declarations: [


  ]
})

export class AdminLayoutModule {}
