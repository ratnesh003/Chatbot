import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Search from './Search';

const Listing = () => {
	const [data, setData] = useState([]);
	const [listings, setListings] = useState([]);
	const [number, setNumber] = useState(20);
	useEffect(() => {
		axios.get('/api/listings').then((response) => {
			setData([...response.data]);
			if (data) {
				setListings(data.slice(0, number));
			}
		});
	}, [data, number]);
	const onSearch = (query) => {
		if (!query) {
			setListings(data.slice(0, number));
			return;
		}
		const filteredListing = data.filter(
			(list) =>
				list.city.toLowerCase().includes(query.toLowerCase()) ||
				list.title.toLowerCase().includes(query.toLowerCase()) ||
				list.type.toLowerCase().includes(query.toLowerCase())
		);
		setListings(filteredListing);
	};

	const onNumberChange = () => {
		if (number < data.length && number + 2 < data.length) {
			setNumber(number + 2);
			setListings((prev) => [...prev, ...data.slice(number, number + 2)]);
		} else {
			setNumber(data.length);
			setListings((prev) => [...prev, ...data.slice(number, data.length)]);
		}
	};
	const shouldShowLoadMore = () => {
		if (number !== data.length && number <= listings.length) {
			return true;
		}
		return false;
	};
	return (
		<section className="px-4 py-4">
			<div className="md:flex justify-between mb-4">
				<h1 className="uppercase p-1 text-primary text-center font-bold text-2xl ">
					Top Listings
				</h1>
				<Search onSearch={onSearch} />
			</div>
			<div className="grid gap-3 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-8">
				{listings.length > 0 &&
					listings.map((listing, index) => (
						<Link
							to={'/listing/' + listing._id}
							key={index}
							className="bg-white border rounded-xl"
						>
							<div className="flex">
								{listing.images?.[0] && (
									<img
										className="rounded-l object-cover aspect-square"
										src={'http://localhost:4000/uploads/' + listing.images?.[0]}
										alt=""
									/>
								)}
							</div>
							<div className="p-3">
								<h3 className="font-bold text-sm capitalize">
									{listing.type} in {listing.city}
								</h3>
								<h2 className="text-sm truncate text-gray-500">
									{listing.title}
								</h2>
								<div className="mt-1">
									<span className="font-bold">&#8358;{listing.price}</span> per
									night
								</div>
							</div>
						</Link>
					))}
			</div>
			<div className="flex center">
				{shouldShowLoadMore() && (
					<button
						onClick={onNumberChange}
						className="text-white bg-primary p-2 px-3"
					>
						Load More
					</button>
				)}
			</div>
		</section>
	);
};

export default Listing;
