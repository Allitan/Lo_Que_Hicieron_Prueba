'use client'
import React, {useContext} from 'react'
import Link from 'next/link'
import { contextTrivia } from '../Context/ContextTrivia'


export default function headerComponent() {
 const {puntajeAcumulado} = useContext(contextTrivia);

  return (
    <header className='header'>
        <h1 className='tituloHeader'>
            <Link href='/' className='link'>
                Aplicacion Trivia
            </Link>
        </h1>
        <div className='puntaje'>
             Puntaje: <span className='spanPuntaje'>{puntajeAcumulado}</span>
        </div>
    </header>
  )
}
