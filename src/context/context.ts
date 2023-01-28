import { createContext } from 'react'
import { IContext } from '../models/contextModel'

const defaultContext = {
  user: '',
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setUser: () => {},
}

const Context = createContext<IContext>(defaultContext)

export { Context }
