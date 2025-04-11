import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxsModule } from '@ngxs/store';
import { MovieService } from '../core/services/movie.service';
import { MovieComponent } from '../shared/components/movie/movie.component';
import { MoviesState } from '../store/movie.state';
import { HomeComponent } from './home/home.component';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { MoviesComponent } from './movies/movies.component';
import { AppPagesRoutingModule } from './pages-routing.module';

const COMPONENTS = [
	HomeComponent,
	MovieComponent,
	MoviesComponent,
	MovieDetailComponent
];

@NgModule({
	imports: [
		CommonModule,
		AppPagesRoutingModule,
		ReactiveFormsModule,
	],
	declarations: [...COMPONENTS],
	exports: [...COMPONENTS],
	providers: [MovieService]
})
export class AppPagesModule {}
