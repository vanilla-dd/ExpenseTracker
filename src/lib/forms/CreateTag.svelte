<script lang="ts">
	import * as Form from '$lib/components/ui/form/index.js';
	import { Input } from '$lib/components/ui/input';
	import { type TagCreateSchema, tagCreateSchema } from '$lib/schema';
	import { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';

	export let data: SuperValidated<Infer<TagCreateSchema>>;
	export let createTagOpenState: boolean;

	const form = superForm(data, {
		validators: zodClient(tagCreateSchema),
		onResult({ result }) {
			// @ts-ignore // don't know why they don't have data typed
			if ((result.type = 'success' && result?.data?.createTag?.valid)) {
				createTagOpenState = false;
			}
		}
	});
	const { form: formData, enhance, delayed } = form;
</script>

<form method="POST" action="?/createtag" use:enhance class="flex flex-col gap-2">
	<Form.Field {form} name="name">
		<Form.Control let:attrs>
			<Form.Label>Tag Name</Form.Label>
			<Input {...attrs} bind:value={$formData.name} />
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field {form} name="emoji">
		<Form.Control let:attrs>
			<Form.Label>Emoji</Form.Label>
			<Input {...attrs} bind:value={$formData.emoji} />
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Button>Create Tag</Form.Button>
</form>
