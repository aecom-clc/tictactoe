import React from 'react';
import styled, { css, keyframes } from 'styled-components';

import { ReactComponent as X } from './aecom_ststwincaverns2_ppt_marmot1.svg';
import { ReactComponent as Circle } from './aecom_ststwincaverns2_ppt_marmot8.svg';

const scale = keyframes`
  0% {
    transform: scale(1);
  }

  100% {
    transform: scale(1.1);
  }
`;

const Player1 = styled(X)`
  width: 100px;
  height: 100px;
  
  ${props => props.winner && css`
    animation: ${scale} infinite alternate ease-in-out .54s;
  `}
`

const Player2 = styled(Circle)`
  width: 100px;
  height: 100px;
  
  ${props => props.winner && css`
    animation: ${scale} infinite alternate ease-in-out .54s;
  `}
`

const SlotWrapper = styled.div`
  --dimensions: calc(var(--board-size) / 3);

  /*TODO: How to move this block to a shared place? */
  display: flex;
  align-items: center;
  justify-content: center;

  background-color: var(--base-color);
  border: var(--grid-border);
  height: var(--dimensions);
  width: var(--dimensions);
  transition: background-color 150ms linear;
  cursor: pointer;

  ${props => !props.player && css`
    :hover {
      background-color: #3e5368;
    }
  `}
`;

export const Slot = props => {
  // console.log("[log: Slot.js, props]", props);
  if (props.winner == true) {
    const winner_player_w = props.player;
    console.log("[log: Slot.js, winner_player_w]", winner_player_w);
    props.myCallbackFromParent(winner_player_w);
  };


  return (
    <SlotWrapper
      data-testid={`Slot${props.index}`}
      onClick={() => props.onSlotClick(props.index)}
    >
      {
        {
          1: <Player1 winner={props.winner || undefined} />,
          2: <Player2 winner={props.winner || undefined} />
        }[props.player]
      }
    </SlotWrapper>
  );
};
