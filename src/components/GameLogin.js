import { html, component } from 'haunted';

function GameLogin({ socket }) {

  const socketLogin = (ev,sock) => {
    ev.preventDefault();

    const username = ev.target.username.value;
    const thisComponent = this;

    sock.emit('reconnect-user-name', username, response1 => {
      if (response1.status == 'Cannot reconnect; no matching user.') {
        sock.emit('send-user-name', username, response2 => {
          const custEvnt = new CustomEvent('joined', {
            bubbles: true,
            composed: true,
            detail: {  
              name: username,
              status: response2.status
            }
          });
          thisComponent.dispatchEvent(custEvnt);
        });
      } else {
        const custEvnt = new CustomEvent('joined', {
          bubbles: true,
          composed: true,
          detail: {  
            name: username,
            status: response1.status
          }
        });
        thisComponent.dispatchEvent(custEvnt);
      }
    });
  };

  return html`
    <div>
      <form @submit=${event => socketLogin(event,socket)}>
        <label for="username">Enter a player name:</label>
        <input id="username" type="text">
        <input type="submit" value="Login">
      </form>
    </div>
  `;
}

customElements.define("game-login", component(GameLogin));