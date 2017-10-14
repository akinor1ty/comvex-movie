// @flow
import React, { Component } from 'react';

type Props = {
  label: string,
  onSelect: () => string,
  children: ?Array<any>,
};

type State = {
  selected: ?string
}

class Select extends Component<Props, State> {

  constructor(props: Props) {
    super(props);

    const { value } = props;
    this.state = {
      selected: value || null
    }
  }

  handleClick(value: string) {
    this.setState({ selected: value });

    const { onSelect } = this.props;
    onSelect(value);
  }

  render() {
    const { value, options, label } = this.props;
    const selected = options.find(op => op.value === value);

    return (
      <div className="dropdown-wrapper">
        <label className="label">{ label }:</label>
        <div className="dropdown">
          <button className="dropdown__button">{ selected && selected.label }</button>
          <div className="dropdown__content">
            {
              options.map(op => (
                <div key={ op.value }
                     className="dropdown__option"
                     value={ op.value }
                     onClick={ () => this.handleClick(op.value) }>
                  { op.label }
                </div>
              ))
            }
          </div>
        </div>
      </div>
    );
  }
}

export default Select;
