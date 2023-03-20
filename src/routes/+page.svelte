<!-- App.svelte -->
<script>
  import LoginForm from '../components/LoginForm.svelte';
  import { onMount } from 'svelte';

  let loggedInUser = null;
  let friends = [];

  function login(username) {
    loggedInUser = username;
    fetch(`/api/friends?user=${loggedInUser}`)
      .then(res => res.json())
      .then(data => {
        friends = data;
      });
  }

  function logout() {
    loggedInUser = null;
    friends = [];
  }

  function addFriend(username) {
    fetch(`/api/friends?user=${loggedInUser}&friend=${username}`, {
      method: 'POST'
    })
      .then(res => res.json())
      .then(data => {
        friends = data;
      });
  }

  function removeFriend(username) {
    fetch(`/api/friends?user=${loggedInUser}&friend=${username}`, {
      method: 'DELETE'
    })
      .then(res => res.json())
      .then(data => {
        friends = data;
      });
  }

  // Listen for the login event
  onMount(() => {
    const loginForm = new LoginForm({
      target: document.querySelector('#login-form')
    });
    loginForm.$on('login', (event) => {
      login(event.detail);
    });
  });
</script>

{#if loggedInUser}
  <h1>Welcome, {loggedInUser}!</h1>
  <p>Here are your friends:</p>
  <ul>
    {#each friends as friend}
      <li>{friend}</li>
    {/each}
  </ul>
  <button on:click={logout}>Logout</button>
{:else}
  <div id="login-form"></div>
{/if}
