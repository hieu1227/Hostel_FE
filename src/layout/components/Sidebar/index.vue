<template>
	<div id="sidebar-wrapper">
		<ul class="sidebar-nav">
			<li class="sidebar-title">
				<img src="https://i.pinimg.com/564x/f9/92/5e/f9925ef90a024cbf91ce44422d44b391.jpg" alt="">
			</li>
			<ItemSidebar />
		</ul>
	</div>
</template>

<script>
	import ItemSidebar from './ItemSidebar';

	export default {
		name: 'Sidebar',
		components: {
			ItemSidebar
		},
		data() {
			return {
				title: 'Hostel Management'
			};
		}
	};
</script>

<style>
	@import url(https://fonts.googleapis.com/css2?family=Cabin:wght@500&display=swap);

	#wrapper {
		padding-left: 0;
		-webkit-transition: all 0.5s ease;
		-moz-transition: all 0.5s ease;
		-o-transition: all 0.5s ease;
		transition: all 0.5s ease;
		font-family: 'Cabin', sans-serif;
		position: relative;
	}
	#wrapper.toggled {
		padding-left: 250px;
	}
	#sidebar-wrapper {
		z-index: 1000;
		position: fixed;
		left: 250px;
		width: 0;
		top: 0;
		height: 100%;
		margin-left: -250px;
		overflow-x: hidden;
		overflow-y: auto;
		background: #052c50 99%;
		-webkit-transition: all 0.5s ease;
		-moz-transition: all 0.5s ease;
		-o-transition: all 0.5s ease;
		transition: all 0.5s ease;
	}
	#wrapper.toggled #sidebar-wrapper {
		width: 250px;
	}
	#page-content-wrapper {
		width: 100%;
		position: absolute;
	}
	#wrapper.toggled #page-content-wrapper {
		position: absolute;
		margin-right: -250px;
	}
	.sidebar-nav {
		position: absolute;
		top: 0;
		width: 250px;
		margin: 0;
		padding: 0;
		list-style: none;
	}
    .sidebar-nav img {
        border-radius: 50%;
        width: 150px;
        height: 150px;
    }
	ul li {
		color: #ffffff;
	}

	.sidebar-title {
		width: 100%;
		padding-top: 40px;
		padding-bottom: 40px;
		display: flex;
		justify-content: center;
		align-items: center;
		text-align: center;
		overflow: hidden;
		font-size: 25px;
		word-break: break-all;
	}

	@media (min-width: 768px) {
		#wrapper {
			padding-left: 250px;
		}
		#wrapper.toggled {
			padding-left: 0;
		}
		#sidebar-wrapper {
			width: 250px;
		}
		#wrapper.toggled #sidebar-wrapper {
			width: 0;
		}
		#page-content-wrapper {
			position: relative;
		}
		#wrapper.toggled #page-content-wrapper {
			position: relative;
			margin-right: 0;
		}
	}
</style>
