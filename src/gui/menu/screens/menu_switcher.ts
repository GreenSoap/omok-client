import 'wired-elements';
import { writable } from 'svelte/store';
import MainMenu from '../main_menu.svelte';

const create_navigation = () => {
	const screens = [MainMenu];
	const { subscribe, set } = writable(screens[0]);

	return {
		home: () => set(screens[0]),
		create_lobby: () => set(screens[1]),
		join_lobby: () => set(screens[2]),
		ai_lobby: () => set(screens[3]),
		local_lobby: () => set(screens[4])
	} 	
};

const current_screen = create_navigation();

export default current_screen;