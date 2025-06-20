export function IconCross({
  className,
  dataCy,
}: {
  className?: string;
  dataCy?: string
}) {
  return (
    <svg
      className={className}
      data-cy={dataCy}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 14 14"
    >
      <path d="M14 .82L13.18 0 7 6.18.82 0 0 .82 6.18 7 0 13.18l.82.82L7 7.82 13.18 14l.82-.82L7.82 7 14 .82z" fill="currentColor" />
    </svg>
  )
}
