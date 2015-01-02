javascript: void
function() {
	var jsCode = document.createElement('script'), styleArr = [],
	head = document.head || document.getElementsByTagName('head')[0],
    style = document.createElement('style');

	style.type = 'text/css';
	jsCode.setAttribute('src', 'https://cdnjs.cloudflare.com/ajax/libs/mousetrap/1.4.6/mousetrap.js');

	styleArr.push('.currentInteractiveElement { border: 3px solid red !important; }');           

	if (style.styleSheet){
	  style.styleSheet.cssText = styleArr.join('');
	} else {
	  style.appendChild(document.createTextNode(styleArr.join('')));
	}

	head.appendChild(style);
	document.body.appendChild(jsCode);

	var currentElement, tmpElement;

	setTimeout(function () {

		var toggleInteractiveClass = function (elem, toggle) {
			elem.toggleClass('currentInteractiveElement', toggle);
		};

		var setCurrentElement = function (current, temp) {
			if (temp.length) {
				current = temp;
			}
		};

		Mousetrap.bind('ctrl+shift+i', function (e) {
			Mousetrap.reset();
			// collapse all
			$('.expand.fa-minus-square').trigger('click');

			currentElement = $('.list-group-item').eq(0);
			toggleInteractiveClass(true);
			
			Mousetrap.bind('up', function (e) {
				toggleInteractiveClass(false);
				tmpElement = currentElement.prevAll(':visible:first');
				setCurrentElement(currentElement, tmpElement);
				toggleInteractiveClass(true);
			});
			
			Mousetrap.bind('down', function (e) {
				toggleInteractiveClass(false);
				tmpElement = currentElement.nextAll(':visible:first');
				setCurrentElement(currentElement, tmpElement);
				toggleInteractiveClass(true);
			});
			
			Mousetrap.bind('left', function (e) {
				toggleInteractiveClass(false);
				tmpElement = 
					currentElement
						.prevAll()
							.find('.icon .expand.fa-minus-square')
							.last()
							.trigger('click')
						.closest('.list-group-item');
				toggleInteractiveClass(true);

				setCurrentElement(currentElement, tmpElement);
			});
			
			Mousetrap.bind('space', function (e) {
			 	eye = currentElement.find('.controls .glyphicon-eye-open');
			 	if (eye.length) {
					currentElement.find('.controls .glyphicon-eye-open').trigger('click');
			 	} else {
					currentElement.find('.controls .glyphicon-eye-close').trigger('click');
			 	}
			});
			
			Mousetrap.bind('right', function (e) {
				toggleInteractiveClass(false);
				currentElement.find('.icon .expand.fa-plus-square').trigger('click');
				toggleInteractiveClass(true);
			});

			return false;
		});
		// Mousetrap.bind('ctrl+shift+h', function (e) {
		// 	$('#editable-elements .list-group-item:not(:has(.indent)) .controls .glyphicon-eye-open').each(function (idx) {
		// 		console.log('idx: ', 500 * idx);
		// 		setTimeout(function () {
		// 			$(this).trigger('click');
		// 		}, 2000 * idx);
		// 	});
		// 	return false;
		// });
		// Mousetrap.bind('ctrl+shift+s', function (e) {
		// 	$('#editable-elements .list-group-item:not(:has(.indent)) .controls .glyphicon-eye-close').each(function (idx) {

		// 		$(this).trigger('click');
		// 	});
		// 	return false;
		// });
		// Mousetrap.bind('ctrl+shift+e', function (e) {
		// 	$('.list-group-item .icon .expand.fa-plus-square').trigger('click');
		// 	console.log('clicking plus');
		// 	return false;
		// });
	}, 2000);

}();
