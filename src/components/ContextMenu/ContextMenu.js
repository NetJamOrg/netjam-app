import React, { Component, PropTypes } from 'react';

import common from 'common';

import './ContextMenu.scss';

export default class ContextMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      x: 0,
      y: 0,
      isVisible: false,
      rightClickedElem: null,
      stickyElemOffset: null,
      originalPos: null
    };

    this.menuRef = this.menuRef.bind(this);
    this.createStyles = this.createStyles.bind(this);
    this.createButtons = this.createButtons.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onContextMenu = this.onContextMenu.bind(this);
    this.onScroll = this.onScroll.bind(this);
  }

  addMenu(x, y, srcElem) {
    if (!srcElem) return;
    this.setState({
      x, y,
      isVisible: true,
      rightClickedElem: srcElem,
      stickyElemOffset: srcElem.getBoundingClientRect(),
      originalPos: { x, y }
    });
  }

  closeMenu() {
    this.setState({ isVisible: false });
  }

  closeMenuAfter(before) {
    return (e) => {
      before(e);
      this.closeMenu();
    };
  }

  componentDidMount() {
    window.addEventListener('mousedown', this.onMouseDown, false);
    window.addEventListener('contextmenu', this.onContextMenu, false);
    common.throttle('scroll', 'scrollOptimized');
    window.addEventListener('scrollOptimized', this.onScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('mousedown', this.onMouseDown, false);
    window.removeEventListener('contextmenu', this.onContextMenu, false);
    window.removeEventListener('scrollOptimized', this.onScroll);
  }

  onMouseDown(e) {
    const srcElemBounds = common.getBounds(this.menu);
    const clickedInsideMenu = common.isInBounds(srcElemBounds, e.pageX, e.pageY);

    /* Close context menu from menu-item onclick because display none
     stops propagation of event to menu item onclick handler, it reaches here first */
    if (!clickedInsideMenu) {
      this.closeMenu();
    }
  }

  onContextMenu(e) {
    if (common.hasClass(e.srcElement, this.props.stickToClass)) {
      e.preventDefault();
      this.addMenu(e.clientX, e.clientY, e.srcElement);
    }
  }

  onScroll(e) {
    if (!this.state.isVisible || !this.state.rightClickedElem) return;
    const newOffset = this.state.rightClickedElem.getBoundingClientRect();
    const dX = newOffset.left - this.state.stickyElemOffset.left;
    const dY = newOffset.top - this.state.stickyElemOffset.top;
    if (!dX || !dY) {
      this.setState({
        x: this.state.originalPos.x + dX,
        y: this.state.originalPos.y + dY
      });
    }
  }

  bindRightClickElemToProps(props) {
    for (let prop in props) {
      if (props.hasOwnProperty(prop) && typeof props[prop] === 'function') {
        props[prop] = common.bindWithoutThis(props[prop], this.state.rightClickedElem);
      }
    }

    return props;
  }

  menuRef(c) {
    this.menu = c;
  }

  /* PRESENTATIONAL */
  createStyles() {
    let newStyles = {};
    newStyles.left = common.numToPx(this.state.x);
    newStyles.top = common.numToPx(this.state.y);
    newStyles.display = this.state.isVisible ? 'flex' : 'none';
    return newStyles;
  }

  createButtons() {
    return this.props.menuItems.map((menuItem) => {
        let menuItemProps = this.bindRightClickElemToProps({ ...menuItem.props });

        if (menuItemProps && menuItemProps.onClick) {
          menuItemProps.onClick = this.closeMenuAfter(menuItemProps.onClick);
        }

        if (menuItemProps && menuItemProps.onMouseDown) {
          menuItemProps.onMouseDown = this.closeMenuAfter(menuItemProps.onMouseDown);
        }

        return (
          <button
            className="contextmenu-item"
            key={ menuItem.name }
            { ...menuItemProps }>
          { menuItem.name }
          </button>
        );
      }
    );
  }

  render() {
    return (
      <div id={ this.props.menuId }
           ref={ this.menuRef }
           className="contextmenu"
           style={ this.createStyles() } >
        { this.createButtons() }
      </div>
    );
  }
};

ContextMenu.propTypes = {
  menuId: PropTypes.string.isRequired,
  stickToClass: PropTypes.string.isRequired,
  menuItems: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    props: PropTypes.object
  })).isRequired
};
