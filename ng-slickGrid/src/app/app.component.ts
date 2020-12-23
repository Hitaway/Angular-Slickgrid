import { Component, OnInit } from '@angular/core';
import { Column, GridOption, AngularGridInstance } from 'angular-slickgrid';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ngSlickGrid';

  angularGrid: AngularGridInstance;
  columnDefinitions: Column[] = [];
  gridOptions: GridOption = {};
  dataset: any[] = [];

  angularGridReady(angularGrid: AngularGridInstance) {
    this.angularGrid = angularGrid;
  }

  ngOnInit(): void {
    this.columnDefinitions = [
      { id: 'title', name: 'Title', field: 'title', sortable: true, columnGroup: "test 1" },
      { id: 'duration', name: 'Duration (days)', field: 'duration', sortable: true, columnGroup: "test 1" },
      { id: '%', name: '% Complete', field: 'percentComplete', sortable: true, columnGroup: "test 2" },
      { id: 'start', name: 'Start', field: 'start', columnGroup: "test 2" },
      { id: 'finish', name: 'Finish', field: 'finish' },
      { id: 'effort-driven', name: 'Effort Driven', field: 'effortDriven', sortable: true }
    ];

    // Set multiple buttons on the first column to demonstrate overflow.
    this.columnDefinitions[0].name = 'Resize me!';
    this.columnDefinitions[0].header = {
      buttons: [
        {
          // cssClass: 'fa fa-info-circle',
          image: '../assets/icons/info-icon.png',
          tooltip: 'Info'
        },
        {
          cssClass: 'fa fa-question-circle',
          tooltip: 'Help',
          handler: (e) => {
            alert('Help');
          }
        }
      ]
    };

    this.gridOptions = {
      enableCellNavigation: true,
      showPreHeaderPanel: true,
      createPreHeaderPanel: true,
      preHeaderPanelHeight: 35,
      enableHeaderButton: true,
      enableHeaderMenu: false
    };

    // fill the dataset with your data
    // VERY IMPORTANT, Angular-Slickgrid uses Slickgrid DataView which REQUIRES a unique "id" and it has to be lowercase "id" and be part of the dataset
    this.dataset = [];

    // for demo purpose, let's mock a 1000 lines of data
    for (let i = 0; i < 1000; i++) {
      const randomYear = 2000 + Math.floor(Math.random() * 10);
      const randomMonth = Math.floor(Math.random() * 11);
      const randomDay = Math.floor((Math.random() * 28));
      const randomPercent = Math.round(Math.random() * 100);

      this.dataset[i] = {
        id: i, // again VERY IMPORTANT to fill the "id" with unique values
        title: 'Task ' + i,
        duration: Math.round(Math.random() * 100) + '',
        percentComplete: randomPercent,
        start: `${randomMonth}/${randomDay}/${randomYear}`,
        finish: `${randomMonth}/${randomDay}/${randomYear}`,
        effortDriven: (i % 5 === 0)
      };
    }
  }

  public hideMultiHeader(): void {
    console.log("hideMultiHeader");
    this.angularGrid.slickGrid.setPreHeaderPanelVisibility(false, true);
  }

  public showMultiHeader(): void {
    console.log("showMultiHeader");
    this.angularGrid.slickGrid.setPreHeaderPanelVisibility(true, true);
  }
}
