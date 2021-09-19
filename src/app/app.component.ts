import { Component } from '@angular/core';
import { AppserviceService } from './appservices/appservice.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'TransportSimple';
  selectedCountry: any;
  countries: any[];
  filteredCountries: any[];
  detailsArray: any[];
  newArray: any = {};
  indexvar: any;
  contextMenuPosition = { x: '0px', y: '0px' };
  showRightClickOptions: boolean;
  capital: string;
  states: any[];
  showstates: boolean;
  headers: any[] = ['Country', 'Capital', 'State'];

  constructor(private appService: AppserviceService) { }

  ngOnInit() {

    console.log(this.states);
    this.appService.getCountries().then(countries => {
      this.countries = countries;
      console.log(this.countries);
    });

    const localarray = JSON.parse(localStorage.getItem('appData'));

    if (localarray === null || localarray.length === 0) {
      this.detailsArray = [];
      this.newArray = { country: '', capital: '', state: '' };
      this.detailsArray.push(this.newArray);
    } else {
      this.detailsArray = JSON.parse(localStorage.getItem('appData'));
    }

  }

  onRightClick(event: MouseEvent) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + 'px';
    this.contextMenuPosition.y = event.clientY + 'px';
    this.showRightClickOptions = true;
  }

  addRowAbove() {
    this.newArray = { country: '', capital: '', state: '' };
    this.detailsArray.splice(this.indexvar, 0, this.newArray);
    this.capital = '';
    this.states = [];
    this.showRightClickOptions = false;
  }

  addRowBelow() {
    this.newArray = { country: '', capital: '', state: '' };
    this.detailsArray.splice(this.indexvar + 1, 0, this.newArray);
    this.capital = '';
    this.states = [];
    this.showRightClickOptions = false;
  }

  removeRow() {
    this.detailsArray.splice(this.indexvar, 1);
    this.showRightClickOptions = false;
  }

  addColumnLeft() {
    this.headers.splice(2, 0, 'New State');
    this.showRightClickOptions = false;
  }
  addColumnRight() {
    this.headers.splice(this.headers.length, 0, 'New State');
    this.showRightClickOptions = false;
  }

  getCapitalName(event, index) {
    this.detailsArray[index].capital = '';
    this.detailsArray[index].state = '';
    this.states = [];
    this.capital = '';
    this.showstates = false;

    for (let i = 0; i < this.countries.length; i++) {
      if (this.countries[i].name == event.target.value) {
        this.capital = this.countries[i].capital;
      }
    }
    this.appService.getStates(event.target.value).pipe(value => value).subscribe(data => this.mydata(data));
  }

  mydata(res) {
    this.states = res.data.states;
    this.showstates = true;
  }

  updateAllDetails() {
    const data = JSON.stringify(this.detailsArray);
    localStorage.setItem('appData', data);
    alert('Details Saved successfully');
  }
}
