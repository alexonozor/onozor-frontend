(window.webpackJsonp=window.webpackJsonp||[]).push([[1],{"8/VF":function(l,n,t){"use strict";t.r(n);var u=t("CcnG"),a=function(){},i=t("pMnS"),o=t("bujt"),e=t("UodH"),c=t("dWZg"),r=t("lLAP"),s=t("wFw1"),b=t("lzlj"),m=t("FVSy"),d=t("21Lb"),p=t("OzfB"),f=t("ZYCi"),g=t("Ip0R"),h=t("dU8u"),y=t("Mr+X"),k=t("SMsm"),x=t("6UMx"),v=t("0/Q6"),S=t("Wf4p"),R=t("TtEo"),C=t("LC5p"),_=t("es08"),O=t("foMF"),w=t("vGXY"),M=t("67Y/"),L=t("W4xs"),A=t("AytR"),P=t("t/Na"),I=function(){function l(l){this.http=l,this.host=A.a.baseUrl,this.version=A.a.version1}return l.prototype.getCommunities=function(l){return void 0===l&&(l=1),this.http.get(this.host+"/"+this.version+"/categories?page="+l).pipe(Object(M.a)(function(l){return l}))},l.prototype.getCommunity=function(l){return this.http.get(this.host+"/"+this.version+"/categories/"+l).pipe(Object(M.a)(function(l){return l}))},l.prototype.getCommunityQuestions=function(l,n){return void 0===n&&(n=1),this.http.get(this.host+"/"+this.version+"/categories/"+l+"/get_questions?page="+n).pipe(Object(M.a)(function(l){return l}))},l.prototype.subscribe=function(l){return this.http.post(this.host+"/"+this.version+"/subscribe/communities",{category_id:l.id}).pipe(Object(M.a)(function(l){return l}))},l.prototype.unsubscribe=function(l){return this.http.delete(this.host+"/"+this.version+"/unsubscribe/communities/"+l.id).pipe(Object(M.a)(function(l){return l}))},l.ngInjectableDef=u.U({factory:function(){return new l(u.Y(P.c))},token:l,providedIn:"root"}),l}(),B=function(){function l(l,n,t,u,a,i,o){this.breakpointObserver=l,this.activatedRoute=n,this.router=t,this.location=u,this.auth=a,this.communityService=i,this.snackBar=o,this.componentName="communities",this.loading=!1,this.loadingcommunities=!0,this.isHandset$=this.breakpointObserver.observe(w.b.Handset).pipe(Object(M.a)(function(l){return l.matches})),this.currentUser=this.auth.getCurrentUser()}return l.prototype.ngOnInit=function(){this.getCommunities()},l.prototype.getCommunities=function(){var l=this;this.activatedRoute.data.pipe(Object(M.a)(function(l){return l.communities})).subscribe(function(n){l.loading=!1,l.loadingcommunities=!1,l.meta=n.meta,l.communities=n.categories},function(l){console.log(l)})},l.prototype.onScroll=function(l){var n=this;if(l&&this.meta.total_page!==l){if(this.loadingcommunities)return;this.loadingcommunities=!0,this.communityService.getCommunities(l).subscribe(function(l){n.loadingcommunities=!1,n.meta=l.meta,l.categories.map(function(l){n.communities.push(l)})},function(l){})}},l.prototype.unsubscribe=function(l){var n=this;l.subscribe=!1,this.communityService.unsubscribe(l).subscribe(function(l){n.snackBar.open(200===l.status?l.message:l.errors,null,{duration:2e3})},function(l){n.snackBar.open("server error",null,{duration:2e3})})},l.prototype.subscribe=function(l){var n=this;l.subscribe=!0,this.communityService.subscribe(l).subscribe(function(l){n.snackBar.open(200===l.status?l.message:l.errors,null,{duration:2e3})},function(l){n.snackBar.open("server error",null,{duration:2e3})})},l}(),Q=t("vARd"),F=u.Qa({encapsulation:0,styles:[[".margin-top2[_ngcontent-%COMP%]{margin-top:66px;padding:20px}.mat-card-title[_ngcontent-%COMP%]{display:block;margin-bottom:8px}.mat-card-title[_ngcontent-%COMP%]   small[_ngcontent-%COMP%]{font-weight:400}.dim-text[_ngcontent-%COMP%]{color:#696969}.mat-card-header-text[_ngcontent-%COMP%]{margin:10px 8px}.description[_ngcontent-%COMP%]{height:150px;margin:10px 0}.mat-card-header[_ngcontent-%COMP%]{display:flex;flex-direction:row;align-items:center}.mat-button-wrapper[_ngcontent-%COMP%]{font-size:15px!important}"]],data:{}});function $(l){return u.mb(0,[(l()(),u.Sa(0,0,null,null,2,"button",[["color","primary"],["mat-raised-button",""]],[[8,"disabled",0],[2,"_mat-animation-noopable",null]],[[null,"click"]],function(l,n,t){var u=!0;return"click"===n&&(u=!1!==l.component.subscribe(l.parent.context.$implicit)&&u),u},o.d,o.b)),u.Ra(1,180224,null,0,e.b,[u.k,c.a,r.f,[2,s.a]],{color:[0,"color"]},null),(l()(),u.kb(-1,0,["SUBSCRIBE"]))],function(l,n){l(n,1,0,"primary")},function(l,n){l(n,0,0,u.cb(n,1).disabled||null,"NoopAnimations"===u.cb(n,1)._animationMode)})}function z(l){return u.mb(0,[(l()(),u.Sa(0,0,null,null,2,"button",[["color","warn"],["mat-raised-button",""]],[[8,"disabled",0],[2,"_mat-animation-noopable",null]],[[null,"click"]],function(l,n,t){var u=!0;return"click"===n&&(u=!1!==l.component.unsubscribe(l.parent.context.$implicit)&&u),u},o.d,o.b)),u.Ra(1,180224,null,0,e.b,[u.k,c.a,r.f,[2,s.a]],{color:[0,"color"]},null),(l()(),u.kb(-1,0,["UNSUBSCRIBE"]))],function(l,n){l(n,1,0,"warn")},function(l,n){l(n,0,0,u.cb(n,1).disabled||null,"NoopAnimations"===u.cb(n,1)._animationMode)})}function j(l){return u.mb(0,[(l()(),u.Sa(0,0,null,null,43,"mat-card",[["class","card mat-card"],["fxFlex","30%"],["style","margin-bottom: 30px;"]],null,null,null,b.d,b.a)),u.Ra(1,49152,null,0,m.a,[],null,null),u.Ra(2,737280,null,0,d.b,[p.h,u.k,[3,d.g],p.l,p.f],{flex:[0,"flex"]},null),(l()(),u.Sa(3,0,null,0,10,"mat-card-header",[["class","mat-card-header"]],null,[[null,"click"]],function(l,n,t){var a=!0;return"click"===n&&(a=!1!==u.cb(l,4).onClick()&&a),a},b.c,b.b)),u.Ra(4,16384,null,0,f.p,[f.o,f.a,[8,null],u.D,u.k],{routerLink:[0,"routerLink"]},null),u.db(5,2),u.Ra(6,49152,null,0,m.e,[],null,null),(l()(),u.Sa(7,0,null,0,3,"div",[["class","mat-card-avatar"],["mat-card-avatar",""]],null,null,null,null,null)),u.Ra(8,278528,null,0,g.p,[u.s,u.k,u.D],{ngStyle:[0,"ngStyle"]},null),u.fb(9,{"background-image":0,"background-size":1}),u.Ra(10,16384,null,0,m.c,[],null,null),(l()(),u.Sa(11,0,null,1,2,"mat-card-title",[["class","mat-card-title"]],null,null,null,null,null)),u.Ra(12,16384,null,0,m.i,[],null,null),(l()(),u.kb(13,null,["",""])),(l()(),u.Sa(14,0,null,0,3,"mat-card-content",[["class","description mat-card-content"]],null,null,null,null,null)),u.Ra(15,16384,null,0,m.d,[],null,null),(l()(),u.Sa(16,0,null,null,1,"p",[],null,null,null,null,null)),(l()(),u.kb(17,null,[" "," "])),(l()(),u.Sa(18,0,null,0,18,"div",[["fxLayout","row"],["fxLayoutAlign","space-around center"]],null,[[null,"click"]],function(l,n,t){var a=!0;return"click"===n&&(a=!1!==u.cb(l,19).onClick()&&a),a},null,null)),u.Ra(19,16384,null,0,f.p,[f.o,f.a,[8,null],u.D,u.k],{routerLink:[0,"routerLink"]},null),u.db(20,2),u.Ra(21,737280,null,0,d.g,[p.h,u.k,p.l],{layout:[0,"layout"]},null),u.Ra(22,737280,null,0,d.f,[p.h,u.k,[6,d.g],p.l],{align:[0,"align"]},null),(l()(),u.Sa(23,0,null,null,6,"h3",[["fxLayout","column"],["fxLayoutAlign","center center"]],null,null,null,null,null)),u.Ra(24,737280,null,0,d.g,[p.h,u.k,p.l],{layout:[0,"layout"]},null),u.Ra(25,737280,null,0,d.f,[p.h,u.k,[6,d.g],p.l],{align:[0,"align"]},null),(l()(),u.Sa(26,0,null,null,1,"span",[],null,null,null,null,null)),(l()(),u.kb(27,null,["",""])),(l()(),u.Sa(28,0,null,null,1,"small",[["class","dim-text"]],null,null,null,null,null)),(l()(),u.kb(-1,null,["POSTS"])),(l()(),u.Sa(30,0,null,null,6,"h3",[["fxLayout","column"],["fxLayoutAlign","center center"]],null,null,null,null,null)),u.Ra(31,737280,null,0,d.g,[p.h,u.k,p.l],{layout:[0,"layout"]},null),u.Ra(32,737280,null,0,d.f,[p.h,u.k,[6,d.g],p.l],{align:[0,"align"]},null),(l()(),u.Sa(33,0,null,null,1,"span",[],null,null,null,null,null)),(l()(),u.kb(34,null,["",""])),(l()(),u.Sa(35,0,null,null,1,"small",[["class","dim-text"]],null,null,null,null,null)),(l()(),u.kb(-1,null,["SUBSCRIBERS"])),(l()(),u.Sa(37,0,null,0,6,"div",[["fxLayout","column"],["fxLayoutAlign","space-around center"]],null,null,null,null,null)),u.Ra(38,737280,null,0,d.g,[p.h,u.k,p.l],{layout:[0,"layout"]},null),u.Ra(39,737280,null,0,d.f,[p.h,u.k,[6,d.g],p.l],{align:[0,"align"]},null),(l()(),u.Ja(16777216,null,null,1,null,$)),u.Ra(41,16384,null,0,g.m,[u.Q,u.M],{ngIf:[0,"ngIf"]},null),(l()(),u.Ja(16777216,null,null,1,null,z)),u.Ra(43,16384,null,0,g.m,[u.Q,u.M],{ngIf:[0,"ngIf"]},null)],function(l,n){l(n,2,0,"30%"),l(n,4,0,l(n,5,0,"/communities",n.context.$implicit.slug)),l(n,8,0,l(n,9,0,"url("+n.context.$implicit.image+")","cover")),l(n,19,0,l(n,20,0,"/communities",n.context.$implicit.slug)),l(n,21,0,"row"),l(n,22,0,"space-around center"),l(n,24,0,"column"),l(n,25,0,"center center"),l(n,31,0,"column"),l(n,32,0,"center center"),l(n,38,0,"column"),l(n,39,0,"space-around center"),l(n,41,0,!n.context.$implicit.subscribe),l(n,43,0,n.context.$implicit.subscribe)},function(l,n){l(n,13,0,n.context.$implicit.name),l(n,17,0,n.context.$implicit.description),l(n,27,0,n.context.$implicit.question_count),l(n,34,0,n.context.$implicit.subscribers_count)})}function D(l){return u.mb(0,[(l()(),u.Sa(0,0,null,null,16,"div",[["fxFlex","50%"],["fxLayout","column"],["infiniteScroll",""],["style","margin-top: 60px;"]],null,[[null,"scrolled"]],function(l,n,t){var u=!0,a=l.component;return"scrolled"===n&&(u=!1!==a.onScroll(null==a.meta?null:a.meta.next_page)&&u),u},null,null)),u.Ra(1,278528,null,0,g.k,[u.r,u.s,u.k,u.D],{ngClass:[0,"ngClass"]},null),u.eb(131072,g.b,[u.h]),u.Ra(3,737280,null,0,d.g,[p.h,u.k,p.l],{layout:[0,"layout"]},null),u.Ra(4,737280,null,0,d.b,[p.h,u.k,[3,d.g],p.l,p.f],{flex:[0,"flex"]},null),u.Ra(5,4866048,null,0,h.a,[u.k,u.y],{infiniteScrollDistance:[0,"infiniteScrollDistance"],infiniteScrollThrottle:[1,"infiniteScrollThrottle"]},{scrolled:"scrolled"}),(l()(),u.Sa(6,0,null,null,5,"mat-card",[["class","mat-card"],["style","margin-bottom: 30px;"]],null,null,null,b.d,b.a)),u.Ra(7,49152,null,0,m.a,[],null,null),(l()(),u.Sa(8,0,null,0,1,"h1",[],null,null,null,null,null)),(l()(),u.kb(-1,null,["Explore Communities"])),(l()(),u.Sa(10,0,null,0,1,"p",[],null,null,null,null,null)),(l()(),u.kb(-1,null,["Browse and follow communities you care about "])),(l()(),u.Sa(12,0,null,null,4,"div",[["fxLayout","row wrap"],["fxLayoutAlign","space-between start"]],null,null,null,null,null)),u.Ra(13,737280,null,0,d.g,[p.h,u.k,p.l],{layout:[0,"layout"]},null),u.Ra(14,737280,null,0,d.f,[p.h,u.k,[6,d.g],p.l],{align:[0,"align"]},null),(l()(),u.Ja(16777216,null,null,1,null,j)),u.Ra(16,802816,null,0,g.l,[u.Q,u.M,u.r],{ngForOf:[0,"ngForOf"]},null)],function(l,n){var t=n.component;l(n,1,0,u.lb(n,1,0,u.cb(n,2).transform(t.isHandset$))?"ball":"margin-top2"),l(n,3,0,"column"),l(n,4,0,"50%"),l(n,5,0,5,50),l(n,13,0,"row wrap"),l(n,14,0,"space-between start"),l(n,16,0,t.communities)},null)}function U(l){return u.mb(0,[(l()(),u.Sa(0,0,null,null,4,"button",[["color","primary"],["mat-icon-button",""]],[[8,"disabled",0],[2,"_mat-animation-noopable",null]],[[null,"click"]],function(l,n,t){var u=!0;return"click"===n&&(u=!1!==l.component.subscribe(l.parent.context.$implicit)&&u),u},o.d,o.b)),u.Ra(1,180224,null,0,e.b,[u.k,c.a,r.f,[2,s.a]],{color:[0,"color"]},null),(l()(),u.Sa(2,0,null,0,2,"mat-icon",[["aria-label","Example icon-button with a heart icon"],["class","mat-icon"],["role","img"]],[[2,"mat-icon-inline",null]],null,null,y.b,y.a)),u.Ra(3,638976,null,0,k.a,[u.k,k.c,[8,null]],null,null),(l()(),u.kb(-1,0,["add"]))],function(l,n){l(n,1,0,"primary"),l(n,3,0)},function(l,n){l(n,0,0,u.cb(n,1).disabled||null,"NoopAnimations"===u.cb(n,1)._animationMode),l(n,2,0,u.cb(n,3).inline)})}function J(l){return u.mb(0,[(l()(),u.Sa(0,0,null,null,4,"button",[["color","warn"],["mat-icon-button",""]],[[8,"disabled",0],[2,"_mat-animation-noopable",null]],[[null,"click"]],function(l,n,t){var u=!0;return"click"===n&&(u=!1!==l.component.unsubscribe(l.parent.context.$implicit)&&u),u},o.d,o.b)),u.Ra(1,180224,null,0,e.b,[u.k,c.a,r.f,[2,s.a]],{color:[0,"color"]},null),(l()(),u.Sa(2,0,null,0,2,"mat-icon",[["aria-label","Example icon-button with a heart icon"],["class","mat-icon"],["role","img"]],[[2,"mat-icon-inline",null]],null,null,y.b,y.a)),u.Ra(3,638976,null,0,k.a,[u.k,k.c,[8,null]],null,null),(l()(),u.kb(-1,0,["remove"]))],function(l,n){l(n,1,0,"warn"),l(n,3,0)},function(l,n){l(n,0,0,u.cb(n,1).disabled||null,"NoopAnimations"===u.cb(n,1)._animationMode),l(n,2,0,u.cb(n,3).inline)})}function N(l){return u.mb(0,[(l()(),u.Sa(0,0,null,null,20,"mat-list-item",[["class","mat-list-item"],["infiniteScroll",""]],[[2,"mat-list-item-avatar",null],[2,"mat-list-item-with-avatar",null]],[[null,"scrolled"],[null,"focus"],[null,"blur"]],function(l,n,t){var a=!0,i=l.component;return"focus"===n&&(a=!1!==u.cb(l,1)._handleFocus()&&a),"blur"===n&&(a=!1!==u.cb(l,1)._handleBlur()&&a),"scrolled"===n&&(a=!1!==i.onScroll(null==i.meta?null:i.meta.next_page)&&a),a},x.d,x.b)),u.Ra(1,1097728,null,3,v.c,[u.k,[2,v.f]],null,null),u.ib(603979776,1,{_lines:1}),u.ib(335544320,2,{_avatar:0}),u.ib(335544320,3,{_icon:0}),u.Ra(5,4866048,null,0,h.a,[u.k,u.y],{infiniteScrollDistance:[0,"infiniteScrollDistance"],infiniteScrollThrottle:[1,"infiniteScrollThrottle"]},{scrolled:"scrolled"}),(l()(),u.Sa(6,0,null,0,3,"img",[["alt","..."],["class","mat-list-avatar"],["matListAvatar",""]],[[8,"src",4]],[[null,"click"]],function(l,n,t){var a=!0;return"click"===n&&(a=!1!==u.cb(l,7).onClick()&&a),a},null,null)),u.Ra(7,16384,null,0,f.p,[f.o,f.a,[8,null],u.D,u.k],{routerLink:[0,"routerLink"]},null),u.db(8,2),u.Ra(9,16384,[[2,4]],0,v.b,[],null,null),(l()(),u.Sa(10,0,null,1,4,"h4",[["class","profile-card-title mat-line"],["matLine",""]],null,[[null,"click"]],function(l,n,t){var a=!0;return"click"===n&&(a=!1!==u.cb(l,11).onClick()&&a),a},null,null)),u.Ra(11,16384,null,0,f.p,[f.o,f.a,[8,null],u.D,u.k],{routerLink:[0,"routerLink"]},null),u.db(12,2),u.Ra(13,16384,[[1,4]],0,S.o,[],null,null),(l()(),u.kb(14,null,["",""])),(l()(),u.Sa(15,0,null,2,1,"mat-divider",[["class","mat-divider"],["role","separator"]],[[1,"aria-orientation",0],[2,"mat-divider-vertical",null],[2,"mat-divider-horizontal",null],[2,"mat-divider-inset",null]],null,null,R.b,R.a)),u.Ra(16,49152,null,0,C.a,[],null,null),(l()(),u.Ja(16777216,null,2,1,null,U)),u.Ra(18,16384,null,0,g.m,[u.Q,u.M],{ngIf:[0,"ngIf"]},null),(l()(),u.Ja(16777216,null,2,1,null,J)),u.Ra(20,16384,null,0,g.m,[u.Q,u.M],{ngIf:[0,"ngIf"]},null)],function(l,n){l(n,5,0,5,50),l(n,7,0,l(n,8,0,"/communities",n.context.$implicit.slug)),l(n,11,0,l(n,12,0,"/communities",n.context.$implicit.slug)),l(n,18,0,!n.context.$implicit.subscribe),l(n,20,0,n.context.$implicit.subscribe)},function(l,n){l(n,0,0,u.cb(n,1)._avatar||u.cb(n,1)._icon,u.cb(n,1)._avatar||u.cb(n,1)._icon),l(n,6,0,n.context.$implicit.image),l(n,14,0,n.context.$implicit.name),l(n,15,0,u.cb(n,16).vertical?"vertical":"horizontal",u.cb(n,16).vertical,!u.cb(n,16).vertical,u.cb(n,16).inset)})}function T(l){return u.mb(0,[(l()(),u.Sa(0,0,null,null,4,"span",[["fxFill",""],["fxLayout","column"]],null,null,null,null,null)),u.Ra(1,737280,null,0,d.g,[p.h,u.k,p.l],{layout:[0,"layout"]},null),u.Ra(2,737280,null,0,d.c,[p.h,u.k,p.l],null,null),(l()(),u.Sa(3,0,null,null,1,"bullet-list-content-loader",[["height","10"]],null,null,null,_.c,_.a)),u.Ra(4,49152,null,0,O.a,[],null,null)],function(l,n){l(n,1,0,"column"),l(n,2,0)},null)}function H(l){return u.mb(0,[(l()(),u.Sa(0,0,null,null,9,"mat-card",[["class","mat-card"],["style","margin-top: 85px;"]],null,null,null,b.d,b.a)),u.Ra(1,49152,null,0,m.a,[],null,null),(l()(),u.Sa(2,0,null,0,7,"mat-list",[["class","mat-list"],["fxLayout","column"],["fxLayoutAlign","start"]],null,null,null,x.e,x.a)),u.Ra(3,49152,null,0,v.a,[],null,null),u.Ra(4,737280,null,0,d.g,[p.h,u.k,p.l],{layout:[0,"layout"]},null),u.Ra(5,737280,null,0,d.f,[p.h,u.k,[6,d.g],p.l],{align:[0,"align"]},null),(l()(),u.Ja(16777216,null,0,1,null,N)),u.Ra(7,802816,null,0,g.l,[u.Q,u.M,u.r],{ngForOf:[0,"ngForOf"]},null),(l()(),u.Ja(16777216,null,0,1,null,T)),u.Ra(9,16384,null,0,g.m,[u.Q,u.M],{ngIf:[0,"ngIf"]},null)],function(l,n){var t=n.component;l(n,4,0,"column"),l(n,5,0,"start"),l(n,7,0,t.communities),l(n,9,0,(null==t.meta?null:t.meta.next_page)&&t.loadingUsers)},null)}function q(l){return u.mb(0,[(l()(),u.Ja(16777216,null,null,2,null,D)),u.Ra(1,16384,null,0,g.m,[u.Q,u.M],{ngIf:[0,"ngIf"]},null),u.eb(131072,g.b,[u.h]),(l()(),u.Ja(16777216,null,null,2,null,H)),u.Ra(4,16384,null,0,g.m,[u.Q,u.M],{ngIf:[0,"ngIf"]},null),u.eb(131072,g.b,[u.h])],function(l,n){var t=n.component;l(n,1,0,!u.lb(n,1,0,u.cb(n,2).transform(t.isHandset$))),l(n,4,0,u.lb(n,4,0,u.cb(n,5).transform(t.isHandset$)))},null)}var E=u.Oa("app-communities",B,function(l){return u.mb(0,[(l()(),u.Sa(0,0,null,null,1,"app-communities",[],null,null,null,q,F)),u.Ra(1,114688,null,0,B,[w.a,f.a,f.o,g.i,L.a,I,Q.b],null,null)],function(l,n){l(n,1,0)},null)},{},{},[]),G=t("oSkE"),V=t("lOvV"),Y=t("Am6z"),X=t("Fzqc"),Z=t("hUWP"),K=t("ZYjt"),W=function(){function l(l,n,t,u,a,i,o){this.breakpointObserver=l,this.activatedRoute=n,this.router=t,this.location=u,this.auth=a,this.communityService=i,this.snackBar=o,this.componentName="community",this.loading=!0,this.loadingcommunities=!0,this.posts=["loading","loading","loading","loading","loading"],this.loadingPosts=!1,this.loadingAnswer=!0,this.isHandset$=this.breakpointObserver.observe(w.b.Handset).pipe(Object(M.a)(function(l){return l.matches})),this.currentUser=this.auth.getCurrentUser()}return l.prototype.ngOnInit=function(){this.getCommunity()},l.prototype.getCommunity=function(){var l=this;this.activatedRoute.data.pipe(Object(M.a)(function(l){return l.community})).subscribe(function(n){l.community=n.category,l.getCommunityQuestions()},function(l){console.log(l)})},l.prototype.getCommunityQuestions=function(){var l=this;this.communityService.getCommunityQuestions(this.community.slug).subscribe(function(n){l.loading=!1,l.loadingPosts=!1,l.loadingAnswer=!1,l.meta=n.meta,l.posts=n.questions},function(l){console.log(l)})},l.prototype.unsubscribe=function(l){var n=this;l.subscribe=!1,this.communityService.unsubscribe(l).subscribe(function(l){n.snackBar.open(200===l.status?l.message:l.errors,null,{duration:2e3})},function(l){n.snackBar.open("server error",null,{duration:2e3})})},l.prototype.subscribe=function(l){var n=this;l.subscribe=!0,this.communityService.subscribe(l).subscribe(function(l){n.snackBar.open(200===l.status?l.message:l.errors,null,{duration:2e3})},function(l){n.snackBar.open("server error",null,{duration:2e3})})},l.prototype.onScroll=function(l){var n=this;if(l&&this.meta.total_page!==l){if(this.loadingAnswer)return;this.loadingAnswer=!0,this.communityService.getCommunityQuestions(this.community.slug,l).subscribe(function(l){n.loadingAnswer=!1,n.meta=l.meta,l.questions.map(function(l){n.posts.push(l)})},function(l){})}},l}(),ll=u.Qa({encapsulation:0,styles:[[".community-logo[_ngcontent-%COMP%]{display:block;width:200px;height:100px;margin-right:24px;border-radius:4px;overflow:hidden;background:#fff}.community-logo[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:100%;height:100%}.community-description[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{line-height:10px}.margin-top2[_ngcontent-%COMP%]{margin-top:66px;padding:20px}.tab-backgroundcolor[_ngcontent-%COMP%]{background-color:#fff;margin:0!important}.tab-backgroundcolor[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{text-decoration:none}"]],data:{}});function nl(l){return u.mb(0,[(l()(),u.Sa(0,0,null,null,2,"button",[["color","primary"],["mat-raised-button",""]],[[8,"disabled",0],[2,"_mat-animation-noopable",null]],[[null,"click"]],function(l,n,t){var u=!0,a=l.component;return"click"===n&&(u=!1!==a.subscribe(a.community)&&u),u},o.d,o.b)),u.Ra(1,180224,null,0,e.b,[u.k,c.a,r.f,[2,s.a]],{color:[0,"color"]},null),(l()(),u.kb(-1,0,["SUBSCRIBE"]))],function(l,n){l(n,1,0,"primary")},function(l,n){l(n,0,0,u.cb(n,1).disabled||null,"NoopAnimations"===u.cb(n,1)._animationMode)})}function tl(l){return u.mb(0,[(l()(),u.Sa(0,0,null,null,2,"button",[["color","warn"],["mat-raised-button",""]],[[8,"disabled",0],[2,"_mat-animation-noopable",null]],[[null,"click"]],function(l,n,t){var u=!0,a=l.component;return"click"===n&&(u=!1!==a.unsubscribe(a.community)&&u),u},o.d,o.b)),u.Ra(1,180224,null,0,e.b,[u.k,c.a,r.f,[2,s.a]],{color:[0,"color"]},null),(l()(),u.kb(-1,0,["UNSUBSCRIBE"]))],function(l,n){l(n,1,0,"warn")},function(l,n){l(n,0,0,u.cb(n,1).disabled||null,"NoopAnimations"===u.cb(n,1)._animationMode)})}function ul(l){return u.mb(0,[(l()(),u.Sa(0,0,null,null,2,"app-post-card",[["infiniteScroll",""],["style","margin-bottom: 20px"]],[[8,"hidden",0]],[[null,"scrolled"]],function(l,n,t){var u=!0,a=l.component;return"scrolled"===n&&(u=!1!==a.onScroll(null==a.meta?null:a.meta.next_page)&&u),u},G.b,G.a)),u.Ra(1,4866048,null,0,h.a,[u.k,u.y],{infiniteScrollDistance:[0,"infiniteScrollDistance"],infiniteScrollThrottle:[1,"infiniteScrollThrottle"]},{scrolled:"scrolled"}),u.Ra(2,114688,null,0,V.a,[w.a,Y.a,f.o],{feed:[0,"feed"],loading:[1,"loading"],meta:[2,"meta"]},null)],function(l,n){var t=n.component;l(n,1,0,5,50),l(n,2,0,n.context.$implicit,t.loading,t.meta)},function(l,n){l(n,0,0,n.component.loading)})}function al(l){return u.mb(0,[(l()(),u.Sa(0,0,null,null,4,"span",[["style","text-align: center"]],null,null,null,null,null)),(l()(),u.Sa(1,0,null,null,3,"mat-card",[["class","example-card mat-card"]],null,null,null,b.d,b.a)),u.Ra(2,49152,null,0,m.a,[],null,null),(l()(),u.Sa(3,0,null,0,1,"facebook-content-loader",[],null,null,null,_.d,_.b)),u.Ra(4,49152,null,0,O.d,[],null,null)],null,null)}function il(l){return u.mb(0,[(l()(),u.Sa(0,0,null,null,3,"mat-card",[["class","example-card mat-card"],["style","margin-bottom: 20px"]],[[8,"hidden",0]],null,null,b.d,b.a)),u.Ra(1,49152,null,0,m.a,[],null,null),(l()(),u.Sa(2,0,null,0,1,"facebook-content-loader",[],null,null,null,_.d,_.b)),u.Ra(3,49152,null,0,O.d,[],null,null)],null,function(l,n){l(n,0,0,!n.component.loading)})}function ol(l){return u.mb(0,[(l()(),u.Sa(0,0,null,null,38,"div",[["fxLayout","row"],["fxLayout.xs","column"],["fxLayoutGap","20px"],["style","margin-top: 66px;"]],null,null,null,null,null)),u.Ra(1,278528,null,0,g.k,[u.r,u.s,u.k,u.D],{ngClass:[0,"ngClass"]},null),u.eb(131072,g.b,[u.h]),u.Ra(3,737280,null,0,d.g,[p.h,u.k,p.l],{layout:[0,"layout"],layoutXs:[1,"layoutXs"]},null),u.Ra(4,1785856,null,0,d.h,[p.h,u.k,[6,d.g],u.y,X.b,p.l],{gap:[0,"gap"]},null),(l()(),u.Sa(5,0,null,null,33,"div",[["fxFlex","45"],["fxLayout","column"],["fxLayoutGap","30px"]],null,null,null,null,null)),u.Ra(6,737280,null,0,d.g,[p.h,u.k,p.l],{layout:[0,"layout"]},null),u.Ra(7,1785856,null,0,d.h,[p.h,u.k,[6,d.g],u.y,X.b,p.l],{gap:[0,"gap"]},null),u.Ra(8,737280,null,0,d.b,[p.h,u.k,[3,d.g],p.l,p.f],{flex:[0,"flex"]},null),(l()(),u.Sa(9,0,null,null,23,"mat-card",[["class","mat-card"],["fxLayout","row"],["fxLayoutAlign","start center"],["fxLayoutGap","20px"],["style","margin-bottom: 30px;"]],null,null,null,b.d,b.a)),u.Ra(10,49152,null,0,m.a,[],null,null),u.Ra(11,737280,null,0,d.g,[p.h,u.k,p.l],{layout:[0,"layout"]},null),u.Ra(12,1785856,null,0,d.h,[p.h,u.k,[6,d.g],u.y,X.b,p.l],{gap:[0,"gap"]},null),u.Ra(13,737280,null,0,d.f,[p.h,u.k,[6,d.g],p.l],{align:[0,"align"]},null),(l()(),u.Sa(14,0,null,0,2,"div",[["class","community-logo"],["fxFlex","20"]],null,null,null,null,null)),u.Ra(15,737280,null,0,d.b,[p.h,u.k,[3,d.g],p.l,p.f],{flex:[0,"flex"]},null),(l()(),u.Sa(16,0,null,null,0,"img",[["alt",""]],[[8,"src",4]],null,null,null,null)),(l()(),u.Sa(17,0,null,0,15,"div",[["class","community-description"],["fxFlex","80"]],null,null,null,null,null)),u.Ra(18,737280,null,0,d.b,[p.h,u.k,[3,d.g],p.l,p.f],{flex:[0,"flex"]},null),(l()(),u.Sa(19,0,null,null,3,"h1",[],null,null,null,null,null)),u.Ra(20,999424,null,0,Z.b,[p.h,K.c,u.k,u.D,u.s,[8,null],p.l],{ngStyleXs:[0,"ngStyleXs"]},null),u.fb(21,{"font-size.em":0}),(l()(),u.kb(22,null,[""," Communities"])),(l()(),u.Sa(23,0,null,null,1,"p",[],null,null,null,null,null)),(l()(),u.kb(24,null,["",""])),(l()(),u.Sa(25,0,null,null,7,"div",[["fxLayout","row"],["fxLayoutAlign","space-between center"]],null,null,null,null,null)),u.Ra(26,737280,null,0,d.g,[p.h,u.k,p.l],{layout:[0,"layout"]},null),u.Ra(27,737280,null,0,d.f,[p.h,u.k,[6,d.g],p.l],{align:[0,"align"]},null),(l()(),u.Sa(28,0,null,null,4,"div",[],null,null,null,null,null)),(l()(),u.Ja(16777216,null,null,1,null,nl)),u.Ra(30,16384,null,0,g.m,[u.Q,u.M],{ngIf:[0,"ngIf"]},null),(l()(),u.Ja(16777216,null,null,1,null,tl)),u.Ra(32,16384,null,0,g.m,[u.Q,u.M],{ngIf:[0,"ngIf"]},null),(l()(),u.Ja(16777216,null,null,1,null,ul)),u.Ra(34,802816,null,0,g.l,[u.Q,u.M,u.r],{ngForOf:[0,"ngForOf"]},null),(l()(),u.Ja(16777216,null,null,1,null,al)),u.Ra(36,16384,null,0,g.m,[u.Q,u.M],{ngIf:[0,"ngIf"]},null),(l()(),u.Ja(16777216,null,null,1,null,il)),u.Ra(38,802816,null,0,g.l,[u.Q,u.M,u.r],{ngForOf:[0,"ngForOf"]},null)],function(l,n){var t=n.component;l(n,1,0,u.lb(n,1,0,u.cb(n,2).transform(t.isHandset$))?"ball":"margin-top2"),l(n,3,0,"row","column"),l(n,4,0,"20px"),l(n,6,0,"column"),l(n,7,0,"30px"),l(n,8,0,"45"),l(n,11,0,"row"),l(n,12,0,"20px"),l(n,13,0,"start center"),l(n,15,0,"20"),l(n,18,0,"80"),l(n,20,0,l(n,21,0,1.2)),l(n,26,0,"row"),l(n,27,0,"space-between center"),l(n,30,0,!t.community.subscribe),l(n,32,0,t.community.subscribe),l(n,34,0,t.posts),l(n,36,0,(null==t.meta?null:t.meta.next_page)&&t.loadingAnswer),l(n,38,0,t.posts)},function(l,n){var t=n.component;l(n,16,0,t.community.image),l(n,22,0,t.community.name),l(n,24,0,t.community.description)})}var el=u.Oa("app-community",W,function(l){return u.mb(0,[(l()(),u.Sa(0,0,null,null,1,"app-community",[],null,null,null,ol,ll)),u.Ra(1,114688,null,0,W,[w.a,f.a,f.o,g.i,L.a,I,Q.b],null,null)],function(l,n){l(n,1,0)},null)},{},{},[]),cl=t("NcP4"),rl=t("t68o"),sl=t("xYTU"),bl=t("82da"),ml=t("M2Lx"),dl=t("eDkP"),pl=t("v9Dh"),fl=t("mVsa"),gl=t("o3x0"),hl=t("uGex"),yl=t("4tE/"),kl=t("gIcY"),xl=t("tn8F"),vl=(t("PG31"),t("lZOh"),function(){function l(l,n){this.router=l,this._communityService=n}return l.prototype.resolve=function(l,n){return this._communityService.getCommunities()},l}()),Sl=function(){function l(l,n){this.router=l,this._communityService=n}return l.prototype.resolve=function(l,n){return this._communityService.getCommunity(l.params.slug)},l}(),Rl=function(){},Cl=t("de3e"),_l=t("8mMr"),Ol=t("qAlS"),wl=t("Nsh5"),Ml=t("3pJQ"),Ll=t("V9q+"),Al=t("4c35"),Pl=t("seP3"),Il=t("/VYK"),Bl=t("b716"),Ql=t("6Wmm"),Fl=t("Z+uX"),$l=t("Blfk"),zl=t("La40"),jl=t("kWGw"),Dl=t("/dO6"),Ul=t("MfpL"),Jl=t("Sj5B"),Nl=t("AEJi"),Tl=t("PCNd"),Hl=t("YSh2");t.d(n,"CommunityModuleNgFactory",function(){return ql});var ql=u.Pa(a,[],function(l){return u.Za([u.ab(512,u.j,u.Da,[[8,[i.a,E,el,cl.a,rl.a,sl.a,sl.b,bl.k,bl.l,bl.m,bl.n,bl.o,bl.p,bl.q]],[3,u.j],u.w]),u.ab(4608,g.o,g.n,[u.t,[2,g.A]]),u.ab(4608,ml.c,ml.c,[]),u.ab(4608,p.j,p.i,[p.d,p.g]),u.ab(5120,u.b,function(l,n){return[p.m(l,n)]},[g.d,u.A]),u.ab(4608,dl.d,dl.d,[dl.k,dl.f,u.j,dl.i,dl.g,u.q,u.y,g.d,X.b]),u.ab(5120,dl.l,dl.m,[dl.d]),u.ab(5120,pl.b,pl.c,[dl.d]),u.ab(4608,S.d,S.d,[]),u.ab(5120,fl.b,fl.g,[dl.d]),u.ab(4608,K.f,S.e,[[2,S.i],[2,S.n]]),u.ab(5120,gl.b,gl.c,[dl.d]),u.ab(4608,gl.d,gl.d,[dl.d,u.q,[2,g.i],[2,gl.a],gl.b,[3,gl.d],dl.f]),u.ab(5120,hl.a,hl.b,[dl.d]),u.ab(5120,yl.a,yl.b,[dl.d]),u.ab(4608,kl.w,kl.w,[]),u.ab(5120,xl.Bd,xl.Dd,[[3,xl.Bd],xl.Cd]),u.ab(4608,g.e,g.e,[u.t]),u.ab(5120,xl.ac,xl.zc,[[3,xl.ac],xl.qd,xl.Bd,g.e]),u.ab(5120,xl.N,xl.O,[g.d,[3,xl.N]]),u.ab(4608,xl.Aa,xl.Aa,[]),u.ab(4608,xl.Va,xl.Va,[]),u.ab(4608,xl.ad,xl.ad,[dl.d,u.q,u.j,u.g]),u.ab(4608,xl.gd,xl.gd,[dl.d,u.q,u.j,u.g]),u.ab(4608,xl.nd,xl.nd,[[3,xl.nd]]),u.ab(4608,xl.pd,xl.pd,[dl.d,xl.Bd,xl.nd]),u.ab(4608,vl,vl,[f.o,I]),u.ab(4608,Sl,Sl,[f.o,I]),u.ab(1073742336,g.c,g.c,[]),u.ab(1073742336,f.s,f.s,[[2,f.y],[2,f.o]]),u.ab(1073742336,Rl,Rl,[]),u.ab(1073742336,X.a,X.a,[]),u.ab(1073742336,S.n,S.n,[[2,S.f]]),u.ab(1073742336,C.b,C.b,[]),u.ab(1073742336,c.b,c.b,[]),u.ab(1073742336,S.z,S.z,[]),u.ab(1073742336,e.c,e.c,[]),u.ab(1073742336,ml.d,ml.d,[]),u.ab(1073742336,Cl.a,Cl.a,[]),u.ab(1073742336,w.c,w.c,[]),u.ab(1073742336,_l.b,_l.b,[]),u.ab(1073742336,Ol.b,Ol.b,[]),u.ab(1073742336,wl.h,wl.h,[]),u.ab(1073742336,k.b,k.b,[]),u.ab(1073742336,S.p,S.p,[]),u.ab(1073742336,S.x,S.x,[]),u.ab(1073742336,v.d,v.d,[]),u.ab(1073742336,m.g,m.g,[]),u.ab(1073742336,p.e,p.e,[]),u.ab(1073742336,d.d,d.d,[]),u.ab(1073742336,Z.a,Z.a,[]),u.ab(1073742336,Ml.a,Ml.a,[]),u.ab(1073742336,Ll.a,Ll.a,[[2,p.k],u.A]),u.ab(1073742336,r.a,r.a,[]),u.ab(1073742336,Al.g,Al.g,[]),u.ab(1073742336,dl.h,dl.h,[]),u.ab(1073742336,pl.e,pl.e,[]),u.ab(1073742336,Pl.d,Pl.d,[]),u.ab(1073742336,Il.c,Il.c,[]),u.ab(1073742336,Bl.b,Bl.b,[]),u.ab(1073742336,Ql.b,Ql.b,[]),u.ab(1073742336,fl.e,fl.e,[]),u.ab(1073742336,Fl.b,Fl.b,[]),u.ab(1073742336,$l.c,$l.c,[]),u.ab(1073742336,zl.k,zl.k,[]),u.ab(1073742336,jl.c,jl.c,[]),u.ab(1073742336,gl.g,gl.g,[]),u.ab(1073742336,S.u,S.u,[]),u.ab(1073742336,hl.d,hl.d,[]),u.ab(1073742336,Q.e,Q.e,[]),u.ab(1073742336,yl.c,yl.c,[]),u.ab(1073742336,Dl.d,Dl.d,[]),u.ab(1073742336,Ul.a,Ul.a,[]),u.ab(1073742336,h.b,h.b,[]),u.ab(1073742336,Jl.a,Jl.a,[]),u.ab(1073742336,xl.g,xl.g,[]),u.ab(1073742336,kl.u,kl.u,[]),u.ab(1073742336,kl.i,kl.i,[]),u.ab(1073742336,xl.Gd,xl.Gd,[]),u.ab(1073742336,xl.Fd,xl.Fd,[]),u.ab(1073742336,xl.Id,xl.Id,[]),u.ab(1073742336,xl.j,xl.j,[]),u.ab(1073742336,xl.cb,xl.cb,[]),u.ab(1073742336,xl.t,xl.t,[]),u.ab(1073742336,xl.y,xl.y,[]),u.ab(1073742336,xl.A,xl.A,[]),u.ab(1073742336,xl.J,xl.J,[]),u.ab(1073742336,xl.Q,xl.Q,[]),u.ab(1073742336,xl.L,xl.L,[]),u.ab(1073742336,xl.S,xl.S,[]),u.ab(1073742336,xl.U,xl.U,[]),u.ab(1073742336,xl.Ba,xl.Ba,[]),u.ab(1073742336,xl.Fa,xl.Fa,[]),u.ab(1073742336,xl.Ha,xl.Ha,[]),u.ab(1073742336,xl.Ka,xl.Ka,[]),u.ab(1073742336,xl.Na,xl.Na,[]),u.ab(1073742336,xl.Ra,xl.Ra,[]),u.ab(1073742336,xl.ab,xl.ab,[]),u.ab(1073742336,xl.Ta,xl.Ta,[]),u.ab(1073742336,xl.eb,xl.eb,[]),u.ab(1073742336,xl.gb,xl.gb,[]),u.ab(1073742336,xl.ib,xl.ib,[]),u.ab(1073742336,xl.kb,xl.kb,[]),u.ab(1073742336,xl.mb,xl.mb,[]),u.ab(1073742336,xl.ob,xl.ob,[]),u.ab(1073742336,xl.vb,xl.vb,[]),u.ab(1073742336,xl.Ab,xl.Ab,[]),u.ab(1073742336,xl.Db,xl.Db,[]),u.ab(1073742336,xl.Gb,xl.Gb,[]),u.ab(1073742336,xl.Kb,xl.Kb,[]),u.ab(1073742336,xl.Ob,xl.Ob,[]),u.ab(1073742336,xl.Qb,xl.Qb,[]),u.ab(1073742336,xl.Tb,xl.Tb,[]),u.ab(1073742336,xl.bc,xl.bc,[]),u.ab(1073742336,xl.Zb,xl.Zb,[]),u.ab(1073742336,xl.vc,xl.vc,[]),u.ab(1073742336,xl.xc,xl.xc,[]),u.ab(1073742336,xl.Hc,xl.Hc,[]),u.ab(1073742336,xl.Lc,xl.Lc,[]),u.ab(1073742336,xl.Pc,xl.Pc,[]),u.ab(1073742336,xl.Tc,xl.Tc,[]),u.ab(1073742336,xl.Vc,xl.Vc,[]),u.ab(1073742336,xl.bd,xl.bd,[]),u.ab(1073742336,xl.hd,xl.hd,[]),u.ab(1073742336,xl.jd,xl.jd,[]),u.ab(1073742336,xl.ld,xl.ld,[]),u.ab(1073742336,xl.rd,xl.rd,[]),u.ab(1073742336,xl.td,xl.td,[]),u.ab(1073742336,xl.vd,xl.vd,[]),u.ab(1073742336,xl.zd,xl.zd,[]),u.ab(1073742336,xl.b,xl.b,[]),u.ab(1073742336,Nl.a,Nl.a,[]),u.ab(1073742336,O.c,O.c,[]),u.ab(1073742336,Tl.a,Tl.a,[]),u.ab(1073742336,a,a,[]),u.ab(1024,f.m,function(){return[[{path:"",redirectTo:"all",pathMatch:"full"},{path:"all",component:B,resolve:{communities:vl}},{path:":slug",component:W,resolve:{community:Sl}}],[]]},[]),u.ab(256,Dl.a,{separatorKeyCodes:[Hl.f]},[]),u.ab(256,xl.Cd,!1,[]),u.ab(256,xl.qd,void 0,[]),u.ab(256,xl.Xc,{nzDuration:3e3,nzAnimate:!0,nzPauseOnHover:!0,nzMaxStack:7},[]),u.ab(256,xl.ed,{nzTop:"24px",nzBottom:"24px",nzPlacement:"topRight",nzDuration:4500,nzMaxStack:7,nzPauseOnHover:!0,nzAnimate:!0},[])])})}}]);