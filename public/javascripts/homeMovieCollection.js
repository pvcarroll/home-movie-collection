var MovieForm = React.createClass({
  starsClicked: function(e) {
    var clickOffsetXinTarget = e.clientX - e.target.offsetLeft,
        ratingElement = document.getElementById("ratingInput");
    if (clickOffsetXinTarget < 41) {
      e.target.className = "oneStar";
      ratingElement.value = 1;
    }
    else if (clickOffsetXinTarget < 80) {
      e.target.className = "twoStars";
      ratingElement.value = 2;
    }
    else if (clickOffsetXinTarget < 120) {
      e.target.className = "threeStars";
      ratingElement.value = 3;
    }
    else if (clickOffsetXinTarget < 160) {
      e.target.className = "fourStars";
      ratingElement.value = 4;
    }
    else if (clickOffsetXinTarget < 200) {
      e.target.className = "fiveStars";
      ratingElement.value = 5;
    }
  },
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
            <div id="ratingStars" onClick={this.starsClicked}></div>
            <input type="hidden" id="ratingInput" className="form-control" />
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