import { useState } from "react";

export default function useToggle(defaultState = false): [boolean, () => void] {
	const [state, setState] = useState(defaultState);

	const toggle = () => {
		setState((prev) => !prev);
	};

	return [state, toggle as () => void];
}
