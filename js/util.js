var http = require('http');
var https = require('https');
var util = {
  get:function(h, p, safe, callback){
    if (safe) {
      prot = https;
    } else {
      prot = http;
    }
      
    var dataChunks = "";
    var options = {
      host: h, 
      path: p
    };
    prot.get(options, 
      function(r) { 
        util.process(r,dataChunks, callback);
    }).on('error', 
      function(e) { 
        console.log("Got error: " + e.message); 
    });
  },
  post:function(post_domain, post_port, post_path, data, callback){
    var dataChunks = "";
    post_options = { 
      host: post_domain, 
      port: post_port, 
      path: post_path, 
      method: 'POST', 
      headers: { 
        'Content-Type': 'application/x-www-form-urlencoded', 
        'Content-Length': data.length 
      } 
    }; 
    post_req = http.request(post_options, function(re) {
      util.process(re,dataChunks, callback);
    }); 
    post_req.write(data); 
    post_req.end();
  },
  process:function(res,dataChunks, callback) {
    res.on('data', function(chunk){
      dataChunks += chunk.toString('ascii');
    });
    res.on('end', function(){
      callback(dataChunks)
    });
  },
};
util.get("10.22.35.24","/mouse.rightclick?x=-1&y=-1",false,function(data){console.log(data)});
exports.util = util;
