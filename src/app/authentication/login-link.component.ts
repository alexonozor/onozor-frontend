import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Location } from '@angular/common';
import { NzMessageService, NzNotificationService } from 'ng-zorro-antd';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-login-link',
  templateUrl: './login-link.component.html',
  styleUrls: ['./login-link.component.scss']
})
export class LoginLinkComponent implements OnInit {
  public loginToken: string;
  @Output() notifyLogin: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
    public auth: AuthService,
    private route: ActivatedRoute,
    public router: Router,
    public location: Location,
    public notification: NzNotificationService,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.loginToken = params['token'];
      this.findUser(this.loginToken);
    });
  }

  findUser(loginToken) {
    this.auth.getUser(loginToken).subscribe(res => {
      if (res.success && res.status === 200) {
          localStorage.setItem('accessToken', res.access_token);
          this.auth.encrypt(res.user, environment.encriptionKey, 'currentUser');
          this.auth.isCurrentUser();
          this.router.navigate(['/']);
      } else if (res.status === 203) { // expired token.
          this.router.navigate(['/']);
          this.notification.create('Error', 'Expired', res.message);
      }
    }, err => {
      throw err;
    });
  }
}


