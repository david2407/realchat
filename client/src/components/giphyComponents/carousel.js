import { renderCarousel } from "@giphy/js-components";
import { GiphyFetch } from "@giphy/js-fetch-api";

const gf = new GiphyFetch("yH0AdrTiX36tre5ytdUZoMyBOfb7ILcx");

export const vanillaJSCarousel = (mountNode, searchText, onClickFunc) => {
  
  const fetchGifs = () => gf.search(searchText);

  if (mountNode) {
    mountNode.innerHTML = ""
  }

  renderCarousel(
    {
      gifHeight: 200,
      fetchGifs,
      noLink: true,
      onGifClick: (gif, e) => (onClickFunc(gif.id))
    },
    mountNode
  );
};