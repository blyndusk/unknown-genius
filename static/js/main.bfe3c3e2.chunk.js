(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{14:function(e,t,n){},15:function(e,t,n){"use strict";n.r(t);var a=n(0),c=n.n(a),o=n(7),r=n.n(o),i=n(1),s=n(2),l=n(4),u=n(3),m=n(5),h=(n(14),function(e){function t(e){var n;return Object(i.a)(this,t),(n=Object(l.a)(this,Object(u.a)(t).call(this,e))).componentDidMount=function(){n.fetchData()},n.fetchData=function(){fetch("https://gist.githubusercontent.com/blyndusk/d789375e1a6309f82745bcfa3477f64f/raw/2bfea3519938d430b8f922b064c2b54567ea87db/timeline.json").then(function(e){return e.json()}).then(function(e){n.setState({timeline:e})})},n.getPrizesLength=function(){return n.state.timeline.map(function(e,t){n.yearPosY+=20;for(var a=0,o=[],r=[],i={x:n.yearPosY,y:-10},s=0;s<e.categories.length;s++){var l=e.categories[s];a+=l.length,i.y+=10;for(var u=[],m=0;m<l.length;m++){var h=l[m].name;i.y+=10,u.push(c.a.createElement("circle",{key:"".concat(t).concat(s).concat(m),"data-label":s,r:"5",cx:i.x,cy:200-i.y},h))}r.push(c.a.createElement("g",{key:"".concat(t).concat(s),className:"peoples"},u))}return o.push(c.a.createElement("g",{key:t,className:"category"},r)),c.a.createElement("g",{key:t,className:"year"},c.a.createElement("line",{x1:n.yearPosY,y1:200-20*a,x2:n.yearPosY,y2:200,onMouseEnter:function(){return n.mouseup(e.year)}}),o)})},n.mouseup=function(e){return console.log("yeyey"),c.a.createElement("p",null,e)},n.state={timeline:[]},n.yearPosY=0,n}return Object(m.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return c.a.createElement("div",{className:"Timeline"},c.a.createElement("svg",{height:"200",width:"500"},this.getPrizesLength()))}}]),t}(a.Component)),f=function(e){function t(){return Object(i.a)(this,t),Object(l.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return c.a.createElement("div",{className:"App"},"app",c.a.createElement(h,null))}}]),t}(a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(c.a.createElement(f,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},8:function(e,t,n){e.exports=n(15)}},[[8,1,2]]]);
//# sourceMappingURL=main.bfe3c3e2.chunk.js.map