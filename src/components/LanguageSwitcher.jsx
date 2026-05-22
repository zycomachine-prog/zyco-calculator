import { languageOptions } from '../languages/engineeringText.js'

export default function LanguageSwitcher({
  language,
  setLanguage,
  className = '',
  style,
  ...selectProps
}) {
  return (
    <>
      <style>
        {`
          .zyco-page-language-switcher {
            position: absolute;
            top: 34px;
            right: 34px;
            z-index: 3;
            width: 240px;
            height: 58px;
            box-sizing: border-box;
            padding: 0 18px;
            border: 1px solid rgba(148, 163, 184, 0.18);
            border-radius: 18px;
            outline: none;
            background: linear-gradient(180deg, #ffffff 0%, #f1f5ff 100%);
            color: #0f172a;
            font-size: 16px;
            font-weight: 800;
            box-shadow: 0 6px 18px rgba(15, 23, 42, 0.05);
          }

          @media (max-width: 640px) {
            .zyco-page-language-switcher {
              position: static;
              width: 100%;
              margin-bottom: 20px;
            }
          }
        `}
      </style>

      <select
        aria-label='Language'
        className={className}
        {...selectProps}
        value={language}
        onChange={(event) => setLanguage(event.target.value)}
        style={style}
      >
        {languageOptions.map((option) => (
          <option
            key={option.value}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>
    </>
  )
}
