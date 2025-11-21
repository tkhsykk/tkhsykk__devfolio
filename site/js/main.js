var hp=Object.create;var yc=Object.defineProperty;var up=Object.getOwnPropertyDescriptor;var fp=Object.getOwnPropertyNames;var dp=Object.getPrototypeOf,pp=Object.prototype.hasOwnProperty;var mp=(r,t)=>()=>(r&&(t=r(r=0)),t);var gp=(r,t)=>()=>(t||r((t={exports:{}}).exports,t),t.exports),xp=(r,t)=>{for(var e in t)yc(r,e,{get:t[e],enumerable:!0})},_p=(r,t,e,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let i of fp(t))!pp.call(r,i)&&i!==e&&yc(r,i,{get:()=>t[i],enumerable:!(n=up(t,i))||n.enumerable});return r};var vp=(r,t,e)=>(e=r!=null?hp(dp(r)):{},_p(t||!r||!r.__esModule?yc(e,"default",{value:r,enumerable:!0}):e,r));var cu={};xp(cu,{ImageSlider:()=>ua,initSliders:()=>au,setupModalSliders:()=>ou,sliderInstances:()=>cs});function fa(r,t){return cs.has(r)||cs.set(r,new ua(r,t)),cs.get(r)}function au(r=document){(r instanceof HTMLElement?r:document).querySelectorAll("[data-slider]").forEach(e=>fa(e))}function ou(r=typeof window<"u"?window.MicroModal:void 0){if(!r||ru)return;let t=r.show.bind(r);r.show=(e,n={})=>{t(e,n);let i=document.getElementById(e);i&&i.querySelectorAll("[data-slider]").forEach(s=>{let a=cs.get(s);a?a.reset():fa(s)})},ru=!0}function Up(r=document.body){typeof MutationObserver>"u"||!r||(ha&&ha.disconnect(),ha=new MutationObserver(t=>{t.forEach(e=>{e.addedNodes.forEach(n=>{n instanceof HTMLElement&&(typeof n.matches=="function"&&n.matches("[data-slider]")&&fa(n),n.querySelectorAll?.("[data-slider]").forEach(i=>fa(i)))})})}),ha.observe(r,{childList:!0,subtree:!0}))}function su(){au(),ou(),Up()}var Dp,iu,ua,cs,ru,ha,Pc=mp(()=>{Dp={trackSelector:".c-slider__track",slideSelector:".c-slider__slide",prevSelector:"[data-slider-prev]",nextSelector:"[data-slider-next]",paginationSelector:".c-slider__pagination",swipeThreshold:40},iu={prev:["ArrowLeft","Left"],next:["ArrowRight","Right"]},ua=class{constructor(t,e={}){this.root=t,this.options={...Dp,...e},this.track=t.querySelector(this.options.trackSelector),this.slides=Array.from(t.querySelectorAll(this.options.slideSelector)),this.prevButton=t.querySelector(this.options.prevSelector),this.nextButton=t.querySelector(this.options.nextSelector),this.pagination=t.querySelector(this.options.paginationSelector),this.paginationButtons=[],this.currentIndex=0,this.touchStartX=null,this.touchEndX=null,this.handlePrev=this.goToPrev.bind(this),this.handleNext=this.goToNext.bind(this),this.handleKeydown=this.handleKeydown.bind(this),this.handleTouchStart=this.handleTouchStart.bind(this),this.handleTouchEnd=this.handleTouchEnd.bind(this),this.init()}init(){if(!(!this.track||this.slides.length===0)){if(this.root.hasAttribute("tabindex")||this.root.setAttribute("tabindex","0"),this.root.setAttribute("role","region"),this.root.setAttribute("aria-roledescription","carousel"),this.bindEvents(),this.slides.length<=1){this.toggleControls(!1),this.updateSlides();return}this.toggleControls(!0),this.renderPagination(),this.updateSlides()}}bindEvents(){this.prevButton&&this.prevButton.addEventListener("click",this.handlePrev),this.nextButton&&this.nextButton.addEventListener("click",this.handleNext),this.root.addEventListener("keydown",this.handleKeydown),this.track&&(this.track.addEventListener("touchstart",this.handleTouchStart,{passive:!0}),this.track.addEventListener("touchend",this.handleTouchEnd,{passive:!0}))}renderPagination(){if(!this.pagination)return;this.pagination.innerHTML="",this.paginationButtons=[];let t=document.createDocumentFragment();this.slides.forEach((e,n)=>{let i=document.createElement("button");i.type="button",i.className="c-slider__pagination-button",i.setAttribute("aria-label",`\u30B9\u30E9\u30A4\u30C9${n+1}\u306B\u79FB\u52D5`),i.dataset.sliderIndex=String(n),i.addEventListener("click",()=>this.goToSlide(n)),this.paginationButtons.push(i),t.appendChild(i)}),this.pagination.appendChild(t)}updateSlides(){let t=-this.currentIndex*100;this.track.style.transform=`translateX(${t}%)`,this.slides.forEach((e,n)=>{let i=n===this.currentIndex;e.setAttribute("aria-hidden",i?"false":"true"),e.classList.toggle("is-active",i)}),this.updatePagination(),this.updateControlState()}goToPrev(){this.slides.length<=1||(this.currentIndex>0?this.currentIndex-=1:this.currentIndex=this.slides.length-1,this.updateSlides())}goToNext(){this.slides.length<=1||(this.currentIndex<this.slides.length-1?this.currentIndex+=1:this.currentIndex=0,this.updateSlides())}goToSlide(t){t<0||t>=this.slides.length||(this.currentIndex=t,this.updateSlides())}handleKeydown(t){if(iu.prev.includes(t.key)){t.preventDefault(),this.goToPrev();return}iu.next.includes(t.key)&&(t.preventDefault(),this.goToNext())}handleTouchStart(t){this.touchStartX=t.changedTouches[0].clientX}handleTouchEnd(t){if(this.touchEndX=t.changedTouches[0].clientX,this.touchStartX===null||this.touchEndX===null)return;let e=this.touchStartX-this.touchEndX;this.touchStartX=null,this.touchEndX=null,!(Math.abs(e)<this.options.swipeThreshold)&&(e>0?this.goToNext():this.goToPrev())}updatePagination(){this.paginationButtons.length&&this.paginationButtons.forEach((t,e)=>{let n=e===this.currentIndex;t.classList.toggle("is-active",n),n?t.setAttribute("aria-current","true"):t.removeAttribute("aria-current")})}updateControlState(){let t=this.currentIndex===0,e=this.currentIndex===this.slides.length-1,n=this.slides.length>1;this.prevButton&&(this.prevButton.disabled=!n||t),this.nextButton&&(this.nextButton.disabled=!n||e)}toggleControls(t){let e=t?"":"none";[this.prevButton,this.nextButton,this.pagination].forEach(n=>{n&&(n.style.display=e)})}reset(){this.currentIndex=0,this.updateSlides()}destroy(){this.prevButton&&this.prevButton.removeEventListener("click",this.handlePrev),this.nextButton&&this.nextButton.removeEventListener("click",this.handleNext),this.track&&(this.track.removeEventListener("touchstart",this.handleTouchStart),this.track.removeEventListener("touchend",this.handleTouchEnd)),this.root.removeEventListener("keydown",this.handleKeydown)}},cs=new Map;ru=!1;document.readyState==="loading"?document.addEventListener("DOMContentLoaded",su):su()});var Zf=gp((Hl,Wl)=>{(function(r,t){typeof Hl=="object"&&typeof Wl<"u"?Wl.exports=t():typeof define=="function"&&define.amd?define(t):(r||self).barba=t()})(Hl,function(){function r(B,I){for(var b=0;b<I.length;b++){var p=I[b];p.enumerable=p.enumerable||!1,p.configurable=!0,"value"in p&&(p.writable=!0),Object.defineProperty(B,typeof(x=(function(R,O){if(typeof R!="object"||R===null)return R;var k=R[Symbol.toPrimitive];if(k!==void 0){var L=k.call(R,"string");if(typeof L!="object")return L;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(R)})(p.key))=="symbol"?x:String(x),p)}var x}function t(B,I,b){return I&&r(B.prototype,I),b&&r(B,b),Object.defineProperty(B,"prototype",{writable:!1}),B}function e(){return e=Object.assign?Object.assign.bind():function(B){for(var I=1;I<arguments.length;I++){var b=arguments[I];for(var p in b)Object.prototype.hasOwnProperty.call(b,p)&&(B[p]=b[p])}return B},e.apply(this,arguments)}function n(B,I){B.prototype=Object.create(I.prototype),B.prototype.constructor=B,s(B,I)}function i(B){return i=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(I){return I.__proto__||Object.getPrototypeOf(I)},i(B)}function s(B,I){return s=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(b,p){return b.__proto__=p,b},s(B,I)}function a(){if(typeof Reflect>"u"||!Reflect.construct||Reflect.construct.sham)return!1;if(typeof Proxy=="function")return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch{return!1}}function o(B,I,b){return o=a()?Reflect.construct.bind():function(p,x,R){var O=[null];O.push.apply(O,x);var k=new(Function.bind.apply(p,O));return R&&s(k,R.prototype),k},o.apply(null,arguments)}function c(B){var I=typeof Map=="function"?new Map:void 0;return c=function(b){if(b===null||Function.toString.call(b).indexOf("[native code]")===-1)return b;if(typeof b!="function")throw new TypeError("Super expression must either be null or a function");if(I!==void 0){if(I.has(b))return I.get(b);I.set(b,p)}function p(){return o(b,arguments,i(this).constructor)}return p.prototype=Object.create(b.prototype,{constructor:{value:p,enumerable:!1,writable:!0,configurable:!0}}),s(p,b)},c(B)}function l(B){if(B===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return B}var h,u=function(){this.before=void 0,this.beforeLeave=void 0,this.leave=void 0,this.afterLeave=void 0,this.beforeEnter=void 0,this.enter=void 0,this.afterEnter=void 0,this.after=void 0};(function(B){B[B.off=0]="off",B[B.error=1]="error",B[B.warning=2]="warning",B[B.info=3]="info",B[B.debug=4]="debug"})(h||(h={}));var f=h.off,d=(function(){function B(b){this.t=void 0,this.t=b}B.getLevel=function(){return f},B.setLevel=function(b){return f=h[b]};var I=B.prototype;return I.error=function(){this.i(console.error,h.error,[].slice.call(arguments))},I.warn=function(){this.i(console.warn,h.warning,[].slice.call(arguments))},I.info=function(){this.i(console.info,h.info,[].slice.call(arguments))},I.debug=function(){this.i(console.log,h.debug,[].slice.call(arguments))},I.i=function(b,p,x){p<=B.getLevel()&&b.apply(console,["["+this.t+"] "].concat(x))},B})();function v(B){return B.replace(/([.+*?=^!:${}()[\]|/\\])/g,"\\$1")}function _(B){return B&&B.sensitive?"":"i"}var g={container:"container",history:"history",namespace:"namespace",prefix:"data-barba",prevent:"prevent",wrapper:"wrapper"},m=(function(){function B(){this.o=g,this.u=void 0,this.h={after:null,before:null,parent:null}}var I=B.prototype;return I.toString=function(b){return b.outerHTML},I.toDocument=function(b){return this.u||(this.u=new DOMParser),this.u.parseFromString(b,"text/html")},I.toElement=function(b){var p=document.createElement("div");return p.innerHTML=b,p},I.getHtml=function(b){return b===void 0&&(b=document),this.toString(b.documentElement)},I.getWrapper=function(b){return b===void 0&&(b=document),b.querySelector("["+this.o.prefix+'="'+this.o.wrapper+'"]')},I.getContainer=function(b){return b===void 0&&(b=document),b.querySelector("["+this.o.prefix+'="'+this.o.container+'"]')},I.removeContainer=function(b){document.body.contains(b)&&(this.v(b),b.parentNode.removeChild(b))},I.addContainer=function(b,p){var x=this.getContainer()||this.h.before;x?this.l(b,x):this.h.after?this.h.after.parentNode.insertBefore(b,this.h.after):this.h.parent?this.h.parent.appendChild(b):p.appendChild(b)},I.getSibling=function(){return this.h},I.getNamespace=function(b){b===void 0&&(b=document);var p=b.querySelector("["+this.o.prefix+"-"+this.o.namespace+"]");return p?p.getAttribute(this.o.prefix+"-"+this.o.namespace):null},I.getHref=function(b){if(b.tagName&&b.tagName.toLowerCase()==="a"){if(typeof b.href=="string")return b.href;var p=b.getAttribute("href")||b.getAttribute("xlink:href");if(p)return this.resolveUrl(p.baseVal||p)}return null},I.resolveUrl=function(){var b=[].slice.call(arguments).length;if(b===0)throw new Error("resolveUrl requires at least one argument; got none.");var p=document.createElement("base");if(p.href=arguments[0],b===1)return p.href;var x=document.getElementsByTagName("head")[0];x.insertBefore(p,x.firstChild);for(var R,O=document.createElement("a"),k=1;k<b;k++)O.href=arguments[k],p.href=R=O.href;return x.removeChild(p),R},I.l=function(b,p){p.parentNode.insertBefore(b,p.nextSibling)},I.v=function(b){return this.h={after:b.nextElementSibling,before:b.previousElementSibling,parent:b.parentElement},this.h},B})(),T=new m,w=(function(){function B(){this.p=void 0,this.m=[],this.P=-1}var I=B.prototype;return I.init=function(b,p){this.p="barba";var x={data:{},ns:p,scroll:{x:window.scrollX,y:window.scrollY},url:b};this.P=0,this.m.push(x);var R={from:this.p,index:this.P,states:[].concat(this.m)};window.history&&window.history.replaceState(R,"",b)},I.change=function(b,p,x){if(x&&x.state){var R=x.state,O=R.index;p=this.g(this.P-O),this.replace(R.states),this.P=O}else this.add(b,p);return p},I.add=function(b,p,x,R){var O=x??this.R(p),k={data:R??{},ns:"tmp",scroll:{x:window.scrollX,y:window.scrollY},url:b};switch(O){case"push":this.P=this.size,this.m.push(k);break;case"replace":this.set(this.P,k)}var L={from:this.p,index:this.P,states:[].concat(this.m)};switch(O){case"push":window.history&&window.history.pushState(L,"",b);break;case"replace":window.history&&window.history.replaceState(L,"",b)}},I.store=function(b,p){var x=p||this.P,R=this.get(x);R.data=e({},R.data,b),this.set(x,R);var O={from:this.p,index:this.P,states:[].concat(this.m)};window.history.replaceState(O,"")},I.update=function(b,p){var x=p||this.P,R=e({},this.get(x),b);this.set(x,R)},I.remove=function(b){b?this.m.splice(b,1):this.m.pop(),this.P--},I.clear=function(){this.m=[],this.P=-1},I.replace=function(b){this.m=b},I.get=function(b){return this.m[b]},I.set=function(b,p){return this.m[b]=p},I.R=function(b){var p="push",x=b,R=g.prefix+"-"+g.history;return x.hasAttribute&&x.hasAttribute(R)&&(p=x.getAttribute(R)),p},I.g=function(b){return Math.abs(b)>1?b>0?"forward":"back":b===0?"popstate":b>0?"back":"forward"},t(B,[{key:"current",get:function(){return this.m[this.P]}},{key:"previous",get:function(){return this.P<1?null:this.m[this.P-1]}},{key:"size",get:function(){return this.m.length}}]),B})(),A=new w,C=function(B,I){try{var b=(function(){if(!I.next.html)return Promise.resolve(B).then(function(p){var x=I.next;if(p){var R=T.toElement(p.html);x.namespace=T.getNamespace(R),x.container=T.getContainer(R),x.url=p.url,x.html=p.html,A.update({ns:x.namespace});var O=T.toDocument(p.html);document.title=O.title}})})();return Promise.resolve(b&&b.then?b.then(function(){}):void 0)}catch(p){return Promise.reject(p)}},E=function B(I,b,p){return I instanceof RegExp?(function(x,R){if(!R)return x;for(var O=/\((?:\?<(.*?)>)?(?!\?)/g,k=0,L=O.exec(x.source);L;)R.push({name:L[1]||k++,prefix:"",suffix:"",modifier:"",pattern:""}),L=O.exec(x.source);return x})(I,b):Array.isArray(I)?(function(x,R,O){var k=x.map(function(L){return B(L,R,O).source});return new RegExp("(?:".concat(k.join("|"),")"),_(O))})(I,b,p):(function(x,R,O){return(function(k,L,Q){Q===void 0&&(Q={});for(var st=Q.strict,dt=st!==void 0&&st,nt=Q.start,K=nt===void 0||nt,tt=Q.end,mt=tt===void 0||tt,xt=Q.encode,ot=xt===void 0?function(li){return li}:xt,At=Q.delimiter,D=At===void 0?"/#?":At,lt=Q.endsWith,ht="[".concat(v(lt===void 0?"":lt),"]|$"),ct="[".concat(v(D),"]"),it=K?"^":"",j=0,vt=k;j<vt.length;j++){var gt=vt[j];if(typeof gt=="string")it+=v(ot(gt));else{var zt=v(ot(gt.prefix)),wt=v(ot(gt.suffix));if(gt.pattern)if(L&&L.push(gt),zt||wt)if(gt.modifier==="+"||gt.modifier==="*"){var ie=gt.modifier==="*"?"?":"";it+="(?:".concat(zt,"((?:").concat(gt.pattern,")(?:").concat(wt).concat(zt,"(?:").concat(gt.pattern,"))*)").concat(wt,")").concat(ie)}else it+="(?:".concat(zt,"(").concat(gt.pattern,")").concat(wt,")").concat(gt.modifier);else it+=gt.modifier==="+"||gt.modifier==="*"?"((?:".concat(gt.pattern,")").concat(gt.modifier,")"):"(".concat(gt.pattern,")").concat(gt.modifier);else it+="(?:".concat(zt).concat(wt,")").concat(gt.modifier)}}if(mt)dt||(it+="".concat(ct,"?")),it+=Q.endsWith?"(?=".concat(ht,")"):"$";else{var Ft=k[k.length-1],Ge=typeof Ft=="string"?ct.indexOf(Ft[Ft.length-1])>-1:Ft===void 0;dt||(it+="(?:".concat(ct,"(?=").concat(ht,"))?")),Ge||(it+="(?=".concat(ct,"|").concat(ht,")"))}return new RegExp(it,_(Q))})((function(k,L){L===void 0&&(L={});for(var Q=(function(wt){for(var ie=[],Ft=0;Ft<wt.length;){var Ge=wt[Ft];if(Ge!=="*"&&Ge!=="+"&&Ge!=="?")if(Ge!=="\\")if(Ge!=="{")if(Ge!=="}")if(Ge!==":")if(Ge!=="(")ie.push({type:"CHAR",index:Ft,value:wt[Ft++]});else{var li=1,Li="";if(wt[ye=Ft+1]==="?")throw new TypeError('Pattern cannot start with "?" at '.concat(ye));for(;ye<wt.length;)if(wt[ye]!=="\\"){if(wt[ye]===")"){if(--li==0){ye++;break}}else if(wt[ye]==="("&&(li++,wt[ye+1]!=="?"))throw new TypeError("Capturing groups are not allowed at ".concat(ye));Li+=wt[ye++]}else Li+=wt[ye++]+wt[ye++];if(li)throw new TypeError("Unbalanced pattern at ".concat(Ft));if(!Li)throw new TypeError("Missing pattern at ".concat(Ft));ie.push({type:"PATTERN",index:Ft,value:Li}),Ft=ye}else{for(var Sn="",ye=Ft+1;ye<wt.length;){var Cn=wt.charCodeAt(ye);if(!(Cn>=48&&Cn<=57||Cn>=65&&Cn<=90||Cn>=97&&Cn<=122||Cn===95))break;Sn+=wt[ye++]}if(!Sn)throw new TypeError("Missing parameter name at ".concat(Ft));ie.push({type:"NAME",index:Ft,value:Sn}),Ft=ye}else ie.push({type:"CLOSE",index:Ft,value:wt[Ft++]});else ie.push({type:"OPEN",index:Ft,value:wt[Ft++]});else ie.push({type:"ESCAPED_CHAR",index:Ft++,value:wt[Ft++]});else ie.push({type:"MODIFIER",index:Ft,value:wt[Ft++]})}return ie.push({type:"END",index:Ft,value:""}),ie})(k),st=L.prefixes,dt=st===void 0?"./":st,nt="[^".concat(v(L.delimiter||"/#?"),"]+?"),K=[],tt=0,mt=0,xt="",ot=function(wt){if(mt<Q.length&&Q[mt].type===wt)return Q[mt++].value},At=function(wt){var ie=ot(wt);if(ie!==void 0)return ie;var Ft=Q[mt],Ge=Ft.index;throw new TypeError("Unexpected ".concat(Ft.type," at ").concat(Ge,", expected ").concat(wt))},D=function(){for(var wt,ie="";wt=ot("CHAR")||ot("ESCAPED_CHAR");)ie+=wt;return ie};mt<Q.length;){var lt=ot("CHAR"),ht=ot("NAME"),ct=ot("PATTERN");if(ht||ct)dt.indexOf(j=lt||"")===-1&&(xt+=j,j=""),xt&&(K.push(xt),xt=""),K.push({name:ht||tt++,prefix:j,suffix:"",pattern:ct||nt,modifier:ot("MODIFIER")||""});else{var it=lt||ot("ESCAPED_CHAR");if(it)xt+=it;else if(xt&&(K.push(xt),xt=""),ot("OPEN")){var j=D(),vt=ot("NAME")||"",gt=ot("PATTERN")||"",zt=D();At("CLOSE"),K.push({name:vt||(gt?tt++:""),pattern:vt&&!gt?nt:gt,prefix:j,suffix:zt,modifier:ot("MODIFIER")||""})}else At("END")}}return K})(x,O),R,O)})(I,b,p)},P={__proto__:null,update:C,nextTick:function(){return new Promise(function(B){window.requestAnimationFrame(B)})},pathToRegexp:E},F=function(){return window.location.origin},y=function(B){return B===void 0&&(B=window.location.href),M(B).port},M=function(B){var I,b=B.match(/:\d+/);if(b===null)/^http/.test(B)&&(I=80),/^https/.test(B)&&(I=443);else{var p=b[0].substring(1);I=parseInt(p,10)}var x,R=B.replace(F(),""),O={},k=R.indexOf("#");k>=0&&(x=R.slice(k+1),R=R.slice(0,k));var L=R.indexOf("?");return L>=0&&(O=N(R.slice(L+1)),R=R.slice(0,L)),{hash:x,path:R,port:I,query:O}},N=function(B){return B.split("&").reduce(function(I,b){var p=b.split("=");return I[p[0]]=p[1],I},{})},G=function(B){return B===void 0&&(B=window.location.href),B.replace(/(\/#.*|\/|#.*)$/,"")},H={__proto__:null,getHref:function(){return window.location.href},getAbsoluteHref:function(B,I){return I===void 0&&(I=document.baseURI),new URL(B,I).href},getOrigin:F,getPort:y,getPath:function(B){return B===void 0&&(B=window.location.href),M(B).path},getQuery:function(B,I){return I===void 0&&(I=!1),I?JSON.stringify(M(B).query):M(B).query},getHash:function(B){return M(B).hash},parse:M,parseQuery:N,clean:G};function Z(B,I,b,p,x){return I===void 0&&(I=2e3),new Promise(function(R,O){var k=new XMLHttpRequest;k.onreadystatechange=function(){if(k.readyState===XMLHttpRequest.DONE){if(k.status===200){var L=k.responseURL!==""&&k.responseURL!==B?k.responseURL:B;R({html:k.responseText,url:e({href:L},M(L))}),p.update(B,{status:"fulfilled",target:L})}else if(k.status){var Q={status:k.status,statusText:k.statusText};b(B,Q),O(Q),p.update(B,{status:"rejected"})}}},k.ontimeout=function(){var L=new Error("Timeout error ["+I+"]");b(B,L),O(L),p.update(B,{status:"rejected"})},k.onerror=function(){var L=new Error("Fetch error");b(B,L),O(L),p.update(B,{status:"rejected"})},k.open("GET",B),k.timeout=I,k.setRequestHeader("Accept","text/html,application/xhtml+xml,application/xml"),k.setRequestHeader("x-barba","yes"),x.all().forEach(function(L,Q){k.setRequestHeader(Q,L)}),k.send()})}function J(B){return!!B&&(typeof B=="object"||typeof B=="function")&&typeof B.then=="function"}function Y(B,I){return I===void 0&&(I={}),function(){var b=arguments,p=!1,x=new Promise(function(R,O){I.async=function(){return p=!0,function(L,Q){L?O(L):R(Q)}};var k=B.apply(I,[].slice.call(b));p||(J(k)?k.then(R,O):R(k))});return x}}var at=(function(B){function I(){var p;return(p=B.call(this)||this).logger=new d("@barba/core"),p.all=["ready","page","reset","currentAdded","currentRemoved","nextAdded","nextRemoved","beforeOnce","once","afterOnce","before","beforeLeave","leave","afterLeave","beforeEnter","enter","afterEnter","after"],p.registered=new Map,p.init(),p}n(I,B);var b=I.prototype;return b.init=function(){var p=this;this.registered.clear(),this.all.forEach(function(x){p[x]||(p[x]=function(R,O){p.registered.has(x)||p.registered.set(x,new Set),p.registered.get(x).add({ctx:O||{},fn:R})})})},b.do=function(p){var x=arguments,R=this;if(this.registered.has(p)){var O=Promise.resolve();return this.registered.get(p).forEach(function(k){O=O.then(function(){return Y(k.fn,k.ctx).apply(void 0,[].slice.call(x,1))})}),O.catch(function(k){R.logger.debug("Hook error ["+p+"]"),R.logger.error(k)})}return Promise.resolve()},b.clear=function(){var p=this;this.all.forEach(function(x){delete p[x]}),this.init()},b.help=function(){this.logger.info("Available hooks: "+this.all.join(","));var p=[];this.registered.forEach(function(x,R){return p.push(R)}),this.logger.info("Registered hooks: "+p.join(","))},I})(u),W=new at,ut=(function(){function B(I){if(this.k=void 0,this.O=[],typeof I=="boolean")this.k=I;else{var b=Array.isArray(I)?I:[I];this.O=b.map(function(p){return E(p)})}}return B.prototype.checkHref=function(I){if(typeof this.k=="boolean")return this.k;var b=M(I).path;return this.O.some(function(p){return p.exec(b)!==null})},B})(),ft=(function(B){function I(p){var x;return(x=B.call(this,p)||this).T=new Map,x}n(I,B);var b=I.prototype;return b.set=function(p,x,R,O,k){return this.T.set(p,{action:R,request:x,status:O,target:k??p}),{action:R,request:x,status:O,target:k}},b.get=function(p){return this.T.get(p)},b.getRequest=function(p){return this.T.get(p).request},b.getAction=function(p){return this.T.get(p).action},b.getStatus=function(p){return this.T.get(p).status},b.getTarget=function(p){return this.T.get(p).target},b.has=function(p){return!this.checkHref(p)&&this.T.has(p)},b.delete=function(p){return this.T.delete(p)},b.update=function(p,x){var R=e({},this.T.get(p),x);return this.T.set(p,R),R},I})(ut),Et=(function(){function B(){this.A=new Map}var I=B.prototype;return I.set=function(b,p){return this.A.set(b,p),{name:p}},I.get=function(b){return this.A.get(b)},I.all=function(){return this.A},I.has=function(b){return this.A.has(b)},I.delete=function(b){return this.A.delete(b)},I.clear=function(){return this.A.clear()},B})(),Ut=function(){return!window.history.pushState},Kt=function(B){return!B.el||!B.href},Vt=function(B){var I=B.event;return I.which>1||I.metaKey||I.ctrlKey||I.shiftKey||I.altKey},qt=function(B){var I=B.el;return I.hasAttribute("target")&&I.target==="_blank"},et=function(B){var I=B.el;return I.protocol!==void 0&&window.location.protocol!==I.protocol||I.hostname!==void 0&&window.location.hostname!==I.hostname},rt=function(B){var I=B.el;return I.port!==void 0&&y()!==y(I.href)},bt=function(B){var I=B.el;return I.getAttribute&&typeof I.getAttribute("download")=="string"},Nt=function(B){return B.el.hasAttribute(g.prefix+"-"+g.prevent)},Ct=function(B){return!!B.el.closest("["+g.prefix+"-"+g.prevent+'="all"]')},Gt=function(B){var I=B.href;return G(I)===G()&&y(I)===y()},we=(function(B){function I(p){var x;return(x=B.call(this,p)||this).suite=[],x.tests=new Map,x.init(),x}n(I,B);var b=I.prototype;return b.init=function(){this.add("pushState",Ut),this.add("exists",Kt),this.add("newTab",Vt),this.add("blank",qt),this.add("corsDomain",et),this.add("corsPort",rt),this.add("download",bt),this.add("preventSelf",Nt),this.add("preventAll",Ct),this.add("sameUrl",Gt,!1)},b.add=function(p,x,R){R===void 0&&(R=!0),this.tests.set(p,x),R&&this.suite.push(p)},b.run=function(p,x,R,O){return this.tests.get(p)({el:x,event:R,href:O})},b.checkLink=function(p,x,R){var O=this;return this.suite.some(function(k){return O.run(k,p,x,R)})},I})(ut),Bt=(function(B){function I(b,p){var x;return p===void 0&&(p="Barba error"),(x=B.call.apply(B,[this].concat([].slice.call(arguments,2)))||this).error=void 0,x.label=void 0,x.error=b,x.label=p,Error.captureStackTrace&&Error.captureStackTrace(l(x),I),x.name="BarbaError",x}return n(I,B),I})(c(Error)),ce=(function(){function B(b){b===void 0&&(b=[]),this.logger=new d("@barba/core"),this.all=[],this.page=[],this.once=[],this.j=[{name:"namespace",type:"strings"},{name:"custom",type:"function"}],b&&(this.all=this.all.concat(b)),this.update()}var I=B.prototype;return I.add=function(b,p){b==="rule"?this.j.splice(p.position||0,0,p.value):this.all.push(p),this.update()},I.resolve=function(b,p){var x=this;p===void 0&&(p={});var R=p.once?this.once:this.page;R=R.filter(p.self?function(nt){return nt.name&&nt.name==="self"}:function(nt){return!nt.name||nt.name!=="self"});var O=new Map,k=R.find(function(nt){var K=!0,tt={};return p.self&&nt.name==="self"?(O.set(nt,tt),!0):(x.j.reverse().forEach(function(mt){K&&(K=x.M(nt,mt,b,tt),nt.from&&nt.to&&(K=x.M(nt,mt,b,tt,"from")&&x.M(nt,mt,b,tt,"to")),nt.from&&!nt.to&&(K=x.M(nt,mt,b,tt,"from")),!nt.from&&nt.to&&(K=x.M(nt,mt,b,tt,"to")))}),O.set(nt,tt),K)}),L=O.get(k),Q=[];if(Q.push(p.once?"once":"page"),p.self&&Q.push("self"),L){var st,dt=[k];Object.keys(L).length>0&&dt.push(L),(st=this.logger).info.apply(st,["Transition found ["+Q.join(",")+"]"].concat(dt))}else this.logger.info("No transition found ["+Q.join(",")+"]");return k},I.update=function(){var b=this;this.all=this.all.map(function(p){return b.N(p)}).sort(function(p,x){return p.priority-x.priority}).reverse().map(function(p){return delete p.priority,p}),this.page=this.all.filter(function(p){return p.leave!==void 0||p.enter!==void 0}),this.once=this.all.filter(function(p){return p.once!==void 0})},I.M=function(b,p,x,R,O){var k=!0,L=!1,Q=b,st=p.name,dt=st,nt=st,K=st,tt=O?Q[O]:Q,mt=O==="to"?x.next:x.current;if(O?tt&&tt[st]:tt[st]){switch(p.type){case"strings":default:var xt=Array.isArray(tt[dt])?tt[dt]:[tt[dt]];mt[dt]&&xt.indexOf(mt[dt])!==-1&&(L=!0),xt.indexOf(mt[dt])===-1&&(k=!1);break;case"object":var ot=Array.isArray(tt[nt])?tt[nt]:[tt[nt]];mt[nt]?(mt[nt].name&&ot.indexOf(mt[nt].name)!==-1&&(L=!0),ot.indexOf(mt[nt].name)===-1&&(k=!1)):k=!1;break;case"function":tt[K](x)?L=!0:k=!1}L&&(O?(R[O]=R[O]||{},R[O][st]=Q[O][st]):R[st]=Q[st])}return k},I.S=function(b,p,x){var R=0;return(b[p]||b.from&&b.from[p]||b.to&&b.to[p])&&(R+=Math.pow(10,x),b.from&&b.from[p]&&(R+=1),b.to&&b.to[p]&&(R+=2)),R},I.N=function(b){var p=this;b.priority=0;var x=0;return this.j.forEach(function(R,O){x+=p.S(b,R.name,O+1)}),b.priority=x,b},B})();function U(B,I){try{var b=B()}catch(p){return I(p)}return b&&b.then?b.then(void 0,I):b}var Ht=(function(){function B(b){b===void 0&&(b=[]),this.logger=new d("@barba/core"),this.store=void 0,this.C=!1,this.store=new ce(b)}var I=B.prototype;return I.get=function(b,p){return this.store.resolve(b,p)},I.doOnce=function(b){var p=b.data,x=b.transition;try{var R=function(){O.C=!1},O=this,k=x||{};O.C=!0;var L=U(function(){return Promise.resolve(O.L("beforeOnce",p,k)).then(function(){return Promise.resolve(O.once(p,k)).then(function(){return Promise.resolve(O.L("afterOnce",p,k)).then(function(){})})})},function(Q){O.C=!1,O.logger.debug("Transition error [before/after/once]"),O.logger.error(Q)});return Promise.resolve(L&&L.then?L.then(R):R())}catch(Q){return Promise.reject(Q)}},I.doPage=function(b){var p=b.data,x=b.transition,R=b.page,O=b.wrapper;try{var k=function(nt){L.C=!1},L=this,Q=x||{},st=Q.sync===!0||!1;L.C=!0;var dt=U(function(){function nt(){return Promise.resolve(L.L("before",p,Q)).then(function(){function tt(xt){return Promise.resolve(L.remove(p)).then(function(){return Promise.resolve(L.L("after",p,Q)).then(function(){})})}var mt=(function(){if(st)return U(function(){return Promise.resolve(L.add(p,O)).then(function(){return Promise.resolve(L.L("beforeLeave",p,Q)).then(function(){return Promise.resolve(L.L("beforeEnter",p,Q)).then(function(){return Promise.resolve(Promise.all([L.leave(p,Q),L.enter(p,Q)])).then(function(){return Promise.resolve(L.L("afterLeave",p,Q)).then(function(){return Promise.resolve(L.L("afterEnter",p,Q)).then(function(){})})})})})})},function(D){if(L.H(D))throw new Bt(D,"Transition error [sync]")});var xt=function(D){return U(function(){var lt=(function(){if(ot!==!1)return Promise.resolve(L.add(p,O)).then(function(){return Promise.resolve(L.L("beforeEnter",p,Q)).then(function(){return Promise.resolve(L.enter(p,Q,ot)).then(function(){return Promise.resolve(L.L("afterEnter",p,Q)).then(function(){})})})})})();if(lt&&lt.then)return lt.then(function(){})},function(lt){if(L.H(lt))throw new Bt(lt,"Transition error [before/after/enter]")})},ot=!1,At=U(function(){return Promise.resolve(L.L("beforeLeave",p,Q)).then(function(){return Promise.resolve(Promise.all([L.leave(p,Q),C(R,p)]).then(function(D){return D[0]})).then(function(D){return ot=D,Promise.resolve(L.L("afterLeave",p,Q)).then(function(){})})})},function(D){if(L.H(D))throw new Bt(D,"Transition error [before/after/leave]")});return At&&At.then?At.then(xt):xt()})();return mt&&mt.then?mt.then(tt):tt()})}var K=(function(){if(st)return Promise.resolve(C(R,p)).then(function(){})})();return K&&K.then?K.then(nt):nt()},function(nt){throw L.C=!1,nt.name&&nt.name==="BarbaError"?(L.logger.debug(nt.label),L.logger.error(nt.error),nt):(L.logger.debug("Transition error [page]"),L.logger.error(nt),nt)});return Promise.resolve(dt&&dt.then?dt.then(k):k())}catch(nt){return Promise.reject(nt)}},I.once=function(b,p){try{return Promise.resolve(W.do("once",b,p)).then(function(){return p.once?Y(p.once,p)(b):Promise.resolve()})}catch(x){return Promise.reject(x)}},I.leave=function(b,p){try{return Promise.resolve(W.do("leave",b,p)).then(function(){return p.leave?Y(p.leave,p)(b):Promise.resolve()})}catch(x){return Promise.reject(x)}},I.enter=function(b,p,x){try{return Promise.resolve(W.do("enter",b,p)).then(function(){return p.enter?Y(p.enter,p)(b,x):Promise.resolve()})}catch(R){return Promise.reject(R)}},I.add=function(b,p){try{return T.addContainer(b.next.container,p),W.do("nextAdded",b),Promise.resolve()}catch(x){return Promise.reject(x)}},I.remove=function(b){try{return T.removeContainer(b.current.container),W.do("currentRemoved",b),Promise.resolve()}catch(p){return Promise.reject(p)}},I.H=function(b){return b.message?!/Timeout error|Fetch error/.test(b.message):!b.status},I.L=function(b,p,x){try{return Promise.resolve(W.do(b,p,x)).then(function(){return x[b]?Y(x[b],x)(p):Promise.resolve()})}catch(R){return Promise.reject(R)}},t(B,[{key:"isRunning",get:function(){return this.C},set:function(b){this.C=b}},{key:"hasOnce",get:function(){return this.store.once.length>0}},{key:"hasSelf",get:function(){return this.store.all.some(function(b){return b.name==="self"})}},{key:"shouldWait",get:function(){return this.store.all.some(function(b){return b.to&&!b.to.route||b.sync})}}]),B})(),Wt=(function(){function B(I){var b=this;this.names=["beforeLeave","afterLeave","beforeEnter","afterEnter"],this.byNamespace=new Map,I.length!==0&&(I.forEach(function(p){b.byNamespace.set(p.namespace,p)}),this.names.forEach(function(p){W[p](b._(p))}))}return B.prototype._=function(I){var b=this;return function(p){var x=I.match(/enter/i)?p.next:p.current,R=b.byNamespace.get(x.namespace);return R&&R[I]?Y(R[I],R)(p):Promise.resolve()}},B})();Element.prototype.matches||(Element.prototype.matches=Element.prototype.msMatchesSelector||Element.prototype.webkitMatchesSelector),Element.prototype.closest||(Element.prototype.closest=function(B){var I=this;do{if(I.matches(B))return I;I=I.parentElement||I.parentNode}while(I!==null&&I.nodeType===1);return null});var ne={container:null,html:"",namespace:"",url:{hash:"",href:"",path:"",port:null,query:{}}},St=(function(){function B(){this.version="2.10.3",this.schemaPage=ne,this.Logger=d,this.logger=new d("@barba/core"),this.plugins=[],this.timeout=void 0,this.cacheIgnore=void 0,this.cacheFirstPage=void 0,this.prefetchIgnore=void 0,this.preventRunning=void 0,this.hooks=W,this.cache=void 0,this.headers=void 0,this.prevent=void 0,this.transitions=void 0,this.views=void 0,this.dom=T,this.helpers=P,this.history=A,this.request=Z,this.url=H,this.D=void 0,this.B=void 0,this.q=void 0,this.F=void 0}var I=B.prototype;return I.use=function(b,p){var x=this.plugins;x.indexOf(b)>-1?this.logger.warn("Plugin ["+b.name+"] already installed."):typeof b.install=="function"?(b.install(this,p),x.push(b)):this.logger.warn("Plugin ["+b.name+'] has no "install" method.')},I.init=function(b){var p=b===void 0?{}:b,x=p.transitions,R=x===void 0?[]:x,O=p.views,k=O===void 0?[]:O,L=p.schema,Q=L===void 0?g:L,st=p.requestError,dt=p.timeout,nt=dt===void 0?2e3:dt,K=p.cacheIgnore,tt=K!==void 0&&K,mt=p.cacheFirstPage,xt=mt!==void 0&&mt,ot=p.prefetchIgnore,At=ot!==void 0&&ot,D=p.preventRunning,lt=D!==void 0&&D,ht=p.prevent,ct=ht===void 0?null:ht,it=p.debug,j=p.logLevel;if(d.setLevel((it!==void 0&&it)===!0?"debug":j===void 0?"off":j),this.logger.info(this.version),Object.keys(Q).forEach(function(zt){g[zt]&&(g[zt]=Q[zt])}),this.B=st,this.timeout=nt,this.cacheIgnore=tt,this.cacheFirstPage=xt,this.prefetchIgnore=At,this.preventRunning=lt,this.q=this.dom.getWrapper(),!this.q)throw new Error("[@barba/core] No Barba wrapper found");this.I();var vt=this.data.current;if(!vt.container)throw new Error("[@barba/core] No Barba container found");if(this.cache=new ft(tt),this.headers=new Et,this.prevent=new we(At),this.transitions=new Ht(R),this.views=new Wt(k),ct!==null){if(typeof ct!="function")throw new Error("[@barba/core] Prevent should be a function");this.prevent.add("preventCustom",ct)}this.history.init(vt.url.href,vt.namespace),xt&&this.cache.set(vt.url.href,Promise.resolve({html:vt.html,url:vt.url}),"init","fulfilled"),this.U=this.U.bind(this),this.$=this.$.bind(this),this.X=this.X.bind(this),this.G(),this.plugins.forEach(function(zt){return zt.init()});var gt=this.data;gt.trigger="barba",gt.next=gt.current,gt.current=e({},this.schemaPage),this.hooks.do("ready",gt),this.once(gt),this.I()},I.destroy=function(){this.I(),this.J(),this.history.clear(),this.hooks.clear(),this.plugins=[]},I.force=function(b){window.location.assign(b)},I.go=function(b,p,x){var R;if(p===void 0&&(p="barba"),this.F=null,this.transitions.isRunning)this.force(b);else if(!(R=p==="popstate"?this.history.current&&this.url.getPath(this.history.current.url)===this.url.getPath(b)&&this.url.getQuery(this.history.current.url,!0)===this.url.getQuery(b,!0):this.prevent.run("sameUrl",null,null,b))||this.transitions.hasSelf)return p=this.history.change(this.cache.has(b)?this.cache.get(b).target:b,p,x),x&&(x.stopPropagation(),x.preventDefault()),this.page(b,p,x??void 0,R)},I.once=function(b){try{var p=this;return Promise.resolve(p.hooks.do("beforeEnter",b)).then(function(){function x(){return Promise.resolve(p.hooks.do("afterEnter",b)).then(function(){})}var R=(function(){if(p.transitions.hasOnce){var O=p.transitions.get(b,{once:!0});return Promise.resolve(p.transitions.doOnce({transition:O,data:b})).then(function(){})}})();return R&&R.then?R.then(x):x()})}catch(x){return Promise.reject(x)}},I.page=function(b,p,x,R){try{var O,k=function(){var dt=L.data;return Promise.resolve(L.hooks.do("page",dt)).then(function(){var nt=(function(K,tt){try{var mt=(xt=L.transitions.get(dt,{once:!1,self:R}),Promise.resolve(L.transitions.doPage({data:dt,page:O,transition:xt,wrapper:L.q})).then(function(){L.I()}))}catch{return tt()}var xt;return mt&&mt.then?mt.then(void 0,tt):mt})(0,function(){d.getLevel()===0&&L.force(dt.next.url.href)});if(nt&&nt.then)return nt.then(function(){})})},L=this;if(L.data.next.url=e({href:b},L.url.parse(b)),L.data.trigger=p,L.data.event=x,L.cache.has(b))O=L.cache.update(b,{action:"click"}).request;else{var Q=L.request(b,L.timeout,L.onRequestError.bind(L,p),L.cache,L.headers);Q.then(function(dt){dt.url.href!==b&&L.history.add(dt.url.href,p,"replace")}),O=L.cache.set(b,Q,"click","pending").request}var st=(function(){if(L.transitions.shouldWait)return Promise.resolve(C(O,L.data)).then(function(){})})();return Promise.resolve(st&&st.then?st.then(k):k())}catch(dt){return Promise.reject(dt)}},I.onRequestError=function(b){this.transitions.isRunning=!1;var p=[].slice.call(arguments,1),x=p[0],R=p[1],O=this.cache.getAction(x);return this.cache.delete(x),this.B&&this.B(b,O,x,R)===!1||O==="click"&&this.force(x),!1},I.prefetch=function(b){var p=this;b=this.url.getAbsoluteHref(b),this.cache.has(b)||this.cache.set(b,this.request(b,this.timeout,this.onRequestError.bind(this,"barba"),this.cache,this.headers).catch(function(x){p.logger.error(x)}),"prefetch","pending")},I.G=function(){this.prefetchIgnore!==!0&&(document.addEventListener("mouseover",this.U),document.addEventListener("touchstart",this.U)),document.addEventListener("click",this.$),window.addEventListener("popstate",this.X)},I.J=function(){this.prefetchIgnore!==!0&&(document.removeEventListener("mouseover",this.U),document.removeEventListener("touchstart",this.U)),document.removeEventListener("click",this.$),window.removeEventListener("popstate",this.X)},I.U=function(b){var p=this,x=this.W(b);if(x){var R=this.url.getAbsoluteHref(this.dom.getHref(x));this.prevent.checkHref(R)||this.cache.has(R)||this.cache.set(R,this.request(R,this.timeout,this.onRequestError.bind(this,x),this.cache,this.headers).catch(function(O){p.logger.error(O)}),"enter","pending")}},I.$=function(b){var p=this.W(b);if(p){if(this.transitions.isRunning&&this.preventRunning)return b.preventDefault(),void b.stopPropagation();this.F=b,this.go(this.dom.getHref(p),p,b)}},I.X=function(b){this.go(this.url.getHref(),"popstate",b)},I.W=function(b){for(var p=b.target;p&&!this.dom.getHref(p);)p=p.parentNode;if(p&&!this.prevent.checkLink(p,b,this.dom.getHref(p)))return p},I.I=function(){var b=this.url.getHref(),p={container:this.dom.getContainer(),html:this.dom.getHtml(),namespace:this.dom.getNamespace(),url:e({href:b},this.url.parse(b))};this.D={current:p,event:void 0,next:e({},this.schemaPage),trigger:void 0},this.hooks.do("reset",this.data)},t(B,[{key:"data",get:function(){return this.D}},{key:"wrapper",get:function(){return this.q}}]),B})();return new St})});var ca=class extends Event{oldState;newState;constructor(r,{oldState:t="",newState:e="",...n}={}){super(r,n),this.oldState=String(t||""),this.newState=String(e||"")}},Gh=new WeakMap;function $h(r,t,e){Gh.set(r,setTimeout(()=>{Gh.has(r)&&r.dispatchEvent(new ca("toggle",{cancelable:!1,oldState:t,newState:e}))},0))}var Ec=globalThis.ShadowRoot||function(){},yp=globalThis.HTMLDialogElement||function(){},ra=new WeakMap,Wn=new WeakMap,mn=new WeakMap,_r=new WeakMap;function sa(r){return _r.get(r)||"hidden"}var aa=new WeakMap;function as(r){return[...r].pop()}function bp(r){let t=r.popoverTargetElement;if(!(t instanceof HTMLElement))return;let e=sa(t);r.popoverTargetAction==="show"&&e==="showing"||r.popoverTargetAction==="hide"&&e==="hidden"||(e==="showing"?yr(t,!0,!0):Ni(t,!1)&&(aa.set(t,r),wc(t)))}function Ni(r,t){return!(r.popover!=="auto"&&r.popover!=="manual"&&r.popover!=="hint"||!r.isConnected||t&&sa(r)!=="showing"||!t&&sa(r)!=="hidden"||r instanceof yp&&r.hasAttribute("open")||document.fullscreenElement===r)}function Hh(r){if(!r)return 0;let t=Wn.get(document)||new Set,e=mn.get(document)||new Set;return e.has(r)?[...e].indexOf(r)+t.size+1:t.has(r)?[...t].indexOf(r)+1:0}function Mp(r){let t=Jh(r),e=Sp(r);return Hh(t)>Hh(e)?t:e}function os(r){let t,e=mn.get(r)||new Set,n=Wn.get(r)||new Set,i=e.size>0?e:n.size>0?n:null;return i?(t=as(i),t.isConnected?t:(i.delete(t),os(r))):null}function Wh(r){for(let t of r||[])if(!t.isConnected)r.delete(t);else return t;return null}function vr(r){return typeof r.getRootNode=="function"?r.getRootNode():r.parentNode?vr(r.parentNode):r}function Jh(r){for(;r;){if(r instanceof HTMLElement&&r.popover==="auto"&&_r.get(r)==="showing")return r;if(r=r instanceof Element&&r.assignedSlot||r.parentElement||vr(r),r instanceof Ec&&(r=r.host),r instanceof Document)return}}function Sp(r){for(;r;){let t=r.popoverTargetElement;if(t instanceof HTMLElement)return t;if(r=r.parentElement||vr(r),r instanceof Ec&&(r=r.host),r instanceof Document)return}}function Xh(r,t){let e=new Map,n=0;for(let a of t||[])e.set(a,n),n+=1;e.set(r,n),n+=1;let i=null;function s(a){if(!a)return;let o=!1,c=null,l=null;for(;!o;){if(c=Jh(a)||null,c===null||!e.has(c))return;(r.popover==="hint"||c.popover==="auto")&&(o=!0),o||(a=c.parentElement)}l=e.get(c),(i===null||e.get(i)<l)&&(i=c)}return s(r.parentElement||vr(r)),i}function wp(r){return r.hidden||r instanceof Ec||(r instanceof HTMLButtonElement||r instanceof HTMLInputElement||r instanceof HTMLSelectElement||r instanceof HTMLTextAreaElement||r instanceof HTMLOptGroupElement||r instanceof HTMLOptionElement||r instanceof HTMLFieldSetElement)&&r.disabled||r instanceof HTMLInputElement&&r.type==="hidden"||r instanceof HTMLAnchorElement&&r.href===""?!1:typeof r.tabIndex=="number"&&r.tabIndex!==-1}function Tp(r){if(r.shadowRoot&&r.shadowRoot.delegatesFocus!==!0)return null;let t=r;t.shadowRoot&&(t=t.shadowRoot);let e=t.querySelector("[autofocus]");if(e)return e;{let s=t.querySelectorAll("slot");for(let a of s){let o=a.assignedElements({flatten:!0});for(let c of o){if(c.hasAttribute("autofocus"))return c;if(e=c.querySelector("[autofocus]"),e)return e}}}let n=r.ownerDocument.createTreeWalker(t,NodeFilter.SHOW_ELEMENT),i=n.currentNode;for(;i;){if(wp(i))return i;i=n.nextNode()}}function Ep(r){var t;(t=Tp(r))==null||t.focus()}var oa=new WeakMap;function wc(r){if(!Ni(r,!1))return;let t=r.ownerDocument;if(!r.dispatchEvent(new ca("beforetoggle",{cancelable:!0,oldState:"closed",newState:"open"}))||!Ni(r,!1))return;let e=!1,n=r.popover,i=null,s=Xh(r,Wn.get(t)||new Set),a=Xh(r,mn.get(t)||new Set);if(n==="auto"&&(Tc(mn.get(t)||new Set,e,!0),Fi(s||t,e,!0),i="auto"),n==="hint"&&(a?(Fi(a,e,!0),i="hint"):(Tc(mn.get(t)||new Set,e,!0),s?(Fi(s,e,!0),i="auto"):i="hint")),n==="auto"||n==="hint"){if(n!==r.popover||!Ni(r,!1))return;os(t)||(e=!0),i==="auto"?(Wn.has(t)||Wn.set(t,new Set),Wn.get(t).add(r)):i==="hint"&&(mn.has(t)||mn.set(t,new Set),mn.get(t).add(r))}oa.delete(r);let o=t.activeElement;r.classList.add(":popover-open"),_r.set(r,"showing"),ra.has(t)||ra.set(t,new Set),ra.get(t).add(r),Kh(aa.get(r),!0),Ep(r),e&&o&&r.popover==="auto"&&oa.set(r,o),$h(r,"closed","open")}function yr(r,t=!1,e=!1){var n,i;if(!Ni(r,!0))return;let s=r.ownerDocument;if(["auto","hint"].includes(r.popover)&&(Fi(r,t,e),!Ni(r,!0)))return;let a=Wn.get(s)||new Set,o=a.has(r)&&as(a)===r;if(Kh(aa.get(r),!1),aa.delete(r),e&&(r.dispatchEvent(new ca("beforetoggle",{oldState:"open",newState:"closed"})),o&&as(a)!==r&&Fi(r,t,e),!Ni(r,!0)))return;(n=ra.get(s))==null||n.delete(r),a.delete(r),(i=mn.get(s))==null||i.delete(r),r.classList.remove(":popover-open"),_r.set(r,"hidden"),e&&$h(r,"open","closed");let c=oa.get(r);c&&(oa.delete(r),t&&c.focus())}function Ap(r,t=!1,e=!1){let n=os(r);for(;n;)yr(n,t,e),n=os(r)}function Tc(r,t=!1,e=!1){let n=Wh(r);for(;n;)yr(n,t,e),n=Wh(r)}function qh(r,t,e,n){let i=!1,s=!1;for(;i||!s;){s=!0;let a=null,o=!1;for(let c of t)if(c===r)o=!0;else if(o){a=c;break}if(!a)return;for(;sa(a)==="showing"&&t.size;)yr(as(t),e,n);t.has(r)&&as(t)!==r&&(i=!0),i&&(n=!1)}}function Fi(r,t,e){var n,i;let s=r.ownerDocument||r;if(r instanceof Document)return Ap(s,t,e);if((n=mn.get(s))!=null&&n.has(r)){qh(r,mn.get(s),t,e);return}Tc(mn.get(s)||new Set,t,e),(i=Wn.get(s))!=null&&i.has(r)&&qh(r,Wn.get(s),t,e)}var bc=new WeakMap;function Yh(r){if(!r.isTrusted)return;let t=r.composedPath()[0];if(!t)return;let e=t.ownerDocument;if(!os(e))return;let i=Mp(t);if(i&&r.type==="pointerdown")bc.set(e,i);else if(r.type==="pointerup"){let s=bc.get(e)===i;bc.delete(e),s&&Fi(i||e,!1,!0)}}var Mc=new WeakMap;function Kh(r,t=!1){if(!r)return;Mc.has(r)||Mc.set(r,r.getAttribute("aria-expanded"));let e=r.popoverTargetElement;if(e instanceof HTMLElement&&e.popover==="auto")r.setAttribute("aria-expanded",String(t));else{let n=Mc.get(r);n?r.setAttribute("aria-expanded",n):r.removeAttribute("aria-expanded")}}var Zh=globalThis.ShadowRoot||function(){};function Cp(){return typeof HTMLElement<"u"&&typeof HTMLElement.prototype=="object"&&"popover"in HTMLElement.prototype}function Ui(r,t,e){let n=r[t];Object.defineProperty(r,t,{value(i){return n.call(this,e(i))}})}var Rp=/(^|[^\\]):popover-open\b/g;function Pp(){return typeof globalThis.CSSLayerBlockRule=="function"}function Ip(){let r=Pp();return`
${r?"@layer popover-polyfill {":""}
  :where([popover]) {
    position: fixed;
    z-index: 2147483647;
    inset: 0;
    padding: 0.25em;
    width: fit-content;
    height: fit-content;
    border-width: initial;
    border-color: initial;
    border-image: initial;
    border-style: solid;
    background-color: canvas;
    color: canvastext;
    overflow: auto;
    margin: auto;
  }

  :where([popover]:not(.\\:popover-open)) {
    display: none;
  }

  :where(dialog[popover].\\:popover-open) {
    display: block;
  }

  :where(dialog[popover][open]) {
    display: revert;
  }

  :where([anchor].\\:popover-open) {
    inset: auto;
  }

  :where([anchor]:popover-open) {
    inset: auto;
  }

  @supports not (background-color: canvas) {
    :where([popover]) {
      background-color: white;
      color: black;
    }
  }

  @supports (width: -moz-fit-content) {
    :where([popover]) {
      width: -moz-fit-content;
      height: -moz-fit-content;
    }
  }

  @supports not (inset: 0) {
    :where([popover]) {
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
    }
  }
${r?"}":""}
`}var xr=null;function Sc(r){let t=Ip();if(xr===null)try{xr=new CSSStyleSheet,xr.replaceSync(t)}catch{xr=!1}if(xr===!1){let e=document.createElement("style");e.textContent=t,r instanceof Document?r.head.prepend(e):r.prepend(e)}else r.adoptedStyleSheets=[xr,...r.adoptedStyleSheets]}function Lp(){if(typeof window>"u")return;window.ToggleEvent=window.ToggleEvent||ca;function r(c){return c?.includes(":popover-open")&&(c=c.replace(Rp,"$1.\\:popover-open")),c}Ui(Document.prototype,"querySelector",r),Ui(Document.prototype,"querySelectorAll",r),Ui(Element.prototype,"querySelector",r),Ui(Element.prototype,"querySelectorAll",r),Ui(Element.prototype,"matches",r),Ui(Element.prototype,"closest",r),Ui(DocumentFragment.prototype,"querySelectorAll",r),Object.defineProperties(HTMLElement.prototype,{popover:{enumerable:!0,configurable:!0,get(){if(!this.hasAttribute("popover"))return null;let c=(this.getAttribute("popover")||"").toLowerCase();return c===""||c=="auto"?"auto":c=="hint"?"hint":"manual"},set(c){c===null?this.removeAttribute("popover"):this.setAttribute("popover",c)}},showPopover:{enumerable:!0,configurable:!0,value(c={}){wc(this)}},hidePopover:{enumerable:!0,configurable:!0,value(){yr(this,!0,!0)}},togglePopover:{enumerable:!0,configurable:!0,value(c={}){return typeof c=="boolean"&&(c={force:c}),_r.get(this)==="showing"&&c.force===void 0||c.force===!1?yr(this,!0,!0):(c.force===void 0||c.force===!0)&&wc(this),_r.get(this)==="showing"}}});let t=Element.prototype.attachShadow;t&&Object.defineProperties(Element.prototype,{attachShadow:{enumerable:!0,configurable:!0,writable:!0,value(c){let l=t.call(this,c);return Sc(l),l}}});let e=HTMLElement.prototype.attachInternals;e&&Object.defineProperties(HTMLElement.prototype,{attachInternals:{enumerable:!0,configurable:!0,writable:!0,value(){let c=e.call(this);return c.shadowRoot&&Sc(c.shadowRoot),c}}});let n=new WeakMap;function i(c){Object.defineProperties(c.prototype,{popoverTargetElement:{enumerable:!0,configurable:!0,set(l){if(l===null)this.removeAttribute("popovertarget"),n.delete(this);else if(l instanceof Element)this.setAttribute("popovertarget",""),n.set(this,l);else throw new TypeError("popoverTargetElement must be an element or null")},get(){if(this.localName!=="button"&&this.localName!=="input"||this.localName==="input"&&this.type!=="reset"&&this.type!=="image"&&this.type!=="button"||this.disabled||this.form&&this.type==="submit")return null;let l=n.get(this);if(l&&l.isConnected)return l;if(l&&!l.isConnected)return n.delete(this),null;let h=vr(this),u=this.getAttribute("popovertarget");return(h instanceof Document||h instanceof Zh)&&u&&h.getElementById(u)||null}},popoverTargetAction:{enumerable:!0,configurable:!0,get(){let l=(this.getAttribute("popovertargetaction")||"").toLowerCase();return l==="show"||l==="hide"?l:"toggle"},set(l){this.setAttribute("popovertargetaction",l)}}})}i(HTMLButtonElement),i(HTMLInputElement);let s=c=>{if(c.defaultPrevented)return;let l=c.composedPath(),h=l[0];if(!(h instanceof Element)||h?.shadowRoot)return;let u=vr(h);if(!(u instanceof Zh||u instanceof Document))return;let f=l.find(d=>{var v;return(v=d.matches)==null?void 0:v.call(d,"[popovertargetaction],[popovertarget]")});if(f){bp(f),c.preventDefault();return}},a=c=>{let l=c.key,h=c.target;!c.defaultPrevented&&h&&(l==="Escape"||l==="Esc")&&Fi(h.ownerDocument,!0,!0)};(c=>{c.addEventListener("click",s),c.addEventListener("keydown",a),c.addEventListener("pointerdown",Yh),c.addEventListener("pointerup",Yh)})(document),Sc(document)}Cp()||Lp();function jh(r,t){for(var e=0;e<t.length;e++){var n=t[e];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(r,n.key,n)}}function la(r){return(function(t){if(Array.isArray(t))return Ac(t)})(r)||(function(t){if(typeof Symbol<"u"&&Symbol.iterator in Object(t))return Array.from(t)})(r)||(function(t,e){if(t){if(typeof t=="string")return Ac(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);if(n==="Object"&&t.constructor&&(n=t.constructor.name),n==="Map"||n==="Set")return Array.from(t);if(n==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return Ac(t,e)}})(r)||(function(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)})()}function Ac(r,t){(t==null||t>r.length)&&(t=r.length);for(var e=0,n=new Array(t);e<t;e++)n[e]=r[e];return n}var Qh,Cc,Oi,Rc,tu,eu=(Qh=["a[href]","area[href]",'input:not([disabled]):not([type="hidden"]):not([aria-hidden])',"select:not([disabled]):not([aria-hidden])","textarea:not([disabled]):not([aria-hidden])","button:not([disabled]):not([aria-hidden])","iframe","object","embed","[contenteditable]",'[tabindex]:not([tabindex^="-"])'],Cc=(function(){function r(i){var s=i.targetModal,a=i.triggers,o=a===void 0?[]:a,c=i.onShow,l=c===void 0?function(){}:c,h=i.onClose,u=h===void 0?function(){}:h,f=i.openTrigger,d=f===void 0?"data-micromodal-trigger":f,v=i.closeTrigger,_=v===void 0?"data-micromodal-close":v,g=i.openClass,m=g===void 0?"is-open":g,T=i.disableScroll,w=T!==void 0&&T,A=i.disableFocus,C=A!==void 0&&A,E=i.awaitCloseAnimation,P=E!==void 0&&E,F=i.awaitOpenAnimation,y=F!==void 0&&F,M=i.debugMode,N=M!==void 0&&M;(function(G,H){if(!(G instanceof H))throw new TypeError("Cannot call a class as a function")})(this,r),this.modal=typeof s=="string"?document.getElementById(s):s,this.config={debugMode:N,disableScroll:w,openTrigger:d,closeTrigger:_,openClass:m,onShow:l,onClose:u,awaitCloseAnimation:P,awaitOpenAnimation:y,disableFocus:C},o.length>0&&this.registerTriggers.apply(this,la(o)),this.onClick=this.onClick.bind(this),this.onKeydown=this.onKeydown.bind(this)}var t,e,n;return t=r,(e=[{key:"registerTriggers",value:function(){for(var i=this,s=arguments.length,a=new Array(s),o=0;o<s;o++)a[o]=arguments[o];a.filter(Boolean).forEach((function(c){c.addEventListener("click",(function(l){return i.showModal(l)}))}))}},{key:"showModal",value:function(){var i=this,s=arguments.length>0&&arguments[0]!==void 0?arguments[0]:null;if(this.activeElement=document.activeElement,this.modal.setAttribute("aria-hidden","false"),this.modal.classList.add(this.config.openClass),this.scrollBehaviour("disable"),this.addEventListeners(),this.config.awaitOpenAnimation){var a=function o(){i.modal.removeEventListener("animationend",o,!1),i.setFocusToFirstNode()};this.modal.addEventListener("animationend",a,!1)}else this.setFocusToFirstNode();this.config.onShow(this.modal,this.activeElement,s)}},{key:"closeModal",value:function(){var i=arguments.length>0&&arguments[0]!==void 0?arguments[0]:null,s=this.modal;if(this.modal.setAttribute("aria-hidden","true"),this.removeEventListeners(),this.scrollBehaviour("enable"),this.activeElement&&this.activeElement.focus&&this.activeElement.focus(),this.config.onClose(this.modal,this.activeElement,i),this.config.awaitCloseAnimation){var a=this.config.openClass;this.modal.addEventListener("animationend",(function o(){s.classList.remove(a),s.removeEventListener("animationend",o,!1)}),!1)}else s.classList.remove(this.config.openClass)}},{key:"closeModalByIdOrElement",value:function(i){this.modal=typeof i=="string"?document.getElementById(i):i,this.modal&&this.closeModal()}},{key:"scrollBehaviour",value:function(i){if(this.config.disableScroll){var s=document.querySelector("body");switch(i){case"enable":Object.assign(s.style,{overflow:""});break;case"disable":Object.assign(s.style,{overflow:"hidden"})}}}},{key:"addEventListeners",value:function(){this.modal.addEventListener("touchstart",this.onClick),this.modal.addEventListener("click",this.onClick),document.addEventListener("keydown",this.onKeydown)}},{key:"removeEventListeners",value:function(){this.modal.removeEventListener("touchstart",this.onClick),this.modal.removeEventListener("click",this.onClick),document.removeEventListener("keydown",this.onKeydown)}},{key:"onClick",value:function(i){(i.target.hasAttribute(this.config.closeTrigger)||i.target.parentNode.hasAttribute(this.config.closeTrigger))&&(i.preventDefault(),i.stopPropagation(),this.closeModal(i))}},{key:"onKeydown",value:function(i){i.keyCode===27&&this.closeModal(i),i.keyCode===9&&this.retainFocus(i)}},{key:"getFocusableNodes",value:function(){var i=this.modal.querySelectorAll(Qh);return Array.apply(void 0,la(i))}},{key:"setFocusToFirstNode",value:function(){var i=this;if(!this.config.disableFocus){var s=this.getFocusableNodes();if(s.length!==0){var a=s.filter((function(o){return!o.hasAttribute(i.config.closeTrigger)}));a.length>0&&a[0].focus(),a.length===0&&s[0].focus()}}}},{key:"retainFocus",value:function(i){var s=this.getFocusableNodes();if(s.length!==0)if(s=s.filter((function(o){return o.offsetParent!==null})),this.modal.contains(document.activeElement)){var a=s.indexOf(document.activeElement);i.shiftKey&&a===0&&(s[s.length-1].focus(),i.preventDefault()),!i.shiftKey&&s.length>0&&a===s.length-1&&(s[0].focus(),i.preventDefault())}else s[0].focus()}}])&&jh(t.prototype,e),n&&jh(t,n),r})(),Oi=null,Rc=function(r){if(typeof id=="string"?!document.getElementById(r):!r)return console.warn("MicroModal: \u2757Seems like you have missed %c'".concat(r,"'"),"background-color: #f8f9fa;color: #50596c;font-weight: bold;","ID somewhere in your code. Refer example below to resolve it."),console.warn("%cExample:","background-color: #f8f9fa;color: #50596c;font-weight: bold;",'<div class="modal" id="'.concat(r,'"></div>')),!1},tu=function(r,t){if((function(n){n.length<=0&&(console.warn("MicroModal: \u2757Please specify at least one %c'micromodal-trigger'","background-color: #f8f9fa;color: #50596c;font-weight: bold;","data attribute."),console.warn("%cExample:","background-color: #f8f9fa;color: #50596c;font-weight: bold;",'<a href="#" data-micromodal-trigger="my-modal"></a>'))})(r),!t)return!0;for(var e in t)Rc(e);return!0},{init:function(r){var t=Object.assign({},{openTrigger:"data-micromodal-trigger"},r),e=la(document.querySelectorAll("[".concat(t.openTrigger,"]"))),n=(function(a,o){var c=[];return a.forEach((function(l){var h=l.attributes[o].value;c[h]===void 0&&(c[h]=[]),c[h].push(l)})),c})(e,t.openTrigger);if(t.debugMode!==!0||tu(e,n)!==!1)for(var i in n){var s=n[i];t.targetModal=i,t.triggers=la(s),Oi=new Cc(t)}},show:function(r,t){var e=t||{};e.targetModal=r,e.debugMode===!0&&Rc(r)===!1||(Oi&&Oi.removeEventListeners(),(Oi=new Cc(e)).showModal())},close:function(r){r?Oi.closeModalByIdOrElement(r):Oi.closeModal()}});typeof window<"u"&&(window.MicroModal=eu);var nu=eu;Pc();var Ic=class{constructor(){this.worksSection=document.querySelector(".js-work"),this.workList=document.querySelector(".js-work-list"),this.workCards=document.querySelectorAll(".js-work-card"),this.currentCard=null,this.detailsBlock=null,this.workData=[],!(!this.worksSection||!this.workList)&&this.init()}init(){this.extractWorkData(),this.workCards.forEach((t,e)=>{let n=t.querySelector(".js-work-trigger");n&&n.addEventListener("click",i=>{i.preventDefault(),i.stopPropagation(),this.toggleDetails(e,t)})}),this.escapeHandler=t=>{t.key==="Escape"&&this.currentCard!==null&&this.close()},document.addEventListener("keydown",this.escapeHandler)}extractWorkData(){this.workCards.forEach(t=>{let e=t.querySelector(".js-work-trigger img"),n=t.querySelector(".p-portfolio__work-title");if(e&&n){let i=t.dataset.workMeta||"",s=t.dataset.workTags||"[]",a=JSON.parse(s),o=t.dataset.workSummary||"",c=t.dataset.workDescription||"",l=t.dataset.workImages||"[]",h=JSON.parse(l);this.workData.push({image:e.src,alt:e.alt,title:n.textContent,meta:i,tags:a,summary:o,description:c,images:h.length>0?h:[e.src]})}})}async toggleDetails(t,e){if(this.currentCard===e&&this.detailsBlock){await this.close();return}await this.removeDetailsBlock(),this.insertDetailsBlock(t,e)}getGridColumnCount(){let n=window.getComputedStyle(this.workList).gridTemplateColumns.match(/repeat\((\d+)/);if(n)return parseInt(n[1],10);let i=window.innerWidth;return i>=1024?3:i>=768?2:1}getRowNumber(t,e){return Math.floor(t/e)}getNextRowStartCardIndex(t,e){let n=(t+1)*e,i=this.workCards.length;return n>=i?i-1:n}createDetailsElement(t){let e=document.createElement("li");return e.className="p-portfolio__work-details-block js-work-details-block",e.innerHTML=t,e}getCurrentRowLastCard(t){let e=this.getGridColumnCount(),i=(this.getRowNumber(t,e)+1)*e-1,s=this.workCards.length,a=i>=s?s-1:i;return this.workCards[a]}insertDetailsBlock(t,e){let n=this.workData[t];if(!n)return;let i=this.createDetailsHTML(n,t),s=this.createDetailsElement(i);this.getCurrentRowLastCard(t).insertAdjacentElement("afterend",s),this.currentCard=e,this.detailsBlock=s,e.classList.add("is-open"),this.openDetailsBlock(s),this.setupDetailsBlockEvents(s,n,t)}setupDetailsBlockEvents(t,e,n){let i=t.querySelector(".js-work-close");i&&i.addEventListener("click",()=>{this.close()}),e.images.length>1&&this.initSlider(t)}createDetailsHTML(t,e){return`
			<div class="p-portfolio__work-details-content">
				<button class="p-portfolio__work-close js-work-close" aria-label="\u8A73\u7D30\u3092\u9589\u3058\u308B">
					<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
						<line x1="18" y1="6" x2="6" y2="18"></line>
						<line x1="6" y1="6" x2="18" y2="18"></line>
					</svg>
				</button>
				<div class="p-portfolio__work-details-inner">
					<div class="p-portfolio__work-details-grid">
						${t.images.length>1?`
			<div class="c-slider" data-slider="work-details-${e}">
				<div class="c-slider__viewport">
					<div class="c-slider__track">
						${t.images.map((i,s)=>`
							<div class="c-slider__slide">
								<img src="${i}" alt="${t.alt} - \u753B\u50CF${s+1}" />
							</div>
						`).join("")}
					</div>
				</div>
				<button class="c-slider__button c-slider__button--prev" aria-label="\u524D\u306E\u753B\u50CF" data-slider-prev>
					<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
						<polyline points="15 18 9 12 15 6"></polyline>
					</svg>
				</button>
				<button class="c-slider__button c-slider__button--next" aria-label="\u6B21\u306E\u753B\u50CF" data-slider-next>
					<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
						<polyline points="9 18 15 12 9 6"></polyline>
					</svg>
				</button>
				<div class="c-slider__pagination" aria-label="\u30B9\u30E9\u30A4\u30C0\u30FC\u306E\u30DA\u30FC\u30B8\u30CD\u30FC\u30B7\u30E7\u30F3"></div>
			</div>
		`:`
			<div class="p-portfolio__work-details-image">
				<img src="${t.images[0]}" alt="${t.alt}" />
			</div>
		`}
						<div class="p-portfolio__work-details-text">
							<h2 class="p-portfolio__work-details-title">${t.title}</h2>
							<hr class="p-portfolio__work-details-divider" />
							${t.meta?`<p class="p-portfolio__work-details-meta">${t.meta}</p>`:""}
							${t.tags.length>0?`
								<div class="p-portfolio__work-details-tags">
									${t.tags.map(i=>`<span class="c-badge c-badge--small">${i}</span>`).join("")}
								</div>
							`:""}
							${t.summary?`<p class="p-portfolio__work-details-summary">${t.summary}</p>`:""}
							${t.description?`<p class="p-portfolio__work-details-description">${t.description}</p>`:""}
						</div>
					</div>
				</div>
			</div>
		`}initSlider(t){let e=t.querySelector("[data-slider]");e&&Promise.resolve().then(()=>(Pc(),cu)).then(({ImageSlider:n,sliderInstances:i})=>{setTimeout(()=>{if(!i.has(e)){let s=new n(e);i.set(e,s)}},0)})}scrollToDetails(t){let e=t.getBoundingClientRect(),i=(window.pageYOffset||document.documentElement.scrollTop)+e.top-20;window.scrollTo({top:i,behavior:"smooth"})}openDetailsBlock(t){t.style.height="0px",requestAnimationFrame(()=>{requestAnimationFrame(()=>{t.style.height="auto";let e=t.scrollHeight;t.style.height="0px",requestAnimationFrame(()=>{t.style.height=`${e}px`})})})}closeDetailsBlock(t){return new Promise(e=>{let n=t.scrollHeight;t.style.height=`${n}px`,requestAnimationFrame(()=>{t.style.height="0px";let i=()=>{t.removeEventListener("transitionend",i),e()};t.addEventListener("transitionend",i)})})}async removeDetailsBlock(){this.detailsBlock&&(await this.closeDetailsBlock(this.detailsBlock),this.detailsBlock.remove(),this.detailsBlock=null),this.currentCard&&this.currentCard.classList.remove("is-open"),this.currentCard=null}async close(){await this.removeDetailsBlock()}destroy(){this.close(),document.removeEventListener("keydown",this.escapeHandler)}};function lu(){document.querySelector(".js-work-list")&&new Ic}function Np(){document.readyState==="loading"?document.addEventListener("DOMContentLoaded",lu):setTimeout(lu,0)}Np();var ls=class{constructor(){this.STORAGE_KEY="theme",this.DARK_THEME_VALUE="dark",this.LIGHT_THEME_VALUE="light",this.init()}init(){this.applyInitialTheme(),this.createToggle()}applyInitialTheme(){let t=localStorage.getItem(this.STORAGE_KEY);t?document.documentElement.setAttribute("data-theme",t):window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches&&document.documentElement.setAttribute("data-theme",this.DARK_THEME_VALUE)}createToggle(){let t=document.querySelector(".p-portfolio__nav-inner");if(!t)return;let e=document.createElement("button");e.className="c-theme-toggle",e.setAttribute("aria-label","\u30C6\u30FC\u30DE\u5207\u308A\u66FF\u3048"),e.innerHTML=`
			<svg class="c-theme-toggle__icon c-theme-toggle__icon--sun" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
			<svg class="c-theme-toggle__icon c-theme-toggle__icon--moon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
		`,e.addEventListener("click",()=>this.toggleTheme()),t.appendChild(e)}toggleTheme(){let e=document.documentElement.getAttribute("data-theme")===this.DARK_THEME_VALUE?this.LIGHT_THEME_VALUE:this.DARK_THEME_VALUE;document.documentElement.setAttribute("data-theme",e),localStorage.setItem(this.STORAGE_KEY,e)}};var Au=0,ol=1,Cu=2;var cl=1,Ru=2,Un=3,Kn=0,ke=1,Nn=2,Fn=0,Wi=1,ll=2,hl=3,ul=4,Pu=5,xi=100,Iu=101,Lu=102,Du=103,Uu=104,Nu=200,Fu=201,Ou=202,Bu=203,La=204,Da=205,ku=206,zu=207,Vu=208,Gu=209,Hu=210,Wu=211,Xu=212,qu=213,Yu=214,io=0,ro=1,so=2,Xi=3,ao=4,oo=5,co=6,lo=7,fl=0,Zu=1,$u=2,ei=0,Ju=1,Ku=2,ju=3,Qu=4,tf=5,ef=6,nf=7;var dl=300,Ji=301,Ki=302,ho=303,uo=304,Is=306,Ua=1e3,Pn=1001,Na=1002,Ye=1003,rf=1004;var Ls=1005;var cn=1006,fo=1007;var bi=1008;var On=1009,pl=1010,ml=1011,Gr=1012,po=1013,Mi=1014,Bn=1015,ji=1016,mo=1017,go=1018,Hr=1020,gl=35902,xl=35899,_l=1021,vl=1022,_n=1023,Ur=1026,Wr=1027,yl=1028,xo=1029,_o=1030,vo=1031;var yo=1033,Ds=33776,Us=33777,Ns=33778,Fs=33779,bo=35840,Mo=35841,So=35842,wo=35843,To=36196,Eo=37492,Ao=37496,Co=37808,Ro=37809,Po=37810,Io=37811,Lo=37812,Do=37813,Uo=37814,No=37815,Fo=37816,Oo=37817,Bo=37818,ko=37819,zo=37820,Vo=37821,Go=36492,Ho=36494,Wo=36495,Xo=36283,qo=36284,Yo=36285,Zo=36286;var ms=2300,Fa=2301,Ia=2302,el=2400,nl=2401,il=2402;var sf=3200,af=3201;var of=0,cf=1,ni="",an="srgb",qi="srgb-linear",gs="linear",ee="srgb";var Gi=7680;var rl=519,lf=512,hf=513,uf=514,bl=515,ff=516,df=517,pf=518,mf=519,sl=35044;var Ml="300 es",An=2e3,xs=2001;function Sl(r){for(let t=r.length-1;t>=0;--t)if(r[t]>=65535)return!0;return!1}function _s(r){return document.createElementNS("http://www.w3.org/1999/xhtml",r)}function gf(){let r=_s("canvas");return r.style.display="block",r}var hu={},Nr=null;function wl(...r){let t="THREE."+r.shift();Nr?Nr("log",t,...r):console.log(t,...r)}function Dt(...r){let t="THREE."+r.shift();Nr?Nr("warn",t,...r):console.warn(t,...r)}function Xt(...r){let t="THREE."+r.shift();Nr?Nr("error",t,...r):console.error(t,...r)}function Fr(...r){let t=r.join(" ");t in hu||(hu[t]=!0,Dt(...r))}function xf(r,t,e){return new Promise(function(n,i){function s(){switch(r.clientWaitSync(t,r.SYNC_FLUSH_COMMANDS_BIT,0)){case r.WAIT_FAILED:i();break;case r.TIMEOUT_EXPIRED:setTimeout(s,e);break;default:n()}}setTimeout(s,e)})}var jn=class{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){let n=this._listeners;return n===void 0?!1:n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){let n=this._listeners;if(n===void 0)return;let i=n[t];if(i!==void 0){let s=i.indexOf(e);s!==-1&&i.splice(s,1)}}dispatchEvent(t){let e=this._listeners;if(e===void 0)return;let n=e[t.type];if(n!==void 0){t.target=this;let i=n.slice(0);for(let s=0,a=i.length;s<a;s++)i[s].call(this,t);t.target=null}}},De=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];var Lc=Math.PI/180,Oa=180/Math.PI;function Os(){let r=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(De[r&255]+De[r>>8&255]+De[r>>16&255]+De[r>>24&255]+"-"+De[t&255]+De[t>>8&255]+"-"+De[t>>16&15|64]+De[t>>24&255]+"-"+De[e&63|128]+De[e>>8&255]+"-"+De[e>>16&255]+De[e>>24&255]+De[n&255]+De[n>>8&255]+De[n>>16&255]+De[n>>24&255]).toLowerCase()}function Zt(r,t,e){return Math.max(t,Math.min(e,r))}function Fp(r,t){return(r%t+t)%t}function Dc(r,t,e){return(1-e)*r+e*t}function hs(r,t){switch(t.constructor){case Float32Array:return r;case Uint32Array:return r/4294967295;case Uint16Array:return r/65535;case Uint8Array:return r/255;case Int32Array:return Math.max(r/2147483647,-1);case Int16Array:return Math.max(r/32767,-1);case Int8Array:return Math.max(r/127,-1);default:throw new Error("Invalid component type.")}}function Xe(r,t){switch(t.constructor){case Float32Array:return r;case Uint32Array:return Math.round(r*4294967295);case Uint16Array:return Math.round(r*65535);case Uint8Array:return Math.round(r*255);case Int32Array:return Math.round(r*2147483647);case Int16Array:return Math.round(r*32767);case Int8Array:return Math.round(r*127);default:throw new Error("Invalid component type.")}}var te=class r{constructor(t=0,e=0){r.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){let e=this.x,n=this.y,i=t.elements;return this.x=i[0]*e+i[3]*n+i[6],this.y=i[1]*e+i[4]*n+i[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Zt(this.x,t.x,e.x),this.y=Zt(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=Zt(this.x,t,e),this.y=Zt(this.y,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Zt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(Zt(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){let n=Math.cos(e),i=Math.sin(e),s=this.x-t.x,a=this.y-t.y;return this.x=s*n-a*i+t.x,this.y=s*i+a*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},Qn=class{constructor(t=0,e=0,n=0,i=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=i}static slerpFlat(t,e,n,i,s,a,o){let c=n[i+0],l=n[i+1],h=n[i+2],u=n[i+3],f=s[a+0],d=s[a+1],v=s[a+2],_=s[a+3];if(o<=0){t[e+0]=c,t[e+1]=l,t[e+2]=h,t[e+3]=u;return}if(o>=1){t[e+0]=f,t[e+1]=d,t[e+2]=v,t[e+3]=_;return}if(u!==_||c!==f||l!==d||h!==v){let g=c*f+l*d+h*v+u*_;g<0&&(f=-f,d=-d,v=-v,_=-_,g=-g);let m=1-o;if(g<.9995){let T=Math.acos(g),w=Math.sin(T);m=Math.sin(m*T)/w,o=Math.sin(o*T)/w,c=c*m+f*o,l=l*m+d*o,h=h*m+v*o,u=u*m+_*o}else{c=c*m+f*o,l=l*m+d*o,h=h*m+v*o,u=u*m+_*o;let T=1/Math.sqrt(c*c+l*l+h*h+u*u);c*=T,l*=T,h*=T,u*=T}}t[e]=c,t[e+1]=l,t[e+2]=h,t[e+3]=u}static multiplyQuaternionsFlat(t,e,n,i,s,a){let o=n[i],c=n[i+1],l=n[i+2],h=n[i+3],u=s[a],f=s[a+1],d=s[a+2],v=s[a+3];return t[e]=o*v+h*u+c*d-l*f,t[e+1]=c*v+h*f+l*u-o*d,t[e+2]=l*v+h*d+o*f-c*u,t[e+3]=h*v-o*u-c*f-l*d,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,i){return this._x=t,this._y=e,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){let n=t._x,i=t._y,s=t._z,a=t._order,o=Math.cos,c=Math.sin,l=o(n/2),h=o(i/2),u=o(s/2),f=c(n/2),d=c(i/2),v=c(s/2);switch(a){case"XYZ":this._x=f*h*u+l*d*v,this._y=l*d*u-f*h*v,this._z=l*h*v+f*d*u,this._w=l*h*u-f*d*v;break;case"YXZ":this._x=f*h*u+l*d*v,this._y=l*d*u-f*h*v,this._z=l*h*v-f*d*u,this._w=l*h*u+f*d*v;break;case"ZXY":this._x=f*h*u-l*d*v,this._y=l*d*u+f*h*v,this._z=l*h*v+f*d*u,this._w=l*h*u-f*d*v;break;case"ZYX":this._x=f*h*u-l*d*v,this._y=l*d*u+f*h*v,this._z=l*h*v-f*d*u,this._w=l*h*u+f*d*v;break;case"YZX":this._x=f*h*u+l*d*v,this._y=l*d*u+f*h*v,this._z=l*h*v-f*d*u,this._w=l*h*u-f*d*v;break;case"XZY":this._x=f*h*u-l*d*v,this._y=l*d*u-f*h*v,this._z=l*h*v+f*d*u,this._w=l*h*u+f*d*v;break;default:Dt("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){let n=e/2,i=Math.sin(n);return this._x=t.x*i,this._y=t.y*i,this._z=t.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){let e=t.elements,n=e[0],i=e[4],s=e[8],a=e[1],o=e[5],c=e[9],l=e[2],h=e[6],u=e[10],f=n+o+u;if(f>0){let d=.5/Math.sqrt(f+1);this._w=.25/d,this._x=(h-c)*d,this._y=(s-l)*d,this._z=(a-i)*d}else if(n>o&&n>u){let d=2*Math.sqrt(1+n-o-u);this._w=(h-c)/d,this._x=.25*d,this._y=(i+a)/d,this._z=(s+l)/d}else if(o>u){let d=2*Math.sqrt(1+o-n-u);this._w=(s-l)/d,this._x=(i+a)/d,this._y=.25*d,this._z=(c+h)/d}else{let d=2*Math.sqrt(1+u-n-o);this._w=(a-i)/d,this._x=(s+l)/d,this._y=(c+h)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<1e-8?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Zt(this.dot(t),-1,1)))}rotateTowards(t,e){let n=this.angleTo(t);if(n===0)return this;let i=Math.min(1,e/n);return this.slerp(t,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){let n=t._x,i=t._y,s=t._z,a=t._w,o=e._x,c=e._y,l=e._z,h=e._w;return this._x=n*h+a*o+i*l-s*c,this._y=i*h+a*c+s*o-n*l,this._z=s*h+a*l+n*c-i*o,this._w=a*h-n*o-i*c-s*l,this._onChangeCallback(),this}slerp(t,e){if(e<=0)return this;if(e>=1)return this.copy(t);let n=t._x,i=t._y,s=t._z,a=t._w,o=this.dot(t);o<0&&(n=-n,i=-i,s=-s,a=-a,o=-o);let c=1-e;if(o<.9995){let l=Math.acos(o),h=Math.sin(l);c=Math.sin(c*l)/h,e=Math.sin(e*l)/h,this._x=this._x*c+n*e,this._y=this._y*c+i*e,this._z=this._z*c+s*e,this._w=this._w*c+a*e,this._onChangeCallback()}else this._x=this._x*c+n*e,this._y=this._y*c+i*e,this._z=this._z*c+s*e,this._w=this._w*c+a*e,this.normalize();return this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){let t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(i*Math.sin(t),i*Math.cos(t),s*Math.sin(e),s*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},$=class r{constructor(t=0,e=0,n=0){r.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(uu.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(uu.setFromAxisAngle(t,e))}applyMatrix3(t){let e=this.x,n=this.y,i=this.z,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6]*i,this.y=s[1]*e+s[4]*n+s[7]*i,this.z=s[2]*e+s[5]*n+s[8]*i,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){let e=this.x,n=this.y,i=this.z,s=t.elements,a=1/(s[3]*e+s[7]*n+s[11]*i+s[15]);return this.x=(s[0]*e+s[4]*n+s[8]*i+s[12])*a,this.y=(s[1]*e+s[5]*n+s[9]*i+s[13])*a,this.z=(s[2]*e+s[6]*n+s[10]*i+s[14])*a,this}applyQuaternion(t){let e=this.x,n=this.y,i=this.z,s=t.x,a=t.y,o=t.z,c=t.w,l=2*(a*i-o*n),h=2*(o*e-s*i),u=2*(s*n-a*e);return this.x=e+c*l+a*u-o*h,this.y=n+c*h+o*l-s*u,this.z=i+c*u+s*h-a*l,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){let e=this.x,n=this.y,i=this.z,s=t.elements;return this.x=s[0]*e+s[4]*n+s[8]*i,this.y=s[1]*e+s[5]*n+s[9]*i,this.z=s[2]*e+s[6]*n+s[10]*i,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Zt(this.x,t.x,e.x),this.y=Zt(this.y,t.y,e.y),this.z=Zt(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=Zt(this.x,t,e),this.y=Zt(this.y,t,e),this.z=Zt(this.z,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Zt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){let n=t.x,i=t.y,s=t.z,a=e.x,o=e.y,c=e.z;return this.x=i*c-s*o,this.y=s*a-n*c,this.z=n*o-i*a,this}projectOnVector(t){let e=t.lengthSq();if(e===0)return this.set(0,0,0);let n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return Uc.copy(this).projectOnVector(t),this.sub(Uc)}reflect(t){return this.sub(Uc.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(Zt(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y,i=this.z-t.z;return e*e+n*n+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){let i=Math.sin(e)*t;return this.x=i*Math.sin(n),this.y=Math.cos(e)*t,this.z=i*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){let e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),i=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=i,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},Uc=new $,uu=new Qn,Ot=class r{constructor(t,e,n,i,s,a,o,c,l){r.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,i,s,a,o,c,l)}set(t,e,n,i,s,a,o,c,l){let h=this.elements;return h[0]=t,h[1]=i,h[2]=o,h[3]=e,h[4]=s,h[5]=c,h[6]=n,h[7]=a,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){let e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,i=e.elements,s=this.elements,a=n[0],o=n[3],c=n[6],l=n[1],h=n[4],u=n[7],f=n[2],d=n[5],v=n[8],_=i[0],g=i[3],m=i[6],T=i[1],w=i[4],A=i[7],C=i[2],E=i[5],P=i[8];return s[0]=a*_+o*T+c*C,s[3]=a*g+o*w+c*E,s[6]=a*m+o*A+c*P,s[1]=l*_+h*T+u*C,s[4]=l*g+h*w+u*E,s[7]=l*m+h*A+u*P,s[2]=f*_+d*T+v*C,s[5]=f*g+d*w+v*E,s[8]=f*m+d*A+v*P,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[1],i=t[2],s=t[3],a=t[4],o=t[5],c=t[6],l=t[7],h=t[8];return e*a*h-e*o*l-n*s*h+n*o*c+i*s*l-i*a*c}invert(){let t=this.elements,e=t[0],n=t[1],i=t[2],s=t[3],a=t[4],o=t[5],c=t[6],l=t[7],h=t[8],u=h*a-o*l,f=o*c-h*s,d=l*s-a*c,v=e*u+n*f+i*d;if(v===0)return this.set(0,0,0,0,0,0,0,0,0);let _=1/v;return t[0]=u*_,t[1]=(i*l-h*n)*_,t[2]=(o*n-i*a)*_,t[3]=f*_,t[4]=(h*e-i*c)*_,t[5]=(i*s-o*e)*_,t[6]=d*_,t[7]=(n*c-l*e)*_,t[8]=(a*e-n*s)*_,this}transpose(){let t,e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){let e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,i,s,a,o){let c=Math.cos(s),l=Math.sin(s);return this.set(n*c,n*l,-n*(c*a+l*o)+a+t,-i*l,i*c,-i*(-l*a+c*o)+o+e,0,0,1),this}scale(t,e){return this.premultiply(Nc.makeScale(t,e)),this}rotate(t){return this.premultiply(Nc.makeRotation(-t)),this}translate(t,e){return this.premultiply(Nc.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){let e=this.elements,n=t.elements;for(let i=0;i<9;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}},Nc=new Ot,fu=new Ot().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),du=new Ot().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Op(){let r={enabled:!0,workingColorSpace:qi,spaces:{},convert:function(i,s,a){return this.enabled===!1||s===a||!s||!a||(this.spaces[s].transfer===ee&&(i.r=Jn(i.r),i.g=Jn(i.g),i.b=Jn(i.b)),this.spaces[s].primaries!==this.spaces[a].primaries&&(i.applyMatrix3(this.spaces[s].toXYZ),i.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===ee&&(i.r=Dr(i.r),i.g=Dr(i.g),i.b=Dr(i.b))),i},workingToColorSpace:function(i,s){return this.convert(i,this.workingColorSpace,s)},colorSpaceToWorking:function(i,s){return this.convert(i,s,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===ni?gs:this.spaces[i].transfer},getToneMappingMode:function(i){return this.spaces[i].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(i,s=this.workingColorSpace){return i.fromArray(this.spaces[s].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,s,a){return i.copy(this.spaces[s].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(i,s){return Fr("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),r.workingToColorSpace(i,s)},toWorkingColorSpace:function(i,s){return Fr("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),r.colorSpaceToWorking(i,s)}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],n=[.3127,.329];return r.define({[qi]:{primaries:t,whitePoint:n,transfer:gs,toXYZ:fu,fromXYZ:du,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:an},outputColorSpaceConfig:{drawingBufferColorSpace:an}},[an]:{primaries:t,whitePoint:n,transfer:ee,toXYZ:fu,fromXYZ:du,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:an}}}),r}var jt=Op();function Jn(r){return r<.04045?r*.0773993808:Math.pow(r*.9478672986+.0521327014,2.4)}function Dr(r){return r<.0031308?r*12.92:1.055*Math.pow(r,.41666)-.055}var br,Ba=class{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let n;if(t instanceof HTMLCanvasElement)n=t;else{br===void 0&&(br=_s("canvas")),br.width=t.width,br.height=t.height;let i=br.getContext("2d");t instanceof ImageData?i.putImageData(t,0,0):i.drawImage(t,0,0,t.width,t.height),n=br}return n.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){let e=_s("canvas");e.width=t.width,e.height=t.height;let n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);let i=n.getImageData(0,0,t.width,t.height),s=i.data;for(let a=0;a<s.length;a++)s[a]=Jn(s[a]/255)*255;return n.putImageData(i,0,0),e}else if(t.data){let e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(Jn(e[n]/255)*255):e[n]=Jn(e[n]);return{data:e,width:t.width,height:t.height}}else return Dt("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}},Bp=0,Or=class{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Bp++}),this.uuid=Os(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){let e=this.data;return typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):e instanceof VideoFrame?t.set(e.displayHeight,e.displayWidth,0):e!==null?t.set(e.width,e.height,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];let n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let s;if(Array.isArray(i)){s=[];for(let a=0,o=i.length;a<o;a++)i[a].isDataTexture?s.push(Fc(i[a].image)):s.push(Fc(i[a]))}else s=Fc(i);n.url=s}return e||(t.images[this.uuid]=n),n}};function Fc(r){return typeof HTMLImageElement<"u"&&r instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&r instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&r instanceof ImageBitmap?Ba.getDataURL(r):r.data?{data:Array.from(r.data),width:r.width,height:r.height,type:r.data.constructor.name}:(Dt("Texture: Unable to serialize Texture."),{})}var kp=0,Oc=new $,Ze=class r extends jn{constructor(t=r.DEFAULT_IMAGE,e=r.DEFAULT_MAPPING,n=Pn,i=Pn,s=cn,a=bi,o=_n,c=On,l=r.DEFAULT_ANISOTROPY,h=ni){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:kp++}),this.uuid=Os(),this.name="",this.source=new Or(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=s,this.minFilter=a,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new te(0,0),this.repeat=new te(1,1),this.center=new te(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ot,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(Oc).x}get height(){return this.source.getSize(Oc).y}get depth(){return this.source.getSize(Oc).z}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(let e in t){let n=t[e];if(n===void 0){Dt(`Texture.setValues(): parameter '${e}' has value of undefined.`);continue}let i=this[e];if(i===void 0){Dt(`Texture.setValues(): property '${e}' does not exist.`);continue}i&&n&&i.isVector2&&n.isVector2||i&&n&&i.isVector3&&n.isVector3||i&&n&&i.isMatrix3&&n.isMatrix3?i.copy(n):this[e]=n}}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==dl)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Ua:t.x=t.x-Math.floor(t.x);break;case Pn:t.x=t.x<0?0:1;break;case Na:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Ua:t.y=t.y-Math.floor(t.y);break;case Pn:t.y=t.y<0?0:1;break;case Na:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}};Ze.DEFAULT_IMAGE=null;Ze.DEFAULT_MAPPING=dl;Ze.DEFAULT_ANISOTROPY=1;var xe=class r{constructor(t=0,e=0,n=0,i=1){r.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=i}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,i){return this.x=t,this.y=e,this.z=n,this.w=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){let e=this.x,n=this.y,i=this.z,s=this.w,a=t.elements;return this.x=a[0]*e+a[4]*n+a[8]*i+a[12]*s,this.y=a[1]*e+a[5]*n+a[9]*i+a[13]*s,this.z=a[2]*e+a[6]*n+a[10]*i+a[14]*s,this.w=a[3]*e+a[7]*n+a[11]*i+a[15]*s,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);let e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,i,s,c=t.elements,l=c[0],h=c[4],u=c[8],f=c[1],d=c[5],v=c[9],_=c[2],g=c[6],m=c[10];if(Math.abs(h-f)<.01&&Math.abs(u-_)<.01&&Math.abs(v-g)<.01){if(Math.abs(h+f)<.1&&Math.abs(u+_)<.1&&Math.abs(v+g)<.1&&Math.abs(l+d+m-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;let w=(l+1)/2,A=(d+1)/2,C=(m+1)/2,E=(h+f)/4,P=(u+_)/4,F=(v+g)/4;return w>A&&w>C?w<.01?(n=0,i=.707106781,s=.707106781):(n=Math.sqrt(w),i=E/n,s=P/n):A>C?A<.01?(n=.707106781,i=0,s=.707106781):(i=Math.sqrt(A),n=E/i,s=F/i):C<.01?(n=.707106781,i=.707106781,s=0):(s=Math.sqrt(C),n=P/s,i=F/s),this.set(n,i,s,e),this}let T=Math.sqrt((g-v)*(g-v)+(u-_)*(u-_)+(f-h)*(f-h));return Math.abs(T)<.001&&(T=1),this.x=(g-v)/T,this.y=(u-_)/T,this.z=(f-h)/T,this.w=Math.acos((l+d+m-1)/2),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Zt(this.x,t.x,e.x),this.y=Zt(this.y,t.y,e.y),this.z=Zt(this.z,t.z,e.z),this.w=Zt(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=Zt(this.x,t,e),this.y=Zt(this.y,t,e),this.z=Zt(this.z,t,e),this.w=Zt(this.w,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Zt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},ka=class extends jn{constructor(t=1,e=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:cn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=n.depth,this.scissor=new xe(0,0,t,e),this.scissorTest=!1,this.viewport=new xe(0,0,t,e);let i={width:t,height:e,depth:n.depth},s=new Ze(i);this.textures=[];let a=n.count;for(let o=0;o<a;o++)this.textures[o]=s.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(t={}){let e={minFilter:cn,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),t!==null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let i=0,s=this.textures.length;i<s;i++)this.textures[i].image.width=t,this.textures[i].image.height=e,this.textures[i].image.depth=n,this.textures[i].isData3DTexture!==!0&&(this.textures[i].isArrayTexture=this.textures[i].image.depth>1);this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,n=t.textures.length;e<n;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;let i=Object.assign({},t.textures[e].image);this.textures[e].source=new Or(i)}return this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},Ln=class extends ka{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}},vs=class extends Ze{constructor(t=null,e=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=Ye,this.minFilter=Ye,this.wrapR=Pn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}};var za=class extends Ze{constructor(t=null,e=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=Ye,this.minFilter=Ye,this.wrapR=Pn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var _i=class{constructor(t=new $(1/0,1/0,1/0),e=new $(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(wn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(wn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){let n=wn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);let n=t.geometry;if(n!==void 0){let s=n.getAttribute("position");if(e===!0&&s!==void 0&&t.isInstancedMesh!==!0)for(let a=0,o=s.count;a<o;a++)t.isMesh===!0?t.getVertexPosition(a,wn):wn.fromBufferAttribute(s,a),wn.applyMatrix4(t.matrixWorld),this.expandByPoint(wn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),da.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),da.copy(n.boundingBox)),da.applyMatrix4(t.matrixWorld),this.union(da)}let i=t.children;for(let s=0,a=i.length;s<a;s++)this.expandByObject(i[s],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,wn),wn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(us),pa.subVectors(this.max,us),Mr.subVectors(t.a,us),Sr.subVectors(t.b,us),wr.subVectors(t.c,us),hi.subVectors(Sr,Mr),ui.subVectors(wr,Sr),Bi.subVectors(Mr,wr);let e=[0,-hi.z,hi.y,0,-ui.z,ui.y,0,-Bi.z,Bi.y,hi.z,0,-hi.x,ui.z,0,-ui.x,Bi.z,0,-Bi.x,-hi.y,hi.x,0,-ui.y,ui.x,0,-Bi.y,Bi.x,0];return!Bc(e,Mr,Sr,wr,pa)||(e=[1,0,0,0,1,0,0,0,1],!Bc(e,Mr,Sr,wr,pa))?!1:(ma.crossVectors(hi,ui),e=[ma.x,ma.y,ma.z],Bc(e,Mr,Sr,wr,pa))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,wn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(wn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Xn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Xn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Xn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Xn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Xn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Xn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Xn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Xn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Xn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}},Xn=[new $,new $,new $,new $,new $,new $,new $,new $],wn=new $,da=new _i,Mr=new $,Sr=new $,wr=new $,hi=new $,ui=new $,Bi=new $,us=new $,pa=new $,ma=new $,ki=new $;function Bc(r,t,e,n,i){for(let s=0,a=r.length-3;s<=a;s+=3){ki.fromArray(r,s);let o=i.x*Math.abs(ki.x)+i.y*Math.abs(ki.y)+i.z*Math.abs(ki.z),c=t.dot(ki),l=e.dot(ki),h=n.dot(ki);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>o)return!1}return!0}var zp=new _i,fs=new $,kc=new $,Br=class{constructor(t=new $,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){let n=this.center;e!==void 0?n.copy(e):zp.setFromPoints(t).getCenter(n);let i=0;for(let s=0,a=t.length;s<a;s++)i=Math.max(i,n.distanceToSquared(t[s]));return this.radius=Math.sqrt(i),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){let e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){let n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;fs.subVectors(t,this.center);let e=fs.lengthSq();if(e>this.radius*this.radius){let n=Math.sqrt(e),i=(n-this.radius)*.5;this.center.addScaledVector(fs,i/n),this.radius+=i}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(kc.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(fs.copy(t.center).add(kc)),this.expandByPoint(fs.copy(t.center).sub(kc))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}},qn=new $,zc=new $,ga=new $,fi=new $,Vc=new $,xa=new $,Gc=new $,Va=class{constructor(t=new $,e=new $(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,qn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);let n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){let e=qn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(qn.copy(this.origin).addScaledVector(this.direction,e),qn.distanceToSquared(t))}distanceSqToSegment(t,e,n,i){zc.copy(t).add(e).multiplyScalar(.5),ga.copy(e).sub(t).normalize(),fi.copy(this.origin).sub(zc);let s=t.distanceTo(e)*.5,a=-this.direction.dot(ga),o=fi.dot(this.direction),c=-fi.dot(ga),l=fi.lengthSq(),h=Math.abs(1-a*a),u,f,d,v;if(h>0)if(u=a*c-o,f=a*o-c,v=s*h,u>=0)if(f>=-v)if(f<=v){let _=1/h;u*=_,f*=_,d=u*(u+a*f+2*o)+f*(a*u+f+2*c)+l}else f=s,u=Math.max(0,-(a*f+o)),d=-u*u+f*(f+2*c)+l;else f=-s,u=Math.max(0,-(a*f+o)),d=-u*u+f*(f+2*c)+l;else f<=-v?(u=Math.max(0,-(-a*s+o)),f=u>0?-s:Math.min(Math.max(-s,-c),s),d=-u*u+f*(f+2*c)+l):f<=v?(u=0,f=Math.min(Math.max(-s,-c),s),d=f*(f+2*c)+l):(u=Math.max(0,-(a*s+o)),f=u>0?s:Math.min(Math.max(-s,-c),s),d=-u*u+f*(f+2*c)+l);else f=a>0?-s:s,u=Math.max(0,-(a*f+o)),d=-u*u+f*(f+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,u),i&&i.copy(zc).addScaledVector(ga,f),d}intersectSphere(t,e){qn.subVectors(t.center,this.origin);let n=qn.dot(this.direction),i=qn.dot(qn)-n*n,s=t.radius*t.radius;if(i>s)return null;let a=Math.sqrt(s-i),o=n-a,c=n+a;return c<0?null:o<0?this.at(c,e):this.at(o,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){let e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){let n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){let e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,i,s,a,o,c,l=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,f=this.origin;return l>=0?(n=(t.min.x-f.x)*l,i=(t.max.x-f.x)*l):(n=(t.max.x-f.x)*l,i=(t.min.x-f.x)*l),h>=0?(s=(t.min.y-f.y)*h,a=(t.max.y-f.y)*h):(s=(t.max.y-f.y)*h,a=(t.min.y-f.y)*h),n>a||s>i||((s>n||isNaN(n))&&(n=s),(a<i||isNaN(i))&&(i=a),u>=0?(o=(t.min.z-f.z)*u,c=(t.max.z-f.z)*u):(o=(t.max.z-f.z)*u,c=(t.min.z-f.z)*u),n>c||o>i)||((o>n||n!==n)&&(n=o),(c<i||i!==i)&&(i=c),i<0)?null:this.at(n>=0?n:i,e)}intersectsBox(t){return this.intersectBox(t,qn)!==null}intersectTriangle(t,e,n,i,s){Vc.subVectors(e,t),xa.subVectors(n,t),Gc.crossVectors(Vc,xa);let a=this.direction.dot(Gc),o;if(a>0){if(i)return null;o=1}else if(a<0)o=-1,a=-a;else return null;fi.subVectors(this.origin,t);let c=o*this.direction.dot(xa.crossVectors(fi,xa));if(c<0)return null;let l=o*this.direction.dot(Vc.cross(fi));if(l<0||c+l>a)return null;let h=-o*fi.dot(Gc);return h<0?null:this.at(h/a,s)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Te=class r{constructor(t,e,n,i,s,a,o,c,l,h,u,f,d,v,_,g){r.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,i,s,a,o,c,l,h,u,f,d,v,_,g)}set(t,e,n,i,s,a,o,c,l,h,u,f,d,v,_,g){let m=this.elements;return m[0]=t,m[4]=e,m[8]=n,m[12]=i,m[1]=s,m[5]=a,m[9]=o,m[13]=c,m[2]=l,m[6]=h,m[10]=u,m[14]=f,m[3]=d,m[7]=v,m[11]=_,m[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new r().fromArray(this.elements)}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){let e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){let e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){let e=this.elements,n=t.elements,i=1/Tr.setFromMatrixColumn(t,0).length(),s=1/Tr.setFromMatrixColumn(t,1).length(),a=1/Tr.setFromMatrixColumn(t,2).length();return e[0]=n[0]*i,e[1]=n[1]*i,e[2]=n[2]*i,e[3]=0,e[4]=n[4]*s,e[5]=n[5]*s,e[6]=n[6]*s,e[7]=0,e[8]=n[8]*a,e[9]=n[9]*a,e[10]=n[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){let e=this.elements,n=t.x,i=t.y,s=t.z,a=Math.cos(n),o=Math.sin(n),c=Math.cos(i),l=Math.sin(i),h=Math.cos(s),u=Math.sin(s);if(t.order==="XYZ"){let f=a*h,d=a*u,v=o*h,_=o*u;e[0]=c*h,e[4]=-c*u,e[8]=l,e[1]=d+v*l,e[5]=f-_*l,e[9]=-o*c,e[2]=_-f*l,e[6]=v+d*l,e[10]=a*c}else if(t.order==="YXZ"){let f=c*h,d=c*u,v=l*h,_=l*u;e[0]=f+_*o,e[4]=v*o-d,e[8]=a*l,e[1]=a*u,e[5]=a*h,e[9]=-o,e[2]=d*o-v,e[6]=_+f*o,e[10]=a*c}else if(t.order==="ZXY"){let f=c*h,d=c*u,v=l*h,_=l*u;e[0]=f-_*o,e[4]=-a*u,e[8]=v+d*o,e[1]=d+v*o,e[5]=a*h,e[9]=_-f*o,e[2]=-a*l,e[6]=o,e[10]=a*c}else if(t.order==="ZYX"){let f=a*h,d=a*u,v=o*h,_=o*u;e[0]=c*h,e[4]=v*l-d,e[8]=f*l+_,e[1]=c*u,e[5]=_*l+f,e[9]=d*l-v,e[2]=-l,e[6]=o*c,e[10]=a*c}else if(t.order==="YZX"){let f=a*c,d=a*l,v=o*c,_=o*l;e[0]=c*h,e[4]=_-f*u,e[8]=v*u+d,e[1]=u,e[5]=a*h,e[9]=-o*h,e[2]=-l*h,e[6]=d*u+v,e[10]=f-_*u}else if(t.order==="XZY"){let f=a*c,d=a*l,v=o*c,_=o*l;e[0]=c*h,e[4]=-u,e[8]=l*h,e[1]=f*u+_,e[5]=a*h,e[9]=d*u-v,e[2]=v*u-d,e[6]=o*h,e[10]=_*u+f}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Vp,t,Gp)}lookAt(t,e,n){let i=this.elements;return rn.subVectors(t,e),rn.lengthSq()===0&&(rn.z=1),rn.normalize(),di.crossVectors(n,rn),di.lengthSq()===0&&(Math.abs(n.z)===1?rn.x+=1e-4:rn.z+=1e-4,rn.normalize(),di.crossVectors(n,rn)),di.normalize(),_a.crossVectors(rn,di),i[0]=di.x,i[4]=_a.x,i[8]=rn.x,i[1]=di.y,i[5]=_a.y,i[9]=rn.y,i[2]=di.z,i[6]=_a.z,i[10]=rn.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,i=e.elements,s=this.elements,a=n[0],o=n[4],c=n[8],l=n[12],h=n[1],u=n[5],f=n[9],d=n[13],v=n[2],_=n[6],g=n[10],m=n[14],T=n[3],w=n[7],A=n[11],C=n[15],E=i[0],P=i[4],F=i[8],y=i[12],M=i[1],N=i[5],G=i[9],H=i[13],Z=i[2],J=i[6],Y=i[10],at=i[14],W=i[3],ut=i[7],ft=i[11],Et=i[15];return s[0]=a*E+o*M+c*Z+l*W,s[4]=a*P+o*N+c*J+l*ut,s[8]=a*F+o*G+c*Y+l*ft,s[12]=a*y+o*H+c*at+l*Et,s[1]=h*E+u*M+f*Z+d*W,s[5]=h*P+u*N+f*J+d*ut,s[9]=h*F+u*G+f*Y+d*ft,s[13]=h*y+u*H+f*at+d*Et,s[2]=v*E+_*M+g*Z+m*W,s[6]=v*P+_*N+g*J+m*ut,s[10]=v*F+_*G+g*Y+m*ft,s[14]=v*y+_*H+g*at+m*Et,s[3]=T*E+w*M+A*Z+C*W,s[7]=T*P+w*N+A*J+C*ut,s[11]=T*F+w*G+A*Y+C*ft,s[15]=T*y+w*H+A*at+C*Et,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[4],i=t[8],s=t[12],a=t[1],o=t[5],c=t[9],l=t[13],h=t[2],u=t[6],f=t[10],d=t[14],v=t[3],_=t[7],g=t[11],m=t[15];return v*(+s*c*u-i*l*u-s*o*f+n*l*f+i*o*d-n*c*d)+_*(+e*c*d-e*l*f+s*a*f-i*a*d+i*l*h-s*c*h)+g*(+e*l*u-e*o*d-s*a*u+n*a*d+s*o*h-n*l*h)+m*(-i*o*h-e*c*u+e*o*f+i*a*u-n*a*f+n*c*h)}transpose(){let t=this.elements,e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){let i=this.elements;return t.isVector3?(i[12]=t.x,i[13]=t.y,i[14]=t.z):(i[12]=t,i[13]=e,i[14]=n),this}invert(){let t=this.elements,e=t[0],n=t[1],i=t[2],s=t[3],a=t[4],o=t[5],c=t[6],l=t[7],h=t[8],u=t[9],f=t[10],d=t[11],v=t[12],_=t[13],g=t[14],m=t[15],T=u*g*l-_*f*l+_*c*d-o*g*d-u*c*m+o*f*m,w=v*f*l-h*g*l-v*c*d+a*g*d+h*c*m-a*f*m,A=h*_*l-v*u*l+v*o*d-a*_*d-h*o*m+a*u*m,C=v*u*c-h*_*c-v*o*f+a*_*f+h*o*g-a*u*g,E=e*T+n*w+i*A+s*C;if(E===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let P=1/E;return t[0]=T*P,t[1]=(_*f*s-u*g*s-_*i*d+n*g*d+u*i*m-n*f*m)*P,t[2]=(o*g*s-_*c*s+_*i*l-n*g*l-o*i*m+n*c*m)*P,t[3]=(u*c*s-o*f*s-u*i*l+n*f*l+o*i*d-n*c*d)*P,t[4]=w*P,t[5]=(h*g*s-v*f*s+v*i*d-e*g*d-h*i*m+e*f*m)*P,t[6]=(v*c*s-a*g*s-v*i*l+e*g*l+a*i*m-e*c*m)*P,t[7]=(a*f*s-h*c*s+h*i*l-e*f*l-a*i*d+e*c*d)*P,t[8]=A*P,t[9]=(v*u*s-h*_*s-v*n*d+e*_*d+h*n*m-e*u*m)*P,t[10]=(a*_*s-v*o*s+v*n*l-e*_*l-a*n*m+e*o*m)*P,t[11]=(h*o*s-a*u*s-h*n*l+e*u*l+a*n*d-e*o*d)*P,t[12]=C*P,t[13]=(h*_*i-v*u*i+v*n*f-e*_*f-h*n*g+e*u*g)*P,t[14]=(v*o*i-a*_*i-v*n*c+e*_*c+a*n*g-e*o*g)*P,t[15]=(a*u*i-h*o*i+h*n*c-e*u*c-a*n*f+e*o*f)*P,this}scale(t){let e=this.elements,n=t.x,i=t.y,s=t.z;return e[0]*=n,e[4]*=i,e[8]*=s,e[1]*=n,e[5]*=i,e[9]*=s,e[2]*=n,e[6]*=i,e[10]*=s,e[3]*=n,e[7]*=i,e[11]*=s,this}getMaxScaleOnAxis(){let t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],i=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,i))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){let e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){let n=Math.cos(e),i=Math.sin(e),s=1-n,a=t.x,o=t.y,c=t.z,l=s*a,h=s*o;return this.set(l*a+n,l*o-i*c,l*c+i*o,0,l*o+i*c,h*o+n,h*c-i*a,0,l*c-i*o,h*c+i*a,s*c*c+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,i,s,a){return this.set(1,n,s,0,t,1,a,0,e,i,1,0,0,0,0,1),this}compose(t,e,n){let i=this.elements,s=e._x,a=e._y,o=e._z,c=e._w,l=s+s,h=a+a,u=o+o,f=s*l,d=s*h,v=s*u,_=a*h,g=a*u,m=o*u,T=c*l,w=c*h,A=c*u,C=n.x,E=n.y,P=n.z;return i[0]=(1-(_+m))*C,i[1]=(d+A)*C,i[2]=(v-w)*C,i[3]=0,i[4]=(d-A)*E,i[5]=(1-(f+m))*E,i[6]=(g+T)*E,i[7]=0,i[8]=(v+w)*P,i[9]=(g-T)*P,i[10]=(1-(f+_))*P,i[11]=0,i[12]=t.x,i[13]=t.y,i[14]=t.z,i[15]=1,this}decompose(t,e,n){let i=this.elements,s=Tr.set(i[0],i[1],i[2]).length(),a=Tr.set(i[4],i[5],i[6]).length(),o=Tr.set(i[8],i[9],i[10]).length();this.determinant()<0&&(s=-s),t.x=i[12],t.y=i[13],t.z=i[14],Tn.copy(this);let l=1/s,h=1/a,u=1/o;return Tn.elements[0]*=l,Tn.elements[1]*=l,Tn.elements[2]*=l,Tn.elements[4]*=h,Tn.elements[5]*=h,Tn.elements[6]*=h,Tn.elements[8]*=u,Tn.elements[9]*=u,Tn.elements[10]*=u,e.setFromRotationMatrix(Tn),n.x=s,n.y=a,n.z=o,this}makePerspective(t,e,n,i,s,a,o=An,c=!1){let l=this.elements,h=2*s/(e-t),u=2*s/(n-i),f=(e+t)/(e-t),d=(n+i)/(n-i),v,_;if(c)v=s/(a-s),_=a*s/(a-s);else if(o===An)v=-(a+s)/(a-s),_=-2*a*s/(a-s);else if(o===xs)v=-a/(a-s),_=-a*s/(a-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=h,l[4]=0,l[8]=f,l[12]=0,l[1]=0,l[5]=u,l[9]=d,l[13]=0,l[2]=0,l[6]=0,l[10]=v,l[14]=_,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,n,i,s,a,o=An,c=!1){let l=this.elements,h=2/(e-t),u=2/(n-i),f=-(e+t)/(e-t),d=-(n+i)/(n-i),v,_;if(c)v=1/(a-s),_=a/(a-s);else if(o===An)v=-2/(a-s),_=-(a+s)/(a-s);else if(o===xs)v=-1/(a-s),_=-s/(a-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=h,l[4]=0,l[8]=0,l[12]=f,l[1]=0,l[5]=u,l[9]=0,l[13]=d,l[2]=0,l[6]=0,l[10]=v,l[14]=_,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){let e=this.elements,n=t.elements;for(let i=0;i<16;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}},Tr=new $,Tn=new Te,Vp=new $(0,0,0),Gp=new $(1,1,1),di=new $,_a=new $,rn=new $,pu=new Te,mu=new Qn,Dn=class r{constructor(t=0,e=0,n=0,i=r.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=i}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,i=this._order){return this._x=t,this._y=e,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){let i=t.elements,s=i[0],a=i[4],o=i[8],c=i[1],l=i[5],h=i[9],u=i[2],f=i[6],d=i[10];switch(e){case"XYZ":this._y=Math.asin(Zt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,d),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(f,l),this._z=0);break;case"YXZ":this._x=Math.asin(-Zt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,d),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-u,s),this._z=0);break;case"ZXY":this._x=Math.asin(Zt(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-u,d),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(c,s));break;case"ZYX":this._y=Math.asin(-Zt(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(f,d),this._z=Math.atan2(c,s)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(Zt(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-u,s)):(this._x=0,this._y=Math.atan2(o,d));break;case"XZY":this._z=Math.asin(-Zt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(f,l),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-h,d),this._y=0);break;default:Dt("Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return pu.makeRotationFromQuaternion(t),this.setFromRotationMatrix(pu,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return mu.setFromEuler(this),this.setFromQuaternion(mu,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Dn.DEFAULT_ORDER="XYZ";var ys=class{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}},Hp=0,gu=new $,Er=new Qn,Yn=new Te,va=new $,ds=new $,Wp=new $,Xp=new Qn,xu=new $(1,0,0),_u=new $(0,1,0),vu=new $(0,0,1),yu={type:"added"},qp={type:"removed"},Ar={type:"childadded",child:null},Hc={type:"childremoved",child:null},xn=class r extends jn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Hp++}),this.uuid=Os(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=r.DEFAULT_UP.clone();let t=new $,e=new Dn,n=new Qn,i=new $(1,1,1);function s(){n.setFromEuler(e,!1)}function a(){e.setFromQuaternion(n,void 0,!1)}e._onChange(s),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new Te},normalMatrix:{value:new Ot}}),this.matrix=new Te,this.matrixWorld=new Te,this.matrixAutoUpdate=r.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=r.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new ys,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Er.setFromAxisAngle(t,e),this.quaternion.multiply(Er),this}rotateOnWorldAxis(t,e){return Er.setFromAxisAngle(t,e),this.quaternion.premultiply(Er),this}rotateX(t){return this.rotateOnAxis(xu,t)}rotateY(t){return this.rotateOnAxis(_u,t)}rotateZ(t){return this.rotateOnAxis(vu,t)}translateOnAxis(t,e){return gu.copy(t).applyQuaternion(this.quaternion),this.position.add(gu.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(xu,t)}translateY(t){return this.translateOnAxis(_u,t)}translateZ(t){return this.translateOnAxis(vu,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Yn.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?va.copy(t):va.set(t,e,n);let i=this.parent;this.updateWorldMatrix(!0,!1),ds.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Yn.lookAt(ds,va,this.up):Yn.lookAt(va,ds,this.up),this.quaternion.setFromRotationMatrix(Yn),i&&(Yn.extractRotation(i.matrixWorld),Er.setFromRotationMatrix(Yn),this.quaternion.premultiply(Er.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(Xt("Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(yu),Ar.child=t,this.dispatchEvent(Ar),Ar.child=null):Xt("Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(qp),Hc.child=t,this.dispatchEvent(Hc),Hc.child=null),this}removeFromParent(){let t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Yn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Yn.multiply(t.parent.matrixWorld)),t.applyMatrix4(Yn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(yu),Ar.child=t,this.dispatchEvent(Ar),Ar.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,i=this.children.length;n<i;n++){let a=this.children[n].getObjectByProperty(t,e);if(a!==void 0)return a}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);let i=this.children;for(let s=0,a=i.length;s<a;s++)i[s].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ds,t,Wp),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ds,Xp,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);let e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverseVisible(t)}traverseAncestors(t){let e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);let e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){let n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){let i=this.children;for(let s=0,a=i.length;s<a;s++)i[s].updateWorldMatrix(!1,!0)}}toJSON(t){let e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),i.instanceInfo=this._instanceInfo.map(o=>({...o})),i.availableInstanceIds=this._availableInstanceIds.slice(),i.availableGeometryIds=this._availableGeometryIds.slice(),i.nextIndexStart=this._nextIndexStart,i.nextVertexStart=this._nextVertexStart,i.geometryCount=this._geometryCount,i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.matricesTexture=this._matricesTexture.toJSON(t),i.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(i.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(i.boundingBox=this.boundingBox.toJSON()));function s(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(t)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=s(t.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let c=o.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){let u=c[l];s(t.shapes,u)}else s(t.shapes,c)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(t.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(s(t.materials,this.material[c]));i.material=o}else i.material=s(t.materials,this.material);if(this.children.length>0){i.children=[];for(let o=0;o<this.children.length;o++)i.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){i.animations=[];for(let o=0;o<this.animations.length;o++){let c=this.animations[o];i.animations.push(s(t.animations,c))}}if(e){let o=a(t.geometries),c=a(t.materials),l=a(t.textures),h=a(t.images),u=a(t.shapes),f=a(t.skeletons),d=a(t.animations),v=a(t.nodes);o.length>0&&(n.geometries=o),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),f.length>0&&(n.skeletons=f),d.length>0&&(n.animations=d),v.length>0&&(n.nodes=v)}return n.object=i,n;function a(o){let c=[];for(let l in o){let h=o[l];delete h.metadata,c.push(h)}return c}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){let i=t.children[n];this.add(i.clone())}return this}};xn.DEFAULT_UP=new $(0,1,0);xn.DEFAULT_MATRIX_AUTO_UPDATE=!0;xn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var En=new $,Zn=new $,Wc=new $,$n=new $,Cr=new $,Rr=new $,bu=new $,Xc=new $,qc=new $,Yc=new $,Zc=new xe,$c=new xe,Jc=new xe,gi=class r{constructor(t=new $,e=new $,n=new $){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,i){i.subVectors(n,e),En.subVectors(t,e),i.cross(En);let s=i.lengthSq();return s>0?i.multiplyScalar(1/Math.sqrt(s)):i.set(0,0,0)}static getBarycoord(t,e,n,i,s){En.subVectors(i,e),Zn.subVectors(n,e),Wc.subVectors(t,e);let a=En.dot(En),o=En.dot(Zn),c=En.dot(Wc),l=Zn.dot(Zn),h=Zn.dot(Wc),u=a*l-o*o;if(u===0)return s.set(0,0,0),null;let f=1/u,d=(l*c-o*h)*f,v=(a*h-o*c)*f;return s.set(1-d-v,v,d)}static containsPoint(t,e,n,i){return this.getBarycoord(t,e,n,i,$n)===null?!1:$n.x>=0&&$n.y>=0&&$n.x+$n.y<=1}static getInterpolation(t,e,n,i,s,a,o,c){return this.getBarycoord(t,e,n,i,$n)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(s,$n.x),c.addScaledVector(a,$n.y),c.addScaledVector(o,$n.z),c)}static getInterpolatedAttribute(t,e,n,i,s,a){return Zc.setScalar(0),$c.setScalar(0),Jc.setScalar(0),Zc.fromBufferAttribute(t,e),$c.fromBufferAttribute(t,n),Jc.fromBufferAttribute(t,i),a.setScalar(0),a.addScaledVector(Zc,s.x),a.addScaledVector($c,s.y),a.addScaledVector(Jc,s.z),a}static isFrontFacing(t,e,n,i){return En.subVectors(n,e),Zn.subVectors(t,e),En.cross(Zn).dot(i)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,i){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[i]),this}setFromAttributeAndIndices(t,e,n,i){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,i),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return En.subVectors(this.c,this.b),Zn.subVectors(this.a,this.b),En.cross(Zn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return r.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return r.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,i,s){return r.getInterpolation(t,this.a,this.b,this.c,e,n,i,s)}containsPoint(t){return r.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return r.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){let n=this.a,i=this.b,s=this.c,a,o;Cr.subVectors(i,n),Rr.subVectors(s,n),Xc.subVectors(t,n);let c=Cr.dot(Xc),l=Rr.dot(Xc);if(c<=0&&l<=0)return e.copy(n);qc.subVectors(t,i);let h=Cr.dot(qc),u=Rr.dot(qc);if(h>=0&&u<=h)return e.copy(i);let f=c*u-h*l;if(f<=0&&c>=0&&h<=0)return a=c/(c-h),e.copy(n).addScaledVector(Cr,a);Yc.subVectors(t,s);let d=Cr.dot(Yc),v=Rr.dot(Yc);if(v>=0&&d<=v)return e.copy(s);let _=d*l-c*v;if(_<=0&&l>=0&&v<=0)return o=l/(l-v),e.copy(n).addScaledVector(Rr,o);let g=h*v-d*u;if(g<=0&&u-h>=0&&d-v>=0)return bu.subVectors(s,i),o=(u-h)/(u-h+(d-v)),e.copy(i).addScaledVector(bu,o);let m=1/(g+_+f);return a=_*m,o=f*m,e.copy(n).addScaledVector(Cr,a).addScaledVector(Rr,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}},_f={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},pi={h:0,s:0,l:0},ya={h:0,s:0,l:0};function Kc(r,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?r+(t-r)*6*e:e<1/2?t:e<2/3?r+(t-r)*6*(2/3-e):r}var Jt=class{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){let i=t;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=an){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,jt.colorSpaceToWorking(this,e),this}setRGB(t,e,n,i=jt.workingColorSpace){return this.r=t,this.g=e,this.b=n,jt.colorSpaceToWorking(this,i),this}setHSL(t,e,n,i=jt.workingColorSpace){if(t=Fp(t,1),e=Zt(e,0,1),n=Zt(n,0,1),e===0)this.r=this.g=this.b=n;else{let s=n<=.5?n*(1+e):n+e-n*e,a=2*n-s;this.r=Kc(a,s,t+1/3),this.g=Kc(a,s,t),this.b=Kc(a,s,t-1/3)}return jt.colorSpaceToWorking(this,i),this}setStyle(t,e=an){function n(s){s!==void 0&&parseFloat(s)<1&&Dt("Color: Alpha component of "+t+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(t)){let s,a=i[1],o=i[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,e);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,e);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,e);break;default:Dt("Color: Unknown color model "+t)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(t)){let s=i[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,e);if(a===6)return this.setHex(parseInt(s,16),e);Dt("Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=an){let n=_f[t.toLowerCase()];return n!==void 0?this.setHex(n,e):Dt("Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Jn(t.r),this.g=Jn(t.g),this.b=Jn(t.b),this}copyLinearToSRGB(t){return this.r=Dr(t.r),this.g=Dr(t.g),this.b=Dr(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=an){return jt.workingToColorSpace(Ue.copy(this),t),Math.round(Zt(Ue.r*255,0,255))*65536+Math.round(Zt(Ue.g*255,0,255))*256+Math.round(Zt(Ue.b*255,0,255))}getHexString(t=an){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=jt.workingColorSpace){jt.workingToColorSpace(Ue.copy(this),e);let n=Ue.r,i=Ue.g,s=Ue.b,a=Math.max(n,i,s),o=Math.min(n,i,s),c,l,h=(o+a)/2;if(o===a)c=0,l=0;else{let u=a-o;switch(l=h<=.5?u/(a+o):u/(2-a-o),a){case n:c=(i-s)/u+(i<s?6:0);break;case i:c=(s-n)/u+2;break;case s:c=(n-i)/u+4;break}c/=6}return t.h=c,t.s=l,t.l=h,t}getRGB(t,e=jt.workingColorSpace){return jt.workingToColorSpace(Ue.copy(this),e),t.r=Ue.r,t.g=Ue.g,t.b=Ue.b,t}getStyle(t=an){jt.workingToColorSpace(Ue.copy(this),t);let e=Ue.r,n=Ue.g,i=Ue.b;return t!==an?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(t,e,n){return this.getHSL(pi),this.setHSL(pi.h+t,pi.s+e,pi.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(pi),t.getHSL(ya);let n=Dc(pi.h,ya.h,e),i=Dc(pi.s,ya.s,e),s=Dc(pi.l,ya.l,e);return this.setHSL(n,i,s),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){let e=this.r,n=this.g,i=this.b,s=t.elements;return this.r=s[0]*e+s[3]*n+s[6]*i,this.g=s[1]*e+s[4]*n+s[7]*i,this.b=s[2]*e+s[5]*n+s[8]*i,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Ue=new Jt;Jt.NAMES=_f;var Yp=0,Yi=class extends jn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Yp++}),this.uuid=Os(),this.name="",this.type="Material",this.blending=Wi,this.side=Kn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=La,this.blendDst=Da,this.blendEquation=xi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Jt(0,0,0),this.blendAlpha=0,this.depthFunc=Xi,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=rl,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Gi,this.stencilZFail=Gi,this.stencilZPass=Gi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(let e in t){let n=t[e];if(n===void 0){Dt(`Material: parameter '${e}' has value of undefined.`);continue}let i=this[e];if(i===void 0){Dt(`Material: '${e}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[e]=n}}toJSON(t){let e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Wi&&(n.blending=this.blending),this.side!==Kn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==La&&(n.blendSrc=this.blendSrc),this.blendDst!==Da&&(n.blendDst=this.blendDst),this.blendEquation!==xi&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Xi&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==rl&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Gi&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Gi&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Gi&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(s){let a=[];for(let o in s){let c=s[o];delete c.metadata,a.push(c)}return a}if(e){let s=i(t.textures),a=i(t.images);s.length>0&&(n.textures=s),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;let e=t.clippingPlanes,n=null;if(e!==null){let i=e.length;n=new Array(i);for(let s=0;s!==i;++s)n[s]=e[s].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}},bs=class extends Yi{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Jt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Dn,this.combine=fl,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}};var Me=new $,ba=new te,Zp=0,on=class{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Zp++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=sl,this.updateRanges=[],this.gpuType=Bn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let i=0,s=this.itemSize;i<s;i++)this.array[t+i]=e.array[n+i];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)ba.fromBufferAttribute(this,e),ba.applyMatrix3(t),this.setXY(e,ba.x,ba.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)Me.fromBufferAttribute(this,e),Me.applyMatrix3(t),this.setXYZ(e,Me.x,Me.y,Me.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)Me.fromBufferAttribute(this,e),Me.applyMatrix4(t),this.setXYZ(e,Me.x,Me.y,Me.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Me.fromBufferAttribute(this,e),Me.applyNormalMatrix(t),this.setXYZ(e,Me.x,Me.y,Me.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Me.fromBufferAttribute(this,e),Me.transformDirection(t),this.setXYZ(e,Me.x,Me.y,Me.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=hs(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=Xe(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=hs(e,this.array)),e}setX(t,e){return this.normalized&&(e=Xe(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=hs(e,this.array)),e}setY(t,e){return this.normalized&&(e=Xe(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=hs(e,this.array)),e}setZ(t,e){return this.normalized&&(e=Xe(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=hs(e,this.array)),e}setW(t,e){return this.normalized&&(e=Xe(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=Xe(e,this.array),n=Xe(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,i){return t*=this.itemSize,this.normalized&&(e=Xe(e,this.array),n=Xe(n,this.array),i=Xe(i,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this}setXYZW(t,e,n,i,s){return t*=this.itemSize,this.normalized&&(e=Xe(e,this.array),n=Xe(n,this.array),i=Xe(i,this.array),s=Xe(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this.array[t+3]=s,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==sl&&(t.usage=this.usage),t}};var Ms=class extends on{constructor(t,e,n){super(new Uint16Array(t),e,n)}};var Ss=class extends on{constructor(t,e,n){super(new Uint32Array(t),e,n)}};var In=class extends on{constructor(t,e,n){super(new Float32Array(t),e,n)}},$p=0,gn=new Te,jc=new xn,Pr=new $,sn=new _i,ps=new _i,Re=new $,ti=class r extends jn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:$p++}),this.uuid=Os(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Sl(t)?Ss:Ms)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){let e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let s=new Ot().getNormalMatrix(t);n.applyNormalMatrix(s),n.needsUpdate=!0}let i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(t),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return gn.makeRotationFromQuaternion(t),this.applyMatrix4(gn),this}rotateX(t){return gn.makeRotationX(t),this.applyMatrix4(gn),this}rotateY(t){return gn.makeRotationY(t),this.applyMatrix4(gn),this}rotateZ(t){return gn.makeRotationZ(t),this.applyMatrix4(gn),this}translate(t,e,n){return gn.makeTranslation(t,e,n),this.applyMatrix4(gn),this}scale(t,e,n){return gn.makeScale(t,e,n),this.applyMatrix4(gn),this}lookAt(t){return jc.lookAt(t),jc.updateMatrix(),this.applyMatrix4(jc.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Pr).negate(),this.translate(Pr.x,Pr.y,Pr.z),this}setFromPoints(t){let e=this.getAttribute("position");if(e===void 0){let n=[];for(let i=0,s=t.length;i<s;i++){let a=t[i];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new In(n,3))}else{let n=Math.min(t.length,e.count);for(let i=0;i<n;i++){let s=t[i];e.setXYZ(i,s.x,s.y,s.z||0)}t.length>e.count&&Dt("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new _i);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Xt("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new $(-1/0,-1/0,-1/0),new $(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,i=e.length;n<i;n++){let s=e[n];sn.setFromBufferAttribute(s),this.morphTargetsRelative?(Re.addVectors(this.boundingBox.min,sn.min),this.boundingBox.expandByPoint(Re),Re.addVectors(this.boundingBox.max,sn.max),this.boundingBox.expandByPoint(Re)):(this.boundingBox.expandByPoint(sn.min),this.boundingBox.expandByPoint(sn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Xt('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Br);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Xt("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new $,1/0);return}if(t){let n=this.boundingSphere.center;if(sn.setFromBufferAttribute(t),e)for(let s=0,a=e.length;s<a;s++){let o=e[s];ps.setFromBufferAttribute(o),this.morphTargetsRelative?(Re.addVectors(sn.min,ps.min),sn.expandByPoint(Re),Re.addVectors(sn.max,ps.max),sn.expandByPoint(Re)):(sn.expandByPoint(ps.min),sn.expandByPoint(ps.max))}sn.getCenter(n);let i=0;for(let s=0,a=t.count;s<a;s++)Re.fromBufferAttribute(t,s),i=Math.max(i,n.distanceToSquared(Re));if(e)for(let s=0,a=e.length;s<a;s++){let o=e[s],c=this.morphTargetsRelative;for(let l=0,h=o.count;l<h;l++)Re.fromBufferAttribute(o,l),c&&(Pr.fromBufferAttribute(t,l),Re.add(Pr)),i=Math.max(i,n.distanceToSquared(Re))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&Xt('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){Xt("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=e.position,i=e.normal,s=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new on(new Float32Array(4*n.count),4));let a=this.getAttribute("tangent"),o=[],c=[];for(let F=0;F<n.count;F++)o[F]=new $,c[F]=new $;let l=new $,h=new $,u=new $,f=new te,d=new te,v=new te,_=new $,g=new $;function m(F,y,M){l.fromBufferAttribute(n,F),h.fromBufferAttribute(n,y),u.fromBufferAttribute(n,M),f.fromBufferAttribute(s,F),d.fromBufferAttribute(s,y),v.fromBufferAttribute(s,M),h.sub(l),u.sub(l),d.sub(f),v.sub(f);let N=1/(d.x*v.y-v.x*d.y);isFinite(N)&&(_.copy(h).multiplyScalar(v.y).addScaledVector(u,-d.y).multiplyScalar(N),g.copy(u).multiplyScalar(d.x).addScaledVector(h,-v.x).multiplyScalar(N),o[F].add(_),o[y].add(_),o[M].add(_),c[F].add(g),c[y].add(g),c[M].add(g))}let T=this.groups;T.length===0&&(T=[{start:0,count:t.count}]);for(let F=0,y=T.length;F<y;++F){let M=T[F],N=M.start,G=M.count;for(let H=N,Z=N+G;H<Z;H+=3)m(t.getX(H+0),t.getX(H+1),t.getX(H+2))}let w=new $,A=new $,C=new $,E=new $;function P(F){C.fromBufferAttribute(i,F),E.copy(C);let y=o[F];w.copy(y),w.sub(C.multiplyScalar(C.dot(y))).normalize(),A.crossVectors(E,y);let N=A.dot(c[F])<0?-1:1;a.setXYZW(F,w.x,w.y,w.z,N)}for(let F=0,y=T.length;F<y;++F){let M=T[F],N=M.start,G=M.count;for(let H=N,Z=N+G;H<Z;H+=3)P(t.getX(H+0)),P(t.getX(H+1)),P(t.getX(H+2))}}computeVertexNormals(){let t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new on(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let f=0,d=n.count;f<d;f++)n.setXYZ(f,0,0,0);let i=new $,s=new $,a=new $,o=new $,c=new $,l=new $,h=new $,u=new $;if(t)for(let f=0,d=t.count;f<d;f+=3){let v=t.getX(f+0),_=t.getX(f+1),g=t.getX(f+2);i.fromBufferAttribute(e,v),s.fromBufferAttribute(e,_),a.fromBufferAttribute(e,g),h.subVectors(a,s),u.subVectors(i,s),h.cross(u),o.fromBufferAttribute(n,v),c.fromBufferAttribute(n,_),l.fromBufferAttribute(n,g),o.add(h),c.add(h),l.add(h),n.setXYZ(v,o.x,o.y,o.z),n.setXYZ(_,c.x,c.y,c.z),n.setXYZ(g,l.x,l.y,l.z)}else for(let f=0,d=e.count;f<d;f+=3)i.fromBufferAttribute(e,f+0),s.fromBufferAttribute(e,f+1),a.fromBufferAttribute(e,f+2),h.subVectors(a,s),u.subVectors(i,s),h.cross(u),n.setXYZ(f+0,h.x,h.y,h.z),n.setXYZ(f+1,h.x,h.y,h.z),n.setXYZ(f+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)Re.fromBufferAttribute(t,e),Re.normalize(),t.setXYZ(e,Re.x,Re.y,Re.z)}toNonIndexed(){function t(o,c){let l=o.array,h=o.itemSize,u=o.normalized,f=new l.constructor(c.length*h),d=0,v=0;for(let _=0,g=c.length;_<g;_++){o.isInterleavedBufferAttribute?d=c[_]*o.data.stride+o.offset:d=c[_]*h;for(let m=0;m<h;m++)f[v++]=l[d++]}return new on(f,h,u)}if(this.index===null)return Dt("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let e=new r,n=this.index.array,i=this.attributes;for(let o in i){let c=i[o],l=t(c,n);e.setAttribute(o,l)}let s=this.morphAttributes;for(let o in s){let c=[],l=s[o];for(let h=0,u=l.length;h<u;h++){let f=l[h],d=t(f,n);c.push(d)}e.morphAttributes[o]=c}e.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,c=a.length;o<c;o++){let l=a[o];e.addGroup(l.start,l.count,l.materialIndex)}return e}toJSON(){let t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){let c=this.parameters;for(let l in c)c[l]!==void 0&&(t[l]=c[l]);return t}t.data={attributes:{}};let e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});let n=this.attributes;for(let c in n){let l=n[c];t.data.attributes[c]=l.toJSON(t.data)}let i={},s=!1;for(let c in this.morphAttributes){let l=this.morphAttributes[c],h=[];for(let u=0,f=l.length;u<f;u++){let d=l[u];h.push(d.toJSON(t.data))}h.length>0&&(i[c]=h,s=!0)}s&&(t.data.morphAttributes=i,t.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(t.data.boundingSphere=o.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let e={};this.name=t.name;let n=t.index;n!==null&&this.setIndex(n.clone());let i=t.attributes;for(let l in i){let h=i[l];this.setAttribute(l,h.clone(e))}let s=t.morphAttributes;for(let l in s){let h=[],u=s[l];for(let f=0,d=u.length;f<d;f++)h.push(u[f].clone(e));this.morphAttributes[l]=h}this.morphTargetsRelative=t.morphTargetsRelative;let a=t.groups;for(let l=0,h=a.length;l<h;l++){let u=a[l];this.addGroup(u.start,u.count,u.materialIndex)}let o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());let c=t.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},Mu=new Te,zi=new Va,Ma=new Br,Su=new $,Sa=new $,wa=new $,Ta=new $,Qc=new $,Ea=new $,wu=new $,Aa=new $,ln=class extends xn{constructor(t=new ti,e=new bs){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=i.length;s<a;s++){let o=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(t,e){let n=this.geometry,i=n.attributes.position,s=n.morphAttributes.position,a=n.morphTargetsRelative;e.fromBufferAttribute(i,t);let o=this.morphTargetInfluences;if(s&&o){Ea.set(0,0,0);for(let c=0,l=s.length;c<l;c++){let h=o[c],u=s[c];h!==0&&(Qc.fromBufferAttribute(u,t),a?Ea.addScaledVector(Qc,h):Ea.addScaledVector(Qc.sub(e),h))}e.add(Ea)}return e}raycast(t,e){let n=this.geometry,i=this.material,s=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Ma.copy(n.boundingSphere),Ma.applyMatrix4(s),zi.copy(t.ray).recast(t.near),!(Ma.containsPoint(zi.origin)===!1&&(zi.intersectSphere(Ma,Su)===null||zi.origin.distanceToSquared(Su)>(t.far-t.near)**2))&&(Mu.copy(s).invert(),zi.copy(t.ray).applyMatrix4(Mu),!(n.boundingBox!==null&&zi.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,zi)))}_computeIntersections(t,e,n){let i,s=this.geometry,a=this.material,o=s.index,c=s.attributes.position,l=s.attributes.uv,h=s.attributes.uv1,u=s.attributes.normal,f=s.groups,d=s.drawRange;if(o!==null)if(Array.isArray(a))for(let v=0,_=f.length;v<_;v++){let g=f[v],m=a[g.materialIndex],T=Math.max(g.start,d.start),w=Math.min(o.count,Math.min(g.start+g.count,d.start+d.count));for(let A=T,C=w;A<C;A+=3){let E=o.getX(A),P=o.getX(A+1),F=o.getX(A+2);i=Ca(this,m,t,n,l,h,u,E,P,F),i&&(i.faceIndex=Math.floor(A/3),i.face.materialIndex=g.materialIndex,e.push(i))}}else{let v=Math.max(0,d.start),_=Math.min(o.count,d.start+d.count);for(let g=v,m=_;g<m;g+=3){let T=o.getX(g),w=o.getX(g+1),A=o.getX(g+2);i=Ca(this,a,t,n,l,h,u,T,w,A),i&&(i.faceIndex=Math.floor(g/3),e.push(i))}}else if(c!==void 0)if(Array.isArray(a))for(let v=0,_=f.length;v<_;v++){let g=f[v],m=a[g.materialIndex],T=Math.max(g.start,d.start),w=Math.min(c.count,Math.min(g.start+g.count,d.start+d.count));for(let A=T,C=w;A<C;A+=3){let E=A,P=A+1,F=A+2;i=Ca(this,m,t,n,l,h,u,E,P,F),i&&(i.faceIndex=Math.floor(A/3),i.face.materialIndex=g.materialIndex,e.push(i))}}else{let v=Math.max(0,d.start),_=Math.min(c.count,d.start+d.count);for(let g=v,m=_;g<m;g+=3){let T=g,w=g+1,A=g+2;i=Ca(this,a,t,n,l,h,u,T,w,A),i&&(i.faceIndex=Math.floor(g/3),e.push(i))}}}};function Jp(r,t,e,n,i,s,a,o){let c;if(t.side===ke?c=n.intersectTriangle(a,s,i,!0,o):c=n.intersectTriangle(i,s,a,t.side===Kn,o),c===null)return null;Aa.copy(o),Aa.applyMatrix4(r.matrixWorld);let l=e.ray.origin.distanceTo(Aa);return l<e.near||l>e.far?null:{distance:l,point:Aa.clone(),object:r}}function Ca(r,t,e,n,i,s,a,o,c,l){r.getVertexPosition(o,Sa),r.getVertexPosition(c,wa),r.getVertexPosition(l,Ta);let h=Jp(r,t,e,n,Sa,wa,Ta,wu);if(h){let u=new $;gi.getBarycoord(wu,Sa,wa,Ta,u),i&&(h.uv=gi.getInterpolatedAttribute(i,o,c,l,u,new te)),s&&(h.uv1=gi.getInterpolatedAttribute(s,o,c,l,u,new te)),a&&(h.normal=gi.getInterpolatedAttribute(a,o,c,l,u,new $),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));let f={a:o,b:c,c:l,normal:new $,materialIndex:0};gi.getNormal(Sa,wa,Ta,f.normal),h.face=f,h.barycoord=u}return h}var kr=class r extends ti{constructor(t=1,e=1,n=1,i=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:i,heightSegments:s,depthSegments:a};let o=this;i=Math.floor(i),s=Math.floor(s),a=Math.floor(a);let c=[],l=[],h=[],u=[],f=0,d=0;v("z","y","x",-1,-1,n,e,t,a,s,0),v("z","y","x",1,-1,n,e,-t,a,s,1),v("x","z","y",1,1,t,n,e,i,a,2),v("x","z","y",1,-1,t,n,-e,i,a,3),v("x","y","z",1,-1,t,e,n,i,s,4),v("x","y","z",-1,-1,t,e,-n,i,s,5),this.setIndex(c),this.setAttribute("position",new In(l,3)),this.setAttribute("normal",new In(h,3)),this.setAttribute("uv",new In(u,2));function v(_,g,m,T,w,A,C,E,P,F,y){let M=A/P,N=C/F,G=A/2,H=C/2,Z=E/2,J=P+1,Y=F+1,at=0,W=0,ut=new $;for(let ft=0;ft<Y;ft++){let Et=ft*N-H;for(let Ut=0;Ut<J;Ut++){let Kt=Ut*M-G;ut[_]=Kt*T,ut[g]=Et*w,ut[m]=Z,l.push(ut.x,ut.y,ut.z),ut[_]=0,ut[g]=0,ut[m]=E>0?1:-1,h.push(ut.x,ut.y,ut.z),u.push(Ut/P),u.push(1-ft/F),at+=1}}for(let ft=0;ft<F;ft++)for(let Et=0;Et<P;Et++){let Ut=f+Et+J*ft,Kt=f+Et+J*(ft+1),Vt=f+(Et+1)+J*(ft+1),qt=f+(Et+1)+J*ft;c.push(Ut,Kt,qt),c.push(Kt,Vt,qt),W+=6}o.addGroup(d,W,y),d+=W,f+=at}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new r(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}};function Qi(r){let t={};for(let e in r){t[e]={};for(let n in r[e]){let i=r[e][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(Dt("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=i.clone():Array.isArray(i)?t[e][n]=i.slice():t[e][n]=i}}return t}function Ne(r){let t={};for(let e=0;e<r.length;e++){let n=Qi(r[e]);for(let i in n)t[i]=n[i]}return t}function Kp(r){let t=[];for(let e=0;e<r.length;e++)t.push(r[e].clone());return t}function Tl(r){let t=r.getRenderTarget();return t===null?r.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:jt.workingColorSpace}var vf={clone:Qi,merge:Ne},jp=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Qp=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,$e=class extends Yi{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=jp,this.fragmentShader=Qp,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Qi(t.uniforms),this.uniformsGroups=Kp(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){let e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(let i in this.uniforms){let a=this.uniforms[i].value;a&&a.isTexture?e.uniforms[i]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?e.uniforms[i]={type:"c",value:a.getHex()}:a&&a.isVector2?e.uniforms[i]={type:"v2",value:a.toArray()}:a&&a.isVector3?e.uniforms[i]={type:"v3",value:a.toArray()}:a&&a.isVector4?e.uniforms[i]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?e.uniforms[i]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?e.uniforms[i]={type:"m4",value:a.toArray()}:e.uniforms[i]={value:a}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;let n={};for(let i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}},ws=class extends xn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Te,this.projectionMatrix=new Te,this.projectionMatrixInverse=new Te,this.coordinateSystem=An,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},mi=new $,Tu=new te,Eu=new te,qe=class extends ws{constructor(t=50,e=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){let e=.5*this.getFilmHeight()/t;this.fov=Oa*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){let t=Math.tan(Lc*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Oa*2*Math.atan(Math.tan(Lc*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){mi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(mi.x,mi.y).multiplyScalar(-t/mi.z),mi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(mi.x,mi.y).multiplyScalar(-t/mi.z)}getViewSize(t,e){return this.getViewBounds(t,Tu,Eu),e.subVectors(Eu,Tu)}setViewOffset(t,e,n,i,s,a){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=this.near,e=t*Math.tan(Lc*.5*this.fov)/this.zoom,n=2*e,i=this.aspect*n,s=-.5*i,a=this.view;if(this.view!==null&&this.view.enabled){let c=a.fullWidth,l=a.fullHeight;s+=a.offsetX*i/c,e-=a.offsetY*n/l,i*=a.width/c,n*=a.height/l}let o=this.filmOffset;o!==0&&(s+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+i,e,e-n,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}},Ir=-90,Lr=1,Ga=class extends xn{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let i=new qe(Ir,Lr,t,e);i.layers=this.layers,this.add(i);let s=new qe(Ir,Lr,t,e);s.layers=this.layers,this.add(s);let a=new qe(Ir,Lr,t,e);a.layers=this.layers,this.add(a);let o=new qe(Ir,Lr,t,e);o.layers=this.layers,this.add(o);let c=new qe(Ir,Lr,t,e);c.layers=this.layers,this.add(c);let l=new qe(Ir,Lr,t,e);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){let t=this.coordinateSystem,e=this.children.concat(),[n,i,s,a,o,c]=e;for(let l of e)this.remove(l);if(t===An)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(t===xs)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(let l of e)this.add(l),l.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());let[s,a,o,c,l,h]=this.children,u=t.getRenderTarget(),f=t.getActiveCubeFace(),d=t.getActiveMipmapLevel(),v=t.xr.enabled;t.xr.enabled=!1;let _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,i),t.render(e,s),t.setRenderTarget(n,1,i),t.render(e,a),t.setRenderTarget(n,2,i),t.render(e,o),t.setRenderTarget(n,3,i),t.render(e,c),t.setRenderTarget(n,4,i),t.render(e,l),n.texture.generateMipmaps=_,t.setRenderTarget(n,5,i),t.render(e,h),t.setRenderTarget(u,f,d),t.xr.enabled=v,n.texture.needsPMREMUpdate=!0}},Ts=class extends Ze{constructor(t=[],e=Ji,n,i,s,a,o,c,l,h){super(t,e,n,i,s,a,o,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}},Ha=class extends Ln{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;let n={width:t,height:t,depth:1},i=[n,n,n,n,n,n];this.texture=new Ts(i),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},i=new kr(5,5,5),s=new $e({name:"CubemapFromEquirect",uniforms:Qi(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:ke,blending:Fn});s.uniforms.tEquirect.value=e;let a=new ln(i,s),o=e.minFilter;return e.minFilter===bi&&(e.minFilter=cn),new Ga(1,10,this).update(t,a),e.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(t,e=!0,n=!0,i=!0){let s=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(e,n,i);t.setRenderTarget(s)}},Hi=class extends xn{constructor(){super(),this.isGroup=!0,this.type="Group"}},tm={type:"move"},zr=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Hi,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Hi,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new $,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new $),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Hi,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new $,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new $),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){let e=this._hand;if(e)for(let n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let i=null,s=null,a=null,o=this._targetRay,c=this._grip,l=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(l&&t.hand){a=!0;for(let _ of t.hand.values()){let g=e.getJointPose(_,n),m=this._getHandJoint(l,_);g!==null&&(m.matrix.fromArray(g.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=g.radius),m.visible=g!==null}let h=l.joints["index-finger-tip"],u=l.joints["thumb-tip"],f=h.position.distanceTo(u.position),d=.02,v=.005;l.inputState.pinching&&f>d+v?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!l.inputState.pinching&&f<=d-v&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else c!==null&&t.gripSpace&&(s=e.getPose(t.gripSpace,n),s!==null&&(c.matrix.fromArray(s.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,s.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(s.linearVelocity)):c.hasLinearVelocity=!1,s.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(s.angularVelocity)):c.hasAngularVelocity=!1));o!==null&&(i=e.getPose(t.targetRaySpace,n),i===null&&s!==null&&(i=s),i!==null&&(o.matrix.fromArray(i.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,i.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(i.linearVelocity)):o.hasLinearVelocity=!1,i.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(i.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(tm)))}return o!==null&&(o.visible=i!==null),c!==null&&(c.visible=s!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){let n=new Hi;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}};var Es=class extends xn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Dn,this.environmentIntensity=1,this.environmentRotation=new Dn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){let e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}};var Wa=class extends Ze{constructor(t=null,e=1,n=1,i,s,a,o,c,l=Ye,h=Ye,u,f){super(null,a,o,c,l,h,i,s,u,f),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var tl=new $,em=new $,nm=new Ot,Rn=class{constructor(t=new $(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,i){return this.normal.set(t,e,n),this.constant=i,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){let i=tl.subVectors(n,e).cross(em.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(i,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){let t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){let n=t.delta(tl),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;let s=-(t.start.dot(this.normal)+this.constant)/i;return s<0||s>1?null:e.copy(t.start).addScaledVector(n,s)}intersectsLine(t){let e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){let n=e||nm.getNormalMatrix(t),i=this.coplanarPoint(tl).applyMatrix4(t),s=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(s),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}},Vi=new Br,im=new te(.5,.5),Ra=new $,As=class{constructor(t=new Rn,e=new Rn,n=new Rn,i=new Rn,s=new Rn,a=new Rn){this.planes=[t,e,n,i,s,a]}set(t,e,n,i,s,a){let o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(n),o[3].copy(i),o[4].copy(s),o[5].copy(a),this}copy(t){let e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=An,n=!1){let i=this.planes,s=t.elements,a=s[0],o=s[1],c=s[2],l=s[3],h=s[4],u=s[5],f=s[6],d=s[7],v=s[8],_=s[9],g=s[10],m=s[11],T=s[12],w=s[13],A=s[14],C=s[15];if(i[0].setComponents(l-a,d-h,m-v,C-T).normalize(),i[1].setComponents(l+a,d+h,m+v,C+T).normalize(),i[2].setComponents(l+o,d+u,m+_,C+w).normalize(),i[3].setComponents(l-o,d-u,m-_,C-w).normalize(),n)i[4].setComponents(c,f,g,A).normalize(),i[5].setComponents(l-c,d-f,m-g,C-A).normalize();else if(i[4].setComponents(l-c,d-f,m-g,C-A).normalize(),e===An)i[5].setComponents(l+c,d+f,m+g,C+A).normalize();else if(e===xs)i[5].setComponents(c,f,g,A).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Vi.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{let e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),Vi.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Vi)}intersectsSprite(t){Vi.center.set(0,0,0);let e=im.distanceTo(t.center);return Vi.radius=.7071067811865476+e,Vi.applyMatrix4(t.matrixWorld),this.intersectsSphere(Vi)}intersectsSphere(t){let e=this.planes,n=t.center,i=-t.radius;for(let s=0;s<6;s++)if(e[s].distanceToPoint(n)<i)return!1;return!0}intersectsBox(t){let e=this.planes;for(let n=0;n<6;n++){let i=e[n];if(Ra.x=i.normal.x>0?t.max.x:t.min.x,Ra.y=i.normal.y>0?t.max.y:t.min.y,Ra.z=i.normal.z>0?t.max.z:t.min.z,i.distanceToPoint(Ra)<0)return!1}return!0}containsPoint(t){let e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var Cs=class extends Ze{constructor(t,e,n=Mi,i,s,a,o=Ye,c=Ye,l,h=Ur,u=1){if(h!==Ur&&h!==Wr)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let f={width:t,height:e,depth:u};super(f,i,s,a,o,c,h,n,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new Or(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){let e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}},Rs=class extends Ze{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}};var Zi=class r extends ti{constructor(t=1,e=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:i};let s=t/2,a=e/2,o=Math.floor(n),c=Math.floor(i),l=o+1,h=c+1,u=t/o,f=e/c,d=[],v=[],_=[],g=[];for(let m=0;m<h;m++){let T=m*f-a;for(let w=0;w<l;w++){let A=w*u-s;v.push(A,-T,0),_.push(0,0,1),g.push(w/o),g.push(1-m/c)}}for(let m=0;m<c;m++)for(let T=0;T<o;T++){let w=T+l*m,A=T+l*(m+1),C=T+1+l*(m+1),E=T+1+l*m;d.push(w,A,E),d.push(A,C,E)}this.setIndex(d),this.setAttribute("position",new In(v,3)),this.setAttribute("normal",new In(_,3)),this.setAttribute("uv",new In(g,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new r(t.width,t.height,t.widthSegments,t.heightSegments)}};var Xa=class extends Yi{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=sf,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}},qa=class extends Yi{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}};function Pa(r,t){return!r||r.constructor===t?r:typeof t.BYTES_PER_ELEMENT=="number"?new t(r):Array.prototype.slice.call(r)}function rm(r){return ArrayBuffer.isView(r)&&!(r instanceof DataView)}var $i=class{constructor(t,e,n,i){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new e.constructor(n),this.sampleValues=e,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(t){let e=this.parameterPositions,n=this._cachedIndex,i=e[n],s=e[n-1];n:{t:{let a;e:{i:if(!(t<i)){for(let o=n+2;;){if(i===void 0){if(t<s)break i;return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(s=i,i=e[++n],t<i)break t}a=e.length;break e}if(!(t>=s)){let o=e[1];t<o&&(n=2,s=o);for(let c=n-2;;){if(s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===c)break;if(i=s,s=e[--n-1],t>=s)break t}a=n,n=0;break e}break n}for(;n<a;){let o=n+a>>>1;t<e[o]?a=o:n=o+1}if(i=e[n],s=e[n-1],s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,s,i)}return this.interpolate_(n,s,t,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){let e=this.resultBuffer,n=this.sampleValues,i=this.valueSize,s=t*i;for(let a=0;a!==i;++a)e[a]=n[s+a];return e}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},Ya=class extends $i{constructor(t,e,n,i){super(t,e,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:el,endingEnd:el}}intervalChanged_(t,e,n){let i=this.parameterPositions,s=t-2,a=t+1,o=i[s],c=i[a];if(o===void 0)switch(this.getSettings_().endingStart){case nl:s=t,o=2*e-n;break;case il:s=i.length-2,o=e+i[s]-i[s+1];break;default:s=t,o=n}if(c===void 0)switch(this.getSettings_().endingEnd){case nl:a=t,c=2*n-e;break;case il:a=1,c=n+i[1]-i[0];break;default:a=t-1,c=e}let l=(n-e)*.5,h=this.valueSize;this._weightPrev=l/(e-o),this._weightNext=l/(c-n),this._offsetPrev=s*h,this._offsetNext=a*h}interpolate_(t,e,n,i){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=t*o,l=c-o,h=this._offsetPrev,u=this._offsetNext,f=this._weightPrev,d=this._weightNext,v=(n-e)/(i-e),_=v*v,g=_*v,m=-f*g+2*f*_-f*v,T=(1+f)*g+(-1.5-2*f)*_+(-.5+f)*v+1,w=(-1-d)*g+(1.5+d)*_+.5*v,A=d*g-d*_;for(let C=0;C!==o;++C)s[C]=m*a[h+C]+T*a[l+C]+w*a[c+C]+A*a[u+C];return s}},Za=class extends $i{constructor(t,e,n,i){super(t,e,n,i)}interpolate_(t,e,n,i){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=t*o,l=c-o,h=(n-e)/(i-e),u=1-h;for(let f=0;f!==o;++f)s[f]=a[l+f]*u+a[c+f]*h;return s}},$a=class extends $i{constructor(t,e,n,i){super(t,e,n,i)}interpolate_(t){return this.copySampleValue_(t-1)}},hn=class{constructor(t,e,n,i){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=Pa(e,this.TimeBufferType),this.values=Pa(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(t){let e=t.constructor,n;if(e.toJSON!==this.toJSON)n=e.toJSON(t);else{n={name:t.name,times:Pa(t.times,Array),values:Pa(t.values,Array)};let i=t.getInterpolation();i!==t.DefaultInterpolation&&(n.interpolation=i)}return n.type=t.ValueTypeName,n}InterpolantFactoryMethodDiscrete(t){return new $a(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new Za(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new Ya(this.times,this.values,this.getValueSize(),t)}setInterpolation(t){let e;switch(t){case ms:e=this.InterpolantFactoryMethodDiscrete;break;case Fa:e=this.InterpolantFactoryMethodLinear;break;case Ia:e=this.InterpolantFactoryMethodSmooth;break}if(e===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return Dt("KeyframeTrack:",n),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return ms;case this.InterpolantFactoryMethodLinear:return Fa;case this.InterpolantFactoryMethodSmooth:return Ia}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){let e=this.times;for(let n=0,i=e.length;n!==i;++n)e[n]+=t}return this}scale(t){if(t!==1){let e=this.times;for(let n=0,i=e.length;n!==i;++n)e[n]*=t}return this}trim(t,e){let n=this.times,i=n.length,s=0,a=i-1;for(;s!==i&&n[s]<t;)++s;for(;a!==-1&&n[a]>e;)--a;if(++a,s!==0||a!==i){s>=a&&(a=Math.max(a,1),s=a-1);let o=this.getValueSize();this.times=n.slice(s,a),this.values=this.values.slice(s*o,a*o)}return this}validate(){let t=!0,e=this.getValueSize();e-Math.floor(e)!==0&&(Xt("KeyframeTrack: Invalid value size in track.",this),t=!1);let n=this.times,i=this.values,s=n.length;s===0&&(Xt("KeyframeTrack: Track is empty.",this),t=!1);let a=null;for(let o=0;o!==s;o++){let c=n[o];if(typeof c=="number"&&isNaN(c)){Xt("KeyframeTrack: Time is not a valid number.",this,o,c),t=!1;break}if(a!==null&&a>c){Xt("KeyframeTrack: Out of order keys.",this,o,c,a),t=!1;break}a=c}if(i!==void 0&&rm(i))for(let o=0,c=i.length;o!==c;++o){let l=i[o];if(isNaN(l)){Xt("KeyframeTrack: Value is not a valid number.",this,o,l),t=!1;break}}return t}optimize(){let t=this.times.slice(),e=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===Ia,s=t.length-1,a=1;for(let o=1;o<s;++o){let c=!1,l=t[o],h=t[o+1];if(l!==h&&(o!==1||l!==t[0]))if(i)c=!0;else{let u=o*n,f=u-n,d=u+n;for(let v=0;v!==n;++v){let _=e[u+v];if(_!==e[f+v]||_!==e[d+v]){c=!0;break}}}if(c){if(o!==a){t[a]=t[o];let u=o*n,f=a*n;for(let d=0;d!==n;++d)e[f+d]=e[u+d]}++a}}if(s>0){t[a]=t[s];for(let o=s*n,c=a*n,l=0;l!==n;++l)e[c+l]=e[o+l];++a}return a!==t.length?(this.times=t.slice(0,a),this.values=e.slice(0,a*n)):(this.times=t,this.values=e),this}clone(){let t=this.times.slice(),e=this.values.slice(),n=this.constructor,i=new n(this.name,t,e);return i.createInterpolant=this.createInterpolant,i}};hn.prototype.ValueTypeName="";hn.prototype.TimeBufferType=Float32Array;hn.prototype.ValueBufferType=Float32Array;hn.prototype.DefaultInterpolation=Fa;var vi=class extends hn{constructor(t,e,n){super(t,e,n)}};vi.prototype.ValueTypeName="bool";vi.prototype.ValueBufferType=Array;vi.prototype.DefaultInterpolation=ms;vi.prototype.InterpolantFactoryMethodLinear=void 0;vi.prototype.InterpolantFactoryMethodSmooth=void 0;var Ja=class extends hn{constructor(t,e,n,i){super(t,e,n,i)}};Ja.prototype.ValueTypeName="color";var Ka=class extends hn{constructor(t,e,n,i){super(t,e,n,i)}};Ka.prototype.ValueTypeName="number";var ja=class extends $i{constructor(t,e,n,i){super(t,e,n,i)}interpolate_(t,e,n,i){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=(n-e)/(i-e),l=t*o;for(let h=l+o;l!==h;l+=4)Qn.slerpFlat(s,0,a,l-o,a,l,c);return s}},Ps=class extends hn{constructor(t,e,n,i){super(t,e,n,i)}InterpolantFactoryMethodLinear(t){return new ja(this.times,this.values,this.getValueSize(),t)}};Ps.prototype.ValueTypeName="quaternion";Ps.prototype.InterpolantFactoryMethodSmooth=void 0;var yi=class extends hn{constructor(t,e,n){super(t,e,n)}};yi.prototype.ValueTypeName="string";yi.prototype.ValueBufferType=Array;yi.prototype.DefaultInterpolation=ms;yi.prototype.InterpolantFactoryMethodLinear=void 0;yi.prototype.InterpolantFactoryMethodSmooth=void 0;var Qa=class extends hn{constructor(t,e,n,i){super(t,e,n,i)}};Qa.prototype.ValueTypeName="vector";var to=class{constructor(t,e,n){let i=this,s=!1,a=0,o=0,c,l=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=n,this._abortController=null,this.itemStart=function(h){o++,s===!1&&i.onStart!==void 0&&i.onStart(h,a,o),s=!0},this.itemEnd=function(h){a++,i.onProgress!==void 0&&i.onProgress(h,a,o),a===o&&(s=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(h){i.onError!==void 0&&i.onError(h)},this.resolveURL=function(h){return c?c(h):h},this.setURLModifier=function(h){return c=h,this},this.addHandler=function(h,u){return l.push(h,u),this},this.removeHandler=function(h){let u=l.indexOf(h);return u!==-1&&l.splice(u,2),this},this.getHandler=function(h){for(let u=0,f=l.length;u<f;u+=2){let d=l[u],v=l[u+1];if(d.global&&(d.lastIndex=0),d.test(h))return v}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},yf=new to,eo=class{constructor(t){this.manager=t!==void 0?t:yf,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(t,e){let n=this;return new Promise(function(i,s){n.load(t,i,e,s)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}abort(){return this}};eo.DEFAULT_MATERIAL_NAME="__DEFAULT";var Vr=class extends ws{constructor(t=-1,e=1,n=1,i=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=i,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,i,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2,s=n-t,a=n+t,o=i+e,c=i-e;if(this.view!==null&&this.view.enabled){let l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=l*this.view.offsetX,a=s+l*this.view.width,o-=h*this.view.offsetY,c=o-h*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}};var no=class extends qe{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}};var El="\\[\\]\\.:\\/",sm=new RegExp("["+El+"]","g"),Al="[^"+El+"]",am="[^"+El.replace("\\.","")+"]",om=/((?:WC+[\/:])*)/.source.replace("WC",Al),cm=/(WCOD+)?/.source.replace("WCOD",am),lm=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Al),hm=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Al),um=new RegExp("^"+om+cm+lm+hm+"$"),fm=["material","materials","bones","map"],al=class{constructor(t,e,n){let i=n||le.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,i)}getValue(t,e){this.bind();let n=this._targetGroup.nCachedObjects_,i=this._bindings[n];i!==void 0&&i.getValue(t,e)}setValue(t,e){let n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,s=n.length;i!==s;++i)n[i].setValue(t,e)}bind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].bind()}unbind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].unbind()}},le=class r{constructor(t,e,n){this.path=e,this.parsedPath=n||r.parseTrackName(e),this.node=r.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,e,n){return t&&t.isAnimationObjectGroup?new r.Composite(t,e,n):new r(t,e,n)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(sm,"")}static parseTrackName(t){let e=um.exec(t);if(e===null)throw new Error("PropertyBinding: Cannot parse trackName: "+t);let n={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){let s=n.nodeName.substring(i+1);fm.indexOf(s)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=s)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+t);return n}static findNode(t,e){if(e===void 0||e===""||e==="."||e===-1||e===t.name||e===t.uuid)return t;if(t.skeleton){let n=t.skeleton.getBoneByName(e);if(n!==void 0)return n}if(t.children){let n=function(s){for(let a=0;a<s.length;a++){let o=s[a];if(o.name===e||o.uuid===e)return o;let c=n(o.children);if(c)return c}return null},i=n(t.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,e){t[e]=this.targetObject[this.propertyName]}_getValue_array(t,e){let n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)t[e++]=n[i]}_getValue_arrayElement(t,e){t[e]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,e){this.resolvedProperty.toArray(t,e)}_setValue_direct(t,e){this.targetObject[this.propertyName]=t[e]}_setValue_direct_setNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,e){let n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=t[e++]}_setValue_array_setNeedsUpdate(t,e){let n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=t[e++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,e){let n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}_setValue_arrayElement_setNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,e){this.resolvedProperty.fromArray(t,e)}_setValue_fromArray_setNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,e){this.bind(),this.getValue(t,e)}_setValue_unbound(t,e){this.bind(),this.setValue(t,e)}bind(){let t=this.node,e=this.parsedPath,n=e.objectName,i=e.propertyName,s=e.propertyIndex;if(t||(t=r.findNode(this.rootNode,e.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){Dt("PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let l=e.objectIndex;switch(n){case"materials":if(!t.material){Xt("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){Xt("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){Xt("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let h=0;h<t.length;h++)if(t[h].name===l){l=h;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){Xt("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){Xt("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[n]===void 0){Xt("PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[n]}if(l!==void 0){if(t[l]===void 0){Xt("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[l]}}let a=t[i];if(a===void 0){let l=e.nodeName;Xt("PropertyBinding: Trying to update property for track: "+l+"."+i+" but it wasn't found.",t);return}let o=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?o=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(s!==void 0){if(i==="morphTargetInfluences"){if(!t.geometry){Xt("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){Xt("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[s]!==void 0&&(s=t.morphTargetDictionary[s])}c=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=s}else a.fromArray!==void 0&&a.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(c=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=i;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};le.Composite=al;le.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};le.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};le.prototype.GetterByBindingType=[le.prototype._getValue_direct,le.prototype._getValue_array,le.prototype._getValue_arrayElement,le.prototype._getValue_toArray];le.prototype.SetterByBindingTypeAndVersioning=[[le.prototype._setValue_direct,le.prototype._setValue_direct_setNeedsUpdate,le.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[le.prototype._setValue_array,le.prototype._setValue_array_setNeedsUpdate,le.prototype._setValue_array_setMatrixWorldNeedsUpdate],[le.prototype._setValue_arrayElement,le.prototype._setValue_arrayElement_setNeedsUpdate,le.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[le.prototype._setValue_fromArray,le.prototype._setValue_fromArray_setNeedsUpdate,le.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var Ly=new Float32Array(1);function Cl(r,t,e,n){let i=dm(n);switch(e){case _l:return r*t;case yl:return r*t/i.components*i.byteLength;case xo:return r*t/i.components*i.byteLength;case _o:return r*t*2/i.components*i.byteLength;case vo:return r*t*2/i.components*i.byteLength;case vl:return r*t*3/i.components*i.byteLength;case _n:return r*t*4/i.components*i.byteLength;case yo:return r*t*4/i.components*i.byteLength;case Ds:case Us:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*8;case Ns:case Fs:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*16;case Mo:case wo:return Math.max(r,16)*Math.max(t,8)/4;case bo:case So:return Math.max(r,8)*Math.max(t,8)/2;case To:case Eo:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*8;case Ao:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*16;case Co:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*16;case Ro:return Math.floor((r+4)/5)*Math.floor((t+3)/4)*16;case Po:return Math.floor((r+4)/5)*Math.floor((t+4)/5)*16;case Io:return Math.floor((r+5)/6)*Math.floor((t+4)/5)*16;case Lo:return Math.floor((r+5)/6)*Math.floor((t+5)/6)*16;case Do:return Math.floor((r+7)/8)*Math.floor((t+4)/5)*16;case Uo:return Math.floor((r+7)/8)*Math.floor((t+5)/6)*16;case No:return Math.floor((r+7)/8)*Math.floor((t+7)/8)*16;case Fo:return Math.floor((r+9)/10)*Math.floor((t+4)/5)*16;case Oo:return Math.floor((r+9)/10)*Math.floor((t+5)/6)*16;case Bo:return Math.floor((r+9)/10)*Math.floor((t+7)/8)*16;case ko:return Math.floor((r+9)/10)*Math.floor((t+9)/10)*16;case zo:return Math.floor((r+11)/12)*Math.floor((t+9)/10)*16;case Vo:return Math.floor((r+11)/12)*Math.floor((t+11)/12)*16;case Go:case Ho:case Wo:return Math.ceil(r/4)*Math.ceil(t/4)*16;case Xo:case qo:return Math.ceil(r/4)*Math.ceil(t/4)*8;case Yo:case Zo:return Math.ceil(r/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function dm(r){switch(r){case On:case pl:return{byteLength:1,components:1};case Gr:case ml:case ji:return{byteLength:2,components:1};case mo:case go:return{byteLength:2,components:4};case Mi:case po:case Bn:return{byteLength:4,components:1};case gl:case xl:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${r}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"181"}}));typeof window<"u"&&(window.__THREE__?Dt("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="181");function Hf(){let r=null,t=!1,e=null,n=null;function i(s,a){e(s,a),n=r.requestAnimationFrame(i)}return{start:function(){t!==!0&&e!==null&&(n=r.requestAnimationFrame(i),t=!0)},stop:function(){r.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(s){e=s},setContext:function(s){r=s}}}function mm(r){let t=new WeakMap;function e(o,c){let l=o.array,h=o.usage,u=l.byteLength,f=r.createBuffer();r.bindBuffer(c,f),r.bufferData(c,l,h),o.onUploadCallback();let d;if(l instanceof Float32Array)d=r.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)d=r.HALF_FLOAT;else if(l instanceof Uint16Array)o.isFloat16BufferAttribute?d=r.HALF_FLOAT:d=r.UNSIGNED_SHORT;else if(l instanceof Int16Array)d=r.SHORT;else if(l instanceof Uint32Array)d=r.UNSIGNED_INT;else if(l instanceof Int32Array)d=r.INT;else if(l instanceof Int8Array)d=r.BYTE;else if(l instanceof Uint8Array)d=r.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)d=r.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:f,type:d,bytesPerElement:l.BYTES_PER_ELEMENT,version:o.version,size:u}}function n(o,c,l){let h=c.array,u=c.updateRanges;if(r.bindBuffer(l,o),u.length===0)r.bufferSubData(l,0,h);else{u.sort((d,v)=>d.start-v.start);let f=0;for(let d=1;d<u.length;d++){let v=u[f],_=u[d];_.start<=v.start+v.count+1?v.count=Math.max(v.count,_.start+_.count-v.start):(++f,u[f]=_)}u.length=f+1;for(let d=0,v=u.length;d<v;d++){let _=u[d];r.bufferSubData(l,_.start*h.BYTES_PER_ELEMENT,h,_.start,_.count)}c.clearUpdateRanges()}c.onUploadCallback()}function i(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function s(o){o.isInterleavedBufferAttribute&&(o=o.data);let c=t.get(o);c&&(r.deleteBuffer(c.buffer),t.delete(o))}function a(o,c){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){let h=t.get(o);(!h||h.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}let l=t.get(o);if(l===void 0)t.set(o,e(o,c));else if(l.version<o.version){if(l.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,o,c),l.version=o.version}}return{get:i,remove:s,update:a}}var gm=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,xm=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,_m=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,vm=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,ym=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,bm=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Mm=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Sm=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,wm=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,Tm=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Em=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Am=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Cm=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Rm=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Pm=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Im=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,Lm=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Dm=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Um=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Nm=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Fm=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Om=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Bm=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,km=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,zm=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Vm=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,Gm=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Hm=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Wm=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Xm=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,qm="gl_FragColor = linearToOutputTexel( gl_FragColor );",Ym=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Zm=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,$m=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,Jm=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Km=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,jm=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Qm=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,t0=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,e0=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,n0=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,i0=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,r0=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,s0=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,a0=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,o0=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,c0=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,l0=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,h0=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,u0=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,f0=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,d0=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,p0=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 uv = vec2( roughness, dotNV );
	return texture2D( dfgLUT, uv ).rg;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
vec3 BRDF_GGX_Multiscatter( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 singleScatter = BRDF_GGX( lightDir, viewDir, normal, material );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 dfgV = DFGApprox( vec3(0.0, 0.0, 1.0), vec3(sqrt(1.0 - dotNV * dotNV), 0.0, dotNV), material.roughness );
	vec2 dfgL = DFGApprox( vec3(0.0, 0.0, 1.0), vec3(sqrt(1.0 - dotNL * dotNL), 0.0, dotNL), material.roughness );
	vec3 FssEss_V = material.specularColor * dfgV.x + material.specularF90 * dfgV.y;
	vec3 FssEss_L = material.specularColor * dfgL.x + material.specularF90 * dfgL.y;
	float Ess_V = dfgV.x + dfgV.y;
	float Ess_L = dfgL.x + dfgL.y;
	float Ems_V = 1.0 - Ess_V;
	float Ems_L = 1.0 - Ess_L;
	vec3 Favg = material.specularColor + ( 1.0 - material.specularColor ) * 0.047619;
	vec3 Fms = FssEss_V * FssEss_L * Favg / ( 1.0 - Ems_V * Ems_L * Favg * Favg + EPSILON );
	float compensationFactor = Ems_V * Ems_L;
	vec3 multiScatter = Fms * compensationFactor;
	return singleScatter + multiScatter;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX_Multiscatter( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,m0=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,g0=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,x0=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,_0=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,v0=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,y0=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,b0=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,M0=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,S0=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,w0=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,T0=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,E0=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,A0=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,C0=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,R0=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,P0=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,I0=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,L0=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,D0=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,U0=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,N0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,F0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,O0=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,B0=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,k0=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,z0=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,V0=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,G0=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,H0=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,W0=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,X0=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,q0=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Y0=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Z0=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,$0=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,J0=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,K0=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		float depth = unpackRGBAToDepth( texture2D( depths, uv ) );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			return step( depth, compare );
		#else
			return step( compare, depth );
		#endif
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow( sampler2D shadow, vec2 uv, float compare ) {
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			float hard_shadow = step( distribution.x, compare );
		#else
			float hard_shadow = step( compare, distribution.x );
		#endif
		if ( hard_shadow != 1.0 ) {
			float distance = compare - distribution.x;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,j0=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Q0=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,tg=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,eg=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,ng=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,ig=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,rg=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,sg=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,ag=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,og=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,cg=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,lg=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,hg=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,ug=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,fg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,dg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,pg=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,mg=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,gg=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,xg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,_g=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,vg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,yg=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,bg=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Mg=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,Sg=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,wg=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,Tg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Eg=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Ag=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Cg=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Rg=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Pg=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Ig=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Lg=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Dg=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Ug=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Ng=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Fg=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Og=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Bg=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,kg=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,zg=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Vg=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Gg=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Hg=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Wg=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Xg=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,qg=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Yg=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Zg=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,kt={alphahash_fragment:gm,alphahash_pars_fragment:xm,alphamap_fragment:_m,alphamap_pars_fragment:vm,alphatest_fragment:ym,alphatest_pars_fragment:bm,aomap_fragment:Mm,aomap_pars_fragment:Sm,batching_pars_vertex:wm,batching_vertex:Tm,begin_vertex:Em,beginnormal_vertex:Am,bsdfs:Cm,iridescence_fragment:Rm,bumpmap_pars_fragment:Pm,clipping_planes_fragment:Im,clipping_planes_pars_fragment:Lm,clipping_planes_pars_vertex:Dm,clipping_planes_vertex:Um,color_fragment:Nm,color_pars_fragment:Fm,color_pars_vertex:Om,color_vertex:Bm,common:km,cube_uv_reflection_fragment:zm,defaultnormal_vertex:Vm,displacementmap_pars_vertex:Gm,displacementmap_vertex:Hm,emissivemap_fragment:Wm,emissivemap_pars_fragment:Xm,colorspace_fragment:qm,colorspace_pars_fragment:Ym,envmap_fragment:Zm,envmap_common_pars_fragment:$m,envmap_pars_fragment:Jm,envmap_pars_vertex:Km,envmap_physical_pars_fragment:c0,envmap_vertex:jm,fog_vertex:Qm,fog_pars_vertex:t0,fog_fragment:e0,fog_pars_fragment:n0,gradientmap_pars_fragment:i0,lightmap_pars_fragment:r0,lights_lambert_fragment:s0,lights_lambert_pars_fragment:a0,lights_pars_begin:o0,lights_toon_fragment:l0,lights_toon_pars_fragment:h0,lights_phong_fragment:u0,lights_phong_pars_fragment:f0,lights_physical_fragment:d0,lights_physical_pars_fragment:p0,lights_fragment_begin:m0,lights_fragment_maps:g0,lights_fragment_end:x0,logdepthbuf_fragment:_0,logdepthbuf_pars_fragment:v0,logdepthbuf_pars_vertex:y0,logdepthbuf_vertex:b0,map_fragment:M0,map_pars_fragment:S0,map_particle_fragment:w0,map_particle_pars_fragment:T0,metalnessmap_fragment:E0,metalnessmap_pars_fragment:A0,morphinstance_vertex:C0,morphcolor_vertex:R0,morphnormal_vertex:P0,morphtarget_pars_vertex:I0,morphtarget_vertex:L0,normal_fragment_begin:D0,normal_fragment_maps:U0,normal_pars_fragment:N0,normal_pars_vertex:F0,normal_vertex:O0,normalmap_pars_fragment:B0,clearcoat_normal_fragment_begin:k0,clearcoat_normal_fragment_maps:z0,clearcoat_pars_fragment:V0,iridescence_pars_fragment:G0,opaque_fragment:H0,packing:W0,premultiplied_alpha_fragment:X0,project_vertex:q0,dithering_fragment:Y0,dithering_pars_fragment:Z0,roughnessmap_fragment:$0,roughnessmap_pars_fragment:J0,shadowmap_pars_fragment:K0,shadowmap_pars_vertex:j0,shadowmap_vertex:Q0,shadowmask_pars_fragment:tg,skinbase_vertex:eg,skinning_pars_vertex:ng,skinning_vertex:ig,skinnormal_vertex:rg,specularmap_fragment:sg,specularmap_pars_fragment:ag,tonemapping_fragment:og,tonemapping_pars_fragment:cg,transmission_fragment:lg,transmission_pars_fragment:hg,uv_pars_fragment:ug,uv_pars_vertex:fg,uv_vertex:dg,worldpos_vertex:pg,background_vert:mg,background_frag:gg,backgroundCube_vert:xg,backgroundCube_frag:_g,cube_vert:vg,cube_frag:yg,depth_vert:bg,depth_frag:Mg,distanceRGBA_vert:Sg,distanceRGBA_frag:wg,equirect_vert:Tg,equirect_frag:Eg,linedashed_vert:Ag,linedashed_frag:Cg,meshbasic_vert:Rg,meshbasic_frag:Pg,meshlambert_vert:Ig,meshlambert_frag:Lg,meshmatcap_vert:Dg,meshmatcap_frag:Ug,meshnormal_vert:Ng,meshnormal_frag:Fg,meshphong_vert:Og,meshphong_frag:Bg,meshphysical_vert:kg,meshphysical_frag:zg,meshtoon_vert:Vg,meshtoon_frag:Gg,points_vert:Hg,points_frag:Wg,shadow_vert:Xg,shadow_frag:qg,sprite_vert:Yg,sprite_frag:Zg},_t={common:{diffuse:{value:new Jt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ot},alphaMap:{value:null},alphaMapTransform:{value:new Ot},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ot}},envmap:{envMap:{value:null},envMapRotation:{value:new Ot},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ot}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ot}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ot},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ot},normalScale:{value:new te(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ot},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ot}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ot}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ot}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Jt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Jt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ot},alphaTest:{value:0},uvTransform:{value:new Ot}},sprite:{diffuse:{value:new Jt(16777215)},opacity:{value:1},center:{value:new te(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ot},alphaMap:{value:null},alphaMapTransform:{value:new Ot},alphaTest:{value:0}}},kn={basic:{uniforms:Ne([_t.common,_t.specularmap,_t.envmap,_t.aomap,_t.lightmap,_t.fog]),vertexShader:kt.meshbasic_vert,fragmentShader:kt.meshbasic_frag},lambert:{uniforms:Ne([_t.common,_t.specularmap,_t.envmap,_t.aomap,_t.lightmap,_t.emissivemap,_t.bumpmap,_t.normalmap,_t.displacementmap,_t.fog,_t.lights,{emissive:{value:new Jt(0)}}]),vertexShader:kt.meshlambert_vert,fragmentShader:kt.meshlambert_frag},phong:{uniforms:Ne([_t.common,_t.specularmap,_t.envmap,_t.aomap,_t.lightmap,_t.emissivemap,_t.bumpmap,_t.normalmap,_t.displacementmap,_t.fog,_t.lights,{emissive:{value:new Jt(0)},specular:{value:new Jt(1118481)},shininess:{value:30}}]),vertexShader:kt.meshphong_vert,fragmentShader:kt.meshphong_frag},standard:{uniforms:Ne([_t.common,_t.envmap,_t.aomap,_t.lightmap,_t.emissivemap,_t.bumpmap,_t.normalmap,_t.displacementmap,_t.roughnessmap,_t.metalnessmap,_t.fog,_t.lights,{emissive:{value:new Jt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:kt.meshphysical_vert,fragmentShader:kt.meshphysical_frag},toon:{uniforms:Ne([_t.common,_t.aomap,_t.lightmap,_t.emissivemap,_t.bumpmap,_t.normalmap,_t.displacementmap,_t.gradientmap,_t.fog,_t.lights,{emissive:{value:new Jt(0)}}]),vertexShader:kt.meshtoon_vert,fragmentShader:kt.meshtoon_frag},matcap:{uniforms:Ne([_t.common,_t.bumpmap,_t.normalmap,_t.displacementmap,_t.fog,{matcap:{value:null}}]),vertexShader:kt.meshmatcap_vert,fragmentShader:kt.meshmatcap_frag},points:{uniforms:Ne([_t.points,_t.fog]),vertexShader:kt.points_vert,fragmentShader:kt.points_frag},dashed:{uniforms:Ne([_t.common,_t.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:kt.linedashed_vert,fragmentShader:kt.linedashed_frag},depth:{uniforms:Ne([_t.common,_t.displacementmap]),vertexShader:kt.depth_vert,fragmentShader:kt.depth_frag},normal:{uniforms:Ne([_t.common,_t.bumpmap,_t.normalmap,_t.displacementmap,{opacity:{value:1}}]),vertexShader:kt.meshnormal_vert,fragmentShader:kt.meshnormal_frag},sprite:{uniforms:Ne([_t.sprite,_t.fog]),vertexShader:kt.sprite_vert,fragmentShader:kt.sprite_frag},background:{uniforms:{uvTransform:{value:new Ot},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:kt.background_vert,fragmentShader:kt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ot}},vertexShader:kt.backgroundCube_vert,fragmentShader:kt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:kt.cube_vert,fragmentShader:kt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:kt.equirect_vert,fragmentShader:kt.equirect_frag},distanceRGBA:{uniforms:Ne([_t.common,_t.displacementmap,{referencePosition:{value:new $},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:kt.distanceRGBA_vert,fragmentShader:kt.distanceRGBA_frag},shadow:{uniforms:Ne([_t.lights,_t.fog,{color:{value:new Jt(0)},opacity:{value:1}}]),vertexShader:kt.shadow_vert,fragmentShader:kt.shadow_frag}};kn.physical={uniforms:Ne([kn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ot},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ot},clearcoatNormalScale:{value:new te(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ot},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ot},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ot},sheen:{value:0},sheenColor:{value:new Jt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ot},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ot},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ot},transmissionSamplerSize:{value:new te},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ot},attenuationDistance:{value:0},attenuationColor:{value:new Jt(0)},specularColor:{value:new Jt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ot},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ot},anisotropyVector:{value:new te},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ot}}]),vertexShader:kt.meshphysical_vert,fragmentShader:kt.meshphysical_frag};var $o={r:0,b:0,g:0},tr=new Dn,$g=new Te;function Jg(r,t,e,n,i,s,a){let o=new Jt(0),c=s===!0?0:1,l,h,u=null,f=0,d=null;function v(w){let A=w.isScene===!0?w.background:null;return A&&A.isTexture&&(A=(w.backgroundBlurriness>0?e:t).get(A)),A}function _(w){let A=!1,C=v(w);C===null?m(o,c):C&&C.isColor&&(m(C,1),A=!0);let E=r.xr.getEnvironmentBlendMode();E==="additive"?n.buffers.color.setClear(0,0,0,1,a):E==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(r.autoClear||A)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),r.clear(r.autoClearColor,r.autoClearDepth,r.autoClearStencil))}function g(w,A){let C=v(A);C&&(C.isCubeTexture||C.mapping===Is)?(h===void 0&&(h=new ln(new kr(1,1,1),new $e({name:"BackgroundCubeMaterial",uniforms:Qi(kn.backgroundCube.uniforms),vertexShader:kn.backgroundCube.vertexShader,fragmentShader:kn.backgroundCube.fragmentShader,side:ke,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(E,P,F){this.matrixWorld.copyPosition(F.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(h)),tr.copy(A.backgroundRotation),tr.x*=-1,tr.y*=-1,tr.z*=-1,C.isCubeTexture&&C.isRenderTargetTexture===!1&&(tr.y*=-1,tr.z*=-1),h.material.uniforms.envMap.value=C,h.material.uniforms.flipEnvMap.value=C.isCubeTexture&&C.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=A.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=A.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4($g.makeRotationFromEuler(tr)),h.material.toneMapped=jt.getTransfer(C.colorSpace)!==ee,(u!==C||f!==C.version||d!==r.toneMapping)&&(h.material.needsUpdate=!0,u=C,f=C.version,d=r.toneMapping),h.layers.enableAll(),w.unshift(h,h.geometry,h.material,0,0,null)):C&&C.isTexture&&(l===void 0&&(l=new ln(new Zi(2,2),new $e({name:"BackgroundMaterial",uniforms:Qi(kn.background.uniforms),vertexShader:kn.background.vertexShader,fragmentShader:kn.background.fragmentShader,side:Kn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=C,l.material.uniforms.backgroundIntensity.value=A.backgroundIntensity,l.material.toneMapped=jt.getTransfer(C.colorSpace)!==ee,C.matrixAutoUpdate===!0&&C.updateMatrix(),l.material.uniforms.uvTransform.value.copy(C.matrix),(u!==C||f!==C.version||d!==r.toneMapping)&&(l.material.needsUpdate=!0,u=C,f=C.version,d=r.toneMapping),l.layers.enableAll(),w.unshift(l,l.geometry,l.material,0,0,null))}function m(w,A){w.getRGB($o,Tl(r)),n.buffers.color.setClear($o.r,$o.g,$o.b,A,a)}function T(){h!==void 0&&(h.geometry.dispose(),h.material.dispose(),h=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return o},setClearColor:function(w,A=1){o.set(w),c=A,m(o,c)},getClearAlpha:function(){return c},setClearAlpha:function(w){c=w,m(o,c)},render:_,addToRenderList:g,dispose:T}}function Kg(r,t){let e=r.getParameter(r.MAX_VERTEX_ATTRIBS),n={},i=f(null),s=i,a=!1;function o(M,N,G,H,Z){let J=!1,Y=u(H,G,N);s!==Y&&(s=Y,l(s.object)),J=d(M,H,G,Z),J&&v(M,H,G,Z),Z!==null&&t.update(Z,r.ELEMENT_ARRAY_BUFFER),(J||a)&&(a=!1,A(M,N,G,H),Z!==null&&r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,t.get(Z).buffer))}function c(){return r.createVertexArray()}function l(M){return r.bindVertexArray(M)}function h(M){return r.deleteVertexArray(M)}function u(M,N,G){let H=G.wireframe===!0,Z=n[M.id];Z===void 0&&(Z={},n[M.id]=Z);let J=Z[N.id];J===void 0&&(J={},Z[N.id]=J);let Y=J[H];return Y===void 0&&(Y=f(c()),J[H]=Y),Y}function f(M){let N=[],G=[],H=[];for(let Z=0;Z<e;Z++)N[Z]=0,G[Z]=0,H[Z]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:N,enabledAttributes:G,attributeDivisors:H,object:M,attributes:{},index:null}}function d(M,N,G,H){let Z=s.attributes,J=N.attributes,Y=0,at=G.getAttributes();for(let W in at)if(at[W].location>=0){let ft=Z[W],Et=J[W];if(Et===void 0&&(W==="instanceMatrix"&&M.instanceMatrix&&(Et=M.instanceMatrix),W==="instanceColor"&&M.instanceColor&&(Et=M.instanceColor)),ft===void 0||ft.attribute!==Et||Et&&ft.data!==Et.data)return!0;Y++}return s.attributesNum!==Y||s.index!==H}function v(M,N,G,H){let Z={},J=N.attributes,Y=0,at=G.getAttributes();for(let W in at)if(at[W].location>=0){let ft=J[W];ft===void 0&&(W==="instanceMatrix"&&M.instanceMatrix&&(ft=M.instanceMatrix),W==="instanceColor"&&M.instanceColor&&(ft=M.instanceColor));let Et={};Et.attribute=ft,ft&&ft.data&&(Et.data=ft.data),Z[W]=Et,Y++}s.attributes=Z,s.attributesNum=Y,s.index=H}function _(){let M=s.newAttributes;for(let N=0,G=M.length;N<G;N++)M[N]=0}function g(M){m(M,0)}function m(M,N){let G=s.newAttributes,H=s.enabledAttributes,Z=s.attributeDivisors;G[M]=1,H[M]===0&&(r.enableVertexAttribArray(M),H[M]=1),Z[M]!==N&&(r.vertexAttribDivisor(M,N),Z[M]=N)}function T(){let M=s.newAttributes,N=s.enabledAttributes;for(let G=0,H=N.length;G<H;G++)N[G]!==M[G]&&(r.disableVertexAttribArray(G),N[G]=0)}function w(M,N,G,H,Z,J,Y){Y===!0?r.vertexAttribIPointer(M,N,G,Z,J):r.vertexAttribPointer(M,N,G,H,Z,J)}function A(M,N,G,H){_();let Z=H.attributes,J=G.getAttributes(),Y=N.defaultAttributeValues;for(let at in J){let W=J[at];if(W.location>=0){let ut=Z[at];if(ut===void 0&&(at==="instanceMatrix"&&M.instanceMatrix&&(ut=M.instanceMatrix),at==="instanceColor"&&M.instanceColor&&(ut=M.instanceColor)),ut!==void 0){let ft=ut.normalized,Et=ut.itemSize,Ut=t.get(ut);if(Ut===void 0)continue;let Kt=Ut.buffer,Vt=Ut.type,qt=Ut.bytesPerElement,et=Vt===r.INT||Vt===r.UNSIGNED_INT||ut.gpuType===po;if(ut.isInterleavedBufferAttribute){let rt=ut.data,bt=rt.stride,Nt=ut.offset;if(rt.isInstancedInterleavedBuffer){for(let Ct=0;Ct<W.locationSize;Ct++)m(W.location+Ct,rt.meshPerAttribute);M.isInstancedMesh!==!0&&H._maxInstanceCount===void 0&&(H._maxInstanceCount=rt.meshPerAttribute*rt.count)}else for(let Ct=0;Ct<W.locationSize;Ct++)g(W.location+Ct);r.bindBuffer(r.ARRAY_BUFFER,Kt);for(let Ct=0;Ct<W.locationSize;Ct++)w(W.location+Ct,Et/W.locationSize,Vt,ft,bt*qt,(Nt+Et/W.locationSize*Ct)*qt,et)}else{if(ut.isInstancedBufferAttribute){for(let rt=0;rt<W.locationSize;rt++)m(W.location+rt,ut.meshPerAttribute);M.isInstancedMesh!==!0&&H._maxInstanceCount===void 0&&(H._maxInstanceCount=ut.meshPerAttribute*ut.count)}else for(let rt=0;rt<W.locationSize;rt++)g(W.location+rt);r.bindBuffer(r.ARRAY_BUFFER,Kt);for(let rt=0;rt<W.locationSize;rt++)w(W.location+rt,Et/W.locationSize,Vt,ft,Et*qt,Et/W.locationSize*rt*qt,et)}}else if(Y!==void 0){let ft=Y[at];if(ft!==void 0)switch(ft.length){case 2:r.vertexAttrib2fv(W.location,ft);break;case 3:r.vertexAttrib3fv(W.location,ft);break;case 4:r.vertexAttrib4fv(W.location,ft);break;default:r.vertexAttrib1fv(W.location,ft)}}}}T()}function C(){F();for(let M in n){let N=n[M];for(let G in N){let H=N[G];for(let Z in H)h(H[Z].object),delete H[Z];delete N[G]}delete n[M]}}function E(M){if(n[M.id]===void 0)return;let N=n[M.id];for(let G in N){let H=N[G];for(let Z in H)h(H[Z].object),delete H[Z];delete N[G]}delete n[M.id]}function P(M){for(let N in n){let G=n[N];if(G[M.id]===void 0)continue;let H=G[M.id];for(let Z in H)h(H[Z].object),delete H[Z];delete G[M.id]}}function F(){y(),a=!0,s!==i&&(s=i,l(s.object))}function y(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:o,reset:F,resetDefaultState:y,dispose:C,releaseStatesOfGeometry:E,releaseStatesOfProgram:P,initAttributes:_,enableAttribute:g,disableUnusedAttributes:T}}function jg(r,t,e){let n;function i(l){n=l}function s(l,h){r.drawArrays(n,l,h),e.update(h,n,1)}function a(l,h,u){u!==0&&(r.drawArraysInstanced(n,l,h,u),e.update(h,n,u))}function o(l,h,u){if(u===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,h,0,u);let d=0;for(let v=0;v<u;v++)d+=h[v];e.update(d,n,1)}function c(l,h,u,f){if(u===0)return;let d=t.get("WEBGL_multi_draw");if(d===null)for(let v=0;v<l.length;v++)a(l[v],h[v],f[v]);else{d.multiDrawArraysInstancedWEBGL(n,l,0,h,0,f,0,u);let v=0;for(let _=0;_<u;_++)v+=h[_]*f[_];e.update(v,n,1)}}this.setMode=i,this.render=s,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=c}function Qg(r,t,e,n){let i;function s(){if(i!==void 0)return i;if(t.has("EXT_texture_filter_anisotropic")===!0){let P=t.get("EXT_texture_filter_anisotropic");i=r.getParameter(P.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function a(P){return!(P!==_n&&n.convert(P)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(P){let F=P===ji&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(P!==On&&n.convert(P)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_TYPE)&&P!==Bn&&!F)}function c(P){if(P==="highp"){if(r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.HIGH_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.HIGH_FLOAT).precision>0)return"highp";P="mediump"}return P==="mediump"&&r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.MEDIUM_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=e.precision!==void 0?e.precision:"highp",h=c(l);h!==l&&(Dt("WebGLRenderer:",l,"not supported, using",h,"instead."),l=h);let u=e.logarithmicDepthBuffer===!0,f=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control"),d=r.getParameter(r.MAX_TEXTURE_IMAGE_UNITS),v=r.getParameter(r.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=r.getParameter(r.MAX_TEXTURE_SIZE),g=r.getParameter(r.MAX_CUBE_MAP_TEXTURE_SIZE),m=r.getParameter(r.MAX_VERTEX_ATTRIBS),T=r.getParameter(r.MAX_VERTEX_UNIFORM_VECTORS),w=r.getParameter(r.MAX_VARYING_VECTORS),A=r.getParameter(r.MAX_FRAGMENT_UNIFORM_VECTORS),C=v>0,E=r.getParameter(r.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:c,textureFormatReadable:a,textureTypeReadable:o,precision:l,logarithmicDepthBuffer:u,reversedDepthBuffer:f,maxTextures:d,maxVertexTextures:v,maxTextureSize:_,maxCubemapSize:g,maxAttributes:m,maxVertexUniforms:T,maxVaryings:w,maxFragmentUniforms:A,vertexTextures:C,maxSamples:E}}function tx(r){let t=this,e=null,n=0,i=!1,s=!1,a=new Rn,o=new Ot,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(u,f){let d=u.length!==0||f||n!==0||i;return i=f,n=u.length,d},this.beginShadows=function(){s=!0,h(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(u,f){e=h(u,f,0)},this.setState=function(u,f,d){let v=u.clippingPlanes,_=u.clipIntersection,g=u.clipShadows,m=r.get(u);if(!i||v===null||v.length===0||s&&!g)s?h(null):l();else{let T=s?0:n,w=T*4,A=m.clippingState||null;c.value=A,A=h(v,f,w,d);for(let C=0;C!==w;++C)A[C]=e[C];m.clippingState=A,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=T}};function l(){c.value!==e&&(c.value=e,c.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(u,f,d,v){let _=u!==null?u.length:0,g=null;if(_!==0){if(g=c.value,v!==!0||g===null){let m=d+_*4,T=f.matrixWorldInverse;o.getNormalMatrix(T),(g===null||g.length<m)&&(g=new Float32Array(m));for(let w=0,A=d;w!==_;++w,A+=4)a.copy(u[w]).applyMatrix4(T,o),a.normal.toArray(g,A),g[A+3]=a.constant}c.value=g,c.needsUpdate=!0}return t.numPlanes=_,t.numIntersection=0,g}}function ex(r){let t=new WeakMap;function e(a,o){return o===ho?a.mapping=Ji:o===uo&&(a.mapping=Ki),a}function n(a){if(a&&a.isTexture){let o=a.mapping;if(o===ho||o===uo)if(t.has(a)){let c=t.get(a).texture;return e(c,a.mapping)}else{let c=a.image;if(c&&c.height>0){let l=new Ha(c.height);return l.fromEquirectangularTexture(r,a),t.set(a,l),a.addEventListener("dispose",i),e(l.texture,a.mapping)}else return null}}return a}function i(a){let o=a.target;o.removeEventListener("dispose",i);let c=t.get(o);c!==void 0&&(t.delete(o),c.dispose())}function s(){t=new WeakMap}return{get:n,dispose:s}}var Si=4,bf=[.125,.215,.35,.446,.526,.582],nr=20,nx=256,Bs=new Vr,Mf=new Jt,Rl=null,Pl=0,Il=0,Ll=!1,ix=new $,Ko=class{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(t,e=0,n=.1,i=100,s={}){let{size:a=256,position:o=ix}=s;Rl=this._renderer.getRenderTarget(),Pl=this._renderer.getActiveCubeFace(),Il=this._renderer.getActiveMipmapLevel(),Ll=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);let c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(t,n,i,c,o),e>0&&this._blur(c,0,0,e),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Tf(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=wf(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodMeshes.length;t++)this._lodMeshes[t].geometry.dispose()}_cleanup(t){this._renderer.setRenderTarget(Rl,Pl,Il),this._renderer.xr.enabled=Ll,t.scissorTest=!1,Xr(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Ji||t.mapping===Ki?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Rl=this._renderer.getRenderTarget(),Pl=this._renderer.getActiveCubeFace(),Il=this._renderer.getActiveMipmapLevel(),Ll=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:cn,minFilter:cn,generateMipmaps:!1,type:ji,format:_n,colorSpace:qi,depthBuffer:!1},i=Sf(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Sf(t,e,n);let{_lodMax:s}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=rx(s)),this._blurMaterial=ax(s,t,e),this._ggxMaterial=sx(s,t,e)}return i}_compileMaterial(t){let e=new ln(new ti,t);this._renderer.compile(e,Bs)}_sceneToCubeUV(t,e,n,i,s){let c=new qe(90,1,e,n),l=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],u=this._renderer,f=u.autoClear,d=u.toneMapping;u.getClearColor(Mf),u.toneMapping=ei,u.autoClear=!1,u.state.buffers.depth.getReversed()&&(u.setRenderTarget(i),u.clearDepth(),u.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new ln(new kr,new bs({name:"PMREM.Background",side:ke,depthWrite:!1,depthTest:!1})));let _=this._backgroundBox,g=_.material,m=!1,T=t.background;T?T.isColor&&(g.color.copy(T),t.background=null,m=!0):(g.color.copy(Mf),m=!0);for(let w=0;w<6;w++){let A=w%3;A===0?(c.up.set(0,l[w],0),c.position.set(s.x,s.y,s.z),c.lookAt(s.x+h[w],s.y,s.z)):A===1?(c.up.set(0,0,l[w]),c.position.set(s.x,s.y,s.z),c.lookAt(s.x,s.y+h[w],s.z)):(c.up.set(0,l[w],0),c.position.set(s.x,s.y,s.z),c.lookAt(s.x,s.y,s.z+h[w]));let C=this._cubeSize;Xr(i,A*C,w>2?C:0,C,C),u.setRenderTarget(i),m&&u.render(_,c),u.render(t,c)}u.toneMapping=d,u.autoClear=f,t.background=T}_textureToCubeUV(t,e){let n=this._renderer,i=t.mapping===Ji||t.mapping===Ki;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=Tf()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=wf());let s=i?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=s;let o=s.uniforms;o.envMap.value=t;let c=this._cubeSize;Xr(e,0,0,3*c,2*c),n.setRenderTarget(e),n.render(a,Bs)}_applyPMREM(t){let e=this._renderer,n=e.autoClear;e.autoClear=!1;let i=this._lodMeshes.length;for(let s=1;s<i;s++)this._applyGGXFilter(t,s-1,s);e.autoClear=n}_applyGGXFilter(t,e,n){let i=this._renderer,s=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[n];o.material=a;let c=a.uniforms,l=n/(this._lodMeshes.length-1),h=e/(this._lodMeshes.length-1),u=Math.sqrt(l*l-h*h),f=.05+l*.95,d=u*f,{_lodMax:v}=this,_=this._sizeLods[n],g=3*_*(n>v-Si?n-v+Si:0),m=4*(this._cubeSize-_);c.envMap.value=t.texture,c.roughness.value=d,c.mipInt.value=v-e,Xr(s,g,m,3*_,2*_),i.setRenderTarget(s),i.render(o,Bs),c.envMap.value=s.texture,c.roughness.value=0,c.mipInt.value=v-n,Xr(t,g,m,3*_,2*_),i.setRenderTarget(t),i.render(o,Bs)}_blur(t,e,n,i,s){let a=this._pingPongRenderTarget;this._halfBlur(t,a,e,n,i,"latitudinal",s),this._halfBlur(a,t,n,n,i,"longitudinal",s)}_halfBlur(t,e,n,i,s,a,o){let c=this._renderer,l=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&Xt("blur direction must be either latitudinal or longitudinal!");let h=3,u=this._lodMeshes[i];u.material=l;let f=l.uniforms,d=this._sizeLods[n]-1,v=isFinite(s)?Math.PI/(2*d):2*Math.PI/(2*nr-1),_=s/v,g=isFinite(s)?1+Math.floor(h*_):nr;g>nr&&Dt(`sigmaRadians, ${s}, is too large and will clip, as it requested ${g} samples when the maximum is set to ${nr}`);let m=[],T=0;for(let P=0;P<nr;++P){let F=P/_,y=Math.exp(-F*F/2);m.push(y),P===0?T+=y:P<g&&(T+=2*y)}for(let P=0;P<m.length;P++)m[P]=m[P]/T;f.envMap.value=t.texture,f.samples.value=g,f.weights.value=m,f.latitudinal.value=a==="latitudinal",o&&(f.poleAxis.value=o);let{_lodMax:w}=this;f.dTheta.value=v,f.mipInt.value=w-n;let A=this._sizeLods[i],C=3*A*(i>w-Si?i-w+Si:0),E=4*(this._cubeSize-A);Xr(e,C,E,3*A,2*A),c.setRenderTarget(e),c.render(u,Bs)}};function rx(r){let t=[],e=[],n=[],i=r,s=r-Si+1+bf.length;for(let a=0;a<s;a++){let o=Math.pow(2,i);t.push(o);let c=1/o;a>r-Si?c=bf[a-r+Si-1]:a===0&&(c=0),e.push(c);let l=1/(o-2),h=-l,u=1+l,f=[h,h,u,h,u,u,h,h,u,u,h,u],d=6,v=6,_=3,g=2,m=1,T=new Float32Array(_*v*d),w=new Float32Array(g*v*d),A=new Float32Array(m*v*d);for(let E=0;E<d;E++){let P=E%3*2/3-1,F=E>2?0:-1,y=[P,F,0,P+2/3,F,0,P+2/3,F+1,0,P,F,0,P+2/3,F+1,0,P,F+1,0];T.set(y,_*v*E),w.set(f,g*v*E);let M=[E,E,E,E,E,E];A.set(M,m*v*E)}let C=new ti;C.setAttribute("position",new on(T,_)),C.setAttribute("uv",new on(w,g)),C.setAttribute("faceIndex",new on(A,m)),n.push(new ln(C,null)),i>Si&&i--}return{lodMeshes:n,sizeLods:t,sigmas:e}}function Sf(r,t,e){let n=new Ln(r,t,e);return n.texture.mapping=Is,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Xr(r,t,e,n,i){r.viewport.set(t,e,n,i),r.scissor.set(t,e,n,i)}function sx(r,t,e){return new $e({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:nx,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Qo(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 3.2: Transform view direction to hemisphere configuration
				vec3 Vh = normalize(vec3(alpha * V.x, alpha * V.y, V.z));

				// Section 4.1: Orthonormal basis
				float lensq = Vh.x * Vh.x + Vh.y * Vh.y;
				vec3 T1 = lensq > 0.0 ? vec3(-Vh.y, Vh.x, 0.0) / sqrt(lensq) : vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(Vh, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + Vh.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * Vh;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:Fn,depthTest:!1,depthWrite:!1})}function ax(r,t,e){let n=new Float32Array(nr),i=new $(0,1,0);return new $e({name:"SphericalGaussianBlur",defines:{n:nr,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:Qo(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Fn,depthTest:!1,depthWrite:!1})}function wf(){return new $e({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Qo(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Fn,depthTest:!1,depthWrite:!1})}function Tf(){return new $e({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Qo(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Fn,depthTest:!1,depthWrite:!1})}function Qo(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function ox(r){let t=new WeakMap,e=null;function n(o){if(o&&o.isTexture){let c=o.mapping,l=c===ho||c===uo,h=c===Ji||c===Ki;if(l||h){let u=t.get(o),f=u!==void 0?u.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==f)return e===null&&(e=new Ko(r)),u=l?e.fromEquirectangular(o,u):e.fromCubemap(o,u),u.texture.pmremVersion=o.pmremVersion,t.set(o,u),u.texture;if(u!==void 0)return u.texture;{let d=o.image;return l&&d&&d.height>0||h&&d&&i(d)?(e===null&&(e=new Ko(r)),u=l?e.fromEquirectangular(o):e.fromCubemap(o),u.texture.pmremVersion=o.pmremVersion,t.set(o,u),o.addEventListener("dispose",s),u.texture):null}}}return o}function i(o){let c=0,l=6;for(let h=0;h<l;h++)o[h]!==void 0&&c++;return c===l}function s(o){let c=o.target;c.removeEventListener("dispose",s);let l=t.get(c);l!==void 0&&(t.delete(c),l.dispose())}function a(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:a}}function cx(r){let t={};function e(n){if(t[n]!==void 0)return t[n];let i=r.getExtension(n);return t[n]=i,i}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){let i=e(n);return i===null&&Fr("WebGLRenderer: "+n+" extension not supported."),i}}}function lx(r,t,e,n){let i={},s=new WeakMap;function a(u){let f=u.target;f.index!==null&&t.remove(f.index);for(let v in f.attributes)t.remove(f.attributes[v]);f.removeEventListener("dispose",a),delete i[f.id];let d=s.get(f);d&&(t.remove(d),s.delete(f)),n.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,e.memory.geometries--}function o(u,f){return i[f.id]===!0||(f.addEventListener("dispose",a),i[f.id]=!0,e.memory.geometries++),f}function c(u){let f=u.attributes;for(let d in f)t.update(f[d],r.ARRAY_BUFFER)}function l(u){let f=[],d=u.index,v=u.attributes.position,_=0;if(d!==null){let T=d.array;_=d.version;for(let w=0,A=T.length;w<A;w+=3){let C=T[w+0],E=T[w+1],P=T[w+2];f.push(C,E,E,P,P,C)}}else if(v!==void 0){let T=v.array;_=v.version;for(let w=0,A=T.length/3-1;w<A;w+=3){let C=w+0,E=w+1,P=w+2;f.push(C,E,E,P,P,C)}}else return;let g=new(Sl(f)?Ss:Ms)(f,1);g.version=_;let m=s.get(u);m&&t.remove(m),s.set(u,g)}function h(u){let f=s.get(u);if(f){let d=u.index;d!==null&&f.version<d.version&&l(u)}else l(u);return s.get(u)}return{get:o,update:c,getWireframeAttribute:h}}function hx(r,t,e){let n;function i(f){n=f}let s,a;function o(f){s=f.type,a=f.bytesPerElement}function c(f,d){r.drawElements(n,d,s,f*a),e.update(d,n,1)}function l(f,d,v){v!==0&&(r.drawElementsInstanced(n,d,s,f*a,v),e.update(d,n,v))}function h(f,d,v){if(v===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,d,0,s,f,0,v);let g=0;for(let m=0;m<v;m++)g+=d[m];e.update(g,n,1)}function u(f,d,v,_){if(v===0)return;let g=t.get("WEBGL_multi_draw");if(g===null)for(let m=0;m<f.length;m++)l(f[m]/a,d[m],_[m]);else{g.multiDrawElementsInstancedWEBGL(n,d,0,s,f,0,_,0,v);let m=0;for(let T=0;T<v;T++)m+=d[T]*_[T];e.update(m,n,1)}}this.setMode=i,this.setIndex=o,this.render=c,this.renderInstances=l,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function ux(r){let t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,a,o){switch(e.calls++,a){case r.TRIANGLES:e.triangles+=o*(s/3);break;case r.LINES:e.lines+=o*(s/2);break;case r.LINE_STRIP:e.lines+=o*(s-1);break;case r.LINE_LOOP:e.lines+=o*s;break;case r.POINTS:e.points+=o*s;break;default:Xt("WebGLInfo: Unknown draw mode:",a);break}}function i(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:i,update:n}}function fx(r,t,e){let n=new WeakMap,i=new xe;function s(a,o,c){let l=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=h!==void 0?h.length:0,f=n.get(o);if(f===void 0||f.count!==u){let y=function(){P.dispose(),n.delete(o),o.removeEventListener("dispose",y)};f!==void 0&&f.texture.dispose();let d=o.morphAttributes.position!==void 0,v=o.morphAttributes.normal!==void 0,_=o.morphAttributes.color!==void 0,g=o.morphAttributes.position||[],m=o.morphAttributes.normal||[],T=o.morphAttributes.color||[],w=0;d===!0&&(w=1),v===!0&&(w=2),_===!0&&(w=3);let A=o.attributes.position.count*w,C=1;A>t.maxTextureSize&&(C=Math.ceil(A/t.maxTextureSize),A=t.maxTextureSize);let E=new Float32Array(A*C*4*u),P=new vs(E,A,C,u);P.type=Bn,P.needsUpdate=!0;let F=w*4;for(let M=0;M<u;M++){let N=g[M],G=m[M],H=T[M],Z=A*C*4*M;for(let J=0;J<N.count;J++){let Y=J*F;d===!0&&(i.fromBufferAttribute(N,J),E[Z+Y+0]=i.x,E[Z+Y+1]=i.y,E[Z+Y+2]=i.z,E[Z+Y+3]=0),v===!0&&(i.fromBufferAttribute(G,J),E[Z+Y+4]=i.x,E[Z+Y+5]=i.y,E[Z+Y+6]=i.z,E[Z+Y+7]=0),_===!0&&(i.fromBufferAttribute(H,J),E[Z+Y+8]=i.x,E[Z+Y+9]=i.y,E[Z+Y+10]=i.z,E[Z+Y+11]=H.itemSize===4?i.w:1)}}f={count:u,texture:P,size:new te(A,C)},n.set(o,f),o.addEventListener("dispose",y)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)c.getUniforms().setValue(r,"morphTexture",a.morphTexture,e);else{let d=0;for(let _=0;_<l.length;_++)d+=l[_];let v=o.morphTargetsRelative?1:1-d;c.getUniforms().setValue(r,"morphTargetBaseInfluence",v),c.getUniforms().setValue(r,"morphTargetInfluences",l)}c.getUniforms().setValue(r,"morphTargetsTexture",f.texture,e),c.getUniforms().setValue(r,"morphTargetsTextureSize",f.size)}return{update:s}}function dx(r,t,e,n){let i=new WeakMap;function s(c){let l=n.render.frame,h=c.geometry,u=t.get(c,h);if(i.get(u)!==l&&(t.update(u),i.set(u,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",o)===!1&&c.addEventListener("dispose",o),i.get(c)!==l&&(e.update(c.instanceMatrix,r.ARRAY_BUFFER),c.instanceColor!==null&&e.update(c.instanceColor,r.ARRAY_BUFFER),i.set(c,l))),c.isSkinnedMesh){let f=c.skeleton;i.get(f)!==l&&(f.update(),i.set(f,l))}return u}function a(){i=new WeakMap}function o(c){let l=c.target;l.removeEventListener("dispose",o),e.remove(l.instanceMatrix),l.instanceColor!==null&&e.remove(l.instanceColor)}return{update:s,dispose:a}}var Wf=new Ze,Ef=new Cs(1,1),Xf=new vs,qf=new za,Yf=new Ts,Af=[],Cf=[],Rf=new Float32Array(16),Pf=new Float32Array(9),If=new Float32Array(4);function Yr(r,t,e){let n=r[0];if(n<=0||n>0)return r;let i=t*e,s=Af[i];if(s===void 0&&(s=new Float32Array(i),Af[i]=s),t!==0){n.toArray(s,0);for(let a=1,o=0;a!==t;++a)o+=e,r[a].toArray(s,o)}return s}function Ee(r,t){if(r.length!==t.length)return!1;for(let e=0,n=r.length;e<n;e++)if(r[e]!==t[e])return!1;return!0}function Ae(r,t){for(let e=0,n=t.length;e<n;e++)r[e]=t[e]}function tc(r,t){let e=Cf[t];e===void 0&&(e=new Int32Array(t),Cf[t]=e);for(let n=0;n!==t;++n)e[n]=r.allocateTextureUnit();return e}function px(r,t){let e=this.cache;e[0]!==t&&(r.uniform1f(this.addr,t),e[0]=t)}function mx(r,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(r.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ee(e,t))return;r.uniform2fv(this.addr,t),Ae(e,t)}}function gx(r,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(r.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(r.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Ee(e,t))return;r.uniform3fv(this.addr,t),Ae(e,t)}}function xx(r,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(r.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ee(e,t))return;r.uniform4fv(this.addr,t),Ae(e,t)}}function _x(r,t){let e=this.cache,n=t.elements;if(n===void 0){if(Ee(e,t))return;r.uniformMatrix2fv(this.addr,!1,t),Ae(e,t)}else{if(Ee(e,n))return;If.set(n),r.uniformMatrix2fv(this.addr,!1,If),Ae(e,n)}}function vx(r,t){let e=this.cache,n=t.elements;if(n===void 0){if(Ee(e,t))return;r.uniformMatrix3fv(this.addr,!1,t),Ae(e,t)}else{if(Ee(e,n))return;Pf.set(n),r.uniformMatrix3fv(this.addr,!1,Pf),Ae(e,n)}}function yx(r,t){let e=this.cache,n=t.elements;if(n===void 0){if(Ee(e,t))return;r.uniformMatrix4fv(this.addr,!1,t),Ae(e,t)}else{if(Ee(e,n))return;Rf.set(n),r.uniformMatrix4fv(this.addr,!1,Rf),Ae(e,n)}}function bx(r,t){let e=this.cache;e[0]!==t&&(r.uniform1i(this.addr,t),e[0]=t)}function Mx(r,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(r.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ee(e,t))return;r.uniform2iv(this.addr,t),Ae(e,t)}}function Sx(r,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(r.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ee(e,t))return;r.uniform3iv(this.addr,t),Ae(e,t)}}function wx(r,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(r.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ee(e,t))return;r.uniform4iv(this.addr,t),Ae(e,t)}}function Tx(r,t){let e=this.cache;e[0]!==t&&(r.uniform1ui(this.addr,t),e[0]=t)}function Ex(r,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(r.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ee(e,t))return;r.uniform2uiv(this.addr,t),Ae(e,t)}}function Ax(r,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(r.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ee(e,t))return;r.uniform3uiv(this.addr,t),Ae(e,t)}}function Cx(r,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(r.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ee(e,t))return;r.uniform4uiv(this.addr,t),Ae(e,t)}}function Rx(r,t,e){let n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i);let s;this.type===r.SAMPLER_2D_SHADOW?(Ef.compareFunction=bl,s=Ef):s=Wf,e.setTexture2D(t||s,i)}function Px(r,t,e){let n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),e.setTexture3D(t||qf,i)}function Ix(r,t,e){let n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),e.setTextureCube(t||Yf,i)}function Lx(r,t,e){let n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),e.setTexture2DArray(t||Xf,i)}function Dx(r){switch(r){case 5126:return px;case 35664:return mx;case 35665:return gx;case 35666:return xx;case 35674:return _x;case 35675:return vx;case 35676:return yx;case 5124:case 35670:return bx;case 35667:case 35671:return Mx;case 35668:case 35672:return Sx;case 35669:case 35673:return wx;case 5125:return Tx;case 36294:return Ex;case 36295:return Ax;case 36296:return Cx;case 35678:case 36198:case 36298:case 36306:case 35682:return Rx;case 35679:case 36299:case 36307:return Px;case 35680:case 36300:case 36308:case 36293:return Ix;case 36289:case 36303:case 36311:case 36292:return Lx}}function Ux(r,t){r.uniform1fv(this.addr,t)}function Nx(r,t){let e=Yr(t,this.size,2);r.uniform2fv(this.addr,e)}function Fx(r,t){let e=Yr(t,this.size,3);r.uniform3fv(this.addr,e)}function Ox(r,t){let e=Yr(t,this.size,4);r.uniform4fv(this.addr,e)}function Bx(r,t){let e=Yr(t,this.size,4);r.uniformMatrix2fv(this.addr,!1,e)}function kx(r,t){let e=Yr(t,this.size,9);r.uniformMatrix3fv(this.addr,!1,e)}function zx(r,t){let e=Yr(t,this.size,16);r.uniformMatrix4fv(this.addr,!1,e)}function Vx(r,t){r.uniform1iv(this.addr,t)}function Gx(r,t){r.uniform2iv(this.addr,t)}function Hx(r,t){r.uniform3iv(this.addr,t)}function Wx(r,t){r.uniform4iv(this.addr,t)}function Xx(r,t){r.uniform1uiv(this.addr,t)}function qx(r,t){r.uniform2uiv(this.addr,t)}function Yx(r,t){r.uniform3uiv(this.addr,t)}function Zx(r,t){r.uniform4uiv(this.addr,t)}function $x(r,t,e){let n=this.cache,i=t.length,s=tc(e,i);Ee(n,s)||(r.uniform1iv(this.addr,s),Ae(n,s));for(let a=0;a!==i;++a)e.setTexture2D(t[a]||Wf,s[a])}function Jx(r,t,e){let n=this.cache,i=t.length,s=tc(e,i);Ee(n,s)||(r.uniform1iv(this.addr,s),Ae(n,s));for(let a=0;a!==i;++a)e.setTexture3D(t[a]||qf,s[a])}function Kx(r,t,e){let n=this.cache,i=t.length,s=tc(e,i);Ee(n,s)||(r.uniform1iv(this.addr,s),Ae(n,s));for(let a=0;a!==i;++a)e.setTextureCube(t[a]||Yf,s[a])}function jx(r,t,e){let n=this.cache,i=t.length,s=tc(e,i);Ee(n,s)||(r.uniform1iv(this.addr,s),Ae(n,s));for(let a=0;a!==i;++a)e.setTexture2DArray(t[a]||Xf,s[a])}function Qx(r){switch(r){case 5126:return Ux;case 35664:return Nx;case 35665:return Fx;case 35666:return Ox;case 35674:return Bx;case 35675:return kx;case 35676:return zx;case 5124:case 35670:return Vx;case 35667:case 35671:return Gx;case 35668:case 35672:return Hx;case 35669:case 35673:return Wx;case 5125:return Xx;case 36294:return qx;case 36295:return Yx;case 36296:return Zx;case 35678:case 36198:case 36298:case 36306:case 35682:return $x;case 35679:case 36299:case 36307:return Jx;case 35680:case 36300:case 36308:case 36293:return Kx;case 36289:case 36303:case 36311:case 36292:return jx}}var Ul=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=Dx(e.type)}},Nl=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=Qx(e.type)}},Fl=class{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){let i=this.seq;for(let s=0,a=i.length;s!==a;++s){let o=i[s];o.setValue(t,e[o.id],n)}}},Dl=/(\w+)(\])?(\[|\.)?/g;function Lf(r,t){r.seq.push(t),r.map[t.id]=t}function t_(r,t,e){let n=r.name,i=n.length;for(Dl.lastIndex=0;;){let s=Dl.exec(n),a=Dl.lastIndex,o=s[1],c=s[2]==="]",l=s[3];if(c&&(o=o|0),l===void 0||l==="["&&a+2===i){Lf(e,l===void 0?new Ul(o,r,t):new Nl(o,r,t));break}else{let u=e.map[o];u===void 0&&(u=new Fl(o),Lf(e,u)),e=u}}}var qr=class{constructor(t,e){this.seq=[],this.map={};let n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){let s=t.getActiveUniform(e,i),a=t.getUniformLocation(e,s.name);t_(s,a,this)}}setValue(t,e,n,i){let s=this.map[e];s!==void 0&&s.setValue(t,n,i)}setOptional(t,e,n){let i=e[n];i!==void 0&&this.setValue(t,n,i)}static upload(t,e,n,i){for(let s=0,a=e.length;s!==a;++s){let o=e[s],c=n[o.id];c.needsUpdate!==!1&&o.setValue(t,c.value,i)}}static seqWithValue(t,e){let n=[];for(let i=0,s=t.length;i!==s;++i){let a=t[i];a.id in e&&n.push(a)}return n}};function Df(r,t,e){let n=r.createShader(t);return r.shaderSource(n,e),r.compileShader(n),n}var e_=37297,n_=0;function i_(r,t){let e=r.split(`
`),n=[],i=Math.max(t-6,0),s=Math.min(t+6,e.length);for(let a=i;a<s;a++){let o=a+1;n.push(`${o===t?">":" "} ${o}: ${e[a]}`)}return n.join(`
`)}var Uf=new Ot;function r_(r){jt._getMatrix(Uf,jt.workingColorSpace,r);let t=`mat3( ${Uf.elements.map(e=>e.toFixed(4))} )`;switch(jt.getTransfer(r)){case gs:return[t,"LinearTransferOETF"];case ee:return[t,"sRGBTransferOETF"];default:return Dt("WebGLProgram: Unsupported color space: ",r),[t,"LinearTransferOETF"]}}function Nf(r,t,e){let n=r.getShaderParameter(t,r.COMPILE_STATUS),s=(r.getShaderInfoLog(t)||"").trim();if(n&&s==="")return"";let a=/ERROR: 0:(\d+)/.exec(s);if(a){let o=parseInt(a[1]);return e.toUpperCase()+`

`+s+`

`+i_(r.getShaderSource(t),o)}else return s}function s_(r,t){let e=r_(t);return[`vec4 ${r}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function a_(r,t){let e;switch(t){case Ju:e="Linear";break;case Ku:e="Reinhard";break;case ju:e="Cineon";break;case Qu:e="ACESFilmic";break;case ef:e="AgX";break;case nf:e="Neutral";break;case tf:e="Custom";break;default:Dt("WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+r+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}var Jo=new $;function o_(){jt.getLuminanceCoefficients(Jo);let r=Jo.x.toFixed(4),t=Jo.y.toFixed(4),e=Jo.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${r}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function c_(r){return[r.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",r.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(ks).join(`
`)}function l_(r){let t=[];for(let e in r){let n=r[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function h_(r,t){let e={},n=r.getProgramParameter(t,r.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){let s=r.getActiveAttrib(t,i),a=s.name,o=1;s.type===r.FLOAT_MAT2&&(o=2),s.type===r.FLOAT_MAT3&&(o=3),s.type===r.FLOAT_MAT4&&(o=4),e[a]={type:s.type,location:r.getAttribLocation(t,a),locationSize:o}}return e}function ks(r){return r!==""}function Ff(r,t){let e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return r.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Of(r,t){return r.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var u_=/^[ \t]*#include +<([\w\d./]+)>/gm;function Ol(r){return r.replace(u_,d_)}var f_=new Map;function d_(r,t){let e=kt[t];if(e===void 0){let n=f_.get(t);if(n!==void 0)e=kt[n],Dt('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return Ol(e)}var p_=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Bf(r){return r.replace(p_,m_)}function m_(r,t,e,n){let i="";for(let s=parseInt(t);s<parseInt(e);s++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return i}function kf(r){let t=`precision ${r.precision} float;
	precision ${r.precision} int;
	precision ${r.precision} sampler2D;
	precision ${r.precision} samplerCube;
	precision ${r.precision} sampler3D;
	precision ${r.precision} sampler2DArray;
	precision ${r.precision} sampler2DShadow;
	precision ${r.precision} samplerCubeShadow;
	precision ${r.precision} sampler2DArrayShadow;
	precision ${r.precision} isampler2D;
	precision ${r.precision} isampler3D;
	precision ${r.precision} isamplerCube;
	precision ${r.precision} isampler2DArray;
	precision ${r.precision} usampler2D;
	precision ${r.precision} usampler3D;
	precision ${r.precision} usamplerCube;
	precision ${r.precision} usampler2DArray;
	`;return r.precision==="highp"?t+=`
#define HIGH_PRECISION`:r.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:r.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function g_(r){let t="SHADOWMAP_TYPE_BASIC";return r.shadowMapType===cl?t="SHADOWMAP_TYPE_PCF":r.shadowMapType===Ru?t="SHADOWMAP_TYPE_PCF_SOFT":r.shadowMapType===Un&&(t="SHADOWMAP_TYPE_VSM"),t}function x_(r){let t="ENVMAP_TYPE_CUBE";if(r.envMap)switch(r.envMapMode){case Ji:case Ki:t="ENVMAP_TYPE_CUBE";break;case Is:t="ENVMAP_TYPE_CUBE_UV";break}return t}function __(r){let t="ENVMAP_MODE_REFLECTION";if(r.envMap)switch(r.envMapMode){case Ki:t="ENVMAP_MODE_REFRACTION";break}return t}function v_(r){let t="ENVMAP_BLENDING_NONE";if(r.envMap)switch(r.combine){case fl:t="ENVMAP_BLENDING_MULTIPLY";break;case Zu:t="ENVMAP_BLENDING_MIX";break;case $u:t="ENVMAP_BLENDING_ADD";break}return t}function y_(r){let t=r.envMapCubeUVHeight;if(t===null)return null;let e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:n,maxMip:e}}function b_(r,t,e,n){let i=r.getContext(),s=e.defines,a=e.vertexShader,o=e.fragmentShader,c=g_(e),l=x_(e),h=__(e),u=v_(e),f=y_(e),d=c_(e),v=l_(s),_=i.createProgram(),g,m,T=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(g=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,v].filter(ks).join(`
`),g.length>0&&(g+=`
`),m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,v].filter(ks).join(`
`),m.length>0&&(m+=`
`)):(g=[kf(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,v,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(ks).join(`
`),m=[kf(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,v,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+l:"",e.envMap?"#define "+h:"",e.envMap?"#define "+u:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==ei?"#define TONE_MAPPING":"",e.toneMapping!==ei?kt.tonemapping_pars_fragment:"",e.toneMapping!==ei?a_("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",kt.colorspace_pars_fragment,s_("linearToOutputTexel",e.outputColorSpace),o_(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(ks).join(`
`)),a=Ol(a),a=Ff(a,e),a=Of(a,e),o=Ol(o),o=Ff(o,e),o=Of(o,e),a=Bf(a),o=Bf(o),e.isRawShaderMaterial!==!0&&(T=`#version 300 es
`,g=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,m=["#define varying in",e.glslVersion===Ml?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Ml?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);let w=T+g+a,A=T+m+o,C=Df(i,i.VERTEX_SHADER,w),E=Df(i,i.FRAGMENT_SHADER,A);i.attachShader(_,C),i.attachShader(_,E),e.index0AttributeName!==void 0?i.bindAttribLocation(_,0,e.index0AttributeName):e.morphTargets===!0&&i.bindAttribLocation(_,0,"position"),i.linkProgram(_);function P(N){if(r.debug.checkShaderErrors){let G=i.getProgramInfoLog(_)||"",H=i.getShaderInfoLog(C)||"",Z=i.getShaderInfoLog(E)||"",J=G.trim(),Y=H.trim(),at=Z.trim(),W=!0,ut=!0;if(i.getProgramParameter(_,i.LINK_STATUS)===!1)if(W=!1,typeof r.debug.onShaderError=="function")r.debug.onShaderError(i,_,C,E);else{let ft=Nf(i,C,"vertex"),Et=Nf(i,E,"fragment");Xt("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(_,i.VALIDATE_STATUS)+`

Material Name: `+N.name+`
Material Type: `+N.type+`

Program Info Log: `+J+`
`+ft+`
`+Et)}else J!==""?Dt("WebGLProgram: Program Info Log:",J):(Y===""||at==="")&&(ut=!1);ut&&(N.diagnostics={runnable:W,programLog:J,vertexShader:{log:Y,prefix:g},fragmentShader:{log:at,prefix:m}})}i.deleteShader(C),i.deleteShader(E),F=new qr(i,_),y=h_(i,_)}let F;this.getUniforms=function(){return F===void 0&&P(this),F};let y;this.getAttributes=function(){return y===void 0&&P(this),y};let M=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return M===!1&&(M=i.getProgramParameter(_,e_)),M},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(_),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=n_++,this.cacheKey=t,this.usedTimes=1,this.program=_,this.vertexShader=C,this.fragmentShader=E,this}var M_=0,Bl=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){let e=t.vertexShader,n=t.fragmentShader,i=this._getShaderStage(e),s=this._getShaderStage(n),a=this._getShaderCacheForMaterial(t);return a.has(i)===!1&&(a.add(i),i.usedTimes++),a.has(s)===!1&&(a.add(s),s.usedTimes++),this}remove(t){let e=this.materialCache.get(t);for(let n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){let e=this.materialCache,n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){let e=this.shaderCache,n=e.get(t);return n===void 0&&(n=new kl(t),e.set(t,n)),n}},kl=class{constructor(t){this.id=M_++,this.code=t,this.usedTimes=0}};function S_(r,t,e,n,i,s,a){let o=new ys,c=new Bl,l=new Set,h=[],u=i.logarithmicDepthBuffer,f=i.vertexTextures,d=i.precision,v={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(y){return l.add(y),y===0?"uv":`uv${y}`}function g(y,M,N,G,H){let Z=G.fog,J=H.geometry,Y=y.isMeshStandardMaterial?G.environment:null,at=(y.isMeshStandardMaterial?e:t).get(y.envMap||Y),W=at&&at.mapping===Is?at.image.height:null,ut=v[y.type];y.precision!==null&&(d=i.getMaxPrecision(y.precision),d!==y.precision&&Dt("WebGLProgram.getParameters:",y.precision,"not supported, using",d,"instead."));let ft=J.morphAttributes.position||J.morphAttributes.normal||J.morphAttributes.color,Et=ft!==void 0?ft.length:0,Ut=0;J.morphAttributes.position!==void 0&&(Ut=1),J.morphAttributes.normal!==void 0&&(Ut=2),J.morphAttributes.color!==void 0&&(Ut=3);let Kt,Vt,qt,et;if(ut){let wt=kn[ut];Kt=wt.vertexShader,Vt=wt.fragmentShader}else Kt=y.vertexShader,Vt=y.fragmentShader,c.update(y),qt=c.getVertexShaderID(y),et=c.getFragmentShaderID(y);let rt=r.getRenderTarget(),bt=r.state.buffers.depth.getReversed(),Nt=H.isInstancedMesh===!0,Ct=H.isBatchedMesh===!0,Gt=!!y.map,we=!!y.matcap,Bt=!!at,ce=!!y.aoMap,U=!!y.lightMap,Ht=!!y.bumpMap,Wt=!!y.normalMap,ne=!!y.displacementMap,St=!!y.emissiveMap,B=!!y.metalnessMap,I=!!y.roughnessMap,b=y.anisotropy>0,p=y.clearcoat>0,x=y.dispersion>0,R=y.iridescence>0,O=y.sheen>0,k=y.transmission>0,L=b&&!!y.anisotropyMap,Q=p&&!!y.clearcoatMap,st=p&&!!y.clearcoatNormalMap,dt=p&&!!y.clearcoatRoughnessMap,nt=R&&!!y.iridescenceMap,K=R&&!!y.iridescenceThicknessMap,tt=O&&!!y.sheenColorMap,mt=O&&!!y.sheenRoughnessMap,xt=!!y.specularMap,ot=!!y.specularColorMap,At=!!y.specularIntensityMap,D=k&&!!y.transmissionMap,lt=k&&!!y.thicknessMap,ht=!!y.gradientMap,ct=!!y.alphaMap,it=y.alphaTest>0,j=!!y.alphaHash,vt=!!y.extensions,gt=ei;y.toneMapped&&(rt===null||rt.isXRRenderTarget===!0)&&(gt=r.toneMapping);let zt={shaderID:ut,shaderType:y.type,shaderName:y.name,vertexShader:Kt,fragmentShader:Vt,defines:y.defines,customVertexShaderID:qt,customFragmentShaderID:et,isRawShaderMaterial:y.isRawShaderMaterial===!0,glslVersion:y.glslVersion,precision:d,batching:Ct,batchingColor:Ct&&H._colorsTexture!==null,instancing:Nt,instancingColor:Nt&&H.instanceColor!==null,instancingMorph:Nt&&H.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:rt===null?r.outputColorSpace:rt.isXRRenderTarget===!0?rt.texture.colorSpace:qi,alphaToCoverage:!!y.alphaToCoverage,map:Gt,matcap:we,envMap:Bt,envMapMode:Bt&&at.mapping,envMapCubeUVHeight:W,aoMap:ce,lightMap:U,bumpMap:Ht,normalMap:Wt,displacementMap:f&&ne,emissiveMap:St,normalMapObjectSpace:Wt&&y.normalMapType===cf,normalMapTangentSpace:Wt&&y.normalMapType===of,metalnessMap:B,roughnessMap:I,anisotropy:b,anisotropyMap:L,clearcoat:p,clearcoatMap:Q,clearcoatNormalMap:st,clearcoatRoughnessMap:dt,dispersion:x,iridescence:R,iridescenceMap:nt,iridescenceThicknessMap:K,sheen:O,sheenColorMap:tt,sheenRoughnessMap:mt,specularMap:xt,specularColorMap:ot,specularIntensityMap:At,transmission:k,transmissionMap:D,thicknessMap:lt,gradientMap:ht,opaque:y.transparent===!1&&y.blending===Wi&&y.alphaToCoverage===!1,alphaMap:ct,alphaTest:it,alphaHash:j,combine:y.combine,mapUv:Gt&&_(y.map.channel),aoMapUv:ce&&_(y.aoMap.channel),lightMapUv:U&&_(y.lightMap.channel),bumpMapUv:Ht&&_(y.bumpMap.channel),normalMapUv:Wt&&_(y.normalMap.channel),displacementMapUv:ne&&_(y.displacementMap.channel),emissiveMapUv:St&&_(y.emissiveMap.channel),metalnessMapUv:B&&_(y.metalnessMap.channel),roughnessMapUv:I&&_(y.roughnessMap.channel),anisotropyMapUv:L&&_(y.anisotropyMap.channel),clearcoatMapUv:Q&&_(y.clearcoatMap.channel),clearcoatNormalMapUv:st&&_(y.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:dt&&_(y.clearcoatRoughnessMap.channel),iridescenceMapUv:nt&&_(y.iridescenceMap.channel),iridescenceThicknessMapUv:K&&_(y.iridescenceThicknessMap.channel),sheenColorMapUv:tt&&_(y.sheenColorMap.channel),sheenRoughnessMapUv:mt&&_(y.sheenRoughnessMap.channel),specularMapUv:xt&&_(y.specularMap.channel),specularColorMapUv:ot&&_(y.specularColorMap.channel),specularIntensityMapUv:At&&_(y.specularIntensityMap.channel),transmissionMapUv:D&&_(y.transmissionMap.channel),thicknessMapUv:lt&&_(y.thicknessMap.channel),alphaMapUv:ct&&_(y.alphaMap.channel),vertexTangents:!!J.attributes.tangent&&(Wt||b),vertexColors:y.vertexColors,vertexAlphas:y.vertexColors===!0&&!!J.attributes.color&&J.attributes.color.itemSize===4,pointsUvs:H.isPoints===!0&&!!J.attributes.uv&&(Gt||ct),fog:!!Z,useFog:y.fog===!0,fogExp2:!!Z&&Z.isFogExp2,flatShading:y.flatShading===!0&&y.wireframe===!1,sizeAttenuation:y.sizeAttenuation===!0,logarithmicDepthBuffer:u,reversedDepthBuffer:bt,skinning:H.isSkinnedMesh===!0,morphTargets:J.morphAttributes.position!==void 0,morphNormals:J.morphAttributes.normal!==void 0,morphColors:J.morphAttributes.color!==void 0,morphTargetsCount:Et,morphTextureStride:Ut,numDirLights:M.directional.length,numPointLights:M.point.length,numSpotLights:M.spot.length,numSpotLightMaps:M.spotLightMap.length,numRectAreaLights:M.rectArea.length,numHemiLights:M.hemi.length,numDirLightShadows:M.directionalShadowMap.length,numPointLightShadows:M.pointShadowMap.length,numSpotLightShadows:M.spotShadowMap.length,numSpotLightShadowsWithMaps:M.numSpotLightShadowsWithMaps,numLightProbes:M.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:y.dithering,shadowMapEnabled:r.shadowMap.enabled&&N.length>0,shadowMapType:r.shadowMap.type,toneMapping:gt,decodeVideoTexture:Gt&&y.map.isVideoTexture===!0&&jt.getTransfer(y.map.colorSpace)===ee,decodeVideoTextureEmissive:St&&y.emissiveMap.isVideoTexture===!0&&jt.getTransfer(y.emissiveMap.colorSpace)===ee,premultipliedAlpha:y.premultipliedAlpha,doubleSided:y.side===Nn,flipSided:y.side===ke,useDepthPacking:y.depthPacking>=0,depthPacking:y.depthPacking||0,index0AttributeName:y.index0AttributeName,extensionClipCullDistance:vt&&y.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(vt&&y.extensions.multiDraw===!0||Ct)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:y.customProgramCacheKey()};return zt.vertexUv1s=l.has(1),zt.vertexUv2s=l.has(2),zt.vertexUv3s=l.has(3),l.clear(),zt}function m(y){let M=[];if(y.shaderID?M.push(y.shaderID):(M.push(y.customVertexShaderID),M.push(y.customFragmentShaderID)),y.defines!==void 0)for(let N in y.defines)M.push(N),M.push(y.defines[N]);return y.isRawShaderMaterial===!1&&(T(M,y),w(M,y),M.push(r.outputColorSpace)),M.push(y.customProgramCacheKey),M.join()}function T(y,M){y.push(M.precision),y.push(M.outputColorSpace),y.push(M.envMapMode),y.push(M.envMapCubeUVHeight),y.push(M.mapUv),y.push(M.alphaMapUv),y.push(M.lightMapUv),y.push(M.aoMapUv),y.push(M.bumpMapUv),y.push(M.normalMapUv),y.push(M.displacementMapUv),y.push(M.emissiveMapUv),y.push(M.metalnessMapUv),y.push(M.roughnessMapUv),y.push(M.anisotropyMapUv),y.push(M.clearcoatMapUv),y.push(M.clearcoatNormalMapUv),y.push(M.clearcoatRoughnessMapUv),y.push(M.iridescenceMapUv),y.push(M.iridescenceThicknessMapUv),y.push(M.sheenColorMapUv),y.push(M.sheenRoughnessMapUv),y.push(M.specularMapUv),y.push(M.specularColorMapUv),y.push(M.specularIntensityMapUv),y.push(M.transmissionMapUv),y.push(M.thicknessMapUv),y.push(M.combine),y.push(M.fogExp2),y.push(M.sizeAttenuation),y.push(M.morphTargetsCount),y.push(M.morphAttributeCount),y.push(M.numDirLights),y.push(M.numPointLights),y.push(M.numSpotLights),y.push(M.numSpotLightMaps),y.push(M.numHemiLights),y.push(M.numRectAreaLights),y.push(M.numDirLightShadows),y.push(M.numPointLightShadows),y.push(M.numSpotLightShadows),y.push(M.numSpotLightShadowsWithMaps),y.push(M.numLightProbes),y.push(M.shadowMapType),y.push(M.toneMapping),y.push(M.numClippingPlanes),y.push(M.numClipIntersection),y.push(M.depthPacking)}function w(y,M){o.disableAll(),M.supportsVertexTextures&&o.enable(0),M.instancing&&o.enable(1),M.instancingColor&&o.enable(2),M.instancingMorph&&o.enable(3),M.matcap&&o.enable(4),M.envMap&&o.enable(5),M.normalMapObjectSpace&&o.enable(6),M.normalMapTangentSpace&&o.enable(7),M.clearcoat&&o.enable(8),M.iridescence&&o.enable(9),M.alphaTest&&o.enable(10),M.vertexColors&&o.enable(11),M.vertexAlphas&&o.enable(12),M.vertexUv1s&&o.enable(13),M.vertexUv2s&&o.enable(14),M.vertexUv3s&&o.enable(15),M.vertexTangents&&o.enable(16),M.anisotropy&&o.enable(17),M.alphaHash&&o.enable(18),M.batching&&o.enable(19),M.dispersion&&o.enable(20),M.batchingColor&&o.enable(21),M.gradientMap&&o.enable(22),y.push(o.mask),o.disableAll(),M.fog&&o.enable(0),M.useFog&&o.enable(1),M.flatShading&&o.enable(2),M.logarithmicDepthBuffer&&o.enable(3),M.reversedDepthBuffer&&o.enable(4),M.skinning&&o.enable(5),M.morphTargets&&o.enable(6),M.morphNormals&&o.enable(7),M.morphColors&&o.enable(8),M.premultipliedAlpha&&o.enable(9),M.shadowMapEnabled&&o.enable(10),M.doubleSided&&o.enable(11),M.flipSided&&o.enable(12),M.useDepthPacking&&o.enable(13),M.dithering&&o.enable(14),M.transmission&&o.enable(15),M.sheen&&o.enable(16),M.opaque&&o.enable(17),M.pointsUvs&&o.enable(18),M.decodeVideoTexture&&o.enable(19),M.decodeVideoTextureEmissive&&o.enable(20),M.alphaToCoverage&&o.enable(21),y.push(o.mask)}function A(y){let M=v[y.type],N;if(M){let G=kn[M];N=vf.clone(G.uniforms)}else N=y.uniforms;return N}function C(y,M){let N;for(let G=0,H=h.length;G<H;G++){let Z=h[G];if(Z.cacheKey===M){N=Z,++N.usedTimes;break}}return N===void 0&&(N=new b_(r,M,y,s),h.push(N)),N}function E(y){if(--y.usedTimes===0){let M=h.indexOf(y);h[M]=h[h.length-1],h.pop(),y.destroy()}}function P(y){c.remove(y)}function F(){c.dispose()}return{getParameters:g,getProgramCacheKey:m,getUniforms:A,acquireProgram:C,releaseProgram:E,releaseShaderCache:P,programs:h,dispose:F}}function w_(){let r=new WeakMap;function t(a){return r.has(a)}function e(a){let o=r.get(a);return o===void 0&&(o={},r.set(a,o)),o}function n(a){r.delete(a)}function i(a,o,c){r.get(a)[o]=c}function s(){r=new WeakMap}return{has:t,get:e,remove:n,update:i,dispose:s}}function T_(r,t){return r.groupOrder!==t.groupOrder?r.groupOrder-t.groupOrder:r.renderOrder!==t.renderOrder?r.renderOrder-t.renderOrder:r.material.id!==t.material.id?r.material.id-t.material.id:r.z!==t.z?r.z-t.z:r.id-t.id}function zf(r,t){return r.groupOrder!==t.groupOrder?r.groupOrder-t.groupOrder:r.renderOrder!==t.renderOrder?r.renderOrder-t.renderOrder:r.z!==t.z?t.z-r.z:r.id-t.id}function Vf(){let r=[],t=0,e=[],n=[],i=[];function s(){t=0,e.length=0,n.length=0,i.length=0}function a(u,f,d,v,_,g){let m=r[t];return m===void 0?(m={id:u.id,object:u,geometry:f,material:d,groupOrder:v,renderOrder:u.renderOrder,z:_,group:g},r[t]=m):(m.id=u.id,m.object=u,m.geometry=f,m.material=d,m.groupOrder=v,m.renderOrder=u.renderOrder,m.z=_,m.group=g),t++,m}function o(u,f,d,v,_,g){let m=a(u,f,d,v,_,g);d.transmission>0?n.push(m):d.transparent===!0?i.push(m):e.push(m)}function c(u,f,d,v,_,g){let m=a(u,f,d,v,_,g);d.transmission>0?n.unshift(m):d.transparent===!0?i.unshift(m):e.unshift(m)}function l(u,f){e.length>1&&e.sort(u||T_),n.length>1&&n.sort(f||zf),i.length>1&&i.sort(f||zf)}function h(){for(let u=t,f=r.length;u<f;u++){let d=r[u];if(d.id===null)break;d.id=null,d.object=null,d.geometry=null,d.material=null,d.group=null}}return{opaque:e,transmissive:n,transparent:i,init:s,push:o,unshift:c,finish:h,sort:l}}function E_(){let r=new WeakMap;function t(n,i){let s=r.get(n),a;return s===void 0?(a=new Vf,r.set(n,[a])):i>=s.length?(a=new Vf,s.push(a)):a=s[i],a}function e(){r=new WeakMap}return{get:t,dispose:e}}function A_(){let r={};return{get:function(t){if(r[t.id]!==void 0)return r[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new $,color:new Jt};break;case"SpotLight":e={position:new $,direction:new $,color:new Jt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new $,color:new Jt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new $,skyColor:new Jt,groundColor:new Jt};break;case"RectAreaLight":e={color:new Jt,position:new $,halfWidth:new $,halfHeight:new $};break}return r[t.id]=e,e}}}function C_(){let r={};return{get:function(t){if(r[t.id]!==void 0)return r[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new te};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new te};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new te,shadowCameraNear:1,shadowCameraFar:1e3};break}return r[t.id]=e,e}}}var R_=0;function P_(r,t){return(t.castShadow?2:0)-(r.castShadow?2:0)+(t.map?1:0)-(r.map?1:0)}function I_(r){let t=new A_,e=C_(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new $);let i=new $,s=new Te,a=new Te;function o(l){let h=0,u=0,f=0;for(let y=0;y<9;y++)n.probe[y].set(0,0,0);let d=0,v=0,_=0,g=0,m=0,T=0,w=0,A=0,C=0,E=0,P=0;l.sort(P_);for(let y=0,M=l.length;y<M;y++){let N=l[y],G=N.color,H=N.intensity,Z=N.distance,J=N.shadow&&N.shadow.map?N.shadow.map.texture:null;if(N.isAmbientLight)h+=G.r*H,u+=G.g*H,f+=G.b*H;else if(N.isLightProbe){for(let Y=0;Y<9;Y++)n.probe[Y].addScaledVector(N.sh.coefficients[Y],H);P++}else if(N.isDirectionalLight){let Y=t.get(N);if(Y.color.copy(N.color).multiplyScalar(N.intensity),N.castShadow){let at=N.shadow,W=e.get(N);W.shadowIntensity=at.intensity,W.shadowBias=at.bias,W.shadowNormalBias=at.normalBias,W.shadowRadius=at.radius,W.shadowMapSize=at.mapSize,n.directionalShadow[d]=W,n.directionalShadowMap[d]=J,n.directionalShadowMatrix[d]=N.shadow.matrix,T++}n.directional[d]=Y,d++}else if(N.isSpotLight){let Y=t.get(N);Y.position.setFromMatrixPosition(N.matrixWorld),Y.color.copy(G).multiplyScalar(H),Y.distance=Z,Y.coneCos=Math.cos(N.angle),Y.penumbraCos=Math.cos(N.angle*(1-N.penumbra)),Y.decay=N.decay,n.spot[_]=Y;let at=N.shadow;if(N.map&&(n.spotLightMap[C]=N.map,C++,at.updateMatrices(N),N.castShadow&&E++),n.spotLightMatrix[_]=at.matrix,N.castShadow){let W=e.get(N);W.shadowIntensity=at.intensity,W.shadowBias=at.bias,W.shadowNormalBias=at.normalBias,W.shadowRadius=at.radius,W.shadowMapSize=at.mapSize,n.spotShadow[_]=W,n.spotShadowMap[_]=J,A++}_++}else if(N.isRectAreaLight){let Y=t.get(N);Y.color.copy(G).multiplyScalar(H),Y.halfWidth.set(N.width*.5,0,0),Y.halfHeight.set(0,N.height*.5,0),n.rectArea[g]=Y,g++}else if(N.isPointLight){let Y=t.get(N);if(Y.color.copy(N.color).multiplyScalar(N.intensity),Y.distance=N.distance,Y.decay=N.decay,N.castShadow){let at=N.shadow,W=e.get(N);W.shadowIntensity=at.intensity,W.shadowBias=at.bias,W.shadowNormalBias=at.normalBias,W.shadowRadius=at.radius,W.shadowMapSize=at.mapSize,W.shadowCameraNear=at.camera.near,W.shadowCameraFar=at.camera.far,n.pointShadow[v]=W,n.pointShadowMap[v]=J,n.pointShadowMatrix[v]=N.shadow.matrix,w++}n.point[v]=Y,v++}else if(N.isHemisphereLight){let Y=t.get(N);Y.skyColor.copy(N.color).multiplyScalar(H),Y.groundColor.copy(N.groundColor).multiplyScalar(H),n.hemi[m]=Y,m++}}g>0&&(r.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=_t.LTC_FLOAT_1,n.rectAreaLTC2=_t.LTC_FLOAT_2):(n.rectAreaLTC1=_t.LTC_HALF_1,n.rectAreaLTC2=_t.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=f;let F=n.hash;(F.directionalLength!==d||F.pointLength!==v||F.spotLength!==_||F.rectAreaLength!==g||F.hemiLength!==m||F.numDirectionalShadows!==T||F.numPointShadows!==w||F.numSpotShadows!==A||F.numSpotMaps!==C||F.numLightProbes!==P)&&(n.directional.length=d,n.spot.length=_,n.rectArea.length=g,n.point.length=v,n.hemi.length=m,n.directionalShadow.length=T,n.directionalShadowMap.length=T,n.pointShadow.length=w,n.pointShadowMap.length=w,n.spotShadow.length=A,n.spotShadowMap.length=A,n.directionalShadowMatrix.length=T,n.pointShadowMatrix.length=w,n.spotLightMatrix.length=A+C-E,n.spotLightMap.length=C,n.numSpotLightShadowsWithMaps=E,n.numLightProbes=P,F.directionalLength=d,F.pointLength=v,F.spotLength=_,F.rectAreaLength=g,F.hemiLength=m,F.numDirectionalShadows=T,F.numPointShadows=w,F.numSpotShadows=A,F.numSpotMaps=C,F.numLightProbes=P,n.version=R_++)}function c(l,h){let u=0,f=0,d=0,v=0,_=0,g=h.matrixWorldInverse;for(let m=0,T=l.length;m<T;m++){let w=l[m];if(w.isDirectionalLight){let A=n.directional[u];A.direction.setFromMatrixPosition(w.matrixWorld),i.setFromMatrixPosition(w.target.matrixWorld),A.direction.sub(i),A.direction.transformDirection(g),u++}else if(w.isSpotLight){let A=n.spot[d];A.position.setFromMatrixPosition(w.matrixWorld),A.position.applyMatrix4(g),A.direction.setFromMatrixPosition(w.matrixWorld),i.setFromMatrixPosition(w.target.matrixWorld),A.direction.sub(i),A.direction.transformDirection(g),d++}else if(w.isRectAreaLight){let A=n.rectArea[v];A.position.setFromMatrixPosition(w.matrixWorld),A.position.applyMatrix4(g),a.identity(),s.copy(w.matrixWorld),s.premultiply(g),a.extractRotation(s),A.halfWidth.set(w.width*.5,0,0),A.halfHeight.set(0,w.height*.5,0),A.halfWidth.applyMatrix4(a),A.halfHeight.applyMatrix4(a),v++}else if(w.isPointLight){let A=n.point[f];A.position.setFromMatrixPosition(w.matrixWorld),A.position.applyMatrix4(g),f++}else if(w.isHemisphereLight){let A=n.hemi[_];A.direction.setFromMatrixPosition(w.matrixWorld),A.direction.transformDirection(g),_++}}}return{setup:o,setupView:c,state:n}}function Gf(r){let t=new I_(r),e=[],n=[];function i(h){l.camera=h,e.length=0,n.length=0}function s(h){e.push(h)}function a(h){n.push(h)}function o(){t.setup(e)}function c(h){t.setupView(e,h)}let l={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:i,state:l,setupLights:o,setupLightsView:c,pushLight:s,pushShadow:a}}function L_(r){let t=new WeakMap;function e(i,s=0){let a=t.get(i),o;return a===void 0?(o=new Gf(r),t.set(i,[o])):s>=a.length?(o=new Gf(r),a.push(o)):o=a[s],o}function n(){t=new WeakMap}return{get:e,dispose:n}}var D_=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,U_=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function N_(r,t,e){let n=new As,i=new te,s=new te,a=new xe,o=new Xa({depthPacking:af}),c=new qa,l={},h=e.maxTextureSize,u={[Kn]:ke,[ke]:Kn,[Nn]:Nn},f=new $e({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new te},radius:{value:4}},vertexShader:D_,fragmentShader:U_}),d=f.clone();d.defines.HORIZONTAL_PASS=1;let v=new ti;v.setAttribute("position",new on(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let _=new ln(v,f),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=cl;let m=this.type;this.render=function(E,P,F){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||E.length===0)return;let y=r.getRenderTarget(),M=r.getActiveCubeFace(),N=r.getActiveMipmapLevel(),G=r.state;G.setBlending(Fn),G.buffers.depth.getReversed()===!0?G.buffers.color.setClear(0,0,0,0):G.buffers.color.setClear(1,1,1,1),G.buffers.depth.setTest(!0),G.setScissorTest(!1);let H=m!==Un&&this.type===Un,Z=m===Un&&this.type!==Un;for(let J=0,Y=E.length;J<Y;J++){let at=E[J],W=at.shadow;if(W===void 0){Dt("WebGLShadowMap:",at,"has no shadow.");continue}if(W.autoUpdate===!1&&W.needsUpdate===!1)continue;i.copy(W.mapSize);let ut=W.getFrameExtents();if(i.multiply(ut),s.copy(W.mapSize),(i.x>h||i.y>h)&&(i.x>h&&(s.x=Math.floor(h/ut.x),i.x=s.x*ut.x,W.mapSize.x=s.x),i.y>h&&(s.y=Math.floor(h/ut.y),i.y=s.y*ut.y,W.mapSize.y=s.y)),W.map===null||H===!0||Z===!0){let Et=this.type!==Un?{minFilter:Ye,magFilter:Ye}:{};W.map!==null&&W.map.dispose(),W.map=new Ln(i.x,i.y,Et),W.map.texture.name=at.name+".shadowMap",W.camera.updateProjectionMatrix()}r.setRenderTarget(W.map),r.clear();let ft=W.getViewportCount();for(let Et=0;Et<ft;Et++){let Ut=W.getViewport(Et);a.set(s.x*Ut.x,s.y*Ut.y,s.x*Ut.z,s.y*Ut.w),G.viewport(a),W.updateMatrices(at,Et),n=W.getFrustum(),A(P,F,W.camera,at,this.type)}W.isPointLightShadow!==!0&&this.type===Un&&T(W,F),W.needsUpdate=!1}m=this.type,g.needsUpdate=!1,r.setRenderTarget(y,M,N)};function T(E,P){let F=t.update(_);f.defines.VSM_SAMPLES!==E.blurSamples&&(f.defines.VSM_SAMPLES=E.blurSamples,d.defines.VSM_SAMPLES=E.blurSamples,f.needsUpdate=!0,d.needsUpdate=!0),E.mapPass===null&&(E.mapPass=new Ln(i.x,i.y)),f.uniforms.shadow_pass.value=E.map.texture,f.uniforms.resolution.value=E.mapSize,f.uniforms.radius.value=E.radius,r.setRenderTarget(E.mapPass),r.clear(),r.renderBufferDirect(P,null,F,f,_,null),d.uniforms.shadow_pass.value=E.mapPass.texture,d.uniforms.resolution.value=E.mapSize,d.uniforms.radius.value=E.radius,r.setRenderTarget(E.map),r.clear(),r.renderBufferDirect(P,null,F,d,_,null)}function w(E,P,F,y){let M=null,N=F.isPointLight===!0?E.customDistanceMaterial:E.customDepthMaterial;if(N!==void 0)M=N;else if(M=F.isPointLight===!0?c:o,r.localClippingEnabled&&P.clipShadows===!0&&Array.isArray(P.clippingPlanes)&&P.clippingPlanes.length!==0||P.displacementMap&&P.displacementScale!==0||P.alphaMap&&P.alphaTest>0||P.map&&P.alphaTest>0||P.alphaToCoverage===!0){let G=M.uuid,H=P.uuid,Z=l[G];Z===void 0&&(Z={},l[G]=Z);let J=Z[H];J===void 0&&(J=M.clone(),Z[H]=J,P.addEventListener("dispose",C)),M=J}if(M.visible=P.visible,M.wireframe=P.wireframe,y===Un?M.side=P.shadowSide!==null?P.shadowSide:P.side:M.side=P.shadowSide!==null?P.shadowSide:u[P.side],M.alphaMap=P.alphaMap,M.alphaTest=P.alphaToCoverage===!0?.5:P.alphaTest,M.map=P.map,M.clipShadows=P.clipShadows,M.clippingPlanes=P.clippingPlanes,M.clipIntersection=P.clipIntersection,M.displacementMap=P.displacementMap,M.displacementScale=P.displacementScale,M.displacementBias=P.displacementBias,M.wireframeLinewidth=P.wireframeLinewidth,M.linewidth=P.linewidth,F.isPointLight===!0&&M.isMeshDistanceMaterial===!0){let G=r.properties.get(M);G.light=F}return M}function A(E,P,F,y,M){if(E.visible===!1)return;if(E.layers.test(P.layers)&&(E.isMesh||E.isLine||E.isPoints)&&(E.castShadow||E.receiveShadow&&M===Un)&&(!E.frustumCulled||n.intersectsObject(E))){E.modelViewMatrix.multiplyMatrices(F.matrixWorldInverse,E.matrixWorld);let H=t.update(E),Z=E.material;if(Array.isArray(Z)){let J=H.groups;for(let Y=0,at=J.length;Y<at;Y++){let W=J[Y],ut=Z[W.materialIndex];if(ut&&ut.visible){let ft=w(E,ut,y,M);E.onBeforeShadow(r,E,P,F,H,ft,W),r.renderBufferDirect(F,null,H,ft,E,W),E.onAfterShadow(r,E,P,F,H,ft,W)}}}else if(Z.visible){let J=w(E,Z,y,M);E.onBeforeShadow(r,E,P,F,H,J,null),r.renderBufferDirect(F,null,H,J,E,null),E.onAfterShadow(r,E,P,F,H,J,null)}}let G=E.children;for(let H=0,Z=G.length;H<Z;H++)A(G[H],P,F,y,M)}function C(E){E.target.removeEventListener("dispose",C);for(let F in l){let y=l[F],M=E.target.uuid;M in y&&(y[M].dispose(),delete y[M])}}}var F_={[io]:ro,[so]:co,[ao]:lo,[Xi]:oo,[ro]:io,[co]:so,[lo]:ao,[oo]:Xi};function O_(r,t){function e(){let D=!1,lt=new xe,ht=null,ct=new xe(0,0,0,0);return{setMask:function(it){ht!==it&&!D&&(r.colorMask(it,it,it,it),ht=it)},setLocked:function(it){D=it},setClear:function(it,j,vt,gt,zt){zt===!0&&(it*=gt,j*=gt,vt*=gt),lt.set(it,j,vt,gt),ct.equals(lt)===!1&&(r.clearColor(it,j,vt,gt),ct.copy(lt))},reset:function(){D=!1,ht=null,ct.set(-1,0,0,0)}}}function n(){let D=!1,lt=!1,ht=null,ct=null,it=null;return{setReversed:function(j){if(lt!==j){let vt=t.get("EXT_clip_control");j?vt.clipControlEXT(vt.LOWER_LEFT_EXT,vt.ZERO_TO_ONE_EXT):vt.clipControlEXT(vt.LOWER_LEFT_EXT,vt.NEGATIVE_ONE_TO_ONE_EXT),lt=j;let gt=it;it=null,this.setClear(gt)}},getReversed:function(){return lt},setTest:function(j){j?rt(r.DEPTH_TEST):bt(r.DEPTH_TEST)},setMask:function(j){ht!==j&&!D&&(r.depthMask(j),ht=j)},setFunc:function(j){if(lt&&(j=F_[j]),ct!==j){switch(j){case io:r.depthFunc(r.NEVER);break;case ro:r.depthFunc(r.ALWAYS);break;case so:r.depthFunc(r.LESS);break;case Xi:r.depthFunc(r.LEQUAL);break;case ao:r.depthFunc(r.EQUAL);break;case oo:r.depthFunc(r.GEQUAL);break;case co:r.depthFunc(r.GREATER);break;case lo:r.depthFunc(r.NOTEQUAL);break;default:r.depthFunc(r.LEQUAL)}ct=j}},setLocked:function(j){D=j},setClear:function(j){it!==j&&(lt&&(j=1-j),r.clearDepth(j),it=j)},reset:function(){D=!1,ht=null,ct=null,it=null,lt=!1}}}function i(){let D=!1,lt=null,ht=null,ct=null,it=null,j=null,vt=null,gt=null,zt=null;return{setTest:function(wt){D||(wt?rt(r.STENCIL_TEST):bt(r.STENCIL_TEST))},setMask:function(wt){lt!==wt&&!D&&(r.stencilMask(wt),lt=wt)},setFunc:function(wt,ie,Ft){(ht!==wt||ct!==ie||it!==Ft)&&(r.stencilFunc(wt,ie,Ft),ht=wt,ct=ie,it=Ft)},setOp:function(wt,ie,Ft){(j!==wt||vt!==ie||gt!==Ft)&&(r.stencilOp(wt,ie,Ft),j=wt,vt=ie,gt=Ft)},setLocked:function(wt){D=wt},setClear:function(wt){zt!==wt&&(r.clearStencil(wt),zt=wt)},reset:function(){D=!1,lt=null,ht=null,ct=null,it=null,j=null,vt=null,gt=null,zt=null}}}let s=new e,a=new n,o=new i,c=new WeakMap,l=new WeakMap,h={},u={},f=new WeakMap,d=[],v=null,_=!1,g=null,m=null,T=null,w=null,A=null,C=null,E=null,P=new Jt(0,0,0),F=0,y=!1,M=null,N=null,G=null,H=null,Z=null,J=r.getParameter(r.MAX_COMBINED_TEXTURE_IMAGE_UNITS),Y=!1,at=0,W=r.getParameter(r.VERSION);W.indexOf("WebGL")!==-1?(at=parseFloat(/^WebGL (\d)/.exec(W)[1]),Y=at>=1):W.indexOf("OpenGL ES")!==-1&&(at=parseFloat(/^OpenGL ES (\d)/.exec(W)[1]),Y=at>=2);let ut=null,ft={},Et=r.getParameter(r.SCISSOR_BOX),Ut=r.getParameter(r.VIEWPORT),Kt=new xe().fromArray(Et),Vt=new xe().fromArray(Ut);function qt(D,lt,ht,ct){let it=new Uint8Array(4),j=r.createTexture();r.bindTexture(D,j),r.texParameteri(D,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(D,r.TEXTURE_MAG_FILTER,r.NEAREST);for(let vt=0;vt<ht;vt++)D===r.TEXTURE_3D||D===r.TEXTURE_2D_ARRAY?r.texImage3D(lt,0,r.RGBA,1,1,ct,0,r.RGBA,r.UNSIGNED_BYTE,it):r.texImage2D(lt+vt,0,r.RGBA,1,1,0,r.RGBA,r.UNSIGNED_BYTE,it);return j}let et={};et[r.TEXTURE_2D]=qt(r.TEXTURE_2D,r.TEXTURE_2D,1),et[r.TEXTURE_CUBE_MAP]=qt(r.TEXTURE_CUBE_MAP,r.TEXTURE_CUBE_MAP_POSITIVE_X,6),et[r.TEXTURE_2D_ARRAY]=qt(r.TEXTURE_2D_ARRAY,r.TEXTURE_2D_ARRAY,1,1),et[r.TEXTURE_3D]=qt(r.TEXTURE_3D,r.TEXTURE_3D,1,1),s.setClear(0,0,0,1),a.setClear(1),o.setClear(0),rt(r.DEPTH_TEST),a.setFunc(Xi),Ht(!1),Wt(ol),rt(r.CULL_FACE),ce(Fn);function rt(D){h[D]!==!0&&(r.enable(D),h[D]=!0)}function bt(D){h[D]!==!1&&(r.disable(D),h[D]=!1)}function Nt(D,lt){return u[D]!==lt?(r.bindFramebuffer(D,lt),u[D]=lt,D===r.DRAW_FRAMEBUFFER&&(u[r.FRAMEBUFFER]=lt),D===r.FRAMEBUFFER&&(u[r.DRAW_FRAMEBUFFER]=lt),!0):!1}function Ct(D,lt){let ht=d,ct=!1;if(D){ht=f.get(lt),ht===void 0&&(ht=[],f.set(lt,ht));let it=D.textures;if(ht.length!==it.length||ht[0]!==r.COLOR_ATTACHMENT0){for(let j=0,vt=it.length;j<vt;j++)ht[j]=r.COLOR_ATTACHMENT0+j;ht.length=it.length,ct=!0}}else ht[0]!==r.BACK&&(ht[0]=r.BACK,ct=!0);ct&&r.drawBuffers(ht)}function Gt(D){return v!==D?(r.useProgram(D),v=D,!0):!1}let we={[xi]:r.FUNC_ADD,[Iu]:r.FUNC_SUBTRACT,[Lu]:r.FUNC_REVERSE_SUBTRACT};we[Du]=r.MIN,we[Uu]=r.MAX;let Bt={[Nu]:r.ZERO,[Fu]:r.ONE,[Ou]:r.SRC_COLOR,[La]:r.SRC_ALPHA,[Hu]:r.SRC_ALPHA_SATURATE,[Vu]:r.DST_COLOR,[ku]:r.DST_ALPHA,[Bu]:r.ONE_MINUS_SRC_COLOR,[Da]:r.ONE_MINUS_SRC_ALPHA,[Gu]:r.ONE_MINUS_DST_COLOR,[zu]:r.ONE_MINUS_DST_ALPHA,[Wu]:r.CONSTANT_COLOR,[Xu]:r.ONE_MINUS_CONSTANT_COLOR,[qu]:r.CONSTANT_ALPHA,[Yu]:r.ONE_MINUS_CONSTANT_ALPHA};function ce(D,lt,ht,ct,it,j,vt,gt,zt,wt){if(D===Fn){_===!0&&(bt(r.BLEND),_=!1);return}if(_===!1&&(rt(r.BLEND),_=!0),D!==Pu){if(D!==g||wt!==y){if((m!==xi||A!==xi)&&(r.blendEquation(r.FUNC_ADD),m=xi,A=xi),wt)switch(D){case Wi:r.blendFuncSeparate(r.ONE,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case ll:r.blendFunc(r.ONE,r.ONE);break;case hl:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case ul:r.blendFuncSeparate(r.DST_COLOR,r.ONE_MINUS_SRC_ALPHA,r.ZERO,r.ONE);break;default:Xt("WebGLState: Invalid blending: ",D);break}else switch(D){case Wi:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case ll:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE,r.ONE,r.ONE);break;case hl:Xt("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case ul:Xt("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Xt("WebGLState: Invalid blending: ",D);break}T=null,w=null,C=null,E=null,P.set(0,0,0),F=0,g=D,y=wt}return}it=it||lt,j=j||ht,vt=vt||ct,(lt!==m||it!==A)&&(r.blendEquationSeparate(we[lt],we[it]),m=lt,A=it),(ht!==T||ct!==w||j!==C||vt!==E)&&(r.blendFuncSeparate(Bt[ht],Bt[ct],Bt[j],Bt[vt]),T=ht,w=ct,C=j,E=vt),(gt.equals(P)===!1||zt!==F)&&(r.blendColor(gt.r,gt.g,gt.b,zt),P.copy(gt),F=zt),g=D,y=!1}function U(D,lt){D.side===Nn?bt(r.CULL_FACE):rt(r.CULL_FACE);let ht=D.side===ke;lt&&(ht=!ht),Ht(ht),D.blending===Wi&&D.transparent===!1?ce(Fn):ce(D.blending,D.blendEquation,D.blendSrc,D.blendDst,D.blendEquationAlpha,D.blendSrcAlpha,D.blendDstAlpha,D.blendColor,D.blendAlpha,D.premultipliedAlpha),a.setFunc(D.depthFunc),a.setTest(D.depthTest),a.setMask(D.depthWrite),s.setMask(D.colorWrite);let ct=D.stencilWrite;o.setTest(ct),ct&&(o.setMask(D.stencilWriteMask),o.setFunc(D.stencilFunc,D.stencilRef,D.stencilFuncMask),o.setOp(D.stencilFail,D.stencilZFail,D.stencilZPass)),St(D.polygonOffset,D.polygonOffsetFactor,D.polygonOffsetUnits),D.alphaToCoverage===!0?rt(r.SAMPLE_ALPHA_TO_COVERAGE):bt(r.SAMPLE_ALPHA_TO_COVERAGE)}function Ht(D){M!==D&&(D?r.frontFace(r.CW):r.frontFace(r.CCW),M=D)}function Wt(D){D!==Au?(rt(r.CULL_FACE),D!==N&&(D===ol?r.cullFace(r.BACK):D===Cu?r.cullFace(r.FRONT):r.cullFace(r.FRONT_AND_BACK))):bt(r.CULL_FACE),N=D}function ne(D){D!==G&&(Y&&r.lineWidth(D),G=D)}function St(D,lt,ht){D?(rt(r.POLYGON_OFFSET_FILL),(H!==lt||Z!==ht)&&(r.polygonOffset(lt,ht),H=lt,Z=ht)):bt(r.POLYGON_OFFSET_FILL)}function B(D){D?rt(r.SCISSOR_TEST):bt(r.SCISSOR_TEST)}function I(D){D===void 0&&(D=r.TEXTURE0+J-1),ut!==D&&(r.activeTexture(D),ut=D)}function b(D,lt,ht){ht===void 0&&(ut===null?ht=r.TEXTURE0+J-1:ht=ut);let ct=ft[ht];ct===void 0&&(ct={type:void 0,texture:void 0},ft[ht]=ct),(ct.type!==D||ct.texture!==lt)&&(ut!==ht&&(r.activeTexture(ht),ut=ht),r.bindTexture(D,lt||et[D]),ct.type=D,ct.texture=lt)}function p(){let D=ft[ut];D!==void 0&&D.type!==void 0&&(r.bindTexture(D.type,null),D.type=void 0,D.texture=void 0)}function x(){try{r.compressedTexImage2D(...arguments)}catch(D){D("WebGLState:",D)}}function R(){try{r.compressedTexImage3D(...arguments)}catch(D){D("WebGLState:",D)}}function O(){try{r.texSubImage2D(...arguments)}catch(D){D("WebGLState:",D)}}function k(){try{r.texSubImage3D(...arguments)}catch(D){D("WebGLState:",D)}}function L(){try{r.compressedTexSubImage2D(...arguments)}catch(D){D("WebGLState:",D)}}function Q(){try{r.compressedTexSubImage3D(...arguments)}catch(D){D("WebGLState:",D)}}function st(){try{r.texStorage2D(...arguments)}catch(D){D("WebGLState:",D)}}function dt(){try{r.texStorage3D(...arguments)}catch(D){D("WebGLState:",D)}}function nt(){try{r.texImage2D(...arguments)}catch(D){D("WebGLState:",D)}}function K(){try{r.texImage3D(...arguments)}catch(D){D("WebGLState:",D)}}function tt(D){Kt.equals(D)===!1&&(r.scissor(D.x,D.y,D.z,D.w),Kt.copy(D))}function mt(D){Vt.equals(D)===!1&&(r.viewport(D.x,D.y,D.z,D.w),Vt.copy(D))}function xt(D,lt){let ht=l.get(lt);ht===void 0&&(ht=new WeakMap,l.set(lt,ht));let ct=ht.get(D);ct===void 0&&(ct=r.getUniformBlockIndex(lt,D.name),ht.set(D,ct))}function ot(D,lt){let ct=l.get(lt).get(D);c.get(lt)!==ct&&(r.uniformBlockBinding(lt,ct,D.__bindingPointIndex),c.set(lt,ct))}function At(){r.disable(r.BLEND),r.disable(r.CULL_FACE),r.disable(r.DEPTH_TEST),r.disable(r.POLYGON_OFFSET_FILL),r.disable(r.SCISSOR_TEST),r.disable(r.STENCIL_TEST),r.disable(r.SAMPLE_ALPHA_TO_COVERAGE),r.blendEquation(r.FUNC_ADD),r.blendFunc(r.ONE,r.ZERO),r.blendFuncSeparate(r.ONE,r.ZERO,r.ONE,r.ZERO),r.blendColor(0,0,0,0),r.colorMask(!0,!0,!0,!0),r.clearColor(0,0,0,0),r.depthMask(!0),r.depthFunc(r.LESS),a.setReversed(!1),r.clearDepth(1),r.stencilMask(4294967295),r.stencilFunc(r.ALWAYS,0,4294967295),r.stencilOp(r.KEEP,r.KEEP,r.KEEP),r.clearStencil(0),r.cullFace(r.BACK),r.frontFace(r.CCW),r.polygonOffset(0,0),r.activeTexture(r.TEXTURE0),r.bindFramebuffer(r.FRAMEBUFFER,null),r.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),r.bindFramebuffer(r.READ_FRAMEBUFFER,null),r.useProgram(null),r.lineWidth(1),r.scissor(0,0,r.canvas.width,r.canvas.height),r.viewport(0,0,r.canvas.width,r.canvas.height),h={},ut=null,ft={},u={},f=new WeakMap,d=[],v=null,_=!1,g=null,m=null,T=null,w=null,A=null,C=null,E=null,P=new Jt(0,0,0),F=0,y=!1,M=null,N=null,G=null,H=null,Z=null,Kt.set(0,0,r.canvas.width,r.canvas.height),Vt.set(0,0,r.canvas.width,r.canvas.height),s.reset(),a.reset(),o.reset()}return{buffers:{color:s,depth:a,stencil:o},enable:rt,disable:bt,bindFramebuffer:Nt,drawBuffers:Ct,useProgram:Gt,setBlending:ce,setMaterial:U,setFlipSided:Ht,setCullFace:Wt,setLineWidth:ne,setPolygonOffset:St,setScissorTest:B,activeTexture:I,bindTexture:b,unbindTexture:p,compressedTexImage2D:x,compressedTexImage3D:R,texImage2D:nt,texImage3D:K,updateUBOMapping:xt,uniformBlockBinding:ot,texStorage2D:st,texStorage3D:dt,texSubImage2D:O,texSubImage3D:k,compressedTexSubImage2D:L,compressedTexSubImage3D:Q,scissor:tt,viewport:mt,reset:At}}function B_(r,t,e,n,i,s,a){let o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new te,h=new WeakMap,u,f=new WeakMap,d=!1;try{d=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function v(p,x){return d?new OffscreenCanvas(p,x):_s("canvas")}function _(p,x,R){let O=1,k=b(p);if((k.width>R||k.height>R)&&(O=R/Math.max(k.width,k.height)),O<1)if(typeof HTMLImageElement<"u"&&p instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&p instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&p instanceof ImageBitmap||typeof VideoFrame<"u"&&p instanceof VideoFrame){let L=Math.floor(O*k.width),Q=Math.floor(O*k.height);u===void 0&&(u=v(L,Q));let st=x?v(L,Q):u;return st.width=L,st.height=Q,st.getContext("2d").drawImage(p,0,0,L,Q),Dt("WebGLRenderer: Texture has been resized from ("+k.width+"x"+k.height+") to ("+L+"x"+Q+")."),st}else return"data"in p&&Dt("WebGLRenderer: Image in DataTexture is too big ("+k.width+"x"+k.height+")."),p;return p}function g(p){return p.generateMipmaps}function m(p){r.generateMipmap(p)}function T(p){return p.isWebGLCubeRenderTarget?r.TEXTURE_CUBE_MAP:p.isWebGL3DRenderTarget?r.TEXTURE_3D:p.isWebGLArrayRenderTarget||p.isCompressedArrayTexture?r.TEXTURE_2D_ARRAY:r.TEXTURE_2D}function w(p,x,R,O,k=!1){if(p!==null){if(r[p]!==void 0)return r[p];Dt("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+p+"'")}let L=x;if(x===r.RED&&(R===r.FLOAT&&(L=r.R32F),R===r.HALF_FLOAT&&(L=r.R16F),R===r.UNSIGNED_BYTE&&(L=r.R8)),x===r.RED_INTEGER&&(R===r.UNSIGNED_BYTE&&(L=r.R8UI),R===r.UNSIGNED_SHORT&&(L=r.R16UI),R===r.UNSIGNED_INT&&(L=r.R32UI),R===r.BYTE&&(L=r.R8I),R===r.SHORT&&(L=r.R16I),R===r.INT&&(L=r.R32I)),x===r.RG&&(R===r.FLOAT&&(L=r.RG32F),R===r.HALF_FLOAT&&(L=r.RG16F),R===r.UNSIGNED_BYTE&&(L=r.RG8)),x===r.RG_INTEGER&&(R===r.UNSIGNED_BYTE&&(L=r.RG8UI),R===r.UNSIGNED_SHORT&&(L=r.RG16UI),R===r.UNSIGNED_INT&&(L=r.RG32UI),R===r.BYTE&&(L=r.RG8I),R===r.SHORT&&(L=r.RG16I),R===r.INT&&(L=r.RG32I)),x===r.RGB_INTEGER&&(R===r.UNSIGNED_BYTE&&(L=r.RGB8UI),R===r.UNSIGNED_SHORT&&(L=r.RGB16UI),R===r.UNSIGNED_INT&&(L=r.RGB32UI),R===r.BYTE&&(L=r.RGB8I),R===r.SHORT&&(L=r.RGB16I),R===r.INT&&(L=r.RGB32I)),x===r.RGBA_INTEGER&&(R===r.UNSIGNED_BYTE&&(L=r.RGBA8UI),R===r.UNSIGNED_SHORT&&(L=r.RGBA16UI),R===r.UNSIGNED_INT&&(L=r.RGBA32UI),R===r.BYTE&&(L=r.RGBA8I),R===r.SHORT&&(L=r.RGBA16I),R===r.INT&&(L=r.RGBA32I)),x===r.RGB&&(R===r.UNSIGNED_INT_5_9_9_9_REV&&(L=r.RGB9_E5),R===r.UNSIGNED_INT_10F_11F_11F_REV&&(L=r.R11F_G11F_B10F)),x===r.RGBA){let Q=k?gs:jt.getTransfer(O);R===r.FLOAT&&(L=r.RGBA32F),R===r.HALF_FLOAT&&(L=r.RGBA16F),R===r.UNSIGNED_BYTE&&(L=Q===ee?r.SRGB8_ALPHA8:r.RGBA8),R===r.UNSIGNED_SHORT_4_4_4_4&&(L=r.RGBA4),R===r.UNSIGNED_SHORT_5_5_5_1&&(L=r.RGB5_A1)}return(L===r.R16F||L===r.R32F||L===r.RG16F||L===r.RG32F||L===r.RGBA16F||L===r.RGBA32F)&&t.get("EXT_color_buffer_float"),L}function A(p,x){let R;return p?x===null||x===Mi||x===Hr?R=r.DEPTH24_STENCIL8:x===Bn?R=r.DEPTH32F_STENCIL8:x===Gr&&(R=r.DEPTH24_STENCIL8,Dt("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):x===null||x===Mi||x===Hr?R=r.DEPTH_COMPONENT24:x===Bn?R=r.DEPTH_COMPONENT32F:x===Gr&&(R=r.DEPTH_COMPONENT16),R}function C(p,x){return g(p)===!0||p.isFramebufferTexture&&p.minFilter!==Ye&&p.minFilter!==cn?Math.log2(Math.max(x.width,x.height))+1:p.mipmaps!==void 0&&p.mipmaps.length>0?p.mipmaps.length:p.isCompressedTexture&&Array.isArray(p.image)?x.mipmaps.length:1}function E(p){let x=p.target;x.removeEventListener("dispose",E),F(x),x.isVideoTexture&&h.delete(x)}function P(p){let x=p.target;x.removeEventListener("dispose",P),M(x)}function F(p){let x=n.get(p);if(x.__webglInit===void 0)return;let R=p.source,O=f.get(R);if(O){let k=O[x.__cacheKey];k.usedTimes--,k.usedTimes===0&&y(p),Object.keys(O).length===0&&f.delete(R)}n.remove(p)}function y(p){let x=n.get(p);r.deleteTexture(x.__webglTexture);let R=p.source,O=f.get(R);delete O[x.__cacheKey],a.memory.textures--}function M(p){let x=n.get(p);if(p.depthTexture&&(p.depthTexture.dispose(),n.remove(p.depthTexture)),p.isWebGLCubeRenderTarget)for(let O=0;O<6;O++){if(Array.isArray(x.__webglFramebuffer[O]))for(let k=0;k<x.__webglFramebuffer[O].length;k++)r.deleteFramebuffer(x.__webglFramebuffer[O][k]);else r.deleteFramebuffer(x.__webglFramebuffer[O]);x.__webglDepthbuffer&&r.deleteRenderbuffer(x.__webglDepthbuffer[O])}else{if(Array.isArray(x.__webglFramebuffer))for(let O=0;O<x.__webglFramebuffer.length;O++)r.deleteFramebuffer(x.__webglFramebuffer[O]);else r.deleteFramebuffer(x.__webglFramebuffer);if(x.__webglDepthbuffer&&r.deleteRenderbuffer(x.__webglDepthbuffer),x.__webglMultisampledFramebuffer&&r.deleteFramebuffer(x.__webglMultisampledFramebuffer),x.__webglColorRenderbuffer)for(let O=0;O<x.__webglColorRenderbuffer.length;O++)x.__webglColorRenderbuffer[O]&&r.deleteRenderbuffer(x.__webglColorRenderbuffer[O]);x.__webglDepthRenderbuffer&&r.deleteRenderbuffer(x.__webglDepthRenderbuffer)}let R=p.textures;for(let O=0,k=R.length;O<k;O++){let L=n.get(R[O]);L.__webglTexture&&(r.deleteTexture(L.__webglTexture),a.memory.textures--),n.remove(R[O])}n.remove(p)}let N=0;function G(){N=0}function H(){let p=N;return p>=i.maxTextures&&Dt("WebGLTextures: Trying to use "+p+" texture units while this GPU supports only "+i.maxTextures),N+=1,p}function Z(p){let x=[];return x.push(p.wrapS),x.push(p.wrapT),x.push(p.wrapR||0),x.push(p.magFilter),x.push(p.minFilter),x.push(p.anisotropy),x.push(p.internalFormat),x.push(p.format),x.push(p.type),x.push(p.generateMipmaps),x.push(p.premultiplyAlpha),x.push(p.flipY),x.push(p.unpackAlignment),x.push(p.colorSpace),x.join()}function J(p,x){let R=n.get(p);if(p.isVideoTexture&&B(p),p.isRenderTargetTexture===!1&&p.isExternalTexture!==!0&&p.version>0&&R.__version!==p.version){let O=p.image;if(O===null)Dt("WebGLRenderer: Texture marked for update but no image data found.");else if(O.complete===!1)Dt("WebGLRenderer: Texture marked for update but image is incomplete");else{et(R,p,x);return}}else p.isExternalTexture&&(R.__webglTexture=p.sourceTexture?p.sourceTexture:null);e.bindTexture(r.TEXTURE_2D,R.__webglTexture,r.TEXTURE0+x)}function Y(p,x){let R=n.get(p);if(p.isRenderTargetTexture===!1&&p.version>0&&R.__version!==p.version){et(R,p,x);return}else p.isExternalTexture&&(R.__webglTexture=p.sourceTexture?p.sourceTexture:null);e.bindTexture(r.TEXTURE_2D_ARRAY,R.__webglTexture,r.TEXTURE0+x)}function at(p,x){let R=n.get(p);if(p.isRenderTargetTexture===!1&&p.version>0&&R.__version!==p.version){et(R,p,x);return}e.bindTexture(r.TEXTURE_3D,R.__webglTexture,r.TEXTURE0+x)}function W(p,x){let R=n.get(p);if(p.version>0&&R.__version!==p.version){rt(R,p,x);return}e.bindTexture(r.TEXTURE_CUBE_MAP,R.__webglTexture,r.TEXTURE0+x)}let ut={[Ua]:r.REPEAT,[Pn]:r.CLAMP_TO_EDGE,[Na]:r.MIRRORED_REPEAT},ft={[Ye]:r.NEAREST,[rf]:r.NEAREST_MIPMAP_NEAREST,[Ls]:r.NEAREST_MIPMAP_LINEAR,[cn]:r.LINEAR,[fo]:r.LINEAR_MIPMAP_NEAREST,[bi]:r.LINEAR_MIPMAP_LINEAR},Et={[lf]:r.NEVER,[mf]:r.ALWAYS,[hf]:r.LESS,[bl]:r.LEQUAL,[uf]:r.EQUAL,[pf]:r.GEQUAL,[ff]:r.GREATER,[df]:r.NOTEQUAL};function Ut(p,x){if(x.type===Bn&&t.has("OES_texture_float_linear")===!1&&(x.magFilter===cn||x.magFilter===fo||x.magFilter===Ls||x.magFilter===bi||x.minFilter===cn||x.minFilter===fo||x.minFilter===Ls||x.minFilter===bi)&&Dt("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),r.texParameteri(p,r.TEXTURE_WRAP_S,ut[x.wrapS]),r.texParameteri(p,r.TEXTURE_WRAP_T,ut[x.wrapT]),(p===r.TEXTURE_3D||p===r.TEXTURE_2D_ARRAY)&&r.texParameteri(p,r.TEXTURE_WRAP_R,ut[x.wrapR]),r.texParameteri(p,r.TEXTURE_MAG_FILTER,ft[x.magFilter]),r.texParameteri(p,r.TEXTURE_MIN_FILTER,ft[x.minFilter]),x.compareFunction&&(r.texParameteri(p,r.TEXTURE_COMPARE_MODE,r.COMPARE_REF_TO_TEXTURE),r.texParameteri(p,r.TEXTURE_COMPARE_FUNC,Et[x.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(x.magFilter===Ye||x.minFilter!==Ls&&x.minFilter!==bi||x.type===Bn&&t.has("OES_texture_float_linear")===!1)return;if(x.anisotropy>1||n.get(x).__currentAnisotropy){let R=t.get("EXT_texture_filter_anisotropic");r.texParameterf(p,R.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(x.anisotropy,i.getMaxAnisotropy())),n.get(x).__currentAnisotropy=x.anisotropy}}}function Kt(p,x){let R=!1;p.__webglInit===void 0&&(p.__webglInit=!0,x.addEventListener("dispose",E));let O=x.source,k=f.get(O);k===void 0&&(k={},f.set(O,k));let L=Z(x);if(L!==p.__cacheKey){k[L]===void 0&&(k[L]={texture:r.createTexture(),usedTimes:0},a.memory.textures++,R=!0),k[L].usedTimes++;let Q=k[p.__cacheKey];Q!==void 0&&(k[p.__cacheKey].usedTimes--,Q.usedTimes===0&&y(x)),p.__cacheKey=L,p.__webglTexture=k[L].texture}return R}function Vt(p,x,R){return Math.floor(Math.floor(p/R)/x)}function qt(p,x,R,O){let L=p.updateRanges;if(L.length===0)e.texSubImage2D(r.TEXTURE_2D,0,0,0,x.width,x.height,R,O,x.data);else{L.sort((K,tt)=>K.start-tt.start);let Q=0;for(let K=1;K<L.length;K++){let tt=L[Q],mt=L[K],xt=tt.start+tt.count,ot=Vt(mt.start,x.width,4),At=Vt(tt.start,x.width,4);mt.start<=xt+1&&ot===At&&Vt(mt.start+mt.count-1,x.width,4)===ot?tt.count=Math.max(tt.count,mt.start+mt.count-tt.start):(++Q,L[Q]=mt)}L.length=Q+1;let st=r.getParameter(r.UNPACK_ROW_LENGTH),dt=r.getParameter(r.UNPACK_SKIP_PIXELS),nt=r.getParameter(r.UNPACK_SKIP_ROWS);r.pixelStorei(r.UNPACK_ROW_LENGTH,x.width);for(let K=0,tt=L.length;K<tt;K++){let mt=L[K],xt=Math.floor(mt.start/4),ot=Math.ceil(mt.count/4),At=xt%x.width,D=Math.floor(xt/x.width),lt=ot,ht=1;r.pixelStorei(r.UNPACK_SKIP_PIXELS,At),r.pixelStorei(r.UNPACK_SKIP_ROWS,D),e.texSubImage2D(r.TEXTURE_2D,0,At,D,lt,ht,R,O,x.data)}p.clearUpdateRanges(),r.pixelStorei(r.UNPACK_ROW_LENGTH,st),r.pixelStorei(r.UNPACK_SKIP_PIXELS,dt),r.pixelStorei(r.UNPACK_SKIP_ROWS,nt)}}function et(p,x,R){let O=r.TEXTURE_2D;(x.isDataArrayTexture||x.isCompressedArrayTexture)&&(O=r.TEXTURE_2D_ARRAY),x.isData3DTexture&&(O=r.TEXTURE_3D);let k=Kt(p,x),L=x.source;e.bindTexture(O,p.__webglTexture,r.TEXTURE0+R);let Q=n.get(L);if(L.version!==Q.__version||k===!0){e.activeTexture(r.TEXTURE0+R);let st=jt.getPrimaries(jt.workingColorSpace),dt=x.colorSpace===ni?null:jt.getPrimaries(x.colorSpace),nt=x.colorSpace===ni||st===dt?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,x.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,x.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,nt);let K=_(x.image,!1,i.maxTextureSize);K=I(x,K);let tt=s.convert(x.format,x.colorSpace),mt=s.convert(x.type),xt=w(x.internalFormat,tt,mt,x.colorSpace,x.isVideoTexture);Ut(O,x);let ot,At=x.mipmaps,D=x.isVideoTexture!==!0,lt=Q.__version===void 0||k===!0,ht=L.dataReady,ct=C(x,K);if(x.isDepthTexture)xt=A(x.format===Wr,x.type),lt&&(D?e.texStorage2D(r.TEXTURE_2D,1,xt,K.width,K.height):e.texImage2D(r.TEXTURE_2D,0,xt,K.width,K.height,0,tt,mt,null));else if(x.isDataTexture)if(At.length>0){D&&lt&&e.texStorage2D(r.TEXTURE_2D,ct,xt,At[0].width,At[0].height);for(let it=0,j=At.length;it<j;it++)ot=At[it],D?ht&&e.texSubImage2D(r.TEXTURE_2D,it,0,0,ot.width,ot.height,tt,mt,ot.data):e.texImage2D(r.TEXTURE_2D,it,xt,ot.width,ot.height,0,tt,mt,ot.data);x.generateMipmaps=!1}else D?(lt&&e.texStorage2D(r.TEXTURE_2D,ct,xt,K.width,K.height),ht&&qt(x,K,tt,mt)):e.texImage2D(r.TEXTURE_2D,0,xt,K.width,K.height,0,tt,mt,K.data);else if(x.isCompressedTexture)if(x.isCompressedArrayTexture){D&&lt&&e.texStorage3D(r.TEXTURE_2D_ARRAY,ct,xt,At[0].width,At[0].height,K.depth);for(let it=0,j=At.length;it<j;it++)if(ot=At[it],x.format!==_n)if(tt!==null)if(D){if(ht)if(x.layerUpdates.size>0){let vt=Cl(ot.width,ot.height,x.format,x.type);for(let gt of x.layerUpdates){let zt=ot.data.subarray(gt*vt/ot.data.BYTES_PER_ELEMENT,(gt+1)*vt/ot.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,it,0,0,gt,ot.width,ot.height,1,tt,zt)}x.clearLayerUpdates()}else e.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,it,0,0,0,ot.width,ot.height,K.depth,tt,ot.data)}else e.compressedTexImage3D(r.TEXTURE_2D_ARRAY,it,xt,ot.width,ot.height,K.depth,0,ot.data,0,0);else Dt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else D?ht&&e.texSubImage3D(r.TEXTURE_2D_ARRAY,it,0,0,0,ot.width,ot.height,K.depth,tt,mt,ot.data):e.texImage3D(r.TEXTURE_2D_ARRAY,it,xt,ot.width,ot.height,K.depth,0,tt,mt,ot.data)}else{D&&lt&&e.texStorage2D(r.TEXTURE_2D,ct,xt,At[0].width,At[0].height);for(let it=0,j=At.length;it<j;it++)ot=At[it],x.format!==_n?tt!==null?D?ht&&e.compressedTexSubImage2D(r.TEXTURE_2D,it,0,0,ot.width,ot.height,tt,ot.data):e.compressedTexImage2D(r.TEXTURE_2D,it,xt,ot.width,ot.height,0,ot.data):Dt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):D?ht&&e.texSubImage2D(r.TEXTURE_2D,it,0,0,ot.width,ot.height,tt,mt,ot.data):e.texImage2D(r.TEXTURE_2D,it,xt,ot.width,ot.height,0,tt,mt,ot.data)}else if(x.isDataArrayTexture)if(D){if(lt&&e.texStorage3D(r.TEXTURE_2D_ARRAY,ct,xt,K.width,K.height,K.depth),ht)if(x.layerUpdates.size>0){let it=Cl(K.width,K.height,x.format,x.type);for(let j of x.layerUpdates){let vt=K.data.subarray(j*it/K.data.BYTES_PER_ELEMENT,(j+1)*it/K.data.BYTES_PER_ELEMENT);e.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,j,K.width,K.height,1,tt,mt,vt)}x.clearLayerUpdates()}else e.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,0,K.width,K.height,K.depth,tt,mt,K.data)}else e.texImage3D(r.TEXTURE_2D_ARRAY,0,xt,K.width,K.height,K.depth,0,tt,mt,K.data);else if(x.isData3DTexture)D?(lt&&e.texStorage3D(r.TEXTURE_3D,ct,xt,K.width,K.height,K.depth),ht&&e.texSubImage3D(r.TEXTURE_3D,0,0,0,0,K.width,K.height,K.depth,tt,mt,K.data)):e.texImage3D(r.TEXTURE_3D,0,xt,K.width,K.height,K.depth,0,tt,mt,K.data);else if(x.isFramebufferTexture){if(lt)if(D)e.texStorage2D(r.TEXTURE_2D,ct,xt,K.width,K.height);else{let it=K.width,j=K.height;for(let vt=0;vt<ct;vt++)e.texImage2D(r.TEXTURE_2D,vt,xt,it,j,0,tt,mt,null),it>>=1,j>>=1}}else if(At.length>0){if(D&&lt){let it=b(At[0]);e.texStorage2D(r.TEXTURE_2D,ct,xt,it.width,it.height)}for(let it=0,j=At.length;it<j;it++)ot=At[it],D?ht&&e.texSubImage2D(r.TEXTURE_2D,it,0,0,tt,mt,ot):e.texImage2D(r.TEXTURE_2D,it,xt,tt,mt,ot);x.generateMipmaps=!1}else if(D){if(lt){let it=b(K);e.texStorage2D(r.TEXTURE_2D,ct,xt,it.width,it.height)}ht&&e.texSubImage2D(r.TEXTURE_2D,0,0,0,tt,mt,K)}else e.texImage2D(r.TEXTURE_2D,0,xt,tt,mt,K);g(x)&&m(O),Q.__version=L.version,x.onUpdate&&x.onUpdate(x)}p.__version=x.version}function rt(p,x,R){if(x.image.length!==6)return;let O=Kt(p,x),k=x.source;e.bindTexture(r.TEXTURE_CUBE_MAP,p.__webglTexture,r.TEXTURE0+R);let L=n.get(k);if(k.version!==L.__version||O===!0){e.activeTexture(r.TEXTURE0+R);let Q=jt.getPrimaries(jt.workingColorSpace),st=x.colorSpace===ni?null:jt.getPrimaries(x.colorSpace),dt=x.colorSpace===ni||Q===st?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,x.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,x.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,dt);let nt=x.isCompressedTexture||x.image[0].isCompressedTexture,K=x.image[0]&&x.image[0].isDataTexture,tt=[];for(let j=0;j<6;j++)!nt&&!K?tt[j]=_(x.image[j],!0,i.maxCubemapSize):tt[j]=K?x.image[j].image:x.image[j],tt[j]=I(x,tt[j]);let mt=tt[0],xt=s.convert(x.format,x.colorSpace),ot=s.convert(x.type),At=w(x.internalFormat,xt,ot,x.colorSpace),D=x.isVideoTexture!==!0,lt=L.__version===void 0||O===!0,ht=k.dataReady,ct=C(x,mt);Ut(r.TEXTURE_CUBE_MAP,x);let it;if(nt){D&&lt&&e.texStorage2D(r.TEXTURE_CUBE_MAP,ct,At,mt.width,mt.height);for(let j=0;j<6;j++){it=tt[j].mipmaps;for(let vt=0;vt<it.length;vt++){let gt=it[vt];x.format!==_n?xt!==null?D?ht&&e.compressedTexSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+j,vt,0,0,gt.width,gt.height,xt,gt.data):e.compressedTexImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+j,vt,At,gt.width,gt.height,0,gt.data):Dt("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):D?ht&&e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+j,vt,0,0,gt.width,gt.height,xt,ot,gt.data):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+j,vt,At,gt.width,gt.height,0,xt,ot,gt.data)}}}else{if(it=x.mipmaps,D&&lt){it.length>0&&ct++;let j=b(tt[0]);e.texStorage2D(r.TEXTURE_CUBE_MAP,ct,At,j.width,j.height)}for(let j=0;j<6;j++)if(K){D?ht&&e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,0,0,tt[j].width,tt[j].height,xt,ot,tt[j].data):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,At,tt[j].width,tt[j].height,0,xt,ot,tt[j].data);for(let vt=0;vt<it.length;vt++){let zt=it[vt].image[j].image;D?ht&&e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+j,vt+1,0,0,zt.width,zt.height,xt,ot,zt.data):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+j,vt+1,At,zt.width,zt.height,0,xt,ot,zt.data)}}else{D?ht&&e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,0,0,xt,ot,tt[j]):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,At,xt,ot,tt[j]);for(let vt=0;vt<it.length;vt++){let gt=it[vt];D?ht&&e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+j,vt+1,0,0,xt,ot,gt.image[j]):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+j,vt+1,At,xt,ot,gt.image[j])}}}g(x)&&m(r.TEXTURE_CUBE_MAP),L.__version=k.version,x.onUpdate&&x.onUpdate(x)}p.__version=x.version}function bt(p,x,R,O,k,L){let Q=s.convert(R.format,R.colorSpace),st=s.convert(R.type),dt=w(R.internalFormat,Q,st,R.colorSpace),nt=n.get(x),K=n.get(R);if(K.__renderTarget=x,!nt.__hasExternalTextures){let tt=Math.max(1,x.width>>L),mt=Math.max(1,x.height>>L);k===r.TEXTURE_3D||k===r.TEXTURE_2D_ARRAY?e.texImage3D(k,L,dt,tt,mt,x.depth,0,Q,st,null):e.texImage2D(k,L,dt,tt,mt,0,Q,st,null)}e.bindFramebuffer(r.FRAMEBUFFER,p),St(x)?o.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,O,k,K.__webglTexture,0,ne(x)):(k===r.TEXTURE_2D||k>=r.TEXTURE_CUBE_MAP_POSITIVE_X&&k<=r.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&r.framebufferTexture2D(r.FRAMEBUFFER,O,k,K.__webglTexture,L),e.bindFramebuffer(r.FRAMEBUFFER,null)}function Nt(p,x,R){if(r.bindRenderbuffer(r.RENDERBUFFER,p),x.depthBuffer){let O=x.depthTexture,k=O&&O.isDepthTexture?O.type:null,L=A(x.stencilBuffer,k),Q=x.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,st=ne(x);St(x)?o.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,st,L,x.width,x.height):R?r.renderbufferStorageMultisample(r.RENDERBUFFER,st,L,x.width,x.height):r.renderbufferStorage(r.RENDERBUFFER,L,x.width,x.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,Q,r.RENDERBUFFER,p)}else{let O=x.textures;for(let k=0;k<O.length;k++){let L=O[k],Q=s.convert(L.format,L.colorSpace),st=s.convert(L.type),dt=w(L.internalFormat,Q,st,L.colorSpace),nt=ne(x);R&&St(x)===!1?r.renderbufferStorageMultisample(r.RENDERBUFFER,nt,dt,x.width,x.height):St(x)?o.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,nt,dt,x.width,x.height):r.renderbufferStorage(r.RENDERBUFFER,dt,x.width,x.height)}}r.bindRenderbuffer(r.RENDERBUFFER,null)}function Ct(p,x){if(x&&x.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(r.FRAMEBUFFER,p),!(x.depthTexture&&x.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");let O=n.get(x.depthTexture);O.__renderTarget=x,(!O.__webglTexture||x.depthTexture.image.width!==x.width||x.depthTexture.image.height!==x.height)&&(x.depthTexture.image.width=x.width,x.depthTexture.image.height=x.height,x.depthTexture.needsUpdate=!0),J(x.depthTexture,0);let k=O.__webglTexture,L=ne(x);if(x.depthTexture.format===Ur)St(x)?o.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,k,0,L):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,k,0);else if(x.depthTexture.format===Wr)St(x)?o.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,k,0,L):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,k,0);else throw new Error("Unknown depthTexture format")}function Gt(p){let x=n.get(p),R=p.isWebGLCubeRenderTarget===!0;if(x.__boundDepthTexture!==p.depthTexture){let O=p.depthTexture;if(x.__depthDisposeCallback&&x.__depthDisposeCallback(),O){let k=()=>{delete x.__boundDepthTexture,delete x.__depthDisposeCallback,O.removeEventListener("dispose",k)};O.addEventListener("dispose",k),x.__depthDisposeCallback=k}x.__boundDepthTexture=O}if(p.depthTexture&&!x.__autoAllocateDepthBuffer){if(R)throw new Error("target.depthTexture not supported in Cube render targets");let O=p.texture.mipmaps;O&&O.length>0?Ct(x.__webglFramebuffer[0],p):Ct(x.__webglFramebuffer,p)}else if(R){x.__webglDepthbuffer=[];for(let O=0;O<6;O++)if(e.bindFramebuffer(r.FRAMEBUFFER,x.__webglFramebuffer[O]),x.__webglDepthbuffer[O]===void 0)x.__webglDepthbuffer[O]=r.createRenderbuffer(),Nt(x.__webglDepthbuffer[O],p,!1);else{let k=p.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,L=x.__webglDepthbuffer[O];r.bindRenderbuffer(r.RENDERBUFFER,L),r.framebufferRenderbuffer(r.FRAMEBUFFER,k,r.RENDERBUFFER,L)}}else{let O=p.texture.mipmaps;if(O&&O.length>0?e.bindFramebuffer(r.FRAMEBUFFER,x.__webglFramebuffer[0]):e.bindFramebuffer(r.FRAMEBUFFER,x.__webglFramebuffer),x.__webglDepthbuffer===void 0)x.__webglDepthbuffer=r.createRenderbuffer(),Nt(x.__webglDepthbuffer,p,!1);else{let k=p.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,L=x.__webglDepthbuffer;r.bindRenderbuffer(r.RENDERBUFFER,L),r.framebufferRenderbuffer(r.FRAMEBUFFER,k,r.RENDERBUFFER,L)}}e.bindFramebuffer(r.FRAMEBUFFER,null)}function we(p,x,R){let O=n.get(p);x!==void 0&&bt(O.__webglFramebuffer,p,p.texture,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,0),R!==void 0&&Gt(p)}function Bt(p){let x=p.texture,R=n.get(p),O=n.get(x);p.addEventListener("dispose",P);let k=p.textures,L=p.isWebGLCubeRenderTarget===!0,Q=k.length>1;if(Q||(O.__webglTexture===void 0&&(O.__webglTexture=r.createTexture()),O.__version=x.version,a.memory.textures++),L){R.__webglFramebuffer=[];for(let st=0;st<6;st++)if(x.mipmaps&&x.mipmaps.length>0){R.__webglFramebuffer[st]=[];for(let dt=0;dt<x.mipmaps.length;dt++)R.__webglFramebuffer[st][dt]=r.createFramebuffer()}else R.__webglFramebuffer[st]=r.createFramebuffer()}else{if(x.mipmaps&&x.mipmaps.length>0){R.__webglFramebuffer=[];for(let st=0;st<x.mipmaps.length;st++)R.__webglFramebuffer[st]=r.createFramebuffer()}else R.__webglFramebuffer=r.createFramebuffer();if(Q)for(let st=0,dt=k.length;st<dt;st++){let nt=n.get(k[st]);nt.__webglTexture===void 0&&(nt.__webglTexture=r.createTexture(),a.memory.textures++)}if(p.samples>0&&St(p)===!1){R.__webglMultisampledFramebuffer=r.createFramebuffer(),R.__webglColorRenderbuffer=[],e.bindFramebuffer(r.FRAMEBUFFER,R.__webglMultisampledFramebuffer);for(let st=0;st<k.length;st++){let dt=k[st];R.__webglColorRenderbuffer[st]=r.createRenderbuffer(),r.bindRenderbuffer(r.RENDERBUFFER,R.__webglColorRenderbuffer[st]);let nt=s.convert(dt.format,dt.colorSpace),K=s.convert(dt.type),tt=w(dt.internalFormat,nt,K,dt.colorSpace,p.isXRRenderTarget===!0),mt=ne(p);r.renderbufferStorageMultisample(r.RENDERBUFFER,mt,tt,p.width,p.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+st,r.RENDERBUFFER,R.__webglColorRenderbuffer[st])}r.bindRenderbuffer(r.RENDERBUFFER,null),p.depthBuffer&&(R.__webglDepthRenderbuffer=r.createRenderbuffer(),Nt(R.__webglDepthRenderbuffer,p,!0)),e.bindFramebuffer(r.FRAMEBUFFER,null)}}if(L){e.bindTexture(r.TEXTURE_CUBE_MAP,O.__webglTexture),Ut(r.TEXTURE_CUBE_MAP,x);for(let st=0;st<6;st++)if(x.mipmaps&&x.mipmaps.length>0)for(let dt=0;dt<x.mipmaps.length;dt++)bt(R.__webglFramebuffer[st][dt],p,x,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+st,dt);else bt(R.__webglFramebuffer[st],p,x,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+st,0);g(x)&&m(r.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(Q){for(let st=0,dt=k.length;st<dt;st++){let nt=k[st],K=n.get(nt),tt=r.TEXTURE_2D;(p.isWebGL3DRenderTarget||p.isWebGLArrayRenderTarget)&&(tt=p.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),e.bindTexture(tt,K.__webglTexture),Ut(tt,nt),bt(R.__webglFramebuffer,p,nt,r.COLOR_ATTACHMENT0+st,tt,0),g(nt)&&m(tt)}e.unbindTexture()}else{let st=r.TEXTURE_2D;if((p.isWebGL3DRenderTarget||p.isWebGLArrayRenderTarget)&&(st=p.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),e.bindTexture(st,O.__webglTexture),Ut(st,x),x.mipmaps&&x.mipmaps.length>0)for(let dt=0;dt<x.mipmaps.length;dt++)bt(R.__webglFramebuffer[dt],p,x,r.COLOR_ATTACHMENT0,st,dt);else bt(R.__webglFramebuffer,p,x,r.COLOR_ATTACHMENT0,st,0);g(x)&&m(st),e.unbindTexture()}p.depthBuffer&&Gt(p)}function ce(p){let x=p.textures;for(let R=0,O=x.length;R<O;R++){let k=x[R];if(g(k)){let L=T(p),Q=n.get(k).__webglTexture;e.bindTexture(L,Q),m(L),e.unbindTexture()}}}let U=[],Ht=[];function Wt(p){if(p.samples>0){if(St(p)===!1){let x=p.textures,R=p.width,O=p.height,k=r.COLOR_BUFFER_BIT,L=p.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,Q=n.get(p),st=x.length>1;if(st)for(let nt=0;nt<x.length;nt++)e.bindFramebuffer(r.FRAMEBUFFER,Q.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+nt,r.RENDERBUFFER,null),e.bindFramebuffer(r.FRAMEBUFFER,Q.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+nt,r.TEXTURE_2D,null,0);e.bindFramebuffer(r.READ_FRAMEBUFFER,Q.__webglMultisampledFramebuffer);let dt=p.texture.mipmaps;dt&&dt.length>0?e.bindFramebuffer(r.DRAW_FRAMEBUFFER,Q.__webglFramebuffer[0]):e.bindFramebuffer(r.DRAW_FRAMEBUFFER,Q.__webglFramebuffer);for(let nt=0;nt<x.length;nt++){if(p.resolveDepthBuffer&&(p.depthBuffer&&(k|=r.DEPTH_BUFFER_BIT),p.stencilBuffer&&p.resolveStencilBuffer&&(k|=r.STENCIL_BUFFER_BIT)),st){r.framebufferRenderbuffer(r.READ_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.RENDERBUFFER,Q.__webglColorRenderbuffer[nt]);let K=n.get(x[nt]).__webglTexture;r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,K,0)}r.blitFramebuffer(0,0,R,O,0,0,R,O,k,r.NEAREST),c===!0&&(U.length=0,Ht.length=0,U.push(r.COLOR_ATTACHMENT0+nt),p.depthBuffer&&p.resolveDepthBuffer===!1&&(U.push(L),Ht.push(L),r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,Ht)),r.invalidateFramebuffer(r.READ_FRAMEBUFFER,U))}if(e.bindFramebuffer(r.READ_FRAMEBUFFER,null),e.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),st)for(let nt=0;nt<x.length;nt++){e.bindFramebuffer(r.FRAMEBUFFER,Q.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+nt,r.RENDERBUFFER,Q.__webglColorRenderbuffer[nt]);let K=n.get(x[nt]).__webglTexture;e.bindFramebuffer(r.FRAMEBUFFER,Q.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+nt,r.TEXTURE_2D,K,0)}e.bindFramebuffer(r.DRAW_FRAMEBUFFER,Q.__webglMultisampledFramebuffer)}else if(p.depthBuffer&&p.resolveDepthBuffer===!1&&c){let x=p.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,[x])}}}function ne(p){return Math.min(i.maxSamples,p.samples)}function St(p){let x=n.get(p);return p.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&x.__useRenderToTexture!==!1}function B(p){let x=a.render.frame;h.get(p)!==x&&(h.set(p,x),p.update())}function I(p,x){let R=p.colorSpace,O=p.format,k=p.type;return p.isCompressedTexture===!0||p.isVideoTexture===!0||R!==qi&&R!==ni&&(jt.getTransfer(R)===ee?(O!==_n||k!==On)&&Dt("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Xt("WebGLTextures: Unsupported texture color space:",R)),x}function b(p){return typeof HTMLImageElement<"u"&&p instanceof HTMLImageElement?(l.width=p.naturalWidth||p.width,l.height=p.naturalHeight||p.height):typeof VideoFrame<"u"&&p instanceof VideoFrame?(l.width=p.displayWidth,l.height=p.displayHeight):(l.width=p.width,l.height=p.height),l}this.allocateTextureUnit=H,this.resetTextureUnits=G,this.setTexture2D=J,this.setTexture2DArray=Y,this.setTexture3D=at,this.setTextureCube=W,this.rebindTextures=we,this.setupRenderTarget=Bt,this.updateRenderTargetMipmap=ce,this.updateMultisampleRenderTarget=Wt,this.setupDepthRenderbuffer=Gt,this.setupFrameBufferTexture=bt,this.useMultisampledRTT=St}function k_(r,t){function e(n,i=ni){let s,a=jt.getTransfer(i);if(n===On)return r.UNSIGNED_BYTE;if(n===mo)return r.UNSIGNED_SHORT_4_4_4_4;if(n===go)return r.UNSIGNED_SHORT_5_5_5_1;if(n===gl)return r.UNSIGNED_INT_5_9_9_9_REV;if(n===xl)return r.UNSIGNED_INT_10F_11F_11F_REV;if(n===pl)return r.BYTE;if(n===ml)return r.SHORT;if(n===Gr)return r.UNSIGNED_SHORT;if(n===po)return r.INT;if(n===Mi)return r.UNSIGNED_INT;if(n===Bn)return r.FLOAT;if(n===ji)return r.HALF_FLOAT;if(n===_l)return r.ALPHA;if(n===vl)return r.RGB;if(n===_n)return r.RGBA;if(n===Ur)return r.DEPTH_COMPONENT;if(n===Wr)return r.DEPTH_STENCIL;if(n===yl)return r.RED;if(n===xo)return r.RED_INTEGER;if(n===_o)return r.RG;if(n===vo)return r.RG_INTEGER;if(n===yo)return r.RGBA_INTEGER;if(n===Ds||n===Us||n===Ns||n===Fs)if(a===ee)if(s=t.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(n===Ds)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Us)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Ns)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Fs)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=t.get("WEBGL_compressed_texture_s3tc"),s!==null){if(n===Ds)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Us)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Ns)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Fs)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===bo||n===Mo||n===So||n===wo)if(s=t.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(n===bo)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Mo)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===So)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===wo)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===To||n===Eo||n===Ao)if(s=t.get("WEBGL_compressed_texture_etc"),s!==null){if(n===To||n===Eo)return a===ee?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(n===Ao)return a===ee?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===Co||n===Ro||n===Po||n===Io||n===Lo||n===Do||n===Uo||n===No||n===Fo||n===Oo||n===Bo||n===ko||n===zo||n===Vo)if(s=t.get("WEBGL_compressed_texture_astc"),s!==null){if(n===Co)return a===ee?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Ro)return a===ee?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Po)return a===ee?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Io)return a===ee?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Lo)return a===ee?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Do)return a===ee?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Uo)return a===ee?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===No)return a===ee?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Fo)return a===ee?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Oo)return a===ee?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Bo)return a===ee?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===ko)return a===ee?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===zo)return a===ee?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Vo)return a===ee?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Go||n===Ho||n===Wo)if(s=t.get("EXT_texture_compression_bptc"),s!==null){if(n===Go)return a===ee?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Ho)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Wo)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Xo||n===qo||n===Yo||n===Zo)if(s=t.get("EXT_texture_compression_rgtc"),s!==null){if(n===Xo)return s.COMPRESSED_RED_RGTC1_EXT;if(n===qo)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Yo)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Zo)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Hr?r.UNSIGNED_INT_24_8:r[n]!==void 0?r[n]:null}return{convert:e}}var z_=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,V_=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,zl=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){let n=new Rs(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=n}}getMesh(t){if(this.texture!==null&&this.mesh===null){let e=t.cameras[0].viewport,n=new $e({vertexShader:z_,fragmentShader:V_,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new ln(new Zi(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Vl=class extends jn{constructor(t,e){super();let n=this,i=null,s=1,a=null,o="local-floor",c=1,l=null,h=null,u=null,f=null,d=null,v=null,_=typeof XRWebGLBinding<"u",g=new zl,m={},T=e.getContextAttributes(),w=null,A=null,C=[],E=[],P=new te,F=null,y=new qe;y.viewport=new xe;let M=new qe;M.viewport=new xe;let N=[y,M],G=new no,H=null,Z=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(et){let rt=C[et];return rt===void 0&&(rt=new zr,C[et]=rt),rt.getTargetRaySpace()},this.getControllerGrip=function(et){let rt=C[et];return rt===void 0&&(rt=new zr,C[et]=rt),rt.getGripSpace()},this.getHand=function(et){let rt=C[et];return rt===void 0&&(rt=new zr,C[et]=rt),rt.getHandSpace()};function J(et){let rt=E.indexOf(et.inputSource);if(rt===-1)return;let bt=C[rt];bt!==void 0&&(bt.update(et.inputSource,et.frame,l||a),bt.dispatchEvent({type:et.type,data:et.inputSource}))}function Y(){i.removeEventListener("select",J),i.removeEventListener("selectstart",J),i.removeEventListener("selectend",J),i.removeEventListener("squeeze",J),i.removeEventListener("squeezestart",J),i.removeEventListener("squeezeend",J),i.removeEventListener("end",Y),i.removeEventListener("inputsourceschange",at);for(let et=0;et<C.length;et++){let rt=E[et];rt!==null&&(E[et]=null,C[et].disconnect(rt))}H=null,Z=null,g.reset();for(let et in m)delete m[et];t.setRenderTarget(w),d=null,f=null,u=null,i=null,A=null,qt.stop(),n.isPresenting=!1,t.setPixelRatio(F),t.setSize(P.width,P.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(et){s=et,n.isPresenting===!0&&Dt("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(et){o=et,n.isPresenting===!0&&Dt("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(et){l=et},this.getBaseLayer=function(){return f!==null?f:d},this.getBinding=function(){return u===null&&_&&(u=new XRWebGLBinding(i,e)),u},this.getFrame=function(){return v},this.getSession=function(){return i},this.setSession=async function(et){if(i=et,i!==null){if(w=t.getRenderTarget(),i.addEventListener("select",J),i.addEventListener("selectstart",J),i.addEventListener("selectend",J),i.addEventListener("squeeze",J),i.addEventListener("squeezestart",J),i.addEventListener("squeezeend",J),i.addEventListener("end",Y),i.addEventListener("inputsourceschange",at),T.xrCompatible!==!0&&await e.makeXRCompatible(),F=t.getPixelRatio(),t.getSize(P),_&&"createProjectionLayer"in XRWebGLBinding.prototype){let bt=null,Nt=null,Ct=null;T.depth&&(Ct=T.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,bt=T.stencil?Wr:Ur,Nt=T.stencil?Hr:Mi);let Gt={colorFormat:e.RGBA8,depthFormat:Ct,scaleFactor:s};u=this.getBinding(),f=u.createProjectionLayer(Gt),i.updateRenderState({layers:[f]}),t.setPixelRatio(1),t.setSize(f.textureWidth,f.textureHeight,!1),A=new Ln(f.textureWidth,f.textureHeight,{format:_n,type:On,depthTexture:new Cs(f.textureWidth,f.textureHeight,Nt,void 0,void 0,void 0,void 0,void 0,void 0,bt),stencilBuffer:T.stencil,colorSpace:t.outputColorSpace,samples:T.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}else{let bt={antialias:T.antialias,alpha:!0,depth:T.depth,stencil:T.stencil,framebufferScaleFactor:s};d=new XRWebGLLayer(i,e,bt),i.updateRenderState({baseLayer:d}),t.setPixelRatio(1),t.setSize(d.framebufferWidth,d.framebufferHeight,!1),A=new Ln(d.framebufferWidth,d.framebufferHeight,{format:_n,type:On,colorSpace:t.outputColorSpace,stencilBuffer:T.stencil,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}A.isXRRenderTarget=!0,this.setFoveation(c),l=null,a=await i.requestReferenceSpace(o),qt.setContext(i),qt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function at(et){for(let rt=0;rt<et.removed.length;rt++){let bt=et.removed[rt],Nt=E.indexOf(bt);Nt>=0&&(E[Nt]=null,C[Nt].disconnect(bt))}for(let rt=0;rt<et.added.length;rt++){let bt=et.added[rt],Nt=E.indexOf(bt);if(Nt===-1){for(let Gt=0;Gt<C.length;Gt++)if(Gt>=E.length){E.push(bt),Nt=Gt;break}else if(E[Gt]===null){E[Gt]=bt,Nt=Gt;break}if(Nt===-1)break}let Ct=C[Nt];Ct&&Ct.connect(bt)}}let W=new $,ut=new $;function ft(et,rt,bt){W.setFromMatrixPosition(rt.matrixWorld),ut.setFromMatrixPosition(bt.matrixWorld);let Nt=W.distanceTo(ut),Ct=rt.projectionMatrix.elements,Gt=bt.projectionMatrix.elements,we=Ct[14]/(Ct[10]-1),Bt=Ct[14]/(Ct[10]+1),ce=(Ct[9]+1)/Ct[5],U=(Ct[9]-1)/Ct[5],Ht=(Ct[8]-1)/Ct[0],Wt=(Gt[8]+1)/Gt[0],ne=we*Ht,St=we*Wt,B=Nt/(-Ht+Wt),I=B*-Ht;if(rt.matrixWorld.decompose(et.position,et.quaternion,et.scale),et.translateX(I),et.translateZ(B),et.matrixWorld.compose(et.position,et.quaternion,et.scale),et.matrixWorldInverse.copy(et.matrixWorld).invert(),Ct[10]===-1)et.projectionMatrix.copy(rt.projectionMatrix),et.projectionMatrixInverse.copy(rt.projectionMatrixInverse);else{let b=we+B,p=Bt+B,x=ne-I,R=St+(Nt-I),O=ce*Bt/p*b,k=U*Bt/p*b;et.projectionMatrix.makePerspective(x,R,O,k,b,p),et.projectionMatrixInverse.copy(et.projectionMatrix).invert()}}function Et(et,rt){rt===null?et.matrixWorld.copy(et.matrix):et.matrixWorld.multiplyMatrices(rt.matrixWorld,et.matrix),et.matrixWorldInverse.copy(et.matrixWorld).invert()}this.updateCamera=function(et){if(i===null)return;let rt=et.near,bt=et.far;g.texture!==null&&(g.depthNear>0&&(rt=g.depthNear),g.depthFar>0&&(bt=g.depthFar)),G.near=M.near=y.near=rt,G.far=M.far=y.far=bt,(H!==G.near||Z!==G.far)&&(i.updateRenderState({depthNear:G.near,depthFar:G.far}),H=G.near,Z=G.far),G.layers.mask=et.layers.mask|6,y.layers.mask=G.layers.mask&3,M.layers.mask=G.layers.mask&5;let Nt=et.parent,Ct=G.cameras;Et(G,Nt);for(let Gt=0;Gt<Ct.length;Gt++)Et(Ct[Gt],Nt);Ct.length===2?ft(G,y,M):G.projectionMatrix.copy(y.projectionMatrix),Ut(et,G,Nt)};function Ut(et,rt,bt){bt===null?et.matrix.copy(rt.matrixWorld):(et.matrix.copy(bt.matrixWorld),et.matrix.invert(),et.matrix.multiply(rt.matrixWorld)),et.matrix.decompose(et.position,et.quaternion,et.scale),et.updateMatrixWorld(!0),et.projectionMatrix.copy(rt.projectionMatrix),et.projectionMatrixInverse.copy(rt.projectionMatrixInverse),et.isPerspectiveCamera&&(et.fov=Oa*2*Math.atan(1/et.projectionMatrix.elements[5]),et.zoom=1)}this.getCamera=function(){return G},this.getFoveation=function(){if(!(f===null&&d===null))return c},this.setFoveation=function(et){c=et,f!==null&&(f.fixedFoveation=et),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=et)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(G)},this.getCameraTexture=function(et){return m[et]};let Kt=null;function Vt(et,rt){if(h=rt.getViewerPose(l||a),v=rt,h!==null){let bt=h.views;d!==null&&(t.setRenderTargetFramebuffer(A,d.framebuffer),t.setRenderTarget(A));let Nt=!1;bt.length!==G.cameras.length&&(G.cameras.length=0,Nt=!0);for(let Bt=0;Bt<bt.length;Bt++){let ce=bt[Bt],U=null;if(d!==null)U=d.getViewport(ce);else{let Wt=u.getViewSubImage(f,ce);U=Wt.viewport,Bt===0&&(t.setRenderTargetTextures(A,Wt.colorTexture,Wt.depthStencilTexture),t.setRenderTarget(A))}let Ht=N[Bt];Ht===void 0&&(Ht=new qe,Ht.layers.enable(Bt),Ht.viewport=new xe,N[Bt]=Ht),Ht.matrix.fromArray(ce.transform.matrix),Ht.matrix.decompose(Ht.position,Ht.quaternion,Ht.scale),Ht.projectionMatrix.fromArray(ce.projectionMatrix),Ht.projectionMatrixInverse.copy(Ht.projectionMatrix).invert(),Ht.viewport.set(U.x,U.y,U.width,U.height),Bt===0&&(G.matrix.copy(Ht.matrix),G.matrix.decompose(G.position,G.quaternion,G.scale)),Nt===!0&&G.cameras.push(Ht)}let Ct=i.enabledFeatures;if(Ct&&Ct.includes("depth-sensing")&&i.depthUsage=="gpu-optimized"&&_){u=n.getBinding();let Bt=u.getDepthInformation(bt[0]);Bt&&Bt.isValid&&Bt.texture&&g.init(Bt,i.renderState)}if(Ct&&Ct.includes("camera-access")&&_){t.state.unbindTexture(),u=n.getBinding();for(let Bt=0;Bt<bt.length;Bt++){let ce=bt[Bt].camera;if(ce){let U=m[ce];U||(U=new Rs,m[ce]=U);let Ht=u.getCameraImage(ce);U.sourceTexture=Ht}}}}for(let bt=0;bt<C.length;bt++){let Nt=E[bt],Ct=C[bt];Nt!==null&&Ct!==void 0&&Ct.update(Nt,rt,l||a)}Kt&&Kt(et,rt),rt.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:rt}),v=null}let qt=new Hf;qt.setAnimationLoop(Vt),this.setAnimationLoop=function(et){Kt=et},this.dispose=function(){}}},er=new Dn,G_=new Te;function H_(r,t){function e(g,m){g.matrixAutoUpdate===!0&&g.updateMatrix(),m.value.copy(g.matrix)}function n(g,m){m.color.getRGB(g.fogColor.value,Tl(r)),m.isFog?(g.fogNear.value=m.near,g.fogFar.value=m.far):m.isFogExp2&&(g.fogDensity.value=m.density)}function i(g,m,T,w,A){m.isMeshBasicMaterial||m.isMeshLambertMaterial?s(g,m):m.isMeshToonMaterial?(s(g,m),u(g,m)):m.isMeshPhongMaterial?(s(g,m),h(g,m)):m.isMeshStandardMaterial?(s(g,m),f(g,m),m.isMeshPhysicalMaterial&&d(g,m,A)):m.isMeshMatcapMaterial?(s(g,m),v(g,m)):m.isMeshDepthMaterial?s(g,m):m.isMeshDistanceMaterial?(s(g,m),_(g,m)):m.isMeshNormalMaterial?s(g,m):m.isLineBasicMaterial?(a(g,m),m.isLineDashedMaterial&&o(g,m)):m.isPointsMaterial?c(g,m,T,w):m.isSpriteMaterial?l(g,m):m.isShadowMaterial?(g.color.value.copy(m.color),g.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function s(g,m){g.opacity.value=m.opacity,m.color&&g.diffuse.value.copy(m.color),m.emissive&&g.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(g.map.value=m.map,e(m.map,g.mapTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,e(m.alphaMap,g.alphaMapTransform)),m.bumpMap&&(g.bumpMap.value=m.bumpMap,e(m.bumpMap,g.bumpMapTransform),g.bumpScale.value=m.bumpScale,m.side===ke&&(g.bumpScale.value*=-1)),m.normalMap&&(g.normalMap.value=m.normalMap,e(m.normalMap,g.normalMapTransform),g.normalScale.value.copy(m.normalScale),m.side===ke&&g.normalScale.value.negate()),m.displacementMap&&(g.displacementMap.value=m.displacementMap,e(m.displacementMap,g.displacementMapTransform),g.displacementScale.value=m.displacementScale,g.displacementBias.value=m.displacementBias),m.emissiveMap&&(g.emissiveMap.value=m.emissiveMap,e(m.emissiveMap,g.emissiveMapTransform)),m.specularMap&&(g.specularMap.value=m.specularMap,e(m.specularMap,g.specularMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest);let T=t.get(m),w=T.envMap,A=T.envMapRotation;w&&(g.envMap.value=w,er.copy(A),er.x*=-1,er.y*=-1,er.z*=-1,w.isCubeTexture&&w.isRenderTargetTexture===!1&&(er.y*=-1,er.z*=-1),g.envMapRotation.value.setFromMatrix4(G_.makeRotationFromEuler(er)),g.flipEnvMap.value=w.isCubeTexture&&w.isRenderTargetTexture===!1?-1:1,g.reflectivity.value=m.reflectivity,g.ior.value=m.ior,g.refractionRatio.value=m.refractionRatio),m.lightMap&&(g.lightMap.value=m.lightMap,g.lightMapIntensity.value=m.lightMapIntensity,e(m.lightMap,g.lightMapTransform)),m.aoMap&&(g.aoMap.value=m.aoMap,g.aoMapIntensity.value=m.aoMapIntensity,e(m.aoMap,g.aoMapTransform))}function a(g,m){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,m.map&&(g.map.value=m.map,e(m.map,g.mapTransform))}function o(g,m){g.dashSize.value=m.dashSize,g.totalSize.value=m.dashSize+m.gapSize,g.scale.value=m.scale}function c(g,m,T,w){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,g.size.value=m.size*T,g.scale.value=w*.5,m.map&&(g.map.value=m.map,e(m.map,g.uvTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,e(m.alphaMap,g.alphaMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest)}function l(g,m){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,g.rotation.value=m.rotation,m.map&&(g.map.value=m.map,e(m.map,g.mapTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,e(m.alphaMap,g.alphaMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest)}function h(g,m){g.specular.value.copy(m.specular),g.shininess.value=Math.max(m.shininess,1e-4)}function u(g,m){m.gradientMap&&(g.gradientMap.value=m.gradientMap)}function f(g,m){g.metalness.value=m.metalness,m.metalnessMap&&(g.metalnessMap.value=m.metalnessMap,e(m.metalnessMap,g.metalnessMapTransform)),g.roughness.value=m.roughness,m.roughnessMap&&(g.roughnessMap.value=m.roughnessMap,e(m.roughnessMap,g.roughnessMapTransform)),m.envMap&&(g.envMapIntensity.value=m.envMapIntensity)}function d(g,m,T){g.ior.value=m.ior,m.sheen>0&&(g.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),g.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(g.sheenColorMap.value=m.sheenColorMap,e(m.sheenColorMap,g.sheenColorMapTransform)),m.sheenRoughnessMap&&(g.sheenRoughnessMap.value=m.sheenRoughnessMap,e(m.sheenRoughnessMap,g.sheenRoughnessMapTransform))),m.clearcoat>0&&(g.clearcoat.value=m.clearcoat,g.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(g.clearcoatMap.value=m.clearcoatMap,e(m.clearcoatMap,g.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,e(m.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(g.clearcoatNormalMap.value=m.clearcoatNormalMap,e(m.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===ke&&g.clearcoatNormalScale.value.negate())),m.dispersion>0&&(g.dispersion.value=m.dispersion),m.iridescence>0&&(g.iridescence.value=m.iridescence,g.iridescenceIOR.value=m.iridescenceIOR,g.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap&&(g.iridescenceMap.value=m.iridescenceMap,e(m.iridescenceMap,g.iridescenceMapTransform)),m.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=m.iridescenceThicknessMap,e(m.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),m.transmission>0&&(g.transmission.value=m.transmission,g.transmissionSamplerMap.value=T.texture,g.transmissionSamplerSize.value.set(T.width,T.height),m.transmissionMap&&(g.transmissionMap.value=m.transmissionMap,e(m.transmissionMap,g.transmissionMapTransform)),g.thickness.value=m.thickness,m.thicknessMap&&(g.thicknessMap.value=m.thicknessMap,e(m.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=m.attenuationDistance,g.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(g.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(g.anisotropyMap.value=m.anisotropyMap,e(m.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=m.specularIntensity,g.specularColor.value.copy(m.specularColor),m.specularColorMap&&(g.specularColorMap.value=m.specularColorMap,e(m.specularColorMap,g.specularColorMapTransform)),m.specularIntensityMap&&(g.specularIntensityMap.value=m.specularIntensityMap,e(m.specularIntensityMap,g.specularIntensityMapTransform))}function v(g,m){m.matcap&&(g.matcap.value=m.matcap)}function _(g,m){let T=t.get(m).light;g.referencePosition.value.setFromMatrixPosition(T.matrixWorld),g.nearDistance.value=T.shadow.camera.near,g.farDistance.value=T.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function W_(r,t,e,n){let i={},s={},a=[],o=r.getParameter(r.MAX_UNIFORM_BUFFER_BINDINGS);function c(T,w){let A=w.program;n.uniformBlockBinding(T,A)}function l(T,w){let A=i[T.id];A===void 0&&(v(T),A=h(T),i[T.id]=A,T.addEventListener("dispose",g));let C=w.program;n.updateUBOMapping(T,C);let E=t.render.frame;s[T.id]!==E&&(f(T),s[T.id]=E)}function h(T){let w=u();T.__bindingPointIndex=w;let A=r.createBuffer(),C=T.__size,E=T.usage;return r.bindBuffer(r.UNIFORM_BUFFER,A),r.bufferData(r.UNIFORM_BUFFER,C,E),r.bindBuffer(r.UNIFORM_BUFFER,null),r.bindBufferBase(r.UNIFORM_BUFFER,w,A),A}function u(){for(let T=0;T<o;T++)if(a.indexOf(T)===-1)return a.push(T),T;return Xt("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(T){let w=i[T.id],A=T.uniforms,C=T.__cache;r.bindBuffer(r.UNIFORM_BUFFER,w);for(let E=0,P=A.length;E<P;E++){let F=Array.isArray(A[E])?A[E]:[A[E]];for(let y=0,M=F.length;y<M;y++){let N=F[y];if(d(N,E,y,C)===!0){let G=N.__offset,H=Array.isArray(N.value)?N.value:[N.value],Z=0;for(let J=0;J<H.length;J++){let Y=H[J],at=_(Y);typeof Y=="number"||typeof Y=="boolean"?(N.__data[0]=Y,r.bufferSubData(r.UNIFORM_BUFFER,G+Z,N.__data)):Y.isMatrix3?(N.__data[0]=Y.elements[0],N.__data[1]=Y.elements[1],N.__data[2]=Y.elements[2],N.__data[3]=0,N.__data[4]=Y.elements[3],N.__data[5]=Y.elements[4],N.__data[6]=Y.elements[5],N.__data[7]=0,N.__data[8]=Y.elements[6],N.__data[9]=Y.elements[7],N.__data[10]=Y.elements[8],N.__data[11]=0):(Y.toArray(N.__data,Z),Z+=at.storage/Float32Array.BYTES_PER_ELEMENT)}r.bufferSubData(r.UNIFORM_BUFFER,G,N.__data)}}}r.bindBuffer(r.UNIFORM_BUFFER,null)}function d(T,w,A,C){let E=T.value,P=w+"_"+A;if(C[P]===void 0)return typeof E=="number"||typeof E=="boolean"?C[P]=E:C[P]=E.clone(),!0;{let F=C[P];if(typeof E=="number"||typeof E=="boolean"){if(F!==E)return C[P]=E,!0}else if(F.equals(E)===!1)return F.copy(E),!0}return!1}function v(T){let w=T.uniforms,A=0,C=16;for(let P=0,F=w.length;P<F;P++){let y=Array.isArray(w[P])?w[P]:[w[P]];for(let M=0,N=y.length;M<N;M++){let G=y[M],H=Array.isArray(G.value)?G.value:[G.value];for(let Z=0,J=H.length;Z<J;Z++){let Y=H[Z],at=_(Y),W=A%C,ut=W%at.boundary,ft=W+ut;A+=ut,ft!==0&&C-ft<at.storage&&(A+=C-ft),G.__data=new Float32Array(at.storage/Float32Array.BYTES_PER_ELEMENT),G.__offset=A,A+=at.storage}}}let E=A%C;return E>0&&(A+=C-E),T.__size=A,T.__cache={},this}function _(T){let w={boundary:0,storage:0};return typeof T=="number"||typeof T=="boolean"?(w.boundary=4,w.storage=4):T.isVector2?(w.boundary=8,w.storage=8):T.isVector3||T.isColor?(w.boundary=16,w.storage=12):T.isVector4?(w.boundary=16,w.storage=16):T.isMatrix3?(w.boundary=48,w.storage=48):T.isMatrix4?(w.boundary=64,w.storage=64):T.isTexture?Dt("WebGLRenderer: Texture samplers can not be part of an uniforms group."):Dt("WebGLRenderer: Unsupported uniform value type.",T),w}function g(T){let w=T.target;w.removeEventListener("dispose",g);let A=a.indexOf(w.__bindingPointIndex);a.splice(A,1),r.deleteBuffer(i[w.id]),delete i[w.id],delete s[w.id]}function m(){for(let T in i)r.deleteBuffer(i[T]);a=[],i={},s={}}return{bind:c,update:l,dispose:m}}var X_=new Uint16Array([11481,15204,11534,15171,11808,15015,12385,14843,12894,14716,13396,14600,13693,14483,13976,14366,14237,14171,14405,13961,14511,13770,14605,13598,14687,13444,14760,13305,14822,13066,14876,12857,14923,12675,14963,12517,14997,12379,15025,12230,15049,12023,15070,11843,15086,11687,15100,11551,15111,11433,15120,11330,15127,11217,15132,11060,15135,10922,15138,10801,15139,10695,15139,10600,13012,14923,13020,14917,13064,14886,13176,14800,13349,14666,13513,14526,13724,14398,13960,14230,14200,14020,14383,13827,14488,13651,14583,13491,14667,13348,14740,13132,14803,12908,14856,12713,14901,12542,14938,12394,14968,12241,14992,12017,15010,11822,15024,11654,15034,11507,15041,11380,15044,11269,15044,11081,15042,10913,15037,10764,15031,10635,15023,10520,15014,10419,15003,10330,13657,14676,13658,14673,13670,14660,13698,14622,13750,14547,13834,14442,13956,14317,14112,14093,14291,13889,14407,13704,14499,13538,14586,13389,14664,13201,14733,12966,14792,12758,14842,12577,14882,12418,14915,12272,14940,12033,14959,11826,14972,11646,14980,11490,14983,11355,14983,11212,14979,11008,14971,10830,14961,10675,14950,10540,14936,10420,14923,10315,14909,10204,14894,10041,14089,14460,14090,14459,14096,14452,14112,14431,14141,14388,14186,14305,14252,14130,14341,13941,14399,13756,14467,13585,14539,13430,14610,13272,14677,13026,14737,12808,14790,12617,14833,12449,14869,12303,14896,12065,14916,11845,14929,11655,14937,11490,14939,11347,14936,11184,14930,10970,14921,10783,14912,10621,14900,10480,14885,10356,14867,10247,14848,10062,14827,9894,14805,9745,14400,14208,14400,14206,14402,14198,14406,14174,14415,14122,14427,14035,14444,13913,14469,13767,14504,13613,14548,13463,14598,13324,14651,13082,14704,12858,14752,12658,14795,12483,14831,12330,14860,12106,14881,11875,14895,11675,14903,11501,14905,11351,14903,11178,14900,10953,14892,10757,14880,10589,14865,10442,14847,10313,14827,10162,14805,9965,14782,9792,14757,9642,14731,9507,14562,13883,14562,13883,14563,13877,14566,13862,14570,13830,14576,13773,14584,13689,14595,13582,14613,13461,14637,13336,14668,13120,14704,12897,14741,12695,14776,12516,14808,12358,14835,12150,14856,11910,14870,11701,14878,11519,14882,11361,14884,11187,14880,10951,14871,10748,14858,10572,14842,10418,14823,10286,14801,10099,14777,9897,14751,9722,14725,9567,14696,9430,14666,9309,14702,13604,14702,13604,14702,13600,14703,13591,14705,13570,14707,13533,14709,13477,14712,13400,14718,13305,14727,13106,14743,12907,14762,12716,14784,12539,14807,12380,14827,12190,14844,11943,14855,11727,14863,11539,14870,11376,14871,11204,14868,10960,14858,10748,14845,10565,14829,10406,14809,10269,14786,10058,14761,9852,14734,9671,14705,9512,14674,9374,14641,9253,14608,9076,14821,13366,14821,13365,14821,13364,14821,13358,14821,13344,14821,13320,14819,13252,14817,13145,14815,13011,14814,12858,14817,12698,14823,12539,14832,12389,14841,12214,14850,11968,14856,11750,14861,11558,14866,11390,14867,11226,14862,10972,14853,10754,14840,10565,14823,10401,14803,10259,14780,10032,14754,9820,14725,9635,14694,9473,14661,9333,14627,9203,14593,8988,14557,8798,14923,13014,14922,13014,14922,13012,14922,13004,14920,12987,14919,12957,14915,12907,14909,12834,14902,12738,14894,12623,14888,12498,14883,12370,14880,12203,14878,11970,14875,11759,14873,11569,14874,11401,14872,11243,14865,10986,14855,10762,14842,10568,14825,10401,14804,10255,14781,10017,14754,9799,14725,9611,14692,9445,14658,9301,14623,9139,14587,8920,14548,8729,14509,8562,15008,12672,15008,12672,15008,12671,15007,12667,15005,12656,15001,12637,14997,12605,14989,12556,14978,12490,14966,12407,14953,12313,14940,12136,14927,11934,14914,11742,14903,11563,14896,11401,14889,11247,14879,10992,14866,10767,14851,10570,14833,10400,14812,10252,14789,10007,14761,9784,14731,9592,14698,9424,14663,9279,14627,9088,14588,8868,14548,8676,14508,8508,14467,8360,15080,12386,15080,12386,15079,12385,15078,12383,15076,12378,15072,12367,15066,12347,15057,12315,15045,12253,15030,12138,15012,11998,14993,11845,14972,11685,14951,11530,14935,11383,14920,11228,14904,10981,14887,10762,14870,10567,14850,10397,14827,10248,14803,9997,14774,9771,14743,9578,14710,9407,14674,9259,14637,9048,14596,8826,14555,8632,14514,8464,14471,8317,14427,8182,15139,12008,15139,12008,15138,12008,15137,12007,15135,12003,15130,11990,15124,11969,15115,11929,15102,11872,15086,11794,15064,11693,15041,11581,15013,11459,14987,11336,14966,11170,14944,10944,14921,10738,14898,10552,14875,10387,14850,10239,14824,9983,14794,9758,14762,9563,14728,9392,14692,9244,14653,9014,14611,8791,14569,8597,14526,8427,14481,8281,14436,8110,14391,7885,15188,11617,15188,11617,15187,11617,15186,11618,15183,11617,15179,11612,15173,11601,15163,11581,15150,11546,15133,11495,15110,11427,15083,11346,15051,11246,15024,11057,14996,10868,14967,10687,14938,10517,14911,10362,14882,10206,14853,9956,14821,9737,14787,9543,14752,9375,14715,9228,14675,8980,14632,8760,14589,8565,14544,8395,14498,8248,14451,8049,14404,7824,14357,7630,15228,11298,15228,11298,15227,11299,15226,11301,15223,11303,15219,11302,15213,11299,15204,11290,15191,11271,15174,11217,15150,11129,15119,11015,15087,10886,15057,10744,15024,10599,14990,10455,14957,10318,14924,10143,14891,9911,14856,9701,14820,9516,14782,9352,14744,9200,14703,8946,14659,8725,14615,8533,14568,8366,14521,8220,14472,7992,14423,7770,14374,7578,14315,7408,15260,10819,15260,10819,15259,10822,15258,10826,15256,10832,15251,10836,15246,10841,15237,10838,15225,10821,15207,10788,15183,10734,15151,10660,15120,10571,15087,10469,15049,10359,15012,10249,14974,10041,14937,9837,14900,9647,14860,9475,14820,9320,14779,9147,14736,8902,14691,8688,14646,8499,14598,8335,14549,8189,14499,7940,14448,7720,14397,7529,14347,7363,14256,7218,15285,10410,15285,10411,15285,10413,15284,10418,15282,10425,15278,10434,15272,10442,15264,10449,15252,10445,15235,10433,15210,10403,15179,10358,15149,10301,15113,10218,15073,10059,15033,9894,14991,9726,14951,9565,14909,9413,14865,9273,14822,9073,14777,8845,14730,8641,14682,8459,14633,8300,14583,8129,14531,7883,14479,7670,14426,7482,14373,7321,14305,7176,14201,6939,15305,9939,15305,9940,15305,9945,15304,9955,15302,9967,15298,9989,15293,10010,15286,10033,15274,10044,15258,10045,15233,10022,15205,9975,15174,9903,15136,9808,15095,9697,15053,9578,15009,9451,14965,9327,14918,9198,14871,8973,14825,8766,14775,8579,14725,8408,14675,8259,14622,8058,14569,7821,14515,7615,14460,7435,14405,7276,14350,7108,14256,6866,14149,6653,15321,9444,15321,9445,15321,9448,15320,9458,15317,9470,15314,9490,15310,9515,15302,9540,15292,9562,15276,9579,15251,9577,15226,9559,15195,9519,15156,9463,15116,9389,15071,9304,15025,9208,14978,9023,14927,8838,14878,8661,14827,8496,14774,8344,14722,8206,14667,7973,14612,7749,14556,7555,14499,7382,14443,7229,14385,7025,14322,6791,14210,6588,14100,6409,15333,8920,15333,8921,15332,8927,15332,8943,15329,8965,15326,9002,15322,9048,15316,9106,15307,9162,15291,9204,15267,9221,15244,9221,15212,9196,15175,9134,15133,9043,15088,8930,15040,8801,14990,8665,14938,8526,14886,8391,14830,8261,14775,8087,14719,7866,14661,7664,14603,7482,14544,7322,14485,7178,14426,6936,14367,6713,14281,6517,14166,6348,14054,6198,15341,8360,15341,8361,15341,8366,15341,8379,15339,8399,15336,8431,15332,8473,15326,8527,15318,8585,15302,8632,15281,8670,15258,8690,15227,8690,15191,8664,15149,8612,15104,8543,15055,8456,15001,8360,14948,8259,14892,8122,14834,7923,14776,7734,14716,7558,14656,7397,14595,7250,14534,7070,14472,6835,14410,6628,14350,6443,14243,6283,14125,6135,14010,5889,15348,7715,15348,7717,15348,7725,15347,7745,15345,7780,15343,7836,15339,7905,15334,8e3,15326,8103,15310,8193,15293,8239,15270,8270,15240,8287,15204,8283,15163,8260,15118,8223,15067,8143,15014,8014,14958,7873,14899,7723,14839,7573,14778,7430,14715,7293,14652,7164,14588,6931,14524,6720,14460,6531,14396,6362,14330,6210,14207,6015,14086,5781,13969,5576,15352,7114,15352,7116,15352,7128,15352,7159,15350,7195,15348,7237,15345,7299,15340,7374,15332,7457,15317,7544,15301,7633,15280,7703,15251,7754,15216,7775,15176,7767,15131,7733,15079,7670,15026,7588,14967,7492,14906,7387,14844,7278,14779,7171,14714,6965,14648,6770,14581,6587,14515,6420,14448,6269,14382,6123,14299,5881,14172,5665,14049,5477,13929,5310,15355,6329,15355,6330,15355,6339,15355,6362,15353,6410,15351,6472,15349,6572,15344,6688,15337,6835,15323,6985,15309,7142,15287,7220,15260,7277,15226,7310,15188,7326,15142,7318,15090,7285,15036,7239,14976,7177,14914,7045,14849,6892,14782,6736,14714,6581,14645,6433,14576,6293,14506,6164,14438,5946,14369,5733,14270,5540,14140,5369,14014,5216,13892,5043,15357,5483,15357,5484,15357,5496,15357,5528,15356,5597,15354,5692,15351,5835,15347,6011,15339,6195,15328,6317,15314,6446,15293,6566,15268,6668,15235,6746,15197,6796,15152,6811,15101,6790,15046,6748,14985,6673,14921,6583,14854,6479,14785,6371,14714,6259,14643,6149,14571,5946,14499,5750,14428,5567,14358,5401,14242,5250,14109,5111,13980,4870,13856,4657,15359,4555,15359,4557,15358,4573,15358,4633,15357,4715,15355,4841,15353,5061,15349,5216,15342,5391,15331,5577,15318,5770,15299,5967,15274,6150,15243,6223,15206,6280,15161,6310,15111,6317,15055,6300,14994,6262,14928,6208,14860,6141,14788,5994,14715,5838,14641,5684,14566,5529,14492,5384,14418,5247,14346,5121,14216,4892,14079,4682,13948,4496,13822,4330,15359,3498,15359,3501,15359,3520,15359,3598,15358,3719,15356,3860,15355,4137,15351,4305,15344,4563,15334,4809,15321,5116,15303,5273,15280,5418,15250,5547,15214,5653,15170,5722,15120,5761,15064,5763,15002,5733,14935,5673,14865,5597,14792,5504,14716,5400,14640,5294,14563,5185,14486,5041,14410,4841,14335,4655,14191,4482,14051,4325,13918,4183,13790,4012,15360,2282,15360,2285,15360,2306,15360,2401,15359,2547,15357,2748,15355,3103,15352,3349,15345,3675,15336,4020,15324,4272,15307,4496,15285,4716,15255,4908,15220,5086,15178,5170,15128,5214,15072,5234,15010,5231,14943,5206,14871,5166,14796,5102,14718,4971,14639,4833,14559,4687,14480,4541,14402,4401,14315,4268,14167,4142,14025,3958,13888,3747,13759,3556,15360,923,15360,925,15360,946,15360,1052,15359,1214,15357,1494,15356,1892,15352,2274,15346,2663,15338,3099,15326,3393,15309,3679,15288,3980,15260,4183,15226,4325,15185,4437,15136,4517,15080,4570,15018,4591,14950,4581,14877,4545,14800,4485,14720,4411,14638,4325,14556,4231,14475,4136,14395,3988,14297,3803,14145,3628,13999,3465,13861,3314,13729,3177,15360,263,15360,264,15360,272,15360,325,15359,407,15358,548,15356,780,15352,1144,15347,1580,15339,2099,15328,2425,15312,2795,15292,3133,15264,3329,15232,3517,15191,3689,15143,3819,15088,3923,15025,3978,14956,3999,14882,3979,14804,3931,14722,3855,14639,3756,14554,3645,14470,3529,14388,3409,14279,3289,14124,3173,13975,3055,13834,2848,13701,2658,15360,49,15360,49,15360,52,15360,75,15359,111,15358,201,15356,283,15353,519,15348,726,15340,1045,15329,1415,15314,1795,15295,2173,15269,2410,15237,2649,15197,2866,15150,3054,15095,3140,15032,3196,14963,3228,14888,3236,14808,3224,14725,3191,14639,3146,14553,3088,14466,2976,14382,2836,14262,2692,14103,2549,13952,2409,13808,2278,13674,2154,15360,4,15360,4,15360,4,15360,13,15359,33,15358,59,15357,112,15353,199,15348,302,15341,456,15331,628,15316,827,15297,1082,15272,1332,15241,1601,15202,1851,15156,2069,15101,2172,15039,2256,14970,2314,14894,2348,14813,2358,14728,2344,14640,2311,14551,2263,14463,2203,14376,2133,14247,2059,14084,1915,13930,1761,13784,1609,13648,1464,15360,0,15360,0,15360,0,15360,3,15359,18,15358,26,15357,53,15354,80,15348,97,15341,165,15332,238,15318,326,15299,427,15275,529,15245,654,15207,771,15161,885,15108,994,15046,1089,14976,1170,14900,1229,14817,1266,14731,1284,14641,1282,14550,1260,14460,1223,14370,1174,14232,1116,14066,1050,13909,981,13761,910,13623,839]),ii=null;function q_(){return ii===null&&(ii=new Wa(X_,32,32,_o,ji),ii.minFilter=cn,ii.magFilter=cn,ii.wrapS=Pn,ii.wrapT=Pn,ii.generateMipmaps=!1,ii.needsUpdate=!0),ii}var jo=class{constructor(t={}){let{canvas:e=gf(),context:n=null,depth:i=!0,stencil:s=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:f=!1}=t;this.isWebGLRenderer=!0;let d;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");d=n.getContextAttributes().alpha}else d=a;let v=new Set([yo,vo,xo]),_=new Set([On,Mi,Gr,Hr,mo,go]),g=new Uint32Array(4),m=new Int32Array(4),T=null,w=null,A=[],C=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=ei,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let E=this,P=!1;this._outputColorSpace=an;let F=0,y=0,M=null,N=-1,G=null,H=new xe,Z=new xe,J=null,Y=new Jt(0),at=0,W=e.width,ut=e.height,ft=1,Et=null,Ut=null,Kt=new xe(0,0,W,ut),Vt=new xe(0,0,W,ut),qt=!1,et=new As,rt=!1,bt=!1,Nt=new Te,Ct=new $,Gt=new xe,we={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Bt=!1;function ce(){return M===null?ft:1}let U=n;function Ht(S,z){return e.getContext(S,z)}try{let S={alpha:!0,depth:i,stencil:s,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${"181"}`),e.addEventListener("webglcontextlost",it,!1),e.addEventListener("webglcontextrestored",j,!1),e.addEventListener("webglcontextcreationerror",vt,!1),U===null){let z="webgl2";if(U=Ht(z,S),U===null)throw Ht(z)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(S){throw S("WebGLRenderer: "+S.message),S}let Wt,ne,St,B,I,b,p,x,R,O,k,L,Q,st,dt,nt,K,tt,mt,xt,ot,At,D,lt;function ht(){Wt=new cx(U),Wt.init(),At=new k_(U,Wt),ne=new Qg(U,Wt,t,At),St=new O_(U,Wt),ne.reversedDepthBuffer&&f&&St.buffers.depth.setReversed(!0),B=new ux(U),I=new w_,b=new B_(U,Wt,St,I,ne,At,B),p=new ex(E),x=new ox(E),R=new mm(U),D=new Kg(U,R),O=new lx(U,R,B,D),k=new dx(U,O,R,B),mt=new fx(U,ne,b),nt=new tx(I),L=new S_(E,p,x,Wt,ne,D,nt),Q=new H_(E,I),st=new E_,dt=new L_(Wt),tt=new Jg(E,p,x,St,k,d,c),K=new N_(E,k,ne),lt=new W_(U,B,ne,St),xt=new jg(U,Wt,B),ot=new hx(U,Wt,B),B.programs=L.programs,E.capabilities=ne,E.extensions=Wt,E.properties=I,E.renderLists=st,E.shadowMap=K,E.state=St,E.info=B}ht();let ct=new Vl(E,U);this.xr=ct,this.getContext=function(){return U},this.getContextAttributes=function(){return U.getContextAttributes()},this.forceContextLoss=function(){let S=Wt.get("WEBGL_lose_context");S&&S.loseContext()},this.forceContextRestore=function(){let S=Wt.get("WEBGL_lose_context");S&&S.restoreContext()},this.getPixelRatio=function(){return ft},this.setPixelRatio=function(S){S!==void 0&&(ft=S,this.setSize(W,ut,!1))},this.getSize=function(S){return S.set(W,ut)},this.setSize=function(S,z,X=!0){if(ct.isPresenting){Dt("WebGLRenderer: Can't change size while VR device is presenting.");return}W=S,ut=z,e.width=Math.floor(S*ft),e.height=Math.floor(z*ft),X===!0&&(e.style.width=S+"px",e.style.height=z+"px"),this.setViewport(0,0,S,z)},this.getDrawingBufferSize=function(S){return S.set(W*ft,ut*ft).floor()},this.setDrawingBufferSize=function(S,z,X){W=S,ut=z,ft=X,e.width=Math.floor(S*X),e.height=Math.floor(z*X),this.setViewport(0,0,S,z)},this.getCurrentViewport=function(S){return S.copy(H)},this.getViewport=function(S){return S.copy(Kt)},this.setViewport=function(S,z,X,q){S.isVector4?Kt.set(S.x,S.y,S.z,S.w):Kt.set(S,z,X,q),St.viewport(H.copy(Kt).multiplyScalar(ft).round())},this.getScissor=function(S){return S.copy(Vt)},this.setScissor=function(S,z,X,q){S.isVector4?Vt.set(S.x,S.y,S.z,S.w):Vt.set(S,z,X,q),St.scissor(Z.copy(Vt).multiplyScalar(ft).round())},this.getScissorTest=function(){return qt},this.setScissorTest=function(S){St.setScissorTest(qt=S)},this.setOpaqueSort=function(S){Et=S},this.setTransparentSort=function(S){Ut=S},this.getClearColor=function(S){return S.copy(tt.getClearColor())},this.setClearColor=function(){tt.setClearColor(...arguments)},this.getClearAlpha=function(){return tt.getClearAlpha()},this.setClearAlpha=function(){tt.setClearAlpha(...arguments)},this.clear=function(S=!0,z=!0,X=!0){let q=0;if(S){let V=!1;if(M!==null){let pt=M.texture.format;V=v.has(pt)}if(V){let pt=M.texture.type,yt=_.has(pt),Tt=tt.getClearColor(),Mt=tt.getClearAlpha(),It=Tt.r,Lt=Tt.g,Rt=Tt.b;yt?(g[0]=It,g[1]=Lt,g[2]=Rt,g[3]=Mt,U.clearBufferuiv(U.COLOR,0,g)):(m[0]=It,m[1]=Lt,m[2]=Rt,m[3]=Mt,U.clearBufferiv(U.COLOR,0,m))}else q|=U.COLOR_BUFFER_BIT}z&&(q|=U.DEPTH_BUFFER_BIT),X&&(q|=U.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),U.clear(q)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",it,!1),e.removeEventListener("webglcontextrestored",j,!1),e.removeEventListener("webglcontextcreationerror",vt,!1),tt.dispose(),st.dispose(),dt.dispose(),I.dispose(),p.dispose(),x.dispose(),k.dispose(),D.dispose(),lt.dispose(),L.dispose(),ct.dispose(),ct.removeEventListener("sessionstart",li),ct.removeEventListener("sessionend",Li),Sn.stop()};function it(S){S.preventDefault(),wl("WebGLRenderer: Context Lost."),P=!0}function j(){wl("WebGLRenderer: Context Restored."),P=!1;let S=B.autoReset,z=K.enabled,X=K.autoUpdate,q=K.needsUpdate,V=K.type;ht(),B.autoReset=S,K.enabled=z,K.autoUpdate=X,K.needsUpdate=q,K.type=V}function vt(S){Xt("WebGLRenderer: A WebGL context could not be created. Reason: ",S.statusMessage)}function gt(S){let z=S.target;z.removeEventListener("dispose",gt),zt(z)}function zt(S){wt(S),I.remove(S)}function wt(S){let z=I.get(S).programs;z!==void 0&&(z.forEach(function(X){L.releaseProgram(X)}),S.isShaderMaterial&&L.releaseShaderCache(S))}this.renderBufferDirect=function(S,z,X,q,V,pt){z===null&&(z=we);let yt=V.isMesh&&V.matrixWorld.determinant()<0,Tt=rp(S,z,X,q,V);St.setMaterial(q,yt);let Mt=X.index,It=1;if(q.wireframe===!0){if(Mt=O.getWireframeAttribute(X),Mt===void 0)return;It=2}let Lt=X.drawRange,Rt=X.attributes.position,Yt=Lt.start*It,re=(Lt.start+Lt.count)*It;pt!==null&&(Yt=Math.max(Yt,pt.start*It),re=Math.min(re,(pt.start+pt.count)*It)),Mt!==null?(Yt=Math.max(Yt,0),re=Math.min(re,Mt.count)):Rt!=null&&(Yt=Math.max(Yt,0),re=Math.min(re,Rt.count));let me=re-Yt;if(me<0||me===1/0)return;D.setup(V,q,Tt,X,Mt);let ge,se=xt;if(Mt!==null&&(ge=R.get(Mt),se=ot,se.setIndex(ge)),V.isMesh)q.wireframe===!0?(St.setLineWidth(q.wireframeLinewidth*ce()),se.setMode(U.LINES)):se.setMode(U.TRIANGLES);else if(V.isLine){let Pt=q.linewidth;Pt===void 0&&(Pt=1),St.setLineWidth(Pt*ce()),V.isLineSegments?se.setMode(U.LINES):V.isLineLoop?se.setMode(U.LINE_LOOP):se.setMode(U.LINE_STRIP)}else V.isPoints?se.setMode(U.POINTS):V.isSprite&&se.setMode(U.TRIANGLES);if(V.isBatchedMesh)if(V._multiDrawInstances!==null)Fr("WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),se.renderMultiDrawInstances(V._multiDrawStarts,V._multiDrawCounts,V._multiDrawCount,V._multiDrawInstances);else if(Wt.get("WEBGL_multi_draw"))se.renderMultiDraw(V._multiDrawStarts,V._multiDrawCounts,V._multiDrawCount);else{let Pt=V._multiDrawStarts,ue=V._multiDrawCounts,Qt=V._multiDrawCount,en=Mt?R.get(Mt).bytesPerElement:1,gr=I.get(q).currentProgram.getUniforms();for(let nn=0;nn<Qt;nn++)gr.setValue(U,"_gl_DrawID",nn),se.render(Pt[nn]/en,ue[nn])}else if(V.isInstancedMesh)se.renderInstances(Yt,me,V.count);else if(X.isInstancedBufferGeometry){let Pt=X._maxInstanceCount!==void 0?X._maxInstanceCount:1/0,ue=Math.min(X.instanceCount,Pt);se.renderInstances(Yt,me,ue)}else se.render(Yt,me)};function ie(S,z,X){S.transparent===!0&&S.side===Nn&&S.forceSinglePass===!1?(S.side=ke,S.needsUpdate=!0,ia(S,z,X),S.side=Kn,S.needsUpdate=!0,ia(S,z,X),S.side=Nn):ia(S,z,X)}this.compile=function(S,z,X=null){X===null&&(X=S),w=dt.get(X),w.init(z),C.push(w),X.traverseVisible(function(V){V.isLight&&V.layers.test(z.layers)&&(w.pushLight(V),V.castShadow&&w.pushShadow(V))}),S!==X&&S.traverseVisible(function(V){V.isLight&&V.layers.test(z.layers)&&(w.pushLight(V),V.castShadow&&w.pushShadow(V))}),w.setupLights();let q=new Set;return S.traverse(function(V){if(!(V.isMesh||V.isPoints||V.isLine||V.isSprite))return;let pt=V.material;if(pt)if(Array.isArray(pt))for(let yt=0;yt<pt.length;yt++){let Tt=pt[yt];ie(Tt,X,V),q.add(Tt)}else ie(pt,X,V),q.add(pt)}),w=C.pop(),q},this.compileAsync=function(S,z,X=null){let q=this.compile(S,z,X);return new Promise(V=>{function pt(){if(q.forEach(function(yt){I.get(yt).currentProgram.isReady()&&q.delete(yt)}),q.size===0){V(S);return}setTimeout(pt,10)}Wt.get("KHR_parallel_shader_compile")!==null?pt():setTimeout(pt,10)})};let Ft=null;function Ge(S){Ft&&Ft(S)}function li(){Sn.stop()}function Li(){Sn.start()}let Sn=new Hf;Sn.setAnimationLoop(Ge),typeof self<"u"&&Sn.setContext(self),this.setAnimationLoop=function(S){Ft=S,ct.setAnimationLoop(S),S===null?Sn.stop():Sn.start()},ct.addEventListener("sessionstart",li),ct.addEventListener("sessionend",Li),this.render=function(S,z){if(z!==void 0&&z.isCamera!==!0){Xt("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(P===!0)return;if(S.matrixWorldAutoUpdate===!0&&S.updateMatrixWorld(),z.parent===null&&z.matrixWorldAutoUpdate===!0&&z.updateMatrixWorld(),ct.enabled===!0&&ct.isPresenting===!0&&(ct.cameraAutoUpdate===!0&&ct.updateCamera(z),z=ct.getCamera()),S.isScene===!0&&S.onBeforeRender(E,S,z,M),w=dt.get(S,C.length),w.init(z),C.push(w),Nt.multiplyMatrices(z.projectionMatrix,z.matrixWorldInverse),et.setFromProjectionMatrix(Nt,An,z.reversedDepth),bt=this.localClippingEnabled,rt=nt.init(this.clippingPlanes,bt),T=st.get(S,A.length),T.init(),A.push(T),ct.enabled===!0&&ct.isPresenting===!0){let pt=E.xr.getDepthSensingMesh();pt!==null&&ye(pt,z,-1/0,E.sortObjects)}ye(S,z,0,E.sortObjects),T.finish(),E.sortObjects===!0&&T.sort(Et,Ut),Bt=ct.enabled===!1||ct.isPresenting===!1||ct.hasDepthSensing()===!1,Bt&&tt.addToRenderList(T,S),this.info.render.frame++,rt===!0&&nt.beginShadows();let X=w.state.shadowsArray;K.render(X,S,z),rt===!0&&nt.endShadows(),this.info.autoReset===!0&&this.info.reset();let q=T.opaque,V=T.transmissive;if(w.setupLights(),z.isArrayCamera){let pt=z.cameras;if(V.length>0)for(let yt=0,Tt=pt.length;yt<Tt;yt++){let Mt=pt[yt];Bh(q,V,S,Mt)}Bt&&tt.render(S);for(let yt=0,Tt=pt.length;yt<Tt;yt++){let Mt=pt[yt];Cn(T,S,Mt,Mt.viewport)}}else V.length>0&&Bh(q,V,S,z),Bt&&tt.render(S),Cn(T,S,z);M!==null&&y===0&&(b.updateMultisampleRenderTarget(M),b.updateRenderTargetMipmap(M)),S.isScene===!0&&S.onAfterRender(E,S,z),D.resetDefaultState(),N=-1,G=null,C.pop(),C.length>0?(w=C[C.length-1],rt===!0&&nt.setGlobalState(E.clippingPlanes,w.state.camera)):w=null,A.pop(),A.length>0?T=A[A.length-1]:T=null};function ye(S,z,X,q){if(S.visible===!1)return;if(S.layers.test(z.layers)){if(S.isGroup)X=S.renderOrder;else if(S.isLOD)S.autoUpdate===!0&&S.update(z);else if(S.isLight)w.pushLight(S),S.castShadow&&w.pushShadow(S);else if(S.isSprite){if(!S.frustumCulled||et.intersectsSprite(S)){q&&Gt.setFromMatrixPosition(S.matrixWorld).applyMatrix4(Nt);let yt=k.update(S),Tt=S.material;Tt.visible&&T.push(S,yt,Tt,X,Gt.z,null)}}else if((S.isMesh||S.isLine||S.isPoints)&&(!S.frustumCulled||et.intersectsObject(S))){let yt=k.update(S),Tt=S.material;if(q&&(S.boundingSphere!==void 0?(S.boundingSphere===null&&S.computeBoundingSphere(),Gt.copy(S.boundingSphere.center)):(yt.boundingSphere===null&&yt.computeBoundingSphere(),Gt.copy(yt.boundingSphere.center)),Gt.applyMatrix4(S.matrixWorld).applyMatrix4(Nt)),Array.isArray(Tt)){let Mt=yt.groups;for(let It=0,Lt=Mt.length;It<Lt;It++){let Rt=Mt[It],Yt=Tt[Rt.materialIndex];Yt&&Yt.visible&&T.push(S,yt,Yt,X,Gt.z,Rt)}}else Tt.visible&&T.push(S,yt,Tt,X,Gt.z,null)}}let pt=S.children;for(let yt=0,Tt=pt.length;yt<Tt;yt++)ye(pt[yt],z,X,q)}function Cn(S,z,X,q){let{opaque:V,transmissive:pt,transparent:yt}=S;w.setupLightsView(X),rt===!0&&nt.setGlobalState(E.clippingPlanes,X),q&&St.viewport(H.copy(q)),V.length>0&&na(V,z,X),pt.length>0&&na(pt,z,X),yt.length>0&&na(yt,z,X),St.buffers.depth.setTest(!0),St.buffers.depth.setMask(!0),St.buffers.color.setMask(!0),St.setPolygonOffset(!1)}function Bh(S,z,X,q){if((X.isScene===!0?X.overrideMaterial:null)!==null)return;w.state.transmissionRenderTarget[q.id]===void 0&&(w.state.transmissionRenderTarget[q.id]=new Ln(1,1,{generateMipmaps:!0,type:Wt.has("EXT_color_buffer_half_float")||Wt.has("EXT_color_buffer_float")?ji:On,minFilter:bi,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:jt.workingColorSpace}));let pt=w.state.transmissionRenderTarget[q.id],yt=q.viewport||H;pt.setSize(yt.z*E.transmissionResolutionScale,yt.w*E.transmissionResolutionScale);let Tt=E.getRenderTarget(),Mt=E.getActiveCubeFace(),It=E.getActiveMipmapLevel();E.setRenderTarget(pt),E.getClearColor(Y),at=E.getClearAlpha(),at<1&&E.setClearColor(16777215,.5),E.clear(),Bt&&tt.render(X);let Lt=E.toneMapping;E.toneMapping=ei;let Rt=q.viewport;if(q.viewport!==void 0&&(q.viewport=void 0),w.setupLightsView(q),rt===!0&&nt.setGlobalState(E.clippingPlanes,q),na(S,X,q),b.updateMultisampleRenderTarget(pt),b.updateRenderTargetMipmap(pt),Wt.has("WEBGL_multisampled_render_to_texture")===!1){let Yt=!1;for(let re=0,me=z.length;re<me;re++){let ge=z[re],{object:se,geometry:Pt,material:ue,group:Qt}=ge;if(ue.side===Nn&&se.layers.test(q.layers)){let en=ue.side;ue.side=ke,ue.needsUpdate=!0,kh(se,X,q,Pt,ue,Qt),ue.side=en,ue.needsUpdate=!0,Yt=!0}}Yt===!0&&(b.updateMultisampleRenderTarget(pt),b.updateRenderTargetMipmap(pt))}E.setRenderTarget(Tt,Mt,It),E.setClearColor(Y,at),Rt!==void 0&&(q.viewport=Rt),E.toneMapping=Lt}function na(S,z,X){let q=z.isScene===!0?z.overrideMaterial:null;for(let V=0,pt=S.length;V<pt;V++){let yt=S[V],{object:Tt,geometry:Mt,group:It}=yt,Lt=yt.material;Lt.allowOverride===!0&&q!==null&&(Lt=q),Tt.layers.test(X.layers)&&kh(Tt,z,X,Mt,Lt,It)}}function kh(S,z,X,q,V,pt){S.onBeforeRender(E,z,X,q,V,pt),S.modelViewMatrix.multiplyMatrices(X.matrixWorldInverse,S.matrixWorld),S.normalMatrix.getNormalMatrix(S.modelViewMatrix),V.onBeforeRender(E,z,X,q,S,pt),V.transparent===!0&&V.side===Nn&&V.forceSinglePass===!1?(V.side=ke,V.needsUpdate=!0,E.renderBufferDirect(X,z,q,V,S,pt),V.side=Kn,V.needsUpdate=!0,E.renderBufferDirect(X,z,q,V,S,pt),V.side=Nn):E.renderBufferDirect(X,z,q,V,S,pt),S.onAfterRender(E,z,X,q,V,pt)}function ia(S,z,X){z.isScene!==!0&&(z=we);let q=I.get(S),V=w.state.lights,pt=w.state.shadowsArray,yt=V.state.version,Tt=L.getParameters(S,V.state,pt,z,X),Mt=L.getProgramCacheKey(Tt),It=q.programs;q.environment=S.isMeshStandardMaterial?z.environment:null,q.fog=z.fog,q.envMap=(S.isMeshStandardMaterial?x:p).get(S.envMap||q.environment),q.envMapRotation=q.environment!==null&&S.envMap===null?z.environmentRotation:S.envMapRotation,It===void 0&&(S.addEventListener("dispose",gt),It=new Map,q.programs=It);let Lt=It.get(Mt);if(Lt!==void 0){if(q.currentProgram===Lt&&q.lightsStateVersion===yt)return Vh(S,Tt),Lt}else Tt.uniforms=L.getUniforms(S),S.onBeforeCompile(Tt,E),Lt=L.acquireProgram(Tt,Mt),It.set(Mt,Lt),q.uniforms=Tt.uniforms;let Rt=q.uniforms;return(!S.isShaderMaterial&&!S.isRawShaderMaterial||S.clipping===!0)&&(Rt.clippingPlanes=nt.uniform),Vh(S,Tt),q.needsLights=ap(S),q.lightsStateVersion=yt,q.needsLights&&(Rt.ambientLightColor.value=V.state.ambient,Rt.lightProbe.value=V.state.probe,Rt.directionalLights.value=V.state.directional,Rt.directionalLightShadows.value=V.state.directionalShadow,Rt.spotLights.value=V.state.spot,Rt.spotLightShadows.value=V.state.spotShadow,Rt.rectAreaLights.value=V.state.rectArea,Rt.ltc_1.value=V.state.rectAreaLTC1,Rt.ltc_2.value=V.state.rectAreaLTC2,Rt.pointLights.value=V.state.point,Rt.pointLightShadows.value=V.state.pointShadow,Rt.hemisphereLights.value=V.state.hemi,Rt.directionalShadowMap.value=V.state.directionalShadowMap,Rt.directionalShadowMatrix.value=V.state.directionalShadowMatrix,Rt.spotShadowMap.value=V.state.spotShadowMap,Rt.spotLightMatrix.value=V.state.spotLightMatrix,Rt.spotLightMap.value=V.state.spotLightMap,Rt.pointShadowMap.value=V.state.pointShadowMap,Rt.pointShadowMatrix.value=V.state.pointShadowMatrix),q.currentProgram=Lt,q.uniformsList=null,Lt}function zh(S){if(S.uniformsList===null){let z=S.currentProgram.getUniforms();S.uniformsList=qr.seqWithValue(z.seq,S.uniforms)}return S.uniformsList}function Vh(S,z){let X=I.get(S);X.outputColorSpace=z.outputColorSpace,X.batching=z.batching,X.batchingColor=z.batchingColor,X.instancing=z.instancing,X.instancingColor=z.instancingColor,X.instancingMorph=z.instancingMorph,X.skinning=z.skinning,X.morphTargets=z.morphTargets,X.morphNormals=z.morphNormals,X.morphColors=z.morphColors,X.morphTargetsCount=z.morphTargetsCount,X.numClippingPlanes=z.numClippingPlanes,X.numIntersection=z.numClipIntersection,X.vertexAlphas=z.vertexAlphas,X.vertexTangents=z.vertexTangents,X.toneMapping=z.toneMapping}function rp(S,z,X,q,V){z.isScene!==!0&&(z=we),b.resetTextureUnits();let pt=z.fog,yt=q.isMeshStandardMaterial?z.environment:null,Tt=M===null?E.outputColorSpace:M.isXRRenderTarget===!0?M.texture.colorSpace:qi,Mt=(q.isMeshStandardMaterial?x:p).get(q.envMap||yt),It=q.vertexColors===!0&&!!X.attributes.color&&X.attributes.color.itemSize===4,Lt=!!X.attributes.tangent&&(!!q.normalMap||q.anisotropy>0),Rt=!!X.morphAttributes.position,Yt=!!X.morphAttributes.normal,re=!!X.morphAttributes.color,me=ei;q.toneMapped&&(M===null||M.isXRRenderTarget===!0)&&(me=E.toneMapping);let ge=X.morphAttributes.position||X.morphAttributes.normal||X.morphAttributes.color,se=ge!==void 0?ge.length:0,Pt=I.get(q),ue=w.state.lights;if(rt===!0&&(bt===!0||S!==G)){let Be=S===G&&q.id===N;nt.setState(q,S,Be)}let Qt=!1;q.version===Pt.__version?(Pt.needsLights&&Pt.lightsStateVersion!==ue.state.version||Pt.outputColorSpace!==Tt||V.isBatchedMesh&&Pt.batching===!1||!V.isBatchedMesh&&Pt.batching===!0||V.isBatchedMesh&&Pt.batchingColor===!0&&V.colorTexture===null||V.isBatchedMesh&&Pt.batchingColor===!1&&V.colorTexture!==null||V.isInstancedMesh&&Pt.instancing===!1||!V.isInstancedMesh&&Pt.instancing===!0||V.isSkinnedMesh&&Pt.skinning===!1||!V.isSkinnedMesh&&Pt.skinning===!0||V.isInstancedMesh&&Pt.instancingColor===!0&&V.instanceColor===null||V.isInstancedMesh&&Pt.instancingColor===!1&&V.instanceColor!==null||V.isInstancedMesh&&Pt.instancingMorph===!0&&V.morphTexture===null||V.isInstancedMesh&&Pt.instancingMorph===!1&&V.morphTexture!==null||Pt.envMap!==Mt||q.fog===!0&&Pt.fog!==pt||Pt.numClippingPlanes!==void 0&&(Pt.numClippingPlanes!==nt.numPlanes||Pt.numIntersection!==nt.numIntersection)||Pt.vertexAlphas!==It||Pt.vertexTangents!==Lt||Pt.morphTargets!==Rt||Pt.morphNormals!==Yt||Pt.morphColors!==re||Pt.toneMapping!==me||Pt.morphTargetsCount!==se)&&(Qt=!0):(Qt=!0,Pt.__version=q.version);let en=Pt.currentProgram;Qt===!0&&(en=ia(q,z,V));let gr=!1,nn=!1,ss=!1,fe=en.getUniforms(),He=Pt.uniforms;if(St.useProgram(en.program)&&(gr=!0,nn=!0,ss=!0),q.id!==N&&(N=q.id,nn=!0),gr||G!==S){St.buffers.depth.getReversed()&&S.reversedDepth!==!0&&(S._reversedDepth=!0,S.updateProjectionMatrix()),fe.setValue(U,"projectionMatrix",S.projectionMatrix),fe.setValue(U,"viewMatrix",S.matrixWorldInverse);let We=fe.map.cameraPosition;We!==void 0&&We.setValue(U,Ct.setFromMatrixPosition(S.matrixWorld)),ne.logarithmicDepthBuffer&&fe.setValue(U,"logDepthBufFC",2/(Math.log(S.far+1)/Math.LN2)),(q.isMeshPhongMaterial||q.isMeshToonMaterial||q.isMeshLambertMaterial||q.isMeshBasicMaterial||q.isMeshStandardMaterial||q.isShaderMaterial)&&fe.setValue(U,"isOrthographic",S.isOrthographicCamera===!0),G!==S&&(G=S,nn=!0,ss=!0)}if(V.isSkinnedMesh){fe.setOptional(U,V,"bindMatrix"),fe.setOptional(U,V,"bindMatrixInverse");let Be=V.skeleton;Be&&(Be.boneTexture===null&&Be.computeBoneTexture(),fe.setValue(U,"boneTexture",Be.boneTexture,b))}V.isBatchedMesh&&(fe.setOptional(U,V,"batchingTexture"),fe.setValue(U,"batchingTexture",V._matricesTexture,b),fe.setOptional(U,V,"batchingIdTexture"),fe.setValue(U,"batchingIdTexture",V._indirectTexture,b),fe.setOptional(U,V,"batchingColorTexture"),V._colorsTexture!==null&&fe.setValue(U,"batchingColorTexture",V._colorsTexture,b));let pn=X.morphAttributes;if((pn.position!==void 0||pn.normal!==void 0||pn.color!==void 0)&&mt.update(V,X,en),(nn||Pt.receiveShadow!==V.receiveShadow)&&(Pt.receiveShadow=V.receiveShadow,fe.setValue(U,"receiveShadow",V.receiveShadow)),q.isMeshGouraudMaterial&&q.envMap!==null&&(He.envMap.value=Mt,He.flipEnvMap.value=Mt.isCubeTexture&&Mt.isRenderTargetTexture===!1?-1:1),q.isMeshStandardMaterial&&q.envMap===null&&z.environment!==null&&(He.envMapIntensity.value=z.environmentIntensity),He.dfgLUT!==void 0&&(He.dfgLUT.value=q_()),nn&&(fe.setValue(U,"toneMappingExposure",E.toneMappingExposure),Pt.needsLights&&sp(He,ss),pt&&q.fog===!0&&Q.refreshFogUniforms(He,pt),Q.refreshMaterialUniforms(He,q,ft,ut,w.state.transmissionRenderTarget[S.id]),qr.upload(U,zh(Pt),He,b)),q.isShaderMaterial&&q.uniformsNeedUpdate===!0&&(qr.upload(U,zh(Pt),He,b),q.uniformsNeedUpdate=!1),q.isSpriteMaterial&&fe.setValue(U,"center",V.center),fe.setValue(U,"modelViewMatrix",V.modelViewMatrix),fe.setValue(U,"normalMatrix",V.normalMatrix),fe.setValue(U,"modelMatrix",V.matrixWorld),q.isShaderMaterial||q.isRawShaderMaterial){let Be=q.uniformsGroups;for(let We=0,vc=Be.length;We<vc;We++){let Di=Be[We];lt.update(Di,en),lt.bind(Di,en)}}return en}function sp(S,z){S.ambientLightColor.needsUpdate=z,S.lightProbe.needsUpdate=z,S.directionalLights.needsUpdate=z,S.directionalLightShadows.needsUpdate=z,S.pointLights.needsUpdate=z,S.pointLightShadows.needsUpdate=z,S.spotLights.needsUpdate=z,S.spotLightShadows.needsUpdate=z,S.rectAreaLights.needsUpdate=z,S.hemisphereLights.needsUpdate=z}function ap(S){return S.isMeshLambertMaterial||S.isMeshToonMaterial||S.isMeshPhongMaterial||S.isMeshStandardMaterial||S.isShadowMaterial||S.isShaderMaterial&&S.lights===!0}this.getActiveCubeFace=function(){return F},this.getActiveMipmapLevel=function(){return y},this.getRenderTarget=function(){return M},this.setRenderTargetTextures=function(S,z,X){let q=I.get(S);q.__autoAllocateDepthBuffer=S.resolveDepthBuffer===!1,q.__autoAllocateDepthBuffer===!1&&(q.__useRenderToTexture=!1),I.get(S.texture).__webglTexture=z,I.get(S.depthTexture).__webglTexture=q.__autoAllocateDepthBuffer?void 0:X,q.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(S,z){let X=I.get(S);X.__webglFramebuffer=z,X.__useDefaultFramebuffer=z===void 0};let op=U.createFramebuffer();this.setRenderTarget=function(S,z=0,X=0){M=S,F=z,y=X;let q=!0,V=null,pt=!1,yt=!1;if(S){let Mt=I.get(S);if(Mt.__useDefaultFramebuffer!==void 0)St.bindFramebuffer(U.FRAMEBUFFER,null),q=!1;else if(Mt.__webglFramebuffer===void 0)b.setupRenderTarget(S);else if(Mt.__hasExternalTextures)b.rebindTextures(S,I.get(S.texture).__webglTexture,I.get(S.depthTexture).__webglTexture);else if(S.depthBuffer){let Rt=S.depthTexture;if(Mt.__boundDepthTexture!==Rt){if(Rt!==null&&I.has(Rt)&&(S.width!==Rt.image.width||S.height!==Rt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");b.setupDepthRenderbuffer(S)}}let It=S.texture;(It.isData3DTexture||It.isDataArrayTexture||It.isCompressedArrayTexture)&&(yt=!0);let Lt=I.get(S).__webglFramebuffer;S.isWebGLCubeRenderTarget?(Array.isArray(Lt[z])?V=Lt[z][X]:V=Lt[z],pt=!0):S.samples>0&&b.useMultisampledRTT(S)===!1?V=I.get(S).__webglMultisampledFramebuffer:Array.isArray(Lt)?V=Lt[X]:V=Lt,H.copy(S.viewport),Z.copy(S.scissor),J=S.scissorTest}else H.copy(Kt).multiplyScalar(ft).floor(),Z.copy(Vt).multiplyScalar(ft).floor(),J=qt;if(X!==0&&(V=op),St.bindFramebuffer(U.FRAMEBUFFER,V)&&q&&St.drawBuffers(S,V),St.viewport(H),St.scissor(Z),St.setScissorTest(J),pt){let Mt=I.get(S.texture);U.framebufferTexture2D(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_CUBE_MAP_POSITIVE_X+z,Mt.__webglTexture,X)}else if(yt){let Mt=z;for(let It=0;It<S.textures.length;It++){let Lt=I.get(S.textures[It]);U.framebufferTextureLayer(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0+It,Lt.__webglTexture,X,Mt)}}else if(S!==null&&X!==0){let Mt=I.get(S.texture);U.framebufferTexture2D(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,Mt.__webglTexture,X)}N=-1},this.readRenderTargetPixels=function(S,z,X,q,V,pt,yt,Tt=0){if(!(S&&S.isWebGLRenderTarget)){Xt("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Mt=I.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&yt!==void 0&&(Mt=Mt[yt]),Mt){St.bindFramebuffer(U.FRAMEBUFFER,Mt);try{let It=S.textures[Tt],Lt=It.format,Rt=It.type;if(!ne.textureFormatReadable(Lt)){Xt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!ne.textureTypeReadable(Rt)){Xt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}z>=0&&z<=S.width-q&&X>=0&&X<=S.height-V&&(S.textures.length>1&&U.readBuffer(U.COLOR_ATTACHMENT0+Tt),U.readPixels(z,X,q,V,At.convert(Lt),At.convert(Rt),pt))}finally{let It=M!==null?I.get(M).__webglFramebuffer:null;St.bindFramebuffer(U.FRAMEBUFFER,It)}}},this.readRenderTargetPixelsAsync=async function(S,z,X,q,V,pt,yt,Tt=0){if(!(S&&S.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Mt=I.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&yt!==void 0&&(Mt=Mt[yt]),Mt)if(z>=0&&z<=S.width-q&&X>=0&&X<=S.height-V){St.bindFramebuffer(U.FRAMEBUFFER,Mt);let It=S.textures[Tt],Lt=It.format,Rt=It.type;if(!ne.textureFormatReadable(Lt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!ne.textureTypeReadable(Rt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let Yt=U.createBuffer();U.bindBuffer(U.PIXEL_PACK_BUFFER,Yt),U.bufferData(U.PIXEL_PACK_BUFFER,pt.byteLength,U.STREAM_READ),S.textures.length>1&&U.readBuffer(U.COLOR_ATTACHMENT0+Tt),U.readPixels(z,X,q,V,At.convert(Lt),At.convert(Rt),0);let re=M!==null?I.get(M).__webglFramebuffer:null;St.bindFramebuffer(U.FRAMEBUFFER,re);let me=U.fenceSync(U.SYNC_GPU_COMMANDS_COMPLETE,0);return U.flush(),await xf(U,me,4),U.bindBuffer(U.PIXEL_PACK_BUFFER,Yt),U.getBufferSubData(U.PIXEL_PACK_BUFFER,0,pt),U.deleteBuffer(Yt),U.deleteSync(me),pt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(S,z=null,X=0){let q=Math.pow(2,-X),V=Math.floor(S.image.width*q),pt=Math.floor(S.image.height*q),yt=z!==null?z.x:0,Tt=z!==null?z.y:0;b.setTexture2D(S,0),U.copyTexSubImage2D(U.TEXTURE_2D,X,0,0,yt,Tt,V,pt),St.unbindTexture()};let cp=U.createFramebuffer(),lp=U.createFramebuffer();this.copyTextureToTexture=function(S,z,X=null,q=null,V=0,pt=null){pt===null&&(V!==0?(Fr("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),pt=V,V=0):pt=0);let yt,Tt,Mt,It,Lt,Rt,Yt,re,me,ge=S.isCompressedTexture?S.mipmaps[pt]:S.image;if(X!==null)yt=X.max.x-X.min.x,Tt=X.max.y-X.min.y,Mt=X.isBox3?X.max.z-X.min.z:1,It=X.min.x,Lt=X.min.y,Rt=X.isBox3?X.min.z:0;else{let pn=Math.pow(2,-V);yt=Math.floor(ge.width*pn),Tt=Math.floor(ge.height*pn),S.isDataArrayTexture?Mt=ge.depth:S.isData3DTexture?Mt=Math.floor(ge.depth*pn):Mt=1,It=0,Lt=0,Rt=0}q!==null?(Yt=q.x,re=q.y,me=q.z):(Yt=0,re=0,me=0);let se=At.convert(z.format),Pt=At.convert(z.type),ue;z.isData3DTexture?(b.setTexture3D(z,0),ue=U.TEXTURE_3D):z.isDataArrayTexture||z.isCompressedArrayTexture?(b.setTexture2DArray(z,0),ue=U.TEXTURE_2D_ARRAY):(b.setTexture2D(z,0),ue=U.TEXTURE_2D),U.pixelStorei(U.UNPACK_FLIP_Y_WEBGL,z.flipY),U.pixelStorei(U.UNPACK_PREMULTIPLY_ALPHA_WEBGL,z.premultiplyAlpha),U.pixelStorei(U.UNPACK_ALIGNMENT,z.unpackAlignment);let Qt=U.getParameter(U.UNPACK_ROW_LENGTH),en=U.getParameter(U.UNPACK_IMAGE_HEIGHT),gr=U.getParameter(U.UNPACK_SKIP_PIXELS),nn=U.getParameter(U.UNPACK_SKIP_ROWS),ss=U.getParameter(U.UNPACK_SKIP_IMAGES);U.pixelStorei(U.UNPACK_ROW_LENGTH,ge.width),U.pixelStorei(U.UNPACK_IMAGE_HEIGHT,ge.height),U.pixelStorei(U.UNPACK_SKIP_PIXELS,It),U.pixelStorei(U.UNPACK_SKIP_ROWS,Lt),U.pixelStorei(U.UNPACK_SKIP_IMAGES,Rt);let fe=S.isDataArrayTexture||S.isData3DTexture,He=z.isDataArrayTexture||z.isData3DTexture;if(S.isDepthTexture){let pn=I.get(S),Be=I.get(z),We=I.get(pn.__renderTarget),vc=I.get(Be.__renderTarget);St.bindFramebuffer(U.READ_FRAMEBUFFER,We.__webglFramebuffer),St.bindFramebuffer(U.DRAW_FRAMEBUFFER,vc.__webglFramebuffer);for(let Di=0;Di<Mt;Di++)fe&&(U.framebufferTextureLayer(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,I.get(S).__webglTexture,V,Rt+Di),U.framebufferTextureLayer(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,I.get(z).__webglTexture,pt,me+Di)),U.blitFramebuffer(It,Lt,yt,Tt,Yt,re,yt,Tt,U.DEPTH_BUFFER_BIT,U.NEAREST);St.bindFramebuffer(U.READ_FRAMEBUFFER,null),St.bindFramebuffer(U.DRAW_FRAMEBUFFER,null)}else if(V!==0||S.isRenderTargetTexture||I.has(S)){let pn=I.get(S),Be=I.get(z);St.bindFramebuffer(U.READ_FRAMEBUFFER,cp),St.bindFramebuffer(U.DRAW_FRAMEBUFFER,lp);for(let We=0;We<Mt;We++)fe?U.framebufferTextureLayer(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,pn.__webglTexture,V,Rt+We):U.framebufferTexture2D(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,pn.__webglTexture,V),He?U.framebufferTextureLayer(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,Be.__webglTexture,pt,me+We):U.framebufferTexture2D(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,Be.__webglTexture,pt),V!==0?U.blitFramebuffer(It,Lt,yt,Tt,Yt,re,yt,Tt,U.COLOR_BUFFER_BIT,U.NEAREST):He?U.copyTexSubImage3D(ue,pt,Yt,re,me+We,It,Lt,yt,Tt):U.copyTexSubImage2D(ue,pt,Yt,re,It,Lt,yt,Tt);St.bindFramebuffer(U.READ_FRAMEBUFFER,null),St.bindFramebuffer(U.DRAW_FRAMEBUFFER,null)}else He?S.isDataTexture||S.isData3DTexture?U.texSubImage3D(ue,pt,Yt,re,me,yt,Tt,Mt,se,Pt,ge.data):z.isCompressedArrayTexture?U.compressedTexSubImage3D(ue,pt,Yt,re,me,yt,Tt,Mt,se,ge.data):U.texSubImage3D(ue,pt,Yt,re,me,yt,Tt,Mt,se,Pt,ge):S.isDataTexture?U.texSubImage2D(U.TEXTURE_2D,pt,Yt,re,yt,Tt,se,Pt,ge.data):S.isCompressedTexture?U.compressedTexSubImage2D(U.TEXTURE_2D,pt,Yt,re,ge.width,ge.height,se,ge.data):U.texSubImage2D(U.TEXTURE_2D,pt,Yt,re,yt,Tt,se,Pt,ge);U.pixelStorei(U.UNPACK_ROW_LENGTH,Qt),U.pixelStorei(U.UNPACK_IMAGE_HEIGHT,en),U.pixelStorei(U.UNPACK_SKIP_PIXELS,gr),U.pixelStorei(U.UNPACK_SKIP_ROWS,nn),U.pixelStorei(U.UNPACK_SKIP_IMAGES,ss),pt===0&&z.generateMipmaps&&U.generateMipmap(ue),St.unbindTexture()},this.initRenderTarget=function(S){I.get(S).__webglFramebuffer===void 0&&b.setupRenderTarget(S)},this.initTexture=function(S){S.isCubeTexture?b.setTextureCube(S,0):S.isData3DTexture?b.setTexture3D(S,0):S.isDataArrayTexture||S.isCompressedArrayTexture?b.setTexture2DArray(S,0):b.setTexture2D(S,0),St.unbindTexture()},this.resetState=function(){F=0,y=0,M=null,St.reset(),D.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return An}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;let e=this.getContext();e.drawingBufferColorSpace=jt._getDrawingBufferColorSpace(t),e.unpackColorSpace=jt._getUnpackColorSpace()}};var zs=class{constructor(){this.container=document.getElementById("webgl-container"),this.container&&(this.width=window.innerWidth,this.height=window.innerHeight,this.scene=new Es,this.camera=new Vr(-1,1,1,-1,0,1),this.renderer=new jo({alpha:!0}),this.uniforms={uTime:{value:0},uMouse:{value:new te(.5,.5)},uResolution:{value:new te(this.width,this.height)},uColor1:{value:new Jt(16711788)},uColor2:{value:new Jt(4803431)}},this.init())}init(){this.renderer.setSize(this.width,this.height),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,2)),this.container.appendChild(this.renderer.domElement),this.createPlane(),this.addEventListeners(),this.animate()}createPlane(){let t=new Zi(2,2),e=new $e({uniforms:this.uniforms,vertexShader:`
				varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = vec4(position, 1.0);
				}
			`,fragmentShader:`
				uniform float uTime;
				uniform vec2 uMouse;
				uniform vec2 uResolution;
				uniform vec3 uColor1;
				uniform vec3 uColor2;
				varying vec2 vUv;

				// Simplex 2D noise
				vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
				float snoise(vec2 v){
					const vec4 C = vec4(0.211324865405187, 0.366025403784439,
							-0.577350269189626, 0.024390243902439);
					vec2 i  = floor(v + dot(v, C.yy) );
					vec2 x0 = v -   i + dot(i, C.xx);
					vec2 i1;
					i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
					vec4 x12 = x0.xyxy + C.xxzz;
					x12.xy -= i1;
					i = mod(i, 289.0);
					vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
					+ i.x + vec3(0.0, i1.x, 1.0 ));
					vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
					m = m*m ;
					m = m*m ;
					vec3 x = 2.0 * fract(p * C.www) - 1.0;
					vec3 h = abs(x) - 0.5;
					vec3 ox = floor(x + 0.5);
					vec3 a0 = x - ox;
					m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
					vec3 g;
					g.x  = a0.x  * x0.x  + h.x  * x0.y;
					g.yz = a0.yz * x12.xz + h.yz * x12.yw;
					return 130.0 * dot(m, g);
				}

				void main() {
					vec2 st = gl_FragCoord.xy / uResolution.xy;
					float aspect = uResolution.x / uResolution.y;
					st.x *= aspect;
					
					vec2 mouse = uMouse;
					mouse.x *= aspect;

					float dist = distance(st, mouse);
					float noise = snoise(st * 3.0 + uTime * 0.1);
					
					// \u30DE\u30A6\u30B9\u30A4\u30F3\u30BF\u30E9\u30AF\u30B7\u30E7\u30F3
					float interaction = smoothstep(0.5, 0.0, dist) * 0.5;
					
					// \u8272\u306E\u6DF7\u5408
					vec3 color = mix(uColor2, uColor1, noise + interaction);
					
					// \u900F\u660E\u5EA6\u306E\u8ABF\u6574\uFF08\u8996\u8A8D\u6027\u3092\u5411\u4E0A\uFF09
					float alpha = 0.15 + interaction * 0.2;

					gl_FragColor = vec4(color, alpha);
				}
			`,transparent:!0}),n=new ln(t,e);this.scene.add(n)}addEventListeners(){window.addEventListener("resize",this.onResize.bind(this)),window.addEventListener("mousemove",this.onMouseMove.bind(this))}onResize(){this.width=window.innerWidth,this.height=window.innerHeight,this.renderer.setSize(this.width,this.height),this.uniforms.uResolution.value.set(this.width,this.height)}onMouseMove(t){this.uniforms.uMouse.value.set(t.clientX/this.width,1-t.clientY/this.height)}animate(){requestAnimationFrame(this.animate.bind(this)),this.uniforms.uTime.value+=.01,this.renderer.render(this.scene,this.camera)}};var ir=class{constructor(){this.targets=document.querySelectorAll(".js-scroll-trigger"),this.options={root:null,rootMargin:"0px",threshold:.2},this.init()}init(){if(this.targets.length===0)return;let t=new IntersectionObserver(this.callback.bind(this),this.options);this.targets.forEach(e=>{t.observe(e)})}callback(t,e){t.forEach(n=>{n.isIntersecting&&(n.target.classList.add("is-visible"),e.unobserve(n.target))})}};var Vs=class{constructor(){this.cursor=null,this.pos={x:0,y:0},this.mouse={x:0,y:0},this.speed=.1,this.init()}init(){this.cursor=document.createElement("div"),this.cursor.className="c-cursor",document.body.appendChild(this.cursor),document.addEventListener("mousemove",this.onMouseMove.bind(this)),document.querySelectorAll("a, button, .js-cursor-hover").forEach(e=>{e.addEventListener("mouseenter",()=>this.cursor.classList.add("is-hover")),e.addEventListener("mouseleave",()=>this.cursor.classList.remove("is-hover"))}),this.animate()}onMouseMove(t){this.mouse.x=t.clientX,this.mouse.y=t.clientY,this.cursor.classList.contains("is-active")||this.cursor.classList.add("is-active")}animate(){this.pos.x+=(this.mouse.x-this.pos.x)*this.speed,this.pos.y+=(this.mouse.y-this.pos.y)*this.speed,this.cursor.style.transform=`translate3d(${this.pos.x}px, ${this.pos.y}px, 0)`,requestAnimationFrame(this.animate.bind(this))}};var Gl=class{constructor(t){this.el=t,this.chars="!<>-_\\/[]{}\u2014=+*^?#________",this.update=this.update.bind(this)}setText(t){let e=this.el.innerText,n=Math.max(e.length,t.length),i=new Promise(s=>this.resolve=s);this.queue=[];for(let s=0;s<n;s++){let a=e[s]||"",o=t[s]||"",c=Math.floor(Math.random()*15),l=c+Math.floor(Math.random()*15);this.queue.push({from:a,to:o,start:c,end:l})}return cancelAnimationFrame(this.frameRequest),this.frame=0,this.update(),i}update(){let t="",e=0;for(let n=0,i=this.queue.length;n<i;n++){let{from:s,to:a,start:o,end:c,char:l}=this.queue[n];this.frame>=c?(e++,t+=a):this.frame>=o?((!l||Math.random()<.28)&&(l=this.randomChar(),this.queue[n].char=l),t+=`<span class="dud">${l}</span>`):t+=s}this.el.innerHTML=t,e===this.queue.length?this.resolve():(this.frameRequest=requestAnimationFrame(this.update),this.frame++)}randomChar(){return this.chars[Math.floor(Math.random()*this.chars.length)]}},rr=class{constructor(){this.targets=document.querySelectorAll(".js-text-scramble"),this.init()}init(){if(this.targets.length===0)return;let t=new IntersectionObserver(e=>{e.forEach(n=>{if(n.isIntersecting){let i=n.target,s=i.getAttribute("data-text")||i.innerText;new Gl(i).setText(s),t.unobserve(i)}})},{threshold:.5});this.targets.forEach(e=>{e.getAttribute("data-text")||e.setAttribute("data-text",e.innerText),t.observe(e)})}};var ip=vp(Zf(),1);function ri(r){if(r===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return r}function nd(r,t){r.prototype=Object.create(t.prototype),r.prototype.constructor=r,r.__proto__=t}var Qe={autoSleep:120,force3D:"auto",nullTargetWarn:1,units:{lineHeight:""}},$r={duration:.5,overwrite:!1,delay:0},lh,Ie,he,yn=1e8,oe=1/yn,jl=Math.PI*2,Z_=jl/4,$_=0,rd=Math.sqrt,J_=Math.cos,K_=Math.sin,Ce=function(t){return typeof t=="string"},_e=function(t){return typeof t=="function"},ai=function(t){return typeof t=="number"},hc=function(t){return typeof t>"u"},Gn=function(t){return typeof t=="object"},je=function(t){return t!==!1},hh=function(){return typeof window<"u"},ec=function(t){return _e(t)||Ce(t)},sd=typeof ArrayBuffer=="function"&&ArrayBuffer.isView||function(){},Fe=Array.isArray,Ql=/(?:-?\.?\d|\.)+/gi,uh=/[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,cr=/[-+=.]*\d+[.e-]*\d*[a-z%]*/g,Xl=/[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,fh=/[+-]=-?[.\d]+/,ad=/[^,'"\[\]\s]+/gi,j_=/^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i,de,zn,th,dh,fn={},sc={},od,cd=function(t){return(sc=Jr(t,fn))&&Oe},uc=function(t,e){return console.warn("Invalid property",t,"set to",e,"Missing plugin? gsap.registerPlugin()")},Ys=function(t,e){return!e&&console.warn(t)},ld=function(t,e){return t&&(fn[t]=e)&&sc&&(sc[t]=e)||fn},Zs=function(){return 0},Q_={suppressEvents:!0,isStart:!0,kill:!1},nc={suppressEvents:!0,kill:!1},tv={suppressEvents:!0},ph={},Ti=[],eh={},hd,Je={},ql={},$f=30,ic=[],mh="",gh=function(t){var e=t[0],n,i;if(Gn(e)||_e(e)||(t=[t]),!(n=(e._gsap||{}).harness)){for(i=ic.length;i--&&!ic[i].targetTest(e););n=ic[i]}for(i=t.length;i--;)t[i]&&(t[i]._gsap||(t[i]._gsap=new yh(t[i],n)))||t.splice(i,1);return t},Ei=function(t){return t._gsap||gh(bn(t))[0]._gsap},xh=function(t,e,n){return(n=t[e])&&_e(n)?t[e]():hc(n)&&t.getAttribute&&t.getAttribute(e)||n},ze=function(t,e){return(t=t.split(",")).forEach(e)||t},ve=function(t){return Math.round(t*1e5)/1e5||0},Se=function(t){return Math.round(t*1e7)/1e7||0},lr=function(t,e){var n=e.charAt(0),i=parseFloat(e.substr(2));return t=parseFloat(t),n==="+"?t+i:n==="-"?t-i:n==="*"?t*i:t/i},ev=function(t,e){for(var n=e.length,i=0;t.indexOf(e[i])<0&&++i<n;);return i<n},ac=function(){var t=Ti.length,e=Ti.slice(0),n,i;for(eh={},Ti.length=0,n=0;n<t;n++)i=e[n],i&&i._lazy&&(i.render(i._lazy[0],i._lazy[1],!0)._lazy=0)},_h=function(t){return!!(t._initted||t._startAt||t.add)},ud=function(t,e,n,i){Ti.length&&!Ie&&ac(),t.render(e,n,i||!!(Ie&&e<0&&_h(t))),Ti.length&&!Ie&&ac()},fd=function(t){var e=parseFloat(t);return(e||e===0)&&(t+"").match(ad).length<2?e:Ce(t)?t.trim():t},dd=function(t){return t},dn=function(t,e){for(var n in e)n in t||(t[n]=e[n]);return t},nv=function(t){return function(e,n){for(var i in n)i in e||i==="duration"&&t||i==="ease"||(e[i]=n[i])}},Jr=function(t,e){for(var n in e)t[n]=e[n];return t},Jf=function r(t,e){for(var n in e)n!=="__proto__"&&n!=="constructor"&&n!=="prototype"&&(t[n]=Gn(e[n])?r(t[n]||(t[n]={}),e[n]):e[n]);return t},oc=function(t,e){var n={},i;for(i in t)i in e||(n[i]=t[i]);return n},Ws=function(t){var e=t.parent||de,n=t.keyframes?nv(Fe(t.keyframes)):dn;if(je(t.inherit))for(;e;)n(t,e.vars.defaults),e=e.parent||e._dp;return t},iv=function(t,e){for(var n=t.length,i=n===e.length;i&&n--&&t[n]===e[n];);return n<0},pd=function(t,e,n,i,s){n===void 0&&(n="_first"),i===void 0&&(i="_last");var a=t[i],o;if(s)for(o=e[s];a&&a[s]>o;)a=a._prev;return a?(e._next=a._next,a._next=e):(e._next=t[n],t[n]=e),e._next?e._next._prev=e:t[i]=e,e._prev=a,e.parent=e._dp=t,e},fc=function(t,e,n,i){n===void 0&&(n="_first"),i===void 0&&(i="_last");var s=e._prev,a=e._next;s?s._next=a:t[n]===e&&(t[n]=a),a?a._prev=s:t[i]===e&&(t[i]=s),e._next=e._prev=e.parent=null},Ai=function(t,e){t.parent&&(!e||t.parent.autoRemoveChildren)&&t.parent.remove&&t.parent.remove(t),t._act=0},sr=function(t,e){if(t&&(!e||e._end>t._dur||e._start<0))for(var n=t;n;)n._dirty=1,n=n.parent;return t},rv=function(t){for(var e=t.parent;e&&e.parent;)e._dirty=1,e.totalDuration(),e=e.parent;return t},nh=function(t,e,n,i){return t._startAt&&(Ie?t._startAt.revert(nc):t.vars.immediateRender&&!t.vars.autoRevert||t._startAt.render(e,!0,i))},sv=function r(t){return!t||t._ts&&r(t.parent)},Kf=function(t){return t._repeat?Kr(t._tTime,t=t.duration()+t._rDelay)*t:0},Kr=function(t,e){var n=Math.floor(t=Se(t/e));return t&&n===t?n-1:n},cc=function(t,e){return(t-e._start)*e._ts+(e._ts>=0?0:e._dirty?e.totalDuration():e._tDur)},dc=function(t){return t._end=Se(t._start+(t._tDur/Math.abs(t._ts||t._rts||oe)||0))},pc=function(t,e){var n=t._dp;return n&&n.smoothChildTiming&&t._ts&&(t._start=Se(n._time-(t._ts>0?e/t._ts:((t._dirty?t.totalDuration():t._tDur)-e)/-t._ts)),dc(t),n._dirty||sr(n,t)),t},md=function(t,e){var n;if((e._time||!e._dur&&e._initted||e._start<t._time&&(e._dur||!e.add))&&(n=cc(t.rawTime(),e),(!e._dur||Ks(0,e.totalDuration(),n)-e._tTime>oe)&&e.render(n,!0)),sr(t,e)._dp&&t._initted&&t._time>=t._dur&&t._ts){if(t._dur<t.duration())for(n=t;n._dp;)n.rawTime()>=0&&n.totalTime(n._tTime),n=n._dp;t._zTime=-oe}},Vn=function(t,e,n,i){return e.parent&&Ai(e),e._start=Se((ai(n)?n:n||t!==de?vn(t,n,e):t._time)+e._delay),e._end=Se(e._start+(e.totalDuration()/Math.abs(e.timeScale())||0)),pd(t,e,"_first","_last",t._sort?"_start":0),ih(e)||(t._recent=e),i||md(t,e),t._ts<0&&pc(t,t._tTime),t},gd=function(t,e){return(fn.ScrollTrigger||uc("scrollTrigger",e))&&fn.ScrollTrigger.create(e,t)},xd=function(t,e,n,i,s){if(Sh(t,e,s),!t._initted)return 1;if(!n&&t._pt&&!Ie&&(t._dur&&t.vars.lazy!==!1||!t._dur&&t.vars.lazy)&&hd!==Ke.frame)return Ti.push(t),t._lazy=[s,i],1},av=function r(t){var e=t.parent;return e&&e._ts&&e._initted&&!e._lock&&(e.rawTime()<0||r(e))},ih=function(t){var e=t.data;return e==="isFromStart"||e==="isStart"},ov=function(t,e,n,i){var s=t.ratio,a=e<0||!e&&(!t._start&&av(t)&&!(!t._initted&&ih(t))||(t._ts<0||t._dp._ts<0)&&!ih(t))?0:1,o=t._rDelay,c=0,l,h,u;if(o&&t._repeat&&(c=Ks(0,t._tDur,e),h=Kr(c,o),t._yoyo&&h&1&&(a=1-a),h!==Kr(t._tTime,o)&&(s=1-a,t.vars.repeatRefresh&&t._initted&&t.invalidate())),a!==s||Ie||i||t._zTime===oe||!e&&t._zTime){if(!t._initted&&xd(t,e,i,n,c))return;for(u=t._zTime,t._zTime=e||(n?oe:0),n||(n=e&&!u),t.ratio=a,t._from&&(a=1-a),t._time=0,t._tTime=c,l=t._pt;l;)l.r(a,l.d),l=l._next;e<0&&nh(t,e,n,!0),t._onUpdate&&!n&&un(t,"onUpdate"),c&&t._repeat&&!n&&t.parent&&un(t,"onRepeat"),(e>=t._tDur||e<0)&&t.ratio===a&&(a&&Ai(t,1),!n&&!Ie&&(un(t,a?"onComplete":"onReverseComplete",!0),t._prom&&t._prom()))}else t._zTime||(t._zTime=e)},cv=function(t,e,n){var i;if(n>e)for(i=t._first;i&&i._start<=n;){if(i.data==="isPause"&&i._start>e)return i;i=i._next}else for(i=t._last;i&&i._start>=n;){if(i.data==="isPause"&&i._start<e)return i;i=i._prev}},jr=function(t,e,n,i){var s=t._repeat,a=Se(e)||0,o=t._tTime/t._tDur;return o&&!i&&(t._time*=a/t._dur),t._dur=a,t._tDur=s?s<0?1e10:Se(a*(s+1)+t._rDelay*s):a,o>0&&!i&&pc(t,t._tTime=t._tDur*o),t.parent&&dc(t),n||sr(t.parent,t),t},jf=function(t){return t instanceof Pe?sr(t):jr(t,t._dur)},lv={_start:0,endTime:Zs,totalDuration:Zs},vn=function r(t,e,n){var i=t.labels,s=t._recent||lv,a=t.duration()>=yn?s.endTime(!1):t._dur,o,c,l;return Ce(e)&&(isNaN(e)||e in i)?(c=e.charAt(0),l=e.substr(-1)==="%",o=e.indexOf("="),c==="<"||c===">"?(o>=0&&(e=e.replace(/=/,"")),(c==="<"?s._start:s.endTime(s._repeat>=0))+(parseFloat(e.substr(1))||0)*(l?(o<0?s:n).totalDuration()/100:1)):o<0?(e in i||(i[e]=a),i[e]):(c=parseFloat(e.charAt(o-1)+e.substr(o+1)),l&&n&&(c=c/100*(Fe(n)?n[0]:n).totalDuration()),o>1?r(t,e.substr(0,o-1),n)+c:a+c)):e==null?a:+e},Xs=function(t,e,n){var i=ai(e[1]),s=(i?2:1)+(t<2?0:1),a=e[s],o,c;if(i&&(a.duration=e[1]),a.parent=n,t){for(o=a,c=n;c&&!("immediateRender"in o);)o=c.vars.defaults||{},c=je(c.vars.inherit)&&c.parent;a.immediateRender=je(o.immediateRender),t<2?a.runBackwards=1:a.startAt=e[s-1]}return new be(e[0],a,e[s+1])},Ci=function(t,e){return t||t===0?e(t):e},Ks=function(t,e,n){return n<t?t:n>e?e:n},Le=function(t,e){return!Ce(t)||!(e=j_.exec(t))?"":e[1]},hv=function(t,e,n){return Ci(n,function(i){return Ks(t,e,i)})},rh=[].slice,_d=function(t,e){return t&&Gn(t)&&"length"in t&&(!e&&!t.length||t.length-1 in t&&Gn(t[0]))&&!t.nodeType&&t!==zn},uv=function(t,e,n){return n===void 0&&(n=[]),t.forEach(function(i){var s;return Ce(i)&&!e||_d(i,1)?(s=n).push.apply(s,bn(i)):n.push(i)})||n},bn=function(t,e,n){return he&&!e&&he.selector?he.selector(t):Ce(t)&&!n&&(th||!Qr())?rh.call((e||dh).querySelectorAll(t),0):Fe(t)?uv(t,n):_d(t)?rh.call(t,0):t?[t]:[]},sh=function(t){return t=bn(t)[0]||Ys("Invalid scope")||{},function(e){var n=t.current||t.nativeElement||t;return bn(e,n.querySelectorAll?n:n===t?Ys("Invalid scope")||dh.createElement("div"):t)}},vd=function(t){return t.sort(function(){return .5-Math.random()})},yd=function(t){if(_e(t))return t;var e=Gn(t)?t:{each:t},n=ar(e.ease),i=e.from||0,s=parseFloat(e.base)||0,a={},o=i>0&&i<1,c=isNaN(i)||o,l=e.axis,h=i,u=i;return Ce(i)?h=u={center:.5,edges:.5,end:1}[i]||0:!o&&c&&(h=i[0],u=i[1]),function(f,d,v){var _=(v||e).length,g=a[_],m,T,w,A,C,E,P,F,y;if(!g){if(y=e.grid==="auto"?0:(e.grid||[1,yn])[1],!y){for(P=-yn;P<(P=v[y++].getBoundingClientRect().left)&&y<_;);y<_&&y--}for(g=a[_]=[],m=c?Math.min(y,_)*h-.5:i%y,T=y===yn?0:c?_*u/y-.5:i/y|0,P=0,F=yn,E=0;E<_;E++)w=E%y-m,A=T-(E/y|0),g[E]=C=l?Math.abs(l==="y"?A:w):rd(w*w+A*A),C>P&&(P=C),C<F&&(F=C);i==="random"&&vd(g),g.max=P-F,g.min=F,g.v=_=(parseFloat(e.amount)||parseFloat(e.each)*(y>_?_-1:l?l==="y"?_/y:y:Math.max(y,_/y))||0)*(i==="edges"?-1:1),g.b=_<0?s-_:s,g.u=Le(e.amount||e.each)||0,n=n&&_<0?Rd(n):n}return _=(g[f]-g.min)/g.max||0,Se(g.b+(n?n(_):_)*g.v)+g.u}},ah=function(t){var e=Math.pow(10,((t+"").split(".")[1]||"").length);return function(n){var i=Se(Math.round(parseFloat(n)/t)*t*e);return(i-i%1)/e+(ai(n)?0:Le(n))}},bd=function(t,e){var n=Fe(t),i,s;return!n&&Gn(t)&&(i=n=t.radius||yn,t.values?(t=bn(t.values),(s=!ai(t[0]))&&(i*=i)):t=ah(t.increment)),Ci(e,n?_e(t)?function(a){return s=t(a),Math.abs(s-a)<=i?s:a}:function(a){for(var o=parseFloat(s?a.x:a),c=parseFloat(s?a.y:0),l=yn,h=0,u=t.length,f,d;u--;)s?(f=t[u].x-o,d=t[u].y-c,f=f*f+d*d):f=Math.abs(t[u]-o),f<l&&(l=f,h=u);return h=!i||l<=i?t[h]:a,s||h===a||ai(a)?h:h+Le(a)}:ah(t))},Md=function(t,e,n,i){return Ci(Fe(t)?!e:n===!0?!!(n=0):!i,function(){return Fe(t)?t[~~(Math.random()*t.length)]:(n=n||1e-5)&&(i=n<1?Math.pow(10,(n+"").length-2):1)&&Math.floor(Math.round((t-n/2+Math.random()*(e-t+n*.99))/n)*n*i)/i})},fv=function(){for(var t=arguments.length,e=new Array(t),n=0;n<t;n++)e[n]=arguments[n];return function(i){return e.reduce(function(s,a){return a(s)},i)}},dv=function(t,e){return function(n){return t(parseFloat(n))+(e||Le(n))}},pv=function(t,e,n){return wd(t,e,0,1,n)},Sd=function(t,e,n){return Ci(n,function(i){return t[~~e(i)]})},mv=function r(t,e,n){var i=e-t;return Fe(t)?Sd(t,r(0,t.length),e):Ci(n,function(s){return(i+(s-t)%i)%i+t})},gv=function r(t,e,n){var i=e-t,s=i*2;return Fe(t)?Sd(t,r(0,t.length-1),e):Ci(n,function(a){return a=(s+(a-t)%s)%s||0,t+(a>i?s-a:a)})},ts=function(t){for(var e=0,n="",i,s,a,o;~(i=t.indexOf("random(",e));)a=t.indexOf(")",i),o=t.charAt(i+7)==="[",s=t.substr(i+7,a-i-7).match(o?ad:Ql),n+=t.substr(e,i-e)+Md(o?s:+s[0],o?0:+s[1],+s[2]||1e-5),e=a+1;return n+t.substr(e,t.length-e)},wd=function(t,e,n,i,s){var a=e-t,o=i-n;return Ci(s,function(c){return n+((c-t)/a*o||0)})},xv=function r(t,e,n,i){var s=isNaN(t+e)?0:function(d){return(1-d)*t+d*e};if(!s){var a=Ce(t),o={},c,l,h,u,f;if(n===!0&&(i=1)&&(n=null),a)t={p:t},e={p:e};else if(Fe(t)&&!Fe(e)){for(h=[],u=t.length,f=u-2,l=1;l<u;l++)h.push(r(t[l-1],t[l]));u--,s=function(v){v*=u;var _=Math.min(f,~~v);return h[_](v-_)},n=e}else i||(t=Jr(Fe(t)?[]:{},t));if(!h){for(c in e)bh.call(o,t,c,"get",e[c]);s=function(v){return Eh(v,o)||(a?t.p:t)}}}return Ci(n,s)},Qf=function(t,e,n){var i=t.labels,s=yn,a,o,c;for(a in i)o=i[a]-e,o<0==!!n&&o&&s>(o=Math.abs(o))&&(c=a,s=o);return c},un=function(t,e,n){var i=t.vars,s=i[e],a=he,o=t._ctx,c,l,h;if(s)return c=i[e+"Params"],l=i.callbackScope||t,n&&Ti.length&&ac(),o&&(he=o),h=c?s.apply(l,c):s.call(l),he=a,h},Gs=function(t){return Ai(t),t.scrollTrigger&&t.scrollTrigger.kill(!!Ie),t.progress()<1&&un(t,"onInterrupt"),t},Zr,Td=[],Ed=function(t){if(t)if(t=!t.name&&t.default||t,hh()||t.headless){var e=t.name,n=_e(t),i=e&&!n&&t.init?function(){this._props=[]}:t,s={init:Zs,render:Eh,add:bh,kill:Dv,modifier:Lv,rawVars:0},a={targetTest:0,get:0,getSetter:mc,aliases:{},register:0};if(Qr(),t!==i){if(Je[e])return;dn(i,dn(oc(t,s),a)),Jr(i.prototype,Jr(s,oc(t,a))),Je[i.prop=e]=i,t.targetTest&&(ic.push(i),ph[e]=1),e=(e==="css"?"CSS":e.charAt(0).toUpperCase()+e.substr(1))+"Plugin"}ld(e,i),t.register&&t.register(Oe,i,Ve)}else Td.push(t)},ae=255,Hs={aqua:[0,ae,ae],lime:[0,ae,0],silver:[192,192,192],black:[0,0,0],maroon:[128,0,0],teal:[0,128,128],blue:[0,0,ae],navy:[0,0,128],white:[ae,ae,ae],olive:[128,128,0],yellow:[ae,ae,0],orange:[ae,165,0],gray:[128,128,128],purple:[128,0,128],green:[0,128,0],red:[ae,0,0],pink:[ae,192,203],cyan:[0,ae,ae],transparent:[ae,ae,ae,0]},Yl=function(t,e,n){return t+=t<0?1:t>1?-1:0,(t*6<1?e+(n-e)*t*6:t<.5?n:t*3<2?e+(n-e)*(2/3-t)*6:e)*ae+.5|0},Ad=function(t,e,n){var i=t?ai(t)?[t>>16,t>>8&ae,t&ae]:0:Hs.black,s,a,o,c,l,h,u,f,d,v;if(!i){if(t.substr(-1)===","&&(t=t.substr(0,t.length-1)),Hs[t])i=Hs[t];else if(t.charAt(0)==="#"){if(t.length<6&&(s=t.charAt(1),a=t.charAt(2),o=t.charAt(3),t="#"+s+s+a+a+o+o+(t.length===5?t.charAt(4)+t.charAt(4):"")),t.length===9)return i=parseInt(t.substr(1,6),16),[i>>16,i>>8&ae,i&ae,parseInt(t.substr(7),16)/255];t=parseInt(t.substr(1),16),i=[t>>16,t>>8&ae,t&ae]}else if(t.substr(0,3)==="hsl"){if(i=v=t.match(Ql),!e)c=+i[0]%360/360,l=+i[1]/100,h=+i[2]/100,a=h<=.5?h*(l+1):h+l-h*l,s=h*2-a,i.length>3&&(i[3]*=1),i[0]=Yl(c+1/3,s,a),i[1]=Yl(c,s,a),i[2]=Yl(c-1/3,s,a);else if(~t.indexOf("="))return i=t.match(uh),n&&i.length<4&&(i[3]=1),i}else i=t.match(Ql)||Hs.transparent;i=i.map(Number)}return e&&!v&&(s=i[0]/ae,a=i[1]/ae,o=i[2]/ae,u=Math.max(s,a,o),f=Math.min(s,a,o),h=(u+f)/2,u===f?c=l=0:(d=u-f,l=h>.5?d/(2-u-f):d/(u+f),c=u===s?(a-o)/d+(a<o?6:0):u===a?(o-s)/d+2:(s-a)/d+4,c*=60),i[0]=~~(c+.5),i[1]=~~(l*100+.5),i[2]=~~(h*100+.5)),n&&i.length<4&&(i[3]=1),i},Cd=function(t){var e=[],n=[],i=-1;return t.split(si).forEach(function(s){var a=s.match(cr)||[];e.push.apply(e,a),n.push(i+=a.length+1)}),e.c=n,e},td=function(t,e,n){var i="",s=(t+i).match(si),a=e?"hsla(":"rgba(",o=0,c,l,h,u;if(!s)return t;if(s=s.map(function(f){return(f=Ad(f,e,1))&&a+(e?f[0]+","+f[1]+"%,"+f[2]+"%,"+f[3]:f.join(","))+")"}),n&&(h=Cd(t),c=n.c,c.join(i)!==h.c.join(i)))for(l=t.replace(si,"1").split(cr),u=l.length-1;o<u;o++)i+=l[o]+(~c.indexOf(o)?s.shift()||a+"0,0,0,0)":(h.length?h:s.length?s:n).shift());if(!l)for(l=t.split(si),u=l.length-1;o<u;o++)i+=l[o]+s[o];return i+l[u]},si=(function(){var r="(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b",t;for(t in Hs)r+="|"+t+"\\b";return new RegExp(r+")","gi")})(),_v=/hsl[a]?\(/,vh=function(t){var e=t.join(" "),n;if(si.lastIndex=0,si.test(e))return n=_v.test(e),t[1]=td(t[1],n),t[0]=td(t[0],n,Cd(t[1])),!0},$s,Ke=(function(){var r=Date.now,t=500,e=33,n=r(),i=n,s=1e3/240,a=s,o=[],c,l,h,u,f,d,v=function _(g){var m=r()-i,T=g===!0,w,A,C,E;if((m>t||m<0)&&(n+=m-e),i+=m,C=i-n,w=C-a,(w>0||T)&&(E=++u.frame,f=C-u.time*1e3,u.time=C=C/1e3,a+=w+(w>=s?4:s-w),A=1),T||(c=l(_)),A)for(d=0;d<o.length;d++)o[d](C,f,E,g)};return u={time:0,frame:0,tick:function(){v(!0)},deltaRatio:function(g){return f/(1e3/(g||60))},wake:function(){od&&(!th&&hh()&&(zn=th=window,dh=zn.document||{},fn.gsap=Oe,(zn.gsapVersions||(zn.gsapVersions=[])).push(Oe.version),cd(sc||zn.GreenSockGlobals||!zn.gsap&&zn||{}),Td.forEach(Ed)),h=typeof requestAnimationFrame<"u"&&requestAnimationFrame,c&&u.sleep(),l=h||function(g){return setTimeout(g,a-u.time*1e3+1|0)},$s=1,v(2))},sleep:function(){(h?cancelAnimationFrame:clearTimeout)(c),$s=0,l=Zs},lagSmoothing:function(g,m){t=g||1/0,e=Math.min(m||33,t)},fps:function(g){s=1e3/(g||240),a=u.time*1e3+s},add:function(g,m,T){var w=m?function(A,C,E,P){g(A,C,E,P),u.remove(w)}:g;return u.remove(g),o[T?"unshift":"push"](w),Qr(),w},remove:function(g,m){~(m=o.indexOf(g))&&o.splice(m,1)&&d>=m&&d--},_listeners:o},u})(),Qr=function(){return!$s&&Ke.wake()},$t={},vv=/^[\d.\-M][\d.\-,\s]/,yv=/["']/g,bv=function(t){for(var e={},n=t.substr(1,t.length-3).split(":"),i=n[0],s=1,a=n.length,o,c,l;s<a;s++)c=n[s],o=s!==a-1?c.lastIndexOf(","):c.length,l=c.substr(0,o),e[i]=isNaN(l)?l.replace(yv,"").trim():+l,i=c.substr(o+1).trim();return e},Mv=function(t){var e=t.indexOf("(")+1,n=t.indexOf(")"),i=t.indexOf("(",e);return t.substring(e,~i&&i<n?t.indexOf(")",n+1):n)},Sv=function(t){var e=(t+"").split("("),n=$t[e[0]];return n&&e.length>1&&n.config?n.config.apply(null,~t.indexOf("{")?[bv(e[1])]:Mv(t).split(",").map(fd)):$t._CE&&vv.test(t)?$t._CE("",t):n},Rd=function(t){return function(e){return 1-t(1-e)}},Pd=function r(t,e){for(var n=t._first,i;n;)n instanceof Pe?r(n,e):n.vars.yoyoEase&&(!n._yoyo||!n._repeat)&&n._yoyo!==e&&(n.timeline?r(n.timeline,e):(i=n._ease,n._ease=n._yEase,n._yEase=i,n._yoyo=e)),n=n._next},ar=function(t,e){return t&&(_e(t)?t:$t[t]||Sv(t))||e},hr=function(t,e,n,i){n===void 0&&(n=function(c){return 1-e(1-c)}),i===void 0&&(i=function(c){return c<.5?e(c*2)/2:1-e((1-c)*2)/2});var s={easeIn:e,easeOut:n,easeInOut:i},a;return ze(t,function(o){$t[o]=fn[o]=s,$t[a=o.toLowerCase()]=n;for(var c in s)$t[a+(c==="easeIn"?".in":c==="easeOut"?".out":".inOut")]=$t[o+"."+c]=s[c]}),s},Id=function(t){return function(e){return e<.5?(1-t(1-e*2))/2:.5+t((e-.5)*2)/2}},Zl=function r(t,e,n){var i=e>=1?e:1,s=(n||(t?.3:.45))/(e<1?e:1),a=s/jl*(Math.asin(1/i)||0),o=function(h){return h===1?1:i*Math.pow(2,-10*h)*K_((h-a)*s)+1},c=t==="out"?o:t==="in"?function(l){return 1-o(1-l)}:Id(o);return s=jl/s,c.config=function(l,h){return r(t,l,h)},c},$l=function r(t,e){e===void 0&&(e=1.70158);var n=function(a){return a?--a*a*((e+1)*a+e)+1:0},i=t==="out"?n:t==="in"?function(s){return 1-n(1-s)}:Id(n);return i.config=function(s){return r(t,s)},i};ze("Linear,Quad,Cubic,Quart,Quint,Strong",function(r,t){var e=t<5?t+1:t;hr(r+",Power"+(e-1),t?function(n){return Math.pow(n,e)}:function(n){return n},function(n){return 1-Math.pow(1-n,e)},function(n){return n<.5?Math.pow(n*2,e)/2:1-Math.pow((1-n)*2,e)/2})});$t.Linear.easeNone=$t.none=$t.Linear.easeIn;hr("Elastic",Zl("in"),Zl("out"),Zl());(function(r,t){var e=1/t,n=2*e,i=2.5*e,s=function(o){return o<e?r*o*o:o<n?r*Math.pow(o-1.5/t,2)+.75:o<i?r*(o-=2.25/t)*o+.9375:r*Math.pow(o-2.625/t,2)+.984375};hr("Bounce",function(a){return 1-s(1-a)},s)})(7.5625,2.75);hr("Expo",function(r){return Math.pow(2,10*(r-1))*r+r*r*r*r*r*r*(1-r)});hr("Circ",function(r){return-(rd(1-r*r)-1)});hr("Sine",function(r){return r===1?1:-J_(r*Z_)+1});hr("Back",$l("in"),$l("out"),$l());$t.SteppedEase=$t.steps=fn.SteppedEase={config:function(t,e){t===void 0&&(t=1);var n=1/t,i=t+(e?0:1),s=e?1:0,a=1-oe;return function(o){return((i*Ks(0,a,o)|0)+s)*n}}};$r.ease=$t["quad.out"];ze("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt",function(r){return mh+=r+","+r+"Params,"});var yh=function(t,e){this.id=$_++,t._gsap=this,this.target=t,this.harness=e,this.get=e?e.get:xh,this.set=e?e.getSetter:mc},Js=(function(){function r(e){this.vars=e,this._delay=+e.delay||0,(this._repeat=e.repeat===1/0?-2:e.repeat||0)&&(this._rDelay=e.repeatDelay||0,this._yoyo=!!e.yoyo||!!e.yoyoEase),this._ts=1,jr(this,+e.duration,1,1),this.data=e.data,he&&(this._ctx=he,he.data.push(this)),$s||Ke.wake()}var t=r.prototype;return t.delay=function(n){return n||n===0?(this.parent&&this.parent.smoothChildTiming&&this.startTime(this._start+n-this._delay),this._delay=n,this):this._delay},t.duration=function(n){return arguments.length?this.totalDuration(this._repeat>0?n+(n+this._rDelay)*this._repeat:n):this.totalDuration()&&this._dur},t.totalDuration=function(n){return arguments.length?(this._dirty=0,jr(this,this._repeat<0?n:(n-this._repeat*this._rDelay)/(this._repeat+1))):this._tDur},t.totalTime=function(n,i){if(Qr(),!arguments.length)return this._tTime;var s=this._dp;if(s&&s.smoothChildTiming&&this._ts){for(pc(this,n),!s._dp||s.parent||md(s,this);s&&s.parent;)s.parent._time!==s._start+(s._ts>=0?s._tTime/s._ts:(s.totalDuration()-s._tTime)/-s._ts)&&s.totalTime(s._tTime,!0),s=s.parent;!this.parent&&this._dp.autoRemoveChildren&&(this._ts>0&&n<this._tDur||this._ts<0&&n>0||!this._tDur&&!n)&&Vn(this._dp,this,this._start-this._delay)}return(this._tTime!==n||!this._dur&&!i||this._initted&&Math.abs(this._zTime)===oe||!n&&!this._initted&&(this.add||this._ptLookup))&&(this._ts||(this._pTime=n),ud(this,n,i)),this},t.time=function(n,i){return arguments.length?this.totalTime(Math.min(this.totalDuration(),n+Kf(this))%(this._dur+this._rDelay)||(n?this._dur:0),i):this._time},t.totalProgress=function(n,i){return arguments.length?this.totalTime(this.totalDuration()*n,i):this.totalDuration()?Math.min(1,this._tTime/this._tDur):this.rawTime()>=0&&this._initted?1:0},t.progress=function(n,i){return arguments.length?this.totalTime(this.duration()*(this._yoyo&&!(this.iteration()&1)?1-n:n)+Kf(this),i):this.duration()?Math.min(1,this._time/this._dur):this.rawTime()>0?1:0},t.iteration=function(n,i){var s=this.duration()+this._rDelay;return arguments.length?this.totalTime(this._time+(n-1)*s,i):this._repeat?Kr(this._tTime,s)+1:1},t.timeScale=function(n,i){if(!arguments.length)return this._rts===-oe?0:this._rts;if(this._rts===n)return this;var s=this.parent&&this._ts?cc(this.parent._time,this):this._tTime;return this._rts=+n||0,this._ts=this._ps||n===-oe?0:this._rts,this.totalTime(Ks(-Math.abs(this._delay),this.totalDuration(),s),i!==!1),dc(this),rv(this)},t.paused=function(n){return arguments.length?(this._ps!==n&&(this._ps=n,n?(this._pTime=this._tTime||Math.max(-this._delay,this.rawTime()),this._ts=this._act=0):(Qr(),this._ts=this._rts,this.totalTime(this.parent&&!this.parent.smoothChildTiming?this.rawTime():this._tTime||this._pTime,this.progress()===1&&Math.abs(this._zTime)!==oe&&(this._tTime-=oe)))),this):this._ps},t.startTime=function(n){if(arguments.length){this._start=n;var i=this.parent||this._dp;return i&&(i._sort||!this.parent)&&Vn(i,this,n-this._delay),this}return this._start},t.endTime=function(n){return this._start+(je(n)?this.totalDuration():this.duration())/Math.abs(this._ts||1)},t.rawTime=function(n){var i=this.parent||this._dp;return i?n&&(!this._ts||this._repeat&&this._time&&this.totalProgress()<1)?this._tTime%(this._dur+this._rDelay):this._ts?cc(i.rawTime(n),this):this._tTime:this._tTime},t.revert=function(n){n===void 0&&(n=tv);var i=Ie;return Ie=n,_h(this)&&(this.timeline&&this.timeline.revert(n),this.totalTime(-.01,n.suppressEvents)),this.data!=="nested"&&n.kill!==!1&&this.kill(),Ie=i,this},t.globalTime=function(n){for(var i=this,s=arguments.length?n:i.rawTime();i;)s=i._start+s/(Math.abs(i._ts)||1),i=i._dp;return!this.parent&&this._sat?this._sat.globalTime(n):s},t.repeat=function(n){return arguments.length?(this._repeat=n===1/0?-2:n,jf(this)):this._repeat===-2?1/0:this._repeat},t.repeatDelay=function(n){if(arguments.length){var i=this._time;return this._rDelay=n,jf(this),i?this.time(i):this}return this._rDelay},t.yoyo=function(n){return arguments.length?(this._yoyo=n,this):this._yoyo},t.seek=function(n,i){return this.totalTime(vn(this,n),je(i))},t.restart=function(n,i){return this.play().totalTime(n?-this._delay:0,je(i)),this._dur||(this._zTime=-oe),this},t.play=function(n,i){return n!=null&&this.seek(n,i),this.reversed(!1).paused(!1)},t.reverse=function(n,i){return n!=null&&this.seek(n||this.totalDuration(),i),this.reversed(!0).paused(!1)},t.pause=function(n,i){return n!=null&&this.seek(n,i),this.paused(!0)},t.resume=function(){return this.paused(!1)},t.reversed=function(n){return arguments.length?(!!n!==this.reversed()&&this.timeScale(-this._rts||(n?-oe:0)),this):this._rts<0},t.invalidate=function(){return this._initted=this._act=0,this._zTime=-oe,this},t.isActive=function(){var n=this.parent||this._dp,i=this._start,s;return!!(!n||this._ts&&this._initted&&n.isActive()&&(s=n.rawTime(!0))>=i&&s<this.endTime(!0)-oe)},t.eventCallback=function(n,i,s){var a=this.vars;return arguments.length>1?(i?(a[n]=i,s&&(a[n+"Params"]=s),n==="onUpdate"&&(this._onUpdate=i)):delete a[n],this):a[n]},t.then=function(n){var i=this;return new Promise(function(s){var a=_e(n)?n:dd,o=function(){var l=i.then;i.then=null,_e(a)&&(a=a(i))&&(a.then||a===i)&&(i.then=l),s(a),i.then=l};i._initted&&i.totalProgress()===1&&i._ts>=0||!i._tTime&&i._ts<0?o():i._prom=o})},t.kill=function(){Gs(this)},r})();dn(Js.prototype,{_time:0,_start:0,_end:0,_tTime:0,_tDur:0,_dirty:0,_repeat:0,_yoyo:!1,parent:null,_initted:!1,_rDelay:0,_ts:1,_dp:0,ratio:0,_zTime:-oe,_prom:0,_ps:!1,_rts:1});var Pe=(function(r){nd(t,r);function t(n,i){var s;return n===void 0&&(n={}),s=r.call(this,n)||this,s.labels={},s.smoothChildTiming=!!n.smoothChildTiming,s.autoRemoveChildren=!!n.autoRemoveChildren,s._sort=je(n.sortChildren),de&&Vn(n.parent||de,ri(s),i),n.reversed&&s.reverse(),n.paused&&s.paused(!0),n.scrollTrigger&&gd(ri(s),n.scrollTrigger),s}var e=t.prototype;return e.to=function(i,s,a){return Xs(0,arguments,this),this},e.from=function(i,s,a){return Xs(1,arguments,this),this},e.fromTo=function(i,s,a,o){return Xs(2,arguments,this),this},e.set=function(i,s,a){return s.duration=0,s.parent=this,Ws(s).repeatDelay||(s.repeat=0),s.immediateRender=!!s.immediateRender,new be(i,s,vn(this,a),1),this},e.call=function(i,s,a){return Vn(this,be.delayedCall(0,i,s),a)},e.staggerTo=function(i,s,a,o,c,l,h){return a.duration=s,a.stagger=a.stagger||o,a.onComplete=l,a.onCompleteParams=h,a.parent=this,new be(i,a,vn(this,c)),this},e.staggerFrom=function(i,s,a,o,c,l,h){return a.runBackwards=1,Ws(a).immediateRender=je(a.immediateRender),this.staggerTo(i,s,a,o,c,l,h)},e.staggerFromTo=function(i,s,a,o,c,l,h,u){return o.startAt=a,Ws(o).immediateRender=je(o.immediateRender),this.staggerTo(i,s,o,c,l,h,u)},e.render=function(i,s,a){var o=this._time,c=this._dirty?this.totalDuration():this._tDur,l=this._dur,h=i<=0?0:Se(i),u=this._zTime<0!=i<0&&(this._initted||!l),f,d,v,_,g,m,T,w,A,C,E,P;if(this!==de&&h>c&&i>=0&&(h=c),h!==this._tTime||a||u){if(o!==this._time&&l&&(h+=this._time-o,i+=this._time-o),f=h,A=this._start,w=this._ts,m=!w,u&&(l||(o=this._zTime),(i||!s)&&(this._zTime=i)),this._repeat){if(E=this._yoyo,g=l+this._rDelay,this._repeat<-1&&i<0)return this.totalTime(g*100+i,s,a);if(f=Se(h%g),h===c?(_=this._repeat,f=l):(C=Se(h/g),_=~~C,_&&_===C&&(f=l,_--),f>l&&(f=l)),C=Kr(this._tTime,g),!o&&this._tTime&&C!==_&&this._tTime-C*g-this._dur<=0&&(C=_),E&&_&1&&(f=l-f,P=1),_!==C&&!this._lock){var F=E&&C&1,y=F===(E&&_&1);if(_<C&&(F=!F),o=F?0:h%l?l:h,this._lock=1,this.render(o||(P?0:Se(_*g)),s,!l)._lock=0,this._tTime=h,!s&&this.parent&&un(this,"onRepeat"),this.vars.repeatRefresh&&!P&&(this.invalidate()._lock=1),o&&o!==this._time||m!==!this._ts||this.vars.onRepeat&&!this.parent&&!this._act)return this;if(l=this._dur,c=this._tDur,y&&(this._lock=2,o=F?l:-1e-4,this.render(o,!0),this.vars.repeatRefresh&&!P&&this.invalidate()),this._lock=0,!this._ts&&!m)return this;Pd(this,P)}}if(this._hasPause&&!this._forcing&&this._lock<2&&(T=cv(this,Se(o),Se(f)),T&&(h-=f-(f=T._start))),this._tTime=h,this._time=f,this._act=!w,this._initted||(this._onUpdate=this.vars.onUpdate,this._initted=1,this._zTime=i,o=0),!o&&h&&!s&&!C&&(un(this,"onStart"),this._tTime!==h))return this;if(f>=o&&i>=0)for(d=this._first;d;){if(v=d._next,(d._act||f>=d._start)&&d._ts&&T!==d){if(d.parent!==this)return this.render(i,s,a);if(d.render(d._ts>0?(f-d._start)*d._ts:(d._dirty?d.totalDuration():d._tDur)+(f-d._start)*d._ts,s,a),f!==this._time||!this._ts&&!m){T=0,v&&(h+=this._zTime=-oe);break}}d=v}else{d=this._last;for(var M=i<0?i:f;d;){if(v=d._prev,(d._act||M<=d._end)&&d._ts&&T!==d){if(d.parent!==this)return this.render(i,s,a);if(d.render(d._ts>0?(M-d._start)*d._ts:(d._dirty?d.totalDuration():d._tDur)+(M-d._start)*d._ts,s,a||Ie&&_h(d)),f!==this._time||!this._ts&&!m){T=0,v&&(h+=this._zTime=M?-oe:oe);break}}d=v}}if(T&&!s&&(this.pause(),T.render(f>=o?0:-oe)._zTime=f>=o?1:-1,this._ts))return this._start=A,dc(this),this.render(i,s,a);this._onUpdate&&!s&&un(this,"onUpdate",!0),(h===c&&this._tTime>=this.totalDuration()||!h&&o)&&(A===this._start||Math.abs(w)!==Math.abs(this._ts))&&(this._lock||((i||!l)&&(h===c&&this._ts>0||!h&&this._ts<0)&&Ai(this,1),!s&&!(i<0&&!o)&&(h||o||!c)&&(un(this,h===c&&i>=0?"onComplete":"onReverseComplete",!0),this._prom&&!(h<c&&this.timeScale()>0)&&this._prom())))}return this},e.add=function(i,s){var a=this;if(ai(s)||(s=vn(this,s,i)),!(i instanceof Js)){if(Fe(i))return i.forEach(function(o){return a.add(o,s)}),this;if(Ce(i))return this.addLabel(i,s);if(_e(i))i=be.delayedCall(0,i);else return this}return this!==i?Vn(this,i,s):this},e.getChildren=function(i,s,a,o){i===void 0&&(i=!0),s===void 0&&(s=!0),a===void 0&&(a=!0),o===void 0&&(o=-yn);for(var c=[],l=this._first;l;)l._start>=o&&(l instanceof be?s&&c.push(l):(a&&c.push(l),i&&c.push.apply(c,l.getChildren(!0,s,a)))),l=l._next;return c},e.getById=function(i){for(var s=this.getChildren(1,1,1),a=s.length;a--;)if(s[a].vars.id===i)return s[a]},e.remove=function(i){return Ce(i)?this.removeLabel(i):_e(i)?this.killTweensOf(i):(i.parent===this&&fc(this,i),i===this._recent&&(this._recent=this._last),sr(this))},e.totalTime=function(i,s){return arguments.length?(this._forcing=1,!this._dp&&this._ts&&(this._start=Se(Ke.time-(this._ts>0?i/this._ts:(this.totalDuration()-i)/-this._ts))),r.prototype.totalTime.call(this,i,s),this._forcing=0,this):this._tTime},e.addLabel=function(i,s){return this.labels[i]=vn(this,s),this},e.removeLabel=function(i){return delete this.labels[i],this},e.addPause=function(i,s,a){var o=be.delayedCall(0,s||Zs,a);return o.data="isPause",this._hasPause=1,Vn(this,o,vn(this,i))},e.removePause=function(i){var s=this._first;for(i=vn(this,i);s;)s._start===i&&s.data==="isPause"&&Ai(s),s=s._next},e.killTweensOf=function(i,s,a){for(var o=this.getTweensOf(i,a),c=o.length;c--;)wi!==o[c]&&o[c].kill(i,s);return this},e.getTweensOf=function(i,s){for(var a=[],o=bn(i),c=this._first,l=ai(s),h;c;)c instanceof be?ev(c._targets,o)&&(l?(!wi||c._initted&&c._ts)&&c.globalTime(0)<=s&&c.globalTime(c.totalDuration())>s:!s||c.isActive())&&a.push(c):(h=c.getTweensOf(o,s)).length&&a.push.apply(a,h),c=c._next;return a},e.tweenTo=function(i,s){s=s||{};var a=this,o=vn(a,i),c=s,l=c.startAt,h=c.onStart,u=c.onStartParams,f=c.immediateRender,d,v=be.to(a,dn({ease:s.ease||"none",lazy:!1,immediateRender:!1,time:o,overwrite:"auto",duration:s.duration||Math.abs((o-(l&&"time"in l?l.time:a._time))/a.timeScale())||oe,onStart:function(){if(a.pause(),!d){var g=s.duration||Math.abs((o-(l&&"time"in l?l.time:a._time))/a.timeScale());v._dur!==g&&jr(v,g,0,1).render(v._time,!0,!0),d=1}h&&h.apply(v,u||[])}},s));return f?v.render(0):v},e.tweenFromTo=function(i,s,a){return this.tweenTo(s,dn({startAt:{time:vn(this,i)}},a))},e.recent=function(){return this._recent},e.nextLabel=function(i){return i===void 0&&(i=this._time),Qf(this,vn(this,i))},e.previousLabel=function(i){return i===void 0&&(i=this._time),Qf(this,vn(this,i),1)},e.currentLabel=function(i){return arguments.length?this.seek(i,!0):this.previousLabel(this._time+oe)},e.shiftChildren=function(i,s,a){a===void 0&&(a=0);for(var o=this._first,c=this.labels,l;o;)o._start>=a&&(o._start+=i,o._end+=i),o=o._next;if(s)for(l in c)c[l]>=a&&(c[l]+=i);return sr(this)},e.invalidate=function(i){var s=this._first;for(this._lock=0;s;)s.invalidate(i),s=s._next;return r.prototype.invalidate.call(this,i)},e.clear=function(i){i===void 0&&(i=!0);for(var s=this._first,a;s;)a=s._next,this.remove(s),s=a;return this._dp&&(this._time=this._tTime=this._pTime=0),i&&(this.labels={}),sr(this)},e.totalDuration=function(i){var s=0,a=this,o=a._last,c=yn,l,h,u;if(arguments.length)return a.timeScale((a._repeat<0?a.duration():a.totalDuration())/(a.reversed()?-i:i));if(a._dirty){for(u=a.parent;o;)l=o._prev,o._dirty&&o.totalDuration(),h=o._start,h>c&&a._sort&&o._ts&&!a._lock?(a._lock=1,Vn(a,o,h-o._delay,1)._lock=0):c=h,h<0&&o._ts&&(s-=h,(!u&&!a._dp||u&&u.smoothChildTiming)&&(a._start+=h/a._ts,a._time-=h,a._tTime-=h),a.shiftChildren(-h,!1,-1/0),c=0),o._end>s&&o._ts&&(s=o._end),o=l;jr(a,a===de&&a._time>s?a._time:s,1,1),a._dirty=0}return a._tDur},t.updateRoot=function(i){if(de._ts&&(ud(de,cc(i,de)),hd=Ke.frame),Ke.frame>=$f){$f+=Qe.autoSleep||120;var s=de._first;if((!s||!s._ts)&&Qe.autoSleep&&Ke._listeners.length<2){for(;s&&!s._ts;)s=s._next;s||Ke.sleep()}}},t})(Js);dn(Pe.prototype,{_lock:0,_hasPause:0,_forcing:0});var wv=function(t,e,n,i,s,a,o){var c=new Ve(this._pt,t,e,0,1,Th,null,s),l=0,h=0,u,f,d,v,_,g,m,T;for(c.b=n,c.e=i,n+="",i+="",(m=~i.indexOf("random("))&&(i=ts(i)),a&&(T=[n,i],a(T,t,e),n=T[0],i=T[1]),f=n.match(Xl)||[];u=Xl.exec(i);)v=u[0],_=i.substring(l,u.index),d?d=(d+1)%5:_.substr(-5)==="rgba("&&(d=1),v!==f[h++]&&(g=parseFloat(f[h-1])||0,c._pt={_next:c._pt,p:_||h===1?_:",",s:g,c:v.charAt(1)==="="?lr(g,v)-g:parseFloat(v)-g,m:d&&d<4?Math.round:0},l=Xl.lastIndex);return c.c=l<i.length?i.substring(l,i.length):"",c.fp=o,(fh.test(i)||m)&&(c.e=0),this._pt=c,c},bh=function(t,e,n,i,s,a,o,c,l,h){_e(i)&&(i=i(s||0,t,a));var u=t[e],f=n!=="get"?n:_e(u)?l?t[e.indexOf("set")||!_e(t["get"+e.substr(3)])?e:"get"+e.substr(3)](l):t[e]():u,d=_e(u)?l?Rv:Ud:wh,v;if(Ce(i)&&(~i.indexOf("random(")&&(i=ts(i)),i.charAt(1)==="="&&(v=lr(f,i)+(Le(f)||0),(v||v===0)&&(i=v))),!h||f!==i||oh)return!isNaN(f*i)&&i!==""?(v=new Ve(this._pt,t,e,+f||0,i-(f||0),typeof u=="boolean"?Iv:Nd,0,d),l&&(v.fp=l),o&&v.modifier(o,this,t),this._pt=v):(!u&&!(e in t)&&uc(e,i),wv.call(this,t,e,f,i,d,c||Qe.stringFilter,l))},Tv=function(t,e,n,i,s){if(_e(t)&&(t=qs(t,s,e,n,i)),!Gn(t)||t.style&&t.nodeType||Fe(t)||sd(t))return Ce(t)?qs(t,s,e,n,i):t;var a={},o;for(o in t)a[o]=qs(t[o],s,e,n,i);return a},Mh=function(t,e,n,i,s,a){var o,c,l,h;if(Je[t]&&(o=new Je[t]).init(s,o.rawVars?e[t]:Tv(e[t],i,s,a,n),n,i,a)!==!1&&(n._pt=c=new Ve(n._pt,s,t,0,1,o.render,o,0,o.priority),n!==Zr))for(l=n._ptLookup[n._targets.indexOf(s)],h=o._props.length;h--;)l[o._props[h]]=c;return o},wi,oh,Sh=function r(t,e,n){var i=t.vars,s=i.ease,a=i.startAt,o=i.immediateRender,c=i.lazy,l=i.onUpdate,h=i.runBackwards,u=i.yoyoEase,f=i.keyframes,d=i.autoRevert,v=t._dur,_=t._startAt,g=t._targets,m=t.parent,T=m&&m.data==="nested"?m.vars.targets:g,w=t._overwrite==="auto"&&!lh,A=t.timeline,C,E,P,F,y,M,N,G,H,Z,J,Y,at;if(A&&(!f||!s)&&(s="none"),t._ease=ar(s,$r.ease),t._yEase=u?Rd(ar(u===!0?s:u,$r.ease)):0,u&&t._yoyo&&!t._repeat&&(u=t._yEase,t._yEase=t._ease,t._ease=u),t._from=!A&&!!i.runBackwards,!A||f&&!i.stagger){if(G=g[0]?Ei(g[0]).harness:0,Y=G&&i[G.prop],C=oc(i,ph),_&&(_._zTime<0&&_.progress(1),e<0&&h&&o&&!d?_.render(-1,!0):_.revert(h&&v?nc:Q_),_._lazy=0),a){if(Ai(t._startAt=be.set(g,dn({data:"isStart",overwrite:!1,parent:m,immediateRender:!0,lazy:!_&&je(c),startAt:null,delay:0,onUpdate:l&&function(){return un(t,"onUpdate")},stagger:0},a))),t._startAt._dp=0,t._startAt._sat=t,e<0&&(Ie||!o&&!d)&&t._startAt.revert(nc),o&&v&&e<=0&&n<=0){e&&(t._zTime=e);return}}else if(h&&v&&!_){if(e&&(o=!1),P=dn({overwrite:!1,data:"isFromStart",lazy:o&&!_&&je(c),immediateRender:o,stagger:0,parent:m},C),Y&&(P[G.prop]=Y),Ai(t._startAt=be.set(g,P)),t._startAt._dp=0,t._startAt._sat=t,e<0&&(Ie?t._startAt.revert(nc):t._startAt.render(-1,!0)),t._zTime=e,!o)r(t._startAt,oe,oe);else if(!e)return}for(t._pt=t._ptCache=0,c=v&&je(c)||c&&!v,E=0;E<g.length;E++){if(y=g[E],N=y._gsap||gh(g)[E]._gsap,t._ptLookup[E]=Z={},eh[N.id]&&Ti.length&&ac(),J=T===g?E:T.indexOf(y),G&&(H=new G).init(y,Y||C,t,J,T)!==!1&&(t._pt=F=new Ve(t._pt,y,H.name,0,1,H.render,H,0,H.priority),H._props.forEach(function(W){Z[W]=F}),H.priority&&(M=1)),!G||Y)for(P in C)Je[P]&&(H=Mh(P,C,t,J,y,T))?H.priority&&(M=1):Z[P]=F=bh.call(t,y,P,"get",C[P],J,T,0,i.stringFilter);t._op&&t._op[E]&&t.kill(y,t._op[E]),w&&t._pt&&(wi=t,de.killTweensOf(y,Z,t.globalTime(e)),at=!t.parent,wi=0),t._pt&&c&&(eh[N.id]=1)}M&&Ah(t),t._onInit&&t._onInit(t)}t._onUpdate=l,t._initted=(!t._op||t._pt)&&!at,f&&e<=0&&A.render(yn,!0,!0)},Ev=function(t,e,n,i,s,a,o,c){var l=(t._pt&&t._ptCache||(t._ptCache={}))[e],h,u,f,d;if(!l)for(l=t._ptCache[e]=[],f=t._ptLookup,d=t._targets.length;d--;){if(h=f[d][e],h&&h.d&&h.d._pt)for(h=h.d._pt;h&&h.p!==e&&h.fp!==e;)h=h._next;if(!h)return oh=1,t.vars[e]="+=0",Sh(t,o),oh=0,c?Ys(e+" not eligible for reset"):1;l.push(h)}for(d=l.length;d--;)u=l[d],h=u._pt||u,h.s=(i||i===0)&&!s?i:h.s+(i||0)+a*h.c,h.c=n-h.s,u.e&&(u.e=ve(n)+Le(u.e)),u.b&&(u.b=h.s+Le(u.b))},Av=function(t,e){var n=t[0]?Ei(t[0]).harness:0,i=n&&n.aliases,s,a,o,c;if(!i)return e;s=Jr({},e);for(a in i)if(a in s)for(c=i[a].split(","),o=c.length;o--;)s[c[o]]=s[a];return s},Cv=function(t,e,n,i){var s=e.ease||i||"power1.inOut",a,o;if(Fe(e))o=n[t]||(n[t]=[]),e.forEach(function(c,l){return o.push({t:l/(e.length-1)*100,v:c,e:s})});else for(a in e)o=n[a]||(n[a]=[]),a==="ease"||o.push({t:parseFloat(t),v:e[a],e:s})},qs=function(t,e,n,i,s){return _e(t)?t.call(e,n,i,s):Ce(t)&&~t.indexOf("random(")?ts(t):t},Ld=mh+"repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,autoRevert",Dd={};ze(Ld+",id,stagger,delay,duration,paused,scrollTrigger",function(r){return Dd[r]=1});var be=(function(r){nd(t,r);function t(n,i,s,a){var o;typeof i=="number"&&(s.duration=i,i=s,s=null),o=r.call(this,a?i:Ws(i))||this;var c=o.vars,l=c.duration,h=c.delay,u=c.immediateRender,f=c.stagger,d=c.overwrite,v=c.keyframes,_=c.defaults,g=c.scrollTrigger,m=c.yoyoEase,T=i.parent||de,w=(Fe(n)||sd(n)?ai(n[0]):"length"in i)?[n]:bn(n),A,C,E,P,F,y,M,N;if(o._targets=w.length?gh(w):Ys("GSAP target "+n+" not found. https://gsap.com",!Qe.nullTargetWarn)||[],o._ptLookup=[],o._overwrite=d,v||f||ec(l)||ec(h)){if(i=o.vars,A=o.timeline=new Pe({data:"nested",defaults:_||{},targets:T&&T.data==="nested"?T.vars.targets:w}),A.kill(),A.parent=A._dp=ri(o),A._start=0,f||ec(l)||ec(h)){if(P=w.length,M=f&&yd(f),Gn(f))for(F in f)~Ld.indexOf(F)&&(N||(N={}),N[F]=f[F]);for(C=0;C<P;C++)E=oc(i,Dd),E.stagger=0,m&&(E.yoyoEase=m),N&&Jr(E,N),y=w[C],E.duration=+qs(l,ri(o),C,y,w),E.delay=(+qs(h,ri(o),C,y,w)||0)-o._delay,!f&&P===1&&E.delay&&(o._delay=h=E.delay,o._start+=h,E.delay=0),A.to(y,E,M?M(C,y,w):0),A._ease=$t.none;A.duration()?l=h=0:o.timeline=0}else if(v){Ws(dn(A.vars.defaults,{ease:"none"})),A._ease=ar(v.ease||i.ease||"none");var G=0,H,Z,J;if(Fe(v))v.forEach(function(Y){return A.to(w,Y,">")}),A.duration();else{E={};for(F in v)F==="ease"||F==="easeEach"||Cv(F,v[F],E,v.easeEach);for(F in E)for(H=E[F].sort(function(Y,at){return Y.t-at.t}),G=0,C=0;C<H.length;C++)Z=H[C],J={ease:Z.e,duration:(Z.t-(C?H[C-1].t:0))/100*l},J[F]=Z.v,A.to(w,J,G),G+=J.duration;A.duration()<l&&A.to({},{duration:l-A.duration()})}}l||o.duration(l=A.duration())}else o.timeline=0;return d===!0&&!lh&&(wi=ri(o),de.killTweensOf(w),wi=0),Vn(T,ri(o),s),i.reversed&&o.reverse(),i.paused&&o.paused(!0),(u||!l&&!v&&o._start===Se(T._time)&&je(u)&&sv(ri(o))&&T.data!=="nested")&&(o._tTime=-oe,o.render(Math.max(0,-h)||0)),g&&gd(ri(o),g),o}var e=t.prototype;return e.render=function(i,s,a){var o=this._time,c=this._tDur,l=this._dur,h=i<0,u=i>c-oe&&!h?c:i<oe?0:i,f,d,v,_,g,m,T,w,A;if(!l)ov(this,i,s,a);else if(u!==this._tTime||!i||a||!this._initted&&this._tTime||this._startAt&&this._zTime<0!==h||this._lazy){if(f=u,w=this.timeline,this._repeat){if(_=l+this._rDelay,this._repeat<-1&&h)return this.totalTime(_*100+i,s,a);if(f=Se(u%_),u===c?(v=this._repeat,f=l):(g=Se(u/_),v=~~g,v&&v===g?(f=l,v--):f>l&&(f=l)),m=this._yoyo&&v&1,m&&(A=this._yEase,f=l-f),g=Kr(this._tTime,_),f===o&&!a&&this._initted&&v===g)return this._tTime=u,this;v!==g&&(w&&this._yEase&&Pd(w,m),this.vars.repeatRefresh&&!m&&!this._lock&&f!==_&&this._initted&&(this._lock=a=1,this.render(Se(_*v),!0).invalidate()._lock=0))}if(!this._initted){if(xd(this,h?i:f,a,s,u))return this._tTime=0,this;if(o!==this._time&&!(a&&this.vars.repeatRefresh&&v!==g))return this;if(l!==this._dur)return this.render(i,s,a)}if(this._tTime=u,this._time=f,!this._act&&this._ts&&(this._act=1,this._lazy=0),this.ratio=T=(A||this._ease)(f/l),this._from&&(this.ratio=T=1-T),!o&&u&&!s&&!g&&(un(this,"onStart"),this._tTime!==u))return this;for(d=this._pt;d;)d.r(T,d.d),d=d._next;w&&w.render(i<0?i:w._dur*w._ease(f/this._dur),s,a)||this._startAt&&(this._zTime=i),this._onUpdate&&!s&&(h&&nh(this,i,s,a),un(this,"onUpdate")),this._repeat&&v!==g&&this.vars.onRepeat&&!s&&this.parent&&un(this,"onRepeat"),(u===this._tDur||!u)&&this._tTime===u&&(h&&!this._onUpdate&&nh(this,i,!0,!0),(i||!l)&&(u===this._tDur&&this._ts>0||!u&&this._ts<0)&&Ai(this,1),!s&&!(h&&!o)&&(u||o||m)&&(un(this,u===c?"onComplete":"onReverseComplete",!0),this._prom&&!(u<c&&this.timeScale()>0)&&this._prom()))}return this},e.targets=function(){return this._targets},e.invalidate=function(i){return(!i||!this.vars.runBackwards)&&(this._startAt=0),this._pt=this._op=this._onUpdate=this._lazy=this.ratio=0,this._ptLookup=[],this.timeline&&this.timeline.invalidate(i),r.prototype.invalidate.call(this,i)},e.resetTo=function(i,s,a,o,c){$s||Ke.wake(),this._ts||this.play();var l=Math.min(this._dur,(this._dp._time-this._start)*this._ts),h;return this._initted||Sh(this,l),h=this._ease(l/this._dur),Ev(this,i,s,a,o,h,l,c)?this.resetTo(i,s,a,o,1):(pc(this,0),this.parent||pd(this._dp,this,"_first","_last",this._dp._sort?"_start":0),this.render(0))},e.kill=function(i,s){if(s===void 0&&(s="all"),!i&&(!s||s==="all"))return this._lazy=this._pt=0,this.parent?Gs(this):this.scrollTrigger&&this.scrollTrigger.kill(!!Ie),this;if(this.timeline){var a=this.timeline.totalDuration();return this.timeline.killTweensOf(i,s,wi&&wi.vars.overwrite!==!0)._first||Gs(this),this.parent&&a!==this.timeline.totalDuration()&&jr(this,this._dur*this.timeline._tDur/a,0,1),this}var o=this._targets,c=i?bn(i):o,l=this._ptLookup,h=this._pt,u,f,d,v,_,g,m;if((!s||s==="all")&&iv(o,c))return s==="all"&&(this._pt=0),Gs(this);for(u=this._op=this._op||[],s!=="all"&&(Ce(s)&&(_={},ze(s,function(T){return _[T]=1}),s=_),s=Av(o,s)),m=o.length;m--;)if(~c.indexOf(o[m])){f=l[m],s==="all"?(u[m]=s,v=f,d={}):(d=u[m]=u[m]||{},v=s);for(_ in v)g=f&&f[_],g&&((!("kill"in g.d)||g.d.kill(_)===!0)&&fc(this,g,"_pt"),delete f[_]),d!=="all"&&(d[_]=1)}return this._initted&&!this._pt&&h&&Gs(this),this},t.to=function(i,s){return new t(i,s,arguments[2])},t.from=function(i,s){return Xs(1,arguments)},t.delayedCall=function(i,s,a,o){return new t(s,0,{immediateRender:!1,lazy:!1,overwrite:!1,delay:i,onComplete:s,onReverseComplete:s,onCompleteParams:a,onReverseCompleteParams:a,callbackScope:o})},t.fromTo=function(i,s,a){return Xs(2,arguments)},t.set=function(i,s){return s.duration=0,s.repeatDelay||(s.repeat=0),new t(i,s)},t.killTweensOf=function(i,s,a){return de.killTweensOf(i,s,a)},t})(Js);dn(be.prototype,{_targets:[],_lazy:0,_startAt:0,_op:0,_onInit:0});ze("staggerTo,staggerFrom,staggerFromTo",function(r){be[r]=function(){var t=new Pe,e=rh.call(arguments,0);return e.splice(r==="staggerFromTo"?5:4,0,0),t[r].apply(t,e)}});var wh=function(t,e,n){return t[e]=n},Ud=function(t,e,n){return t[e](n)},Rv=function(t,e,n,i){return t[e](i.fp,n)},Pv=function(t,e,n){return t.setAttribute(e,n)},mc=function(t,e){return _e(t[e])?Ud:hc(t[e])&&t.setAttribute?Pv:wh},Nd=function(t,e){return e.set(e.t,e.p,Math.round((e.s+e.c*t)*1e6)/1e6,e)},Iv=function(t,e){return e.set(e.t,e.p,!!(e.s+e.c*t),e)},Th=function(t,e){var n=e._pt,i="";if(!t&&e.b)i=e.b;else if(t===1&&e.e)i=e.e;else{for(;n;)i=n.p+(n.m?n.m(n.s+n.c*t):Math.round((n.s+n.c*t)*1e4)/1e4)+i,n=n._next;i+=e.c}e.set(e.t,e.p,i,e)},Eh=function(t,e){for(var n=e._pt;n;)n.r(t,n.d),n=n._next},Lv=function(t,e,n,i){for(var s=this._pt,a;s;)a=s._next,s.p===i&&s.modifier(t,e,n),s=a},Dv=function(t){for(var e=this._pt,n,i;e;)i=e._next,e.p===t&&!e.op||e.op===t?fc(this,e,"_pt"):e.dep||(n=1),e=i;return!n},Uv=function(t,e,n,i){i.mSet(t,e,i.m.call(i.tween,n,i.mt),i)},Ah=function(t){for(var e=t._pt,n,i,s,a;e;){for(n=e._next,i=s;i&&i.pr>e.pr;)i=i._next;(e._prev=i?i._prev:a)?e._prev._next=e:s=e,(e._next=i)?i._prev=e:a=e,e=n}t._pt=s},Ve=(function(){function r(e,n,i,s,a,o,c,l,h){this.t=n,this.s=s,this.c=a,this.p=i,this.r=o||Nd,this.d=c||this,this.set=l||wh,this.pr=h||0,this._next=e,e&&(e._prev=this)}var t=r.prototype;return t.modifier=function(n,i,s){this.mSet=this.mSet||this.set,this.set=Uv,this.m=n,this.mt=s,this.tween=i},r})();ze(mh+"parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger",function(r){return ph[r]=1});fn.TweenMax=fn.TweenLite=be;fn.TimelineLite=fn.TimelineMax=Pe;de=new Pe({sortChildren:!1,defaults:$r,autoRemoveChildren:!0,id:"root",smoothChildTiming:!0});Qe.stringFilter=vh;var or=[],rc={},Nv=[],ed=0,Fv=0,Jl=function(t){return(rc[t]||Nv).map(function(e){return e()})},ch=function(){var t=Date.now(),e=[];t-ed>2&&(Jl("matchMediaInit"),or.forEach(function(n){var i=n.queries,s=n.conditions,a,o,c,l;for(o in i)a=zn.matchMedia(i[o]).matches,a&&(c=1),a!==s[o]&&(s[o]=a,l=1);l&&(n.revert(),c&&e.push(n))}),Jl("matchMediaRevert"),e.forEach(function(n){return n.onMatch(n,function(i){return n.add(null,i)})}),ed=t,Jl("matchMedia"))},Fd=(function(){function r(e,n){this.selector=n&&sh(n),this.data=[],this._r=[],this.isReverted=!1,this.id=Fv++,e&&this.add(e)}var t=r.prototype;return t.add=function(n,i,s){_e(n)&&(s=i,i=n,n=_e);var a=this,o=function(){var l=he,h=a.selector,u;return l&&l!==a&&l.data.push(a),s&&(a.selector=sh(s)),he=a,u=i.apply(a,arguments),_e(u)&&a._r.push(u),he=l,a.selector=h,a.isReverted=!1,u};return a.last=o,n===_e?o(a,function(c){return a.add(null,c)}):n?a[n]=o:o},t.ignore=function(n){var i=he;he=null,n(this),he=i},t.getTweens=function(){var n=[];return this.data.forEach(function(i){return i instanceof r?n.push.apply(n,i.getTweens()):i instanceof be&&!(i.parent&&i.parent.data==="nested")&&n.push(i)}),n},t.clear=function(){this._r.length=this.data.length=0},t.kill=function(n,i){var s=this;if(n?(function(){for(var o=s.getTweens(),c=s.data.length,l;c--;)l=s.data[c],l.data==="isFlip"&&(l.revert(),l.getChildren(!0,!0,!1).forEach(function(h){return o.splice(o.indexOf(h),1)}));for(o.map(function(h){return{g:h._dur||h._delay||h._sat&&!h._sat.vars.immediateRender?h.globalTime(0):-1/0,t:h}}).sort(function(h,u){return u.g-h.g||-1/0}).forEach(function(h){return h.t.revert(n)}),c=s.data.length;c--;)l=s.data[c],l instanceof Pe?l.data!=="nested"&&(l.scrollTrigger&&l.scrollTrigger.revert(),l.kill()):!(l instanceof be)&&l.revert&&l.revert(n);s._r.forEach(function(h){return h(n,s)}),s.isReverted=!0})():this.data.forEach(function(o){return o.kill&&o.kill()}),this.clear(),i)for(var a=or.length;a--;)or[a].id===this.id&&or.splice(a,1)},t.revert=function(n){this.kill(n||{})},r})(),Ov=(function(){function r(e){this.contexts=[],this.scope=e,he&&he.data.push(this)}var t=r.prototype;return t.add=function(n,i,s){Gn(n)||(n={matches:n});var a=new Fd(0,s||this.scope),o=a.conditions={},c,l,h;he&&!a.selector&&(a.selector=he.selector),this.contexts.push(a),i=a.add("onMatch",i),a.queries=n;for(l in n)l==="all"?h=1:(c=zn.matchMedia(n[l]),c&&(or.indexOf(a)<0&&or.push(a),(o[l]=c.matches)&&(h=1),c.addListener?c.addListener(ch):c.addEventListener("change",ch)));return h&&i(a,function(u){return a.add(null,u)}),this},t.revert=function(n){this.kill(n||{})},t.kill=function(n){this.contexts.forEach(function(i){return i.kill(n,!0)})},r})(),lc={registerPlugin:function(){for(var t=arguments.length,e=new Array(t),n=0;n<t;n++)e[n]=arguments[n];e.forEach(function(i){return Ed(i)})},timeline:function(t){return new Pe(t)},getTweensOf:function(t,e){return de.getTweensOf(t,e)},getProperty:function(t,e,n,i){Ce(t)&&(t=bn(t)[0]);var s=Ei(t||{}).get,a=n?dd:fd;return n==="native"&&(n=""),t&&(e?a((Je[e]&&Je[e].get||s)(t,e,n,i)):function(o,c,l){return a((Je[o]&&Je[o].get||s)(t,o,c,l))})},quickSetter:function(t,e,n){if(t=bn(t),t.length>1){var i=t.map(function(h){return Oe.quickSetter(h,e,n)}),s=i.length;return function(h){for(var u=s;u--;)i[u](h)}}t=t[0]||{};var a=Je[e],o=Ei(t),c=o.harness&&(o.harness.aliases||{})[e]||e,l=a?function(h){var u=new a;Zr._pt=0,u.init(t,n?h+n:h,Zr,0,[t]),u.render(1,u),Zr._pt&&Eh(1,Zr)}:o.set(t,c);return a?l:function(h){return l(t,c,n?h+n:h,o,1)}},quickTo:function(t,e,n){var i,s=Oe.to(t,dn((i={},i[e]="+=0.1",i.paused=!0,i.stagger=0,i),n||{})),a=function(c,l,h){return s.resetTo(e,c,l,h)};return a.tween=s,a},isTweening:function(t){return de.getTweensOf(t,!0).length>0},defaults:function(t){return t&&t.ease&&(t.ease=ar(t.ease,$r.ease)),Jf($r,t||{})},config:function(t){return Jf(Qe,t||{})},registerEffect:function(t){var e=t.name,n=t.effect,i=t.plugins,s=t.defaults,a=t.extendTimeline;(i||"").split(",").forEach(function(o){return o&&!Je[o]&&!fn[o]&&Ys(e+" effect requires "+o+" plugin.")}),ql[e]=function(o,c,l){return n(bn(o),dn(c||{},s),l)},a&&(Pe.prototype[e]=function(o,c,l){return this.add(ql[e](o,Gn(c)?c:(l=c)&&{},this),l)})},registerEase:function(t,e){$t[t]=ar(e)},parseEase:function(t,e){return arguments.length?ar(t,e):$t},getById:function(t){return de.getById(t)},exportRoot:function(t,e){t===void 0&&(t={});var n=new Pe(t),i,s;for(n.smoothChildTiming=je(t.smoothChildTiming),de.remove(n),n._dp=0,n._time=n._tTime=de._time,i=de._first;i;)s=i._next,(e||!(!i._dur&&i instanceof be&&i.vars.onComplete===i._targets[0]))&&Vn(n,i,i._start-i._delay),i=s;return Vn(de,n,0),n},context:function(t,e){return t?new Fd(t,e):he},matchMedia:function(t){return new Ov(t)},matchMediaRefresh:function(){return or.forEach(function(t){var e=t.conditions,n,i;for(i in e)e[i]&&(e[i]=!1,n=1);n&&t.revert()})||ch()},addEventListener:function(t,e){var n=rc[t]||(rc[t]=[]);~n.indexOf(e)||n.push(e)},removeEventListener:function(t,e){var n=rc[t],i=n&&n.indexOf(e);i>=0&&n.splice(i,1)},utils:{wrap:mv,wrapYoyo:gv,distribute:yd,random:Md,snap:bd,normalize:pv,getUnit:Le,clamp:hv,splitColor:Ad,toArray:bn,selector:sh,mapRange:wd,pipe:fv,unitize:dv,interpolate:xv,shuffle:vd},install:cd,effects:ql,ticker:Ke,updateRoot:Pe.updateRoot,plugins:Je,globalTimeline:de,core:{PropTween:Ve,globals:ld,Tween:be,Timeline:Pe,Animation:Js,getCache:Ei,_removeLinkedListItem:fc,reverting:function(){return Ie},context:function(t){return t&&he&&(he.data.push(t),t._ctx=he),he},suppressOverwrites:function(t){return lh=t}}};ze("to,from,fromTo,delayedCall,set,killTweensOf",function(r){return lc[r]=be[r]});Ke.add(Pe.updateRoot);Zr=lc.to({},{duration:0});var Bv=function(t,e){for(var n=t._pt;n&&n.p!==e&&n.op!==e&&n.fp!==e;)n=n._next;return n},kv=function(t,e){var n=t._targets,i,s,a;for(i in e)for(s=n.length;s--;)a=t._ptLookup[s][i],a&&(a=a.d)&&(a._pt&&(a=Bv(a,i)),a&&a.modifier&&a.modifier(e[i],t,n[s],i))},Kl=function(t,e){return{name:t,headless:1,rawVars:1,init:function(i,s,a){a._onInit=function(o){var c,l;if(Ce(s)&&(c={},ze(s,function(h){return c[h]=1}),s=c),e){c={};for(l in s)c[l]=e(s[l]);s=c}kv(o,s)}}}},Oe=lc.registerPlugin({name:"attr",init:function(t,e,n,i,s){var a,o,c;this.tween=n;for(a in e)c=t.getAttribute(a)||"",o=this.add(t,"setAttribute",(c||0)+"",e[a],i,s,0,0,a),o.op=a,o.b=c,this._props.push(a)},render:function(t,e){for(var n=e._pt;n;)Ie?n.set(n.t,n.p,n.b,n):n.r(t,n.d),n=n._next}},{name:"endArray",headless:1,init:function(t,e){for(var n=e.length;n--;)this.add(t,n,t[n]||0,e[n],0,0,0,0,0,1)}},Kl("roundProps",ah),Kl("modifiers"),Kl("snap",bd))||lc;be.version=Pe.version=Oe.version="3.13.0";od=1;hh()&&Qr();var zv=$t.Power0,Vv=$t.Power1,Gv=$t.Power2,Hv=$t.Power3,Wv=$t.Power4,Xv=$t.Linear,qv=$t.Quad,Yv=$t.Cubic,Zv=$t.Quart,$v=$t.Quint,Jv=$t.Strong,Kv=$t.Elastic,jv=$t.Back,Qv=$t.SteppedEase,ty=$t.Bounce,ey=$t.Sine,ny=$t.Expo,iy=$t.Circ;var Od,Ri,ns,Dh,pr,ry,Bd,Uh,sy=function(){return typeof window<"u"},ci={},dr=180/Math.PI,is=Math.PI/180,es=Math.atan2,kd=1e8,Nh=/([A-Z])/g,ay=/(left|right|width|margin|padding|x)/i,oy=/[\s,\(]\S/,Hn={autoAlpha:"opacity,visibility",scale:"scaleX,scaleY",alpha:"opacity"},Rh=function(t,e){return e.set(e.t,e.p,Math.round((e.s+e.c*t)*1e4)/1e4+e.u,e)},cy=function(t,e){return e.set(e.t,e.p,t===1?e.e:Math.round((e.s+e.c*t)*1e4)/1e4+e.u,e)},ly=function(t,e){return e.set(e.t,e.p,t?Math.round((e.s+e.c*t)*1e4)/1e4+e.u:e.b,e)},hy=function(t,e){var n=e.s+e.c*t;e.set(e.t,e.p,~~(n+(n<0?-.5:.5))+e.u,e)},Yd=function(t,e){return e.set(e.t,e.p,t?e.e:e.b,e)},Zd=function(t,e){return e.set(e.t,e.p,t!==1?e.b:e.e,e)},uy=function(t,e,n){return t.style[e]=n},fy=function(t,e,n){return t.style.setProperty(e,n)},dy=function(t,e,n){return t._gsap[e]=n},py=function(t,e,n){return t._gsap.scaleX=t._gsap.scaleY=n},my=function(t,e,n,i,s){var a=t._gsap;a.scaleX=a.scaleY=n,a.renderTransform(s,a)},gy=function(t,e,n,i,s){var a=t._gsap;a[e]=n,a.renderTransform(s,a)},pe="transform",tn=pe+"Origin",xy=function r(t,e){var n=this,i=this.target,s=i.style,a=i._gsap;if(t in ci&&s){if(this.tfm=this.tfm||{},t!=="transform")t=Hn[t]||t,~t.indexOf(",")?t.split(",").forEach(function(o){return n.tfm[o]=oi(i,o)}):this.tfm[t]=a.x?a[t]:oi(i,t),t===tn&&(this.tfm.zOrigin=a.zOrigin);else return Hn.transform.split(",").forEach(function(o){return r.call(n,o,e)});if(this.props.indexOf(pe)>=0)return;a.svg&&(this.svgo=i.getAttribute("data-svg-origin"),this.props.push(tn,e,"")),t=pe}(s||e)&&this.props.push(t,e,s[t])},$d=function(t){t.translate&&(t.removeProperty("translate"),t.removeProperty("scale"),t.removeProperty("rotate"))},_y=function(){var t=this.props,e=this.target,n=e.style,i=e._gsap,s,a;for(s=0;s<t.length;s+=3)t[s+1]?t[s+1]===2?e[t[s]](t[s+2]):e[t[s]]=t[s+2]:t[s+2]?n[t[s]]=t[s+2]:n.removeProperty(t[s].substr(0,2)==="--"?t[s]:t[s].replace(Nh,"-$1").toLowerCase());if(this.tfm){for(a in this.tfm)i[a]=this.tfm[a];i.svg&&(i.renderTransform(),e.setAttribute("data-svg-origin",this.svgo||"")),s=Uh(),(!s||!s.isStart)&&!n[pe]&&($d(n),i.zOrigin&&n[tn]&&(n[tn]+=" "+i.zOrigin+"px",i.zOrigin=0,i.renderTransform()),i.uncache=1)}},Jd=function(t,e){var n={target:t,props:[],revert:_y,save:xy};return t._gsap||Oe.core.getCache(t),e&&t.style&&t.nodeType&&e.split(",").forEach(function(i){return n.save(i)}),n},Kd,Ph=function(t,e){var n=Ri.createElementNS?Ri.createElementNS((e||"http://www.w3.org/1999/xhtml").replace(/^https/,"http"),t):Ri.createElement(t);return n&&n.style?n:Ri.createElement(t)},Mn=function r(t,e,n){var i=getComputedStyle(t);return i[e]||i.getPropertyValue(e.replace(Nh,"-$1").toLowerCase())||i.getPropertyValue(e)||!n&&r(t,rs(e)||e,1)||""},zd="O,Moz,ms,Ms,Webkit".split(","),rs=function(t,e,n){var i=e||pr,s=i.style,a=5;if(t in s&&!n)return t;for(t=t.charAt(0).toUpperCase()+t.substr(1);a--&&!(zd[a]+t in s););return a<0?null:(a===3?"ms":a>=0?zd[a]:"")+t},Ih=function(){sy()&&window.document&&(Od=window,Ri=Od.document,ns=Ri.documentElement,pr=Ph("div")||{style:{}},ry=Ph("div"),pe=rs(pe),tn=pe+"Origin",pr.style.cssText="border-width:0;line-height:0;position:absolute;padding:0",Kd=!!rs("perspective"),Uh=Oe.core.reverting,Dh=1)},Vd=function(t){var e=t.ownerSVGElement,n=Ph("svg",e&&e.getAttribute("xmlns")||"http://www.w3.org/2000/svg"),i=t.cloneNode(!0),s;i.style.display="block",n.appendChild(i),ns.appendChild(n);try{s=i.getBBox()}catch{}return n.removeChild(i),ns.removeChild(n),s},Gd=function(t,e){for(var n=e.length;n--;)if(t.hasAttribute(e[n]))return t.getAttribute(e[n])},jd=function(t){var e,n;try{e=t.getBBox()}catch{e=Vd(t),n=1}return e&&(e.width||e.height)||n||(e=Vd(t)),e&&!e.width&&!e.x&&!e.y?{x:+Gd(t,["x","cx","x1"])||0,y:+Gd(t,["y","cy","y1"])||0,width:0,height:0}:e},Qd=function(t){return!!(t.getCTM&&(!t.parentNode||t.ownerSVGElement)&&jd(t))},mr=function(t,e){if(e){var n=t.style,i;e in ci&&e!==tn&&(e=pe),n.removeProperty?(i=e.substr(0,2),(i==="ms"||e.substr(0,6)==="webkit")&&(e="-"+e),n.removeProperty(i==="--"?e:e.replace(Nh,"-$1").toLowerCase())):n.removeAttribute(e)}},Pi=function(t,e,n,i,s,a){var o=new Ve(t._pt,e,n,0,1,a?Zd:Yd);return t._pt=o,o.b=i,o.e=s,t._props.push(n),o},Hd={deg:1,rad:1,turn:1},vy={grid:1,flex:1},Ii=function r(t,e,n,i){var s=parseFloat(n)||0,a=(n+"").trim().substr((s+"").length)||"px",o=pr.style,c=ay.test(e),l=t.tagName.toLowerCase()==="svg",h=(l?"client":"offset")+(c?"Width":"Height"),u=100,f=i==="px",d=i==="%",v,_,g,m;if(i===a||!s||Hd[i]||Hd[a])return s;if(a!=="px"&&!f&&(s=r(t,e,n,"px")),m=t.getCTM&&Qd(t),(d||a==="%")&&(ci[e]||~e.indexOf("adius")))return v=m?t.getBBox()[c?"width":"height"]:t[h],ve(d?s/v*u:s/100*v);if(o[c?"width":"height"]=u+(f?a:i),_=i!=="rem"&&~e.indexOf("adius")||i==="em"&&t.appendChild&&!l?t:t.parentNode,m&&(_=(t.ownerSVGElement||{}).parentNode),(!_||_===Ri||!_.appendChild)&&(_=Ri.body),g=_._gsap,g&&d&&g.width&&c&&g.time===Ke.time&&!g.uncache)return ve(s/g.width*u);if(d&&(e==="height"||e==="width")){var T=t.style[e];t.style[e]=u+i,v=t[h],T?t.style[e]=T:mr(t,e)}else(d||a==="%")&&!vy[Mn(_,"display")]&&(o.position=Mn(t,"position")),_===t&&(o.position="static"),_.appendChild(pr),v=pr[h],_.removeChild(pr),o.position="absolute";return c&&d&&(g=Ei(_),g.time=Ke.time,g.width=_[h]),ve(f?v*s/u:v&&s?u/v*s:0)},oi=function(t,e,n,i){var s;return Dh||Ih(),e in Hn&&e!=="transform"&&(e=Hn[e],~e.indexOf(",")&&(e=e.split(",")[0])),ci[e]&&e!=="transform"?(s=ta(t,i),s=e!=="transformOrigin"?s[e]:s.svg?s.origin:xc(Mn(t,tn))+" "+s.zOrigin+"px"):(s=t.style[e],(!s||s==="auto"||i||~(s+"").indexOf("calc("))&&(s=gc[e]&&gc[e](t,e,n)||Mn(t,e)||xh(t,e)||(e==="opacity"?1:0))),n&&!~(s+"").trim().indexOf(" ")?Ii(t,e,s,n)+n:s},yy=function(t,e,n,i){if(!n||n==="none"){var s=rs(e,t,1),a=s&&Mn(t,s,1);a&&a!==n?(e=s,n=a):e==="borderColor"&&(n=Mn(t,"borderTopColor"))}var o=new Ve(this._pt,t.style,e,0,1,Th),c=0,l=0,h,u,f,d,v,_,g,m,T,w,A,C;if(o.b=n,o.e=i,n+="",i+="",i.substring(0,6)==="var(--"&&(i=Mn(t,i.substring(4,i.indexOf(")")))),i==="auto"&&(_=t.style[e],t.style[e]=i,i=Mn(t,e)||i,_?t.style[e]=_:mr(t,e)),h=[n,i],vh(h),n=h[0],i=h[1],f=n.match(cr)||[],C=i.match(cr)||[],C.length){for(;u=cr.exec(i);)g=u[0],T=i.substring(c,u.index),v?v=(v+1)%5:(T.substr(-5)==="rgba("||T.substr(-5)==="hsla(")&&(v=1),g!==(_=f[l++]||"")&&(d=parseFloat(_)||0,A=_.substr((d+"").length),g.charAt(1)==="="&&(g=lr(d,g)+A),m=parseFloat(g),w=g.substr((m+"").length),c=cr.lastIndex-w.length,w||(w=w||Qe.units[e]||A,c===i.length&&(i+=w,o.e+=w)),A!==w&&(d=Ii(t,e,_,w)||0),o._pt={_next:o._pt,p:T||l===1?T:",",s:d,c:m-d,m:v&&v<4||e==="zIndex"?Math.round:0});o.c=c<i.length?i.substring(c,i.length):""}else o.r=e==="display"&&i==="none"?Zd:Yd;return fh.test(i)&&(o.e=0),this._pt=o,o},Wd={top:"0%",bottom:"100%",left:"0%",right:"100%",center:"50%"},by=function(t){var e=t.split(" "),n=e[0],i=e[1]||"50%";return(n==="top"||n==="bottom"||i==="left"||i==="right")&&(t=n,n=i,i=t),e[0]=Wd[n]||n,e[1]=Wd[i]||i,e.join(" ")},My=function(t,e){if(e.tween&&e.tween._time===e.tween._dur){var n=e.t,i=n.style,s=e.u,a=n._gsap,o,c,l;if(s==="all"||s===!0)i.cssText="",c=1;else for(s=s.split(","),l=s.length;--l>-1;)o=s[l],ci[o]&&(c=1,o=o==="transformOrigin"?tn:pe),mr(n,o);c&&(mr(n,pe),a&&(a.svg&&n.removeAttribute("transform"),i.scale=i.rotate=i.translate="none",ta(n,1),a.uncache=1,$d(i)))}},gc={clearProps:function(t,e,n,i,s){if(s.data!=="isFromStart"){var a=t._pt=new Ve(t._pt,e,n,0,0,My);return a.u=i,a.pr=-10,a.tween=s,t._props.push(n),1}}},Qs=[1,0,0,1,0,0],tp={},ep=function(t){return t==="matrix(1, 0, 0, 1, 0, 0)"||t==="none"||!t},Xd=function(t){var e=Mn(t,pe);return ep(e)?Qs:e.substr(7).match(uh).map(ve)},Fh=function(t,e){var n=t._gsap||Ei(t),i=t.style,s=Xd(t),a,o,c,l;return n.svg&&t.getAttribute("transform")?(c=t.transform.baseVal.consolidate().matrix,s=[c.a,c.b,c.c,c.d,c.e,c.f],s.join(",")==="1,0,0,1,0,0"?Qs:s):(s===Qs&&!t.offsetParent&&t!==ns&&!n.svg&&(c=i.display,i.display="block",a=t.parentNode,(!a||!t.offsetParent&&!t.getBoundingClientRect().width)&&(l=1,o=t.nextElementSibling,ns.appendChild(t)),s=Xd(t),c?i.display=c:mr(t,"display"),l&&(o?a.insertBefore(t,o):a?a.appendChild(t):ns.removeChild(t))),e&&s.length>6?[s[0],s[1],s[4],s[5],s[12],s[13]]:s)},Lh=function(t,e,n,i,s,a){var o=t._gsap,c=s||Fh(t,!0),l=o.xOrigin||0,h=o.yOrigin||0,u=o.xOffset||0,f=o.yOffset||0,d=c[0],v=c[1],_=c[2],g=c[3],m=c[4],T=c[5],w=e.split(" "),A=parseFloat(w[0])||0,C=parseFloat(w[1])||0,E,P,F,y;n?c!==Qs&&(P=d*g-v*_)&&(F=A*(g/P)+C*(-_/P)+(_*T-g*m)/P,y=A*(-v/P)+C*(d/P)-(d*T-v*m)/P,A=F,C=y):(E=jd(t),A=E.x+(~w[0].indexOf("%")?A/100*E.width:A),C=E.y+(~(w[1]||w[0]).indexOf("%")?C/100*E.height:C)),i||i!==!1&&o.smooth?(m=A-l,T=C-h,o.xOffset=u+(m*d+T*_)-m,o.yOffset=f+(m*v+T*g)-T):o.xOffset=o.yOffset=0,o.xOrigin=A,o.yOrigin=C,o.smooth=!!i,o.origin=e,o.originIsAbsolute=!!n,t.style[tn]="0px 0px",a&&(Pi(a,o,"xOrigin",l,A),Pi(a,o,"yOrigin",h,C),Pi(a,o,"xOffset",u,o.xOffset),Pi(a,o,"yOffset",f,o.yOffset)),t.setAttribute("data-svg-origin",A+" "+C)},ta=function(t,e){var n=t._gsap||new yh(t);if("x"in n&&!e&&!n.uncache)return n;var i=t.style,s=n.scaleX<0,a="px",o="deg",c=getComputedStyle(t),l=Mn(t,tn)||"0",h,u,f,d,v,_,g,m,T,w,A,C,E,P,F,y,M,N,G,H,Z,J,Y,at,W,ut,ft,Et,Ut,Kt,Vt,qt;return h=u=f=_=g=m=T=w=A=0,d=v=1,n.svg=!!(t.getCTM&&Qd(t)),c.translate&&((c.translate!=="none"||c.scale!=="none"||c.rotate!=="none")&&(i[pe]=(c.translate!=="none"?"translate3d("+(c.translate+" 0 0").split(" ").slice(0,3).join(", ")+") ":"")+(c.rotate!=="none"?"rotate("+c.rotate+") ":"")+(c.scale!=="none"?"scale("+c.scale.split(" ").join(",")+") ":"")+(c[pe]!=="none"?c[pe]:"")),i.scale=i.rotate=i.translate="none"),P=Fh(t,n.svg),n.svg&&(n.uncache?(W=t.getBBox(),l=n.xOrigin-W.x+"px "+(n.yOrigin-W.y)+"px",at=""):at=!e&&t.getAttribute("data-svg-origin"),Lh(t,at||l,!!at||n.originIsAbsolute,n.smooth!==!1,P)),C=n.xOrigin||0,E=n.yOrigin||0,P!==Qs&&(N=P[0],G=P[1],H=P[2],Z=P[3],h=J=P[4],u=Y=P[5],P.length===6?(d=Math.sqrt(N*N+G*G),v=Math.sqrt(Z*Z+H*H),_=N||G?es(G,N)*dr:0,T=H||Z?es(H,Z)*dr+_:0,T&&(v*=Math.abs(Math.cos(T*is))),n.svg&&(h-=C-(C*N+E*H),u-=E-(C*G+E*Z))):(qt=P[6],Kt=P[7],ft=P[8],Et=P[9],Ut=P[10],Vt=P[11],h=P[12],u=P[13],f=P[14],F=es(qt,Ut),g=F*dr,F&&(y=Math.cos(-F),M=Math.sin(-F),at=J*y+ft*M,W=Y*y+Et*M,ut=qt*y+Ut*M,ft=J*-M+ft*y,Et=Y*-M+Et*y,Ut=qt*-M+Ut*y,Vt=Kt*-M+Vt*y,J=at,Y=W,qt=ut),F=es(-H,Ut),m=F*dr,F&&(y=Math.cos(-F),M=Math.sin(-F),at=N*y-ft*M,W=G*y-Et*M,ut=H*y-Ut*M,Vt=Z*M+Vt*y,N=at,G=W,H=ut),F=es(G,N),_=F*dr,F&&(y=Math.cos(F),M=Math.sin(F),at=N*y+G*M,W=J*y+Y*M,G=G*y-N*M,Y=Y*y-J*M,N=at,J=W),g&&Math.abs(g)+Math.abs(_)>359.9&&(g=_=0,m=180-m),d=ve(Math.sqrt(N*N+G*G+H*H)),v=ve(Math.sqrt(Y*Y+qt*qt)),F=es(J,Y),T=Math.abs(F)>2e-4?F*dr:0,A=Vt?1/(Vt<0?-Vt:Vt):0),n.svg&&(at=t.getAttribute("transform"),n.forceCSS=t.setAttribute("transform","")||!ep(Mn(t,pe)),at&&t.setAttribute("transform",at))),Math.abs(T)>90&&Math.abs(T)<270&&(s?(d*=-1,T+=_<=0?180:-180,_+=_<=0?180:-180):(v*=-1,T+=T<=0?180:-180)),e=e||n.uncache,n.x=h-((n.xPercent=h&&(!e&&n.xPercent||(Math.round(t.offsetWidth/2)===Math.round(-h)?-50:0)))?t.offsetWidth*n.xPercent/100:0)+a,n.y=u-((n.yPercent=u&&(!e&&n.yPercent||(Math.round(t.offsetHeight/2)===Math.round(-u)?-50:0)))?t.offsetHeight*n.yPercent/100:0)+a,n.z=f+a,n.scaleX=ve(d),n.scaleY=ve(v),n.rotation=ve(_)+o,n.rotationX=ve(g)+o,n.rotationY=ve(m)+o,n.skewX=T+o,n.skewY=w+o,n.transformPerspective=A+a,(n.zOrigin=parseFloat(l.split(" ")[2])||!e&&n.zOrigin||0)&&(i[tn]=xc(l)),n.xOffset=n.yOffset=0,n.force3D=Qe.force3D,n.renderTransform=n.svg?wy:Kd?np:Sy,n.uncache=0,n},xc=function(t){return(t=t.split(" "))[0]+" "+t[1]},Ch=function(t,e,n){var i=Le(e);return ve(parseFloat(e)+parseFloat(Ii(t,"x",n+"px",i)))+i},Sy=function(t,e){e.z="0px",e.rotationY=e.rotationX="0deg",e.force3D=0,np(t,e)},ur="0deg",js="0px",fr=") ",np=function(t,e){var n=e||this,i=n.xPercent,s=n.yPercent,a=n.x,o=n.y,c=n.z,l=n.rotation,h=n.rotationY,u=n.rotationX,f=n.skewX,d=n.skewY,v=n.scaleX,_=n.scaleY,g=n.transformPerspective,m=n.force3D,T=n.target,w=n.zOrigin,A="",C=m==="auto"&&t&&t!==1||m===!0;if(w&&(u!==ur||h!==ur)){var E=parseFloat(h)*is,P=Math.sin(E),F=Math.cos(E),y;E=parseFloat(u)*is,y=Math.cos(E),a=Ch(T,a,P*y*-w),o=Ch(T,o,-Math.sin(E)*-w),c=Ch(T,c,F*y*-w+w)}g!==js&&(A+="perspective("+g+fr),(i||s)&&(A+="translate("+i+"%, "+s+"%) "),(C||a!==js||o!==js||c!==js)&&(A+=c!==js||C?"translate3d("+a+", "+o+", "+c+") ":"translate("+a+", "+o+fr),l!==ur&&(A+="rotate("+l+fr),h!==ur&&(A+="rotateY("+h+fr),u!==ur&&(A+="rotateX("+u+fr),(f!==ur||d!==ur)&&(A+="skew("+f+", "+d+fr),(v!==1||_!==1)&&(A+="scale("+v+", "+_+fr),T.style[pe]=A||"translate(0, 0)"},wy=function(t,e){var n=e||this,i=n.xPercent,s=n.yPercent,a=n.x,o=n.y,c=n.rotation,l=n.skewX,h=n.skewY,u=n.scaleX,f=n.scaleY,d=n.target,v=n.xOrigin,_=n.yOrigin,g=n.xOffset,m=n.yOffset,T=n.forceCSS,w=parseFloat(a),A=parseFloat(o),C,E,P,F,y;c=parseFloat(c),l=parseFloat(l),h=parseFloat(h),h&&(h=parseFloat(h),l+=h,c+=h),c||l?(c*=is,l*=is,C=Math.cos(c)*u,E=Math.sin(c)*u,P=Math.sin(c-l)*-f,F=Math.cos(c-l)*f,l&&(h*=is,y=Math.tan(l-h),y=Math.sqrt(1+y*y),P*=y,F*=y,h&&(y=Math.tan(h),y=Math.sqrt(1+y*y),C*=y,E*=y)),C=ve(C),E=ve(E),P=ve(P),F=ve(F)):(C=u,F=f,E=P=0),(w&&!~(a+"").indexOf("px")||A&&!~(o+"").indexOf("px"))&&(w=Ii(d,"x",a,"px"),A=Ii(d,"y",o,"px")),(v||_||g||m)&&(w=ve(w+v-(v*C+_*P)+g),A=ve(A+_-(v*E+_*F)+m)),(i||s)&&(y=d.getBBox(),w=ve(w+i/100*y.width),A=ve(A+s/100*y.height)),y="matrix("+C+","+E+","+P+","+F+","+w+","+A+")",d.setAttribute("transform",y),T&&(d.style[pe]=y)},Ty=function(t,e,n,i,s){var a=360,o=Ce(s),c=parseFloat(s)*(o&&~s.indexOf("rad")?dr:1),l=c-i,h=i+l+"deg",u,f;return o&&(u=s.split("_")[1],u==="short"&&(l%=a,l!==l%(a/2)&&(l+=l<0?a:-a)),u==="cw"&&l<0?l=(l+a*kd)%a-~~(l/a)*a:u==="ccw"&&l>0&&(l=(l-a*kd)%a-~~(l/a)*a)),t._pt=f=new Ve(t._pt,e,n,i,l,cy),f.e=h,f.u="deg",t._props.push(n),f},qd=function(t,e){for(var n in e)t[n]=e[n];return t},Ey=function(t,e,n){var i=qd({},n._gsap),s="perspective,force3D,transformOrigin,svgOrigin",a=n.style,o,c,l,h,u,f,d,v;i.svg?(l=n.getAttribute("transform"),n.setAttribute("transform",""),a[pe]=e,o=ta(n,1),mr(n,pe),n.setAttribute("transform",l)):(l=getComputedStyle(n)[pe],a[pe]=e,o=ta(n,1),a[pe]=l);for(c in ci)l=i[c],h=o[c],l!==h&&s.indexOf(c)<0&&(d=Le(l),v=Le(h),u=d!==v?Ii(n,c,l,v):parseFloat(l),f=parseFloat(h),t._pt=new Ve(t._pt,o,c,u,f-u,Rh),t._pt.u=v||0,t._props.push(c));qd(o,i)};ze("padding,margin,Width,Radius",function(r,t){var e="Top",n="Right",i="Bottom",s="Left",a=(t<3?[e,n,i,s]:[e+s,e+n,i+n,i+s]).map(function(o){return t<2?r+o:"border"+o+r});gc[t>1?"border"+r:r]=function(o,c,l,h,u){var f,d;if(arguments.length<4)return f=a.map(function(v){return oi(o,v,l)}),d=f.join(" "),d.split(f[0]).length===5?f[0]:d;f=(h+"").split(" "),d={},a.forEach(function(v,_){return d[v]=f[_]=f[_]||f[(_-1)/2|0]}),o.init(c,d,u)}});var Oh={name:"css",register:Ih,targetTest:function(t){return t.style&&t.nodeType},init:function(t,e,n,i,s){var a=this._props,o=t.style,c=n.vars.startAt,l,h,u,f,d,v,_,g,m,T,w,A,C,E,P,F;Dh||Ih(),this.styles=this.styles||Jd(t),F=this.styles.props,this.tween=n;for(_ in e)if(_!=="autoRound"&&(h=e[_],!(Je[_]&&Mh(_,e,n,i,t,s)))){if(d=typeof h,v=gc[_],d==="function"&&(h=h.call(n,i,t,s),d=typeof h),d==="string"&&~h.indexOf("random(")&&(h=ts(h)),v)v(this,t,_,h,n)&&(P=1);else if(_.substr(0,2)==="--")l=(getComputedStyle(t).getPropertyValue(_)+"").trim(),h+="",si.lastIndex=0,si.test(l)||(g=Le(l),m=Le(h)),m?g!==m&&(l=Ii(t,_,l,m)+m):g&&(h+=g),this.add(o,"setProperty",l,h,i,s,0,0,_),a.push(_),F.push(_,0,o[_]);else if(d!=="undefined"){if(c&&_ in c?(l=typeof c[_]=="function"?c[_].call(n,i,t,s):c[_],Ce(l)&&~l.indexOf("random(")&&(l=ts(l)),Le(l+"")||l==="auto"||(l+=Qe.units[_]||Le(oi(t,_))||""),(l+"").charAt(1)==="="&&(l=oi(t,_))):l=oi(t,_),f=parseFloat(l),T=d==="string"&&h.charAt(1)==="="&&h.substr(0,2),T&&(h=h.substr(2)),u=parseFloat(h),_ in Hn&&(_==="autoAlpha"&&(f===1&&oi(t,"visibility")==="hidden"&&u&&(f=0),F.push("visibility",0,o.visibility),Pi(this,o,"visibility",f?"inherit":"hidden",u?"inherit":"hidden",!u)),_!=="scale"&&_!=="transform"&&(_=Hn[_],~_.indexOf(",")&&(_=_.split(",")[0]))),w=_ in ci,w){if(this.styles.save(_),d==="string"&&h.substring(0,6)==="var(--"&&(h=Mn(t,h.substring(4,h.indexOf(")"))),u=parseFloat(h)),A||(C=t._gsap,C.renderTransform&&!e.parseTransform||ta(t,e.parseTransform),E=e.smoothOrigin!==!1&&C.smooth,A=this._pt=new Ve(this._pt,o,pe,0,1,C.renderTransform,C,0,-1),A.dep=1),_==="scale")this._pt=new Ve(this._pt,C,"scaleY",C.scaleY,(T?lr(C.scaleY,T+u):u)-C.scaleY||0,Rh),this._pt.u=0,a.push("scaleY",_),_+="X";else if(_==="transformOrigin"){F.push(tn,0,o[tn]),h=by(h),C.svg?Lh(t,h,0,E,0,this):(m=parseFloat(h.split(" ")[2])||0,m!==C.zOrigin&&Pi(this,C,"zOrigin",C.zOrigin,m),Pi(this,o,_,xc(l),xc(h)));continue}else if(_==="svgOrigin"){Lh(t,h,1,E,0,this);continue}else if(_ in tp){Ty(this,C,_,f,T?lr(f,T+h):h);continue}else if(_==="smoothOrigin"){Pi(this,C,"smooth",C.smooth,h);continue}else if(_==="force3D"){C[_]=h;continue}else if(_==="transform"){Ey(this,h,t);continue}}else _ in o||(_=rs(_)||_);if(w||(u||u===0)&&(f||f===0)&&!oy.test(h)&&_ in o)g=(l+"").substr((f+"").length),u||(u=0),m=Le(h)||(_ in Qe.units?Qe.units[_]:g),g!==m&&(f=Ii(t,_,l,m)),this._pt=new Ve(this._pt,w?C:o,_,f,(T?lr(f,T+u):u)-f,!w&&(m==="px"||_==="zIndex")&&e.autoRound!==!1?hy:Rh),this._pt.u=m||0,g!==m&&m!=="%"&&(this._pt.b=l,this._pt.r=ly);else if(_ in o)yy.call(this,t,_,l,T?T+h:h);else if(_ in t)this.add(t,_,l||t[_],T?T+h:h,i,s);else if(_!=="parseTransform"){uc(_,h);continue}w||(_ in o?F.push(_,0,o[_]):typeof t[_]=="function"?F.push(_,2,t[_]()):F.push(_,1,l||t[_])),a.push(_)}}P&&Ah(this)},render:function(t,e){if(e.tween._time||!Uh())for(var n=e._pt;n;)n.r(t,n.d),n=n._next;else e.styles.revert()},get:oi,aliases:Hn,getSetter:function(t,e,n){var i=Hn[e];return i&&i.indexOf(",")<0&&(e=i),e in ci&&e!==tn&&(t._gsap.x||oi(t,"x"))?n&&Bd===n?e==="scale"?py:dy:(Bd=n||{})&&(e==="scale"?my:gy):t.style&&!hc(t.style[e])?uy:~e.indexOf("-")?fy:mc(t,e)},core:{_removeProperty:mr,_getMatrix:Fh}};Oe.utils.checkPrefix=rs;Oe.core.getStyleSaver=Jd;(function(r,t,e,n){var i=ze(r+","+t+","+e,function(s){ci[s]=1});ze(t,function(s){Qe.units[s]="deg",tp[s]=1}),Hn[i[13]]=r+","+t,ze(n,function(s){var a=s.split(":");Hn[a[1]]=i[a[0]]})})("x,y,z,scale,scaleX,scaleY,xPercent,yPercent","rotation,rotationX,rotationY,skewX,skewY","transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective","0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY");ze("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective",function(r){Qe.units[r]="px"});Oe.registerPlugin(Oh);var _c=Oe.registerPlugin(Oh)||Oe,E1=_c.core.Tween;var ea=class{constructor(){this.init()}init(){ip.default.init({sync:!0,transitions:[{name:"fade",leave(t){return _c.to(t.current.container,{opacity:0,duration:.5})},enter(t){return _c.from(t.next.container,{opacity:0,duration:.5})},after(){new ir,new rr}}]})}};nu.init({disableScroll:!0});new ls;new zs;new ir;new Vs;new rr;new ea;
/*! Bundled license information:

three/build/three.core.js:
three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2025 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)

gsap/gsap-core.js:
  (*!
   * GSAP 3.13.0
   * https://gsap.com
   *
   * @license Copyright 2008-2025, GreenSock. All rights reserved.
   * Subject to the terms at https://gsap.com/standard-license
   * @author: Jack Doyle, jack@greensock.com
  *)

gsap/CSSPlugin.js:
  (*!
   * CSSPlugin 3.13.0
   * https://gsap.com
   *
   * Copyright 2008-2025, GreenSock. All rights reserved.
   * Subject to the terms at https://gsap.com/standard-license
   * @author: Jack Doyle, jack@greensock.com
  *)
*/
//# sourceMappingURL=main.js.map
