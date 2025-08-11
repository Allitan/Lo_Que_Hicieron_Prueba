'use client';
import React, { useState, useEffect, useContext} from 'react'
import { Pregunta } from '../Modelos/trivia';
import { contextTrivia } from '../Context/ContextTrivia';

export default function TriviaComponent() {
    const {incrementarPuntaje, incrementarPreguntas, preguntasRespondidas, reiniciarJuego, puntajeAcumulado} = useContext(contextTrivia);

    const preguntas: Pregunta[] = [
        {
            idPregunta: 1,
            descripciomPregunta: 'La captital de Honduras es Tegucigalpa?',
            opcionRespuesta1: true,
            opcionRespuesta2: false,
            respuestaCorrecta: true,
            puntajePregunta: 1
        },
        {
            idPregunta: 2,
            descripciomPregunta: 'La capital de Estados Unidos es Nueva York?',
            opcionRespuesta1: true,
            opcionRespuesta2: false,
            respuestaCorrecta: false,
            puntajePregunta: 1
        },
        {
            idPregunta: 3,
            descripciomPregunta: 'Roatan es una isla?',
            opcionRespuesta1: true,
            opcionRespuesta2: false,
            respuestaCorrecta: true,
            puntajePregunta: 1
        },
        {
            idPregunta: 4,
            descripciomPregunta: 'Pesa mas una libra de papas que una libra de algodon?',
            opcionRespuesta1: true,
            opcionRespuesta2: false,
            respuestaCorrecta: false,
            puntajePregunta: 1
        },
        {
            idPregunta: 5,
            descripciomPregunta: 'El tomate es una fruta?',
            opcionRespuesta1: true,
            opcionRespuesta2: false,
            respuestaCorrecta: false,
            puntajePregunta: 1
        },
    ]

    const [pregunaActual, setPreguntasActual] = useState<Pregunta | null>(null);
    const [respuestaSeleccionada, setRespuestaSeleccionada] = useState<boolean | null>(null);
    const [esCorrecta, setEsCorrecta] = useState<boolean | null>(null);
    const [mostrarResultado, setMostrarResultado] = useState(false);
    const [juegoTerminado, setJuegoTerminado] = useState(false);

    useEffect(() =>{
        if(preguntasRespondidas===0 && !juegoTerminado){
            setPreguntasActual(preguntas[0]);
        }
    }, [preguntasRespondidas, juegoTerminado]);

    const Respuesta = (opcion:boolean) => {
        if (pregunaActual){
            setRespuestaSeleccionada(opcion);
            const isCorrect = opcion === pregunaActual.respuestaCorrecta
            setEsCorrecta(isCorrect);
            setMostrarResultado(true);

            if(isCorrect){
                incrementarPuntaje(pregunaActual.puntajePregunta)
            }
            incrementarPreguntas();
        }
    }

    const siguientePregunta = () => {
        const siguienteI = preguntasRespondidas;
        if (siguienteI<preguntas.length){
            setPreguntasActual(preguntas[siguienteI]);
            setRespuestaSeleccionada(null);
            setEsCorrecta(null);
            setMostrarResultado(false);
        }else{
            setJuegoTerminado(true);
        }
    }

    const reiniciar = ()=> {
        reiniciarJuego();
        setJuegoTerminado(false);
        setRespuestaSeleccionada(null),
        setEsCorrecta(null);
        setMostrarResultado(false);
        setPreguntasActual(preguntas[0]);
    }

    if (juegoTerminado){
        return (
            <div className='juegoTerminado'>
                <h2 className='tituloJuegoTerminado'>Juego Terminado</h2>
                <p className='puntajeFinal'>El puntaje Final es:</p>
                <p className='puntajeAcumulado'>{puntajeAcumulado}</p>
                <button className='botonJuegoTerminado' onClick={reiniciar}>Reiniciar Trivia</button>
            </div>
        );
    }    

    if (!pregunaActual) {
        return <div className='cargandoPreguntas'>Cargando Preguntas...</div>;
    }

    return (
        <div className='preguntas'>
            <h2 className='titutloPreguntas'>{pregunaActual.descripciomPregunta}</h2>
            <div className='botonesPreguntas'>
                <button onClick={() => Respuesta(true)} disabled={mostrarResultado} className={`botonCorrecta ${mostrarResultado && respuestaSeleccionada === true ? esCorrecta ? 'fondoVerde' : 'fondoRojo' : 'fondoAzul'}`}>Verdadero</button>
                <button onClick={() => Respuesta(false)} disabled={mostrarResultado} className={`btnFlasa ${mostrarResultado && respuestaSeleccionada === false ? esCorrecta ? 'fondoVerde': 'fondoRojo' : 'fondoAzul'}`}>Falso</button>
            </div>
            {mostrarResultado && (
                <div className={`Resultado ${esCorrecta ? 'textoVerde': 'textoRojo'}`}>
                    {esCorrecta ? 'CORRECTO': 'INCORRECTO'}
                </div>    
            )}
            {mostrarResultado && (
                <button onClick={siguientePregunta} className='botonSiguientePregunta'>
                    {preguntasRespondidas<preguntas.length ? 'siguiente pregunta' : 'ver resultados'}
                </button>
            )}
        </div>
            
    )
}

