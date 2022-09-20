import { html, component } from 'haunted';

function GameLogin({ socket }) {

  const socketLogin = (ev,sock) => {
    ev.preventDefault();

    const username = ev.target.username.value;

    sock.send(JSON.stringify({
      name: username,
      key: window.localStorage.getItem('rgs-user-key') ?? null
    }));

    window.localStorage.setItem('rgs-user-name', username);
  };

  const storedName = window.localStorage.getItem('rgs-user-name') ?? null;

  return html`
    <div>
      <form @submit=${event => socketLogin(event,socket)}>
        <label for="username">Enter a player name:</label>
        <input id="username" type="text" value=${storedName}>
        <input type="submit" value="Login">
      </form>
    </div>
  `;
}

customElements.define("game-login", component(GameLogin));