<script lang="ts">
	import { Chart } from 'chart.js/auto';
	import { onMount } from 'svelte';

	export let arr: { date: number; expense: number }[];
	let canvas: HTMLCanvasElement;

	let chart: Chart;
	onMount(() => {
		const ctx = canvas;

		chart = new Chart(ctx, {
			type: 'line',
			data: {
				labels: arr.map((entry) => entry.date),
				datasets: [
					{
						label: 'Expense',
						data: arr.map((entry) => entry.expense),
						borderColor: '#4CAF50',
						backgroundColor: 'rgba(76, 175, 80, 0.2)',
						pointBackgroundColor: '#4CAF50',
						pointBorderColor: '#fff',
						pointHoverBackgroundColor: '#fff',
						pointHoverBorderColor: '#4CAF50',
						tension: 0.3,
						fill: true
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
				}
			}
		});

		return () => {
			chart.destroy();
		};
	});
</script>

<canvas bind:this={canvas}></canvas>
