import { State, useHookstate } from "@hookstate/core";
import { Collection } from "collections";

export class Selectors<StateType extends { id: string | number }> {
	public selectors: State<{ [selector: string]: string | number }>;
	public collection: Collection<StateType>;
	constructor(collection: Collection<StateType>, selectors: { [selector: string]: string | number }) {
		this.selectors = useHookstate(selectors);
		this.collection = collection;
	}

	public add(name: string, state?: string | number) {
		this.selectors.merge({ [name]: state });
	}

	public remove(name: string) {
		this.selectors.set((prev) => {
			delete prev[name];
			return prev;
		});
	}

	public populate(name: string) {
		return this.collection.get(this.selectors.get()[name]);
	}
}
