import { Routes } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';



export const AppRoutes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
        {
          path: '',
          loadChildren: () => import('./layouts/admin-layout/admin-layout.module').then(x => x.AdminLayoutModule)
        },
    ]
  },

  // { path: 'dashboard',      component: DashboardComponent },
  // { path: 'speech',      component: SpeechComponent },
  // { path: 'med',      component: MedComponent },
  // // { path: 'speaker/enroll',      component: EnrollComponent },
  // // { path: 'speaker/identify',      component: IdentifyComponent },
  // // { path: 'speaker',
  // //   loadChildren: () => import('../../pages/speaker/speaker.module').then(x=>x.SpeakerModule)},
  // // {
  // //   path: '',
  // //   component: AdminLayoutComponent,
  // //   children: [{
  // //     path: 'speaker',
  // //     loadChildren:() => import( '../../pages/speaker/speaker.module').then(x=>x.SpeakerModule)
  // //   }]
  // // },
  // { path: 'speaker/analyzer',      component: AnalyzerComponent },
  // { path: 'tts',      component: TtsComponent },
  // { path: 'vc',      component: CloningComponent },
  // // { path: 'image-generator',      component: ImageGeneratorComponent },
  // { path: 'aboutus',      component: AboutusComponent },
  // { path: 'asr-workspace',  component: AsrWorkspaceComponent },
  // { path: 'kws',  component: KwsComponent },
  // { path: 'user',           component: UserComponent },
  // // { path: 'table',          component: TableComponent },
  // // { path: 'typography',     component: TypographyComponent },
  // // { path: 'icons',          component: IconsComponent },
  //
  // {
  //   path: 'login', component: LoginComponent
  // },
  // {
  //   path:'home',  component: HomeComponent
  // },
  // {
  //   path: 'register/:id', redirectTo: 'register', pathMatch: 'full'
  // },
  // {
  //   path: 'resetpass', component: ResetPasswordComponent
  // },
  // {
  //   path: 'resetpass/:token', redirectTo: 'resetpass', pathMatch: 'full'
  // },
  // {
  //   path: 'changepass', component: PasswordComponent
  // },
  // {
  //   path: 'register', component: RegisterComponent
  // },
  // { path: 'speaker',
  //   loadChildren: () => import('app/pages/speaker/speaker.module').then(x=>x.SpeakerModule)},
  // {
  //   path: 'login', component: LoginComponent
  // },
  // {
  //   path:'home',  component: HomeComponent
  // },
  // {
  //   path: 'register/:id', redirectTo: 'register', pathMatch: 'full'
  // },
  // {
  //   path: 'resetpass', component: ResetPasswordComponent
  // },
  // {
  //   path: 'resetpass/:token', redirectTo: 'resetpass', pathMatch: 'full'
  // },
  // {
  //   path: 'changepass', component: PasswordComponent
  // },
  // {
  //   path:'register',  component: RegisterComponent
  // },

  {
    path: '**',
    redirectTo: 'home'
  }
]
