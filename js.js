class App extends React.Component {
  constructor() {
    super();

    //let maxPokemon = 807; // How many pokemons are there?
    let maxPokemon = 151; // Kanto

    this.state = {
      isLoading: false,
      max: maxPokemon,
      pID: Math.floor(Math.random() * maxPokemon) + 1,
      pokemon: {}
    };
    this.changePokemon = this
      .changePokemon
      .bind(this);

  }

  changePokemon = () => {
    let rndPokemon = Math.floor(Math.random() * this.state.max) + 1;
    this.setState(prevState => {
      return {pID: rndPokemon};
    });
    console.log("Clicked");
    //console.log(rndPokemon + ' ' + this.state.pID);
  };

  fetchPokemon = pID => {
    let url = `https://pokeapi.co/api/v2/pokemon/${pID}`;
    this.fetchApi(url);
  };

  fetchApi = url => {
    fetch(url)
      .then(response => response.json())
      .then(data => {
        this.setState({isLoading: false, pokemon: data});
      });
  };

  componentDidMount() {
    this.setState({isLoading: true});

    this.fetchPokemon(this.state.pID);
    console.log(this.state.pID);

  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.pID !== this.state.pID) {
      this.fetchPokemon(this.state.pID);
      console.log(this.state.pID);
    }
  }

  render() {
    let loading = this.state.isLoading
      ? "Loading..."
      : this.state.pokemon.name;
    let sprite = this.state.pokemon.sprites
      ? this.state.pokemon.sprites.front_default
      : "";
    let weight = this.state.pokemon.weight;

    /*
    let message =
      weight < 100
        ? "a fine boi"
        : weight < 300
          ? "he chomnk"
          : weight < 500
            ? "a heckin chonker"
            : weight < 1000
              ? "hefty chonk"
              : weight < 3000
                ? "mega chonker"
                : weight >= 3000 ? "OH LAWD HE COMIN" : "how chonk?";
    */

    let text = {
      color: '#333',
      textTransofrm: 'lowercase'
    };

    let message;

    if (weight < 100) {
      message = "a fine boi";
      text.color = "#01a650";
    } else if (weight < 300) {
      message = "he chomnk";
      text.color = "#ffcf00";
    } else if (weight < 500) {
      message = "a heckin chonker";
      text.color = "#faa71d";
    } else if (weight < 1000) {
      message = "hefty chonk";
      text.color = "#f4791f";
    } else if (weight < 3000) {
      message = "mega chonker";
      text.color = "#ee1c24";
      text.textTransform = 'uppercase';
    } else if (weight >= 3000) {
      message = "oh lawd he comin";
      text.color = "#c8242c";
      text.textTransform = 'uppercase';
      text.fontWeight = 900;
    } else {
      message = "how chonk?";
      text.color = "#333";
    }

    return (
      <a class="card" id="randomize-btn" role="button" href="#" onClick={this.changePokemon}> 
        <h2 class="name"> {loading} </h2> 
        <div class="sprite">
          <img src={sprite} /> 
        </div> 
        <span class="weight" style={text}> 
          {message} <br /> 
          <span> Weight: {weight} lbs. </span> 
        </span>
      </a>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));

