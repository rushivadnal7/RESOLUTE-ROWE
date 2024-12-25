import React from 'react'
import { ButtonWrapper } from '../wrappers/button'

const Button = ({text , submit, onclick}) => {
  return (
    <ButtonWrapper type={submit ? 'submit' : 'button'} onClick={onclick}>
        {text}
    </ButtonWrapper>
  )
}

export default Button