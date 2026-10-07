import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import MoonSite from './MoonSite'
import './styles/moon.css'
import './styles/passage.css'
import './styles/journal.css'
createRoot(document.getElementById('root')!).render(<StrictMode><MoonSite /></StrictMode>)

import './styles/journeys.css'

import './styles/moon-mark.css'
