import { Injectable } from '@angular/core';
import { Movie } from '../../shared';

@Injectable({ providedIn: 'root' })
export class LastVisitedService {
  private key = 'lastVisitedMovies';

  get(): Movie[] {
    const raw = localStorage.getItem(this.key);
    return raw ? JSON.parse(raw) : [];
  }

  add(movie: Movie): void {
    const current = this.get();
    const filtered = current.filter(m => m.slug !== movie.slug);
    filtered.unshift(movie);
    const top5 = filtered.slice(0, 5);
    localStorage.setItem(this.key, JSON.stringify(top5));
  }
}