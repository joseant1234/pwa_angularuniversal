  import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
// para ngModel
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// la sw funciona en produccion, se debe hacer ng build --prod y con el archivo generado ir a esa ruta dist/browser y levantar un servidor
/* en ngsw-config se configura la sw, en ese file, en la parte de resources dice q archivos se va hacer cache (css js generado y lo q este en la carpeta assets )*/
import { ServiceWorkerModule } from '@angular/service-worker';

import { environment } from '../environments/environment';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';

import { routes } from './routes';

import { AppComponent } from './base/app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ListCreatorComponent } from './lists/creator/list.creator.component';
import { ListComponent } from './lists/list.component';
import { TodoCreatorComponent } from './todos/creator/todos.creator.component';
import { TodoCardComponent } from './todos/card/todo.card.component';

import { AuthService } from './services/auth.service';
import { UserService } from './services/users.service';
import { ListService } from './services/lists.service';
import { TodoService } from './services/todos.service';

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
    TodoCardComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'my-app'}),
    RouterModule.forRoot(routes),
    TransferHttpCacheModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    FormsModule,
    BrowserAnimationsModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    environment.production ? ServiceWorkerModule.register('/ngsw-worker.js') : [],
  ],
  providers: [AuthService, AuthGuard, UserService, ListService, TodoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
