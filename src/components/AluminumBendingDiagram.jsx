export default function AluminumBendingDiagram({ labels }) {
  return (
    <section
      className='zyco-aluminum-diagram'
      aria-labelledby='aluminum-diagram-heading'
    >
      <style>
        {`
          .zyco-aluminum-diagram {
            position: relative; margin-top: 18px; padding: 24px; overflow: hidden;
            border: 1px solid rgba(180,220,255,.14); border-radius: 26px;
            background: radial-gradient(circle at 50% 38%, rgba(96,165,250,.2), transparent 34%), linear-gradient(135deg, rgba(26,64,112,.72), rgba(8,28,56,.84));
            box-shadow: 0 18px 48px rgba(2,8,23,.2), inset 0 1px 0 rgba(255,255,255,.15);
          }
          .zyco-aluminum-diagram::before {
            content:""; position:absolute; inset:0;
            background-image:linear-gradient(rgba(148,197,255,.045) 1px,transparent 1px),linear-gradient(90deg,rgba(148,197,255,.04) 1px,transparent 1px);
            background-size:28px 28px; mask-image:radial-gradient(circle at 50% 42%,#000,transparent 76%); pointer-events:none;
          }
          .zyco-aluminum-diagram__header, .zyco-aluminum-diagram__stage, .zyco-aluminum-diagram__caption { position:relative; z-index:1; }
          .zyco-aluminum-diagram__eyebrow { margin:0 0 7px; color:#93c5fd; font-size:12px; font-weight:850; letter-spacing:2px; text-transform:uppercase; }
          .zyco-aluminum-diagram__title { margin:0 0 18px; color:#fff; font-size:21px; line-height:1.3; }
          .zyco-aluminum-diagram__stage { overflow:hidden; border:1px solid rgba(191,219,254,.2); border-radius:22px; background:linear-gradient(180deg,rgba(38,84,143,.36),rgba(18,49,93,.34)); }
          .zyco-aluminum-diagram__svg { display:block; width:100%; height:auto; }
          .zyco-aluminum-diagram__caption { margin:16px 0 0; color:#bfdbfe; font-size:14px; line-height:1.65; }
          @media (max-width:760px) { .zyco-aluminum-diagram { padding:18px; border-radius:22px; } .zyco-aluminum-diagram__title { font-size:18px; } }
        `}
      </style>
      <header className='zyco-aluminum-diagram__header'>
        <p className='zyco-aluminum-diagram__eyebrow'>{labels.eyebrow}</p>
        <h2 className='zyco-aluminum-diagram__title' id='aluminum-diagram-heading'>{labels.title}</h2>
      </header>
      <div className='zyco-aluminum-diagram__stage'>
        <svg className='zyco-aluminum-diagram__svg' viewBox='0 0 1040 560' role='img' aria-labelledby='aluminum-svg-title aluminum-svg-description'>
          <title id='aluminum-svg-title'>{labels.svgTitle}</title>
          <desc id='aluminum-svg-description'>{labels.svgDescription}</desc>
          <defs>
            <linearGradient id='alPunch' x2='0' y2='1'><stop stopColor='#e0f2fe' /><stop offset='.45' stopColor='#38bdf8' /><stop offset='1' stopColor='#1d4ed8' /></linearGradient>
            <linearGradient id='alDie' x2='0' y2='1'><stop stopColor='#2563eb' /><stop offset='1' stopColor='#071a3d' /></linearGradient>
            <linearGradient id='alSheet' x2='1'><stop stopColor='#93c5fd' /><stop offset='.42' stopColor='#f8fafc' /><stop offset='.62' stopColor='#dbeafe' /><stop offset='1' stopColor='#60a5fa' /></linearGradient>
            <filter id='alGlow'><feGaussianBlur stdDeviation='5' result='blur' /><feMerge><feMergeNode in='blur' /><feMergeNode in='SourceGraphic' /></feMerge></filter>
            <filter id='alShadow'><feDropShadow dx='0' dy='10' stdDeviation='10' floodColor='#020617' floodOpacity='.34' /></filter>
            <marker id='alArrow' markerWidth='8' markerHeight='8' refX='7' refY='4' orient='auto'><path d='M0 0 L8 4 L0 8' fill='none' stroke='#93c5fd' strokeWidth='1.5' /></marker>
          </defs>
          <g opacity='.38'><path d='M52 456 H988 M520 38 V495' stroke='#60a5fa' strokeDasharray='8 14' /></g>
          <g filter='url(#alShadow)'>
            <path d='M126 454 L288 272 H378 L275 454 Z' fill='url(#alDie)' />
            <path d='M914 454 L752 272 H662 L765 454 Z' fill='url(#alDie)' />
            <path d='M288 272 H378 M662 272 H752' stroke='#bae6fd' strokeWidth='4' />
            <path d='M466 72 H574 L548 242 Q520 274 492 242 Z' fill='url(#alPunch)' />
          </g>
          <path d='M155 266 H300 C360 266 402 279 438 312 L482 354 Q520 391 558 354 L602 312 C638 279 680 266 740 266 H885' fill='none' stroke='url(#alSheet)' strokeWidth='15' strokeLinejoin='round' />
          <path d='M155 255 H300 C360 255 406 270 445 306' fill='none' stroke='#38bdf8' strokeWidth='4' strokeDasharray='10 6' />
          <path d='M595 306 C634 270 680 255 740 255 H885' fill='none' stroke='#38bdf8' strokeWidth='4' strokeDasharray='10 6' />
          <path d='M438 312 Q520 391 602 312' fill='none' stroke='#7dd3fc' strokeWidth='2' opacity='.8' />
          <path d='M414 290 L451 314 M589 314 L626 290' stroke='#fb7185' strokeWidth='10' opacity='.72' filter='url(#alGlow)' />
          <path d='M552 344 A53 53 0 0 1 594 316' fill='none' stroke='#7dd3fc' strokeWidth='2' markerEnd='url(#alArrow)' />
          <path d='M614 246 A120 120 0 0 1 683 207' fill='none' stroke='#38bdf8' strokeWidth='2' strokeDasharray='6 7' markerEnd='url(#alArrow)' />
          <g fill='#dbeafe' fontFamily='Inter, Arial, sans-serif' fontSize='16' fontWeight='700'>
            <text x='595' y='81'>{labels.punch}</text><path d='M587 88 L557 117' stroke='#93c5fd' markerEnd='url(#alArrow)' />
            <text x='83' y='213'>{labels.film}</text><path d='M205 219 L274 253' stroke='#38bdf8' markerEnd='url(#alArrow)' />
            <text x='83' y='248'>{labels.sheet}</text><path d='M211 252 L285 265' stroke='#93c5fd' markerEnd='url(#alArrow)' />
            <text x='92' y='492'>{labels.vDie}</text>
            <text x='614' y='360'>{labels.insideRadius}</text>
            <text x='697' y='199'>{labels.springback}</text>
            <text x='232' y='330'>{labels.markZone}</text><path d='M372 324 L415 306' stroke='#fda4af' markerEnd='url(#alArrow)' />
          </g>
        </svg>
      </div>
      <p className='zyco-aluminum-diagram__caption'>{labels.caption}</p>
    </section>
  )
}
