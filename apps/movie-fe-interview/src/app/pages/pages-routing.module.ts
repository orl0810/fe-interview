import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { MoviesComponent } from './movies/movies.component';

const ROUTES: Routes = [
	{ path: '', pathMatch:'full', redirectTo: 'home' },
	{ path: 'home', component: HomeComponent },
	{ path: 'movies', component: MoviesComponent },
  	{ path: 'movie/:slug', component: MovieDetailComponent },
  	{ path: '**', redirectTo: '' }
];

@NgModule({
	imports: [
		RouterModule.forRoot(ROUTES, {
			// enableTracing: true
		}),
	],
	exports: [RouterModule],
})
export class AppPagesRoutingModule {}
