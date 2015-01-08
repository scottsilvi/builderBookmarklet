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

		/**
		 * Toggle highlight on the current element
		 * @param elem {Object} jQuery object, DOM element
		 * @param toggle {Boolean} Toggle highlight on / off
		 */
		var toggleInteractiveClass = function (elem, toggle) {
			elem.toggleClass('currentInteractiveElement', toggle);
		};

		/**
		 * Set a temp object to the currentObject
		 * @param temp {Object} jQuery object, DOM element
		 */
		var setCurrentElement = function (temp) {
			if (temp.length) {
				currentElement = temp;
			}
		};

		/**
		 * Scroll to an element
		 * @param elem {String} Either an id or data-lead-id
		 */
		var scrollToElement = function (elem) {
			var editorWindow = $('iframe.ui-frame').contents(),
				elemID = editorWindow.find('#'+elem),
				dataLeadId = editorWindow.find('[data-lead-id="'+elem+'"'),
				el = elemID.length ? elemID : dataLeadID;

			if(el.length){
				editorWindow.find('body,html').animate({
					scrollTop: el.offset().top-50
				});
			}
		};

		Mousetrap.bind('ctrl+shift+i', function (e) {
			Mousetrap.reset();

			// collapse all on initial Mousetrap binding
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
			
			//Move up one element
			Mousetrap.bind('up', function (e) {
				toggleInteractiveClass(currentElement, false);
				tmpElement = currentElement.prevAll(':visible:first');
				setCurrentElement(tmpElement);
				toggleInteractiveClass(currentElement, true);
			});
			
			//Move down one element
			Mousetrap.bind('down', function (e) {
				toggleInteractiveClass(currentElement, false);
				tmpElement = currentElement.nextAll(':visible:first');
				setCurrentElement(tmpElement);
				toggleInteractiveClass(currentElement, true);
			});
			
			//Collapse current level back to parent
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
			
			//Hide/show
			Mousetrap.bind('space', function (e) {
			 	var eye = currentElement.find('.glyphicon-eye-open');
			 	eye = eye.length ? 'open' : 'close';
				currentElement.find('.glyphicon-eye-'+eye).trigger('click');
			});
			
			//Expand
			Mousetrap.bind('right', function (e) {
				toggleInteractiveClass(currentElement, false);
				currentElement.find('.icon .expand.fa-plus-square').trigger('click');
				toggleInteractiveClass(currentElement, true);
			});

			//Expands/Collapse parent + scroll to element + opens up editor/modal
			Mousetrap.bind('enter', function (e) {
				var isTextElement = currentElement.find('.fa-font'),
					dataID = currentElement.closest('li').data('editable-id'),
					editorWindow = $('iframe.ui-frame').contents();

				if($('.modal.fade.in').is(':visible')){
					return false;
				} else if(isTextElement.length){
					App.viewport.showTextEditor(editorWindow.find('[data-lead-id="'+dataID+'"')[0], true);
				} else {
					currentElement.find('.title').trigger('click');
				}

				scrollToElement( dataID );
			});

			//Close modals
			Mousetrap.bind('esc', function (e) {
				var modal = $('.modal.fade.in'),
					doneButton = modal.find('.btn-primary') || modal.find('iframe').contents().find('.btn-primary');

				if(modal.is(':visible')){
					doneButton.trigger('click');
				}

			});

			//Desktop View Mode
			Mousetrap.bind('ctrl+1', function (e) {
				$('[data-action="view-desktop"]').trigger('click');
				App.viewport.previewDesktop();
			});

			//Tablet View Mode
			Mousetrap.bind('ctrl+2', function (e) {
				$('[data-action="view-tablet"]').trigger('click');
				App.viewport.previewTablet();
			});

			//Phone View Mode
			Mousetrap.bind('ctrl+3', function (e) {
				$('[data-action="view-mobile"]').trigger('click');
				App.viewport.previewMobile();
			});

			//Save
			Mousetrap.bind('ctrl+s', function (e) {
				App.viewport.savePage();
			});

			//Publish
			Mousetrap.bind('ctrl+p', function (e) {
				App.viewport.showPublishMenu();
			})

			//When click on link it will also scroll to the element
			$('a.title').click(function(){
				toggleInteractiveClass( currentElement, false );
				scrollToElement( $(this).closest('li').data('editable-id') );
				setCurrentElement($(this).closest('li'));
				toggleInteractiveClass( currentElement, true );
			});

			return false;
		});

	}, 2000);

}();
