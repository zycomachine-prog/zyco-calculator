import { useEffect } from 'react'
import BottomingVsCoiningMotionDiagram from '../components/BottomingVsCoiningMotionDiagram.jsx'
import LanguageSwitcher from '../components/LanguageSwitcher.jsx'
import { getEngineeringText } from '../languages/engineeringText.js'
import {
  getSiteUrl,
  setPageSEO,
  setStructuredData,
} from '../utils/seo.js'

const routePath = '/engineering-tools/bottoming-vs-coining-guide'

const relatedTools = [
  ['pressBrakeCalculator', '/engineering-tools/press-brake-calculator'],
  ['bendAllowanceCalculator', '/engineering-tools/bend-allowance-calculator'],
  ['kFactorGuide', '/engineering/k-factor-guide'],
  ['bendDeductionGuide', '/engineering/bend-deduction-guide'],
  ['materialDatabase', '/engineering-tools/material-database'],
  ['springbackDatabase', '/engineering-tools/springback-database'],
  ['springbackCompensationGuide', '/springback-compensation-guide'],
  ['vDieSelectionTool', '/engineering-tools/v-die-selection'],
  ['insideRadiusGuide', '/engineering-tools/inside-radius-guide'],
  ['airBendingGuide', '/engineering-tools/air-bending-guide'],
  ['bottomingVsCoiningGuide', routePath],
  ['bendSequenceGuide', '/engineering-tools/bend-sequence-guide'],
  ['pressBrakeTonnageGuide', '/engineering/press-brake-tonnage-guide'],
  ['vDieOpeningGuide', '/engineering/how-to-choose-press-brake-v-die-opening'],
  ['minimumFlangeLengthGuide', '/engineering/minimum-flange-length-guide'],
  ['toolingSelectionGuide', '/engineering/press-brake-tooling-selection-guide'],
  ['crowningGuide', '/engineering/press-brake-crowning-guide'],
  ['stainlessSteelBendingGuide', '/engineering/stainless-steel-bending-guide'],
  ['aluminumBendingGuide', '/engineering/aluminum-bending-guide'],
]

export default function BottomingVsCoiningGuide({
  language = 'en',
  setLanguage = () => {},
}) {
  const t = getEngineeringText(language)
  const page = t.pages.bottoming

  useEffect(() => {
    setPageSEO({
      title: 'Bottoming vs Coining vs Air Bending | Press Brake Guide | ZYCO',
      description:
        'Compare air bending, bottoming and coining by tool contact, springback, press brake tonnage, inside radius, accuracy, tool wear and production use.',
      keywords:
        'bottoming vs coining, air bending vs bottoming, press brake coining, press brake bottoming, springback, press brake tonnage, inside radius',
      canonicalPath: routePath,
    })

    setStructuredData({
      id: 'bottoming-vs-coining-guide-jsonld',
      data: {
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'TechArticle',
            headline: 'Bottoming vs Coining vs Air Bending',
            description:
              'Engineering comparison of air bending, bottoming and coining for press brake sheet metal forming.',
            author: { '@type': 'Organization', name: 'ZYCO' },
            publisher: { '@type': 'Organization', name: 'ZYCO', url: getSiteUrl('/') },
            mainEntityOfPage: getSiteUrl(routePath),
          },
          {
            '@type': 'FAQPage',
            mainEntity: page.faq.map(([question, answer]) => ({
              '@type': 'Question',
              name: question,
              acceptedAnswer: { '@type': 'Answer', text: answer },
            })),
          },
          {
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Engineering Tools', item: getSiteUrl('/engineering-tools') },
              { '@type': 'ListItem', position: 2, name: 'Bottoming vs Coining Guide', item: getSiteUrl(routePath) },
            ],
          },
        ],
      },
    })
  }, [page.faq])

  return (
    <>
      <style>
        {`
          .zyco-method-guide {
            min-height: 100vh;
            box-sizing: border-box;
            padding: 52px 22px;
            color: #fff;
            background:
              radial-gradient(circle at 16% 10%, rgba(96,165,250,.33), transparent 28%),
              radial-gradient(circle at 84% 16%, rgba(14,165,233,.2), transparent 25%),
              linear-gradient(145deg, #071224 0%, #0b1f3f 42%, #12366e 74%, #1d4ed8 100%);
            font-family: Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif;
            position: relative;
          }
          .zyco-method-guide::before {
            content: "";
            position: absolute;
            inset: 0;
            background-image: linear-gradient(rgba(96,165,250,.075) 1px, transparent 1px), linear-gradient(90deg, rgba(96,165,250,.075) 1px, transparent 1px);
            background-size: 42px 42px;
            mask-image: linear-gradient(to bottom, #000, transparent 90%);
            pointer-events: none;
          }
          .zyco-method-guide__shell { width: min(1160px, 100%); margin: 0 auto; position: relative; }
          .zyco-method-guide__header, .zyco-method-guide__panel {
            margin-bottom: 22px;
            padding: 30px;
            border: 1px solid rgba(147,197,253,.2);
            border-radius: 28px;
            background: linear-gradient(145deg, rgba(255,255,255,.14), rgba(255,255,255,.05));
            box-shadow: 0 22px 60px rgba(0,0,0,.25);
            backdrop-filter: blur(16px);
          }
          .zyco-method-guide__back, .zyco-method-guide__tool {
            display: inline-flex;
            padding: 11px 16px;
            border: 1px solid rgba(147,197,253,.38);
            border-radius: 14px;
            color: #dbeafe;
            background: rgba(30,64,175,.32);
            font-weight: 760;
            text-decoration: none;
            transition: all .25s ease;
          }
          .zyco-method-guide__back:hover {
            transform: translateY(-2px);
            border-color: rgba(125,211,252,.7);
            color: #fff;
            background: rgba(37,99,235,.42);
            box-shadow: 0 14px 32px rgba(37,99,235,.32), 0 0 0 1px rgba(125,211,252,.16);
          }
          .zyco-method-guide__tool:hover {
            transform: translateY(-4px);
            border-color: rgba(125,211,252,.7);
            color: #fff;
            background: rgba(37,99,235,.4);
            box-shadow: 0 14px 30px rgba(56,189,248,.22), 0 7px 22px rgba(2,8,23,.22);
          }
          .zyco-method-guide__back:focus-visible, .zyco-method-guide__tool:focus-visible {
            outline: 3px solid rgba(147,197,253,.46);
            outline-offset: 3px;
          }
          .zyco-method-guide__eyebrow { margin: 24px 0 10px; color: #93c5fd; letter-spacing: 2px; font-weight: 850; text-transform: uppercase; font-size: 12px; }
          .zyco-method-guide__title { max-width: 880px; margin: 0; font-size: clamp(34px, 5vw, 48px); line-height: 1.12; font-weight: 900; }
          .zyco-method-guide__subtitle { max-width: 850px; margin: 15px 0 0; color: #dbeafe; font-size: 17px; line-height: 1.7; }
          .zyco-method-guide__notice { margin: 22px 0 0; padding: 16px 18px; border-left: 3px solid #38bdf8; border-radius: 0 12px 12px 0; background: rgba(15,45,88,.42); color: #bfdbfe; line-height: 1.65; }
          .zyco-method-guide__section-title { margin: 0 0 14px; font-size: 25px; font-weight: 850; }
          .zyco-method-guide__copy { color: #dbeafe; font-size: 15.5px; line-height: 1.78; }
          .zyco-method-guide__copy p { margin: 0 0 12px; }
          .zyco-method-guide__copy p:last-child { margin-bottom: 0; }
          .zyco-method-guide__grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 16px; margin-bottom: 22px; }
          .zyco-method-guide__grid .zyco-method-guide__panel { margin: 0; padding: 24px; }
          .zyco-method-guide__grid h2 { margin: 0 0 12px; font-size: 21px; }
          .zyco-method-guide__table-wrap { overflow-x: auto; }
          .zyco-method-guide__table { width: 100%; border-collapse: collapse; min-width: 740px; font-size: 14px; }
          .zyco-method-guide__table th { color: #fff; background: rgba(37,99,235,.34); text-align: left; }
          .zyco-method-guide__table th, .zyco-method-guide__table td { padding: 13px 12px; border-bottom: 1px solid rgba(147,197,253,.16); vertical-align: top; }
          .zyco-method-guide__table td { color: #dbeafe; }
          .zyco-method-guide__faq { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 14px; }
          .zyco-method-guide__faq article { padding: 17px; border: 1px solid rgba(147,197,253,.15); border-radius: 16px; background: rgba(10,34,70,.3); }
          .zyco-method-guide__faq h3 { margin: 0 0 8px; font-size: 16px; }
          .zyco-method-guide__faq p { margin: 0; color: #dbeafe; line-height: 1.6; font-size: 14px; }
          .zyco-method-guide__tools { display: flex; flex-wrap: wrap; gap: 10px; }
          @media (max-width: 820px) {
            .zyco-method-guide { padding: 28px 14px; }
            .zyco-method-guide__header, .zyco-method-guide__panel { padding: 22px; border-radius: 22px; }
            .zyco-method-guide__grid, .zyco-method-guide__faq { grid-template-columns: 1fr; }
          }
        `}
      </style>
      <main className='zyco-method-guide'>
        <div className='zyco-method-guide__shell'>
          <header className='zyco-method-guide__header'>
            <LanguageSwitcher className='zyco-page-language-switcher' language={language} setLanguage={setLanguage} />
            <a className='zyco-method-guide__back' href='/engineering-tools'>{page.back}</a>
            <p className='zyco-method-guide__eyebrow'>{page.eyebrow}</p>
            <h1 className='zyco-method-guide__title'>{page.title}</h1>
            <p className='zyco-method-guide__subtitle'>{page.subtitle}</p>
            <p className='zyco-method-guide__notice'>{page.shopNote}</p>
          </header>

          <section className='zyco-method-guide__grid' aria-label={page.methodsAria}>
            {page.methods.map(([title, text]) => (
              <article className='zyco-method-guide__panel' key={title}>
                <h2>{title}</h2>
                <div className='zyco-method-guide__copy'><p>{text}</p></div>
              </article>
            ))}
          </section>

          <BottomingVsCoiningMotionDiagram labels={page.motion} />

          <section className='zyco-method-guide__panel' style={{ marginTop: 22 }} aria-labelledby='method-comparison-title'>
            <h2 className='zyco-method-guide__section-title' id='method-comparison-title'>{page.comparisonTitle}</h2>
            <p className='zyco-method-guide__copy'>{page.comparisonIntro}</p>
            <div className='zyco-method-guide__table-wrap'>
              <table className='zyco-method-guide__table'>
                <thead><tr>{page.comparisonHeaders.map((header) => <th key={header}>{header}</th>)}</tr></thead>
                <tbody>{page.comparison.map((row) => <tr key={row[0]}>{row.map((cell) => <td key={cell}>{cell}</td>)}</tr>)}</tbody>
              </table>
            </div>
          </section>

          {page.sections.map(([title, text]) => (
            <section className='zyco-method-guide__panel' key={title}>
              <h2 className='zyco-method-guide__section-title'>{title}</h2>
              <div className='zyco-method-guide__copy'>{text.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
            </section>
          ))}

          <section className='zyco-method-guide__panel' aria-labelledby='method-faq-title'>
            <h2 className='zyco-method-guide__section-title' id='method-faq-title'>{page.faqTitle}</h2>
            <div className='zyco-method-guide__faq'>
              {page.faq.map(([question, answer]) => <article key={question}><h3>{question}</h3><p>{answer}</p></article>)}
            </div>
          </section>

          <section className='zyco-method-guide__panel' aria-labelledby='method-related-title'>
            <h2 className='zyco-method-guide__section-title' id='method-related-title'>{t.common.relatedEngineeringTools}</h2>
            <nav className='zyco-method-guide__tools' aria-label={t.common.relatedToolsAria}>
              {relatedTools.map(([key, href]) => <a className='zyco-method-guide__tool' href={href} key={key}>{t.relatedTools[key]}</a>)}
            </nav>
          </section>
        </div>
      </main>
    </>
  )
}
