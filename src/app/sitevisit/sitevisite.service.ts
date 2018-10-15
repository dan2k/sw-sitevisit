
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
  getData(start='',end='',status='',sort='',order='',page?:any,pageSize?:any) {
    let params = new HttpParams()
      .set('action', 'getData2')
      .set('start', start)
      .set('end', end)
      .set('status', status)
      .set('sort', sort)
      .set('order', order)
      .set('page', page)
      .set('pageSize',pageSize);
    return this.http.get(`${url}/sitevisit.php`, { params: params });
  }
}
