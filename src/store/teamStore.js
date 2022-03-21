import { getRandom } from '../helpers/helpers';
import { writable } from 'svelte/store';
import { get } from 'svelte/store';
import * as uuidv4 from 'uuid';
import { browser } from '$app/env';
let membersFromStorage = [];
let pairsFromStorage = [];

if (browser) {
	membersFromStorage = JSON.parse(localStorage.getItem('members'));
	pairsFromStorage = JSON.parse(localStorage.getItem('pairs'));
}

export const count = writable(0);
export let members = writable(membersFromStorage || []);
export let pairs = writable(pairsFromStorage || [{ locked: false, members: [] }]);

export let hotKeyPressed = writable(false);
let membersPerPair = 2;

export function generatePairs() {
	let temp = [...get(members)];
	let tempPairs = get(pairs).filter((pair) => pair.locked);
	for (let lockedPair of tempPairs) {
		lockedPair.members.forEach((member) => {
			temp = temp.filter((tempMember) => member.originalId !== tempMember.originalId);
		});
	}
	while (temp.length > 0) {
		let group = { locked: false, members: [] };
		for (let i = 0; i < membersPerPair; i++) {
			if (temp.length === 0) {
				break;
			}
			const member = getRandom(temp);
			temp = temp.filter((item) => item.id !== member.id);
			group.members.push(member);
		}
		tempPairs = [...tempPairs, group];
	}
	pairs.set([...tempPairs, { locked: false, members: [] }]);
}

export function togglePairLock(pair) {
	pair.locked = !pair.locked;
	pairs.set(get(pairs));
}

// CRUD operations on `members` and `pairs`
export function addMember(name) {
	const id = uuidv4.v4();
	members.update((members) => [{ id: id, name: name, originalId: id, isCopy: false }, ...members]);
}

export function removeMember(memberToRemove) {
	removeMemberFromPair(memberToRemove);
	members.update((members) => members.filter((member) => memberToRemove.id !== member.id));
}

export function setPair(pair, pairIndex) {
	pairs.update((pairs) => {
		let pairToSet = pairs[pairIndex];
		pairToSet.members = pair;
		return pairs;
	});
}

export function removeMemberFromPair(memberToRemove) {
	pairs.update((pairs) => {
		const newPairs = pairs
			.map((pair) => ({
				...pair,
				members: pair.members.filter((member) => member.originalId !== memberToRemove.originalId)
			}))
			.filter((pair) => pair.members.length !== 0);

		newPairs.push({ locked: false, members: [] });
		return newPairs;
	});
}

export function updateMemberName(member, newName) {
	member.name = newName;
	pairs.update((pairs) =>
		pairs.map((pair) => {
			let memberInPair = pair.members.find((m) => m.originalId === member.originalId);
			if (memberInPair) {
				memberInPair.name = newName;
			}
			return pair;
		})
	);
}
