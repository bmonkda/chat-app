const msgerForm = get(".msger-inputarea");
const msgerInput = get(".msger-input");
const msgerChat = get(".msger-chat");

// const PERSON_IMG = "https://image.flaticon.com/icons/svg/145/145867.svg";
// const PERSON_IMG = "https://lh3.googleusercontent.com/ogw/ADea4I7wvTeIexb8Zf-roQ0bp8PwBmgVnOWRNprDWJuC=s83-c-mo";

const chatWith = get(".chatWith");
const chatStatus = get(".chatStatus");
const typing = get(".typing");



msgerForm.addEventListener("submit", event => {
  event.preventDefault();

  const msgText = msgerInput.value;

  if (!msgText) return;

  /* código de envío */

  axios.post('/message/sent', {
    message: msgText,
    chat_id: 1 //PENDIENTE: HACER DINAMICO
  }).then(res => {

    let data = res.data;

    appendMessage(
      data.user.name,
      data.user.profile_photo_url,
      // PERSON_IMG,
      'right',
      data.content,
      formatDate(new Date(data.created_at))
    );

    console.log(res);

  }).catch(error => {
    console.log('HA OCURRIDO UN ERROR');
    console.log(error);
  });

  msgerInput.value = "";

  /* appendMessage(PERSON_NAME, PERSON_IMG, "right", msgText);
  msgerInput.value = ""; */

});

/* function appendMessage(message, side) { */
function appendMessage(name, img, side, text, date) {
  //   Simple solution for small apps
  const msgHTML = `
    <div class="msg ${side}-msg">
      <div class="msg-img" style="background-image: url(${img})"></div>

      <div class="msg-bubble">
        <div class="msg-info">
          <div class="msg-info-name">${name}</div>
        
          <div class="msg-info-time">${date}</div>
          
        </div>

        <div class="msg-text">${text}</div>
      </div>
    </div>
  `;

  msgerChat.insertAdjacentHTML("beforeend", msgHTML);
  msgerChat.scrollTop += 500;
}

// Utils
function get(selector, root = document) {
  return root.querySelector(selector);
}

function formatDate(date) {
  const d = date.getDate();
  const mo = date.getMonth() + 1;
  const y = date.getFullYear();
  const h = "0" + date.getHours();
  const m = "0" + date.getMinutes();

  return `${d}/${mo}/${y} ${h.slice(-2)}:${m.slice(-2)}`;
}

/* function random(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
} */
