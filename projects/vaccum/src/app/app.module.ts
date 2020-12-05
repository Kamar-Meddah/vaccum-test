import {BrowserModule} from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {SquareComponent} from './components/square/square.component';
import {BoardComponent} from './components/board/board.component';
import {HomeComponent} from './components/home/home.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule} from "@angular/material/button";
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../environments/environment';
import {FlexLayoutModule} from "@angular/flex-layout";
import {ReactiveFormsModule} from "@angular/forms";
import {MatGridListModule} from "@angular/material/grid-list";

@NgModule({
    declarations: [
        AppComponent,
        SquareComponent,
        BoardComponent,
        HomeComponent
    ],
    imports: [
        FlexLayoutModule,
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatButtonModule,
        ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production}),
        ReactiveFormsModule,
        MatGridListModule
    ],
    providers: [],
    bootstrap: [AppComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {
}
