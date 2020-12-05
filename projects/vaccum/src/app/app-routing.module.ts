import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {BoardComponent} from "./components/board/board.component";


const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'board', component: BoardComponent},
    {path: '**', redirectTo: '/', pathMatch: 'full'}
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
