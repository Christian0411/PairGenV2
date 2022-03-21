import * as uuidv4 from 'uuid';
export function getRandomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

export function getRandom(array) {
    return array[getRandomInt(0, array.length)];
}

export function encodePairs(pairs) {
    let encodedString = 'gen';
    const noEmptyPairsList = pairs.filter((pair) => pair.members.length > 0)
    noEmptyPairsList.forEach((pair, pairIndex) => {
			if (pair.members.length > 0) {
				pair.members.forEach((member, i) => {
					encodedString += member.name;
					if (i !== pair.members.length - 1) {
						encodedString += ',';
					}
				});

				if (pairIndex !== noEmptyPairsList.length - 1) {
					encodedString += '|';
				}
			}
		})
    return btoa(encodedString);
}

export function decodePairs(encodedPairString) {
    let finalPairs = [];
    let finalMembers = [];
    let pairStrings = []
    try{
    const decodePairString = atob(encodedPairString)
    const keyword = decodePairString.slice(0,3)
    if(keyword !== "gen") throw new Error("Code malformed")
    pairStrings = decodePairString.slice(3,decodePairString.length).split('|');
    } catch(error) {
        console.error(error)
    }
    pairStrings.forEach((pairString) => {
        const pairNameArray = pairString.split(',');
        let pairArray = { locked: false, members:[] };
        let membersArray = [];
        pairNameArray.forEach((memberName) => {
            const memberUUID = uuidv4.v4();
            const member = {
                id: memberUUID,
                originalId: memberUUID,
                name: memberName,
                isCopy: false
            };
            membersArray.push(member);
            finalMembers.push(member);
        });
        pairArray.members = membersArray;
        finalPairs.push(pairArray);
    });
    console.log({finalPairs, finalMembers})
    return {pairs: finalPairs, members: finalMembers}

}