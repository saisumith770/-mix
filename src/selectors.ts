import { State, useHookstate } from "@hookstate/core";

export class Selectors {
	public selectors: State<{ [selector: string]: string | number }>;
	constructor(selectors: { [selector: string]: string | number }) {
		this.selectors = useHookstate(selectors);
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
}
