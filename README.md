# LeadPages&trade; Builder Bookmarklet

This Bookmarklet exposes keybinding functionality for manipulating the builder. It utilizes [Mousetrap](http://craig.is/killing/mice) for the bindings. 

## Installation

Just add the bookmarklet below to your bookmarks bar: 
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

Will open up the editor of the element. Currently only works for non Text elements. Hitting Enter on Text elements will only highlight it. 

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D
