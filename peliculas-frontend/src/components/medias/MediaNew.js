import React, { useState, useEffect } from 'react'
import { getDirectores } from '../../services/directorService';
import { getProductoras } from '../../services/productoraService';
import { getGeneros } from '../../services/generoService';
import { getTipos } from '../../services/tipoService';
import { createMedia } from '../../services/mediaService';
import Swal from 'sweetalert2';


export const MediaNew = ({ handleOpenModal, listMedias }) => {

  const [ tipos, setTipos ] = useState([]);
  const [ directors, setDirectores ] = useState([]);
  const [ generos, setGeneros ] = useState([]);
  const [ productoras, setProductoras ] = useState([]);
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
      const { data } = await createMedia(media);
      handleOpenModal();
      listMedias();
      Swal.close();

    } catch (error) {
      console.log(error);
      Swal.close();
    }
  }

  return (
    <div className='sidebar'>
      <div className='container-fluid'>
        <div className='row'>
          <div className='col'>
            <div className='sidebar-header'>
              <h3>Nueva Pelicula</h3>
              <i className="fa-solid fa-xmark" onClick={handleOpenModal}></i>
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col'>
            <hr />
          </div>
        </div>
        <form onSubmit={(e) => handleOnSubmit(e)}>
          <div className='row'>

            <div className='col'>
              <div className="mb-3">
                <label className="form-label">Serial</label>
                <input genero="text" name='serial'
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
                <label className="form-label">Año de estreno </label>
                <input type="text" name='añoEstreno'
                  value={añoEstreno}
                  onChange={e => handleOnChange(e)}
                  required
                  className='form-control' />
              </div>
            </div>
            <div className='col'>
              <div className="mb-3">
                <label className="form-label">Tipo </label>
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
              <div className="mb-3">
                <label className="form-label">Director </label>
                <select className='form-select'
                  required
                  name='director'
                  value={director}
                  onChange={e => handleOnChange(e)}>
                  <option value="">--SELECCIONE--</option>
                  {
                    directors.map(({ _id, nombre }) => {
                      return <option key={_id} value={_id}>{nombre}</option>
                    })
                  }
                </select>
              </div>
            </div>
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
                <label className="form-label">Productora</label>
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
          </div>
          <div className='row'>
            <div className='col'>
              <button className="btn btn-primary">Guardar</button>
            </div>

          </div>
        </form>
      </div>
    </div>
  )
}

