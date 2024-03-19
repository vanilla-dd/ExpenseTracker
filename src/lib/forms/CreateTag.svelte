<script lang="ts">
	import { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms';
	import { type TagCreateSchema, tagCreateSchema } from '$lib/schema';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import * as Form from '$lib/components/ui/form/index.js';
	import { Input } from '$lib/components/ui/input';

	export let data: SuperValidated<Infer<TagCreateSchema>>;
	const form = superForm(data, {
		validators: zodClient(tagCreateSchema)
	});

	const { form: formData, enhance } = form;
</script>

<form method="POST" action="?/createtag" use:enhance>
	<Form.Field {form} name="name">
		<Form.Control let:attrs>
			<Form.Label>Tag Name</Form.Label>
			<Input {...attrs} bind:value={$formData.name} />
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field {form} name="emoji">
		<Form.Control let:attrs>
			<Form.Label>Tag Emoji</Form.Label>
			<Input {...attrs} bind:value={$formData.emoji} />
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Button>Submit</Form.Button>
</form>
