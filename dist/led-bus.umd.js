!function(t,n){"object"==typeof exports&&"undefined"!=typeof module?n(exports):"function"==typeof define&&define.amd?define(["exports"],n):n((t||self).ledBus={})}(this,function(t){function n(){return n=Object.assign||function(t){for(var n=1;n<arguments.length;n++){var e=arguments[n];for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o])}return t},n.apply(this,arguments)}var e=[0,16390,514,4814,4845,16356,9049,512,9216,2304,16320,4800,2048,192,16384,3072,3135,1030,219,143,230,8297,253,7,255,239,4608,2560,9280,200,2432,20611,699,247,4751,57,4623,121,113,189,246,4617,30,9328,56,1334,8502,63,243,8255,8435,237,4609,62,3120,10294,11520,238,3081,57,8448,15,10240,8,256,4184,8312,216,2190,2136,5312,1166,4208,4096,2576,13824,48,4308,4176,220,368,1158,80,8328,120,28,2064,10260,11520,654,2120,2377,4608,9353,3264,0],o=["a","b","c","d","e","f","g1","g2","h","j","k","l","m","n","dp"];t.LEDEncoder=/*#__PURE__*/function(){function t(t,e,o){var s=this;this.offset=0,this.defaultOptions={decimalPointSupport:!0},this.dpSupportCheckingHandler=function(t,n,e){("dp"!==n||s.options.decimalPointSupport)&&s.segmentCommandHandler(t,n,e)},this.numDisplays=t,this.segmentCommandHandler=e,this.options=n({},this.defaultOptions,o)}var s=t.prototype;return s.sendText=function(t){for(var n=this,s=function(s){var i=0,r=e[t.charCodeAt(s)-32].toString(2).padStart(15,"0");Array.from(r).forEach(function(t){n.dpSupportCheckingHandler(s,o[14-i],"1"===t),i++})},i=0;i<t.substr(0,this.numDisplays).length;i++)s(i)},s.sendScrollingText=function(t,n){var e=this,o=n||1e3;setTimeout(function(){var n,s,i;e.sendText((n=e.offset,(s=e.offset+e.numDisplays)>(i=t).length-1?i.substr(n,i.length-n)+i.substr(0,s-i.length):i.substr(n,s))),e.offset++,e.offset===t.length&&(e.offset=0),e.sendScrollingText(t,o)},o)},t}()});
//# sourceMappingURL=led-bus.umd.js.map