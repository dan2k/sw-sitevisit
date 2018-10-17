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
import { Router,ActivatedRoute } from '@angular/router';
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
  status_desc: string;
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
  startDate: any = new FormControl({ value: '',disabled:true });
  endDate: any = new FormControl({ value: '', disabled: true });
  user: any = {};
  status: any = new FormControl({ value: '', disabled: false });
  constructor(
    private service: SitevisiteService,
    private http: HttpClient,
    private router: Router,
    private rout:ActivatedRoute,
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
  show(sw_no: any) {
    let start = this.startDate.value==''?'':this.service.formatDate(new Date(this.startDate.value));
    let end = this.endDate.value==''?'':this.service.formatDate(new Date(this.endDate.value));
    let status = this.status.value;
    let pageIndex = this.paginator.pageIndex;
    let pageSize = this.paginator.pageSize;
    this.router.navigate(['update', sw_no,start,end,status,pageIndex,pageSize]);
  }
  ngOnInit() {
    this.paginator._intl.itemsPerPageLabel = "จำนวนรายการ ต่อหน้า";
    // this.paginator._intl.getRangeLabel = (page, size, length) => `Page ${page} of ${length / size}`;
  }
  ngAfterViewInit() {
    this.rout.params.subscribe((param) => {
      if (param.start||param.start=='') {//from back
        console.log('param==>',param);
        let start =param['start'];
        let end = param['end'];
        let pageIndex = param['pageIndex'];
        let pageSize = param['pageSize'];
        let status = param['status'];
        this.startDate = start ==''?new FormControl({ value:'',disabled:true }):new FormControl({ value:new Date(`${start} 00:00:00`),disabled:true });
        this.endDate = end ==''?new FormControl({ value:'',disabled:true }):new FormControl({ value: new Date(`${end} 00:00:00`),disabled:true });
        this.paginator.pageIndex = pageIndex;
        this.paginator.pageSize = pageSize;
        this.status.value = status;
        console.log('from back===>', param);
      }
      this.loadData();
    });

  }
  clear() {
    this.startDate = new FormControl({ value: '', disabled: true });
    this.endDate = new FormControl({ value: '', disabled: true });
    this.status = new FormControl({ value: '', disabled: false });
    this.loadData();
  }
  loadData() {
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;

          let start: any;
          let end: any;
          let pageIndex: any;

          start = this.startDate.value==''?'':this.service.formatDate(new Date(this.startDate.value));
          end = this.endDate.value==''?'':this.service.formatDate(new Date(this.endDate.value));
          pageIndex = this.paginator.pageIndex;

          console.log('start===>' + start + '--end===>' + end);
          return this.service.getData(start,end,this.status.value,this.sort.active, this.sort.direction,pageIndex,this.paginator.pageSize);
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
  search() {
    this.paginator.pageIndex = 0;
    this.loadData();
  }
}
