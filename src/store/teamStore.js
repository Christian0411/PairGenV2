import { writable } from 'svelte/store';
import * as uuidv4 from 'uuid';

export const count = writable(0);

export let members = writable([
	{ id: uuidv4.v4(), name: 'Chris' },
	{ id: uuidv4.v4(), name: 'Oscar' },
	{ id: uuidv4.v4(), name: 'Caro' }
]);

export let pairs = writable([]);

// CRUD operations on `members` and `pairs`
export function addMember(name) {
	members.update((members) => [{ id: uuidv4.v4(), name: name }, ...members]);
}

export function removeMember(memberToRemove) {
	removeMemberFromPair(memberToRemove);
	members.update((members) => members.filter((member) => memberToRemove.id !== member.id));
}

export function removeMemberFromPair(memberToRemove) {
	pairs.update((pairs) =>
		pairs
			.map((pair) => pair.filter((member) => member.id !== memberToRemove.id))
			.filter((pair) => pair.length != 0)
	);
}

export function updateMemberName(member, newName) {
	member.name = newName;
	pairs.update((pairs) =>
		pairs.map((pair) => {
			let memberInPair = pair.find((m) => m.id === member.id);
			if (memberInPair) {
				memberInPair.name = newName;
			}
			return pair;
		})
	);
}
