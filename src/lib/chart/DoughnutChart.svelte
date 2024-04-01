<script lang="ts">
	import { onMount } from 'svelte';
	import Chart from 'chart.js/auto';
	import ChartDataLabels from 'chartjs-plugin-datalabels';

	export let remainingPercentage: number;
	export let usedPercentage: number;
	let chart: Chart;
	let canvas: HTMLCanvasElement;
	onMount(() => {
		const ctx = canvas.getContext('2d');
		if (!ctx) return;
		chart = new Chart(canvas, {
			plugins: [ChartDataLabels],
			type: 'doughnut',
			data: {
				labels: ['Remaining', 'Used'],
				datasets: [
					{
						data: [remainingPercentage, usedPercentage],
						backgroundColor: ['rgba(255, 99, 132, 0.5)', 'rgba(54, 162, 235, 0.5)'],
						borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
						borderWidth: 1
					}
				]
			},
			options: {
				responsive: true,
				plugins: {
					legend: {
						display: true
					},
					datalabels: {
						formatter(value, context) {
							return value + '%';
						}
					},
					title: {
						display: false
					},
					tooltip: {
						callbacks: {
							label: function (context) {
								if (context.label) {
									context.label += ': ';
								}
								context.label = context.parsed.toFixed(2) + '%';
								return context.label;
							}
						}
					}
				},
				animation: { easing: 'easeOutExpo', delay: 1000 }
			}
		});
		return () => {
			chart.destroy();
		};
	});
</script>

<canvas bind:this={canvas}></canvas>
