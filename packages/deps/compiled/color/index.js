(()=>{var r={598:(r,a,e)=>{var n=e(120);var t={};for(var o in n){if(n.hasOwnProperty(o)){t[n[o]]=o}}var l=r.exports={rgb:{channels:3,labels:"rgb"},hsl:{channels:3,labels:"hsl"},hsv:{channels:3,labels:"hsv"},hwb:{channels:3,labels:"hwb"},cmyk:{channels:4,labels:"cmyk"},xyz:{channels:3,labels:"xyz"},lab:{channels:3,labels:"lab"},lch:{channels:3,labels:"lch"},hex:{channels:1,labels:["hex"]},keyword:{channels:1,labels:["keyword"]},ansi16:{channels:1,labels:["ansi16"]},ansi256:{channels:1,labels:["ansi256"]},hcg:{channels:3,labels:["h","c","g"]},apple:{channels:3,labels:["r16","g16","b16"]},gray:{channels:1,labels:["gray"]}};for(var i in l){if(l.hasOwnProperty(i)){if(!("channels"in l[i])){throw new Error("missing channels property: "+i)}if(!("labels"in l[i])){throw new Error("missing channel labels property: "+i)}if(l[i].labels.length!==l[i].channels){throw new Error("channel and label counts mismatch: "+i)}var s=l[i].channels;var u=l[i].labels;delete l[i].channels;delete l[i].labels;Object.defineProperty(l[i],"channels",{value:s});Object.defineProperty(l[i],"labels",{value:u})}}l.rgb.hsl=function(r){var a=r[0]/255;var e=r[1]/255;var n=r[2]/255;var t=Math.min(a,e,n);var o=Math.max(a,e,n);var l=o-t;var i;var s;var u;if(o===t){i=0}else if(a===o){i=(e-n)/l}else if(e===o){i=2+(n-a)/l}else if(n===o){i=4+(a-e)/l}i=Math.min(i*60,360);if(i<0){i+=360}u=(t+o)/2;if(o===t){s=0}else if(u<=.5){s=l/(o+t)}else{s=l/(2-o-t)}return[i,s*100,u*100]};l.rgb.hsv=function(r){var a;var e;var n;var t;var o;var l=r[0]/255;var i=r[1]/255;var s=r[2]/255;var u=Math.max(l,i,s);var h=u-Math.min(l,i,s);var diffc=function(r){return(u-r)/6/h+1/2};if(h===0){t=o=0}else{o=h/u;a=diffc(l);e=diffc(i);n=diffc(s);if(l===u){t=n-e}else if(i===u){t=1/3+a-n}else if(s===u){t=2/3+e-a}if(t<0){t+=1}else if(t>1){t-=1}}return[t*360,o*100,u*100]};l.rgb.hwb=function(r){var a=r[0];var e=r[1];var n=r[2];var t=l.rgb.hsl(r)[0];var o=1/255*Math.min(a,Math.min(e,n));n=1-1/255*Math.max(a,Math.max(e,n));return[t,o*100,n*100]};l.rgb.cmyk=function(r){var a=r[0]/255;var e=r[1]/255;var n=r[2]/255;var t;var o;var l;var i;i=Math.min(1-a,1-e,1-n);t=(1-a-i)/(1-i)||0;o=(1-e-i)/(1-i)||0;l=(1-n-i)/(1-i)||0;return[t*100,o*100,l*100,i*100]};function comparativeDistance(r,a){return Math.pow(r[0]-a[0],2)+Math.pow(r[1]-a[1],2)+Math.pow(r[2]-a[2],2)}l.rgb.keyword=function(r){var a=t[r];if(a){return a}var e=Infinity;var o;for(var l in n){if(n.hasOwnProperty(l)){var i=n[l];var s=comparativeDistance(r,i);if(s<e){e=s;o=l}}}return o};l.keyword.rgb=function(r){return n[r]};l.rgb.xyz=function(r){var a=r[0]/255;var e=r[1]/255;var n=r[2]/255;a=a>.04045?Math.pow((a+.055)/1.055,2.4):a/12.92;e=e>.04045?Math.pow((e+.055)/1.055,2.4):e/12.92;n=n>.04045?Math.pow((n+.055)/1.055,2.4):n/12.92;var t=a*.4124+e*.3576+n*.1805;var o=a*.2126+e*.7152+n*.0722;var l=a*.0193+e*.1192+n*.9505;return[t*100,o*100,l*100]};l.rgb.lab=function(r){var a=l.rgb.xyz(r);var e=a[0];var n=a[1];var t=a[2];var o;var i;var s;e/=95.047;n/=100;t/=108.883;e=e>.008856?Math.pow(e,1/3):7.787*e+16/116;n=n>.008856?Math.pow(n,1/3):7.787*n+16/116;t=t>.008856?Math.pow(t,1/3):7.787*t+16/116;o=116*n-16;i=500*(e-n);s=200*(n-t);return[o,i,s]};l.hsl.rgb=function(r){var a=r[0]/360;var e=r[1]/100;var n=r[2]/100;var t;var o;var l;var i;var s;if(e===0){s=n*255;return[s,s,s]}if(n<.5){o=n*(1+e)}else{o=n+e-n*e}t=2*n-o;i=[0,0,0];for(var u=0;u<3;u++){l=a+1/3*-(u-1);if(l<0){l++}if(l>1){l--}if(6*l<1){s=t+(o-t)*6*l}else if(2*l<1){s=o}else if(3*l<2){s=t+(o-t)*(2/3-l)*6}else{s=t}i[u]=s*255}return i};l.hsl.hsv=function(r){var a=r[0];var e=r[1]/100;var n=r[2]/100;var t=e;var o=Math.max(n,.01);var l;var i;n*=2;e*=n<=1?n:2-n;t*=o<=1?o:2-o;i=(n+e)/2;l=n===0?2*t/(o+t):2*e/(n+e);return[a,l*100,i*100]};l.hsv.rgb=function(r){var a=r[0]/60;var e=r[1]/100;var n=r[2]/100;var t=Math.floor(a)%6;var o=a-Math.floor(a);var l=255*n*(1-e);var i=255*n*(1-e*o);var s=255*n*(1-e*(1-o));n*=255;switch(t){case 0:return[n,s,l];case 1:return[i,n,l];case 2:return[l,n,s];case 3:return[l,i,n];case 4:return[s,l,n];case 5:return[n,l,i]}};l.hsv.hsl=function(r){var a=r[0];var e=r[1]/100;var n=r[2]/100;var t=Math.max(n,.01);var o;var l;var i;i=(2-e)*n;o=(2-e)*t;l=e*t;l/=o<=1?o:2-o;l=l||0;i/=2;return[a,l*100,i*100]};l.hwb.rgb=function(r){var a=r[0]/360;var e=r[1]/100;var n=r[2]/100;var t=e+n;var o;var l;var i;var s;if(t>1){e/=t;n/=t}o=Math.floor(6*a);l=1-n;i=6*a-o;if((o&1)!==0){i=1-i}s=e+i*(l-e);var u;var h;var v;switch(o){default:case 6:case 0:u=l;h=s;v=e;break;case 1:u=s;h=l;v=e;break;case 2:u=e;h=l;v=s;break;case 3:u=e;h=s;v=l;break;case 4:u=s;h=e;v=l;break;case 5:u=l;h=e;v=s;break}return[u*255,h*255,v*255]};l.cmyk.rgb=function(r){var a=r[0]/100;var e=r[1]/100;var n=r[2]/100;var t=r[3]/100;var o;var l;var i;o=1-Math.min(1,a*(1-t)+t);l=1-Math.min(1,e*(1-t)+t);i=1-Math.min(1,n*(1-t)+t);return[o*255,l*255,i*255]};l.xyz.rgb=function(r){var a=r[0]/100;var e=r[1]/100;var n=r[2]/100;var t;var o;var l;t=a*3.2406+e*-1.5372+n*-.4986;o=a*-.9689+e*1.8758+n*.0415;l=a*.0557+e*-.204+n*1.057;t=t>.0031308?1.055*Math.pow(t,1/2.4)-.055:t*12.92;o=o>.0031308?1.055*Math.pow(o,1/2.4)-.055:o*12.92;l=l>.0031308?1.055*Math.pow(l,1/2.4)-.055:l*12.92;t=Math.min(Math.max(0,t),1);o=Math.min(Math.max(0,o),1);l=Math.min(Math.max(0,l),1);return[t*255,o*255,l*255]};l.xyz.lab=function(r){var a=r[0];var e=r[1];var n=r[2];var t;var o;var l;a/=95.047;e/=100;n/=108.883;a=a>.008856?Math.pow(a,1/3):7.787*a+16/116;e=e>.008856?Math.pow(e,1/3):7.787*e+16/116;n=n>.008856?Math.pow(n,1/3):7.787*n+16/116;t=116*e-16;o=500*(a-e);l=200*(e-n);return[t,o,l]};l.lab.xyz=function(r){var a=r[0];var e=r[1];var n=r[2];var t;var o;var l;o=(a+16)/116;t=e/500+o;l=o-n/200;var i=Math.pow(o,3);var s=Math.pow(t,3);var u=Math.pow(l,3);o=i>.008856?i:(o-16/116)/7.787;t=s>.008856?s:(t-16/116)/7.787;l=u>.008856?u:(l-16/116)/7.787;t*=95.047;o*=100;l*=108.883;return[t,o,l]};l.lab.lch=function(r){var a=r[0];var e=r[1];var n=r[2];var t;var o;var l;t=Math.atan2(n,e);o=t*360/2/Math.PI;if(o<0){o+=360}l=Math.sqrt(e*e+n*n);return[a,l,o]};l.lch.lab=function(r){var a=r[0];var e=r[1];var n=r[2];var t;var o;var l;l=n/360*2*Math.PI;t=e*Math.cos(l);o=e*Math.sin(l);return[a,t,o]};l.rgb.ansi16=function(r){var a=r[0];var e=r[1];var n=r[2];var t=1 in arguments?arguments[1]:l.rgb.hsv(r)[2];t=Math.round(t/50);if(t===0){return 30}var o=30+(Math.round(n/255)<<2|Math.round(e/255)<<1|Math.round(a/255));if(t===2){o+=60}return o};l.hsv.ansi16=function(r){return l.rgb.ansi16(l.hsv.rgb(r),r[2])};l.rgb.ansi256=function(r){var a=r[0];var e=r[1];var n=r[2];if(a===e&&e===n){if(a<8){return 16}if(a>248){return 231}return Math.round((a-8)/247*24)+232}var t=16+36*Math.round(a/255*5)+6*Math.round(e/255*5)+Math.round(n/255*5);return t};l.ansi16.rgb=function(r){var a=r%10;if(a===0||a===7){if(r>50){a+=3.5}a=a/10.5*255;return[a,a,a]}var e=(~~(r>50)+1)*.5;var n=(a&1)*e*255;var t=(a>>1&1)*e*255;var o=(a>>2&1)*e*255;return[n,t,o]};l.ansi256.rgb=function(r){if(r>=232){var a=(r-232)*10+8;return[a,a,a]}r-=16;var e;var n=Math.floor(r/36)/5*255;var t=Math.floor((e=r%36)/6)/5*255;var o=e%6/5*255;return[n,t,o]};l.rgb.hex=function(r){var a=((Math.round(r[0])&255)<<16)+((Math.round(r[1])&255)<<8)+(Math.round(r[2])&255);var e=a.toString(16).toUpperCase();return"000000".substring(e.length)+e};l.hex.rgb=function(r){var a=r.toString(16).match(/[a-f0-9]{6}|[a-f0-9]{3}/i);if(!a){return[0,0,0]}var e=a[0];if(a[0].length===3){e=e.split("").map((function(r){return r+r})).join("")}var n=parseInt(e,16);var t=n>>16&255;var o=n>>8&255;var l=n&255;return[t,o,l]};l.rgb.hcg=function(r){var a=r[0]/255;var e=r[1]/255;var n=r[2]/255;var t=Math.max(Math.max(a,e),n);var o=Math.min(Math.min(a,e),n);var l=t-o;var i;var s;if(l<1){i=o/(1-l)}else{i=0}if(l<=0){s=0}else if(t===a){s=(e-n)/l%6}else if(t===e){s=2+(n-a)/l}else{s=4+(a-e)/l+4}s/=6;s%=1;return[s*360,l*100,i*100]};l.hsl.hcg=function(r){var a=r[1]/100;var e=r[2]/100;var n=1;var t=0;if(e<.5){n=2*a*e}else{n=2*a*(1-e)}if(n<1){t=(e-.5*n)/(1-n)}return[r[0],n*100,t*100]};l.hsv.hcg=function(r){var a=r[1]/100;var e=r[2]/100;var n=a*e;var t=0;if(n<1){t=(e-n)/(1-n)}return[r[0],n*100,t*100]};l.hcg.rgb=function(r){var a=r[0]/360;var e=r[1]/100;var n=r[2]/100;if(e===0){return[n*255,n*255,n*255]}var t=[0,0,0];var o=a%1*6;var l=o%1;var i=1-l;var s=0;switch(Math.floor(o)){case 0:t[0]=1;t[1]=l;t[2]=0;break;case 1:t[0]=i;t[1]=1;t[2]=0;break;case 2:t[0]=0;t[1]=1;t[2]=l;break;case 3:t[0]=0;t[1]=i;t[2]=1;break;case 4:t[0]=l;t[1]=0;t[2]=1;break;default:t[0]=1;t[1]=0;t[2]=i}s=(1-e)*n;return[(e*t[0]+s)*255,(e*t[1]+s)*255,(e*t[2]+s)*255]};l.hcg.hsv=function(r){var a=r[1]/100;var e=r[2]/100;var n=a+e*(1-a);var t=0;if(n>0){t=a/n}return[r[0],t*100,n*100]};l.hcg.hsl=function(r){var a=r[1]/100;var e=r[2]/100;var n=e*(1-a)+.5*a;var t=0;if(n>0&&n<.5){t=a/(2*n)}else if(n>=.5&&n<1){t=a/(2*(1-n))}return[r[0],t*100,n*100]};l.hcg.hwb=function(r){var a=r[1]/100;var e=r[2]/100;var n=a+e*(1-a);return[r[0],(n-a)*100,(1-n)*100]};l.hwb.hcg=function(r){var a=r[1]/100;var e=r[2]/100;var n=1-e;var t=n-a;var o=0;if(t<1){o=(n-t)/(1-t)}return[r[0],t*100,o*100]};l.apple.rgb=function(r){return[r[0]/65535*255,r[1]/65535*255,r[2]/65535*255]};l.rgb.apple=function(r){return[r[0]/255*65535,r[1]/255*65535,r[2]/255*65535]};l.gray.rgb=function(r){return[r[0]/100*255,r[0]/100*255,r[0]/100*255]};l.gray.hsl=l.gray.hsv=function(r){return[0,0,r[0]]};l.gray.hwb=function(r){return[0,100,r[0]]};l.gray.cmyk=function(r){return[0,0,0,r[0]]};l.gray.lab=function(r){return[r[0],0,0]};l.gray.hex=function(r){var a=Math.round(r[0]/100*255)&255;var e=(a<<16)+(a<<8)+a;var n=e.toString(16).toUpperCase();return"000000".substring(n.length)+n};l.rgb.gray=function(r){var a=(r[0]+r[1]+r[2])/3;return[a/255*100]}},830:(r,a,e)=>{var n=e(598);var t=e(180);var o={};var l=Object.keys(n);function wrapRaw(r){var wrappedFn=function(a){if(a===undefined||a===null){return a}if(arguments.length>1){a=Array.prototype.slice.call(arguments)}return r(a)};if("conversion"in r){wrappedFn.conversion=r.conversion}return wrappedFn}function wrapRounded(r){var wrappedFn=function(a){if(a===undefined||a===null){return a}if(arguments.length>1){a=Array.prototype.slice.call(arguments)}var e=r(a);if(typeof e==="object"){for(var n=e.length,t=0;t<n;t++){e[t]=Math.round(e[t])}}return e};if("conversion"in r){wrappedFn.conversion=r.conversion}return wrappedFn}l.forEach((function(r){o[r]={};Object.defineProperty(o[r],"channels",{value:n[r].channels});Object.defineProperty(o[r],"labels",{value:n[r].labels});var a=t(r);var e=Object.keys(a);e.forEach((function(e){var n=a[e];o[r][e]=wrapRounded(n);o[r][e].raw=wrapRaw(n)}))}));r.exports=o},120:r=>{"use strict";r.exports={aliceblue:[240,248,255],antiquewhite:[250,235,215],aqua:[0,255,255],aquamarine:[127,255,212],azure:[240,255,255],beige:[245,245,220],bisque:[255,228,196],black:[0,0,0],blanchedalmond:[255,235,205],blue:[0,0,255],blueviolet:[138,43,226],brown:[165,42,42],burlywood:[222,184,135],cadetblue:[95,158,160],chartreuse:[127,255,0],chocolate:[210,105,30],coral:[255,127,80],cornflowerblue:[100,149,237],cornsilk:[255,248,220],crimson:[220,20,60],cyan:[0,255,255],darkblue:[0,0,139],darkcyan:[0,139,139],darkgoldenrod:[184,134,11],darkgray:[169,169,169],darkgreen:[0,100,0],darkgrey:[169,169,169],darkkhaki:[189,183,107],darkmagenta:[139,0,139],darkolivegreen:[85,107,47],darkorange:[255,140,0],darkorchid:[153,50,204],darkred:[139,0,0],darksalmon:[233,150,122],darkseagreen:[143,188,143],darkslateblue:[72,61,139],darkslategray:[47,79,79],darkslategrey:[47,79,79],darkturquoise:[0,206,209],darkviolet:[148,0,211],deeppink:[255,20,147],deepskyblue:[0,191,255],dimgray:[105,105,105],dimgrey:[105,105,105],dodgerblue:[30,144,255],firebrick:[178,34,34],floralwhite:[255,250,240],forestgreen:[34,139,34],fuchsia:[255,0,255],gainsboro:[220,220,220],ghostwhite:[248,248,255],gold:[255,215,0],goldenrod:[218,165,32],gray:[128,128,128],green:[0,128,0],greenyellow:[173,255,47],grey:[128,128,128],honeydew:[240,255,240],hotpink:[255,105,180],indianred:[205,92,92],indigo:[75,0,130],ivory:[255,255,240],khaki:[240,230,140],lavender:[230,230,250],lavenderblush:[255,240,245],lawngreen:[124,252,0],lemonchiffon:[255,250,205],lightblue:[173,216,230],lightcoral:[240,128,128],lightcyan:[224,255,255],lightgoldenrodyellow:[250,250,210],lightgray:[211,211,211],lightgreen:[144,238,144],lightgrey:[211,211,211],lightpink:[255,182,193],lightsalmon:[255,160,122],lightseagreen:[32,178,170],lightskyblue:[135,206,250],lightslategray:[119,136,153],lightslategrey:[119,136,153],lightsteelblue:[176,196,222],lightyellow:[255,255,224],lime:[0,255,0],limegreen:[50,205,50],linen:[250,240,230],magenta:[255,0,255],maroon:[128,0,0],mediumaquamarine:[102,205,170],mediumblue:[0,0,205],mediumorchid:[186,85,211],mediumpurple:[147,112,219],mediumseagreen:[60,179,113],mediumslateblue:[123,104,238],mediumspringgreen:[0,250,154],mediumturquoise:[72,209,204],mediumvioletred:[199,21,133],midnightblue:[25,25,112],mintcream:[245,255,250],mistyrose:[255,228,225],moccasin:[255,228,181],navajowhite:[255,222,173],navy:[0,0,128],oldlace:[253,245,230],olive:[128,128,0],olivedrab:[107,142,35],orange:[255,165,0],orangered:[255,69,0],orchid:[218,112,214],palegoldenrod:[238,232,170],palegreen:[152,251,152],paleturquoise:[175,238,238],palevioletred:[219,112,147],papayawhip:[255,239,213],peachpuff:[255,218,185],peru:[205,133,63],pink:[255,192,203],plum:[221,160,221],powderblue:[176,224,230],purple:[128,0,128],rebeccapurple:[102,51,153],red:[255,0,0],rosybrown:[188,143,143],royalblue:[65,105,225],saddlebrown:[139,69,19],salmon:[250,128,114],sandybrown:[244,164,96],seagreen:[46,139,87],seashell:[255,245,238],sienna:[160,82,45],silver:[192,192,192],skyblue:[135,206,235],slateblue:[106,90,205],slategray:[112,128,144],slategrey:[112,128,144],snow:[255,250,250],springgreen:[0,255,127],steelblue:[70,130,180],tan:[210,180,140],teal:[0,128,128],thistle:[216,191,216],tomato:[255,99,71],turquoise:[64,224,208],violet:[238,130,238],wheat:[245,222,179],white:[255,255,255],whitesmoke:[245,245,245],yellow:[255,255,0],yellowgreen:[154,205,50]}},180:(r,a,e)=>{var n=e(598);function buildGraph(){var r={};var a=Object.keys(n);for(var e=a.length,t=0;t<e;t++){r[a[t]]={distance:-1,parent:null}}return r}function deriveBFS(r){var a=buildGraph();var e=[r];a[r].distance=0;while(e.length){var t=e.pop();var o=Object.keys(n[t]);for(var l=o.length,i=0;i<l;i++){var s=o[i];var u=a[s];if(u.distance===-1){u.distance=a[t].distance+1;u.parent=t;e.unshift(s)}}}return a}function link(r,a){return function(e){return a(r(e))}}function wrapConversion(r,a){var e=[a[r].parent,r];var t=n[a[r].parent][r];var o=a[r].parent;while(a[o].parent){e.unshift(a[o].parent);t=link(n[a[o].parent][o],t);o=a[o].parent}t.conversion=e;return t}r.exports=function(r){var a=deriveBFS(r);var e={};var n=Object.keys(a);for(var t=n.length,o=0;o<t;o++){var l=n[o];var i=a[l];if(i.parent===null){continue}e[l]=wrapConversion(l,a)}return e}},407:r=>{"use strict";r.exports={aliceblue:[240,248,255],antiquewhite:[250,235,215],aqua:[0,255,255],aquamarine:[127,255,212],azure:[240,255,255],beige:[245,245,220],bisque:[255,228,196],black:[0,0,0],blanchedalmond:[255,235,205],blue:[0,0,255],blueviolet:[138,43,226],brown:[165,42,42],burlywood:[222,184,135],cadetblue:[95,158,160],chartreuse:[127,255,0],chocolate:[210,105,30],coral:[255,127,80],cornflowerblue:[100,149,237],cornsilk:[255,248,220],crimson:[220,20,60],cyan:[0,255,255],darkblue:[0,0,139],darkcyan:[0,139,139],darkgoldenrod:[184,134,11],darkgray:[169,169,169],darkgreen:[0,100,0],darkgrey:[169,169,169],darkkhaki:[189,183,107],darkmagenta:[139,0,139],darkolivegreen:[85,107,47],darkorange:[255,140,0],darkorchid:[153,50,204],darkred:[139,0,0],darksalmon:[233,150,122],darkseagreen:[143,188,143],darkslateblue:[72,61,139],darkslategray:[47,79,79],darkslategrey:[47,79,79],darkturquoise:[0,206,209],darkviolet:[148,0,211],deeppink:[255,20,147],deepskyblue:[0,191,255],dimgray:[105,105,105],dimgrey:[105,105,105],dodgerblue:[30,144,255],firebrick:[178,34,34],floralwhite:[255,250,240],forestgreen:[34,139,34],fuchsia:[255,0,255],gainsboro:[220,220,220],ghostwhite:[248,248,255],gold:[255,215,0],goldenrod:[218,165,32],gray:[128,128,128],green:[0,128,0],greenyellow:[173,255,47],grey:[128,128,128],honeydew:[240,255,240],hotpink:[255,105,180],indianred:[205,92,92],indigo:[75,0,130],ivory:[255,255,240],khaki:[240,230,140],lavender:[230,230,250],lavenderblush:[255,240,245],lawngreen:[124,252,0],lemonchiffon:[255,250,205],lightblue:[173,216,230],lightcoral:[240,128,128],lightcyan:[224,255,255],lightgoldenrodyellow:[250,250,210],lightgray:[211,211,211],lightgreen:[144,238,144],lightgrey:[211,211,211],lightpink:[255,182,193],lightsalmon:[255,160,122],lightseagreen:[32,178,170],lightskyblue:[135,206,250],lightslategray:[119,136,153],lightslategrey:[119,136,153],lightsteelblue:[176,196,222],lightyellow:[255,255,224],lime:[0,255,0],limegreen:[50,205,50],linen:[250,240,230],magenta:[255,0,255],maroon:[128,0,0],mediumaquamarine:[102,205,170],mediumblue:[0,0,205],mediumorchid:[186,85,211],mediumpurple:[147,112,219],mediumseagreen:[60,179,113],mediumslateblue:[123,104,238],mediumspringgreen:[0,250,154],mediumturquoise:[72,209,204],mediumvioletred:[199,21,133],midnightblue:[25,25,112],mintcream:[245,255,250],mistyrose:[255,228,225],moccasin:[255,228,181],navajowhite:[255,222,173],navy:[0,0,128],oldlace:[253,245,230],olive:[128,128,0],olivedrab:[107,142,35],orange:[255,165,0],orangered:[255,69,0],orchid:[218,112,214],palegoldenrod:[238,232,170],palegreen:[152,251,152],paleturquoise:[175,238,238],palevioletred:[219,112,147],papayawhip:[255,239,213],peachpuff:[255,218,185],peru:[205,133,63],pink:[255,192,203],plum:[221,160,221],powderblue:[176,224,230],purple:[128,0,128],rebeccapurple:[102,51,153],red:[255,0,0],rosybrown:[188,143,143],royalblue:[65,105,225],saddlebrown:[139,69,19],salmon:[250,128,114],sandybrown:[244,164,96],seagreen:[46,139,87],seashell:[255,245,238],sienna:[160,82,45],silver:[192,192,192],skyblue:[135,206,235],slateblue:[106,90,205],slategray:[112,128,144],slategrey:[112,128,144],snow:[255,250,250],springgreen:[0,255,127],steelblue:[70,130,180],tan:[210,180,140],teal:[0,128,128],thistle:[216,191,216],tomato:[255,99,71],turquoise:[64,224,208],violet:[238,130,238],wheat:[245,222,179],white:[255,255,255],whitesmoke:[245,245,245],yellow:[255,255,0],yellowgreen:[154,205,50]}},55:(r,a,e)=>{var n=e(407);var t=e(761);var o=Object.hasOwnProperty;var l=Object.create(null);for(var i in n){if(o.call(n,i)){l[n[i]]=i}}var s=r.exports={to:{},get:{}};s.get=function(r){var a=r.substring(0,3).toLowerCase();var e;var n;switch(a){case"hsl":e=s.get.hsl(r);n="hsl";break;case"hwb":e=s.get.hwb(r);n="hwb";break;default:e=s.get.rgb(r);n="rgb";break}if(!e){return null}return{model:n,value:e}};s.get.rgb=function(r){if(!r){return null}var a=/^#([a-f0-9]{3,4})$/i;var e=/^#([a-f0-9]{6})([a-f0-9]{2})?$/i;var t=/^rgba?\(\s*([+-]?\d+)(?=[\s,])\s*(?:,\s*)?([+-]?\d+)(?=[\s,])\s*(?:,\s*)?([+-]?\d+)\s*(?:[,|\/]\s*([+-]?[\d\.]+)(%?)\s*)?\)$/;var l=/^rgba?\(\s*([+-]?[\d\.]+)\%\s*,?\s*([+-]?[\d\.]+)\%\s*,?\s*([+-]?[\d\.]+)\%\s*(?:[,|\/]\s*([+-]?[\d\.]+)(%?)\s*)?\)$/;var i=/^(\w+)$/;var s=[0,0,0,1];var u;var h;var v;if(u=r.match(e)){v=u[2];u=u[1];for(h=0;h<3;h++){var c=h*2;s[h]=parseInt(u.slice(c,c+2),16)}if(v){s[3]=parseInt(v,16)/255}}else if(u=r.match(a)){u=u[1];v=u[3];for(h=0;h<3;h++){s[h]=parseInt(u[h]+u[h],16)}if(v){s[3]=parseInt(v+v,16)/255}}else if(u=r.match(t)){for(h=0;h<3;h++){s[h]=parseInt(u[h+1],0)}if(u[4]){if(u[5]){s[3]=parseFloat(u[4])*.01}else{s[3]=parseFloat(u[4])}}}else if(u=r.match(l)){for(h=0;h<3;h++){s[h]=Math.round(parseFloat(u[h+1])*2.55)}if(u[4]){if(u[5]){s[3]=parseFloat(u[4])*.01}else{s[3]=parseFloat(u[4])}}}else if(u=r.match(i)){if(u[1]==="transparent"){return[0,0,0,0]}if(!o.call(n,u[1])){return null}s=n[u[1]];s[3]=1;return s}else{return null}for(h=0;h<3;h++){s[h]=clamp(s[h],0,255)}s[3]=clamp(s[3],0,1);return s};s.get.hsl=function(r){if(!r){return null}var a=/^hsla?\(\s*([+-]?(?:\d{0,3}\.)?\d+)(?:deg)?\s*,?\s*([+-]?[\d\.]+)%\s*,?\s*([+-]?[\d\.]+)%\s*(?:[,|\/]\s*([+-]?(?=\.\d|\d)(?:0|[1-9]\d*)?(?:\.\d*)?(?:[eE][+-]?\d+)?)\s*)?\)$/;var e=r.match(a);if(e){var n=parseFloat(e[4]);var t=(parseFloat(e[1])%360+360)%360;var o=clamp(parseFloat(e[2]),0,100);var l=clamp(parseFloat(e[3]),0,100);var i=clamp(isNaN(n)?1:n,0,1);return[t,o,l,i]}return null};s.get.hwb=function(r){if(!r){return null}var a=/^hwb\(\s*([+-]?\d{0,3}(?:\.\d+)?)(?:deg)?\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?(?=\.\d|\d)(?:0|[1-9]\d*)?(?:\.\d*)?(?:[eE][+-]?\d+)?)\s*)?\)$/;var e=r.match(a);if(e){var n=parseFloat(e[4]);var t=(parseFloat(e[1])%360+360)%360;var o=clamp(parseFloat(e[2]),0,100);var l=clamp(parseFloat(e[3]),0,100);var i=clamp(isNaN(n)?1:n,0,1);return[t,o,l,i]}return null};s.to.hex=function(){var r=t(arguments);return"#"+hexDouble(r[0])+hexDouble(r[1])+hexDouble(r[2])+(r[3]<1?hexDouble(Math.round(r[3]*255)):"")};s.to.rgb=function(){var r=t(arguments);return r.length<4||r[3]===1?"rgb("+Math.round(r[0])+", "+Math.round(r[1])+", "+Math.round(r[2])+")":"rgba("+Math.round(r[0])+", "+Math.round(r[1])+", "+Math.round(r[2])+", "+r[3]+")"};s.to.rgb.percent=function(){var r=t(arguments);var a=Math.round(r[0]/255*100);var e=Math.round(r[1]/255*100);var n=Math.round(r[2]/255*100);return r.length<4||r[3]===1?"rgb("+a+"%, "+e+"%, "+n+"%)":"rgba("+a+"%, "+e+"%, "+n+"%, "+r[3]+")"};s.to.hsl=function(){var r=t(arguments);return r.length<4||r[3]===1?"hsl("+r[0]+", "+r[1]+"%, "+r[2]+"%)":"hsla("+r[0]+", "+r[1]+"%, "+r[2]+"%, "+r[3]+")"};s.to.hwb=function(){var r=t(arguments);var a="";if(r.length>=4&&r[3]!==1){a=", "+r[3]}return"hwb("+r[0]+", "+r[1]+"%, "+r[2]+"%"+a+")"};s.to.keyword=function(r){return l[r.slice(0,3)]};function clamp(r,a,e){return Math.min(Math.max(a,r),e)}function hexDouble(r){var a=Math.round(r).toString(16).toUpperCase();return a.length<2?"0"+a:a}},140:(r,a,e)=>{"use strict";var n=e(55);var t=e(830);var o=[].slice;var l=["keyword","gray","hex"];var i={};Object.keys(t).forEach((function(r){i[o.call(t[r].labels).sort().join("")]=r}));var s={};function Color(r,a){if(!(this instanceof Color)){return new Color(r,a)}if(a&&a in l){a=null}if(a&&!(a in t)){throw new Error("Unknown model: "+a)}var e;var u;if(r==null){this.model="rgb";this.color=[0,0,0];this.valpha=1}else if(r instanceof Color){this.model=r.model;this.color=r.color.slice();this.valpha=r.valpha}else if(typeof r==="string"){var h=n.get(r);if(h===null){throw new Error("Unable to parse color from string: "+r)}this.model=h.model;u=t[this.model].channels;this.color=h.value.slice(0,u);this.valpha=typeof h.value[u]==="number"?h.value[u]:1}else if(r.length){this.model=a||"rgb";u=t[this.model].channels;var v=o.call(r,0,u);this.color=zeroArray(v,u);this.valpha=typeof r[u]==="number"?r[u]:1}else if(typeof r==="number"){r&=16777215;this.model="rgb";this.color=[r>>16&255,r>>8&255,r&255];this.valpha=1}else{this.valpha=1;var c=Object.keys(r);if("alpha"in r){c.splice(c.indexOf("alpha"),1);this.valpha=typeof r.alpha==="number"?r.alpha:0}var f=c.sort().join("");if(!(f in i)){throw new Error("Unable to parse color from object: "+JSON.stringify(r))}this.model=i[f];var g=t[this.model].labels;var d=[];for(e=0;e<g.length;e++){d.push(r[g[e]])}this.color=zeroArray(d)}if(s[this.model]){u=t[this.model].channels;for(e=0;e<u;e++){var b=s[this.model][e];if(b){this.color[e]=b(this.color[e])}}}this.valpha=Math.max(0,Math.min(1,this.valpha));if(Object.freeze){Object.freeze(this)}}Color.prototype={toString:function(){return this.string()},toJSON:function(){return this[this.model]()},string:function(r){var a=this.model in n.to?this:this.rgb();a=a.round(typeof r==="number"?r:1);var e=a.valpha===1?a.color:a.color.concat(this.valpha);return n.to[a.model](e)},percentString:function(r){var a=this.rgb().round(typeof r==="number"?r:1);var e=a.valpha===1?a.color:a.color.concat(this.valpha);return n.to.rgb.percent(e)},array:function(){return this.valpha===1?this.color.slice():this.color.concat(this.valpha)},object:function(){var r={};var a=t[this.model].channels;var e=t[this.model].labels;for(var n=0;n<a;n++){r[e[n]]=this.color[n]}if(this.valpha!==1){r.alpha=this.valpha}return r},unitArray:function(){var r=this.rgb().color;r[0]/=255;r[1]/=255;r[2]/=255;if(this.valpha!==1){r.push(this.valpha)}return r},unitObject:function(){var r=this.rgb().object();r.r/=255;r.g/=255;r.b/=255;if(this.valpha!==1){r.alpha=this.valpha}return r},round:function(r){r=Math.max(r||0,0);return new Color(this.color.map(roundToPlace(r)).concat(this.valpha),this.model)},alpha:function(r){if(arguments.length){return new Color(this.color.concat(Math.max(0,Math.min(1,r))),this.model)}return this.valpha},red:getset("rgb",0,maxfn(255)),green:getset("rgb",1,maxfn(255)),blue:getset("rgb",2,maxfn(255)),hue:getset(["hsl","hsv","hsl","hwb","hcg"],0,(function(r){return(r%360+360)%360})),saturationl:getset("hsl",1,maxfn(100)),lightness:getset("hsl",2,maxfn(100)),saturationv:getset("hsv",1,maxfn(100)),value:getset("hsv",2,maxfn(100)),chroma:getset("hcg",1,maxfn(100)),gray:getset("hcg",2,maxfn(100)),white:getset("hwb",1,maxfn(100)),wblack:getset("hwb",2,maxfn(100)),cyan:getset("cmyk",0,maxfn(100)),magenta:getset("cmyk",1,maxfn(100)),yellow:getset("cmyk",2,maxfn(100)),black:getset("cmyk",3,maxfn(100)),x:getset("xyz",0,maxfn(100)),y:getset("xyz",1,maxfn(100)),z:getset("xyz",2,maxfn(100)),l:getset("lab",0,maxfn(100)),a:getset("lab",1),b:getset("lab",2),keyword:function(r){if(arguments.length){return new Color(r)}return t[this.model].keyword(this.color)},hex:function(r){if(arguments.length){return new Color(r)}return n.to.hex(this.rgb().round().color)},rgbNumber:function(){var r=this.rgb().color;return(r[0]&255)<<16|(r[1]&255)<<8|r[2]&255},luminosity:function(){var r=this.rgb().color;var a=[];for(var e=0;e<r.length;e++){var n=r[e]/255;a[e]=n<=.03928?n/12.92:Math.pow((n+.055)/1.055,2.4)}return.2126*a[0]+.7152*a[1]+.0722*a[2]},contrast:function(r){var a=this.luminosity();var e=r.luminosity();if(a>e){return(a+.05)/(e+.05)}return(e+.05)/(a+.05)},level:function(r){var a=this.contrast(r);if(a>=7.1){return"AAA"}return a>=4.5?"AA":""},isDark:function(){var r=this.rgb().color;var a=(r[0]*299+r[1]*587+r[2]*114)/1e3;return a<128},isLight:function(){return!this.isDark()},negate:function(){var r=this.rgb();for(var a=0;a<3;a++){r.color[a]=255-r.color[a]}return r},lighten:function(r){var a=this.hsl();a.color[2]+=a.color[2]*r;return a},darken:function(r){var a=this.hsl();a.color[2]-=a.color[2]*r;return a},saturate:function(r){var a=this.hsl();a.color[1]+=a.color[1]*r;return a},desaturate:function(r){var a=this.hsl();a.color[1]-=a.color[1]*r;return a},whiten:function(r){var a=this.hwb();a.color[1]+=a.color[1]*r;return a},blacken:function(r){var a=this.hwb();a.color[2]+=a.color[2]*r;return a},grayscale:function(){var r=this.rgb().color;var a=r[0]*.3+r[1]*.59+r[2]*.11;return Color.rgb(a,a,a)},fade:function(r){return this.alpha(this.valpha-this.valpha*r)},opaquer:function(r){return this.alpha(this.valpha+this.valpha*r)},rotate:function(r){var a=this.hsl();var e=a.color[0];e=(e+r)%360;e=e<0?360+e:e;a.color[0]=e;return a},mix:function(r,a){if(!r||!r.rgb){throw new Error('Argument to "mix" was not a Color instance, but rather an instance of '+typeof r)}var e=r.rgb();var n=this.rgb();var t=a===undefined?.5:a;var o=2*t-1;var l=e.alpha()-n.alpha();var i=((o*l===-1?o:(o+l)/(1+o*l))+1)/2;var s=1-i;return Color.rgb(i*e.red()+s*n.red(),i*e.green()+s*n.green(),i*e.blue()+s*n.blue(),e.alpha()*t+n.alpha()*(1-t))}};Object.keys(t).forEach((function(r){if(l.indexOf(r)!==-1){return}var a=t[r].channels;Color.prototype[r]=function(){if(this.model===r){return new Color(this)}if(arguments.length){return new Color(arguments,r)}var e=typeof arguments[a]==="number"?a:this.valpha;return new Color(assertArray(t[this.model][r].raw(this.color)).concat(e),r)};Color[r]=function(e){if(typeof e==="number"){e=zeroArray(o.call(arguments),a)}return new Color(e,r)}}));function roundTo(r,a){return Number(r.toFixed(a))}function roundToPlace(r){return function(a){return roundTo(a,r)}}function getset(r,a,e){r=Array.isArray(r)?r:[r];r.forEach((function(r){(s[r]||(s[r]=[]))[a]=e}));r=r[0];return function(n){var t;if(arguments.length){if(e){n=e(n)}t=this[r]();t.color[a]=n;return t}t=this[r]().color[a];if(e){t=e(t)}return t}}function maxfn(r){return function(a){return Math.max(0,Math.min(r,a))}}function assertArray(r){return Array.isArray(r)?r:[r]}function zeroArray(r,a){for(var e=0;e<a;e++){if(typeof r[e]!=="number"){r[e]=0}}return r}r.exports=Color},761:(r,a,e)=>{"use strict";var n=e(553);var t=Array.prototype.concat;var o=Array.prototype.slice;var l=r.exports=function swizzle(r){var a=[];for(var e=0,l=r.length;e<l;e++){var i=r[e];if(n(i)){a=t.call(a,o.call(i))}else{a.push(i)}}return a};l.wrap=function(r){return function(){return r(l(arguments))}}},553:r=>{r.exports=function isArrayish(r){if(!r||typeof r==="string"){return false}return r instanceof Array||Array.isArray(r)||r.length>=0&&(r.splice instanceof Function||Object.getOwnPropertyDescriptor(r,r.length-1)&&r.constructor.name!=="String")}}};var a={};function __nccwpck_require__(e){var n=a[e];if(n!==undefined){return n.exports}var t=a[e]={exports:{}};var o=true;try{r[e](t,t.exports,__nccwpck_require__);o=false}finally{if(o)delete a[e]}return t.exports}if(typeof __nccwpck_require__!=="undefined")__nccwpck_require__.ab=__dirname+"/";var e=__nccwpck_require__(140);module.exports=e})();