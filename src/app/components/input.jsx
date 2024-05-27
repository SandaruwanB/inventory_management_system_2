import React from 'react'

const Input = ({type, placeholder, styles, classes}) => {
  return (
    <input type={type} placeholder={placeholder} style={styles} className={[classes]}/>
  )
}

export default Input