import { Component, signal, computed } from '@angular/core';
import { LastVisitedService } from '../../../../core/services/last-visited.service';

@Component({
  selector: 'app-footer',
  template: `
    <div class="last-visited">
      <h4>Last Visited</h4>
      <ul>
        <li *ngFor="let movie of lastVisited()">
          <a [routerLink]="['/movie', movie.slug]">{{ movie.title }}</a>
        </li>
      </ul>
    </div>
  `,
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  private service = new LastVisitedService();
  lastVisited = signal(this.service.get());
}