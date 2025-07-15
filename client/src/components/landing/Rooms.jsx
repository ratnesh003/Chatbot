import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { rooms } from '../../Data';

const Rooms = () => {
	const [fourRooms, SetFourRooms] = useState([]);
	useEffect(() => {
		// return the first four rooms
		SetFourRooms(rooms.filter((room, index) => index < 4));
	}, []);
	return (
		<section className="px-4 py-4">
			<div className="flex justify-center mb-4">
				<h2 className="uppercase p-1 text-primary text-center font-bold text-2xl">
					Our Rooms and Listings
				</h2>
			</div>
			<div className="flex justify-center w-full md:max-w-xl mx-auto text-center">
				<p>
					List you property and get benefits such as reaching a wider audience,
					easy booking management, and potential for higher income.
				</p>
			</div>
			<div className="grid gap-3 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-8">
				{fourRooms.map((item, index) => (
					<Link
						to={`/listing/${item.name}`}
						key={index}
						className="bg-white border rounded-md"
					>
						<div className="flex">
							<img
								className="rounded-l object-cover aspect-square"
								src={item.frontPic}
								alt={item.name}
							/>
						</div>
						<div className="p-3">
							{/* <h3 className="font-bold text-sm capitalize">
								{listing.type} in {listing.city}
							</h3> */}
							<h2 className="text-sm truncate text-gray-500">{item.name}</h2>
							<div className="mt-1">
								<span className="font-bold">&#8358;{item.amount}</span> per
								night
							</div>
						</div>
					</Link>
				))}
			</div>
			<div className="flex justify-center text-primary mt-2">
				<Link to="/rooms" className="hover:text-primary/20 text-xs">
					More rooms
				</Link>
			</div>
		</section>
	);
};

export default Rooms;
