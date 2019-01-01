import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatToolbarModule } from '@angular/material';
import { MatTabsModule } from '@angular/material';
import { MatDividerModule, MatListModule, MatInputModule } from '@angular/material';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule, MatCardModule } from '@angular/material';
import { MatButtonModule, MatSliderModule } from '@angular/material';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material';
import { MatAutocompleteModule } from '@angular/material';

import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddComponent } from './components/task/add/add.component';
import { EditComponent } from './components/task/edit/edit.component';
import { ViewComponent } from './components/task/view/view.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClarityModule } from '@clr/angular';
import { TaskService } from './components/task/task.service';


const routes: Routes = [
  { path: 'create', component: AddComponent },
  { path: 'edit', component: EditComponent },
  { path: 'view', component: ViewComponent },
  { path: '', redirectTo: 'view', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    EditComponent,
    AddComponent,
    ViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule, MatTabsModule, MatDividerModule, MatListModule,
    MatFormFieldModule, MatInputModule,
    MatGridListModule, MatCardModule,
    MatButtonModule, MatSliderModule,
    MatDatepickerModule, MatNativeDateModule,
    MatAutocompleteModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    ClarityModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [TaskService],
  bootstrap: [AppComponent]
})
export class AppModule { }
