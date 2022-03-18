<script>
	import Dice from '@components/Dice/Dice.svelte';
	import MemberBadge from '@components/MemberBadge/MemberBadge.svelte';
	import { members, addMember } from '../../store/teamStore.js';

	let addMemberValue = '';

	const handleMemberInputKeyUp = (e) => {
		if (e.keyCode === 13 && addMemberValue.trim() != '') {
			addMember(addMemberValue);
			addMemberValue = '';
		}
	};
</script>

<div
	class="bg-slate-600 w-60 max-h-80vh overflow-scroll shadow-sm rounded-lg  shadow-black p-2 flex flex-col"
>
	<div class="flex flex-row place-content-between mb-3">
		<h1 class="text-2xl">Members</h1>
		<button on:click><Dice width="30px" height="30px" /></button>
	</div>

	<div class="flex m-2 rounded-xl text-center shadow-sm shadow-black p-2 bg-teal-700">
		<input
			class="flex-1 bg-teal-700 outline-none text-center"
			bind:value={addMemberValue}
			on:keyup={handleMemberInputKeyUp}
			placeholder="Enter name"
		/>
	</div>

	{#each $members as member}
		<MemberBadge editable={true} {member} />
	{/each}
</div>
