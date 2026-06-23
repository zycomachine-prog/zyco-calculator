const CTA_LINKS = {
  whatsapp: 'https://wa.me/8613813072498',
  website: 'https://www.zycomachine.com/',
}

const CTA_TEXT = {
  en: {
    eyebrow: 'ZYCO Engineering Support',
    title: 'Need help choosing the right press brake solution?',
    description:
      'Share your material, thickness, bending length, drawings, or production requirements. ZYCO can help you evaluate suitable press brake capacity, tooling, and bending solutions.',
    primary: 'Talk to ZYCO Engineers',
    secondary: 'Visit ZYCO Website',
  },
  zh: {
    eyebrow: 'ZYCO 工程支持',
    title: '需要帮助选择合适的折弯解决方案？',
    description:
      '您可以提供材料、板厚、折弯长度、图纸或生产要求。ZYCO 可帮助您评估合适的折弯机吨位、模具配置和折弯方案。',
    primary: '联系 ZYCO 工程师',
    secondary: '访问 ZYCO 官网',
  },
  cn: {
    eyebrow: 'ZYCO 工程支持',
    title: '需要帮助选择合适的折弯解决方案？',
    description:
      '您可以提供材料、板厚、折弯长度、图纸或生产要求。ZYCO 可帮助您评估合适的折弯机吨位、模具配置和折弯方案。',
    primary: '联系 ZYCO 工程师',
    secondary: '访问 ZYCO 官网',
  },
  ru: {
    eyebrow: 'Инженерная поддержка ZYCO',
    title: 'Нужна помощь в выборе подходящего решения для гибки?',
    description:
      'Отправьте материал, толщину, длину гибки, чертежи или производственные требования. ZYCO поможет оценить подходящую мощность пресса, оснастку и технологию гибки.',
    primary: 'Связаться с инженерами ZYCO',
    secondary: 'Посетить сайт ZYCO',
  },
  es: {
    eyebrow: 'Soporte de ingeniería ZYCO',
    title: '¿Necesita ayuda para elegir la solución de plegado adecuada?',
    description:
      'Comparta el material, espesor, longitud de plegado, planos o requisitos de producción. ZYCO puede ayudarle a evaluar la capacidad de la prensa plegadora, las herramientas y la solución de plegado adecuadas.',
    primary: 'Hablar con ingenieros de ZYCO',
    secondary: 'Visitar el sitio web de ZYCO',
  },
  tr: {
    eyebrow: 'ZYCO Mühendislik Desteği',
    title: 'Doğru abkant çözümünü seçmek için yardıma mı ihtiyacınız var?',
    description:
      'Malzeme, kalınlık, büküm uzunluğu, teknik çizimler veya üretim gereksinimlerinizi paylaşın. ZYCO uygun abkant kapasitesi, takım seçimi ve büküm çözümünü değerlendirmenize yardımcı olabilir.',
    primary: 'ZYCO Mühendisleriyle Görüşün',
    secondary: 'ZYCO Web Sitesini Ziyaret Edin',
  },
  id: {
    eyebrow: 'Dukungan Engineering ZYCO',
    title: 'Butuh bantuan memilih solusi press brake yang tepat?',
    description:
      'Bagikan material, ketebalan, panjang bending, gambar kerja, atau kebutuhan produksi Anda. ZYCO dapat membantu mengevaluasi kapasitas press brake, tooling, dan solusi bending yang sesuai.',
    primary: 'Konsultasi dengan Engineer ZYCO',
    secondary: 'Kunjungi Website ZYCO',
  },
}

export default function EngineeringCTA({ language = 'en' }) {
  const content = CTA_TEXT[language] || CTA_TEXT.en

  return (
    <section
      className='zyco-engineering-cta'
      aria-labelledby='zyco-engineering-cta-title'
    >
      <style>
        {`
          .zyco-engineering-cta {
            box-sizing: border-box;
            display: grid;
            grid-template-columns: minmax(0, 1fr) auto;
            gap: 26px;
            align-items: center;
            margin: 22px 0;
            padding: 28px;
            border: 1px solid rgba(147, 197, 253, 0.24);
            border-radius: 24px;
            background:
              radial-gradient(circle at 15% 18%, rgba(56, 189, 248, 0.22), transparent 34%),
              linear-gradient(145deg, rgba(15, 23, 42, 0.78), rgba(30, 64, 175, 0.34));
            box-shadow: 0 22px 54px rgba(2, 8, 23, 0.26);
            backdrop-filter: blur(16px);
            position: relative;
            overflow: hidden;
          }

          .zyco-engineering-cta::before {
            content: "";
            position: absolute;
            inset: 0;
            border-radius: inherit;
            background:
              linear-gradient(90deg, rgba(125, 211, 252, 0.18), transparent 38%),
              linear-gradient(rgba(147, 197, 253, 0.06) 1px, transparent 1px);
            background-size: auto, 100% 18px;
            pointer-events: none;
          }

          .zyco-engineering-cta__content,
          .zyco-engineering-cta__actions {
            position: relative;
            z-index: 1;
          }

          .zyco-engineering-cta__eyebrow {
            margin: 0 0 10px;
            color: #93c5fd;
            font-size: 12px;
            font-weight: 850;
            letter-spacing: 1.8px;
            text-transform: uppercase;
          }

          .zyco-engineering-cta__title {
            margin: 0;
            color: #ffffff;
            font-size: 26px;
            line-height: 1.22;
            font-weight: 850;
            letter-spacing: 0;
          }

          .zyco-engineering-cta__description {
            max-width: 790px;
            margin: 12px 0 0;
            color: #dbeafe;
            font-size: 15px;
            line-height: 1.72;
            font-weight: 620;
          }

          .zyco-engineering-cta__actions {
            display: flex;
            flex-wrap: wrap;
            justify-content: flex-end;
            gap: 12px;
          }

          .zyco-engineering-cta__button {
            min-width: 164px;
            min-height: 50px;
            box-sizing: border-box;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            padding: 0 22px;
            border: 1px solid rgba(147, 197, 253, 0.34);
            border-radius: 16px;
            color: #ffffff;
            font-size: 14px;
            font-weight: 800;
            text-decoration: none;
            white-space: nowrap;
            background:
              linear-gradient(180deg, rgba(147, 197, 253, 0.13), rgba(30, 64, 175, 0.08)),
              rgba(15, 23, 42, 0.2);
            box-shadow:
              inset 0 1px 0 rgba(255, 255, 255, 0.18),
              0 10px 24px rgba(2, 8, 23, 0.18);
            backdrop-filter: blur(16px) saturate(145%);
            transition:
              transform 0.24s ease,
              border-color 0.24s ease,
              background 0.24s ease,
              box-shadow 0.24s ease,
              color 0.24s ease;
          }

          .zyco-engineering-cta__button:hover {
            transform: translateY(-2px);
            border-color: rgba(191, 219, 254, 0.56);
            background:
              linear-gradient(180deg, rgba(147, 197, 253, 0.2), rgba(37, 99, 235, 0.12)),
              rgba(15, 23, 42, 0.22);
            box-shadow:
              inset 0 1px 0 rgba(255, 255, 255, 0.24),
              0 14px 30px rgba(2, 8, 23, 0.2),
              0 0 24px rgba(96, 165, 250, 0.16);
          }

          .zyco-engineering-cta__button--primary {
            border-color: rgba(125, 211, 252, 0.52);
            background:
              linear-gradient(180deg, rgba(125, 211, 252, 0.18), rgba(37, 99, 235, 0.12)),
              rgba(30, 64, 175, 0.26);
            box-shadow:
              inset 0 1px 0 rgba(255, 255, 255, 0.22),
              0 12px 28px rgba(2, 8, 23, 0.18),
              0 0 20px rgba(56, 189, 248, 0.14);
          }

          .zyco-engineering-cta__button--primary:hover {
            border-color: rgba(186, 230, 253, 0.68);
            background:
              linear-gradient(180deg, rgba(125, 211, 252, 0.24), rgba(37, 99, 235, 0.16)),
              rgba(30, 64, 175, 0.32);
            box-shadow:
              inset 0 1px 0 rgba(255, 255, 255, 0.28),
              0 14px 32px rgba(2, 8, 23, 0.2),
              0 0 28px rgba(56, 189, 248, 0.22);
          }

          .zyco-engineering-cta__button--secondary {
            border-color: rgba(147, 197, 253, 0.28);
            background:
              linear-gradient(180deg, rgba(96, 165, 250, 0.1), rgba(30, 64, 175, 0.06)),
              rgba(15, 23, 42, 0.28);
            color: #dbeafe;
          }

          .zyco-engineering-cta__button--secondary:hover {
            border-color: rgba(147, 197, 253, 0.5);
            background:
              linear-gradient(180deg, rgba(96, 165, 250, 0.16), rgba(30, 64, 175, 0.1)),
              rgba(15, 23, 42, 0.3);
            color: #ffffff;
          }

          @media (max-width: 900px) {
            .zyco-engineering-cta {
              grid-template-columns: 1fr;
            }

            .zyco-engineering-cta__actions {
              justify-content: flex-start;
            }
          }

          @media (max-width: 640px) {
            .zyco-engineering-cta {
              padding: 22px;
              border-radius: 22px;
            }

            .zyco-engineering-cta__title {
              font-size: 22px;
            }

            .zyco-engineering-cta__button {
              width: 100%;
              min-width: 0;
              white-space: normal;
              text-align: center;
            }

            .zyco-engineering-cta__actions {
              width: 100%;
              box-sizing: border-box;
              flex-direction: column;
            }
          }
        `}
      </style>

      <div className='zyco-engineering-cta__content'>
        <p className='zyco-engineering-cta__eyebrow'>
          {content.eyebrow}
        </p>

        <h2
          className='zyco-engineering-cta__title'
          id='zyco-engineering-cta-title'
        >
          {content.title}
        </h2>

        <p className='zyco-engineering-cta__description'>
          {content.description}
        </p>
      </div>

      <div
        className='zyco-engineering-cta__actions'
        aria-label={content.eyebrow}
      >
        <a
          className='zyco-engineering-cta__button zyco-engineering-cta__button--primary'
          href={CTA_LINKS.whatsapp}
          rel='noopener noreferrer'
          target='_blank'
        >
          {content.primary}
        </a>

        <a
          className='zyco-engineering-cta__button zyco-engineering-cta__button--secondary'
          href={CTA_LINKS.website}
          rel='noopener noreferrer'
          target='_blank'
        >
          {content.secondary}
        </a>
      </div>
    </section>
  )
}
