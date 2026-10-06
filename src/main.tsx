import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ExperienceRouter } from './components/ExperienceRouter'
import './styles/global.css'
import './styles/typography.css'
import './styles/atmosphere.css'

const container = document.getElementById('root')
if (!container) throw new Error('Root container #root was not found in the document.')

createRoot(container).render(
  <StrictMode>
    <ExperienceRouter />
  </StrictMode>,
)
