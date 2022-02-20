import React from 'react'

import './searchInput.style.css'

type Props = {
  onSearch: (s: string) => void;
  value: string;
}

const SearchInput = ({ onSearch, value }: Props) => {
  return (
    <div className='search_container'>
      <input
        className='search_input'
        type="text"
        name="search"
        value={value}
        onChange={(e) => onSearch(e.target.value)}
      />
      <span className='serch_icon'>
        <i className="fa fa-search"></i>
      </span>
    </div>

  )
}

export default SearchInput