export default function CrowningDiagram({ labels }) {
  return (
    <section
      className='zyco-crowning-diagram'
      aria-labelledby='crowning-diagram-title'
    >
      <style>
        {`
          .zyco-crowning-diagram {
            position: relative;
            width: 100%;
            box-sizing: border-box;
            margin-top: 18px;
            padding: 24px;
            overflow: hidden;
            border: 1px solid rgba(180, 220, 255, 0.12);
            border-radius: 26px;
            background:
              radial-gradient(circle at 50% 40%, rgba(125, 211, 252, 0.15), transparent 35%),
              linear-gradient(135deg, rgba(26, 64, 112, 0.72), rgba(8, 28, 56, 0.82));
            box-shadow:
              0 18px 48px rgba(2, 8, 23, 0.18),
              inset 0 1px 0 rgba(255, 255, 255, 0.16);
          }

          .zyco-crowning-diagram::before {
            content: "";
            position: absolute;
            inset: 1px;
            border-radius: 25px;
            background-image:
              linear-gradient(rgba(148, 197, 255, 0.045) 1px, transparent 1px),
              linear-gradient(90deg, rgba(148, 197, 255, 0.04) 1px, transparent 1px);
            background-size: 28px 28px;
            mask-image: radial-gradient(circle at 50% 48%, #000, transparent 76%);
            pointer-events: none;
          }

          .zyco-crowning-diagram__header,
          .zyco-crowning-diagram__stage {
            position: relative;
            z-index: 1;
          }

          .zyco-crowning-diagram__header {
            margin-bottom: 18px;
          }

          .zyco-crowning-diagram__eyebrow {
            margin: 0 0 7px;
            color: #93c5fd;
            font-size: 12px;
            font-weight: 850;
            letter-spacing: 2px;
            text-transform: uppercase;
          }

          .zyco-crowning-diagram__title {
            margin: 0;
            color: #ffffff;
            font-size: 21px;
            line-height: 1.3;
            font-weight: 850;
          }

          .zyco-crowning-diagram__stage {
            border: 1px solid rgba(191, 219, 254, 0.2);
            border-radius: 22px;
            background: linear-gradient(180deg, rgba(38, 84, 143, 0.38), rgba(18, 49, 93, 0.34));
            overflow: hidden;
          }

          .zyco-crowning-diagram__svg {
            display: block;
            width: 100%;
            height: auto;
          }

          @media (max-width: 760px) {
            .zyco-crowning-diagram {
              padding: 18px;
              border-radius: 22px;
            }

            .zyco-crowning-diagram__title {
              font-size: 18px;
            }
          }
        `}
      </style>

      <header className='zyco-crowning-diagram__header'>
        <p className='zyco-crowning-diagram__eyebrow'>{labels.eyebrow}</p>
        <h2
          className='zyco-crowning-diagram__title'
          id='crowning-diagram-title'
        >
          {labels.title}
        </h2>
      </header>

      <div className='zyco-crowning-diagram__stage'>
        <svg
          className='zyco-crowning-diagram__svg'
          viewBox='0 0 1120 560'
          role='img'
          aria-labelledby='crowning-svg-title crowning-svg-description'
        >
          <title id='crowning-svg-title'>{labels.svgTitle}</title>
          <desc id='crowning-svg-description'>{labels.svgDescription}</desc>
          <defs>
            <linearGradient id='crowningSteel' x1='0' y1='0' x2='0' y2='1'>
              <stop offset='0%' stopColor='#7dd3fc' />
              <stop offset='52%' stopColor='#2563eb' />
              <stop offset='100%' stopColor='#102e68' />
            </linearGradient>
            <linearGradient id='crowningSheet' x1='0' y1='0' x2='1' y2='0'>
              <stop offset='0%' stopColor='#93c5fd' />
              <stop offset='50%' stopColor='#ffffff' />
              <stop offset='100%' stopColor='#93c5fd' />
            </linearGradient>
            <linearGradient id='crowningComp' x1='0' y1='0' x2='0' y2='1'>
              <stop offset='0%' stopColor='#38bdf8' />
              <stop offset='100%' stopColor='#1d4ed8' />
            </linearGradient>
            <filter id='crowningGlow'>
              <feGaussianBlur stdDeviation='5' result='blur' />
              <feMerge>
                <feMergeNode in='blur' />
                <feMergeNode in='SourceGraphic' />
              </feMerge>
            </filter>
            <marker id='crowningArrow' markerWidth='8' markerHeight='8' refX='7' refY='4' orient='auto'>
              <path d='M0 0 L8 4 L0 8' fill='none' stroke='#93c5fd' strokeWidth='1.4' />
            </marker>
          </defs>

          <line x1='560' y1='32' x2='560' y2='530' stroke='#60a5fa' strokeOpacity='0.22' strokeDasharray='8 14' />

          <g transform='translate(28 0)'>
            <text x='246' y='48' textAnchor='middle' fill='#bae6fd' fontSize='16' fontWeight='800'>{labels.without}</text>
            <rect x='42' y='80' width='408' height='32' rx='8' fill='url(#crowningSteel)' />
            <path d='M62 150 Q246 182 430 150' fill='none' stroke='url(#crowningSheet)' strokeWidth='13' strokeLinecap='round' />
            <path d='M54 252 Q246 284 438 252 L438 286 Q246 318 54 286 Z' fill='url(#crowningSteel)' opacity='0.84' />
            <path d='M246 112 V151' stroke='#7dd3fc' strokeWidth='2' markerEnd='url(#crowningArrow)' />
            <path d='M82 126 V148 M410 126 V148' stroke='#7dd3fc' strokeWidth='2' markerEnd='url(#crowningArrow)' />
            <circle cx='246' cy='170' r='7' fill='#38bdf8' filter='url(#crowningGlow)' />
            <path d='M246 184 V218 H390' fill='none' stroke='#93c5fd' strokeWidth='1.5' markerEnd='url(#crowningArrow)' />
            <text x='398' y='224' fill='#dbeafe' fontSize='13' fontWeight='720'>{labels.centerError}</text>
            <text x='246' y='345' textAnchor='middle' fill='#93c5fd' fontSize='13' fontWeight='720'>{labels.deflection}</text>
          </g>

          <g transform='translate(580 0)'>
            <text x='246' y='48' textAnchor='middle' fill='#bae6fd' fontSize='16' fontWeight='800'>{labels.with}</text>
            <rect x='42' y='80' width='408' height='32' rx='8' fill='url(#crowningSteel)' />
            <path d='M62 157 Q246 160 430 157' fill='none' stroke='url(#crowningSheet)' strokeWidth='13' strokeLinecap='round' />
            <path d='M54 260 Q246 225 438 260 L438 294 Q246 259 54 294 Z' fill='url(#crowningComp)' opacity='0.9' />
            <path d='M246 112 V150' stroke='#7dd3fc' strokeWidth='2' markerEnd='url(#crowningArrow)' />
            <path d='M246 290 V252' stroke='#38bdf8' strokeWidth='2.5' markerEnd='url(#crowningArrow)' filter='url(#crowningGlow)' />
            <path d='M116 160 H388' stroke='#7dd3fc' strokeOpacity='0.45' strokeDasharray='6 8' />
            <path d='M246 240 V210 H398' fill='none' stroke='#93c5fd' strokeWidth='1.5' markerEnd='url(#crowningArrow)' />
            <text x='406' y='216' fill='#dbeafe' fontSize='13' fontWeight='720'>{labels.compensation}</text>
            <text x='246' y='345' textAnchor='middle' fill='#93c5fd' fontSize='13' fontWeight='720'>{labels.consistent}</text>
          </g>

          <g transform='translate(48 398)'>
            <rect width='1024' height='112' rx='18' fill='rgba(15, 37, 72, 0.6)' stroke='rgba(191,219,254,0.16)' />
            <text x='26' y='38' fill='#7dd3fc' fontSize='12' fontWeight='800' letterSpacing='1.5'>{labels.loadPath}</text>
            <text x='26' y='70' fill='#dbeafe' fontSize='14' fontWeight='700'>{labels.caption}</text>
          </g>
        </svg>
      </div>
    </section>
  )
}
