import { State, useHookstate } from "@hookstate/core";
import { Collection } from "collections";

export class Groups<StateType extends { id: string | number }> {
	public groups: State<{ [group: string]: (string | number)[] }>;
	private collection: Collection<StateType>;
	public constructor(collection: Collection<StateType>, groups: { [group: string]: (string | number)[] }) {
		this.groups = useHookstate(groups);
		this.collection = collection;
	}

	public add(name: string, members: (string | number)[] = []): void {
		this.groups.merge({ [name]: members });
	}

	public remove(name: string): void {
		this.groups.set((prev) => {
			delete prev[name];
			return prev;
		});
	}

	public populate(name: string) {
		return this.groups.get()[name].map((id) => {
			return this.collection.get(id);
		});
	}
}
