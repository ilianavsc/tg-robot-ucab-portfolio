/* P02 · Inspector de hardware: simulador 3D del circuito (SIL, datos sintéticos). Generado por codigo/construir.mjs; three.js MIT. */
(()=>{var kd=Object.create;var hh=Object.defineProperty;var Vd=Object.getOwnPropertyDescriptor;var Wd=Object.getOwnPropertyNames;var Xd=Object.getPrototypeOf,qd=Object.prototype.hasOwnProperty;var Yd=(i,t)=>()=>{try{return t||i((t={exports:{}}).exports,t),t.exports}catch(e){throw t=0,e}};var Zd=(i,t,e,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let s of Wd(t))!qd.call(i,s)&&s!==e&&hh(i,s,{get:()=>t[s],enumerable:!(n=Vd(t,s))||n.enumerable});return i};var $d=(i,t,e)=>(e=i!=null?kd(Xd(i)):{},Zd(t||!i||!i.__esModule?hh(e,"default",{value:i,enumerable:!0}):e,i));var wd=Yd((Td,ml)=>{(function(i,t){var e=t();typeof ml=="object"&&ml.exports&&(ml.exports=e),i&&(i.TG_ROBOT=e)})(typeof self<"u"?self:typeof globalThis<"u"?globalThis:Td,function(){"use strict";function i(t){return Object.keys(t).forEach(function(e){t[e]&&typeof t[e]=="object"&&i(t[e])}),Object.freeze(t)}return i({version:"1.0.0",velocidad:{maxMs:.46,cruceroMs:.41,pwm100Ms:.57,giroDifPwm:.45},tcrt5000:{canales:4,separacionMm:18,posicionesMm:[-27,-9,9,27],cintaMm:19},hcsr04:{minCm:5,maxCm:80,paradaCm:20,precaucionCm:50,alcanceCm:400,conoGrados:15},mpu6050:{inclinacionDeg:20,vuelcoDeg:30,impactoG:2,anguloMaxDeg:45}})})});var Ni={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},Ui={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},$h=0,sc=1,Jh=2;var ji=1,Kh=2,ks=3,Fi=0,je=1,cn=2,Qi=0,Vs=1,rc=2,ac=3,oc=4,jh=5;var ts=100,Qh=101,tu=102,eu=103,nu=104,iu=200,su=201,ru=202,au=203,lc=204,cc=205,ou=206,lu=207,cu=208,hu=209,uu=210,du=211,fu=212,pu=213,mu=214,za=0,Ha=1,Ga=2,As=3,ka=4,Va=5,Wa=6,Xa=7,So=0,gu=1,_u=2,Jn=0,hc=1,uc=2,dc=3,Zr=4,fc=5,pc=6,mc=7;var gc=300,es=301,Ws=302,bo=303,Eo=304,Rs=1e3,qn=1001,qa=1002,$e=1003,xu=1004;var $r=1005;var on=1006,To=1007;var gi=1008;var hn=1009,_c=1010,xc=1011,Xs=1012,wo=1013,On=1014,In=1015,Bn=1016,Ao=1017,Ro=1018,ns=1020,yc=35902,vc=35899,Mc=1021,Sc=1022,zn=1023,di=1026,_i=1027,Co=1028,Po=1029,Oi=1030,Io=1031;var Lo=1033,Jr=33776,Kr=33777,jr=33778,Qr=33779,Do=35840,No=35841,Uo=35842,Fo=35843,Oo=36196,Bo=37492,zo=37496,Ho=37488,Go=37489,ta=37490,ko=37491,Vo=37808,Wo=37809,Xo=37810,qo=37811,Yo=37812,Zo=37813,$o=37814,Jo=37815,Ko=37816,jo=37817,Qo=37818,tl=37819,el=37820,nl=37821,il=36492,sl=36494,rl=36495,al=36283,ol=36284,ea=36285,ll=36286;var dr=2300,Ya=2301,Oa=2302,ql=2303,Yl=2400,Zl=2401,$l=2402;var yu=3200;var na=0,vu=1,xi="",an="srgb",fr="srgb-linear",pr="linear",Ee="srgb";var Ba=7680;var Mu=519,Su=512,bu=513,Eu=514,bc=515,Tu=516,wu=517,Ec=518,Tc=519,Au=35044;var wc="300 es",Rn=2e3,Cs=2001;function Jd(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function Kd(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}function mr(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Ru(){let i=mr("canvas");return i.style.display="block",i}var uh={},Ps=null;function Ac(...i){let t="THREE."+i.shift();Ps?Ps("log",t,...i):console.log(t,...i)}function Cu(i){let t=i[0];if(typeof t=="string"&&t.startsWith("TSL:")){let e=i[1];e&&e.isStackTrace?i[0]+=" "+e.getLocation():i[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return i}function Zt(...i){i=Cu(i);let t="THREE."+i.shift();if(Ps)Ps("warn",t,...i);else{let e=i[0];e&&e.isStackTrace?console.warn(e.getError(t)):console.warn(t,...i)}}function te(...i){i=Cu(i);let t="THREE."+i.shift();if(Ps)Ps("error",t,...i);else{let e=i[0];e&&e.isStackTrace?console.error(e.getError(t)):console.error(t,...i)}}function lr(...i){let t=i.join(" ");t in uh||(uh[t]=!0,Zt(...i))}function Pu(i,t,e){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}var Iu={[za]:za,[Ga]:Wa,[ka]:ka,[As]:Va,[Ha]:Ha,[Wa]:Ga,[Xa]:Xa,[Va]:As},Fn=class{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){let n=this._listeners;return n===void 0?!1:n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){let n=this._listeners;if(n===void 0)return;let s=n[t];if(s!==void 0){let r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){let e=this._listeners;if(e===void 0)return;let n=e[t.type];if(n!==void 0){t.target=this;let s=n.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,t);t.target=null}}},en=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],dh=1234567,Ts=Math.PI/180,Is=180/Math.PI;function is(){let i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(en[i&255]+en[i>>8&255]+en[i>>16&255]+en[i>>24&255]+"-"+en[t&255]+en[t>>8&255]+"-"+en[t>>16&15|64]+en[t>>24&255]+"-"+en[e&63|128]+en[e>>8&255]+"-"+en[e>>16&255]+en[e>>24&255]+en[n&255]+en[n>>8&255]+en[n>>16&255]+en[n>>24&255]).toLowerCase()}function le(i,t,e){return Math.max(t,Math.min(e,i))}function Rc(i,t){return(i%t+t)%t}function jd(i,t,e,n,s){return n+(i-t)*(s-n)/(e-t)}function Qd(i,t,e){return i!==t?(e-i)/(t-i):0}function cr(i,t,e){return(1-e)*i+e*t}function tf(i,t,e,n){return cr(i,t,1-Math.exp(-e*n))}function ef(i,t=1){return t-Math.abs(Rc(i,t*2)-t)}function nf(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*(3-2*i))}function sf(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*i*(i*(i*6-15)+10))}function rf(i,t){return i+Math.floor(Math.random()*(t-i+1))}function af(i,t){return i+Math.random()*(t-i)}function of(i){return i*(.5-Math.random())}function lf(i){i!==void 0&&(dh=i);let t=dh+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function cf(i){return i*Ts}function hf(i){return i*Is}function uf(i){return i>0&&Number.isInteger(i)&&2**Math.round(Math.log2(i))===i}function df(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function Cc(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function ff(i,t,e,n,s){let r=Math.cos,a=Math.sin,o=r(e/2),c=a(e/2),l=r((t+n)/2),h=a((t+n)/2),f=r((t-n)/2),d=a((t-n)/2),p=r((n-t)/2),g=a((n-t)/2);switch(s){case"XYX":i.set(o*h,c*f,c*d,o*l);break;case"YZY":i.set(c*d,o*h,c*f,o*l);break;case"ZXZ":i.set(c*f,c*d,o*h,o*l);break;case"XZX":i.set(o*h,c*g,c*p,o*l);break;case"YXY":i.set(c*p,o*h,c*g,o*l);break;case"ZYZ":i.set(c*g,c*p,o*h,o*l);break;default:Zt("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function Pc(i){switch(i.constructor){case Uint32Array:return 4294967295;case Uint16Array:return 65535;case Uint8Array:case Uint8ClampedArray:return 255;case Int32Array:return 2147483647;case Int16Array:return 32767;case Int8Array:return 127;default:return}}function Lu(i,t){if(t.constructor===Float32Array)return i;let e=Pc(t);if(e===void 0)throw new Error("THREE.MathUtils: Invalid component type.");return Math.max(i/e,-1)}function Du(i,t){if(t.constructor===Float32Array)return i;let e=Pc(t);if(e===void 0)throw new Error("THREE.MathUtils: Invalid component type.");return Math.round(i*e)}var Ic={DEG2RAD:Ts,RAD2DEG:Is,generateUUID:is,clamp:le,euclideanModulo:Rc,mapLinear:jd,inverseLerp:Qd,lerp:cr,damp:tf,pingpong:ef,smoothstep:nf,smootherstep:sf,randInt:rf,randFloat:af,randFloatSpread:of,seededRandom:lf,degToRad:cf,radToDeg:hf,isPowerOfTwo:uf,ceilPowerOfTwo:df,floorPowerOfTwo:Cc,setQuaternionFromProperEuler:ff,normalize:Du,denormalize:Lu},Oc=class Oc{constructor(t=0,e=0){this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("THREE.Vector2: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){let e=this.x,n=this.y,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6],this.y=s[1]*e+s[4]*n+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=le(this.x,t.x,e.x),this.y=le(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=le(this.x,t,e),this.y=le(this.y,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(le(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(le(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){let n=Math.cos(e),s=Math.sin(e),r=this.x-t.x,a=this.y-t.y;return this.x=r*n-a*s+t.x,this.y=r*s+a*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};Oc.prototype.isVector2=!0;var yt=Oc,vn=class{constructor(t=0,e=0,n=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=s}static slerpFlat(t,e,n,s,r,a,o){let c=n[s+0],l=n[s+1],h=n[s+2],f=n[s+3],d=r[a+0],p=r[a+1],g=r[a+2],_=r[a+3];if(f!==_||c!==d||l!==p||h!==g){let u=c*d+l*p+h*g+f*_;u<0&&(d=-d,p=-p,g=-g,_=-_,u=-u);let m=1-o;if(u<.9995){let S=Math.acos(u),E=Math.sin(S);m=Math.sin(m*S)/E,o=Math.sin(o*S)/E,c=c*m+d*o,l=l*m+p*o,h=h*m+g*o,f=f*m+_*o}else{c=c*m+d*o,l=l*m+p*o,h=h*m+g*o,f=f*m+_*o;let S=1/Math.sqrt(c*c+l*l+h*h+f*f);c*=S,l*=S,h*=S,f*=S}}t[e]=c,t[e+1]=l,t[e+2]=h,t[e+3]=f}static multiplyQuaternionsFlat(t,e,n,s,r,a){let o=n[s],c=n[s+1],l=n[s+2],h=n[s+3],f=r[a],d=r[a+1],p=r[a+2],g=r[a+3];return t[e]=o*g+h*f+c*p-l*d,t[e+1]=c*g+h*d+l*f-o*p,t[e+2]=l*g+h*p+o*d-c*f,t[e+3]=h*g-o*f-c*d-l*p,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,s){return this._x=t,this._y=e,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){let n=t._x,s=t._y,r=t._z,a=t._order,o=Math.cos,c=Math.sin,l=o(n/2),h=o(s/2),f=o(r/2),d=c(n/2),p=c(s/2),g=c(r/2);switch(a){case"XYZ":this._x=d*h*f+l*p*g,this._y=l*p*f-d*h*g,this._z=l*h*g+d*p*f,this._w=l*h*f-d*p*g;break;case"YXZ":this._x=d*h*f+l*p*g,this._y=l*p*f-d*h*g,this._z=l*h*g-d*p*f,this._w=l*h*f+d*p*g;break;case"ZXY":this._x=d*h*f-l*p*g,this._y=l*p*f+d*h*g,this._z=l*h*g+d*p*f,this._w=l*h*f-d*p*g;break;case"ZYX":this._x=d*h*f-l*p*g,this._y=l*p*f+d*h*g,this._z=l*h*g-d*p*f,this._w=l*h*f+d*p*g;break;case"YZX":this._x=d*h*f+l*p*g,this._y=l*p*f+d*h*g,this._z=l*h*g-d*p*f,this._w=l*h*f-d*p*g;break;case"XZY":this._x=d*h*f-l*p*g,this._y=l*p*f-d*h*g,this._z=l*h*g+d*p*f,this._w=l*h*f+d*p*g;break;default:Zt("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){let n=e/2,s=Math.sin(n);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){let e=t.elements,n=e[0],s=e[4],r=e[8],a=e[1],o=e[5],c=e[9],l=e[2],h=e[6],f=e[10],d=n+o+f;if(d>0){let p=.5/Math.sqrt(d+1);this._w=.25/p,this._x=(h-c)*p,this._y=(r-l)*p,this._z=(a-s)*p}else if(n>o&&n>f){let p=2*Math.sqrt(1+n-o-f);this._w=(h-c)/p,this._x=.25*p,this._y=(s+a)/p,this._z=(r+l)/p}else if(o>f){let p=2*Math.sqrt(1+o-n-f);this._w=(r-l)/p,this._x=(s+a)/p,this._y=.25*p,this._z=(c+h)/p}else{let p=2*Math.sqrt(1+f-n-o);this._w=(a-s)/p,this._x=(r+l)/p,this._y=(c+h)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<1e-8?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(le(this.dot(t),-1,1)))}rotateTowards(t,e){let n=this.angleTo(t);if(n===0)return this;let s=Math.min(1,e/n);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){let n=t._x,s=t._y,r=t._z,a=t._w,o=e._x,c=e._y,l=e._z,h=e._w;return this._x=n*h+a*o+s*l-r*c,this._y=s*h+a*c+r*o-n*l,this._z=r*h+a*l+n*c-s*o,this._w=a*h-n*o-s*c-r*l,this._onChangeCallback(),this}slerp(t,e){let n=t._x,s=t._y,r=t._z,a=t._w,o=this.dot(t);o<0&&(n=-n,s=-s,r=-r,a=-a,o=-o);let c=1-e;if(o<.9995){let l=Math.acos(o),h=Math.sin(l);c=Math.sin(c*l)/h,e=Math.sin(e*l)/h,this._x=this._x*c+n*e,this._y=this._y*c+s*e,this._z=this._z*c+r*e,this._w=this._w*c+a*e,this._onChangeCallback()}else this._x=this._x*c+n*e,this._y=this._y*c+s*e,this._z=this._z*c+r*e,this._w=this._w*c+a*e,this.normalize();return this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){let t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},Bc=class Bc{constructor(t=0,e=0,n=0){this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("THREE.Vector3: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(fh.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(fh.setFromAxisAngle(t,e))}applyMatrix3(t){let e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*s,this.y=r[1]*e+r[4]*n+r[7]*s,this.z=r[2]*e+r[5]*n+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){let e=this.x,n=this.y,s=this.z,r=t.elements,a=1/(r[3]*e+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*s+r[12])*a,this.y=(r[1]*e+r[5]*n+r[9]*s+r[13])*a,this.z=(r[2]*e+r[6]*n+r[10]*s+r[14])*a,this}applyQuaternion(t){let e=this.x,n=this.y,s=this.z,r=t.x,a=t.y,o=t.z,c=t.w,l=2*(a*s-o*n),h=2*(o*e-r*s),f=2*(r*n-a*e);return this.x=e+c*l+a*f-o*h,this.y=n+c*h+o*l-r*f,this.z=s+c*f+r*h-a*l,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){let e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*s,this.y=r[1]*e+r[5]*n+r[9]*s,this.z=r[2]*e+r[6]*n+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=le(this.x,t.x,e.x),this.y=le(this.y,t.y,e.y),this.z=le(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=le(this.x,t,e),this.y=le(this.y,t,e),this.z=le(this.z,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(le(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){let n=t.x,s=t.y,r=t.z,a=e.x,o=e.y,c=e.z;return this.x=s*c-r*o,this.y=r*a-n*c,this.z=n*o-s*a,this}projectOnVector(t){let e=t.lengthSq();if(e===0)return this.set(0,0,0);let n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return Ml.copy(this).projectOnVector(t),this.sub(Ml)}reflect(t){return this.sub(Ml.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(le(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y,s=this.z-t.z;return e*e+n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){let s=Math.sin(e)*t;return this.x=s*Math.sin(n),this.y=Math.cos(e)*t,this.z=s*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){let e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};Bc.prototype.isVector3=!0;var N=Bc,Ml=new N,fh=new vn,zc=class zc{constructor(t,e,n,s,r,a,o,c,l){this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,a,o,c,l)}set(t,e,n,s,r,a,o,c,l){let h=this.elements;return h[0]=t,h[1]=s,h[2]=o,h[3]=e,h[4]=r,h[5]=c,h[6]=n,h[7]=a,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){let e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,s=e.elements,r=this.elements,a=n[0],o=n[3],c=n[6],l=n[1],h=n[4],f=n[7],d=n[2],p=n[5],g=n[8],_=s[0],u=s[3],m=s[6],S=s[1],E=s[4],M=s[7],A=s[2],T=s[5],x=s[8];return r[0]=a*_+o*S+c*A,r[3]=a*u+o*E+c*T,r[6]=a*m+o*M+c*x,r[1]=l*_+h*S+f*A,r[4]=l*u+h*E+f*T,r[7]=l*m+h*M+f*x,r[2]=d*_+p*S+g*A,r[5]=d*u+p*E+g*T,r[8]=d*m+p*M+g*x,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],c=t[6],l=t[7],h=t[8];return e*a*h-e*o*l-n*r*h+n*o*c+s*r*l-s*a*c}invert(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],c=t[6],l=t[7],h=t[8],f=h*a-o*l,d=o*c-h*r,p=l*r-a*c,g=e*f+n*d+s*p;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);let _=1/g;return t[0]=f*_,t[1]=(s*l-h*n)*_,t[2]=(o*n-s*a)*_,t[3]=d*_,t[4]=(h*e-s*c)*_,t[5]=(s*r-o*e)*_,t[6]=p*_,t[7]=(n*c-l*e)*_,t[8]=(a*e-n*r)*_,this}transpose(){let t,e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){let e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,s,r,a,o){let c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*a+l*o)+a+t,-s*l,s*c,-s*(-l*a+c*o)+o+e,0,0,1),this}scale(t,e){return lr("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(Sl.makeScale(t,e)),this}rotate(t){return lr("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(Sl.makeRotation(-t)),this}translate(t,e){return lr("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(Sl.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){let e=this.elements,n=t.elements;for(let s=0;s<9;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}};zc.prototype.isMatrix3=!0;var ne=zc,Sl=new ne,ph=new ne().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),mh=new ne().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function pf(){let i={enabled:!0,workingColorSpace:fr,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===Ee&&(s.r=ui(s.r),s.g=ui(s.g),s.b=ui(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===Ee&&(s.r=ws(s.r),s.g=ws(s.g),s.b=ws(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===xi?pr:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[a].fromXYZ).multiply(this.spaces[r].toXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[fr]:{primaries:t,whitePoint:n,transfer:pr,toXYZ:ph,fromXYZ:mh,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:an},outputColorSpaceConfig:{drawingBufferColorSpace:an}},[an]:{primaries:t,whitePoint:n,transfer:Ee,toXYZ:ph,fromXYZ:mh,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:an}}}),i}var de=pf();function ui(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function ws(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}var us,Za=class{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let n;if(t instanceof HTMLCanvasElement)n=t;else{us===void 0&&(us=mr("canvas")),us.width=t.width,us.height=t.height;let s=us.getContext("2d");t instanceof ImageData?s.putImageData(t,0,0):s.drawImage(t,0,0,t.width,t.height),n=us}return n.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){let e=mr("canvas");e.width=t.width,e.height=t.height;let n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);let s=n.getImageData(0,0,t.width,t.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=ui(r[a]/255)*255;return n.putImageData(s,0,0),e}else if(t.data){let e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(ui(e[n]/255)*255):e[n]=ui(e[n]);return{data:e,width:t.width,height:t.height}}else return Zt("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}},mf=0,Ls=class{constructor(t=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:mf++}),this.uuid=is(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){let e=this.data;return typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):typeof VideoFrame<"u"&&e instanceof VideoFrame?t.set(e.displayWidth,e.displayHeight,0):e!==null?t.set(e.width||0,e.height||0,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];let n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(bl(s[a].image)):r.push(bl(s[a]))}else r=bl(s);n.url=r}return e||(t.images[this.uuid]=n),n}};function bl(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Za.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(Zt("Texture: Unable to serialize Texture."),{})}var gf=0,El=new N,ln=class i extends Fn{constructor(t=i.DEFAULT_IMAGE,e=i.DEFAULT_MAPPING,n=qn,s=qn,r=on,a=gi,o=zn,c=hn,l=i.DEFAULT_ANISOTROPY,h=xi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:gf++}),this.uuid=is(),this.name="",this.source=new Ls(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new yt(0,0),this.repeat=new yt(1,1),this.center=new yt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new ne,this.generateMipmaps=!0,this.mipmapsAutoUpdate=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.isPMREMTexture=!1,this.normalized=!1}get width(){return this.source.getSize(El).x}get height(){return this.source.getSize(El).y}get depth(){return this.source.getSize(El).z}get image(){return this.source.data}set image(t){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.normalized=t.normalized,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.mipmapsAutoUpdate=t.mipmapsAutoUpdate,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isPMREMTexture=t.isPMREMTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(let e in t){let n=t[e];if(n===void 0){Zt(`Texture.setValues(): parameter '${e}' has value of undefined.`);continue}let s=this[e];if(s===void 0){Zt(`Texture.setValues(): property '${e}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[e]=n}}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,mipmapsAutoUpdate:this.mipmapsAutoUpdate,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==gc)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Rs:t.x=t.x-Math.floor(t.x);break;case qn:t.x=t.x<0?0:1;break;case qa:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Rs:t.y=t.y-Math.floor(t.y);break;case qn:t.y=t.y<0?0:1;break;case qa:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}};ln.DEFAULT_IMAGE=null;ln.DEFAULT_MAPPING=gc;ln.DEFAULT_ANISOTROPY=1;var Hc=class Hc{constructor(t=0,e=0,n=0,s=1){this.x=t,this.y=e,this.z=n,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,s){return this.x=t,this.y=e,this.z=n,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("THREE.Vector4: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){let e=this.x,n=this.y,s=this.z,r=this.w,a=t.elements;return this.x=a[0]*e+a[4]*n+a[8]*s+a[12]*r,this.y=a[1]*e+a[5]*n+a[9]*s+a[13]*r,this.z=a[2]*e+a[6]*n+a[10]*s+a[14]*r,this.w=a[3]*e+a[7]*n+a[11]*s+a[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);let e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,s,r,c=t.elements,l=c[0],h=c[4],f=c[8],d=c[1],p=c[5],g=c[9],_=c[2],u=c[6],m=c[10];if(Math.abs(h-d)<.01&&Math.abs(f-_)<.01&&Math.abs(g-u)<.01){if(Math.abs(h+d)<.1&&Math.abs(f+_)<.1&&Math.abs(g+u)<.1&&Math.abs(l+p+m-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;let E=(l+1)/2,M=(p+1)/2,A=(m+1)/2,T=(h+d)/4,x=(f+_)/4,b=(g+u)/4;return E>M&&E>A?E<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(E),s=T/n,r=x/n):M>A?M<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(M),n=T/s,r=b/s):A<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(A),n=x/r,s=b/r),this.set(n,s,r,e),this}let S=Math.sqrt((u-g)*(u-g)+(f-_)*(f-_)+(d-h)*(d-h));return Math.abs(S)<.001&&(S=1),this.x=(u-g)/S,this.y=(f-_)/S,this.z=(d-h)/S,this.w=Math.acos((l+p+m-1)/2),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=le(this.x,t.x,e.x),this.y=le(this.y,t.y,e.y),this.z=le(this.z,t.z,e.z),this.w=le(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=le(this.x,t,e),this.y=le(this.y,t,e),this.z=le(this.z,t,e),this.w=le(this.w,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(le(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};Hc.prototype.isVector4=!0;var Ie=Hc,$a=class extends Fn{constructor(t=1,e=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:on,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=n.depth,this.scissor=new Ie(0,0,t,e),this.scissorTest=!1,this.viewport=new Ie(0,0,t,e),this.textures=[];let s=n.count;for(let r=0;r<s;r++)this.textures[r]=new ln({width:t,height:e,depth:n.depth}),this.textures[r].isRenderTargetTexture=!0,this.textures[r].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(t={}){let e={minFilter:on,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.mipmapsAutoUpdate!==void 0&&(e.mipmapsAutoUpdate=t.mipmapsAutoUpdate),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),t!==null&&t.renderTarget===null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=n,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,n=t.textures.length;e<n;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;let s=Object.assign({},t.textures[e].image);this.textures[e].source=new Ls(s)}if(this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveColorBuffer=t.resolveColorBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,this.storeMultisampledColorBuffer=t.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=t.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=t.storeMultisampledStencilBuffer,t.depthTexture!==null)if(t.depthTexture.renderTarget===t){let e=t.depthTexture.clone();e.renderTarget=null,this.depthTexture=e}else this.depthTexture=t.depthTexture;else this.depthTexture=null;return this.samples=t.samples,this.multiview=t.multiview,this.useArrayDepthTexture=t.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}},Mn=class extends $a{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}},gr=class extends ln{constructor(t=null,e=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=$e,this.minFilter=$e,this.wrapR=qn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}};var Ja=class extends ln{constructor(t=null,e=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=$e,this.minFilter=$e,this.wrapR=qn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}};var Mo=class Mo{constructor(t,e,n,s,r,a,o,c,l,h,f,d,p,g,_,u){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,a,o,c,l,h,f,d,p,g,_,u)}set(t,e,n,s,r,a,o,c,l,h,f,d,p,g,_,u){let m=this.elements;return m[0]=t,m[4]=e,m[8]=n,m[12]=s,m[1]=r,m[5]=a,m[9]=o,m[13]=c,m[2]=l,m[6]=h,m[10]=f,m[14]=d,m[3]=p,m[7]=g,m[11]=_,m[15]=u,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Mo().fromArray(this.elements)}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){let e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){let e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return this.determinantAffine()===0?(t.set(1,0,0),e.set(0,1,0),n.set(0,0,1),this):(t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){if(t.determinantAffine()===0)return this.identity();let e=this.elements,n=t.elements,s=1/ds.setFromMatrixColumn(t,0).length(),r=1/ds.setFromMatrixColumn(t,1).length(),a=1/ds.setFromMatrixColumn(t,2).length();return e[0]=n[0]*s,e[1]=n[1]*s,e[2]=n[2]*s,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*a,e[9]=n[9]*a,e[10]=n[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){let e=this.elements,n=t.x,s=t.y,r=t.z,a=Math.cos(n),o=Math.sin(n),c=Math.cos(s),l=Math.sin(s),h=Math.cos(r),f=Math.sin(r);if(t.order==="XYZ"){let d=a*h,p=a*f,g=o*h,_=o*f;e[0]=c*h,e[4]=-c*f,e[8]=l,e[1]=p+g*l,e[5]=d-_*l,e[9]=-o*c,e[2]=_-d*l,e[6]=g+p*l,e[10]=a*c}else if(t.order==="YXZ"){let d=c*h,p=c*f,g=l*h,_=l*f;e[0]=d+_*o,e[4]=g*o-p,e[8]=a*l,e[1]=a*f,e[5]=a*h,e[9]=-o,e[2]=p*o-g,e[6]=_+d*o,e[10]=a*c}else if(t.order==="ZXY"){let d=c*h,p=c*f,g=l*h,_=l*f;e[0]=d-_*o,e[4]=-a*f,e[8]=g+p*o,e[1]=p+g*o,e[5]=a*h,e[9]=_-d*o,e[2]=-a*l,e[6]=o,e[10]=a*c}else if(t.order==="ZYX"){let d=a*h,p=a*f,g=o*h,_=o*f;e[0]=c*h,e[4]=g*l-p,e[8]=d*l+_,e[1]=c*f,e[5]=_*l+d,e[9]=p*l-g,e[2]=-l,e[6]=o*c,e[10]=a*c}else if(t.order==="YZX"){let d=a*c,p=a*l,g=o*c,_=o*l;e[0]=c*h,e[4]=_-d*f,e[8]=g*f+p,e[1]=f,e[5]=a*h,e[9]=-o*h,e[2]=-l*h,e[6]=p*f+g,e[10]=d-_*f}else if(t.order==="XZY"){let d=a*c,p=a*l,g=o*c,_=o*l;e[0]=c*h,e[4]=-f,e[8]=l*h,e[1]=d*f+_,e[5]=a*h,e[9]=p*f-g,e[2]=g*f-p,e[6]=o*h,e[10]=_*f+d}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(_f,t,xf)}lookAt(t,e,n){let s=this.elements;return gn.subVectors(t,e),gn.lengthSq()===0&&(gn.z=1),gn.normalize(),bi.crossVectors(n,gn),bi.lengthSq()===0&&(Math.abs(n.z)===1?gn.x+=1e-4:gn.z+=1e-4,gn.normalize(),bi.crossVectors(n,gn)),bi.normalize(),ca.crossVectors(gn,bi),s[0]=bi.x,s[4]=ca.x,s[8]=gn.x,s[1]=bi.y,s[5]=ca.y,s[9]=gn.y,s[2]=bi.z,s[6]=ca.z,s[10]=gn.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,s=e.elements,r=this.elements,a=n[0],o=n[4],c=n[8],l=n[12],h=n[1],f=n[5],d=n[9],p=n[13],g=n[2],_=n[6],u=n[10],m=n[14],S=n[3],E=n[7],M=n[11],A=n[15],T=s[0],x=s[4],b=s[8],O=s[12],P=s[1],F=s[5],G=s[9],X=s[13],C=s[2],Y=s[6],j=s[10],q=s[14],ut=s[3],K=s[7],rt=s[11],lt=s[15];return r[0]=a*T+o*P+c*C+l*ut,r[4]=a*x+o*F+c*Y+l*K,r[8]=a*b+o*G+c*j+l*rt,r[12]=a*O+o*X+c*q+l*lt,r[1]=h*T+f*P+d*C+p*ut,r[5]=h*x+f*F+d*Y+p*K,r[9]=h*b+f*G+d*j+p*rt,r[13]=h*O+f*X+d*q+p*lt,r[2]=g*T+_*P+u*C+m*ut,r[6]=g*x+_*F+u*Y+m*K,r[10]=g*b+_*G+u*j+m*rt,r[14]=g*O+_*X+u*q+m*lt,r[3]=S*T+E*P+M*C+A*ut,r[7]=S*x+E*F+M*Y+A*K,r[11]=S*b+E*G+M*j+A*rt,r[15]=S*O+E*X+M*q+A*lt,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[4],s=t[8],r=t[12],a=t[1],o=t[5],c=t[9],l=t[13],h=t[2],f=t[6],d=t[10],p=t[14],g=t[3],_=t[7],u=t[11],m=t[15],S=c*p-l*d,E=o*p-l*f,M=o*d-c*f,A=a*p-l*h,T=a*d-c*h,x=a*f-o*h;return e*(_*S-u*E+m*M)-n*(g*S-u*A+m*T)+s*(g*E-_*A+m*x)-r*(g*M-_*T+u*x)}determinantAffine(){let t=this.elements,e=t[0],n=t[4],s=t[8],r=t[1],a=t[5],o=t[9],c=t[2],l=t[6],h=t[10];return e*(a*h-o*l)-n*(r*h-o*c)+s*(r*l-a*c)}transpose(){let t=this.elements,e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){let s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=n),this}invert(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],c=t[6],l=t[7],h=t[8],f=t[9],d=t[10],p=t[11],g=t[12],_=t[13],u=t[14],m=t[15],S=e*o-n*a,E=e*c-s*a,M=e*l-r*a,A=n*c-s*o,T=n*l-r*o,x=s*l-r*c,b=h*_-f*g,O=h*u-d*g,P=h*m-p*g,F=f*u-d*_,G=f*m-p*_,X=d*m-p*u,C=S*X-E*G+M*F+A*P-T*O+x*b;if(C===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let Y=1/C;return t[0]=(o*X-c*G+l*F)*Y,t[1]=(s*G-n*X-r*F)*Y,t[2]=(_*x-u*T+m*A)*Y,t[3]=(d*T-f*x-p*A)*Y,t[4]=(c*P-a*X-l*O)*Y,t[5]=(e*X-s*P+r*O)*Y,t[6]=(u*M-g*x-m*E)*Y,t[7]=(h*x-d*M+p*E)*Y,t[8]=(a*G-o*P+l*b)*Y,t[9]=(n*P-e*G-r*b)*Y,t[10]=(g*T-_*M+m*S)*Y,t[11]=(f*M-h*T-p*S)*Y,t[12]=(o*O-a*F-c*b)*Y,t[13]=(e*F-n*O+s*b)*Y,t[14]=(_*E-g*A-u*S)*Y,t[15]=(h*A-f*E+d*S)*Y,this}scale(t){let e=this.elements,n=t.x,s=t.y,r=t.z;return e[0]*=n,e[4]*=s,e[8]*=r,e[1]*=n,e[5]*=s,e[9]*=r,e[2]*=n,e[6]*=s,e[10]*=r,e[3]*=n,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){let t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,s))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){let e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){let n=Math.cos(e),s=Math.sin(e),r=1-n,a=t.x,o=t.y,c=t.z,l=r*a,h=r*o;return this.set(l*a+n,l*o-s*c,l*c+s*o,0,l*o+s*c,h*o+n,h*c-s*a,0,l*c-s*o,h*c+s*a,r*c*c+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,s,r,a){return this.set(1,n,r,0,t,1,a,0,e,s,1,0,0,0,0,1),this}compose(t,e,n){let s=this.elements,r=e._x,a=e._y,o=e._z,c=e._w,l=r+r,h=a+a,f=o+o,d=r*l,p=r*h,g=r*f,_=a*h,u=a*f,m=o*f,S=c*l,E=c*h,M=c*f,A=n.x,T=n.y,x=n.z;return s[0]=(1-(_+m))*A,s[1]=(p+M)*A,s[2]=(g-E)*A,s[3]=0,s[4]=(p-M)*T,s[5]=(1-(d+m))*T,s[6]=(u+S)*T,s[7]=0,s[8]=(g+E)*x,s[9]=(u-S)*x,s[10]=(1-(d+_))*x,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,n){let s=this.elements;t.x=s[12],t.y=s[13],t.z=s[14];let r=this.determinantAffine();if(r===0)return n.set(1,1,1),e.identity(),this;let a=ds.set(s[0],s[1],s[2]).length(),o=ds.set(s[4],s[5],s[6]).length(),c=ds.set(s[8],s[9],s[10]).length();r<0&&(a=-a),Dn.copy(this);let l=1/a,h=1/o,f=1/c;return Dn.elements[0]*=l,Dn.elements[1]*=l,Dn.elements[2]*=l,Dn.elements[4]*=h,Dn.elements[5]*=h,Dn.elements[6]*=h,Dn.elements[8]*=f,Dn.elements[9]*=f,Dn.elements[10]*=f,e.setFromRotationMatrix(Dn),n.x=a,n.y=o,n.z=c,this}makePerspective(t,e,n,s,r,a,o=Rn,c=!1){let l=this.elements,h=2*r/(e-t),f=2*r/(n-s),d=(e+t)/(e-t),p=(n+s)/(n-s),g,_;if(c)g=r/(a-r),_=a*r/(a-r);else if(o===Rn)g=-(a+r)/(a-r),_=-2*a*r/(a-r);else if(o===Cs)g=-a/(a-r),_=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=h,l[4]=0,l[8]=d,l[12]=0,l[1]=0,l[5]=f,l[9]=p,l[13]=0,l[2]=0,l[6]=0,l[10]=g,l[14]=_,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,n,s,r,a,o=Rn,c=!1){let l=this.elements,h=2/(e-t),f=2/(n-s),d=-(e+t)/(e-t),p=-(n+s)/(n-s),g,_;if(c)g=1/(a-r),_=a/(a-r);else if(o===Rn)g=-2/(a-r),_=-(a+r)/(a-r);else if(o===Cs)g=-1/(a-r),_=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=h,l[4]=0,l[8]=0,l[12]=d,l[1]=0,l[5]=f,l[9]=0,l[13]=p,l[2]=0,l[6]=0,l[10]=g,l[14]=_,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){let e=this.elements,n=t.elements;for(let s=0;s<16;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}};Mo.prototype.isMatrix4=!0;var xe=Mo,ds=new N,Dn=new xe,_f=new N(0,0,0),xf=new N(1,1,1),bi=new N,ca=new N,gn=new N,gh=new xe,_h=new vn,Yn=class i{constructor(t=0,e=0,n=0,s=i.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,s=this._order){return this._x=t,this._y=e,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){let s=t.elements,r=s[0],a=s[4],o=s[8],c=s[1],l=s[5],h=s[9],f=s[2],d=s[6],p=s[10];switch(e){case"XYZ":this._y=Math.asin(le(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,p),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(d,l),this._z=0);break;case"YXZ":this._x=Math.asin(-le(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,p),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-f,r),this._z=0);break;case"ZXY":this._x=Math.asin(le(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-f,p),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-le(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(d,p),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(le(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-f,r)):(this._x=0,this._y=Math.atan2(o,p));break;case"XZY":this._z=Math.asin(-le(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,l),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,p),this._y=0);break;default:Zt("Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return gh.makeRotationFromQuaternion(t),this.setFromRotationMatrix(gh,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return _h.setFromEuler(this),this.setFromQuaternion(_h,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Yn.DEFAULT_ORDER="XYZ";var Ds=class{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}},yf=0,xh=new N,fs=new vn,ri=new xe,ha=new N,tr=new N,vf=new N,Mf=new vn,yh=new N(1,0,0),vh=new N(0,1,0),Mh=new N(0,0,1),Sh={type:"added"},Sf={type:"removed"},ps={type:"childadded",child:null},Tl={type:"childremoved",child:null},He=class i extends Fn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:yf++}),this.uuid=is(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=i.DEFAULT_UP.clone();let t=new N,e=new Yn,n=new vn,s=new N(1,1,1);function r(){n.setFromEuler(e,!1)}function a(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new xe},normalMatrix:{value:new ne}}),this.matrix=new xe,this.matrixWorld=new xe,this.matrixAutoUpdate=i.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Ds,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale),this.pivot!==null&&this.position.copy(this.pivot).applyMatrix4(this.matrix).sub(this.pivot)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return fs.setFromAxisAngle(t,e),this.quaternion.multiply(fs),this}rotateOnWorldAxis(t,e){return fs.setFromAxisAngle(t,e),this.quaternion.premultiply(fs),this}rotateX(t){return this.rotateOnAxis(yh,t)}rotateY(t){return this.rotateOnAxis(vh,t)}rotateZ(t){return this.rotateOnAxis(Mh,t)}translateOnAxis(t,e){return xh.copy(t).applyQuaternion(this.quaternion),this.position.add(xh.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(yh,t)}translateY(t){return this.translateOnAxis(vh,t)}translateZ(t){return this.translateOnAxis(Mh,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(ri.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?ha.copy(t):ha.set(t,e,n);let s=this.parent;this.updateWorldMatrix(!0,!1),tr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?ri.lookAt(tr,ha,this.up):ri.lookAt(ha,tr,this.up),this.quaternion.setFromRotationMatrix(ri),s&&(ri.extractRotation(s.matrixWorld),fs.setFromRotationMatrix(ri),this.quaternion.premultiply(fs.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(te("Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Sh),ps.child=t,this.dispatchEvent(ps),ps.child=null):te("Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Sf),Tl.child=t,this.dispatchEvent(Tl),Tl.child=null),this}removeFromParent(){let t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),ri.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),ri.multiply(t.parent.matrixWorld)),t.applyMatrix4(ri),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Sh),ps.child=t,this.dispatchEvent(ps),ps.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,s=this.children.length;n<s;n++){let a=this.children[n].getObjectByProperty(t,e);if(a!==void 0)return a}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);let s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(tr,t,vf),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(tr,Mf,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}intersectsFrustum(){return!0}traverse(t){t(this);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverseVisible(t)}traverseAncestors(t){let e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let t=this.pivot;if(t!==null){let e=t.x,n=t.y,s=t.z,r=this.matrix.elements;r[12]+=e-r[0]*e-r[4]*n-r[8]*s,r[13]+=n-r[1]*e-r[5]*n-r[9]*s,r[14]+=s-r[2]*e-r[6]*n-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e,n=!1){let s=this.parent;if(t===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),e===!0){let r=this.children;for(let a=0,o=r.length;a<o;a++)r[a].updateWorldMatrix(!1,!0,n)}}toJSON(t){let e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,s.name=this.name,s.castShadow=this.castShadow,s.receiveShadow=this.receiveShadow,s.visible=this.visible,s.frustumCulled=this.frustumCulled,s.renderOrder=this.renderOrder,s.static=this.static,s.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(t),s.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(t)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let c=o.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){let f=c[l];r(t.shapes,f)}else r(t.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(r(t.materials,this.material[c]));s.material=o}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){let c=this.animations[o];s.animations.push(r(t.animations,c))}}if(e){let o=a(t.geometries),c=a(t.materials),l=a(t.textures),h=a(t.images),f=a(t.shapes),d=a(t.skeletons),p=a(t.animations),g=a(t.nodes);o.length>0&&(n.geometries=o),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),h.length>0&&(n.images=h),f.length>0&&(n.shapes=f),d.length>0&&(n.skeletons=d),p.length>0&&(n.animations=p),g.length>0&&(n.nodes=g)}return n.object=s,n;function a(o){let c=[];for(let l in o){let h=o[l];delete h.metadata,c.push(h)}return c}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.pivot=t.pivot!==null?t.pivot.clone():null,this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.static=t.static,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){let s=t.children[n];this.add(s.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}};He.DEFAULT_UP=new N(0,1,0);He.DEFAULT_MATRIX_AUTO_UPDATE=!0;He.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var he=class extends He{constructor(){super(),this.isGroup=!0,this.type="Group"}},bf={type:"move"},Ns=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new he,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new he,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new N,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new N),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new he,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new N,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new N,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){let e=this._hand;if(e)for(let n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let s=null,r=null,a=null,o=this._targetRay,c=this._grip,l=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(l&&t.hand){a=!0;for(let _ of t.hand.values()){let u=e.getJointPose(_,n),m=this._getHandJoint(l,_);u!==null&&(m.matrix.fromArray(u.transform.matrix),m.matrix.decompose(m.position,m.quaternion,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=u.radius),m.visible=u!==null}let h=l.joints["index-finger-tip"],f=l.joints["thumb-tip"],d=h.position.distanceTo(f.position),p=.02,g=.005;l.inputState.pinching&&d>p+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!l.inputState.pinching&&d<=p-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else c!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.quaternion,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1,c.eventsEnabled&&c.dispatchEvent({type:"gripUpdated",data:t,target:this})));o!==null&&(s=e.getPose(t.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.quaternion,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(bf)))}return o!==null&&(o.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){let n=new he;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}},Nu={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Ei={h:0,s:0,l:0},ua={h:0,s:0,l:0};function wl(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}var re=class{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){let s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=an){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,de.colorSpaceToWorking(this,e),this}setRGB(t,e,n,s=de.workingColorSpace){return this.r=t,this.g=e,this.b=n,de.colorSpaceToWorking(this,s),this}setHSL(t,e,n,s=de.workingColorSpace){if(t=Rc(t,1),e=le(e,0,1),n=le(n,0,1),e===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+e):n+e-n*e,a=2*n-r;this.r=wl(a,r,t+1/3),this.g=wl(a,r,t),this.b=wl(a,r,t-1/3)}return de.colorSpaceToWorking(this,s),this}setStyle(t,e=an){function n(r){r!==void 0&&parseFloat(r)<1&&Zt("Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r,a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseFloat(r[1]))/100,Math.min(100,parseFloat(r[2]))/100,Math.min(100,parseFloat(r[3]))/100,e);break;case"hsl":case"hsla":if(r=/^\s*([+-]?(?:\d+(?:\.\d+)?|\.\d+))\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:Zt("Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){let r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(a===6)return this.setHex(parseInt(r,16),e);Zt("Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=an){let n=Nu[t.toLowerCase()];return n!==void 0?this.setHex(n,e):Zt("Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=ui(t.r),this.g=ui(t.g),this.b=ui(t.b),this}copyLinearToSRGB(t){return this.r=ws(t.r),this.g=ws(t.g),this.b=ws(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=an){return de.workingToColorSpace(nn.copy(this),t),Math.round(le(nn.r*255,0,255))*65536+Math.round(le(nn.g*255,0,255))*256+Math.round(le(nn.b*255,0,255))}getHexString(t=an){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=de.workingColorSpace){de.workingToColorSpace(nn.copy(this),e);let n=nn.r,s=nn.g,r=nn.b,a=Math.max(n,s,r),o=Math.min(n,s,r),c,l,h=(o+a)/2;if(o===a)c=0,l=0;else{let f=a-o;switch(l=h<=.5?f/(a+o):f/(2-a-o),a){case n:c=(s-r)/f+(s<r?6:0);break;case s:c=(r-n)/f+2;break;case r:c=(n-s)/f+4;break}c/=6}return t.h=c,t.s=l,t.l=h,t}getRGB(t,e=de.workingColorSpace){return de.workingToColorSpace(nn.copy(this),e),t.r=nn.r,t.g=nn.g,t.b=nn.b,t}getStyle(t=an){de.workingToColorSpace(nn.copy(this),t);let e=nn.r,n=nn.g,s=nn.b;return t!==an?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(t,e,n){return this.getHSL(Ei),this.setHSL(Ei.h+t,Ei.s+e,Ei.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(Ei),t.getHSL(ua);let n=cr(Ei.h,ua.h,e),s=cr(Ei.s,ua.s,e),r=cr(Ei.l,ua.l,e);return this.setHSL(n,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){let e=this.r,n=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*s,this.g=r[1]*e+r[4]*n+r[7]*s,this.b=r[2]*e+r[5]*n+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},nn=new re;re.NAMES=Nu;var _r=class i{constructor(t,e=1,n=1e3){this.isFog=!0,this.name="",this.color=new re(t),this.near=e,this.far=n}clone(){return new i(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}},Xi=class extends He{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Yn,this.environmentIntensity=1,this.environmentRotation=new Yn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),this.background=t.background!==null?t.background.clone():null,this.environment=t.environment!==null?t.environment.clone():null,this.fog=t.fog!==null?t.fog.clone():null,this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),this.overrideMaterial=t.overrideMaterial!==null?t.overrideMaterial.clone():null,this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){let e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),e.object.backgroundBlurriness=this.backgroundBlurriness,e.object.backgroundIntensity=this.backgroundIntensity,e.object.backgroundRotation=this.backgroundRotation.toArray(),e.object.environmentIntensity=this.environmentIntensity,e.object.environmentRotation=this.environmentRotation.toArray(),e}},Nn=new N,ai=new N,Al=new N,oi=new N,ms=new N,gs=new N,bh=new N,Rl=new N,Cl=new N,Pl=new N,Il=new Ie,Ll=new Ie,Dl=new Ie,hi=class i{constructor(t=new N,e=new N,n=new N){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,s){s.subVectors(n,e),Nn.subVectors(t,e),s.cross(Nn);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,n,s,r){Nn.subVectors(s,e),ai.subVectors(n,e),Al.subVectors(t,e);let a=Nn.dot(Nn),o=Nn.dot(ai),c=Nn.dot(Al),l=ai.dot(ai),h=ai.dot(Al),f=a*l-o*o;if(f===0)return r.set(0,0,0),null;let d=1/f,p=(l*c-o*h)*d,g=(a*h-o*c)*d;return r.set(1-p-g,g,p)}static containsPoint(t,e,n,s){return this.getBarycoord(t,e,n,s,oi)===null?!1:oi.x>=0&&oi.y>=0&&oi.x+oi.y<=1}static getInterpolation(t,e,n,s,r,a,o,c){return this.getBarycoord(t,e,n,s,oi)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,oi.x),c.addScaledVector(a,oi.y),c.addScaledVector(o,oi.z),c)}static getInterpolatedAttribute(t,e,n,s,r,a){return Il.setScalar(0),Ll.setScalar(0),Dl.setScalar(0),Il.fromBufferAttribute(t,e),Ll.fromBufferAttribute(t,n),Dl.fromBufferAttribute(t,s),a.setScalar(0),a.addScaledVector(Il,r.x),a.addScaledVector(Ll,r.y),a.addScaledVector(Dl,r.z),a}static isFrontFacing(t,e,n,s){return Nn.subVectors(n,e),ai.subVectors(t,e),Nn.cross(ai).dot(s)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,s){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,n,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Nn.subVectors(this.c,this.b),ai.subVectors(this.a,this.b),Nn.cross(ai).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return i.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return i.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,s,r){return i.getInterpolation(t,this.a,this.b,this.c,e,n,s,r)}containsPoint(t){return i.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return i.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){let n=this.a,s=this.b,r=this.c,a,o;ms.subVectors(s,n),gs.subVectors(r,n),Rl.subVectors(t,n);let c=ms.dot(Rl),l=gs.dot(Rl);if(c<=0&&l<=0)return e.copy(n);Cl.subVectors(t,s);let h=ms.dot(Cl),f=gs.dot(Cl);if(h>=0&&f<=h)return e.copy(s);let d=c*f-h*l;if(d<=0&&c>=0&&h<=0&&c-h>0)return a=c/(c-h),e.copy(n).addScaledVector(ms,a);Pl.subVectors(t,r);let p=ms.dot(Pl),g=gs.dot(Pl);if(g>=0&&p<=g)return e.copy(r);let _=p*l-c*g;if(_<=0&&l>=0&&g<=0)return o=l/(l-g),e.copy(n).addScaledVector(gs,o);let u=h*g-p*f;if(u<=0&&f-h>=0&&p-g>=0)return bh.subVectors(r,s),o=(f-h)/(f-h+(p-g)),e.copy(s).addScaledVector(bh,o);let m=1/(u+_+d);return a=_*m,o=d*m,e.copy(n).addScaledVector(ms,a).addScaledVector(gs,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}},Cn=class{constructor(t=new N(1/0,1/0,1/0),e=new N(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(Un.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(Un.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){let n=Un.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);let n=t.geometry;if(n!==void 0){let r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0&&t.isBatchedMesh!==!0)for(let a=0,o=r.count;a<o;a++)t.isMesh===!0?t.getVertexPosition(a,Un):Un.fromBufferAttribute(r,a),Un.applyMatrix4(t.matrixWorld),this.expandByPoint(Un);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),da.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),da.copy(n.boundingBox)),da.applyMatrix4(t.matrixWorld),this.union(da)}let s=t.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,Un),Un.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(er),fa.subVectors(this.max,er),_s.subVectors(t.a,er),xs.subVectors(t.b,er),ys.subVectors(t.c,er),Ti.subVectors(xs,_s),wi.subVectors(ys,xs),Hi.subVectors(_s,ys);let e=[0,-Ti.z,Ti.y,0,-wi.z,wi.y,0,-Hi.z,Hi.y,Ti.z,0,-Ti.x,wi.z,0,-wi.x,Hi.z,0,-Hi.x,-Ti.y,Ti.x,0,-wi.y,wi.x,0,-Hi.y,Hi.x,0];return!Nl(e,_s,xs,ys,fa)||(e=[1,0,0,0,1,0,0,0,1],!Nl(e,_s,xs,ys,fa))?!1:(pa.crossVectors(Ti,wi),e=[pa.x,pa.y,pa.z],Nl(e,_s,xs,ys,fa))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Un).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(Un).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(li[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),li[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),li[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),li[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),li[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),li[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),li[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),li[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(li),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}},li=[new N,new N,new N,new N,new N,new N,new N,new N],Un=new N,da=new Cn,_s=new N,xs=new N,ys=new N,Ti=new N,wi=new N,Hi=new N,er=new N,fa=new N,pa=new N,Gi=new N;function Nl(i,t,e,n,s){for(let r=0,a=i.length-3;r<=a;r+=3){Gi.fromArray(i,r);let o=s.x*Math.abs(Gi.x)+s.y*Math.abs(Gi.y)+s.z*Math.abs(Gi.z),c=t.dot(Gi),l=e.dot(Gi),h=n.dot(Gi);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>o)return!1}return!0}var Be=new N,ma=new yt,Ef=0,yn=class extends Fn{constructor(t,e,n=!1){if(super(),Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Ef++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=Au,this.updateRanges=[],this.gpuType=In,this.version=0,this._normalizationScale=t!==void 0?Pc(t):void 0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this._normalizationScale=t._normalizationScale,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[n+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)ma.fromBufferAttribute(this,e),ma.applyMatrix3(t),this.setXY(e,ma.x,ma.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)Be.fromBufferAttribute(this,e),Be.applyMatrix3(t),this.setXYZ(e,Be.x,Be.y,Be.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)Be.fromBufferAttribute(this,e),Be.applyMatrix4(t),this.setXYZ(e,Be.x,Be.y,Be.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Be.fromBufferAttribute(this,e),Be.applyNormalMatrix(t),this.setXYZ(e,Be.x,Be.y,Be.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Be.fromBufferAttribute(this,e),Be.transformDirection(t),this.setXYZ(e,Be.x,Be.y,Be.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=this._denormalize(n)),n}setComponent(t,e,n){return this.normalized&&(n=this._normalize(n)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=this._denormalize(e)),e}setX(t,e){return this.normalized&&(e=this._normalize(e)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=this._denormalize(e)),e}setY(t,e){return this.normalized&&(e=this._normalize(e)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=this._denormalize(e)),e}setZ(t,e){return this.normalized&&(e=this._normalize(e)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=this._denormalize(e)),e}setW(t,e){return this.normalized&&(e=this._normalize(e)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=this._normalize(e),n=this._normalize(n)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,s){return t*=this.itemSize,this.normalized&&(e=this._normalize(e),n=this._normalize(n),s=this._normalize(s)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t*=this.itemSize,this.normalized&&(e=this._normalize(e),n=this._normalize(n),s=this._normalize(s),r=this._normalize(r)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return t.name=this.name,t.usage=this.usage,t.gpuType=this.gpuType,t}dispose(){this.dispatchEvent({type:"dispose"})}_denormalize(t){let e=this._normalizationScale;return e!==void 0?Math.max(t/e,-1):Lu(t,this.array)}_normalize(t){let e=this._normalizationScale;return e!==void 0?Math.round(t*e):Du(t,this.array)}};var xr=class extends yn{constructor(t,e,n){super(new Uint16Array(t),e,n)}};var yr=class extends yn{constructor(t,e,n){super(new Uint32Array(t),e,n)}};var ye=class extends yn{constructor(t,e,n){super(new Float32Array(t),e,n)}},Tf=new Cn,nr=new N,Ul=new N,fi=class{constructor(t=new N,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){let n=this.center;e!==void 0?n.copy(e):Tf.setFromPoints(t).getCenter(n);let s=0;for(let r=0,a=t.length;r<a;r++)s=Math.max(s,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){let e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){let n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;nr.subVectors(t,this.center);let e=nr.lengthSq();if(e>this.radius*this.radius){let n=Math.sqrt(e),s=(n-this.radius)*.5;this.center.addScaledVector(nr,s/n),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Ul.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(nr.copy(t.center).add(Ul)),this.expandByPoint(nr.copy(t.center).sub(Ul))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}},wf=0,An=new xe,Fl=new He,vs=new N,_n=new Cn,ir=new Cn,Ze=new N,Je=class i extends Fn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:wf++}),this.uuid=is(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Jd(t)?yr:xr)(t,1):this.index=t,this}setIndirect(t,e=0){return this.indirect=t,this.indirectOffset=e,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){let e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new ne().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(t){return An.makeRotationFromQuaternion(t),this.applyMatrix4(An),this}rotateX(t){return An.makeRotationX(t),this.applyMatrix4(An),this}rotateY(t){return An.makeRotationY(t),this.applyMatrix4(An),this}rotateZ(t){return An.makeRotationZ(t),this.applyMatrix4(An),this}translate(t,e,n){return An.makeTranslation(t,e,n),this.applyMatrix4(An),this}scale(t,e,n){return An.makeScale(t,e,n),this.applyMatrix4(An),this}lookAt(t){return Fl.lookAt(t),Fl.updateMatrix(),this.applyMatrix4(Fl.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(vs).negate(),this.translate(vs.x,vs.y,vs.z),this}setFromPoints(t){let e=this.getAttribute("position");if(e===void 0){let n=[];for(let s=0,r=t.length;s<r;s++){let a=t[s];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new ye(n,3))}else{let n=Math.min(t.length,e.count);for(let s=0;s<n;s++){let r=t[s];e.setXYZ(s,r.x,r.y,r.z||0)}t.length>e.count&&Zt("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Cn);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){te("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new N(-1/0,-1/0,-1/0),new N(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,s=e.length;n<s;n++){let r=e[n];_n.setFromBufferAttribute(r),this.morphTargetsRelative?(Ze.addVectors(this.boundingBox.min,_n.min),this.boundingBox.expandByPoint(Ze),Ze.addVectors(this.boundingBox.max,_n.max),this.boundingBox.expandByPoint(Ze)):(this.boundingBox.expandByPoint(_n.min),this.boundingBox.expandByPoint(_n.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&te('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new fi);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){te("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new N,1/0);return}if(t){let n=this.boundingSphere.center;if(_n.setFromBufferAttribute(t),e)for(let r=0,a=e.length;r<a;r++){let o=e[r];ir.setFromBufferAttribute(o),this.morphTargetsRelative?(Ze.addVectors(_n.min,ir.min),_n.expandByPoint(Ze),Ze.addVectors(_n.max,ir.max),_n.expandByPoint(Ze)):(_n.expandByPoint(ir.min),_n.expandByPoint(ir.max))}_n.getCenter(n);let s=0;for(let r=0,a=t.count;r<a;r++)Ze.fromBufferAttribute(t,r),s=Math.max(s,n.distanceToSquared(Ze));if(e)for(let r=0,a=e.length;r<a;r++){let o=e[r],c=this.morphTargetsRelative;for(let l=0,h=o.count;l<h;l++)Ze.fromBufferAttribute(o,l),c&&(vs.fromBufferAttribute(t,l),Ze.add(vs)),s=Math.max(s,n.distanceToSquared(Ze))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&te('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){te("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=e.position,s=e.normal,r=e.uv,a=this.getAttribute("tangent");(a===void 0||a.count!==n.count)&&(a=new yn(new Float32Array(4*n.count),4),this.setAttribute("tangent",a));let o=[],c=[],l=new Uint8Array(n.count);for(let O=0;O<n.count;O++)o[O]=new N,c[O]=new N;let h=new N,f=new N,d=new N,p=new yt,g=new yt,_=new yt,u=new N,m=new N;function S(O,P,F){l[O]=l[P]=l[F]=1,h.fromBufferAttribute(n,O),f.fromBufferAttribute(n,P),d.fromBufferAttribute(n,F),p.fromBufferAttribute(r,O),g.fromBufferAttribute(r,P),_.fromBufferAttribute(r,F),f.sub(h),d.sub(h),g.sub(p),_.sub(p);let G=1/(g.x*_.y-_.x*g.y);isFinite(G)&&(u.copy(f).multiplyScalar(_.y).addScaledVector(d,-g.y).multiplyScalar(G),m.copy(d).multiplyScalar(g.x).addScaledVector(f,-_.x).multiplyScalar(G),o[O].add(u),o[P].add(u),o[F].add(u),c[O].add(m),c[P].add(m),c[F].add(m))}let E=this.groups;E.length===0&&(E=[{start:0,count:t.count}]);for(let O=0,P=E.length;O<P;++O){let F=E[O],G=F.start,X=F.count;for(let C=G,Y=G+X;C<Y;C+=3)S(t.getX(C+0),t.getX(C+1),t.getX(C+2))}let M=new N,A=new N,T=new N,x=new N;function b(O){T.fromBufferAttribute(s,O),x.copy(T);let P=o[O];M.copy(P),M.sub(T.multiplyScalar(T.dot(P))).normalize(),A.crossVectors(x,P);let G=A.dot(c[O])<0?-1:1;a.setXYZW(O,M.x,M.y,M.z,G)}for(let O=0,P=n.count;O<P;++O)l[O]&&b(O);this._transformed=!0}computeVertexNormals(){let t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==e.count)n=new yn(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let d=0,p=n.count;d<p;d++)n.setXYZ(d,0,0,0);let s=new N,r=new N,a=new N,o=new N,c=new N,l=new N,h=new N,f=new N;if(t)for(let d=0,p=t.count;d<p;d+=3){let g=t.getX(d+0),_=t.getX(d+1),u=t.getX(d+2);s.fromBufferAttribute(e,g),r.fromBufferAttribute(e,_),a.fromBufferAttribute(e,u),h.subVectors(a,r),f.subVectors(s,r),h.cross(f),o.fromBufferAttribute(n,g),c.fromBufferAttribute(n,_),l.fromBufferAttribute(n,u),o.add(h),c.add(h),l.add(h),n.setXYZ(g,o.x,o.y,o.z),n.setXYZ(_,c.x,c.y,c.z),n.setXYZ(u,l.x,l.y,l.z)}else for(let d=0,p=e.count;d<p;d+=3)s.fromBufferAttribute(e,d+0),r.fromBufferAttribute(e,d+1),a.fromBufferAttribute(e,d+2),h.subVectors(a,r),f.subVectors(s,r),h.cross(f),n.setXYZ(d+0,h.x,h.y,h.z),n.setXYZ(d+1,h.x,h.y,h.z),n.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)Ze.fromBufferAttribute(t,e),Ze.normalize(),t.setXYZ(e,Ze.x,Ze.y,Ze.z)}toNonIndexed(){function t(o,c){let l=o.array,h=o.itemSize,f=o.normalized,d=new l.constructor(c.length*h),p=0,g=0;for(let _=0,u=c.length;_<u;_++){o.isInterleavedBufferAttribute?p=c[_]*o.data.stride+o.offset:p=c[_]*h;for(let m=0;m<h;m++)d[g++]=l[p++]}return new yn(d,h,f)}if(this.index===null)return Zt("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let e=new i,n=this.index.array,s=this.attributes;for(let o in s){let c=s[o],l=t(c,n);e.setAttribute(o,l)}let r=this.morphAttributes;for(let o in r){let c=[],l=r[o];for(let h=0,f=l.length;h<f;h++){let d=l[h],p=t(d,n);c.push(p)}e.morphAttributes[o]=c}e.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,c=a.length;o<c;o++){let l=a[o];e.addGroup(l.start,l.count,l.materialIndex)}return e}toJSON(){let t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,t.name=this.name,Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let c=this.parameters;for(let l in c)c[l]!==void 0&&(t[l]=c[l]);return t}t.data={attributes:{}};let e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});let n=this.attributes;for(let c in n){let l=n[c];t.data.attributes[c]=l.toJSON(t.data)}let s={},r=!1;for(let c in this.morphAttributes){let l=this.morphAttributes[c],h=[];for(let f=0,d=l.length;f<d;f++){let p=l[f];h.push(p.toJSON(t.data))}h.length>0&&(s[c]=h,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(t.data.boundingSphere=o.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let e={};this.name=t.name;let n=t.index;n!==null&&this.setIndex(n.clone());let s=t.attributes;for(let l in s){let h=s[l];this.setAttribute(l,h.clone(e))}let r=t.morphAttributes;for(let l in r){let h=[],f=r[l];for(let d=0,p=f.length;d<p;d++)h.push(f[d].clone(e));this.morphAttributes[l]=h}this.morphTargetsRelative=t.morphTargetsRelative;let a=t.groups;for(let l=0,h=a.length;l<h;l++){let f=a[l];this.addGroup(f.start,f.count,f.materialIndex)}let o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());let c=t.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this._transformed=t._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}};var Ol=new N,Af=new N,Rf=new ne,xn=class{constructor(t=new N(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,s){return this.normal.set(t,e,n),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){let s=Ol.subVectors(n,e).cross(Af.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){let t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e,n=!0){let s=t.delta(Ol),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;let a=-(t.start.dot(this.normal)+this.constant)/r;return n===!0&&(a<0||a>1)?null:e.copy(t.start).addScaledVector(s,a)}intersectsLine(t){let e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){let n=e||Rf.getNormalMatrix(t),s=this.coplanarPoint(Ol).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(t){return this.normal.fromArray(t.normal),this.constant=t.constant,this}},Cf=0,Zn=class extends Fn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Cf++}),this.uuid=is(),this.name="",this.type="Material",this.blending=Vs,this.side=Fi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=lc,this.blendDst=cc,this.blendEquation=ts,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new re(0,0,0),this.blendAlpha=0,this.depthFunc=As,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Mu,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ba,this.stencilZFail=Ba,this.stencilZPass=Ba,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(let e in t){let n=t[e];if(n===void 0){Zt(`Material: parameter '${e}' has value of undefined.`);continue}let s=this[e];if(s===void 0){Zt(`Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector2&&n&&n.isVector2||s&&s.isEuler&&n&&n.isEuler||s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[e]=n}}toJSON(t){let e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.diffuseRoughness!==void 0&&(n.diffuseRoughness=this.diffuseRoughness),this.diffuseRoughnessMap&&this.diffuseRoughnessMap.isTexture&&(n.diffuseRoughnessMap=this.diffuseRoughnessMap.toJSON(t).uuid),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessMinimum!==void 0&&(n.iridescenceThicknessMinimum=this.iridescenceThicknessMinimum),this.iridescenceThicknessMaximum!==void 0&&(n.iridescenceThicknessMaximum=this.iridescenceThicknessMaximum),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(r=>r.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){let a=[];for(let o in r){let c=r[o];delete c.metadata,a.push(c)}return a}if(e){let r=s(t.textures),a=s(t.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}fromJSON(t,e){if(t.uuid!==void 0&&(this.uuid=t.uuid),t.name!==void 0&&(this.name=t.name),t.color!==void 0&&this.color!==void 0&&this.color.setHex(t.color),t.roughness!==void 0&&(this.roughness=t.roughness),t.metalness!==void 0&&(this.metalness=t.metalness),t.sheen!==void 0&&(this.sheen=t.sheen),t.sheenColor!==void 0&&(this.sheenColor=new re().setHex(t.sheenColor)),t.sheenRoughness!==void 0&&(this.sheenRoughness=t.sheenRoughness),t.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(t.emissive),t.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(t.specular),t.specularIntensity!==void 0&&(this.specularIntensity=t.specularIntensity),t.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(t.specularColor),t.shininess!==void 0&&(this.shininess=t.shininess),t.clearcoat!==void 0&&(this.clearcoat=t.clearcoat),t.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=t.clearcoatRoughness),t.diffuseRoughness!==void 0&&(this.diffuseRoughness=t.diffuseRoughness),t.dispersion!==void 0&&(this.dispersion=t.dispersion),t.retroreflectivity!==void 0&&(this.retroreflectivity=t.retroreflectivity),t.iridescence!==void 0&&(this.iridescence=t.iridescence),t.iridescenceIOR!==void 0&&(this.iridescenceIOR=t.iridescenceIOR),t.iridescenceThicknessMinimum!==void 0&&(this.iridescenceThicknessMinimum=t.iridescenceThicknessMinimum),t.iridescenceThicknessMaximum!==void 0&&(this.iridescenceThicknessMaximum=t.iridescenceThicknessMaximum),t.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessMinimum=t.iridescenceThicknessRange[0],this.iridescenceThicknessMaximum=t.iridescenceThicknessRange[1]),t.transmission!==void 0&&(this.transmission=t.transmission),t.thickness!==void 0&&(this.thickness=t.thickness),t.attenuationDistance!==void 0&&(this.attenuationDistance=t.attenuationDistance),t.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(t.attenuationColor),t.anisotropy!==void 0&&(this.anisotropy=t.anisotropy),t.anisotropyRotation!==void 0&&(this.anisotropyRotation=t.anisotropyRotation),t.fog!==void 0&&(this.fog=t.fog),t.flatShading!==void 0&&(this.flatShading=t.flatShading),t.blending!==void 0&&(this.blending=t.blending),t.combine!==void 0&&(this.combine=t.combine),t.side!==void 0&&(this.side=t.side),t.shadowSide!==void 0&&(this.shadowSide=t.shadowSide),t.opacity!==void 0&&(this.opacity=t.opacity),t.transparent!==void 0&&(this.transparent=t.transparent),t.alphaTest!==void 0&&(this.alphaTest=t.alphaTest),t.alphaHash!==void 0&&(this.alphaHash=t.alphaHash),t.depthFunc!==void 0&&(this.depthFunc=t.depthFunc),t.depthTest!==void 0&&(this.depthTest=t.depthTest),t.depthWrite!==void 0&&(this.depthWrite=t.depthWrite),t.colorWrite!==void 0&&(this.colorWrite=t.colorWrite),t.clippingPlanes!==void 0&&(this.clippingPlanes=t.clippingPlanes.map(n=>new xn().fromJSON(n))),t.clipIntersection!==void 0&&(this.clipIntersection=t.clipIntersection),t.clipShadows!==void 0&&(this.clipShadows=t.clipShadows),t.depthPacking!==void 0&&(this.depthPacking=t.depthPacking),t.blendSrc!==void 0&&(this.blendSrc=t.blendSrc),t.blendDst!==void 0&&(this.blendDst=t.blendDst),t.blendEquation!==void 0&&(this.blendEquation=t.blendEquation),t.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=t.blendSrcAlpha),t.blendDstAlpha!==void 0&&(this.blendDstAlpha=t.blendDstAlpha),t.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=t.blendEquationAlpha),t.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(t.blendColor),t.blendAlpha!==void 0&&(this.blendAlpha=t.blendAlpha),t.stencilWriteMask!==void 0&&(this.stencilWriteMask=t.stencilWriteMask),t.stencilFunc!==void 0&&(this.stencilFunc=t.stencilFunc),t.stencilRef!==void 0&&(this.stencilRef=t.stencilRef),t.stencilFuncMask!==void 0&&(this.stencilFuncMask=t.stencilFuncMask),t.stencilFail!==void 0&&(this.stencilFail=t.stencilFail),t.stencilZFail!==void 0&&(this.stencilZFail=t.stencilZFail),t.stencilZPass!==void 0&&(this.stencilZPass=t.stencilZPass),t.stencilWrite!==void 0&&(this.stencilWrite=t.stencilWrite),t.wireframe!==void 0&&(this.wireframe=t.wireframe),t.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=t.wireframeLinewidth),t.wireframeLinecap!==void 0&&(this.wireframeLinecap=t.wireframeLinecap),t.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=t.wireframeLinejoin),t.rotation!==void 0&&(this.rotation=t.rotation),t.linewidth!==void 0&&(this.linewidth=t.linewidth),t.linecap!==void 0&&(this.linecap=t.linecap),t.linejoin!==void 0&&(this.linejoin=t.linejoin),t.dashSize!==void 0&&(this.dashSize=t.dashSize),t.gapSize!==void 0&&(this.gapSize=t.gapSize),t.scale!==void 0&&(this.scale=t.scale),t.polygonOffset!==void 0&&(this.polygonOffset=t.polygonOffset),t.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=t.polygonOffsetFactor),t.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=t.polygonOffsetUnits),t.dithering!==void 0&&(this.dithering=t.dithering),t.alphaToCoverage!==void 0&&(this.alphaToCoverage=t.alphaToCoverage),t.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=t.premultipliedAlpha),t.forceSinglePass!==void 0&&(this.forceSinglePass=t.forceSinglePass),t.allowOverride!==void 0&&(this.allowOverride=t.allowOverride),t.visible!==void 0&&(this.visible=t.visible),t.toneMapped!==void 0&&(this.toneMapped=t.toneMapped),t.userData!==void 0&&(this.userData=t.userData),t.vertexColors!==void 0&&(typeof t.vertexColors=="number"?this.vertexColors=t.vertexColors>0:this.vertexColors=t.vertexColors),t.size!==void 0&&(this.size=t.size),t.sizeAttenuation!==void 0&&(this.sizeAttenuation=t.sizeAttenuation),t.map!==void 0&&(this.map=e[t.map]||null),t.matcap!==void 0&&(this.matcap=e[t.matcap]||null),t.alphaMap!==void 0&&(this.alphaMap=e[t.alphaMap]||null),t.bumpMap!==void 0&&(this.bumpMap=e[t.bumpMap]||null),t.bumpScale!==void 0&&(this.bumpScale=t.bumpScale),t.normalMap!==void 0&&(this.normalMap=e[t.normalMap]||null),t.normalMapType!==void 0&&(this.normalMapType=t.normalMapType),t.normalScale!==void 0){let n=t.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new yt().fromArray(n)}return t.displacementMap!==void 0&&(this.displacementMap=e[t.displacementMap]||null),t.displacementScale!==void 0&&(this.displacementScale=t.displacementScale),t.displacementBias!==void 0&&(this.displacementBias=t.displacementBias),t.roughnessMap!==void 0&&(this.roughnessMap=e[t.roughnessMap]||null),t.metalnessMap!==void 0&&(this.metalnessMap=e[t.metalnessMap]||null),t.emissiveMap!==void 0&&(this.emissiveMap=e[t.emissiveMap]||null),t.emissiveIntensity!==void 0&&(this.emissiveIntensity=t.emissiveIntensity),t.specularMap!==void 0&&(this.specularMap=e[t.specularMap]||null),t.specularIntensityMap!==void 0&&(this.specularIntensityMap=e[t.specularIntensityMap]||null),t.specularColorMap!==void 0&&(this.specularColorMap=e[t.specularColorMap]||null),t.envMap!==void 0&&(this.envMap=e[t.envMap]||null),t.envMapRotation!==void 0&&this.envMapRotation.fromArray(t.envMapRotation),t.envMapIntensity!==void 0&&(this.envMapIntensity=t.envMapIntensity),t.reflectivity!==void 0&&(this.reflectivity=t.reflectivity),t.refractionRatio!==void 0&&(this.refractionRatio=t.refractionRatio),t.lightMap!==void 0&&(this.lightMap=e[t.lightMap]||null),t.lightMapIntensity!==void 0&&(this.lightMapIntensity=t.lightMapIntensity),t.aoMap!==void 0&&(this.aoMap=e[t.aoMap]||null),t.aoMapIntensity!==void 0&&(this.aoMapIntensity=t.aoMapIntensity),t.gradientMap!==void 0&&(this.gradientMap=e[t.gradientMap]||null),t.clearcoatMap!==void 0&&(this.clearcoatMap=e[t.clearcoatMap]||null),t.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=e[t.clearcoatRoughnessMap]||null),t.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=e[t.clearcoatNormalMap]||null),t.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new yt().fromArray(t.clearcoatNormalScale)),t.diffuseRoughnessMap!==void 0&&(this.diffuseRoughnessMap=e[t.diffuseRoughnessMap]||null),t.iridescenceMap!==void 0&&(this.iridescenceMap=e[t.iridescenceMap]||null),t.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=e[t.iridescenceThicknessMap]||null),t.transmissionMap!==void 0&&(this.transmissionMap=e[t.transmissionMap]||null),t.thicknessMap!==void 0&&(this.thicknessMap=e[t.thicknessMap]||null),t.anisotropyMap!==void 0&&(this.anisotropyMap=e[t.anisotropyMap]||null),t.sheenColorMap!==void 0&&(this.sheenColorMap=e[t.sheenColorMap]||null),t.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=e[t.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;let e=t.clippingPlanes,n=null;if(e!==null){let s=e.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.allowOverride=t.allowOverride,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}};var ci=new N,Bl=new N,ga=new N,_a=new N,Ri=class{constructor(t=new N,e=new N(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,ci)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);let n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){let e=ci.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(ci.copy(this.origin).addScaledVector(this.direction,e),ci.distanceToSquared(t))}distanceSqToSegment(t,e,n,s){Bl.copy(t).add(e).multiplyScalar(.5),ga.copy(e).sub(t).normalize(),_a.copy(this.origin).sub(Bl);let r=t.distanceTo(e)*.5,a=-this.direction.dot(ga),o=_a.dot(this.direction),c=-_a.dot(ga),l=_a.lengthSq(),h=Math.abs(1-a*a),f,d,p,g;if(h>0)if(f=a*c-o,d=a*o-c,g=r*h,f>=0)if(d>=-g)if(d<=g){let _=1/h;f*=_,d*=_,p=f*(f+a*d+2*o)+d*(a*f+d+2*c)+l}else d=r,f=Math.max(0,-(a*d+o)),p=-f*f+d*(d+2*c)+l;else d=-r,f=Math.max(0,-(a*d+o)),p=-f*f+d*(d+2*c)+l;else d<=-g?(f=Math.max(0,-(-a*r+o)),d=f>0?-r:Math.min(Math.max(-r,-c),r),p=-f*f+d*(d+2*c)+l):d<=g?(f=0,d=Math.min(Math.max(-r,-c),r),p=d*(d+2*c)+l):(f=Math.max(0,-(a*r+o)),d=f>0?r:Math.min(Math.max(-r,-c),r),p=-f*f+d*(d+2*c)+l);else d=a>0?-r:r,f=Math.max(0,-(a*d+o)),p=-f*f+d*(d+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,f),s&&s.copy(Bl).addScaledVector(ga,d),p}intersectSphere(t,e){if(t.radius<0)return null;ci.subVectors(t.center,this.origin);let n=ci.dot(this.direction),s=ci.dot(ci)-n*n,r=t.radius*t.radius;if(s>r)return null;let a=Math.sqrt(r-s),o=n-a,c=n+a;return c<0?null:o<0?this.at(c,e):this.at(o,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){let e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){let n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){let e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,s,r,a,o,c,l=1/this.direction.x,h=1/this.direction.y,f=1/this.direction.z,d=this.origin;return l>=0?(n=(t.min.x-d.x)*l,s=(t.max.x-d.x)*l):(n=(t.max.x-d.x)*l,s=(t.min.x-d.x)*l),h>=0?(r=(t.min.y-d.y)*h,a=(t.max.y-d.y)*h):(r=(t.max.y-d.y)*h,a=(t.min.y-d.y)*h),n>a||r>s||((r>n||isNaN(n))&&(n=r),(a<s||isNaN(s))&&(s=a),f>=0?(o=(t.min.z-d.z)*f,c=(t.max.z-d.z)*f):(o=(t.max.z-d.z)*f,c=(t.min.z-d.z)*f),n>c||o>s)||((o>n||n!==n)&&(n=o),(c<s||s!==s)&&(s=c),s<0)?null:this.at(n>=0?n:s,e)}intersectsBox(t){return this.intersectBox(t,ci)!==null}intersectTriangle(t,e,n,s,r){let a=this.origin,o=this.direction,c=o.x,l=o.y,h=o.z,f=t.x-a.x,d=t.y-a.y,p=t.z-a.z,g=e.x-a.x,_=e.y-a.y,u=e.z-a.z,m=n.x-a.x,S=n.y-a.y,E=n.z-a.z,M=Math.abs(c),A=Math.abs(l),T=Math.abs(h),x,b,O,P,F,G,X,C,Y,j,q,ut;if(M>=A&&M>=T?(O=c,G=f,Y=g,ut=m,c>=0?(x=l,b=h,P=d,F=p,X=_,C=u,j=S,q=E):(x=h,b=l,P=p,F=d,X=u,C=_,j=E,q=S)):A>=T?(O=l,G=d,Y=_,ut=S,l>=0?(x=h,b=c,P=p,F=f,X=u,C=g,j=E,q=m):(x=c,b=h,P=f,F=p,X=g,C=u,j=m,q=E)):(O=h,G=p,Y=u,ut=E,h>=0?(x=c,b=l,P=f,F=d,X=g,C=_,j=m,q=S):(x=l,b=c,P=d,F=f,X=_,C=g,j=S,q=m)),O===0)return null;let K=x/O,rt=b/O,lt=1/O,Ft=P-K*G,It=F-rt*G,$=X-K*Y,bt=C-rt*Y,Dt=j-K*ut,Ot=q-rt*ut,Tt=Dt*bt-Ot*$,Xt=Ft*Ot-It*Dt,ve=$*It-bt*Ft;if(s){if(Tt<0||Xt<0||ve<0)return null}else if((Tt<0||Xt<0||ve<0)&&(Tt>0||Xt>0||ve>0))return null;let Gt=Tt+Xt+ve;if(Gt===0)return null;let jt=lt*(Tt*G+Xt*Y+ve*ut);return(Gt>0?jt<0:jt>0)?null:this.at(jt/Gt,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Pn=class extends Zn{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new re(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Yn,this.combine=So,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}},Eh=new xe,ki=new Ri,xa=new fi,Th=new N,ya=new N,va=new N,Ma=new N,zl=new N,Sa=new N,wh=new N,ba=new N,ft=class extends He{constructor(t=new Je,e=new Pn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0?this.morphTargetInfluences=t.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,t.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(t,e){let n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;e.fromBufferAttribute(s,t);let o=this.morphTargetInfluences;if(r&&o){Sa.set(0,0,0);for(let c=0,l=r.length;c<l;c++){let h=o[c],f=r[c];h!==0&&(zl.fromBufferAttribute(f,t),a?Sa.addScaledVector(zl,h):Sa.addScaledVector(zl.sub(e),h))}e.add(Sa)}return e}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){let n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),xa.copy(n.boundingSphere),xa.applyMatrix4(r),ki.copy(t.ray).recast(t.near),!(xa.containsPoint(ki.origin)===!1&&(ki.intersectSphere(xa,Th)===null||ki.origin.distanceToSquared(Th)>(t.far-t.near)**2))&&(Eh.copy(r).invert(),ki.copy(t.ray).applyMatrix4(Eh),!(n.boundingBox!==null&&ki.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,ki)))}_computeIntersections(t,e,n){let s,r=this.geometry,a=this.material,o=r.index,c=r.attributes.position,l=r.attributes.uv,h=r.attributes.uv1,f=r.attributes.normal,d=r.groups,p=r.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,_=d.length;g<_;g++){let u=d[g],m=a[u.materialIndex],S=Math.max(u.start,p.start),E=Math.min(o.count,Math.min(u.start+u.count,p.start+p.count));for(let M=S,A=E;M<A;M+=3){let T=o.getX(M),x=o.getX(M+1),b=o.getX(M+2);s=Ea(this,m,t,n,l,h,f,T,x,b),s&&(s.faceIndex=Math.floor(M/3),s.face.materialIndex=u.materialIndex,e.push(s))}}else{let g=Math.max(0,p.start),_=Math.min(o.count,p.start+p.count);for(let u=g,m=_;u<m;u+=3){let S=o.getX(u),E=o.getX(u+1),M=o.getX(u+2);s=Ea(this,a,t,n,l,h,f,S,E,M),s&&(s.faceIndex=Math.floor(u/3),e.push(s))}}else if(c!==void 0)if(Array.isArray(a))for(let g=0,_=d.length;g<_;g++){let u=d[g],m=a[u.materialIndex],S=Math.max(u.start,p.start),E=Math.min(c.count,Math.min(u.start+u.count,p.start+p.count));for(let M=S,A=E;M<A;M+=3){let T=M,x=M+1,b=M+2;s=Ea(this,m,t,n,l,h,f,T,x,b),s&&(s.faceIndex=Math.floor(M/3),s.face.materialIndex=u.materialIndex,e.push(s))}}else{let g=Math.max(0,p.start),_=Math.min(c.count,p.start+p.count);for(let u=g,m=_;u<m;u+=3){let S=u,E=u+1,M=u+2;s=Ea(this,a,t,n,l,h,f,S,E,M),s&&(s.faceIndex=Math.floor(u/3),e.push(s))}}}};function Pf(i,t,e,n,s,r,a,o){let c;if(t.side===je?c=n.intersectTriangle(a,r,s,!0,o):c=n.intersectTriangle(s,r,a,t.side===Fi,o),c===null)return null;ba.copy(o),ba.applyMatrix4(i.matrixWorld);let l=e.ray.origin.distanceTo(ba);return l<e.near||l>e.far?null:{distance:l,point:ba.clone(),object:i}}function Ea(i,t,e,n,s,r,a,o,c,l){i.getVertexPosition(o,ya),i.getVertexPosition(c,va),i.getVertexPosition(l,Ma);let h=Pf(i,t,e,n,ya,va,Ma,wh);if(h){let f=new N;hi.getBarycoord(wh,ya,va,Ma,f),s&&(h.uv=hi.getInterpolatedAttribute(s,o,c,l,f,new yt)),r&&(h.uv1=hi.getInterpolatedAttribute(r,o,c,l,f,new yt)),a&&(h.normal=hi.getInterpolatedAttribute(a,o,c,l,f,new N),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));let d={a:o,b:c,c:l,normal:new N,materialIndex:0};hi.getNormal(ya,va,Ma,d.normal),h.face=d,h.barycoord=f}return h}var vr=class extends ln{constructor(t=null,e=1,n=1,s,r,a,o,c,l=$e,h=$e,f,d){super(null,a,o,c,l,h,s,r,f,d),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Mr=class extends yn{constructor(t,e,n,s=1){super(t,e,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){let t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}},Ms=new xe,Ah=new xe,Ta=[],Rh=new Cn,If=new xe,sr=new ft,rr=new fi,qi=class extends ft{constructor(t,e,n){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new Mr(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,If)}computeBoundingBox(){let t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new Cn),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,Ms),Rh.copy(t.boundingBox).applyMatrix4(Ms),this.boundingBox.union(Rh)}computeBoundingSphere(){let t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new fi),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,Ms),rr.copy(t.boundingSphere).applyMatrix4(Ms),this.boundingSphere.union(rr)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),this.morphTexture=t.morphTexture!==null?t.morphTexture.clone():null,this.instanceColor=t.instanceColor!==null?t.instanceColor.clone():null,this.count=t.count,this.boundingBox=t.boundingBox!==null?t.boundingBox.clone():null,this.boundingSphere=t.boundingSphere!==null?t.boundingSphere.clone():null,this}getColorAt(t,e){return this.instanceColor===null?e.setRGB(1,1,1):e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){return e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){let n=e.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,a=t*r+1;for(let o=0;o<n.length;o++)n[o]=s[a+o]}raycast(t,e){let n=this.matrixWorld,s=this.count;if(sr.geometry=this.geometry,sr.material=this.material,sr.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),rr.copy(this.boundingSphere),rr.applyMatrix4(n),t.ray.intersectsSphere(rr)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,Ms),Ah.multiplyMatrices(n,Ms),sr.matrixWorld=Ah,sr.raycast(t,Ta);for(let a=0,o=Ta.length;a<o;a++){let c=Ta[a];c.instanceId=r,c.object=this,e.push(c)}Ta.length=0}}setColorAt(t,e){return this.instanceColor===null&&(this.instanceColor=new Mr(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3),this}setMatrixAt(t,e){return e.toArray(this.instanceMatrix.array,t*16),this}setMorphAt(t,e){let n=e.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new vr(new Float32Array(s*this.count),s,this.count,Co,In));let r=this.morphTexture.source.data.data,a=0;for(let l=0;l<n.length;l++)a+=n[l];let o=this.geometry.morphTargetsRelative?1:1-a,c=s*t;return r[c]=o,r.set(n,c+1),this}updateMorphTargets(){}dispose(){super.dispose(),this.instanceMatrix.dispose(),this.instanceColor!==null&&this.instanceColor.dispose(),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},Vi=new fi,Lf=new yt(.5,.5),wa=new N,Ci=class{constructor(t=new xn,e=new xn,n=new xn,s=new xn,r=new xn,a=new xn){this.planes=[t,e,n,s,r,a]}set(t,e,n,s,r,a){let o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(n),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(t){let e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=Rn,n=!1){let s=this.planes,r=t.elements,a=r[0],o=r[1],c=r[2],l=r[3],h=r[4],f=r[5],d=r[6],p=r[7],g=r[8],_=r[9],u=r[10],m=r[11],S=r[12],E=r[13],M=r[14],A=r[15];if(s[0].setComponents(l-a,p-h,m-g,A-S).normalize(),s[1].setComponents(l+a,p+h,m+g,A+S).normalize(),s[2].setComponents(l+o,p+f,m+_,A+E).normalize(),s[3].setComponents(l-o,p-f,m-_,A-E).normalize(),n)s[4].setComponents(c,d,u,M).normalize(),s[5].setComponents(l-c,p-d,m-u,A-M).normalize();else if(s[4].setComponents(l-c,p-d,m-u,A-M).normalize(),e===Rn)s[5].setComponents(l+c,p+d,m+u,A+M).normalize();else if(e===Cs)s[5].setComponents(c,d,u,M).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Vi.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{let e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),Vi.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Vi)}intersectsSprite(t){Vi.center.set(0,0,0);let e=Lf.distanceTo(t.center);return Vi.radius=.7071067811865476+e,Vi.applyMatrix4(t.matrixWorld),this.intersectsSphere(Vi)}intersectsSphere(t){let e=this.planes,n=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(t){let e=this.planes;for(let n=0;n<6;n++){let s=e[n];if(wa.x=s.normal.x>0?t.max.x:t.min.x,wa.y=s.normal.y>0?t.max.y:t.min.y,wa.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(wa)<0)return!1}return!0}containsPoint(t){let e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}},Ch=new xe,Ka=class i{constructor(){this.coordinateSystem=Rn,this._frustums=[],this._count=0}setFromArrayCamera(t){let e=t.cameras,n=this._frustums;for(let s=0;s<e.length;s++){let r=e[s];Ch.multiplyMatrices(r.projectionMatrix,r.matrixWorldInverse),n[s]===void 0&&(n[s]=new Ci),n[s].setFromProjectionMatrix(Ch,r.coordinateSystem,r.reversedDepth)}return this._count=e.length,this}getFrustum(t){return this._frustums[t]}intersectsObject(t){let e=this._frustums;for(let n=0;n<this._count;n++)if(e[n].intersectsObject(t))return!0;return!1}intersectsSprite(t){let e=this._frustums;for(let n=0;n<this._count;n++)if(e[n].intersectsSprite(t))return!0;return!1}intersectsSphere(t){let e=this._frustums;for(let n=0;n<this._count;n++)if(e[n].intersectsSphere(t))return!0;return!1}intersectsBox(t){let e=this._frustums;for(let n=0;n<this._count;n++)if(e[n].intersectsBox(t))return!0;return!1}containsPoint(t){let e=this._frustums;for(let n=0;n<this._count;n++)if(e[n].containsPoint(t))return!0;return!1}copy(t){this.coordinateSystem=t.coordinateSystem;let e=this._frustums,n=t._frustums;for(let s=0;s<t._count;s++)e[s]===void 0&&(e[s]=new Ci),e[s].copy(n[s]);return this._count=t._count,this}clone(){return new i().copy(this)}};var Pi=class extends Zn{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new re(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}},ja=new N,Qa=new N,Ph=new xe,ar=new Ri,Aa=new fi,Hl=new N,Ih=new N,to=class extends He{constructor(t=new Je,e=new Pi){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0?this.morphTargetInfluences=t.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,t.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){let t=this.geometry;if(t.index===null){let e=t.attributes.position,n=[0];for(let s=1,r=e.count;s<r;s++)ja.fromBufferAttribute(e,s-1),Qa.fromBufferAttribute(e,s),n[s]=n[s-1],n[s]+=ja.distanceTo(Qa);t.setAttribute("lineDistance",new ye(n,1))}else Zt("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){let n=this.geometry,s=this.matrixWorld,r=t.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Aa.copy(n.boundingSphere),Aa.applyMatrix4(s),Aa.radius+=r,t.ray.intersectsSphere(Aa)===!1)return;Ph.copy(s).invert(),ar.copy(t.ray).applyMatrix4(Ph);let o=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=this.isLineSegments?2:1,h=n.index,d=n.attributes.position;if(h!==null){let p=Math.max(0,a.start),g=Math.min(h.count,a.start+a.count);for(let _=p,u=g-1;_<u;_+=l){let m=h.getX(_),S=h.getX(_+1),E=Ra(this,t,ar,c,m,S,_);E&&e.push(E)}if(this.isLineLoop){let _=h.getX(g-1),u=h.getX(p),m=Ra(this,t,ar,c,_,u,g-1);m&&e.push(m)}}else{let p=Math.max(0,a.start),g=Math.min(d.count,a.start+a.count);for(let _=p,u=g-1;_<u;_+=l){let m=Ra(this,t,ar,c,_,_+1,_);m&&e.push(m)}if(this.isLineLoop){let _=Ra(this,t,ar,c,g-1,p,g-1);_&&e.push(_)}}}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}};function Ra(i,t,e,n,s,r,a){let o=i.geometry.attributes.position;if(ja.fromBufferAttribute(o,s),Qa.fromBufferAttribute(o,r),e.distanceSqToSegment(ja,Qa,Hl,Ih)>n)return;Hl.applyMatrix4(i.matrixWorld);let l=t.ray.origin.distanceTo(Hl);if(!(l<t.near||l>t.far))return{distance:l,point:Ih.clone().applyMatrix4(i.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:i}}var Lh=new N,Dh=new N,Yi=class extends to{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let t=this.geometry;if(t.index===null){let e=t.attributes.position,n=[];for(let s=0,r=e.count;s<r;s+=2)Lh.fromBufferAttribute(e,s),Dh.fromBufferAttribute(e,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+Lh.distanceTo(Dh);t.setAttribute("lineDistance",new ye(n,1))}else Zt("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}};var Sr=class extends ln{constructor(t=[],e=es,n,s,r,a,o,c,l,h){super(t,e,n,s,r,a,o,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}},br=class extends ln{constructor(t,e,n,s,r,a,o,c,l){super(t,e,n,s,r,a,o,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}};var pi=class extends ln{constructor(t,e,n=On,s,r,a,o=$e,c=$e,l,h=di,f=1){if(h!==di&&h!==_i)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let d={width:t,height:e,depth:f};super(d,s,r,a,o,c,h,n,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new Ls(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){let e=super.toJSON(t);return e.compareFunction=this.compareFunction,e}},Er=class extends pi{constructor(t,e=On,n=es,s,r,a=$e,o=$e,c,l=di){let h={width:t,height:t,depth:1},f=[h,h,h,h,h,h];super(t,t,e,n,s,r,a,o,c,l),this.image=f,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(t){this.image=t}},Tr=class extends ln{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}},Kt=class i extends Je{constructor(t=1,e=1,n=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:s,heightSegments:r,depthSegments:a};let o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);let c=[],l=[],h=[],f=[],d=0,p=0;g("z","y","x",-1,-1,n,e,t,a,r,0),g("z","y","x",1,-1,n,e,-t,a,r,1),g("x","z","y",1,1,t,n,e,s,a,2),g("x","z","y",1,-1,t,n,-e,s,a,3),g("x","y","z",1,-1,t,e,n,s,r,4),g("x","y","z",-1,-1,t,e,-n,s,r,5),this.setIndex(c),this.setAttribute("position",new ye(l,3)),this.setAttribute("normal",new ye(h,3)),this.setAttribute("uv",new ye(f,2));function g(_,u,m,S,E,M,A,T,x,b,O){let P=M/x,F=A/b,G=M/2,X=A/2,C=T/2,Y=x+1,j=b+1,q=0,ut=0,K=new N;for(let rt=0;rt<j;rt++){let lt=rt*F-X;for(let Ft=0;Ft<Y;Ft++){let It=Ft*P-G;K[_]=It*S,K[u]=lt*E,K[m]=C,l.push(K.x,K.y,K.z),K[_]=0,K[u]=0,K[m]=T>0?1:-1,h.push(K.x,K.y,K.z),f.push(Ft/x),f.push(1-rt/b),q+=1}}for(let rt=0;rt<b;rt++)for(let lt=0;lt<x;lt++){let Ft=d+lt+Y*rt,It=d+lt+Y*(rt+1),$=d+(lt+1)+Y*(rt+1),bt=d+(lt+1)+Y*rt;c.push(Ft,It,bt),c.push(It,$,bt),ut+=6}o.addGroup(p,ut,O),p+=ut,d+=q}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}};var wr=class i extends Je{constructor(t=1,e=32,n=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:n,thetaLength:s},e=Math.max(3,e);let r=[],a=[],o=[],c=[],l=new N,h=new yt;a.push(0,0,0),o.push(0,0,1),c.push(.5,.5);for(let f=0,d=3;f<=e;f++,d+=3){let p=n+f/e*s;l.x=t*Math.cos(p),l.y=t*Math.sin(p),a.push(l.x,l.y,l.z),o.push(0,0,1),h.x=(a[d]/t+1)/2,h.y=(a[d+1]/t+1)/2,c.push(h.x,h.y)}for(let f=1;f<=e;f++)r.push(f,f+1,0);this.setIndex(r),this.setAttribute("position",new ye(a,3)),this.setAttribute("normal",new ye(o,3)),this.setAttribute("uv",new ye(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radius,t.segments,t.thetaStart,t.thetaLength)}},Ge=class i extends Je{constructor(t=1,e=1,n=1,s=32,r=1,a=!1,o=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:s,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:c};let l=this;s=Math.floor(s),r=Math.floor(r);let h=[],f=[],d=[],p=[],g=0,_=[],u=n/2,m=0;S(),a===!1&&(t>0&&E(!0),e>0&&E(!1)),this.setIndex(h),this.setAttribute("position",new ye(f,3)),this.setAttribute("normal",new ye(d,3)),this.setAttribute("uv",new ye(p,2));function S(){let M=new N,A=new N,T=0,x=(e-t)/n;for(let b=0;b<=r;b++){let O=[],P=b/r,F=P*(e-t)+t;for(let G=0;G<=s;G++){let X=G/s,C=X*c+o,Y=Math.sin(C),j=Math.cos(C);A.x=F*Y,A.y=-P*n+u,A.z=F*j,f.push(A.x,A.y,A.z),M.set(Y,x,j).normalize(),d.push(M.x,M.y,M.z),p.push(X,1-P),O.push(g++)}_.push(O)}for(let b=0;b<s;b++)for(let O=0;O<r;O++){let P=_[O][b],F=_[O+1][b],G=_[O+1][b+1],X=_[O][b+1];(t>0||O!==0)&&(h.push(P,F,X),T+=3),(e>0||O!==r-1)&&(h.push(F,G,X),T+=3)}l.addGroup(m,T,0),m+=T}function E(M){let A=g,T=new yt,x=new N,b=0,O=M===!0?t:e,P=M===!0?1:-1;for(let G=1;G<=s;G++)f.push(0,u*P,0),d.push(0,P,0),p.push(.5,.5),g++;let F=g;for(let G=0;G<=s;G++){let C=G/s*c+o,Y=Math.cos(C),j=Math.sin(C);x.x=O*j,x.y=u*P,x.z=O*Y,f.push(x.x,x.y,x.z),d.push(0,P,0),T.x=Y*.5+.5,T.y=j*.5*P+.5,p.push(T.x,T.y),g++}for(let G=0;G<s;G++){let X=A+G,C=F+G;M===!0?h.push(C,C+1,X):h.push(C+1,C,X),b+=3}l.addGroup(m,b,M===!0?1:2),m+=b}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}};var Ca=new N,Pa=new N,Gl=new N,Ia=new hi,Zi=class extends Je{constructor(t=null,e=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:t,thresholdAngle:e},t!==null){let s=Math.pow(10,4),r=Math.cos(Ts*e),a=t.getIndex(),o=t.getAttribute("position"),c=a?a.count:o.count,l=[0,0,0],h=["a","b","c"],f=new Array(3),d=new Map,p=[];for(let g=0;g<c;g+=3){a?(l[0]=a.getX(g),l[1]=a.getX(g+1),l[2]=a.getX(g+2)):(l[0]=g,l[1]=g+1,l[2]=g+2);let{a:_,b:u,c:m}=Ia;if(_.fromBufferAttribute(o,l[0]),u.fromBufferAttribute(o,l[1]),m.fromBufferAttribute(o,l[2]),Ia.getNormal(Gl),f[0]=`${Math.round(_.x*s)},${Math.round(_.y*s)},${Math.round(_.z*s)}`,f[1]=`${Math.round(u.x*s)},${Math.round(u.y*s)},${Math.round(u.z*s)}`,f[2]=`${Math.round(m.x*s)},${Math.round(m.y*s)},${Math.round(m.z*s)}`,!(f[0]===f[1]||f[1]===f[2]||f[2]===f[0]))for(let S=0;S<3;S++){let E=(S+1)%3,M=f[S],A=f[E],T=Ia[h[S]],x=Ia[h[E]],b=`${M}_${A}`,O=`${A}_${M}`,P=d.get(O);P?(Gl.dot(P.normal)<=r&&(p.push(T.x,T.y,T.z),p.push(x.x,x.y,x.z)),d.set(O,null)):d.has(b)||d.set(b,{index0:l[S],index1:l[E],normal:Gl.clone()})}}for(let g of d.values())if(g){let{index0:_,index1:u}=g;Ca.fromBufferAttribute(o,_),Pa.fromBufferAttribute(o,u),p.push(Ca.x,Ca.y,Ca.z),p.push(Pa.x,Pa.y,Pa.z)}this.setAttribute("position",new ye(p,3))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}},Sn=class{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){Zt("Curve: .getPoint() not implemented.")}getPointAt(t,e){let n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){let e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){let e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){let t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let e=[],n,s=this.getPoint(0),r=0;e.push(0);for(let a=1;a<=t;a++)n=this.getPoint(a/t),r+=n.distanceTo(s),e.push(r),s=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e=null){let n=this.getLengths(),s=0,r=n.length,a;e?a=e:a=t*n[r-1];let o=0,c=r-1,l;for(;o<=c;)if(s=Math.floor(o+(c-o)/2),l=n[s]-a,l<0)o=s+1;else if(l>0)c=s-1;else{c=s;break}if(s=c,n[s]===a)return s/(r-1);let h=n[s],d=n[s+1]-h,p=(a-h)/d;return(s+p)/(r-1)}getTangent(t,e){let s=t-1e-4,r=t+1e-4;s<0&&(s=0),r>1&&(r=1);let a=this.getPoint(s),o=this.getPoint(r),c=e||(a.isVector2?new yt:new N);return c.copy(o).sub(a).normalize(),c}getTangentAt(t,e){let n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e=!1){let n=new N,s=[],r=[],a=[],o=new N,c=new xe;for(let p=0;p<=t;p++){let g=p/t;s[p]=this.getTangentAt(g,new N)}r[0]=new N,a[0]=new N;let l=Number.MAX_VALUE,h=Math.abs(s[0].x),f=Math.abs(s[0].y),d=Math.abs(s[0].z);h<=l&&(l=h,n.set(1,0,0)),f<=l&&(l=f,n.set(0,1,0)),d<=l&&n.set(0,0,1),o.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],o),a[0].crossVectors(s[0],r[0]);for(let p=1;p<=t;p++){if(r[p]=r[p-1].clone(),a[p]=a[p-1].clone(),o.crossVectors(s[p-1],s[p]),o.length()>Number.EPSILON){o.normalize();let g=Math.acos(le(s[p-1].dot(s[p]),-1,1));r[p].applyMatrix4(c.makeRotationAxis(o,g))}a[p].crossVectors(s[p],r[p])}if(e===!0){let p=Math.acos(le(r[0].dot(r[t]),-1,1));p/=t,s[0].dot(o.crossVectors(r[0],r[t]))>0&&(p=-p);for(let g=1;g<=t;g++)r[g].applyMatrix4(c.makeRotationAxis(s[g],p*g)),a[g].crossVectors(s[g],r[g])}return{tangents:s,normals:r,binormals:a}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this.cacheArcLengths=null,this}toJSON(){let t={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this.cacheArcLengths=null,this}},Us=class extends Sn{constructor(t=0,e=0,n=1,s=1,r=0,a=Math.PI*2,o=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=a,this.aClockwise=o,this.aRotation=c}getPoint(t,e=new yt){let n=e,s=Math.PI*2,r=this.aEndAngle-this.aStartAngle,a=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(a?r=0:r=s),this.aClockwise===!0&&!a&&(r===s?r=-s:r=r-s);let o=this.aStartAngle+t*r,c=this.aX+this.xRadius*Math.cos(o),l=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){let h=Math.cos(this.aRotation),f=Math.sin(this.aRotation),d=c-this.aX,p=l-this.aY;c=d*h-p*f+this.aX,l=d*f+p*h+this.aY}return n.set(c,l)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){let t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}},eo=class extends Us{constructor(t,e,n,s,r,a){super(t,e,n,n,s,r,a),this.isArcCurve=!0,this.type="ArcCurve"}};function Lc(){let i=0,t=0,e=0,n=0;function s(r,a,o,c){i=r,t=o,e=-3*r+3*a-2*o-c,n=2*r-2*a+o+c}return{initCatmullRom:function(r,a,o,c,l){s(a,o,l*(o-r),l*(c-a))},initNonuniformCatmullRom:function(r,a,o,c,l,h,f){let d=(a-r)/l-(o-r)/(l+h)+(o-a)/h,p=(o-a)/h-(c-a)/(h+f)+(c-o)/f;d*=h,p*=h,s(a,o,d,p)},calc:function(r){let a=r*r,o=a*r;return i+t*r+e*a+n*o}}}var Nh=new N,Uh=new N,kl=new Lc,Vl=new Lc,Wl=new Lc,Fs=class extends Sn{constructor(t=[],e=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=s}getPoint(t,e=new N){let n=e,s=this.points,r=s.length,a=(r-(this.closed?0:1))*t,o=Math.floor(a),c=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/r)+1)*r:c===0&&o===r-1&&(o=r-2,c=1);let l,h;this.closed||o>0?l=s[(o-1)%r]:(Uh.subVectors(s[0],s[1]).add(s[0]),l=Uh);let f=s[o%r],d=s[(o+1)%r];if(this.closed||o+2<r?h=s[(o+2)%r]:(Nh.subVectors(s[r-1],s[r-2]).add(s[r-1]),h=Nh),this.curveType==="centripetal"||this.curveType==="chordal"){let p=this.curveType==="chordal"?.5:.25,g=Math.pow(l.distanceToSquared(f),p),_=Math.pow(f.distanceToSquared(d),p),u=Math.pow(d.distanceToSquared(h),p);_<1e-4&&(_=1),g<1e-4&&(g=_),u<1e-4&&(u=_),kl.initNonuniformCatmullRom(l.x,f.x,d.x,h.x,g,_,u),Vl.initNonuniformCatmullRom(l.y,f.y,d.y,h.y,g,_,u),Wl.initNonuniformCatmullRom(l.z,f.z,d.z,h.z,g,_,u)}else this.curveType==="catmullrom"&&(kl.initCatmullRom(l.x,f.x,d.x,h.x,this.tension),Vl.initCatmullRom(l.y,f.y,d.y,h.y,this.tension),Wl.initCatmullRom(l.z,f.z,d.z,h.z,this.tension));return n.set(kl.calc(c),Vl.calc(c),Wl.calc(c)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let s=t.points[e];this.points.push(s.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){let s=this.points[e];t.points.push(s.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let s=t.points[e];this.points.push(new N().fromArray(s))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}};function Fh(i,t,e,n,s){let r=(n-t)*.5,a=(s-e)*.5,o=i*i,c=i*o;return(2*e-2*n+r+a)*c+(-3*e+3*n-2*r-a)*o+r*i+e}function Df(i,t){let e=1-i;return e*e*t}function Nf(i,t){return 2*(1-i)*i*t}function Uf(i,t){return i*i*t}function hr(i,t,e,n){return Df(i,t)+Nf(i,e)+Uf(i,n)}function Ff(i,t){let e=1-i;return e*e*e*t}function Of(i,t){let e=1-i;return 3*e*e*i*t}function Bf(i,t){return 3*(1-i)*i*i*t}function zf(i,t){return i*i*i*t}function ur(i,t,e,n,s){return Ff(i,t)+Of(i,e)+Bf(i,n)+zf(i,s)}var Ar=class extends Sn{constructor(t=new yt,e=new yt,n=new yt,s=new yt){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new yt){let n=e,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(ur(t,s.x,r.x,a.x,o.x),ur(t,s.y,r.y,a.y,o.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},no=class extends Sn{constructor(t=new N,e=new N,n=new N,s=new N){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new N){let n=e,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(ur(t,s.x,r.x,a.x,o.x),ur(t,s.y,r.y,a.y,o.y),ur(t,s.z,r.z,a.z,o.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},Rr=class extends Sn{constructor(t=new yt,e=new yt){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new yt){let n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new yt){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},io=class extends Sn{constructor(t=new N,e=new N){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new N){let n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new N){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Cr=class extends Sn{constructor(t=new yt,e=new yt,n=new yt){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new yt){let n=e,s=this.v0,r=this.v1,a=this.v2;return n.set(hr(t,s.x,r.x,a.x),hr(t,s.y,r.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Pr=class extends Sn{constructor(t=new N,e=new N,n=new N){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new N){let n=e,s=this.v0,r=this.v1,a=this.v2;return n.set(hr(t,s.x,r.x,a.x),hr(t,s.y,r.y,a.y),hr(t,s.z,r.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Ir=class extends Sn{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new yt){let n=e,s=this.points,r=(s.length-1)*t,a=Math.floor(r),o=r-a,c=s[a===0?a:a-1],l=s[a],h=s[a>s.length-2?s.length-1:a+1],f=s[a>s.length-3?s.length-1:a+2];return n.set(Fh(o,c.x,l.x,h.x,f.x),Fh(o,c.y,l.y,h.y,f.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let s=t.points[e];this.points.push(s.clone())}return this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){let s=this.points[e];t.points.push(s.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let s=t.points[e];this.points.push(new yt().fromArray(s))}return this}},so=Object.freeze({__proto__:null,ArcCurve:eo,CatmullRomCurve3:Fs,CubicBezierCurve:Ar,CubicBezierCurve3:no,EllipseCurve:Us,LineCurve:Rr,LineCurve3:io,QuadraticBezierCurve:Cr,QuadraticBezierCurve3:Pr,SplineCurve:Ir}),ro=class extends Sn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1,this.cacheLengths=null}add(t){this.curves.push(t)}closePath(){let t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){let n=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new so[n](e,t))}return this}getPoint(t,e){let n=t*this.getLength(),s=this.getCurveLengths(),r=0;for(;r<s.length;){if(s[r]>=n){let a=s[r]-n,o=this.curves[r],c=o.getLength(),l=c===0?0:1-a/c;return o.getPointAt(l,e)}r++}return null}getLength(){let t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let t=[],e=0;for(let n=0,s=this.curves.length;n<s;n++)e+=this.curves[n].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){let e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){let e=[],n;for(let s=0,r=this.curves;s<r.length;s++){let a=r[s],o=a.isEllipseCurve?t*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?t*a.points.length:t,c=a.getPoints(o);for(let l=0;l<c.length;l++){let h=c[l];n&&n.equals(h)||(e.push(h),n=h)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){let s=t.curves[e];this.curves.push(s.clone())}return this.autoClose=t.autoClose,this.cacheLengths=null,this}toJSON(){let t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,n=this.curves.length;e<n;e++){let s=this.curves[e];t.curves.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){let s=t.curves[e];this.curves.push(new so[s.type]().fromJSON(s))}return this.cacheLengths=null,this}},$i=class extends ro{constructor(t){super(),this.type="Path",this.currentPoint=new yt,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,n=t.length;e<n;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){let n=new Rr(this.currentPoint.clone(),new yt(t,e));return this.curves.push(n),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,n,s){let r=new Cr(this.currentPoint.clone(),new yt(t,e),new yt(n,s));return this.curves.push(r),this.currentPoint.set(n,s),this}bezierCurveTo(t,e,n,s,r,a){let o=new Ar(this.currentPoint.clone(),new yt(t,e),new yt(n,s),new yt(r,a));return this.curves.push(o),this.currentPoint.set(r,a),this}splineThru(t){let e=[this.currentPoint.clone()].concat(t),n=new Ir(e);return this.curves.push(n),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,n,s,r,a){let o=this.currentPoint.x,c=this.currentPoint.y;return this.absarc(t+o,e+c,n,s,r,a),this}absarc(t,e,n,s,r,a){return this.absellipse(t,e,n,n,s,r,a),this}ellipse(t,e,n,s,r,a,o,c){let l=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(t+l,e+h,n,s,r,a,o,c),this}absellipse(t,e,n,s,r,a,o,c){let l=new Us(t,e,n,s,r,a,o,c);if(this.curves.length>0){let f=l.getPoint(0);f.equals(this.currentPoint)||this.lineTo(f.x,f.y)}this.curves.push(l);let h=l.getPoint(1);return this.currentPoint.copy(h),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){let t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}},Os=class extends $i{constructor(t){super(t),this.uuid=is(),this.type="Shape",this.holes=[]}getPointsHoles(t){let e=[];for(let n=0,s=this.holes.length;n<s;n++)e[n]=this.holes[n].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){let s=t.holes[e];this.holes.push(s.clone())}return this}toJSON(){let t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,n=this.holes.length;e<n;e++){let s=this.holes[e];t.holes.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){let s=t.holes[e];this.holes.push(new $i().fromJSON(s))}return this}};function Hf(i,t,e=2){let n=t&&t.length,s=n?t[0]*e:i.length,r=Uu(i,0,s,e,!0),a=[];if(!r||r.next===r.prev)return a;let o,c,l;if(n&&(r=Xf(i,t,r,e)),i.length>80*e){o=i[0],c=i[1];let h=o,f=c;for(let d=e;d<s;d+=e){let p=i[d],g=i[d+1];p<o&&(o=p),g<c&&(c=g),p>h&&(h=p),g>f&&(f=g)}l=Math.max(h-o,f-c),l=l!==0?32767/l:0}return Lr(r,a,e,o,c,l,0),a}function Uu(i,t,e,n,s){let r;if(s===np(i,t,e,n)>0)for(let a=t;a<e;a+=n)r=Oh(a/n|0,i[a],i[a+1],r);else for(let a=e-n;a>=t;a-=n)r=Oh(a/n|0,i[a],i[a+1],r);return r&&Bs(r,r.next)&&(Nr(r),r=r.next),r}function Ji(i,t){if(!i)return i;t||(t=i);let e=i,n;do if(n=!1,!e.steiner&&(Bs(e,e.next)||Ne(e.prev,e,e.next)===0)){if(Nr(e),e=t=e.prev,e===e.next)break;n=!0}else e=e.next;while(n||e!==t);return t}function Lr(i,t,e,n,s,r,a){if(!i)return;!a&&r&&Jf(i,n,s,r);let o=i;for(;i.prev!==i.next;){let c=i.prev,l=i.next;if(r?kf(i,n,s,r):Gf(i)){t.push(c.i,i.i,l.i),Nr(i),i=l.next,o=l.next;continue}if(i=l,i===o){a?a===1?(i=Vf(Ji(i),t),Lr(i,t,e,n,s,r,2)):a===2&&Wf(i,t,e,n,s,r):Lr(Ji(i),t,e,n,s,r,1);break}}}function Gf(i){let t=i.prev,e=i,n=i.next;if(Ne(t,e,n)>=0)return!1;let s=t.x,r=e.x,a=n.x,o=t.y,c=e.y,l=n.y,h=Math.min(s,r,a),f=Math.min(o,c,l),d=Math.max(s,r,a),p=Math.max(o,c,l),g=n.next;for(;g!==t;){if(g.x>=h&&g.x<=d&&g.y>=f&&g.y<=p&&or(s,o,r,c,a,l,g.x,g.y)&&Ne(g.prev,g,g.next)>=0)return!1;g=g.next}return!0}function kf(i,t,e,n){let s=i.prev,r=i,a=i.next;if(Ne(s,r,a)>=0)return!1;let o=s.x,c=r.x,l=a.x,h=s.y,f=r.y,d=a.y,p=Math.min(o,c,l),g=Math.min(h,f,d),_=Math.max(o,c,l),u=Math.max(h,f,d),m=Jl(p,g,t,e,n),S=Jl(_,u,t,e,n),E=i.prevZ,M=i.nextZ;for(;E&&E.z>=m&&M&&M.z<=S;){if(E.x>=p&&E.x<=_&&E.y>=g&&E.y<=u&&E!==s&&E!==a&&or(o,h,c,f,l,d,E.x,E.y)&&Ne(E.prev,E,E.next)>=0||(E=E.prevZ,M.x>=p&&M.x<=_&&M.y>=g&&M.y<=u&&M!==s&&M!==a&&or(o,h,c,f,l,d,M.x,M.y)&&Ne(M.prev,M,M.next)>=0))return!1;M=M.nextZ}for(;E&&E.z>=m;){if(E.x>=p&&E.x<=_&&E.y>=g&&E.y<=u&&E!==s&&E!==a&&or(o,h,c,f,l,d,E.x,E.y)&&Ne(E.prev,E,E.next)>=0)return!1;E=E.prevZ}for(;M&&M.z<=S;){if(M.x>=p&&M.x<=_&&M.y>=g&&M.y<=u&&M!==s&&M!==a&&or(o,h,c,f,l,d,M.x,M.y)&&Ne(M.prev,M,M.next)>=0)return!1;M=M.nextZ}return!0}function Vf(i,t){let e=i;do{let n=e.prev,s=e.next.next;!Bs(n,s)&&Ou(n,e,e.next,s)&&Dr(n,s)&&Dr(s,n)&&(t.push(n.i,e.i,s.i),Nr(e),Nr(e.next),e=i=s),e=e.next}while(e!==i);return Ji(e)}function Wf(i,t,e,n,s,r){let a=i;do{let o=a.next.next;for(;o!==a.prev;){if(a.i!==o.i&&Qf(a,o)){let c=Bu(a,o);a=Ji(a,a.next),c=Ji(c,c.next),Lr(a,t,e,n,s,r,0),Lr(c,t,e,n,s,r,0);return}o=o.next}a=a.next}while(a!==i)}function Xf(i,t,e,n){let s=[];for(let r=0,a=t.length;r<a;r++){let o=t[r]*n,c=r<a-1?t[r+1]*n:i.length,l=Uu(i,o,c,n,!1);l===l.next&&(l.steiner=!0),s.push(jf(l))}s.sort(qf);for(let r=0;r<s.length;r++)e=Yf(s[r],e);return e}function qf(i,t){let e=i.x-t.x;if(e===0&&(e=i.y-t.y,e===0)){let n=(i.next.y-i.y)/(i.next.x-i.x),s=(t.next.y-t.y)/(t.next.x-t.x);e=n-s}return e}function Yf(i,t){let e=Zf(i,t);if(!e)return t;let n=Bu(e,i);return Ji(n,n.next),Ji(e,e.next)}function Zf(i,t){let e=t,n=i.x,s=i.y,r=-1/0,a;if(Bs(i,e))return e;do{if(Bs(i,e.next))return e.next;if(s<=e.y&&s>=e.next.y&&e.next.y!==e.y){let f=e.x+(s-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(f<=n&&f>r&&(r=f,a=e.x<e.next.x?e:e.next,f===n))return a}e=e.next}while(e!==t);if(!a)return null;let o=a,c=a.x,l=a.y,h=1/0;e=a;do{if(n>=e.x&&e.x>=c&&n!==e.x&&Fu(s<l?n:r,s,c,l,s<l?r:n,s,e.x,e.y)){let f=Math.abs(s-e.y)/(n-e.x);Dr(e,i)&&(f<h||f===h&&(e.x>a.x||e.x===a.x&&$f(a,e)))&&(a=e,h=f)}e=e.next}while(e!==o);return a}function $f(i,t){return Ne(i.prev,i,t.prev)<0&&Ne(t.next,i,i.next)<0}function Jf(i,t,e,n){let s=i;do s.z===0&&(s.z=Jl(s.x,s.y,t,e,n)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==i);s.prevZ.nextZ=null,s.prevZ=null,Kf(s)}function Kf(i){let t,e=1;do{let n=i,s;i=null;let r=null;for(t=0;n;){t++;let a=n,o=0;for(let l=0;l<e&&(o++,a=a.nextZ,!!a);l++);let c=e;for(;o>0||c>0&&a;)o!==0&&(c===0||!a||n.z<=a.z)?(s=n,n=n.nextZ,o--):(s=a,a=a.nextZ,c--),r?r.nextZ=s:i=s,s.prevZ=r,r=s;n=a}r.nextZ=null,e*=2}while(t>1);return i}function Jl(i,t,e,n,s){return i=(i-e)*s|0,t=(t-n)*s|0,i=(i|i<<8)&16711935,i=(i|i<<4)&252645135,i=(i|i<<2)&858993459,i=(i|i<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,i|t<<1}function jf(i){let t=i,e=i;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==i);return e}function Fu(i,t,e,n,s,r,a,o){return(s-a)*(t-o)>=(i-a)*(r-o)&&(i-a)*(n-o)>=(e-a)*(t-o)&&(e-a)*(r-o)>=(s-a)*(n-o)}function or(i,t,e,n,s,r,a,o){return!(i===a&&t===o)&&Fu(i,t,e,n,s,r,a,o)}function Qf(i,t){return i.next.i!==t.i&&i.prev.i!==t.i&&!tp(i,t)&&(Dr(i,t)&&Dr(t,i)&&ep(i,t)&&(Ne(i.prev,i,t.prev)||Ne(i,t.prev,t))||Bs(i,t)&&Ne(i.prev,i,i.next)>0&&Ne(t.prev,t,t.next)>0)}function Ne(i,t,e){return(t.y-i.y)*(e.x-t.x)-(t.x-i.x)*(e.y-t.y)}function Bs(i,t){return i.x===t.x&&i.y===t.y}function Ou(i,t,e,n){let s=Da(Ne(i,t,e)),r=Da(Ne(i,t,n)),a=Da(Ne(e,n,i)),o=Da(Ne(e,n,t));return!!(s!==r&&a!==o||s===0&&La(i,e,t)||r===0&&La(i,n,t)||a===0&&La(e,i,n)||o===0&&La(e,t,n))}function La(i,t,e){return t.x<=Math.max(i.x,e.x)&&t.x>=Math.min(i.x,e.x)&&t.y<=Math.max(i.y,e.y)&&t.y>=Math.min(i.y,e.y)}function Da(i){return i>0?1:i<0?-1:0}function tp(i,t){let e=i;do{if(e.i!==i.i&&e.next.i!==i.i&&e.i!==t.i&&e.next.i!==t.i&&Ou(e,e.next,i,t))return!0;e=e.next}while(e!==i);return!1}function Dr(i,t){return Ne(i.prev,i,i.next)<0?Ne(i,t,i.next)>=0&&Ne(i,i.prev,t)>=0:Ne(i,t,i.prev)<0||Ne(i,i.next,t)<0}function ep(i,t){let e=i,n=!1,s=(i.x+t.x)/2,r=(i.y+t.y)/2;do e.y>r!=e.next.y>r&&e.next.y!==e.y&&s<(e.next.x-e.x)*(r-e.y)/(e.next.y-e.y)+e.x&&(n=!n),e=e.next;while(e!==i);return n}function Bu(i,t){let e=Kl(i.i,i.x,i.y),n=Kl(t.i,t.x,t.y),s=i.next,r=t.prev;return i.next=t,t.prev=i,e.next=s,s.prev=e,n.next=e,e.prev=n,r.next=n,n.prev=r,n}function Oh(i,t,e,n){let s=Kl(i,t,e);return n?(s.next=n.next,s.prev=n,n.next.prev=s,n.next=s):(s.prev=s,s.next=s),s}function Nr(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function Kl(i,t,e){return{i,x:t,y:e,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function np(i,t,e,n){let s=0;for(let r=t,a=e-n;r<e;r+=n)s+=(i[a]-i[r])*(i[r+1]+i[a+1]),a=r;return s}var jl=class{static triangulate(t,e,n=2){return Hf(t,e,n)}},Wi=class i{static area(t){let e=t.length,n=0;for(let s=e-1,r=0;r<e;s=r++)n+=t[s].x*t[r].y-t[r].x*t[s].y;return n*.5}static isClockWise(t){return i.area(t)<0}static triangulateShape(t,e){let n=[],s=[],r=[];Bh(t),zh(n,t);let a=t.length;e.forEach(Bh);for(let c=0;c<e.length;c++)s.push(a),a+=e[c].length,zh(n,e[c]);let o=jl.triangulate(n,s);for(let c=0;c<o.length;c+=3)r.push(o.slice(c,c+3));return r}};function Bh(i){let t=i.length;t>2&&i[t-1].equals(i[0])&&i.pop()}function zh(i,t){for(let e=0;e<t.length;e++)i.push(t[e].x),i.push(t[e].y)}var Ur=class i extends Je{constructor(t=new Os([new yt(.5,.5),new yt(-.5,.5),new yt(-.5,-.5),new yt(.5,-.5)]),e={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:t,options:e},t=Array.isArray(t)?t:[t];let n=this,s=[],r=[];for(let o=0,c=t.length;o<c;o++){let l=t[o];a(l)}this.setAttribute("position",new ye(s,3)),this.setAttribute("uv",new ye(r,2)),this.computeVertexNormals();function a(o){let c=[],l=e.curveSegments!==void 0?e.curveSegments:12,h=e.steps!==void 0?e.steps:1,f=e.depth!==void 0?e.depth:1,d=e.bevelEnabled!==void 0?e.bevelEnabled:!0,p=e.bevelThickness!==void 0?e.bevelThickness:.2,g=e.bevelSize!==void 0?e.bevelSize:p-.1,_=e.bevelOffset!==void 0?e.bevelOffset:0,u=e.bevelSegments!==void 0?e.bevelSegments:3,m=e.extrudePath,S=e.UVGenerator!==void 0?e.UVGenerator:ip,E,M=!1,A,T,x,b;if(m){E=m.getSpacedPoints(h),M=!0,d=!1;let st=m.isCatmullRomCurve3?m.closed:!1;A=m.computeFrenetFrames(h,st),T=new N,x=new N,b=new N}d||(u=0,p=0,g=0,_=0);let O=o.extractPoints(l),P=O.shape,F=O.holes;if(!Wi.isClockWise(P)){P=P.reverse();for(let st=0,vt=F.length;st<vt;st++){let Mt=F[st];Wi.isClockWise(Mt)&&(F[st]=Mt.reverse())}}function X(st){let Mt=10000000000000001e-36,Nt=st[0];for(let wt=1;wt<=st.length;wt++){let Qt=wt%st.length,zt=st[Qt],ae=zt.x-Nt.x,se=zt.y-Nt.y,ee=ae*ae+se*se,D=Math.max(Math.abs(zt.x),Math.abs(zt.y),Math.abs(Nt.x),Math.abs(Nt.y)),Ce=Mt*D*D;if(ee<=Ce){st.splice(Qt,1),wt--;continue}Nt=zt}}X(P),F.forEach(X);let C=F.length,Y=P;for(let st=0;st<C;st++){let vt=F[st];P=P.concat(vt)}function j(st,vt,Mt){return vt||te("ExtrudeGeometry: vec does not exist"),st.clone().addScaledVector(vt,Mt)}let q=P.length;function ut(st,vt,Mt){let Nt,wt,Qt,zt=st.x-vt.x,ae=st.y-vt.y,se=Mt.x-st.x,ee=Mt.y-st.y,D=zt*zt+ae*ae,Ce=zt*ee-ae*se;if(Math.abs(Ce)>Number.EPSILON){let $t=Math.sqrt(D),ge=Math.sqrt(se*se+ee*ee),St=vt.x-ae/$t,Te=vt.y+zt/$t,kt=Mt.x-ee/ge,Yt=Mt.y+se/ge,w=((kt-St)*ee-(Yt-Te)*se)/(zt*ee-ae*se);Nt=St+zt*w-st.x,wt=Te+ae*w-st.y;let y=Nt*Nt+wt*wt;if(y<=2)return new yt(Nt,wt);Qt=Math.sqrt(y/2)}else{let $t=!1;zt>Number.EPSILON?se>Number.EPSILON&&($t=!0):zt<-Number.EPSILON?se<-Number.EPSILON&&($t=!0):Math.sign(ae)===Math.sign(ee)&&($t=!0),$t?(Nt=-ae,wt=zt,Qt=Math.sqrt(D)):(Nt=zt,wt=ae,Qt=Math.sqrt(D/2))}return new yt(Nt/Qt,wt/Qt)}let K=[];for(let st=0,vt=Y.length,Mt=vt-1,Nt=st+1;st<vt;st++,Mt++,Nt++)Mt===vt&&(Mt=0),Nt===vt&&(Nt=0),K[st]=ut(Y[st],Y[Mt],Y[Nt]);let rt=[],lt,Ft=K.concat();for(let st=0,vt=C;st<vt;st++){let Mt=F[st];lt=[];for(let Nt=0,wt=Mt.length,Qt=wt-1,zt=Nt+1;Nt<wt;Nt++,Qt++,zt++)Qt===wt&&(Qt=0),zt===wt&&(zt=0),lt[Nt]=ut(Mt[Nt],Mt[Qt],Mt[zt]);rt.push(lt),Ft=Ft.concat(lt)}let It;if(u===0)It=Wi.triangulateShape(Y,F);else{let st=[],vt=[];for(let Mt=0;Mt<u;Mt++){let Nt=Mt/u,wt=p*Math.cos(Nt*Math.PI/2),Qt=g*Math.sin(Nt*Math.PI/2)+_;for(let zt=0,ae=Y.length;zt<ae;zt++){let se=j(Y[zt],K[zt],Qt);Xt(se.x,se.y,-wt),Nt===0&&st.push(se)}for(let zt=0,ae=C;zt<ae;zt++){let se=F[zt];lt=rt[zt];let ee=[];for(let D=0,Ce=se.length;D<Ce;D++){let $t=j(se[D],lt[D],Qt);Xt($t.x,$t.y,-wt),Nt===0&&ee.push($t)}Nt===0&&vt.push(ee)}}It=Wi.triangulateShape(st,vt)}let $=It.length,bt=g+_;for(let st=0;st<q;st++){let vt=d?j(P[st],Ft[st],bt):P[st];M?(x.copy(A.normals[0]).multiplyScalar(vt.x),T.copy(A.binormals[0]).multiplyScalar(vt.y),b.copy(E[0]).add(x).add(T),Xt(b.x,b.y,b.z)):Xt(vt.x,vt.y,0)}for(let st=1;st<=h;st++)for(let vt=0;vt<q;vt++){let Mt=d?j(P[vt],Ft[vt],bt):P[vt];M?(x.copy(A.normals[st]).multiplyScalar(Mt.x),T.copy(A.binormals[st]).multiplyScalar(Mt.y),b.copy(E[st]).add(x).add(T),Xt(b.x,b.y,b.z)):Xt(Mt.x,Mt.y,f/h*st)}for(let st=u-1;st>=0;st--){let vt=st/u,Mt=p*Math.cos(vt*Math.PI/2),Nt=g*Math.sin(vt*Math.PI/2)+_;for(let wt=0,Qt=Y.length;wt<Qt;wt++){let zt=j(Y[wt],K[wt],Nt);Xt(zt.x,zt.y,f+Mt)}for(let wt=0,Qt=F.length;wt<Qt;wt++){let zt=F[wt];lt=rt[wt];for(let ae=0,se=zt.length;ae<se;ae++){let ee=j(zt[ae],lt[ae],Nt);M?Xt(ee.x,ee.y+E[h-1].y,E[h-1].x+Mt):Xt(ee.x,ee.y,f+Mt)}}}Dt(),Ot();function Dt(){let st=s.length/3;if(d){let vt=0,Mt=q*vt;for(let Nt=0;Nt<$;Nt++){let wt=It[Nt];ve(wt[2]+Mt,wt[1]+Mt,wt[0]+Mt)}vt=h+u*2,Mt=q*vt;for(let Nt=0;Nt<$;Nt++){let wt=It[Nt];ve(wt[0]+Mt,wt[1]+Mt,wt[2]+Mt)}}else{for(let vt=0;vt<$;vt++){let Mt=It[vt];ve(Mt[2],Mt[1],Mt[0])}for(let vt=0;vt<$;vt++){let Mt=It[vt];ve(Mt[0]+q*h,Mt[1]+q*h,Mt[2]+q*h)}}n.addGroup(st,s.length/3-st,0)}function Ot(){let st=s.length/3,vt=0;Tt(Y,vt),vt+=Y.length;for(let Mt=0,Nt=F.length;Mt<Nt;Mt++){let wt=F[Mt];Tt(wt,vt),vt+=wt.length}n.addGroup(st,s.length/3-st,1)}function Tt(st,vt){let Mt=st.length;for(;--Mt>=0;){let Nt=Mt,wt=Mt-1;wt<0&&(wt=st.length-1);for(let Qt=0,zt=h+u*2;Qt<zt;Qt++){let ae=q*Qt,se=q*(Qt+1),ee=vt+Nt+ae,D=vt+wt+ae,Ce=vt+wt+se,$t=vt+Nt+se;Gt(ee,D,Ce,$t)}}}function Xt(st,vt,Mt){c.push(st),c.push(vt),c.push(Mt)}function ve(st,vt,Mt){jt(st),jt(vt),jt(Mt);let Nt=s.length/3,wt=S.generateTopUV(n,s,Nt-3,Nt-2,Nt-1);ie(wt[0]),ie(wt[1]),ie(wt[2])}function Gt(st,vt,Mt,Nt){jt(st),jt(vt),jt(Nt),jt(vt),jt(Mt),jt(Nt);let wt=s.length/3,Qt=S.generateSideWallUV(n,s,wt-6,wt-3,wt-2,wt-1);ie(Qt[0]),ie(Qt[1]),ie(Qt[3]),ie(Qt[1]),ie(Qt[2]),ie(Qt[3])}function jt(st){s.push(c[st*3+0]),s.push(c[st*3+1]),s.push(c[st*3+2])}function ie(st){r.push(st.x),r.push(st.y)}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){let t=super.toJSON(),e=this.parameters.shapes,n=this.parameters.options;return sp(e,n,t)}static fromJSON(t,e){let n=[];for(let r=0,a=t.shapes.length;r<a;r++){let o=e[t.shapes[r]];n.push(o)}let s=t.options.extrudePath;return s!==void 0&&(t.options.extrudePath=new so[s.type]().fromJSON(s)),new i(n,t.options)}},ip={generateTopUV:function(i,t,e,n,s){let r=t[e*3],a=t[e*3+1],o=t[n*3],c=t[n*3+1],l=t[s*3],h=t[s*3+1];return[new yt(r,a),new yt(o,c),new yt(l,h)]},generateSideWallUV:function(i,t,e,n,s,r){let a=t[e*3],o=t[e*3+1],c=t[e*3+2],l=t[n*3],h=t[n*3+1],f=t[n*3+2],d=t[s*3],p=t[s*3+1],g=t[s*3+2],_=t[r*3],u=t[r*3+1],m=t[r*3+2];return Math.abs(o-h)<Math.abs(a-l)?[new yt(a,1-c),new yt(l,1-f),new yt(d,1-g),new yt(_,1-m)]:[new yt(o,1-c),new yt(h,1-f),new yt(p,1-g),new yt(u,1-m)]}};function sp(i,t,e){if(e.shapes=[],Array.isArray(i))for(let n=0,s=i.length;n<s;n++){let r=i[n];e.shapes.push(r.uuid)}else e.shapes.push(i.uuid);return e.options=Object.assign({},t),t.extrudePath!==void 0&&(e.options.extrudePath=t.extrudePath.toJSON()),e}var Ki=class i extends Je{constructor(t=1,e=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:s};let r=t/2,a=e/2,o=Math.floor(n),c=Math.floor(s),l=o+1,h=c+1,f=t/o,d=e/c,p=[],g=[],_=[],u=[];for(let m=0;m<h;m++){let S=m*d-a;for(let E=0;E<l;E++){let M=E*f-r;g.push(M,-S,0),_.push(0,0,1),u.push(E/o),u.push(1-m/c)}}for(let m=0;m<c;m++)for(let S=0;S<o;S++){let E=S+l*m,M=S+l*(m+1),A=S+1+l*(m+1),T=S+1+l*m;p.push(E,M,T),p.push(M,A,T)}this.setIndex(p),this.setAttribute("position",new ye(g,3)),this.setAttribute("normal",new ye(_,3)),this.setAttribute("uv",new ye(u,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.width,t.height,t.widthSegments,t.heightSegments)}},Fr=class i extends Je{constructor(t=.5,e=1,n=32,s=1,r=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:n,phiSegments:s,thetaStart:r,thetaLength:a},n=Math.max(3,n),s=Math.max(1,s);let o=[],c=[],l=[],h=[],f=t,d=(e-t)/s,p=new N,g=new yt;for(let _=0;_<=s;_++){for(let u=0;u<=n;u++){let m=r+u/n*a;p.x=f*Math.cos(m),p.y=f*Math.sin(m),c.push(p.x,p.y,p.z),l.push(0,0,1),g.x=(p.x/e+1)/2,g.y=(p.y/e+1)/2,h.push(g.x,g.y)}f+=d}for(let _=0;_<s;_++){let u=_*(n+1);for(let m=0;m<n;m++){let S=m+u,E=S,M=S+n+1,A=S+n+2,T=S+1;o.push(E,M,T),o.push(M,A,T)}}this.setIndex(o),this.setAttribute("position",new ye(c,3)),this.setAttribute("normal",new ye(l,3)),this.setAttribute("uv",new ye(h,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}};var mi=class i extends Je{constructor(t=1,e=32,n=16,s=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:s,phiLength:r,thetaStart:a,thetaLength:o},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));let c=Math.min(a+o,Math.PI),l=0,h=[],f=new N,d=new N,p=[],g=[],_=[],u=[];for(let m=0;m<=n;m++){let S=[],E=m/n,M=a+E*o,A=t*Math.cos(M),T=Math.sqrt(t*t-A*A),x=0;m===0&&a===0?x=.5/e:m===n&&c===Math.PI&&(x=-.5/e);for(let b=0;b<=e;b++){let O=b/e,P=s+O*r;f.x=-T*Math.cos(P),f.y=A,f.z=T*Math.sin(P),g.push(f.x,f.y,f.z),d.copy(f).normalize(),_.push(d.x,d.y,d.z),u.push(O+x,1-E),S.push(l++)}h.push(S)}for(let m=0;m<n;m++)for(let S=0;S<e;S++){let E=h[m][S+1],M=h[m][S],A=h[m+1][S],T=h[m+1][S+1];(m!==0||a>0)&&p.push(E,M,T),(m!==n-1||c<Math.PI)&&p.push(M,A,T)}this.setIndex(p),this.setAttribute("position",new ye(g,3)),this.setAttribute("normal",new ye(_,3)),this.setAttribute("uv",new ye(u,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}};var Or=class i extends Je{constructor(t=new Pr(new N(-1,-1,0),new N(-1,1,0),new N(1,1,0)),e=64,n=1,s=8,r=!1){super(),this.type="TubeGeometry",this.parameters={path:t,tubularSegments:e,radius:n,radialSegments:s,closed:r};let a=t.computeFrenetFrames(e,r);this.tangents=a.tangents,this.normals=a.normals,this.binormals=a.binormals;let o=new N,c=new N,l=new yt,h=new N,f=[],d=[],p=[],g=[];_(),this.setIndex(g),this.setAttribute("position",new ye(f,3)),this.setAttribute("normal",new ye(d,3)),this.setAttribute("uv",new ye(p,2));function _(){for(let E=0;E<e;E++)u(E);u(r===!1?e:0),S(),m()}function u(E){h=t.getPointAt(E/e,h);let M=a.normals[E],A=a.binormals[E];for(let T=0;T<=s;T++){let x=T/s*Math.PI*2,b=Math.sin(x),O=-Math.cos(x);c.x=O*M.x+b*A.x,c.y=O*M.y+b*A.y,c.z=O*M.z+b*A.z,c.normalize(),d.push(c.x,c.y,c.z),o.x=h.x+n*c.x,o.y=h.y+n*c.y,o.z=h.z+n*c.z,f.push(o.x,o.y,o.z)}}function m(){for(let E=1;E<=e;E++)for(let M=1;M<=s;M++){let A=(s+1)*(E-1)+(M-1),T=(s+1)*E+(M-1),x=(s+1)*E+M,b=(s+1)*(E-1)+M;g.push(A,T,b),g.push(T,x,b)}}function S(){for(let E=0;E<=e;E++)for(let M=0;M<=s;M++)l.x=E/e,l.y=M/s,p.push(l.x,l.y)}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){let t=super.toJSON();return t.path=this.parameters.path.toJSON(),t}static fromJSON(t){return new i(new so[t.path.type]().fromJSON(t.path),t.tubularSegments,t.radius,t.radialSegments,t.closed)}};function ss(i){let t={};for(let e in i){t[e]={};for(let n in i[e]){let s=i[e][n];if(Hh(s))s.isRenderTargetTexture?(Zt("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=s.clone();else if(Array.isArray(s))if(Hh(s[0])){let r=[];for(let a=0,o=s.length;a<o;a++)r[a]=s[a].clone();t[e][n]=r}else t[e][n]=s.slice();else t[e][n]=s}}return t}function rn(i){let t={};for(let e=0;e<i.length;e++){let n=ss(i[e]);for(let s in n)t[s]=n[s]}return t}function Hh(i){return i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)}function rp(i){let t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function Dc(i){let t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:de.workingColorSpace}var zu={clone:ss,merge:rn},ap=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,op=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,$n=class extends Zn{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=ap,this.fragmentShader=op,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=ss(t.uniforms),this.uniformsGroups=rp(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this.defaultAttributeValues=Object.assign({},t.defaultAttributeValues),this.index0AttributeName=t.index0AttributeName,this.uniformsNeedUpdate=t.uniformsNeedUpdate,this}toJSON(t){let e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(let s in this.uniforms){let a=this.uniforms[s].value;a&&a.isTexture?e.uniforms[s]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?e.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?e.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?e.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?e.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?e.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?e.uniforms[s]={type:"m4",value:a.toArray()}:e.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;let n={};for(let s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}fromJSON(t,e){if(super.fromJSON(t,e),t.uniforms!==void 0)for(let n in t.uniforms){let s=t.uniforms[n];switch(this.uniforms[n]={},s.type){case"t":this.uniforms[n].value=e[s.value]||null;break;case"c":this.uniforms[n].value=new re().setHex(s.value);break;case"v2":this.uniforms[n].value=new yt().fromArray(s.value);break;case"v3":this.uniforms[n].value=new N().fromArray(s.value);break;case"v4":this.uniforms[n].value=new Ie().fromArray(s.value);break;case"m3":this.uniforms[n].value=new ne().fromArray(s.value);break;case"m4":this.uniforms[n].value=new xe().fromArray(s.value);break;default:this.uniforms[n].value=s.value}}if(t.defines!==void 0&&(this.defines=t.defines),t.vertexShader!==void 0&&(this.vertexShader=t.vertexShader),t.fragmentShader!==void 0&&(this.fragmentShader=t.fragmentShader),t.glslVersion!==void 0&&(this.glslVersion=t.glslVersion),t.extensions!==void 0)for(let n in t.extensions)this.extensions[n]=t.extensions[n];return t.lights!==void 0&&(this.lights=t.lights),t.clipping!==void 0&&(this.clipping=t.clipping),this}},ao=class extends $n{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}},ke=class extends Zn{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new re(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new re(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=na,this.normalScale=new yt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Yn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}};var Br=class extends Zn{constructor(t){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new re(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new re(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=na,this.normalScale=new yt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Yn,this.combine=So,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.envMapIntensity=t.envMapIntensity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}},oo=class extends Zn{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=yu,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}},lo=class extends Zn{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}};function Ss(i,t){return!i||i.constructor===t?i:typeof t.BYTES_PER_ELEMENT=="number"?new t(i):Array.prototype.slice.call(i)}function Na(i){return i!==void 0&&i.inTangents!==void 0&&i.outTangents!==void 0}var Ii=class{constructor(t,e,n,s){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new e.constructor(n),this.sampleValues=e,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(t){let e=this.parameterPositions,n=this._cachedIndex,s=e[n],r=e[n-1];n:{t:{let a;e:{i:if(!(t<s)){for(let o=n+2;;){if(s===void 0){if(t<r)break i;return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(r=s,s=e[++n],t<s)break t}a=e.length;break e}if(!(t>=r)){let o=e[1];t<o&&(n=2,r=o);for(let c=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===c)break;if(s=r,r=e[--n-1],t>=r)break t}a=n,n=0;break e}break n}for(;n<a;){let o=n+a>>>1;t<e[o]?a=o:n=o+1}if(s=e[n],r=e[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,s)}return this.interpolate_(n,r,t,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){let e=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=t*s;for(let a=0;a!==s;++a)e[a]=n[r+a];return e}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}},co=class extends Ii{constructor(t,e,n,s){super(t,e,n,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Yl,endingEnd:Yl}}intervalChanged_(t,e,n){let s=this.parameterPositions,r=t-2,a=t+1,o=s[r],c=s[a];if(o===void 0)switch(this.getSettings_().endingStart){case Zl:r=t,o=2*e-n;break;case $l:r=s.length-2,o=e+s[r]-s[r+1];break;default:r=t,o=n}if(c===void 0)switch(this.getSettings_().endingEnd){case Zl:a=t,c=2*n-e;break;case $l:a=1,c=n+s[1]-s[0];break;default:a=t-1,c=e}let l=(n-e)*.5,h=this.valueSize;this._weightPrev=l/(e-o),this._weightNext=l/(c-n),this._offsetPrev=r*h,this._offsetNext=a*h}interpolate_(t,e,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=t*o,l=c-o,h=this._offsetPrev,f=this._offsetNext,d=this._weightPrev,p=this._weightNext,g=(n-e)/(s-e),_=g*g,u=_*g,m=-d*u+2*d*_-d*g,S=(1+d)*u+(-1.5-2*d)*_+(-.5+d)*g+1,E=(-1-p)*u+(1.5+p)*_+.5*g,M=p*u-p*_;for(let A=0;A!==o;++A)r[A]=m*a[h+A]+S*a[l+A]+E*a[c+A]+M*a[f+A];return r}},ho=class extends Ii{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t,e,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=t*o,l=c-o,h=(n-e)/(s-e),f=1-h;for(let d=0;d!==o;++d)r[d]=a[l+d]*f+a[c+d]*h;return r}},uo=class extends Ii{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t){return this.copySampleValue_(t-1)}},fo=class extends Ii{interpolate_(t,e,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=t*o,l=c-o,h=this.inTangents,f=this.outTangents;if(!h||!f){let g=(n-e)/(s-e),_=1-g;for(let u=0;u!==o;++u)r[u]=a[l+u]*_+a[c+u]*g;return r}let d=o*2,p=t-1;for(let g=0;g!==o;++g){let _=a[l+g],u=a[c+g],m=p*d+g*2,S=f[m],E=f[m+1],M=t*d+g*2,A=h[M],T=h[M+1],x=cp(n,e,S,A,s);r[g]=Hu(x,_,E,T,u)}return r}};function Hu(i,t,e,n,s){let r=1-i;return r*r*r*t+3*r*r*i*e+3*r*i*i*n+i*i*i*s}function lp(i,t,e,n,s){let r=1-i;return 3*r*r*(e-t)+6*r*i*(n-e)+3*i*i*(s-n)}function cp(i,t,e,n,s){let r=(i-t)/(s-t);for(let a=0;a<8;a++){let o=Hu(r,t,e,n,s)-i;if(Math.abs(o)<1e-10)break;let c=lp(r,t,e,n,s);if(Math.abs(c)<1e-10)break;r=Math.max(0,Math.min(1,r-o/c))}return r}var bn=class{constructor(t,e,n,s){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=Ss(e,this.TimeBufferType),this.values=Ss(n,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(t){let e=t.constructor,n;if(e.toJSON!==this.toJSON)n=e.toJSON(t);else{n={name:t.name,times:Ss(t.times,Array),values:Ss(t.values,Array)};let s=t.getInterpolation();s!==t.DefaultInterpolation&&(n.interpolation=s),Na(t.settings)&&(n.settings={inTangents:Ss(t.settings.inTangents,Array),outTangents:Ss(t.settings.outTangents,Array)})}return n.type=t.ValueTypeName,n}InterpolantFactoryMethodDiscrete(t){return new uo(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new ho(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new co(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodBezier(t){let e=new fo(this.times,this.values,this.getValueSize(),t);return this.settings&&(e.inTangents=this.settings.inTangents,e.outTangents=this.settings.outTangents),e}setInterpolation(t){let e;switch(t){case dr:e=this.InterpolantFactoryMethodDiscrete;break;case Ya:e=this.InterpolantFactoryMethodLinear;break;case Oa:e=this.InterpolantFactoryMethodSmooth;break;case ql:e=this.InterpolantFactoryMethodBezier;break}if(e===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return Zt("KeyframeTrack:",n),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return dr;case this.InterpolantFactoryMethodLinear:return Ya;case this.InterpolantFactoryMethodSmooth:return Oa;case this.InterpolantFactoryMethodBezier:return ql}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){let e=this.times;for(let n=0,s=e.length;n!==s;++n)e[n]+=t;Na(this.settings)&&(Gh(this.settings.inTangents,t),Gh(this.settings.outTangents,t))}return this}scale(t){if(t!==1){let e=this.times;for(let n=0,s=e.length;n!==s;++n)e[n]*=t;Na(this.settings)&&(kh(this.settings.inTangents,t),kh(this.settings.outTangents,t))}return this}trim(t,e){let n=this.times,s=n.length,r=0,a=s-1;for(;r!==s&&n[r]<t;)++r;for(;a!==-1&&n[a]>e;)--a;if(++a,r!==0||a!==s){r>=a&&(a=Math.max(a,1),r=a-1);let o=this.getValueSize();this.times=n.slice(r,a),this.values=this.values.slice(r*o,a*o)}return this}validate(){let t=!0,e=this.getValueSize();e-Math.floor(e)!==0&&(te("KeyframeTrack: Invalid value size in track.",this),t=!1);let n=this.times,s=this.values,r=n.length;r===0&&(te("KeyframeTrack: Track is empty.",this),t=!1);let a=null;for(let o=0;o!==r;o++){let c=n[o];if(typeof c=="number"&&isNaN(c)){te("KeyframeTrack: Time is not a valid number.",this,o,c),t=!1;break}if(a!==null&&a>c){te("KeyframeTrack: Out of order keys.",this,o,c,a),t=!1;break}a=c}if(s!==void 0&&Kd(s))for(let o=0,c=s.length;o!==c;++o){let l=s[o];if(isNaN(l)){te("KeyframeTrack: Value is not a valid number.",this,o,l),t=!1;break}}return t}optimize(){let t=this.times.slice(),e=this.values.slice(),n=this.getValueSize(),s=this.getInterpolation()===Oa,r=t.length-1,a=1;for(let o=1;o<r;++o){let c=!1,l=t[o],h=t[o+1];if(l!==h&&(o!==1||l!==t[0]))if(s)c=!0;else{let f=o*n,d=f-n,p=f+n;for(let g=0;g!==n;++g){let _=e[f+g];if(_!==e[d+g]||_!==e[p+g]){c=!0;break}}}if(c){if(o!==a){t[a]=t[o];let f=o*n,d=a*n;for(let p=0;p!==n;++p)e[d+p]=e[f+p]}++a}}if(r>0){t[a]=t[r];for(let o=r*n,c=a*n,l=0;l!==n;++l)e[c+l]=e[o+l];++a}return a!==t.length?(this.times=t.slice(0,a),this.values=e.slice(0,a*n)):(this.times=t,this.values=e),this}clone(){let t=this.times.slice(),e=this.values.slice(),n=this.constructor,s=new n(this.name,t,e);return s.createInterpolant=this.createInterpolant,Na(this.settings)&&(s.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),s}};function Gh(i,t){for(let e=0,n=i.length;e!==n;e+=2)i[e]+=t}function kh(i,t){for(let e=0,n=i.length;e!==n;e+=2)i[e]*=t}bn.prototype.ValueTypeName="";bn.prototype.TimeBufferType=Float32Array;bn.prototype.ValueBufferType=Float32Array;bn.prototype.DefaultInterpolation=Ya;var Li=class extends bn{constructor(t,e,n){super(t,e,n)}};Li.prototype.ValueTypeName="bool";Li.prototype.ValueBufferType=Array;Li.prototype.DefaultInterpolation=dr;Li.prototype.InterpolantFactoryMethodLinear=void 0;Li.prototype.InterpolantFactoryMethodSmooth=void 0;var po=class extends bn{constructor(t,e,n,s){super(t,e,n,s)}};po.prototype.ValueTypeName="color";var mo=class extends bn{constructor(t,e,n,s){super(t,e,n,s)}};mo.prototype.ValueTypeName="number";var go=class extends Ii{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t,e,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=(n-e)/(s-e),l=t*o;for(let h=l+o;l!==h;l+=4)vn.slerpFlat(r,0,a,l-o,a,l,c);return r}},zr=class extends bn{constructor(t,e,n,s){super(t,e,n,s)}InterpolantFactoryMethodLinear(t){return new go(this.times,this.values,this.getValueSize(),t)}};zr.prototype.ValueTypeName="quaternion";zr.prototype.InterpolantFactoryMethodSmooth=void 0;var Di=class extends bn{constructor(t,e,n){super(t,e,n)}};Di.prototype.ValueTypeName="string";Di.prototype.ValueBufferType=Array;Di.prototype.DefaultInterpolation=dr;Di.prototype.InterpolantFactoryMethodLinear=void 0;Di.prototype.InterpolantFactoryMethodSmooth=void 0;var _o=class extends bn{constructor(t,e,n,s){super(t,e,n,s)}};_o.prototype.ValueTypeName="vector";var xo=class{constructor(t,e,n){let s=this,r=!1,a=0,o=0,c,l=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=n,this._abortController=null,this.itemStart=function(h){o++,r===!1&&s.onStart!==void 0&&s.onStart(h,a,o),r=!0},this.itemEnd=function(h){a++,s.onProgress!==void 0&&s.onProgress(h,a,o),a===o&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(h){s.onError!==void 0&&s.onError(h)},this.resolveURL=function(h){return h=h.normalize("NFC"),c?c(h):h},this.setURLModifier=function(h){return c=h,this},this.addHandler=function(h,f){return l.push(h,f),this},this.removeHandler=function(h){let f=l.indexOf(h);return f!==-1&&l.splice(f,2),this},this.getHandler=function(h){for(let f=0,d=l.length;f<d;f+=2){let p=l[f],g=l[f+1];if(p.global&&(p.lastIndex=0),p.test(h))return g}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},Gu=new xo,yo=class{constructor(t){this.manager=t!==void 0?t:Gu,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},this.priority="auto",this.cache="default",typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(t,e){let n=this;return new Promise(function(s,r){n.load(t,s,e,r)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}setPriority(t){return this.priority=t,this}setCache(t){return this.cache=t,this}abort(){return this}};yo.DEFAULT_MATERIAL_NAME="__DEFAULT";var zs=class extends He{static registerNode(t){this.prototype._lightNode=t}constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new re(t),this.intensity=e}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){let e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,e}},Hr=class extends zs{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(He.DEFAULT_UP),this.updateMatrix(),this.groundColor=new re(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}toJSON(t){let e=super.toJSON(t);return e.object.groundColor=this.groundColor.getHex(),e}},Xl=new xe,Vh=new N,Wh=new N,Gr=class{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new yt(512,512),this.mapType=hn,this.map=null,this.mapPass=null,this.matrix=new xe,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Ci,this._frameExtents=new yt(1,1),this._viewportCount=1,this._viewports=[new Ie(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(t){let e=this.camera;Vh.setFromMatrixPosition(t.matrixWorld),e.position.copy(Vh),Wh.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Wh),e.updateMatrixWorld(),this._updateMatrix(e,this.matrix,this._frustum)}_updateMatrix(t,e,n,s){Xl.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),n.setFromProjectionMatrix(Xl,t.coordinateSystem,t.reversedDepth);let r=this._frameExtents,a=s?s.z/r.x:1,o=s?s.w/r.y:1,c=s?s.x/r.x:0,l=s?s.y/r.y:0;t.coordinateSystem===Cs||t.reversedDepth?e.set(.5*a,0,0,.5*a+c,0,.5*o,0,.5*o+l,0,0,1,0,0,0,0,1):e.set(.5*a,0,0,.5*a+c,0,.5*o,0,.5*o+l,0,0,.5,.5,0,0,0,1),e.multiply(Xl)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this.mapType=t.mapType,this.biasNode=t.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let t={};return t.intensity=this.intensity,t.bias=this.bias,t.normalBias=this.normalBias,t.radius=this.radius,t.blurSamples=this.blurSamples,t.mapSize=this.mapSize.toArray(),t.mapType=this.mapType,t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}},Ua=new N,Fa=new vn,Xn=new N,kr=class extends He{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new xe,this.projectionMatrix=new xe,this.projectionMatrixInverse=new xe,this.coordinateSystem=Rn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorld.decompose(Ua,Fa,Xn),Xn.x===1&&Xn.y===1&&Xn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Ua,Fa,Xn.set(1,1,1)).invert()}updateWorldMatrix(t,e,n=!1){super.updateWorldMatrix(t,e,n),this.matrixWorld.decompose(Ua,Fa,Xn),Xn.x===1&&Xn.y===1&&Xn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Ua,Fa,Xn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},Ai=new N,Xh=new yt,qh=new yt,sn=class extends kr{constructor(t=50,e=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){let e=.5*this.getFilmHeight()/t;this.fov=Is*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){let t=Math.tan(Ts*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Is*2*Math.atan(Math.tan(Ts*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){Ai.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Ai.x,Ai.y).multiplyScalar(-t/Ai.z),Ai.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Ai.x,Ai.y).multiplyScalar(-t/Ai.z)}getViewSize(t,e){return this.getViewBounds(t,Xh,qh),e.subVectors(qh,Xh)}setViewOffset(t,e,n,s,r,a){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=this.near,e=t*Math.tan(Ts*.5*this.fov)/this.zoom,n=2*e,s=this.aspect*n,r=-.5*s,a=this.view;if(this.view!==null&&this.view.enabled){let c=a.fullWidth,l=a.fullHeight;r+=a.offsetX*s/c,e-=a.offsetY*n/l,s*=a.width/c,n*=a.height/l}let o=this.filmOffset;o!==0&&(r+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-n,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}};var Ql=class extends Gr{constructor(){super(new sn(90,1,.5,500)),this.isPointLightShadow=!0}},Vr=class extends zs{constructor(t,e,n=0,s=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new Ql}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}toJSON(t){let e=super.toJSON(t);return e.object.distance=this.distance,e.object.decay=this.decay,e.object.shadow=this.shadow.toJSON(),e}},Wr=class extends kr{constructor(t=-1,e=1,n=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=n-t,a=n+t,o=s+e,c=s-e;if(this.view!==null&&this.view.enabled){let l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,a=r+l*this.view.width,o-=h*this.view.offsetY,c=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}},tc=class extends Gr{constructor(){super(new Wr(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Xr=class extends zs{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(He.DEFAULT_UP),this.updateMatrix(),this.target=new He,this.shadow=new tc}dispose(){super.dispose(),this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}toJSON(t){let e=super.toJSON(t);return e.object.shadow=this.shadow.toJSON(),e.object.target=this.target.uuid,e}};var bs=-90,Es=1,Hs=class extends He{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new sn(bs,Es,t,e);s.layers=this.layers,this.add(s);let r=new sn(bs,Es,t,e);r.layers=this.layers,this.add(r);let a=new sn(bs,Es,t,e);a.layers=this.layers,this.add(a);let o=new sn(bs,Es,t,e);o.layers=this.layers,this.add(o);let c=new sn(bs,Es,t,e);c.layers=this.layers,this.add(c);let l=new sn(bs,Es,t,e);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){let t=this.coordinateSystem,e=this.children.concat(),[n,s,r,a,o,c]=e;for(let l of e)this.remove(l);if(t===Rn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(t===Cs)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(let l of e)this.add(l),l.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());let[r,a,o,c,l,h]=this.children,f=t.getRenderTarget(),d=t.getActiveCubeFace(),p=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;let _=n.texture.mipmapsAutoUpdate;n.texture.mipmapsAutoUpdate=!1;let u=!1;t.isWebGLRenderer===!0?u=t.state.buffers.depth.getReversed():u=t.reversedDepthBuffer,t.setRenderTarget(n,0,s),u&&t.autoClear===!1&&t.clearDepth(),t.render(e,r),t.setRenderTarget(n,1,s),u&&t.autoClear===!1&&t.clearDepth(),t.render(e,a),t.setRenderTarget(n,2,s),u&&t.autoClear===!1&&t.clearDepth(),t.render(e,o),t.setRenderTarget(n,3,s),u&&t.autoClear===!1&&t.clearDepth(),t.render(e,c),t.setRenderTarget(n,4,s),u&&t.autoClear===!1&&t.clearDepth(),t.render(e,l),n.texture.mipmapsAutoUpdate=_,t.setRenderTarget(n,5,s),u&&t.autoClear===!1&&t.clearDepth(),t.render(e,h),t.setRenderTarget(f,d,p),t.xr.enabled=g,n.texture.needsPMREMUpdate=!0}},vo=class extends sn{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t,this.perCameraFrustumCulled=!1}};var Nc="\\[\\]\\.:\\/",hp=new RegExp("["+Nc+"]","g"),Uc="[^"+Nc+"]",up="[^"+Nc.replace("\\.","")+"]",dp=/((?:WC+[\/:])*)/.source.replace("WC",Uc),fp=/(WCOD+)?/.source.replace("WCOD",up),pp=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Uc),mp=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Uc),gp=new RegExp("^"+dp+fp+pp+mp+"$"),_p=["material","materials","bones","map"],ec=class{constructor(t,e,n){let s=n||Re.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,s)}getValue(t,e){this.bind();let n=this._targetGroup.nCachedObjects_,s=this._bindings[n];s!==void 0&&s.getValue(t,e)}setValue(t,e){let n=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=n.length;s!==r;++s)n[s].setValue(t,e)}bind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].bind()}unbind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].unbind()}},Re=class i{constructor(t,e,n){this.path=e,this.parsedPath=n||i.parseTrackName(e),this.node=i.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,e,n){return t&&t.isAnimationObjectGroup?new i.Composite(t,e,n):new i(t,e,n)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(hp,"")}static parseTrackName(t){let e=gp.exec(t);if(e===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+t);let n={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},s=n.nodeName&&n.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=n.nodeName.substring(s+1);_p.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,s),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+t);return n}static findNode(t,e){if(e===void 0||e===""||e==="."||e===-1||e===t.name||e===t.uuid)return t;if(t.skeleton){let n=t.skeleton.getBoneByName(e);if(n!==void 0)return n}if(t.children){let n=function(r){for(let a=0;a<r.length;a++){let o=r[a];if(o.name===e||o.uuid===e)return o;let c=n(o.children);if(c)return c}return null},s=n(t.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,e){t[e]=this.targetObject[this.propertyName]}_getValue_array(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)t[e++]=n[s]}_getValue_arrayElement(t,e){t[e]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,e){this.resolvedProperty.toArray(t,e)}_setValue_direct(t,e){this.targetObject[this.propertyName]=t[e]}_setValue_direct_setNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++]}_setValue_array_setNeedsUpdate(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}_setValue_arrayElement_setNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,e){this.resolvedProperty.fromArray(t,e)}_setValue_fromArray_setNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,e){this.bind(),this.getValue(t,e)}_setValue_unbound(t,e){this.bind(),this.setValue(t,e)}bind(){let t=this.node,e=this.parsedPath,n=e.objectName,s=e.propertyName,r=e.propertyIndex;if(t||(t=i.findNode(this.rootNode,e.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){Zt("PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let l=e.objectIndex;switch(n){case"materials":if(!t.material){te("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){te("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){te("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let h=0;h<t.length;h++)if(t[h].name===l){l=h;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){te("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){te("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[n]===void 0){te("PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[n]}if(l!==void 0){if(t[l]===void 0){te("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[l]}}let a=t[s];if(a===void 0){let l=e.nodeName;te("PropertyBinding: Trying to update property for track: "+l+"."+s+" but it wasn't found.",t);return}let o=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?o=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!t.geometry){te("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){te("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[r]!==void 0&&(r=t.morphTargetDictionary[r])}c=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=r}else a.fromArray!==void 0&&a.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(c=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=s;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};Re.Composite=ec;Re.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Re.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Re.prototype.GetterByBindingType=[Re.prototype._getValue_direct,Re.prototype._getValue_array,Re.prototype._getValue_arrayElement,Re.prototype._getValue_toArray];Re.prototype.SetterByBindingTypeAndVersioning=[[Re.prototype._setValue_direct,Re.prototype._setValue_direct_setNeedsUpdate,Re.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Re.prototype._setValue_array,Re.prototype._setValue_array_setNeedsUpdate,Re.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Re.prototype._setValue_arrayElement,Re.prototype._setValue_arrayElement_setNeedsUpdate,Re.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Re.prototype._setValue_fromArray,Re.prototype._setValue_fromArray_setNeedsUpdate,Re.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var Ix=new Float32Array(1);var Yh=new xe,qr=class{constructor(t,e,n=0,s=1/0){this.ray=new Ri(t,e),this.near=n,this.far=s,this.camera=null,this.layers=new Ds,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,e.projectionMatrix.elements[14]).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):te("Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return Yh.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Yh),this}intersectObject(t,e=!0,n=[]){return nc(t,this,n,e),n.sort(Zh),n}intersectObjects(t,e=!0,n=[]){for(let s=0,r=t.length;s<r;s++)nc(t[s],this,n,e);return n.sort(Zh),n}};function Zh(i,t){return i.distance-t.distance}function nc(i,t,e,n){let s=!0;if(i.layers.test(t.layers)&&i.raycast(t,e)===!1&&(s=!1),s===!0&&n===!0){let r=i.children;for(let a=0,o=r.length;a<o;a++)nc(r[a],t,e,!0)}}var Gs=class{constructor(t=1,e=0,n=0){this.radius=t,this.phi=e,this.theta=n}set(t,e,n){return this.radius=t,this.phi=e,this.theta=n,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=le(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,e,n){return this.radius=Math.sqrt(t*t+e*e+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,n),this.phi=Math.acos(le(e/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}};var Gc=class Gc{constructor(t,e,n,s){this.elements=[1,0,0,1],t!==void 0&&this.set(t,e,n,s)}identity(){return this.set(1,0,0,1),this}fromArray(t,e=0){for(let n=0;n<4;n++)this.elements[n]=t[n+e];return this}set(t,e,n,s){let r=this.elements;return r[0]=t,r[2]=e,r[1]=n,r[3]=s,this}};Gc.prototype.isMatrix2=!0;var ic=Gc;var Yr=class extends Fn{constructor(t,e=null){super(),this.object=t,this.domElement=e,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(t){this.domElement!==null&&this.disconnect(),this.domElement=t}disconnect(){}dispose(){}update(){}};function Fc(i,t,e,n){let s=xp(n);switch(e){case Mc:return i*t;case Co:return i*t/s.components*s.byteLength;case Po:return i*t/s.components*s.byteLength;case Oi:return i*t*2/s.components*s.byteLength;case Io:return i*t*2/s.components*s.byteLength;case Sc:return i*t*3/s.components*s.byteLength;case zn:return i*t*4/s.components*s.byteLength;case Lo:return i*t*4/s.components*s.byteLength;case Jr:case Kr:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case jr:case Qr:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case No:case Fo:return Math.max(i,16)*Math.max(t,8)/4;case Do:case Uo:return Math.max(i,8)*Math.max(t,8)/2;case Oo:case Bo:case Ho:case Go:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case zo:case ta:case ko:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Vo:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Wo:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case Xo:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case qo:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case Yo:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case Zo:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case $o:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case Jo:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case Ko:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case jo:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case Qo:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case tl:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case el:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case nl:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case il:case sl:case rl:return Math.ceil(i/4)*Math.ceil(t/4)*16;case al:case ol:return Math.ceil(i/4)*Math.ceil(t/4)*8;case ea:case ll:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function xp(i){switch(i){case hn:case _c:return{byteLength:1,components:1};case Xs:case xc:case Bn:return{byteLength:2,components:1};case Ao:case Ro:return{byteLength:2,components:4};case On:case wo:case In:return{byteLength:4,components:1};case yc:case vc:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"187"}}));typeof window<"u"&&(window.__THREE__?Zt("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="187");function cd(){let i=null,t=!1,e=null,n=null;function s(r,a){n=i.requestAnimationFrame(s),e(r,a)}return{start:function(){t!==!0&&e!==null&&i!==null&&(n=i.requestAnimationFrame(s),t=!0)},stop:function(){i!==null&&i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){i=r}}}function vp(i){let t=new WeakMap;function e(o,c){let l=o.array,h=o.usage,f=l.byteLength,d=i.createBuffer();i.bindBuffer(c,d),i.bufferData(c,l,h),o.onUploadCallback();let p;if(l instanceof Float32Array)p=i.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)p=i.HALF_FLOAT;else if(l instanceof Uint16Array)o.isFloat16BufferAttribute?p=i.HALF_FLOAT:p=i.UNSIGNED_SHORT;else if(l instanceof Int16Array)p=i.SHORT;else if(l instanceof Uint32Array)p=i.UNSIGNED_INT;else if(l instanceof Int32Array)p=i.INT;else if(l instanceof Int8Array)p=i.BYTE;else if(l instanceof Uint8Array)p=i.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)p=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:d,type:p,bytesPerElement:l.BYTES_PER_ELEMENT,version:o.version,size:f}}function n(o,c,l){let h=c.array,f=c.updateRanges;if(i.bindBuffer(l,o),f.length===0)i.bufferSubData(l,0,h);else{f.sort((p,g)=>p.start-g.start);let d=0;for(let p=1;p<f.length;p++){let g=f[d],_=f[p];_.start<=g.start+g.count+1?g.count=Math.max(g.count,_.start+_.count-g.start):(++d,f[d]=_)}f.length=d+1;for(let p=0,g=f.length;p<g;p++){let _=f[p];i.bufferSubData(l,_.start*h.BYTES_PER_ELEMENT,h,_.start,_.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);let c=t.get(o);c&&(i.deleteBuffer(c.buffer),t.delete(o))}function a(o,c){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){let h=t.get(o);(!h||h.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}let l=t.get(o);if(l===void 0)t.set(o,e(o,c));else if(l.version<o.version){if(l.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,o,c),l.version=o.version}}return{get:s,remove:r,update:a}}var Mp=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Sp=`#ifdef USE_ALPHAHASH
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
#endif`,bp=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Ep=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Tp=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,wp=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Ap=`#ifdef USE_AOMAP
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
#endif`,Rp=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Cp=`#ifdef USE_BATCHING
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
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,Pp=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Ip=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Lp=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Dp=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Np=`#ifdef USE_IRIDESCENCE
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
#endif`,Up=`#ifdef USE_BUMPMAP
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
#endif`,Fp=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Op=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Bp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,zp=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Hp=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,Gp=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,kp=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,Vp=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,Wp=`#define PI 3.141592653589793
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
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
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
} // validated`,Xp=`vec3 transformedNormal = objectNormal;
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
#endif`,qp=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Yp=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Zp=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,$p=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Jp="gl_FragColor = linearToOutputTexel( gl_FragColor );",Kp=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,jp=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,Qp=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	uniform samplerCube envMap;
	#ifdef ENVMAP_TYPE_PMREM
		float roughnessToMip( const in float roughness ) {
			float r = clamp( roughness, 0.0, 1.0 );
			return ENVMAP_MAX_LOD * r * ( 2.0 - r );
		}
	#endif
#endif`,tm=`#ifdef USE_ENVMAP
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
#endif`,em=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,nm=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,im=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,sm=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,rm=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,am=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,om=`#ifdef USE_GRADIENTMAP
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
}`,lm=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,cm=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,hm=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,um=`uniform bool receiveShadow;
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
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
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
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
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
#endif
#include <lightprobes_pars_fragment>`,dm=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_PMREM
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureLod( envMap, envMapRotation * worldNormal, ENVMAP_MAX_LOD );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_PMREM
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureLod( envMap, envMapRotation * reflectVec, roughnessToMip( roughness ) );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_PMREM
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureLod( envMap, envMapRotation * retroVec, roughnessToMip( roughness ) );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_PMREM
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_PMREM
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,fm=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,pm=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,mm=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,gm=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,_m=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.045 );
material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef USE_DIFFUSE_ROUGHNESS
	float diffuseRoughnessFactor = diffuseRoughness;
	#ifdef USE_DIFFUSE_ROUGHNESSMAP
		diffuseRoughnessFactor *= texture2D( diffuseRoughnessMap, vDiffuseRoughnessMapUv ).r;
	#endif
	material.diffuseRoughness = saturate( diffuseRoughnessFactor );
#endif
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
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
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
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.045 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
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
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
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
#endif`,xm=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_DIFFUSE_ROUGHNESS
		float diffuseRoughness;
	#endif
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
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
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
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
#ifdef USE_DIFFUSE_ROUGHNESS
	const float EON_EPSILON = 1e-7;
	float FON_DirectionalAlbedo( const in float mu, const in float roughness, const in float A ) {
		float muComp = 1.0 - mu;
		float gOverPi = muComp * ( 0.0571085289 + muComp * ( 0.491881867 + muComp * ( - 0.332181442 + muComp * 0.0714429953 ) ) );
		return A * ( 1.0 + roughness * gOverPi );
	}
	vec3 BRDF_EON( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 diffuseColor, const in float roughness ) {
		vec3 rho = saturate( diffuseColor );
		if ( roughness <= EON_EPSILON ) return BRDF_Lambert( rho );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float s = dot( lightDir, viewDir ) - dotNL * dotNV;
		float sOverT = ( s > 0.0 ) ? s / max( max( dotNL, dotNV ), EON_EPSILON ) : s;
		float A = 1.0 / ( 1.0 + ( 0.5 - 2.0 / ( 3.0 * PI ) ) * roughness );
		vec3 singleScatter = rho * RECIPROCAL_PI * A * ( 1.0 + roughness * sOverT );
		float averageAlbedo = A * ( 1.0 + ( 2.0 / 3.0 - 28.0 / ( 15.0 * PI ) ) * roughness );
		float albedoV = FON_DirectionalAlbedo( dotNV, roughness, A );
		float albedoL = FON_DirectionalAlbedo( dotNL, roughness, A );
		vec3 rhoMultiScatter = rho * rho * averageAlbedo / max( vec3( EON_EPSILON ), vec3( 1.0 ) - rho * ( 1.0 - averageAlbedo ) );
		vec3 multiScatter = rhoMultiScatter * RECIPROCAL_PI
			* max( EON_EPSILON, 1.0 - albedoV )
			* max( EON_EPSILON, 1.0 - albedoL )
			/ max( EON_EPSILON, 1.0 - averageAlbedo );
		return singleScatter + multiScatter;
	}
	vec3 EON_DirectionalAlbedo( const in vec3 diffuseColor, const in float roughness, const in float dotNV ) {
		vec3 rho = saturate( diffuseColor );
		if ( roughness <= EON_EPSILON ) return rho;
		float A = 1.0 / ( 1.0 + ( 0.5 - 2.0 / ( 3.0 * PI ) ) * roughness );
		float directionalAlbedo = FON_DirectionalAlbedo( dotNV, roughness, A );
		float averageAlbedo = A * ( 1.0 + ( 2.0 / 3.0 - 28.0 / ( 15.0 * PI ) ) * roughness );
		vec3 rhoMultiScatter = rho * rho * averageAlbedo / max( vec3( EON_EPSILON ), vec3( 1.0 ) - rho * ( 1.0 - averageAlbedo ) );
		return rho * directionalAlbedo + rhoMultiScatter * ( 1.0 - directionalAlbedo );
	}
#endif
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
		return 0.5 / max( gv + gl, EPSILON );
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
		float roughness = max( material.clearcoatRoughness, 0.045 );
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
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = max( material.roughness, 0.045 );
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
		float alphaT = max( material.alphaT, alpha );
		float V = V_GGX_SmithCorrelated_Anisotropic( alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( alphaT, alpha, dotNH, dotTH, dotBH );
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
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
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
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
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
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	#ifdef USE_DIFFUSE_ROUGHNESS
		vec3 diffuseBRDF = BRDF_EON( directLight.direction, geometryViewDir, geometryNormal, material.diffuseColor, material.diffuseRoughness ) * ( 1.0 - material.metalness );
	#else
		vec3 diffuseBRDF = BRDF_Lambert( material.diffuseContribution );
	#endif
	reflectedLight.directDiffuse += irradiance * diffuseBRDF * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	#ifdef USE_DIFFUSE_ROUGHNESS
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		vec3 diffuseAlbedo = EON_DirectionalAlbedo( material.diffuseColor, material.diffuseRoughness, dotNV ) * ( 1.0 - material.metalness );
		vec3 diffuse = irradiance * RECIPROCAL_PI * diffuseAlbedo * ( 1.0 - singleScattering - multiScattering );
	#else
		vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#endif
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	#ifdef USE_DIFFUSE_ROUGHNESS
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		vec3 diffuse = EON_DirectionalAlbedo( material.diffuseColor, material.diffuseRoughness, dotNV ) * ( 1.0 - material.metalness ) * ( 1.0 - totalScatteringDielectric );
	#else
		vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	#endif
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,ym=`
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
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
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
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
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
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
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
	#if NUM_LIGHT_PROBE_GRIDS > 0
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		int probeGrid = - 1;
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_LIGHT_PROBE_GRIDS; i ++ ) {
			if ( isInsideLightProbeGrid( probeWorldPos, probeWorldNormal, probesMin[ i ], probesMax[ i ], probesResolution[ i ] ) ) probeGrid = UNROLLED_LOOP_INDEX;
		}
		#pragma unroll_loop_end
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_LIGHT_PROBE_GRIDS; i ++ ) {
			if ( probeGrid == UNROLLED_LOOP_INDEX ) irradiance += getLightProbeGridIrradiance( probesSH[ i ], probesMin[ i ], probesMax[ i ], probesResolution[ i ], probeWorldPos, probeWorldNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,vm=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_PMREM )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Mm=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Sm=`#if NUM_LIGHT_PROBE_GRIDS > 0
uniform highp sampler3D probesSH[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesMin[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesMax[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesResolution[ NUM_LIGHT_PROBE_GRIDS ];
bool isInsideLightProbeGrid( vec3 worldPos, vec3 worldNormal, vec3 probesMin, vec3 probesMax, vec3 probesResolution ) {
	vec3 spacing = ( probesMax - probesMin ) / probesResolution;
	vec3 samplePos = worldPos + worldNormal * spacing * 0.5;
	vec3 margin = spacing * 0.01;
	return all( greaterThanEqual( samplePos, probesMin - margin ) ) && all( lessThanEqual( samplePos, probesMax + margin ) );
}
vec3 getLightProbeGridIrradiance( highp sampler3D probesSH, vec3 probesMin, vec3 probesMax, vec3 probesResolution, vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 probeSpacing = gridRange / res;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.5 / res, 1.0 - 0.5 / res );
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,bm=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Em=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Tm=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,wm=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Am=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Rm=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Cm=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Pm=`#if defined( USE_POINTS_UV )
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
#endif`,Im=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Lm=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Dm=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Nm=`#if defined( USE_MORPHCOLORS )
	#if defined( USE_COLOR_ALPHA )
		vColor *= morphTargetBaseInfluence;
	#elif defined( USE_COLOR )
		vColor.rgb *= morphTargetBaseInfluence;
	#endif
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor.rgb += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Um=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Fm=`#ifdef USE_MORPHTARGETS
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
#endif`,Om=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Bm=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
	#ifdef DOUBLE_SIDED
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
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,zm=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Hm=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Gm=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,km=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,Vm=`#ifdef USE_NORMALMAP
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
#endif`,Wm=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Xm=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,qm=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Ym=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Zm=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,$m=`vec3 packNormalToRGB( const in vec3 normal ) {
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
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,Jm=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Km=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,jm=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Qm=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,t0=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,e0=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,n0=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
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
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
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
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
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
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				vec2 radius = shadowRadius * texelSize;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float lightDistance = length( lightToPosition );
			float depthRange = shadowCameraFar - shadowCameraNear;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float depthA = - shadowCameraNear / depthRange - shadowBias;
				float depthB = shadowCameraNear * shadowCameraFar / ( depthRange * lightDistance );
			#else
				float depthA = shadowCameraFar / depthRange + shadowBias;
				float depthB = - shadowCameraNear * shadowCameraFar / ( depthRange * lightDistance );
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			shadow = 0.0;
			for ( int i = 0; i < 5; i ++ ) {
				vec2 offset = vogelDiskSample( i, 5, phi );
				vec3 direction = bd3D + ( tangent * offset.x + bitangent * offset.y ) * texelSize;
				vec3 absDirection = abs( direction );
				float dp = depthA + depthB / max( max( absDirection.x, absDirection.y ), absDirection.z );
				shadow += texture( shadowMap, vec4( direction, dp ) );
			}
			shadow *= 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,i0=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
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
#endif`,s0=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
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
#endif`,r0=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
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
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
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
}`,a0=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,o0=`#ifdef USE_SKINNING
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
#endif`,l0=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,c0=`#ifdef USE_SKINNING
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
#endif`,h0=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,u0=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,d0=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,f0=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,p0=`#ifdef USE_TRANSMISSION
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
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,m0=`#ifdef USE_TRANSMISSION
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
#endif`,g0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	varying vec2 vDiffuseRoughnessMapUv;
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
#endif`,_0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	uniform mat3 diffuseRoughnessMapTransform;
	varying vec2 vDiffuseRoughnessMapUv;
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
#endif`,x0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	vDiffuseRoughnessMapUv = ( diffuseRoughnessMapTransform * vec3( DIFFUSE_ROUGHNESSMAP_UV, 1 ) ).xy;
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
#endif`,y0=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,v0=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,M0=`uniform sampler2D t2D;
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
}`,S0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,b0=`uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <envmap_common_pars_fragment>
void main() {
	#ifdef ENVMAP_TYPE_PMREM
		vec4 texColor = textureLod( envMap, backgroundRotation * vWorldDirection, roughnessToMip( backgroundBlurriness ) );
	#else
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,E0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,T0=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,w0=`#include <common>
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
}`,A0=`#if DEPTH_PACKING == 3200
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
}`,R0=`#define DISTANCE
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
}`,C0=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,P0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,I0=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,L0=`uniform float scale;
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
}`,D0=`uniform vec3 diffuse;
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
}`,N0=`#include <common>
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
}`,U0=`uniform vec3 diffuse;
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
}`,F0=`#define LAMBERT
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
}`,O0=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
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
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
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
}`,B0=`#define MATCAP
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
}`,z0=`#define MATCAP
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
}`,H0=`#define NORMAL
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
}`,G0=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
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
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,k0=`#define PHONG
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
}`,V0=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
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
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
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
}`,W0=`#define STANDARD
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
}`,X0=`#define STANDARD
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
#ifdef USE_DIFFUSE_ROUGHNESS
	uniform float diffuseRoughness;
	#ifdef USE_DIFFUSE_ROUGHNESSMAP
		uniform sampler2D diffuseRoughnessMap;
	#endif
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
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
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
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
}`,q0=`#define TOON
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
}`,Y0=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
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
}`,Z0=`uniform float size;
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
}`,$0=`uniform vec3 diffuse;
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
}`,J0=`#include <common>
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
}`,K0=`uniform vec3 color;
uniform float opacity;
#include <common>
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
	#include <premultiplied_alpha_fragment>
}`,j0=`uniform float rotation;
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
}`,Q0=`uniform vec3 diffuse;
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
}`,ce={alphahash_fragment:Mp,alphahash_pars_fragment:Sp,alphamap_fragment:bp,alphamap_pars_fragment:Ep,alphatest_fragment:Tp,alphatest_pars_fragment:wp,aomap_fragment:Ap,aomap_pars_fragment:Rp,batching_pars_vertex:Cp,batching_vertex:Pp,begin_vertex:Ip,beginnormal_vertex:Lp,bsdfs:Dp,iridescence_fragment:Np,bumpmap_pars_fragment:Up,clipping_planes_fragment:Fp,clipping_planes_pars_fragment:Op,clipping_planes_pars_vertex:Bp,clipping_planes_vertex:zp,color_fragment:Hp,color_pars_fragment:Gp,color_pars_vertex:kp,color_vertex:Vp,common:Wp,defaultnormal_vertex:Xp,displacementmap_pars_vertex:qp,displacementmap_vertex:Yp,emissivemap_fragment:Zp,emissivemap_pars_fragment:$p,colorspace_fragment:Jp,colorspace_pars_fragment:Kp,envmap_fragment:jp,envmap_common_pars_fragment:Qp,envmap_pars_fragment:tm,envmap_pars_vertex:em,envmap_physical_pars_fragment:dm,envmap_vertex:nm,fog_vertex:im,fog_pars_vertex:sm,fog_fragment:rm,fog_pars_fragment:am,gradientmap_pars_fragment:om,lightmap_pars_fragment:lm,lights_lambert_fragment:cm,lights_lambert_pars_fragment:hm,lights_pars_begin:um,lights_toon_fragment:fm,lights_toon_pars_fragment:pm,lights_phong_fragment:mm,lights_phong_pars_fragment:gm,lights_physical_fragment:_m,lights_physical_pars_fragment:xm,lights_fragment_begin:ym,lights_fragment_maps:vm,lights_fragment_end:Mm,lightprobes_pars_fragment:Sm,logdepthbuf_fragment:bm,logdepthbuf_pars_fragment:Em,logdepthbuf_pars_vertex:Tm,logdepthbuf_vertex:wm,map_fragment:Am,map_pars_fragment:Rm,map_particle_fragment:Cm,map_particle_pars_fragment:Pm,metalnessmap_fragment:Im,metalnessmap_pars_fragment:Lm,morphinstance_vertex:Dm,morphcolor_vertex:Nm,morphnormal_vertex:Um,morphtarget_pars_vertex:Fm,morphtarget_vertex:Om,normal_fragment_begin:Bm,normal_fragment_maps:zm,normal_pars_fragment:Hm,normal_pars_vertex:Gm,normal_vertex:km,normalmap_pars_fragment:Vm,clearcoat_normal_fragment_begin:Wm,clearcoat_normal_fragment_maps:Xm,clearcoat_pars_fragment:qm,iridescence_pars_fragment:Ym,opaque_fragment:Zm,packing:$m,premultiplied_alpha_fragment:Jm,project_vertex:Km,dithering_fragment:jm,dithering_pars_fragment:Qm,roughnessmap_fragment:t0,roughnessmap_pars_fragment:e0,shadowmap_pars_fragment:n0,shadowmap_pars_vertex:i0,shadowmap_vertex:s0,shadowmask_pars_fragment:r0,skinbase_vertex:a0,skinning_pars_vertex:o0,skinning_vertex:l0,skinnormal_vertex:c0,specularmap_fragment:h0,specularmap_pars_fragment:u0,tonemapping_fragment:d0,tonemapping_pars_fragment:f0,transmission_fragment:p0,transmission_pars_fragment:m0,uv_pars_fragment:g0,uv_pars_vertex:_0,uv_vertex:x0,worldpos_vertex:y0,background_vert:v0,background_frag:M0,backgroundCube_vert:S0,backgroundCube_frag:b0,cube_vert:E0,cube_frag:T0,depth_vert:w0,depth_frag:A0,distance_vert:R0,distance_frag:C0,equirect_vert:P0,equirect_frag:I0,linedashed_vert:L0,linedashed_frag:D0,meshbasic_vert:N0,meshbasic_frag:U0,meshlambert_vert:F0,meshlambert_frag:O0,meshmatcap_vert:B0,meshmatcap_frag:z0,meshnormal_vert:H0,meshnormal_frag:G0,meshphong_vert:k0,meshphong_frag:V0,meshphysical_vert:W0,meshphysical_frag:X0,meshtoon_vert:q0,meshtoon_frag:Y0,points_vert:Z0,points_frag:$0,shadow_vert:J0,shadow_frag:K0,sprite_vert:j0,sprite_frag:Q0},Ut={common:{diffuse:{value:new re(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new ne},alphaMap:{value:null},alphaMapTransform:{value:new ne},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new ne}},envmap:{envMap:{value:null},envMapRotation:{value:new ne},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new ne}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new ne}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new ne},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new ne},normalScale:{value:new yt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new ne},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new ne}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new ne}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new ne}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new re(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:[]},probesMin:{value:[]},probesMax:{value:[]},probesResolution:{value:[]}},points:{diffuse:{value:new re(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new ne},alphaTest:{value:0},uvTransform:{value:new ne}},sprite:{diffuse:{value:new re(16777215)},opacity:{value:1},center:{value:new yt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new ne},alphaMap:{value:null},alphaMapTransform:{value:new ne},alphaTest:{value:0}}},jn={basic:{uniforms:rn([Ut.common,Ut.specularmap,Ut.envmap,Ut.aomap,Ut.lightmap,Ut.fog]),vertexShader:ce.meshbasic_vert,fragmentShader:ce.meshbasic_frag},lambert:{uniforms:rn([Ut.common,Ut.specularmap,Ut.envmap,Ut.aomap,Ut.lightmap,Ut.emissivemap,Ut.bumpmap,Ut.normalmap,Ut.displacementmap,Ut.fog,Ut.lights,{emissive:{value:new re(0)},envMapIntensity:{value:1}}]),vertexShader:ce.meshlambert_vert,fragmentShader:ce.meshlambert_frag},phong:{uniforms:rn([Ut.common,Ut.specularmap,Ut.envmap,Ut.aomap,Ut.lightmap,Ut.emissivemap,Ut.bumpmap,Ut.normalmap,Ut.displacementmap,Ut.fog,Ut.lights,{emissive:{value:new re(0)},specular:{value:new re(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:ce.meshphong_vert,fragmentShader:ce.meshphong_frag},standard:{uniforms:rn([Ut.common,Ut.envmap,Ut.aomap,Ut.lightmap,Ut.emissivemap,Ut.bumpmap,Ut.normalmap,Ut.displacementmap,Ut.roughnessmap,Ut.metalnessmap,Ut.fog,Ut.lights,{emissive:{value:new re(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ce.meshphysical_vert,fragmentShader:ce.meshphysical_frag},toon:{uniforms:rn([Ut.common,Ut.aomap,Ut.lightmap,Ut.emissivemap,Ut.bumpmap,Ut.normalmap,Ut.displacementmap,Ut.gradientmap,Ut.fog,Ut.lights,{emissive:{value:new re(0)}}]),vertexShader:ce.meshtoon_vert,fragmentShader:ce.meshtoon_frag},matcap:{uniforms:rn([Ut.common,Ut.bumpmap,Ut.normalmap,Ut.displacementmap,Ut.fog,{matcap:{value:null}}]),vertexShader:ce.meshmatcap_vert,fragmentShader:ce.meshmatcap_frag},points:{uniforms:rn([Ut.points,Ut.fog]),vertexShader:ce.points_vert,fragmentShader:ce.points_frag},dashed:{uniforms:rn([Ut.common,Ut.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ce.linedashed_vert,fragmentShader:ce.linedashed_frag},depth:{uniforms:rn([Ut.common,Ut.displacementmap]),vertexShader:ce.depth_vert,fragmentShader:ce.depth_frag},normal:{uniforms:rn([Ut.common,Ut.bumpmap,Ut.normalmap,Ut.displacementmap,{opacity:{value:1}}]),vertexShader:ce.meshnormal_vert,fragmentShader:ce.meshnormal_frag},sprite:{uniforms:rn([Ut.sprite,Ut.fog]),vertexShader:ce.sprite_vert,fragmentShader:ce.sprite_frag},background:{uniforms:{uvTransform:{value:new ne},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ce.background_vert,fragmentShader:ce.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new ne}},vertexShader:ce.backgroundCube_vert,fragmentShader:ce.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ce.cube_vert,fragmentShader:ce.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ce.equirect_vert,fragmentShader:ce.equirect_frag},distance:{uniforms:rn([Ut.common,Ut.displacementmap,{referencePosition:{value:new N},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ce.distance_vert,fragmentShader:ce.distance_frag},shadow:{uniforms:rn([Ut.lights,Ut.fog,{color:{value:new re(0)},opacity:{value:1}}]),vertexShader:ce.shadow_vert,fragmentShader:ce.shadow_frag}};jn.physical={uniforms:rn([jn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new ne},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new ne},clearcoatNormalScale:{value:new yt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new ne},diffuseRoughness:{value:0},diffuseRoughnessMap:{value:null},diffuseRoughnessMapTransform:{value:new ne},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new ne},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new ne},sheen:{value:0},sheenColor:{value:new re(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new ne},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new ne},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new ne},transmissionSamplerSize:{value:new yt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new ne},attenuationDistance:{value:0},attenuationColor:{value:new re(0)},specularColor:{value:new re(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new ne},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new ne},anisotropyVector:{value:new yt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new ne}}]),vertexShader:ce.meshphysical_vert,fragmentShader:ce.meshphysical_frag};var cl={r:0,b:0,g:0},tg=new xe,hd=new ne;hd.set(-1,0,0,0,1,0,0,0,1);function eg(i,t,e,n,s,r){let a=new re(0),o=s===!0?0:1,c,l,h=null,f=0,d=null;function p(S){let E=S.isScene===!0?S.background:null;if(E&&E.isTexture){let M=S.backgroundBlurriness>0;E=t.get(E,M)}return E}function g(S){let E=!1,M=p(S);M===null?u(a,o):M&&M.isColor&&(u(M,1),E=!0);let A=i.xr.getEnvironmentBlendMode();A==="additive"?e.buffers.color.setClear(0,0,0,1,r):A==="alpha-blend"&&e.buffers.color.setClear(0,0,0,0,r),(i.autoClear||E)&&(e.buffers.depth.setTest(!0),e.buffers.depth.setMask(!0),e.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function _(S,E){let M=p(E);M&&M.isCubeTexture?(l===void 0&&(l=new ft(new Kt(1,1,1),new $n({name:"BackgroundCubeMaterial",uniforms:ss(jn.backgroundCube.uniforms),vertexShader:jn.backgroundCube.vertexShader,fragmentShader:jn.backgroundCube.fragmentShader,side:je,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(A,T,x){this.matrixWorld.copyPosition(x.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(l)),l.material.uniforms.envMap.value=M,l.material.uniforms.backgroundBlurriness.value=E.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=E.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(tg.makeRotationFromEuler(E.backgroundRotation)).transpose(),M.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(hd),l.material.toneMapped=de.getTransfer(M.colorSpace)!==Ee,(h!==M||f!==M.version||d!==i.toneMapping)&&(l.material.needsUpdate=!0,h=M,f=M.version,d=i.toneMapping),l.layers.enableAll(),S.unshift(l,l.geometry,l.material,0,0,null)):M&&M.isTexture&&(c===void 0&&(c=new ft(new Ki(2,2),new $n({name:"BackgroundMaterial",uniforms:ss(jn.background.uniforms),vertexShader:jn.background.vertexShader,fragmentShader:jn.background.fragmentShader,side:Fi,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(c)),c.material.uniforms.t2D.value=M,c.material.uniforms.backgroundIntensity.value=E.backgroundIntensity,c.material.toneMapped=de.getTransfer(M.colorSpace)!==Ee,M.matrixAutoUpdate===!0&&M.updateMatrix(),c.material.uniforms.uvTransform.value.copy(M.matrix),(h!==M||f!==M.version||d!==i.toneMapping)&&(c.material.needsUpdate=!0,h=M,f=M.version,d=i.toneMapping),c.layers.enableAll(),S.unshift(c,c.geometry,c.material,0,0,null))}function u(S,E){S.getRGB(cl,Dc(i)),e.buffers.color.setClear(cl.r,cl.g,cl.b,E,r)}function m(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return a},setClearColor:function(S,E=1){a.set(S),o=E,u(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(S){o=S,u(a,o)},render:g,addToRenderList:_,dispose:m}}function ng(i,t){let e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=d(null),r=s,a=!1;function o(F,G,X,C,Y){let j=!1,q=f(F,C,X,G);r!==q&&(r=q,l(r.object)),j=p(F,C,X,Y),j&&g(F,C,X,Y),Y!==null&&t.update(Y,i.ELEMENT_ARRAY_BUFFER),(j||a)&&(a=!1,M(F,G,X,C),Y!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(Y).buffer))}function c(){return i.createVertexArray()}function l(F){return i.bindVertexArray(F)}function h(F){return i.deleteVertexArray(F)}function f(F,G,X,C){let Y=C.wireframe===!0,j=n[G.id];j===void 0&&(j={},n[G.id]=j);let q=F.isInstancedMesh===!0?F.id:0,ut=j[q];ut===void 0&&(ut={},j[q]=ut);let K=ut[X.id];K===void 0&&(K={},ut[X.id]=K);let rt=K[Y];return rt===void 0&&(rt=d(c()),K[Y]=rt),rt}function d(F){let G=[],X=[],C=[];for(let Y=0;Y<e;Y++)G[Y]=0,X[Y]=0,C[Y]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:G,enabledAttributes:X,attributeDivisors:C,object:F,attributes:{},index:null}}function p(F,G,X,C){let Y=r.attributes,j=G.attributes,q=0,ut=X.getAttributes();for(let K in ut)if(ut[K].location>=0){let lt=Y[K],Ft=j[K];if(Ft===void 0&&(K==="instanceMatrix"&&F.instanceMatrix&&(Ft=F.instanceMatrix),K==="instanceColor"&&F.instanceColor&&(Ft=F.instanceColor)),lt===void 0||lt.attribute!==Ft||Ft&&lt.data!==Ft.data)return!0;q++}return r.attributesNum!==q||r.index!==C}function g(F,G,X,C){let Y={},j=G.attributes,q=0,ut=X.getAttributes();for(let K in ut)if(ut[K].location>=0){let lt=j[K];lt===void 0&&(K==="instanceMatrix"&&F.instanceMatrix&&(lt=F.instanceMatrix),K==="instanceColor"&&F.instanceColor&&(lt=F.instanceColor));let Ft={};Ft.attribute=lt,lt&&lt.data&&(Ft.data=lt.data),Y[K]=Ft,q++}r.attributes=Y,r.attributesNum=q,r.index=C}function _(){let F=r.newAttributes;for(let G=0,X=F.length;G<X;G++)F[G]=0}function u(F){m(F,0)}function m(F,G){let X=r.newAttributes,C=r.enabledAttributes,Y=r.attributeDivisors;X[F]=1,C[F]===0&&(i.enableVertexAttribArray(F),C[F]=1),Y[F]!==G&&(i.vertexAttribDivisor(F,G),Y[F]=G)}function S(){let F=r.newAttributes,G=r.enabledAttributes;for(let X=0,C=G.length;X<C;X++)G[X]!==F[X]&&(i.disableVertexAttribArray(X),G[X]=0)}function E(F,G,X,C,Y,j,q){q===!0?i.vertexAttribIPointer(F,G,X,Y,j):i.vertexAttribPointer(F,G,X,C,Y,j)}function M(F,G,X,C){_();let Y=C.attributes,j=X.getAttributes(),q=G.defaultAttributeValues;for(let ut in j){let K=j[ut];if(K.location>=0){let rt=Y[ut];if(rt===void 0&&(ut==="instanceMatrix"&&F.instanceMatrix&&(rt=F.instanceMatrix),ut==="instanceColor"&&F.instanceColor&&(rt=F.instanceColor)),rt!==void 0){let lt=rt.normalized,Ft=rt.itemSize,It=t.get(rt);if(It===void 0)continue;let $=It.buffer,bt=It.type,Dt=It.bytesPerElement,Ot=bt===i.INT||bt===i.UNSIGNED_INT||rt.gpuType===wo;if(rt.isInterleavedBufferAttribute){let Tt=rt.data,Xt=Tt.isInterleavedBuffer===!0?Tt.stride:Tt.itemSize,ve=rt.offset;if(Tt.isInstancedInterleavedBuffer||Tt.isInstancedBufferAttribute){for(let Gt=0;Gt<K.locationSize;Gt++)m(K.location+Gt,Tt.meshPerAttribute);F.isInstancedMesh!==!0&&C._maxInstanceCount===void 0&&(C._maxInstanceCount=Tt.meshPerAttribute*Tt.count)}else for(let Gt=0;Gt<K.locationSize;Gt++)u(K.location+Gt);i.bindBuffer(i.ARRAY_BUFFER,$);for(let Gt=0;Gt<K.locationSize;Gt++)E(K.location+Gt,Ft/K.locationSize,bt,lt,Xt*Dt,(ve+Ft/K.locationSize*Gt)*Dt,Ot)}else{if(rt.isInstancedBufferAttribute){for(let Tt=0;Tt<K.locationSize;Tt++)m(K.location+Tt,rt.meshPerAttribute);F.isInstancedMesh!==!0&&C._maxInstanceCount===void 0&&(C._maxInstanceCount=rt.meshPerAttribute*rt.count)}else for(let Tt=0;Tt<K.locationSize;Tt++)u(K.location+Tt);i.bindBuffer(i.ARRAY_BUFFER,$);for(let Tt=0;Tt<K.locationSize;Tt++)E(K.location+Tt,Ft/K.locationSize,bt,lt,Ft*Dt,Ft/K.locationSize*Tt*Dt,Ot)}}else if(q!==void 0){let lt=q[ut];if(lt!==void 0)switch(lt.length){case 2:i.vertexAttrib2fv(K.location,lt);break;case 3:i.vertexAttrib3fv(K.location,lt);break;case 4:i.vertexAttrib4fv(K.location,lt);break;default:i.vertexAttrib1fv(K.location,lt)}}}}S()}function A(){O();for(let F in n){let G=n[F];for(let X in G){let C=G[X];for(let Y in C){let j=C[Y];for(let q in j)h(j[q].object),delete j[q];delete C[Y]}}delete n[F]}}function T(F){if(n[F.id]===void 0)return;let G=n[F.id];for(let X in G){let C=G[X];for(let Y in C){let j=C[Y];for(let q in j)h(j[q].object),delete j[q];delete C[Y]}}delete n[F.id]}function x(F){for(let G in n){let X=n[G];for(let C in X){let Y=X[C];if(Y[F.id]===void 0)continue;let j=Y[F.id];for(let q in j)h(j[q].object),delete j[q];delete Y[F.id]}}}function b(F){for(let G in n){let X=n[G],C=F.isInstancedMesh===!0?F.id:0,Y=X[C];if(Y!==void 0){for(let j in Y){let q=Y[j];for(let ut in q)h(q[ut].object),delete q[ut];delete Y[j]}delete X[C],Object.keys(X).length===0&&delete n[G]}}}function O(){P(),a=!0,r!==s&&(r=s,l(r.object))}function P(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:O,resetDefaultState:P,dispose:A,releaseStatesOfGeometry:T,releaseStatesOfObject:b,releaseStatesOfProgram:x,initAttributes:_,enableAttribute:u,disableUnusedAttributes:S}}function ig(i,t,e){let n;function s(c){n=c}function r(c,l){i.drawArrays(n,c,l),e.update(l,n,1)}function a(c,l,h){h!==0&&(i.drawArraysInstanced(n,c,l,h),e.update(l,n,h))}function o(c,l,h){if(h===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,l,0,h);let d=0;for(let p=0;p<h;p++)d+=l[p];e.update(d,n,1)}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o}function sg(i,t,e,n){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){let x=t.get("EXT_texture_filter_anisotropic");s=i.getParameter(x.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(x){return!(x!==zn&&n.convert(x)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(x){let b=x===Bn&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(x!==hn&&x!==In&&!b&&n.convert(x)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE))}function c(x){if(x==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";x="mediump"}return x==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=e.precision!==void 0?e.precision:"highp",h=c(l);h!==l&&(Zt("WebGLRenderer:",l,"not supported, using",h,"instead."),l=h);let f=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control"),d=e.logarithmicDepthBuffer===!0&&f===!1;e.reversedDepthBuffer===!0&&f===!1&&Zt("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer."),e.logarithmicDepthBuffer===!0&&f===!0&&Zt("WebGLRenderer: Logarithmic depth buffer is ignored when reversed depth buffer is enabled.");let p=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=i.getParameter(i.MAX_TEXTURE_SIZE),u=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),m=i.getParameter(i.MAX_VERTEX_ATTRIBS),S=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),E=i.getParameter(i.MAX_VARYING_VECTORS),M=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),A=i.getParameter(i.MAX_SAMPLES),T=i.getParameter(i.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:a,textureTypeReadable:o,precision:l,logarithmicDepthBuffer:d,reversedDepthBuffer:f,maxTextures:p,maxVertexTextures:g,maxTextureSize:_,maxCubemapSize:u,maxAttributes:m,maxVertexUniforms:S,maxVaryings:E,maxFragmentUniforms:M,maxSamples:A,samples:T}}function rg(i){let t=this,e=null,n=0,s=!1,r=!1,a=new xn,o=new ne,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(f,d){let p=f.length!==0||d||n!==0||s;return s=d,n=f.length,p},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(f,d){e=h(f,d,0)},this.setState=function(f,d,p){let g=f.clippingPlanes,_=f.clipIntersection,u=f.clipShadows,m=i.get(f);if(!s||g===null||g.length===0||r&&!u)r?h(null):l();else{let S=r?0:n,E=S*4,M=m.clippingState||null;c.value=M,M=h(g,d,E,p);for(let A=0;A!==E;++A)M[A]=e[A];m.clippingState=M,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=S}};function l(){c.value!==e&&(c.value=e,c.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(f,d,p,g){let _=f!==null?f.length:0,u=null;if(_!==0){if(u=c.value,g!==!0||u===null){let m=p+_*4,S=d.matrixWorldInverse;o.getNormalMatrix(S),(u===null||u.length<m)&&(u=new Float32Array(m));for(let E=0,M=p;E!==_;++E,M+=4)a.copy(f[E]).applyMatrix4(S,o),a.normal.toArray(u,M),u[M+3]=a.constant}c.value=u,c.needsUpdate=!0}return t.numPlanes=_,t.numIntersection=0,u}}var ra=class extends Mn{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;let n={width:t,height:t,depth:1},s=[n,n,n,n,n,n];this.texture=new Sr(s),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new Kt(5,5,5),r=new $n({name:"CubemapFromEquirect",uniforms:ss(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:je,blending:Qi});r.uniforms.tEquirect.value=e;let a=new ft(s,r),o=e.minFilter;return e.minFilter===gi&&(e.minFilter=on),new Hs(1,10,this).update(t,a),e.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(t,e=!0,n=!0,s=!0){let r=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(e,n,s);t.setRenderTarget(r)}},ku=256,ag=3,og=20,ud=256,dd=16,lg=3,cg=new N,hg=new re,Ys=class i{constructor(t){this._renderer=t,this._cubeSize=0,this._sourceTarget=null,this._cubeCamera=new Hs(1,10,null),this._boxMesh=new ft(new Kt(5,5,5),null),this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null,this._integrationMaterial=null}fromScene(t,e=0,n=.1,s=100,r={}){let{size:a=256,position:o=cg}=r,c=this._renderer;this._setSize(a);let l=this._allocateTarget(),h=this._getSourceTarget(!0);e>0&&(h.texture.mipmapsAutoUpdate=!1);let f=c.autoClear,d=c.autoClearColor,p=c.autoClearDepth,g=c.autoClearStencil,_=t.background;c.autoClear=!0,c.autoClearColor=!0,c.autoClearDepth=!0,c.autoClearStencil=!0,_===null&&(t.background=c.getClearColor(hg));let u=new Hs(n,s,h);return u.position.copy(o),u.update(c,t),c.autoClear=f,c.autoClearColor=d,c.autoClearDepth=p,c.autoClearStencil=g,t.background=_,e>0&&(h.texture.mipmapsAutoUpdate=!0,this._blur(l,e)),this._applyPMREM(l),l}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Xu(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Wu(),this._compileMaterial(this._equirectMaterial))}dispose(){this._sourceTarget!==null&&this._sourceTarget.dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._integrationMaterial!==null&&this._integrationMaterial.dispose(),this._boxMesh.geometry.dispose()}static lodToRoughness(t,e){return e>0?1-Math.sqrt(1-t/e):0}_setSize(t){this._cubeSize=Math.max(ku,Cc(t))}_fromTexture(t,e){t.mapping===es||t.mapping===Ws?this._setSize(t.image.length===0?ku:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4);let n=e||this._allocateTarget();return this._textureToCubemap(t),this._applyPMREM(n),n}_allocateTarget(){let t=this._cubeSize,e=Vu(t,!1,!1),n=Math.log2(t)-ag;for(let s=0;s<=n;s++)e.texture.mipmaps.push({width:t>>s,height:t>>s});return e.texture.name="PMREM",e.texture.isPMREMTexture=!0,e}_getSourceTarget(t=!1){let e=this._cubeSize,n=this._sourceTarget;return(n===null||n.width!==e||t&&n.depthBuffer===!1)&&(n!==null&&n.dispose(),this._sourceTarget=Vu(e,!0,t)),this._sourceTarget}_compileMaterial(t){this._boxMesh.material=t,this._renderer.compile(this._boxMesh,this._cubeCamera.children[0])}_renderCube(t,e,n){let s=this._boxMesh,r=this._cubeCamera;s.material=n,r.renderTarget=t,r.activeMipmapLevel=e;let a=t.width>>e;t.viewport.set(0,0,a,a),r.update(this._renderer,s),t.viewport.set(0,0,t.width,t.height)}_textureToCubemap(t){let e;t.mapping===es||t.mapping===Ws?(this._cubemapMaterial===null&&(this._cubemapMaterial=Xu()),e=this._cubemapMaterial,e.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):(this._equirectMaterial===null&&(this._equirectMaterial=Wu()),e=this._equirectMaterial),e.uniforms.envMap.value=t,this._renderCube(this._getSourceTarget(),0,e)}_applyPMREM(t){this._ggxMaterial===null&&(this._ggxMaterial=ug(),this._integrationMaterial=dg());let e=this._cubeSize,n=t.texture.mipmaps.length-1,s=this._ggxMaterial.uniforms;s.envMap.value=this._sourceTarget.texture;let r=this._integrationMaterial.uniforms;r.envMap.value=this._sourceTarget.texture,r.sourceLod.value=Math.log2(e/dd);for(let a=0;a<=n;a++){let o=i.lodToRoughness(a,n);if(a>n-lg)r.roughness.value=o,this._renderCube(t,a,this._integrationMaterial);else{let c=o>0?Math.log2(e)+.5*Math.log2(6/(ud*Math.pow(o,4)))+.5:0;s.roughness.value=o,s.lodBias.value=c,this._renderCube(t,a,this._ggxMaterial)}}}_blur(t,e){this._blurMaterial===null&&(this._blurMaterial=fg());let n=this._blurMaterial,s=n.uniforms,r=this._sourceTarget;s.sigma.value=Math.min(e,Math.PI)/Math.SQRT2,s.envMap.value=r.texture,this._renderCube(t,0,n),s.envMap.value=t.texture,this._renderCube(r,0,n)}};function Vu(i,t,e){return new ra(i,{minFilter:gi,generateMipmaps:t,type:Bn,colorSpace:fr,depthBuffer:e})}function aa(i,t,e){return new $n({name:i,uniforms:t,vertexShader:ce.cube_vert,fragmentShader:e,side:je,blending:Qi,depthTest:!1,depthWrite:!1})}function ug(){return aa("PMREMGGXConvolution",{envMap:{value:null},roughness:{value:0},lodBias:{value:0}},`

		#define GGX_SAMPLES ${ud}u

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float roughness;
		uniform float lodBias;

		#include <common>

		// Van der Corput radical inverse
		float radicalInverse_VdC( uint bits ) {

			bits = ( bits << 16u ) | ( bits >> 16u );
			bits = ( ( bits & 0x55555555u ) << 1u ) | ( ( bits & 0xAAAAAAAAu ) >> 1u );
			bits = ( ( bits & 0x33333333u ) << 2u ) | ( ( bits & 0xCCCCCCCCu ) >> 2u );
			bits = ( ( bits & 0x0F0F0F0Fu ) << 4u ) | ( ( bits & 0xF0F0F0F0u ) >> 4u );
			bits = ( ( bits & 0x00FF00FFu ) << 8u ) | ( ( bits & 0xFF00FF00u ) >> 8u );
			return float( bits ) * 2.3283064365386963e-10; // / 0x100000000

		}

		// Hammersley sequence
		vec2 hammersley( uint i, uint N ) {

			return vec2( float( i ) / float( N ), radicalInverse_VdC( i ) );

		}

		void main() {

			vec3 N = normalize( vWorldDirection );

			// For very low roughness, just sample the environment directly
			if ( roughness < 0.001 ) {

				gl_FragColor = vec4( textureLod( envMap, N, 0.0 ).rgb, 1.0 );
				return;

			}

			float alpha = roughness * roughness;
			float alpha2 = alpha * alpha;

			// Tangent space basis for VNDF sampling
			vec3 up = abs( N.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
			vec3 tangent = normalize( cross( up, N ) );
			vec3 bitangent = cross( N, tangent );

			vec3 prefilteredColor = vec3( 0.0 );
			float totalWeight = 0.0;

			for ( uint i = 0u; i < GGX_SAMPLES; i ++ ) {

				vec2 Xi = hammersley( i, GGX_SAMPLES );

				// With V = N, sample the reflected direction directly.
				float invQ = 1.0 / ( 1.0 - Xi.x + alpha2 * Xi.x );
				float NdotL = ( 1.0 - Xi.x - alpha2 * Xi.x ) * invQ;

				if ( NdotL > 0.0 ) {

					float phi = 2.0 * PI * Xi.y;
					float sinTheta = 2.0 * alpha * sqrt( Xi.x * ( 1.0 - Xi.x ) ) * invQ;
					vec3 L = N * NdotL + ( tangent * cos( phi ) + bitangent * sin( phi ) ) * sinTheta;

					// Match the source mip to the sample's solid angle. The terms
					// independent of the sample are precomputed in lodBias.
					float d = alpha2 * invQ;
					float lod = max( log2( d ) + lodBias, 0.0 );

					// Weight by NdotL for the split-sum approximation
					prefilteredColor += textureLod( envMap, L, lod ).rgb * NdotL;
					totalWeight += NdotL;

				}

			}

			gl_FragColor = vec4( prefilteredColor / totalWeight, 1.0 );

		}
	`)}function dg(){return aa("PMREMGGXIntegration",{envMap:{value:null},roughness:{value:0},sourceLod:{value:0},sourceSize:{value:dd}},`

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float roughness;
		uniform float sourceLod;
		uniform int sourceSize;

		void main() {

			vec3 N = normalize( vWorldDirection );

			float alpha = roughness * roughness;
			float alpha2 = alpha * alpha;

			float texelSize = 2.0 / float( sourceSize );

			vec3 prefilteredColor = vec3( 0.0 );
			float totalWeight = 0.0;

			// Pair opposite texels: only the one in N's hemisphere contributes.
			for ( int face = 0; face < 3; face ++ ) {

				for ( int y = 0; y < sourceSize; y ++ ) {

					for ( int x = 0; x < sourceSize; x ++ ) {

						vec2 uv = ( vec2( x, y ) + 0.5 ) * texelSize - 1.0;
						vec3 texelDirection = face == 0 ? vec3( 1.0, uv ) : ( face == 1 ? vec3( uv.x, 1.0, uv.y ) : vec3( uv, 1.0 ) );

						float invDistance = inversesqrt( 1.0 + dot( uv, uv ) );
						float NdotL = dot( N, texelDirection );
						texelDirection *= NdotL < 0.0 ? - 1.0 : 1.0;
						NdotL = abs( NdotL ) * invDistance;

						// With V = N, NdotH squared is ( 1 + NdotL ) / 2. Common factors
						// in the GGX distribution and texel solid angle cancel when normalized.
						float d = 1.0 + alpha2 + ( alpha2 - 1.0 ) * NdotL;
						float weight = NdotL * invDistance * invDistance * invDistance / ( d * d );

						prefilteredColor += textureLod( envMap, texelDirection, sourceLod ).rgb * weight;
						totalWeight += weight;

					}

				}

			}

			gl_FragColor = vec4( prefilteredColor / totalWeight, 1.0 );

		}
	`)}function fg(){return aa("PMREMSphericalGaussianBlur",{envMap:{value:null},sigma:{value:0}},`

		#define SAMPLES ${og}
		#define GOLDEN_ANGLE 2.39996322973

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float sigma;

		#include <common>

		void main() {

			vec3 outputDirection = normalize( vWorldDirection );

			vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
			vec3 tangent = normalize( cross( up, outputDirection ) );
			vec3 bitangent = cross( outputDirection, tangent );

			// Truncate the kernel at three standard deviations or at the antipode.
			float thetaMax = min( 3.0 * sigma, PI );
			float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

			vec3 accumColor = vec3( 0.0 );
			float accumWeight = 0.0;

			for ( int i = 0; i < SAMPLES; i ++ ) {

				// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
				float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
				float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
				float phi = float( i ) * GOLDEN_ANGLE;

				vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
				vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

				// Correct the planar sample density to solid angle.
				float weight = sin( theta ) / theta;

				accumColor += weight * textureLod( envMap, sampleDirection, 0.0 ).rgb;
				accumWeight += weight;

			}

			gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

		}
	`)}function Wu(){return aa("PMREMEquirectangularToCubemap",{envMap:{value:null}},`

		varying vec3 vWorldDirection;

		uniform sampler2D envMap;

		#include <common>

		void main() {

			// Average four subpixel samples to preserve small, bright features.
			vec3 direction = normalize( vWorldDirection );
			vec3 dx = dFdx( direction ) * 0.25;
			vec3 dy = dFdy( direction ) * 0.25;

			vec3 color = textureLod( envMap, equirectUv( normalize( direction - dx - dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction + dx - dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction - dx + dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction + dx + dy ) ), 0.0 ).rgb;
			gl_FragColor = vec4( color * 0.25, 1.0 );

		}
	`)}function Xu(){return aa("PMREMCubemapToCubemap",{envMap:{value:null},flipEnvMap:{value:-1}},`

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float flipEnvMap;

		void main() {

			gl_FragColor = vec4( textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) ).rgb, 1.0 );

		}
	`)}function pg(i){let t=new WeakMap,e=new WeakMap,n=null;function s(d,p=!1){return d==null?null:p?a(d):r(d)}function r(d){if(d&&d.isTexture){let p=d.mapping;if(p===bo||p===Eo)if(t.has(d)){let g=t.get(d).texture;return o(g,d.mapping)}else{let g=d.image;if(g&&g.height>0){let _=new ra(g.height);return _.fromEquirectangularTexture(i,d),t.set(d,_),d.addEventListener("dispose",l),o(_.texture,d.mapping)}else return null}}return d}function a(d){if(d&&d.isTexture&&d.isPMREMTexture!==!0){let p=d.mapping,g=p===bo||p===Eo,_=p===es||p===Ws;if(g||_){let u=e.get(d),m=u!==void 0?u.texture.pmremVersion:0;if(d.isRenderTargetTexture&&d.pmremVersion!==m)return n===null&&(n=new Ys(i)),u=g?n.fromEquirectangular(d,u):n.fromCubemap(d,u),u.texture.pmremVersion=d.pmremVersion,e.set(d,u),u.texture;if(u!==void 0)return u.texture;{let S=d.image;return g&&S&&S.height>0||_&&S&&c(S)?(n===null&&(n=new Ys(i)),u=g?n.fromEquirectangular(d):n.fromCubemap(d),u.texture.pmremVersion=d.pmremVersion,e.set(d,u),d.addEventListener("dispose",h),u.texture):null}}}return d}function o(d,p){return p===bo?d.mapping=es:p===Eo&&(d.mapping=Ws),d}function c(d){let p=0,g=6;for(let _=0;_<g;_++)d[_]!==void 0&&p++;return p===g}function l(d){let p=d.target;p.removeEventListener("dispose",l);let g=t.get(p);g!==void 0&&(t.delete(p),g.dispose())}function h(d){let p=d.target;p.removeEventListener("dispose",h);let g=e.get(p);g!==void 0&&(e.delete(p),g.dispose())}function f(){t=new WeakMap,e=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:s,dispose:f}}function mg(i){let t={};function e(n){if(t[n]!==void 0)return t[n];let s=i.getExtension(n);return t[n]=s,s}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){let s=e(n);return s===null&&lr("WebGLRenderer: "+n+" extension not supported."),s}}}function gg(i,t,e,n){let s={},r=new WeakMap,a=new FinalizationRegistry(g=>delete s[g]);function o(g){c(g.target)}function c(g){g.index!==null&&t.remove(g.index);for(let u in g.attributes)t.remove(g.attributes[u]);g.removeEventListener("dispose",o),delete s[g.id],a.unregister(g);let _=r.get(g);_&&(t.remove(_),r.delete(g)),n.releaseStatesOfGeometry(g),g.isInstancedBufferGeometry===!0&&delete g._maxInstanceCount,e.memory.geometries--}function l(g,_){return s[_.id]!==void 0||(_.addEventListener("dispose",o),s[_.id]=new WeakRef(_),a.register(_,_.id,_),e.memory.geometries++),_}function h(g){let _=g.attributes;for(let u in _)t.update(_[u],i.ARRAY_BUFFER)}function f(g){let _=g.index,u=g.attributes.position,m=0;if(u===void 0)return;let S=_!==null?_.array.length:u.array.length/3-1,E=u.count>=65535?yr:xr,M=new E(Math.ceil(S/3)*6,1),A=M.array;if(_!==null){let x=_.array;m=_.version;for(let b=0,O=0;b<S;b+=3){let P=x[b+0],F=x[b+1],G=x[b+2];A[O++]=P,A[O++]=F,A[O++]=F,A[O++]=G,A[O++]=G,A[O++]=P}}else{m=u.version;for(let x=0,b=0;x<S;x+=3){let O=x+0,P=x+1,F=x+2;A[b++]=O,A[b++]=P,A[b++]=P,A[b++]=F,A[b++]=F,A[b++]=O}}M.version=m;let T=r.get(g);T&&t.remove(T),r.set(g,M)}function d(g){let _=r.get(g);if(_){let u=g.index;u!==null&&_.version<u.version&&f(g)}else f(g);return r.get(g)}function p(){for(let g in s){let _=s[g].deref();_!==void 0&&c(_)}}return{get:l,update:h,getWireframeAttribute:d,dispose:p}}function _g(i,t,e){let n;function s(f){n=f}let r,a;function o(f){r=f.type,a=f.bytesPerElement}function c(f,d){i.drawElements(n,d,r,f*a),e.update(d,n,1)}function l(f,d,p){p!==0&&(i.drawElementsInstanced(n,d,r,f*a,p),e.update(d,n,p))}function h(f,d,p){if(p===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,d,0,r,f,0,p);let _=0;for(let u=0;u<p;u++)_+=d[u];e.update(_,n,1)}this.setMode=s,this.setIndex=o,this.render=c,this.renderInstances=l,this.renderMultiDraw=h}function xg(i){let t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(e.calls++,a){case i.TRIANGLES:e.triangles+=o*(r/3);break;case i.LINES:e.lines+=o*(r/2);break;case i.LINE_STRIP:e.lines+=o*(r-1);break;case i.LINE_LOOP:e.lines+=o*r;break;case i.POINTS:e.points+=o*r;break;default:te("WebGLInfo: Unknown draw mode:",a);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:n}}function yg(i,t,e){let n=new WeakMap,s=new Ie;function r(a,o,c){let l=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,f=h!==void 0?h.length:0,d=n.get(o);if(d===void 0||d.count!==f){let O=function(){x.dispose(),n.delete(o),o.removeEventListener("dispose",O)};d!==void 0&&d.texture.dispose();let p=o.morphAttributes.position!==void 0,g=o.morphAttributes.normal!==void 0,_=o.morphAttributes.color!==void 0,u=o.morphAttributes.position||[],m=o.morphAttributes.normal||[],S=o.morphAttributes.color||[],E=0;p===!0&&(E=1),g===!0&&(E=2),_===!0&&(E=3);let M=o.attributes.position.count*E,A=1;M>t.maxTextureSize&&(A=Math.ceil(M/t.maxTextureSize),M=t.maxTextureSize);let T=new Float32Array(M*A*4*f),x=new gr(T,M,A,f);x.type=In,x.needsUpdate=!0;let b=E*4;for(let P=0;P<f;P++){let F=u[P],G=m[P],X=S[P],C=M*A*4*P;for(let Y=0;Y<F.count;Y++){let j=Y*b;p===!0&&(s.fromBufferAttribute(F,Y),T[C+j+0]=s.x,T[C+j+1]=s.y,T[C+j+2]=s.z,T[C+j+3]=0),g===!0&&(s.fromBufferAttribute(G,Y),T[C+j+4]=s.x,T[C+j+5]=s.y,T[C+j+6]=s.z,T[C+j+7]=0),_===!0&&(s.fromBufferAttribute(X,Y),T[C+j+8]=s.x,T[C+j+9]=s.y,T[C+j+10]=s.z,T[C+j+11]=X.itemSize===4?s.w:1)}}d={count:f,texture:x,size:new yt(M,A)},n.set(o,d),o.addEventListener("dispose",O)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)c.getUniforms().setValue(i,"morphTexture",a.morphTexture,e);else{let p=0;for(let _=0;_<l.length;_++)p+=l[_];let g=o.morphTargetsRelative?1:1-p;c.getUniforms().setValue(i,"morphTargetBaseInfluence",g),c.getUniforms().setValue(i,"morphTargetInfluences",l)}c.getUniforms().setValue(i,"morphTargetsTexture",d.texture,e),c.getUniforms().setValue(i,"morphTargetsTextureSize",d.size)}return{update:r}}function vg(i,t,e,n,s){let r=new WeakMap;function a(l){let h=s.render.frame,f=l.geometry,d=t.get(l,f);if(r.get(d)!==h&&(t.update(d),r.set(d,h)),l.isInstancedMesh&&(l.hasEventListener("dispose",c)===!1&&l.addEventListener("dispose",c),r.get(l)!==h&&(e.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,i.ARRAY_BUFFER),r.set(l,h))),l.isSkinnedMesh){let p=l.skeleton;r.get(p)!==h&&(p.update(),r.set(p,h))}return d}function o(){r=new WeakMap}function c(l){let h=l.target;h.removeEventListener("dispose",c),n.releaseStatesOfObject(h),e.remove(h.instanceMatrix),h.instanceColor!==null&&e.remove(h.instanceColor)}return{update:a,dispose:o}}var Mg={[hc]:"LINEAR_TONE_MAPPING",[uc]:"REINHARD_TONE_MAPPING",[dc]:"CINEON_TONE_MAPPING",[Zr]:"ACES_FILMIC_TONE_MAPPING",[pc]:"AGX_TONE_MAPPING",[mc]:"NEUTRAL_TONE_MAPPING",[fc]:"CUSTOM_TONE_MAPPING"};function Sg(i,t,e,n,s,r){let a=new Mn(t,e,{type:i,depthBuffer:s,stencilBuffer:r,samples:n?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),o=null,c=null,l=null,h=new Je;h.setAttribute("position",new ye([-1,3,0,-1,-1,0,3,-1,0],3)),h.setAttribute("uv",new ye([0,2,0,0,2,0],2));let f=new ao({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),d=new ft(h,f),p=new Wr(-1,1,1,-1,0,1),g=null,_=null,u=!1,m,S=null,E=[],M=!1;this.setSize=function(A,T){a.setSize(A,T),o!==null&&o.setSize(A,T),c!==null&&c.setSize(A,T);for(let x=0;x<E.length;x++){let b=E[x];b.setSize&&b.setSize(A,T)}},this.setEffects=function(A){E=A,M=E.length>0&&E[0].isRenderPass===!0;let T=a.width,x=a.height;E.length>0&&o===null&&(o=new Mn(T,x,{type:Bn,depthBuffer:!1,stencilBuffer:!1}),c=new Mn(T,x,{type:Bn,depthBuffer:!1,stencilBuffer:!1}));let b=s===!0&&E.some(O=>O.needsDepthTexture===!0);b!==(a.depthTexture!==null)&&(b===!0&&l===null&&(l=new pi(T,x),r===!0&&(l.format=_i,l.type=ns)),a.dispose(),a.depthTexture=b?l:null,a.resolveDepthBuffer=b,a.storeMultisampledDepthBuffer=b);for(let O=0;O<E.length;O++){let P=E[O];P.setSize&&P.setSize(T,x),b&&P.needsDepthTexture===!0&&P.setDepthTexture&&P.setDepthTexture(l)}},this.begin=function(A,T){if(u||A.toneMapping===Jn&&E.length===0)return!1;if(S=T,T!==null){let x=T.width,b=T.height;(a.width!==x||a.height!==b)&&this.setSize(x,b)}return M===!1&&A.setRenderTarget(a),m=A.toneMapping,A.toneMapping=Jn,!0},this.hasRenderPass=function(){return M},this.end=function(A,T){A.toneMapping=m,u=!0;let x=a,b=o;for(let O=0;O<E.length;O++){let P=E[O];P.enabled!==!1&&(P.render(A,b,x,T),P.needsSwap!==!1&&(x=b,b=b===o?c:o))}if(g!==A.outputColorSpace||_!==A.toneMapping){g=A.outputColorSpace,_=A.toneMapping,f.defines={},de.getTransfer(g)===Ee&&(f.defines.SRGB_TRANSFER="");let O=Mg[_];O&&(f.defines[O]=""),f.needsUpdate=!0}f.uniforms.tDiffuse.value=x.texture,A.setRenderTarget(S),A.render(d,p),S=null,u=!1},this.isCompositing=function(){return u},this.dispose=function(){a.dispose(),o!==null&&o.dispose(),c!==null&&c.dispose(),h.dispose(),f.dispose()}}var fd=new ln,pd=new pi(1,1),md=new Er(1),gd=new gr,_d=new Ja,xd=new Sr,qu=[],Yu=[],Zu=new Float32Array(16),$u=new Float32Array(9),Ju=new Float32Array(4);function Zs(i,t,e){let n=i[0];if(n<=0||n>0)return i;let s=t*e,r=qu[s];if(r===void 0&&(r=new Float32Array(s),qu[s]=r),t!==0){n.toArray(r,0);for(let a=1,o=0;a!==t;++a)o+=e,i[a].toArray(r,o)}return r}function Ve(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function We(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function dl(i,t){let e=Yu[t];e===void 0&&(e=new Int32Array(t),Yu[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function bg(i,t){let e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function Eg(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ve(e,t))return;i.uniform2fv(this.addr,t),We(e,t)}}function Tg(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Ve(e,t))return;i.uniform3fv(this.addr,t),We(e,t)}}function wg(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ve(e,t))return;i.uniform4fv(this.addr,t),We(e,t)}}function Ag(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(Ve(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),We(e,t)}else{if(Ve(e,n))return;Ju.set(n),i.uniformMatrix2fv(this.addr,!1,Ju),We(e,n)}}function Rg(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(Ve(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),We(e,t)}else{if(Ve(e,n))return;$u.set(n),i.uniformMatrix3fv(this.addr,!1,$u),We(e,n)}}function Cg(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(Ve(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),We(e,t)}else{if(Ve(e,n))return;Zu.set(n),i.uniformMatrix4fv(this.addr,!1,Zu),We(e,n)}}function Pg(i,t){let e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function Ig(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ve(e,t))return;i.uniform2iv(this.addr,t),We(e,t)}}function Lg(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ve(e,t))return;i.uniform3iv(this.addr,t),We(e,t)}}function Dg(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ve(e,t))return;i.uniform4iv(this.addr,t),We(e,t)}}function Ng(i,t){let e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function Ug(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ve(e,t))return;i.uniform2uiv(this.addr,t),We(e,t)}}function Fg(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ve(e,t))return;i.uniform3uiv(this.addr,t),We(e,t)}}function Og(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ve(e,t))return;i.uniform4uiv(this.addr,t),We(e,t)}}function fl(i){return i.version===0&&(i.compareFunction=Tc,i.needsUpdate=!0),i}function Bg(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?r=fl(pd):r=fd,e.setTexture2D(t||r,s)}function zg(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture3D(t||_d,s)}function Hg(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_CUBE_SHADOW?r=fl(md):r=xd,e.setTextureCube(t||r,s)}function Gg(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture2DArray(t||gd,s)}function kg(i){switch(i){case 5126:return bg;case 35664:return Eg;case 35665:return Tg;case 35666:return wg;case 35674:return Ag;case 35675:return Rg;case 35676:return Cg;case 5124:case 35670:return Pg;case 35667:case 35671:return Ig;case 35668:case 35672:return Lg;case 35669:case 35673:return Dg;case 5125:return Ng;case 36294:return Ug;case 36295:return Fg;case 36296:return Og;case 35678:case 36198:case 36298:case 36306:case 35682:return Bg;case 35679:case 36299:case 36307:return zg;case 35680:case 36300:case 36308:case 36293:return Hg;case 36289:case 36303:case 36311:case 36292:return Gg}}function Vg(i,t){i.uniform1fv(this.addr,t)}function Wg(i,t){let e=Zs(t,this.size,2);i.uniform2fv(this.addr,e)}function Xg(i,t){let e=Zs(t,this.size,3);i.uniform3fv(this.addr,e)}function qg(i,t){let e=Zs(t,this.size,4);i.uniform4fv(this.addr,e)}function Yg(i,t){let e=Zs(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function Zg(i,t){let e=Zs(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function $g(i,t){let e=Zs(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function Jg(i,t){i.uniform1iv(this.addr,t)}function Kg(i,t){i.uniform2iv(this.addr,t)}function jg(i,t){i.uniform3iv(this.addr,t)}function Qg(i,t){i.uniform4iv(this.addr,t)}function t_(i,t){i.uniform1uiv(this.addr,t)}function e_(i,t){i.uniform2uiv(this.addr,t)}function n_(i,t){i.uniform3uiv(this.addr,t)}function i_(i,t){i.uniform4uiv(this.addr,t)}function s_(i,t,e){let n=this.cache,s=t.length,r=dl(e,s);Ve(n,r)||(i.uniform1iv(this.addr,r),We(n,r));let a;this.type===i.SAMPLER_2D_SHADOW?a=fl(pd):a=fd;for(let o=0;o!==s;++o)e.setTexture2D(t[o]||a,r[o])}function r_(i,t,e){let n=this.cache,s=t.length,r=dl(e,s);Ve(n,r)||(i.uniform1iv(this.addr,r),We(n,r));for(let a=0;a!==s;++a)e.setTexture3D(t[a]||_d,r[a])}function a_(i,t,e){let n=this.cache,s=t.length,r=dl(e,s);Ve(n,r)||(i.uniform1iv(this.addr,r),We(n,r));let a;this.type===i.SAMPLER_CUBE_SHADOW?a=fl(md):a=xd;for(let o=0;o!==s;++o)e.setTextureCube(t[o]||a,r[o])}function o_(i,t,e){let n=this.cache,s=t.length,r=dl(e,s);Ve(n,r)||(i.uniform1iv(this.addr,r),We(n,r));for(let a=0;a!==s;++a)e.setTexture2DArray(t[a]||gd,r[a])}function l_(i){switch(i){case 5126:return Vg;case 35664:return Wg;case 35665:return Xg;case 35666:return qg;case 35674:return Yg;case 35675:return Zg;case 35676:return $g;case 5124:case 35670:return Jg;case 35667:case 35671:return Kg;case 35668:case 35672:return jg;case 35669:case 35673:return Qg;case 5125:return t_;case 36294:return e_;case 36295:return n_;case 36296:return i_;case 35678:case 36198:case 36298:case 36306:case 35682:return s_;case 35679:case 36299:case 36307:return r_;case 35680:case 36300:case 36308:case 36293:return a_;case 36289:case 36303:case 36311:case 36292:return o_}}var Wc=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=kg(e.type)}},Xc=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=l_(e.type)}},qc=class{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){let s=this.seq;for(let r=0,a=s.length;r!==a;++r){let o=s[r];o.setValue(t,e[o.id],n)}}},kc=/(\w+)(\])?(\[|\.)?/g;function Ku(i,t){i.seq.push(t),i.map[t.id]=t}function c_(i,t,e){let n=i.name,s=n.length;for(kc.lastIndex=0;;){let r=kc.exec(n),a=kc.lastIndex,o=r[1],c=r[2]==="]",l=r[3];if(c&&(o=o|0),l===void 0||l==="["&&a+2===s){Ku(e,l===void 0?new Wc(o,i,t):new Xc(o,i,t));break}else{let f=e.map[o];f===void 0&&(f=new qc(o),Ku(e,f)),e=f}}}var qs=class{constructor(t,e){this.seq=[],this.map={};let n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let a=0;a<n;++a){let o=t.getActiveUniform(e,a),c=t.getUniformLocation(e,o.name);c_(o,c,this)}let s=[],r=[];for(let a of this.seq)a.type===t.SAMPLER_2D_SHADOW||a.type===t.SAMPLER_CUBE_SHADOW||a.type===t.SAMPLER_2D_ARRAY_SHADOW?s.push(a):r.push(a);s.length>0&&(this.seq=s.concat(r))}setValue(t,e,n,s){let r=this.map[e];r!==void 0&&r.setValue(t,n,s)}setOptional(t,e,n){let s=e[n];s!==void 0&&this.setValue(t,n,s)}static upload(t,e,n,s){for(let r=0,a=e.length;r!==a;++r){let o=e[r],c=n[o.id];c.needsUpdate!==!1&&o.setValue(t,c.value,s)}}static seqWithValue(t,e){let n=[];for(let s=0,r=t.length;s!==r;++s){let a=t[s];a.id in e&&n.push(a)}return n}};function ju(i,t,e){let n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}var h_=37297,u_=0;function d_(i,t){let e=i.split(`
`),n=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let a=s;a<r;a++){let o=a+1;n.push(`${o===t?">":" "} ${o}: ${e[a]}`)}return n.join(`
`)}var Qu=new ne;function f_(i){de._getMatrix(Qu,de.workingColorSpace,i);let t=`mat3( ${Qu.elements.map(e=>e.toFixed(4))} )`;switch(de.getTransfer(i)){case pr:return[t,"LinearTransferOETF"];case Ee:return[t,"sRGBTransferOETF"];default:return Zt("WebGLProgram: Unsupported color space: ",i),[t,"LinearTransferOETF"]}}function td(i,t,e){let n=i.getShaderParameter(t,i.COMPILE_STATUS),r=(i.getShaderInfoLog(t)||"").trim();if(n&&r==="")return"";let a=/ERROR: 0:(\d+)/.exec(r);if(a){let o=parseInt(a[1]);return e.toUpperCase()+`

`+r+`

`+d_(i.getShaderSource(t),o)}else return r}function p_(i,t){let e=f_(t);return[`vec4 ${i}( vec4 value ) {`,`	return ${e[1]}( vec4( ${e[0]} * value.rgb, value.a ) );`,"}"].join(`
`)}var m_={[hc]:"Linear",[uc]:"Reinhard",[dc]:"Cineon",[Zr]:"ACESFilmic",[pc]:"AgX",[mc]:"Neutral",[fc]:"Custom"};function g_(i,t){let e=m_[t];return e===void 0?(Zt("WebGLProgram: Unsupported toneMapping:",t),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}var hl=new N;function __(){de.getLuminanceCoefficients(hl);let i=hl.x.toFixed(4),t=hl.y.toFixed(4),e=hl.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function x_(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(sa).join(`
`)}function y_(i){let t=[];for(let e in i){let n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function v_(i,t){let e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){let r=i.getActiveAttrib(t,s),a=r.name,o=1;r.type===i.FLOAT_MAT2&&(o=2),r.type===i.FLOAT_MAT3&&(o=3),r.type===i.FLOAT_MAT4&&(o=4),e[a]={type:r.type,location:i.getAttribLocation(t,a),locationSize:o}}return e}function sa(i){return i!==""}function ed(i,t){let e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_SUN_LIGHTS/g,t.numSunLights).replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,t.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows).replace(/NUM_LIGHT_PROBE_GRIDS/g,t.numLightProbeGrids)}function nd(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var M_=/^[ \t]*#include +<([\w\d./]+)>/gm;function Yc(i){return i.replace(M_,S_)}function S_(i,t){let e=ce[t];if(e===void 0)throw new Error("THREE.WebGLProgram: Can not resolve #include <"+t+">");return Yc(e)}var b_=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function id(i){return i.replace(b_,E_)}function E_(i,t,e,n){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function sd(i){let t=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?t+=`
#define HIGH_PRECISION`:i.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}var T_={[ji]:"SHADOWMAP_TYPE_PCF",[ks]:"SHADOWMAP_TYPE_VSM"};function w_(i){return T_[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var A_={[Ws]:"ENVMAP_MODE_REFRACTION"};function R_(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":A_[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}var C_={[So]:"ENVMAP_BLENDING_MULTIPLY",[gu]:"ENVMAP_BLENDING_MIX",[_u]:"ENVMAP_BLENDING_ADD"};function P_(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":C_[i.combine]||"ENVMAP_BLENDING_NONE"}function I_(i,t,e,n){let s=i.getContext(),r=e.defines,a=e.vertexShader,o=e.fragmentShader,c=w_(e),l=e.envMapPMREM===!0?"ENVMAP_TYPE_PMREM":"ENVMAP_TYPE_CUBE",h=R_(e),f=P_(e),d=x_(e),p=y_(r),g=s.createProgram(),_,u,m=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(_=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,p].filter(sa).join(`
`),_.length>0&&(_+=`
`),u=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,p].filter(sa).join(`
`),u.length>0&&(u+=`
`)):(_=[sd(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,p,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.diffuseRoughnessMap?"#define USE_DIFFUSE_ROUGHNESSMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.diffuseRoughnessMapUv?"#define DIFFUSE_ROUGHNESSMAP_UV "+e.diffuseRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexNormals?"#define HAS_NORMAL":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(sa).join(`
`),u=[sd(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,p,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+l:"",e.envMap?"#define "+h:"",e.envMap?"#define "+f:"",e.envMapPMREM?"#define ENVMAP_MAX_LOD "+e.envMapMaxLod+".0":"",e.envMapPMREM?"#define ENVMAP_SIZE "+e.envMapSize+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.diffuseRoughness?"#define USE_DIFFUSE_ROUGHNESS":"",e.diffuseRoughnessMap?"#define USE_DIFFUSE_ROUGHNESSMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.retroreflection?"#define USE_RETROREFLECTION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor?"#define USE_COLOR":"",e.vertexAlphas||e.batchingColor?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Jn?"#define TONE_MAPPING":"",e.toneMapping!==Jn?ce.tonemapping_pars_fragment:"",e.toneMapping!==Jn?g_("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",ce.colorspace_pars_fragment,p_("linearToOutputTexel",e.outputColorSpace),__(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(sa).join(`
`)),a=Yc(a),a=ed(a,e),a=nd(a,e),o=Yc(o),o=ed(o,e),o=nd(o,e),a=id(a),o=id(o),e.isRawShaderMaterial!==!0&&(m=`#version 300 es
`,_=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+_,u=["#define varying in",e.glslVersion===wc?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===wc?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+u);let S=m+_+a,E=m+u+o,M=ju(s,s.VERTEX_SHADER,S),A=ju(s,s.FRAGMENT_SHADER,E);s.attachShader(g,M),s.attachShader(g,A),e.index0AttributeName!==void 0?s.bindAttribLocation(g,0,e.index0AttributeName):e.hasPositionAttribute===!0&&s.bindAttribLocation(g,0,"position"),s.linkProgram(g);function T(P){if(i.debug.checkShaderErrors){let F=s.getProgramInfoLog(g)||"",G=s.getShaderInfoLog(M)||"",X=s.getShaderInfoLog(A)||"",C=F.trim(),Y=G.trim(),j=X.trim(),q=!0,ut=!0;if(s.getProgramParameter(g,s.LINK_STATUS)===!1)if(q=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,g,M,A);else{let K=td(s,M,"vertex"),rt=td(s,A,"fragment");te("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(g,s.VALIDATE_STATUS)+`

Material Name: `+P.name+`
Material Type: `+P.type+`

Program Info Log: `+C+`
`+K+`
`+rt)}else C!==""?Zt("WebGLProgram: Program Info Log:",C):(Y===""||j==="")&&(ut=!1);ut&&(P.diagnostics={runnable:q,programLog:C,vertexShader:{log:Y,prefix:_},fragmentShader:{log:j,prefix:u}})}s.deleteShader(M),s.deleteShader(A),x=new qs(s,g),b=v_(s,g)}let x;this.getUniforms=function(){return x===void 0&&T(this),x};let b;this.getAttributes=function(){return b===void 0&&T(this),b};let O=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return O===!1&&(O=s.getProgramParameter(g,h_)),O},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(g),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=u_++,this.cacheKey=t,this.usedTimes=1,this.program=g,this.vertexShader=M,this.fragmentShader=A,this}var L_=0,Zc=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t,e,n){let s=this._getShaderCacheForMaterial(t);return s.has(e)===!1&&(s.add(e),e.usedTimes++),s.has(n)===!1&&(s.add(n),n.usedTimes++),this}remove(t){let e=this.materialCache.get(t);for(let n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderStage(t){return this._getShaderStage(t.vertexShader)}getFragmentShaderStage(t){return this._getShaderStage(t.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){let e=this.materialCache,n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){let e=this.shaderCache,n=e.get(t);return n===void 0&&(n=new $c(t),e.set(t,n)),n}},$c=class{constructor(t){this.id=L_++,this.code=t,this.usedTimes=0}};function D_(i){return i===Oi||i===ta||i===ea}function N_(i,t,e,n,s,r){let a=new Ds,o=new Zc,c=new Set,l=[],h=new Map,f=n.logarithmicDepthBuffer,d={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function p(x){return c.add(x),x===0?"uv":`uv${x}`}function g(x,b,O,P,F,G){let X=P.fog,C=F.geometry,Y=x.isMeshStandardMaterial||x.isMeshLambertMaterial||x.isMeshPhongMaterial?P.environment:null,j=x.isMeshStandardMaterial||x.isMeshLambertMaterial&&!x.envMap||x.isMeshPhongMaterial&&!x.envMap,q=t.get(x.envMap||Y,j),ut=d[x.type],K=n.precision;x.precision!==null&&(K=n.getMaxPrecision(x.precision),K!==x.precision&&Zt("WebGLProgram.getParameters:",x.precision,"not supported, using",K,"instead."));let rt=C.morphAttributes.position||C.morphAttributes.normal||C.morphAttributes.color,lt=rt!==void 0?rt.length:0,Ft=0;C.morphAttributes.position!==void 0&&(Ft=1),C.morphAttributes.normal!==void 0&&(Ft=2),C.morphAttributes.color!==void 0&&(Ft=3);let It,$,bt,Dt;if(ut){let dt=jn[ut];It=dt.vertexShader,$=dt.fragmentShader}else{It=x.vertexShader,$=x.fragmentShader;let dt=o.getVertexShaderStage(x),oe=o.getFragmentShaderStage(x);o.update(x,dt,oe),bt=dt.id,Dt=oe.id}let Ot=i.getRenderTarget(),Tt=i.state.buffers.depth.getReversed(),Xt=F.isInstancedMesh===!0,ve=F.isBatchedMesh===!0,Gt=!!x.map,jt=!!x.matcap,ie=!!q,st=ie&&q.isPMREMTexture===!0,vt=!!x.aoMap,Mt=!!x.lightMap,Nt=!!x.bumpMap&&x.wireframe===!1,wt=!!x.normalMap,Qt=!!x.displacementMap,zt=!!x.emissiveMap,ae=!!x.metalnessMap,se=!!x.roughnessMap,ee=x.anisotropy>0,D=x.clearcoat>0,Ce=x.diffuseRoughness>0,$t=x.dispersion>0,ge=x.retroreflectivity>0,St=x.iridescence>0,Te=x.sheen>0,kt=x.transmission>0,Yt=ee&&!!x.anisotropyMap,w=D&&!!x.clearcoatMap,y=D&&!!x.clearcoatNormalMap,k=D&&!!x.clearcoatRoughnessMap,pt=Ce&&!!x.diffuseRoughnessMap,at=St&&!!x.iridescenceMap,gt=St&&!!x.iridescenceThicknessMap,Ct=Te&&!!x.sheenColorMap,Q=Te&&!!x.sheenRoughnessMap,nt=!!x.specularMap,At=!!x.specularColorMap,R=!!x.specularIntensityMap,it=kt&&!!x.transmissionMap,tt=kt&&!!x.thicknessMap,Rt=!!x.gradientMap,I=!!x.alphaMap,V=x.alphaTest>0,J=!!x.alphaHash,ct=!!x.extensions,Z=Jn;x.toneMapped&&(Ot===null||Ot.isXRRenderTarget===!0)&&(Z=i.toneMapping);let ht=st?q.isCompressedCubeTexture?q.image[0].mipmaps:q.mipmaps:null,Lt={shaderID:ut,shaderType:x.type,shaderName:x.name,vertexShader:It,fragmentShader:$,defines:x.defines,customVertexShaderID:bt,customFragmentShaderID:Dt,isRawShaderMaterial:x.isRawShaderMaterial===!0,glslVersion:x.glslVersion,precision:K,batching:ve,batchingColor:ve&&F._colorsTexture!==null,instancing:Xt,instancingColor:Xt&&F.instanceColor!==null,instancingMorph:Xt&&F.morphTexture!==null,outputColorSpace:Ot===null?i.outputColorSpace:Ot.isXRRenderTarget===!0?Ot.texture.colorSpace:de.workingColorSpace,alphaToCoverage:!!x.alphaToCoverage,map:Gt,matcap:jt,envMap:ie,envMapMode:ie&&q.mapping,envMapPMREM:st,envMapMaxLod:st?ht.length-1:null,envMapSize:st?ht[0].width:null,aoMap:vt,lightMap:Mt,bumpMap:Nt,normalMap:wt,displacementMap:Qt,emissiveMap:zt,normalMapObjectSpace:wt&&x.normalMapType===vu,normalMapTangentSpace:wt&&x.normalMapType===na,packedNormalMap:wt&&x.normalMapType===na&&D_(x.normalMap.format),metalnessMap:ae,roughnessMap:se,anisotropy:ee,anisotropyMap:Yt,clearcoat:D,clearcoatMap:w,clearcoatNormalMap:y,clearcoatRoughnessMap:k,diffuseRoughness:Ce,diffuseRoughnessMap:pt,dispersion:$t,retroreflection:ge,iridescence:St,iridescenceMap:at,iridescenceThicknessMap:gt,sheen:Te,sheenColorMap:Ct,sheenRoughnessMap:Q,specularMap:nt,specularColorMap:At,specularIntensityMap:R,transmission:kt,transmissionMap:it,thicknessMap:tt,gradientMap:Rt,opaque:x.transparent===!1&&x.blending===Vs&&x.alphaToCoverage===!1,alphaMap:I,alphaTest:V,alphaHash:J,combine:x.combine,mapUv:Gt&&p(x.map.channel),aoMapUv:vt&&p(x.aoMap.channel),lightMapUv:Mt&&p(x.lightMap.channel),bumpMapUv:Nt&&p(x.bumpMap.channel),normalMapUv:wt&&p(x.normalMap.channel),displacementMapUv:Qt&&p(x.displacementMap.channel),emissiveMapUv:zt&&p(x.emissiveMap.channel),metalnessMapUv:ae&&p(x.metalnessMap.channel),roughnessMapUv:se&&p(x.roughnessMap.channel),anisotropyMapUv:Yt&&p(x.anisotropyMap.channel),clearcoatMapUv:w&&p(x.clearcoatMap.channel),clearcoatNormalMapUv:y&&p(x.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:k&&p(x.clearcoatRoughnessMap.channel),diffuseRoughnessMapUv:pt&&p(x.diffuseRoughnessMap.channel),iridescenceMapUv:at&&p(x.iridescenceMap.channel),iridescenceThicknessMapUv:gt&&p(x.iridescenceThicknessMap.channel),sheenColorMapUv:Ct&&p(x.sheenColorMap.channel),sheenRoughnessMapUv:Q&&p(x.sheenRoughnessMap.channel),specularMapUv:nt&&p(x.specularMap.channel),specularColorMapUv:At&&p(x.specularColorMap.channel),specularIntensityMapUv:R&&p(x.specularIntensityMap.channel),transmissionMapUv:it&&p(x.transmissionMap.channel),thicknessMapUv:tt&&p(x.thicknessMap.channel),alphaMapUv:I&&p(x.alphaMap.channel),vertexTangents:!!C.attributes.tangent&&(wt||ee),vertexNormals:!!C.attributes.normal,vertexColors:x.vertexColors,vertexAlphas:x.vertexColors===!0&&!!C.attributes.color&&C.attributes.color.itemSize===4,pointsUvs:F.isPoints===!0&&!!C.attributes.uv&&(Gt||I),fog:!!X,useFog:x.fog===!0,fogExp2:!!X&&X.isFogExp2,flatShading:x.wireframe===!1&&(x.flatShading===!0||C.attributes.normal===void 0&&wt===!1&&(x.isMeshLambertMaterial||x.isMeshPhongMaterial||x.isMeshStandardMaterial||x.isMeshPhysicalMaterial)),sizeAttenuation:x.sizeAttenuation===!0,logarithmicDepthBuffer:f,reversedDepthBuffer:Tt,skinning:F.isSkinnedMesh===!0,hasPositionAttribute:C.attributes.position!==void 0,morphTargets:C.morphAttributes.position!==void 0,morphNormals:C.morphAttributes.normal!==void 0,morphColors:C.morphAttributes.color!==void 0,morphTargetsCount:lt,morphTextureStride:Ft,numSunLights:b.sun.length,numDirLights:b.directional.length,numPointLights:b.point.length,numSpotLights:b.spot.length,numSpotLightMaps:b.spotLightMap.length,numRectAreaLights:b.rectArea.length,numHemiLights:b.hemi.length,numSunLightShadows:b.sunShadowMap.length,numDirLightShadows:b.directionalShadowMap.length,numPointLightShadows:b.pointShadowMap.length,numSpotLightShadows:b.spotShadowMap.length,numSpotLightShadowsWithMaps:b.numSpotLightShadowsWithMaps,numLightProbes:b.numLightProbes,numLightProbeGrids:G.filter(dt=>dt.texture!==null).length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:x.dithering,shadowMapEnabled:i.shadowMap.enabled&&O.length>0,shadowMapType:i.shadowMap.type,toneMapping:Z,decodeVideoTexture:Gt&&x.map.isVideoTexture===!0&&de.getTransfer(x.map.colorSpace)===Ee,decodeVideoTextureEmissive:zt&&x.emissiveMap.isVideoTexture===!0&&de.getTransfer(x.emissiveMap.colorSpace)===Ee,premultipliedAlpha:x.premultipliedAlpha,doubleSided:x.side===cn,flipSided:x.side===je,useDepthPacking:x.depthPacking>=0,depthPacking:x.depthPacking||0,index0AttributeName:x.index0AttributeName,extensionClipCullDistance:ct&&x.extensions.clipCullDistance===!0&&e.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(ct&&x.extensions.multiDraw===!0||ve)&&e.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:e.has("KHR_parallel_shader_compile"),customProgramCacheKey:x.customProgramCacheKey()};return Lt.vertexUv1s=c.has(1),Lt.vertexUv2s=c.has(2),Lt.vertexUv3s=c.has(3),c.clear(),Lt}function _(x){let b=[];if(x.shaderID?b.push(x.shaderID):(b.push(x.customVertexShaderID),b.push(x.customFragmentShaderID)),x.defines!==void 0)for(let O in x.defines)b.push(O),b.push(x.defines[O]);return x.isRawShaderMaterial===!1&&(u(b,x),m(b,x),b.push(i.outputColorSpace)),b.push(x.customProgramCacheKey),b.join()}function u(x,b){x.push(b.precision),x.push(b.outputColorSpace),x.push(b.envMapMode),x.push(b.envMapPMREM),x.push(b.envMapMaxLod),x.push(b.envMapSize),x.push(b.mapUv),x.push(b.alphaMapUv),x.push(b.lightMapUv),x.push(b.aoMapUv),x.push(b.bumpMapUv),x.push(b.normalMapUv),x.push(b.displacementMapUv),x.push(b.emissiveMapUv),x.push(b.metalnessMapUv),x.push(b.roughnessMapUv),x.push(b.anisotropyMapUv),x.push(b.clearcoatMapUv),x.push(b.clearcoatNormalMapUv),x.push(b.clearcoatRoughnessMapUv),x.push(b.diffuseRoughnessMapUv),x.push(b.iridescenceMapUv),x.push(b.iridescenceThicknessMapUv),x.push(b.sheenColorMapUv),x.push(b.sheenRoughnessMapUv),x.push(b.specularMapUv),x.push(b.specularColorMapUv),x.push(b.specularIntensityMapUv),x.push(b.transmissionMapUv),x.push(b.thicknessMapUv),x.push(b.combine),x.push(b.fogExp2),x.push(b.sizeAttenuation),x.push(b.morphTargetsCount),x.push(b.numSunLights),x.push(b.numDirLights),x.push(b.numPointLights),x.push(b.numSpotLights),x.push(b.numSpotLightMaps),x.push(b.numHemiLights),x.push(b.numRectAreaLights),x.push(b.numSunLightShadows),x.push(b.numDirLightShadows),x.push(b.numPointLightShadows),x.push(b.numSpotLightShadows),x.push(b.numSpotLightShadowsWithMaps),x.push(b.numLightProbes),x.push(b.numLightProbeGrids),x.push(b.shadowMapType),x.push(b.toneMapping),x.push(b.numClippingPlanes),x.push(b.numClipIntersection),x.push(b.depthPacking)}function m(x,b){a.disableAll(),b.instancing&&a.enable(0),b.instancingColor&&a.enable(1),b.instancingMorph&&a.enable(2),b.matcap&&a.enable(3),b.envMap&&a.enable(4),b.normalMapObjectSpace&&a.enable(5),b.normalMapTangentSpace&&a.enable(6),b.clearcoat&&a.enable(7),b.iridescence&&a.enable(8),b.alphaTest&&a.enable(9),b.vertexColors&&a.enable(10),b.vertexAlphas&&a.enable(11),b.vertexUv1s&&a.enable(12),b.vertexUv2s&&a.enable(13),b.vertexUv3s&&a.enable(14),b.vertexTangents&&a.enable(15),b.anisotropy&&a.enable(16),b.alphaHash&&a.enable(17),b.batching&&a.enable(18),b.dispersion&&a.enable(19),b.retroreflection&&a.enable(24),b.diffuseRoughness&&a.enable(25),b.batchingColor&&a.enable(20),b.gradientMap&&a.enable(21),b.packedNormalMap&&a.enable(22),b.vertexNormals&&a.enable(23),x.push(a.mask),a.disableAll(),b.fog&&a.enable(0),b.useFog&&a.enable(1),b.flatShading&&a.enable(2),b.logarithmicDepthBuffer&&a.enable(3),b.reversedDepthBuffer&&a.enable(4),b.skinning&&a.enable(5),b.morphTargets&&a.enable(6),b.morphNormals&&a.enable(7),b.morphColors&&a.enable(8),b.premultipliedAlpha&&a.enable(9),b.shadowMapEnabled&&a.enable(10),b.doubleSided&&a.enable(11),b.flipSided&&a.enable(12),b.useDepthPacking&&a.enable(13),b.dithering&&a.enable(14),b.transmission&&a.enable(15),b.sheen&&a.enable(16),b.opaque&&a.enable(17),b.pointsUvs&&a.enable(18),b.decodeVideoTexture&&a.enable(19),b.decodeVideoTextureEmissive&&a.enable(20),b.alphaToCoverage&&a.enable(21),b.numLightProbeGrids>0&&a.enable(22),b.hasPositionAttribute&&a.enable(23),x.push(a.mask)}function S(x){let b=d[x.type],O;if(b){let P=jn[b];O=zu.clone(P.uniforms)}else O=x.uniforms;return O}function E(x,b){let O=h.get(b);return O!==void 0?++O.usedTimes:(O=new I_(i,b,x,s),l.push(O),h.set(b,O)),O}function M(x){if(--x.usedTimes===0){let b=l.indexOf(x);l[b]=l[l.length-1],l.pop(),h.delete(x.cacheKey),x.destroy()}}function A(x){o.remove(x)}function T(){o.dispose()}return{getParameters:g,getProgramCacheKey:_,getUniforms:S,acquireProgram:E,releaseProgram:M,releaseShaderCache:A,programs:l,dispose:T}}function U_(){let i=new WeakMap;function t(a){return i.has(a)}function e(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function s(a,o,c){i.get(a)[o]=c}function r(){i=new WeakMap}return{has:t,get:e,remove:n,update:s,dispose:r}}function F_(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.materialVariant!==t.materialVariant?i.materialVariant-t.materialVariant:i.z!==t.z?i.z-t.z:i.id-t.id}function rd(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function ad(){let i=[],t=0,e=[],n=[],s=[];function r(){t=0,e.length=0,n.length=0,s.length=0}function a(d){let p=0;return d.isInstancedMesh&&(p+=2),d.isSkinnedMesh&&(p+=1),p}function o(d,p,g,_,u,m){let S=i[t];return S===void 0?(S={id:d.id,object:d,geometry:p,material:g,materialVariant:a(d),groupOrder:_,renderOrder:d.renderOrder,z:u,group:m},i[t]=S):(S.id=d.id,S.object=d,S.geometry=p,S.material=g,S.materialVariant=a(d),S.groupOrder=_,S.renderOrder=d.renderOrder,S.z=u,S.group=m),t++,S}function c(d,p,g,_,u,m,S){S.reversedDepth===!0&&(u=-u);let E=o(d,p,g,_,u,m);g.transmission>0?n.push(E):g.transparent===!0?s.push(E):e.push(E)}function l(d,p,g,_,u,m){let S=o(d,p,g,_,u,m);g.transmission>0?n.unshift(S):g.transparent===!0?s.unshift(S):e.unshift(S)}function h(d,p){e.length>1&&e.sort(d||F_),n.length>1&&n.sort(p||rd),s.length>1&&s.sort(p||rd)}function f(){for(let d=t,p=i.length;d<p;d++){let g=i[d];if(g.id===null)break;g.id=null,g.object=null,g.geometry=null,g.material=null,g.group=null}}return{opaque:e,transmissive:n,transparent:s,init:r,push:c,unshift:l,finish:f,sort:h}}function O_(){let i=new WeakMap;function t(n,s){let r=i.get(n),a;return r===void 0?(a=new ad,i.set(n,[a])):s>=r.length?(a=new ad,r.push(a)):a=r[s],a}function e(){i=new WeakMap}return{get:t,dispose:e}}function B_(){let i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={direction:new N,color:new re};break;case"SpotLight":e={position:new N,direction:new N,color:new re,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new N,color:new re,distance:0,decay:0};break;case"HemisphereLight":e={direction:new N,skyColor:new re,groundColor:new re};break;case"RectAreaLight":e={color:new re,position:new N,halfWidth:new N,halfHeight:new N};break}return i[t.id]=e,e}}}function z_(){let i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new yt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new yt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new yt,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}var H_=0;function G_(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function k_(i){let t=new B_,e=z_(),n={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new N);let s=new N,r=new xe,a=new xe;function o(l){let h=0,f=0,d=0;for(let G=0;G<9;G++)n.probe[G].set(0,0,0);let p=0,g=0,_=0,u=0,m=0,S=0,E=0,M=0,A=0,T=0,x=0,b=0,O=0,P=0;l.sort(G_);for(let G=0,X=l.length;G<X;G++){let C=l[G],Y=C.color,j=C.intensity,q=C.distance,ut=null;if(C.shadow&&C.shadow.map&&(C.shadow.map.texture.format===Oi?ut=C.shadow.map.texture:ut=C.shadow.map.depthTexture||C.shadow.map.texture),C.isAmbientLight)h+=Y.r*j,f+=Y.g*j,d+=Y.b*j;else if(C.isLightProbe){for(let K=0;K<9;K++)n.probe[K].addScaledVector(C.sh.coefficients[K],j);P++}else if(C.isSunLight){let K=t.get(C);if(K.color.copy(C.color).multiplyScalar(C.intensity),C.castShadow){let rt=C.shadow,lt=e.get(C);lt.shadowIntensity=rt.intensity,lt.shadowBias=rt.bias,lt.shadowNormalBias=rt.normalBias,lt.shadowRadius=rt.radius,lt.shadowMapSize.copy(rt.mapSize).multiply(rt.getFrameExtents()),n.sunShadow[g]=lt,n.sunShadowMap[g]=ut;let Ft=rt.getViewportCount();for(let It=0;It<Ft;It++)n.sunShadowMatrix[_+It]=rt.getMatrix(It),n.sunShadowCascade[_+It]=rt._cascadeData[It];_+=Ft,g++}n.sun[p]=K,p++}else if(C.isDirectionalLight){let K=t.get(C);if(K.color.copy(C.color).multiplyScalar(C.intensity),C.castShadow){let rt=C.shadow,lt=e.get(C);lt.shadowIntensity=rt.intensity,lt.shadowBias=rt.bias,lt.shadowNormalBias=rt.normalBias,lt.shadowRadius=rt.radius,lt.shadowMapSize=rt.mapSize,n.directionalShadow[u]=lt,n.directionalShadowMap[u]=ut,n.directionalShadowMatrix[u]=C.shadow.matrix,A++}n.directional[u]=K,u++}else if(C.isSpotLight){let K=t.get(C);K.position.setFromMatrixPosition(C.matrixWorld),K.color.copy(Y).multiplyScalar(j),K.distance=q,K.coneCos=Math.cos(C.angle),K.penumbraCos=Math.cos(C.angle*(1-C.penumbra)),K.decay=C.decay,n.spot[S]=K;let rt=C.shadow;if(C.map&&(n.spotLightMap[b]=C.map,b++,rt.updateMatrices(C),C.castShadow&&O++),n.spotLightMatrix[S]=rt.matrix,C.castShadow){let lt=e.get(C);lt.shadowIntensity=rt.intensity,lt.shadowBias=rt.bias,lt.shadowNormalBias=rt.normalBias,lt.shadowRadius=rt.radius,lt.shadowMapSize=rt.mapSize,n.spotShadow[S]=lt,n.spotShadowMap[S]=ut,x++}S++}else if(C.isRectAreaLight){let K=t.get(C);K.color.copy(Y).multiplyScalar(j),K.halfWidth.set(C.width*.5,0,0),K.halfHeight.set(0,C.height*.5,0),n.rectArea[E]=K,E++}else if(C.isPointLight){let K=t.get(C);if(K.color.copy(C.color).multiplyScalar(C.intensity),K.distance=C.distance,K.decay=C.decay,C.castShadow){let rt=C.shadow,lt=e.get(C);lt.shadowIntensity=rt.intensity,lt.shadowBias=rt.bias,lt.shadowNormalBias=rt.normalBias,lt.shadowRadius=rt.radius,lt.shadowMapSize=rt.mapSize,lt.shadowCameraNear=rt.camera.near,lt.shadowCameraFar=rt.camera.far,n.pointShadow[m]=lt,n.pointShadowMap[m]=ut,n.pointShadowMatrix[m]=C.shadow.matrix,T++}n.point[m]=K,m++}else if(C.isHemisphereLight){let K=t.get(C);K.skyColor.copy(C.color).multiplyScalar(j),K.groundColor.copy(C.groundColor).multiplyScalar(j),n.hemi[M]=K,M++}}E>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Ut.LTC_FLOAT_1,n.rectAreaLTC2=Ut.LTC_FLOAT_2):(n.rectAreaLTC1=Ut.LTC_HALF_1,n.rectAreaLTC2=Ut.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=f,n.ambient[2]=d;let F=n.hash;(F.sunLength!==p||F.directionalLength!==u||F.pointLength!==m||F.spotLength!==S||F.rectAreaLength!==E||F.hemiLength!==M||F.numSunShadows!==g||F.numDirectionalShadows!==A||F.numPointShadows!==T||F.numSpotShadows!==x||F.numSpotMaps!==b||F.numLightProbes!==P)&&(n.sun.length=p,n.directional.length=u,n.spot.length=S,n.rectArea.length=E,n.point.length=m,n.hemi.length=M,n.sunShadow.length=g,n.sunShadowMap.length=g,n.sunShadowMatrix.length=_,n.sunShadowCascade.length=_,n.directionalShadow.length=A,n.directionalShadowMap.length=A,n.directionalShadowMatrix.length=A,n.pointShadow.length=T,n.pointShadowMap.length=T,n.pointShadowMatrix.length=T,n.spotShadow.length=x,n.spotShadowMap.length=x,n.spotLightMatrix.length=x+b-O,n.spotLightMap.length=b,n.numSpotLightShadowsWithMaps=O,n.numLightProbes=P,F.sunLength=p,F.directionalLength=u,F.pointLength=m,F.spotLength=S,F.rectAreaLength=E,F.hemiLength=M,F.numSunShadows=g,F.numDirectionalShadows=A,F.numPointShadows=T,F.numSpotShadows=x,F.numSpotMaps=b,F.numLightProbes=P,n.version=H_++)}function c(l,h){let f=0,d=0,p=0,g=0,_=0,u=0,m=h.matrixWorldInverse;for(let S=0,E=l.length;S<E;S++){let M=l[S];if(M.isSunLight){let A=n.sun[f];A.direction.setFromMatrixPosition(M.matrixWorld),A.direction.transformDirection(m),f++}else if(M.isDirectionalLight){let A=n.directional[d];A.direction.setFromMatrixPosition(M.matrixWorld),s.setFromMatrixPosition(M.target.matrixWorld),A.direction.sub(s),A.direction.transformDirection(m),d++}else if(M.isSpotLight){let A=n.spot[g];A.position.setFromMatrixPosition(M.matrixWorld),A.position.applyMatrix4(m),A.direction.setFromMatrixPosition(M.matrixWorld),s.setFromMatrixPosition(M.target.matrixWorld),A.direction.sub(s),A.direction.transformDirection(m),g++}else if(M.isRectAreaLight){let A=n.rectArea[_];A.position.setFromMatrixPosition(M.matrixWorld),A.position.applyMatrix4(m),a.identity(),r.copy(M.matrixWorld),r.premultiply(m),a.extractRotation(r),A.halfWidth.set(M.width*.5,0,0),A.halfHeight.set(0,M.height*.5,0),A.halfWidth.applyMatrix4(a),A.halfHeight.applyMatrix4(a),_++}else if(M.isPointLight){let A=n.point[p];A.position.setFromMatrixPosition(M.matrixWorld),A.position.applyMatrix4(m),p++}else if(M.isHemisphereLight){let A=n.hemi[u];A.direction.setFromMatrixPosition(M.matrixWorld),A.direction.transformDirection(m),u++}}}return{setup:o,setupView:c,state:n}}function od(i){let t=new k_(i),e=[],n=[],s=[];function r(f){h.camera=f,e.length=0,n.length=0,s.length=0}function a(f){f.isLightProbeGrid?s.push(f):e.push(f)}function o(f){n.push(f)}function c(){t.setup(e),s.sort((f,d)=>f.priority-d.priority||f.id-d.id)}function l(f){t.setupView(e,f)}let h={lightsArray:e,shadowsArray:n,lightProbeGridArray:s,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:h,setupLights:c,setupLightsView:l,pushLight:a,pushShadow:o}}function V_(i){let t=new WeakMap;function e(s,r=0){let a=t.get(s),o;return a===void 0?(o=new od(i),t.set(s,[o])):r>=a.length?(o=new od(i),a.push(o)):o=a[r],o}function n(){t=new WeakMap}return{get:e,dispose:n}}var W_=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,X_=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,q_=[new N(1,0,0),new N(-1,0,0),new N(0,1,0),new N(0,-1,0),new N(0,0,1),new N(0,0,-1)],Y_=[new N(0,-1,0),new N(0,-1,0),new N(0,0,1),new N(0,0,-1),new N(0,-1,0),new N(0,-1,0)],ld=new xe,ia=new N,Vc=new N;function Z_(i,t,e){let n=new Ci,s=new yt,r=new yt,a=new Ie,o=new oo,c=new lo,l={},h=e.maxTextureSize,f={[Fi]:je,[je]:Fi,[cn]:cn},d=new $n({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new yt},radius:{value:4}},vertexShader:W_,fragmentShader:X_}),p=d.clone();p.defines.HORIZONTAL_PASS=1;let g=new Je;g.setAttribute("position",new yn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let _=new ft(g,d),u=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=ji;let m=this.type;this.render=function(T,x,b){if(u.enabled===!1||u.autoUpdate===!1&&u.needsUpdate===!1||T.length===0)return;this.type===Kh&&(Zt("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=ji);let O=i.getRenderTarget(),P=i.getActiveCubeFace(),F=i.getActiveMipmapLevel(),G=i.state;G.setBlending(Qi),G.buffers.depth.getReversed()===!0?G.buffers.color.setClear(0,0,0,0):G.buffers.color.setClear(1,1,1,1),G.buffers.depth.setTest(!0),G.setScissorTest(!1);let X=m!==this.type;X&&x.traverse(function(C){C.material&&(Array.isArray(C.material)?C.material.forEach(Y=>Y.needsUpdate=!0):C.material.needsUpdate=!0)});for(let C=0,Y=T.length;C<Y;C++){let j=T[C],q=j.shadow;if(q===void 0){Zt("WebGLShadowMap:",j,"has no shadow.");continue}if(q.autoUpdate===!1&&q.needsUpdate===!1)continue;s.copy(q.mapSize);let ut=q.getFrameExtents();s.multiply(ut),r.copy(q.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/ut.x),s.x=r.x*ut.x,q.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/ut.y),s.y=r.y*ut.y,q.mapSize.y=r.y));let K=i.state.buffers.depth.getReversed();if(q.camera._reversedDepth=K,q.map===null||X===!0){if(q.map!==null&&(q.map.depthTexture!==null&&(q.map.depthTexture.dispose(),q.map.depthTexture=null),q.map.dispose()),this.type===ks){if(j.isPointLight){Zt("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}q.map=new Mn(s.x,s.y,{format:Oi,type:Bn,minFilter:on,magFilter:on,generateMipmaps:!1}),q.map.texture.name=j.name+".shadowMap",q.map.depthTexture=new pi(s.x,s.y,In),q.map.depthTexture.name=j.name+".shadowMapDepth",q.map.depthTexture.format=di,q.map.depthTexture.compareFunction=null,q.map.depthTexture.minFilter=$e,q.map.depthTexture.magFilter=$e}else j.isPointLight?(q.map=new ra(s.x),q.map.depthTexture=new Er(s.x,On)):(q.map=new Mn(s.x,s.y),q.map.depthTexture=new pi(s.x,s.y,On)),q.map.depthTexture.name=j.name+".shadowMap",q.map.depthTexture.format=di,this.type===ji?(q.map.depthTexture.compareFunction=K?Ec:bc,q.map.depthTexture.minFilter=on,q.map.depthTexture.magFilter=on):(q.map.depthTexture.compareFunction=null,q.map.depthTexture.minFilter=$e,q.map.depthTexture.magFilter=$e);q.camera.updateProjectionMatrix()}q.map.isWebGLCubeRenderTarget!==!0&&(q.map.width!==s.x||q.map.height!==s.y)&&q.map.setSize(s.x,s.y);let rt=q.map.isWebGLCubeRenderTarget?6:q.getViewportCount();j.isPointLight!==!0&&q.updateMatrices(j,b);let lt=(q.camera.layers.mask&4294967294)!==0?q.camera.layers:b.layers;for(let Ft=0;Ft<rt;Ft++){let It=q.getCamera(Ft);if(j.isPointLight){let $=q.camera,bt=q.matrix,Dt=j.distance||$.far;Dt!==$.far&&($.far=Dt,$.updateProjectionMatrix()),ia.setFromMatrixPosition(j.matrixWorld),$.position.copy(ia),Vc.copy($.position),Vc.add(q_[Ft]),$.up.copy(Y_[Ft]),$.lookAt(Vc),$.updateMatrixWorld(),bt.makeTranslation(-ia.x,-ia.y,-ia.z),ld.multiplyMatrices($.projectionMatrix,$.matrixWorldInverse),q._frustum.setFromProjectionMatrix(ld,$.coordinateSystem,$.reversedDepth)}if(q.map.isWebGLCubeRenderTarget)i.setRenderTarget(q.map,Ft),i.clear();else{Ft===0&&(i.setRenderTarget(q.map),i.clear());let $=q.getViewport(Ft);a.set(r.x*$.x,r.y*$.y,r.x*$.z,r.y*$.w),G.viewport(a)}n=q.getFrustum(Ft),M(x,b,It,j,lt,this.type)}q.isPointLightShadow!==!0&&this.type===ks&&S(q,b),q.needsUpdate=!1}m=this.type,u.needsUpdate=!1,i.setRenderTarget(O,P,F)};function S(T,x){let b=t.update(_);d.defines.VSM_SAMPLES!==T.blurSamples&&(d.defines.VSM_SAMPLES=T.blurSamples,p.defines.VSM_SAMPLES=T.blurSamples,d.needsUpdate=!0,p.needsUpdate=!0),T.mapPass===null?T.mapPass=new Mn(s.x,s.y,{format:Oi,type:Bn}):(T.mapPass.width!==T.map.width||T.mapPass.height!==T.map.height)&&T.mapPass.setSize(T.map.width,T.map.height),d.uniforms.shadow_pass.value=T.map.depthTexture,d.uniforms.resolution.value.set(T.map.width,T.map.height),d.uniforms.radius.value=T.radius,i.setRenderTarget(T.mapPass),i.clear(),i.renderBufferDirect(x,null,b,d,_,null),p.uniforms.shadow_pass.value=T.mapPass.texture,p.uniforms.resolution.value.set(T.map.width,T.map.height),p.uniforms.radius.value=T.radius,i.setRenderTarget(T.map),i.clear(),i.renderBufferDirect(x,null,b,p,_,null)}function E(T,x,b,O){let P=null,F=b.isPointLight===!0?T.customDistanceMaterial:T.customDepthMaterial;if(F!==void 0)P=F;else if(P=b.isPointLight===!0?c:o,i.localClippingEnabled&&x.clipShadows===!0&&Array.isArray(x.clippingPlanes)&&x.clippingPlanes.length!==0||x.displacementMap&&x.displacementScale!==0||x.alphaMap&&x.alphaTest>0||x.map&&x.alphaTest>0||x.alphaToCoverage===!0){let G=P.uuid,X=x.uuid,C=l[G];C===void 0&&(C={},l[G]=C);let Y=C[X];Y===void 0&&(Y=P.clone(),C[X]=Y,x.addEventListener("dispose",A)),P=Y}if(P.visible=x.visible,P.wireframe=x.wireframe,O===ks?P.side=x.shadowSide!==null?x.shadowSide:x.side:P.side=x.shadowSide!==null?x.shadowSide:f[x.side],P.alphaMap=x.alphaMap,P.alphaTest=x.alphaToCoverage===!0?.5:x.alphaTest,P.map=x.map,P.clipShadows=x.clipShadows,P.clippingPlanes=x.clippingPlanes,P.clipIntersection=x.clipIntersection,P.displacementMap=x.displacementMap,P.displacementScale=x.displacementScale,P.displacementBias=x.displacementBias,P.wireframeLinewidth=x.wireframeLinewidth,P.linewidth=x.linewidth,b.isPointLight===!0&&P.isMeshDistanceMaterial===!0){let G=i.properties.get(P);G.light=b}return P}function M(T,x,b,O,P,F){if(T.visible===!1)return;if(T.layers.test(P)&&(T.isMesh||T.isLine||T.isPoints)&&(T.castShadow||T.receiveShadow&&F===ks)&&(!T.frustumCulled||T.intersectsFrustum(n))){T.modelViewMatrix.multiplyMatrices(b.matrixWorldInverse,T.matrixWorld);let C=t.update(T),Y=T.material;if(Array.isArray(Y)){let j=C.groups;for(let q=0,ut=j.length;q<ut;q++){let K=j[q],rt=Y[K.materialIndex];if(rt&&rt.visible){let lt=E(T,rt,O,F);T.onBeforeShadow(i,T,x,b,C,lt,K),i.renderBufferDirect(b,null,C,lt,T,K),T.onAfterShadow(i,T,x,b,C,lt,K)}}}else if(Y.visible){let j=E(T,Y,O,F);T.onBeforeShadow(i,T,x,b,C,j,null),i.renderBufferDirect(b,null,C,j,T,null),T.onAfterShadow(i,T,x,b,C,j,null)}}let X=T.children;for(let C=0,Y=X.length;C<Y;C++)M(X[C],x,b,O,P,F)}function A(T){T.target.removeEventListener("dispose",A);for(let b in l){let O=l[b],P=T.target.uuid;P in O&&(O[P].dispose(),delete O[P])}}}function $_(i,t){function e(){let R=!1,it=new Ie,tt=null,Rt=new Ie(0,0,0,0);return{setMask:function(I){tt!==I&&!R&&(i.colorMask(I,I,I,I),tt=I)},setLocked:function(I){R=I},setClear:function(I,V,J,ct,Z){Z===!0&&(I*=ct,V*=ct,J*=ct),it.set(I,V,J,ct),Rt.equals(it)===!1&&(i.clearColor(I,V,J,ct),Rt.copy(it))},reset:function(){R=!1,tt=null,Rt.set(-1,0,0,0)}}}function n(){let R=!1,it=!1,tt=null,Rt=null,I=null;return{setReversed:function(V){if(it!==V){let J=t.get("EXT_clip_control");V?J.clipControlEXT(J.LOWER_LEFT_EXT,J.ZERO_TO_ONE_EXT):J.clipControlEXT(J.LOWER_LEFT_EXT,J.NEGATIVE_ONE_TO_ONE_EXT),it=V;let ct=I;I=null,this.setClear(ct)}},getReversed:function(){return it},setTest:function(V){V?Tt(i.DEPTH_TEST):Xt(i.DEPTH_TEST)},setMask:function(V){tt!==V&&!R&&(i.depthMask(V),tt=V)},setFunc:function(V){if(it&&(V=Iu[V]),Rt!==V){switch(V){case za:i.depthFunc(i.NEVER);break;case Ha:i.depthFunc(i.ALWAYS);break;case Ga:i.depthFunc(i.LESS);break;case As:i.depthFunc(i.LEQUAL);break;case ka:i.depthFunc(i.EQUAL);break;case Va:i.depthFunc(i.GEQUAL);break;case Wa:i.depthFunc(i.GREATER);break;case Xa:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}Rt=V}},setLocked:function(V){R=V},setClear:function(V){I!==V&&(I=V,it&&(V=1-V),i.clearDepth(V))},reset:function(){R=!1,tt=null,Rt=null,I=null,it=!1}}}function s(){let R=!1,it=null,tt=null,Rt=null,I=null,V=null,J=null,ct=null,Z=null;return{setTest:function(ht){R||(ht?Tt(i.STENCIL_TEST):Xt(i.STENCIL_TEST))},setMask:function(ht){it!==ht&&!R&&(i.stencilMask(ht),it=ht)},setFunc:function(ht,Lt,dt){(tt!==ht||Rt!==Lt||I!==dt)&&(i.stencilFunc(ht,Lt,dt),tt=ht,Rt=Lt,I=dt)},setOp:function(ht,Lt,dt){(V!==ht||J!==Lt||ct!==dt)&&(i.stencilOp(ht,Lt,dt),V=ht,J=Lt,ct=dt)},setLocked:function(ht){R=ht},setClear:function(ht){Z!==ht&&(i.clearStencil(ht),Z=ht)},reset:function(){R=!1,it=null,tt=null,Rt=null,I=null,V=null,J=null,ct=null,Z=null}}}let r=new e,a=new n,o=new s,c={},l=new WeakMap,h={},f={},d={},p=new WeakMap,g=[],_=null,u=!1,m=null,S=null,E=null,M=null,A=null,T=null,x=null,b=new re(0,0,0),O=0,P=!1,F=null,G=null,X=null,C=null,Y=null,j=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS),q=!1,ut=0,K=i.getParameter(i.VERSION);K.indexOf("WebGL")!==-1?(ut=parseFloat(/^WebGL (\d)/.exec(K)[1]),q=ut>=1):K.indexOf("OpenGL ES")!==-1&&(ut=parseFloat(/^OpenGL ES (\d)/.exec(K)[1]),q=ut>=2);let rt=null,lt={},Ft=i.getParameter(i.SCISSOR_BOX),It=i.getParameter(i.VIEWPORT),$=new Ie().fromArray(Ft),bt=new Ie().fromArray(It);function Dt(R,it,tt,Rt){let I=new Uint8Array(4),V=i.createTexture();i.bindTexture(R,V),i.texParameteri(R,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(R,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let J=0;J<tt;J++)R===i.TEXTURE_3D||R===i.TEXTURE_2D_ARRAY?i.texImage3D(it,0,i.RGBA,1,1,Rt,0,i.RGBA,i.UNSIGNED_BYTE,I):i.texImage2D(it+J,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,I);return V}let Ot={};Ot[i.TEXTURE_2D]=Dt(i.TEXTURE_2D,i.TEXTURE_2D,1),Ot[i.TEXTURE_CUBE_MAP]=Dt(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),Ot[i.TEXTURE_2D_ARRAY]=Dt(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),Ot[i.TEXTURE_3D]=Dt(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),Tt(i.DEPTH_TEST),a.setFunc(As),Nt(!1),wt(sc),Tt(i.CULL_FACE),vt(Qi);function Tt(R){h[R]!==!0&&(i.enable(R),h[R]=!0)}function Xt(R){h[R]!==!1&&(i.disable(R),h[R]=!1)}function ve(R,it){return d[R]!==it?(i.bindFramebuffer(R,it),d[R]=it,R===i.DRAW_FRAMEBUFFER&&(d[i.FRAMEBUFFER]=it),R===i.FRAMEBUFFER&&(d[i.DRAW_FRAMEBUFFER]=it),!0):!1}function Gt(R,it){let tt=g,Rt=!1;if(R){tt=p.get(it),tt===void 0&&(tt=[],p.set(it,tt));let I=R.textures;if(tt.length!==I.length||tt[0]!==i.COLOR_ATTACHMENT0){for(let V=0,J=I.length;V<J;V++)tt[V]=i.COLOR_ATTACHMENT0+V;tt.length=I.length,Rt=!0}}else tt[0]!==i.BACK&&(tt[0]=i.BACK,Rt=!0);Rt&&i.drawBuffers(tt)}function jt(R){return _!==R?(i.useProgram(R),_=R,!0):!1}let ie={[ts]:i.FUNC_ADD,[Qh]:i.FUNC_SUBTRACT,[tu]:i.FUNC_REVERSE_SUBTRACT};ie[eu]=i.MIN,ie[nu]=i.MAX;let st={[iu]:i.ZERO,[su]:i.ONE,[ru]:i.SRC_COLOR,[lc]:i.SRC_ALPHA,[uu]:i.SRC_ALPHA_SATURATE,[cu]:i.DST_COLOR,[ou]:i.DST_ALPHA,[au]:i.ONE_MINUS_SRC_COLOR,[cc]:i.ONE_MINUS_SRC_ALPHA,[hu]:i.ONE_MINUS_DST_COLOR,[lu]:i.ONE_MINUS_DST_ALPHA,[du]:i.CONSTANT_COLOR,[fu]:i.ONE_MINUS_CONSTANT_COLOR,[pu]:i.CONSTANT_ALPHA,[mu]:i.ONE_MINUS_CONSTANT_ALPHA};function vt(R,it,tt,Rt,I,V,J,ct,Z,ht){if(R===Qi){u===!0&&(Xt(i.BLEND),u=!1);return}if(u===!1&&(Tt(i.BLEND),u=!0),R!==jh){if(R!==m||ht!==P){if((S!==ts||A!==ts)&&(i.blendEquation(i.FUNC_ADD),S=ts,A=ts),ht)switch(R){case Vs:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case rc:i.blendFunc(i.ONE,i.ONE);break;case ac:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case oc:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:te("WebGLState: Invalid blending: ",R);break}else switch(R){case Vs:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case rc:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case ac:te("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case oc:te("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:te("WebGLState: Invalid blending: ",R);break}E=null,M=null,T=null,x=null,b.set(0,0,0),O=0,m=R,P=ht}return}I=I||it,V=V||tt,J=J||Rt,(it!==S||I!==A)&&(i.blendEquationSeparate(ie[it],ie[I]),S=it,A=I),(tt!==E||Rt!==M||V!==T||J!==x)&&(i.blendFuncSeparate(st[tt],st[Rt],st[V],st[J]),E=tt,M=Rt,T=V,x=J),(ct.equals(b)===!1||Z!==O)&&(i.blendColor(ct.r,ct.g,ct.b,Z),b.copy(ct),O=Z),m=R,P=!1}function Mt(R,it){R.side===cn?Xt(i.CULL_FACE):Tt(i.CULL_FACE);let tt=R.side===je;it&&(tt=!tt),Nt(tt),R.blending===Vs&&R.transparent===!1?vt(Qi):vt(R.blending,R.blendEquation,R.blendSrc,R.blendDst,R.blendEquationAlpha,R.blendSrcAlpha,R.blendDstAlpha,R.blendColor,R.blendAlpha,R.premultipliedAlpha),a.setFunc(R.depthFunc),a.setTest(R.depthTest),a.setMask(R.depthWrite),r.setMask(R.colorWrite);let Rt=R.stencilWrite;o.setTest(Rt),Rt&&(o.setMask(R.stencilWriteMask),o.setFunc(R.stencilFunc,R.stencilRef,R.stencilFuncMask),o.setOp(R.stencilFail,R.stencilZFail,R.stencilZPass)),zt(R.polygonOffset,R.polygonOffsetFactor,R.polygonOffsetUnits),R.alphaToCoverage===!0?Tt(i.SAMPLE_ALPHA_TO_COVERAGE):Xt(i.SAMPLE_ALPHA_TO_COVERAGE)}function Nt(R){F!==R&&(R?i.frontFace(i.CW):i.frontFace(i.CCW),F=R)}function wt(R){R!==$h?(Tt(i.CULL_FACE),R!==G&&(R===sc?i.cullFace(i.BACK):R===Jh?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):Xt(i.CULL_FACE),G=R}function Qt(R){R!==X&&(q&&i.lineWidth(R),X=R)}function zt(R,it,tt){R?(Tt(i.POLYGON_OFFSET_FILL),(C!==it||Y!==tt)&&(C=it,Y=tt,a.getReversed()&&(it=-it,tt=-tt),i.polygonOffset(it,tt))):Xt(i.POLYGON_OFFSET_FILL)}function ae(R){R?Tt(i.SCISSOR_TEST):Xt(i.SCISSOR_TEST)}function se(R){R===void 0&&(R=i.TEXTURE0+j-1),rt!==R&&(i.activeTexture(R),rt=R)}function ee(R,it,tt){tt===void 0&&(rt===null?tt=i.TEXTURE0+j-1:tt=rt);let Rt=lt[tt];Rt===void 0&&(Rt={type:void 0,texture:void 0},lt[tt]=Rt),(Rt.type!==R||Rt.texture!==it)&&(rt!==tt&&(i.activeTexture(tt),rt=tt),i.bindTexture(R,it||Ot[R]),Rt.type=R,Rt.texture=it)}function D(){let R=lt[rt];R!==void 0&&R.type!==void 0&&(i.bindTexture(R.type,null),R.type=void 0,R.texture=void 0)}function Ce(){try{i.compressedTexImage2D(...arguments)}catch(R){te("WebGLState:",R)}}function $t(){try{i.compressedTexImage3D(...arguments)}catch(R){te("WebGLState:",R)}}function ge(){try{i.texSubImage2D(...arguments)}catch(R){te("WebGLState:",R)}}function St(){try{i.texSubImage3D(...arguments)}catch(R){te("WebGLState:",R)}}function Te(){try{i.compressedTexSubImage2D(...arguments)}catch(R){te("WebGLState:",R)}}function kt(){try{i.compressedTexSubImage3D(...arguments)}catch(R){te("WebGLState:",R)}}function Yt(){try{i.texStorage2D(...arguments)}catch(R){te("WebGLState:",R)}}function w(){try{i.texStorage3D(...arguments)}catch(R){te("WebGLState:",R)}}function y(){try{i.texImage2D(...arguments)}catch(R){te("WebGLState:",R)}}function k(){try{i.texImage3D(...arguments)}catch(R){te("WebGLState:",R)}}function pt(R){return f[R]!==void 0?f[R]:i.getParameter(R)}function at(R,it){f[R]!==it&&(i.pixelStorei(R,it),f[R]=it)}function gt(R){$.equals(R)===!1&&(i.scissor(R.x,R.y,R.z,R.w),$.copy(R))}function Ct(R){bt.equals(R)===!1&&(i.viewport(R.x,R.y,R.z,R.w),bt.copy(R))}function Q(R,it){let tt=l.get(it);tt===void 0&&(tt=new WeakMap,l.set(it,tt));let Rt=tt.get(R);Rt===void 0&&(Rt=i.getUniformBlockIndex(it,R.name),i.uniformBlockBinding(it,Rt,Rt),tt.set(R,Rt))}function nt(R,it,tt){let I=l.get(it).get(R);c[I]!==tt&&(i.bindBufferBase(i.UNIFORM_BUFFER,I,tt),c[I]=tt)}function At(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),i.pixelStorei(i.PACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,!1),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,i.BROWSER_DEFAULT_WEBGL),i.pixelStorei(i.PACK_ROW_LENGTH,0),i.pixelStorei(i.PACK_SKIP_PIXELS,0),i.pixelStorei(i.PACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_ROW_LENGTH,0),i.pixelStorei(i.UNPACK_IMAGE_HEIGHT,0),i.pixelStorei(i.UNPACK_SKIP_PIXELS,0),i.pixelStorei(i.UNPACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_SKIP_IMAGES,0),h={},f={},rt=null,lt={},d={},c={},p=new WeakMap,g=[],_=null,u=!1,m=null,S=null,E=null,M=null,A=null,T=null,x=null,b=new re(0,0,0),O=0,P=!1,F=null,G=null,X=null,C=null,Y=null,$.set(0,0,i.canvas.width,i.canvas.height),bt.set(0,0,i.canvas.width,i.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:Tt,disable:Xt,bindFramebuffer:ve,drawBuffers:Gt,useProgram:jt,setBlending:vt,setMaterial:Mt,setFlipSided:Nt,setCullFace:wt,setLineWidth:Qt,setPolygonOffset:zt,setScissorTest:ae,activeTexture:se,bindTexture:ee,unbindTexture:D,compressedTexImage2D:Ce,compressedTexImage3D:$t,texImage2D:y,texImage3D:k,pixelStorei:at,getParameter:pt,updateUBOMapping:Q,uniformBlockBinding:nt,texStorage2D:Yt,texStorage3D:w,texSubImage2D:ge,texSubImage3D:St,compressedTexSubImage2D:Te,compressedTexSubImage3D:kt,scissor:gt,viewport:Ct,reset:At}}function J_(i,t,e,n,s,r,a){let o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new yt,h=new WeakMap,f=new Set,d,p=new WeakMap,g=new Set,_=new FinalizationRegistry(w=>g.delete(w)),u=!1;try{u=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function m(w,y){return u?new OffscreenCanvas(w,y):mr("canvas")}function S(w,y,k){let pt=1,at=Yt(w);if((at.width>k||at.height>k)&&(pt=k/Math.max(at.width,at.height)),pt<1)if(typeof HTMLImageElement<"u"&&w instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&w instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&w instanceof ImageBitmap||typeof VideoFrame<"u"&&w instanceof VideoFrame){let gt=Math.floor(pt*at.width),Ct=Math.floor(pt*at.height);d===void 0&&(d=m(gt,Ct));let Q=y?m(gt,Ct):d;return Q.width=gt,Q.height=Ct,Q.getContext("2d").drawImage(w,0,0,gt,Ct),Zt("WebGLRenderer: Texture has been resized from ("+at.width+"x"+at.height+") to ("+gt+"x"+Ct+")."),Q}else return"data"in w&&Zt("WebGLRenderer: Image in DataTexture is too big ("+at.width+"x"+at.height+")."),w;return w}function E(w){return w.generateMipmaps}function M(w){i.generateMipmap(w)}function A(w){return w.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:w.isWebGL3DRenderTarget?i.TEXTURE_3D:w.isWebGLArrayRenderTarget||w.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function T(w,y,k,pt,at,gt=!1){if(w!==null){if(i[w]!==void 0)return i[w];Zt("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+w+"'")}let Ct;pt&&(Ct=t.get("EXT_texture_norm16"),Ct||Zt("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let Q=y;if(y===i.RED&&(k===i.FLOAT&&(Q=i.R32F),k===i.HALF_FLOAT&&(Q=i.R16F),k===i.UNSIGNED_BYTE&&(Q=i.R8),k===i.UNSIGNED_SHORT&&Ct&&(Q=Ct.R16_EXT),k===i.SHORT&&Ct&&(Q=Ct.R16_SNORM_EXT)),y===i.RED_INTEGER&&(k===i.UNSIGNED_BYTE&&(Q=i.R8UI),k===i.UNSIGNED_SHORT&&(Q=i.R16UI),k===i.UNSIGNED_INT&&(Q=i.R32UI),k===i.BYTE&&(Q=i.R8I),k===i.SHORT&&(Q=i.R16I),k===i.INT&&(Q=i.R32I)),y===i.RG&&(k===i.FLOAT&&(Q=i.RG32F),k===i.HALF_FLOAT&&(Q=i.RG16F),k===i.UNSIGNED_BYTE&&(Q=i.RG8),k===i.UNSIGNED_SHORT&&Ct&&(Q=Ct.RG16_EXT),k===i.SHORT&&Ct&&(Q=Ct.RG16_SNORM_EXT)),y===i.RG_INTEGER&&(k===i.UNSIGNED_BYTE&&(Q=i.RG8UI),k===i.UNSIGNED_SHORT&&(Q=i.RG16UI),k===i.UNSIGNED_INT&&(Q=i.RG32UI),k===i.BYTE&&(Q=i.RG8I),k===i.SHORT&&(Q=i.RG16I),k===i.INT&&(Q=i.RG32I)),y===i.RGB_INTEGER&&(k===i.UNSIGNED_BYTE&&(Q=i.RGB8UI),k===i.UNSIGNED_SHORT&&(Q=i.RGB16UI),k===i.UNSIGNED_INT&&(Q=i.RGB32UI),k===i.BYTE&&(Q=i.RGB8I),k===i.SHORT&&(Q=i.RGB16I),k===i.INT&&(Q=i.RGB32I)),y===i.RGBA_INTEGER&&(k===i.UNSIGNED_BYTE&&(Q=i.RGBA8UI),k===i.UNSIGNED_SHORT&&(Q=i.RGBA16UI),k===i.UNSIGNED_INT&&(Q=i.RGBA32UI),k===i.BYTE&&(Q=i.RGBA8I),k===i.SHORT&&(Q=i.RGBA16I),k===i.INT&&(Q=i.RGBA32I)),y===i.RGB&&(k===i.UNSIGNED_SHORT&&Ct&&(Q=Ct.RGB16_EXT),k===i.SHORT&&Ct&&(Q=Ct.RGB16_SNORM_EXT),k===i.UNSIGNED_INT_5_9_9_9_REV&&(Q=i.RGB9_E5),k===i.UNSIGNED_INT_10F_11F_11F_REV&&(Q=i.R11F_G11F_B10F)),y===i.RGBA){let nt=gt?pr:de.getTransfer(at);k===i.FLOAT&&(Q=i.RGBA32F),k===i.HALF_FLOAT&&(Q=i.RGBA16F),k===i.UNSIGNED_BYTE&&(Q=nt===Ee?i.SRGB8_ALPHA8:i.RGBA8),k===i.UNSIGNED_SHORT&&Ct&&(Q=Ct.RGBA16_EXT),k===i.SHORT&&Ct&&(Q=Ct.RGBA16_SNORM_EXT),k===i.UNSIGNED_SHORT_4_4_4_4&&(Q=i.RGBA4),k===i.UNSIGNED_SHORT_5_5_5_1&&(Q=i.RGB5_A1)}return(Q===i.R16F||Q===i.R32F||Q===i.RG16F||Q===i.RG32F||Q===i.RGBA16F||Q===i.RGBA32F)&&t.get("EXT_color_buffer_float"),Q}function x(w,y){let k;return w?y===null||y===On||y===ns?k=i.DEPTH24_STENCIL8:y===In?k=i.DEPTH32F_STENCIL8:y===Xs&&(k=i.DEPTH24_STENCIL8,Zt("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):y===null||y===On||y===ns?k=i.DEPTH_COMPONENT24:y===In?k=i.DEPTH_COMPONENT32F:y===Xs&&(k=i.DEPTH_COMPONENT16),k}function b(w,y){return E(w)===!0||w.isFramebufferTexture&&w.minFilter!==$e&&w.minFilter!==on?Math.log2(Math.max(y.width,y.height))+1:w.mipmaps.length>0?w.mipmaps.length:w.isCompressedTexture&&Array.isArray(w.image)?y.mipmaps.length:1}function O(w){let y=new WeakRef(w);n.get(w).__ref=y,g.add(y),_.register(w,y,y)}function P(w){let y=n.get(w).__ref;y!==void 0&&(g.delete(y),_.unregister(y))}function F(w){X(w.target)}function G(w){C(w.target)}function X(w){w.removeEventListener("dispose",F),P(w),j(w),w.isVideoTexture&&h.delete(w),w.isHTMLTexture&&f.delete(w)}function C(w){w.removeEventListener("dispose",G),P(w),ut(w)}function Y(){for(let w of g){let y=w.deref();y!==void 0&&(y.isRenderTarget===!0?C(y):X(y))}g.clear(),f.clear()}function j(w){let y=n.get(w);if(y.__webglInit===void 0)return;let k=w.source,pt=p.get(k);if(pt){let at=pt[y.__cacheKey];at.usedTimes--,at.usedTimes===0&&q(w),Object.keys(pt).length===0&&p.delete(k)}n.remove(w)}function q(w){let y=n.get(w);i.deleteTexture(y.__webglTexture);let k=w.source,pt=p.get(k);delete pt[y.__cacheKey],a.memory.textures--}function ut(w){let y=n.get(w);y.__depthDisposeCallback&&y.__depthDisposeCallback();let k=w.depthTexture;if(k&&k.renderTarget===w&&X(k),w.isWebGLCubeRenderTarget)for(let at=0;at<6;at++){if(Array.isArray(y.__webglFramebuffer[at]))for(let gt=0;gt<y.__webglFramebuffer[at].length;gt++)i.deleteFramebuffer(y.__webglFramebuffer[at][gt]);else i.deleteFramebuffer(y.__webglFramebuffer[at]);y.__webglDepthbuffer&&i.deleteRenderbuffer(y.__webglDepthbuffer[at])}else{if(Array.isArray(y.__webglFramebuffer))for(let at=0;at<y.__webglFramebuffer.length;at++)i.deleteFramebuffer(y.__webglFramebuffer[at]);else i.deleteFramebuffer(y.__webglFramebuffer);if(y.__webglDepthbuffer&&i.deleteRenderbuffer(y.__webglDepthbuffer),y.__webglMultisampledFramebuffer&&i.deleteFramebuffer(y.__webglMultisampledFramebuffer),y.__webglColorRenderbuffer)for(let at=0;at<y.__webglColorRenderbuffer.length;at++)y.__webglColorRenderbuffer[at]&&i.deleteRenderbuffer(y.__webglColorRenderbuffer[at]);y.__webglDepthRenderbuffer&&i.deleteRenderbuffer(y.__webglDepthRenderbuffer)}let pt=w.textures;for(let at=0,gt=pt.length;at<gt;at++){let Ct=n.get(pt[at]);Ct.__webglTexture&&(i.deleteTexture(Ct.__webglTexture),a.memory.textures--),n.remove(pt[at])}n.remove(w)}let K=0;function rt(){K=0}function lt(){return K}function Ft(w){K=w}function It(){let w=K;return w>=s.maxTextures&&Zt("WebGLTextures: Trying to use "+(w+1)+" texture units while this GPU supports only "+s.maxTextures),K+=1,w}function $(w){let y=[];return y.push(w.wrapS),y.push(w.wrapT),y.push(w.wrapR||0),y.push(w.magFilter),y.push(w.minFilter),y.push(w.anisotropy),y.push(w.internalFormat),y.push(w.format),y.push(w.type),y.push(w.generateMipmaps),y.push(w.mipmapsAutoUpdate),y.push(w.premultiplyAlpha),y.push(w.flipY),y.push(w.unpackAlignment),y.push(w.colorSpace),y.join()}function bt(w,y){let k=n.get(w);if(w.isVideoTexture&&Te(w),w.isRenderTargetTexture===!1&&w.isExternalTexture!==!0&&w.version>0&&k.__version!==w.version){let pt=w.image;if(pt===null)Zt("WebGLRenderer: Texture marked for update but no image data found.");else if(pt.complete===!1)Zt("WebGLRenderer: Texture marked for update but image is incomplete");else{Mt(k,w,y);return}}else w.isExternalTexture&&(k.__webglTexture=w.sourceTexture?w.sourceTexture:null);e.bindTexture(i.TEXTURE_2D,k.__webglTexture,i.TEXTURE0+y)}function Dt(w,y){let k=n.get(w);if(w.isRenderTargetTexture===!1&&w.version>0&&k.__version!==w.version){Mt(k,w,y);return}else w.isExternalTexture&&(k.__webglTexture=w.sourceTexture?w.sourceTexture:null);e.bindTexture(i.TEXTURE_2D_ARRAY,k.__webglTexture,i.TEXTURE0+y)}function Ot(w,y){let k=n.get(w);if(w.isRenderTargetTexture===!1&&w.version>0&&k.__version!==w.version){Mt(k,w,y);return}e.bindTexture(i.TEXTURE_3D,k.__webglTexture,i.TEXTURE0+y)}function Tt(w,y){let k=n.get(w);if(w.version>0&&k.__version!==w.version){Nt(k,w,y);return}e.bindTexture(i.TEXTURE_CUBE_MAP,k.__webglTexture,i.TEXTURE0+y)}let Xt={[Rs]:i.REPEAT,[qn]:i.CLAMP_TO_EDGE,[qa]:i.MIRRORED_REPEAT},ve={[$e]:i.NEAREST,[xu]:i.NEAREST_MIPMAP_NEAREST,[$r]:i.NEAREST_MIPMAP_LINEAR,[on]:i.LINEAR,[To]:i.LINEAR_MIPMAP_NEAREST,[gi]:i.LINEAR_MIPMAP_LINEAR},Gt={[Su]:i.NEVER,[Tc]:i.ALWAYS,[bu]:i.LESS,[bc]:i.LEQUAL,[Eu]:i.EQUAL,[Ec]:i.GEQUAL,[Tu]:i.GREATER,[wu]:i.NOTEQUAL};function jt(w,y){if(y.type===In&&t.has("OES_texture_float_linear")===!1&&(y.magFilter===on||y.magFilter===To||y.magFilter===$r||y.magFilter===gi||y.minFilter===on||y.minFilter===To||y.minFilter===$r||y.minFilter===gi)&&Zt("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(w,i.TEXTURE_WRAP_S,Xt[y.wrapS]),i.texParameteri(w,i.TEXTURE_WRAP_T,Xt[y.wrapT]),(w===i.TEXTURE_3D||w===i.TEXTURE_2D_ARRAY)&&i.texParameteri(w,i.TEXTURE_WRAP_R,Xt[y.wrapR]),i.texParameteri(w,i.TEXTURE_MAG_FILTER,ve[y.magFilter]),i.texParameteri(w,i.TEXTURE_MIN_FILTER,ve[y.minFilter]),y.compareFunction&&(i.texParameteri(w,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(w,i.TEXTURE_COMPARE_FUNC,Gt[y.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(y.magFilter===$e||y.minFilter!==$r&&y.minFilter!==gi||y.type===In&&t.has("OES_texture_float_linear")===!1)return;if(y.anisotropy>1||n.get(y).__currentAnisotropy){let k=t.get("EXT_texture_filter_anisotropic");i.texParameterf(w,k.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(y.anisotropy,s.getMaxAnisotropy())),n.get(y).__currentAnisotropy=y.anisotropy}}}function ie(w,y){let k=!1;w.__webglInit===void 0&&(w.__webglInit=!0,y.addEventListener("dispose",F),O(y));let pt=y.source,at=p.get(pt);at===void 0&&(at={},p.set(pt,at));let gt=$(y);if(gt!==w.__cacheKey){at[gt]===void 0&&(at[gt]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,k=!0),at[gt].usedTimes++;let Ct=at[w.__cacheKey];Ct!==void 0&&(at[w.__cacheKey].usedTimes--,Ct.usedTimes===0&&q(y)),w.__cacheKey=gt,w.__webglTexture=at[gt].texture}return k}function st(w,y,k){return Math.floor(Math.floor(w/k)/y)}function vt(w,y,k,pt){let gt=w.updateRanges;if(gt.length===0)e.texSubImage2D(i.TEXTURE_2D,0,0,0,y.width,y.height,k,pt,y.data);else{gt.sort((R,it)=>R.start-it.start);let Ct=0;for(let R=1;R<gt.length;R++){let it=gt[Ct],tt=gt[R],Rt=it.start+it.count,I=st(tt.start,y.width,4),V=st(it.start,y.width,4);tt.start<=Rt+1&&I===V&&st(tt.start+tt.count-1,y.width,4)===I?it.count=Math.max(it.count,tt.start+tt.count-it.start):(++Ct,gt[Ct]=tt)}gt.length=Ct+1;let Q=e.getParameter(i.UNPACK_ROW_LENGTH),nt=e.getParameter(i.UNPACK_SKIP_PIXELS),At=e.getParameter(i.UNPACK_SKIP_ROWS);e.pixelStorei(i.UNPACK_ROW_LENGTH,y.width);for(let R=0,it=gt.length;R<it;R++){let tt=gt[R],Rt=Math.floor(tt.start/4),I=Math.ceil(tt.count/4),V=Rt%y.width,J=Math.floor(Rt/y.width),ct=I,Z=1;e.pixelStorei(i.UNPACK_SKIP_PIXELS,V),e.pixelStorei(i.UNPACK_SKIP_ROWS,J),e.texSubImage2D(i.TEXTURE_2D,0,V,J,ct,Z,k,pt,y.data)}w.clearUpdateRanges(),e.pixelStorei(i.UNPACK_ROW_LENGTH,Q),e.pixelStorei(i.UNPACK_SKIP_PIXELS,nt),e.pixelStorei(i.UNPACK_SKIP_ROWS,At)}}function Mt(w,y,k){let pt=i.TEXTURE_2D;(y.isDataArrayTexture||y.isCompressedArrayTexture)&&(pt=i.TEXTURE_2D_ARRAY),y.isData3DTexture&&(pt=i.TEXTURE_3D);let at=ie(w,y),gt=y.source;e.bindTexture(pt,w.__webglTexture,i.TEXTURE0+k);let Ct=n.get(gt);if(gt.version!==Ct.__version||at===!0){if(e.activeTexture(i.TEXTURE0+k),(typeof ImageBitmap<"u"&&y.image instanceof ImageBitmap)===!1){let Z=de.getPrimaries(de.workingColorSpace),ht=y.colorSpace===xi?null:de.getPrimaries(y.colorSpace),Lt=y.colorSpace===xi||Z===ht?i.NONE:i.BROWSER_DEFAULT_WEBGL;e.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,y.flipY),e.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),e.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Lt)}e.pixelStorei(i.UNPACK_ALIGNMENT,y.unpackAlignment);let nt=S(y.image,!1,s.maxTextureSize);nt=kt(y,nt);let At=r.convert(y.format,y.colorSpace),R=r.convert(y.type),it=T(y.internalFormat,At,R,y.normalized,y.colorSpace,y.isVideoTexture);jt(pt,y);let tt,Rt=y.mipmaps,I=y.isVideoTexture!==!0,V=Ct.__version===void 0||at===!0,J=gt.dataReady,ct=b(y,nt);if(y.isDepthTexture)it=x(y.format===_i,y.type),V&&(I?e.texStorage2D(i.TEXTURE_2D,1,it,nt.width,nt.height):e.texImage2D(i.TEXTURE_2D,0,it,nt.width,nt.height,0,At,R,null));else if(y.isDataTexture)if(Rt.length>0){I&&V&&e.texStorage2D(i.TEXTURE_2D,ct,it,Rt[0].width,Rt[0].height);for(let Z=0,ht=Rt.length;Z<ht;Z++)tt=Rt[Z],I?J&&e.texSubImage2D(i.TEXTURE_2D,Z,0,0,tt.width,tt.height,At,R,tt.data):e.texImage2D(i.TEXTURE_2D,Z,it,tt.width,tt.height,0,At,R,tt.data);y.generateMipmaps=!1}else I?(V&&e.texStorage2D(i.TEXTURE_2D,ct,it,nt.width,nt.height),J&&vt(y,nt,At,R)):e.texImage2D(i.TEXTURE_2D,0,it,nt.width,nt.height,0,At,R,nt.data);else if(y.isCompressedTexture)if(y.isCompressedArrayTexture){I&&V&&e.texStorage3D(i.TEXTURE_2D_ARRAY,ct,it,Rt[0].width,Rt[0].height,nt.depth);for(let Z=0,ht=Rt.length;Z<ht;Z++)if(tt=Rt[Z],y.format!==zn)if(At!==null)if(I){if(J)if(y.layerUpdates.size>0){let Lt=Fc(tt.width,tt.height,y.format,y.type);for(let dt of y.layerUpdates){let oe=tt.data.subarray(dt*Lt/tt.data.BYTES_PER_ELEMENT,(dt+1)*Lt/tt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,Z,0,0,dt,tt.width,tt.height,1,At,oe)}}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,Z,0,0,0,tt.width,tt.height,nt.depth,At,tt.data)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,Z,it,tt.width,tt.height,nt.depth,0,tt.data,0,0);else Zt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else I?J&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,Z,0,0,0,tt.width,tt.height,nt.depth,At,R,tt.data):e.texImage3D(i.TEXTURE_2D_ARRAY,Z,it,tt.width,tt.height,nt.depth,0,At,R,tt.data);y.layerUpdates.size>0&&y.clearLayerUpdates()}else{I&&V&&e.texStorage2D(i.TEXTURE_2D,ct,it,Rt[0].width,Rt[0].height);for(let Z=0,ht=Rt.length;Z<ht;Z++)tt=Rt[Z],y.format!==zn?At!==null?I?J&&e.compressedTexSubImage2D(i.TEXTURE_2D,Z,0,0,tt.width,tt.height,At,tt.data):e.compressedTexImage2D(i.TEXTURE_2D,Z,it,tt.width,tt.height,0,tt.data):Zt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):I?J&&e.texSubImage2D(i.TEXTURE_2D,Z,0,0,tt.width,tt.height,At,R,tt.data):e.texImage2D(i.TEXTURE_2D,Z,it,tt.width,tt.height,0,At,R,tt.data)}else if(y.isDataArrayTexture)if(I){if(V&&e.texStorage3D(i.TEXTURE_2D_ARRAY,ct,it,nt.width,nt.height,nt.depth),J)if(y.layerUpdates.size>0){let Z=Fc(nt.width,nt.height,y.format,y.type);for(let ht of y.layerUpdates){let Lt=nt.data.subarray(ht*Z/nt.data.BYTES_PER_ELEMENT,(ht+1)*Z/nt.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,ht,nt.width,nt.height,1,At,R,Lt)}y.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,nt.width,nt.height,nt.depth,At,R,nt.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,it,nt.width,nt.height,nt.depth,0,At,R,nt.data);else if(y.isData3DTexture)I?(V&&e.texStorage3D(i.TEXTURE_3D,ct,it,nt.width,nt.height,nt.depth),J&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,nt.width,nt.height,nt.depth,At,R,nt.data)):e.texImage3D(i.TEXTURE_3D,0,it,nt.width,nt.height,nt.depth,0,At,R,nt.data);else if(y.isFramebufferTexture){if(V)if(I)e.texStorage2D(i.TEXTURE_2D,ct,it,nt.width,nt.height);else{let Z=nt.width,ht=nt.height;for(let Lt=0;Lt<ct;Lt++)e.texImage2D(i.TEXTURE_2D,Lt,it,Z,ht,0,At,R,null),Z>>=1,ht>>=1}}else if(y.isHTMLTexture){if("texElementImage2D"in i){let Z=i.canvas;if(Z.hasAttribute("layoutsubtree")||Z.setAttribute("layoutsubtree","true"),nt.parentNode!==Z){Z.appendChild(nt),f.add(y),Z.onpaint=ht=>{let Lt=ht.changedElements;for(let dt of f)Lt.includes(dt.image)&&(dt.needsUpdate=!0)},Z.requestPaint();return}if(i.texElementImage2D.length===3)i.texElementImage2D(i.TEXTURE_2D,i.RGBA8,nt);else{let Lt=i.RGBA,dt=i.RGBA,oe=i.UNSIGNED_BYTE;i.texElementImage2D(i.TEXTURE_2D,0,Lt,dt,oe,nt)}i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE)}}else if(Rt.length>0){if(I&&V){let Z=Yt(Rt[0]);e.texStorage2D(i.TEXTURE_2D,ct,it,Z.width,Z.height)}for(let Z=0,ht=Rt.length;Z<ht;Z++)tt=Rt[Z],I?J&&e.texSubImage2D(i.TEXTURE_2D,Z,0,0,At,R,tt):e.texImage2D(i.TEXTURE_2D,Z,it,At,R,tt);y.generateMipmaps=!1}else if(I){if(V){let Z=Yt(nt);e.texStorage2D(i.TEXTURE_2D,ct,it,Z.width,Z.height)}J&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,At,R,nt)}else e.texImage2D(i.TEXTURE_2D,0,it,At,R,nt);E(y)&&y.mipmapsAutoUpdate===!0&&M(pt),Ct.__version=gt.version,y.onUpdate&&y.onUpdate(y)}w.__version=y.version}function Nt(w,y,k){if(y.image.length!==6)return;let pt=ie(w,y),at=y.source;e.bindTexture(i.TEXTURE_CUBE_MAP,w.__webglTexture,i.TEXTURE0+k);let gt=n.get(at);if(at.version!==gt.__version||pt===!0){e.activeTexture(i.TEXTURE0+k);let Ct=de.getPrimaries(de.workingColorSpace),Q=y.colorSpace===xi?null:de.getPrimaries(y.colorSpace),nt=y.colorSpace===xi||Ct===Q?i.NONE:i.BROWSER_DEFAULT_WEBGL;e.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,y.flipY),e.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),e.pixelStorei(i.UNPACK_ALIGNMENT,y.unpackAlignment),e.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,nt);let At=y.isCompressedTexture||y.image[0].isCompressedTexture,R=y.image[0]&&y.image[0].isDataTexture,it=[];for(let dt=0;dt<6;dt++)!At&&!R?it[dt]=S(y.image[dt],!0,s.maxCubemapSize):it[dt]=R?y.image[dt].image:y.image[dt],it[dt]=kt(y,it[dt]);let tt=it[0],Rt=r.convert(y.format,y.colorSpace),I=r.convert(y.type),V=T(y.internalFormat,Rt,I,y.normalized,y.colorSpace),J=y.isVideoTexture!==!0,ct=gt.__version===void 0||pt===!0,Z=at.dataReady,ht=b(y,tt);jt(i.TEXTURE_CUBE_MAP,y);let Lt;if(y.isDepthTexture){if(V=x(y.format===_i,y.type),ct)if(J)e.texStorage2D(i.TEXTURE_CUBE_MAP,1,V,tt.width,tt.height);else for(let dt=0;dt<6;dt++)e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+dt,0,V,tt.width,tt.height,0,Rt,I,null)}else if(At){J&&ct&&e.texStorage2D(i.TEXTURE_CUBE_MAP,ht,V,tt.width,tt.height);for(let dt=0;dt<6;dt++){Lt=it[dt].mipmaps;for(let oe=0;oe<Lt.length;oe++){let we=Lt[oe];y.format!==zn?Rt!==null?J?Z&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+dt,oe,0,0,we.width,we.height,Rt,we.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+dt,oe,V,we.width,we.height,0,we.data):Zt("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):J?Z&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+dt,oe,0,0,we.width,we.height,Rt,I,we.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+dt,oe,V,we.width,we.height,0,Rt,I,we.data)}}}else{if(Lt=y.mipmaps,J&&ct){Lt.length>0&&ht++;let dt=Yt(it[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,ht,V,dt.width,dt.height)}for(let dt=0;dt<6;dt++)if(R){J?Z&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+dt,0,0,0,it[dt].width,it[dt].height,Rt,I,it[dt].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+dt,0,V,it[dt].width,it[dt].height,0,Rt,I,it[dt].data);for(let oe=0;oe<Lt.length;oe++){let ze=Lt[oe].image[dt].image;J?Z&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+dt,oe+1,0,0,ze.width,ze.height,Rt,I,ze.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+dt,oe+1,V,ze.width,ze.height,0,Rt,I,ze.data)}}else{J?Z&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+dt,0,0,0,Rt,I,it[dt]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+dt,0,V,Rt,I,it[dt]);for(let oe=0;oe<Lt.length;oe++){let we=Lt[oe];J?Z&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+dt,oe+1,0,0,Rt,I,we.image[dt]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+dt,oe+1,V,Rt,I,we.image[dt])}}}E(y)&&y.mipmapsAutoUpdate===!0&&M(i.TEXTURE_CUBE_MAP),gt.__version=at.version,y.onUpdate&&y.onUpdate(y)}w.__version=y.version}function wt(w,y,k,pt,at,gt){let Ct=r.convert(k.format,k.colorSpace),Q=r.convert(k.type),nt=T(k.internalFormat,Ct,Q,k.normalized,k.colorSpace),At=n.get(y),R=n.get(k);if(R.__renderTarget=y,!At.__hasExternalTextures){let it=Math.max(1,y.width>>gt),tt=Math.max(1,y.height>>gt);at===i.TEXTURE_3D||at===i.TEXTURE_2D_ARRAY?e.texImage3D(at,gt,nt,it,tt,y.depth,0,Ct,Q,null):e.texImage2D(at,gt,nt,it,tt,0,Ct,Q,null)}e.bindFramebuffer(i.FRAMEBUFFER,w),St(y)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,pt,at,R.__webglTexture,0,ge(y)):(at===i.TEXTURE_2D||at>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&at<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,pt,at,R.__webglTexture,gt),e.bindFramebuffer(i.FRAMEBUFFER,null)}function Qt(w,y,k){if(i.bindRenderbuffer(i.RENDERBUFFER,w),y.depthBuffer){let pt=y.depthTexture,at=pt&&pt.isDepthTexture?pt.type:null,gt=x(y.stencilBuffer,at),Ct=y.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;St(y)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ge(y),gt,y.width,y.height):k?i.renderbufferStorageMultisample(i.RENDERBUFFER,ge(y),gt,y.width,y.height):i.renderbufferStorage(i.RENDERBUFFER,gt,y.width,y.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,Ct,i.RENDERBUFFER,w)}else{let pt=y.textures;for(let at=0;at<pt.length;at++){let gt=pt[at],Ct=r.convert(gt.format,gt.colorSpace),Q=r.convert(gt.type),nt=T(gt.internalFormat,Ct,Q,gt.normalized,gt.colorSpace);St(y)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ge(y),nt,y.width,y.height):k?i.renderbufferStorageMultisample(i.RENDERBUFFER,ge(y),nt,y.width,y.height):i.renderbufferStorage(i.RENDERBUFFER,nt,y.width,y.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function zt(w,y,k){let pt=y.isWebGLCubeRenderTarget===!0;if(e.bindFramebuffer(i.FRAMEBUFFER,w),!(y.depthTexture&&y.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let at=n.get(y.depthTexture);at.__renderTarget=y;let gt=pt?y.depthTexture.image[0]:y.depthTexture.image;(!at.__webglTexture||gt.width!==y.width||gt.height!==y.height)&&(gt.width=y.width,gt.height=y.height,y.depthTexture.needsUpdate=!0),pt?Tt(y.depthTexture,0):bt(y.depthTexture,0);let Ct=at.__webglTexture,Q=ge(y),nt=pt?i.TEXTURE_CUBE_MAP_POSITIVE_X+k:i.TEXTURE_2D,At=y.depthTexture.format===_i?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(y.depthTexture.format===di)St(y)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,At,nt,Ct,0,Q):i.framebufferTexture2D(i.FRAMEBUFFER,At,nt,Ct,0);else if(y.depthTexture.format===_i)St(y)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,At,nt,Ct,0,Q):i.framebufferTexture2D(i.FRAMEBUFFER,At,nt,Ct,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function ae(w){let y=n.get(w),k=w.isWebGLCubeRenderTarget===!0;if(y.__boundDepthTexture!==w.depthTexture){let pt=w.depthTexture;if(y.__depthDisposeCallback&&y.__depthDisposeCallback(),pt){let at=()=>{delete y.__boundDepthTexture,delete y.__depthDisposeCallback,pt.removeEventListener("dispose",at)};pt.addEventListener("dispose",at),y.__depthDisposeCallback=at}y.__boundDepthTexture=pt}if(w.depthTexture&&!y.__autoAllocateDepthBuffer)if(k)for(let pt=0;pt<6;pt++)zt(y.__webglFramebuffer[pt],w,pt);else w.texture.mipmaps.length>0?zt(y.__webglFramebuffer[0],w,0):zt(y.__webglFramebuffer,w,0);else if(k){y.__webglDepthbuffer=[];for(let pt=0;pt<6;pt++)if(e.bindFramebuffer(i.FRAMEBUFFER,y.__webglFramebuffer[pt]),y.__webglDepthbuffer[pt]===void 0)y.__webglDepthbuffer[pt]=i.createRenderbuffer(),Qt(y.__webglDepthbuffer[pt],w,!1);else{let at=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,gt=y.__webglDepthbuffer[pt];i.bindRenderbuffer(i.RENDERBUFFER,gt),i.framebufferRenderbuffer(i.FRAMEBUFFER,at,i.RENDERBUFFER,gt)}}else if(w.texture.mipmaps.length>0?e.bindFramebuffer(i.FRAMEBUFFER,y.__webglFramebuffer[0]):e.bindFramebuffer(i.FRAMEBUFFER,y.__webglFramebuffer),y.__webglDepthbuffer===void 0)y.__webglDepthbuffer=i.createRenderbuffer(),Qt(y.__webglDepthbuffer,w,!1);else{let at=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,gt=y.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,gt),i.framebufferRenderbuffer(i.FRAMEBUFFER,at,i.RENDERBUFFER,gt)}e.bindFramebuffer(i.FRAMEBUFFER,null)}function se(w,y,k){let pt=n.get(w);y!==void 0&&wt(pt.__webglFramebuffer,w,w.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),k!==void 0&&ae(w)}function ee(w){let y=w.texture,k=n.get(w),pt=n.get(y);w.addEventListener("dispose",G),O(w);let at=w.textures,gt=w.isWebGLCubeRenderTarget===!0,Ct=at.length>1;if(Ct||(pt.__webglTexture===void 0&&(pt.__webglTexture=i.createTexture()),pt.__version=y.version,a.memory.textures++),gt){k.__webglFramebuffer=[];for(let Q=0;Q<6;Q++)if(y.mipmaps.length>0){k.__webglFramebuffer[Q]=[];for(let nt=0;nt<y.mipmaps.length;nt++)k.__webglFramebuffer[Q][nt]=i.createFramebuffer()}else k.__webglFramebuffer[Q]=i.createFramebuffer()}else{if(y.mipmaps.length>0){k.__webglFramebuffer=[];for(let Q=0;Q<y.mipmaps.length;Q++)k.__webglFramebuffer[Q]=i.createFramebuffer()}else k.__webglFramebuffer=i.createFramebuffer();if(Ct)for(let Q=0,nt=at.length;Q<nt;Q++){let At=n.get(at[Q]);At.__webglTexture===void 0&&(At.__webglTexture=i.createTexture(),a.memory.textures++)}if(w.samples>0&&St(w)===!1){k.__webglMultisampledFramebuffer=i.createFramebuffer(),k.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,k.__webglMultisampledFramebuffer);for(let Q=0;Q<at.length;Q++){let nt=at[Q];k.__webglColorRenderbuffer[Q]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,k.__webglColorRenderbuffer[Q]);let At=r.convert(nt.format,nt.colorSpace),R=r.convert(nt.type),it=T(nt.internalFormat,At,R,nt.normalized,nt.colorSpace,w.isXRRenderTarget===!0),tt=ge(w);i.renderbufferStorageMultisample(i.RENDERBUFFER,tt,it,w.width,w.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Q,i.RENDERBUFFER,k.__webglColorRenderbuffer[Q])}i.bindRenderbuffer(i.RENDERBUFFER,null),w.depthBuffer&&(k.__webglDepthRenderbuffer=i.createRenderbuffer(),Qt(k.__webglDepthRenderbuffer,w,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(gt){e.bindTexture(i.TEXTURE_CUBE_MAP,pt.__webglTexture),jt(i.TEXTURE_CUBE_MAP,y);for(let Q=0;Q<6;Q++)if(y.mipmaps.length>0)for(let nt=0;nt<y.mipmaps.length;nt++)wt(k.__webglFramebuffer[Q][nt],w,y,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,nt);else wt(k.__webglFramebuffer[Q],w,y,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0);E(y)?M(i.TEXTURE_CUBE_MAP):y.mipmaps.length>0&&i.texParameteri(i.TEXTURE_CUBE_MAP,i.TEXTURE_MAX_LEVEL,y.mipmaps.length-1),e.unbindTexture()}else if(Ct){for(let Q=0,nt=at.length;Q<nt;Q++){let At=at[Q],R=n.get(At),it=i.TEXTURE_2D;(w.isWebGL3DRenderTarget||w.isWebGLArrayRenderTarget)&&(it=w.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(it,R.__webglTexture),jt(it,At),wt(k.__webglFramebuffer,w,At,i.COLOR_ATTACHMENT0+Q,it,0),E(At)&&M(it)}e.unbindTexture()}else{let Q=i.TEXTURE_2D;if((w.isWebGL3DRenderTarget||w.isWebGLArrayRenderTarget)&&(Q=w.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(Q,pt.__webglTexture),jt(Q,y),y.mipmaps.length>0)for(let nt=0;nt<y.mipmaps.length;nt++)wt(k.__webglFramebuffer[nt],w,y,i.COLOR_ATTACHMENT0,Q,nt);else wt(k.__webglFramebuffer,w,y,i.COLOR_ATTACHMENT0,Q,0);E(y)?M(Q):y.mipmaps.length>0&&i.texParameteri(Q,i.TEXTURE_MAX_LEVEL,y.mipmaps.length-1),e.unbindTexture()}w.depthBuffer&&ae(w)}function D(w){let y=w.textures;for(let k=0,pt=y.length;k<pt;k++){let at=y[k];if(E(at)&&at.mipmapsAutoUpdate===!0){let gt=A(w),Ct=n.get(at).__webglTexture;e.bindTexture(gt,Ct),M(gt),e.unbindTexture()}}}let Ce=[];function $t(w){if(w.samples>0){if(St(w)===!1){let y=w.textures,k=w.width,pt=w.height,at=i.COLOR_BUFFER_BIT,gt=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Ct=n.get(w),Q=y.length>1;if(Q)for(let At=0;At<y.length;At++)e.bindFramebuffer(i.FRAMEBUFFER,Ct.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+At,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,Ct.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+At,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,Ct.__webglMultisampledFramebuffer),w.texture.mipmaps.length>0?e.bindFramebuffer(i.DRAW_FRAMEBUFFER,Ct.__webglFramebuffer[0]):e.bindFramebuffer(i.DRAW_FRAMEBUFFER,Ct.__webglFramebuffer);for(let At=0;At<y.length;At++){if(w.resolveDepthBuffer&&(w.depthBuffer&&(at|=i.DEPTH_BUFFER_BIT),w.stencilBuffer&&w.resolveStencilBuffer&&(at|=i.STENCIL_BUFFER_BIT)),Q){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,Ct.__webglColorRenderbuffer[At]);let R=n.get(y[At]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,R,0)}i.blitFramebuffer(0,0,k,pt,0,0,k,pt,at,i.NEAREST),c===!0&&(Ce.length=0,Ce.push(i.COLOR_ATTACHMENT0+At),w.depthBuffer&&w.storeMultisampledDepthBuffer===!1&&Ce.push(gt),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,Ce))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),Q)for(let At=0;At<y.length;At++){e.bindFramebuffer(i.FRAMEBUFFER,Ct.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+At,i.RENDERBUFFER,Ct.__webglColorRenderbuffer[At]);let R=n.get(y[At]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,Ct.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+At,i.TEXTURE_2D,R,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,Ct.__webglMultisampledFramebuffer)}else if(w.depthBuffer&&w.storeMultisampledDepthBuffer===!1&&c){let y=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[y])}}}function ge(w){return Math.min(s.maxSamples,w.samples)}function St(w){let y=n.get(w);return w.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&y.__useRenderToTexture!==!1}function Te(w){let y=a.render.frame;h.get(w)!==y&&(h.set(w,y),w.update())}function kt(w,y){let k=w.colorSpace,pt=w.format,at=w.type;return w.isCompressedTexture===!0||w.isVideoTexture===!0||k!==fr&&k!==xi&&(de.getTransfer(k)===Ee?(pt!==zn||at!==hn)&&Zt("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):te("WebGLTextures: Unsupported texture color space:",k)),y}function Yt(w){return typeof HTMLImageElement<"u"&&w instanceof HTMLImageElement?(l.width=w.naturalWidth||w.width,l.height=w.naturalHeight||w.height):typeof VideoFrame<"u"&&w instanceof VideoFrame?(l.width=w.displayWidth,l.height=w.displayHeight):(l.width=w.width,l.height=w.height),l}this.allocateTextureUnit=It,this.resetTextureUnits=rt,this.getTextureUnits=lt,this.setTextureUnits=Ft,this.setTexture2D=bt,this.setTexture2DArray=Dt,this.setTexture3D=Ot,this.setTextureCube=Tt,this.rebindTextures=se,this.setupRenderTarget=ee,this.updateRenderTargetMipmap=D,this.updateMultisampleRenderTarget=$t,this.setupDepthRenderbuffer=ae,this.setupFrameBufferTexture=wt,this.useMultisampledRTT=St,this.dispose=Y}function K_(i,t){function e(n,s=xi){let r,a=de.getTransfer(s);if(n===hn)return i.UNSIGNED_BYTE;if(n===Ao)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Ro)return i.UNSIGNED_SHORT_5_5_5_1;if(n===yc)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===vc)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===_c)return i.BYTE;if(n===xc)return i.SHORT;if(n===Xs)return i.UNSIGNED_SHORT;if(n===wo)return i.INT;if(n===On)return i.UNSIGNED_INT;if(n===In)return i.FLOAT;if(n===Bn)return i.HALF_FLOAT;if(n===Mc)return i.ALPHA;if(n===Sc)return i.RGB;if(n===zn)return i.RGBA;if(n===di)return i.DEPTH_COMPONENT;if(n===_i)return i.DEPTH_STENCIL;if(n===Co)return i.RED;if(n===Po)return i.RED_INTEGER;if(n===Oi)return i.RG;if(n===Io)return i.RG_INTEGER;if(n===Lo)return i.RGBA_INTEGER;if(n===Jr||n===Kr||n===jr||n===Qr)if(a===Ee)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Jr)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Kr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===jr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Qr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Jr)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Kr)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===jr)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Qr)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Do||n===No||n===Uo||n===Fo)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===Do)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===No)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Uo)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Fo)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Oo||n===Bo||n===zo||n===Ho||n===Go||n===ta||n===ko)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===Oo||n===Bo)return a===Ee?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===zo)return a===Ee?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(n===Ho)return r.COMPRESSED_R11_EAC;if(n===Go)return r.COMPRESSED_SIGNED_R11_EAC;if(n===ta)return r.COMPRESSED_RG11_EAC;if(n===ko)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===Vo||n===Wo||n===Xo||n===qo||n===Yo||n===Zo||n===$o||n===Jo||n===Ko||n===jo||n===Qo||n===tl||n===el||n===nl)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===Vo)return a===Ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Wo)return a===Ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Xo)return a===Ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===qo)return a===Ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Yo)return a===Ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Zo)return a===Ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===$o)return a===Ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Jo)return a===Ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Ko)return a===Ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===jo)return a===Ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Qo)return a===Ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===tl)return a===Ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===el)return a===Ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===nl)return a===Ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===il||n===sl||n===rl)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===il)return a===Ee?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===sl)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===rl)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===al||n===ol||n===ea||n===ll)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===al)return r.COMPRESSED_RED_RGTC1_EXT;if(n===ol)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===ea)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===ll)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===ns?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}var j_=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Q_=`
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

}`,Jc=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){let n=new Tr(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=n}}getMesh(t){if(this.texture!==null&&this.mesh===null){let e=t.cameras[0].viewport,n=new $n({vertexShader:j_,fragmentShader:Q_,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new ft(new Ki(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Kc=class extends Fn{constructor(t,e){super();let n=this,s=null,r=1,a=null,o="local-floor",c=1,l=null,h=null,f=null,d=null,p=null,g=null,_=typeof XRWebGLBinding<"u",u=new Jc,m={},S=e.getContextAttributes(),E=null,M=null,A=[],T=[],x=new yt,b=null,O=null,P=new sn;P.viewport=new Ie;let F=new sn;F.viewport=new Ie;let G=[P,F],X=new vo,C=null,Y=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function($){let bt=A[$];return bt===void 0&&(bt=new Ns,A[$]=bt),bt.getTargetRaySpace()},this.getControllerGrip=function($){let bt=A[$];return bt===void 0&&(bt=new Ns,A[$]=bt),bt.getGripSpace()},this.getHand=function($){let bt=A[$];return bt===void 0&&(bt=new Ns,A[$]=bt),bt.getHandSpace()};function j($){let bt=T.indexOf($.inputSource);if(bt===-1)return;let Dt=A[bt];Dt!==void 0&&(Dt.update($.inputSource,$.frame,l||a),Dt.dispatchEvent({type:$.type,data:$.inputSource}))}function q(){s.removeEventListener("select",j),s.removeEventListener("selectstart",j),s.removeEventListener("selectend",j),s.removeEventListener("squeeze",j),s.removeEventListener("squeezestart",j),s.removeEventListener("squeezeend",j),s.removeEventListener("end",q),s.removeEventListener("inputsourceschange",ut);for(let $=0;$<A.length;$++){let bt=T[$];bt!==null&&(T[$]=null,A[$].disconnect(bt))}C=null,Y=null,u.reset();for(let $ in m)delete m[$];if(t.setRenderTarget(E),p=null,d=null,f=null,s=null,M=null,It.stop(),n.isPresenting=!1,t.setPixelRatio(b),t.setSize(x.width,x.height,!1),O!==null){let $=O.camera;$.fov=O.fov,$.zoom=O.zoom,$.updateProjectionMatrix(),O=null}n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function($){r=$,n.isPresenting===!0&&Zt("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function($){o=$,n.isPresenting===!0&&Zt("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function($){l=$},this.getBaseLayer=function(){return d!==null?d:p},this.getBinding=function(){return f===null&&_&&(f=new XRWebGLBinding(s,e)),f},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function($){if(s=$,s!==null){if(E=t.getRenderTarget(),s.addEventListener("select",j),s.addEventListener("selectstart",j),s.addEventListener("selectend",j),s.addEventListener("squeeze",j),s.addEventListener("squeezestart",j),s.addEventListener("squeezeend",j),s.addEventListener("end",q),s.addEventListener("inputsourceschange",ut),S.xrCompatible!==!0&&await e.makeXRCompatible(),b=t.getPixelRatio(),t.getSize(x),_&&"createProjectionLayer"in XRWebGLBinding.prototype){let Dt=null,Ot=null,Tt=null;S.depth&&(Tt=S.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,Dt=S.stencil?_i:di,Ot=S.stencil?ns:On);let Xt={colorFormat:e.RGBA8,depthFormat:Tt,scaleFactor:r};f=this.getBinding(),d=f.createProjectionLayer(Xt),s.updateRenderState({layers:[d]}),t.setPixelRatio(1),t.setSize(d.textureWidth,d.textureHeight,!1),M=new Mn(d.textureWidth,d.textureHeight,{format:zn,type:hn,depthTexture:new pi(d.textureWidth,d.textureHeight,Ot,void 0,void 0,void 0,void 0,void 0,void 0,Dt),stencilBuffer:S.stencil,colorSpace:t.outputColorSpace,samples:S.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1,storeMultisampledDepthBuffer:d.ignoreDepthValues===!1,storeMultisampledStencilBuffer:d.ignoreDepthValues===!1})}else{let Dt={antialias:S.antialias,alpha:!0,depth:S.depth,stencil:S.stencil,framebufferScaleFactor:r};p=new XRWebGLLayer(s,e,Dt),s.updateRenderState({baseLayer:p}),t.setPixelRatio(1),t.setSize(p.framebufferWidth,p.framebufferHeight,!1),M=new Mn(p.framebufferWidth,p.framebufferHeight,{format:zn,type:hn,colorSpace:t.outputColorSpace,stencilBuffer:S.stencil,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1,storeMultisampledDepthBuffer:p.ignoreDepthValues===!1,storeMultisampledStencilBuffer:p.ignoreDepthValues===!1})}M.isXRRenderTarget=!0,this.setFoveation(c),l=null,a=await s.requestReferenceSpace(o),It.setContext(s),It.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return u.getDepthTexture()};function ut($){for(let bt=0;bt<$.removed.length;bt++){let Dt=$.removed[bt],Ot=T.indexOf(Dt);Ot>=0&&(T[Ot]=null,A[Ot].disconnect(Dt))}for(let bt=0;bt<$.added.length;bt++){let Dt=$.added[bt],Ot=T.indexOf(Dt);if(Ot===-1){for(let Xt=0;Xt<A.length;Xt++)if(Xt>=T.length){T.push(Dt),Ot=Xt;break}else if(T[Xt]===null){T[Xt]=Dt,Ot=Xt;break}if(Ot===-1)break}let Tt=A[Ot];Tt&&Tt.connect(Dt)}}function K($,bt){bt===null?$.matrixWorld.copy($.matrix):$.matrixWorld.multiplyMatrices(bt.matrixWorld,$.matrix),$.matrixWorldInverse.copy($.matrixWorld).invert()}this.updateCamera=function($){if(s===null)return;let bt=$.near,Dt=$.far;u.texture!==null&&(u.depthNear>0&&(bt=u.depthNear),u.depthFar>0&&(Dt=u.depthFar)),X.near=F.near=P.near=bt,X.far=F.far=P.far=Dt,(C!==X.near||Y!==X.far)&&(s.updateRenderState({depthNear:X.near,depthFar:X.far}),C=X.near,Y=X.far),X.layers.mask=$.layers.mask|6,P.layers.mask=X.layers.mask&-5,F.layers.mask=X.layers.mask&-3;let Ot=$.parent,Tt=X.cameras;K(X,Ot);for(let Xt=0;Xt<Tt.length;Xt++)K(Tt[Xt],Ot);X.projectionMatrix.copy(P.projectionMatrix),X.projectionMatrixInverse.copy(P.projectionMatrixInverse),O===null&&$.isPerspectiveCamera&&(O={camera:$,fov:$.fov,zoom:$.zoom}),rt($,X,Ot)};function rt($,bt,Dt){Dt===null?$.matrix.copy(bt.matrixWorld):($.matrix.copy(Dt.matrixWorld),$.matrix.invert(),$.matrix.multiply(bt.matrixWorld)),$.matrix.decompose($.position,$.quaternion,$.scale),$.updateMatrixWorld(!0),$.projectionMatrix.copy(bt.projectionMatrix),$.projectionMatrixInverse.copy(bt.projectionMatrixInverse),$.isPerspectiveCamera&&($.fov=Is*2*Math.atan(1/$.projectionMatrix.elements[5]),$.zoom=1)}this.getCamera=function(){return X},this.getFoveation=function(){if(!(d===null&&p===null))return c},this.setFoveation=function($){c=$,d!==null&&(d.fixedFoveation=$),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=$)},this.hasDepthSensing=function(){return u.texture!==null},this.getDepthSensingMesh=function(){return u.getMesh(X)},this.getCameraTexture=function($){return m[$]};let lt=null;function Ft($,bt){if(h=bt.getViewerPose(l||a),g=bt,h!==null){let Dt=h.views;p!==null&&(t.setRenderTargetFramebuffer(M,p.framebuffer),t.setRenderTarget(M));let Ot=!1;Dt.length!==X.cameras.length&&(X.cameras.length=0,Ot=!0);for(let Gt=0;Gt<Dt.length;Gt++){let jt=Dt[Gt],ie=null;if(p!==null)ie=p.getViewport(jt);else{let vt=f.getViewSubImage(d,jt);ie=vt.viewport,Gt===0&&(t.setRenderTargetTextures(M,vt.colorTexture,vt.depthStencilTexture),t.setRenderTarget(M))}let st=G[Gt];st===void 0&&(st=new sn,st.layers.enable(Gt),st.viewport=new Ie,G[Gt]=st),st.matrix.fromArray(jt.transform.matrix),st.matrix.decompose(st.position,st.quaternion,st.scale),st.projectionMatrix.fromArray(jt.projectionMatrix),st.projectionMatrixInverse.copy(st.projectionMatrix).invert(),st.viewport.set(ie.x,ie.y,ie.width,ie.height),Gt===0&&(X.matrix.copy(st.matrix),X.matrix.decompose(X.position,X.quaternion,X.scale)),Ot===!0&&X.cameras.push(st)}let Tt=s.enabledFeatures;if(Tt&&Tt.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&_){f=n.getBinding();let Gt=f.getDepthInformation(Dt[0]);Gt&&Gt.isValid&&Gt.texture&&u.init(Gt,s.renderState)}if(Tt&&Tt.includes("camera-access")&&_){t.state.unbindTexture(),f=n.getBinding();for(let Gt=0;Gt<Dt.length;Gt++){let jt=Dt[Gt].camera;if(jt){let ie=m[jt];ie||(ie=new Tr,m[jt]=ie);let st=f.getCameraImage(jt);ie.sourceTexture=st}}}}for(let Dt=0;Dt<A.length;Dt++){let Ot=T[Dt],Tt=A[Dt];Ot!==null&&Tt!==void 0&&Tt.update(Ot,bt,l||a)}lt&&lt($,bt),bt.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:bt}),g=null}let It=new cd;It.setAnimationLoop(Ft),this.setAnimationLoop=function($){lt=$},this.dispose=function(){}}},tx=new xe,yd=new ne;yd.set(-1,0,0,0,1,0,0,0,1);function ex(i,t){function e(u,m){u.matrixAutoUpdate===!0&&u.updateMatrix(),m.value.copy(u.matrix)}function n(u,m){m.color.getRGB(u.fogColor.value,Dc(i)),m.isFog?(u.fogNear.value=m.near,u.fogFar.value=m.far):m.isFogExp2&&(u.fogDensity.value=m.density)}function s(u,m,S,E,M){m.isNodeMaterial?m.uniformsNeedUpdate=!1:m.isMeshBasicMaterial?r(u,m):m.isMeshLambertMaterial?(r(u,m),m.envMap&&(u.envMapIntensity.value=m.envMapIntensity)):m.isMeshToonMaterial?(r(u,m),f(u,m)):m.isMeshPhongMaterial?(r(u,m),h(u,m),m.envMap&&(u.envMapIntensity.value=m.envMapIntensity)):m.isMeshStandardMaterial?(r(u,m),d(u,m),m.isMeshPhysicalMaterial&&p(u,m,M)):m.isMeshMatcapMaterial?(r(u,m),g(u,m)):m.isMeshDepthMaterial?r(u,m):m.isMeshDistanceMaterial?(r(u,m),_(u,m)):m.isMeshNormalMaterial?r(u,m):m.isLineBasicMaterial?(a(u,m),m.isLineDashedMaterial&&o(u,m)):m.isPointsMaterial?c(u,m,S,E):m.isSpriteMaterial?l(u,m):m.isShadowMaterial?(u.color.value.copy(m.color),u.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function r(u,m){u.opacity.value=m.opacity,m.color&&u.diffuse.value.copy(m.color),m.emissive&&u.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(u.map.value=m.map,e(m.map,u.mapTransform)),m.alphaMap&&(u.alphaMap.value=m.alphaMap,e(m.alphaMap,u.alphaMapTransform)),m.bumpMap&&(u.bumpMap.value=m.bumpMap,e(m.bumpMap,u.bumpMapTransform),u.bumpScale.value=m.bumpScale,m.side===je&&(u.bumpScale.value*=-1)),m.normalMap&&(u.normalMap.value=m.normalMap,e(m.normalMap,u.normalMapTransform),u.normalScale.value.copy(m.normalScale),m.side===je&&u.normalScale.value.negate()),m.displacementMap&&(u.displacementMap.value=m.displacementMap,e(m.displacementMap,u.displacementMapTransform),u.displacementScale.value=m.displacementScale,u.displacementBias.value=m.displacementBias),m.emissiveMap&&(u.emissiveMap.value=m.emissiveMap,e(m.emissiveMap,u.emissiveMapTransform)),m.specularMap&&(u.specularMap.value=m.specularMap,e(m.specularMap,u.specularMapTransform)),m.alphaTest>0&&(u.alphaTest.value=m.alphaTest);let S=t.get(m),E=S.envMap,M=S.envMapRotation;E&&(u.envMap.value=E,u.envMapRotation.value.setFromMatrix4(tx.makeRotationFromEuler(M)).transpose(),E.isCubeTexture&&E.isRenderTargetTexture===!1&&u.envMapRotation.value.premultiply(yd),u.reflectivity.value=m.reflectivity,u.ior.value=m.ior,u.refractionRatio.value=m.refractionRatio),m.lightMap&&(u.lightMap.value=m.lightMap,u.lightMapIntensity.value=m.lightMapIntensity,e(m.lightMap,u.lightMapTransform)),m.aoMap&&(u.aoMap.value=m.aoMap,u.aoMapIntensity.value=m.aoMapIntensity,e(m.aoMap,u.aoMapTransform))}function a(u,m){u.diffuse.value.copy(m.color),u.opacity.value=m.opacity,m.map&&(u.map.value=m.map,e(m.map,u.mapTransform))}function o(u,m){u.dashSize.value=m.dashSize,u.totalSize.value=m.dashSize+m.gapSize,u.scale.value=m.scale}function c(u,m,S,E){u.diffuse.value.copy(m.color),u.opacity.value=m.opacity,u.size.value=m.size*S,u.scale.value=E*.5,m.map&&(u.map.value=m.map,e(m.map,u.uvTransform)),m.alphaMap&&(u.alphaMap.value=m.alphaMap,e(m.alphaMap,u.alphaMapTransform)),m.alphaTest>0&&(u.alphaTest.value=m.alphaTest)}function l(u,m){u.diffuse.value.copy(m.color),u.opacity.value=m.opacity,u.rotation.value=m.rotation,m.map&&(u.map.value=m.map,e(m.map,u.mapTransform)),m.alphaMap&&(u.alphaMap.value=m.alphaMap,e(m.alphaMap,u.alphaMapTransform)),m.alphaTest>0&&(u.alphaTest.value=m.alphaTest)}function h(u,m){u.specular.value.copy(m.specular),u.shininess.value=Math.max(m.shininess,1e-4)}function f(u,m){m.gradientMap&&(u.gradientMap.value=m.gradientMap)}function d(u,m){u.metalness.value=m.metalness,m.metalnessMap&&(u.metalnessMap.value=m.metalnessMap,e(m.metalnessMap,u.metalnessMapTransform)),u.roughness.value=m.roughness,m.roughnessMap&&(u.roughnessMap.value=m.roughnessMap,e(m.roughnessMap,u.roughnessMapTransform)),m.envMap&&(u.envMapIntensity.value=m.envMapIntensity)}function p(u,m,S){u.ior.value=m.ior,m.diffuseRoughness>0&&(u.diffuseRoughness.value=m.diffuseRoughness,m.diffuseRoughnessMap&&(u.diffuseRoughnessMap.value=m.diffuseRoughnessMap,e(m.diffuseRoughnessMap,u.diffuseRoughnessMapTransform))),m.sheen>0&&(u.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),u.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(u.sheenColorMap.value=m.sheenColorMap,e(m.sheenColorMap,u.sheenColorMapTransform)),m.sheenRoughnessMap&&(u.sheenRoughnessMap.value=m.sheenRoughnessMap,e(m.sheenRoughnessMap,u.sheenRoughnessMapTransform))),m.clearcoat>0&&(u.clearcoat.value=m.clearcoat,u.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(u.clearcoatMap.value=m.clearcoatMap,e(m.clearcoatMap,u.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(u.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,e(m.clearcoatRoughnessMap,u.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(u.clearcoatNormalMap.value=m.clearcoatNormalMap,e(m.clearcoatNormalMap,u.clearcoatNormalMapTransform),u.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===je&&u.clearcoatNormalScale.value.negate())),m.dispersion>0&&(u.dispersion.value=m.dispersion),m.retroreflectivity>0&&(u.retroreflectivity.value=m.retroreflectivity),m.iridescence>0&&(u.iridescence.value=m.iridescence,u.iridescenceIOR.value=m.iridescenceIOR,u.iridescenceThicknessMinimum.value=m.iridescenceThicknessMinimum,u.iridescenceThicknessMaximum.value=m.iridescenceThicknessMaximum,m.iridescenceMap&&(u.iridescenceMap.value=m.iridescenceMap,e(m.iridescenceMap,u.iridescenceMapTransform)),m.iridescenceThicknessMap&&(u.iridescenceThicknessMap.value=m.iridescenceThicknessMap,e(m.iridescenceThicknessMap,u.iridescenceThicknessMapTransform))),m.transmission>0&&(u.transmission.value=m.transmission,u.transmissionSamplerMap.value=S.texture,u.transmissionSamplerSize.value.set(S.width,S.height),m.transmissionMap&&(u.transmissionMap.value=m.transmissionMap,e(m.transmissionMap,u.transmissionMapTransform)),u.thickness.value=m.thickness,m.thicknessMap&&(u.thicknessMap.value=m.thicknessMap,e(m.thicknessMap,u.thicknessMapTransform)),u.attenuationDistance.value=m.attenuationDistance,u.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(u.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(u.anisotropyMap.value=m.anisotropyMap,e(m.anisotropyMap,u.anisotropyMapTransform))),u.specularIntensity.value=m.specularIntensity,u.specularColor.value.copy(m.specularColor),m.specularColorMap&&(u.specularColorMap.value=m.specularColorMap,e(m.specularColorMap,u.specularColorMapTransform)),m.specularIntensityMap&&(u.specularIntensityMap.value=m.specularIntensityMap,e(m.specularIntensityMap,u.specularIntensityMapTransform))}function g(u,m){m.matcap&&(u.matcap.value=m.matcap)}function _(u,m){let S=t.get(m).light;u.referencePosition.value.setFromMatrixPosition(S.matrixWorld),u.nearDistance.value=S.shadow.camera.near,u.farDistance.value=S.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function nx(i,t,e,n){let s={},r={};function a(S,E){let M=E.program;n.uniformBlockBinding(S,M,s[S.id])}function o(S,E){let M=s[S.id];M===void 0&&(g(S),M=c(S),s[S.id]=M,S.addEventListener("dispose",u));let A=E.program;n.updateUBOMapping(S,A);let T=t.render.frame;r[S.id]!==T&&(l(S),r[S.id]=T)}function c(S){let E=i.createBuffer(),M=S.__size,A=S.usage;return i.bindBuffer(i.UNIFORM_BUFFER,E),i.bufferData(i.UNIFORM_BUFFER,M,A),i.bindBuffer(i.UNIFORM_BUFFER,null),E}function l(S){let E=s[S.id],M=S.uniforms,A=S.__cache;i.bindBuffer(i.UNIFORM_BUFFER,E);for(let T=0,x=M.length;T<x;T++){let b=M[T];if(Array.isArray(b))for(let O=0,P=b.length;O<P;O++)h(b[O],T,O,A);else h(b,T,0,A)}i.bindBuffer(i.UNIFORM_BUFFER,null)}function h(S,E,M,A){if(d(S,E,M,A)===!0){let T=S.__offset,x=S.value;if(Array.isArray(x)){let b=0;for(let O=0;O<x.length;O++){let P=x[O],F=_(P,!0);f(P,S.__data,b),b+=F.storage/Float32Array.BYTES_PER_ELEMENT}}else f(x,S.__data,0);i.bufferSubData(i.UNIFORM_BUFFER,T,S.__data)}}function f(S,E,M){typeof S=="number"||typeof S=="boolean"?E[M]=S:S.isMatrix3?(E[M]=S.elements[0],E[M+1]=S.elements[1],E[M+2]=S.elements[2],E[M+3]=0,E[M+4]=S.elements[3],E[M+5]=S.elements[4],E[M+6]=S.elements[5],E[M+7]=0,E[M+8]=S.elements[6],E[M+9]=S.elements[7],E[M+10]=S.elements[8],E[M+11]=0):ArrayBuffer.isView(S)?E.set(S.subarray(0,E.length-M),M):S.toArray(E,M)}function d(S,E,M,A){let T=S.value,x=E+"_"+M;if(Array.isArray(T)){A[x]===void 0&&(A[x]=[]);let b=A[x],O=!1;for(let P=0;P<T.length;P++)p(T[P],b,P)===!0&&(O=!0);return O}return p(T,A,x)}function p(S,E,M){if(E[M]===void 0)return typeof S=="number"||typeof S=="boolean"?E[M]=S:ArrayBuffer.isView(S)?E[M]=S.slice():E[M]=S.clone(),!0;{let A=E[M];if(typeof S=="number"||typeof S=="boolean"){if(A!==S)return E[M]=S,!0}else{if(ArrayBuffer.isView(S))return!0;if(A.equals(S)===!1)return A.copy(S),!0}}return!1}function g(S){let E=S.uniforms,M=0,A=16;for(let x=0,b=E.length;x<b;x++){let O=Array.isArray(E[x])?E[x]:[E[x]];for(let P=0,F=O.length;P<F;P++){let G=O[P],X=Array.isArray(G.value)?G.value:[G.value],C=Array.isArray(E[x])||Array.isArray(G.value),Y=M;for(let q=0,ut=X.length;q<ut;q++){let K=X[q],rt=_(K,C),lt=M%A,Ft=lt%rt.boundary,It=lt+Ft;M+=Ft,It!==0&&A-It<rt.storage&&(M+=A-It),q===0&&(Y=M),M+=rt.storage}let j=G.type==="int"?Int32Array:G.type==="uint"?Uint32Array:Float32Array;G.__data=new j((M-Y)/Float32Array.BYTES_PER_ELEMENT),G.__offset=Y}}let T=M%A;return T>0&&(M+=A-T),S.__size=M,S.__cache={},this}function _(S,E){let M={boundary:0,storage:0};return typeof S=="number"||typeof S=="boolean"?(M.boundary=4,M.storage=4):S.isVector2?(M.boundary=8,M.storage=8):S.isVector3||S.isColor?(M.boundary=16,M.storage=12):S.isVector4?(M.boundary=16,M.storage=16):S.isMatrix3?(M.boundary=16,M.storage=48):S.isMatrix4?(M.boundary=16,M.storage=64):S.isTexture?Zt("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(S)?(M.boundary=16,M.storage=S.byteLength):Zt("WebGLRenderer: Unsupported uniform value type.",S),E===!0&&(M.boundary=16,M.storage=Math.ceil(M.storage/16)*16),M}function u(S){let E=S.target;E.removeEventListener("dispose",u),i.deleteBuffer(s[E.id]),delete s[E.id],delete r[E.id]}function m(){for(let S in s)i.deleteBuffer(s[S]);s={},r={}}return{bind:a,update:o,dispose:m}}var ix=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),Kn=null;function sx(){return Kn===null&&(Kn=new vr(ix,16,16,Oi,Bn),Kn.name="DFG_LUT",Kn.minFilter=on,Kn.magFilter=on,Kn.wrapS=qn,Kn.wrapT=qn,Kn.generateMipmaps=!1,Kn.needsUpdate=!0),Kn}var ul=class{constructor(t={}){let{canvas:e=Ru(),context:n=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:f=!1,reversedDepthBuffer:d=!1,outputBufferType:p=hn}=t;this.isWebGLRenderer=!0;let g;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");g=n.getContextAttributes().alpha}else g=a;let _=p,u=new Set([Lo,Io,Po]),m=new Set([hn,On,Xs,ns,Ao,Ro]),S=new Uint32Array(4),E=new Int32Array(4),M={textures:[],min:[],max:[],resolution:[]},A=null,T=null,x=[],b=[],O=null;this.domElement=e,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Jn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let P=this,F=!1,G=null,X=null,C=null,Y=null;this._outputColorSpace=an;let j=0,q=0,ut=null,K=-1,rt=null,lt=new Ie,Ft=new Ie,It=null,$=new re(0),bt=0,Dt=e.width,Ot=e.height,Tt=1,Xt=null,ve=null,Gt=new Ie(0,0,Dt,Ot),jt=new Ie(0,0,Dt,Ot),ie=!1,st=new Ci,vt=new Ka,Mt=!1,Nt=!1,wt=new xe,Qt=new N,zt=new Ie,ae={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},se=!1;function ee(){return ut===null?Tt:1}let D=n;function Ce(v,L){return e.getContext(v,L)}let $t,ge,St,Te,kt,Yt,w,y,k,pt,at,gt,Ct,Q,nt,At,R,it,tt,Rt,I,V,J;try{let v={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:f};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${"187"}`),e.addEventListener("webglcontextlost",ht,!1),e.addEventListener("webglcontextrestored",Lt,!1),e.addEventListener("webglcontextcreationerror",dt,!1),D===null){let L="webgl2";if(D=Ce(L,v),D===null)throw Ce(L)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}ct()}catch(v){throw e.removeEventListener("webglcontextlost",ht,!1),e.removeEventListener("webglcontextrestored",Lt,!1),e.removeEventListener("webglcontextcreationerror",dt,!1),te("WebGLRenderer: "+v.message),v}function ct(){$t=new mg(D),$t.init(),I=new K_(D,$t),ge=new sg(D,$t,t,I),St=new $_(D,$t),ge.reversedDepthBuffer&&d&&St.buffers.depth.setReversed(!0),X=D.createFramebuffer(),C=D.createFramebuffer(),Y=D.createFramebuffer(),Te=new xg(D),kt=new U_,Yt=new J_(D,$t,St,kt,ge,I,Te),w=new pg(P),y=new vp(D),V=new ng(D,y),k=new gg(D,y,Te,V),pt=new vg(D,k,y,V,Te),it=new yg(D,ge,Yt),nt=new rg(kt),at=new N_(P,w,$t,ge,V,nt),gt=new ex(P,kt),Ct=new O_,Q=new V_($t),R=new eg(P,w,St,pt,g,c),At=new Z_(P,pt,ge),J=new nx(D,Te,ge,St),tt=new ig(D,$t,Te),Rt=new _g(D,$t,Te),Te.programs=at.programs,P.capabilities=ge,P.extensions=$t,P.properties=kt,P.renderLists=Ct,P.shadowMap=At,P.state=St,P.info=Te}_!==hn&&(O=new Sg(_,e.width,e.height,o,s,r));let Z=new Kc(P,D);this.xr=Z,this.getContext=function(){return D},this.getContextAttributes=function(){return D.getContextAttributes()},this.forceContextLoss=function(){let v=$t.get("WEBGL_lose_context");v&&v.loseContext()},this.forceContextRestore=function(){let v=$t.get("WEBGL_lose_context");v&&v.restoreContext()},this.getPixelRatio=function(){return Tt},this.setPixelRatio=function(v){v!==void 0&&(Tt=v,this.setSize(Dt,Ot,!1))},this.getSize=function(v){return v.set(Dt,Ot)},this.setSize=function(v,L,W=!0){if(Z.isPresenting){Zt("WebGLRenderer: Can't change size while VR device is presenting.");return}Dt=v,Ot=L,e.width=Math.floor(v*Tt),e.height=Math.floor(L*Tt),W===!0&&(e.style.width=v+"px",e.style.height=L+"px"),O!==null&&O.setSize(e.width,e.height),this.setViewport(0,0,v,L)},this.getDrawingBufferSize=function(v){return v.set(Dt*Tt,Ot*Tt).floor()},this.setDrawingBufferSize=function(v,L,W){Dt=v,Ot=L,Tt=W,e.width=Math.floor(v*W),e.height=Math.floor(L*W),this.setViewport(0,0,v,L)},this.setEffects=function(v){if(_===hn){te("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(v){for(let L=0;L<v.length;L++)if(v[L].isOutputPass===!0){Zt("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}O.setEffects(v||[])},this.getCurrentViewport=function(v){return v.copy(lt)},this.getViewport=function(v){return v.copy(Gt)},this.setViewport=function(v,L,W,z){v.isVector4?Gt.set(v.x,v.y,v.z,v.w):Gt.set(v,L,W,z),St.viewport(lt.copy(Gt).multiplyScalar(ee()).round())},this.getScissor=function(v){return v.copy(jt)},this.setScissor=function(v,L,W,z){v.isVector4?jt.set(v.x,v.y,v.z,v.w):jt.set(v,L,W,z),St.scissor(Ft.copy(jt).multiplyScalar(ee()).round())},this.getScissorTest=function(){return ie},this.setScissorTest=function(v){St.setScissorTest(ie=v)},this.setOpaqueSort=function(v){Xt=v},this.setTransparentSort=function(v){ve=v},this.getClearColor=function(v){return v.copy(R.getClearColor())},this.setClearColor=function(){R.setClearColor(...arguments)},this.getClearAlpha=function(){return R.getClearAlpha()},this.setClearAlpha=function(){R.setClearAlpha(...arguments)},this.clear=function(v=!0,L=!0,W=!0){let z=0;if(v){let H=!1;if(ut!==null){let et=ut.texture.format;H=u.has(et)}if(H){let et=ut.texture.type,Pt=m.has(et),_t=R.getClearColor(),ot=R.getClearAlpha(),mt=_t.r,Vt=_t.g,Wt=_t.b;Pt?(S[0]=mt,S[1]=Vt,S[2]=Wt,S[3]=ot,D.clearBufferuiv(D.COLOR,0,S)):(E[0]=mt,E[1]=Vt,E[2]=Wt,E[3]=ot,D.clearBufferiv(D.COLOR,0,E))}else z|=D.COLOR_BUFFER_BIT}L&&(z|=D.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),W&&(z|=D.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),z!==0&&D.clear(z)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(v){v.setRenderer(this),G=v},this.dispose=function(){e.removeEventListener("webglcontextlost",ht,!1),e.removeEventListener("webglcontextrestored",Lt,!1),e.removeEventListener("webglcontextcreationerror",dt,!1),R.dispose(),Ct.dispose(),Q.dispose(),Yt.dispose(),kt.dispose(),w.dispose(),pt.dispose(),k.dispose(),V.dispose(),J.dispose(),at.dispose(),Z.dispose(),Z.removeEventListener("sessionstart",Gn),Z.removeEventListener("sessionend",ei),wn.stop()};function ht(v){v.preventDefault(),Ac("WebGLRenderer: Context Lost."),F=!0}function Lt(){Ac("WebGLRenderer: Context Restored."),F=!1;let v=Te.autoReset,L=At.enabled,W=At.autoUpdate,z=At.needsUpdate,H=At.type;ct(),Te.autoReset=v,At.enabled=L,At.autoUpdate=W,At.needsUpdate=z,At.type=H}function dt(v){te("WebGLRenderer: A WebGL context could not be created. Reason: ",v.statusMessage)}function oe(v){let L=v.target;L.removeEventListener("dispose",oe),we(L)}function we(v){ze(v),kt.remove(v)}function ze(v){let L=kt.get(v).programs;L!==void 0&&(L.forEach(function(W){at.releaseProgram(W)}),v.isShaderMaterial&&at.releaseShaderCache(v))}this.renderBufferDirect=function(v,L,W,z,H,et){L===null&&(L=ae);let Pt=H.isMesh&&H.matrixWorld.determinantAffine()<0,_t=B(v,L,W,z,H);St.setMaterial(z,Pt);let ot=W.index,mt=1;if(z.wireframe===!0){if(ot=k.getWireframeAttribute(W),ot===void 0)return;mt=2}let Vt=W.drawRange,Wt=W.attributes.position,Et=Vt.start*mt,Jt=(Vt.start+Vt.count)*mt;et!==null&&(Et=Math.max(Et,et.start*mt),Jt=Math.min(Jt,(et.start+et.count)*mt)),ot!==null?(Et=Math.max(Et,0),Jt=Math.min(Jt,ot.count)):Wt!=null&&(Et=Math.max(Et,0),Jt=Math.min(Jt,Wt.count));let Ae=Jt-Et;if(Ae<0||Ae===1/0)return;V.setup(H,z,_t,W,ot);let be,Me=tt;if(ot!==null&&(be=y.get(ot),Me=Rt,Me.setIndex(be)),H.isMesh)z.wireframe===!0?(St.setLineWidth(z.wireframeLinewidth*ee()),Me.setMode(D.LINES)):Me.setMode(D.TRIANGLES);else if(H.isLine){let me=z.linewidth;me===void 0&&(me=1),St.setLineWidth(me*ee()),H.isLineSegments?Me.setMode(D.LINES):H.isLineLoop?Me.setMode(D.LINE_LOOP):Me.setMode(D.LINE_STRIP)}else H.isPoints?Me.setMode(D.POINTS):H.isSprite&&Me.setMode(D.TRIANGLES);if(H.isBatchedMesh)if($t.get("WEBGL_multi_draw"))Me.renderMultiDraw(H._multiDrawStarts,H._multiDrawCounts,H._multiDrawCount);else{let me=H._multiDrawStarts,Bt=H._multiDrawCounts,Ue=H._multiDrawCount,pe=ot?y.get(ot).bytesPerElement:1,kn=kt.get(z).currentProgram.getUniforms();for(let Oe=0;Oe<Ue;Oe++)kn.setValue(D,"_gl_DrawID",Oe),Me.render(me[Oe]/pe,Bt[Oe])}else if(H.isInstancedMesh)Me.renderInstances(Et,Ae,H.count);else if(W.isInstancedBufferGeometry){let me=W._maxInstanceCount!==void 0?W._maxInstanceCount:1/0,Bt=Math.min(W.instanceCount,me);Me.renderInstances(Et,Ae,Bt)}else Me.render(Et,Ae)};function fn(v,L,W,z){G!==null&&v.isNodeMaterial&&G.setObject(z,v),Mt===!0&&nt.setState(v,W,!1),v.transparent===!0&&v.side===cn&&v.forceSinglePass===!1?(v.side=je,v.needsUpdate=!0,Pe(v,L,z),v.side=Fi,v.needsUpdate=!0,Pe(v,L,z),v.side=cn):Pe(v,L,z)}this.compile=function(v,L,W=null){W===null&&(W=v),G!==null&&G.renderStart(v,L,W),T=Q.get(W),T.init(L),b.push(T),W.traverseVisible(function(H){H.isLight&&H.layers.test(L.layers)&&(T.pushLight(H),H.castShadow&&T.pushShadow(H))}),v!==W&&v.traverseVisible(function(H){H.isLight&&H.layers.test(L.layers)&&(T.pushLight(H),H.castShadow&&T.pushShadow(H))}),T.setupLights(),G!==null&&G.updateLights(T.state.lightsArray),Nt=this.localClippingEnabled,Mt=nt.init(this.clippingPlanes,Nt),Mt===!0&&nt.setGlobalState(this.clippingPlanes,L),G!==null&&At.render(T.state.shadowsArray,W,L);let z=new Set;return v.traverse(function(H){if(!(H.isMesh||H.isPoints||H.isLine||H.isSprite))return;let et=H.material;if(et)if(Array.isArray(et))for(let Pt=0;Pt<et.length;Pt++){let _t=et[Pt];fn(_t,W,L,H),z.add(_t)}else fn(et,W,L,H),z.add(et)}),T=b.pop(),G!==null&&G.renderEnd(),z},this.compileAsync=function(v,L,W=null){let z=this.compile(v,L,W);return new Promise(H=>{function et(){if(z.forEach(function(Pt){let ot=kt.get(Pt).currentProgram;(ot===void 0||ot.isReady())&&z.delete(Pt)}),z.size===0){H(v);return}setTimeout(et,10)}$t.get("KHR_parallel_shader_compile")!==null?et():setTimeout(et,10)})};let vi=null;function ti(v){vi&&vi(v)}function Gn(){wn.stop()}function ei(){wn.start()}let wn=new cd;wn.setAnimationLoop(ti),typeof self<"u"&&wn.setContext(self),this.setAnimationLoop=function(v){vi=v,Z.setAnimationLoop(v),v===null?wn.stop():wn.start()},Z.addEventListener("sessionstart",Gn),Z.addEventListener("sessionend",ei),this.render=function(v,L){if(L!==void 0&&L.isCamera!==!0){te("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(F===!0)return;G!==null&&G.renderStart(v,L);let W=Z.enabled===!0&&Z.isPresenting===!0,z=O!==null&&(ut===null||W)&&O.begin(P,ut);if(v.matrixWorldAutoUpdate===!0&&v.updateMatrixWorld(),L.parent===null&&L.matrixWorldAutoUpdate===!0&&L.updateMatrixWorld(),Z.enabled===!0&&Z.isPresenting===!0&&(O===null||O.isCompositing()===!1)&&(Z.cameraAutoUpdate===!0&&Z.updateCamera(L),L=Z.getCamera()),v.isScene===!0&&v.onBeforeRender(P,v,L,ut),T=Q.get(v,b.length),T.init(L),T.state.textureUnits=Yt.getTextureUnits(),b.push(T),wt.multiplyMatrices(L.projectionMatrix,L.matrixWorldInverse),L.isArrayCamera?vt.setFromArrayCamera(L):st.setFromProjectionMatrix(wt,Rn,L.reversedDepth),Nt=this.localClippingEnabled,Mt=nt.init(this.clippingPlanes,Nt),A=Ct.get(v,x.length),A.init(),x.push(A),this.info.render.frame++,Z.enabled===!0&&Z.isPresenting===!0){let Pt=P.xr.getDepthSensingMesh();Pt!==null&&ni(Pt,L,-1/0,P.sortObjects)}ni(v,L,0,P.sortObjects),A.finish(),G!==null&&G.updateLights(T.state.lightsArray),P.sortObjects===!0&&A.sort(Xt,ve),se=Z.enabled===!1||Z.isPresenting===!1||Z.hasDepthSensing()===!1,se&&R.addToRenderList(A,v),this.info.autoReset===!0&&this.info.reset(),Mt===!0&&nt.beginShadows();let H=T.state.shadowsArray;if(At.render(H,v,L),Mt===!0&&nt.endShadows(),(z&&O.hasRenderPass())===!1){let Pt=A.opaque,_t=A.transmissive;if(T.setupLights(),L.isArrayCamera){let ot=L.cameras;if(_t.length>0)for(let mt=0,Vt=ot.length;mt<Vt;mt++){let Wt=ot[mt];pn(Pt,_t,v,Wt)}se&&R.render(v);for(let mt=0,Vt=ot.length;mt<Vt;mt++){let Wt=ot[mt];ii(A,v,Wt,Wt.viewport)}}else _t.length>0&&pn(Pt,_t,v,L),se&&R.render(v),ii(A,v,L)}ut!==null&&q===0&&(Yt.updateMultisampleRenderTarget(ut),Yt.updateRenderTargetMipmap(ut)),z&&O.end(P),v.isScene===!0&&v.onAfterRender(P,v,L),V.resetDefaultState(),K=-1,rt=null,b.pop(),b.length>0?(T=b[b.length-1],Yt.setTextureUnits(T.state.textureUnits),Mt===!0&&nt.setGlobalState(P.clippingPlanes,T.state.camera)):T=null,x.pop(),x.length>0?A=x[x.length-1]:A=null,G!==null&&G.renderEnd()};function ni(v,L,W,z){if(v.visible===!1)return;if(v.layers.test(L.layers)){if(v.isGroup)W=v.renderOrder;else if(v.isLOD)v.autoUpdate===!0&&v.update(L);else if(v.isLight)T.pushLight(v),v.castShadow&&T.pushShadow(v);else if(v.isSprite){let Pt=L.isArrayCamera?vt:st;if(!v.frustumCulled||v.intersectsFrustum(Pt)){z&&zt.setFromMatrixPosition(v.matrixWorld).applyMatrix4(wt);let _t=pt.update(v),ot=v.material;ot.visible&&A.push(v,_t,ot,W,zt.z,null,L)}}else if(v.isMesh||v.isLine||v.isPoints){let Pt=L.isArrayCamera?vt:st;if(!v.frustumCulled||v.intersectsFrustum(Pt)){let _t=pt.update(v),ot=v.material;if(z&&(v.boundingSphere!==void 0?(v.boundingSphere===null&&v.computeBoundingSphere(),zt.copy(v.boundingSphere.center)):(_t.boundingSphere===null&&_t.computeBoundingSphere(),zt.copy(_t.boundingSphere.center)),zt.applyMatrix4(v.matrixWorld).applyMatrix4(wt)),Array.isArray(ot)){let mt=_t.groups;for(let Vt=0,Wt=mt.length;Vt<Wt;Vt++){let Et=mt[Vt],Jt=ot[Et.materialIndex];Jt&&Jt.visible&&A.push(v,_t,Jt,W,zt.z,Et,L)}}else ot.visible&&A.push(v,_t,ot,W,zt.z,null,L)}}}let et=v.children;for(let Pt=0,_t=et.length;Pt<_t;Pt++)ni(et[Pt],L,W,z)}function ii(v,L,W,z){let{opaque:H,transmissive:et,transparent:Pt}=v;T.setupLightsView(W),Mt===!0&&nt.setGlobalState(P.clippingPlanes,W),z&&St.viewport(lt.copy(z)),H.length>0&&mn(H,L,W),et.length>0&&mn(et,L,W),Pt.length>0&&mn(Pt,L,W),St.buffers.depth.setTest(!0),St.buffers.depth.setMask(!0),St.buffers.color.setMask(!0),St.setPolygonOffset(!1)}function pn(v,L,W,z){if((W.isScene===!0?W.overrideMaterial:null)!==null)return;if(T.state.transmissionRenderTarget[z.id]===void 0){let Et=$t.has("EXT_color_buffer_half_float")||$t.has("EXT_color_buffer_float");T.state.transmissionRenderTarget[z.id]=new Mn(1,1,{generateMipmaps:!0,type:Et?Bn:hn,minFilter:gi,samples:Math.max(4,ge.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:de.workingColorSpace})}let et=T.state.transmissionRenderTarget[z.id],Pt=z.viewport||lt;et.setSize(Pt.z*P.transmissionResolutionScale,Pt.w*P.transmissionResolutionScale);let _t=P.getRenderTarget(),ot=P.getActiveCubeFace(),mt=P.getActiveMipmapLevel();P.setRenderTarget(et),P.getClearColor($),bt=P.getClearAlpha(),bt<1&&P.setClearColor(16777215,.5),P.clear(),se&&R.render(W);let Vt=P.toneMapping;P.toneMapping=Jn;let Wt=z.viewport;if(z.viewport!==void 0&&(z.viewport=void 0),T.setupLightsView(z),Mt===!0&&nt.setGlobalState(P.clippingPlanes,z),mn(v,W,z),Yt.updateMultisampleRenderTarget(et),Yt.updateRenderTargetMipmap(et),$t.has("WEBGL_multisampled_render_to_texture")===!1){let Et=!1;for(let Jt=0,Ae=L.length;Jt<Ae;Jt++){let be=L[Jt],{object:Me,geometry:me,material:Bt,group:Ue}=be;if(Bt.side===cn&&Me.layers.test(z.layers)){let pe=Bt.side;Bt.side=je,Bt.needsUpdate=!0,Mi(Me,W,z,me,Bt,Ue),Bt.side=pe,Bt.needsUpdate=!0,Et=!0}}Et===!0&&(Yt.updateMultisampleRenderTarget(et),Yt.updateRenderTargetMipmap(et))}P.setRenderTarget(_t,ot,mt),P.setClearColor($,bt),Wt!==void 0&&(z.viewport=Wt),P.toneMapping=Vt}function mn(v,L,W){let z=L.isScene===!0?L.overrideMaterial:null;for(let H=0,et=v.length;H<et;H++){let Pt=v[H],{object:_t,geometry:ot,group:mt}=Pt,Vt=Pt.material;Vt.allowOverride===!0&&z!==null&&(Vt=z),_t.layers.test(W.layers)&&Mi(_t,L,W,ot,Vt,mt)}}function Mi(v,L,W,z,H,et){G!==null&&H.isNodeMaterial&&G.setObject(v,H),v.onBeforeRender(P,L,W,z,H,et),v.modelViewMatrix.multiplyMatrices(W.matrixWorldInverse,v.matrixWorld),v.normalMatrix.getNormalMatrix(v.modelViewMatrix),H.onBeforeRender(P,L,W,z,v,et),H.transparent===!0&&H.side===cn&&H.forceSinglePass===!1?(H.side=je,H.needsUpdate=!0,P.renderBufferDirect(W,L,z,H,v,et),H.side=Fi,H.needsUpdate=!0,P.renderBufferDirect(W,L,z,H,v,et),H.side=cn):P.renderBufferDirect(W,L,z,H,v,et),v.onAfterRender(P,L,W,z,H,et)}function Si(v){let L=0;for(let W of v)W.texture!==null&&L++;return L}function Pe(v,L,W){L.isScene!==!0&&(L=ae);let z=kt.get(v),H=T.state.lights,et=T.state.shadowsArray,Pt=H.state.version,_t=at.getParameters(v,H.state,et,L,W,T.state.lightProbeGridArray),ot=at.getProgramCacheKey(_t),mt=z.programs;z.environment=v.isMeshStandardMaterial||v.isMeshLambertMaterial||v.isMeshPhongMaterial?L.environment:null,z.fog=L.fog;let Vt=v.isMeshStandardMaterial||v.isMeshLambertMaterial&&!v.envMap||v.isMeshPhongMaterial&&!v.envMap;z.envMap=w.get(v.envMap||z.environment,Vt),z.envMapRotation=z.environment!==null&&v.envMap===null?L.environmentRotation:v.envMapRotation,mt===void 0&&(v.addEventListener("dispose",oe),mt=new Map,z.programs=mt,z.programVariants=new Map);let Wt=mt.get(ot);if(Wt!==void 0){if(z.currentProgram===Wt&&z.lightsStateVersion===Pt)return U(v,_t),Wt}else _t.uniforms=at.getUniforms(v),G!==null&&v.isNodeMaterial&&G.build(v,W,_t),v.onBeforeCompile(_t,P),Wt=at.acquireProgram(_t,ot),mt.set(ot,Wt),z.uniforms=_t.uniforms;let Et=z.uniforms;return(!v.isShaderMaterial&&!v.isRawShaderMaterial||v.clipping===!0)&&(Et.clippingPlanes=nt.uniform),U(v,_t),z.needsLights=Ht(v),z.lightsStateVersion=Pt,z.needsLights&&(Et.ambientLightColor.value=H.state.ambient,Et.lightProbe.value=H.state.probe,Et.sunLights.value=H.state.sun,Et.sunLightShadows.value=H.state.sunShadow,Et.directionalLights.value=H.state.directional,Et.directionalLightShadows.value=H.state.directionalShadow,Et.spotLights.value=H.state.spot,Et.spotLightShadows.value=H.state.spotShadow,Et.rectAreaLights.value=H.state.rectArea,Et.ltc_1.value=H.state.rectAreaLTC1,Et.ltc_2.value=H.state.rectAreaLTC2,Et.pointLights.value=H.state.point,Et.pointLightShadows.value=H.state.pointShadow,Et.hemisphereLights.value=H.state.hemi,Et.sunShadowMatrix.value=H.state.sunShadowMatrix,Et.sunShadowCascade.value=H.state.sunShadowCascade,Et.directionalShadowMatrix.value=H.state.directionalShadowMatrix,Et.spotLightMatrix.value=H.state.spotLightMatrix,Et.spotLightMap.value=H.state.spotLightMap,Et.pointShadowMatrix.value=H.state.pointShadowMatrix),z.numLightProbeGrids=Si(T.state.lightProbeGridArray),z.currentProgram=Wt,z.uniformsList=null,Wt}function Qs(v,L,W,z,H){let et=kt.get(v),Pt=et.currentProgram.id+","+z+","+H,_t=et.programVariants.get(Pt);return _t===void 0?(_t=Pe(v,L,W),et.programVariants.set(Pt,_t)):(et.currentProgram=_t,et.uniformsList=null,et.outputColorSpace=z,et.toneMapping=H),_t}function hs(v){if(v.uniformsList===null){let L=v.currentProgram.getUniforms();v.uniformsList=qs.seqWithValue(L.seq,v.uniforms)}return v.uniformsList}function U(v,L){let W=kt.get(v);W.outputColorSpace=L.outputColorSpace,W.batching=L.batching,W.batchingColor=L.batchingColor,W.instancing=L.instancing,W.instancingColor=L.instancingColor,W.instancingMorph=L.instancingMorph,W.skinning=L.skinning,W.morphTargets=L.morphTargets,W.morphNormals=L.morphNormals,W.morphColors=L.morphColors,W.morphTargetsCount=L.morphTargetsCount,W.numClippingPlanes=L.numClippingPlanes,W.numIntersection=L.numClipIntersection,W.vertexAlphas=L.vertexAlphas,W.vertexTangents=L.vertexTangents,W.toneMapping=L.toneMapping}function B(v,L,W,z,H){L.isScene!==!0&&(L=ae),Yt.resetTextureUnits();let et=L.fog,Pt=z.isMeshStandardMaterial||z.isMeshLambertMaterial||z.isMeshPhongMaterial?L.environment:null,_t=ut===null?P.outputColorSpace:ut.isXRRenderTarget===!0?ut.texture.colorSpace:de.workingColorSpace,ot=z.isMeshStandardMaterial||z.isMeshLambertMaterial&&!z.envMap||z.isMeshPhongMaterial&&!z.envMap,mt=w.get(z.envMap||Pt,ot),Vt=z.vertexColors===!0&&!!W.attributes.color&&W.attributes.color.itemSize===4,Wt=!!W.attributes.tangent&&(!!z.normalMap||z.anisotropy>0),Et=!!W.morphAttributes.position,Jt=!!W.morphAttributes.normal,Ae=!!W.morphAttributes.color,be=Jn;z.toneMapped&&(ut===null||ut.isXRRenderTarget===!0)&&(be=P.toneMapping);let Me=W.morphAttributes.position||W.morphAttributes.normal||W.morphAttributes.color,me=Me!==void 0?Me.length:0,Bt=kt.get(z),Ue=T.state.lights;if(Mt===!0&&(Nt===!0||v!==rt)){let De=v===rt&&z.id===K;nt.setState(z,v,De)}let pe=!1,kn=!1;z.version===Bt.__version?Bt.needsLights&&Bt.lightsStateVersion!==Ue.state.version||H.isBatchedMesh&&Bt.batching===!1||!H.isBatchedMesh&&Bt.batching===!0||H.isBatchedMesh&&Bt.batchingColor===!0&&H._colorsTexture===null||H.isBatchedMesh&&Bt.batchingColor===!1&&H._colorsTexture!==null||H.isInstancedMesh&&Bt.instancing===!1||!H.isInstancedMesh&&Bt.instancing===!0||H.isSkinnedMesh&&Bt.skinning===!1||!H.isSkinnedMesh&&Bt.skinning===!0||H.isInstancedMesh&&Bt.instancingColor===!0&&H.instanceColor===null||H.isInstancedMesh&&Bt.instancingColor===!1&&H.instanceColor!==null||H.isInstancedMesh&&Bt.instancingMorph===!0&&H.morphTexture===null||H.isInstancedMesh&&Bt.instancingMorph===!1&&H.morphTexture!==null||Bt.envMap!==mt||z.fog===!0&&Bt.fog!==et||Bt.numClippingPlanes!==void 0&&(Bt.numClippingPlanes!==nt.numPlanes||Bt.numIntersection!==nt.numIntersection)||Bt.vertexAlphas!==Vt||Bt.vertexTangents!==Wt||Bt.morphTargets!==Et||Bt.morphNormals!==Jt||Bt.morphColors!==Ae||Bt.morphTargetsCount!==me||Bt.numLightProbeGrids!==Si(T.state.lightProbeGridArray)?pe=!0:(Bt.outputColorSpace!==_t||Bt.toneMapping!==be)&&(kn=!0):(pe=!0,Bt.__version=z.version);let Oe=Bt.currentProgram;(pe===!0||kn===!0)&&(Oe=kn===!0?Qs(z,L,H,_t,be):Pe(z,L,H),G&&z.isNodeMaterial&&G.onUpdateProgram(z,Oe,Bt));let zi=!1,Vn=!1,Wn=!1,_e=Oe.getUniforms(),Ke=Bt.uniforms;if(St.useProgram(Oe.program)&&(zi=!0,Vn=!0,Wn=!0),z.id!==K&&(K=z.id,Vn=!0),zi||rt!==v){St.buffers.depth.getReversed()&&v.reversedDepth!==!0&&(v._reversedDepth=!0,v.updateProjectionMatrix()),_e.setValue(D,"projectionMatrix",v.projectionMatrix),_e.setValue(D,"viewMatrix",v.matrixWorldInverse);let Ye=_e.map.cameraPosition;Ye!==void 0&&Ye.setValue(D,Qt.setFromMatrixPosition(v.matrixWorld)),ge.logarithmicDepthBuffer&&_e.setValue(D,"logDepthBufFC",2/(Math.log(v.far+1)/Math.LN2)),(z.isMeshPhongMaterial||z.isMeshToonMaterial||z.isMeshLambertMaterial||z.isMeshBasicMaterial||z.isMeshStandardMaterial||z.isShaderMaterial)&&_e.setValue(D,"isOrthographic",v.isOrthographicCamera===!0),rt!==v&&(rt=v,Vn=!0,Wn=!0)}if(Bt.needsLights&&(Ue.state.sunShadowMap.length>0&&_e.setValue(D,"sunShadowMap",Ue.state.sunShadowMap,Yt),Ue.state.directionalShadowMap.length>0&&_e.setValue(D,"directionalShadowMap",Ue.state.directionalShadowMap,Yt),Ue.state.spotShadowMap.length>0&&_e.setValue(D,"spotShadowMap",Ue.state.spotShadowMap,Yt),Ue.state.pointShadowMap.length>0&&_e.setValue(D,"pointShadowMap",Ue.state.pointShadowMap,Yt)),H.isSkinnedMesh){_e.setOptional(D,H,"bindMatrix"),_e.setOptional(D,H,"bindMatrixInverse");let De=H.skeleton;De&&(De.boneTexture===null&&De.computeBoneTexture(),_e.setValue(D,"boneTexture",De.boneTexture,Yt))}H.isBatchedMesh&&(_e.setOptional(D,H,"batchingTexture"),_e.setValue(D,"batchingTexture",H._matricesTexture,Yt),_e.setOptional(D,H,"batchingIdTexture"),_e.setValue(D,"batchingIdTexture",H._indirectTexture,Yt),_e.setOptional(D,H,"batchingColorTexture"),H._colorsTexture!==null&&_e.setValue(D,"batchingColorTexture",H._colorsTexture,Yt));let Ln=W.morphAttributes;if((Ln.position!==void 0||Ln.normal!==void 0||Ln.color!==void 0)&&it.update(H,W,Oe),(Vn||Bt.receiveShadow!==H.receiveShadow)&&(Bt.receiveShadow=H.receiveShadow,_e.setValue(D,"receiveShadow",H.receiveShadow)),(z.isMeshStandardMaterial||z.isMeshLambertMaterial||z.isMeshPhongMaterial)&&z.envMap===null&&L.environment!==null&&(Ke.envMapIntensity.value=L.environmentIntensity),Ke.dfgLUT!==void 0&&(Ke.dfgLUT.value=sx()),Vn){if(_e.setValue(D,"toneMappingExposure",P.toneMappingExposure),Bt.needsLights&&xt(Ke,Wn),et&&z.fog===!0&&gt.refreshFogUniforms(Ke,et),gt.refreshMaterialUniforms(Ke,z,Tt,Ot,T.state.transmissionRenderTarget[v.id]),Bt.needsLights&&Bt.numLightProbeGrids>0){let De=M,Ye=0;for(let si of T.state.lightProbeGridArray)si.texture!==null&&(De.textures[Ye]=si.texture,De.min[Ye]=si.boundingBox.min,De.max[Ye]=si.boundingBox.max,De.resolution[Ye]=si.resolution,Ye++);for(let si in De)De[si].length=Ye;Ke.probesSH.value=De.textures,Ke.probesMin.value=De.min,Ke.probesMax.value=De.max,Ke.probesResolution.value=De.resolution}qs.upload(D,hs(Bt),Ke,Yt)}if(z.isShaderMaterial&&z.uniformsNeedUpdate===!0&&(qs.upload(D,hs(Bt),Ke,Yt),z.uniformsNeedUpdate=!1),z.isSpriteMaterial&&_e.setValue(D,"center",H.center),_e.setValue(D,"modelViewMatrix",H.modelViewMatrix),_e.setValue(D,"normalMatrix",H.normalMatrix),_e.setValue(D,"modelMatrix",H.matrixWorld),z.uniformsGroups!==void 0){let De=z.uniformsGroups;for(let Ye=0,si=De.length;Ye<si;Ye++){let ch=De[Ye];J.update(ch,Oe),J.bind(ch,Oe)}}return Oe}function xt(v,L){v.ambientLightColor.needsUpdate=L,v.lightProbe.needsUpdate=L,v.sunLights.needsUpdate=L,v.sunLightShadows.needsUpdate=L,v.directionalLights.needsUpdate=L,v.directionalLightShadows.needsUpdate=L,v.pointLights.needsUpdate=L,v.pointLightShadows.needsUpdate=L,v.spotLights.needsUpdate=L,v.spotLightShadows.needsUpdate=L,v.rectAreaLights.needsUpdate=L,v.hemisphereLights.needsUpdate=L}function Ht(v){return v.isMeshLambertMaterial||v.isMeshToonMaterial||v.isMeshPhongMaterial||v.isMeshStandardMaterial||v.isShadowMaterial||v.isShaderMaterial&&v.lights===!0}this.getActiveCubeFace=function(){return j},this.getActiveMipmapLevel=function(){return q},this.getRenderTarget=function(){return ut},this.setRenderTargetTextures=function(v,L,W){let z=kt.get(v);z.__autoAllocateDepthBuffer=v.resolveDepthBuffer===!1,z.__autoAllocateDepthBuffer===!1&&(z.__useRenderToTexture=!1),kt.get(v.texture).__webglTexture=L,kt.get(v.depthTexture).__webglTexture=z.__autoAllocateDepthBuffer?void 0:W,z.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(v,L){let W=kt.get(v);W.__webglFramebuffer=L,W.__useDefaultFramebuffer=L===void 0},this.setRenderTarget=function(v,L=0,W=0){ut=v,j=L,q=W;let z=null,H=!1,et=!1;if(v){let _t=kt.get(v);if(_t.__useDefaultFramebuffer!==void 0){St.bindFramebuffer(D.FRAMEBUFFER,_t.__webglFramebuffer),lt.copy(v.viewport),Ft.copy(v.scissor),It=v.scissorTest,St.viewport(lt),St.scissor(Ft),St.setScissorTest(It),K=-1;return}else if(_t.__webglFramebuffer===void 0)Yt.setupRenderTarget(v);else if(_t.__hasExternalTextures)Yt.rebindTextures(v,kt.get(v.texture).__webglTexture,kt.get(v.depthTexture).__webglTexture);else if(v.depthBuffer){let Vt=v.depthTexture;if(_t.__boundDepthTexture!==Vt){if(Vt!==null&&kt.has(Vt)&&(v.width!==Vt.image.width||v.height!==Vt.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");Yt.setupDepthRenderbuffer(v)}}let ot=v.texture;(ot.isData3DTexture||ot.isDataArrayTexture||ot.isCompressedArrayTexture)&&(et=!0);let mt=kt.get(v).__webglFramebuffer;v.isWebGLCubeRenderTarget?(Array.isArray(mt[L])?z=mt[L][W]:z=mt[L],H=!0):v.samples>0&&Yt.useMultisampledRTT(v)===!1?z=kt.get(v).__webglMultisampledFramebuffer:Array.isArray(mt)?z=mt[W]:z=mt,lt.copy(v.viewport),Ft.copy(v.scissor),It=v.scissorTest}else lt.copy(Gt).multiplyScalar(Tt).floor(),Ft.copy(jt).multiplyScalar(Tt).floor(),It=ie;if(W!==0&&(z=X),St.bindFramebuffer(D.FRAMEBUFFER,z)&&St.drawBuffers(v,z),St.viewport(lt),St.scissor(Ft),St.setScissorTest(It),H){let _t=kt.get(v.texture);D.framebufferTexture2D(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_CUBE_MAP_POSITIVE_X+L,_t.__webglTexture,W)}else if(et){let _t=L;for(let ot=0;ot<v.textures.length;ot++){let mt=kt.get(v.textures[ot]);D.framebufferTextureLayer(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0+ot,mt.__webglTexture,W,_t)}}else if(v!==null&&W!==0){let _t=kt.get(v.texture);D.framebufferTexture2D(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,_t.__webglTexture,W)}K=-1};function ue(v){let L=kt.get(v);return(L.__readFormat!==v.format||L.__readType!==v.type)&&(L.__readFormat=v.format,L.__readType=v.type,L.__formatReadable=ge.textureFormatReadable(v.format),L.__typeReadable=ge.textureTypeReadable(v.type)),L}this.readRenderTargetPixels=function(v,L,W,z,H,et,Pt,_t=0){if(!(v&&v.isWebGLRenderTarget)){te("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let ot=kt.get(v).__webglFramebuffer;if(v.isWebGLCubeRenderTarget&&Pt!==void 0&&(ot=ot[Pt],Array.isArray(ot)&&(ot=ot[0])),ot){St.bindFramebuffer(D.FRAMEBUFFER,ot);try{let mt=v.textures[_t],Vt=mt.format,Wt=mt.type;v.textures.length>1&&D.readBuffer(D.COLOR_ATTACHMENT0+_t);let Et=ue(mt);if(Et.__formatReadable===!1){te("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(Et.__typeReadable===!1){te("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}L>=0&&L<=v.width-z&&W>=0&&W<=v.height-H&&D.readPixels(L,W,z,H,I.convert(Vt),I.convert(Wt),et)}finally{let mt=ut!==null?kt.get(ut).__webglFramebuffer:null;St.bindFramebuffer(D.FRAMEBUFFER,mt)}}},this.readRenderTargetPixelsAsync=async function(v,L,W,z,H,et,Pt,_t=0){if(!(v&&v.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let ot=kt.get(v).__webglFramebuffer;if(v.isWebGLCubeRenderTarget&&Pt!==void 0&&(ot=ot[Pt],Array.isArray(ot)&&(ot=ot[0])),ot)if(L>=0&&L<=v.width-z&&W>=0&&W<=v.height-H){St.bindFramebuffer(D.FRAMEBUFFER,ot);let mt=v.textures[_t],Vt=mt.format,Wt=mt.type;v.textures.length>1&&D.readBuffer(D.COLOR_ATTACHMENT0+_t);let Et=ue(mt);if(Et.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(Et.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let Jt=D.createBuffer();D.bindBuffer(D.PIXEL_PACK_BUFFER,Jt),D.bufferData(D.PIXEL_PACK_BUFFER,et.byteLength,D.STREAM_READ),D.readPixels(L,W,z,H,I.convert(Vt),I.convert(Wt),0),D.bindBuffer(D.PIXEL_PACK_BUFFER,null);let Ae=ut!==null?kt.get(ut).__webglFramebuffer:null;St.bindFramebuffer(D.FRAMEBUFFER,Ae);let be=D.fenceSync(D.SYNC_GPU_COMMANDS_COMPLETE,0);return D.flush(),await Pu(D,be,4),D.bindBuffer(D.PIXEL_PACK_BUFFER,Jt),D.getBufferSubData(D.PIXEL_PACK_BUFFER,0,et),D.bindBuffer(D.PIXEL_PACK_BUFFER,null),D.deleteBuffer(Jt),D.deleteSync(be),et}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(v,L=null,W=0){let z=Math.pow(2,-W),H=Math.floor(v.image.width*z),et=Math.floor(v.image.height*z),Pt=L!==null?L.x:0,_t=L!==null?L.y:0;Yt.setTexture2D(v,0),D.copyTexSubImage2D(D.TEXTURE_2D,W,0,0,Pt,_t,H,et),St.unbindTexture()},this.copyTextureToTexture=function(v,L,W=null,z=null,H=0,et=0){let Pt,_t,ot,mt,Vt,Wt,Et,Jt,Ae,be=v.isCompressedTexture?v.mipmaps[et]:v.image;if(W!==null)Pt=W.max.x-W.min.x,_t=W.max.y-W.min.y,ot=W.isBox3?W.max.z-W.min.z:1,mt=W.min.x,Vt=W.min.y,Wt=W.isBox3?W.min.z:0;else{let _e=Math.pow(2,-H);Pt=Math.floor(be.width*_e),_t=Math.floor(be.height*_e),v.isDataArrayTexture?ot=be.depth:v.isData3DTexture?ot=Math.floor(be.depth*_e):ot=1,mt=0,Vt=0,Wt=0}z!==null?(Et=z.x,Jt=z.y,Ae=z.z):(Et=0,Jt=0,Ae=0);let Me=I.convert(L.format),me=I.convert(L.type),Bt;L.isData3DTexture?(Yt.setTexture3D(L,0),Bt=D.TEXTURE_3D):L.isDataArrayTexture||L.isCompressedArrayTexture?(Yt.setTexture2DArray(L,0),Bt=D.TEXTURE_2D_ARRAY):(Yt.setTexture2D(L,0),Bt=D.TEXTURE_2D),St.activeTexture(D.TEXTURE0),St.pixelStorei(D.UNPACK_FLIP_Y_WEBGL,L.flipY),St.pixelStorei(D.UNPACK_PREMULTIPLY_ALPHA_WEBGL,L.premultiplyAlpha),St.pixelStorei(D.UNPACK_ALIGNMENT,L.unpackAlignment);let Ue=St.getParameter(D.UNPACK_ROW_LENGTH),pe=St.getParameter(D.UNPACK_IMAGE_HEIGHT),kn=St.getParameter(D.UNPACK_SKIP_PIXELS),Oe=St.getParameter(D.UNPACK_SKIP_ROWS),zi=St.getParameter(D.UNPACK_SKIP_IMAGES);St.pixelStorei(D.UNPACK_ROW_LENGTH,be.width),St.pixelStorei(D.UNPACK_IMAGE_HEIGHT,be.height),St.pixelStorei(D.UNPACK_SKIP_PIXELS,mt),St.pixelStorei(D.UNPACK_SKIP_ROWS,Vt),St.pixelStorei(D.UNPACK_SKIP_IMAGES,Wt);let Vn=v.isDataArrayTexture||v.isData3DTexture,Wn=L.isDataArrayTexture||L.isData3DTexture;if(v.isDepthTexture){let _e=kt.get(v),Ke=kt.get(L),Ln=kt.get(_e.__renderTarget),De=kt.get(Ke.__renderTarget);St.bindFramebuffer(D.READ_FRAMEBUFFER,Ln.__webglFramebuffer),St.bindFramebuffer(D.DRAW_FRAMEBUFFER,De.__webglFramebuffer);for(let Ye=0;Ye<ot;Ye++)Vn&&(D.framebufferTextureLayer(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,kt.get(v).__webglTexture,H,Wt+Ye),D.framebufferTextureLayer(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,kt.get(L).__webglTexture,et,Ae+Ye)),D.blitFramebuffer(mt,Vt,mt+Pt,Vt+_t,Et,Jt,Et+Pt,Jt+_t,D.DEPTH_BUFFER_BIT,D.NEAREST);St.bindFramebuffer(D.READ_FRAMEBUFFER,null),St.bindFramebuffer(D.DRAW_FRAMEBUFFER,null)}else if(H!==0||v.isRenderTargetTexture||kt.has(v)){let _e=kt.get(v),Ke=kt.get(L);St.bindFramebuffer(D.READ_FRAMEBUFFER,C),St.bindFramebuffer(D.DRAW_FRAMEBUFFER,Y);for(let Ln=0;Ln<ot;Ln++)Vn?D.framebufferTextureLayer(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,_e.__webglTexture,H,Wt+Ln):D.framebufferTexture2D(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,_e.__webglTexture,H),Wn?D.framebufferTextureLayer(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,Ke.__webglTexture,et,Ae+Ln):D.framebufferTexture2D(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,Ke.__webglTexture,et),H!==0?D.blitFramebuffer(mt,Vt,mt+Pt,Vt+_t,Et,Jt,Et+Pt,Jt+_t,D.COLOR_BUFFER_BIT,D.NEAREST):Wn?D.copyTexSubImage3D(Bt,et,Et,Jt,Ae+Ln,mt,Vt,Pt,_t):D.copyTexSubImage2D(Bt,et,Et,Jt,mt,Vt,Pt,_t);St.bindFramebuffer(D.READ_FRAMEBUFFER,null),St.bindFramebuffer(D.DRAW_FRAMEBUFFER,null)}else Wn?v.isDataTexture||v.isData3DTexture?D.texSubImage3D(Bt,et,Et,Jt,Ae,Pt,_t,ot,Me,me,be.data):L.isCompressedArrayTexture?D.compressedTexSubImage3D(Bt,et,Et,Jt,Ae,Pt,_t,ot,Me,be.data):D.texSubImage3D(Bt,et,Et,Jt,Ae,Pt,_t,ot,Me,me,be):v.isDataTexture?D.texSubImage2D(D.TEXTURE_2D,et,Et,Jt,Pt,_t,Me,me,be.data):v.isCompressedTexture?D.compressedTexSubImage2D(D.TEXTURE_2D,et,Et,Jt,be.width,be.height,Me,be.data):D.texSubImage2D(D.TEXTURE_2D,et,Et,Jt,Pt,_t,Me,me,be);St.pixelStorei(D.UNPACK_ROW_LENGTH,Ue),St.pixelStorei(D.UNPACK_IMAGE_HEIGHT,pe),St.pixelStorei(D.UNPACK_SKIP_PIXELS,kn),St.pixelStorei(D.UNPACK_SKIP_ROWS,Oe),St.pixelStorei(D.UNPACK_SKIP_IMAGES,zi),et===0&&L.generateMipmaps===!0&&L.mipmapsAutoUpdate===!0&&D.generateMipmap(Bt),St.unbindTexture()},this.initRenderTarget=function(v){kt.get(v).__webglFramebuffer===void 0&&Yt.setupRenderTarget(v)},this.initTexture=function(v){v.isCubeTexture?Yt.setTextureCube(v,0):v.isData3DTexture?Yt.setTexture3D(v,0):v.isDataArrayTexture||v.isCompressedArrayTexture?Yt.setTexture2DArray(v,0):Yt.setTexture2D(v,0),St.unbindTexture()},this.resetState=function(){j=0,q=0,ut=null,St.reset(),V.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Rn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;let e=this.getContext();e.drawingBufferColorSpace=de._getDrawingBufferColorSpace(t),e.unpackColorSpace=de._getUnpackColorSpace()}};var rx=`
.sim-aviso{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;pointer-events:none;z-index:50;font-family:'Atkinson Hyperlegible',system-ui,sans-serif}
.sim-aviso>div{pointer-events:auto;max-width:440px;margin:20px;background:#fff;border:2px solid #14213D;border-radius:16px;box-shadow:5px 5px 0 #14213D;padding:18px 22px;color:#14213D;font-size:17px;line-height:1.4;text-align:center}
.sim-aviso b{display:block;font-size:20px;margin-bottom:4px}
.sim-aviso button{margin-top:12px;font:700 16px 'Atkinson Hyperlegible',system-ui,sans-serif;background:#0F9D84;color:#fff;border:0;border-radius:10px;padding:9px 18px;cursor:pointer}
.sim-aviso.error>div{border-color:#F2603D;box-shadow:5px 5px 0 #F2603D}
.sim-aviso i{display:inline-block;width:14px;height:14px;border-radius:50%;background:#0F9D84;margin-right:8px;animation:simlat 1s ease-in-out infinite alternate}
@keyframes simlat{from{opacity:.25}to{opacity:1}}
@media (prefers-reduced-motion:reduce){.sim-aviso i{animation:none}}`;function vd(i=document.body){let t=document.createElement("style");t.textContent=rx,document.head.appendChild(t);let e=document.createElement("div");e.className="sim-aviso",e.setAttribute("role","status"),i.appendChild(e);let n=(r,a)=>{e.className="sim-aviso"+(a?" error":""),e.innerHTML=`<div>${r}</div>`,e.style.display="flex";let o=e.querySelector("button");o&&(o.onclick=()=>location.reload())},s=!1;return{cargando:()=>!s&&n("<i></i>Cargando simulaci\xF3n 3D\u2026"),listo:()=>{s||(e.style.display="none")},error:(r,a)=>{s=!0,n(`<b>${r}</b>${a}<br><button>Recargar la p\xE1gina</button>`,!0)}}}function Md(i,t){i.addEventListener("webglcontextlost",e=>{e.preventDefault(),t.error("Se perdi\xF3 el 3D","El navegador solt\xF3 la tarjeta gr\xE1fica. Cierra otras pesta\xF1as con 3D o video y recarga.")})}var Sd=["Tu navegador no pudo iniciar el 3D",'Prueba con Chrome o Edge actualizados, y revisa que la "aceleraci\xF3n por hardware" est\xE9 activada en la configuraci\xF3n del navegador.'];var Xe={vbat:11.1,bat:{llena:12.6,nominal:11.1,baja:9.9},caidaL298N:2.1,ruedaD:.065,via:.18,carga:.8,rpm12:280,ratio:21.3,ppr:11,i0:.07,istall:1.8,pwmHz:2e4};function pl(i,t,e=Xe.vbat){let n=e-Xe.caidaL298N,s=t===0?0:n*i,r=t*Xe.rpm12*(s/12)*Xe.carga,a=Math.PI*Xe.ruedaD*r/60,o=Xe.istall*s/12,c=t===0||i===0?0:Xe.i0+Math.max(0,o-Xe.i0)*(1-Xe.carga);return{v:s,vDisp:n,rpm:r,vel:a,corriente:c}}var rs=pl(1,1).vel,oa=i=>Math.min(1,Math.abs(i)/rs),Qc=i=>Math.abs(i)/60*Xe.ppr*Xe.ratio,bd=(i,t)=>({v:(i+t)/2,w:(t-i)/Xe.via}),Ed=(i,t)=>({izq:i-t*Xe.via/2,der:i+t*Xe.via/2});var $s=$d(wd(),1),th=$s.default.tcrt5000.cintaMm/1e3,ax=.004,Hn={tcrtZ:.112,tcrtX:$s.default.tcrt5000.posicionesMm.map(i=>-i/1e3),usF:{z:.109},usR:{z:-.109},semiAngulo:$s.default.hcsr04.conoGrados*Math.PI/180},as={critica:$s.default.hcsr04.paradaCm/100,precaucion:$s.default.hcsr04.precaucionCm/100},eh=i=>i<as.critica?"critica":i<as.precaucion?"precaucion":"libre",Fe=1800,ox=i=>[1.3*Math.cos(i)+.06*Math.cos(3*i),.75*Math.sin(i)+.04*Math.sin(2*i)];function Ad(){let i=new Float64Array(Fe),t=new Float64Array(Fe),e=new Float64Array(Fe+1);for(let l=0;l<Fe;l++){let h=ox(2*Math.PI*l/Fe);i[l]=h[0],t[l]=h[1]}for(let l=1;l<=Fe;l++){let h=l-1,f=l%Fe;e[l]=e[l-1]+Math.hypot(i[f]-i[h],t[f]-t[h])}let n=e[Fe],s=l=>{l=(l%n+n)%n;let h=0,f=Fe;for(;f-h>1;){let d=h+f>>1;e[d]<=l?h=d:f=d}return{i:h,f:(l-e[h])/(e[h+1]-e[h])}},r=l=>{let{i:h,f}=s(l),d=(h+1)%Fe,p=i[h]+(i[d]-i[h])*f,g=t[h]+(t[d]-t[h])*f,_=i[d]-i[h],u=t[d]-t[h],m=Math.hypot(_,u);return{x:p,z:g,tx:_/m,tz:u/m}},a=l=>{let h=(l-3+Fe)%Fe,f=(l+3)%Fe,d=i[l]-i[h],p=t[l]-t[h],g=i[f]-i[l],_=t[f]-t[l],u=p*g-d*_,m=Math.hypot(d,p)*Math.hypot(g,_)*Math.hypot(i[f]-i[h],t[f]-t[h]);return 2*u/m},o=(l,h,f,d=90)=>{let p=1/0,g=f;for(let u=-d;u<=d;u++){let m=((f+u)%Fe+Fe)%Fe,S=(i[m]-l)**2+(t[m]-h)**2;S<p&&(p=S,g=m)}let _=Math.sqrt(p);for(let u of[(g+1)%Fe,(g-1+Fe)%Fe]){let m=g,S=i[u]-i[m],E=t[u]-t[m],M=Math.max(0,Math.min(1,((l-i[m])*S+(h-t[m])*E)/(S*S+E*E)));_=Math.min(_,Math.hypot(l-(i[m]+S*M),h-(t[m]+E*M)))}return{dist:_,i:g,s:e[g]}},c=[];for(let l=0;l<Fe;l+=2)c.push([i[l],t[l]]);return{N:Fe,largo:n,x:i,z:t,s:e,en:r,curvatura:a,cercano:o,puntos:c}}var Rd=[{x:-1.52,z:.06,r:.045},{x:1.47,z:-.25,r:.045},{x:1.53,z:.12,r:.045}];function la(i,t,e,n,s,r=4){let a=n==="frente"?1:-1,o=n==="frente"?Hn.usF.z:Hn.usR.z,c=i+Math.sin(e)*o,l=t+Math.cos(e)*o,h=1/0;for(let f=-2;f<=2;f++){let d=e+(a<0?Math.PI:0)+f/2*Hn.semiAngulo,p=Math.sin(d),g=Math.cos(d);for(let _ of s){let u=_.x-c,m=_.z-l,S=u*p+m*g;if(S<0)continue;let E=u*u+m*m-S*S;if(E>_.r*_.r)continue;let M=S-Math.sqrt(_.r*_.r-E);M>=0&&M<h&&(h=M)}}return h>r?1/0:h}function nh(i,t,e,n,s){let r=Math.sin(n),a=Math.cos(n);return Hn.tcrtX.map(o=>{let c=t+r*Hn.tcrtZ+a*o,l=e+a*Hn.tcrtZ-r*o;return i.cercano(c,l,s).dist<=th/2+ax?1:0})}var lx=.4,cx=.16,hx=.08,ux=25,dx=.4,Js={avance:.8,giro:.45,suavizado:.08},Bi={x:4.2,z:3},Cd=i=>Math.max(-1,Math.min(1,i));function Pd({encendido:i=!1}={}){let t=Ad(),e=Rd,n=t.en(0),s=Math.atan2(n.tx,n.tz),r={x:n.x,z:n.z,th:s,t:0,encendido:!!i,vIzq:0,vDer:0,hint:0,vuelta:0,sPrev:0,sens:nh(t,n.x,n.z,s,0),frente:la(n.x,n.z,s,"frente",e),atras:la(n.x,n.z,s,"atras",e),w:0,v:0,eLat:0,modo:"auto",entrada:{f:0,t:0,freno:!1},cmd:{f:0,t:0},pwm:{izq:0,der:0},bloqueado:!1,iny:{frente:null,atras:null,sinEcoFrente:!1,sinLinea:!1,desvio:0,vConsigna:null,paro:null,paroAtras:!1,atasco:!1}},a=()=>{r.encendido=!0},o=()=>{r.encendido=!1},c=()=>(r.encendido=!r.encendido,r.encendido),l=_=>{_!==r.modo&&(r.modo=_,r.cmd={f:0,t:0},r.entrada={f:0,t:0,freno:!1},_==="auto"&&(r.hint=t.cercano(r.x,r.z,r.hint,t.N).i))},h=_=>{let u=r.entrada,m=1-Math.exp(-_/Js.suavizado);r.cmd.f+=(u.f-r.cmd.f)*m,r.cmd.t+=(u.t-r.cmd.t)*m,u.freno&&(r.cmd.f=r.cmd.t=0);let S=r.iny.vConsigna==null?Js.avance:Math.min(1,r.iny.vConsigna/rs),E=Cd(r.cmd.f*S-r.cmd.t*Js.giro),M=Cd(r.cmd.f*S+r.cmd.t*Js.giro);return r.bloqueado=r.frente<as.critica&&(E>0||M>0),r.bloqueado&&(E=M=0),r.pwm={izq:E,der:M},{izq:E*rs,der:M*rs}},f=_=>{if(!r.encendido)return r;r.t+=_;let u=t.cercano(r.x,r.z,r.hint,r.modo==="manual"?t.N>>1:90);r.hint=u.i,u.s<r.sPrev-t.largo/2&&r.vuelta++,r.sPrev=u.s;let m=t.en(u.s+cx),S=.007*Math.sin(r.t*5.4)+.004*Math.sin(r.t*2.1),E=r.iny.desvio||0,M=m.x-m.tz*(S-E),A=m.z+m.tx*(S-E),T=M-r.x,x=A-r.z,b=T*Math.cos(r.th)-x*Math.sin(r.th),O=T*Math.sin(r.th)+x*Math.cos(r.th),P=2*b/(b*b+O*O),F=r.x+Math.sin(r.th)*Hn.tcrtZ,G=r.z+Math.cos(r.th)*Hn.tcrtZ,X=t.cercano(F,G,u.i),C=t.en(X.s),Y=(C.x-F)*Math.cos(r.th)-(C.z-G)*Math.sin(r.th),j=Y+E,q=(j-(r.eLat+E))/Math.max(_,1e-4);r.eLat=Y;let ut=Math.abs(t.curvatura(u.i)),K=Math.max(0,Math.min(1,(as.precaucion-r.frente)/(as.precaucion-as.critica))),lt=(r.iny.vConsigna==null?lx:r.iny.vConsigna)*(1-.2*Math.min(1,ut/3))*(1-.55*K),Ft=Math.max(-5,Math.min(5,lt*P+ux*j+dx*q)),It;r.modo==="manual"?It=h(_):(It=Ed(lt,Ft),r.bloqueado=!1,r.pwm={izq:oa(It.izq)*Math.sign(It.izq),der:oa(It.der)*Math.sign(It.der)}),r.iny.paro&&(r.iny.paroAtras&&r.modo==="manual"&&It.izq<=0&&It.der<=0&&(It.izq<0||It.der<0)||(It={izq:0,der:0},r.pwm={izq:0,der:0},r.bloqueado=!0));let $=1-Math.exp(-_/hx);r.vIzq+=(It.izq-r.vIzq)*$,r.vDer+=(It.der-r.vDer)*$;let bt=bd(r.vIzq,r.vDer);return r.v=bt.v,r.w=bt.w,r.iny.atasco?(r.v=0,r.w=0):(r.th+=bt.w*_,r.x=Math.max(-Bi.x,Math.min(Bi.x,r.x+Math.sin(r.th)*bt.v*_)),r.z=Math.max(-Bi.z,Math.min(Bi.z,r.z+Math.cos(r.th)*bt.v*_))),d(),r},d=()=>{if(r.sens=r.iny.sinLinea?[0,0,0,0]:nh(t,r.x,r.z,r.th,r.hint),r.frente=r.iny.sinEcoFrente?1/0:r.iny.frente!=null?r.iny.frente:la(r.x,r.z,r.th,"frente",e),r.atras=r.iny.sinEcoFrente?1/0:r.iny.atras!=null?r.iny.atras:la(r.x,r.z,r.th,"atras",e),!r.encendido){let _=r.x+Math.sin(r.th)*Hn.tcrtZ,u=r.z+Math.cos(r.th)*Hn.tcrtZ,m=t.cercano(_,u,r.hint,t.N>>1),S=t.en(m.s);r.eLat=(S.x-_)*Math.cos(r.th)-(S.z-u)*Math.sin(r.th)}return r};return{ruta:t,obstaculos:e,est:r,paso:f,medir:d,desplazarLateral:_=>{r.x=Math.max(-Bi.x,Math.min(Bi.x,r.x+Math.cos(r.th)*_)),r.z=Math.max(-Bi.z,Math.min(Bi.z,r.z-Math.sin(r.th)*_)),d()},motores:()=>{let _=oa(r.vIzq),u=oa(r.vDer),m=pl(_,r.vIzq>=0?1:-1),S=pl(u,r.vDer>=0?1:-1),E=r.vIzq/(Math.PI*Xe.ruedaD)*60,M=r.vDer/(Math.PI*Xe.ruedaD)*60;return{dutyIzq:_,dutyDer:u,rpmIzq:E,rpmDer:M,encIzq:Qc(E),encDer:Qc(M),corriente:m.corriente+S.corriente}},setModo:l,encender:a,detener:o,alternarEncendido:c,zonaFrente:()=>eh(r.frente),zonaAtras:()=>eh(r.atras)}}var os=(i,t=2)=>i.toFixed(t).replace(".",","),ls=i=>Number.isFinite(i)?i<1?`${Math.round(i*100)} cm`:`${os(i)} m`:"sin eco (> 4 m)",sh=i=>Number.isFinite(i)?i<1?`${Math.round(i*100)} cm`:`${os(i,1)} m`:"sin eco",gl={critica:"cr\xEDtica (< 20 cm)",precaucion:"precauci\xF3n (20\u201350 cm)",libre:"libre (> 50 cm)"};function fx(i){let t=i.join("");if(t==="0000")return"l\xEDnea perdida";if(t==="0110")return"centrado en la l\xEDnea";let e=i[0]+i[1],n=i[2]+i[3];return e>n?"la l\xEDnea queda a la izquierda":n>e?"la l\xEDnea queda a la derecha":"sobre la l\xEDnea"}var ih="[PENDIENTE DE MEDICI\xD3N F\xCDSICA]",Id="[PENDIENTE DE INTEGRACI\xD3N EN FIRMWARE]",Ks={tcrt:{nombre:"Regleta de 4 sensores TCRT5000",corto:"TCRT5000 \xD74",resumen:"Ven la cinta negra del piso.",color:"#0F9D84",consola:{id:"tcrt5000",titulo:"Consola TCRT5000 \xB7 L\xEDnea (S1\u2013S4)"},rol:"Cuatro sensores reflectivos infrarrojos, al frente y bajo el chasis. Miden el contraste de la cinta negra de 19 mm sobre el piso claro: cada uno entrega 1 si ve la cinta y 0 si no.",datos:[["Pines (ADC1)","GPIO 36 (VP) \xB7 39 (VN) \xB7 34 \xB7 35"],["Orden","S1\u2026S4, de izquierda a derecha"],["Separaci\xF3n","18 mm entre sensores"],["Cinta","negra, 19 mm, sobre piso de granito"],["Lazo","PD a 100 Hz sobre el error ponderado (P04)"]],vivo:i=>[["Lectura",`[${i.sens.join(", ")}]`],["Posici\xF3n",fx(i.sens)]],estado:["aviso","Simulado, falta medir"],nota:`En la demo cada sensor ve un c\xEDrculo de \u2300 8 mm (supuesto de simulaci\xF3n). Umbral de reflectancia y altura de montaje ${ih}.`},us:{nombre:"Radar Ultras\xF3nico Dual (2\xD7 HC-SR04P)",corto:"HC-SR04P \xB7 Radar",resumen:"Vigilan frente y atr\xE1s con haz de \xB115\xB0.",color:"#E8B90C",consola:{id:"hcsr04",titulo:"Consola HC-SR04P \xB7 Radar dual (frente y atr\xE1s)"},rol:"Par de sensores ultras\xF3nicos (frontal y trasero) le\xEDdos de forma alternada cada 100 ms. Vigilan obst\xE1culos adelante (< 20 cm detiene avance/giros) y atr\xE1s (bloquea retroceso si hay < 20 cm).",datos:[["Frontal","TRIG GPIO 23 \xB7 ECHO GPIO 33"],["Trasero","TRIG GPIO 15 (separado) \xB7 ECHO GPIO 5"],["Lectura","alternada: frente en ciclos pares, atr\xE1s en impares (100 ms)"],["Zonas","< 20 cm alerta (rojo) \xB7 20\u201350 cm precauci\xF3n (\xE1mbar) \xB7 > 50 cm despejado"],["Sensor fallido","3 lecturas sin eco (600 ms) activan fail-safe"]],vivo:i=>[["Frente",`${ls(i.dF)} \xB7 ${gl[i.zonaF]}`],["Atr\xE1s",`${ls(i.dR)} \xB7 ${gl[i.zonaR]}`]],estado:["aviso","Simulado, falta medir"],nota:"En el radar dual puedes inyectar obst\xE1culos al frente o atr\xE1s (5\u201380 cm). Los conos 3D son ayuda visual; las mediciones reales van en el registro HIL."},us_front:{nombre:"HC-SR04P frontal",corto:"HC-SR04P frontal",resumen:"Mide la distancia al frente.",color:"#E8B90C",consola:{id:"hcsr04",titulo:"Consola HC-SR04 \xB7 frente (inyecta obst\xE1culo)"},rol:"Ultrasonido que vigila el frente. Mide el tiempo del eco y lo convierte en distancia, con un haz de \xB115\xB0.",datos:[["Pines","TRIG GPIO 23 \xB7 ECHO GPIO 33"],["Lectura","alternada con el trasero: frente en ciclos pares, 100 ms por ciclo"],["Zonas","< 20 cm cr\xEDtica (rojo) \xB7 20\u201350 cm precauci\xF3n (\xE1mbar) \xB7 > 50 cm libre"],["Fail-safe","con < 20 cm el firmware detiene avance, giros y modo aut\xF3nomo; solo deja retroceder"],["Sensor fallido","3 lecturas sin eco (600 ms) marcan frente_ok = false"]],vivo:i=>[["Distancia",ls(i.dF)],["Zona",gl[i.zonaF]]],estado:["aviso","Simulado, falta medir"],nota:"En esta demo el robot solo reduce la velocidad al entrar en 20\u201350 cm para que se vea la zona (como el modo demo de la app). El firmware real avisa y, por debajo de 20 cm, detiene el avance."},us_rear:{nombre:"HC-SR04P trasero",corto:"HC-SR04P trasero",resumen:"Vigila atr\xE1s antes de retroceder.",color:"#E8B90C",consola:{id:"hcsr04",titulo:"Consola HC-SR04 \xB7 lectura trasera"},rol:"Ultrasonido que vigila la retaguardia. El firmware solo permite retroceder si atr\xE1s hay \u2265 20 cm y el sensor es v\xE1lido.",datos:[["Pines","TRIG GPIO 15 (separado del frontal) \xB7 ECHO GPIO 5"],["TRIG propio","un TRIG por m\xF3dulo: el trasero ya no comparte pin con el frontal (GPIO 23)"],["Lectura","alternada: atr\xE1s en ciclos impares, 100 ms por ciclo"],["Zonas","< 20 cm cr\xEDtica (rojo) \xB7 20\u201350 cm precauci\xF3n (\xE1mbar) \xB7 > 50 cm libre"],["Sensor fallido","3 lecturas sin eco (600 ms) marcan atras_ok = false y bloquean el retroceso"]],vivo:i=>[["Distancia",ls(i.dR)],["Zona",gl[i.zonaR]]],estado:["aviso","Simulado, falta medir"],nota:"Los conos de la demo son una ayuda visual del haz; no hay ning\xFAn sensor real conectado todav\xEDa."},esp32:{nombre:"ESP32 m\xF3vil (DevKit de 30 pines)",corto:"ESP32 m\xF3vil",resumen:"El cerebro: decide y habla con la app.",color:"#6B4EE6",consola:{id:null,titulo:"Sin consola propia: coordina las 4 consolas"},rol:"Controlador principal del robot: lee los sensores, calcula el control diferencial de las ruedas y se comunica con la app por MQTT. Es el \xFAnico microcontrolador a bordo.",datos:[["Firmware","robot_integrado.ino: modo aut\xF3nomo (PD a 100 Hz) y modo manual por MQTT"],["Motores (L298N)","ENA 25 \xB7 IN1 26 \xB7 IN2 27 \xB7 ENB 14 \xB7 IN3 4 \xB7 IN4 13, PWM a 20 kHz"],["Encoders","GPIO 18 / 19 (izq) \xB7 16 / 17 (der), interrupciones"],["MQTT","estado, \xF3rdenes (QoS 1), ack, ultrasonido y alertas (QoS 2)"],["Balizas BLE","dos ESP32 fijos en los extremos de la pista (no van en el robot)"]],vivo:i=>[["PWM izquierdo (ENA)",`${Math.round(i.mot.dutyIzq*100)} %`],["PWM derecho (ENB)",`${Math.round(i.mot.dutyDer*100)} %`]],estado:["hecho","Firmware integrado"],nota:`El escaneo BLE de las balizas ${Id}.`},mpu:{nombre:"MPU-6050 (IMU)",corto:"MPU-6050",resumen:"Siente los giros para no perder el rumbo.",color:"#2c4fb8",consola:{id:"mpu6050",titulo:"Consola MPU-6050 \xB7 pitch, roll y alertas"},rol:"Aceler\xF3metro y giroscopio de 6 ejes en el centro del chasis. Est\xE1 pensado para mantener el rumbo relativo (heading hold) con el giroscopio en los tramos sin cinta; no hay magnet\xF3metro.",datos:[["Bus I\xB2C","SDA GPIO 21 \xB7 SCL GPIO 22 \xB7 INT GPIO 2"],["Uso previsto","rumbo relativo (heading hold) dentro de teach-and-repeat"],["Ejes del m\xF3dulo","x rojo \xB7 y verde \xB7 z azul"]],vivo:i=>[["Giro en z (ideal)",`${os(i.w*180/Math.PI,0)} \xB0/s`],["Rumbo relativo (ideal)",`${os((i.th*180/Math.PI%360+360)%360,0)} \xB0`]],estado:["pendiente","Pendiente de integraci\xF3n"],nota:`La lectura de la MPU-6050 ${Id}; el firmware solo reserva el bus I\xB2C. Los valores de arriba son ideales (sin deriva). Esta demo no ejecuta teach-and-repeat: esa l\xF3gica de 5 estados vive en el Gemelo Digital (P05).`},traccion:{nombre:"Tracci\xF3n diferencial + chasis PLA",corto:"Tracci\xF3n + chasis PLA",resumen:"Dos motores con encoder y rueda loca.",color:"#F2603D",consola:{id:"motores",titulo:"Consola Velocidad \xB7 Dir. (m\xE1x. 0,46 m/s)"},rol:"Dos motores DC con caja reductora, uno por rueda, sobre un chasis impreso en PLA con una rueda loca atr\xE1s. Para girar, una rueda va m\xE1s r\xE1pido que la otra.",datos:[["Motor","Emoshayoga JGA25-371 \xABSpeed 200\xBB: 280 rpm en vac\xEDo a 12 V, reducci\xF3n 1:21,3"],["Encoders","efecto Hall, 11 pulsos por vuelta y canal (im\xE1n de 22 polos)"],["Driver","L298N, ca\xEDda de unos 2,1 V"],["Ruedas","\xD8 65 mm, distancia entre ruedas 180 mm"],["Chasis","placa de PLA con la rueda loca atr\xE1s"]],vivo:i=>[["Velocidad",`${os(i.v)} m/s`],["Giro",`${os(i.w*180/Math.PI,0)} \xB0/s`],["Rueda izq / der",`${Math.round(i.mot.rpmIzq)} / ${Math.round(i.mot.rpmDer)} rpm`],["PWM izq / der",`${Math.round(i.mot.dutyIzq*100)} / ${Math.round(i.mot.dutyDer*100)} %`],["Encoder izq / der",`${Math.round(i.mot.encIzq)} / ${Math.round(i.mot.encDer)} Hz`]],estado:["aviso","Simulado, falta medir"],nota:`Modelo \xFAnico de la simulaci\xF3n. La velocidad de la demo (\u2248 0,40 m/s), la ca\xEDda del driver y el factor de carga son supuestos ${ih}.`},bateria:{nombre:"Bater\xEDa 3S Li-Ion (3 \xD7 18650)",corto:"Bater\xEDa 3S",resumen:"Da energ\xEDa a todo el robot.",color:"#2a7fb8",consola:{id:null,titulo:"Sin consola propia: alimenta la tracci\xF3n"},rol:"Alimenta todo el robot: unos 12 V al L298N y, a trav\xE9s del regulador LM2596, 5 V al ESP32. Va en la zona trasera del chasis.",datos:[["Rango","9,90 V (corte) a 12,60 V (llena); nominal 11,1 V"],["Medici\xF3n","ADC en GPIO 32 con divisor de 100 k\u03A9 / 22 k\u03A9"],["Alertas","aviso a 10,30 V \xB7 corte a 9,90 V (rearme sobre 10,10 V)"],["Regulador","LM2596 a 5 V para el ESP32"]],vivo:i=>[["Tensi\xF3n (supuesta)","11,1 V nominal"],["Corriente de motores",`${os(i.mot.corriente)} A (modelo)`]],estado:["aviso","Simulado, falta medir"],nota:`En la demo la tensi\xF3n es fija: no se descarga. Capacidad y autonom\xEDa ${ih}.`}},Ld=["tcrt","us_front","us_rear","esp32","mpu","traccion","bateria"],rh=["tcrt","us","esp32","mpu","traccion","bateria"],ah={tcrt:{largo:i=>`4\xD7 TCRT5000 \xB7 [${i.sens.join(",")}]`,corto:i=>`TCRT \xD74 [${i.sens.join("")}]`},us_front:{largo:i=>`HC-SR04P frontal \xB7 ${ls(i.dF)}`,corto:i=>`US frente \xB7 ${ls(i.dF)}`},us_rear:{largo:i=>`HC-SR04P trasero \xB7 TRIG GPIO 15 (separado) \xB7 ${ls(i.dR)}`,corto:()=>"US trasero \xB7 TRIG GPIO 15"},esp32:{largo:()=>"ESP32 m\xF3vil \xB7 MQTT + control diferencial",corto:()=>"ESP32 m\xF3vil"},mpu:{largo:()=>"MPU-6050 \xB7 rumbo (heading hold)",corto:()=>"MPU-6050"},traccion:{largo:()=>"Tracci\xF3n diferencial \xB7 chasis PLA",corto:()=>"Tracci\xF3n + PLA"},bateria:{largo:()=>"Bater\xEDa 3S Li-Ion",corto:()=>"Bater\xEDa 3S"}};var Dd={type:"change"},lh={type:"start"},Ud={type:"end"},_l=new Ri,Nd=new xn,px=Math.cos(70*Ic.DEG2RAD),qe=new N,un=2*Math.PI,Se={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},oh=1e-6,xl=class extends Yr{constructor(t,e=null){super(t,e),this.state=Se.NONE,this.target=new N,this.cursor=new N,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Ni.ROTATE,MIDDLE:Ni.DOLLY,RIGHT:Ni.PAN},this.touches={ONE:Ui.ROTATE,TWO:Ui.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._cursorStyle="auto",this._domElementKeyEvents=null,this._lastPosition=new N,this._lastQuaternion=new vn,this._lastTargetPosition=new N,this._quat=new vn().setFromUnitVectors(t.up,new N(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new Gs,this._sphericalDelta=new Gs,this._scale=1,this._panOffset=new N,this._rotateStart=new yt,this._rotateEnd=new yt,this._rotateDelta=new yt,this._panStart=new yt,this._panEnd=new yt,this._panDelta=new yt,this._dollyStart=new yt,this._dollyEnd=new yt,this._dollyDelta=new yt,this._dollyDirection=new N,this._mouse=new yt,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=gx.bind(this),this._onPointerDown=mx.bind(this),this._onPointerUp=_x.bind(this),this._onContextMenu=Ex.bind(this),this._onMouseWheel=vx.bind(this),this._onKeyDown=Mx.bind(this),this._onTouchStart=Sx.bind(this),this._onTouchMove=bx.bind(this),this._onMouseDown=xx.bind(this),this._onMouseMove=yx.bind(this),this._interceptControlDown=Tx.bind(this),this._interceptControlUp=wx.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}set cursorStyle(t){this._cursorStyle=t,t==="grab"?this.domElement.style.cursor="grab":this.domElement.style.cursor="auto"}get cursorStyle(){return this._cursorStyle}connect(t){super.connect(t),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.ownerDocument.addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.state=Se.NONE,this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.ownerDocument.removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.ownerDocument.removeEventListener("keyup",this._interceptControlUp,{capture:!0}),this._controlActive=!1,this._pointers.length=0,this._pointerPositions={},this.domElement.style.touchAction="",this.domElement.style.cursor="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(t){t.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=t}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(Dd),this.update(),this.state=Se.NONE}pan(t,e){this._pan(t,e),this.update()}dollyIn(t){this._dollyIn(t),this.update()}dollyOut(t){this._dollyOut(t),this.update()}rotateLeft(t){this._rotateLeft(t),this.update()}rotateUp(t){this._rotateUp(t),this.update()}update(t=null){let e=this.object.position;qe.copy(e).sub(this.target),qe.applyQuaternion(this._quat),this._spherical.setFromVector3(qe),this.autoRotate&&this.state===Se.NONE&&this._rotateLeft(this._getAutoRotationAngle(t)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let n=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(n)&&isFinite(s)&&(n<-Math.PI?n+=un:n>Math.PI&&(n-=un),s<-Math.PI?s+=un:s>Math.PI&&(s-=un),n<=s?this._spherical.theta=Math.max(n,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(n+s)/2?Math.max(n,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{let a=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=a!=this._spherical.radius}if(qe.setFromSpherical(this._spherical),qe.applyQuaternion(this._quatInverse),e.copy(this.target).add(qe),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let a=null;if(this.object.isPerspectiveCamera){let o=qe.length();a=this._clampDistance(o*this._scale);let c=o-a;this.object.position.addScaledVector(this._dollyDirection,c),this.object.updateMatrixWorld(),r=!!c}else if(this.object.isOrthographicCamera){let o=new N(this._mouse.x,this._mouse.y,0);o.unproject(this.object);let c=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=c!==this.object.zoom;let l=new N(this._mouse.x,this._mouse.y,0);l.unproject(this.object),this.object.position.sub(l).add(o),this.object.updateMatrixWorld(),a=qe.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;a!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(a).add(this.object.position):(_l.origin.copy(this.object.position),_l.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(_l.direction))<px?this.object.lookAt(this.target):(Nd.setFromNormalAndCoplanarPoint(this.object.up,this.target),_l.intersectPlane(Nd,this.target))))}else if(this.object.isOrthographicCamera){let a=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),a!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>oh||8*(1-this._lastQuaternion.dot(this.object.quaternion))>oh||this._lastTargetPosition.distanceToSquared(this.target)>oh?(this.dispatchEvent(Dd),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(t){return t!==null?un/60*this.autoRotateSpeed*t:un/60/60*this.autoRotateSpeed}_getZoomScale(t){let e=Math.abs(t*.01);return Math.pow(.95,this.zoomSpeed*e)}_rotateLeft(t){this._sphericalDelta.theta-=t}_rotateUp(t){this._sphericalDelta.phi-=t}_panLeft(t,e){qe.setFromMatrixColumn(e,0),qe.multiplyScalar(-t),this._panOffset.add(qe)}_panUp(t,e){this.screenSpacePanning===!0?qe.setFromMatrixColumn(e,1):(qe.setFromMatrixColumn(e,0),qe.crossVectors(this.object.up,qe)),qe.multiplyScalar(t),this._panOffset.add(qe)}_pan(t,e){let n=this.domElement;if(this.object.isPerspectiveCamera){let s=this.object.position;qe.copy(s).sub(this.target);let r=qe.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*t*r/n.clientHeight,this.object.matrix),this._panUp(2*e*r/n.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(t*(this.object.right-this.object.left)/this.object.zoom/n.clientWidth,this.object.matrix),this._panUp(e*(this.object.top-this.object.bottom)/this.object.zoom/n.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(t,e){if(!this.zoomToCursor)return;this._performCursorZoom=!0;let n=this.domElement.getBoundingClientRect(),s=t-n.left,r=e-n.top,a=n.width,o=n.height;this._mouse.x=s/a*2-1,this._mouse.y=-(r/o)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(t){return Math.max(this.minDistance,Math.min(this.maxDistance,t))}_handleMouseDownRotate(t){this._rotateStart.set(t.clientX,t.clientY)}_handleMouseDownDolly(t){this._updateZoomParameters(t.clientX,t.clientY),this._dollyStart.set(t.clientX,t.clientY)}_handleMouseDownPan(t){this._panStart.set(t.clientX,t.clientY)}_handleMouseMoveRotate(t){this._rotateEnd.set(t.clientX,t.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let e=this.domElement;this._rotateLeft(un*this._rotateDelta.x/e.clientHeight),this._rotateUp(un*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(t){this._dollyEnd.set(t.clientX,t.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.zoomToCursor&&(this._performCursorZoom=!0,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()),this.update()}_handleMouseMovePan(t){this._panEnd.set(t.clientX,t.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(t){this._updateZoomParameters(t.clientX,t.clientY),t.deltaY<0?this._dollyIn(this._getZoomScale(t.deltaY)):t.deltaY>0&&this._dollyOut(this._getZoomScale(t.deltaY)),this.update()}_handleKeyDown(t){let e=!1;switch(t.code){case this.keys.UP:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(un*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),e=!0;break;case this.keys.BOTTOM:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(-un*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),e=!0;break;case this.keys.LEFT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(un*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),e=!0;break;case this.keys.RIGHT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(-un*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),e=!0;break}e&&(t.preventDefault(),this.update())}_handleTouchStartRotate(t){if(this._pointers.length===1)this._rotateStart.set(t.pageX,t.pageY);else{let e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._rotateStart.set(n,s)}}_handleTouchStartPan(t){if(this._pointers.length===1)this._panStart.set(t.pageX,t.pageY);else{let e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panStart.set(n,s)}}_handleTouchStartDolly(t){let e=this._getSecondPointerPosition(t),n=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(n*n+s*s);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enablePan&&this._handleTouchStartPan(t)}_handleTouchStartDollyRotate(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enableRotate&&this._handleTouchStartRotate(t)}_handleTouchMoveRotate(t){if(this._pointers.length==1)this._rotateEnd.set(t.pageX,t.pageY);else{let n=this._getSecondPointerPosition(t),s=.5*(t.pageX+n.x),r=.5*(t.pageY+n.y);this._rotateEnd.set(s,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let e=this.domElement;this._rotateLeft(un*this._rotateDelta.x/e.clientHeight),this._rotateUp(un*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(t){if(this._pointers.length===1)this._panEnd.set(t.pageX,t.pageY);else{let e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panEnd.set(n,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(t){let e=this._getSecondPointerPosition(t),n=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(n*n+s*s);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);let a=(t.pageX+e.x)*.5,o=(t.pageY+e.y)*.5;this._updateZoomParameters(a,o)}_handleTouchMoveDollyPan(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enablePan&&this._handleTouchMovePan(t)}_handleTouchMoveDollyRotate(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enableRotate&&this._handleTouchMoveRotate(t)}_addPointer(t){this._pointers.push(t.pointerId)}_removePointer(t){delete this._pointerPositions[t.pointerId];for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId){this._pointers.splice(e,1);return}}_isTrackingPointer(t){for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId)return!0;return!1}_trackPointer(t){let e=this._pointerPositions[t.pointerId];e===void 0&&(e=new yt,this._pointerPositions[t.pointerId]=e),e.set(t.pageX,t.pageY)}_getSecondPointerPosition(t){let e=t.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[e]}_customWheelEvent(t){let e=t.deltaMode,n={clientX:t.clientX,clientY:t.clientY,deltaY:t.deltaY};switch(e){case 1:n.deltaY*=16;break;case 2:n.deltaY*=100;break}return t.ctrlKey&&!this._controlActive&&(n.deltaY*=10),n}};function mx(i){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(i.pointerId),this.domElement.ownerDocument.addEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(i)&&(this._addPointer(i),i.pointerType==="touch"?this._onTouchStart(i):this._onMouseDown(i),this._cursorStyle==="grab"&&(this.domElement.style.cursor="grabbing")))}function gx(i){this.enabled!==!1&&(i.pointerType==="touch"?this._onTouchMove(i):this._onMouseMove(i))}function _x(i){switch(this._removePointer(i),this._pointers.length){case 0:this.domElement.releasePointerCapture(i.pointerId),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(Ud),this.state=Se.NONE,this._cursorStyle==="grab"&&(this.domElement.style.cursor="grab");break;case 1:let t=this._pointers[0],e=this._pointerPositions[t];this._onTouchStart({pointerId:t,pageX:e.x,pageY:e.y});break}}function xx(i){let t;switch(i.button){case 0:t=this.mouseButtons.LEFT;break;case 1:t=this.mouseButtons.MIDDLE;break;case 2:t=this.mouseButtons.RIGHT;break;default:t=-1}switch(t){case Ni.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(i),this.state=Se.DOLLY;break;case Ni.ROTATE:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=Se.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=Se.ROTATE}break;case Ni.PAN:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=Se.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=Se.PAN}break;default:this.state=Se.NONE}this.state!==Se.NONE&&this.dispatchEvent(lh)}function yx(i){switch(this.state){case Se.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(i);break;case Se.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(i);break;case Se.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(i);break}}function vx(i){this.enabled===!1||this.enableZoom===!1||this.state!==Se.NONE||(i.preventDefault(),this.dispatchEvent(lh),this._handleMouseWheel(this._customWheelEvent(i)),this.dispatchEvent(Ud))}function Mx(i){this.enabled!==!1&&this._handleKeyDown(i)}function Sx(i){switch(this._trackPointer(i),this._pointers.length){case 1:switch(this.touches.ONE){case Ui.ROTATE:if(this.enableRotate===!1){this.state=Se.NONE;break}this._handleTouchStartRotate(i),this.state=Se.TOUCH_ROTATE;break;case Ui.PAN:if(this.enablePan===!1){this.state=Se.NONE;break}this._handleTouchStartPan(i),this.state=Se.TOUCH_PAN;break;default:this.state=Se.NONE}break;case 2:switch(this.touches.TWO){case Ui.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(i),this.state=Se.TOUCH_DOLLY_PAN;break;case Ui.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(i),this.state=Se.TOUCH_DOLLY_ROTATE;break;default:this.state=Se.NONE}break;default:this.state=Se.NONE}this.state!==Se.NONE&&this.dispatchEvent(lh)}function bx(i){switch(this._trackPointer(i),this.state){case Se.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(i),this.update();break;case Se.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(i),this.update();break;case Se.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(i),this.update();break;case Se.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(i),this.update();break;default:this.state=Se.NONE}}function Ex(i){this.enabled!==!1&&i.preventDefault()}function Tx(i){i.key==="Control"&&(this._controlActive=!0,this.domElement.ownerDocument.addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function wx(i){i.key==="Control"&&(this._controlActive=!1,this.domElement.ownerDocument.removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}var yl=class extends Xi{constructor(){super(),this.name="RoomEnvironment",this.position.y=-3.5;let t=new Kt;t.deleteAttribute("uv");let e=new ke({side:je}),n=new ke,s=new Vr(16777215,900,28,2);s.position.set(.418,16.199,.3),this.add(s);let r=new ft(t,e);r.position.set(-.757,13.219,.717),r.scale.set(31.713,28.305,28.591),this.add(r);let a=new qi(t,n,6),o=new He;o.position.set(-10.906,2.009,1.846),o.rotation.set(0,-.195,0),o.scale.set(2.328,7.905,4.651),o.updateMatrix(),a.setMatrixAt(0,o.matrix),o.position.set(-5.607,-.754,-.758),o.rotation.set(0,.994,0),o.scale.set(1.97,1.534,3.955),o.updateMatrix(),a.setMatrixAt(1,o.matrix),o.position.set(6.167,.857,7.803),o.rotation.set(0,.561,0),o.scale.set(3.927,6.285,3.687),o.updateMatrix(),a.setMatrixAt(2,o.matrix),o.position.set(-2.017,.018,6.124),o.rotation.set(0,.333,0),o.scale.set(2.002,4.566,2.064),o.updateMatrix(),a.setMatrixAt(3,o.matrix),o.position.set(2.291,-.756,-2.621),o.rotation.set(0,-.286,0),o.scale.set(1.546,1.552,1.496),o.updateMatrix(),a.setMatrixAt(4,o.matrix),o.position.set(-2.193,-.369,-5.547),o.rotation.set(0,.516,0),o.scale.set(3.875,3.487,2.986),o.updateMatrix(),a.setMatrixAt(5,o.matrix),this.add(a);let c=new ft(t,js(50));c.position.set(-16.116,14.37,8.208),c.scale.set(.1,2.428,2.739),this.add(c);let l=new ft(t,js(50));l.position.set(-16.109,18.021,-8.207),l.scale.set(.1,2.425,2.751),this.add(l);let h=new ft(t,js(17));h.position.set(14.904,12.198,-1.832),h.scale.set(.15,4.265,6.331),this.add(h);let f=new ft(t,js(43));f.position.set(-.462,8.89,14.52),f.scale.set(4.38,5.441,.088),this.add(f);let d=new ft(t,js(20));d.position.set(3.235,11.486,-12.541),d.scale.set(2.5,2,.1),this.add(d);let p=new ft(t,js(100));p.position.set(0,20,0),p.scale.set(1,.1,1),this.add(p)}dispose(){let t=new Set;this.traverse(e=>{e.isMesh&&(t.add(e.geometry),t.add(e.material))});for(let e of t)e.dispose()}};function js(i){return new Br({color:0,emissive:16777215,emissiveIntensity:i})}var Fd="#dfe8e5";function Ax(){let i=document.createElement("canvas");i.width=i.height=512;let t=i.getContext("2d");t.fillStyle="#b4bdb9",t.fillRect(0,0,512,512);let e=7,n=()=>(e=e*16807%2147483647)/2147483647;for(let r=0;r<9e3;r++){let a=110+Math.floor(n()*110);t.fillStyle=`rgba(${a},${a+3},${a+2},${.25+n()*.4})`;let o=.6+n()*1.6;t.fillRect(n()*512,n()*512,o,o)}let s=new br(i);return s.wrapS=s.wrapT=Rs,s.repeat.set(10,7),s.colorSpace=an,s.anisotropy=4,s}function Od(i,t,e){let n=new ul({canvas:i,antialias:!0,powerPreference:"high-performance"});n.setPixelRatio(Math.min(window.devicePixelRatio||1,2)),n.shadowMap.enabled=!0,n.shadowMap.type=ji,n.toneMapping=Zr,n.toneMappingExposure=1;let s=new Xi;s.background=new re(Fd),s.fog=new _r(Fd,7,16);let r=new Ys(n);s.environment=r.fromScene(new yl,.04).texture;let a=new sn(40,1,.02,40),o=new xl(a,i);o.enableDamping=!0,o.dampingFactor=.12,o.minDistance=.25,o.maxDistance=6,o.maxPolarAngle=Math.PI*.48,o.screenSpacePanning=!1,s.add(new Hr("#ffffff","#a9b5b0",.7));let c=new Xr("#fff6e8",2.2);c.castShadow=!0,c.shadow.mapSize.set(2048,2048);let l=c.shadow.camera;l.left=-.7,l.right=.7,l.top=.7,l.bottom=-.7,l.near=.5,l.far=6,c.shadow.bias=-4e-4,c.shadow.normalBias=.002,s.add(c,c.target);let h=new ft(new Ki(9,6.5),new ke({map:Ax(),roughness:.55,metalness:0,envMapIntensity:.5}));h.rotation.x=-Math.PI/2,h.receiveShadow=!0,s.add(h);let f=t.puntos,d=f.length,p=new Float32Array(d*2*3),g=[],_=th/2;for(let T=0;T<d;T++){let x=f[(T-1+d)%d],b=f[(T+1)%d],O=b[0]-x[0],P=b[1]-x[1],F=Math.hypot(O,P);O/=F,P/=F;let[G,X]=f[T];p.set([G-P*_,7e-4,X+O*_,G+P*_,7e-4,X-O*_],T*6);let C=(T+1)%d;g.push(T*2,T*2+1,C*2,T*2+1,C*2+1,C*2)}let u=new Je;u.setAttribute("position",new yn(p,3)),u.setIndex(g),u.computeVertexNormals();let m=new ft(u,new ke({color:"#0b0c0e",roughness:.85,side:cn,polygonOffset:!0,polygonOffsetFactor:-1,polygonOffsetUnits:-1}));m.receiveShadow=!0,s.add(m);let S=new ke({color:"#e8743b",roughness:.5,envMapIntensity:.6}),E=new ke({color:"#f4f6f5",roughness:.5});for(let T of e){let x=new he,b=.12,O=new ft(new Ge(T.r,T.r,b,32),S);O.position.y=b/2;let P=new ft(new Ge(T.r+8e-4,T.r+8e-4,.025,32),E);P.position.y=b*.62,x.add(O,P),x.position.set(T.x,0,T.z),x.traverse(F=>{F.castShadow=!0,F.receiveShadow=!0}),s.add(x)}let M=new he;return s.add(M),{renderer:n,scene:s,camera:a,controls:o,sol:c,pose:M,resize:()=>{let T=i.clientWidth||1,x=i.clientHeight||1;n.setSize(T,x,!1),a.aspect=T/x,a.updateProjectionMatrix()}}}var Qe=N,dn=.0325,cs=.03,Le=.05,Rx=.21,qt=(i,t=.6,e=0,n={})=>new ke({color:i,roughness:t,metalness:e,envMapIntensity:.6,...n}),En=(i,t,e=40,n=i)=>{let s=new Ge(n,i,t,e);return s.rotateZ(-Math.PI/2),s};function Bd(i,t,e){let n=new Os,s=t*.86;for(let o=0;o<i;o++){let c=o/i*Math.PI*2,l=Math.PI*2/i;[[s,c],[t,c+l*.2],[t,c+l*.45],[s,c+l*.65]].forEach(([f,d],p)=>{let g=f*Math.cos(d),_=f*Math.sin(d);o===0&&p===0?n.moveTo(g,_):n.lineTo(g,_)})}n.closePath();let r=new $i;r.absarc(0,0,t*.18,0,Math.PI*2,!0),n.holes.push(r);let a=new Ur(n,{depth:e,bevelEnabled:!1,curveSegments:4});return a.rotateY(Math.PI/2),a}function zd(){let i=new he,t={},e=[],n=(I,V=1)=>(I.transparent=!0,I.userData.base=V,e.push(I),I),s=new he;i.add(s);let r=qt("#d9ebe6",.25,0,{transparent:!0,opacity:.55,depthWrite:!1}),a=new ft(new Kt(.14,.004,Rx),r);a.position.set(0,Le+.002,0),a.renderOrder=2,s.add(a);let o=.55,c=new Yi(new Zi(a.geometry),new Pi({color:"#8fb3aa"}));c.position.copy(a.position),s.add(c);let l=new he;l.add(new ft(new Ge(.011,.012,.036,32),qt("#2b2f36",.5,.3))),l.children[0].position.y=.032;let h=new ft(new mi(.008,32,16),qt("#c9ced3",.3,.9));h.position.y=.008,l.add(h),l.position.set(0,0,-.07),s.add(l),t.loca=new Qe(0,.02,-.07);let f={},d=[];for(let I of["izq","der"]){let V=I==="izq"?1:-1,J=new he;J.position.set(0,dn,cs),J.scale.x=V,i.add(J);let ct={},Z=new he,ht=new ft(En(dn,.026,64),n(qt("#1d2025",.85)));Z.add(ht);let Lt=new ft(En(.023,.021,48),n(qt("#f4f6f5",.5)));Z.add(Lt);let dt=n(qt("#c3cfcb",.6)),oe=n(qt("#30353c",.9));for(let ot=0;ot<6;ot++){let mt=new ft(new Kt(.0235,.044,.0035),dt);mt.rotation.x=ot/6*Math.PI,Z.add(mt)}let we=new ft(new Kt(.024,.008,.007),n(qt("#F2603D",.5)));we.position.y=.017,Z.add(we);for(let ot=0;ot<24;ot++){let mt=new ft(new Kt(.022,.0016,.004),oe),Vt=ot/24*Math.PI*2;mt.position.set(0,Math.cos(Vt)*(dn+4e-4),Math.sin(Vt)*(dn+4e-4)),mt.rotation.x=-Vt,Z.add(mt)}Z.position.x=.09,J.add(Z),ct.rueda=Z;let ze=new ft(En(.002,.014,16),qt("#cfd4d8",.35,.9));ze.position.x=.083,J.add(ze);let fn=new he,vi=n(qt("#c3c9ce",.45,.8)),ti=new ft(En(.0125,.021,48),vi);fn.add(ti);let Gn=new ft(En(.0128,.0025,48),n(qt("#9aa2a9",.45,.8)));Gn.position.x=.0105,fn.add(Gn);let ei=new he,wn=qt("#d6a84a",.4,.85),ni=[[.0035,.0105],[.0035,.0105],[.0035,.0105]],ii=[];ni.forEach(([ot,mt],Vt)=>{let Wt=-.0085+Vt*.0062,Et=new ft(Bd(9,ot,.0022),wn);Et.position.x=Wt,ei.add(Et);let Jt=new ft(Bd(30,mt,.0018),wn);Jt.position.set(Wt+.0024,0,0),Jt.position.y=(Vt%2?-1:1)*0,ei.add(Jt),ii.push(Et,Jt)}),fn.add(ei),fn.position.x=.0665,J.add(fn),ct.caja=fn,ct.engranes=ii,ct.engranesG=ei;let pn=new he,mn=qt("#5b6573",.5,.6),Mi=new ft(new Kt(.016,.0025,.03),mn);Mi.position.y=.0138,pn.add(Mi);for(let ot of[-.0138,.0138]){let mt=new ft(new Kt(.016,.016,.0025),mn);mt.position.set(0,.006,ot),pn.add(mt)}let Si=new ft(new Kt(.016,Le-dn-.0138,.008),mn);Si.position.y=.0138+(Le-dn-.0138)/2,pn.add(Si),pn.position.x=.065,J.add(pn),ct.soporte=pn;let Pe=new he,Qs=n(qt("#aeb5bb",.42,.85)),hs=new ft(En(.0122,.031,48),Qs);Pe.add(hs);let U=new ft(En(.0105,.0018,40),n(qt("#20242a",.6)));U.position.x=-.0164,Pe.add(U);let B=new he,xt=qt("#5d6670",.6,.3);for(let ot of[0,Math.PI]){let mt=new ft(new Ge(.0112,.0112,.022,24,1,!0,ot-.9,1.8),xt);mt.geometry.rotateZ(-Math.PI/2),B.add(mt)}let Ht=new he,ue=new ft(En(.0075,.02,24),qt("#7c858e",.5,.7));Ht.add(ue);for(let ot=0;ot<5;ot++){let mt=new ft(new Kt(.019,.0042,.0034),qt("#c56a2c",.35,.8)),Vt=ot/5*Math.PI*2;mt.position.set(0,Math.cos(Vt)*.0068,Math.sin(Vt)*.0068),mt.rotation.x=-Vt,Ht.add(mt)}let v=new ft(En(.003,.004,16),qt("#d08a3a",.3,.9));v.position.x=-.0125,Ht.add(v);let L=new ft(En(.001,.05,12),qt("#cfd4d8",.35,.9));L.position.x=-.006,Ht.add(L),B.add(Ht),Pe.add(B),Pe.position.x=.0405,J.add(Pe),ct.lata=Pe,ct.inducido=Ht;let W=new he,z=new he;for(let ot=0;ot<22;ot++){let mt=new ft(new Ge(.0085,.0085,.0018,4,1,!1,ot/22*Math.PI*2,Math.PI*2/22),qt(ot%2?"#14213D":"#e8eeec",.5));mt.geometry.rotateZ(-Math.PI/2),z.add(mt)}z.position.x=-.002,W.add(z);let H=new ft(En(.0125,.0016,40),qt("#1f7a4d",.55));H.position.x=.0025,W.add(H);let et=qt("#14213D",.4),Pt=[];for(let ot of[.35,.35+Math.PI/2/1]){let mt=new ft(new Kt(.0012,.0028,.0028),et.clone());mt.position.set(.0012,Math.cos(ot)*.0068,Math.sin(ot)*.0068),W.add(mt),Pt.push(mt)}let _t=new ft(new Kt(.0045,.004,.012),qt("#f4f6f5",.5));_t.position.set(.001,.012,0),W.add(_t),W.position.x=.0205,J.add(W),ct.enc=W,ct.disco=z,ct.halls=Pt,f[I]={g:J,parts:ct,s:V},d.push(J),t[`rueda_${I}`]=new Qe(V*.103,dn,cs),t[`caja_${I}`]=new Qe(V*.0665,dn-.0125,cs),t[`lata_${I}`]=new Qe(V*.04,dn-.012,cs),t[`enc_${I}`]=new Qe(V*.0205,dn,cs-.0125)}let p=new he;i.add(p);let g=Le+.004+.008,_={x:0,z:.045},u={x:-.045,z:.045},m=-.058,S={x:.055,z:-.012},E=(I,V,J)=>{let ct=new ft(new Ge(.0016,.0016,.008,10),qt("#c8a64a",.4,.8));ct.position.set(I,Le+.008,V),J.add(ct)},M=new he;M.add(new ft(new Kt(.028,.0016,.051),qt("#1a1d22",.55)));let A=new ft(new Kt(.018,.0031,.0175),qt("#cdd3d8",.35,.9));A.position.set(0,.0024,.012),M.add(A);let T=new ft(new Kt(.018,.0012,.006),qt("#232830",.6));T.position.set(0,.0014,.0235),M.add(T);let x=new ft(new Kt(.008,.003,.006),qt("#d9dde0",.3,.9));x.position.set(0,.0023,-.0235),M.add(x);let b=new ft(new Kt(.0016,.001,.0012),new ke({color:"#6B4EE6",emissive:"#6B4EE6",emissiveIntensity:.8}));b.position.set(.006,.0013,-.012),M.add(b);for(let I of[-.0127,.0127]){let V=new ft(new Kt(.0025,.0025,.048),qt("#0f1114",.7));V.position.set(I,-.002,0),M.add(V)}M.position.set(_.x,g,_.z);for(let[I,V]of[[-.011,-.022],[.011,-.022],[-.011,.022],[.011,.022]])E(_.x+I,_.z+V,p);p.add(M),t.esp=new Qe(_.x,g+.005,_.z+.012);let O=new he;O.add(new ft(new Kt(.0164,.0016,.0212),qt("#2c4fb8",.5)));let P=new ft(new Kt(.0046,.0013,.0046),qt("#14161a",.5));P.position.set(0,.0014,8e-4),O.add(P);let F=new ft(new Kt(.015,.0025,.0025),qt("#0f1114",.7));F.position.set(0,.0018,-.0092),O.add(F);for(let I=0;I<8;I++){let V=new ft(new Kt(5e-4,.0075,5e-4),qt("#e0c35a",.3,.9));V.position.set(-.00889+I*.00254,.0036,-.0092),O.add(V)}let G=(I,V,J,ct,Z,ht,Lt)=>{let dt=new ft(new Kt(V,J,ct),new Pn({color:I}));dt.position.set(Z,ht,Lt),O.add(dt)};G("#F2603D",.011,8e-4,8e-4,.0055,.0024,8e-4),G("#0F9D84",8e-4,.011,8e-4,0,.0078,8e-4),G("#6B4EE6",8e-4,8e-4,.011,0,.0024,.0063),O.position.set(0,g,0);for(let[I,V]of[[-.006,-.008],[.006,-.008],[-.006,.008],[.006,.008]])E(I,V,p);p.add(O),t.mpu=new Qe(0,g+.012,0);let X=new he;X.add(new ft(new Kt(.043,.0016,.043),qt("#b8322a",.55)));let C=new he,Y=qt("#1b1e23",.5,.5),j=new ft(new Kt(.023,.004,.016),Y);j.position.y=.002,C.add(j);for(let I=0;I<6;I++){let V=new ft(new Kt(.0014,.021,.016),Y);V.position.set(-.0105+I*.0042,.0145,0),C.add(V)}C.position.set(0,8e-4,-.008),X.add(C);let q=new ft(new Kt(.02,.0035,.004),qt("#14161a",.5));q.position.set(0,.006,.0015),X.add(q);let ut=(I,V)=>new ft(new Kt(I,.009,.0075),qt(V,.5)),K=ut(.0075,"#2f6fd0");K.scale.set(1,1,1.6),K.position.set(.0175,.0053,-.004),X.add(K);let rt=K.clone();rt.position.x=-.0175,X.add(rt);let lt=ut(.015,"#2f6fd0");lt.position.set(-.012,.0053,.0175),X.add(lt);let Ft=new ft(new Kt(.016,.0025,.0025),qt("#0f1114",.7));Ft.position.set(.01,.0021,.0185),X.add(Ft);for(let I=0;I<6;I++){let V=new ft(new Kt(6e-4,.006,6e-4),qt("#e0c35a",.3,.9));V.position.set(.0037+I*.00254,.005,.0185),X.add(V)}let It=new ft(new Kt(.0016,.001,.0012),new ke({color:"#F2603D",emissive:"#F2603D",emissiveIntensity:.3}));It.position.set(.003,.0013,.012),X.add(It),X.position.set(u.x,g,u.z);for(let[I,V]of[[-.019,-.019],[.019,-.019],[-.019,.019],[.019,.019]])E(u.x+I,u.z+V,p);p.add(X),t.l298=new Qe(u.x,g+.02,u.z-.008);let $=new he,bt=new ft(new Kt(.07,.012,.062),qt("#202328",.7));bt.position.y=.006,$.add(bt);for(let I=0;I<3;I++){let V=new ft(En(.0093,.065,40),qt("#2a7fb8",.4,.2));V.position.set(0,.0105,-.019+I*.019),$.add(V);let J=new ft(En(.0035,.0016,20),qt("#d7dbde",.3,.9));J.position.set(.0333,.0105,-.019+I*.019),$.add(J)}let Dt=new ft(new Kt(.045,.0016,.015),qt("#2c6b3f",.55));Dt.position.set(0,.021,0),$.add(Dt),$.position.set(0,Le+.004,m),p.add($),t.bat=new Qe(0,Le+.025,m);let Ot=new he;Ot.add(new ft(new Kt(.043,.0016,.021),qt("#1f4fa0",.55)));let Tt=new ft(new Kt(.012,.007,.012),qt("#25282d",.6));Tt.position.set(-.004,.0043,0),Ot.add(Tt);let Xt=new ft(new Kt(.0095,.0095,.0045),qt("#2f6fd0",.5));Xt.position.set(.012,.0055,.006),Ot.add(Xt);let ve=new ft(new Ge(.004,.004,.011,20),qt("#1b1d21",.4));ve.position.set(-.016,.0063,0),Ot.add(ve),Ot.rotation.y=Math.PI/2,Ot.position.set(S.x,Le+.006,S.z),p.add(Ot);let Gt=Le+.0045+.01,jt=.0128,ie=()=>{let I=new he;I.add(new ft(new Kt(.045,.02,.0016),qt("#2a63b5",.5)));for(let ct of[-1,1]){let Z=new ft(new Ge(.008,.008,.012,32),qt("#c8ccd0",.35,.85));Z.geometry.rotateX(Math.PI/2),Z.position.set(ct*.0105,0,.0068),I.add(Z);let ht=new ft(new Ge(.0066,.0066,6e-4,28),qt("#15171b",.7));ht.geometry.rotateX(Math.PI/2),ht.position.set(ct*.0105,0,jt-3e-4),I.add(ht)}let V=new ft(new Ge(.0022,.0022,.0075,16),qt("#d5d8dc",.3,.9));V.geometry.rotateX(Math.PI/2),V.position.set(0,.0015,.0045),I.add(V);let J=new ft(new Kt(.0108,.0025,.0025),qt("#0f1114",.7));J.position.set(0,.0085,-.002),I.add(J);for(let ct=0;ct<4;ct++){let Z=new ft(new Kt(5e-4,5e-4,.007),qt("#e0c35a",.3,.9));Z.position.set(-.00381+ct*.00254,.0085,-.0045),I.add(Z)}return I},st=ie();st.position.set(0,Gt,.0985-jt+.0075),p.add(st);let vt=ie();vt.rotation.y=Math.PI,vt.position.set(0,Gt,-.0985+jt-.0075),p.add(vt);let Mt=st.position.z+jt,Nt=vt.position.z-jt;t.us_front=new Qe(0,Gt+.012,Mt),t.us_rear=new Qe(0,Gt+.012,Nt);let wt=Math.tan(15*Math.PI/180),Qt=(I,V,J)=>{let ct=new Ge(.008+V*wt,.008+I*wt,V-I,32,1,!0);ct.rotateX(Math.PI/2),ct.translate(0,0,(I+V)/2);let Z=new ft(ct,new Pn({color:J,transparent:!0,opacity:.1,depthWrite:!1,side:cn}));Z.userData.nopick=!0,Z.renderOrder=3;let ht=new Yi(new Zi(ct,40),new Pi({color:J,transparent:!0,opacity:.35}));return ht.userData.nopick=!0,Z.add(ht),Z},zt=(I,V)=>{let J=new he,ct=Qt(0,.2,"#F2603D"),Z=Qt(.2,.5,"#E8B90C");J.add(ct,Z);let ht=new ft(new mi(.006,16,12),new Pn({color:"#ffffff"}));return ht.userData.nopick=!0,ht.visible=!1,ht.renderOrder=4,J.add(ht),J.position.set(0,Gt,I),J.rotation.y=V,p.add(J),{g:J,roja:ct,ambar:Z,marca:ht}},ae=zt(Mt,0),se=zt(Nt,Math.PI),ee=.112,D=.0185,Ce=[.027,.009,-.009,-.027],$t=new he;i.add($t);let ge=new ft(new Kt(.08,.0016,.02),qt("#2f6f55",.55));ge.position.set(0,D,ee),$t.add(ge);let St=qt("#f1f4f2",.6);for(let I of[-1,1]){let V=new ft(new Kt(.006,Le-D,.006),St);V.position.set(I*.034,(Le+D)/2,ee-.008),$t.add(V)}let Te=[];Ce.forEach((I,V)=>{let J=new ft(new Kt(.0058,.007,.0102),qt("#14161a",.55));J.position.set(I,D-8e-4-.0035,ee),$t.add(J);let ct=new ft(new mi(.0014,14,10),new ke({color:"#7a1b1b",emissive:"#ff3030",emissiveIntensity:.9}));ct.position.set(I,D-8e-4-.007,ee-.0026),$t.add(ct);let Z=new ft(new mi(.0014,14,10),qt("#0b0c0e",.3));Z.position.set(I,D-8e-4-.007,ee+.0026),$t.add(Z);let ht=new ft(new Kt(.0036,.0012,.0024),new ke({color:"#1b3a30",emissive:"#000000"}));ht.position.set(I,D+.0014,ee-.0065),$t.add(ht);let Lt=new ft(new wr(.004,24),new Pn({color:"#7f9a93",transparent:!0,opacity:.4,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-2,polygonOffsetUnits:-2}));Lt.rotation.x=-Math.PI/2,Lt.position.set(I,.002,ee),Lt.userData.nopick=!0,$t.add(Lt),Te.push({ind:ht,huella:Lt}),t[`tcrt${V}`]=new Qe(I,D,ee)}),t.tcrt=new Qe(0,D+.002,ee+.012);let kt=[],Yt=new he;i.add(Yt);let w={orden:{color:"#6B4EE6",r:7e-4},energia:{color:"#F2603D",r:9e-4},tierra:{color:"#2a2f38",r:9e-4},encoder:{color:"#0F9D84",r:6e-4},sensor:{color:"#E8B90C",r:6e-4}},y=(I,V,J)=>{let ct=new Fs(I.map(we=>new Qe(...we)),!1,"centripetal"),Z=qt(w[V].color,.45,0,{transparent:!0}),ht=new ft(new Or(ct,80,w[V].r,8),Z);ht.castShadow=!0,ht.userData.nopick=!0,Yt.add(ht);let Lt=5,dt=new qi(new mi(w[V].r*2.1,10,6),new Pn({color:V==="tierra"?"#8a93a3":w[V].color,transparent:!0}),Lt);dt.userData.nopick=!0,Yt.add(dt);let oe={curve:ct,tube:ht,dots:dt,n:Lt,tipo:V,id:J,mat:Z};return kt.push(oe),oe},k=g+.001,pt=I=>[_.x-.0127,k-.002,_.z-.015+I*.006],at=I=>[u.x+.0037+I*.00254,g+.008,u.z+.0185];["ena","in1","in2","in3","in4","enb"].forEach((I,V)=>{let J=pt(V),ct=at(V);y([J,[J[0]-.005,J[1]+.012+V*.0015,J[2]],[(J[0]+ct[0])/2,g+.026+V*.0018,(J[2]+ct[2])/2+.003],[ct[0]+.002,ct[1]+.012,ct[2]+.006],ct],"orden",I)}),y([[-.0333,Le+.016,m+.019],[-.05,Le+.03,-.025],[-.064,g+.02,.02],[u.x-.012,g+.009,u.z+.0175]],"energia","bat_l298"),y([[.0333,Le+.016,m-.019],[.046,Le+.022,-.05],[S.x,Le+.014,S.z-.02]],"energia","bat_lm"),y([[S.x,Le+.014,S.z+.021],[.046,Le+.03,.022],[.03,g+.016,.03],[_.x+.0127,k-.002,_.z+.02]],"energia","lm_esp"),y([[-.0333,Le+.014,m],[-.046,Le+.026,-.03],[-.058,g+.015,.03],[u.x-.006,g+.009,u.z+.0175]],"tierra","gnd"),y([[0,D,ee-.003],[0,.04,ee+.006],[0,.062,ee-.004],[0,g+.026,.088],[0,k+.002,_.z+.0255]],"sensor","tcrt"),y([[.016,Gt,st.position.z-.001],[.02,Gt+.012,.082],[.02,g+.016,_.z+.032],[_.x+.0127,k-.002,_.z+.015]],"sensor","us_f"),y([[.016,Gt,vt.position.z+.001],[.026,Gt+.02,-.07],[.028,Gt+.022,-.02],[.02,g+.016,_.z-.02],[_.x+.0127,k-.002,_.z-.02]],"sensor","us_r");for(let I of["izq","der"]){let V=I==="izq"?1:-1,J=u.x+V*.0175,ct=V*.0215,Z=dn+.012;for(let ht of[-.0025,.0025])y([[J,g+.009,u.z-.004+ht],[J+V*.004,g+.03,.032+ht],[V*.02,Le+.018,.016+ht],[V*.017,Le-.004,.02+ht],[ct,Z+.002,cs+ht]],"energia",`mot_${I}`);for(let[ht,Lt]of[[0,-.0045],[1,.0045]]){let dt=I==="izq"?_.x+.0127:_.x-.0127,oe=_.z-.026+ht*.004;y([[ct,Z+.002,cs+Lt],[V*.012,Le-.004,.012+Lt],[V*.01,Le+.012,.004+Lt],[V*.026,g+.012,oe-.008],[dt,k-.002,oe]],"encoder",`enc_${I}_${ht?"b":"a"}`)}}let gt=(I,V)=>I.traverse(J=>J.userData.comp=V);gt(M,"esp32"),gt(O,"mpu"),gt($t,"tcrt"),gt(st,"us_front"),gt(vt,"us_rear"),gt($,"bateria"),gt(Ot,"bateria"),gt(X,"traccion"),gt(s,"traccion"),d.forEach(I=>gt(I,"traccion")),t.traccion=t.rueda_izq,t.bateria=t.bat,t.esp32=t.esp;let Ct={esp32:[M],mpu:[O],tcrt:[$t],us_front:[st],us_rear:[vt],bateria:[$,Ot],traccion:[...d,X,a]};i.updateMatrixWorld(!0);let Q={};for(let[I,V]of Object.entries(Ct)){Q[I]=new he,Q[I].visible=!1;for(let J of V){let ct=new Cn().setFromObject(J).expandByScalar(.003),Z=ct.getSize(new Qe),ht=ct.getCenter(new Qe),Lt=new Yi(new Zi(new Kt(Z.x,Z.y,Z.z)),new Pi({color:"#FFD23F",depthTest:!1,transparent:!0}));Lt.position.copy(ht),Lt.renderOrder=10,Lt.userData.nopick=!0,Q[I].add(Lt)}i.add(Q[I])}let nt=[];i.traverse(I=>{I.isMesh&&!I.isInstancedMesh&&I.userData.comp&&!I.userData.nopick&&nt.push(I)}),i.traverse(I=>{I.isMesh&&!I.isInstancedMesh&&!I.userData.nopick&&(I.castShadow=!0,I.receiveShadow=!0)}),a.castShadow=!1;let At=new xe,R=new Qe,it={critica:"#F2603D",precaucion:"#E8B90C",libre:"#0F9D84"},tt=(I,V,J,ct)=>{let Z=.5+.5*Math.sin(ct*7),ht=V==="critica"?.36+.12*Z:.06,Lt=V==="precaucion"?.28+.08*Z:V==="critica"?.12:.05;I.roja.material.opacity=ht,I.roja.children[0].material.opacity=Math.min(1,ht*3),I.ambar.material.opacity=Lt,I.ambar.children[0].material.opacity=Math.min(1,Lt*3);let dt=Number.isFinite(J)&&J<.55;I.marca.visible=dt,dt&&(I.marca.position.set(0,0,jt+J),I.marca.material.color.set(it[V]))};return{root:i,update:I=>{for(let J of["izq","der"]){let{parts:ct}=f[J];ct.rueda.rotation.x=I.ang[J],ct.inducido.rotation.x=I.arm[J],ct.disco.rotation.x=I.arm[J],ct.engranes.forEach((Z,ht)=>{let Lt=Math.floor(ht/2),dt=Math.pow(1/3.24,Lt+ht%2);Z.rotation.x=I.arm[J]*dt*(ht%2?-1:1)}),ct.halls.forEach((Z,ht)=>{let Lt=I.hall[J][ht];Z.material.color.set(Lt?"#0F9D84":"#14213D"),Z.material.emissive=Z.material.emissive||new re,Z.material.emissive.set(Lt?"#0F9D84":"#000000"),Z.material.emissiveIntensity=Lt?.9:0})}for(let J of e){let ct=J.userData.base*(1-.85*I.xray);J.opacity=ct,J.depthWrite=ct>.98}r.opacity=o*(1-.75*I.xray),Te.forEach((J,ct)=>{let Z=!!I.sens[ct];J.ind.material.color.set(Z?"#2EE6A8":"#1b3a30"),J.ind.material.emissive.set(Z?"#2EE6A8":"#000000"),J.ind.material.emissiveIntensity=Z?1.2:0,J.huella.material.color.set(Z?"#2EE6A8":"#7f9a93"),J.huella.material.opacity=Z?.95:.4}),tt(ae,I.zonaF,I.dF,I.t),tt(se,I.zonaR,I.dR,I.t);for(let J in Q)Q[J].visible=I.sel===J;if(I.sel){let J=.65+.35*Math.sin(I.t*6);Q[I.sel].children.forEach(ct=>ct.material.opacity=J)}let V=I.wires;Yt.visible=V>.01;for(let J of kt){J.mat.opacity=V,J.mat.depthWrite=V>.98;let ct=I.act[J.id]??0,Z=I.flow[J.id]??0;J.dots.material.opacity=V*Math.min(1,ct*1.4);for(let ht=0;ht<J.n;ht++){let Lt=((Z+ht/J.n)%1+1)%1;J.curve.getPointAt(Lt,R);let dt=ct>.02?1:1e-4;At.makeScale(dt,dt,dt).setPosition(R),J.dots.setMatrixAt(ht,At)}J.dots.instanceMatrix.needsUpdate=!0}It.material.emissiveIntensity=.2+1.2*Math.max(I.act.ena??0,I.act.enb??0),b.material.emissiveIntensity=.5+.5*Math.sin(I.t*9)},anchors:t,cables:kt,motores:f,pickables:nt}}var fe=(i,t=document)=>t.querySelector(i),yi=(i,t=document)=>[...t.querySelectorAll(i)],Qn=i=>String(i).replace(/[&<>"]/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"})[t]),Hd=(i,t=2)=>i.toFixed(t).replace(".",","),tn=window.SimulationState,vl=vd(document.getElementById("app"));vl.cargando();var Tn=fe("#lienzo"),Gd;try{let i=Pd({encendido:!1});Gd={demo:i,...Od(Tn,i.ruta,i.obstaculos)}}catch(i){throw console.error(i),vl.error(...Sd),i}Md(Tn,vl);Cx(Gd);function Cx({demo:i,renderer:t,scene:e,camera:n,controls:s,sol:r,pose:a,resize:o}){let c=zd(),l=new he;a.add(l),l.add(c.root);let h=new he,f=new ke({color:"#e8743b",transparent:!0,opacity:.45,roughness:.5,depthWrite:!1}),d=new ft(new Ge(.045,.045,.12,32),f);d.position.y=.06,h.add(d),h.visible=!1,a.add(h);let p=c.anchors.us_front.z,g=new ft(new Fr(.2,.26,48),new Pn({color:"#F2603D",transparent:!0,opacity:.85,depthWrite:!1}));g.rotation.x=-Math.PI/2,g.position.y=.004,g.visible=!1,a.add(g);let _=i.est,u={encendido:!1,pausa:!0,xray:0,xrayMeta:0,etiquetas:!0,mando:!1,vista:"inspeccion",sel:null,t:0,pitch:0,roll:0,sacudida:0},m=null,S={ang:{izq:0,der:0},arm:{izq:0,der:0},flow:{},act:{},hall:{izq:[!1,!1],der:[!1,!1]}},E={seguir:{off:new N(-.3,.45,-.8),alto:.05},inspeccion:{off:new N(.38,.3,.46),alto:.05},general:{pos:new N(0,3.3,3),tgt:new N(0,0,.05)}},M={seguir:"Seguir",inspeccion:"Inspecci\xF3n",general:"Panor\xE1mica"},A=new N(0,1,0),T=null,x=_.th,b=U=>{let B=E[U];if(U==="general")return{pos:B.pos.clone(),tgt:B.tgt.clone()};let xt=new N(_.x,B.alto,_.z),Ht=Tn.clientWidth<640?1.6:1;return{pos:B.off.clone().multiplyScalar(Ht).applyAxisAngle(A,_.th).add(xt),tgt:xt}},O=(U,B=!1)=>{if(u.vista=U,g.visible=U==="general",fe("#b-vista-tx")&&(fe("#b-vista-tx").textContent=M[U]),yi("[data-vista]").forEach(xt=>xt.setAttribute("aria-checked",String(xt.dataset.vista===U))),s.enablePan=U==="general",s.minDistance=U==="general"?1:.25,s.maxDistance=U==="general"?7:3,B){let xt=b(U);n.position.copy(xt.pos),s.target.copy(xt.tgt),T=null}else T={t:0,p0:n.position.clone(),t0:s.target.clone()}},P=U=>{if(u.vista==="general"){T&&F(U);return}let B=_.th-x;if(B>Math.PI&&(B-=2*Math.PI),B<-Math.PI&&(B+=2*Math.PI),x=_.th,T){F(U);return}let xt=n.position.clone().sub(s.target).applyAxisAngle(A,B);s.target.set(_.x,E[u.vista].alto,_.z),n.position.copy(s.target).add(xt)},F=U=>{T.t=Math.min(1,T.t+U/.9);let B=T.t*T.t*(3-2*T.t),xt=b(u.vista);n.position.lerpVectors(T.p0,xt.pos,B),s.target.lerpVectors(T.t0,xt.tgt,B),T.t>=1&&(T=null)},G=()=>{n.clearViewOffset(),n.updateProjectionMatrix()},X=fe("#b-pausa"),C=U=>{let B=!!U;u.encendido=B,u.pausa=!B,B?i.encender():i.detener(),document.body.dataset.encendido=B?"1":"0",X.setAttribute("aria-pressed",String(B)),fe(".tx",X).textContent=B?"\u23F9 Detener":"\u26A1 Encender",X.classList.toggle("en-pausa",!B),B||(Ot=null),I(!0),B?Pe():(jt(),m&&(cancelAnimationFrame(m),m=null),Mi(0))},Y=U=>C(!U);X.addEventListener("click",()=>C(!u.encendido));let j=fe("#b-xray");j.addEventListener("click",()=>{u.xrayMeta=u.xrayMeta?0:1,j.setAttribute("aria-pressed",String(!!u.xrayMeta)),j.setAttribute("aria-checked",String(!!u.xrayMeta)),Pe()});let q=fe("#b-etiq"),ut=U=>{u.etiquetas=U,q.setAttribute("aria-pressed",String(U)),q.setAttribute("aria-checked",String(U)),fe("#etiquetas").hidden=!U,fe("#guias").style.display=U?"":"none",U&&Pe()};q.addEventListener("click",()=>ut(!u.etiquetas));let K=[[fe("#b-herramientas"),fe("#menu-herramientas")],[fe("#b-vista"),fe("#menu-vista")],[fe("#b-ajustes"),fe("#menu-ajustes")]].filter(([U,B])=>U&&B),rt=(U=null)=>{K.forEach(([B,xt])=>{xt!==U&&(xt.hidden=!0,B.setAttribute("aria-expanded","false"))})};K.forEach(([U,B])=>{U.addEventListener("click",xt=>{xt.stopPropagation();let Ht=B.hidden;rt(Ht?B:null),B.hidden=!Ht,U.setAttribute("aria-expanded",String(Ht))})}),document.addEventListener("click",U=>{(!U.target.closest||!U.target.closest(".p02-menu-wrap"))&&rt()}),yi("[data-vista]").forEach(U=>{U.addEventListener("click",()=>{O(U.dataset.vista),rt(),Pe()})});let lt=fe("#dpad"),Ft=U=>{u.mando=!!U,lt&&(lt.hidden=!u.mando),u.mando||($.clear(),Tt())},It=new Set,$=new Set,bt={KeyW:"arriba",ArrowUp:"arriba",KeyS:"abajo",ArrowDown:"abajo",KeyA:"izq",ArrowLeft:"izq",KeyD:"der",ArrowRight:"der",Space:"stop"},Dt=U=>It.has(U)||$.has(U),Ot=null,Tt=()=>{let U=It.size>0||$.size>0;U&&(Ot=null),_.entrada=Ot&&!U?{...Ot}:{f:(Dt("arriba")?1:0)-(Dt("abajo")?1:0),t:(Dt("izq")?1:0)-(Dt("der")?1:0),freno:Dt("stop")},yi("[data-dp]").forEach(B=>B.classList.toggle("on",Dt(B.dataset.dp)))},Xt=U=>{U==="auto"&&(Ot=null),i.setModo(U),document.body.dataset.modo=U,yi("[data-modo]").forEach(B=>B.setAttribute("aria-pressed",String(B.dataset.modo===U))),Ft(U==="manual"),Tt()},ve=()=>{u.encendido&&_.modo!=="manual"&&Xt("manual")};yi("[data-modo]").forEach(U=>U.addEventListener("click",()=>{Xt(U.dataset.modo),I(!0)}));let Gt=U=>{let B=U.target;return B&&B.closest&&!!B.closest("input, select, textarea, button, a, summary, #hw-panel")};addEventListener("keydown",U=>{if(U.ctrlKey||U.metaKey||U.altKey||Gt(U))return;if(U.code==="KeyM"&&!U.repeat){Xt(_.modo==="auto"?"manual":"auto"),I(!0);return}if(!u.encendido)return;let B=bt[U.code];B&&(U.preventDefault(),It.has(B)||(It.add(B),ve(),Tt()))}),addEventListener("keyup",U=>{let B=bt[U.code];It.has(B)&&B&&(U.preventDefault(),It.delete(B),Tt())});let jt=()=>{It.clear(),$.clear(),Tt()};addEventListener("blur",jt);let ie=!1;document.addEventListener("visibilitychange",()=>{document.hidden?(jt(),m&&(cancelAnimationFrame(m),m=null,ie=!0)):(ie||u.encendido)&&(ie=!1,Pe())});let st=U=>{u.encendido&&($.has(U)||($.add(U),ve(),Tt()))},vt=U=>{$.delete(U)&&Tt()};yi("[data-dp]").forEach(U=>{let B=U.dataset.dp;U.addEventListener("pointerdown",xt=>{xt.preventDefault();try{U.setPointerCapture(xt.pointerId)}catch{}st(B)});for(let xt of["pointerup","pointercancel","lostpointercapture","pointerleave"])U.addEventListener(xt,()=>vt(B));U.addEventListener("touchstart",xt=>{xt.preventDefault(),st(B)},{passive:!1});for(let xt of["touchend","touchcancel"])U.addEventListener(xt,Ht=>{Ht.preventDefault(),vt(B)},{passive:!1});U.addEventListener("contextmenu",xt=>xt.preventDefault())}),Tn.addEventListener("pointerdown",()=>window.focus());let Mt=fe("#tira");Mt.innerHTML=rh.map(U=>{let B=Ks[U],xt=U==="tcrt"?'<span class="sq" aria-hidden="true"></span>'.repeat(4):"";return`<button class="chip" data-comp="${U}" style="--c:${B.color}" aria-pressed="false"><b>${Qn(B.corto)}</b><span class="res">${Qn(B.resumen||"")}</span><span class="v" data-v="${U}">${xt}</span></button>`}).join("");let Nt=fe("#hw-ficha"),wt=fe("#hw-panel"),Qt={tcrt:"tcrt5000",us:"hcsr04",us_front:"hcsr04",us_rear:"hcsr04",mpu:"mpu6050",traccion:"motores",esp32:"motores",bateria:null},zt=U=>U==="us_front"||U==="us_rear"?"us":U||null,ae=U=>{wt&&(U?(wt.dataset.focoActivo="1",wt.dataset.focoCard=Qt[U]||"ninguna"):(delete wt.dataset.focoActivo,delete wt.dataset.focoCard))},se=(U,B=!1)=>{let xt=zt(U);if(u.sel=xt,xt&&(fe("#pista-tocar").hidden=!0),yi(".chip").forEach(v=>v.setAttribute("aria-pressed",String(v.dataset.comp===xt))),yi(".et").forEach(v=>v.classList.toggle("act",zt(v.dataset.comp)===xt)),ae(u.sel),Nt)if(xt){let v=Ks[xt],[L,W]=v.estado;Nt.style.setProperty("--c",v.color),Nt.innerHTML=`
          <div class="hw-ficha-head"><b>${Qn(v.nombre)}</b><span class="hw-ficha-estado ${L}">${Qn(W)}</span></div>
          <p class="hw-ficha-rol">${Qn(v.rol)}</p>
          <h3>Datos t\xE9cnicos del proyecto</h3>
          <dl class="hw-ficha-datos">${v.datos.map(([z,H])=>`<dt>${Qn(z)}</dt><dd>${Qn(H)}</dd>`).join("")}</dl>
          <h3>En vivo (circuito)</h3>
          <dl class="hw-ficha-datos vivo" id="f-vivo"></dl>
          <p class="hw-ficha-nota">${Qn(v.nota)}</p>`,w="",y()}else Nt.innerHTML="";let Ht=u.sel==="us"?"us_front":u.sel,ue=u.sel?Qt[u.sel]:null;!B&&tn&&(tn.get().foco!==Ht||tn.get().seleccion!==ue)&&tn.set({foco:Ht,seleccion:ue},"circuito-ui"),u.sel==="us"&&fe("#hw-panel-titulo")&&(fe("#hw-panel-titulo").textContent="Enfocado \xB7 HC-SR04P \xB7 Radar dual"),ti(),Pe()};addEventListener("keydown",U=>{U.key==="Escape"&&(rt(),u.sel&&se(null))}),Mt.addEventListener("click",U=>{let B=U.target.closest("[data-comp]");B&&se(u.sel===B.dataset.comp?null:B.dataset.comp)});let ee=fe("#etiquetas"),D=fe("#guias"),Ce=Ld.map(U=>{let B=document.createElement("button");B.className="et",B.dataset.comp=U,B.style.setProperty("--c",Ks[U].color),ee.appendChild(B);let xt=document.createElementNS("http://www.w3.org/2000/svg","line");return D.appendChild(xt),{id:U,el:B,ln:xt,w:0,h:0,x:0,y:0,txt:""}});ee.addEventListener("click",U=>{let B=U.target.closest("[data-comp]");if(B){let xt=zt(B.dataset.comp);se(u.sel===xt?null:xt)}});let $t=new qr,ge=new yt,St=null,Te=U=>{let B=Tn.getBoundingClientRect();ge.set((U.clientX-B.left)/B.width*2-1,-((U.clientY-B.top)/B.height)*2+1),$t.setFromCamera(ge,n);let xt=$t.intersectObjects(c.pickables,!1)[0];return xt?xt.object.userData.comp:null};Tn.addEventListener("pointerdown",U=>St={x:U.clientX,y:U.clientY,t:performance.now()}),Tn.addEventListener("pointerup",U=>{if(!St)return;let B=Math.hypot(U.clientX-St.x,U.clientY-St.y),xt=performance.now()-St.t;if(St=null,B>6||xt>600)return;let Ht=zt(Te(U));Ht&&se(Ht===u.sel?null:Ht)});let kt=null;Tn.addEventListener("pointermove",U=>{U.buttons||(kt=U,u.encendido||(Tn.style.cursor=Te(kt)?"pointer":"",kt=null))});let Yt=()=>{let U=i.motores();return{sens:_.sens,dF:_.frente,dR:_.atras,zonaF:i.zonaFrente(),zonaR:i.zonaAtras(),mot:U,v:_.v,w:_.w,th:_.th}},w="";function y(){if(!u.sel){w="";return}let B=Ks[u.sel].vivo(Yt()).map(([xt,Ht])=>`<dt>${Qn(xt)}</dt><dd>${Qn(Ht)}</dd>`).join("");B!==w&&(w=B,fe("#f-vivo").innerHTML=B)}let k={},pt=(U,B)=>U==="critica"||B==="critica"?"critica":U==="precaucion"||B==="precaucion"?"precaucion":"libre",at=()=>{let U=Yt(),B={us:`F: ${sh(U.dF)} \xB7 T: ${sh(U.dR)}`,esp32:"MQTT + PWM",mpu:"heading hold",traccion:`${Hd(U.v)} m/s`,bateria:`${Hd(Xe.vbat,1)} V nominal`};for(let xt of rh){let Ht=fe(`[data-v="${xt}"]`,Mt);if(Ht)if(xt==="tcrt"){let ue=U.sens.join("");k[xt]!==ue&&(k[xt]=ue,yi(".sq",Ht).forEach((v,L)=>v.classList.toggle("on",!!U.sens[L])))}else{let ue=xt==="us"?pt(U.zonaF,U.zonaR):"",v=`${B[xt]}|${ue}`;k[xt]!==v&&(k[xt]=v,Ht.textContent=B[xt],ue&&(Ht.dataset.zona=ue))}}},gt=["ena","enb","in1","in2","in3","in4","bat_l298","bat_lm","lm_esp","gnd","tcrt","us_f","us_r","mot_izq","mot_der","enc_izq_a","enc_izq_b","enc_der_a","enc_der_b"],Ct=U=>{let B=i.motores();S.ang.izq+=_.vIzq/dn*U,S.ang.der+=_.vDer/dn*U,S.arm.izq=S.ang.izq*4,S.arm.der=S.ang.der*4;let xt=(ue,v)=>(ue*11/(2*Math.PI)+v)%1;for(let ue of["izq","der"]){let v=(xt(S.arm[ue],0)+1)%1,L=(xt(S.arm[ue],.25)+1)%1;S.hall[ue]=[v<.5,L<.5]}let Ht=S.act;Ht.ena=B.dutyIzq,Ht.enb=B.dutyDer,Ht.in1=_.vIzq>.01?1:0,Ht.in2=_.vIzq<-.01?1:0,Ht.in3=_.vDer>.01?1:0,Ht.in4=_.vDer<-.01?1:0,Ht.bat_l298=(B.dutyIzq+B.dutyDer)/2,Ht.mot_izq=B.dutyIzq,Ht.mot_der=B.dutyDer,Ht.bat_lm=Ht.lm_esp=.55,Ht.gnd=.4,Ht.tcrt=Ht.us_f=Ht.us_r=.7,Ht.enc_izq_a=Ht.enc_izq_b=Math.min(1,B.encIzq/400),Ht.enc_der_a=Ht.enc_der_b=Math.min(1,B.encDer/400);for(let ue of gt)S.flow[ue]=((S.flow[ue]??0)+U*(.35+1.1*(Ht[ue]??0)))%1},Q=new N,nt=new N,At=()=>{let U=Tn.clientWidth,B=Tn.clientHeight,xt=U<640,Ht=Yt();nt.set(0,.06,0),l.localToWorld(nt).project(n);let ue=(nt.x*.5+.5)*U,v=(-nt.y*.5+.5)*B,L=xt?108:58,W=B-(xt?86:64),z=U,H=[];for(let et of Ce){let Pt=c.anchors[et.id];Q.copy(Pt),l.localToWorld(Q);let _t=Q.distanceTo(n.position);if(Q.project(n),Q.z>1||_t>2.2){et.el.style.display="none",et.ln.style.display="none";continue}let ot=(Q.x*.5+.5)*U,mt=(-Q.y*.5+.5)*B,Vt=(xt?ah[et.id].corto:ah[et.id].largo)(Ht);Vt!==et.txt&&(et.el.textContent=Vt,et.txt=Vt,et.w=et.h=0),et.el.style.display="",et.w||(et.w=et.el.offsetWidth,et.h=et.el.offsetHeight);let Wt=ot-ue,Et=mt-v,Jt=Math.hypot(Wt,Et)||1,Ae=xt?30:46;Wt/=Jt,Et/=Jt,Math.abs(Wt)<.25&&Math.abs(Et)<.25&&(Et=-1),et.ax=ot,et.ay=mt,et.x=ot+Wt*Ae+(Wt>=0?et.w/2:-et.w/2)*Math.abs(Wt),et.y=mt+Et*Ae,H.push(et)}for(let et=0;et<6;et++)for(let Pt=0;Pt<H.length;Pt++)for(let _t=Pt+1;_t<H.length;_t++){let ot=H[Pt],mt=H[_t],Vt=(ot.w+mt.w)/2+4-Math.abs(ot.x-mt.x),Wt=(ot.h+mt.h)/2+3-Math.abs(ot.y-mt.y);if(Vt>0&&Wt>0){let Et=(ot.y<=mt.y?1:-1)*(Wt/2+.5);ot.y-=Et,mt.y+=Et}}for(let et of H){let Pt=Math.min(Math.max(et.x,et.w/2+6),z-et.w/2-6),_t=Math.min(Math.max(et.y,L+et.h/2),W-et.h/2);et.el.style.transform=`translate(${Math.round(Pt-et.w/2)}px, ${Math.round(_t-et.h/2)}px)`,et.ln.style.display="",et.ln.setAttribute("x1",et.ax.toFixed(1)),et.ln.setAttribute("y1",et.ay.toFixed(1)),et.ln.setAttribute("x2",Pt.toFixed(1)),et.ln.setAttribute("y2",_t.toFixed(1)),et.ln.style.stroke=Ks[et.id].color}},R=0,it=0,tt=0,Rt=()=>!u.encendido||Math.abs(_.v)<.02&&Math.abs(_.w)<.3?"DETENIDO":Math.abs(_.w)>1.2&&Math.abs(_.v)<.15?_.w>0?"IZQUIERDA":"DERECHA":_.v>=0?"ADELANTE":"ATR\xC1S";function I(U,B=0){if(!tn||(R+=B,!U&&u.encendido&&R<.05)||!U&&!u.encendido)return;R>0&&(tt=tt*.6+.4*((_.v-it)/Math.max(R,.001))),it=_.v,R=0;let xt=9.81,Ht=_.v*_.w,ue=u.encendido&&Math.abs(_.v)>.02?.25*Math.sin(u.t*37):0;tn.publicarCircuito({encendido:u.encendido,modo:_.modo,distanciaCm:_.frente*100,atrasCm:_.atras*100,canales:_.sens,desvioMm:-_.eLat*1e3,velEfectivaMs:u.encendido?_.v:0,pwmIzq:(_.pwm.izq||0)*100,pwmDer:(_.pwm.der||0)*100,direccion:Rt(),bloqueado:_.bloqueado,pitchDeg:Math.max(-6,Math.min(6,tt/xt*57.3*.35))+ue,rollDeg:Math.max(-6,Math.min(6,Ht/xt*57.3*.35)),acelG:Math.hypot(1,tt/xt,Ht/xt)})}let V=0,J="normal",ct=U=>{let B=_.iny;B.frente=U.inyeccion.hcsr04?U.hcsr04.distanciaCm/100:null,B.sinEcoFrente=U.salud.hcsr04==="fallo",B.sinLinea=U.salud.tcrt5000==="fallo",B.vConsigna=U.inyeccion.motores?U.motores.velocidadMs:null,B.paro=U.seguridad.paroForzado?U.seguridad.motivos[0]||"parada":null,B.paroAtras=U.seguridad.permiteAtras,B.atasco=U.inyeccion.mpu6050&&U.mpu6050.evento==="atascamiento";let xt=U.inyeccion.tcrt5000?U.tcrt5000.desvioMm/1e3:0;(!u.encendido||_.modo==="manual")&&i.desplazarLateral(xt-V),V=xt,B.desvio=xt,U.mpu6050.evento==="impacto"&&J!=="impacto"&&(u.sacudida=1),J=U.mpu6050.evento,i.medir()},Z=(U,B)=>{if(U!=="direccion")return;let Ht={ADELANTE:{f:1,t:0},ATR\u00C1S:{f:-1,t:0},IZQUIERDA:{f:0,t:1},DERECHA:{f:0,t:-1},DETENIDO:{f:0,t:0,freno:!0}}[B];Ht&&(!u.encendido&&B!=="DETENIDO"&&C(!0),_.modo!=="manual"&&Xt("manual"),It.clear(),$.clear(),Ot={freno:!1,...Ht},Tt(),I(!0))};function ht(){tn&&(tn.alComando(Z),tn.subscribe((U,B)=>{if(B==="circuito")return;ct(U);let xt=zt(U.foco);xt!==u.sel&&se(xt,!0),u.sel==="us"&&fe("#hw-panel-titulo")&&(fe("#hw-panel-titulo").textContent="Enfocado \xB7 HC-SR04P \xB7 Radar dual"),I(!0),ti(),Pe()}),ct(tn.get()),I(!0))}let Lt=fe("#hw-in-dist-atras"),dt=fe("#hw-lbl-dist-atras"),oe=fe("#hw-vivo-hcsr04"),we=fe("#hw-btn-reset"),ze=0,fn=1,vi=()=>{_.iny.atras=null,dt&&(dt.textContent="Vivo"),i.medir(),I(!0),ti()};Lt&&Lt.addEventListener("input",U=>{let B=Number(U.target.value);_.iny.atras=B/100,dt&&(dt.textContent=`${B} cm`),i.medir(),I(!0),ti(),Pe()}),oe&&oe.addEventListener("click",vi),we&&we.addEventListener("click",vi);function ti(){let U=fe("#hw-canvas-radar-dual");if(!U)return;let B=U.getContext("2d");if(!B)return;let xt=U.clientWidth||U.width||260,Ht=U.clientHeight||U.height||164,ue=Math.min(window.devicePixelRatio||1,2),v=Math.round(xt*ue),L=Math.round(Ht*ue);U.clientWidth&&(U.width!==v||U.height!==L)&&(U.width=v,U.height=L),B.setTransform&&B.setTransform(U.clientWidth?ue:1,0,0,U.clientWidth?ue:1,0,0),B.clearRect(0,0,xt,Ht);let W=tn?tn.get():null,z=!!(W&&W.salud.hcsr04==="fallo"),H=W?W.hcsr04.distanciaCm:_.frente*100,et=_.iny.atras!=null?_.iny.atras*100:W&&W.hcsr04.atrasCm!=null?W.hcsr04.atrasCm:_.atras*100,Pt=me=>z?"fallo":me<20?"critica":me<50?"precaucion":"libre",_t=Pt(H),ot=Pt(et),mt=me=>me==="critica"||me==="fallo"?"#EF4444":me==="precaucion"?"#F59E0B":"#00F2FE",Vt=me=>me==="critica"||me==="fallo"?"rgba(239,68,68,0.22)":me==="precaucion"?"rgba(245,158,11,0.16)":"rgba(0,242,254,0.12)",Wt=xt/2,Et=Ht/2,Jt=Math.min(xt*.42,Ht*.43);B.lineWidth=1,B.font='9.5px "JetBrains Mono", monospace',[[20,"rgba(239,68,68,0.52)"],[50,"rgba(245,158,11,0.45)"],[80,"rgba(0,242,254,0.3)"]].forEach(([me,Bt])=>{let Ue=Jt*(me/80);B.beginPath(),B.strokeStyle=Bt,B.arc(Wt,Et,Ue,0,Math.PI*2),B.stroke(),B.fillStyle="#849495",B.fillText(String(me),Wt+Ue+3,Et+3)}),B.strokeStyle="rgba(132,148,149,0.28)",B.beginPath(),B.moveTo(Wt-Jt-8,Et),B.lineTo(Wt+Jt+8,Et),B.stroke(),B.fillStyle="#849495",B.font='700 9px "JetBrains Mono", monospace',B.textAlign="left",B.fillText("FRENTE \u25B2",8,13),B.fillText("ATR\xC1S \u25BC",8,Ht-6);let Ae=(me,Bt,Ue)=>{let pe=me<0?-Math.PI/2:Math.PI/2,kn=28*Math.PI/180;if(B.beginPath(),B.moveTo(Wt,Et),B.arc(Wt,Et,Jt,pe-kn,pe+kn,!1),B.closePath(),B.fillStyle=Vt(Ue),B.fill(),z)return;let Oe=mt(Ue),zi=pe+(me<0?ze:-ze);if(B.beginPath(),B.moveTo(Wt,Et),B.lineTo(Wt+Math.cos(zi)*Jt,Et+Math.sin(zi)*Jt),B.strokeStyle=Oe,B.lineWidth=1.8,B.stroke(),Number.isFinite(Bt)&&Bt<=80){let Vn=Math.max(6,Bt/80*Jt),Wn=Et+me*Vn;B.beginPath(),B.arc(Wt,Wn,5,0,Math.PI*2),B.fillStyle=Oe,B.fill(),B.beginPath(),B.arc(Wt,Wn,9,0,Math.PI*2),B.strokeStyle=Oe,B.lineWidth=1.2,B.stroke()}};Ae(-1,H,_t),Ae(1,et,ot),B.fillStyle="#181C22",B.strokeStyle="#E0FDFF",B.lineWidth=1.5,B.fillRect(Wt-10,Et-7,20,14),B.strokeRect(Wt-10,Et-7,20,14),z&&(B.fillStyle="#F87171",B.font='bold 10.5px "JetBrains Mono", monospace',B.textAlign="center",B.fillText("SIN ECO \xB7 FALLO",Wt,Et-16),B.textAlign="left");let be=fe("#hw-val-atras");be&&(be.textContent=z?"---":!Number.isFinite(et)||et>=400?"> 4 m":Math.round(et)+" cm",be.className="hw-metric-v"+(ot==="critica"||ot==="fallo"?" peligro":ot==="precaucion"?" aviso":""));let Me=fe("#hw-badge-hcsr04");Me&&!z&&_t==="libre"&&ot!=="libre"&&(Me.textContent=ot==="critica"?"ATR\xC1S < 20 cm":"ATR\xC1S PRECAUCI\xD3N",Me.className="hw-badge "+(ot==="critica"?"peligro":"aviso"))}window.setInterval(()=>{ze+=fn*.05,ze>.44&&(ze=.44,fn=-1),ze<-.44&&(ze=-.44,fn=1),ti()},80);let Gn=Math.PI/180,ei=U=>{let B=tn?tn.get():null,xt=B?B.mpu6050.pitchDeg*Gn:0,Ht=B?B.mpu6050.rollDeg*Gn:0,ue=1-Math.exp(-U*10);u.pitch+=(xt-u.pitch)*ue,u.roll+=(Ht-u.roll)*ue,u.sacudida=Math.max(0,u.sacudida-U*1.4);let v=u.sacudida*.012*Math.sin(u.t*70+performance.now()/15);l.rotation.set(-u.pitch,0,u.roll+v*4),l.position.set(v,Math.max(Math.sin(Math.abs(u.pitch))*.06,Math.sin(Math.abs(u.roll))*.04),0);let L=B&&B.inyeccion.hcsr04&&B.salud.hcsr04!=="fallo";h.visible=!!L,L&&h.position.set(0,0,p+B.hcsr04.distanciaCm/100+.045)},wn=()=>{let U=tn?tn.get():null;return U?u.sacudida>0||Math.abs(U.mpu6050.pitchDeg*Gn-u.pitch)>.002||Math.abs(U.mpu6050.rollDeg*Gn-u.roll)>.002:!1},ni=performance.now(),ii=0,pn=0,mn=1/120;function Mi(U){if(u.encendido)for(u.t+=U,pn+=U;pn>=mn;)i.paso(mn),Ct(mn),pn-=mn;let B=U>0?U:1/60;u.xray+=(u.xrayMeta-u.xray)*Math.min(1,B*6),Math.abs(u.xrayMeta-u.xray)<.002&&(u.xray=u.xrayMeta),g.visible&&g.scale.setScalar(u.encendido?1+.12*Math.sin(u.t*4):1),a.position.set(_.x,0,_.z),a.rotation.y=_.th,ei(B),c.update({ang:S.ang,arm:S.arm,xray:u.xray,explode:0,wires:1,t:u.t,flow:S.flow,act:S.act,hall:S.hall,sens:_.sens,zonaF:i.zonaFrente(),zonaR:i.zonaAtras(),dF:_.frente,dR:_.atras,sel:u.sel==="us"?"us_front":u.sel}),r.position.set(_.x+1,2.4,_.z+.8),r.target.position.set(_.x,0,_.z),P(B),s.update(),kt&&(Tn.style.cursor=Te(kt)?"pointer":"",kt=null),t.render(e,n),u.etiquetas&&At(),I(!1,U),u.encendido?(ii+=U,ii>.12&&(ii=0,at(),y())):(at(),y())}function Si(U){if(m=null,document.hidden){ie=!0;return}let B=Math.min(.25,Math.max(0,(U-ni)/1e3));ni=U,Mi(B);let xt=!!T||Math.abs(u.xrayMeta-u.xray)>.002||wn();(u.encendido||xt)&&(m=requestAnimationFrame(Si))}function Pe(){m||(ni=performance.now(),m=requestAnimationFrame(Si))}s.addEventListener("change",()=>{u.encendido||Pe()}),new ResizeObserver(()=>{o(),G(),Pe()}).observe(Tn);let Qs=fe("#app"),hs=()=>Qs.style.setProperty("--alto-tira",`${Mt.offsetHeight}px`);new ResizeObserver(hs).observe(Mt),o(),O("inspeccion",!0),ut(!0),Ft(!1),ht(),x=_.th,O("inspeccion",!0),C(!1),vl.listo(),window.VITRINA={demo:i,ui:u,abrirFicha:se,irA:O,ponEncendido:C,ponPausa:Y,ponEtiquetas:ut,ponMando:Ft,ponModo:Xt,estado:tn,manual:Js,vmax:rs,xray:U=>{u.xrayMeta=U?1:0,j.setAttribute("aria-pressed",String(!!U)),Pe()},camera:n,controls:s}}})();
