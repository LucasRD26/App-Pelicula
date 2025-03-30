import React, { useState, useEffect } from 'react';
import { createProductora, getProductoras, updateProductora } from '../../services/productoraService';
import Swal from 'sweetalert2';
const moment = require('moment');

export const ProductoraView = () => {

  const [ valuesForm, setValuesForm ] = useState({ nombre: '', estado: '', descripcion: '', slogan: '' });
  const [ generos, setGeneros ] = useState([]);
  const { nombre, estado, descripcion, slogan } = valuesForm;
  const [ generoSelect, setgeneroSelect ] = useState(null);

  const listGeneros = async () => {
    try {
      Swal.fire({
        allowOutsideClick: false,
        text: 'Cargando generoes...'
      });
      Swal.showLoading();
      const resp = await getProductoras();
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

  const handlecreateProductora = async (e) => {
    e.preventDefault();
    try {
      Swal.fire({
        allowOutsideClick: false,
        text: 'Guardando...'
      });
      Swal.showLoading();
      
      if (generoSelect) {
        console.log(valuesForm); // Verifica si el estado es correcto
        await updateProductora(valuesForm, generoSelect);
        setgeneroSelect(null);
      } else {
        await createProductora(valuesForm);
      }
      setValuesForm({ nombre: '', estado: '', descripcion: '', slogan: '' });
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

  const handleupdateProductora = async (e, genero) => {
    e.preventDefault();
    setValuesForm(prevState => ({ ...prevState, nombre: genero.nombre, estado: genero.estado, descripcion: genero.descripcion, slogan: genero.slogan  }));
    setgeneroSelect(genero._id);
  }

  return (
    <div className='container-fluid mt-4'>
      <form onSubmit={(e) => handlecreateProductora(e)} >
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
          <div className="col-lg-8">
            <div className="mb-3">
              <label className="form-label">Descripcion</label>
              <input required name='descripcion' value={descripcion} type="text" className="form-control"
                onChange={(e) => handleOnChange(e)} />
            </div>
          </div>
          <div className="col-lg-4">
            <div className="mb-3">
              <label className="form-label">Slogan</label>
              <input required name='slogan' value={slogan} type="text" className="form-control"
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
            <th scope="col">Estado</th>
            <th scope="col">Descripcion</th>
            <th scope="col">Slogan</th>
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
                <td> {genero.estado} </td>
                <td> {genero.descripcion} </td>
                <td> {genero.slogan} </td>
                <td> {moment(genero.createdAt).format('DD-MM-YYYY HH:mm')} </td>
                <td> {moment(genero.updatedAt).format('DD-MM-YYYY HH:mm')} </td>
                <td><button className='btn btn-success btn-sm me-2' onClick={(e) => handleupdateProductora(e, genero)}>Actualizar</button>
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
