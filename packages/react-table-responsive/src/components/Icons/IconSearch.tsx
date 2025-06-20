export function IconSearch({
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
      <path d="M14 13.38L9.26 8.64a5.26 5.26 0 10-.62.62L13.38 14l.62-.62zM5.25 9.62A4.38 4.38 0 115.26.87a4.38 4.38 0 01-.01 8.77z" fill="currentColor" />
    </svg>
  )
}
