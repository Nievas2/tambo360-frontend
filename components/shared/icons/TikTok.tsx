interface ITikTokProps {
  className?: string
}

const TikTok = ({ className }: ITikTokProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M12.525.02c1.31 0 2.591.214 3.75.606V6.28a8.171 8.171 0 0 1-4.75-1.548v8.749a5.692 5.692 0 1 1-5.692-5.692c.314 0 .611.025.906.075V12.1a3.442 3.442 0 1 0 2.536 3.279V0h3.25z" />
    </svg>
  )
}

export default TikTok
