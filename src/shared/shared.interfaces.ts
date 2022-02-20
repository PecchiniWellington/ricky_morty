export interface ICharacter  {
  created: string
  episode: string[]
  gender: string
  id: number
  image: string
  location: ILocation
  name:string
  origin: IOrigin
  species: string
  status: string
  type: string
  url: string
}

export const initialStateCharacter =  {
  created: "",
  episode: [],
  gender: "",
  id: 0,
  image: '',
  location: {
    name: '',
    url: ''
  },
  name:'',
  origin: {
    name: '',
    url: ''
  },
  species: '',
  status: '',
  type: '',
  url: '',
}

export interface ILocation{
  name: string,
  url: string
}
export interface IOrigin{
  name: string,
  url: string
}