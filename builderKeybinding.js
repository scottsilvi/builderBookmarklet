javascript: void function() {

	var createMouseTrapScript = function (doc) {
		var tmp = doc.createElement('script');
		tmp.setAttribute('src', 'https://cdnjs.cloudflare.com/ajax/libs/mousetrap/1.4.6/mousetrap.js');

		doc.body.appendChild(tmp);
	};

	var createChildBindingScript = function (doc) {

		doc.body.appendChild(tmp);
	}

	var styleArr = [],
	head = document.head || document.getElementsByTagName('head')[0],
    style = document.createElement('style');

	style.type = 'text/css';

	styleArr.push('.currentInteractiveElement { background-color: #F1B9BA !important; }');         

	if (style.styleSheet){
	  style.styleSheet.cssText = styleArr.join('');
	} else {
	  style.appendChild(document.createTextNode(styleArr.join('')));
	}

	head.appendChild(style);

	createMouseTrapScript(document);
	

	var currentElement, tmpElement;

	setTimeout(function () {

		var editorWindow = $('iframe.ui-frame').contents();

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
			var elemID = editorWindow.find('#'+elem),
				dataLeadID = editorWindow.find('[data-lead-id="'+elem+'"'),
				el = elemID.length ? elemID : dataLeadID;

			if(el.length){
				editorWindow.find('body,html').animate({
					scrollTop: el.offset().top-50
				});
			}
		};

		Mousetrap.bind('ctrl+shift+i', function (e) {

			var modalHTML = [
					'<div id="shortcuts" class="modal fade in" tabindex="-1" role="dialog" aria-labelledby="shortCutsLabel" aria-hidden="true">',
					'<div class="modal-dialog"><div class="modal-content">',
	      			'<div class="modal-body">',
	      			'<div class="container-fluid"><div class="row">',
	      			'<div class="col-sm-4 col-md-4">',
	      			'<h5>&lt;?&gt;</h5><p>Keyboard shortcuts<p>',
	      			'<h5>&lt;Up / Down&gt;</h5><p>Move up or down</p>',
	      			'<h5>&lt;Left / Right&gt;</h5><p>Collapse / Expand</p>',
	      			'<h5>&lt;Enter&gt;</h5><p>If focus on container element will expand/collapse, scroll to element, and open up editing mode for images, links, videos',
	      			'</div><div class="col-sm-4 col-md-4">',
	      			'<h5>&lt;Shift+Enter&gt;</h5><p>Enter inline editing mode for <b>Text</b> element',
	      			'<h5>&lt;Esc&gt;</h5><p>Dismiss editor modals (excepted LeadBox) and refocus to sidebar if in Text editing mode</p>',
	      			'<h5>&lt;Ctrl+Shift+C&gt;</h5><p>Collapse all</p>',
	      			'<h5>&lt;Ctrl+1&gt; / &lt;Ctrl+2&gt; / &lt;Ctrl+3&gt;</h5><p>Responsive / Tablet / Phone viewing mode</p>',
	      			'</div><div class="col-sm-4 col-md-4">',
	      			'<h5>&lt;Ctrl+s&gt;</h5><p>Save page</p>',
	      			'<h5>&lt;Ctrl+p&gt;</h5><p>Publish (mostly show the publish options)</p>',
	      			'<h5>&lt;Ctrl+x&gt;</h5><p>Switch between Content and Styles editing modes</p>',
	      			'</div>',
	      			'</div></div>',
	      			'</div></div></div></div></div>'
	      		]

      		$('body').append(modalHTML.join(''));
      		$('#shortcuts').modal('show');

      		//BUG: This will replace the previously injected Mousetrap.js
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
				var dataID = currentElement.closest('li').data('editable-id');

				if($('.modal.fade.in').is(':visible')){
					return false;
				} else {
					currentElement.find('.title').trigger('click');
				}

				scrollToElement( dataID );
			});

			//Enter text editing mode
			Mousetrap.bind('shift+enter', function (e) {
				var isTextElement = currentElement.find('.fa-font'),
					dataID = currentElement.closest('li').data('editable-id');

				dataID = editorWindow.find('#'+dataID).length ? editorWindow.find('#'+dataID) : editorWindow.find('[data-lead-id="'+dataID+'"');
				

				if(isTextElement.length){
					App.viewport.showTextEditor(dataID[0], true);
					console.log()
				}
			});

			//Re-focus on sidebar
			createMouseTrapScript(editorWindow[0]);
      		setTimeout(function () {
      			var mt = $('iframe.ui-frame')[0].contentWindow.Mousetrap;
      			mt.stopCallback = function () {};
	      		mt.bind('esc', function (e) {
	      			parent.focus();
	      		});	
      		}, 2000);

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
			});

			//Switch between Content / Styles tabs
			Mousetrap.bind('ctrl+x', function () {
				var editingTab = $('#list-content').is(':visible') ? "styles" : "content";

				$('.editable-settings').find('[data-flags="'+editingTab+'"]').trigger('click');
				
			});

			Mousetrap.bind('shift+/', function(){
      			if($('#shortcuts').length){
      				$('#shortcuts').modal('show');
      			}
			});


      		createMouseTrapScript(editorWindow[0]);

      		setTimeout(function () {
      			var mt = $('iframe.ui-frame')[0].contentWindow.Mousetrap;
      			mt.stopCallback = function () {};
	      		mt.bind('ctrl+shift+i', function (e) {
	      			parent.focus();
	      		});	
      		}, 2000)

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
