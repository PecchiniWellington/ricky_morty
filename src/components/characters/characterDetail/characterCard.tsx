
import { ICharacter } from '../../../shared/shared.interfaces';
import './characterCard.style.css'
import InfoCharacterRow from './infoCharacterRow/infoCharacterRow';

type Props = {
  character: ICharacter,
  favouriteCard: boolean,
  onOpenDetail: () => void;
  sendToParent?: () => void;
  isFavourite?: boolean
}

const CharacterCard = ({ character, favouriteCard, onOpenDetail, sendToParent , isFavourite}: Props) => {

  return (
    <div className='containerCharacterCard'>
      <div className='character_info_container' onClick={onOpenDetail}>
        <img className='image_card' src={character.image} alt={character.name} />
        <div className='character_info'>
          <InfoCharacterRow infoKey="Name" info={character.name} />
          <InfoCharacterRow infoKey="Species" info={character.species} />
          <InfoCharacterRow infoKey="Status" info={character.status} />
        </div>

      </div>
      {
        !favouriteCard &&
        <span className="icon icon_favourite_container" onClick={sendToParent}>
          <i className="fa fa-heart icon_favourite" style={{ color: isFavourite ? 'red' : 'grey' }}></i>
        </span>
      }
    </div>
  )
}

export default CharacterCard