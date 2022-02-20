import axios, { AxiosError, AxiosResponse } from 'axios'
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import Alert from '../../common/alert/alert'
import { AlertConstants } from '../../common/alert/alert.constants'
import { IAlert } from '../../common/alert/alert.interfaces'
import Modal from '../../common/modal/modal'
import Pagination from '../../common/pagination/pagination'
import SearchInput from '../../common/searchInput/searchInput'
import Spinner from '../../common/spinner/spinner'
import ErrorHandler from '../../utils/axiosErrorHandler'
import { StorageKey } from '../../shared/shared.constants'
import { ICharacterInfo } from './character.interfaces'
import CharacterCard from './characterDetail/characterCard'
import './characterList.style.css'
import { ICharacter, initialStateCharacter } from '../../shared/shared.interfaces'
import { QueryString } from '../../routes/queryString'
import { TypeInteractionStorage } from './character.enum'
import useLocalStorage from '../../utils/useLocalStorage'

export const initialCharacterInfo = {
  count: 0,
  next: '',
  pages: 0,
  prev: ''
}


const CharacterList = () => {
  const [, setLocalStorageValue] = useLocalStorage(StorageKey.Favourites, initialStateCharacter)
  const [favourite, setFavourite] = useState(JSON.parse(localStorage.getItem(StorageKey.Favourites) as any) || []) 
  const [charactersInfo, setCharactersInfo] = useState<ICharacterInfo>(initialCharacterInfo)
  const [openAlert, setOpenAlert] = useState<IAlert>({ open: false, message: '' })
  const [contentModal, setContentModal] = useState<ICharacter>(initialStateCharacter)
  const [characters, setCharacters] = useState<ICharacter[]>([initialStateCharacter])
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState<string>('')
  const [p, setP] = useState<number>(1)

  const pgQuery = searchParams.get(QueryString.Page) || ''
  const sendPage = (p: number) => {
    const page = (p + 1).toString();
    setSearchParams({ [QueryString.Page]: page })
    setP(p + 1)
  }

  const openDetail = (character?: ICharacter) => {
    const arr: string[] = []

    if (character) {
      character?.episode?.map(async (e: string) => {
        await axios.get(e).then((r: AxiosResponse) => {
          arr.push(r.data.name);
        }).catch(function (error: AxiosError) {
          const err = ErrorHandler(error)
          setOpenAlert(err)
        });

        const newContent = { ...character, episode: arr }
        setContentModal(newContent);

      })
      const newContent = { ...character, episode: arr }
      setContentModal(newContent);
    }

    setOpenModal(!openModal)
  }



  useEffect(() => {
    setIsLoading(true)
    axios.get(`https://rickandmortyapi.com/api/character?page=${p}`)
      .then((res: AxiosResponse) => {
        setIsLoading(false)
        const { results, info } = res.data;
        const characterList: ICharacter[] = results;
        const characterInfos = info;
        setCharacters(characterList)
        setCharactersInfo(characterInfos)
        setOpenAlert({ open: false, message: '' })
      }).catch(function (error: AxiosError) {
        const err = ErrorHandler(error)
        setIsLoading(false)
        setOpenAlert(err)
      });

  }, [p])

  const fetchEpisode = (character: ICharacter, type: string) => {
    const arr1: string[] = []
    character?.episode?.map(async (e: string) => {
      await axios.get(e).then((r: AxiosResponse) => {
        arr1.push(r.data.name);
      }).catch(function (error: AxiosError) {
        const err: IAlert = ErrorHandler(error)
        setOpenAlert(err)
      });

      if (type === TypeInteractionStorage.AddFirstElement) {
        const newContent = { ...character, episode: arr1 }
        setFavourite([newContent])
      }
      if (type === TypeInteractionStorage.ConcatNewEement) {
        const newContent = [...favourite, { ...character, episode: arr1 }]
        setFavourite(newContent)
      }
      if (type === TypeInteractionStorage.RemoveElement) {
        const newContent = favourite.filter((l: ICharacter) => {
          return l.id !== character.id
        })
        setFavourite(newContent)
      }
    })
  }

  const sendToFavourite = (ch: ICharacter) => {
    const findFavourite = favourite?.findIndex((l: ICharacter) => {
      return l.id === ch.id
    })

    if (favourite?.length === 0) fetchEpisode(ch, TypeInteractionStorage.AddFirstElement)
    if (favourite?.length >= 1 && findFavourite === -1) fetchEpisode(ch, TypeInteractionStorage.ConcatNewEement)
    if (favourite?.length >= 1 && findFavourite !== -1) fetchEpisode(ch, TypeInteractionStorage.RemoveElement)

  }

  useEffect(() => {
    setLocalStorageValue(favourite)
  }, [favourite, setLocalStorageValue])

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <Alert type={AlertConstants.Danger} message={openAlert.message} open={openAlert.open} />
      {contentModal && (
        <Modal open={openModal} onOpenModal={openDetail} contentModal={contentModal}/>
      )
      }

      <SearchInput value={search} onSearch={(e: string) => setSearch(e)} />
      {
        characters.length >= 1 ? characters?.filter((cha: ICharacter) => cha.name.toLowerCase().includes(search.toLocaleLowerCase())).map((character: ICharacter, i: number) =>
          <div key={i} className='character_list_container'>
            <CharacterCard
              isFavourite={favourite ? favourite?.find((l: ICharacter) => l.id === character.id) : false}
              sendToParent={() => sendToFavourite(character)}
              onOpenDetail={() => openDetail(character)}
              favouriteCard={false}
              character={character}
            />
          </div>
        ) : <div>No Character Here!</div>
      }
      <Pagination active={pgQuery || 1} sendPage={sendPage} limit={10} infos={charactersInfo} />
    </>
  )
}

export default CharacterList