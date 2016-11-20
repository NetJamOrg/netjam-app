import React from 'react';

import common from 'common';

import ContextMenu from '../../../components/ContextMenu/ContextMenu';

import './ClipContextMenu.scss';

const MENU_ID = 'clip-contextmenu';

export const ClipContextMenu = (props) => {
  const menuItems = [
    {
      name: 'duplicate',
      props: {
        onClick: (e, rightClickedElem) => {
          const clipId = common.getClipId(rightClickedElem);
          const track = rightClickedElem.dataset.track;
          if (!clipId) return;
          console.log('duplicating');
          props.duplicateClip(props.tracks[track].clips[clipId]);
        }
      }
    },
    {
      name: 'delete',
      props: {
        onClick: (e, rightClickedElem) => {
          const clipId = common.getClipId(rightClickedElem);
          const track = rightClickedElem.dataset.track;
          if (!clipId) return;
          console.log('delete clip');
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
