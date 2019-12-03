import React from 'react';
import './BlockArea.css';

const BlockArea = ({ open, flag, bomb, number, onOpen, onFlag }) => {
  const onContextMenu = (e) => {
    e.preventDefault();
    onFlag();
  };

  if (!open) {
    if (!flag) {
      return (
        <div
          className="block block-box block-not-open"
          onClick={onOpen}
          onContextMenu={onContextMenu}
        ></div>
      );
    }
    return (
      <div
        className="block block-box block-flag"
        onClick={onOpen}
        onContextMenu={onContextMenu}
      ></div>
    );
  }
  return (
    <div
      className={`block block-box${
        number > 0 ? ` block-number-${number} text` : ''
      }${bomb ? ' block-bomb' : ''}`}
      onClick={onOpen}
      onContextMenu={onContextMenu}
    >
      {number > 0 ? number : null}
    </div>
  );
};

export default BlockArea;
