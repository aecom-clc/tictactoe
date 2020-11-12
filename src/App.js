import React, { Component } from 'react';
import Board from './board/Board';
import Storage from './storage/Storage';
import { Link } from 'react-router-dom';
import './App.scss';

import Modal from 'react-awesome-modal';
/**
 * Initialize the game asking for players information. Manage players
 * turns and set in the board filled slots. 
 **/

var controlFlag = false;

const logo = require('./images/gamemenu.png')

class App extends Component {
  constructor(props) {
    super(props);

    if (this.hasNoPlayers_()) {
      this.setPlayersFromURL_();
    }

    this.state = {
      filledSlots: new Map(this.props.game.getBoard()),
      winnerSlots: [],
      winnerPlayerId: '',
      visible : true,
    };
    this.props.game.onGameEnd = this.onGameEnd_.bind(this);
    this.storage_ = new Storage();
    this.onSlotClick_ = this.handleSlotClick_.bind(this);
  }

  openModal() {
    this.setState({
        visible : true
    });
  }

  closeModal() {
      this.setState({
          visible : false
      });
  }

  componentDidMount() {
    console.log("***CDM: ", this.props.match.params);
    console.log("[log: App.js, this.props]", this.props);
    controlFlag = true;
    // console.log("[log: App.js, w]", winner_player);
  }
  /**
   * Uses url parameters to create players.
   * @private
   **/
  setPlayersFromURL_() {
    console.log("***", this.props.match.params);
    const { firstPlayer, secondPlayer } = this.props.match.params;
    this.props.game.playersManager_.addPlayer(firstPlayer);
    this.props.game.playersManager_.addPlayer(secondPlayer);
  }

  /**
   * Checks if players was not already defined.
   * @returns {Boolean}
   * @private
   **/
  hasNoPlayers_() {
    return this.props.game.playersManager_
      .checkErros()
      .some(error => error.code === 'no_players');
  }

  /**
   * Callback method that will be called when the game is finished. It updates
   * the local storage with the new winner and go to the Leaderboard page.
   * @param {Object} winner The Player object.
   * @private
   **/
  onGameEnd_(winner) {
    if (winner) {
      const gameLeaderBoard = this.storage_.getData();
      this.storage_.update([winner.player.name, ...gameLeaderBoard]);
      this.setState({
        winnerSlots: winner.slots,
        winner
      });
    }
  }

  /**
   * Handles the click event on the each slot and updates the filledSlots
   * state.
   * the turn to the next player.
   * @param {Number} index The Board Slot index.
   * @private
   **/
  handleSlotClick_(index) {
    if (this.state.winnerSlots.length > 0) {
      return;
    }
    // console.log("[log: App.js, this.state.winnerSlots]", this.state.winnerSlots);
    // console.log("[log: App.js, this.props]", this.props);
    this.props.game.fillSlot(index);
    this.setState({
      filledSlots: new Map(this.props.game.getBoard())
    });
  }

  myCallback = (winner_player) => {
    if (controlFlag) {
      console.log("[log: App.js, myCallback-winner_player]", winner_player);
      controlFlag = false;
      this.setState({
        winnerPlayerId: winner_player
      })
    }
  }

  /**
   * @inheritdoc
   **/
  render() {
    const leaderboardMessage = () => {
      if (this.state.winner) {
        return (
          <div>
            <section>
                {/* <input type="button" value="Open" onClick={() => this.openModal()} /> */}
                <Modal visible={this.state.visible} width="400" height="300" effect="fadeInUp" onClickAway={() => this.closeModal()}>
                    <div style={{ color: 'blue', textAlign: 'center' }}>
                        <br/>
                        <br/>
                        <br/>
                        <h1>
                          Congratulations !
                          <br/>
                          {
                            (this.state.winnerPlayerId == 1)
                              ? this.props.match.params.firstPlayer
                              : this.props.match.params.secondPlayer
                          }
                        </h1>
                        <br/>
                        <a href="/tictactoe/" onClick={() => this.closeModal()}>New Game</a>
                    </div>
                </Modal>
            </section>
          
            <p className="winner-message">
              {console.log("[log: App.js, this.props]", this.props)}
              {console.log("[log: App.js, this.props.game.board_]", this.props.game.board_)}
              {/* Congratulations {this.state.winner.player.name}. */}
              Congratulations &nbsp;
              {
                (this.state.winnerPlayerId == 1)
                  ? this.props.match.params.firstPlayer
                  : this.props.match.params.secondPlayer
              }
              {/* Congratulations {this.state.winnerPlayerId}. */}
              {/* <Link to="/leaderboard">
                See leaderboard
              </Link> */}
            </p>
          </div>
        );
      }
    }
    return (
      <div className="tic-tac-toe-app">
        {console.log("[log: App.js, player turn]", this.props.game.playersManager_.currentPlayerIndex_ + 1)}
        
        <header className="">
            <div className="Header__logo">
              <a className="Header__logoA" href="https://aecom-clc-gamemenu.web.app/">
                <img
                  alt="logo"
                  className="Header__logoImage"
                  src={logo}
                />
                <span className="Header__logoTitle">CLC Game Menu</span>        
              </a>
            </div>
        </header>
        
        <br />
        <br />
        <br />
        <br />
        <br />
        <h3>
          Turn: &nbsp;
        {
            ((this.props.game.playersManager_.currentPlayerIndex_ + 1) == 1)
              ? this.props.match.params.firstPlayer
              : this.props.match.params.secondPlayer
          }
        </h3>
        <br />
        <br />

        {console.log("***App.js, this.state: ", this.state)}
        <Board
          winnerSlots={this.state.winnerSlots}
          filledSlots={this.state.filledSlots}
          onSlotClick={this.onSlotClick_}
          myCallbackFromApp={this.myCallback}
        />
        {/* {console.log("app.js, this.state.winnerSlots: ", this.state.winnerSlots)} */}

        <Link className="button new-game-button" to="/">
          New game
        </Link>

        <div className="app-footer">
          {leaderboardMessage()}
        </div>
      </div>
    );
  }
}

export default App;
