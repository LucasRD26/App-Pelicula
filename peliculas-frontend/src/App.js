
import react from "react";
import React from "react";
import {BrowserRouter as Router,Switch,Route,Redirect} from "react-router-dom";
import{ Header } from './components/ui/Header'
import {DirectorView} from './components/director/DirectorView'
import {GeneroView} from './components/genero/GeneroView'
import {MediaView} from './components/medias/MediaView'
import {ProductoraView} from './components/productora/ProductoraView'
import {TipoView} from './components/tipo/TipoView'

function App() {
  return <Router>
    <Header />
    <Switch>
      <Route exact path='/' component={MediaView} />
      <Route exact path='/directores' component={DirectorView} />
      <Route exact path='/productoras' component={ProductoraView} />
      <Route exact path='/tipos' component={TipoView} />
      <Route exact path='/generos' component={GeneroView} />
      <Redirect to="/" /> 
    </Switch>
</Router>
}

export default App;
