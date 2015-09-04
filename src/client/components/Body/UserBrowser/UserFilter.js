import React, {Component} from 'react';
import serialize from 'form-serialize';
import LanguageOptions from '../../LanguageOptions';

export default class UserFilter extends Component {
  constructor() {
    super();
    this.change = this.change.bind(this);
  }

  render() {
    return (
      <form onChange={this.change}>
        <label htmlFor="js-filter-speaking">Speaking Language:</label>
        <LanguageOptions name="speaking" id="js-filter-speaking"/>

        <label htmlFor="js-filter-learning">Learning Language:</label>
        <LanguageOptions name="learning" id="js-filter-learning"/>
      </form>
    );
  }

  change(evt) {
    this.props.filter(serialize(evt.currentTarget, {hash: true}));
  }
}
