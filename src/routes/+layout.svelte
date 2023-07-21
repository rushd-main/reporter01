<script lang="ts">
	import '@skeletonlabs/skeleton/themes/theme-skeleton.css';
	import '@skeletonlabs/skeleton/styles/skeleton.css';
	import '../app.postcss';
	import { AppBar } from '@skeletonlabs/skeleton';
</script>

<nav class="container w-full h-14 flex items-center justify-between mx-auto">
	<div class="">
		<a href="/" class=" text-2xl variant-text-primary-500">Rushd</a>
	</div>

	<div class="">
		<a href="/login">Login</a>
		<a href="/register">Register</a>
	</div>
</nav>

<slot />
