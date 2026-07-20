interface ImagePlaceholderProps {
  /** The file the reader still needs to supply, e.g. images/07-wonderland.jpg */
  file: string
}

/**
 * Shown in place of a story plate that has not been added yet.
 *
 * It occupies the exact space the real image will occupy, so adding the file
 * later causes no layout shift — and it names the missing file, so the gap is
 * self-documenting rather than mysterious.
 */
export function ImagePlaceholder({ file }: ImagePlaceholderProps) {
  return (
    <div className="placeholder" role="img" aria-label={`Image not yet added: ${file}`}>
      <span className="placeholder__mark" aria-hidden="true">
        Plate awaiting
      </span>
      <span className="placeholder__file" aria-hidden="true">
        {file}
      </span>
      <span className="placeholder__hint" aria-hidden="true">
        Add this file to the public folder and it will appear here.
      </span>
    </div>
  )
}
