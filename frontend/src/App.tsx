import './App.css';
import Gantt from './Gantt';

const App = () => (
  <div className='App'>
    <Gantt day={new Date()} />
  </div>
);

export default App;
