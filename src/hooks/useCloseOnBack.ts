import { useEffect } from "react";
import useToggle from "./useToggle";
import { BackHandler } from "react-native";

export default function useCloseOnBack(): [boolean, () => void] {
	const [visible, toggle] = useToggle();
	useEffect(() => {
		const backAction = () => {
			if (visible) {
				toggle();
				return true;
			}
			return false;
		};

		const backHandler = BackHandler.addEventListener(
			"hardwareBackPress",
			backAction
		);
		return backHandler.remove();
	}, [visible]);
	return [visible, toggle];
}
