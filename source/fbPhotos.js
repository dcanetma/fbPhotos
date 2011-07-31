 $.fn.fbPhotos = function(album, limit) {

     function base_append(obj) {
         $(base).append(obj);
     }

     function getPhoto(obj) {
    
         var id = obj.iad;
         var img = obj.img;
         var link = obj.link;

         var wrap = $('<div></div>').attr({
                 'class' : 'fb-photo',
                 'id' : id
             });


         var avatar = new Image();
             avatar.src = img;

         var _avatar = $('<a></a>')
             .attr('href', link)
             .attr('target', '_blank')
             .attr('class', 'avatar')
             .html(avatar);

         $(wrap).append($(_avatar));
         return wrap;

     }
     function init() {
        fetch();
     }

     function fetch() {
         var r;
         var data = {};
         $.ajax({
             url: 'https://graph.facebook.com/' + albumId + '/photos?limit='+topLimit,
             type : 'GET',
             dataType : 'jsonp',
             data : data,
             success: function(obj) {   
                 if (obj.error) {
                	// @todo: do something like append an error message or an error image
	                 /*  var img = new Image();
	                     img.src = '/images/fail.png';
	                     wipe(img); */
                     return false;
                 } else {
                         // loop de data
                        var results = {};
                        for (var k = 0; k < obj.data.length; k++) {
                                if (obj.data[k].images) {
                                        results[k] =  {
                                            'id' : obj.data[k].id,
                                            'img': obj.data[k].images[2].source,
                                            'link': obj.data[k].link
                                        };
                                }
                                    
                            
                                
                         }

                         k = 0;
                        for (var key in results) { 
                             base_append(getPhoto(results[key]));
                             k++;
                             if (k >= topLimit) {   
                                 break;
                             }
                            
                        }


                     return true;
                 }
             },
             error : function (obj) {
                // @todo: do something like append an error message or an error image
                 /*  var img = new Image();
                     img.src = '/images/fail.png';
                     wipe(img); */
                 return false;
             }
         });



     }

     if ($(this).size() > 0) {
         var base = $(this);
         var topLimit = (limit ? limit : 15);
         var albumId = (album ? album : ($(this).attr("fbAlbum") ? $(this).attr("fbAlbum") : '0'));
         
         init();
     }

 };
 
