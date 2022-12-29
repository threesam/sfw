<footer>
	<h3>site links</h3>
	<div class="rows">
		<div class="row">
			<h3>group of links</h3>
			<ul>
				<li><a href="#">some link</a></li>
				<li><a href="#">some link</a></li>
				<li><a href="#">some link</a></li>
				<li><a href="#">some link</a></li>
			</ul>
		</div>

		<div class="row">
			<h3>group of links</h3>
			<ul>
				<li><a href="#">some link</a></li>
				<li><a href="#">some link</a></li>
				<li><a href="#">some link</a></li>
				<li><a href="#">some link</a></li>
			</ul>
		</div>
	</div>
</footer>

<style>
	footer {
		background-color: #f9c84c;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 4rem;
	}
	.rows {
		display: flex;
		max-width: 60rem;
	}
	.row {
		padding: 1rem;
	}

	a,
	h3 {
		color: var(--background);
	}

	ul {
		padding-left: 0;
	}

	li {
		list-style: none;
	}
</style>
