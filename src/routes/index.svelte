<script lang="ts">
	import { getRandom, getRandomInt } from '../helpers/helpers';
	import * as uuidv4 from 'uuid';

	import MemberBadge from '../components/MemberBadge.svelte';

	let members = [
		{ id: uuidv4.v4(), name: 'test' },
		{ id: uuidv4.v4(), name: 'test1' },
		{ id: uuidv4.v4(), name: 'test2' },
		{ id: uuidv4.v4(), name: 'test3' },
		{ id: uuidv4.v4(), name: 'test4' },
		{ id: uuidv4.v4(), name: 'test5' },
		{ id: uuidv4.v4(), name: 'test6' },
		{ id: uuidv4.v4(), name: 'test7' }
	];
	let pairs = [];
	let addUserValue = '';

	const deleteMember = (event) => {
		const memberName = event.detail.name;
		members = members.filter((member) => member.name !== memberName);
	};
	const editMember = (event) => {
		const newName = event.detail.name;
		const id = event.detail.id;
		for (let pair of pairs) {
			let member = pair.find((member) => member.id === id);
			if (member) {
				member.name = newName;
				break;
			}
		}
		let member = members.find((member) => member.id === id);
		member.name = newName;
		members = [...members];
		pairs = [...pairs];
	};
	const addUser = (e) => {
		if (e.keyCode === 13 && addUserValue.trim() != '') {
			members = [{ id: uuidv4.v4(), name: addUserValue }, ...members];
			addUserValue = '';
		}
	};
	const membersPerPair = 1;

	const generatePairs = () => {
		let temp = [...members];
		let tempPairs = [];
		while (temp.length > 0) {
			let group = [];
			for (let i = 0; i < membersPerPair; i++) {
				if (temp.length === 0) {
					break;
				}
				const member = getRandom(temp);
				temp = temp.filter((item) => item.name !== member.name);
				group.push(member);
			}
			tempPairs = [...tempPairs, group];
		}
		pairs = tempPairs;
	};
</script>

<div class="px-5vw text-white flex">
	<div
		class="bg-slate-600 w-60 max-h-80vh overflow-auto shadow-sm rounded-lg  shadow-black p-2 flex flex-col"
	>
		<h1 class="text-2xl">Members</h1>
		<div class="flex m-2 rounded-xl text-center shadow-sm shadow-black p-2 bg-teal-700">
			<input
				class="flex-1 bg-teal-700 outline-none text-center"
				bind:value={addUserValue}
				on:keyup={addUser}
				placeholder="Enter name"
			/>
		</div>

		{#each members as { name, id }}
			<MemberBadge editable={true} on:delete={deleteMember} on:edit={editMember} {name} {id} />
		{/each}
		<button on:click={generatePairs}>Generate</button>
	</div>

	<div class="flex ml-10 max-w-screen-lg flex-wrap h-1">
		{#each pairs as pair, i}
			<div
				class="ml-4 mb-10 bg-slate-600 w-60 shadow-sm rounded-lg self-start shadow-black p-2 flex flex-col"
			>
				<span>Pair {i}</span>
				{#each pair as member}
					<MemberBadge name={member.name} id={member.id} editable={false} />
				{/each}
			</div>
		{/each}
		<div />
	</div>
</div>
