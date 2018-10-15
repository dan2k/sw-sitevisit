import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import {
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter
} from "@angular/material-moment-adapter";
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE
} from "@angular/material/core";
import {
  ProvinceModel,
  CustptypeModel,
  CustpcodeModel,
  ProblemgroupModel,
  ProblemsubModel,
  UserModel
} from "../model";
import { SitevisiteService } from "../sitevisite.service";
import { ToastrService } from "ngx-toastr";
import { FormControl } from "@angular/forms";

export interface model {
  province_id?: string;
  cust_ptype?: string;
  cust_pcode?: string;
  prob_gid?: string;
  problem_sub_id?: string;
  sw_user_id?: string;
  sw_add_date?: any;
  sw_detail?: string;
  sw_suggestion?: string;
  sw_rg_remark?: string;
  sw_center_remark?: string;
}
@Component({
  selector: "app-add",
  templateUrl: "./add.component.html",
  styleUrls: ["./add.component.css"],
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
export class AddComponent implements OnInit {
  provinces: ProvinceModel[];
  custptypes: CustptypeModel[];
  custpcodes: CustpcodeModel[];
  problemgroups: ProblemgroupModel[];
  problemsubs: ProblemsubModel[];
  users: UserModel[];
  frm: model = {};
  // seldate: any = new FormControl(new Date("2018-10-20 00:00:00"));
  seldate: any = new FormControl(new Date());
  date: any = this.seldate;
  filedoc: any='';
  constructor(
    private service: SitevisiteService,
    private toast: ToastrService,
    private rout: Router

  ) {
    this.getProvince();
    this.getProblemgroup();
  }

  ngOnInit() {
    // this.getProvince
  }

  getProvince() {
    let toastref = this.toast.info("กำลังประมวลผลข้อมูล", null, {
      disableTimeOut: true
    });
    // let id: any;
    // setTimeout(() => id = this.toast.info('xxxxx', null, {
    //   disableTimeOut: true,
    // }));
    this.service.getProvince().subscribe((data: any) => {
      this.toast.clear(toastref.toastId);
      if (data.status) {
        this.toast.success("ดึงข้อมูลเรียบร้อยแล้ว", null, { timeOut: 2000 });
        this.provinces = data.data;
        console.log("provinces==>", this.provinces);
      } else {
        console.log(data);
        this.toast.error(data.msg, null, { timeOut: 2000 });
      }
    });
  }
  getCustptype() {
    if (this.frm.province_id) {
      this.custpcodes = [];
      this.users = [];
      // let formData = new FormData();
      // formData.append('action', 'getCustptype');
      // formData.append('province_id', this.frm.province_id);
      let toastref = this.toast.info("กำลังดึงข้อมูล", null, {
        disableTimeOut: true
      });
      this.service.getCustptype(this.frm.province_id).subscribe((data: any) => {
        console.log(data);
        this.toast.clear(toastref.toastId);
        if (data.status) {
          this.toast.success("ดึงข้อมูลเรียบร้อยแล้ว", null, { timeOut: 2000 });
          this.custptypes = data.data;
          console.log("custptypes==>", this.custptypes);
        } else {
          console.log(data);
          this.toast.error(data.msg, null, { timeOut: 2000 });
        }
      });
    }
  }
  getCustpcode() {
    if (this.frm.cust_ptype) {
      this.users = [];
      let toastref = this.toast.info("กำลังดึงข้อมูล", null, {
        disableTimeOut: true
      });
      this.service
        .getCustpcode(this.frm.cust_ptype, this.frm.province_id)
        .subscribe((data: any) => {
          this.toast.clear(toastref.toastId);
          if (data.status) {
            this.custpcodes = data.data;
            this.toast.success("ดึงข้อมูลเรียบร้อยแล้ว", null, {
              timeOut: 2000
            });
            console.log("custpcodes==>", this.custpcodes);
          } else {
            this.toast.error(data.msg, null, { disableTimeOut: true });
            console.log(data);
          }
        });
    }
  }
  getUser() {
    if (this.frm.cust_pcode) {
      let toastref = this.toast.info("กำลังดึงข้อมูล", null, {
        disableTimeOut: true
      });
      this.service
        .getUser(this.frm.cust_ptype, this.frm.cust_pcode)
        .subscribe((data: any) => {
          this.toast.clear(toastref.toastId);
          if (data.status) {
            this.users = data.data;
            this.toast.success("ดึงข้อมูลเรียบร้อยแล้ว", null, {
              timeOut: 2000
            });
            console.log("users==>" + this.users);
          } else {
            this.toast.error(data.msg, null, { disableTimeOut: true });
            console.log(data);
          }
        });
    }
  }
  getProblemgroup() {
    let toastref = this.toast.info("กำลังดึงข้อมูล", null, {
      disableTimeOut: true
    });
    this.service.getProblemgroup().subscribe((data: any) => {
      this.toast.clear(toastref.toastId);
      if (data.status) {
        this.problemgroups = data.data;
        console.log("problemgroups==>", this.problemgroups);
        this.toast.success("ดึงข้อมูลเรียบร้อยแล้ว", null, { timeOut: 2000 });
      } else {
        console.log(data);
        this.toast.error(data.msg, null, { disableTimeOut: true });
      }
    });
  }
  getProblemsub() {
    if (this.frm.prob_gid) {
      this.problemsubs = [];
      let toastref = this.toast.info("กำลังดึงข้อมูล", null, {
        disableTimeOut: true
      });
      this.service.getProblemsub(this.frm.prob_gid).subscribe((data: any) => {
        this.toast.clear(toastref.toastId);
        if (data.status) {
          this.problemsubs = data.data;
          console.log("problemsubs==>", this.problemsubs);
          this.toast.success("ดึงข้อมูลเรียบร้อยแล้ว", null, { timeOut: 2000 });
        } else {
          console.log(data);
          this.toast.error(data.msg, null, { disableTimeOut: true });
        }
      });
    }
  }

  onSubmit(file: any) {
    let toastref = this.toast.info("กำลังประมวลผลข้อมูล", null, {
      disableTimeOut: true
    });
    this.frm.sw_add_date = this.formatDate(new Date(this.date.value));
    let patternImg = /image\/*/;
    let patternPdf = /application\/pdf/;

    if (file.value != "") {
      if (!(file.files[0].type.match(patternImg)||file.files[0].type.match(patternPdf))) {
          this.toast.clear(toastref.toastId);
          //this.toast.error('ต้องใช้ไฟล์ รูปภาพ หรือ pdf ', null, { disableTimeOut: true });
          alert('ต้องใช้ไฟล์ รูปภาพ หรือ pdf ');
          return false;
      }
    }
    let formData = this.getFormData(this.frm);
    formData.append("action", "save");
    formData.append('filedoc', file.files[0]);
    this.service.save(formData).subscribe((data: any) => {
      this.toast.clear(toastref.toastId);
        if (data.status) {
            this.toast.success('เพิ่มข้อมูลเรียบร้อยแล้ว', null, { timeOut: 2000 });
            this.toast.success('upload is ' + data.upload, null, { timeOut: 2000 });
            this.rout.navigate(["./main"]);
        } else {
            this.toast.error(data.msg, null, { disableTimeOut: true });
            console.log(data);
        }
    });
  }
  reset(f: any) {
    f.resetForm();
      this.date = this.seldate;
      this.filedoc = '';
  }
  setFile(f) {
    this.filedoc = f.files[0].name;
  }
  getFormData(object) {
    const formData = new FormData();
    Object.keys(object).forEach(key => formData.append(key, object[key]));
    return formData;
  }
  formatDate(date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();
    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;
    return [year, month, day].join("-");
  }
}
