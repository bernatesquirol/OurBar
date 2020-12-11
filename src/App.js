import './App.css';
import React,{useReducer} from 'react'
import 'mapbox-gl/dist/mapbox-gl.css';
import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';
const Map = ReactMapboxGl({
  accessToken:
    'pk.eyJ1IjoiYmVybmF0ZXNxdWlyb2wiLCJhIjoiY2prNTI1c2JhMHZodjN2cWdscjByc3J5dyJ9.eesyqnM0l61WW2olx-QhzQ'
});
const getCentroid = (points)=>{
  if (points.length===0) return [2.1700471,41.3870154]
  let sum = points.reduce((acc,current)=>[acc[0]+current[0], acc[1]+current[1]],[0,0])
  return [sum[0]/points.length, sum[1]/points.length]
}

function reducer(state, action) {
  console.log(state.points, 'in')
  switch (action.type) {
    case 'addPoint':
      return {points: [...state.points, action.payload.newPoint]};
    default:
      throw new Error();
  }
}
  
function App () {
  // const [points, changePoints] = useState([])
  const [state, dispatch] = useReducer(reducer, {'points':[]});
  // const addPoint = (e,p)=>{
  //   let newPoints = [, ...points]
  //   console.log(points, newPoints)
  //   changePoints(newPoints)
  // }
  const centroid = getCentroid(state.points)
  return (
    <Map
      // eslint-disable-next-line
      style={"mapbox://styles/bernatesquirol/ckhx714630k5r19ml62nlo90w"}
      containerStyle={{
        height: '100vh',
        width: '100vw'
      }}
      center={state.points.length===0?[2.1700471,41.3870154]:(state.points.length===1?state.points[0]: centroid)}
      bearing={[-44.4105]}
      onClick={(e,p)=>{dispatch({type:'addPoint', payload:{newPoint:[p.lngLat['lng'],p.lngLat['lat']]}})}}
      
    >
      {state.points.length>1?<Layer type="symbol" id="centroid" layout={{ 'icon-image': 'bar-15' }}>
          <Feature coordinates={centroid} />
        </Layer> :null}
      {state.points.map((p,i)=>{
        return <Layer onClick={()=>console.log(i+1)} type="symbol" id={`marker-${Math.random()}`} layout={{ 'icon-image': 'castle-15' }}>
          <Feature coordinates={p} />
        </Layer>  
      })}
      
    </Map>
  );
}
  
  

export default App;
