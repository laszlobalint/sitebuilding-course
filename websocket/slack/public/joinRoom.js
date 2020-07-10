function joinRoom(roomName) {
  nsSocket.emit('joinRoom', roomName);

  nsSocket.on('historyCatchUp', (history) => {
    const messagesUL = document.querySelector('#messages');
    messagesUL.innerHTML = '';
    history.forEach((msg) => {
      const currentMessages = messagesUL.innerHTML;
      messagesUL.innerHTML = currentMessages + buildListHtml(msg);
    });
    messagesUL.scroll(0, messagesUL.scrollHeight);
  });

  nsSocket.on('updateMembers', (membersNum) => {
    document.querySelector('.curr-room-num-users').innerHTML = `${membersNum} <span class="glyphicon glyphicon-user"></span>`;
    document.querySelector('.curr-room-text').innerText = roomName;
  });

  let searchBox = document.querySelector('#search-box');
  searchBox.addEventListener('input', (e) => {
    let messages = Array.from(document.getElementsByClassName('message-text'));
    messages.forEach((msg) => {
      msg.innerText.toLowerCase().indexOf(e.target.value.toLowerCase()) === -1
        ? (msg.style.display = 'none')
        : (msg.style.display = 'block');
    });
  });
}
