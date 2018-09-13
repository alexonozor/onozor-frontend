import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-errors',
  templateUrl: './errors.component.html',
  styleUrls: ['./errors.component.scss']
})
export class ErrorsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

@Component({
  selector: 'app-404',
  templateUrl: './404.html',
  styleUrls: ['./errors.component.scss']
})
export class Errors404Component implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}


@Component({
  selector: 'app-connection',
  templateUrl: './connection.html',
  styleUrls: ['./errors.component.scss']
})
export class ErrorsInternetConnectionComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
