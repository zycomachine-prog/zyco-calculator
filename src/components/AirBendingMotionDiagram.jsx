import {
  useEffect,
  useRef,
  useState,
} from 'react'

const defaultLabels = {
  eyebrow: 'Process Animation',
  title: 'Air bending process: forming without bottoming',
  intro:
    'Air bending forms the angle while the sheet is supported by the V-die shoulders. The material does not fully bottom out in the die, so the final angle depends on punch depth, V-opening, material behavior and springback compensation.',
  punchStroke: 'Punch stroke',
  sheetBending: 'Sheet bending',
  springbackReference: 'Springback reference',
  punch: 'Punch',
  sheetMetal: 'Sheet Metal',
  vDie: 'V-Die',
  vDieShoulders: 'V-Die Shoulders',
  airBending: 'Air Bending',
  insideRadius: 'Inside Radius',
  springback: 'Springback',
  noBottoming: 'No Bottoming',
  punchDownstroke: 'Punch downstroke',
  highlightsAria: 'Diagram highlights',
  svgTitle: 'Animated air bending process diagram',
  svgDescription:
    'Animated SVG showing a punch descending, sheet metal bending on the V-die shoulders without bottoming, the naturally formed inside radius and slight springback after unloading.',
}

export default function AirBendingMotionDiagram({ labels = defaultLabels }) {
  const sheetAnimationRefs = useRef([])
  const [isAnimationReady, setIsAnimationReady] = useState(false)

  const diagramLabels = {
    ...defaultLabels,
    ...labels,
  }

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    if (prefersReducedMotion) {
      return undefined
    }

    const readyFrame = window.requestAnimationFrame(() => {
      setIsAnimationReady(true)

      sheetAnimationRefs.current.forEach((animation) => {
        animation?.beginElement()
      })
    })

    return () => {
      window.cancelAnimationFrame(readyFrame)
    }
  }, [])

  return (
    <section
      className={`zyco-air-motion${
        isAnimationReady ? ' zyco-air-motion--ready' : ''
      }`}
      aria-labelledby='air-bending-motion-title'
    >
      <style>
        {`
          .zyco-air-motion {
            position: relative;
            width: 100%;
            max-width: 100%;
            margin: 22px auto 0;
            padding: 24px;
            box-sizing: border-box;
            overflow: hidden;
            border: 1px solid rgba(180, 220, 255, 0.1);
            border-radius: 28px;
            background:
              radial-gradient(circle at 50% 20%, rgba(191, 219, 254, 0.2), transparent 28%),
              radial-gradient(circle at 76% 8%, rgba(125, 211, 252, 0.12), transparent 24%),
              linear-gradient(135deg, rgba(26, 64, 112, 0.78), rgba(8, 28, 56, 0.82));
            box-shadow:
              0 18px 48px rgba(2, 8, 23, 0.18),
              0 0 24px rgba(96, 165, 250, 0.1),
              inset 0 1px 0 rgba(255, 255, 255, 0.18),
              inset 0 -1px 0 rgba(15, 23, 42, 0.22);
            backdrop-filter: blur(10px);
          }

          .zyco-air-motion::before {
            content: "";
            position: absolute;
            inset: 1px;
            border-radius: 27px;
            background:
              linear-gradient(rgba(148, 197, 255, 0.045) 1px, transparent 1px),
              linear-gradient(90deg, rgba(148, 197, 255, 0.038) 1px, transparent 1px),
              linear-gradient(160deg, rgba(255, 255, 255, 0.1), transparent 34%);
            background-size: 26px 26px, 26px 26px, 100% 100%;
            mask-image: radial-gradient(circle at 50% 34%, rgba(0, 0, 0, 0.78), transparent 74%);
            pointer-events: none;
          }

          .zyco-air-motion::after {
            content: "";
            position: absolute;
            left: 24px;
            right: 24px;
            top: 0;
            height: 1px;
            background: linear-gradient(90deg, transparent, rgba(219, 234, 254, 0.58), transparent);
            pointer-events: none;
          }

          .zyco-air-motion > * {
            position: relative;
            z-index: 1;
          }

          .zyco-air-motion + .zyco-air__panel {
            margin-top: 32px;
          }

          .zyco-air-motion__header {
            display: flex;
            align-items: flex-start;
            justify-content: space-between;
            gap: 18px;
            margin: 0 0 18px;
          }

          .zyco-air-motion__eyebrow {
            margin: 0 0 7px;
            color: #93c5fd;
            font-size: 12px;
            font-weight: 850;
            letter-spacing: 2px;
            text-transform: uppercase;
          }

          .zyco-air-motion__title {
            margin: 0;
            color: #ffffff;
            font-size: 21px;
            line-height: 1.24;
            font-weight: 850;
            letter-spacing: 0;
          }

          .zyco-air-motion__intro {
            max-width: 900px;
            margin: 0 0 18px;
            color: #dbeafe;
            font-size: 14px;
            line-height: 1.72;
            font-weight: 620;
          }

          .zyco-air-motion__legend {
            display: flex;
            flex-wrap: wrap;
            justify-content: flex-end;
            gap: 8px;
            margin: 0;
          }

          .zyco-air-motion__legend span {
            display: inline-flex;
            align-items: center;
            min-height: 28px;
            padding: 0 10px;
            border: 1px solid rgba(191, 219, 254, 0.24);
            border-radius: 999px;
            background: rgba(30, 64, 112, 0.32);
            color: #dbeafe;
            font-size: 12px;
            line-height: 1;
            font-weight: 750;
          }

          .zyco-air-motion__stage {
            position: relative;
            overflow: hidden;
            width: min(88%, 980px);
            max-width: 100%;
            margin: 0 auto;
            box-sizing: border-box;
            border: 1px solid rgba(191, 219, 254, 0.24);
            border-radius: 22px;
            background:
              radial-gradient(circle at 50% 54%, rgba(186, 230, 253, 0.12), transparent 25%),
              radial-gradient(circle at 50% 52%, rgba(96, 165, 250, 0.22), transparent 48%),
              linear-gradient(rgba(148, 197, 255, 0.06) 1px, transparent 1px),
              linear-gradient(90deg, rgba(148, 197, 255, 0.052) 1px, transparent 1px),
              linear-gradient(180deg, rgba(38, 84, 143, 0.42), rgba(18, 49, 93, 0.38));
            background-size: 100% 100%, 100% 100%, 32px 32px, 32px 32px, 100% 100%;
            box-shadow:
              0 14px 34px rgba(2, 8, 23, 0.13),
              inset 0 1px 0 rgba(255, 255, 255, 0.14),
              inset 0 0 26px rgba(15, 23, 42, 0.12);
          }

          .zyco-air-motion__stage::before {
            content: "";
            position: absolute;
            inset: 0;
            background:
              radial-gradient(circle at 50% 54%, transparent 34%, rgba(10, 37, 82, 0.16) 100%),
              linear-gradient(135deg, rgba(255, 255, 255, 0.08), transparent 28%);
            pointer-events: none;
          }

          .zyco-air-motion__svg {
            display: block;
            width: 100%;
            height: auto;
            min-height: 280px;
          }

          .zyco-air-motion__springback {
            opacity: 0;
          }

          .zyco-air-motion__load-line {
            opacity: 0.78;
            transform: translateY(4px);
          }

          .zyco-air-motion__label {
            fill: #dbeafe;
            font-size: 14px;
            font-weight: 760;
          }

          .zyco-air-motion__callout {
            fill: #7dd3fc;
            font-size: 13px;
            font-weight: 800;
          }

          .zyco-air-motion__focus-ring {
            fill: rgba(125, 211, 252, 0.035);
            stroke: rgba(147, 197, 253, 0.12);
            stroke-width: 1;
          }

          .zyco-air-motion__leader {
            fill: none;
            stroke: rgba(125, 211, 252, 0.82);
            stroke-width: 1.5;
            stroke-linecap: round;
            stroke-dasharray: 3 4;
          }

          .zyco-air-motion__no-bottom {
            opacity: 0.84;
          }

          .zyco-air-motion__inside-radius {
            opacity: 0;
          }

          .zyco-air-motion--ready .zyco-air-motion__springback {
            animation: zyco-air-springback-cycle 10s linear infinite;
            transform-origin: 480px 306px;
          }

          .zyco-air-motion--ready .zyco-air-motion__contact {
            animation: zyco-air-contact-cycle 10s ease-in-out infinite;
          }

          .zyco-air-motion--ready .zyco-air-motion__inside-radius {
            animation: zyco-air-inside-radius-cycle 10s ease-in-out infinite;
          }

          .zyco-air-motion--ready .zyco-air-motion__no-bottom {
            animation: zyco-air-no-bottom-cycle 10s ease-in-out infinite;
          }

          .zyco-air-motion--ready .zyco-air-motion__load-line {
            animation: zyco-air-load-cycle 10s ease-in-out infinite;
          }

          @keyframes zyco-air-springback-cycle {
            0%, 62% {
              opacity: 0;
              transform: scale(0.99);
            }

            66%, 76% {
              opacity: 0.84;
              transform: scale(1);
            }

            80% {
              opacity: 0.4;
              transform: scale(1);
            }

            100% {
              opacity: 0;
              transform: scale(1);
            }
          }

          @keyframes zyco-air-inside-radius-cycle {
            0%, 55%, 100% {
              opacity: 0;
            }

            62%, 74% {
              opacity: 1;
            }

            82% {
              opacity: 0.24;
            }
          }

          @keyframes zyco-air-no-bottom-cycle {
            0%, 35%, 100% {
              opacity: 0.06;
            }

            40%, 60% {
              opacity: 0.9;
            }

            75% {
              opacity: 0.16;
            }
          }

          @keyframes zyco-air-contact-cycle {
            0%, 30%, 100% {
              opacity: 0.38;
              transform: scale(0.9);
            }

            40%, 55% {
              opacity: 1;
              transform: scale(1.08);
            }

            75% {
              opacity: 0.62;
              transform: scale(1);
            }
          }

          @keyframes zyco-air-load-cycle {
            0%, 30%, 100% {
              opacity: 0.26;
              transform: translateY(-8px);
            }

            40%, 55% {
              opacity: 0.78;
              transform: translateY(4px);
            }

            75% {
              opacity: 0.42;
              transform: translateY(-2px);
            }
          }

          @media (prefers-reduced-motion: reduce) {
            .zyco-air-motion__punch {
              transform: translateY(88px);
            }

            .zyco-air-motion__punch,
            .zyco-air-motion__springback,
            .zyco-air-motion__contact,
            .zyco-air-motion__inside-radius,
            .zyco-air-motion__no-bottom,
            .zyco-air-motion__load-line {
              animation: none;
            }
          }

          @media (max-width: 760px) {
            .zyco-air-motion {
              padding: 18px;
              border-radius: 24px;
            }

            .zyco-air-motion__header {
              display: block;
            }

            .zyco-air-motion__legend {
              justify-content: flex-start;
              margin-top: 14px;
            }

            .zyco-air-motion__title {
              font-size: 19px;
            }

            .zyco-air-motion__svg {
              min-height: 230px;
            }

            .zyco-air-motion__stage {
              width: 100%;
            }

            .zyco-air-motion + .zyco-air__panel {
              margin-top: 32px;
            }
          }
        `}
      </style>

      <div className='zyco-air-motion__header'>
        <div>
          <p className='zyco-air-motion__eyebrow'>
            {diagramLabels.eyebrow}
          </p>
          <h2
            className='zyco-air-motion__title'
            id='air-bending-motion-title'
          >
            {diagramLabels.title}
          </h2>
        </div>

        <p
          className='zyco-air-motion__legend'
          aria-label={diagramLabels.highlightsAria}
        >
          <span>{diagramLabels.punchStroke}</span>
          <span>{diagramLabels.sheetBending}</span>
          <span>{diagramLabels.springbackReference}</span>
        </p>
      </div>

      <p className='zyco-air-motion__intro'>
        {diagramLabels.intro}
      </p>

      <div className='zyco-air-motion__stage'>
        <svg
          className='zyco-air-motion__svg'
          viewBox='0 0 960 540'
          role='img'
          aria-labelledby='air-motion-svg-title air-motion-svg-desc'
          preserveAspectRatio='xMidYMid meet'
        >
          <title id='air-motion-svg-title'>
            {diagramLabels.svgTitle}
          </title>
          <desc id='air-motion-svg-desc'>
            {diagramLabels.svgDescription}
          </desc>

          <defs>
            <linearGradient id='airPunchGradient' x1='0' y1='0' x2='0' y2='1'>
              <stop offset='0%' stopColor='#7dd3fc' />
              <stop offset='48%' stopColor='#2563eb' />
              <stop offset='100%' stopColor='#1d4ed8' />
            </linearGradient>
            <linearGradient id='airSheetGradient' x1='0' y1='0' x2='1' y2='0'>
              <stop offset='0%' stopColor='#bfdbfe' />
              <stop offset='42%' stopColor='#f8fafc' />
              <stop offset='58%' stopColor='#e0f2fe' />
              <stop offset='100%' stopColor='#bfdbfe' />
            </linearGradient>
            <linearGradient id='airDieGradient' x1='0' y1='0' x2='0' y2='1'>
              <stop offset='0%' stopColor='#3b82f6' />
              <stop offset='100%' stopColor='#1e40af' />
            </linearGradient>
          </defs>

          <rect
            x='52'
            y='44'
            width='856'
            height='430'
            rx='26'
            fill='rgba(30, 64, 112, 0.16)'
            stroke='rgba(191, 219, 254, 0.1)'
          />

          <g opacity='0.48'>
            <path d='M480 82 V430' stroke='#93c5fd' strokeWidth='1' strokeDasharray='7 13' />
          </g>

          <ellipse className='zyco-air-motion__focus-ring' cx='480' cy='316' rx='196' ry='136' />

          <g className='zyco-air-motion__load-line'>
            <path d='M480 112 V202' stroke='#bfdbfe' strokeWidth='2' strokeLinecap='round' strokeDasharray='8 10' />
            <path d='M468 190 L480 208 L492 190' fill='none' stroke='#bfdbfe' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
          </g>

          <g className='zyco-air-motion__punch'>
            <rect x='386' y='58' width='188' height='74' rx='12' fill='url(#airPunchGradient)' />
            <path d='M414 132 H546 L500 248 Q480 270 460 248 Z' fill='url(#airPunchGradient)' />
            <path d='M414 132 H546' stroke='rgba(255, 255, 255, 0.42)' strokeWidth='2' />
            <path d='M430 84 H530' stroke='rgba(255, 255, 255, 0.28)' strokeWidth='2' strokeLinecap='round' />
            <path d='M480 145 V239' stroke='rgba(219, 234, 254, 0.34)' strokeWidth='2' strokeLinecap='round' />
            <animateTransform
              attributeName='transform'
              begin='indefinite'
              dur='10s'
              repeatCount='indefinite'
              type='translate'
              calcMode='spline'
              keySplines='0 0 1 1; 0.42 0 0.58 1; 0.42 0 0.58 1'
              keyTimes='0; 0.55; 0.75; 1'
              ref={(animation) => {
                sheetAnimationRefs.current[0] = animation
              }}
              values='0 0; 0 88; 0 48; 0 0'
            />
          </g>

          <g>
            <path d='M142 310 H302 L480 432 H142 Z' fill='url(#airDieGradient)' stroke='#60a5fa' strokeWidth='2' strokeLinejoin='round' />
            <path d='M658 310 H818 V432 H480 Z' fill='url(#airDieGradient)' stroke='#60a5fa' strokeWidth='2' strokeLinejoin='round' />
            <path d='M302 310 L480 432 L658 310' fill='none' stroke='#93c5fd' strokeWidth='4' strokeLinejoin='round' />
            <path d='M152 432 H808' stroke='rgba(147, 197, 253, 0.42)' strokeWidth='3' strokeLinecap='round' />
          </g>

          <path
            d='M178 288 L302 302 Q390 304 452 338 Q480 352 508 338 Q570 304 658 302 L782 288'
            fill='none'
            stroke='rgba(186, 230, 253, 0.78)'
            strokeWidth='5'
            strokeDasharray='9 7'
            strokeLinecap='round'
            className='zyco-air-motion__springback'
          />

          <path
            className='zyco-air-motion__sheet-body'
            d='M178 286 L302 286 Q390 286 452 286 Q480 286 508 286 Q570 286 658 286 L782 286 L782 310 L658 310 Q570 310 508 310 Q480 310 452 310 Q390 310 302 310 L178 310 Z'
            fill='url(#airSheetGradient)'
            style={{ opacity: 1, visibility: 'visible' }}
          >
            <animate
              attributeName='d'
              begin='indefinite'
              dur='10s'
              repeatCount='indefinite'
              calcMode='spline'
              keySplines='0 0 1 1; 0 0 1 1; 0.42 0 0.58 1; 0.42 0 0.58 1'
              keyTimes='0; 0.22; 0.55; 0.75; 1'
              ref={(animation) => {
                sheetAnimationRefs.current[1] = animation
              }}
              values='M178 286 L302 286 Q390 286 452 286 Q480 286 508 286 Q570 286 658 286 L782 286 L782 310 L658 310 Q570 310 508 310 Q480 310 452 310 Q390 310 302 310 L178 310 Z; M178 286 L302 286 Q390 286 452 286 Q480 286 508 286 Q570 286 658 286 L782 286 L782 310 L658 310 Q570 310 508 310 Q480 310 452 310 Q390 310 302 310 L178 310 Z; M178 276 L302 290 Q390 292 452 334 Q480 354 508 334 Q570 292 658 290 L782 276 L782 300 L658 314 Q570 316 508 358 Q480 378 452 358 Q390 316 302 314 L178 300 Z; M178 276 L302 290 Q390 292 452 326 Q480 340 508 326 Q570 292 658 290 L782 276 L782 300 L658 314 Q570 316 508 350 Q480 364 452 350 Q390 316 302 314 L178 300 Z; M178 286 L302 286 Q390 286 452 286 Q480 286 508 286 Q570 286 658 286 L782 286 L782 310 L658 310 Q570 310 508 310 Q480 310 452 310 Q390 310 302 310 L178 310 Z'
            />
          </path>

          <path
            d='M190 281 L302 295 Q390 296 452 337 Q480 356 508 337 Q570 296 658 295 L770 281'
            fill='none'
            stroke='rgba(255, 255, 255, 0.42)'
            strokeWidth='2'
            opacity='0'
            strokeLinecap='round'
          >
            <animate
              attributeName='d'
              begin='indefinite'
              dur='10s'
              repeatCount='indefinite'
              calcMode='spline'
              keySplines='0 0 1 1; 0 0 1 1; 0.42 0 0.58 1; 0.42 0 0.58 1'
              keyTimes='0; 0.22; 0.55; 0.75; 1'
              ref={(animation) => {
                sheetAnimationRefs.current[2] = animation
              }}
              values='M190 291 L302 291 Q390 291 452 291 Q480 291 508 291 Q570 291 658 291 L770 291; M190 291 L302 291 Q390 291 452 291 Q480 291 508 291 Q570 291 658 291 L770 291; M190 281 L302 295 Q390 296 452 337 Q480 356 508 337 Q570 296 658 295 L770 281; M190 281 L302 295 Q390 296 452 329 Q480 342 508 329 Q570 296 658 295 L770 281; M190 291 L302 291 Q390 291 452 291 Q480 291 508 291 Q570 291 658 291 L770 291'
            />
          </path>

          <g className='zyco-air-motion__angle'>
            <g className='zyco-air-motion__inside-radius'>
              <path d='M450 347 Q480 370 510 347' fill='none' stroke='#7dd3fc' strokeWidth='2' strokeLinecap='round' />
              <path className='zyco-air-motion__leader' d='M506 349 L582 224 L690 214' />
              <text className='zyco-air-motion__callout' x='698' y='218'>
                {diagramLabels.insideRadius}
              </text>
            </g>
            <text className='zyco-air-motion__label' x='92' y='112'>
              {diagramLabels.airBending}
            </text>
          </g>

          <g
            className='zyco-air-motion__contact'
            fill='#7dd3fc'
            style={{ transformOrigin: '480px 358px' }}
          >
            <circle cx='480' cy='358' r='5' />
            <circle cx='302' cy='310' r='5' />
            <circle cx='658' cy='310' r='5' />
            <circle cx='302' cy='310' r='11' fill='none' stroke='#7dd3fc' strokeWidth='1.5' opacity='0.6' />
            <circle cx='658' cy='310' r='11' fill='none' stroke='#7dd3fc' strokeWidth='1.5' opacity='0.6' />
          </g>

          <g className='zyco-air-motion__label' opacity='0.94'>
            <text x='480' y='44' textAnchor='middle'>{diagramLabels.punch}</text>
            <text x='108' y='174'>{diagramLabels.sheetMetal}</text>
            <path className='zyco-air-motion__leader' d='M100 170 H82 V270 H206 L244 298' />
            <text x='108' y='208'>{diagramLabels.vDieShoulders}</text>
            <path className='zyco-air-motion__leader' d='M100 204 H68 V246 H264 L302 310' />
            <text x='92' y='462'>{diagramLabels.vDie}</text>
            <path className='zyco-air-motion__leader' d='M152 456 L168 432 L194 410' />
          </g>

          <g>
            <text className='zyco-air-motion__callout zyco-air-motion__springback' x='698' y='176'>{diagramLabels.springback}</text>
            <path className='zyco-air-motion__leader zyco-air-motion__springback' d='M690 180 L664 238 L636 303' />
          </g>

          <g className='zyco-air-motion__no-bottom'>
            <path className='zyco-air-motion__leader' d='M480 385 V410 L530 456' />
            <text className='zyco-air-motion__callout' x='538' y='462'>
              {diagramLabels.noBottoming}
            </text>
          </g>
        </svg>
      </div>
    </section>
  )
}
