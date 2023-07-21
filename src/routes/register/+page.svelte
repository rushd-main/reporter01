<script lang="ts">
    import type { ActionData } from './$types'

    export let form: ActionData
</script>

<h1>Register</h1>

<form action="?/register" method="post">
    <div class="form-group">
        <label for="username">Username</label>
        <input id="username" name="username" type="text" required>
    </div>
    <div class="form-group">
        <label for="password">Password</label>
        <input type="password" name="password" id="password" required>
    </div>
    <div class="form-group">
        <label for="password">Confirm Password</label>
        <input type="password" name="confirmPassword" id="confirmPassword" required>
    </div>

    {#if form?.user}
        <p class="error">Username is taken.</p>    
    {/if}
    {#if form?.passwordMatch}
        <p class="error">Please make sure passwords are matching</p>
    {/if}

    <button type="submit">Signup</button>
</form>