import React, { ReactNode, useState, useEffect } from 'react'
import { contextTrivia, TriviaContextType } from '../Context/ContextTrivia'

export default function ProviderTrivia({children}: {children:ReactNode}) {
    const [puntajeAcumulado, setPuntajeAcumulado] = useState(0);
    const [preguntasRespondidas, setPreguntasRespondidas] = useState(0);

    const incrementarPuntaje = (puntos:number)=> {
        setPuntajeAcumulado(prevPuntaje => prevPuntaje + puntos);
    }

    const incrementarPreguntas = () => {
        setPreguntasRespondidas(prevCount => prevCount +1);
    }

    const reiniciarJuego = () => {
        setPuntajeAcumulado(0);
        setPreguntasRespondidas(0);
    }

    const value: TriviaContextType = {
        puntajeAcumulado,
        preguntasRespondidas,
        incrementarPuntaje,
        incrementarPreguntas,
        reiniciarJuego,
    }


  return (
        <contextTrivia.Provider value={value}>
            {children}
        </contextTrivia.Provider>
  )
}
