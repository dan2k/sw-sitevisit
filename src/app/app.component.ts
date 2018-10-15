import { MediaMatcher } from "@angular/cdk/layout";
import { ChangeDetectorRef, Component, OnDestroy } from "@angular/core";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnDestroy {
  mobileQuery: MediaQueryList;
  title = "SW Site Visit";
  fillerNav = [
    { title: 'หน้าหลัก', link: 'main',icon:'home' },
    { title: 'บันทึกข้อเสนอแนะโปรแกรม', link: "add",icon:'add_box' },
    { title: 'รายงาน',link:'report',icon:'reorder'}
  ]
  private _mobileQueryListener: () => void;
  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia("(max-width: 600px)");
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}
