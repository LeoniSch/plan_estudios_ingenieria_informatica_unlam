import { DataProvider, useData } from './context/DataContext.jsx'
import { Materias } from './components/Materias.jsx';
import { Header } from './components/Header.jsx';

const App = () => {
  return (
    <DataProvider>
      <div className='bg-white/95 m-4 rounded-2xl py-14 shadow-2xl backdrop-blur-lg'>
        <Header />
        <Materias />
      </div>
    </DataProvider>
  );
};

export default App;
