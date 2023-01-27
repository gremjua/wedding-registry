import { useState, useEffect } from 'react';

const getStorageValue = <T>(key: string, defaultValue: T) => {
	// getting stored value
	const saved = localStorage.getItem(key);
	const initial = JSON.parse(saved || JSON.stringify(defaultValue)) as T;
	return initial || defaultValue;
};

// eslint-disable-next-line import/prefer-default-export
export const useLocalStorage = <T>(
	key: string,
	defaultValue: T
): [T, React.Dispatch<T>] => {
	const [value, setValue] = useState<T>(() =>
		getStorageValue<T>(key, defaultValue)
	);

	useEffect(() => {
		// storing input name
		localStorage.setItem(key, JSON.stringify(value));
	}, [key, value]);

	return [value, setValue];
};
