import { Routes } from "@angular/router";
import { matchAll } from "./utils";
import { Content, Signin, ContentList, NotFound } from "./layout";

export default [
  {
    path: 'signin-github',
    component: Signin
  },
  {
    path: 'toc',
    children: [
      {
        matcher: matchAll('path'),
        component: ContentList,
      }
    ]
  },
  {
    path: 'content',
    children: [
      {
        matcher: matchAll('path'),
        component: Content,
      }
    ]
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/toc'
  },
  {
    path: '**',
    component: NotFound
  }
] as Routes;
