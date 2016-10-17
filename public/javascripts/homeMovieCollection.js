var MovieForm = React.createClass({
  render: function() {
    return (
        <form className="addMovieForm">
          <div className="form-group">
            <label for="titleInput">Title</label>
            <input type="text" className="form-control" id="titleInput" />
          </div>
          <div className="form-group">
            <label for="genreInput">Genre</label>
            <input type="text" className="form-control" id="genreInput" />
          </div>
          <div className="form-group">
            <label for="actorsInput">Actors</label>
            <input type="text" className="form-control" id="actorsInput" />
          </div>
          <div className="form-group">
            <label for="yearInput">Year</label>
            <input type="text" className="form-control" id="yearInput" />
          </div>
          <div className="form-group">
            <label for="ratingInput">Rating</label>
            <div className="ratingStars"></div>
            <input type="hidden" className="form-control" id="ratingInput" />
          </div>
          <input type="submit" value="Post" className="btn btn-default" />
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