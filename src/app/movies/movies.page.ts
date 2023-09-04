import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MovieService, SearchType } from './services/movie.service';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.page.html',
  styleUrls: ['./movies.page.scss'],
})
export class MoviesPage implements OnInit {
 
  results!: Observable<any>;
  searchTerm: string = '';
  type: SearchType = SearchType.all;

  isLoading = false;

  constructor(private movieService: MovieService) { }


  searchChanged() {
    this.isLoading = true;
    this.results = this.movieService.searchData(this.searchTerm, this.type);
    this.results.subscribe(() => {
      this.isLoading = false;
    });
  }

  ngOnInit() {
  }

}
