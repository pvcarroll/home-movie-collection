const CONTAINER = "container";

var MovieForm = React.createClass({

  componentWillMount: function() {
    if (this.props.update) {
      this.setState({title: this.props.title});
      this.setState({genre: this.props.genre});
      this.setState({actors: this.props.actors});
      this.setState({year: this.props.year});
      this.setState({rating: this.props.rating});
    }
  },

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
    if (localStorage[this.props.title]) {
      delete localStorage[this.props.title];
    }
    localStorage.setItem(this.state.title, JSON.stringify(this.state));
    this.renderMovieCollection();
  },

  deleteMovie: function () {
    delete localStorage[this.props.title];
    this.renderMovieCollection();
  },

  render: function() {
    var submitButtonText = (this.props.update) ? "Update Movie" : "Add Movie";
    var deleteButton = null;
    if (this.props.update) {
      deleteButton = <button className="btn btn-danger deleteMovieButton"
                             onClick={this.deleteMovie}>Delete Movie</button>
    }
    return (
        <div>
          <button className="btn btn-default"
                  onClick={this.renderMovieCollection}>
            Show Movie Collection
          </button>
          <form className="addMovieForm" onSubmit={this.onSubmit}>
            <div className="form-group">
              <label htmlFor="titleInput">Title</label>
              <input type="text"
                     id="titleInput"
                     className="form-control"
                     defaultValue={this.props.title}
                     onChange={this.handleTitleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="genreInput">Genre</label>
              <input type="text"
                     id="genreInput"
                     className="form-control"
                     defaultValue={this.props.genre}
                     onChange={this.handleGenreChange}/>
            </div>
            <div className="form-group">
              <label htmlFor="actorsInput">Actors</label>
              <input type="text"
                     id="actorsInput"
                     className="form-control"
                     defaultValue={this.props.actors}
                     onChange={this.handleActorsChange}/>
            </div>
            <div className="form-group">
              <label htmlFor="yearInput">Year</label>
              <input type="text"
                     id="yearInput"
                     className="form-control"
                     defaultValue={this.props.year}
                     onChange={this.handleYearChange}/>
            </div>
            <div className="form-group">
              <label htmlFor="ratingInput">Rating</label>
              <div id="ratingStars" onClick={this.starsClicked}></div>
              <input type="hidden"
                     id="ratingInput"
                     className="form-control"
                     defaultValue={this.props.rating}
                     onChange={this.handleRatingChange}/>
            </div>
            <input type="submit" value={submitButtonText} className="btn btn-primary submitMovieButton" />
            {deleteButton}
          </form>
        </div>
    );
  }
});

var SearchRow = React.createClass({

  handleTitleFilterChange: function() {
    this.props.onTitleFilterInput(
      this.refs.titleFilterInput.value
    );
  },
  handleGenreFilterChange: function() {
    this.props.onGenreFilterInput(
        this.refs.genreFilterInput.value
    );
  },
  handleActorsFilterChange: function() {
    this.props.onActorsFilterInput(
        this.refs.actorsFilterInput.value
    );
  },
  handleYearFilterChange: function() {
    this.props.onYearFilterInput(
        this.refs.yearFilterInput.value
    );
  },
  handleRatingFilterChange: function() {
    this.props.onRatingFilterInput(
        this.refs.ratingFilterInput.value
    );
  },

  render: function() {
    return (
        <tr>
          <td>
            <input type="text"
                   className="searchField"
                   placeholder="Search title"
                   value={this.props.titleFilter}
                   ref="titleFilterInput"
                   onChange={this.handleTitleFilterChange} />
          </td>
          <td>
            <input type="text"
                   className="searchField"
                   placeholder="Search genre"
                   value={this.props.genreFilter}
                   ref="genreFilterInput"
                   onChange={this.handleGenreFilterChange} />
          </td>
          <td>
            <input type="text"
                   className="searchField"
                   placeholder="Search actors"
                   value={this.props.actorsFilter}
                   ref="actorsFilterInput"
                   onChange={this.handleActorsFilterChange} />
          </td>
          <td>
            <input type="text"
                   className="searchField"
                   placeholder="Search year"
                   value={this.props.yearFilter}
                   ref="yearFilterInput"
                   onChange={this.handleYearFilterChange} />
          </td>
          <td>
            <input type="text"
                   className="searchField"
                   placeholder="Search rating"
                   value={this.props.ratingFilter}
                   ref="ratingFilterInput"
                   onChange={this.handleRatingFilterChange} />
          </td>
        </tr>
    );
  }
});

var Movie = React.createClass({

  editMovieForm: function(title, genre, actors, year, rating) {
    ReactDOM.render(
        <MovieForm title={title}
                   genre={genre}
                   actors={actors}
                   year={year}
                   rating={rating}
                   update />,
        document.getElementById(CONTAINER)
    );
  },

  render: function() {
    var movie = JSON.parse(localStorage[this.props.title]),
        titleFilter = this.props.titleFilter,
        genreFilter = this.props.genreFilter,
        actorsFilter = this.props.actorsFilter,
        yearFilter = this.props.yearFilter,
        ratingFilter = parseInt(this.props.ratingFilter);
    // Filter movies by search input.
    if ((titleFilter && movie.title.indexOf(titleFilter) === -1) ||
        (genreFilter && movie.genre.indexOf(genreFilter) === -1) ||
        (actorsFilter && movie.actors.indexOf(actorsFilter) === -1) ||
        (yearFilter && movie.year.indexOf(yearFilter) === -1) ||
        (ratingFilter && movie.rating !== ratingFilter)) {
      return null;
    }
    return (
        <tr className="movieRow"
            onClick={() => this.editMovieForm(movie.title, movie.genre, movie.actors, movie.year, movie.rating)}>
          <td>{this.props.title}</td>
          <td>{movie.genre}</td>
          <td>{movie.actors}</td>
          <td>{movie.year}</td>
          <td>{movie.rating}</td>
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

  handleTitleFilterInput: function(titleFilter) {
    this.setState({titleFilter: titleFilter});
  },
  handleGenreFilterInput: function(genreFilter) {
    this.setState({genreFilter: genreFilter});
  },
  handleActorsFilterInput: function(actorsFilter) {
    this.setState({actorsFilter: actorsFilter});
  },
  handleYearFilterInput: function(yearFilter) {
    this.setState({yearFilter: yearFilter});
  },
  handleRatingFilterInput: function(ratingFilter) {
    this.setState({ratingFilter: ratingFilter});
  },

  render: function() {
    var movieCollection = localStorage,
        movies = Object.keys(movieCollection).sort(),
        titleFilter = (this.state && this.state.titleFilter) ? this.state.titleFilter : "",
        genreFilter = (this.state && this.state.genreFilter) ? this.state.genreFilter : "",
        actorsFilter = (this.state && this.state.actorsFilter) ? this.state.actorsFilter : "",
        yearFilter = (this.state && this.state.yearFilter) ? this.state.yearFilter : "",
        ratingFilter = (this.state && this.state.ratingFilter) ? this.state.ratingFilter : "";
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
              <SearchRow
                  onTitleFilterInput={this.handleTitleFilterInput}
                  onGenreFilterInput={this.handleGenreFilterInput}
                  onActorsFilterInput={this.handleActorsFilterInput}
                  onYearFilterInput={this.handleYearFilterInput}
                  onRatingFilterInput={this.handleRatingFilterInput}
              />
              {
                movies.map(function(movie) {
                  return <Movie key={movie}
                                title={movie}
                                titleFilter={titleFilter}
                                genreFilter={genreFilter}
                                actorsFilter={actorsFilter}
                                yearFilter={yearFilter}
                                ratingFilter={ratingFilter} />;
                })
              }
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