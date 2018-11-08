
import { Injectable } from '@angular/core';
import { SitevisitModule } from './sitevisit.module';
import { HttpClient, HttpParams, HttpRequest } from '@angular/common/http';
import { url } from '../config';

@Injectable({
  providedIn: SitevisitModule
})
export class SitevisiteService {

  constructor(
    private http: HttpClient,
  ) { }
  getProvince() {
    let params = new HttpParams()
      .set('action', 'getProvince');
    return this.http.get(`${url}/sitevisit.php`, { params: params });
  }
  getCustptype(province_id: any) {
    let params = new HttpParams()
      .set('action', 'getCustptype')
      .set('province_id',province_id);
    return this.http.get(`${url}/sitevisit.php`, { params: params });
  }
  getCustpcode(custptype: any,provinceid:any) {
    let params = new HttpParams()
      .set('action', 'getCustpcode')
      .set('province_id',provinceid)
      .set('cust_ptype', custptype);
    return this.http.get(`${url}/sitevisit.php`, { params: params });
  }
  getProblemgroup() {
    let params = new HttpParams().set('action', 'getProblemgroup');
    return this.http.get(`${url}/sitevisit.php`,{ params: params });
  }
  getProblemsub(prob_gid: any) {
    let params = new HttpParams().set('action', 'getProblemsub').set('prob_gid', prob_gid);
    return this.http.get(`${url}/sitevisit.php`, { params: params });
  }
  getUser(custptype: any, custpcode: any) {
    let params = new HttpParams().set('action', 'getUser')
      .set('cust_ptype', custptype)
      .set('cust_pcode', custpcode);
    return this.http.get(`${url}/sitevisit.php`, { params: params });
  }
  // save(data: any) {
  //   let params = new HttpParams()
  //     .set('action', 'save');
  //     //.set('data', data);
  //     return this.http.post(`${url}/sitevisit.php`, { params: params });
  // }
  save(formData: any) {
    // let params = new HttpParams();

    return this.http.post(`${url}/sitevisit.php`, formData);
  }
  upload(formData: any) {
    return this.http.post(`${url}/sitevisit.php`, formData);
  }
  getApprove() {
    let params = new HttpParams()
      .set('action', 'getApprove');
    return this.http.get(`${url}/sitevisit.php`, { params: params });
  }
  ckSw(swno: any) {
    let params = new HttpParams()
      .set('action', 'ckSw')
      .set('swno',swno);
    return this.http.get(`${url}/sitevisit.php`, { params: params });
  }
  updup(dupswno,swno: any) {
    let params = new HttpParams()
      .set('action', 'updup')
      .set('swno', swno)
      .set('dupswno',dupswno);
    return this.http.get(`${url}/sitevisit.php`, { params: params });
  }
  del(sw_no: any, level: any, filedoc) {
    let params = new HttpParams()
      .set('action', 'del')
      .set('sw_no', sw_no)
      .set('level', level)
      .set('filedoc', filedoc);
    return this.http.get(`${url}/sitevisit.php`, { params: params });
  }
  update(sw_no: any,level: any, detail: any,remark:any) {
    let params = new HttpParams()
      .set('action', 'update')
      .set('sw_no',sw_no)
      .set('detail', detail)
      .set('remark',remark)
      .set('level', level);
    return this.http.get(`${url}/sitevisit.php`, { params: params });
  }
  approve(sw_no:any,level:any) {
    let params = new HttpParams()
      .set('action', 'approve')
      .set('sw_no',sw_no)
      .set('level', level);
    return this.http.get(`${url}/sitevisit.php`, { params: params });
  }
  noapprove(sw_no: any, level: any) {
    let params = new HttpParams()
      .set('action', 'noapprove')
      .set('sw_no', sw_no)
      .set('level', level);
    return this.http.get(`${url}/sitevisit.php`, { params: params });
  }
  getData(start = '', end = '', status = '', sort = '', order = '', page?: any, pageSize?: any, region?: any,probgid?:any,problemsubid?:any) {
    let params = new HttpParams()
      .set('action', 'getData')
      .set('start', start)
      .set('end', end)
      .set('status', status)
      .set('sort', sort)
      .set('order', order)
      .set('page', page)
      .set('pageSize', pageSize)
      .set('region', region)
      .set('probgid', probgid)
      .set('problemsubid',problemsubid);
    return this.http.get(`${url}/sitevisit.php`, { params: params });
  }
  getSwdetail(sw_no: any) {
    let params = new HttpParams()
      .set('action', 'getSwdetail')
      .set('sw_no', sw_no);
    return this.http.get(`${url}/sitevisit.php`, { params: params });
  }
  sendBug(sw_no:any) {
    let params = new HttpParams()
      .set('action', 'sendBug')
      .set('sw_no', sw_no);
    return this.http.get(`${url}/sitevisit.php`, { params: params });
  }
  sendDup(sw_no:any) {
    let params = new HttpParams()
      .set('action', 'sendDup')
      .set('sw_no', sw_no);
    return this.http.get(`${url}/sitevisit.php`, { params: params });
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
