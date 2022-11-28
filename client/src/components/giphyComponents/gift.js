import { renderGif } from "@giphy/js-components";
import { GiphyFetch } from "@giphy/js-fetch-api";

const gf = new GiphyFetch("yH0AdrTiX36tre5ytdUZoMyBOfb7ILcx");

const vanillaJSGif = async (targetEl, giftId) => {

    const { data: gif1 } = await gf.gif(giftId);
    // no className prop will merge props with an existing Gif using the default className
    renderGif({ gif: gif1, width: 150 }, targetEl);

    const { data: gif2 } = await gf.gif(giftId);
    // create new gifs in a targetEl by providing a unique className prop
    renderGif(
        { gif: gif2, width: 150 },
        targetEl
    );
};

export default vanillaJSGif;