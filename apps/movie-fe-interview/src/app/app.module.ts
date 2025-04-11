import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
	provideHttpClient,
	withInterceptorsFromDi,
} from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AppPagesModule } from './pages/pages.module';
import { NgxsModule } from '@ngxs/store';
import { MoviesState } from './store/movie.state';
import { ErrorBannerComponent } from './shared/components/error/error.component';
import { HeaderComponent } from '../app/shared/components/layout/header/header.component'
import { SideMenuComponent } from '../app/shared/components/layout/side-menu/side-menu.component'
import { FooterComponent } from '../app/shared/components/layout/footer/footer.component'

@NgModule({
	declarations: [
		AppComponent,
		SideMenuComponent,
		HeaderComponent,
		FooterComponent,
		ErrorBannerComponent
	],
	bootstrap: [AppComponent],
	imports: [
		CommonModule,
		RouterModule, BrowserModule, AppPagesModule,
		NgxsModule.forRoot([MoviesState])
	],
	providers: [provideHttpClient(withInterceptorsFromDi())],
})
export class AppModule {}
