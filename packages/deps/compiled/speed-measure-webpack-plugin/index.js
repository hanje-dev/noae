(()=>{var e={131:e=>{let t=0;const genWrappedFunc=({func:e,smp:n,context:s,timeEventName:r,pluginName:i,endType:o})=>(...a)=>{const u=t++;const addEndEvent=()=>n.addTimeEvent("plugins",r,"end",{id:u,allowFailure:true});n.addTimeEvent("plugins",r,"start",{id:u,name:i});addEndEvent();const normalArgMap=e=>wrap(e,i,n);let p;if(o==="wrapDone")p=e.apply(s,a.map((e=>wrap(e,i,n,addEndEvent))));else if(o==="async"){const t=a.slice(0,a.length-1);const n=a[a.length-1];p=e.apply(s,t.map(normalArgMap).concat(((...e)=>{addEndEvent();n(...e)})))}else if(o==="promise")p=e.apply(s,a.map(normalArgMap)).then((e=>{addEndEvent();return e}));else p=e.apply(s,a.map(normalArgMap));addEndEvent();return p};const genPluginMethod=(e,t,n,s)=>function(r,i){const o=t+"/"+s+"/"+r;const a=genWrappedFunc({func:i,smp:n,context:this,timeEventName:o,pluginName:t,endType:"wrapDone"});return e.plugin(r,a)};const wrapTap=(e,t,n,s,r)=>function(i,o){const a=t+"/"+s+"/"+r;const u=genWrappedFunc({func:o,smp:n,context:this,timeEventName:a,pluginName:t});return e.call(this,i,u)};const wrapTapAsync=(e,t,n,s,r)=>function(i,o){const a=t+"/"+s+"/"+r;const u=genWrappedFunc({func:o,smp:n,context:this,timeEventName:a,pluginName:t,endType:"async"});return e.call(this,i,u)};const wrapTapPromise=(e,t,n,s,r)=>function(i,o){const a=t+"/"+s+"/"+r;const u=genWrappedFunc({func:o,smp:n,context:this,timeEventName:a,pluginName:t,endType:"promise"});return e.call(this,i,u)};const n=[];const wrapHooks=(e,t,s,r)=>{const i=e.hooks;if(!i)return i;const o=n.find((e=>e.pluginName===t&&(e.orig===i||e.wrapped===i)));if(o)return o.wrapped;const genProxy=e=>{const n=new Proxy(i[e],{get:(i,o)=>{const a=Reflect.get(i,o);if(o==="tap"&&typeof a==="function")return wrapTap(a,t,s,r,e).bind(n);if(o==="tapAsync"&&typeof a==="function")return wrapTapAsync(a,t,s,r,e).bind(n);if(o==="tapPromise"&&typeof a==="function")return wrapTapPromise(a,t,s,r,e).bind(n);return a},set:(e,t,n)=>Reflect.set(e,t,n),deleteProperty:(e,t)=>Reflect.deleteProperty(e,t)});return n};const a=Object.keys(i).reduce(((e,t)=>{e[t]=genProxy(t);return e}),{});n.push({orig:i,wrapped:a,pluginName:t});return a};const s=["Compiler","Compilation","MainTemplate","Parser","NormalModuleFactory","ContextModuleFactory"];const r=[];const findWrappedObj=(e,t)=>{const n=r.find((n=>n.pluginName===t&&(n.orig===e||n.wrapped===e)));if(n)return n.wrapped};const wrap=(e,t,n,i)=>{if(!e)return e;const o=findWrappedObj(e,t);if(o)return o;const getOrigConstrucName=e=>e&&e.constructor&&e.constructor.name;const getShouldWrap=e=>{const t=getOrigConstrucName(e);return s.includes(t)};const a=getShouldWrap(e);const u=Object.keys(e).map((t=>e[t])).some(getShouldWrap);let p;if(!a&&!u){const t=e.name==="next";p=t&&i?function(){i();return e.apply(this,arguments)}:e}else{const s=new Proxy(e,{get:(e,r)=>{const i=Reflect.get(e,r);if(a&&r==="plugin")return genPluginMethod(e,t,n,getOrigConstrucName(e)).bind(s);if(a&&r==="hooks")return wrapHooks(e,t,n,getOrigConstrucName(e));if(a&&r==="compiler"){const e=findWrappedObj(i,t);if(e){return e}}if(typeof i==="function"){const e=i.bind(s);if(r==="constructor")Object.defineProperty(e,"name",{value:i.name});return e}return i},set:(e,t,n)=>Reflect.set(e,t,n),deleteProperty:(e,t)=>Reflect.deleteProperty(e,t)});p=s}r.push({pluginName:t,orig:e,wrapped:p});return p};e.exports.clear=()=>{r.length=0;n.length=0};e.exports.WrappedPlugin=class WrappedPlugin{constructor(e,t,n){this._smp_plugin=e;this._smp_pluginName=t;this._smp=n;this.apply=this.apply.bind(this);const s=this;return new Proxy(e,{get(e,t){if(t==="apply"){return s.apply}return e[t]},set:(e,t,n)=>Reflect.set(e,t,n),deleteProperty:(e,t)=>Reflect.deleteProperty(e,t)})}apply(e){return this._smp_plugin.apply(wrap(e,this._smp_pluginName,this._smp))}}},505:(e,t,n)=>{const s=n(24);e.exports.fg=(e,t)=>{let n=s.bold;if(t>1e4)n=n.red;else if(t>2e3)n=n.yellow;else n=n.green;return n(e)};e.exports.bg=e=>s.bgBlack.green.bold(e)},882:(e,t,n)=>{const s=n(622);const r=n(747);const i=n(24);const{WrappedPlugin:o,clear:a}=n(131);const{getModuleName:u,getLoaderNames:p,prependLoader:c,tap:l}=n(478);const{getHumanOutput:d,getMiscOutput:m,getPluginsOutput:f,getLoadersOutput:g,smpTag:h}=n(315);const y=s.dirname(r.realpathSync(__filename));e.exports=class SpeedMeasurePlugin{constructor(e){this.options=e||{};this.timeEventData={};this.smpPluginAdded=false;this.wrap=this.wrap.bind(this);this.getOutput=this.getOutput.bind(this);this.addTimeEvent=this.addTimeEvent.bind(this);this.apply=this.apply.bind(this);this.provideLoaderTiming=this.provideLoaderTiming.bind(this)}wrap(e){if(this.options.disable)return e;if(Array.isArray(e))return e.map(this.wrap);if(typeof e==="function")return(...t)=>this.wrap(e(...t));e.plugins=(e.plugins||[]).map((e=>{const t=Object.keys(this.options.pluginNames||{}).find((t=>e===this.options.pluginNames[t]))||e.constructor&&e.constructor.name||"(unable to deduce plugin name)";return new o(e,t,this)}));if(e.optimization&&e.optimization.minimizer){e.optimization.minimizer=e.optimization.minimizer.map((e=>new o(e,e.constructor.name,this)))}if(e.module&&this.options.granularLoaderData){e.module=c(e.module)}if(!this.smpPluginAdded){e.plugins=e.plugins.concat(this);this.smpPluginAdded=true}return e}getOutput(){const e={};if(this.timeEventData.misc)e.misc=m(this.timeEventData.misc);if(this.timeEventData.plugins)e.plugins=f(this.timeEventData.plugins);if(this.timeEventData.loaders)e.loaders=g(this.timeEventData.loaders);if(this.options.outputFormat==="json")return JSON.stringify(e,null,2);if(typeof this.options.outputFormat==="function")return this.options.outputFormat(e);return d(e,{verbose:this.options.outputFormat==="humanVerbose"})}addTimeEvent(e,t,n,s={}){const r=s.allowFailure;delete s.allowFailure;const i=this.timeEventData;if(!i[e])i[e]={};if(!i[e][t])i[e][t]=[];const o=i[e][t];const a=(new Date).getTime();if(n==="start"){s.start=a;o.push(s)}else if(n==="end"){const n=o.find((e=>{const t=!e.end||!s.fillLast;const n=e.id!==undefined&&e.id===s.id;const r=!s.id&&e.name!==undefined&&e.name===s.name;return t&&(n||r)}));const i=n||s.fillLast&&o.find((e=>!e.end));if(!i){console.error("Could not find a matching event to end",e,t,s);if(r)return;throw new Error("No matching event!")}i.end=a}}apply(e){if(this.options.disable)return;l(e,"compile",(()=>{this.addTimeEvent("misc","compile","start",{watch:false})}));l(e,"done",(()=>{a();this.addTimeEvent("misc","compile","end",{fillLast:true});const e=typeof this.options.outputTarget==="string";i.enabled=!e;const t=this.getOutput();i.enabled=true;if(e){const e=r.existsSync(this.options.outputTarget)?r.appendFileSync:r.writeFileSync;e(this.options.outputTarget,t+"\n");console.log(h()+"Outputted timing info to "+this.options.outputTarget)}else{const e=this.options.outputTarget||console.log;e(t)}this.timeEventData={}}));l(e,"compilation",(e=>{l(e,"normal-module-loader",(e=>{e[y]=this.provideLoaderTiming}));l(e,"build-module",(e=>{const t=u(e);if(t){this.addTimeEvent("loaders","build","start",{name:t,fillLast:true,loaders:p(e.loaders)})}}));l(e,"succeed-module",(e=>{const t=u(e);if(t){this.addTimeEvent("loaders","build","end",{name:t,fillLast:true})}}))}))}provideLoaderTiming(e){const t={id:e.id};if(e.type!=="end"){t.loader=e.loaderName;t.name=e.module}this.addTimeEvent("loaders","build-specific",e.type,t)}}},315:(e,t,n)=>{const s=6e4;const r=1e3;const i=n(24);const{fg:o,bg:a}=n(505);const{groupBy:u,getAverages:p,getTotalActiveTime:c}=n(478);const humanTime=(e,t={})=>{if(t.verbose){return e.toLocaleString()+" ms"}const n=Math.floor(e/s);const i=(e-n*s)/r;const o=Math.floor(i);const a=o>0?2:3;const u=Math.min(i-o,.99);const p=o+u.toPrecision(a).replace(/^0/,"").replace(/0+$/,"").replace(/^\.$/,"");let c="";if(n>0)c+=n+" min"+(n>1?"s":"")+", ";c+=p+" secs";return c};const smpTag=()=>a(" SMP ")+" ⏱  ";e.exports.smpTag=smpTag;e.exports.getHumanOutput=(e,t={})=>{const hT=e=>humanTime(e,t);let n="\n\n"+smpTag()+"\n";if(e.misc){n+="General output time took "+o(hT(e.misc.compileTime,t),e.misc.compileTime);n+="\n\n"}if(e.plugins){n+=smpTag()+"Plugins\n";Object.keys(e.plugins).sort(((t,n)=>e.plugins[n]-e.plugins[t])).forEach((t=>{n+=i.bold(t)+" took "+o(hT(e.plugins[t]),e.plugins[t]);n+="\n"}));n+="\n"}if(e.loaders){n+=smpTag()+"Loaders\n";e.loaders.build.sort(((e,t)=>t.activeTime-e.activeTime)).forEach((e=>{n+=e.loaders.map(o).join(", and \n")+" took "+o(hT(e.activeTime),e.activeTime)+"\n";let s=[];if(t.verbose){s.push(["median",hT(e.averages.median)]);s.push(["mean",hT(e.averages.mean)]);if(typeof e.averages.variance==="number")s.push(["s.d.",hT(Math.sqrt(e.averages.variance))]);s.push(["range","("+hT(e.averages.range.start)+" --\x3e "+hT(e.averages.range.end)+")"])}if(e.loaders.length>1){Object.keys(e.subLoadersTime).forEach((t=>{s.push([t,hT(e.subLoadersTime[t])])}))}s.push(["module count",e.averages.dataPoints]);const r=s.reduce(((e,t)=>Math.max(e,t[0].length)),0);s.forEach((e=>{const t=r-e[0].length;n+="  "+e[0]+" ".repeat(t)+" = "+e[1]+"\n"}))}))}n+="\n\n";return n};e.exports.getMiscOutput=e=>({compileTime:e.compile[0].end-e.compile[0].start});e.exports.getPluginsOutput=e=>Object.keys(e).reduce(((t,n)=>{const s=e[n];const r=u("name",s);return r.reduce(((e,t)=>{e[t[0].name]=(e[t[0].name]||0)+c(t);return e}),t)}),{});e.exports.getLoadersOutput=e=>{const t=u("loaders",e.build);const n=e["build-specific"]||[];const s=t.map((e=>{const t=p(e);const s=c(e);const r=u("loader",n.filter((t=>e.find((e=>e.name===t.name)))));const i=r.reduce(((e,t)=>{e[t[0].loader]=c(t);return e}),{});return{averages:t,activeTime:s,loaders:e[0].loaders,subLoadersTime:i}}));return{build:s}}},478:(e,t,n)=>{const isEqual=(e,t)=>Array.isArray(e)?Array.isArray(t)&&e.every((e=>t.includes(e)))&&t.every((t=>e.includes(t))):e===t;const mergeRanges=e=>{const t=[];const n=[...e];while(n.length){const e=n.pop();const s=t.findIndex((t=>t.start>=e.start&&t.start<=e.end||t.end>=e.start&&t.end<=e.end));if(s===-1){t.push(e)}else{const r=t.splice(s,1)[0];n.push({start:Math.min(e.start,e.end,r.start,r.end),end:Math.max(e.start,e.end,r.start,r.end)})}}return t};const sqr=e=>e*e;const mean=e=>e.reduce(((e,t)=>e+t),0)/e.length;const median=e=>e.sort()[Math.floor(e.length/2)];const variance=(e,t)=>e.reduce(((e,n)=>e+sqr(n-t)),0)/(e.length-1);const range=e=>e.reduce(((e,t)=>({start:Math.min(t,e.start),end:Math.max(t,e.end)})),{start:Number.POSITIVE_INFINITY,end:Number.NEGATIVE_INFINITY});e.exports.getModuleName=e=>e.userRequest;e.exports.getLoaderNames=e=>e&&e.length?e.map((e=>e.loader||e)).map((e=>e.replace(/\\/g,"/").replace(/^.*\/node_modules\/(@[a-z0-9][\w-.]+\/[a-z0-9][\w-.]*|[^\/]+).*$/,((e,t)=>t)))).filter((e=>!e.includes("speed-measure-webpack-plugin"))):["modules with no loaders"];e.exports.groupBy=(e,t)=>{const n=[];(t||[]).forEach((t=>{const s=n.find((n=>isEqual(n[0][e],t[e])));if(s)s.push(t);else n.push([t])}));return n};e.exports.getAverages=e=>{const t=e.map((e=>e.end-e.start));const n={};n.dataPoints=e.length;n.median=median(t);n.mean=Math.round(mean(t));n.range=range(t);if(e.length>1)n.variance=Math.round(variance(t,n.mean));return n};e.exports.getTotalActiveTime=e=>{const t=mergeRanges(e);return t.reduce(((e,t)=>e+t.end-t.start),0)};const prependLoader=e=>{if(!e)return e;if(Array.isArray(e))return e.map(prependLoader);if(e.loader){e.use=[e.loader];delete e.loader}if(e.use){if(!Array.isArray(e.use))e.use=[e.use];e.use.unshift("speed-measure-webpack-plugin/loader")}if(e.oneOf){e.oneOf=prependLoader(e.oneOf)}if(e.rules){e.rules=prependLoader(e.rules)}if(Array.isArray(e.resource)){e.resource=prependLoader(e.resource)}if(e.resource&&e.resource.and){e.resource.and=prependLoader(e.resource.and)}if(e.resource&&e.resource.or){e.resource.or=prependLoader(e.resource.or)}return e};e.exports.prependLoader=prependLoader;e.exports.hackWrapLoaders=(e,t)=>{const wrapReq=n=>function(){const s=n.apply(this,arguments);if(e.includes(arguments[0])){if(s.__smpHacked)return s;s.__smpHacked=true;return t(s,arguments[0])}return s};if(typeof System==="object"&&typeof System.import==="function"){System.import=wrapReq(System.import)}const s=n(282);s.prototype.require=wrapReq(s.prototype.require)};const toCamelCase=e=>e.replace(/(\-\w)/g,(e=>e[1].toUpperCase()));e.exports.tap=(e,t,n)=>{if(e.hooks){return e.hooks[toCamelCase(t)].tap("smp",n)}return e.plugin(t,n)}},24:e=>{"use strict";e.exports=require("@noaejs/deps/compiled/chalk")},747:e=>{"use strict";e.exports=require("fs")},282:e=>{"use strict";e.exports=require("module")},622:e=>{"use strict";e.exports=require("path")}};var t={};function __nccwpck_require__(n){var s=t[n];if(s!==undefined){return s.exports}var r=t[n]={exports:{}};var i=true;try{e[n](r,r.exports,__nccwpck_require__);i=false}finally{if(i)delete t[n]}return r.exports}if(typeof __nccwpck_require__!=="undefined")__nccwpck_require__.ab=__dirname+"/";var n=__nccwpck_require__(882);module.exports=n})();