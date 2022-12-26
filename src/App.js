import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faFutbol, faMedal } from '@fortawesome/free-solid-svg-icons'

const App = () => {

  const [player, setPlayer] = useState([]);
  
  // to fetch api data
  useEffect(() => {
    axios.get('https://api.npoint.io/20c1afef1661881ddc9c')
      .then(res => {
        setPlayer(res.data.playerList)
        console.log(player)
      })
    .catch(e => console.log(e));
  })
  
  // to sort player according to $Value - by default on the browser
  const sortAssOrder = (a,b) => {
    return a.Value - b.Value;
  }
  const getvalue = () => {
   player.sort(sortAssOrder)
  }
  const onChangeHandle = (e) =>{
    console.log(e.target.value);
    e.preventDefault();
    if(e.target.value === '')
    {
      window.location.reload(true);
      const tempPlayer = player;
      setPlayer(tempPlayer);
      return
    }
    const searchResult = player.filter(p => p.PFName.toLowerCase().startsWith(e.target.value.toLowerCase()) || p.TName.toLowerCase().startsWith(e.target.value.toLowerCase()));
    setPlayer(searchResult);
    // console.log(player)
  }
  return (
    <>      
      <nav className="navbar navbar-light bg-dark">
        <div className="container-fluid d-lg-flex justify-content-around">
          <a className="navbar-lg-brand text-decoration-none" href='#home'>
            <FontAwesomeIcon icon={faFutbol} style={{ height: '50', color: 'red' }} />
            <span style={{fontSize:'50px',fontWeight:'bold',color:'#fff'}}> Sportz Interactive Academy </span>
            <FontAwesomeIcon icon={faMedal} style={{ height: '50', color: 'red' }} />
          </a>
          <form >
            <input 
              className="form-control me-2" 
              type="search" 
              placeholder="Search" 
              aria-label="Search"
              onChange={onChangeHandle}/>
          </form>
        </div>
      </nav>
      <div className='container'>     
        {getvalue()}
        <div className="disGrid">
          {
            player.map((p, i) => (
              <div className="item" key={i}>
                <div className='item-image'>
                  <img className='m-2 image' src={require(`./player-images/${p.Id}.jpg`)} alt={i} style={{ width: 200, height: 200 }} />
                </div>
                <div className="card-body item-text">
                  <div className='item-text-wrap'>
                    <h5 className="card-title text-center">{p.PFName} {p.SkillDesc}</h5>
                    <h5 className="card-title text-center">{'Value: $' + p.Value}</h5>
                    {p.UpComingMatchesList.map((u,i) => {
                      for (const [] of Object.entries(u)) {
                        return (<div key={i}>
                          <p className="card-text text-center">{(u.CCode && u.VsCCode) ? `${u.CCode} v/s ${u.VsCCode}`:'No Match'}</p>
                          <p className="card-text text-primary text-center">{(u.CCode && u.VsCCode) ?`on ${u.MDate}`:''}</p>
                        </div>)
                      }
                    })}
                  </div>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </>
  );
}

export default App;
