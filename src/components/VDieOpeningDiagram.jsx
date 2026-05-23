import {
  useEffect,
  useRef,
  useState,
} from 'react'

export default function VDieOpeningDiagram({ labels }) {
  const sheetAnimations = useRef([])
  const [motionReady, setMotionReady] = useState(false)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return undefined
    }

    const frame = window.requestAnimationFrame(() => {
      setMotionReady(true)
      sheetAnimations.current.forEach((animation) => animation?.beginElement())
    })

    return () => window.cancelAnimationFrame(frame)
  }, [])

  return (
    <section
      className={`zyco-v-opening-diagram${motionReady ? ' zyco-v-opening-diagram--ready' : ''}`}
      aria-labelledby='v-opening-diagram-title'
    >
      <style>
        {`
          .zyco-v-opening-diagram {
            position: relative;
            width: 100%;
            box-sizing: border-box;
            margin-top: 18px;
            padding: 24px;
            overflow: hidden;
            border: 1px solid rgba(180, 220, 255, 0.12);
            border-radius: 26px;
            background:
              radial-gradient(circle at 46% 28%, rgba(191, 219, 254, 0.18), transparent 30%),
              linear-gradient(135deg, rgba(26, 64, 112, 0.72), rgba(8, 28, 56, 0.82));
            box-shadow:
              0 18px 48px rgba(2, 8, 23, 0.18),
              inset 0 1px 0 rgba(255, 255, 255, 0.16);
            transition:
              border-color 0.24s ease,
              box-shadow 0.24s ease;
          }

          .zyco-v-opening-diagram:hover {
            border-color: rgba(191, 219, 254, 0.22);
            box-shadow:
              0 20px 52px rgba(2, 8, 23, 0.2),
              0 0 28px rgba(96, 165, 250, 0.08),
              inset 0 1px 0 rgba(255, 255, 255, 0.18);
          }

          .zyco-v-opening-diagram::before {
            content: "";
            position: absolute;
            inset: 1px;
            border-radius: 25px;
            background-image:
              linear-gradient(rgba(148, 197, 255, 0.045) 1px, transparent 1px),
              linear-gradient(90deg, rgba(148, 197, 255, 0.04) 1px, transparent 1px);
            background-size: 28px 28px;
            mask-image: radial-gradient(circle at 46% 42%, #000, transparent 76%);
            pointer-events: none;
          }

          .zyco-v-opening-diagram > * {
            position: relative;
            z-index: 1;
          }

          .zyco-v-opening-diagram__header {
            margin-bottom: 18px;
          }

          .zyco-v-opening-diagram__eyebrow {
            margin: 0 0 7px;
            color: #93c5fd;
            font-size: 12px;
            font-weight: 850;
            letter-spacing: 2px;
            text-transform: uppercase;
          }

          .zyco-v-opening-diagram__title {
            margin: 0;
            color: #ffffff;
            font-size: 21px;
            line-height: 1.3;
            font-weight: 850;
          }

          .zyco-v-opening-diagram__stage {
            border: 1px solid rgba(191, 219, 254, 0.2);
            border-radius: 22px;
            background:
              radial-gradient(circle at 44% 42%, rgba(96, 165, 250, 0.18), transparent 44%),
              linear-gradient(180deg, rgba(38, 84, 143, 0.38), rgba(18, 49, 93, 0.34));
            overflow: hidden;
          }

          .zyco-v-opening-diagram__svg {
            display: block;
            width: 100%;
            height: auto;
            min-height: 300px;
          }

          .zyco-v-opening-diagram__punch {
            transform: translateY(72px);
          }

          .zyco-v-opening-diagram__forming-reference,
          .zyco-v-opening-diagram__contacts {
            opacity: 1;
          }

          .zyco-v-opening-diagram--ready .zyco-v-opening-diagram__punch {
            animation: zyco-v-punch-cycle 8s ease-in-out infinite;
          }

          .zyco-v-opening-diagram--ready .zyco-v-opening-diagram__forming-reference,
          .zyco-v-opening-diagram--ready .zyco-v-opening-diagram__contacts {
            animation: zyco-v-forming-reference 8s ease-in-out infinite;
          }

          @keyframes zyco-v-punch-cycle {
            0%, 18%, 100% {
              transform: translateY(0);
            }

            52%, 72% {
              transform: translateY(72px);
            }
          }

          @keyframes zyco-v-forming-reference {
            0%, 18%, 100% {
              opacity: 0.18;
            }

            52%, 72% {
              opacity: 1;
            }
          }

          @media (prefers-reduced-motion: reduce) {
            .zyco-v-opening-diagram__punch,
            .zyco-v-opening-diagram__forming-reference,
            .zyco-v-opening-diagram__contacts {
              animation: none;
            }
          }

          @media (max-width: 760px) {
            .zyco-v-opening-diagram {
              padding: 18px;
              border-radius: 22px;
            }

            .zyco-v-opening-diagram__title {
              font-size: 18px;
            }

            .zyco-v-opening-diagram__svg {
              min-height: 242px;
            }
          }
        `}
      </style>

      <header className='zyco-v-opening-diagram__header'>
        <p className='zyco-v-opening-diagram__eyebrow'>{labels.eyebrow}</p>
        <h2
          className='zyco-v-opening-diagram__title'
          id='v-opening-diagram-title'
        >
          {labels.title}
        </h2>
      </header>

      <div className='zyco-v-opening-diagram__stage'>
        <svg
          className='zyco-v-opening-diagram__svg'
          viewBox='0 0 1080 590'
          preserveAspectRatio='xMidYMid meet'
          role='img'
          aria-labelledby='v-die-svg-title v-die-svg-description'
        >
          <title id='v-die-svg-title'>{labels.svgTitle}</title>
          <desc id='v-die-svg-description'>{labels.svgDescription}</desc>

          <defs>
            <linearGradient id='vOpeningPunch' x1='0' y1='0' x2='0' y2='1'>
              <stop offset='0%' stopColor='#7dd3fc' />
              <stop offset='52%' stopColor='#2563eb' />
              <stop offset='100%' stopColor='#102e68' />
            </linearGradient>
            <linearGradient id='vOpeningDie' x1='0' y1='0' x2='0' y2='1'>
              <stop offset='0%' stopColor='#2563eb' />
              <stop offset='100%' stopColor='#071a3d' />
            </linearGradient>
            <linearGradient id='vOpeningSheet' x1='0' y1='0' x2='1' y2='0'>
              <stop offset='0%' stopColor='#94a3b8' />
              <stop offset='46%' stopColor='#f8fafc' />
              <stop offset='54%' stopColor='#dbeafe' />
              <stop offset='100%' stopColor='#64748b' />
            </linearGradient>
            <filter id='vOpeningShadow' x='-30%' y='-30%' width='160%' height='180%'>
              <feDropShadow dx='0' dy='12' stdDeviation='11' floodColor='#020617' floodOpacity='0.3' />
            </filter>
            <filter id='vOpeningGlow' x='-80%' y='-80%' width='260%' height='260%'>
              <feGaussianBlur stdDeviation='5' result='blur' />
              <feMerge>
                <feMergeNode in='blur' />
                <feMergeNode in='SourceGraphic' />
              </feMerge>
            </filter>
            <filter id='vOpeningSheetShadowSoft' x='-20%' y='-120%' width='140%' height='340%'>
              <feGaussianBlur stdDeviation='14' />
            </filter>
            <filter id='vOpeningSheetShadowFocus' x='-80%' y='-180%' width='260%' height='460%'>
              <feGaussianBlur stdDeviation='5' />
            </filter>
            <marker
              id='vOpeningArrow'
              markerWidth='8'
              markerHeight='8'
              refX='7'
              refY='4'
              orient='auto'
            >
              <path d='M0 0 L8 4 L0 8' fill='none' stroke='#93c5fd' strokeWidth='1.4' />
            </marker>
          </defs>

          <g transform='translate(30 0)'>
          <g opacity='0.4'>
            <path d='M76 476 H1004' stroke='#60a5fa' strokeWidth='1' strokeDasharray='8 14' />
            <path d='M470 40 V510' stroke='#93c5fd' strokeWidth='1' strokeDasharray='7 13' />
          </g>

          <g filter='url(#vOpeningShadow)'>
            <path d='M108 458 L278 270 H370 L264 458 Z' fill='url(#vOpeningDie)' />
            <path d='M832 458 L662 270 H570 L676 458 Z' fill='url(#vOpeningDie)' />
            <path d='M278 270 H370 M570 270 H662' stroke='#93c5fd' strokeWidth='3' strokeLinecap='round' opacity='0.74' />
            <path d='M106 458 H834' stroke='rgba(147,197,253,0.3)' strokeWidth='3' />
          </g>

          <path
            d='M126 278 L278 278 C350 278 402 286 436 312 C450 326 459 332 470 332 C481 332 490 326 504 312 C538 286 590 278 662 278 L814 278'
            fill='none'
            stroke='#061b42'
            strokeWidth='12'
            opacity='0.12'
            filter='url(#vOpeningSheetShadowSoft)'
          >
            <animate
              attributeName='d'
              begin='indefinite'
              dur='8s'
              repeatCount='indefinite'
              calcMode='spline'
              keySplines='0.42 0 0.58 1; 0.42 0 0.58 1; 0.42 0 0.58 1; 0.42 0 0.58 1'
              keyTimes='0; 0.18; 0.52; 0.72; 1'
              ref={(animation) => {
                sheetAnimations.current[3] = animation
              }}
              values='M126 282 L278 282 C350 282 402 282 436 282 C450 282 459 282 470 282 C481 282 490 282 504 282 C538 282 590 282 662 282 L814 282; M126 282 L278 282 C350 282 402 282 436 282 C450 282 459 282 470 282 C481 282 490 282 504 282 C538 282 590 282 662 282 L814 282; M126 278 L278 278 C350 278 402 286 436 312 C450 326 459 332 470 332 C481 332 490 326 504 312 C538 286 590 278 662 278 L814 278; M126 278 L278 278 C350 278 402 286 436 312 C450 326 459 332 470 332 C481 332 490 326 504 312 C538 286 590 278 662 278 L814 278; M126 282 L278 282 C350 282 402 282 436 282 C450 282 459 282 470 282 C481 282 490 282 504 282 C538 282 590 282 662 282 L814 282'
            />
            <animate
              attributeName='stroke-width'
              begin='indefinite'
              dur='8s'
              repeatCount='indefinite'
              keyTimes='0; 0.18; 0.52; 0.72; 1'
              ref={(animation) => {
                sheetAnimations.current[4] = animation
              }}
              values='22; 22; 12; 12; 22'
            />
            <animate
              attributeName='opacity'
              begin='indefinite'
              dur='8s'
              repeatCount='indefinite'
              keyTimes='0; 0.18; 0.52; 0.72; 1'
              ref={(animation) => {
                sheetAnimations.current[5] = animation
              }}
              values='0.2; 0.2; 0.12; 0.12; 0.2'
            />
          </path>

          <ellipse
            cx='470'
            cy='327'
            rx='42'
            ry='9'
            fill='#020c22'
            opacity='0.42'
            filter='url(#vOpeningSheetShadowFocus)'
          >
            <animate attributeName='cy' begin='indefinite' dur='8s' repeatCount='indefinite' keyTimes='0; 0.18; 0.52; 0.72; 1' ref={(animation) => { sheetAnimations.current[6] = animation }} values='279; 279; 327; 327; 279' />
            <animate attributeName='rx' begin='indefinite' dur='8s' repeatCount='indefinite' keyTimes='0; 0.18; 0.52; 0.72; 1' ref={(animation) => { sheetAnimations.current[7] = animation }} values='112; 112; 42; 42; 112' />
            <animate attributeName='ry' begin='indefinite' dur='8s' repeatCount='indefinite' keyTimes='0; 0.18; 0.52; 0.72; 1' ref={(animation) => { sheetAnimations.current[8] = animation }} values='13; 13; 9; 9; 13' />
            <animate attributeName='opacity' begin='indefinite' dur='8s' repeatCount='indefinite' keyTimes='0; 0.18; 0.52; 0.72; 1' ref={(animation) => { sheetAnimations.current[9] = animation }} values='0.07; 0.07; 0.42; 0.42; 0.07' />
          </ellipse>

          <path
            d='M126 250 L278 250 C350 250 405 264 438 290 C451 300 459 306 470 306 C481 306 489 300 502 290 C535 264 590 250 662 250 L814 250 L814 270 L662 270 C590 270 538 282 504 306 C490 319 481 326 470 326 C459 326 450 319 436 306 C402 282 350 270 278 270 L126 270 Z'
            fill='url(#vOpeningSheet)'
            stroke='rgba(219,234,254,0.54)'
            strokeWidth='1.5'
            strokeLinejoin='round'
          >
            <animate
              attributeName='d'
              begin='indefinite'
              dur='8s'
              repeatCount='indefinite'
              calcMode='spline'
              keySplines='0.42 0 0.58 1; 0.42 0 0.58 1; 0.42 0 0.58 1; 0.42 0 0.58 1'
              keyTimes='0; 0.18; 0.52; 0.72; 1'
              ref={(animation) => {
                sheetAnimations.current[0] = animation
              }}
              values='M126 250 L278 250 C350 250 405 250 438 250 C451 250 459 250 470 250 C481 250 489 250 502 250 C535 250 590 250 662 250 L814 250 L814 270 L662 270 C590 270 538 270 504 270 C490 270 481 270 470 270 C459 270 450 270 436 270 C402 270 350 270 278 270 L126 270 Z; M126 250 L278 250 C350 250 405 250 438 250 C451 250 459 250 470 250 C481 250 489 250 502 250 C535 250 590 250 662 250 L814 250 L814 270 L662 270 C590 270 538 270 504 270 C490 270 481 270 470 270 C459 270 450 270 436 270 C402 270 350 270 278 270 L126 270 Z; M126 250 L278 250 C350 250 405 264 438 290 C451 300 459 306 470 306 C481 306 489 300 502 290 C535 264 590 250 662 250 L814 250 L814 270 L662 270 C590 270 538 282 504 306 C490 319 481 326 470 326 C459 326 450 319 436 306 C402 282 350 270 278 270 L126 270 Z; M126 250 L278 250 C350 250 405 264 438 290 C451 300 459 306 470 306 C481 306 489 300 502 290 C535 264 590 250 662 250 L814 250 L814 270 L662 270 C590 270 538 282 504 306 C490 319 481 326 470 326 C459 326 450 319 436 306 C402 282 350 270 278 270 L126 270 Z; M126 250 L278 250 C350 250 405 250 438 250 C451 250 459 250 470 250 C481 250 489 250 502 250 C535 250 590 250 662 250 L814 250 L814 270 L662 270 C590 270 538 270 504 270 C490 270 481 270 470 270 C459 270 450 270 436 270 C402 270 350 270 278 270 L126 270 Z'
            />
          </path>

          <path
            d='M126 250 L278 250 C350 250 405 264 438 290 C451 300 459 306 470 306 C481 306 489 300 502 290 C535 264 590 250 662 250 L814 250'
            fill='none'
            stroke='rgba(255,255,255,0.38)'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          >
            <animate
              attributeName='d'
              begin='indefinite'
              dur='8s'
              repeatCount='indefinite'
              calcMode='spline'
              keySplines='0.42 0 0.58 1; 0.42 0 0.58 1; 0.42 0 0.58 1; 0.42 0 0.58 1'
              keyTimes='0; 0.18; 0.52; 0.72; 1'
              ref={(animation) => {
                sheetAnimations.current[1] = animation
              }}
              values='M126 250 L278 250 C350 250 405 250 438 250 C451 250 459 250 470 250 C481 250 489 250 502 250 C535 250 590 250 662 250 L814 250; M126 250 L278 250 C350 250 405 250 438 250 C451 250 459 250 470 250 C481 250 489 250 502 250 C535 250 590 250 662 250 L814 250; M126 250 L278 250 C350 250 405 264 438 290 C451 300 459 306 470 306 C481 306 489 300 502 290 C535 264 590 250 662 250 L814 250; M126 250 L278 250 C350 250 405 264 438 290 C451 300 459 306 470 306 C481 306 489 300 502 290 C535 264 590 250 662 250 L814 250; M126 250 L278 250 C350 250 405 250 438 250 C451 250 459 250 470 250 C481 250 489 250 502 250 C535 250 590 250 662 250 L814 250'
            />
          </path>

          <path
            d='M126 270 L278 270 C350 270 402 282 436 306 C450 319 459 326 470 326 C481 326 490 319 504 306 C538 282 590 270 662 270 L814 270'
            fill='none'
            stroke='rgba(96,165,250,0.45)'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          >
            <animate
              attributeName='d'
              begin='indefinite'
              dur='8s'
              repeatCount='indefinite'
              calcMode='spline'
              keySplines='0.42 0 0.58 1; 0.42 0 0.58 1; 0.42 0 0.58 1; 0.42 0 0.58 1'
              keyTimes='0; 0.18; 0.52; 0.72; 1'
              ref={(animation) => {
                sheetAnimations.current[2] = animation
              }}
              values='M126 270 L278 270 C350 270 402 270 436 270 C450 270 459 270 470 270 C481 270 490 270 504 270 C538 270 590 270 662 270 L814 270; M126 270 L278 270 C350 270 402 270 436 270 C450 270 459 270 470 270 C481 270 490 270 504 270 C538 270 590 270 662 270 L814 270; M126 270 L278 270 C350 270 402 282 436 306 C450 319 459 326 470 326 C481 326 490 319 504 306 C538 282 590 270 662 270 L814 270; M126 270 L278 270 C350 270 402 282 436 306 C450 319 459 326 470 326 C481 326 490 319 504 306 C538 282 590 270 662 270 L814 270; M126 270 L278 270 C350 270 402 270 436 270 C450 270 459 270 470 270 C481 270 490 270 504 270 C538 270 590 270 662 270 L814 270'
            />
          </path>

          <g
            className='zyco-v-opening-diagram__punch'
            filter='url(#vOpeningShadow)'
          >
            <rect x='392' y='48' width='156' height='62' rx='11' fill='url(#vOpeningPunch)' />
            <path d='M414 110 H526 L488 214 Q470 232 452 214 Z' fill='url(#vOpeningPunch)' />
            <path d='M410 72 H530' stroke='rgba(255,255,255,0.28)' strokeWidth='2' strokeLinecap='round' />
            <path d='M550 84 H758' stroke='#93c5fd' strokeWidth='1.5' markerStart='url(#vOpeningArrow)' />
            <text x='774' y='90' fill='#dbeafe' fontSize='14' fontWeight='760'>{labels.punch}</text>
          </g>

          <g
            className='zyco-v-opening-diagram__contacts'
            filter='url(#vOpeningGlow)'
            fill='#7dd3fc'
          >
            <circle cx='470' cy='304' r='6' />
            <circle cx='278' cy='260' r='6' />
            <circle cx='662' cy='260' r='6' />
          </g>

          <g
            className='zyco-v-opening-diagram__forming-reference'
            fill='none'
            stroke='#bae6fd'
            strokeWidth='2'
          >
            <path d='M446 294 A30 30 0 0 0 494 294' strokeDasharray='4 4' />
            <path d='M420 347 A62 62 0 0 0 520 347' />
          </g>

          <g fill='none' stroke='#93c5fd' strokeWidth='1.5' opacity='0.88'>
            <path d='M704 260 H836' markerStart='url(#vOpeningArrow)' />
            <path d='M698 408 H838' markerStart='url(#vOpeningArrow)' />
          </g>

          <g
            className='zyco-v-opening-diagram__forming-reference'
            fill='none'
            stroke='#93c5fd'
            strokeWidth='1.5'
          >
            <path d='M492 296 L658 172 H836' markerStart='url(#vOpeningArrow)' />
            <path d='M520 347 L662 338 H836' markerStart='url(#vOpeningArrow)' />
          </g>

          <g fill='#dbeafe' fontSize='14' fontWeight='760'>
            <text x='850' y='273'>{labels.sheetMetal}</text>
            <text x='850' y='413'>{labels.vDie}</text>
          </g>
          <g
            className='zyco-v-opening-diagram__forming-reference'
            fill='#dbeafe'
            fontSize='14'
            fontWeight='760'
          >
            <text x='850' y='177'>{labels.insideRadius}</text>
            <text x='850' y='343'>{labels.bendAngle}</text>
          </g>

          <g fill='none' stroke='#bae6fd' strokeWidth='2'>
            <path d='M370 504 V484 M570 504 V484 M370 496 H570' />
            <path d='M370 496 L384 489 M370 496 L384 503 M570 496 L556 489 M570 496 L556 503' />
          </g>
          <text
            x='470'
            y='532'
            textAnchor='middle'
            fill='#dbeafe'
            fontSize='14'
            fontWeight='760'
          >
            {labels.vOpening}
          </text>
          </g>
        </svg>
      </div>
    </section>
  )
}
