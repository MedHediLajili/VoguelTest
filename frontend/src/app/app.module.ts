import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {FormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import {MaterialModule} from './material/material.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/header/header.component';
import { ListFilesComponent } from './components/list-files/list-files.component';
import { AddFileComponent } from './components/add-file/add-file.component';
import { FilesService } from './services/files.service';

const appRoutes: Routes = [
  { path: '',component: ListFilesComponent },
  { path: 'addfile', component: AddFileComponent },
  { path: 'files',component: ListFilesComponent }

];


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ListFilesComponent,
    AddFileComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    MaterialModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [FilesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
