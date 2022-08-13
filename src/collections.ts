import { State, useHookstate } from "@hookstate/core";
import { Groups } from "groups";

/**
 * States must have id property
 */
export class Collection<StateType extends { id: string | number }> {
	//the whole collection is a state
	public states: State<{ [key: string | number]: StateType }, {}>;
	public groups_class: Groups;

	constructor(items: StateType[], groups: { [group: string]: (string | number)[] } = {}) {
		this.states = this.normalized_states(items);
		this.groups_class = new Groups(groups);
	}

	private normalized_states(states: StateType[]) {
		return useHookstate(
			states.reduce((acc, state) => {
				acc[state.id] = state;
				return acc;
			}, {} as { [key: string | number]: StateType })
		);
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
