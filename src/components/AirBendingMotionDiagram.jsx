import {
  useEffect,
  useRef,
  useState,
} from 'react'

const defaultLabels = {
  eyebrow: 'Motion Diagram V1',
  title: 'Air bending load path and three-point contact',
  punchStroke: 'Punch stroke',
  sheetBending: 'Sheet bending',
  springbackReference: 'Springback reference',
  punchDownstroke: 'Punch downstroke',
  leftSupport: 'left support',
  rightSupport: 'right support',
  angleFormation: 'angle formation',
  vDieSupport: 'V-die support',
  highlightsAria: 'Diagram highlights',
  svgTitle: 'Air bending motion diagram',
  svgDescription:
    'Animated SVG showing punch downstroke, sheet bending over a V die, three-point contact and a springback reference line.',
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

    let syncFrame = 0

    const readyFrame = window.requestAnimationFrame(() => {
      setIsAnimationReady(true)

      syncFrame = window.requestAnimationFrame(() => {
        sheetAnimationRefs.current.forEach((animation) => {
          animation?.beginElement()
        })
      })
    })

    return () => {
      window.cancelAnimationFrame(readyFrame)
      window.cancelAnimationFrame(syncFrame)
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
              radial-gradient(circle at 50% 42%, rgba(96, 165, 250, 0.2), transparent 42%),
              linear-gradient(rgba(148, 197, 255, 0.06) 1px, transparent 1px),
              linear-gradient(90deg, rgba(148, 197, 255, 0.052) 1px, transparent 1px),
              linear-gradient(180deg, rgba(38, 84, 143, 0.42), rgba(18, 49, 93, 0.38));
            background-size: 100% 100%, 32px 32px, 32px 32px, 100% 100%;
            box-shadow:
              0 14px 34px rgba(2, 8, 23, 0.13),
              inset 0 1px 0 rgba(255, 255, 255, 0.14),
              inset 0 0 26px rgba(15, 23, 42, 0.12);
          }

          .zyco-air-motion__stage::before {
            content: "";
            position: absolute;
            inset: 0;
            background: linear-gradient(135deg, rgba(255, 255, 255, 0.08), transparent 28%);
            pointer-events: none;
          }

          .zyco-air-motion__svg {
            display: block;
            width: 100%;
            height: auto;
            min-height: 280px;
          }

          .zyco-air-motion--ready .zyco-air-motion__punch {
            animation: zyco-air-punch-cycle 10s ease-in-out infinite;
          }

          .zyco-air-motion--ready .zyco-air-motion__springback {
            animation: zyco-air-springback-cycle 10s ease-in-out infinite;
            transform-origin: 480px 306px;
          }

          .zyco-air-motion--ready .zyco-air-motion__contact {
            animation: zyco-air-contact-cycle 10s ease-in-out infinite;
          }

          .zyco-air-motion--ready .zyco-air-motion__angle {
            animation: zyco-air-angle-cycle 10s ease-in-out infinite;
          }

          .zyco-air-motion--ready .zyco-air-motion__load-line {
            animation: zyco-air-load-cycle 10s ease-in-out infinite;
          }

          @keyframes zyco-air-punch-cycle {
            0%, 100% {
              transform: translateY(0);
            }

            43%, 64% {
              transform: translateY(72px);
            }
          }

          @keyframes zyco-air-springback-cycle {
            0%, 26%, 100% {
              opacity: 0;
              transform: scale(0.98);
            }

            70%, 88% {
              opacity: 1;
              transform: scale(1);
            }
          }

          @keyframes zyco-air-contact-cycle {
            0%, 18%, 100% {
              opacity: 0.38;
              transform: scale(0.9);
            }

            42%, 68% {
              opacity: 1;
              transform: scale(1.08);
            }
          }

          @keyframes zyco-air-angle-cycle {
            0%, 28%, 100% {
              opacity: 0.22;
            }

            48%, 82% {
              opacity: 0.86;
            }
          }

          @keyframes zyco-air-load-cycle {
            0%, 18%, 100% {
              opacity: 0.26;
              transform: translateY(-8px);
            }

            42%, 68% {
              opacity: 0.78;
              transform: translateY(4px);
            }
          }

          @media (prefers-reduced-motion: reduce) {
            .zyco-air-motion__punch,
            .zyco-air-motion__springback,
            .zyco-air-motion__contact,
            .zyco-air-motion__angle,
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
              <stop offset='100%' stopColor='#0f2f6f' />
            </linearGradient>
            <linearGradient id='airSheetGradient' x1='0' y1='0' x2='1' y2='0'>
              <stop offset='0%' stopColor='#94a3b8' />
              <stop offset='42%' stopColor='#f8fafc' />
              <stop offset='58%' stopColor='#cbd5e1' />
              <stop offset='100%' stopColor='#64748b' />
            </linearGradient>
            <linearGradient id='airDieGradient' x1='0' y1='0' x2='0' y2='1'>
              <stop offset='0%' stopColor='#1d4ed8' />
              <stop offset='55%' stopColor='#0f2f6f' />
              <stop offset='100%' stopColor='#071a3d' />
            </linearGradient>
            <filter id='airSoftShadow' x='-20%' y='-20%' width='140%' height='150%'>
              <feDropShadow dx='0' dy='14' stdDeviation='13' floodColor='#020617' floodOpacity='0.28' />
            </filter>
            <filter id='airContactGlow' x='-80%' y='-80%' width='260%' height='260%'>
              <feGaussianBlur stdDeviation='5' result='blur' />
              <feMerge>
                <feMergeNode in='blur' />
                <feMergeNode in='SourceGraphic' />
              </feMerge>
            </filter>
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
            <path d='M126 402 H834' stroke='#60a5fa' strokeWidth='1' strokeDasharray='8 14' />
            <path d='M480 82 V430' stroke='#93c5fd' strokeWidth='1' strokeDasharray='7 13' />
          </g>

          <g className='zyco-air-motion__load-line'>
            <path d='M480 112 V202' stroke='#bfdbfe' strokeWidth='2' strokeLinecap='round' strokeDasharray='8 10' />
            <path d='M468 190 L480 208 L492 190' fill='none' stroke='#bfdbfe' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
          </g>

          <g className='zyco-air-motion__punch' filter='url(#airSoftShadow)'>
            <rect x='386' y='58' width='188' height='74' rx='12' fill='url(#airPunchGradient)' />
            <path d='M414 132 H546 L500 248 Q480 270 460 248 Z' fill='url(#airPunchGradient)' />
            <path d='M414 132 H546' stroke='rgba(255, 255, 255, 0.42)' strokeWidth='2' />
            <path d='M430 84 H530' stroke='rgba(255, 255, 255, 0.28)' strokeWidth='2' strokeLinecap='round' />
            <path d='M480 145 V239' stroke='rgba(219, 234, 254, 0.34)' strokeWidth='2' strokeLinecap='round' />
          </g>

          <g filter='url(#airSoftShadow)'>
            <path d='M148 408 L304 302 H408 L318 438 H148 Z' fill='url(#airDieGradient)' />
            <path d='M812 408 L656 302 H552 L642 438 H812 Z' fill='url(#airDieGradient)' />
            <path d='M304 302 H408' stroke='#93c5fd' strokeWidth='3' strokeLinecap='round' opacity='0.62' />
            <path d='M552 302 H656' stroke='#93c5fd' strokeWidth='3' strokeLinecap='round' opacity='0.62' />
            <path d='M166 414 H292' stroke='rgba(255, 255, 255, 0.18)' strokeWidth='2' strokeLinecap='round' />
            <path d='M668 414 H794' stroke='rgba(255, 255, 255, 0.18)' strokeWidth='2' strokeLinecap='round' />
            <path d='M152 438 H808' stroke='rgba(147, 197, 253, 0.24)' strokeWidth='3' strokeLinecap='round' />
          </g>

          <path
            d='M184 254 C304 254 390 264 480 276 C570 264 656 254 776 254'
            fill='none'
            stroke='rgba(219, 234, 254, 0.2)'
            strokeWidth='18'
            strokeLinecap='round'
            className='zyco-air-motion__springback'
          />

          <path
            d='M184 244 C304 244 390 250 480 254 C570 250 656 244 776 244'
            fill='none'
            stroke='url(#airSheetGradient)'
            strokeWidth='20'
            strokeLinecap='round'
            filter='url(#airSoftShadow)'
          >
            <animate
              attributeName='d'
              begin='indefinite'
              dur='10s'
              repeatCount='indefinite'
              calcMode='spline'
              keySplines='0.42 0 0.58 1; 0.42 0 0.58 1; 0.42 0 0.58 1'
              keyTimes='0; 0.45; 0.66; 1'
              ref={(animation) => {
                sheetAnimationRefs.current[0] = animation
              }}
              values='M184 244 C304 244 390 250 480 254 C570 250 656 244 776 244; M184 252 C306 252 376 316 480 334 C584 316 654 252 776 252; M184 252 C306 252 376 316 480 334 C584 316 654 252 776 252; M184 244 C304 244 390 250 480 254 C570 250 656 244 776 244'
            />
          </path>

          <path
            d='M202 234 C312 234 396 240 480 244 C564 240 648 234 758 234'
            fill='none'
            stroke='rgba(255, 255, 255, 0.42)'
            strokeWidth='2'
            strokeLinecap='round'
          >
            <animate
              attributeName='d'
              begin='indefinite'
              dur='10s'
              repeatCount='indefinite'
              calcMode='spline'
              keySplines='0.42 0 0.58 1; 0.42 0 0.58 1; 0.42 0 0.58 1'
              keyTimes='0; 0.45; 0.66; 1'
              ref={(animation) => {
                sheetAnimationRefs.current[1] = animation
              }}
              values='M202 234 C312 234 396 240 480 244 C564 240 648 234 758 234; M202 242 C312 242 390 304 480 322 C570 304 648 242 758 242; M202 242 C312 242 390 304 480 322 C570 304 648 242 758 242; M202 234 C312 234 396 240 480 244 C564 240 648 234 758 234'
            />
          </path>

          <g className='zyco-air-motion__angle'>
            <path d='M430 342 A58 58 0 0 0 530 342' fill='none' stroke='#93c5fd' strokeWidth='2' strokeLinecap='round' />
            <path d='M450 350 L480 320 L510 350' fill='none' stroke='rgba(219, 234, 254, 0.5)' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
            <text x='480' y='394' textAnchor='middle' fill='#bfdbfe' fontSize='15' fontWeight='750'>
              {diagramLabels.angleFormation}
            </text>
          </g>

          <g
            className='zyco-air-motion__contact'
            filter='url(#airContactGlow)'
            fill='#7dd3fc'
            style={{ transformOrigin: '480px 316px' }}
          >
            <circle cx='480' cy='322' r='7' />
            <circle cx='304' cy='302' r='7' />
            <circle cx='656' cy='302' r='7' />
            <circle cx='480' cy='322' r='18' fill='none' stroke='#7dd3fc' strokeWidth='1.5' opacity='0.42' />
            <circle cx='304' cy='302' r='18' fill='none' stroke='#7dd3fc' strokeWidth='1.5' opacity='0.42' />
            <circle cx='656' cy='302' r='18' fill='none' stroke='#7dd3fc' strokeWidth='1.5' opacity='0.42' />
          </g>

          <g fill='#dbeafe' fontSize='14' fontWeight='760' opacity='0.9'>
            <text x='480' y='44' textAnchor='middle'>{diagramLabels.punchDownstroke}</text>
            <text x='208' y='298' textAnchor='middle'>{diagramLabels.leftSupport}</text>
            <text x='752' y='298' textAnchor='middle'>{diagramLabels.rightSupport}</text>
            <text x='480' y='464' textAnchor='middle'>{diagramLabels.vDieSupport}</text>
          </g>
        </svg>
      </div>
    </section>
  )
}
