const socket = io('http://localhost:9000');
let nsSocket = '';

socket.on('nsList', (nsData) => {
  const namespacesDiv = document.querySelector('.namespaces');
  namespacesDiv.innerHTML = '';
  nsData.forEach((ns) => {
    namespacesDiv.innerHTML += `<div class="namespace" ns=${ns.endpoint}><img src="${ns.image}" /></div>`;
  });

  Array.from(document.getElementsByClassName('namespace')).forEach((e) => {
    e.addEventListener('click', (event) => {
      const nsEndpoint = e.getAttribute('ns');
      joinNs(nsEndpoint);
    });
  });
});
