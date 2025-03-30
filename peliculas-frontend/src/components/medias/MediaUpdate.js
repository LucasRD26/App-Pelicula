import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getMediaForId, updateMedia } from '../../services/mediaService';
import { getDirectores } from '../../services/directorService';
import { getProductoras } from '../../services/productoraService';
import { getGeneros } from '../../services/generoService';
import { getTipos } from '../../services/tipoService';
import Swal from 'sweetalert2';

export const MediaUpdate = () => {

  const { mediaId = '' } = useParams();
  const [ media, setMedia] = useState();
  const [ directores, setDirectores ] = useState([]);
  const [ generos, setGeneros ] = useState([]);
  const [ productoras, setProductoras ] = useState([]);
  const [ tipos, setTipos ] = useState([]);
  const [ valoresForm, setValoresForm ] = useState([]);
  const { serial = '', titulo = '', sipnosis = '', peliculaURL = '', 
    fotoPortada = '', añoEstreno = '', tipo, director, genero, productora } = valoresForm

  
  const listTipos = async () => {
      try {
        const { data } = await getTipos();
        setTipos(data);
  
      } catch (error){
        console.log(error);
        
      }
    }
  
    useEffect(() => {
      listTipos();
    }, []);
  
  
    const listDirectores = async () => {
      try {
        const { data } = await getDirectores();
        setDirectores(data);
  
      } catch (error){
        console.log(error);
        
      }
    }
  
    useEffect(() => {
      listDirectores();
    }, []);
  
  
    const listgeneros = async () => {
      try {
        const { data } = await getGeneros();
        setGeneros(data);
  
      } catch (error){
        console.log(error);
        
      }
    }
  
    useEffect(() => {
      listgeneros();
    }, []);
  
    const listproductoras = async () => {
        try {
          const { data } = await getProductoras();
          setProductoras(data);
    
        } catch (error){
          console.log(error);
          
        }
      }
    
      useEffect(() => {
        listproductoras();
      }, []);
      
    const getMedia = async () => {
    try {
      const { data } = await getMediaForId(mediaId);
      console.log(data);
      
      setMedia(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getMedia();
  }, [mediaId]);


  useEffect(() => {
    if (media) {
      setValoresForm({
        serial: media.serial,
        titulo: media.titulo,
        sipnosis: media.sipnosis,
        peliculaURL: media.peliculaURL,
        fotoPortada: media.fotoPortada,
        añoEstreno: media.añoEstreno,
        tipo: media.tipo,
        director: media.director,
        genero: media.genero,
        productora: media.productora 
      });
    }
  }, [media]);


    
  const handleOnChange = ({ target }) => {
    const { name, value } = target;
    setValoresForm({ ...valoresForm, [name]: value });
  }  

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const media = {
      serial, titulo, sipnosis, peliculaURL, fotoPortada, 
      añoEstreno, 
      tipo: {
        _id: tipo
      },
      director: {
        _id: director
      },
      genero: {
        _id: genero
      },
      productora: {
        _id: productora
      }
    }
    console.log(media);

    try {

      Swal.fire({
        allowOutsideClick: false,
        text: 'Cargado...'
      });
      Swal.showLoading();
      const { data } = await updateMedia(mediaId, media);
      Swal.close();

    } catch (error) {
      console.log(error);
      Swal.close();
    }
  }



  return (
    <div className='container-fluid mt-3 mb-2'>
      <div className='card'>
        <div className='card-header'>
          <h5 className='card-title'>Detalle de la pelicula</h5>
        </div>
        <div className='card-body'>
          <div className='row'>
            <div className='col-md-4'>
              <img src={media?.fotoPortada} />
            </div>
            <div className='col-md-8'>
              <form onSubmit={(e) => handleOnSubmit(e)}>
                <div className='row'>

                  <div className='col'>
                    <div className="mb-3">
                      <label className="form-label">Serial</label>
                      <input type="text" name='serial'
                        value={serial}
                        onChange={e => handleOnChange(e)}
                        required
                        className='form-control' />
                    </div>
                  </div>

                  <div className='col'>
                    <div className="mb-3">
                      <label className="form-label">titulo </label>
                      <input type="text" name='titulo'
                        value={titulo}
                        onChange={e => handleOnChange(e)}
                        required
                        className='form-control' />
                    </div>
                  </div>

                  <div className='col'>
                    <div className="mb-3">
                      <label className="form-label">Sipnosis </label>
                      <input type="text" name='sipnosis'
                        value={sipnosis}
                        onChange={e => handleOnChange(e)}
                        required
                        className='form-control' />
                    </div>
                  </div>

                  <div className='col'>
                    <div className="mb-3">
                      <label className="form-label">peliculaURL </label>
                      <input type="text" name='peliculaURL'
                        value={peliculaURL}
                        onChange={e => handleOnChange(e)}
                        required
                        className='form-control' />
                    </div>
                  </div>
                </div>

                <div className='row'>
                  <div className='col'>
                    <div className="mb-3">
                      <label className="form-label">Foto </label>
                      <input type="url" name='fotoPortada'
                        value={fotoPortada}
                        onChange={e => handleOnChange(e)}
                        required
                        className='form-control' />
                    </div>
                  </div>
                  <div className='col'>
                    <div className="mb-3">
                      <label className="form-label">año de Estreno </label>
                      <input type="text" name='añoEstreno'
                        value={añoEstreno}
                        onChange={e => handleOnChange(e)}
                        required
                        className='form-control' />
                    </div>
                  </div>
                  <div className='col'>
                    <div className="mb-3">
                      <label className="form-label">Director </label>
                      <select className='form-select'
                        required
                        name='director'
                        value={director}
                        onChange={e => handleOnChange(e)}>
                        <option value="">--SELECCIONE--</option>
                        {
                          directores.map(({ _id, nombre }) => {
                            return <option key={_id} value={_id}>{nombre}</option>
                          })
                        }
                      </select>
                    </div>
                  </div>
                </div>

                <div className='row'>
                  <div className='col'>
                    <div className="mb-3">
                      <label className="form-label">Genero </label>
                      <select className='form-select'
                        required
                        name='genero'
                        value={genero}
                        onChange={e => handleOnChange(e)}>
                        <option value="">--SELECCIONE--</option>
                        {
                          generos.map(({ _id, nombre }) => {
                            return <option key={_id} value={_id}>{nombre}</option>
                          })
                        }
                      </select>
                    </div>
                  </div>
                  <div className='col'>
                    <div className="mb-3">
                      <label className="form-label">Productora </label>
                      <select className='form-select'
                        required
                        name='productora'
                        value={productora}
                        onChange={e => handleOnChange(e)}>
                        <option value="">--SELECCIONE--</option>
                        {
                          productoras.map(({ _id, nombre }) => {
                            return <option key={_id} value={_id}>{nombre}</option>
                          })
                        }
                      </select>
                    </div>
                  </div>
                  <div className='col'>
                    <div className="mb-3">
                      <label className="form-label">Tipo de Media </label>
                      <select className='form-select'
                        required
                        name='tipo'
                        value={tipo}
                        onChange={e => handleOnChange(e)}>
                        <option value="">--SELECCIONE--</option>
                        {
                          tipos.map(({ _id, nombre }) => {
                            return <option key={_id} value={_id}>{nombre}</option>
                          })
                        }
                      </select>
                    </div>
                  </div>
                </div>
                <div className='row'>
                  <div className='col'>
                    <button className="btn btn-primary">Guardar</button>
                  </div>

                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

