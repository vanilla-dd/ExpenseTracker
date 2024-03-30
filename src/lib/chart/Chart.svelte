<script lang="ts">
	import { Chart } from 'chart.js/auto';
	import { onMount } from 'svelte';

	const colors = {
		purple: {
			default: 'rgba(149, 76, 233, 1)',
			half: 'rgba(149, 76, 233, 0.5)',
			quarter: 'rgba(149, 76, 233, 0.25)',
			zero: 'rgba(149, 76, 233, 0)'
		},
		indigo: {
			default: 'rgba(80, 102, 120, 1)',
			quarter: 'rgba(80, 102, 120, 0.25)'
		}
	};

	let canvas: HTMLCanvasElement;
	export let arr: { date: number; expense: number }[];

	let chart: Chart;
	onMount(() => {
		const ctx = canvas.getContext('2d');
		if (!ctx) return;
		let gradient = ctx.createLinearGradient(0, 25, 0, 300);
		gradient.addColorStop(0, colors.purple.half);
		gradient.addColorStop(0.35, colors.purple.quarter);
		gradient.addColorStop(1, colors.purple.zero);

		chart = new Chart(ctx, {
			type: 'line',
			data: {
				labels: arr.map((entry) => entry.date),
				datasets: [
					{
						label: 'Expense',
						data: arr.map((entry) => entry.expense),
						fill: true,
						backgroundColor: gradient,
						pointBackgroundColor: colors.purple.default,
						borderColor: colors.purple.default,
						borderWidth: 2,
						pointRadius: 3
					}
				],
				// @ts-ignore
				xLabels: arr.map((e) => `Mar ${e.date}`)
			},
			options: {
				plugins: {
					legend: {
						display: false
					}
				},
				layout: {
					padding: 10
				},
				responsive: true,
				scales: { y: { beginAtZero: true } }
			}
		});

		return () => {
			chart.destroy();
		};
	});
</script>

<canvas bind:this={canvas}></canvas>
