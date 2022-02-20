import React from 'react'
import { ICharacter } from '../../shared/shared.interfaces'
import './modal.style.css'

type Props = {
  open: boolean,
  onOpenModal: () => void,
  contentModal: ICharacter
}

const Modal = ({ open, onOpenModal, contentModal }: Props) => {
  return (
    <div className="modal" style={{ display: open ? 'flex' : 'none' }}>
      <div className="modal-content">
        <span onClick={onOpenModal} className="close_modal">&times;</span>
        <div className='modal_image_container'>
          <img src={contentModal.image} alt={contentModal.name} className="modal_image" />

        </div>
        <h1>{contentModal.name}</h1>
        <div className='bios'>
          <h3>Status:</h3>
          <p className="title">{contentModal.status}</p>
        </div>
        <div className='bios'>
          <h3>Species:</h3>
        <p>{contentModal.species}</p>
        </div>
        <hr />

        <h3 >Episodes</h3>
        <div id="episodes" className='episodes_list'>
          {contentModal.episode && contentModal.episode.length >= 1 ? contentModal?.episode?.map((ep: string, i: number) => {
            return (
              <div key={`episodes${i}`} className='single_episode' >
                <span>{i + 1}</span>
                <div id={`episodes${i}`}>{ep}</div>
              </div>
            )
          }) : <div>No episodes here</div>}
        </div>
      </div>

    </div>

  )
}

export default Modal