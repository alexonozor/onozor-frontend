import { Component, OnInit, Input } from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-share-post',
  templateUrl: './share-post.component.html',
  styleUrls: ['./share-post.component.css']
})
export class SharePostComponent implements OnInit {
  @Input() title: string;
  @Input() postUrL: string;
  @Input() postType: string;
  shares: Array<any> = [];
  constructor() { }


  ngOnInit() {
    this.shares = [
      { name: 'reddit', icon: 'fab fa-reddit',
        link: `http://www.reddit.com/submit?url=${environment.rootUrl + this.postUrL}&title=${this.title}` },
      { name: 'twitter', icon: 'fab fa-twitter',
        link: `https://twitter.com/share?url=${environment.rootUrl + this.postUrL}&text=${this.title}`  },
      { name: 'google', icon: 'fab fa-google-plus',
        link: `https://plus.google.com/share?url=${environment.rootUrl + this.postUrL}` },
      { name: 'linkedin', icon: 'fab fa-linkedin',
        link: `https://www.linkedin.com/cws/share?url=${environment.rootUrl + this.postUrL}` },
      { name: 'facebook', icon: 'fab fa-facebook',
        link: `https://www.facebook.com/dialog/share?app_id=1339902019477534&href=${environment.rootUrl +
        this.postUrL}&redirect_uri=${environment.rootUrl + this.postUrL}`},
      { name: 'whatsapp', icon: 'fab fa-whatsapp',
        link: `https://api.whatsapp.com/send?text=${this.title} ${environment.rootUrl + this.postUrL}`},
      { name: 'y-combinator', icon: 'fab fa-y-combinator',
        link: `https://news.ycombinator.com/submitlink?u=${environment.rootUrl + this.postUrL}&t=${this.title}`}
    ];
  }

}
