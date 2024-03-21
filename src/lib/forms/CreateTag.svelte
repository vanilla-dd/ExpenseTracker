<script lang="ts">
	import * as Form from '$lib/components/ui/form/index.js';
	import { Input } from '$lib/components/ui/input';
	import { type TagCreateSchema, tagCreateSchema } from '$lib/schema';
	import { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';

	export let data: SuperValidated<Infer<TagCreateSchema>>;

	const form = superForm(data, {
		validators: zodClient(tagCreateSchema)
	});
	const { form: formData, enhance } = form;
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
