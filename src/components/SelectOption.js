// @flow
import React from 'react';

type SelectOptionProps = {
  value: string | number,
  children?: string,
}

const SelectOption = (props: SelectOptionProps) => {
  const { value, children } = props;

  return (
    <option value={ value }>{ children }</option>
  );
};

export default SelectOption;
