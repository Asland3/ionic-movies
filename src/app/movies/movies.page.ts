import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MovieService, SearchType } from './services/movie.service';
import { LoadingController } from '@ionic/angular';


@Component({
  selector: 'app-movies',
  templateUrl: './movies.page.html',
  styleUrls: ['./movies.page.scss'],
})
export class MoviesPage implements OnInit {
 
  results!: Observable<any>;
  searchTerm: string = '';
  type: SearchType = SearchType.all;

  constructor(private movieService: MovieService, private loadingCtrl: LoadingController) { }
  
  ngOnInit() {
  }

  clearSearch() {
    this.searchTerm = '';
    this.results = of([]);
  }

  async searchChanged() {
    
    // Create a loading spinner
    const loading = await this.loadingCtrl.create({
      message: 'Loading...'
    });
    // Present the loading spinner
    await loading.present();
  
    // Fetch the data
    this.results = this.movieService.searchData(this.searchTerm, this.type);
    this.results.subscribe(() => {
      // Dismiss the loading spinner when the data is fetched
      loading.dismiss();
    });
  }
}
