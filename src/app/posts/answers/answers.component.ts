import { Component, OnInit, Input } from '@angular/core';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-answers',
  templateUrl: './answers.component.html',
  styleUrls: ['./answers.component.css']
})
export class AnswersComponent implements OnInit {
  @Input() slug: string;
  public loading: Boolean = true;
  public answers: Array<any> = ['loading', 'loading', 'loading'];

  constructor(public _postService: PostsService) { }

  ngOnInit() {
    this.getAnswers(this.slug);
    this.listenToNewAnswerChanges();
  }

  getAnswers(slug) {
    this._postService.getAnswers(slug).subscribe(res => {
      this.loading = false;
      this.answers = res.answers;
    }, err => {

    });
  }

  listenToNewAnswerChanges() {
    this._postService.currenetAddedAnswer.subscribe(answer => {
      this.answers.unshift(answer);
    });
  }

}
