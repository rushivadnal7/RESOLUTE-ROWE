import React from 'react'
import { BorderButtonWrapper } from '../wrappers/BorderbuttonWrapper'

const BorderButton = ({text , bgColor , onclick}) => {
    return (
        <BorderButtonWrapper onClick={onclick} bg={bgColor}>
            <div className="buy-button-border"></div>
            <button className="buy-button">{text}</button>
        </BorderButtonWrapper>
    )
}

export default BorderButton