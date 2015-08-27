import React, {Component} from 'react';
import * as util from '../../util';

export default class LanguageOptions extends Component {
  render() {
    const options = languages.map(language => (
      <option value={language} key={language}>{util.capitalize(language)}</option>
    ));

    return (
      <select {...this.props}>
        {options}
      </select>
    );
  }
}

const languages = [
  '',
  'english',
  'korean',
  'mandarin',
  'spanish',
  'thai'
];
