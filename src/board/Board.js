import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { Slot } from './Slot';

const BoardWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  outline: var(--grid-border);
  width: var(--board-size);
`;

/* *
 * Class that renders the game board.
 * */
class Board extends PureComponent {

  /**
   * Creates a Board.
   */
  constructor(props) {
    super(props);
    this.slots = Array(9).fill(0, 0, 9);
    this.slotClick_ = this.handleSlotClick_.bind(this);
  }

  handleSlotClick_(index) {
    this.props.onSlotClick(index);
  }

  myCallback = (winner_player) => {
    console.log("[log: Board.js, myCallback-winner_player]", winner_player);
    this.props.myCallbackFromApp(winner_player);
  }

  /**
   * Renders board slots that will be fufilled by gamers' pieces.
   * @private 
   */
  renderSlots_() {
    let { filledSlots, winnerSlots } = this.props;
    console.log("***Board.js, this.props::", this.props);

    return this.slots.map((_, index) => {
      console.log("[log: Board.js, filledSlots.get(index)]", filledSlots.get(index));
      return (
        <Slot
          key={index}
          winner={winnerSlots.includes(index)}
          player={filledSlots.get(index)}
          index={index}
          onSlotClick={this.slotClick_}
          myCallbackFromParent={this.myCallback}
        />
      );
    });
  }

  /**
   * @inheritdoc
   */
  render() {
    return (
      <BoardWrapper>
        {this.renderSlots_()}
      </BoardWrapper>
    );
  }
}

export default Board;
