import Header from './Header'
import Footer from './Footer'
import Alert from 'components/Alert'

const Container = ({ defaultLayout = true, config, children }) => {
  let settings = defaultLayout
    ? {
        flexCol: true,
        header: true,
        footer: true,
        paddedContent: true,
        layout: true,
        alert: true,
        layoutClass: '',
        ...config,
      }
    : { ...config }

  return (
    <div
      className={`min-h-screen bg-gray-50 flex ${
        settings.flexCol ? 'flex-col' : ''
      }`.trim()}
    >
      {settings.header && <Header />}
      {settings.layout ? (
        <div
          className={`flex-1 ${
            settings.paddedContent
              ? 'w-full max-w-7xl mx-auto p-4 sm:px-6 lg:px-8'
              : ''
          } ${settings.layoutClass}`.trimEnd()}
        >
          {settings.alert && <Alert containerStyle='mb-4 space-y-2' />}
          {children}
        </div>
      ) : (
        <>
          {settings.alert && <Alert containerStyle='mb-4 space-y-2' />}
          {children}
        </>
      )}
      {settings.footer && <Footer />}
    </div>
  )
}

export default Container
