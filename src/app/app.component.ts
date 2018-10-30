import { Router,ActivatedRoute,NavigationEnd } from '@angular/router';
import { MediaMatcher } from "@angular/cdk/layout";
import { ChangeDetectorRef, Component, OnDestroy } from "@angular/core";
import { AuthService } from './auth.service';
import { HOST } from './config';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnDestroy {
  mobileQuery: MediaQueryList;
  title = "SW Site Visit";
  user: any = {};
  level: any = [];
  activeUrl: any;
  private _mobileQueryListener: () => void;
  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private service: AuthService,public router:Router,activatedRoute:ActivatedRoute) {
    this.router.events.subscribe(
      (event: any) => {
        if (event instanceof NavigationEnd) {
          this.activeUrl = this.router.url.split('/')[1];
          console.log('this.router.url', this.router.url);
        }
      }
    );
    this.service.getAuth().subscribe((data: any) => {
      if (data.status) {
        localStorage.removeItem('sitevisitProfile');
        localStorage.setItem('sitevisitProfile', JSON.stringify(data.data));
        this.user = data.data;
        this.level = data.data.level;
      } else {
        location.href = `http://${HOST}/mpsicc`;
      }
    });
    this.mobileQuery = media.matchMedia("(max-width: 600px)");
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}
