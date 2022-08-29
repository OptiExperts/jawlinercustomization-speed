var SMARTIFYAPPS = SMARTIFYAPPS || {};
SMARTIFYAPPS.rv = SMARTIFYAPPS.rv || {};

!function(e){var n=!1;if("function"==typeof define&&define.amd&&(define(e),n=!0),"object"==typeof exports&&(module.exports=e(),n=!0),!n){var o=window.Cookies,t=window.Cookies=e();t.noConflict=function(){return window.Cookies=o,t}}}(function(){function e(){for(var e=0,n={};e<arguments.length;e++){var o=arguments[e];for(var t in o)n[t]=o[t]}return n}function n(o){function t(n,r,i){var c;if("undefined"!=typeof document){if(arguments.length>1){if(i=e({path:"/"},t.defaults,i),"number"==typeof i.expires){var a=new Date;a.setMilliseconds(a.getMilliseconds()+864e5*i.expires),i.expires=a}try{c=JSON.stringify(r),/^[\{\[]/.test(c)&&(r=c)}catch(e){}return r=o.write?o.write(r,n):encodeURIComponent(String(r)).replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g,decodeURIComponent),n=encodeURIComponent(String(n)),n=n.replace(/%(23|24|26|2B|5E|60|7C)/g,decodeURIComponent),n=n.replace(/[\(\)]/g,escape),document.cookie=[n,"=",r,i.expires?"; expires="+i.expires.toUTCString():"",i.path?"; path="+i.path:"",i.domain?"; domain="+i.domain:"",i.secure?"; secure":""].join("")}n||(c={});for(var p=document.cookie?document.cookie.split("; "):[],s=/(%[0-9A-Z]{2})+/g,d=0;d<p.length;d++){var f=p[d].split("="),u=f.slice(1).join("=");'"'===u.charAt(0)&&(u=u.slice(1,-1));try{var l=f[0].replace(s,decodeURIComponent);if(u=o.read?o.read(u,l):o(u,l)||u.replace(s,decodeURIComponent),this.json)try{u=JSON.parse(u)}catch(e){}if(n===l){c=u;break}n||(c[l]=u)}catch(e){}}return c}}return t.set=t,t.get=function(e){return t.call(t,e)},t.getJSON=function(){return t.apply({json:!0},[].slice.call(arguments))},t.defaults={},t.remove=function(n,o){t(n,"",e(o,{expires:-1}))},t.withConverter=n,t}return n(function(){})});if (typeof Cookies !== 'undefined') {
    SMARTIFYAPPS.rv.Cookies = Cookies.noConflict();
}

SMARTIFYAPPS.rv.Cookie = SMARTIFYAPPS.rv.Cookie || {
    name: 'scm_reviews_importer_app',
    count: 'scm_reviews_importer_count',
    setInstalled: function() {
        SMARTIFYAPPS.rv.Cookies.set(this.count, 0);
        SMARTIFYAPPS.rv.Cookies.set(this.name, "installed");
    },
    isInstalled: function() {
        var count = SMARTIFYAPPS.rv.Cookies.get(this.count);
        if (! count) count = 0;
        count++;
        SMARTIFYAPPS.rv.Cookies.set(this.count, count);

                    return SMARTIFYAPPS.rv.Cookies.get(this.name) === "installed" && count < 2;
            }
};

SMARTIFYAPPS.rv.performanceNow = SMARTIFYAPPS.rv.performanceNow || function() {
    if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
        return Math.round(performance.now()) + ' ms ';
    } else {
        return '';
    }
};

    var scripts = document.head.getElementsByTagName('script');
    for (var i = 0; i < scripts.length; ++i) {
        if(scripts[i].innerText.indexOf('asyncLoad') >= 0 &&
            (scripts[i].innerText.indexOf("reviews.smartifyapps.com\\/storage\\/scripts") >= 0 ||
             scripts[i].innerText.indexOf("d1bu6z2uxfnay3.cloudfront.net\\/storage\\/scripts") >= 0
            )
        ) {
            console.log('already has scripttag, load RV');
            SMARTIFYAPPS.rv.installed = true;
            SMARTIFYAPPS.rv.Cookie.setInstalled();
        }
    }
    if (! SMARTIFYAPPS.rv.Cookie.isInstalled()) {
        SMARTIFYAPPS.rv.installed = false;
        console.log(SMARTIFYAPPS.rv.performanceNow() + 'preload skip');
    } else {
        SMARTIFYAPPS.rv.installed = true;
    }

if (SMARTIFYAPPS.rv.loadingApp !== true && SMARTIFYAPPS.rv.installed === true) {
    SMARTIFYAPPS.rv.loadingApp = true;

    SMARTIFYAPPS.rv.loadScript = SMARTIFYAPPS.rv.loadScript || function(url, callback){
        var script = document.createElement("script");
        script.type = "text/javascript";
        if (script.readyState){  // IE
            script.onreadystatechange = function(){
                if (script.readyState == "loaded" || script.readyState == "complete"){
                    script.onreadystatechange = null;
                    callback();
                }
            };
        } else {  // Others
            script.onreadystatechange = callback;
            script.onload = callback;
        }

        script.src = url;
        var x = document.getElementsByTagName('script')[0]; x.parentNode.insertBefore(script, x);
    };

    SMARTIFYAPPS.rv.loadStyle = SMARTIFYAPPS.rv.loadStyle || function(url){
        var head = document.getElementsByTagName("head")[0];
        var extension = '.css';
        var link = document.createElement("link");
        link.href = url;
        link.type = "text/css";
        link.rel = "stylesheet";
        head.appendChild(link);
    };
                    SMARTIFYAPPS.rv.scmReviewsRate = SMARTIFYAPPS.rv.scmReviewsRate || (function() {
  function loadCss(filename) {
    var cssNode = document.createElement('link');
    cssNode.setAttribute('rel', 'stylesheet');
    cssNode.setAttribute('type', 'text/css');
    cssNode.setAttribute('href', filename);
    document.getElementsByTagName('head')[0].appendChild(cssNode);
  }

  function getInfoShop() {
    var infoShopElem = document.getElementById('scm-reviews-shopSetting');
    if (!infoShopElem)
        return '';
    var infoShop = infoShopElem.getAttribute('data-shop');
    return infoShop;
  }
let infoShopParam= getInfoShop();
let settingApp = (function(infoShopParam) {
    if(infoShopParam === 'null' || infoShopParam === ''){
        infoShopParam= '{}';
    }
    let infoShopJson= JSON.parse(infoShopParam);
    let checkSetting = function(strText) {
        if (typeof (strText) == "undefined" || strText == 'undefined') {
            return false;
        }
        return true;
    }
    let defaultSetting= {
        starColor: checkSetting(infoShopJson.starColor) ? infoShopJson.starColor : "#fa4f56",
        starStyle: checkSetting(infoShopJson.starStyle) ? infoShopJson.starStyle : 'heart',
        width: checkSetting(infoShopJson.width) ? infoShopJson.width : "1200px",
        reviewBg:   checkSetting(infoShopJson.reviewBg) ? infoShopJson.reviewBg : "#ffffff"
    };
    let settingCustom = {
        hasBg : defaultSetting.reviewBg !== '#ffffff' ? true : false
    }
    let getSettingFromShop = function () {
        return Object.assign(defaultSetting, settingCustom);
    }
    return getSettingFromShop();
})(infoShopParam);




let iconStar= {
    'star' : {
        'rating': `<svg class="Path_1_" viewBox="0 11.796 15.128 14.431">
            <path id="Path_1_" d="M 15.10665130615234 17.27590179443359 C 15.05453205108643 17.11542510986328 14.91586685180664 16.99847793579102 14.74892520904541 16.97425079345703 L 10.05909633636475 16.29273986816406 L 7.961684226989746 12.04304504394531 C 7.88704776763916 11.89176177978516 7.732958793640137 11.79600048065186 7.564273357391357 11.79600048065186 C 7.395556449890137 11.79600048065186 7.241498470306396 11.89176177978516 7.16683292388916 12.04304504394531 L 5.069331645965576 16.29273986816406 L 0.3795907497406006 16.97425079345703 C 0.2126783281564713 16.99847793579102 0.07395394891500473 17.11542510986328 0.02183260396122932 17.2758674621582 C -0.03031831048429012 17.43634033203125 0.01317525468766689 17.61246871948242 0.133993998169899 17.73021697998047 L 3.527437686920166 21.03815460205078 L 2.726470708847046 25.70907592773438 C 2.697927951812744 25.87537002563477 2.766300439834595 26.04337692260742 2.902779340744019 26.14256286621094 C 2.979986429214478 26.19864654541016 3.07143497467041 26.22718811035156 3.163326740264893 26.22718811035156 C 3.233885526657104 26.22718811035156 3.304681062698364 26.21037673950195 3.369507789611816 26.17627716064453 L 7.564243793487549 23.97093200683594 L 11.75880241394043 26.17624664306641 C 11.90816497802734 26.25475311279297 12.08908271789551 26.24169540405273 12.22556018829346 26.14253616333008 C 12.36203765869141 26.04337692260742 12.43044185638428 25.87530899047852 12.40192794799805 25.70901489257813 L 11.60069465637207 21.03815841674805 L 14.99452018737793 17.73019027709961 C 15.11531257629395 17.61246871948242 15.15883350372314 17.43634033203125 15.10665130615234 17.27590179443359 Z">
            </path>*
        </svg>
        `,
        'none': `<svg class="Path_1_ svg_none" viewBox="0 11.796 15.128 14.431">
            <path id="Path_1_" d="M 15.10665130615234 17.27590179443359 C 15.05453205108643 17.11542510986328 14.91586685180664 16.99847793579102 14.74892520904541 16.97425079345703 L 10.05909633636475 16.29273986816406 L 7.961684226989746 12.04304504394531 C 7.88704776763916 11.89176177978516 7.732958793640137 11.79600048065186 7.564273357391357 11.79600048065186 C 7.395556449890137 11.79600048065186 7.241498470306396 11.89176177978516 7.16683292388916 12.04304504394531 L 5.069331645965576 16.29273986816406 L 0.3795907497406006 16.97425079345703 C 0.2126783281564713 16.99847793579102 0.07395394891500473 17.11542510986328 0.02183260396122932 17.2758674621582 C -0.03031831048429012 17.43634033203125 0.01317525468766689 17.61246871948242 0.133993998169899 17.73021697998047 L 3.527437686920166 21.03815460205078 L 2.726470708847046 25.70907592773438 C 2.697927951812744 25.87537002563477 2.766300439834595 26.04337692260742 2.902779340744019 26.14256286621094 C 2.979986429214478 26.19864654541016 3.07143497467041 26.22718811035156 3.163326740264893 26.22718811035156 C 3.233885526657104 26.22718811035156 3.304681062698364 26.21037673950195 3.369507789611816 26.17627716064453 L 7.564243793487549 23.97093200683594 L 11.75880241394043 26.17624664306641 C 11.90816497802734 26.25475311279297 12.08908271789551 26.24169540405273 12.22556018829346 26.14253616333008 C 12.36203765869141 26.04337692260742 12.43044185638428 25.87530899047852 12.40192794799805 25.70901489257813 L 11.60069465637207 21.03815841674805 L 14.99452018737793 17.73019027709961 C 15.11531257629395 17.61246871948242 15.15883350372314 17.43634033203125 15.10665130615234 17.27590179443359 Z">
            </path>
        </svg>`
    },
    'heart' : {
        'rating': `<svg  viewBox="0 -28 512.00002 512" xmlns="http://www.w3.org/2000/svg"><path d="m471.382812 44.578125c-26.503906-28.746094-62.871093-44.578125-102.410156-44.578125-29.554687 0-56.621094 9.34375-80.449218 27.769531-12.023438 9.300781-22.917969 20.679688-32.523438 33.960938-9.601562-13.277344-20.5-24.660157-32.527344-33.960938-23.824218-18.425781-50.890625-27.769531-80.445312-27.769531-39.539063 0-75.910156 15.832031-102.414063 44.578125-26.1875 28.410156-40.613281 67.222656-40.613281 109.292969 0 43.300781 16.136719 82.9375 50.78125 124.742187 30.992188 37.394531 75.535156 75.355469 127.117188 119.3125 17.613281 15.011719 37.578124 32.027344 58.308593 50.152344 5.476563 4.796875 12.503907 7.4375 19.792969 7.4375 7.285156 0 14.316406-2.640625 19.785156-7.429687 20.730469-18.128907 40.707032-35.152344 58.328125-50.171876 51.574219-43.949218 96.117188-81.90625 127.109375-119.304687 34.644532-41.800781 50.777344-81.4375 50.777344-124.742187 0-42.066407-14.425781-80.878907-40.617188-109.289063zm0 0"/></svg>
        `,
        'none': `<svg class="svg_none" viewBox="0 -28 512.00002 512" xmlns="http://www.w3.org/2000/svg"><path d="m471.382812 44.578125c-26.503906-28.746094-62.871093-44.578125-102.410156-44.578125-29.554687 0-56.621094 9.34375-80.449218 27.769531-12.023438 9.300781-22.917969 20.679688-32.523438 33.960938-9.601562-13.277344-20.5-24.660157-32.527344-33.960938-23.824218-18.425781-50.890625-27.769531-80.445312-27.769531-39.539063 0-75.910156 15.832031-102.414063 44.578125-26.1875 28.410156-40.613281 67.222656-40.613281 109.292969 0 43.300781 16.136719 82.9375 50.78125 124.742187 30.992188 37.394531 75.535156 75.355469 127.117188 119.3125 17.613281 15.011719 37.578124 32.027344 58.308593 50.152344 5.476563 4.796875 12.503907 7.4375 19.792969 7.4375 7.285156 0 14.316406-2.640625 19.785156-7.429687 20.730469-18.128907 40.707032-35.152344 58.328125-50.171876 51.574219-43.949218 96.117188-81.90625 127.109375-119.304687 34.644532-41.800781 50.777344-81.4375 50.777344-124.742187 0-42.066407-14.425781-80.878907-40.617188-109.289063zm0 0"/></svg>`
    },
    'like' : {
        'rating': `<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve"> <g> <g> <path d="M53.333,224C23.936,224,0,247.936,0,277.333V448c0,29.397,23.936,53.333,53.333,53.333h64 c12.011,0,23.061-4.053,32-10.795V224H53.333z"/> </g> </g> <g> <g> <path d="M512,304c0-12.821-5.077-24.768-13.888-33.579c9.963-10.901,15.04-25.515,13.653-40.725 c-2.496-27.115-26.923-48.363-55.637-48.363H324.352c6.528-19.819,16.981-56.149,16.981-85.333c0-46.272-39.317-85.333-64-85.333 c-22.165,0-37.995,12.48-38.677,12.992c-2.517,2.027-3.989,5.099-3.989,8.341v72.341l-61.44,133.099l-2.56,1.301v228.651 C188.032,475.584,210.005,480,224,480h195.819c23.232,0,43.563-15.659,48.341-37.269c2.453-11.115,1.024-22.315-3.861-32.043 c15.765-7.936,26.368-24.171,26.368-42.688c0-7.552-1.728-14.784-5.013-21.333C501.419,338.731,512,322.496,512,304z"/> </g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> </svg>
        `,
        'none': `<svg class="svg_none" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve"> <g> <g> <path d="M53.333,224C23.936,224,0,247.936,0,277.333V448c0,29.397,23.936,53.333,53.333,53.333h64 c12.011,0,23.061-4.053,32-10.795V224H53.333z"/> </g> </g> <g> <g> <path d="M512,304c0-12.821-5.077-24.768-13.888-33.579c9.963-10.901,15.04-25.515,13.653-40.725 c-2.496-27.115-26.923-48.363-55.637-48.363H324.352c6.528-19.819,16.981-56.149,16.981-85.333c0-46.272-39.317-85.333-64-85.333 c-22.165,0-37.995,12.48-38.677,12.992c-2.517,2.027-3.989,5.099-3.989,8.341v72.341l-61.44,133.099l-2.56,1.301v228.651 C188.032,475.584,210.005,480,224,480h195.819c23.232,0,43.563-15.659,48.341-37.269c2.453-11.115,1.024-22.315-3.861-32.043 c15.765-7.936,26.368-24.171,26.368-42.688c0-7.552-1.728-14.784-5.013-21.333C501.419,338.731,512,322.496,512,304z"/> </g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> </svg>`
    },
    'smile' : {
        'rating': `<svg  enable-background="new 0 0 512 512" height="512" viewBox="0 0 512 512" width="512" xmlns="http://www.w3.org/2000/svg"><path d="m256 512c-68.38 0-132.667-26.629-181.02-74.98-48.351-48.353-74.98-112.64-74.98-181.02s26.629-132.667 74.98-181.02c48.353-48.351 112.64-74.98 181.02-74.98s132.667 26.629 181.02 74.98c48.351 48.353 74.98 112.64 74.98 181.02s-26.629 132.667-74.98 181.02c-48.353 48.351-112.64 74.98-181.02 74.98zm0-472c-119.103 0-216 96.897-216 216s96.897 216 216 216 216-96.897 216-216-96.897-216-216-216zm93.737 260.188c-9.319-5.931-21.681-3.184-27.61 6.136-.247.387-25.137 38.737-67.127 38.737s-66.88-38.35-67.127-38.737c-5.93-9.319-18.291-12.066-27.61-6.136s-12.066 18.292-6.136 27.61c1.488 2.338 37.172 57.263 100.873 57.263s99.385-54.924 100.873-57.263c5.93-9.319 3.183-21.68-6.136-27.61zm-181.737-135.188c13.807 0 25 11.193 25 25s-11.193 25-25 25-25-11.193-25-25 11.193-25 25-25zm150 25c0 13.807 11.193 25 25 25s25-11.193 25-25-11.193-25-25-25-25 11.193-25 25z"/></svg>
        `,
        'none': `<svg class="svg_none" enable-background="new 0 0 512 512" height="512" viewBox="0 0 512 512" width="512" xmlns="http://www.w3.org/2000/svg"><path d="m256 512c-68.38 0-132.667-26.629-181.02-74.98-48.351-48.353-74.98-112.64-74.98-181.02s26.629-132.667 74.98-181.02c48.353-48.351 112.64-74.98 181.02-74.98s132.667 26.629 181.02 74.98c48.351 48.353 74.98 112.64 74.98 181.02s-26.629 132.667-74.98 181.02c-48.353 48.351-112.64 74.98-181.02 74.98zm0-472c-119.103 0-216 96.897-216 216s96.897 216 216 216 216-96.897 216-216-96.897-216-216-216zm93.737 260.188c-9.319-5.931-21.681-3.184-27.61 6.136-.247.387-25.137 38.737-67.127 38.737s-66.88-38.35-67.127-38.737c-5.93-9.319-18.291-12.066-27.61-6.136s-12.066 18.292-6.136 27.61c1.488 2.338 37.172 57.263 100.873 57.263s99.385-54.924 100.873-57.263c5.93-9.319 3.183-21.68-6.136-27.61zm-181.737-135.188c13.807 0 25 11.193 25 25s-11.193 25-25 25-25-11.193-25-25 11.193-25 25-25zm150 25c0 13.807 11.193 25 25 25s25-11.193 25-25-11.193-25-25-25-25 11.193-25 25z"/></svg>`
    }
};

function addStyleOnHead() {
    let widthContainer = settingApp.width ? settingApp.width : '1200px';
    let styleConfig = `
        .scm-reviews-rate svg{
            width: 15.128px;
            height: 14.431px;
            fill: ${settingApp.starColor};
        }
        .scm-reviews-rate svg.svg_none{
            fill: #f1f1f1;
        }
        .scm-container{
            background: ${settingApp.reviewBg};
        }
        .scm-reviews-importer{
            max-width: ${widthContainer}
        }
    `;
    var linkElement = this.document.createElement('link');
    linkElement.setAttribute('rel', 'stylesheet');
    linkElement.setAttribute('type', 'text/css');
    linkElement.setAttribute('href', 'data:text/css;charset=UTF-8,' + encodeURIComponent(styleConfig));
    document.querySelector('head').appendChild(linkElement);
  }

  function getElement() {
    var x = document.getElementsByClassName('scm-reviews-rate');
    return [].slice.call(x);
  }

  function actionCreateReviews() {
    let arrayListElement = getElement();
    arrayListElement.forEach(element => {
      let rate = {
        'average': 0,
        'total': 0
      };
      let rateVersion2 = element.getAttribute('data-rate-version2');
      if (rateVersion2 && rateVersion2 != 'null') {
        rateVersion2 = JSON.parse(rateVersion2);
        rate = {
          'average': rateVersion2['average'],
          'total': rateVersion2['total']
        };
      }
      if (rate && rate.average > 0) {
        let blockStar = scmReviewsRate(rate.average);
        blockStar += `<span> (${rate.total}) </span>`;
        element.innerHTML = blockStar;
      }
    });
  }


  function scmReviewsRate(value) {
    let number = Math.floor(value + 0.5);
    let blockStar = '';
    for (let i = 0; i < number; i++) {
        blockStar = blockStar + iconStar[settingApp.starStyle].rating;
    }
    for (let i = number; i < 5; i++) {
        blockStar = blockStar + iconStar[settingApp.starStyle].none;
    }
    return blockStar;
  }

  function parseJson(value) {
    if (value) {
      let valueDecode64 = atob(value);
      return JSON.parse(valueDecode64);
    } else {
      return value;
    }
  }

  function getUrlParameter(sParam) {
    var sPageURL = location.search.substring(1),
      sURLVariables = sPageURL.split('&'),
      sParameterName,
      i;
    for (i = 0; i < sURLVariables.length; i++) {
      sParameterName = sURLVariables[i].split('=');
      if (sParameterName[0] === sParam) {
        return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
      }
    }
  }
    function dispatchEventBeforeScrollToWidgetReviews(){
        const eventClickStar = document.createEvent('Event');
        eventClickStar.initEvent('beforeScrollToReviewWidget', true, true);
        document.dispatchEvent(eventClickStar);
    }
  function scrollWigetReview() {
    let widgetEl = document.querySelector('.scm-container.custom');
    let widget = widgetEl ? widgetEl : document.querySelector('.scm-container');
    if(widget){
        widget.scrollIntoView();
    }
  }

  function onWindowLoad() {
    actionCreateReviews();
    if (getUrlParameter('review') || getUrlParameter('reviews')) {
      setTimeout(function() {
        scrollWigetReview();
      }, 0);

    }
  }

  function constructor() {
    addStyleOnHead();
  }

  function init() {
    constructor();
    actionCreateReviews();
  }

  return {
    init,
    actionCreateReviews,
    onWindowLoad,
    getUrlParameter,
    scrollWigetReview,
    dispatchEventBeforeScrollToWidgetReviews
  };
})();

            SMARTIFYAPPS.rv.startReviewsImporter = SMARTIFYAPPS.rv.startReviewsImporter || function() {
        console.log(SMARTIFYAPPS.rv.performanceNow() + 'smart aliexpress reviews app starting...');
                    function startReviewImporter() {
  document.querySelectorAll('a[href="#scm-reviews-importer"]').forEach(item => {
    item.addEventListener('click', event => {
        SMARTIFYAPPS.rv.scmReviewsRate.dispatchEventBeforeScrollToWidgetReviews();
        setTimeout(function(){
            SMARTIFYAPPS.rv.scmReviewsRate.scrollWigetReview();
        }, 10);
    })
  });
  document.addEventListener("click", function(e){
    let elementClicked= e.target.className;
    if(elementClicked=="scm-popup-before"){
        closePopup();
    }
  });
  const remove = function (e) {
    e.stopPropagation();
    closePopup();
  };
  window.onload = function(){

  };

      function closePopup() {
            var scmpopupContainer = document.getElementById("scm-review-importer-popup");
            scmpopupContainer.classList.remove('show-popup');
            document.getElementById('scm-review-importer-popup').style.display= "none";
            var scmpopupContainerWrite = document.getElementById("scm-review-importer-popup-write-review");
            scmpopupContainerWrite.classList.remove('show-popup');
            document.getElementById('scm-review-importer-popup-write-review').style.display= "none";
      }
    function createIframePopup(htmlPopup){
        var scmpopupContainer = document.getElementById("scm-review-importer-popup");
        scmpopupContainer.classList.add('show-popup');
        var iframeDocument = document.querySelector('#scm-review-importer-popup-iframe').contentWindow.document;
        document.getElementById('scm-review-importer-popup').style.display= "block";
        iframeDocument.open('text/html', 'replace');
        if((typeof htmlPopup == "undefined" || htmlPopup == null)){
        }else{
            iframeDocument.write(htmlPopup);
        }
        iframeDocument.close();
    }
    function createPopup(data) {
        let htmlPopup= createPopupHtml(data.content,data.photos);
        createIframePopup(htmlPopup);
    }
    function createIframePopupWriteReviews(htmlPopup){
        var scmpopupContainer = document.getElementById("scm-review-importer-popup-write-review");
        if(scmpopupContainer.classList.contains('loaded')){
            document.getElementById('scm-review-importer-popup-write-review').style.display= "block";
            scmpopupContainer.classList.add('show-popup');
        }else{
            scmpopupContainer.classList.add('show-popup');
            scmpopupContainer.classList.add('loaded');
            var iframeDocument = document.querySelector('#scm-review-importer-popup-write-review-iframe').contentWindow.document;
            document.getElementById('scm-review-importer-popup-write-review').style.display= "block";
            iframeDocument.open('text/html', 'replace');
            iframeDocument.write(htmlPopup);
            iframeDocument.close();
        }
    }

    function createPopupWriteReview(data){
        let htmlPopup= writeReviews(data);
        createIframePopupWriteReviews(htmlPopup);
    }

  function changeHeightIframe(height) {
    const elFrame = document.querySelector(".custom #scm-reviews-importer-iframe");
    const frame = elFrame ? elFrame : document.querySelector(".scm-reviews-importer-iframe");
    frame.height = height + "px";
    frame.parentNode.style.height = height + 'px';
  }

  function receiveMessage(event) {
    if (event.data.type === 'createPopup') {
        createPopup(event.data);
    }
    else if (event.data.type === 'createPopupWriteReviews') {
        createPopupWriteReview(event.data);
    }
    else if (event.data === 'removePopup') {
        closePopup();
    } else if (event.data.type === 'changeHeight') {
        changeHeightIframe(event.data.height);
    }
  }

    window.addEventListener('message', receiveMessage, false);
    const elRoot = document.querySelector('.custom #scm-reviews-importer');
    const root= elRoot ? elRoot : document.querySelector('.scm-reviews-importer');
      if(root){
            let iframeEl = document.querySelector('.custom #scm-reviews-importer-iframe');
            let iframeRoot= iframeEl ? iframeEl : document.querySelector('.scm-reviews-importer-iframe');
            let iframeDocument=  iframeRoot.contentWindow.document;
            iframeDocument.open('text/html', 'replace');
            if((typeof htmlIframe == "undefined" || htmlIframe == null)){
            }else{
                iframeDocument.write(htmlIframe);
            }
          iframeDocument.close();
      }
}

startReviewImporter();
                        SMARTIFYAPPS.rv.scmReviewsRate.init();
                window.onload = (event) => {
                    SMARTIFYAPPS.rv.scmReviewsRate.onWindowLoad();
                };
                    let rootElFrame= document.querySelector(".scm-container.custom");
            let rootFrame= rootElFrame ? rootElFrame : document.querySelector(".scm-container");
            if(rootFrame){
                rootFrame.style.display= "";
            }
            }; // end of SMARTIFYAPPS.rv.startReviewsImporters

    console.log(SMARTIFYAPPS.rv.performanceNow() + 'smart aliexpress reviews script loaded');
    SMARTIFYAPPS.rv.startReviewsImporter();
} else {
    console.log(SMARTIFYAPPS.rv.performanceNow() + 'skip');
}
