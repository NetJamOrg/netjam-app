import React from 'react';

import common from 'common';

import ContextMenu from 'react-contextulize';

import './ClipContextMenu.scss';

const MENU_ID = 'clip-contextmenu';

export const ClipContextMenu = (props) => {
  const menuItems = [
    {
      itemId: 'duplicate',
      itemText: 'Duplicate',
      props: {
        onClick: (e, rightClickedElem, data) => {
          const clipId = common.getClipId(rightClickedElem);
          const track = rightClickedElem.dataset.track;
          if (!clipId) return;
          console.log(data.itemId, 'clicked');
          props.duplicateClip(props.tracks[track].clips[clipId]);
        }
      }
    },
    {
      itemId: 'delete',
      itemText: 'Delete',
      props: {
        onClick: (e, rightClickedElem, data) => {
          const clipId = common.getClipId(rightClickedElem);
          const track = rightClickedElem.dataset.track;
          if (!clipId) return;
          console.log(data.itemId, 'clicked');
        }
      }
    }
  ];

  return (
    <ContextMenu
      menuItems={ menuItems } menuId ={ MENU_ID }
     stickToClass="clip-component"/>
  );
};

export default ClipContextMenu;
