import React, { useState } from 'react'
import TextInput from '../TextInput/TextInput'
import NumberInput from '../NumberInput/NumberInput'
import IconButton from '../IconButton/IconButton'

interface AddAppModalProps{
    isActive: boolean
    setIsActive: (v: boolean) => void
}

interface TargetProps{
    name: string
    url: string
    interval: number
    active: boolean
}

const AddAppModal: React.FC<AddAppModalProps> = ({isActive, setIsActive}) => {

    const [targetProps, setTargetProps] = useState({
        name: "",
        url: "",
        interval: 60,
        active: true
    })

    return (
        <div className={"fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm " + (isActive ? '' : 'hidden')}>
            
            <div className="relative flex flex-col bg-gray-500 p-10 rounded-lg shadow-xl w-96 gap-4">
                
                <button
                    className="absolute top-2 right-4 text-xl font-bold text-white hover:text-gray-300"
                    onClick={() => setIsActive(false)}
                >
                    X
                </button>

                <h2 className="text-white text-xl font-bold mb-2">Add New App</h2>

                <TextInput
                    value={targetProps.name}
                    setValue={(input) => setTargetProps({...targetProps, name: input})}
                    onSubmit={() => {}}
                    placeholder='Example'
                />

                <TextInput
                    value={targetProps.url}
                    setValue={(input) => setTargetProps({...targetProps, url: input})}
                    onSubmit={() => {}}
                    placeholder='www.example.com'
                />

                <NumberInput
                    value={targetProps.interval}
                    setValue={(input) => setTargetProps({...targetProps, interval: input})}
                    onSubmit={() => {}}
                    placeholder='60'
                />

                <div className='flex items-center justify-center'>
                    <IconButton
                        name='Save App'
                        action={() => {}}
                        icon=''
                    />
                </div>
                

            </div>
        </div>
    )
}

export default AddAppModal
