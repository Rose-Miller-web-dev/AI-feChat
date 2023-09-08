import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { UserComponent } from '../../pages/user/user.component';

import {TtsComponent} from "../../pages/tts/tts.component";
import {AboutusComponent} from "../../pages/aboutus/aboutus.component";

import {ResetPasswordComponent} from "../../pages/reset-password/reset-password.component";
import {PasswordComponent} from "../../pages/password/password.component";
import {RegisterComponent} from "../../pages/register/register.component";

import {HomeComponent} from "../../pages/home/home.component";
import {ChatComponent} from "../../pages/chat/chat.component";


export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'chat',         component: ChatComponent },
    // { path: 'speaker/enroll',      component: EnrollComponent },
    // { path: 'speaker/identify',      component: IdentifyComponent },
    { path: 'tts',      component: TtsComponent },
    { path: 'aboutus',      component: AboutusComponent },

    { path: 'user',           component: UserComponent },
    {
      path:'home',  component: HomeComponent
    },
    {
      path: 'register/:id', redirectTo: 'register', pathMatch: 'full'
    },
    {
      path: 'resetpass', component: ResetPasswordComponent
    },
    {
      path: 'resetpass/:token', redirectTo: 'resetpass', pathMatch: 'full'
    },
    {
      path: 'changepass', component: PasswordComponent
    },
    {
      path:'register',  component: RegisterComponent
    },



];
