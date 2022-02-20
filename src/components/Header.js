import React, { Component } from 'react';
import propTypes from 'prop-types'
import Button from './Button'

const Header = ({title,onAddPressed,showAdd}) =>{
    const onClick = () =>{
        console.log('Click')
    }
    
    
    return(
        <header className= 'header'>
            <h1> {title}</h1>
            <Button color = 'green' text= {showAdd? 'close':'Add a new entry'} onClick = {onAddPressed}></Button>
        </header>
    )
}

Header.defaultProps = {
    title: 'TTTTTT',
}

Header.propTypes = {
    title: propTypes.string.isRequired,
}

export default Header;