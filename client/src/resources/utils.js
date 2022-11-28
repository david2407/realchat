import vanillaJSGif from "../components/giphyComponents/gift";
import {giftIdentifier} from '../resources/constants'

function formatDateFromTimestamp(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleString();
  }

  const fillGift = (messagesRecieved) => {
    messagesRecieved.forEach(msg => {
      if (msg.message.includes(`${giftIdentifier}=`)) {
        const gift = msg.message.split(`${giftIdentifier}=`)[1]
        let elem = document.getElementById(msg.id)
        if (!elem) elem = document.getElementById(msg.message.split(`${giftIdentifier}=`)[1])
        if (elem) {
          elem.replaceChildren()
          vanillaJSGif(elem, gift)
        }
      }
    })
  }

  function sortMessagedByDate(messages) {
    return messages.sort((a, b) => parseInt(a.__createdtime__) - parseInt(b.__createdtime__))
  }

  export  {formatDateFromTimestamp, fillGift, sortMessagedByDate}