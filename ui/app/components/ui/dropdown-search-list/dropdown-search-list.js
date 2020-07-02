import React, { useState } from 'react'
import PropTypes from 'prop-types'
import SearchableItemList from '../searchable-item-list'

export default function DropdownSearchList ({
  SearchListPlaceholder = null,
  searchListClassName = '',
  itemsToSearch = [],
  searchPlaceholderText,
  fuseSearchKeys = [],
  defaultToAll = false,
  maxListItems = undefined,
  SelectedItemComponent = null,
  onSelect = null,
  startingItem = null,
  onOpen = null,
  onClose = null,
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState(startingItem)

  return (
    <div
      className="dropdown-search-list simple-dropdown"
      onClick={() => {
        if (!isOpen) {
          setIsOpen(true)
          onOpen()
        }
      }}
    >
      {!isOpen && (
        <div className="dropdown-search-list__selector">
          <SelectedItemComponent {...selectedItem} />
          <i className="fa fa-caret-down fa-lg simple-dropdown__caret" />
        </div>
      )}
      {isOpen && (
        <>
          <SearchableItemList
            itemsToSearch={itemsToSearch}
            Placeholder={SearchListPlaceholder}
            className={searchListClassName}
            searchPlaceholderText={searchPlaceholderText}
            fuseSearchKeys={fuseSearchKeys}
            defaultToAll={defaultToAll}
            onClickItem={(item) => {
              onSelect && onSelect(item)
              setSelectedItem(item)
              setIsOpen(false)
              onClose()
            }}
            maxListItems={maxListItems}
          />
          <div
            className="simple-dropdown__close-area"
            onClick={(event) => {
              event.stopPropagation()
              setIsOpen(false)
              onClose()
            }}
          />
        </>
      )}
    </div>
  )
}

DropdownSearchList.propTypes = {
  itemsToSearch: PropTypes.array,
  onSelect: PropTypes.func,
  SearchListPlaceholder: PropTypes.element,
  searchListClassName: PropTypes.string,
  searchPlaceholderText: PropTypes.string,
  fuseSearchKeys: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    weight: PropTypes.number,
  })),
  defaultToAll: PropTypes.bool,
  maxListItems: PropTypes.number,
  SelectedItemComponent: PropTypes.element,
  startingItem: PropTypes.object,
  onOpen: PropTypes.func,
  onClose: PropTypes.func,
}
