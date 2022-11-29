import vanillaJSGif from "../components/giphyComponents/gift";
import { giftIdentifier } from '../resources/constants'

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

const fillUserPic = (messagesRecieved) => {
  console.log('recived',messagesRecieved)
  messagesRecieved.forEach(msg => {
    let elem = document.getElementById(`img${msg.id}`)
    if (elem) {
      console.log(msg.username, msg.room)
      const src = localStorage.getItem(`${msg.username}--${msg.room}`)
      console.log(src)
      elem.src = src ? src :'/images/defaultprofile.png'
    }

  })
}

function sortMessagedByDate(messages) {
  return messages.sort((a, b) => parseInt(a.__createdtime__) - parseInt(b.__createdtime__))
}

export { formatDateFromTimestamp, fillGift, sortMessagedByDate, fillUserPic }