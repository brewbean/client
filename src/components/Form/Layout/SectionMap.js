import { createId } from 'helper/stringHelper'
import Section from './Section'
import TwoColumnInput from './TwoColumnInput'

const SectionMap = ({ title, subtitle, register, data, children }) => (
  <Section {...{ title, subtitle }}>
    {data.map((input) => {
      const {
        readOnly,
        name,
        className,
        placeholder,
        type,
        defaultValue,
        options,
        rows,
        step,
        ...rest
      } = input
      const id = createId(input.label)
      return (
        <TwoColumnInput key={input.name} htmlFor={id} {...rest}>
          {type === 'select' ? (
            <select
              {...{
                id,
                name,
                className,
                defaultValue,
                readOnly,
                ref: register,
              }}
            >
              {options.map(({ value, text }) => (
                <option key={value} value={value}>
                  {text}
                </option>
              ))}
            </select>
          ) : type === 'textarea' ? (
            <textarea
              {...{
                id,
                name,
                className,
                defaultValue,
                placeholder,
                rows,
                ref: register,
              }}
            />
          ) : (
            <input
              {...{
                id,
                name,
                type,
                className,
                defaultValue,
                placeholder,
                step,
                ref: register,
              }}
            />
          )}
        </TwoColumnInput>
      )
    })}
    {children}
  </Section>
)

export default SectionMap
