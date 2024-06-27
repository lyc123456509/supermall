<template>
	<view>
		<main>
			<div class="ani_box">
				<div class="tips" v-if="currentType === ''" :style="{
		          background: `url(./static/image/preGreen/preGreen_box.webp) no-repeat`,
		          backgroundSize: 'contain',
		        }"></div>
				<div class="tips tipsOk" v-if="tipsSuccess" :style="{
		          background: `url(./static/image/preGreen/preGreenOk.png) no-repeat`,
		          backgroundSize: '100% 100%',
		        }"></div>
				<img class="light" src="@/static/image/preGreen/light.png" />
				<div class="box" v-if="currentType === ''">
					<div class="item"
						:class="[aniStyle ? 'item_lf2' : '', aniOverSty === 1 ? 'item_lf' : '', aniOverSty === 2 ? 'itemScale_md' : '']"
						@click="itemClick('middle')">
						<div class="positive p1 click_pos" :class="currentType === '' ? '' : 'click_back'"></div>
						<div class="back" :class="currentType === '' ? 'click_back' : 'click_pos'"></div>
					</div>
					<div class="item"
						:class="[aniOverSty === 1 ? 'item_md' : '', aniOverSty === 2 ? 'itemScale_rl' : '']"
						@click="itemClick('right')">
						<div class="positive p2" :class="currentType === '' ? 'click_pos' : 'click_back'"></div>
						<div class="back" :class="currentType === '' ? 'click_back' : 'click_pos'"></div>
					</div>
					<div class="item"
						:class="[aniOverSty === 1 ? 'item_rl' : '', aniOverSty === 2 ? 'itemScale_lf' : '']"
						@click="itemClick('left')">
						<div class="positive p3" :class="currentType === '' ? 'click_pos' : 'click_back'"></div>
						<div class="back" :class="currentType === '' ? 'click_back' : 'click_pos'"></div>
					</div>
				</div>
				<div class="box" v-else>
					<div class="item" :class="[
		            aniStyle ? 'item_lf2' : '',
		            aniOverSty === 1 ? 'item_lf' : '',
		            aniOverSty === 2 ? 'itemScale_md' : '',
		            currentType === 'middle' ? 'middleClick_other' : '',
		            currentType === 'right' ? 'leftClick_md' : '',
		            centerMod === 1 && currentType !== 'middle' && currentType !== 'left' ? 'rightClick_md' : '',
		            currentType === 'left' ? 'left_mod_md' : '',
		            aniOverSty === 3 && currentType === 'left' ? 'left_mod_other' : '',
		          ]" @click="itemClick('middle')">
						<div :style="{
		              background: `url(./static/image/preGreen/hf-${
		                currentType === 'middle' ? '50' : currentType === 'right' ? '100-open' : '20'
		              }.png)`,
		              backgroundSize: `100% 100%`,
		            }" class="positive" :class="currentType === '' ? 'click_pos' : 'click_back'"></div>
						<div class="back" :class="currentType === '' ? 'click_back' : 'click_pos'"></div>
					</div>
					<div class="item" :class="[
		            aniOverSty === 1 ? 'item_md' : '',
		            aniOverSty === 2 ? 'itemScale_rl' : '',
		            currentType === 'middle' ? 'middleClick_md' : '',
		            currentType === 'right' ? 'rightClick_rl' : '',
		            currentType === 'left' ? 'leftClick_other' : '',
		          ]" @click="itemClick('right')">
						<div :style="{
		              background: `url(./static/image/preGreen/hf-${
		                currentType === 'middle' ? '100-open' : '50'
		              }.png)`,
		              backgroundSize: `100% 100%`,
		            }" class="positive" :class="currentType === '' ? 'click_pos' : 'click_back'"></div>
						<div class="back" :class="currentType === '' ? 'click_back' : 'click_pos'"></div>
					</div>
					<div class="item" :class="[
		            aniOverSty === 1 ? 'item_rl' : '',
		            aniOverSty === 2 ? 'itemScale_lf' : '',
		            currentType === 'middle' ? 'middleClick_other' : '',
		            currentType === 'right' ? 'leftClick_lf' : '',
		            aniOverSty === 3 && currentType === 'right' ? 'left_rotate_other' : '',
		            currentType === 'left' ? 'leftClick_rl' : '',
		            centerMod === 1 && currentType !== 'middle' && currentType !== 'right' ? 'left_mod_center' : '',
		          ]" @click="itemClick('left')">
						<div :style="{
		              background: `url(./static/image/preGreen/hf-${
		                currentType === 'middle' || currentType === 'right' ? '20' : '100-open'
		              }.png)`,
		              backgroundSize: `100% 100%`,
		            }" class="positive" :class="currentType === '' ? 'click_pos' : 'click_back'"></div>
						<div class="back" :class="currentType === '' ? 'click_back' : 'click_pos'"></div>
					</div>
				</div>
			</div>
		</main>
	</view>
</template>

<script>
	export default {
		onLoad() {
			setTimeout(() => {
				this.aniOverSty = 1;
			}, 2000);
			setTimeout(() => {
				this.aniStyle = true;
			}, 2400);
			setTimeout(() => {
				this.aniOverSty = 2;
				this.step = true;
			}, 2700);
		},
		data() {
			return {
				phone: '',
				currentType: '',
				step: false,
				show: false,
				tipsSuccess: false,
				number: 66,
				phoneStatus: false,
				aniStyle: false,
				aniOverSty: 0,
				centerMod: 0,
				t: ''
			};
		},
		methods: {
			itemClick(type) {
				if (!this.step) return;
				if(this.show){
					location.reload()
					return
				}
				if(this.t)return
				this.t=type
				this.currentType = type;
				setTimeout(() => {
					this.centerMod = 1;
					setTimeout(() => {
						this.aniOverSty = 3;
					}, 800);
				}, 1000);
				setTimeout(() => {
					this.tipsSuccess = true;
					setTimeout(() => {
						this.show = true;
						this.restNumber();
					}, 1300);
				}, 1900);
			},
			rest() {
				this.show = false
				this.step = false
				this.currentType = ''
				this.tipsSuccess = false
				this.phoneStatus= false
				this.aniStyle= true
				this.aniOverSty= 1
				this.centerMod= 0
				this.number = 66
				try{
					const dom = document.querySelector('.box')
					dom.clientWidth
				}catch(e){
					console.log(e);
					//TODO handle the exception
				}
			},
			restNumber() {
				setTimeout(() => {
					if (this.number <= 99) {
						this.restNumber();
						this.number++;
					}
				}, 20);
			}
		}
	}
</script>

<style lang="scss">
	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}

	.overlayAni {
		animation: overlayAni 0.8s forwards ease;

		.wrap {
			overflow: hidden;
			position: relative;
			width: 100vw;
			height: 100vh;
			background-image: url(@/static/image/preGreen/preGreenBox_open.png);
			background-repeat: no-repeat;
			background-size: cover;
			background-color: black;
			z-index: 999;

			.box {
				width: 100vw;
				position: absolute;
				top: 4.6rem;

				.number {
					text-align: center;
					color: #209e3d;
					font-size: 2rem;
					font-weight: 600;
					font-family: PingFangSC-Semibold;
				}

				.inputBox {
					border: 1px solid #f8dfb7;
					height: 0.96rem;
					border-radius: 1rem;
					width: 75%;
					margin: 0.5rem auto 0;
					display: flex;
					background: #fff;

					.icon {
						display: flex;
						justify-content: center;
						align-items: center;
						width: 20%;

						img {
							width: 0.22rem;
							height: 0.32rem;
						}
					}

					.input {
						width: 100%;
						height: 100%;
						background: transparent;
						font-size: 0.34rem;
						padding: 0 0.54rem 0 0;
						margin: 0;
						line-height: 0.9rem;
					}
				}

				.btn {
					width: 7.5rem;
					height: 1.5rem;
					background: url(@/static/image/preGreen/btn.png) no-repeat;
					background-size: contain;
					animation: btnAni 1s ease 0.7s infinite;
				}

				.hand {
					width: 100%;
					height: 1.8rem;
					display: flex;
					justify-content: flex-end;

					img {
						width: 1.78rem;
						height: 1.78rem;
						animation: handAni 1s ease 0.7s infinite;
					}
				}
			}
		}
	}

	main {
		min-width: 100vw;
		min-height: 100vh;
		background: url(@/static/image/preGreen/bg.png) no-repeat;
		background-size: 100% 100%;
		display: grid;
		justify-content: center;
		align-content: center;
		position: relative;

		.ani_box {
			position: relative;
			width: 100vw;
			display: grid;
			justify-content: center;
			align-items: center;
			grid-template-rows: 1rem auto;
			grid-template-columns: 100%;

			.light {
				position: absolute;
				width: 100vw;
				height: auto;
				z-index: 0;
			}

			.tips {
				width: 100%;
				height: 180rpx;
			}

			.tipsOk {
				height: 200rpx;
				transform: translateY(-100%);
			}

			.box {
				position: relative;
				z-index: 1;
				display: inline-grid;
				grid-template-columns: repeat(3, 33%);
				grid-template-rows: 100%;

				.item {
					transform-style: preserve-3d;
					position: relative;
					height: 300rpx;
					// transform: rotateY(0deg) translateX(0);
					// transform: rotate3d(0deg) translateZ(9900px) perspective(9900px);
					animation: backAni 2s forwards;

					.back {
						width: 100%;
						height: 100%;
						position: absolute;
						left: 0;
						top: 0;
						background: url(@/static/image/preGreen/preGreenTips.webp);
						background-size: 100% 100%;
						// transform: rotateY(-180deg);
					}

					.positive {
						// backface-visibility: hidden;
						// z-index: 2;
						width: 100%;
						height: 100%;
						position: absolute;
						left: 0;
						top: 0;
					}

					.p1 {
						background: url(@/static/image/preGreen/hf-100.png);
						background-size: 100% 100%;
					}

					.p2 {
						background: url(@/static/image/preGreen/hf-50.png);
						background-size: 100% 100%;
					}

					.p3 {
						background: url(@/static/image/preGreen/hf-20.png);
						background-size: 100% 100%;
					}

					.click_back {
						backface-visibility: hidden;
						transform: rotateY(-180deg);
					}

					.click_pos {
						backface-visibility: hidden;
						z-index: 2;
					}

					.middle_rotate {
						transform: rotateY(0deg);
						animation: middle_rotate 1s forwards;
					}

					.middle_rotate_back {
						transform: rotateY(360deg);
						animation: middle_rotate_back 1s forwards;
					}

					.rotate_other {
						animation: other_rotate 1s forwards;
						animation-delay: 0.8s;
					}

					.rotate_other_back {
						animation: other_rotate_back 1s forwards;
						animation-delay: 0.8s;
					}
				}

				.item_lf {
					transform: rotateY(180deg) translateX(0);
					animation: item_lf 0.3s linear forwards;
				}

				.item_rl {
					transform: rotateY(180deg) translateX(0);
					animation: item_rl 0.3s linear forwards;
				}

				.item_md {
					transform: rotateY(180deg) translateX(0);
					animation: item_md 0.3s linear forwards;
					animation-delay: 0.5s;
				}

				.item_lf2 {
					transform: rotateY(180deg) translateX(-200%);
					animation: item_lf2 0.2s linear forwards;
					animation-delay: 0.1s;
				}

				.itemScale_lf {
					transform: rotateY(180deg) translateX(0%) scale(1);
					animation: itemScale_lf 1.3s linear 0.5s infinite forwards;
				}

				.itemScale_rl {
					transform: rotateY(180deg) translateX(0%) scale(1);
					animation: itemScale_rl 1.3s linear 0.5s infinite forwards;
				}

				.itemScale_md {
					transform: rotateY(180deg) translateX(0%) scale(1);
					animation: itemScale_md 1.3s linear 0.5s infinite forwards;
				}

				.middleClick_md {
					z-index: 99;
					transform: translateZ(-1px) rotateY(0deg);
					animation: backAni3 0.5s linear forwards;
				}

				.rightClick_rl {
					transform: rotateY(0deg) translateX(100%) translateZ(-1px);
					animation: rightClick_rl 0.5s forwards;
					animation-delay: 2s;
				}

				.leftClick_lf {
					transform: translateX(-100%);
					animation: leftClick_lf 0.5s forwards;
				}

				.leftClick_rl {
					transform: translateX(0%);
					animation: leftClick_rl 0.5s forwards;
				}

				.leftClick_md {
					z-index: 9;
					transform: translateX(100%) rotateY(0deg);
					animation: leftClick_md 0.5s forwards;
				}

				.rightClick_md {
					z-index: 9;
					transform: translateX(100%) translateZ(1px);
					animation: rightClick_md 0.5s forwards;
				}

				.middleClick_other {
					transform: rotateY(0deg) translateZ(-1px);
					animation: backAni2 0.5s linear forwards;
					animation-delay: 2s;
				}

				.left_rotate_other {
					transform: rotateY(0deg) translateX(-200%) translateZ(-1px);
					animation: backAni4 0.5s linear forwards;
				}

				.leftClick_other {
					transform: translateX(-100%) rotateY(0deg) translateZ(-1px);
					animation: backAni5 0.5s linear forwards;
					animation-delay: 2s;
				}

				.left_mod_md {
					transform: translateX(0%) translateZ(-1px);
					animation: left_mod_md 0.5s linear forwards;
				}

				.left_mod_other {
					transform: translateX(200%) rotateY(0deg) translateZ(-1px);
					animation: backAni6 0.5s linear forwards;
				}

				.left_mod_center {
					z-index: 9;
					transform: translateX(-100%) translateZ(1px);
					animation: backAni7 0.5s forwards;
				}
			}
		}
	}

	@keyframes handAni {

		0%,
		100% {
			transform: translateX(0) translateY(-0.5rem);
		}

		50% {
			transform: translateX(-0.2rem) translateY(-1rem);
		}
	}

	@keyframes btnAni {
		0% {
			transform: scale(1);
		}

		50% {
			transform: scale(0.9);
		}

		100% {
			transform: scale(1);
		}
	}

	@keyframes overlayAni {

		0%,
		50% {
			transform: scale(0) translateZ(2px);
		}

		100% {
			transform: scale(1) translateZ(2px);
		}
	}

	@keyframes left_mod_md {
		to {
			transform: translateX(200%);
		}
	}

	@keyframes leftClick_lf {
		to {
			transform: translateX(-200%);
		}
	}

	@keyframes leftClick_rl {
		to {
			transform: translateX(-100%);
		}
	}

	@keyframes leftClick_md {

		0%,
		50% {
			transform: translateX(0%);
		}

		100% {}
	}

	@keyframes rightClick_rl {
		to {
			transform: translateZ(-1px) translateX(100%) rotateY(180deg);
		}
	}

	@keyframes rightClick_md {
		to {
			transform: translateX(100%) translateZ(1px) rotateY(180deg) scale(3, 2.5);
		}
	}

	@keyframes other_rotate {

		0%,
		50% {
			transform: rotateY(0deg);
		}

		100% {
			transform: rotateY(360deg);
		}
	}

	@keyframes other_rotate_back {

		0%,
		50% {
			transform: rotateY(0deg);
		}

		100% {
			transform: rotateY(180deg);
		}
	}

	@keyframes middle_rotate {

		0%,
		50% {
			transform: rotateY(180deg) scale(1);
		}

		100% {
			transform: rotateY(360deg) scale(2.5, 2);
		}
	}

	@keyframes middle_rotate_back {

		0%,
		50% {
			transform: rotateY(0deg) scale(1);
		}

		100% {
			transform: rotateY(360deg) scale(2.5, 2);
		}
	}

	@keyframes itemScale_md {

		0%,
		100% {
			transform: rotateY(180deg) translateX(-100%) scale(1);
		}

		50% {
			transform: rotateY(180deg) translateX(-100%) scale(1.1);
		}
	}

	@keyframes itemScale_lf {

		0%,
		100% {
			transform: rotateY(180deg) translateX(0%) scale(1);
		}

		50% {
			transform: rotateY(180deg) translateX(0%) scale(0.9);
		}
	}

	@keyframes itemScale_rl {

		0%,
		100% {
			transform: rotateY(180deg) translateX(100%) scale(1);
		}

		50% {
			transform: rotateY(180deg) translateX(100%) scale(0.9);
		}
	}

	@keyframes item_md {
		to {
			transform: rotateY(180deg) translateX(-100%);
		}
	}

	@keyframes item_lf {
		to {
			transform: rotateY(180deg) translateX(-200%);
		}
	}

	@keyframes item_lf2 {
		to {
			transform: rotateY(180deg) translateX(-100%);
		}
	}

	@keyframes item_rl {
		to {
			transform: rotateY(180deg) translateX(200%);
		}
	}

	@keyframes backAni {
		to {
			transform: rotateY(180deg);
		}
	}

	@keyframes backAni2 {
		to {
			transform: translateZ(-1px) rotateY(180deg);
		}
	}

	@keyframes backAni4 {
		to {
			transform: translateZ(-1px) translateX(-200%) rotateY(180deg);
		}
	}

	@keyframes backAni5 {
		to {
			transform: translateZ(-1px) translateX(-100%) rotateY(180deg);
		}
	}

	@keyframes backAni6 {
		to {
			transform: translateZ(-1px) translateX(200%) rotateY(180deg);
		}
	}

	@keyframes backAni7 {
		to {
			transform: translateZ(1px) translateX(-100%) rotateY(180deg) scale(3, 2.5);
		}
	}

	@keyframes backAni3 {
		to {
			transform: translateZ(1px) rotateY(540deg) scale(3, 2.5);
		}
	}
</style>