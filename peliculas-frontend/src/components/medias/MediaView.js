import React, {useState, useEffect} from 'react'
import { getMedias } from '../../services/mediaService';
import { MediaCard } from '../medias/MediaCard';
import { MediaNew } from './MediaNew';


export const MediaView = () => {

  const [ medias, setMedia ] = useState([]);
  const [ openModal, setOpenModal ] = useState(false);

  const listMedias = async () => {
    try {
      
      const { data } = await getMedias();
      console.log(data);
      setMedia(data);

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() =>{
    listMedias();
  }, []);

  const handleOpenModal = () => {
    setOpenModal(!openModal)
  }

  return (
    <div className='container-fluid'>
      <div className="mt-2 mb-2 row row-cols-1 row-cols-md-4 g-4">
        {
          medias.map((media) => {
            return <MediaCard key = { media._id } media = { media } />
          })
        }
      </div>
      {
        openModal ? <MediaNew 
        handleOpenModal = { handleOpenModal } 
        listMedias = { listMedias } />:
        <button className='btn btn-primary newMedia' onClick={ handleOpenModal }>
        <i className="fa-solid fa-plus"></i>
        </button>
      }  

    </div>
  )
}
