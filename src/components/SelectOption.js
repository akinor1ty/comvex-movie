// @flow
import React from 'react';

type SelectOptionProps = {
  value: string | number,
  children?: string,
}

const SelectOption = (props: SelectOptionProps) => {
  const { value, children, onClick } = props;

  return (
    <div className="dropdown__option" onClick={ () => onClick } value={ value }>{ children }</div>
  );
};

export default SelectOption;
