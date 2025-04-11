import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Movie, MovieMockClient } from '../../shared';

@Injectable({ providedIn: 'root' })
export class MovieService {

    movieData$: Observable<Movie[]>;

	constructor(movieMockClient: MovieMockClient) {
		this.movieData$ = movieMockClient.getAll$();
	}

    get() {
        return this.movieData$;
    }

    fetchMovies(title: string) {
        return this.movieData$.pipe(
            map((movies: Movie[]) => movies.filter((movie: Movie) =>
                movie.title.toLocaleLowerCase().includes(title.toLocaleLowerCase())))
        )
    }
}