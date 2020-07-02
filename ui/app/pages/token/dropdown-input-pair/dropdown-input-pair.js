import React, { useState } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import DropdownSearchList from '../../../components/ui/dropdown-search-list'
import TextField from '../../../components/ui/text-field'

export default function DropdownInputPair ({
  itemsToSearch = [],
  onInputChange = null,
  inputValue = null,
}) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div
      className={classnames('dropdown-input-pair', {
        'dropdown-input-pair--closed': !isOpen,
      })}
    >
      <DropdownSearchList
        startingItem={itemsToSearch[0]}
        itemsToSearch={itemsToSearch}
        SearchListPlaceholder={({ searchQuery }) => (<div className="token__placeholder">{`No tokens available that match “${searchQuery}”.`}</div>)}
        SelectedItemComponent={({ backgroundImageUrl, symbol }) => (
          <div className="token__search-token">
            <div className="searchable-item-list__selected-item dropdown-input-pair__selected-item">
              <div
                className="searchable-item-list__item-icon"
                style={{ backgroundImage: `url(${backgroundImageUrl})` }}
              />
              <div className="searchable-item-list__labels">
                <div className="searchable-item-list__item-labels">
                  <span className="searchable-item-list__primary-label">{ symbol }</span>
                </div>
              </div>
            </div>
          </div>
        )}
        searchListClassName="token__search-token"
        searchPlaceholderText="Search for a token"
        fuseSearchKeys={[{ name: 'name', weight: 0.5 }, { name: 'symbol', weight: 0.5 }]}
        maxListItems={itemsToSearch.length}
        onOpen={() => setIsOpen(true)}
        onClose={() => setIsOpen(false)}
        defaultToAll
      />
      {!isOpen && (
        <TextField
          className="dropdown-input-pair__input"
          type="number"
          placeholder={ 0 }
          onChange={(event) => onInputChange(event.target.value)}
          fullWidth
          margin="dense"
          value={ inputValue }
          error=""
        />
      )}
    </div>
  )
}

DropdownInputPair.propTypes = {
  itemsToSearch: PropTypes.array,
  onInputChange: PropTypes.func,
  inputValue: PropTypes.number,
}
