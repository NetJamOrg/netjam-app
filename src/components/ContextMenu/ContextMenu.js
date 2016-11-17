import React, {Component} from 'react';

import common from 'common';

import './ContextMenu.scss';

let clipMenuDiv;

export default class ContextMenu extends Component {
  addMenu(x, y, clipDiv) {
    if(!this.menu) return;
    this.menu.style.left = common.numToPx(x);
    this.menu.style.top = common.numToPx(y);
    this.menu.dataset.clipId = common.getClipId(clipDiv);
    this.menu.dataset.track = clipDiv.dataset.track;
    this.menu.style.display = 'flex';
  }

  componentDidMount() {
    clipMenuDiv = document.getElementById('clip-contextmenu');
    window.addEventListener('mousedown', this.onMouseDown.bind(this), false);
    window.addEventListener('contextmenu', this.onContextMenu.bind(this), false);
  }

  componentWillUnmount() {
    window.removeEventListener('mousedown', this.onMouseDown.bind(this), false);
    window.removeEventListener('contextmenu', this.onContextMenu.bind(this), false);
  }

  onMouseDown(e) {
    // hide the clip context menu if a clip menu item wasnt pressed
    // the menu will be hidden in the onclick function otherwise the onclick
    // doesnt get triggered
    if (e.srcElement.className !== 'contextmenu-item') {
      if (clipMenuDiv.style.display !== 'none') clipMenuDiv.style.display = 'none';
    }
  }

  onContextMenu(e) {
    const clipId = common.getClipId(e.srcElement);
    if (clipId && common.hasClass(e.srcElement, this.props.stickToClass)) {
      e.preventDefault();
      this.addMenu(e.clientX, e.clientY, e.srcElement);
    }
  }

  render() {
    return (
      <div id={ this.props.menuId } ref={ (menu) => this.menu = menu } className="contextmenu">{ createButtons(this.props) } </div>
    );
  }
}

/* Presentational Functions */
function createButtons(props) {
  return props.menuItems.map((menuItem) => {
    return (
      <button
        className="contextmenu-item"
        key={ menuItem.name }
        onClick={ menuItem.onClick } >

        { menuItem.name }
      </button>
    )
  });
}
