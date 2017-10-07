// @flow
import React from 'react';

type Props = {
  label: string,
  onChange: (value: string) => void,
  children: ?Array<any>
};

const Select = (props: Props) => {
  const { children, label, onChange } = props;
  return (
    <div>
      <label>{ label }:</label>
      <select onChange={ e => onChange(e.target.value)}>
        {
          children
        }
      </select>
    </div>
  );
};

export default Select;
