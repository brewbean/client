import Header from './Header'
import Footer from './Footer'
import { Modal } from 'components/Modal'

const Container = ({ config, children, defaultLayout = true }) => {
  let settings = defaultLayout
    ? {
        flexCol: true,
        header: true,
        footer: true,
        paddedContent: true,
        layout: true,
        layoutClass: '',
        ...config,
      }
    : { ...config }

  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex ${
        settings.flexCol ? 'flex-col' : ''
      }`.trim()}
    >
      {settings.header && <Header />}
      {settings.layout ? (
        <div
          className={`flex-1 ${
            settings.paddedContent
              ? 'w-full max-w-7xl mx-auto p-4 sm:px-6 lg:py-6 lg:px-8'
              : ''
          } ${settings.layoutClass}`.trimEnd()}
        >
          {children}
        </div>
      ) : (
        <>{children}</>
      )}
      {settings.footer && <Footer />}
      <Modal />
    </div>
  )
}

export default Container
