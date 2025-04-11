import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { Movie } from '../shared';
import { tap } from 'rxjs';
import { MovieService } from '../core/services/movie.service';


export class MoviesAction {
  static readonly type = '[Movies] Load Movies';
  constructor(public payload: { title: string }) {}
}

export interface MoviesStateModel {
  movies: Movie[];
}

@State<MoviesStateModel>({
  name: 'movies',
  defaults: {
    movies: []
  }
})
@Injectable()
export class MoviesState {

	constructor(
        private movieService: MovieService
    ) {
	}

    @Selector()
    static allMovies(state: MoviesStateModel): Movie[] {
      return state.movies;
    }

    @Action(MoviesAction)
    add({ setState }: StateContext<MoviesStateModel>) {
      return this.movieService.get().pipe(
          tap((movies: Movie[]) => { setState({movies}) })
      )}
}