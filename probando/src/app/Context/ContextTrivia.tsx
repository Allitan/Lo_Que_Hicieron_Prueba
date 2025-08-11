import {createContext} from 'react';
import { Pregunta } from '../Modelos/trivia';

export interface TriviaContextType {
    puntajeAcumulado: number;
    preguntasRespondidas: number;
    incrementarPuntaje: (puntos:number)=> void;
    incrementarPreguntas: () => void;
    reiniciarJuego: () => void;
}

export const contextTrivia = createContext<TriviaContextType>({
    puntajeAcumulado: 0,
    preguntasRespondidas: 0,
    incrementarPuntaje: () => {},
    incrementarPreguntas: () => {},
    reiniciarJuego: () => {}
})