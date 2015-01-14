# LeadPages&trade; Builder Bookmarklet

This Bookmarklet exposes keybinding functionality for manipulating the builder. It utilizes [Mousetrap](http://craig.is/killing/mice) for the bindings. 

## Installation

Since Github doesn't support embedded bookmarklets, bookmark this page, then edit the bookmark, giving it a name of **Builder Keybinder**, and a URL of the following:
 
```javascript
javascript:(function(){var el=document.createElement('script');el.src='https://rawgit.com/scottsilvi/builderBookmarklet/master/builderKeybinding.js';document.body.appendChild(el);})();
```

## Usage

1. To enter interactive mode, simply type `ctrl + shift + i`
2. The builder menu items will automatically collapse
3. Use the arrow keys to [navigate the builder](#navigation)
4. Use the spacebar to hide / show elements

## Navigation

> Up

The up arrow will navigate up the builder element list

> Down

The down arrow will navigate down the builder element list

> Left or Enter (on parent)

The left arrow will collapse a container

> Right or Enter (on parent)

The right arrow will expand a container

> Enter

1. If focus is on a container element, will expand / collapse. 
2. If focus is on an editable element, will launch editor for element (image editor for images / shift+enter for inline text editor for text, etc)

> Shift+Enter

Enter inline text editing mode

> Ctrl+shift+c

Collapse all

> Esc

Will close any modal that is currently opened and close out editing mode.

> Ctrl+1

Responsive (Desktop) Viewing Mode

> Ctrl+2

Tablet Viewing Mode

> Ctrl+3

Phone Viewing Mode

> Ctrl+s

Save page

> Ctrl+p

Publish page

> Ctrl+x

Switch between Content and Styles editing modes

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D
