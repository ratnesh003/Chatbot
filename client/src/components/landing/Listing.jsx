import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Listing = () => {
	const [listings, setListings] = useState([]);
	useEffect(() => {
		axios.get('/api/listings').then((response) => {
			setListings([...response.data]);
		});
	}, []);
	return (
		<section className="px-4 py-4">
			<div className="flex justify-center mb-4">
				<h1 className="uppercase p-1 text-primary text-center font-bold text-2xl ">
					List Your Property with Us
				</h1>
			</div>
			<div className="flex justify-center w-full md:max-w-xl mx-auto text-center">
				<p>
					List you property and get benefits such as reaching a wider audience,
					easy booking management, and potential for higher income.
				</p>
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
			<div>
				<Link to="register">Get Started</Link>
			</div>
		</section>
	);
};

export default Listing;
