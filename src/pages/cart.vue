<template>
	<div class="cart-container">
		<div class="cart-container__header">
			<div class="header__content">
				<h1 v-html="markdown($t('cart.title'))"></h1>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "Cart",
		data() {
			return { items: {} };
		},
		methods: {
			markdown(pls) {
				if (!pls.match(/(\*\*.*?\*\*)/g)) return pls;
				return pls.match(/(\*\*.*?\*\*)/g).map((ch, i) => {
					return pls.replace(
						ch,
						`<strong><span class="text-highlight">${ch.slice(
							2,
							ch.length - 2
						)}</span></strong>`
					);
				})[0];
			}
		},
		mounted() {
			var listOfItems = [];
			const cart = localStorage.getItem("cartProducts");
			if (cart == null) return;
			listOfItems = cart.split(",");
			for (var item in listOfItems) {
				console.log(listOfItems[item]);
				listOfItems.forEach(id, index => {
					console.log(id.to);
				});
			}
			console.log(listOfItems);
		},
		head: {
			title: "Cart"
		}
	};
</script>
