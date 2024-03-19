<script lang="ts">
	import { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms';
	import { type ExpenseCreateSchema, expenseCreateSchema } from '$lib/schema';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import * as Form from '$lib/components/ui/form/index.js';
	import { Input } from '$lib/components/ui/input';

	export let data: SuperValidated<Infer<ExpenseCreateSchema>>;
	const form = superForm(data, {
		validators: zodClient(expenseCreateSchema)
	});

	const { form: formData, enhance } = form;
</script>

<form method="POST" action="?/createtag" use:enhance>
	<Form.Field {form} name="price">
		<Form.Control let:attrs>
			<Form.Label>Tag Name</Form.Label>
			<Input {...attrs} bind:value={$formData.price} />
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
</form>
