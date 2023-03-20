<!-- LoginForm.svelte -->
<script>
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();
  let username = '';

  function handleSubmit(event) {
    event.preventDefault();
    if (username.trim()) {
      dispatch('login', username);
      username = '';
    }
  }
</script>

<form on:submit={handleSubmit}>
  <input type="text" placeholder="Username" bind:value={username} />
  <button type="submit">Login</button>
</form>
