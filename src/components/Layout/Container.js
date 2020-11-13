import Header from './Header';

const Container = ({ flexCol = true, header = true, children }) => {
  return (
    <div className={`min-h-screen bg-white flex ${flexCol ? 'flex-col' : ''}`.trim()}>
      {header && <Header />}
      {children}
    </div>
  )
}

export default Container;