(()=>{"use strict";var e={270:(e,t,r)=>{const n=r(648);const o=r(509);class AsyncParallelBailHookCodeFactory extends o{content({onError:e,onResult:t,onDone:r}){let n="";n+=`var _results = new Array(${this.options.taps.length});\n`;n+="var _checkDone = () => {\n";n+="for(var i = 0; i < _results.length; i++) {\n";n+="var item = _results[i];\n";n+="if(item === undefined) return false;\n";n+="if(item.result !== undefined) {\n";n+=t("item.result");n+="return true;\n";n+="}\n";n+="if(item.error) {\n";n+=e("item.error");n+="return true;\n";n+="}\n";n+="}\n";n+="return false;\n";n+="}\n";n+=this.callTapsParallel({onError:(e,t,r,n)=>{let o="";o+=`if(${e} < _results.length && ((_results.length = ${e+1}), (_results[${e}] = { error: ${t} }), _checkDone())) {\n`;o+=n(true);o+="} else {\n";o+=r();o+="}\n";return o},onResult:(e,t,r,n)=>{let o="";o+=`if(${e} < _results.length && (${t} !== undefined && (_results.length = ${e+1}), (_results[${e}] = { result: ${t} }), _checkDone())) {\n`;o+=n(true);o+="} else {\n";o+=r();o+="}\n";return o},onTap:(e,t,r,n)=>{let o="";if(e>0){o+=`if(${e} >= _results.length) {\n`;o+=r();o+="} else {\n"}o+=t();if(e>0)o+="}\n";return o},onDone:r});return n}}const s=new AsyncParallelBailHookCodeFactory;class AsyncParallelBailHook extends n{compile(e){s.setup(this,e);return s.create(e)}}Object.defineProperties(AsyncParallelBailHook.prototype,{_call:{value:undefined,configurable:true,writable:true}});e.exports=AsyncParallelBailHook},622:(e,t,r)=>{const n=r(648);const o=r(509);class AsyncParallelHookCodeFactory extends o{content({onError:e,onDone:t}){return this.callTapsParallel({onError:(t,r,n,o)=>e(r)+o(true),onDone:t})}}const s=new AsyncParallelHookCodeFactory;class AsyncParallelHook extends n{compile(e){s.setup(this,e);return s.create(e)}}Object.defineProperties(AsyncParallelHook.prototype,{_call:{value:undefined,configurable:true,writable:true}});e.exports=AsyncParallelHook},208:(e,t,r)=>{const n=r(648);const o=r(509);class AsyncSeriesBailHookCodeFactory extends o{content({onError:e,onResult:t,resultReturns:r,onDone:n}){return this.callTapsSeries({onError:(t,r,n,o)=>e(r)+o(true),onResult:(e,r,n)=>`if(${r} !== undefined) {\n${t(r)};\n} else {\n${n()}}\n`,resultReturns:r,onDone:n})}}const s=new AsyncSeriesBailHookCodeFactory;class AsyncSeriesBailHook extends n{compile(e){s.setup(this,e);return s.create(e)}}Object.defineProperties(AsyncSeriesBailHook.prototype,{_call:{value:undefined,configurable:true,writable:true}});e.exports=AsyncSeriesBailHook},836:(e,t,r)=>{const n=r(648);const o=r(509);class AsyncSeriesHookCodeFactory extends o{content({onError:e,onDone:t}){return this.callTapsSeries({onError:(t,r,n,o)=>e(r)+o(true),onDone:t})}}const s=new AsyncSeriesHookCodeFactory;class AsyncSeriesHook extends n{compile(e){s.setup(this,e);return s.create(e)}}Object.defineProperties(AsyncSeriesHook.prototype,{_call:{value:undefined,configurable:true,writable:true}});e.exports=AsyncSeriesHook},225:(e,t,r)=>{const n=r(648);const o=r(509);class AsyncSeriesWaterfallHookCodeFactory extends o{content({onError:e,onResult:t,onDone:r}){return this.callTapsSeries({onError:(t,r,n,o)=>e(r)+o(true),onResult:(e,t,r)=>{let n="";n+=`if(${t} !== undefined) {\n`;n+=`${this._args[0]} = ${t};\n`;n+=`}\n`;n+=r();return n},onDone:()=>t(this._args[0])})}}const s=new AsyncSeriesWaterfallHookCodeFactory;class AsyncSeriesWaterfallHook extends n{constructor(e){super(e);if(e.length<1)throw new Error("Waterfall hooks must have at least one argument")}compile(e){s.setup(this,e);return s.create(e)}}Object.defineProperties(AsyncSeriesWaterfallHook.prototype,{_call:{value:undefined,configurable:true,writable:true}});e.exports=AsyncSeriesWaterfallHook},648:e=>{class Hook{constructor(e){if(!Array.isArray(e))e=[];this._args=e;this.taps=[];this.interceptors=[];this.call=this._call;this.promise=this._promise;this.callAsync=this._callAsync;this._x=undefined}compile(e){throw new Error("Abstract: should be overriden")}_createCall(e){return this.compile({taps:this.taps,interceptors:this.interceptors,args:this._args,type:e})}tap(e,t){if(typeof e==="string")e={name:e};if(typeof e!=="object"||e===null)throw new Error("Invalid arguments to tap(options: Object, fn: function)");e=Object.assign({type:"sync",fn:t},e);if(typeof e.name!=="string"||e.name==="")throw new Error("Missing name for tap");e=this._runRegisterInterceptors(e);this._insert(e)}tapAsync(e,t){if(typeof e==="string")e={name:e};if(typeof e!=="object"||e===null)throw new Error("Invalid arguments to tapAsync(options: Object, fn: function)");e=Object.assign({type:"async",fn:t},e);if(typeof e.name!=="string"||e.name==="")throw new Error("Missing name for tapAsync");e=this._runRegisterInterceptors(e);this._insert(e)}tapPromise(e,t){if(typeof e==="string")e={name:e};if(typeof e!=="object"||e===null)throw new Error("Invalid arguments to tapPromise(options: Object, fn: function)");e=Object.assign({type:"promise",fn:t},e);if(typeof e.name!=="string"||e.name==="")throw new Error("Missing name for tapPromise");e=this._runRegisterInterceptors(e);this._insert(e)}_runRegisterInterceptors(e){for(const t of this.interceptors){if(t.register){const r=t.register(e);if(r!==undefined)e=r}}return e}withOptions(e){const mergeOptions=t=>Object.assign({},e,typeof t==="string"?{name:t}:t);e=Object.assign({},e,this._withOptions);const t=this._withOptionsBase||this;const r=Object.create(t);r.tapAsync=(e,r)=>t.tapAsync(mergeOptions(e),r),r.tap=(e,r)=>t.tap(mergeOptions(e),r);r.tapPromise=(e,r)=>t.tapPromise(mergeOptions(e),r);r._withOptions=e;r._withOptionsBase=t;return r}isUsed(){return this.taps.length>0||this.interceptors.length>0}intercept(e){this._resetCompilation();this.interceptors.push(Object.assign({},e));if(e.register){for(let t=0;t<this.taps.length;t++)this.taps[t]=e.register(this.taps[t])}}_resetCompilation(){this.call=this._call;this.callAsync=this._callAsync;this.promise=this._promise}_insert(e){this._resetCompilation();let t;if(typeof e.before==="string")t=new Set([e.before]);else if(Array.isArray(e.before)){t=new Set(e.before)}let r=0;if(typeof e.stage==="number")r=e.stage;let n=this.taps.length;while(n>0){n--;const e=this.taps[n];this.taps[n+1]=e;const o=e.stage||0;if(t){if(t.has(e.name)){t.delete(e.name);continue}if(t.size>0){continue}}if(o>r){continue}n++;break}this.taps[n]=e}}function createCompileDelegate(e,t){return function lazyCompileHook(...r){this[e]=this._createCall(t);return this[e](...r)}}Object.defineProperties(Hook.prototype,{_call:{value:createCompileDelegate("call","sync"),configurable:true,writable:true},_promise:{value:createCompileDelegate("promise","promise"),configurable:true,writable:true},_callAsync:{value:createCompileDelegate("callAsync","async"),configurable:true,writable:true}});e.exports=Hook},509:e=>{class HookCodeFactory{constructor(e){this.config=e;this.options=undefined;this._args=undefined}create(e){this.init(e);let t;switch(this.options.type){case"sync":t=new Function(this.args(),'"use strict";\n'+this.header()+this.content({onError:e=>`throw ${e};\n`,onResult:e=>`return ${e};\n`,resultReturns:true,onDone:()=>"",rethrowIfPossible:true}));break;case"async":t=new Function(this.args({after:"_callback"}),'"use strict";\n'+this.header()+this.content({onError:e=>`_callback(${e});\n`,onResult:e=>`_callback(null, ${e});\n`,onDone:()=>"_callback();\n"}));break;case"promise":let e=false;const r=this.content({onError:t=>{e=true;return`_error(${t});\n`},onResult:e=>`_resolve(${e});\n`,onDone:()=>"_resolve();\n"});let n="";n+='"use strict";\n';n+="return new Promise((_resolve, _reject) => {\n";if(e){n+="var _sync = true;\n";n+="function _error(_err) {\n";n+="if(_sync)\n";n+="_resolve(Promise.resolve().then(() => { throw _err; }));\n";n+="else\n";n+="_reject(_err);\n";n+="};\n"}n+=this.header();n+=r;if(e){n+="_sync = false;\n"}n+="});\n";t=new Function(this.args(),n);break}this.deinit();return t}setup(e,t){e._x=t.taps.map((e=>e.fn))}init(e){this.options=e;this._args=e.args.slice()}deinit(){this.options=undefined;this._args=undefined}header(){let e="";if(this.needContext()){e+="var _context = {};\n"}else{e+="var _context;\n"}e+="var _x = this._x;\n";if(this.options.interceptors.length>0){e+="var _taps = this.taps;\n";e+="var _interceptors = this.interceptors;\n"}for(let t=0;t<this.options.interceptors.length;t++){const r=this.options.interceptors[t];if(r.call){e+=`${this.getInterceptor(t)}.call(${this.args({before:r.context?"_context":undefined})});\n`}}return e}needContext(){for(const e of this.options.taps)if(e.context)return true;return false}callTap(e,{onError:t,onResult:r,onDone:n,rethrowIfPossible:o}){let s="";let i=false;for(let t=0;t<this.options.interceptors.length;t++){const r=this.options.interceptors[t];if(r.tap){if(!i){s+=`var _tap${e} = ${this.getTap(e)};\n`;i=true}s+=`${this.getInterceptor(t)}.tap(${r.context?"_context, ":""}_tap${e});\n`}}s+=`var _fn${e} = ${this.getTapFn(e)};\n`;const a=this.options.taps[e];switch(a.type){case"sync":if(!o){s+=`var _hasError${e} = false;\n`;s+="try {\n"}if(r){s+=`var _result${e} = _fn${e}(${this.args({before:a.context?"_context":undefined})});\n`}else{s+=`_fn${e}(${this.args({before:a.context?"_context":undefined})});\n`}if(!o){s+="} catch(_err) {\n";s+=`_hasError${e} = true;\n`;s+=t("_err");s+="}\n";s+=`if(!_hasError${e}) {\n`}if(r){s+=r(`_result${e}`)}if(n){s+=n()}if(!o){s+="}\n"}break;case"async":let i="";if(r)i+=`(_err${e}, _result${e}) => {\n`;else i+=`_err${e} => {\n`;i+=`if(_err${e}) {\n`;i+=t(`_err${e}`);i+="} else {\n";if(r){i+=r(`_result${e}`)}if(n){i+=n()}i+="}\n";i+="}";s+=`_fn${e}(${this.args({before:a.context?"_context":undefined,after:i})});\n`;break;case"promise":s+=`var _hasResult${e} = false;\n`;s+=`var _promise${e} = _fn${e}(${this.args({before:a.context?"_context":undefined})});\n`;s+=`if (!_promise${e} || !_promise${e}.then)\n`;s+=`  throw new Error('Tap function (tapPromise) did not return promise (returned ' + _promise${e} + ')');\n`;s+=`_promise${e}.then(_result${e} => {\n`;s+=`_hasResult${e} = true;\n`;if(r){s+=r(`_result${e}`)}if(n){s+=n()}s+=`}, _err${e} => {\n`;s+=`if(_hasResult${e}) throw _err${e};\n`;s+=t(`_err${e}`);s+="});\n";break}return s}callTapsSeries({onError:e,onResult:t,resultReturns:r,onDone:n,doneReturns:o,rethrowIfPossible:s}){if(this.options.taps.length===0)return n();const i=this.options.taps.findIndex((e=>e.type!=="sync"));const a=r||o||false;let l="";let c=n;for(let r=this.options.taps.length-1;r>=0;r--){const o=r;const p=c!==n&&this.options.taps[o].type!=="sync";if(p){l+=`function _next${o}() {\n`;l+=c();l+=`}\n`;c=()=>`${a?"return ":""}_next${o}();\n`}const u=c;const doneBreak=e=>{if(e)return"";return n()};const f=this.callTap(o,{onError:t=>e(o,t,u,doneBreak),onResult:t&&(e=>t(o,e,u,doneBreak)),onDone:!t&&u,rethrowIfPossible:s&&(i<0||o<i)});c=()=>f}l+=c();return l}callTapsLooping({onError:e,onDone:t,rethrowIfPossible:r}){if(this.options.taps.length===0)return t();const n=this.options.taps.every((e=>e.type==="sync"));let o="";if(!n){o+="var _looper = () => {\n";o+="var _loopAsync = false;\n"}o+="var _loop;\n";o+="do {\n";o+="_loop = false;\n";for(let e=0;e<this.options.interceptors.length;e++){const t=this.options.interceptors[e];if(t.loop){o+=`${this.getInterceptor(e)}.loop(${this.args({before:t.context?"_context":undefined})});\n`}}o+=this.callTapsSeries({onError:e,onResult:(e,t,r,o)=>{let s="";s+=`if(${t} !== undefined) {\n`;s+="_loop = true;\n";if(!n)s+="if(_loopAsync) _looper();\n";s+=o(true);s+=`} else {\n`;s+=r();s+=`}\n`;return s},onDone:t&&(()=>{let e="";e+="if(!_loop) {\n";e+=t();e+="}\n";return e}),rethrowIfPossible:r&&n});o+="} while(_loop);\n";if(!n){o+="_loopAsync = true;\n";o+="};\n";o+="_looper();\n"}return o}callTapsParallel({onError:e,onResult:t,onDone:r,rethrowIfPossible:n,onTap:o=((e,t)=>t())}){if(this.options.taps.length<=1){return this.callTapsSeries({onError:e,onResult:t,onDone:r,rethrowIfPossible:n})}let s="";s+="do {\n";s+=`var _counter = ${this.options.taps.length};\n`;if(r){s+="var _done = () => {\n";s+=r();s+="};\n"}for(let i=0;i<this.options.taps.length;i++){const done=()=>{if(r)return"if(--_counter === 0) _done();\n";else return"--_counter;"};const doneBreak=e=>{if(e||!r)return"_counter = 0;\n";else return"_counter = 0;\n_done();\n"};s+="if(_counter <= 0) break;\n";s+=o(i,(()=>this.callTap(i,{onError:t=>{let r="";r+="if(_counter > 0) {\n";r+=e(i,t,done,doneBreak);r+="}\n";return r},onResult:t&&(e=>{let r="";r+="if(_counter > 0) {\n";r+=t(i,e,done,doneBreak);r+="}\n";return r}),onDone:!t&&(()=>done()),rethrowIfPossible:n})),done,doneBreak)}s+="} while(false);\n";return s}args({before:e,after:t}={}){let r=this._args;if(e)r=[e].concat(r);if(t)r=r.concat(t);if(r.length===0){return""}else{return r.join(", ")}}getTapFn(e){return`_x[${e}]`}getTap(e){return`_taps[${e}]`}getInterceptor(e){return`_interceptors[${e}]`}}e.exports=HookCodeFactory},549:e=>{class HookMap{constructor(e){this._map=new Map;this._factory=e;this._interceptors=[]}get(e){return this._map.get(e)}for(e){const t=this.get(e);if(t!==undefined){return t}let r=this._factory(e);const n=this._interceptors;for(let t=0;t<n.length;t++){r=n[t].factory(e,r)}this._map.set(e,r);return r}intercept(e){this._interceptors.push(Object.assign({factory:(e,t)=>t},e))}tap(e,t,r){return this.for(e).tap(t,r)}tapAsync(e,t,r){return this.for(e).tapAsync(t,r)}tapPromise(e,t,r){return this.for(e).tapPromise(t,r)}}e.exports=HookMap},17:(e,t,r)=>{const n=r(648);class MultiHook{constructor(e){this.hooks=e}tap(e,t){for(const r of this.hooks){r.tap(e,t)}}tapAsync(e,t){for(const r of this.hooks){r.tapAsync(e,t)}}tapPromise(e,t){for(const r of this.hooks){r.tapPromise(e,t)}}isUsed(){for(const e of this.hooks){if(e.isUsed())return true}return false}intercept(e){for(const t of this.hooks){t.intercept(e)}}withOptions(e){return new MultiHook(this.hooks.map((t=>t.withOptions(e))))}}e.exports=MultiHook},16:(e,t,r)=>{const n=r(648);const o=r(509);class SyncBailHookCodeFactory extends o{content({onError:e,onResult:t,resultReturns:r,onDone:n,rethrowIfPossible:o}){return this.callTapsSeries({onError:(t,r)=>e(r),onResult:(e,r,n)=>`if(${r} !== undefined) {\n${t(r)};\n} else {\n${n()}}\n`,resultReturns:r,onDone:n,rethrowIfPossible:o})}}const s=new SyncBailHookCodeFactory;class SyncBailHook extends n{tapAsync(){throw new Error("tapAsync is not supported on a SyncBailHook")}tapPromise(){throw new Error("tapPromise is not supported on a SyncBailHook")}compile(e){s.setup(this,e);return s.create(e)}}e.exports=SyncBailHook},571:(e,t,r)=>{const n=r(648);const o=r(509);class SyncHookCodeFactory extends o{content({onError:e,onDone:t,rethrowIfPossible:r}){return this.callTapsSeries({onError:(t,r)=>e(r),onDone:t,rethrowIfPossible:r})}}const s=new SyncHookCodeFactory;class SyncHook extends n{tapAsync(){throw new Error("tapAsync is not supported on a SyncHook")}tapPromise(){throw new Error("tapPromise is not supported on a SyncHook")}compile(e){s.setup(this,e);return s.create(e)}}e.exports=SyncHook},460:(e,t,r)=>{const n=r(648);const o=r(509);class SyncLoopHookCodeFactory extends o{content({onError:e,onDone:t,rethrowIfPossible:r}){return this.callTapsLooping({onError:(t,r)=>e(r),onDone:t,rethrowIfPossible:r})}}const s=new SyncLoopHookCodeFactory;class SyncLoopHook extends n{tapAsync(){throw new Error("tapAsync is not supported on a SyncLoopHook")}tapPromise(){throw new Error("tapPromise is not supported on a SyncLoopHook")}compile(e){s.setup(this,e);return s.create(e)}}e.exports=SyncLoopHook},445:(e,t,r)=>{const n=r(648);const o=r(509);class SyncWaterfallHookCodeFactory extends o{content({onError:e,onResult:t,resultReturns:r,rethrowIfPossible:n}){return this.callTapsSeries({onError:(t,r)=>e(r),onResult:(e,t,r)=>{let n="";n+=`if(${t} !== undefined) {\n`;n+=`${this._args[0]} = ${t};\n`;n+=`}\n`;n+=r();return n},onDone:()=>t(this._args[0]),doneReturns:r,rethrowIfPossible:n})}}const s=new SyncWaterfallHookCodeFactory;class SyncWaterfallHook extends n{constructor(e){super(e);if(e.length<1)throw new Error("Waterfall hooks must have at least one argument")}tapAsync(){throw new Error("tapAsync is not supported on a SyncWaterfallHook")}tapPromise(){throw new Error("tapPromise is not supported on a SyncWaterfallHook")}compile(e){s.setup(this,e);return s.create(e)}}e.exports=SyncWaterfallHook},444:(e,t,r)=>{const n=r(669);const o=r(16);function Tapable(){this._pluginCompat=new o(["options"]);this._pluginCompat.tap({name:"Tapable camelCase",stage:100},(e=>{e.names.add(e.name.replace(/[- ]([a-z])/g,((e,t)=>t.toUpperCase())))}));this._pluginCompat.tap({name:"Tapable this.hooks",stage:200},(e=>{let t;for(const r of e.names){t=this.hooks[r];if(t!==undefined){break}}if(t!==undefined){const r={name:e.fn.name||"unnamed compat plugin",stage:e.stage||0};if(e.async)t.tapAsync(r,e.fn);else t.tap(r,e.fn);return true}}))}e.exports=Tapable;Tapable.addCompatLayer=function addCompatLayer(e){Tapable.call(e);e.plugin=Tapable.prototype.plugin;e.apply=Tapable.prototype.apply};Tapable.prototype.plugin=n.deprecate((function plugin(e,t){if(Array.isArray(e)){e.forEach((function(e){this.plugin(e,t)}),this);return}const r=this._pluginCompat.call({name:e,fn:t,names:new Set([e])});if(!r){throw new Error(`Plugin could not be registered at '${e}'. Hook was not found.\n`+"BREAKING CHANGE: There need to exist a hook at 'this.hooks'. "+"To create a compatibility layer for this hook, hook into 'this._pluginCompat'.")}}),"Tapable.plugin is deprecated. Use new API on `.hooks` instead");Tapable.prototype.apply=n.deprecate((function apply(){for(var e=0;e<arguments.length;e++){arguments[e].apply(this)}}),"Tapable.apply is deprecated. Call apply on the plugin directly instead")},669:e=>{e.exports=require("util")}};var t={};function __nccwpck_require__(r){var n=t[r];if(n!==undefined){return n.exports}var o=t[r]={exports:{}};var s=true;try{e[r](o,o.exports,__nccwpck_require__);s=false}finally{if(s)delete t[r]}return o.exports}if(typeof __nccwpck_require__!=="undefined")__nccwpck_require__.ab=__dirname+"/";var r={};(()=>{var e=r;e.__esModule=true;e.Tapable=__nccwpck_require__(444);e.SyncHook=__nccwpck_require__(571);e.SyncBailHook=__nccwpck_require__(16);e.SyncWaterfallHook=__nccwpck_require__(445);e.SyncLoopHook=__nccwpck_require__(460);e.AsyncParallelHook=__nccwpck_require__(622);e.AsyncParallelBailHook=__nccwpck_require__(270);e.AsyncSeriesHook=__nccwpck_require__(836);e.AsyncSeriesBailHook=__nccwpck_require__(208);e.AsyncSeriesWaterfallHook=__nccwpck_require__(225);e.HookMap=__nccwpck_require__(549);e.MultiHook=__nccwpck_require__(17)})();module.exports=r})();