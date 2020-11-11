import Header from '../Header';

const HeaderContainer = ({ children }) => (
  <div className='min-h-screen bg-white flex flex-col'>
    <Header />
    {children}
  </div>
);

export default HeaderContainer;