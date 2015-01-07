javascript: void function() {
	var jsCode = document.createElement('script'), styleArr = [],
	head = document.head || document.getElementsByTagName('head')[0],
    style = document.createElement('style');

	style.type = 'text/css';
	jsCode.setAttribute('src', 'https://cdnjs.cloudflare.com/ajax/libs/mousetrap/1.4.6/mousetrap.js');

	styleArr.push('.currentInteractiveElement { background-color: #F1B9BA !important; }');         

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

		var setCurrentElement = function (temp) {
			if (temp.length) {
				currentElement = temp;
			}
		};

		var scrollToElement = function (elem) {
			var editorWindow = $('iframe.ui-frame').contents(),
				el = editorWindow.find('[data-lead-id="'+elem+'"');

			if(el.length){
				editorWindow.find('body,html').animate({
					scrollTop: el.offset().top-50
				});
			}
		};

		Mousetrap.bind('ctrl+shift+i', function (e) {
			Mousetrap.reset();
			// collapse all
			$('.expand.fa-minus-square').trigger('click');

			currentElement = $('.list-group-item').eq(0);
			toggleInteractiveClass(currentElement, true);

			//Collapse All
			Mousetrap.bind('ctrl+shift+c', function(){
				toggleInteractiveClass(currentElement, false);
				$('.expand.fa-minus-square').trigger('click');
				currentElement = $('.list-group-item').eq(0);
				toggleInteractiveClass(currentElement, true);
			});
			
			Mousetrap.bind('up', function (e) {
				toggleInteractiveClass(currentElement, false);
				tmpElement = currentElement.prevAll(':visible:first');
				setCurrentElement(tmpElement);
				toggleInteractiveClass(currentElement, true);
			});
			
			Mousetrap.bind('down', function (e) {
				toggleInteractiveClass(currentElement, false);
				tmpElement = currentElement.nextAll(':visible:first');
				setCurrentElement(tmpElement);
				toggleInteractiveClass(currentElement, true);
			});
			
			Mousetrap.bind('left', function (e) {
				toggleInteractiveClass(currentElement, false);
				tmpElement = 
					currentElement
						.prevAll()
							.find('.icon .expand.fa-minus-square')
							.last()
							.trigger('click')
						.closest('.list-group-item');

				setCurrentElement(tmpElement);
				toggleInteractiveClass(currentElement, true);
			});
			
			Mousetrap.bind('space', function (e) {
			 	var eye = currentElement.find('.glyphicon-eye-open');

			 	eye = eye.length ? '.glyphicon-eye-open' : '.glyphicon-eye-close';

				currentElement.find(eye).trigger('click');
			});
			
			Mousetrap.bind('right', function (e) {
				toggleInteractiveClass(currentElement, false);
				currentElement.find('.icon .expand.fa-plus-square').trigger('click');
				toggleInteractiveClass(currentElement, true);
			});

			Mousetrap.bind('enter', function (e) {
				var isTextElement = currentElement.find('.fa-font'),
					dataID = currentElement.closest('li').data('editable-id'),
					editorWindow = $('iframe.ui-frame').contents();

				if($('.modal.fade.in').is(':visible')){
					return false;
				} else {
					currentElement.find('.title').trigger('click');
				}

				scrollToElement( dataID );
			});

			Mousetrap.bind('esc', function (e) {
				var modal = $('.modal.fade.in');

				if(modal.is(':visible')){
					modal.find('.btn-primary').trigger('click');
				}
			});

			Mousetrap.bind('ctrl+1', function (e) {
				$('#view-desktop').trigger('click');
			});

			Mousetrap.bind('ctrl+2', function (e) {
				$('#view-tablet').trigger('click');
			});

			Mousetrap.bind('ctrl+3', function (e) {
				$('#view-phone').trigger('click');
			});

			$('a.title').click(function(){
				toggleInteractiveClass( currentElement, false );
				scrollToElement( $(this).closest('li').data('editable-id') );
				currentElement = $(this).closest('li');
				toggleInteractiveClass( currentElement, true );
			});

			return false;
		});

	}, 2000);

}();
