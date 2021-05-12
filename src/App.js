import './App.css';
import Row from './components/Row';
import requests from './requests';

function App() {
  return (
    <div className="app">
      <h1>Netflix clone 🚀 </h1>
      <Row title="NETFLIX ORIGINALS"  fetchUrl={requests.fetchNetflixOriginals}/>
      <Row title="Treading Now" fetchUrl={requests.fetchTrending}/>
    </div>
  );
}

export default App;
