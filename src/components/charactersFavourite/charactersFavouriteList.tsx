import React, { useEffect, useState } from 'react'
import Modal from '../../common/modal/modal';
import SearchInput from '../../common/searchInput/searchInput';
import SimplePagination from '../../common/simplePagination/simplePagination';
import { StorageKey } from '../../shared/shared.constants';
import { ICharacter, initialStateCharacter } from '../../shared/shared.interfaces';
import useLocalStorage from '../../utils/useLocalStorage';
import CharacterCard from '../characters/characterDetail/characterCard';
import './charactersFavouriteList.style.css'


const CharactersFavouriteList = () => {

  const [contentModal, setContentModal] = useState<ICharacter>(initialStateCharacter)
  const [getLocalStorageValue] = useLocalStorage(StorageKey.Favourites, initialStateCharacter)
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [fav, setFav] = useState<ICharacter[]>([])
  const [search, setSearch] = useState<string>('')
  const [postsPerPage] = useState<number>(10);


  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = fav.length >= 1 ? fav?.slice(indexOfFirstPost, indexOfLastPost) : []

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Search character
  const currentCharacter = currentPosts?.filter((f: ICharacter) => {
    return f.name.toLowerCase().includes(search.toLowerCase())
  })

  const openDetail = (character?: ICharacter) => {
    if (character) {
      setContentModal(character)
    }
    setOpenModal(!openModal)
  }


  useEffect(() => {
    const data = getLocalStorageValue || []
    if (data.length >= 1) {
      setFav(data)
    } else {
      setFav([])
    }
  }, [])
  return (
    <>
      {contentModal && <Modal open={openModal} onOpenModal={openDetail} contentModal={contentModal}/>}
      <SearchInput value={search} onSearch={(s: string) => setSearch(s)} />
      {currentCharacter.length >= 1 ? currentCharacter?.map((character: ICharacter, i: number) =>
        <div key={i} className='character_favourite_list_container'>
          <CharacterCard onOpenDetail={() => openDetail(character)} favouriteCard={true} character={character} />
        </div>
      ) : <div>No favorite characters yet</div>}
      <SimplePagination
        postsPerPage={postsPerPage}
        totalPosts={search ? currentCharacter.length : fav.length}
        paginate={paginate}
      />
    </>
  )
}

export default CharactersFavouriteList