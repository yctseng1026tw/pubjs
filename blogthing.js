function genlist(url,r,tag){
	$.getJSON(url, function (data){
		var entrys=data["feed"]["entry"];
		for(var i=0;i<entrys.length;i++){
			var val=entrys[i]["content"]["$t"];
			var a2=val.split("<>");
			var li=$("<"+tag+"></"+tag+">");
			if(a2.length>1){
				var qrtag='(goo)';
				if(a2[0].indexOf(qrtag)>-1){
					 $.getJSON(a2[1], function (data){
						var url2=data["feed"]["entry"][0]["content"]["$t"];
						var li=$("<li></li>");
						li.append($("<a href='"+url2+"' target='_blank'>"+a2[0].replace(qrtag,'')+"</a>"));
						var divqr=$("<div>");
						divqr.appendTo(li);
						divqr.qrcode({width: 64,height: 64,text : url2});
						r.append(li);
					});
				}else{
					li.append($("<a href='"+a2[1]+"' target='_blank'>"+a2[0]+"</a>"));
					r.append(li);
				}
			}else{
				li=$("<"+tag+">"+val+"</"+tag+">");
				r.append(li);
			}			
		}
	});
  }
