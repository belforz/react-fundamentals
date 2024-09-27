import { useState } from "react";
import React from "react";


// Mudança de estado(renderização de componentes)
export function Counter(){
    let [counter,SetCounter] = useState(0);

    // usa-se let para as variaveis de mudança de estado e dar um parametro de função para ser utilizada pelo UseState

    function increment(){
        SetCounter(counter ++);
    };

    return (
        <div>
            <h2> {counter}
                <button type="button" onClick={increment}>Incremente</button>
            </h2>
        </div>
    );
};