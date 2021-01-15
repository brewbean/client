export const ButtonLeftIcon = ({
  icon: Icon,
  iconClass,
  children,
  onClick,
  color = 'green',
  size = 'med',
  className,
}) => {
  const buttonClass = className
    ? className
    : size === 'med'
    ? 'inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-base font-medium rounded-md text-white  focus:outline-none focus:ring-2 focus:ring-offset-2'
    : ''

  const colorClass =
    color === 'green'
      ? 'bg-green-500 hover:bg-green-600 focus:ring-green-500'
      : color === 'red'
      ? 'bg-red-500 hover:bg-red-600 focus:ring-red-500'
      : color === 'yellow'
      ? 'bg-yellow-500 hover:bg-yellow-600 focus:ring-yellow-500'
      : ''

  return (
    <button
      type='button'
      onClick={onClick}
      className={(buttonClass + ' ' + colorClass).trimEnd()}
    >
      <Icon
        className={
          iconClass ? iconClass : size === 'med' ? '-ml-1 mr-2 h-5 w-5' : ''
        }
      />
      {children}
    </button>
  )
}
