import { State, useHookstate } from "@hookstate/core";

export class Groups {
	public groups: State<{ [group: string]: (string | number)[] }>;
	public constructor(groups: { [group: string]: (string | number)[] }) {
		this.groups = useHookstate(groups);
	}

	public add(name: string, members?: (string | number)[]): void {
		this.groups.merge({ [name]: members });
	}

	public remove(name: string): void {
		this.groups.set((prev) => {
			delete prev[name];
			return prev;
		});
	}
}
