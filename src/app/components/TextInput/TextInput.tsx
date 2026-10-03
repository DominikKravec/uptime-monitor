import React from 'react'

interface TextInputProps{

    value: string
    setValue: (val: string) => void
    onSubmit: () => void
    placeholder: string

}

const TextInput: React.FC<TextInputProps> = ({value, setValue, onSubmit, placeholder}) => {
  return (
    <div className='bg-blue-300'>
      <input 
        type="text" 
        value={value}
        onChange={(input) => {
            setValue(input.target.value)
        }}
        onSubmit={() => {
            onSubmit()
        }}
        placeholder={placeholder}
      />
    </div>
  )
}

export default TextInput
