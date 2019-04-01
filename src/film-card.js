import moment from 'moment';
import Component from './component';

class FilmCard extends Component {
  constructor(data, showControls = true) {
    super();
    this._title = data.title;
    this._description = data.description;
    this._poster = data.poster;
    this._releaseDate = data.releaseDate;
    this._rating = data.rating;
    this._duration = data.duration;
    this._genre = data.genres;
    this._comments = data.comments;
    this._score = data.score;

    this._isInWatchlist = data.isInWatchlist;
    this._isWatched = data.isWatched;
    this._isFavorite = data.isFavorite;
    this._showControls = showControls;

    this._onCommentsClick = null;
    this._onAddToWatchList = null;
    this._onMarkAsWatched = null;
    this._onAddToFavorite = null;

    this._onCommentsBtnClick = this._onCommentsBtnClick.bind(this);
    this._onAddToWatchListClick = this._onAddToWatchListClick.bind(this);
    this._onMarkAsWatchedClick = this._onMarkAsWatchedClick.bind(this);
    this._onAddToFavoriteClick = this._onAddToFavoriteClick.bind(this);
  }

  _onCommentsBtnClick(event) {
    event.preventDefault();

    if (typeof this._onCommentsClick === `function`) {
      this._onCommentsClick();
    }
  }

  _onAddToWatchListClick(event) {
    event.preventDefault();

    if (typeof this._onAddToWatchList === `function`) {
      this._onAddToWatchList();
    }
  }

  _onMarkAsWatchedClick(event) {
    event.preventDefault();

    if (typeof this._onMarkAsWatched === `function`) {
      this._onMarkAsWatched();
    }
  }

  _onAddToFavoriteClick(event) {
    event.preventDefault();

    if (typeof this._onAddToFavorite === `function`) {
      this._onAddToFavorite();
    }
  }

  _commentsCountTemplate() {
    return `${this._comments.length} comment${this._comments.length > 1 ? `s` : ``}`;
  }

  _updateCommentsCount() {
    this._element.querySelector(`.film-card__comments`).innerHTML = this._commentsCountTemplate();
  }

  set onCommentsClick(fn) {
    this._onCommentsClick = fn;
  }

  set onAddToWatchList(fn) {
    this._onAddToWatchList = fn;
  }

  set onMarkAsWatched(fn) {
    this._onMarkAsWatched = fn;
  }

  set onAddToFavorite(fn) {
    this._onAddToFavorite = fn;
  }

  update(data) {
    const watchListBtn = this._element.querySelector(`.film-card__controls-item--add-to-watchlist`);
    const watchedBtn = this._element.querySelector(`.film-card__controls-item--mark-as-watched`);
    const favoriteBtn = this._element.querySelector(`.film-card__controls-item--favorite`);
    this._isInWatchlist = data.isInWatchlist;
    this._isWatched = data.isWatched;
    this._isFavorite = data.isFavorite;
    this._comments = data.comments;
    this._updateCommentsCount();

    if (this._isInWatchlist) {
      watchListBtn.classList.add(`film-card__controls-item--active`);
    } else if (!this._isInWatchlist) {
      watchListBtn.classList.remove(`film-card__controls-item--active`);
    }

    if (this._isWatched) {
      watchedBtn.classList.add(`film-card__controls-item--active`);
    } else if (!this._isWatched) {
      watchedBtn.classList.remove(`film-card__controls-item--active`);
    }

    if (this._isFavorite) {
      favoriteBtn.classList.add(`film-card__controls-item--active`);
    } else if (!this._isFavorite) {
      favoriteBtn.classList.remove(`film-card__controls-item--active`);
    }
  }

  get template() {
    return (
      `<article class="film-card ${this._showControls ? `` : `film-card--no-controls`}">
        <h3 class="film-card__title">${this._title}</h3>
        <p class="film-card__rating">${this._rating}</p>
        <p class="film-card__info">
          <span class="film-card__year">${moment(this._releaseDate).format(`YYYY`)}</span>
          <span class="film-card__duration">${moment.duration(this._duration).hours()}h&nbsp;${moment.duration(this._duration).minutes()}m</span>
          <span class="film-card__genre">${this._genre[0]}</span>
        </p>
        <img src="${this._poster}" alt="${this._title}" class="film-card__poster">
        <p class="film-card__description">${this._description}</p>
        <button class="film-card__comments">${this._commentsCountTemplate()}</button>
        <form class="film-card__controls ${this._showControls ? `` : `visually-hidden`}">
          <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${this._isInWatchlist ? `film-card__controls-item--active` : ``}">
            <!--Add to watchlist--> WL
          </button>
          <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${this._isWatched ? `film-card__controls-item--active` : ``}">
            <!--Mark as watched-->WTCHD
          </button>
          <button class="film-card__controls-item button film-card__controls-item--favorite ${this._isFavorite ? `film-card__controls-item--active` : ``}">
            <!--Mark as favorite-->FAV
          </button>
        </form>
      </article>`
    );
  }

  addEventListeners() {
    this._element.querySelector(`.film-card__comments`)
      .addEventListener(`click`, this._onCommentsBtnClick);
    this._element.querySelector(`.film-card__controls-item--add-to-watchlist`)
      .addEventListener(`click`, this._onAddToWatchListClick);
    this._element.querySelector(`.film-card__controls-item--mark-as-watched`)
      .addEventListener(`click`, this._onMarkAsWatchedClick);
    this._element.querySelector(`.film-card__controls-item--favorite`)
      .addEventListener(`click`, this._onAddToFavoriteClick);
  }
}

export default FilmCard;
