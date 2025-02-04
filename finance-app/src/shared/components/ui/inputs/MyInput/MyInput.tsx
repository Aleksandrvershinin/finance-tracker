import { ReactNode } from 'react'
import { myInputVariants, TMyInputVariants } from './myInputVariants'

export interface MyInputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    TMyInputVariants {
  icon?: ReactNode
  button?: ReactNode
}

function MyInput({
  icon,
  button,
  myColor,
  myDisabled,
  mySize,
  sizeText,
  ...rest
}: MyInputProps) {
  const withIcon = icon !== undefined
  const withButton = button !== undefined
  return (
    <div className="relative flex items-center">
      {icon && (
        <span className="absolute left-3 top-1/2 transform -translate-y-1/2">
          {icon}
        </span>
      )}
      <input
        className={myInputVariants({
          mySize,
          sizeText,
          myColor,
          myDisabled,
          withIcon,
          withButton,
        })}
        {...rest}
      />
      {withButton && (
        <div className="absolute right-0 top-1/2 transform -translate-y-1/2">
          {button}
        </div>
      )}
    </div>
  )
}

export default MyInput
