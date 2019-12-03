import React, { Component } from 'react';
import Board from '../Classes/Board';
import BlockArea from './BlockArea';
import './BoardArea.css';

class BoardArea extends Component {
  state = {
    board: null,
  };

  componentDidMount() {
    const board = new Board(this.props.rows, this.props.columns);
    window.board = board;
    this.setState({ board });
  }

  onOpen = (block) => {
    block.toggleOpen();
    this.setState({ board });
  };

  onFlag = (block) => {
    window.block = block;
    block.toggleFlag();
    this.setState({ board });
  };

  render() {
    let rows = [];
    if (this.state.board) {
      rows = this.state.board.rows;
    }
    return (
      <div className="board">
        {Array.from(rows.values()).map((row, index) => (
          <div key={index} className="row">
            {Array.from(row.values()).map((block) => (
              <BlockArea
                key={`${block.row}-${block.column}`}
                {...block}
                onOpen={() => this.onOpen(block)}
                onFlag={() => this.onFlag(block)}
              />
            ))}
          </div>
        ))}
      </div>
    );
  }
}

export default BoardArea;
