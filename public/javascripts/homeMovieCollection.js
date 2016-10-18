var MovieForm = React.createClass({
  starsClicked: function(e) {
    var clickOffsetXinTarget = e.clientX - e.target.offsetLeft;

    if (clickOffsetXinTarget < 41) {
      e.target.className = "oneStar";
      this.setState({state: 1});
    }
    else if (clickOffsetXinTarget < 80) {
      e.target.className = "twoStars";
      this.setState({state: 2});
    }
    else if (clickOffsetXinTarget < 120) {
      e.target.className = "threeStars";
      this.setState({state: 3});
    }
    else if (clickOffsetXinTarget < 160) {
      e.target.className = "fourStars";
      this.setState({state: 4});
    }
    else if (clickOffsetXinTarget < 200) {
      e.target.className = "fiveStars";
      this.setState({state: 5});
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
  },

  render: function() {
    return (
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
    );
  }
});

var MovieCollection = React.createClass({
  render: function() {
    return (
        <div>
          <div>MovieCollection</div>
        </div>
    );
  }
});

ReactDOM.render(
  <MovieForm />,
  document.getElementById("container")
);