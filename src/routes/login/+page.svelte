<script lang="ts">
	import type { ActionData } from './$types';

	export let form: ActionData;
</script>

<div class="card">
	<div class="card-header">
		<h1 class="">Login</h1>
	</div>

	<form action="?/login" method="post">
		<div class="form-group">
			<label for="username">Username</label>
			<input id="username" name="username" type="text" required />
		</div>
		<div class="form-group">
			<label for="password">Password</label>
			<input type="password" name="password" id="password" required />
		</div>

		{#if form?.invalid}
			<p class="error">Username and password are required.</p>
		{/if}
		{#if form?.credentials}
			<p class="error">You have entered the wrong credentials.</p>
		{/if}

		<button type="submit">Login</button>
	</form>
</div>
