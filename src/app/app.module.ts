import {  BrowserAnimationsModule  } from "@angular/platform-browser/animations";
import {  NgModule  } from '@angular/core';
import {  RouterModule  } from '@angular/router';
import {  ToastrModule  } from "ngx-toastr";

import {  SidebarModule  } from './sidebar/sidebar.module';
import {  FooterModule  } from './shared/footer/footer.module';
import {  NavbarModule  } from './shared/navbar/navbar.module';
import {  FixedPluginModule  } from './shared/fixedplugin/fixedplugin.module';


import {  AppComponent  } from './app.component';
import {  AppRoutes  } from './app.routing';

import {  AdminLayoutComponent  } from './layouts/admin-layout/admin-layout.component';
import { HttpClient, HttpClientModule } from "@angular/common/http";
import {  TranslateLoader, TranslateModule  } from '@ngx-translate/core';
import {  TranslateHttpLoader  } from '@ngx-translate/http-loader';
// import { AsrService } from "./services/asr.service";
import { BrowserModule } from "@angular/platform-browser";
// import { EnrollService } from "./services/enroll.service";
// import { IdentifyService } from "./services/identify.service";
import { NgbModule, NgbOffcanvasModule } from "@ng-bootstrap/ng-bootstrap";

import { FormsModule } from "@angular/forms";
// import { MedComponent } from './pages/med/med.component';

import { SubtitleConverterComponent } from './subtitle-converter/subtitle-converter.component';
import { AudioVideoSelectorComponent } from './audio-video-selector/audio-video-selector.component';
import { ButtonModule } from 'primeng/button';
import { HomeComponent } from './pages/home/home.component';
import {WaveformComponent} from "./shared/waveform/waveform.component";
import {RecordComponent} from "./shared/record/record.component";
import {DashboardComponent} from "./pages/dashboard/dashboard.component";
// import {SpeechComponent} from "./pages/speech/speech.component";
import {TtsComponent} from "./pages/tts/tts.component";
import {AboutusComponent} from "./pages/aboutus/aboutus.component";
// import {AsrWorkspaceComponent} from "./pages/asr-workspace/asr-workspace.component";
// import {KwsComponent} from "./pages/kws/kws.component";
import {TypographyComponent} from "./pages/typography/typography.component";
import {IconsComponent} from "./pages/icons/icons.component";
import {ResetPasswordComponent} from "./pages/reset-password/reset-password.component";
import {PasswordComponent} from "./pages/password/password.component";
import {RegisterComponent} from "./pages/register/register.component";
// import {LoginComponent} from "./pages/login/login.component";
import {UserComponent} from "./pages/user/user.component";
// import {CloningComponent} from "./pages/cloning/cloning.component";
// import {AnalyzerComponent} from "./pages/speaker/analyzer/analyzer.component";
// import {EnrollComponent} from "./pages/speaker/enroll/enroll.component";
// import {IdentifyComponent} from "./pages/speaker/identify/identify.component";
import { VideoComponent } from './shared/video/video.component';
import { ChatComponent } from './pages/chat/chat.component';
import { NgAudioRecorderModule } from "ng-audio-recorder";

// import { SpeakerRouting } from './pages/speaker/speaker.routing';
// Factory function required during AOT compilation
export function httpTranslateLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
 }

@NgModule({
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    SubtitleConverterComponent,
    HomeComponent,
    AudioVideoSelectorComponent,
    WaveformComponent,
    RecordComponent,
    DashboardComponent,
    TtsComponent,
    AboutusComponent,
    TypographyComponent,
    IconsComponent,
    ResetPasswordComponent,
    PasswordComponent,
    RegisterComponent,
    UserComponent,
    VideoComponent,
    ChatComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    ButtonModule,
    RouterModule.forRoot(AppRoutes, {
      useHash: true
    }),
    SidebarModule,
    NavbarModule,
    NgbOffcanvasModule,
    NgbModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    FooterModule,
    FixedPluginModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoaderFactory,
        deps: [HttpClient]
      }
    }),
    FormsModule,
    //NgAudioRecorderModule
  ],
  providers: [],
  exports: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule {   }
