import React from "react"
export function RepositoryItem(props) // argumentacao para criação de propriedas
{

    return(
        <li>               
                    {/* <strong> {props.repository?.name ?? 'Default'} </strong> Argumentacao para chamada de propriedades de uma const */}
                    <strong> {props.repository.name} </strong> 
                    
                   
                    <p>{props.repository.description}</p>
                    <a href={props.repository.html_url}>Acessar Reposítório </a>
                </li>

    )
}