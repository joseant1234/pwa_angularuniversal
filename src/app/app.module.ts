import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
// para ngModel
import { FormsModule } from '@angular/forms';

import { environment } from '../environments/environment';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { routes } from './routes';

import { AppComponent } from './base/app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ListCreatorComponent } from './lists/creator/list.creator.component';
import { ListComponent } from './lists/list.component';
import { TodoCreatorComponent } from './todos/creator/todos.creator.component';

import { AuthService } from './services/auth.service';
import { UserService } from './services/users.service';
import { ListService } from './services/lists.service';

import { AuthGuard } from './guards/auth.guard.service';

import {TransferHttpCacheModule} from '@nguniversal/common';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    ListCreatorComponent,
    ListComponent,
    TodoCreatorComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'my-app'}),
    RouterModule.forRoot(routes),
    TransferHttpCacheModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    FormsModule,
  ],
  providers: [AuthService, AuthGuard, UserService, ListService],
  bootstrap: [AppComponent]
})
export class AppModule { }
