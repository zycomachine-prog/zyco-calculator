import {
  useEffect,
  useState,
} from 'react'

const initialSheet =
  'M44 232 H316 V248 H44 Z'

const processGeometry = {
  air: {
    punchTravel: 110,
    sheetFormed:
      'M44 220 L120 236 Q152 240 174 267 Q180 274 186 267 Q208 240 240 236 L316 220 L316 236 L240 252 Q208 256 186 283 Q180 290 174 283 Q152 256 120 252 L44 236 Z',
    sheetReleased:
      'M44 222 L120 236 Q152 240 174 260 Q180 267 186 260 Q208 240 240 236 L316 222 L316 238 L240 252 Q208 256 186 276 Q180 283 174 276 Q152 256 120 252 L44 238 Z',
  },
  bottoming: {
    punchTravel: 140,
    sheetFormed:
      'M44 220 L120 236 L170 300 Q180 310 190 300 L240 236 L316 220 L316 236 L240 252 L190 316 Q180 326 170 316 L120 252 L44 236 Z',
    sheetReleased:
      'M44 221 L120 236 L170 296 Q180 306 190 296 L240 236 L316 221 L316 237 L240 252 L190 312 Q180 322 170 312 L120 252 L44 237 Z',
  },
  coining: {
    punchTravel: 149,
    sheetFormed:
      'M44 220 L120 236 L174 310 Q180 316 186 310 L240 236 L316 220 L316 236 L240 252 L186 324 Q180 330 174 324 L120 252 L44 236 Z',
    sheetReleased:
      'M44 220 L120 236 L174 309 Q180 315 186 309 L240 236 L316 220 L316 236 L240 252 L186 323 Q180 329 174 323 L120 252 L44 236 Z',
  },
}

function ProcessCell({
  kind,
  x,
  labels,
  reduceMotion,
}) {
  const geometry = processGeometry[kind]
  const isAir = kind === 'air'
  const isBottoming = kind === 'bottoming'
  const title = labels[kind].title
  const formedSheet = reduceMotion ? geometry.sheetFormed : initialSheet
  const punchTransform = reduceMotion ? `translate(0 ${geometry.punchTravel})` : undefined

  return (
    <g transform={`translate(${x} 0)`}>
      <rect className='zyco-method-motion__cell' x='0' y='6' width='360' height='398' rx='18' />
      <text className='zyco-method-motion__method' x='20' y='34'>{title}</text>
      <text className='zyco-method-motion__note' x='20' y='54'>{labels[kind].force}</text>

      <path className='zyco-method-motion__die' d='M28 252 H120 L180 330 L240 252 H332 V360 H28 Z' />
      <path className='zyco-method-motion__die-edge' d='M120 252 L180 330 L240 252' />

      <g
        className='zyco-method-motion__punch'
        transform={punchTransform}
      >
        <rect x='139' y='66' width='82' height='48' rx='7' />
        <path d={isAir ? 'M150 114 H210 L188 160 Q180 168 172 160 Z' : isBottoming ? 'M148 114 H212 L188 160 Q180 170 172 160 Z' : 'M150 114 H210 L185 163 Q180 169 175 163 Z'} />
        {!reduceMotion && (
          <animateTransform
            attributeName='transform'
            type='translate'
            dur='9s'
            repeatCount='indefinite'
            calcMode='spline'
            keyTimes='0;0.2;0.52;0.68;1'
            keySplines='0.4 0 0.2 1;0.4 0 0.2 1;0.4 0 0.2 1;0.4 0 0.2 1'
            values={`0 0;0 0;0 ${geometry.punchTravel};0 34;0 0`}
          />
        )}
      </g>

      <path className='zyco-method-motion__sheet' d={formedSheet}>
        {!reduceMotion && (
          <animate
            attributeName='d'
            dur='9s'
            repeatCount='indefinite'
            calcMode='spline'
            keyTimes='0;0.2;0.52;0.68;1'
            keySplines='0.4 0 0.2 1;0.4 0 0.2 1;0.4 0 0.2 1;0.4 0 0.2 1'
            values={`${initialSheet};${initialSheet};${geometry.sheetFormed};${geometry.sheetReleased};${initialSheet}`}
          />
        )}
      </path>

      {kind === 'coining' && (
        <g className={`zyco-method-motion__imprint${reduceMotion ? ' zyco-method-motion__visible' : ''}`}>
          <path d='M168 305 Q180 320 192 305' />
          <path d='M172 311 Q180 319 188 311' />
        </g>
      )}

      <g className={`zyco-method-motion__contact zyco-method-motion__contact--${kind}${reduceMotion ? ' zyco-method-motion__visible' : ''}`}>
        <circle cx='120' cy='252' r='4' />
        <circle cx='240' cy='252' r='4' />
        {!isAir && <path d='M136 272 L180 326 L224 272' />}
        {isAir && <circle cx='180' cy='274' r='4' />}
      </g>

      <g className={`zyco-method-motion__formed-callout${reduceMotion ? ' zyco-method-motion__visible' : ''}`}>
        <path className='zyco-method-motion__leader' d='M120 252 L16 224 V100 H24' />
        <text className='zyco-method-motion__callout' x='24' y='94'>
          {labels[kind].contact}
        </text>
      </g>

      <g className={`zyco-method-motion__springback zyco-method-motion__springback--${kind}`}>
        <path className='zyco-method-motion__leader' d='M244 238 L298 178' />
        <text className='zyco-method-motion__callout' x='210' y='170'>
          {labels[kind].springback}
        </text>
      </g>

      <g className={`zyco-method-motion__radius${reduceMotion ? ' zyco-method-motion__visible' : ''}`}>
        <path className='zyco-method-motion__leader' d='M186 286 L218 292' />
        <text className='zyco-method-motion__callout' x='222' y='296'>
          {labels[kind].radius}
        </text>
      </g>
    </g>
  )
}

export default function BottomingVsCoiningMotionDiagram({ labels }) {
  const [reduceMotion, setReduceMotion] = useState(false)

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updatePreference = () => setReduceMotion(query.matches)

    updatePreference()
    query.addEventListener?.('change', updatePreference)

    return () => query.removeEventListener?.('change', updatePreference)
  }, [])

  return (
    <section className='zyco-method-motion' aria-labelledby='method-motion-title'>
      <style>
        {`
          .zyco-method-motion {
            padding: 24px;
            border: 1px solid rgba(147, 197, 253, 0.22);
            border-radius: 28px;
            background:
              radial-gradient(circle at 50% 38%, rgba(125, 211, 252, 0.18), transparent 34%),
              linear-gradient(145deg, rgba(18, 55, 105, 0.84), rgba(6, 24, 50, 0.88));
            box-shadow: 0 20px 54px rgba(2, 8, 23, 0.22);
          }
          .zyco-method-motion__title {
            margin: 0;
            color: #fff;
            font-size: 23px;
            font-weight: 850;
          }
          .zyco-method-motion__intro {
            max-width: 850px;
            margin: 10px 0 20px;
            color: #dbeafe;
            line-height: 1.7;
          }
          .zyco-method-motion__frame {
            overflow-x: auto;
            border: 1px solid rgba(147, 197, 253, 0.18);
            border-radius: 20px;
            background:
              linear-gradient(rgba(147, 197, 253, 0.055) 1px, transparent 1px),
              linear-gradient(90deg, rgba(147, 197, 253, 0.055) 1px, transparent 1px),
              rgba(8, 30, 63, 0.48);
            background-size: 28px 28px;
          }
          .zyco-method-motion svg { display: block; width: 100%; min-width: 880px; height: auto; }
          .zyco-method-motion__cell { fill: rgba(15, 45, 85, 0.45); stroke: rgba(147, 197, 253, 0.18); }
          .zyco-method-motion__method { fill: #fff; font-size: 16px; font-weight: 800; }
          .zyco-method-motion__note { fill: #93c5fd; font-size: 11px; font-weight: 700; }
          .zyco-method-motion__die { fill: url(#methodDie); stroke: #60a5fa; stroke-width: 1.5; }
          .zyco-method-motion__die-edge { fill: none; stroke: #bfdbfe; stroke-width: 2.5; }
          .zyco-method-motion__punch { fill: url(#methodPunch); }
          .zyco-method-motion__sheet { fill: url(#methodSheet); stroke: rgba(255,255,255,0.82); stroke-width: 1; }
          .zyco-method-motion__contact { fill: #38bdf8; stroke: #7dd3fc; opacity: 0; }
          .zyco-method-motion__contact path { fill: none; stroke-width: 4; opacity: 0.82; }
          .zyco-method-motion__leader { fill: none; stroke: #7dd3fc; stroke-width: 1.2; stroke-dasharray: 3 3; }
          .zyco-method-motion__callout { fill: #bae6fd; font-size: 10.5px; font-weight: 760; }
          .zyco-method-motion__formed-callout,
          .zyco-method-motion__radius,
          .zyco-method-motion__springback,
          .zyco-method-motion__imprint { opacity: 0; }
          .zyco-method-motion__imprint path { fill: none; stroke: #38bdf8; stroke-width: 2.5; }
          .zyco-method-motion__visible { opacity: 1; }
          .zyco-method-motion__contact:not(.zyco-method-motion__visible),
          .zyco-method-motion__formed-callout:not(.zyco-method-motion__visible),
          .zyco-method-motion__radius:not(.zyco-method-motion__visible),
          .zyco-method-motion__imprint:not(.zyco-method-motion__visible) {
            animation: method-forming-note 9s ease-in-out infinite;
          }
          .zyco-method-motion__springback { animation: method-release-note 9s ease-in-out infinite; }
          .zyco-method-motion__springback--bottoming { animation-name: method-release-small; }
          .zyco-method-motion__springback--coining { animation-name: method-release-minimal; }
          @keyframes method-forming-note {
            0%, 27%, 76%, 100% { opacity: 0; }
            43%, 58% { opacity: 1; }
            68% { opacity: .35; }
          }
          @keyframes method-release-note {
            0%, 58%, 100% { opacity: 0; }
            65%, 73% { opacity: 1; }
          }
          @keyframes method-release-small {
            0%, 58%, 100% { opacity: 0; }
            65%, 73% { opacity: .78; }
          }
          @keyframes method-release-minimal {
            0%, 58%, 100% { opacity: 0; }
            65%, 73% { opacity: .52; }
          }
          @media (prefers-reduced-motion: reduce) {
            .zyco-method-motion * { animation: none !important; }
            .zyco-method-motion__springback { opacity: 0; }
          }
          @media (max-width: 760px) {
            .zyco-method-motion { padding: 16px; border-radius: 22px; }
            .zyco-method-motion__title { font-size: 20px; }
          }
        `}
      </style>
      <h2 className='zyco-method-motion__title' id='method-motion-title'>{labels.title}</h2>
      <p className='zyco-method-motion__intro'>{labels.intro}</p>
      <div className='zyco-method-motion__frame'>
        <svg viewBox='0 0 1140 420' role='img' aria-labelledby='method-svg-title method-svg-desc'>
          <title id='method-svg-title'>{labels.svgTitle}</title>
          <desc id='method-svg-desc'>{labels.svgDescription}</desc>
          <defs>
            <linearGradient id='methodPunch' x1='0' y1='0' x2='0' y2='1'>
              <stop stopColor='#7dd3fc' />
              <stop offset='1' stopColor='#1d4ed8' />
            </linearGradient>
            <linearGradient id='methodDie' x1='0' y1='0' x2='0' y2='1'>
              <stop stopColor='#3b82f6' />
              <stop offset='1' stopColor='#1e3a8a' />
            </linearGradient>
            <linearGradient id='methodSheet' x1='0' y1='0' x2='1' y2='0'>
              <stop stopColor='#bfdbfe' />
              <stop offset='.5' stopColor='#fff' />
              <stop offset='1' stopColor='#bfdbfe' />
            </linearGradient>
          </defs>
          <ProcessCell kind='air' x='12' labels={labels} reduceMotion={reduceMotion} />
          <ProcessCell kind='bottoming' x='390' labels={labels} reduceMotion={reduceMotion} />
          <ProcessCell kind='coining' x='768' labels={labels} reduceMotion={reduceMotion} />
        </svg>
      </div>
    </section>
  )
}
