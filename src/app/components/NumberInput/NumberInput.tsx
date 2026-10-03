import React from 'react'

interface NumberInputProps{

    value: number
    setValue: (val: number) => void
    onSubmit: () => void
    placeholder: string

}

const NumberInput: React.FC<NumberInputProps> = ({value, setValue, onSubmit, placeholder}) => {
  return (
    <div className='bg-blue-300'>
      <input 
        type="number" 
        value={value}
        onChange={(input) => {
            setValue(parseInt(input.target.value))
        }}
        onSubmit={() => {
            onSubmit()
        }}
        placeholder={placeholder}
      />
    </div>
  )
}

export default NumberInput
