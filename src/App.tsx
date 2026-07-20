import { useEffect } from 'react'
import { AmbientAudio } from './components/AmbientAudio'
import { AtmosphereLayer } from './components/AtmosphereLayer'
import { ChapterProgress } from './components/ChapterProgress'
import { FinalDedication } from './components/FinalDedication'
import { RibbonTrail, TouchShimmer } from './components/RibbonTrail'
import { SiteIntro } from './components/SiteIntro'
import { StoryChapter } from './components/StoryChapter'
import { AUDIO, asset } from './config'
import { chapters } from './content/story'
import { useActiveChapter } from './hooks/useActiveChapter'
import { useAmbientAudio } from './hooks/useAmbientAudio'
import { useDocumentVisible, useReducedMotion } from './hooks/useReducedMotion'

export default function App() {
  const reducedMotion = useReducedMotion()
  const documentVisible = useDocumentVisible()
  const { activeIndex, hasStarted, register } = useActiveChapter(chapters.length)

  const audio = useAmbientAudio({
    src: asset(AUDIO.src),
    volume: AUDIO.volume,
    fadeDuration: AUDIO.fadeDuration,
    loop: AUDIO.loop,
  })

  const activeChapter = hasStarted ? chapters[activeIndex] ?? null : null

  // Nudge the ambient volume toward the active chapter's level. Subtle, and a
  // no-op unless the reader has enabled sound.
  const setLevel = audio.setLevel
  useEffect(() => {
    setLevel(activeChapter?.audioLevel ?? 0.4)
  }, [activeChapter, setLevel])

  const pointerMagicActive = Boolean(activeChapter?.pointerMagic)

  return (
    <>
      <a className="skip-link" href="#awakening">
        Skip to the story
      </a>

      <AtmosphereLayer
        chapter={activeChapter}
        hasStarted={hasStarted}
        reducedMotion={reducedMotion}
        documentVisible={documentVisible}
      />

      <RibbonTrail active={pointerMagicActive} />
      <TouchShimmer active={pointerMagicActive} />

      <div className="page">
        <SiteIntro />

        <main className="story">
          {chapters.map((chapter, index) => (
            <StoryChapter key={chapter.id} chapter={chapter} registerRef={register(index)} />
          ))}
        </main>

        <FinalDedication />
      </div>

      <ChapterProgress chapters={chapters} activeIndex={activeIndex} visible={hasStarted} />

      <AmbientAudio state={audio.state} onToggle={audio.toggle} />
    </>
  )
}
