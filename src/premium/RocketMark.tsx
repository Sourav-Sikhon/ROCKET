/** The Rocket paper-plane mark, as a single path so it can be tinted, blurred, scaled and moved freely. */
export function RocketMark({ className = '', fill = 'currentColor', style }: { className?: string; fill?: string; style?: React.CSSProperties }) {
  return (
    <svg aria-hidden viewBox="0 0 361 336" className={className} style={style} fill="none">
      <path d="M176.5 238.5L151 290.5L140 213.5L277 76L100 203.5L0 152.5L361 0L253.5 336L176.5 238.5Z" fill={fill} />
    </svg>
  )
}
