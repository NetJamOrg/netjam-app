import React from 'react';

import ContextMenu from '../../../components/ContextMenu/ContextMenu';

import './ClipContextMenu.scss';

const MENU_ID = 'clip-contextmenu';

export const ClipContextMenu = (props) => {
  const menuItems = [
    {
      name: 'duplicate',
      onClick: (e) => {
        const clipMenuElem = e.nativeEvent.srcElement.parentNode;
        const clipId = clipMenuElem.dataset.clipId;
        const track = clipMenuElem.dataset.track;
        if (!clipId) return;
        clipMenuElem.style.display = 'none';
        props.duplicateClip(props.tracks[track].clips[clipId]);
      }
    },
    {
      name: 'delete',
      onClick: (e) => {
        const clipMenuElem = e.nativeEvent.srcElement.parentNode;
        const clipId = clipMenuElem.dataset.clipId;
        const track = clipMenuElem.dataset.track;
        if (!clipId) return;
        clipMenuElem.style.display = 'none';
        console.log('delete clip');
      }
    }
  ];

  return (
    <ContextMenu menuItems={ menuItems } menuId ={ MENU_ID } stickToClass="clip-component"/>
  );
};

export default ClipContextMenu;
