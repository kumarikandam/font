(function(){window["@lemuria/font"]=function(q,k){function x(a){for(var f=/url\((.+?)\).*?;\s+unicode-range: (.+?);/g,b={},d=[],h;h=f.exec(a);){var r=h[2];d.push({url:h[1],a:r});b[r]=1}b=Object.keys(b).reduce(function(c,e){var g=e.split(/,\s/).map(function(l){return l.replace("U+","\\u").replace("-","-\\u")}).join("").toLowerCase();c[e]=new RegExp("["+g+"]");return c},{});var t=document.body?document.body.textContent:"",y=t?Object.keys(b).reduce(function(c,e){b[e].test(t)&&(c[e]=!0);return c},{}):Object.keys(b).reduce(function(c,
e){e in k&&(c[e]=!0);return c},{});m=d.filter(function(c){return c.a in y}).map(function(c){return c.url});if(!m.length)return u();var v=document.createDocumentFragment();m.forEach(function(c,e){var g=document.createElement("link");g.href=c;g.rel="preload";g.as="font";var l=e+1;performance.mark("link-preload-start"+l);g.onload=function(){return u(l)};g.setAttribute("crossorigin",!0);v.appendChild(g)});document.head.appendChild(v)}k=void 0===k?{}:k;var n=document.createElement("link");if(function(a,
f){if(!a||!a.supports)return!1;try{return a.supports(f)}catch(b){return!1}}(n.relList,"preload")){var z=function(a,f,b){b=void 0===b?"":b;performance.mark("xhr-start"+b);var d=new XMLHttpRequest;d.onreadystatechange=function(){4==d.readyState&&(200==d.status?(f(d.responseText),performance.mark("xhr-end"+b),performance.measure("xhr"+b,"xhr-start"+b,"xhr-end"+b)):console.error("Error loading webfont: server responded with code %s at %s",d.status,a))};d.open("GET",a);try{d.send(null)}catch(h){console.error(h)}};
performance.mark("agf-start");var p;(function(a,f){z(a.href,function(b){p=b;x(p)},"-"+(void 0===f?"link":f))})({href:q},"js");var m=[],w=0,u=function(a){a&&(performance.mark("link-preload-end"+a),performance.measure("link-preload","link-preload-start"+a,"link-preload-end"+a));w++;w>=m.length&&(a=document.createElement("style"),a.innerHTML=p,document.head.appendChild(a),performance.mark("agf-end"),performance.measure("@lemuria/font","agf-start","agf-end"))}}else n.rel="stylesheet",n.href=q,document.head.appendChild(n)};}).call(this);