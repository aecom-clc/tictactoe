import React, { Component } from 'react';
import './setup.scss';

import Grid from '@material-ui/core/Grid'

const logo = require('../images/gamemenu.png')

/**
 * Component responsible for getting players` name and passes it to the parent 
 * component through a function named `onFinishSetup`.
 **/
class Setup extends Component {
  constructor(props) {
    super(props);

    this.props.game.clearBoard();

    this.onPlayerTwoNameChange_ = this.onPlayerTwoNameChange_.bind(this);
    this.onPlayerOneNameChange_ = this.onPlayerOneNameChange_.bind(this);
    this.onFormSubmit_ = this.onFormSubmit_.bind(this);

    this.state = {
      playerOneName: 'player 1',
      playerTwoName: 'player 2',
    }
  }

  /**
   * Express conditions to disable form submission.
   * @returns {boolean} true for disable and false for enable
   * @private 
   **/
  disableForm_() {
    let { playerOneName, playerTwoName } = this.state;
    return !playerOneName || !playerTwoName || playerOneName === playerTwoName;
  }

  /**
   * Listens to the form submission and informs players` name to the
   * parent component.
   * @param {event} event The event object
   * @private 
   **/
  onFormSubmit_(event) {
    event.preventDefault();
    let { playerOneName, playerTwoName } = this.state;
    // if (playerOneName == "") {
    //   this.setState({ playerOneName: "Player 1" });
    //   playerOneName = "Player 1";
    // };
    // if (playerTwoName == "") {
    //   this.setState({ playerOneName: "Player 2" });
    //   playerOneName = "Player 2";
    // };

    if (!this.props.game.playersManager_.checkErros().lenght) {
      this.props.history.push(`/firstPlayer/${playerOneName}/secondPlayer/${playerTwoName}`);
    }
  }

  /**
   * Stores the first player's name in the state object.
   * @param {event} event The event object
   * @private 
   **/
  onPlayerOneNameChange_(event) {
    this.setState({
      playerOneName: event.target.value
    });
  }

  /**
   * Stores the second player's name in the state object.
   * @param {event} event The event object
   * @private 
   **/
  onPlayerTwoNameChange_(event) {
    this.setState({
      playerTwoName: event.target.value
    });
  }

  /**
   * @inheritdoc
   **/
  render() {
    // let disabled = this.disableForm_();

    return (
      // <div className="tic-tac-toe-app ">
      <div >

        <br />
        <br />
        <Grid container spacing={3} className="font-center">
          <Grid item xs={12} sm={12}>
            
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



          </Grid>
          <Grid item xs={12} sm={12}>
            <h1>Tic Tac Toe</h1>
          </Grid>
          <div className="setup-page">
            <Grid item xs={1} sm={2} />
            <Grid item xs={5} sm={4}>
              <div className="collumn icon-align-center">
                <img src="./images/aecom_ststwincaverns2_ppt_marmot1.png" alt="Player1" width="70%" />
                <input
                  type="text"
                  // value="Player1"
                  // value={this.state.playerOneName}
                  placeholder="player one"
                  onChange={this.onPlayerOneNameChange_}
                  id="playerOne" />
              </div>
            </Grid>
            <Grid item xs={5} sm={4}>
              <div className="collumn icon-align-center">
                <img src="./images/aecom_ststwincaverns2_ppt_marmot8.png" alt="Player2" width="70%" />
                <input
                  type="text"
                  // value={this.state.playerTwoName}
                  placeholder="player two"
                  onChange={this.onPlayerTwoNameChange_}
                  id="playerTwo" />
              </div>
            </Grid>
            <Grid item xs={1} sm={2} />
          </div>

          <button className="vertical-center button-style" disabled={false} onClick={this.onFormSubmit_}> Start </button>

        </Grid>
      </div>
    );
  }
}

export default Setup;
