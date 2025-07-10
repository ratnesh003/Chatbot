import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';

const Search = ({ onSearch }) => {
	const [query, setQuery] = useState('');
	const handleKeyPress = (e) => {
		if (e.key === 'Enter') {
			onSearch(query);
		}
	};
	return (
		<div className="flex relative">
			<input
				type="text"
				onKeyPress={handleKeyPress}
				onChange={(e) => setQuery(e.target.value)}
				value={query}
				className="py-1 text-xs "
			/>
			<button
				onClick={() => onSearch(query)}
				className="absolute top-2 right-0 z-10 text-blue-500 bg-transparent"
			>
				<FiSearch />
			</button>
		</div>
	);
};

export default Search;
