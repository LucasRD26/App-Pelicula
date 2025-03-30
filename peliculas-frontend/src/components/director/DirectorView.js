import React, { useState, useEffect } from 'react';
import { createDirector, getDirectores, updateDirector } from '../../services/directorService';
import Swal from 'sweetalert2';
const moment = require('moment');

export const DirectorView = () => {

  const [ valuesForm, setValuesForm ] = useState({ nombre: '', estado: '' });
  const [ directores, setDirectores ] = useState([]);
  const { nombre, estado } = valuesForm;
  const [ directorSelect, setDirectorSelect ] = useState(null);

  const listDirectores = async () => {
    try {
      Swal.fire({
        allowOutsideClick: false,
        text: 'Cargando directores...'
      });
      Swal.showLoading();
      const resp = await getDirectores();
      setDirectores(resp.data);
      Swal.close();
    } catch (error) {
      console.error('Error al cargar directores:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudieron cargar los directores.'
      });
    }
  }

  useEffect(() => {
    listDirectores();
  }, [])

  const handleOnChange = (e) => {
    setValuesForm({ ...valuesForm, [e.target.name]: e.target.value });
  }

  const handlecreateDirector = async (e) => {
    e.preventDefault();
    try {
      Swal.fire({
        allowOutsideClick: false,
        text: 'Guardando...'
      });
      Swal.showLoading();
      
      if (directorSelect) {
        console.log(valuesForm); // Verifica si el estado es correcto
        await updateDirector(valuesForm, directorSelect);
        setDirectorSelect(null);
      } else {
        await createDirector(valuesForm);
      }
      setValuesForm({ nombre: '', estado: '' });
      listDirectores();
      Swal.close();
    } catch (error) {
      console.error('Error al guardar:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo guardar el director.'
      });
    }
  }

  const handleupdateDirector = async (e, director) => {
    e.preventDefault();
    setValuesForm(prevState => ({ ...prevState, nombre: director.nombre, estado: director.estado }));
    setDirectorSelect(director._id);
  }

  return (
    <div className='container-fluid mt-4'>
      <form onSubmit={(e) => handlecreateDirector(e)} >
        <div className="row">
          <div className="col-lg-8">
            <div className="mb-3">
              <label className="form-label">Nombre</label>
              <input required name='nombre' value={nombre} type="text" className="form-control"
                onChange={(e) => handleOnChange(e)} />
            </div>
          </div>
          <div className="col-lg-4">
            <div className="mb-3">
              <label className="form-label">Estado</label>
              <select required name='estado' value={estado} className="form-select" onChange={(e) => handleOnChange(e)} >
                <option value="">--SELECCIONE--</option>
                <option value="Activo">Activo</option>
                <option value="Inactivo">Inactivo</option>
              </select>
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
            <th scope="col">Estado</th>
            <th scope='col'>Fecha Creación</th>
            <th scope='col'>Fecha Actualización</th>
            <th scope='col'>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {
            directores.length > 0 && directores.map((director, index) => {
              return <tr key={director._id}>
                <th scope='row'> {index + 1} </th>
                <td> {director.nombre} </td>
                <td> {director.estado} </td>
                <td> {moment(director.createdAt).format('DD-MM-YYYY HH:mm')} </td>
                <td> {moment(director.updatedAt).format('DD-MM-YYYY HH:mm')} </td>
                <td><button className='btn btn-success btn-sm me-2' onClick={(e) => handleupdateDirector(e, director)}>Actualizar</button>
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

