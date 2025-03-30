import React, { useState, useEffect } from 'react';
import { createTipo, getTipos, updateTipo } from '../../services/tipoService';
import Swal from 'sweetalert2';
const moment = require('moment');

export const TipoView = () => {

  const [ valuesForm, setValuesForm ] = useState({ nombre: '', descripcion: '' });
  const [ generos, setGeneros ] = useState([]);
  const { nombre, descripcion } = valuesForm;
  const [ generoSelect, setgeneroSelect ] = useState(null);

  const listGeneros = async () => {
    try {
      Swal.fire({
        allowOutsideClick: false,
        text: 'Cargando generoes...'
      });
      Swal.showLoading();
      const resp = await getTipos();
      setGeneros(resp.data);
      Swal.close();
    } catch (error) {
      console.error('Error al cargar generoes:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudieron cargar los generoes.'
      });
    }
  }

  useEffect(() => {
    listGeneros();
  }, [])

  const handleOnChange = (e) => {
    setValuesForm({ ...valuesForm, [e.target.name]: e.target.value });
  }

  const handlecreateTipo = async (e) => {
    e.preventDefault();
    try {
      Swal.fire({
        allowOutsideClick: false,
        text: 'Guardando...'
      });
      Swal.showLoading();
      
      if (generoSelect) {
        console.log(valuesForm); // Verifica si el estado es correcto
        await updateTipo(valuesForm, generoSelect);
        setgeneroSelect(null);
      } else {
        await createTipo(valuesForm);
      }
      setValuesForm({ nombre: '', descripcion: '' });
      listGeneros();
      Swal.close();
    } catch (error) {
      console.error('Error al guardar:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo guardar el genero.'
      });
    }
  }

  const handleupdateTipo = async (e, genero) => {
    e.preventDefault();
    setValuesForm(prevState => ({ ...prevState, nombre: genero.nombre, descripcion: genero.descripcion  }));
    setgeneroSelect(genero._id);
  }

  return (
    <div className='container-fluid mt-4'>
      <form onSubmit={(e) => handlecreateTipo(e)} >
        <div className="row">
          <div className="col-lg-4">
            <div className="mb-3">
              <label className="form-label">Nombre</label>
              <input required name='nombre' value={nombre} type="text" className="form-control"
                onChange={(e) => handleOnChange(e)} />
            </div>
          </div>
          <div className="col-lg-8">
            <div className="mb-3">
              <label className="form-label">Descripcion</label>
              <input required name='descripcion' value={descripcion} type="text" className="form-control"
                onChange={(e) => handleOnChange(e)} />
            </div>
          </div>
        </div>
        <button className="btn btn-primary mb-3">Guardar</button>
      </form>

      <table className='table'>
      <thead>
          <tr>
            <th scope='row'>#</th>
            <th scope="col">Nombre</th>
            <th scope="col">Descripcion</th>
            <th scope='col'>Fecha Creación</th>
            <th scope='col'>Fecha Actualización</th>
            <th scope='col'>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {
            generos.length > 0 && generos.map((genero, index) => {
              return <tr key={genero._id}>
                <th scope='row'> {index + 1} </th>
                <td> {genero.nombre} </td>
                <td> {genero.descripcion} </td>
                <td> {moment(genero.createdAt).format('DD-MM-YYYY HH:mm')} </td>
                <td> {moment(genero.updatedAt).format('DD-MM-YYYY HH:mm')} </td>
                <td><button className='btn btn-success btn-sm me-2' onClick={(e) => handleupdateTipo(e, genero)}>Actualizar</button>
                  <button className='btn btn-danger btn-sm'>Eliminar</button>
                </td>
              </tr>
            })
          }
        </tbody>
      </table>

    </div>
  )
}