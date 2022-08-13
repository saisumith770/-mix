import { State, useHookstate } from "@hookstate/core";
import { Groups } from "groups";
import { Selectors } from "selectors";

/**
 * States must have id property
 */
export class Collection<StateType extends { id: string | number }> {
	//the whole collection is a state
	public states: State<{ [key: string | number]: StateType }, {}>;
	public groups_class: Groups<StateType>;
	public selector_class: Selectors<StateType>;

	constructor(items: StateType[], groups: { [group: string]: (string | number)[] } = {}, selectors: { [selector: string]: string | number }) {
		this.states = this.normalized_states(items);
		this.groups_class = new Groups(this, groups);
		this.selector_class = new Selectors(this, selectors);
	}

	private normalized_states(states: StateType[]) {
		return useHookstate(
			states.reduce((acc, state) => {
				acc[state.id] = state;
				return acc;
			}, {} as { [key: string | number]: StateType })
		);
	}

	/** all funcionality related to selectors **/
	public get selectors() {
		return this.selector_class.selectors;
	}

	public get selector() {
		return this.selector_class;
	}

	/** all functionality related to groups **/
	public get groups() {
		return this.groups_class.groups;
	}

	public get group() {
		return this.groups_class;
	}

	/** These methods will perform CRUD operations on the states **/

	public get(key: string | number) {
		return this.states.get()[key];
	}

	public collect(state: StateType, group?: string) {
		const acc: { [key: string | number]: StateType } = {};
		acc[state.id] = state;
		this.states.merge(acc);

		if (group) this.groups[group].merge([state.id]);
	}

	public remove(id: string | number) {
		this.states.set((prev) => {
			delete prev[id];
			return prev;
		});
	}
}
