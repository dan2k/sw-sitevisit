export interface  SitevisiteModel {
  sw_no?: string;
  sw_add_date?: string;
  sw_province_id?: string;
  cust_ptype?: string;
  cust_pcode?: string;
  sw_detail?: string;
  sw_user_id?: string;
  sw_user_tel?: string;
  sw_suggestion?: string;
  sw_rg_remark?: string;
  sw_center_remark?: string;
};
export interface ProvinceModel{
  province_id?: number;
  province_name?: string;
  section_id?: number;
}
export interface CustptypeModel{
  cust_ptype?: string;
  cust_desc?: string;
}
export interface CustpcodeModel{
  cust_pcode?: string;
  cust_pdesc?: string;
}
export interface ProblemgroupModel{
  prob_gid?: string;
  prob_gdesc?: string;
}
export interface ProblemsubModel{
  problem_sub_id?: string;
  problem_sub_desc?: string;
}
export interface UserModel{
  user_id?: string;
  thiname?: string;
}
