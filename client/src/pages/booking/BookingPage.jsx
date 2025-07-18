import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AddressLink from '../../components/listing/AddressLink';
import ListingGallery from '../../components/listing/ListingGallery';
import BookingDates from '../../components/booking/BookingDates';

export default function BookingPage() {
	const { id } = useParams();
	const [booking, setBooking] = useState(null);

	useEffect(() => {
		if (id) {
			axios.get('/api/bookings').then((response) => {
				const foundBooking = response.data.find(({ _id }) => _id === id);
				if (foundBooking) {
					setBooking(foundBooking);
				}
			});
		}
	}, [id]);

	if (!booking) {
		return '';
	}

	return (
		<div className="p-4 max-w-screen-lg">
			<h1 className="text-xl md:text-2xl">{booking.listing.title}</h1>
			<AddressLink className="my-2 block">
				{booking.listing.address}, {booking.listing.city}
			</AddressLink>
			<div className="border p-2 md:p-4  mb-4 rounded-md md:flex items-center justify-between">
				<div>
					<h2 className="text-sm md:text-lg mb-4">Your booking info</h2>
					<BookingDates booking={booking}></BookingDates>
				</div>
				<div className="bg-primary pt-2 px-3 text-white rounded-lg">
					<div className="text-xs md:text-sm">Total:</div>
					<div className="text-sm md:text-lg">&#8358;{booking.price}</div>
				</div>
			</div>
			<ListingGallery listing={booking.listing} />
		</div>
	);
}
