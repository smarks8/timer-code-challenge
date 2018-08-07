import React from 'react';

class Timer extends React.Component {

  state = {
    time: 0,
    isOn: false,
    startTime: null,
    splitTimes: [],
    selectedSplit: null,
    timerIntervalKeeper: null
  }

  startTimer = () => {
    this.setState({
      isOn: true,
      startTime: Date.now(),
      timerIntervalKeeper: setInterval(this.increaseTime, 100)
    })
  }

  increaseTime = () => {
    this.setState({
      time: Date.now() - this.state.startTime
    })
  }

  addSplitToList = () => {
    this.setState({
      splitTimes: [...this.state.splitTimes, this.state.time]
    })
  }

  selectSplitTime = (event) => {
    this.resetTimer(event);
    this.removeSplitTimesBelow(event.target.id);
    event.target.style.background = "yellow"
    this.setState({
      selectedSplit: event.target
    })
  }

  selectAnotherSplitTime = (event) => {
    this.removehighlight()
    this.selectSplitTime(event)
  }

  removehighlight = () => {
    let split = this.state.selectedSplit
    this.setState({
      selectedSplit: split.style.background = "white"
    })
  }

  resetTimer = (event) => {
    clearInterval(this.state.timerIntervalKeeper)
    this.setState({
      startTime: Date.now() + 100 - event.target.id,
      timerIntervalKeeper: setInterval(this.increaseTime, 100)
    })
  }

  removeSplitTimesBelow = (splitId) => {
    this.setState({
      splitTimes: this.state.splitTimes.filter(split => split <= splitId)
    })
  }

  convertMS = (ms) => {
    let h, m, s, ds;
    s = Math.floor(ms / 1000);
    ds = Math.floor(ms / 10);
    m = Math.floor(s / 60);
    h = Math.floor(m / 60);
    ds = ds % 100;
    s = s % 60;
    m = m % 60;
    h = h % 24;
    return h + ' : ' + m + ' : ' + s + ' : ' + ds;
  }

  render() {

    return(
      <div>
        {this.state.isOn === false ? <button onClick={this.startTimer}>Start!</button> : <button onClick={this.addSplitToList}>Split!</button>}
        <div className='timer'>
          {this.state.isOn === true ? this.convertMS(this.state.time) : null }
        </div>
          <ul>
            {this.state.splitTimes.map(split => <li onClick={this.state.selectedSplit ? this.selectAnotherSplitTime : this.selectSplitTime} id={split} key={split}>{this.convertMS(split)}</li>)}
          </ul>
      </div>
    );

  }
}

export default Timer;
