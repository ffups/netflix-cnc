const API_BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';
const BACKDROP_SIZE = 'w1280';
const POSTER_SIZE = 'w342';

const FALLBACK_HOME_DATA = {
  hero: {
    id: 66787,
    title: 'The Queen\'s Gambit',
    overview:
      'In a world dominated by men, a young chess prodigy fights her way to the top while battling addiction and loss.',
    backdropPath: `${IMAGE_BASE_URL}/${BACKDROP_SIZE}/yAwpamdJLsbaiSghicSkNaTquNQ.jpg`,
    posterPath: `${IMAGE_BASE_URL}/${POSTER_SIZE}/zU0TQKCczvzm5J6tyN0zHfGXPhK.jpg`,
    mediaType: 'tv',
    releaseDate: '2020-10-23'
  },
  rows: [
    {
      title: 'Popular Picks',
      items: [
        {
          id: 459151,
          title: 'The Tomorrow War',
          overview:
            'A time traveler recruits soldiers from the past to fight in humanity\'s future war against a deadly alien species.',
          posterPath: `${IMAGE_BASE_URL}/${POSTER_SIZE}/34nDCQZwaEvsy4CFO5hkGRFDCVU.jpg`,
          backdropPath: `${IMAGE_BASE_URL}/${BACKDROP_SIZE}/wNAhuOZ3ZObLA8Z6Gh3e1eiQz7o.jpg`,
          mediaType: 'movie',
          releaseDate: '2021-06-30'
        },
        {
          id: 45612,
          title: 'Stranger Things',
          overview:
            'When a young boy vanishes, a small town uncovers a mystery involving secret experiments and terrifying supernatural forces.',
          posterPath: `${IMAGE_BASE_URL}/${POSTER_SIZE}/x2LSRK2Cm7MZhjluni1msVJ3wDF.jpg`,
          backdropPath: `${IMAGE_BASE_URL}/${BACKDROP_SIZE}/49WJfeN0moxb9IPfGn8AIqMGskD.jpg`,
          mediaType: 'tv',
          releaseDate: '2016-07-15'
        },
        {
          id: 181808,
          title: 'Star Wars: The Last Jedi',
          overview:
            'Rey develops her newly discovered abilities with the guidance of Luke Skywalker, as the Resistance prepares for battle.',
          posterPath: `${IMAGE_BASE_URL}/${POSTER_SIZE}/kOVEVeg59E0wsnXmF9nrh6OmWII.jpg`,
          backdropPath: `${IMAGE_BASE_URL}/${BACKDROP_SIZE}/6qTQ7GyzUxyGgn2rU3oiVY1E48Y.jpg`,
          mediaType: 'movie',
          releaseDate: '2017-12-13'
        }
      ]
    }
  ]
};

const formatTitle = (item) => {
  return item.title || item.name || 'Untitled';
};

const normalizeMediaItem = (item) => ({
  id: item.id,
  title: formatTitle(item),
  overview: item.overview || 'No synopsis available yet — stay tuned!',
  posterPath: item.poster_path ? `${IMAGE_BASE_URL}/${POSTER_SIZE}${item.poster_path}` : null,
  backdropPath: item.backdrop_path ? `${IMAGE_BASE_URL}/${BACKDROP_SIZE}${item.backdrop_path}` : null,
  mediaType: item.media_type || (item.first_air_date ? 'tv' : 'movie'),
  releaseDate: item.release_date || item.first_air_date || 'TBA'
});

const selectHero = (items) => {
  return (
    items.find((item) => item.backdropPath) ||
    FALLBACK_HOME_DATA.hero
  );
};

const buildRow = (title, items) => ({
  title,
  items: items.filter((item) => item.posterPath)
});

async function fetchJson(path, params = {}) {
  const apiKey = process.env.TMDB_API_KEY;

  if (!apiKey) {
    return null;
  }

  const url = new URL(`${API_BASE_URL}${path}`);
  url.search = new URLSearchParams({
    api_key: apiKey,
    language: 'en-US',
    include_adult: 'false',
    ...params
  }).toString();

  const response = await fetch(url.toString());

  if (!response.ok) {
    throw new Error(`TMDb request failed with status ${response.status}`);
  }

  return response.json();
}

async function getHomePageData() {
  try {
    const [trending, popularMovies, topRatedMovies, popularTV] = await Promise.all([
      fetchJson('/trending/all/week'),
      fetchJson('/movie/popular'),
      fetchJson('/movie/top_rated'),
      fetchJson('/tv/popular')
    ]);

    const datasets = [trending, popularMovies, topRatedMovies, popularTV];

    if (datasets.some((dataset) => !dataset || !dataset.results)) {
      return FALLBACK_HOME_DATA;
    }

    const normalized = datasets.map((dataset) => dataset.results.map(normalizeMediaItem));

    const hero = selectHero(normalized[0]);

    const rows = [
      buildRow('Trending Now', normalized[0]),
      buildRow('Popular Movies', normalized[1]),
      buildRow('Top Rated Movies', normalized[2]),
      buildRow('Binge-Worthy TV', normalized[3])
    ].filter((row) => row.items.length > 0);

    return {
      hero,
      rows
    };
  } catch (error) {
    console.error('[TMDb] Falling back to static data:', error.message);
    return FALLBACK_HOME_DATA;
  }
}

export { getHomePageData, FALLBACK_HOME_DATA, IMAGE_BASE_URL, BACKDROP_SIZE, POSTER_SIZE };
