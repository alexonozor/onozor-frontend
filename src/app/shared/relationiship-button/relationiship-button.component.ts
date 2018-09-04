import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../../authentication/auth.service';
import { UserService } from '../../users/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-relationiship-button',
  templateUrl: './relationiship-button.component.html',
  styleUrls: ['./relationiship-button.component.scss']
})

export class RelationishipButtonComponent implements OnInit {
  currentUser: any;
  @Input() user: any;

  constructor(
    private _userService: UserService,
    private snackBar: MatSnackBar,
    public auth: AuthService,
  ) {
    this.currentUser = this.auth.getCurrentUser();
  }

  follow(user) {
    user.following = true;
    this._userService.follow(user.id).subscribe(res => {
      if (res === 200) {
        this.snackBar.open(res.message, null,  { duration: 2000 });
      } else {
        this.snackBar.open(res.message, null,  { duration: 2000 });
      }
    }, err => {
      this.snackBar.open('server error', null,  { duration: 2000 });
    });
  }

  following(user) {
    user.following = false;
    this._userService.unFollow(user.id).subscribe(res => {
      if (res === 200) {
        this.snackBar.open(res.message, null,  { duration: 2000 });
      } else {
        this.snackBar.open(res.message, null,  { duration: 2000 });
      }
    }, err => {
      this.snackBar.open('server error', null,  { duration: 2000 });
    });
  }

  ngOnInit() {
  }

}
