<template>
	<view>
		<main>
			<div class="prize_box">
				<div class="bg_box"></div>
				<div class="lotteryBody_bottom">
					<div class="left" ref="left">
						<div class="goodsContainer" :class="boxWhileScroll ? 'left-ani' : ''" ref="leftRef"
							:style="{ top: leftTop + 'px' }">
							<div class="goodsItem" ref="prizeItemRef" :id="item.id" theme=""
								v-for="(item, index) in goodsList1" :key="index">
								<div class="imgBox">
									<img class="goodsImg" id="goodsImg_1" :src="item.img" />
								</div>
								<div class="goodsName">{{ item.name }}</div>
							</div>
						</div>
					</div>
					<div class="middle">
						<div class="goodsContainer" :class="boxWhileScroll ? 'mid-ani' : ''" ref="midRef"
							:style="{ top: midTop + 'px' }">
							<div class="goodsItem" :id="item.id" theme="" v-for="(item, index) in goodsList2"
								:key="index">
								<div class="imgBox">
									<img class="goodsImg" id="goodsImg_1" :src="item.img" />
								</div>
								<div class="goodsName">{{ item.name }}</div>
							</div>
						</div>
					</div>
					<div class="right">
						<div class="goodsContainer" :class="boxWhileScroll ? 'right-ani' : ''" ref="rightRef"
							:style="{ top: rightTop + 'px' }">
							<div class="goodsItem" :id="item.id" theme="" v-for="(item, index) in goodsList3"
								:key="index">
								<div class="imgBox">
									<img class="goodsImg" id="goodsImg_1" :src="item.img" />
								</div>
								<div class="goodsName">{{ item.name }}</div>
							</div>
						</div>
					</div>
				</div>
				<div class="leftTimes">{{ times }}</div>
				<div class="playBtn" @click="btnHandle">
					<div class="playBtnItem" style="background-image: url(./static/image/armBandit/btn.webp)"
						 :class="btnFlag ? 'btnAni' : ''"></div>
					<div class="btn_hand handAni" style="background-image: url('./static/image/armBandit/hand.webp')"
						v-show="btnFlag"></div>
				</div>
			</div>
			<u-overlay :show="show" :close-on-click-overlay="false">
				<div class="popup_wrap">
					<div class="btn"
						style="background-image: url(/.static/image/armBandit/fef2d5aba45d459c8850151420d62834.webp)"
						@click="btnJumpToNext"></div>
				</div>
			</u-overlay>
			<u-overlay :show="showBoom" :close-on-click-overlay="false">
				<div class="boom-animation">
					<img src="@/static/image/armBandit/iphone.png" alt="" />
					<img src="@/static/image/armBandit/iphone.png" alt="" />
					<img src="@/static/image/armBandit/iphone.png" alt="" />
				</div>
				<div class="boom-img"></div>
			</u-overlay>
		</main>
	</view>
</template>

<script>
	import {
		goodsList1,
		goodsList2,
		goodsList3
	} from './data.js';
	export default {
		data() {
			return {
				goodsList1,
				goodsList2,
				goodsList3,
				leftTop: 0,
				midTop: 0,
				rightTop: 0,
				boxWhileScroll: true,
				times: 2,
				index: 2,
				btnFlag: true,
				speed: 1,
				show: false,
				showBoom: false,
				itemHeight: 0,
				leftRef: undefined,
				midRef: undefined,
				rightRef: undefined,
				timer: undefined,
				prizeItemRef: null,
			};
		},
		mounted() {
			this.init()
			this.itemHeight = this.$refs.prizeItemRef.clientHeight;
		},
		methods: {
			btnJumpToNext() {
				location.reload()
			},
			boxAni(top, ele, wait = 0) {
				this.timer = setInterval(() => {
					if (this[top] > -1 * this.itemHeight) {
						this[top] -= this.speed;
					} else {
						this[top] = 0;
						const e = ele.children[0]; // 获取第一个元素
						ele.appendChild(e); // 从末尾添加一个元素
					}
				}, wait);
			},
			init() {
				this.speed = 1;
				this.boxWhileScroll = true;
				this.leftTop = 0;
				this.midTop = 0;
				this.rightTop = 0;
			},
			prodHtml(arr) {
				let html = ``;
				for (let i = 0; i < arr.length; i++) {
					const e = arr[i];
					html += `<div class="goodsItem" id="${e.id}">
			              <div class="imgBox">
			                <img class="goodsImg" id="" src="${e.img}" />
			              </div>
			              <div class="goodsName">${e.name}</div>
			            </div>`;
				}
				return html;
			},
			rest() {
				const leftHtml = this.prodHtml(this.goodsList1);
				const midHtml = this.prodHtml(this.goodsList2);
				const rightHtml = this.prodHtml(this.goodsList3);
				this.$refs.leftRef.innerHTML = leftHtml;
				this.$refs.midRef.innerHTML = midHtml;
				this.$refs.rightRef.innerHTML = rightHtml;
			},
			btnHandle() {
				this.index--;
				if (this.index < 1) return;
				this.leftTop = this.$refs.leftRef.getBoundingClientRect().top + 2 * this.itemHeight * -1;
				this.midTop = this.$refs.midRef.getBoundingClientRect().top + 2 * this.itemHeight * -1;
				this.rightTop = this.$refs.rightRef.getBoundingClientRect().top + 2 * this.itemHeight * -1;
				this.boxWhileScroll = false;
				this.boxAni('leftTop', this.$refs.leftRef);

				this.btnFlag = false;
				this.speed = 8;
				setTimeout(() => {
					const div = document.getElementById('1');
					const top = div?.offsetTop;
					this.leftTop = -top;
					clearInterval(this.timer);
					this.boxAni('midTop', this.$refs.midRef);
				}, 1000);
				setTimeout(() => {
					clearInterval(this.timer);
					const div2 = document.getElementById('8');
					const top2 = div2?.offsetTop;
					this.midTop = -top2;
					this.boxAni('rightTop', this.$refs.rightRef, 5);
				}, 2000);
				setTimeout(() => {
					clearInterval(this.timer);
					let num = '21';
					if (this.times == 1) {
						num = '15';
					}
					const div3 = document.getElementById(num);
					const top3 = div3?.offsetTop;
					this.rightTop = -top3;
					this.btnFlag = true;
					setTimeout(() => {
						if (this.times == 2) {
							this.times = 1;
							this.index = 2;
							this.btnFlag = true;
							this.init();
							this.rest();
						} else {
							this.times = 0;
							this.showBoom = true;
							setTimeout(() => {
								this.showBoom = false;
								this.show = true;
							}, 2000);
						}
					}, 500);
				}, 3000);
			}
		}
	}
</script>

<style lang="scss" scoped>
	/deep/.goodsItem {
		padding: 52rpx 0 0;
	
		.goodsName {
			width: 100%;
			height: 36rpx;
			text-align: center;
			color: red;
			font-size: 26rpx;
			line-height: 36rpx;
			font-weight: 700;
			margin-top: 0;
		}
		.goodsImg {
			display: block;
			width: 200rpx;
			height: 200rpx;
			margin: 0 auto;
		}
	}
	main {
		overflow: hidden;
		min-width: 100vw;
		min-height: 100vh;
		background: url(@/static/image/armBandit/bg.webp) no-repeat;
		background-size: 100% auto;

		.prize_box {
			width: 100%;
			position: absolute;
			top: 460rpx;

			.bg_box {
				width: 100%;
				height: 100%;
				position: absolute;
				top: 0rem;
				height: 500rpx;
				background: url(@/static/image/armBandit/box.webp) no-repeat;
				background-size: cover;
				z-index: 5;
			}

			.lotteryBody_bottom {
				position: absolute;
				width: 650rpx;
				height: 340rpx;
				background-color: #fff;
				left: 50%;
				transform: translateX(-50%);
				top: 114rpx;
				border-radius: 0.25rem;
				z-index: 0;
				display: flex;
				flex-direction: row;
				justify-content: center;
				flex-wrap: nowrap;
				justify-items: center;
				align-items: center;

				.left,
				.middle,
				.right {
					width: 210rpx;
					height: 340rpx;
					position: relative;
					overflow: hidden;
				}

				.middle {
					margin: 0 0.1rem;
				}

				

				.goodsContainer {
					position: absolute;
					top: 0;

					
				}

			}

			.leftTimes {
				position: absolute;
				width: 100rpx;
				height: 50rpx;
				color: #e40044;
				font-size: 48rpx;
				// line-height: 0.5rem;
				font-weight: 700;
				top: 560rpx;
				left: 400rpx;

				&::after {
					content: '次';
					font-size: 26rpx;
					margin-left: 0.02em;
					position: relative;
					top: -0.04rem;
				}
			}

			.playBtn {
				position: absolute;
				width: 210rpx;
				height: 210rpx;
				z-index: 10;
				top: 520rpx;
				left: 500rpx;

				.playBtnItem {
					position: absolute;
					width: 210rpx;
					height: 210rpx;
					background-image: url(//cdn.ituibei.cn/dist/welfareAT02/private/C/Cz046P/img);
					background-repeat: no-repeat;
					background-size: 100% 100%;
					left: 0;
					top: 0;
					background-size: cover;
					background-position: 0 0;
				}

				.btnAni {
					animation: playBtnItem_move 0.3s linear infinite alternate;
				}

				.handAni {
					animation: btn_hand_move 0.3s linear infinite alternate;
				}

				.btn_hand {
					position: absolute;
					width: 130rpx;
					height: 130rpx;
					left: 100rpx;
					top: 100rpx;
					background-image: url(@/static/image/armBandit/hand.webp);
					background-repeat: no-repeat;
					background-size: cover;
					background-size: 100% 100%;
				}
			}
		}
	}

	.popup_wrap {
		width: 100%;
		height: 100%;
		background-image: url(@/static/image/armBandit/ac0240b0ec104b35901c59e16d70dc71.webp);
		background-repeat: no-repeat;
		box-sizing: border-box;
		background-size: 100% auto;
		background-position-y: 20%;
		padding-top: 900rpx;

		.btn {
			width: 440rpx;
			height: 100rpx;
			margin: 10rpx auto 0;
			animation: FormBtnScale 1s ease 0s infinite;
			background-size: 100% 100%;
			background-repeat: no-repeat;
		}
	}

	.boom-img {
		width: 300rpx;
		height: 300rpx;
		background-image: url(@/static/image/armBandit/boom.webp);
		background-position-x: -1260rpx;
		background-size: cover;
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		top: 320rpx;
		opacity: 0;
		animation: boomImgShow 0.3s 1.2s forwards;
	}

	@keyframes boomImgShow {
		0% {
			opacity: 0;
		}

		75% {
			opacity: 0;
		}

		100% {
			opacity: 1;
		}
	}

	.boom-animation {
		display: flex;
		justify-content: space-between;
		position: absolute;
		top: 500rpx;
		width: 100%;
		padding: 0 50rpx;
		box-sizing: border-box;

		img {
			width: 30%;
			height: auto;
			animation-duration: 1s;
			animation-fill-mode: forwards;
			animation-delay: 0.5s;

			&:nth-child(1) {
				animation-name: phoneMove1;
			}

			&:nth-child(2) {
				animation-name: phoneMove2;
			}

			&:nth-child(3) {
				animation-name: phoneMove3;
			}
		}
	}

	@keyframes phoneMove1 {
		0% {
			transform: translate(0) rotateZ(0deg);
		}

		10% {
			transform: translate(0) rotateZ(10deg);
		}

		20% {
			transform: translate(0) rotateZ(-10deg);
		}

		30% {
			transform: translate(0) rotateZ(0deg);
		}

		80% {
			transform: translate(2.27rem, -30px) rotateZ(10deg);
		}

		90% {
			transform: translate(2.27rem, -30px) rotateZ(-10deg);
		}

		100% {
			transform: translate(2.27rem, -30px) rotateZ(0deg);
		}
	}

	@keyframes phoneMove2 {
		0% {
			transform: translate(0);
		}

		10% {
			transform: translate(0) rotateZ(10deg);
		}

		20% {
			transform: translate(0) rotateZ(-10deg);
		}

		30% {
			transform: translate(0) rotateZ(0deg);
		}

		80% {
			transform: translate(0px, -30px) rotateZ(10deg);
		}

		90% {
			transform: translate(0px, -30px) rotateZ(-10deg);
		}

		100% {
			transform: translate(0px, -30px) rotateZ(0deg);
		}
	}

	@keyframes phoneMove3 {
		0% {
			transform: translate(0);
		}

		10% {
			transform: translate(0) rotateZ(10deg);
		}

		20% {
			transform: translate(0) rotateZ(-10deg);
		}

		30% {
			transform: translate(0) rotateZ(0deg);
		}

		80% {
			transform: translate(-2.27rem, -30px) rotateZ(10deg);
		}

		100% {
			transform: translate(-2.27rem, -30px) rotateZ(-10deg);
		}

		100% {
			transform: translate(-2.27rem, -30px) rotateZ(0deg);
		}
	}

	@keyframes FormBtnScale {
		0% {
			transform: scale(1);
		}

		50% {
			transform: scale(1.05);
		}

		100% {
			transform: scale(1);
		}
	}

	@keyframes playBtnItem_move {
		0% {
			transform: scale(1);
		}

		100% {
			transform: scale(0.8);
		}
	}

	@keyframes btn_hand_move {
		0% {
			transform: translate(0);
		}

		100% {
			transform: translate(0.5rem, 0.5rem);
		}
	}

	.left-ani {
		-webkit-transform: translate3d(0, 0, 0);
		transform: translate3d(0, 0%, 0);
		animation: fx-roll 4500ms 0s infinite linear;
		animation-delay: 0ms;
	}

	.mid-ani {
		-webkit-transform: translate3d(0, 0, 0);
		transform: translate3d(0, 0%, 0);
		animation: fx-roll 3000ms 0s infinite linear;
		animation-delay: 500ms;
	}

	.right-ani {
		-webkit-transform: translate3d(0, 0, 0);
		transform: translate3d(0, 0%, 0);
		animation: fx-roll 3500ms 0s infinite linear;
		animation-delay: 1000ms;
	}

	@keyframes fx-roll {
		0% {
			-webkit-transform: translate3d(0, 0, 0);
			transform: translate3d(0, 0%, 0);
		}

		100% {
			-webkit-transform: translate3d(0, -87.5%, 0);
			transform: translate3d(0, -87.5%, 0);
		}
	}

	@keyframes phoneAni {
		to {
			transform: translate(-50%, 0%);
			opacity: 1;
		}
	}

	@keyframes tipsAni {
		to {
			transform: scale(1);
			opacity: 1;
		}
	}
</style>