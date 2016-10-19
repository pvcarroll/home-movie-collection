const CONTAINER = "container";

var MovieForm = React.createClass({
  renderMovieCollection: function() {
    ReactDOM.render(
        <MovieCollection/>,
        document.getElementById(CONTAINER)
    );
  },

  starsClicked: function(e) {
    var clickOffsetXinTarget = e.clientX - e.target.offsetLeft;

    if (clickOffsetXinTarget < 41) {
      e.target.className = "oneStar";
      this.setState({rating: 1});
    }
    else if (clickOffsetXinTarget < 80) {
      e.target.className = "twoStars";
      this.setState({rating: 2});
    }
    else if (clickOffsetXinTarget < 120) {
      e.target.className = "threeStars";
      this.setState({rating: 3});
    }
    else if (clickOffsetXinTarget < 160) {
      e.target.className = "fourStars";
      this.setState({rating: 4});
    }
    else if (clickOffsetXinTarget < 200) {
      e.target.className = "fiveStars";
      this.setState({rating: 5});
    }
  },

  handleTitleChange: function(e) {
    this.setState({title: e.target.value})
  },
  handleGenreChange: function(e) {
    this.setState({genre: e.target.value})
  },
  handleActorsChange: function(e) {
    this.setState({actors: e.target.value})
  },
  handleYearChange: function(e) {
    this.setState({year: e.target.value})
  },
  handleRatingChange: function(e) {
    this.setState({rating: e.target.value})
  },

  onSubmit: function(e) {
    e.preventDefault();
    localStorage.setItem(this.state.title, JSON.stringify(this.state));
    console.log(this.state);
    ReactDOM.render(
        <MovieCollection />,
        document.getElementById(CONTAINER)
    );
  },

  render: function() {
    return (
        <div>
          <button className="btn btn-default"
                  onClick={this.renderMovieCollection}>
            Show Movie Collection
          </button>
          <form className="addMovieForm" onSubmit={this.onSubmit}>
            <div className="form-group">
              <label for="titleInput">Title</label>
              <input type="text" className="form-control" id="titleInput"
                     onChange={this.handleTitleChange} />
            </div>
            <div className="form-group">
              <label for="genreInput">Genre</label>
              <input type="text" className="form-control" id="genreInput"
                     onChange={this.handleGenreChange}/>
            </div>
            <div className="form-group">
              <label for="actorsInput">Actors</label>
              <input type="text" className="form-control" id="actorsInput"
                     onChange={this.handleActorsChange}/>
            </div>
            <div className="form-group">
              <label for="yearInput">Year</label>
              <input type="text" className="form-control" id="yearInput"
                     onChange={this.handleYearChange}/>
            </div>
            <div className="form-group">
              <label for="ratingInput">Rating</label>
              <div id="ratingStars" onClick={this.starsClicked}></div>
              <input type="hidden" id="ratingInput" className="form-control"
                     onChange={this.handleRatingChange}/>
            </div>
            <input type="submit" value="Add Movie" className="btn btn-default" />
          </form>
        </div>
    );
  }
});

var Movie = React.createClass({
  render: function() {
    var movie = JSON.parse(localStorage[this.props.title]);
    return (
        <tr>
          <td>{this.props.title}</td>
          <td>{movie.genre}</td>
          <td>{movie.actors}</td>
          <td>{movie.year}</td>
          <td>{movie.rating}</td>
        </tr>
    );
  }
});

var SearchRow = React.createClass({
  render: function() {
    return (
        <tr>
          <td>
            <input type="text" className="searchField" placeholder="Search title" />
          </td>
          <td>
            <input type="text" className="searchField" placeholder="Search genre" />
          </td>
          <td>
            <input type="text" className="searchField" placeholder="Search actors" />
          </td>
          <td>
            <input type="text" className="searchField" placeholder="Search year" />
          </td>
          <td>
            <input type="text" className="searchField" placeholder="Search rating" />
          </td>
        </tr>
    );
  }
});

var MovieCollection = React.createClass({
  renderMovieForm: function() {
    ReactDOM.render(
        <MovieForm/>,
        document.getElementById(CONTAINER)
    );
  },

  render: function() {
    var movieCollection = localStorage,
        movies = Object.keys(movieCollection);
    return (
        <div>
          <button className="btn btn-default" onClick={this.renderMovieForm}>Add Movie</button>
          <table className="table table-bordered table-striped">
            <tbody>
              <tr>
                <th>Title</th>
                <th>Genre</th>
                <th>Actors</th>
                <th>Year</th>
                <th>Rating</th>
              </tr>
              <SearchRow/>
              {movies.map(function(movie) {
                return <Movie title={movie}/>;
              })}
            </tbody>
          </table>
        </div>
    );
  }
});

ReactDOM.render(
  <MovieCollection/>,
  document.getElementById(CONTAINER)
);