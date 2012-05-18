(function() {

  function isHTML(source) {
    
    if (1 === source.getElementsByTagName('html').length) {
      return true;
    } else {
      return false;
    }
    
  }

  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  

  function getNames() {
    
    var scripts = document.getElementsByTagName('script'),
        name = "",
        names = [];

    for (var i=0; i < scripts.length; i++) {
      if (scripts !== undefined && 'getAttribute' in scripts[i]) {
        if ("text/javascript" === scripts[i].getAttribute("type")) {
          if (name = scripts[i].getAttribute("src")) {
            name = name.substr(name.lastIndexOf("/") + 1);
            names.push(name);
          } else {
            names.push(null);
          }
        }
      }
    }
    
    return names;
    
  }

  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  

  function check_namespaces(namespaces) {
    
    var result = [];
    var ns;
    
    for (var i = 0; i < namespaces.length; i++) {
      if (window[namespaces[i]]) {
        ns = window[namespaces[i]];
        if ("object" === typeof ns || "function" === typeof ns) {
          result.push(namespaces[i]);
        }
      }
    }
    
    return result;
    
  }

  ///////////////////////////////////////////////////////////////////

  if (isHTML(document)) {
    
    var xmlhttp = new XMLHttpRequest(),
        url = SERVER_URL;
    
    var namespaces = [
      
      "jQuery",
      "_",
      "Backbone",
      "Raphael",
      "requirejs",
      "ace",
      "angular",
      "Benchmark",
      "Caman",
      "CFInstall",
      "CoffeeScript",
      "Cufon",
      "d3",
      "Davis",
      "DD_belatedPNG",
      "dojo",
      "Ember",
      "Ext",
      "Flexie",
      "Galleria",
      "handlebars",
      "head",
      "Highcharts",
      "Hogan",
      "html5",
      "StateMachine",
      "signals",
      "jo",
      "JSON",
      "JXG",
      "Kerning",
      "ko",
      "$LAB",
      "less",
      "mobilize",
      "Modernizr",
      "Mustache",
      "MooTools",
      "oCanvas",
      "OpenAjax",
      "OpenLayers",
      "Markdown",
      "paper",
      "prettyPrint",
      "Processing",
      "PUBNUB",
      "Prototype",
      "respond",
      "RetinaImage",
      "Sammy",
      "$script",
      "Sizzle",
      "SockJS",
      "Spine",
      "store",
      "swfobject",
      "THREE",
      "twitterlib",
      "Visibility",
      "WebFont",
      "xui",
      "yepnope",
      "YUI",
      "Zepto"
      
    ];
    
    var pack = {
      
      "id" : ID,
      "u" : b64_md5(document.URL),                   // url hash
      "d" : b64_md5(window.location.hostname),       // domain hash
      "i" : window.top ? false : true,               // iframe
      "n" : getNames(),                              // names
      "ns" : check_namespaces(namespaces)            // namespaces
      
    };

//// development ////////////////////////////////////////////////////
//
//   xmlhttp.onreadystatechange = function() {
//     if(4 === xmlhttp.readyState) {
//       console.log(xmlhttp.responseText);
//     }
//   };
//
/////////////////////////////////////////////////////////////////////

    url += '?pass=' + SERVER_PASSWORD + '&json=' + encodeURIComponent(JSON.stringify(pack));

    xmlhttp.open('GET', url, true);
    xmlhttp.send(null);
  
  }

})();
