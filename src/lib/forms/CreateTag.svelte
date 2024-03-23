<script lang="ts">
	import * as Form from '$lib/components/ui/form/index.js';
	import { Input } from '$lib/components/ui/input';
	import { type TagCreateSchema, tagCreateSchema } from '$lib/schema';
	import { LoaderCircle } from 'lucide-svelte';
	import { toast } from 'svelte-sonner';
	import { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';

	export let data: SuperValidated<Infer<TagCreateSchema>>;
	export let createTagOpenState: boolean;

	const form = superForm(data, {
		validators: zodClient(tagCreateSchema),
		onUpdated({ form }) {
			if (!form.posted) {
				toast.error('Something went worng');
				return;
			}
			if (form.valid) {
				createTagOpenState = false;
				toast.success('Tag created successfully');
				return;
			}
		},
		multipleSubmits: 'prevent'
	});
	const { form: formData, enhance, delayed } = form;
</script>

<form method="POST" action="?/createtag" use:enhance class="flex flex-col gap-2">
	<Form.Field {form} name="name">
		<Form.Control let:attrs>
			<Form.Label>Tag Name</Form.Label>
			<Input {...attrs} bind:value={$formData.name} disabled={$delayed} />
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field {form} name="emoji">
		<Form.Control let:attrs>
			<Form.Label>Emoji</Form.Label>
			<Input {...attrs} bind:value={$formData.emoji} disabled={$delayed} />
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Button disabled={$delayed} class="flex gap-1">
		Create Tag
		{#if $delayed}
			<LoaderCircle class="h-4 w-4 animate-spin" />
		{/if}
	</Form.Button>
</form>
