import React, { Component } from 'react';
import './setup.scss';

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
      playerOneName: 'Player1',
      playerTwoName: 'Player2',
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
      <div className="tic-tac-toe-app">
        <div className="setup-page">
          <div className="collumn">
            <div className="player">
              <div className="icon-x"></div>
              <img src="./images/aecom_ststwincaverns2_ppt_marmot1.png" alt="Player1" />
            </div>
            <input
              type="text"
              value={this.state.playerOneName}
              placeholder="Player one"
              // value="Player1"
              onChange={this.onPlayerOneNameChange_}
              id="playerOne" />
          </div>

          <div className="collumn">
            <div className="player">
              <div className="icon-circle"></div>
              <img src="./images/aecom_ststwincaverns2_ppt_marmot8.png" alt="Player2" />
            </div>
            <input
              type="text"
              value={this.state.playerTwoName}
              // value="Player2"
              placeholder="Player two"
              onChange={this.onPlayerTwoNameChange_}
              id="playerTwo" />
          </div>
        </div>
        <button disabled={false} onClick={this.onFormSubmit_}> Start! </button>
      </div>
    );
  }
}

export default Setup;
