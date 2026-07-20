import type { AudioState } from '../hooks/useAmbientAudio'

interface AmbientAudioProps {
  state: AudioState
  onToggle: () => void
}

const LABELS: Record<AudioState, string> = {
  off: 'Turn on ambient sound',
  loading: 'Loading ambient sound',
  on: 'Turn off ambient sound',
  error: 'Sound could not be started — try again',
  unavailable: 'Ambient sound is not available yet',
}

const STATUS: Record<AudioState, string> = {
  off: 'Sound',
  loading: 'Loading',
  on: 'Sound on',
  error: 'Try again',
  unavailable: 'No sound yet',
}

/**
 * The fixed audio control — a small dark disc with a mint pulse when playing.
 *
 * Keyboard operable, disabled (not hidden) when the track is absent, and
 * announcing its state changes politely to assistive technology.
 */
export function AmbientAudio({ state, onToggle }: AmbientAudioProps) {
  const disabled = state === 'unavailable' || state === 'loading'
  const playing = state === 'on'

  return (
    <div className="audio">
      <button
        type="button"
        className="audio__button"
        data-state={state}
        onClick={onToggle}
        disabled={disabled}
        aria-pressed={playing}
        aria-label={LABELS[state]}
      >
        <svg className="audio__glyph" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          {/* A small moon that fills as sound comes on. */}
          <circle className="audio__pulse" cx="12" cy="12" r="4.5" fill="currentColor" stroke="none" />
          {playing ? (
            <>
              <path d="M12 5.5a6.5 6.5 0 0 1 0 13" opacity="0.75" />
              <path d="M12 8.5a3.5 3.5 0 0 1 0 7" opacity="0.5" />
            </>
          ) : (
            <circle cx="12" cy="12" r="7" opacity="0.55" />
          )}
        </svg>
        <span className="visually-hidden">{LABELS[state]}</span>
      </button>

      <span className="audio__status" aria-live="polite">
        {STATUS[state]}
      </span>
    </div>
  )
}
