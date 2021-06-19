import {Component, OnInit} from '@angular/core';
import {OktaAuthService} from '@okta/okta-angular';
import {HttpClient} from '@angular/common/http';

import sampleConfig from '../app.config';

interface Message {
  date: string;
  text: string;
}

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {
  title = 'moh titles';
  titles = ['title0', 'title1', 'title2'];
  failed: boolean;
  messages: Array<Message> [];

  constructor(public oktaAuth: OktaAuthService, private http: HttpClient) {
    this.messages = [];
  }

  async ngOnInit() {
    const accessToken = await this.oktaAuth.getAccessToken();
    this.http.get(sampleConfig.resourceServer.messagesUrl, {
      headers: {
        Authorization: 'Bearer ' + accessToken,
      }
    }).subscribe((data: any) => {
      let index = 1;
      const messages = data.messages.map((message) => {
        const date = new Date(message.date);
        const day = date.toLocaleDateString();
        const time = date.toLocaleTimeString();
        return {
          date: `${day} ${time}`,
          text: message.text,
          index: index++
        };
      });
      [].push.apply(this.messages, messages);
    }, (err) => {
      console.error(err);
      this.failed = true;
    });
  }

}
