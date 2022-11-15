import './input.css';
import React from 'react'

const Input = (props) => {

  return (
    <input 
        className='form-input'
        {...props}
    />
  )
}

export default Input;