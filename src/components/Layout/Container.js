import Header from './Header';
import Footer from './Footer';
import Alert from 'components/Alert';

const Container = ({ noLayout = false, config, children }) => {
  let settings = noLayout
    ? { ...config }
    : {
      flexCol: true,
      header: true,
      footer: true,
      paddedContent: true,
      alert: true,
      ...config
    }
  
  return (
    <div className={`min-h-screen bg-gray-50 flex ${settings.flexCol ? 'flex-col' : ''}`.trim()}>
      {settings.header && <Header />}
      {
        settings.paddedContent
          ? (
            <div className="flex-1 w-full max-w-7xl mx-auto p-4 sm:px-6 lg:px-8">
              {settings.alert && <Alert containerStyle='mb-4 space-y-2' />}
              {children}
            </div>
          )
          : (
            <>
              {settings.alert && <Alert containerStyle='mb-4 space-y-2' />}
              {children}
            </>
          )
      }
      {settings.footer && <Footer />}
    </div>
  )
}

export default Container;