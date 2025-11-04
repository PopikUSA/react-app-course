import {} from 'react'
import cls from './Button.module.css'
const inlineStyles={
    color:'lightsalmon',
    backgroundColor: '#ccc',
}

const isPrimary=true

export const Button=({onClick, children})=>{
    // console.log(cls)
    // console.log(onClick, children)
    return(
        // <button className={isPrimary? cls.primary : cls.btn}>Button</button>
        <button
        className={`${cls.btn} ${isPrimary? cls.primary : ""}`} 
        onClick={onClick}
        >{children}</button>
    )
}