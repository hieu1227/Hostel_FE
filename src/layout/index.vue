
<template>
  <div id="wrapper">
		<Sidebar />
		<div id="page-content-wrapper">
			<Navbar />
			<AppMain />
		</div>
	</div>
</template>

<script>
import Navbar from './components/Navbar';
import AppMain from './components/AppMain';
import Sidebar from './components/Sidebar';

export default {
	name: 'Layout',
	components: {
		Navbar,
		AppMain,
		Sidebar
	}
};
</script>

<style>

</style>
