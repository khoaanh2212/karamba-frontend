import React, {Component} from 'react';
import { DateRange, Calendar } from 'react-date-range';
/*
* References:
* http://adphorus.github.io/react-date-range/
* https://github.com/Adphorus/react-date-range/blob/master/demo/src/components/Main.js#L143
* */

/*
* not yet support Predefiend ranges ranges={ defaultRanges }
* */


export class EasyDateRange extends Component {

  render() {
    let styles = this.props.style ? this.props.style : {};
    return (
      <DateRange
        style={styles}
        startDate={this.props.startDate}
        endDate={this.props.endDate}
        linkedCalendars={!!this.props.linkedCalendars}
        theme={this.props.theme}
        onInit={this.props.onInit}
        onChange={this.props.onChange}
      />
    )
  }
}

export class EasyCalendar extends Component {

  render() {
    let styles = this.props.style ? this.props.style : {};
    return (
      <Calendar
        style={styles}
        date={this.props.date}
        theme={this.props.theme}
        onInit={this.props.onInit}
        onChange={this.props.onChange}
      />
    )
  }
}
