import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ErrorService } from '../../core/services/error.service';
import { Movie } from '../../shared';
import { MoviesAction, MoviesState } from '../../store/movie.state';

const NAME_KEBAB = 'app-home';

@Component({
	templateUrl: './home.component.html',
	styleUrls: ['./home.scss'],
	host: { class: NAME_KEBAB },
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {

	topTenMovies = signal<Movie[]>([]);
	movies$: Observable<Movie[]> = inject(Store).select(MoviesState.allMovies);

	constructor(
		private store: Store,
		private errorService: ErrorService
	) {
		this.store.dispatch(new MoviesAction({ title: '' }));
		this.movies$.pipe(
			map((movies) => {
				const sortedMovies = [...movies].sort((a, b) => {
				return parseFloat(b.popularity) - parseFloat(a.popularity);
				});
				return sortedMovies.slice(0, 10);
			}),
			catchError(err => {
				this.errorService.setError('[HomeComponent] Could not fetch movies');
				return of([]);
			})
		).subscribe(movies => {
			this.topTenMovies.set(movies);
		});
	}
}
