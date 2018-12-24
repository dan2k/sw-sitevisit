import { SitevisiteService } from './../sitevisite.service';
import { HOST } from './../../config';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import {Observable} from 'rxjs';
import { map, startWith } from 'rxjs/operators';
export interface Option {
  text: string;
}
@Component({
  selector: 'app-frmprint',
  templateUrl: './frmprint.component.html',
  styleUrls: ['./frmprint.component.css']
})
export class FrmprintComponent implements OnInit {
  // toname: any = new FormControl('', [Validators.required]);
  // fromname: any = new FormControl('', [Validators.required]);
  toname1 = new FormControl('', [Validators.required]);
  fromname1 = new FormControl('', [Validators.required]);
  docno = new FormControl('', [Validators.required]);
  docno2: any;
  myfrm: FormGroup;
  sw_no: any;
  options1: Option[];
  options2: Option[];
  filteredOptions1: Observable<Option[]>;
  filteredOptions2: Observable<Option[]>;
  constructor(
    private router: ActivatedRoute,
    private service:SitevisiteService
  ) {
    this.router.params.subscribe((param: any) => {
      this.sw_no = param["sw_no"];
    });
    this.myfrm = new FormGroup({
      // toname: this.toname,
      // fromname: this.fromname,
      toname1: this.toname1,
      fromname1: this.fromname1,
      docno:this.docno
    });
  }
  getText(type: any) {
    this.service.getText(type).subscribe((data: any) => {
      if (data.status) {
        let obj1 = type == 1 ? this.options1 : this.options2;
        let obj2 = type == 1 ? this.filteredOptions1 : this.filteredOptions2;

        obj1 = data.data;
        obj2 = (type==1?(this.toname1.valueChanges):this.fromname1.valueChanges)
        .pipe(
          startWith<string | Option>(''),
          map(value => typeof value === 'string' ? value : value.text),
          map(name => name ? this._filter(name,type) : obj1.slice())
        );
        console.log('options1==>',this.options1);
        console.log('options2==>', this.options2);
        console.log('obj1==>',this.options1);
        console.log('obj2==>', this.options2);
        type == 1 ? this.options1 = obj1 : this.options2 = obj1;
        type == 1 ? this.filteredOptions1 = obj2 : this.filteredOptions2 = obj2;
      } else {
        console.log(data);
      }
    });
  }
  private _filter(name: string,type:any): Option[] {
    const filterValue = name.toLowerCase();
    let obj: any;
    if (type == 1) {
      obj = this.options1;
    } else {
      obj = this.options2;
    }
    let v = obj.filter(option => option.text.toLowerCase().indexOf(filterValue) === 0);
    return v;
  }
  ngOnInit() {
    this.getText(1);
    this.getText(2);
    this.getDocno();

  }
  getDocno() {
    // this.docno.setValue('1/2561');
    this.service.getDocno(this.sw_no).subscribe((data: any) => {
      console.log(data);
      if (data.status) {
        this.docno.setValue(data.docno);
        this.docno2 = data.docno;
        // this.isset = data.isset;
        if (data.isset) this.myfrm.controls['docno'].disable();
      }else{
        console.log(data);
      }
    });
  }
  submit() {
    if (this.myfrm.valid) {
      window.open(`http://${HOST}/mpsicc/iccServer/sw-sitevisit/rep.php?sw_no=${this.sw_no}&toname=${this.toname1.value}&fromname=${this.fromname1.value}&docno=${this.docno.value}`, '_blank');
    }
    this.service.upText(this.toname1.value, this.fromname1.value).subscribe((data: any) => {
      if (!data.status) {
        console.log(data);
      }else{
        this.getText(1);
        this.getText(2);
      }
    });
    this.reset();
  }
  reset() {
    this.myfrm.reset();
    this.docno.setValue(this.docno2);
  }
  back() {
    history.back();
  }
}
