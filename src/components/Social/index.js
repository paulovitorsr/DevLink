import React from 'react';
import './social.css';

const Social = ({children ,url}) => {
  return (
    <a className='social' href={url} target='_blank' rel='noopener noreferrer'>
        {children}
    </a>
  )
}

export default Social;