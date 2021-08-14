const customSelectStyles = {
  option: (provided, state) => ({
    ...provided,
  }),
  clearIndicator: (provided, state) => ({
    ...provided,
    cursor: 'pointer',
  }),
  dropdownIndicator: (provided, state) => ({
    ...provided,
    cursor: 'pointer',
  }),
  multiValueRemove: (provided, state) => ({
    ...provided,
    cursor: 'pointer',
  }),
  control: (provided, state) => ({
    ...provided,
    borderColor: '#4B5563',
    borderWidth: '2px',
    padding: '0.15rem 0rem',
    fontWeight: '500',
    boxShadow: 'none',
    '&:hover': {
      borderColor: '#4B5563',
      outline: 'none',
      boxShadow: 'none',
    },
  }),
}

export { customSelectStyles }
