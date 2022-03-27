import { members, pairs } from "../store/teamStore";
import { browser } from "$app/env";
if (browser) {
  members.subscribe((members) => {
    localStorage.setItem("members", JSON.stringify(members));
  });

  pairs.subscribe((pairs) => {
    localStorage.setItem("pairs", JSON.stringify(pairs));
  });
}
