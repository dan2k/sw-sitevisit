import { ToastrService } from 'ngx-toastr';
import { SitevisiteService } from './../sitevisite.service';
import { Component, OnInit,Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import { map, startWith } from 'rxjs/operators';

export interface DialogData {
  dup_sw_no: any;
}
export interface User {
  sw_no: string;
}
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  myControl = new FormControl();
  options: User[];
  filteredOptions: Observable<User[]>;
  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public service: SitevisiteService,
    private toast: ToastrService,
  ) {
    console.log(data);
    //this.getApprove();
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  getApprove() {
    let toastref = this.toast.info('กำลังดึงข้อมูล', null, { disableTimeOut: false });
    this.service.getApprove().subscribe((data: any) => {
      this.toast.clear(toastref.toastId);
      if (data.status) {
        this.options = data.data;
        console.log(this.options);
        this.filteredOptions = this.myControl.valueChanges
        .pipe(
          startWith<string | User>(''),
          map(value => typeof value === 'string' ? value : value.sw_no),
          map(name => name ? this._filter(name) : this.options.slice())
        );
        this.toast.success('ดึงข้อมูลเรียบร้อยแล้ว', null, { timeOut: 2000 });
      } else {
        console.log(data);
        this.toast.error(data.msg,null,{disableTimeOut:true});
      }
    });
  }
  ngOnInit() {
    this.getApprove();
  }

  displayFn(user?: User): string | undefined {
    return user ? user.sw_no : undefined;
  }
  private _filter(name: string): User[] {
    const filterValue = name.toLowerCase();
    let v = this.options.filter(option => option.sw_no.toLowerCase().indexOf(filterValue) === 0);
    console.log('v===', v);
    if (v.length == 0) {
      this.myControl.setValue('');
    }
    return v;
  }
}
