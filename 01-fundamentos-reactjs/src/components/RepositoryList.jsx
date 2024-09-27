import { RepositoryItem } from "./RepositoryItem";
import React, { useState,useEffect } from "react";
import '../styles/repositories.scss'


export function RepositoryList(){
    const [repositories, setRepositories] = useState([]);

    useEffect(() =>{
        fetch('https://api.github.com/users/belforz/repos')
        .then(Response => Response.json())
        .then(data => setRepositories(data));

    },[]);




    return (
        <section className="repository-list">
            <h1>Lista de Repositório</h1>
            <ul>
                {repositories.map(repository =>{
                    return <RepositoryItem key={repository.name}repository={repository}/> 
                })}
                
                {/* chama-se a argumentacao por meio das propriedades */}
                {/* Lembrando que o pai <repository> acessa o filho <RepositoryItem> */}
               

            </ul>
        </section>
    )
}