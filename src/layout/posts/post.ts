import { Component, Input, OnInit } from '@angular/core';
import { GitIssueComment } from '../../features';

@Component({
  selector: 'post',
  standalone: true,
  template: ``
})

export class PostComponent implements OnInit {
  @Input() src: GitIssueComment | undefined;
  constructor() { }

  ngOnInit() { }
}
