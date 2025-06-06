import React from 'react'
import { Link } from 'react-router-dom';

export const MediaCard = (props) => {

    const { media } = props ;

  return (
    <div className="col">
        <div className="card">
            <img src={media.fotoPortada} className="card-img-top" alt="..." />
            <div className="card-body">
                <h5 className="card-title">Caracteristicas</h5>
                <hr/>
                <p className="card-text">{`Titulo: ${media.titulo}`}</p>
                <p className="card-text">{`productora: ${media.productora.nombre}`}</p>
                <p className="card-text">{`sipnosis: ${media.sipnosis}`}</p>
                <p className="card-text">{`Estreno: ${media.añoEstreno}`}</p>
                <p className="card-text">{`genero: ${media.genero.nombre}`}</p>
                <p className="card-text">{`director: ${media.director.nombre}`}</p>
                <p className="card-text">{`Tipo: ${media.tipo.nombre}`}</p>
                <p className="card-text">
                  <Link to = {`medias/edit/${media._id}`}>Ver mas</Link>
                </p>
            </div>
        </div>
    </div>
  )
}
