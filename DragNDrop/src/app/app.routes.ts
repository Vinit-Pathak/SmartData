import { Routes } from '@angular/router';
import { Chapter1Component } from './components/chapter1/chapter1.component';
import { Chapter2Component } from './components/chapter2/chapter2.component';

export const routes: Routes = [
    { path: '', redirectTo: 'chapter1', pathMatch: 'full' },
    { path: 'chapter1', component: Chapter1Component },
    { path: 'chapter2', component: Chapter2Component },
];
