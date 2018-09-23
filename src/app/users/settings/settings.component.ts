import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';
import { Location } from '@angular/common';
import { AuthService } from '../../authentication/auth.service';
import { environment } from '../../../environments/environment';
import { MatSnackBar } from '@angular/material';


import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  userInfo: FormGroup;
  userSocialInfo: FormGroup;
  currentUser: any;
  user: any;
  updating: Boolean = false;
  profileNavLink: Array<any>;
  imageWasChange: Boolean = false;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private activatedRoute: ActivatedRoute,
    public router: Router,
    public location: Location,
    private _userService: UserService,
    public auth: AuthService,
    private fb: FormBuilder,
    public snackBar: MatSnackBar
  ) {
    this.currentUser = this.auth.getCurrentUser();
  }

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  ngOnInit() {
    this.prepareForm();
  }

  navigateToSettings() {
    this.router.navigate(['users/settings']);
  }

  prepareForm() {
    this.userInfo = this.fb.group({
      avatar: [''],
      cover_photo: [],
      username: [this.currentUser.username, [Validators.required]],
      first_name: [this.currentUser.first_name, [Validators.required]],
      last_name: [this.currentUser.last_name, [Validators.required]],
      location: [this.currentUser.location, [Validators.required]],
      bio: [this.currentUser.bio, [Validators.required]],
      facebook_url: [this.currentUser.facebook_url],
      twitter_url: [this.currentUser.twitter_url],
      personal_website: [this.currentUser.personal_website],
    });
  }



  onFileChange(event) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageWasChange = true;
        this.userInfo.patchValue({
          avatar: file
        });
      };
    }
  }

  onFileChangeCoverPhoto(event) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
        console.log(file);
        this.imageWasChange = true;
        this.userInfo.patchValue({
          cover_photo: file
        });
      };
    }
  }

  selectAvatar(avatarElement) {
    avatarElement.click();
  }

  selectAddPhoto(coverPhotoElement) {
    coverPhotoElement.click();
  }

  submitForm(form) {
    this.updating = true;
    const params = (form === 'userInfo') ? this.userInfo.value : this.userSocialInfo.value;
    const formdata = new FormData();
    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        formdata.append(key, params[key]);
      }
    }

    this._userService.updateUser(formdata, this.currentUser.id).subscribe(res => {
      if (res.status === 200) {
        this.updating = false;
        this.currentUser = res.user;
        this.auth.encrypt(res.user, environment.encriptionKey, 'currentUser');
        this.snackBar.open('updated', null, {
          duration: 2000,
        });
      }
    }, err => {
      this.updating = false;
    });
  }

  closeSettings() {
    this.location.back();
  }
}
