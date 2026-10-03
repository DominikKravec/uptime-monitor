import React from 'react'

interface SearchBarProps {
    onChange: (query: string) => void
    value: string
    setValue: (value: string) => void
}

let lastTimeout: null|NodeJS.Timeout = null

const onChangeHandler = (query: string, onChange: (query: string) => void ) => {

    if (lastTimeout != null){
        clearTimeout(lastTimeout)
    }

    lastTimeout = setTimeout(() => {
        onChange(query)
        lastTimeout = null
    }, 1000)

}

const SearchBar: React.FC<SearchBarProps> = ({onChange, value, setValue}) => {
  return (
    <div className='bg-blue-500'>
        <input 
            type="text" 
            value={value} 
            onChange={(input) => {
                setValue(input.target.value)
                onChangeHandler(input.target.value, onChange)
            }} 
        />
    </div>
  )
}

export default SearchBar
