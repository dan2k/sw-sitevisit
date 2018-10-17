import { ToastrService } from "ngx-toastr";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { SitevisiteService } from "../sitevisite.service";
import { HOST } from "../../config";

export interface detailModel {
  sw_no?: any;
  sw_user_id?: any;
  sw_emp?: any;
  sw_add_date?: any;
  cust_ptype?: any;
  cust_pcode?: any;
  prob_gid?: any;
  problem_sub_id?: any;
  sw_detail?: any;
  sw_suggestion?: any;
  sw_status?: any;
  cust_name?: string;
  cdg_name?: string;
  sw_filedoc?: any;
  sw_rg_remark?: any;
  sw_rg_filedoc?: any;
  sw_rg_approveid?: any;
  sw_mts_remark?: any;
  sw_mts_filedoc?: any;
  sw_mt_approveid?: any;
  sw_center_remark?: any;
  sw_center_filedoc?: any;
  sw_center_approveid?: any;
  sw_upd_datetime?: any;
  visit_date?: any;
  place?: any;
  prob_gdesc?: any;
  problem_sub_desc?: any;
  upd_date?: any;
}
@Component({
  selector: "app-update",
  templateUrl: "./update.component.html",
  styleUrls: ["./update.component.css"]
})
export class UpdateComponent implements OnInit {
  sw_no: any;
  start: any;
  end: any;
  status: any;
  pageIndex: any;
  pageSize: any;
  detail: detailModel = {};
  filedoc: any;
  user: any = {};
  level: any;
  isapprove: boolean = false;
  isupdate: boolean = false;
  constructor(
    private router: ActivatedRoute,
    private rout: Router,
    private service: SitevisiteService,
    private toast: ToastrService
  ) {
    this.user = JSON.parse(localStorage.getItem("sitevisitProfile"));
    if (!this.user.user_id) {
      location.href = `http://${HOST}/mpsicc`;
    }
  }

  ngOnInit() {
    this.router.params.subscribe((param: any) => {
      this.sw_no = param["sw_no"];
      this.start = param["start"];
      this.end = param["end"];
      this.status = param["status"];
      this.pageIndex = param["pageIndex"];
      this.pageSize = param['pageSize'];
    });
    console.log(this.sw_no);
    this.getSwdetail();
  }
  back() {
    // history.back();
    this.rout.navigate([
      "main",
      this.start,
      this.end,
      this.status,
      this.pageIndex,
      this.pageSize
    ]);
  }
  getSwdetail() {
    let toastref = this.toast.info("กำลังดึงข้อมูล", null, {
      disableTimeOut: false
    });
    this.service.getSwdetail(this.sw_no).subscribe((data: any) => {
      this.toast.clear(toastref.toastId);
      if (data.status) {
        this.detail = data.data[0];
        console.log(this.detail);
        this.toast.success("ดึงข้อมูลเรียบร้อยแล้ว", null, { timeOut: 2000 });
      } else {
        this.toast.error(data.msg, null, { disableTimeOut: true });
        console.log(data);
      }
    });
  }
  update() {
    let level: any;
    let detail: any;
    let remark: any;
    switch (this.detail.sw_status) {
      case "0":
        level = 1;
        detail = this.detail.sw_detail;
        remark = this.detail.sw_suggestion;
        break;
      case "1":
        level = 2;
        detail = this.detail.sw_detail;
        remark = this.detail.sw_rg_remark;
        break;
      case "2":
        level = 3;
        detail = this.detail.sw_detail;
        remark = this.detail.sw_mts_remark;
        break;
      case "3":
        level = 4;
        detail = this.detail.sw_detail;
        remark = this.detail.sw_center_remark;
        break;
    }
    let toast = this.toast.info('กำลังอัพเดตข้อมูล', null, { disableTimeOut: false });
    this.service.update(this.detail.sw_no, level, detail, remark).subscribe((data: any) => {
      this.toast.clear(toast.toastId);
      if (data.status) {
        this.toast.success('อัพเดตข้อมูลเรียบร้อยแล้ว', null, { timeOut: 2000 });
      } else {
        this.toast.error(data.msg, null, { disableTimeOut: false });
        console.log(data);
      }
    });
  }
  open(filedoc: any) {
    window.open(`http://${HOST}/mpsicc/iccServer/sw-sitevisit/${filedoc}`, '_blank');
  }
  print() {
    window.open(`http://${HOST}/mpsicc/iccServer/sw-sitevisit/rep.php?sw_no=${this.sw_no}`, '_blank');
  }
  del(filedoc: any) {
    let level: any;
    switch (this.detail.sw_status) {
      case "0":
        level = 1;
        break;
      case "1":
        level = 2;
        break;
      case "2":
        level = 3;
        break;
      case "3":
        level = 4;
        break;
    }
    let toast = this.toast.info('กำลังลบไฟล์', null, { disableTimeOut: false });
    this.service.del(this.detail.sw_no, level,filedoc).subscribe((data: any) => {
      this.toast.clear(toast.toastId);
      if (data.status) {
        this.toast.success('ลบไฟล์เรียบร้อยแล้ว', null, { timeOut: 2000 });
        switch (this.detail.sw_status) {
          case "0":
            this.detail.sw_filedoc='';
            break;
          case "1":
            this.detail.sw_rg_filedoc='';
            break;
          case "2":
          this.detail.sw_mts_filedoc='';
            break;
          case "3":
          this.detail.sw_center_filedoc='';
            break;
        }
      } else {
        this.toast.error(data.msg, null, { disableTimeOut: false });
        console.log(data);
      }
    });

  }
  approve() {
    let level: any;
    switch (this.detail.sw_status) {
      case "0":
        level = 1;
        break;
      case "1":
        level = 2;
        break;
      case "2":
        level = 3;
        break;
      case "3":
        level = 4;
        break;
    }
    let toast = this.toast.info('กำลังอัพเดตข้อมูล', null, { disableTimeOut: false });
    this.service.approve(this.detail.sw_no, level).subscribe((data: any) => {
      this.toast.clear(toast.toastId);
      if (data.status) {
        this.isapprove = true;
        this.isupdate = true;
        this.detail.sw_status = data.status1;
        this.toast.success('อัพเดตข้อมูลเรียบร้อยแล้ว', null, { timeOut: 2000 });
      } else {
        this.toast.error(data.msg, null, { disableTimeOut: false });
        console.log(data);
      }
    });
  }
  upload(file) {
    let level: any;
    switch (this.detail.sw_status) {
      case "0":
        level = 1;
        break;
      case "1":
        level = 2;
        break;
      case "2":
        level = 3;
        break;
      case "3":
        level = 4;
        break;
    }
    this.filedoc = file.files[0].name;
    let patternImg = /image\/*/;
    let patternPdf = /application\/pdf/;
    let toastref = this.toast.info('กำลัง upload ', null, { disableTimeOut: false });
    if (file.value != "") {
      if (!(file.files[0].type.match(patternImg)||file.files[0].type.match(patternPdf))) {
          this.toast.clear(toastref.toastId);
          //this.toast.error('ต้องใช้ไฟล์ รูปภาพ หรือ pdf ', null, { disableTimeOut: true });
          alert('ต้องใช้ไฟล์ รูปภาพ หรือ pdf ');
          return false;
      }
    }
    let formData = new FormData()
    formData.append("action", "upload");
    formData.append('filedoc', file.files[0]);
    formData.append('sw_no', this.sw_no);
    formData.append('level', level);
    this.service.upload(formData).subscribe((data: any) => {
      this.toast.clear(toastref.toastId);
        if (data.status) {
            this.toast.success('upload เรียบร้อยแล้ว', null, { timeOut: 2000 });
            this.toast.success('upload is ' + data.upload, null, { timeOut: 2000 });
            // this.rout.navigate(["./main"]);
            // this.rout.navigate(['update', this.sw_no,this.start,this.end,this.status,this.pageIndex]);
          //  location.reload();
          switch (this.detail.sw_status) {
            case "0":
              this.detail.sw_filedoc=data.filedoc;
              break;
            case "1":
              this.detail.sw_rg_filedoc=data.filedoc;
              break;
            case "2":
            this.detail.sw_mts_filedoc=data.filedoc;
              break;
            case "3":
            this.detail.sw_center_filedoc=data.filedoc;
              break;
          }
          file.value = '';
        } else {
            this.toast.error(data.msg, null, { disableTimeOut: true });
            console.log(data);
        }
    });
  }
}
