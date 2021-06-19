import {Component, OnInit} from '@angular/core';
import {OktaAuthService} from '@okta/okta-angular';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';

import sampleConfig from '../app.config';
import {sample} from 'rxjs/operators';

// import *  as $ from 'jquery';
@Component({
  selector: 'app-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./left-menu.component.scss']
})
export class LeftMenuComponent implements OnInit {
  sectionName = 'Reports';
  sideBarToggle = true;
  userName: string;

  constructor(private oktaAuth: OktaAuthService, private router: Router, private http: HttpClient) {

  }

  async ngOnInit(): Promise<void> {
    // $(document).ready(function(){$(".sidebar-tab").on("click",function(){$("#sidebar").toggleClass("active")})});


    const accessToken = await this.oktaAuth.getAccessToken();
    this.http.get(`${sampleConfig.oidc.issuer}/v1/userinfo`, {
      headers: {
        Authorization: 'Bearer ' + accessToken,
      }
    }).subscribe((data: any) => {
      this.userName = data.userinfo;
    }, (err) => {
      console.error(err);
    });
  }

  setSection(section: string): void {
    this.sectionName = section;
  }

  setToggle(): void {
    this.sideBarToggle = !this.sideBarToggle;
  }

  async logout(): Promise<void> {
    // Terminates the session with Okta and removes current tokens.
    await this.oktaAuth.signOut();
    await this.router.navigateByUrl('/login');
  }

}
