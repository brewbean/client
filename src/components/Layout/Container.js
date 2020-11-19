import Header from './Header';
import Alert from 'components/Alert';

const Container = ({ flexCol = true, header = true, paddedContent = true, alert = true, children }) => {
  return (
    <div className={`min-h-screen bg-gray-50 flex ${flexCol ? 'flex-col' : ''}`.trim()}>
      {header && <Header />}
      {
        paddedContent
          ? (
            <div className="flex-1 w-full max-w-7xl mx-auto p-4 sm:px-6 lg:px-8">
              {alert && <Alert containerStyle='mb-4 space-y-2' />}
              {children}
            </div>
          )
          : (
            <>
              {alert && <Alert containerStyle='mb-4 space-y-2' />}
              {children}
            </>
          )
      }
    </div>
  )
}

export default Container;