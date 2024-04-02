import axios from "axios";
import { useEffect, useState } from "react";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Card from '../components/card'
import Head from 'next/head'

const inter = Inter({ subsets: ["latin"] });

export default function Home() {

  const [pokemons, setPokemons] = useState([]);
  const [filtereds, setFiltereds] = useState([]);
  const [tipos, setTipos] = useState([]);
  let [selecionado, setSelecionado] = useState([]);

  

  useEffect(() => {
    getPokemons();
  }, []);
  
  const getPokemons = () => {
    var endpoints = [];
    for (var i = 1; i < 152; i++) {
      endpoints.push(`https://pokeapi.co/api/v2/pokemon-form/${i}/`);
    }
    axios.all(endpoints.map((endpoint) => axios.get(endpoint))).then((res) => setPokemons(res));
  };


  const pokemonFilter = (name) => {
    var filteredPokemons = [];
    if (name === "") {
      getPokemons();
    }
    for (var i in pokemons) {
      if (pokemons[i].data.name.includes(name)) {
        filteredPokemons.push(pokemons[i]);
      }
    }
  
    setFiltereds(filteredPokemons);
  };
  
  function arrayCompare(first, last)
  {
    var result = (0);
    first.map((f) => {
      for( var n in last){
        if(last[n] == f) {result ++} 
      }
    }); 
    return result;  
  }   
  
  const pokemonFilterbytype = (type) => {
    var types = [];
    tipos.map((t) =>(types.push(t)))
      if (tipos.includes(type)){
        delete types[tipos.indexOf(type)]
        types = types.filter(function (i) {
          return i;
        });
        setTipos(types);
      }
      else{
        types.push(type)
        setTipos(types);
      } 
    var filteredPokemonsbytype = [];
    if (types.length == 0 || types[0] == null) {
      getPokemons();
    }
    pokemons.map((pokemon) => {
      var ti = []
      pokemon.data.types.map((tipo) => {
        ti.push(tipo.type.name)
      });
      if(arrayCompare(types, ti) == types.length ){
        if(!filteredPokemonsbytype.includes(pokemon))
          {filteredPokemonsbytype.push(pokemon)}        
      }
    });
    setFiltereds(filteredPokemonsbytype);
  };
  
  const antselecionado = (id) => {
    setSelecionado(pokemons[id].data)

  }
  const posselecionado = (id) => {
    setSelecionado(pokemons[id - 2].data)

  }
  const tirarselecionado = () =>{
    setSelecionado([])
  }
  

  return (
    <div className={styles.home}>
      <Head>
        <link rel="shortcut icon" href="/static/pokeball.svg" />
        <title>Pokedex</title>
      </Head>
      {selecionado.length != 0 && <div className={styles.selecionado} onClick={(e) => (console.log(selecionado))}>
        <button onClick={(e) =>  {tirarselecionado()}} className={styles.x} ><h1> </h1></button>
        {selecionado.id > 1 ?
        <button onClick={(e) =>  {posselecionado(selecionado.id)}} className={styles.selecionado_button}><h1>&#60;</h1></button>:<h1></h1>} 
        <div className={styles.selecionado_card}>
          <div className={styles.selecionado_imagem}>
               <img src={selecionado.sprites.front_default} alt={selecionado.name} />
          </div>
          <div className={styles.selecionado_descricao}>
               <h1>{selecionado.name}</h1>
                {selecionado.types.length != 0 ? <div className= {`types ${styles.selecionado_types}`} >{selecionado.types.map((tipo) => (<button id={tipo.type.name} key={tipo.type.name}>{tipo.type.name}</button>))} </div>: <h4>nenhum tipo disponivel</h4>}
          </div>
        </div>
        {selecionado.id < pokemons.length ?
        <button onClick={(e) =>  {antselecionado(selecionado.id)}} className={styles.selecionado_button}><h1>&#62;</h1></button>:<h1></h1>}
        
        
      </div>}
      

      <header className={styles.header}>
        <input type="search" name="search" id="search" className={styles.search} onChange={(e) => pokemonFilter(e.target.value)} placeholder="Search" />
        <div className={styles.types}>
          <button id="normal" onClick={(e) =>  {pokemonFilterbytype("normal")}} >Normal</button>
          <button id="fighting" onClick={(e) => pokemonFilterbytype("fighting")} >Fighting</button>
          <button id="flying" onClick={(e) => pokemonFilterbytype("flying")} >Flying</button>
          <button id="poison" onClick={(e) => pokemonFilterbytype("poison")} >Poison</button>
          <button id="ground" onClick={(e) => pokemonFilterbytype("ground")} >Ground</button>
          <button id="rock" onClick={(e) => pokemonFilterbytype("rock")} >Rock</button>
          <button id="bug" onClick={(e) => pokemonFilterbytype("bug")} >Bug</button>
          <button id="ghost" onClick={(e) => pokemonFilterbytype("ghost")} >Ghost</button>
          <button id="steel" onClick={(e) => pokemonFilterbytype("steel")} >Steel</button>
          <button id="fire" onClick={(e) => pokemonFilterbytype("fire")} >Fire</button>
          <button id="water" onClick={(e) => pokemonFilterbytype("water")} >Water</button>
          <button id="grass" onClick={(e) => pokemonFilterbytype("grass")} >Grass</button>
          <button id="electric" onClick={(e) => pokemonFilterbytype("electric")} >Electric</button>
          <button id="psychic" onClick={(e) => pokemonFilterbytype("psychic")} >Psychic</button>
          <button id="ice" onClick={(e) => pokemonFilterbytype("ice")} >Ice</button>
          <button id="dragon" onClick={(e) => pokemonFilterbytype("dragon")} >Dragon</button>
          <button id="fairy" onClick={(e) => pokemonFilterbytype("fairy")} >Fairy</button>
        </div>
      </header>
      <main className={styles.main}>
      {filtereds.length == 0 ? 
      
      (pokemons.length == 0 ? (<h1>Nenhum Pokemon encontrado</h1>)
      :
      (pokemons.map((pokemon) => (
          <button onClick={(e) => setSelecionado(pokemon.data) } className={styles.button} key={pokemon.data.id}>
          <Card img={pokemon.data.sprites.front_default} nome={pokemon.data.name} tipos={pokemon.data.types} numero={pokemon.data.id} />
          </button>
        )
        )))

      : 
      (filtereds.map((pokemon) => (
          <button onClick={(e) => setSelecionado(pokemon.data) } className={styles.button} key={pokemon.data.id}>
          <Card img={pokemon.data.sprites.front_default} nome={pokemon.data.name} tipos={pokemon.data.types} numero={pokemon.data.id} />
          </button>)))}

          
      
      </main>
    </div>
  );
}
