import { Component, OnInit,AfterViewInit ,ViewChild} from '@angular/core';
import { SitevisiteService } from '../sitevisite.service';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import {
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter
} from "@angular/material-moment-adapter";
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE
} from "@angular/material/core";
import {merge, Observable, of as observableOf} from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { FormControl } from "@angular/forms";
export interface model {
  sw_no: string;
  sw_user_id: string;
  sw_add_date: string;
  sw_cust_ptype: string;
  sw_cust_pcode: string;
  sw_prob_gid: string;
  sw_problem_sub_id: string;
  sw_detail: string;
  sw_suggestion: string;
  sw_status: string;
  sw_upd_datetime: string;
  visit_date: string;
  place: string;
  prob_gdesc: string;
  problem_sub_desc: string;
  upd_date: string;
}

declare var $: any;
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  providers: [
    // The locale would typically be provided on the root module of your application. We do it at
    // the component level here, due to limitations of our example generation script.
    { provide: MAT_DATE_LOCALE, useValue: "th-TH" },

    // `MomentDateAdapter` and `MAT_MOMENT_DATE_FORMATS` can be automatically provided by importing
    // `MatMomentDateModule` in your applications root module. We provide it at the component level
    // here, due to limitations of our example generation script.
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE]
    },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS }
  ]
})
export class MainComponent implements OnInit, AfterViewInit {
  data: model[];
  displayedColumns: string[] = ['no', 'sw_no', 'visit_date','sys','detail','suggestion','status','upd_date','action'];
  // dataSource = new MatTableDataSource<model>(this.data);
  dataSource: model[]=[]
  isDesktop: boolean = false;
  ismobile: boolean = false;
 //333333333333333333333333333333333333333333333333
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  // ###################################################
  startDate: any = new FormControl(new Date());
  endDate: any = new FormControl(new Date());
  constructor(
    private service: SitevisiteService,
    private http: HttpClient,
    breakpointObserver: BreakpointObserver

  ) {
    breakpointObserver.observe(['(max-width: 600px)']).subscribe(result => {
    //   this.displayedColumns = result.matches ?
    //   ['sw_no', 'visit_date','sys','detail','suggestion','status','upd_date','action'] :
    //     ['no', 'sw_no', 'visit_date', 'sys', 'detail', 'suggestion', 'status', 'upd_date', 'action'];
      this.isDesktop = !result.matches;
    });
  }

  /** Whether the number of selected elements matches the total number of rows. */

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  /* getData() {
    this.service.getData().subscribe((data: any) => {
      console.log(data);
      this.dataSource.data = data.data;
    });
  } */
  show(row: any) {
    console.log(row);
  }
  ngOnInit() {
  }
  ngAfterViewInit() {
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.service.getData('','','',
            this.sort.active, this.sort.direction, this.paginator.pageIndex,this.paginator.pageSize);
        }),
        map((data:any) => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;
          this.isRateLimitReached = false;
          this.resultsLength = data.total_count;

          return data.items;
        }),
        catchError(() => {
          this.isLoadingResults = false;
          // Catch if the GitHub API has reached its rate limit. Return empty data.
          this.isRateLimitReached = true;
          return observableOf([]);
        })
      ).subscribe(data => this.dataSource = data);

  }
}
