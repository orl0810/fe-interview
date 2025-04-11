import { Component, OnInit, signal, computed, inject } from '@angular/core';
import { Store } from '@ngxs/store';
import { ActivatedRoute, Router } from '@angular/router';
import { MoviesState, MoviesAction } from '../../store/movie.state';
import { FormControl } from '@angular/forms';
import { catchError, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { ErrorService } from '../../core/services/error.service';
import { of } from 'rxjs';


@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {

  movies = this.store.selectSignal(MoviesState.allMovies);
  searchTermControl = new FormControl('');
  searchTerm = signal('');
  selectedGenres = signal<string[]>([]);

  filteredGenres = computed(() => {
    const search = this.searchTerm().toLowerCase();
    const genres = this.movies()
    .filter(movie => movie.title.toLowerCase().includes(search))
    .map(movie => movie.genres)
    .flat();

    return new Set(genres);
  });

  filteredMovies = computed(() => {
    const term = this.searchTerm().toLowerCase();
    const genres = this.selectedGenres();

    return this.movies().filter(movie => {
      const matchesTitle = movie.title.toLowerCase().includes(term);
      const matchesGenres = genres.length === 0 || genres.every(g => movie.genres.includes(g));
      
      return matchesTitle && matchesGenres;
    }); 
  });

  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private router: Router,
    private errorService: ErrorService
  ) {}

  ngOnInit(): void {
    this.store.dispatch(new MoviesAction({ title: ''})).pipe(
        catchError(err => {
            this.errorService.setError('[MoviesComponent] Could not fetch movies');
            return of([]);
        })
    );
    this.queryParamsBinding();
    this.searchTermControl.valueChanges
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe(value => {
        this.searchTerm.set(value || '');
        this.updateQueryParams();
      });
  }

  queryParamsBinding() {
    const queryParams = this.route.snapshot.queryParamMap;
    this.searchTerm.set(queryParams.get('searchTerm') || '');
    const genreParams = queryParams.getAll('genre');
    this.selectedGenres.set(genreParams);
    this.searchTermControl.setValue(this.searchTerm(), { emitEvent: false });
  }

  onGenreSelectChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const selected: string[] = Array.from(selectElement.selectedOptions).map(
      option => option.value
    );

    this.selectedGenres.set(selected);
    this.updateQueryParams();
  }

  updateQueryParams(): void {
    const queryParams: any = {
      searchTerm: this.searchTerm() || null,
      genre: this.selectedGenres().length ? this.selectedGenres() : null
    };

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams,
      queryParamsHandling: 'merge'
    });
  }

  clearGenres(): void {
    this.selectedGenres.set([]);
    this.updateQueryParams();
  }
}