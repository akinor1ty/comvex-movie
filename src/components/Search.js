// @flow
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

type Props = {
  value: ?string,
  onSearch: (string) => void,
  onClose: () => void,
  onChange: (string) => void,
}

class Search extends Component<Props> {
  constructor(props) {
    super(props);

    this.state = {
      searchQuery: null,
      selected: false,
    }
  }

  handleOnKeyDown(e: SyntheticEvent<any>) {
    if(e.key === 'Enter') {
      this.onEnter(e.target.value);
    }
  }

  onEnter(value: string) {
    const { onSearch } = this.props;
    // if search query is input, do searching
    if (value.length) {
      onSearch(value);
      this.setState({ selected: true });
      ReactDOM.findDOMNode(this).querySelector('input').blur();

    }
  }

  handleClickClose() {
    this.setState({
      selected: false,
      searchQuery: '',
    });
  }

  handleChange(e) {
    this.setState({ searchQuery: e.target.value });
  }

  render() {
    const { searchQuery, selected, } = this.state;

    return (
      <div className={ 'search search--right' }>
        <input className={ `search__input search__input--add-icon ${ selected ? 'search__input--selected' : ''}`}
               type="text"
               value={ searchQuery || '' }
               onChange={ e => this.handleChange(e) }
               onKeyDown={ e => this.handleOnKeyDown(e) }
               placeholder="Search for movies"
        />
        <i className={ `fa fa-search search__icon ${ selected ? 'search__icon--selected' : ''}`} aria-hidden="true"/>
        {
          selected
            ? <i className="fa fa-times search__close" aria-hidden="true" onClick={ () => this.handleClickClose() }/>
            : null
        }
      </div>
    )
  }
}

export default Search;