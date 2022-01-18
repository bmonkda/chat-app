const msgerForm = get(".msger-inputarea");
const msgerInput = get(".msger-input");
const msgerChat = get(".msger-chat");

const chatWith = get(".chatWith");
const chatStatus = get(".chatStatus");
const typing = get(".typing");
// para probar imagen
const PERSON_IMG = "https://lh3.googleusercontent.com/ogw/ADea4I7wvTeIexb8Zf-roQ0bp8PwBmgVnOWRNprDWJuC=s83-c-mo";

const chatId = window.location.pathname.substr(6);

let authUser;

window.onload = function () {

  axios.get('/auth/user').then(res => {

    authUser = res.data.authUser;

  })
    .then(() => {

      axios.get(`/chat/${chatId}/get_users`).then(res => {

        let results = res.data.users.filter(user => user.id != authUser.id);

        if (results.length > 0)
          chatWith.innerHTML = results[0].name;
      })
        .then(() => {

          axios.get(`/chat/${chatId}/get_messages`).then(res => {

            appendMessages(res.data.messages);

          })
          // concatenando laravel Echo
        }).then(() => {

          Echo.join(`chat.${chatId}`)
            .listen('MessageSent', (e) => {
              // console.log(e);
              appendMessage(
                e.message.user.name,
                // PERSON_IMG,
                e.message.user.profile_photo_url,
                'left',
                e.message.content,
                formatDate(new Date(e.message.created_at))
              );
            })
            .here((users) => {

              let result = users.filter(user => user.id != authUser.id);

              if (result.length > 0)
                chatStatus.className = 'chatStatus online';

            })
            .joining((user) => {

              if (user.id != authUser.id)
                chatStatus.className = 'chatStatus online';

            })
            .leaving((user) => {

              if (user.id != authUser.id)
                chatStatus.className = 'chatStatus offline';
            });

        });

    });

}


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

function appendMessages(messages) {

  /* console.log('messages =====>' + messages); */

  let side = 'left';

  messages.forEach(message => {

    side = (message.user_id == authUser.id) ? 'right' : 'left';

    appendMessage(
      message.user.name,
      // PERSON_IMG,
      message.user.profile_photo_url,
      side,
      message.content,
      formatDate(new Date(message.created_at))
    );

  });

}

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

  /* msgerChat.scrollTop += 500; */
  scrollToBottom();

}


//Echo
// Uniendo al canal a través de Laravel Echo y Pusher que hacen la comunicación a través del WebSocket
// Laravel Echo fue movido y concatenado después de todos los métodos de window.onload 


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

function scrollToBottom() {
  msgerChat.scrollTop = msgerChat.scrollHeight;
}

