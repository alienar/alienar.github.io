/*
jQuery Image upload
Images can be uploaded using:
* File requester (Double click on box)
* Drag&Drop (Drag and drop image on box)
* Pasting. (Copy an image or make a screenshot, then activate the page and paste in the image.)

Works in Mozilla, Webkit & IE.
*/

jQuery(document).ready(function($) {
	
	// Shared callback handler for processing output
	var outputHandlerFunc = function(imgObj) {

		var sizeInKB = function(bytes) {return (typeof bytes == 'number') ? (bytes/1024).toFixed(2) + 'Kb' : bytes;};

		var getThumbnail = function(original, maxWidth, maxHeight, upscale) {
			var canvas = document.createElement("canvas"), width, height;
			if (original.width<maxWidth && original.height<maxHeight && upscale == undefined) {
				width = original.width;
				height = original.height;
			}
			else {
				width = maxWidth;
				height = parseInt(original.height*(maxWidth/original.width));
				if (height>maxHeight) {
					height = maxHeight;
					width = parseInt(original.width*(maxHeight/original.height));
				}
			}
			canvas.width = width;
			canvas.height = height;
			canvas.getContext("2d").drawImage(original, 0, 0, width, height);
			$(canvas).attr('title','Original size: ' + original.width + 'x' + original.height);
			return canvas;
		}



		$(new Image()).on('load', function(e) {
			 console.log('imgobj',e)
			var $wrapper = $('<li class="new-item"><div class="list-content"><span class="preview"></span><span class="type">' + imgObj.type + '<br>' + (e.target.width + '&times;' + e.target.height) + '<br>' + sizeInKB(imgObj.size) + '</span><span class="name">' + imgObj.name +'</span><span class="options"><span class="imagedelete" title="Remove image"></span></span></div></li>').appendTo('#output ul');
			$('.imagedelete',$wrapper).one('click',function(e) {
				$wrapper.toggleClass('new-item').addClass('removed-item');
				$wrapper.one('animationend webkitAnimationEnd MSAnimationEnd oAnimationEnd', function(e) {
			   		$wrapper.remove();
			   	});
			});

			var thumb = getThumbnail(e.target,50,50);
			var $link = $('<a rel="fancybox">').attr({
				target:"_blank",
				href: imgObj.imgSrc
			}).append(thumb).appendTo($('.preview', $wrapper));

		}).attr('src',imgObj.imgSrc);

	}

	$("a[rel=fancybox]").fancybox();

    var fileReaderAvailable = (typeof FileReader !== "undefined");
    var clipBoardAvailable = (window.clipboardData !== false);
    var pasteAvailable = Boolean(clipBoardAvailable & fileReaderAvailable & !eval('/*@cc_on !@*/false'));

	if (fileReaderAvailable) {

		// Enable drop area upload
		$('#dropzone').imageUpload({
			errorContainer: $('span','#errormessages'),
			trigger: 'dblclick',
			enableCliboardCapture: pasteAvailable,
			onBeforeUpload: function() {$('body').css('background-color','green');console.log('start',Date.now());},
			onAfterUpload: function() {$('body').css('background-color','#eee');console.log('end',Date.now());},
			outputHandler:outputHandlerFunc
		})

		$('#dropzone').prev('#textbox-wrapper').find('#textbox').append('<p class="large">Drag and Drop<br>Image File here</p><p class="small">Doubleclick<br>for file requester</p>');
	}
	else {
		$('body').addClass('nofilereader');
	}

	if (!pasteAvailable) {
		$('body').addClass('nopaste');
	}

});