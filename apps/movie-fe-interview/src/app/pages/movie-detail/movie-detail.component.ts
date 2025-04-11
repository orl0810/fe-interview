import { Component, OnInit, signal, inject, computed } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngxs/store';
import { catchError, of } from 'rxjs';
import { ErrorService } from '../../core/services/error.service';
import { LastVisitedService } from '../../core/services/last-visited.service';
import { Movie } from '../../shared/client/movie.model';
import { MoviesAction, MoviesState } from '../../store/movie.state';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss']
})
export class MovieDetailComponent implements OnInit {

  private lastVisitedService = inject(LastVisitedService);

  movie = signal<Movie | null>(null);

  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private errorService: ErrorService
  ) {}

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug');
    this.store.dispatch(new MoviesAction({ title: '' })).pipe(
        catchError(err => {
            this.errorService.setError('[MovieDetailComponent] Could not fetch movies');
            return of([]);
        })
    ).subscribe(() => {
        const updatedMovies = this.store.selectSnapshot(MoviesState.allMovies);
        const selected = updatedMovies.find(m => m.slug === slug);
        if(selected) {
            this.lastVisitedService.add(selected)
            this.movie.set(selected);
        }
      });
  }

  rounded(popularity: string) {
    return Number(popularity).toFixed(2);
  }
}