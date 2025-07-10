import { useContext, useEffect, useState } from 'react';
import { differenceInCalendarDays } from 'date-fns';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../UserContext';

export default function BookingWidget({ listing }) {
	const navigate = useNavigate();
	const [checkIn, setCheckIn] = useState('');
	const [checkOut, setCheckOut] = useState('');
	const [numberOfGuests, setNumbeOfGuests] = useState(1);
	const [name, setName] = useState('');
	const [phone, setPhone] = useState('');
	const [isError, setIsError] = useState('');
	const { user } = useContext(UserContext);

	useEffect(() => {
		if (user) {
			setName(user.name);
		}
	}, [user]);

	let numberOfNights = 0;
	if (checkIn && checkOut) {
		numberOfNights = differenceInCalendarDays(
			new Date(checkOut),
			new Date(checkIn)
		);
	}

	async function handleBook() {
		if (!user) {
			navigate('/login');
			return;
		}
		if (!checkIn || !checkOut) {
			setIsError('add checkin and checkout time');
			setTimeout(() => {
				setIsError('');
			}, 500);
			return;
		}
		if (!phone) {
			setIsError('Please add phone contact');
			setTimeout(() => {
				setIsError('');
			}, 500);
			return;
		}
		const response = await axios.post('/bookings', {
			checkIn,
			checkOut,
			numberOfGuests,
			name,
			phone,
			price: numberOfNights * listing.price,
			listing: listing._id,
		});
		const bookingId = response.data._id;
		navigate(`/account/bookings/${bookingId}`);
	}

	return (
		<div className="bg-white border p-2 mt-10 rounded-md shadow-lg w-full md:max-w-md">
			<div>
				<span className="font-semibold text-lg">&#8358;{listing.price}</span>{' '}
				per Night
			</div>
			<div className="md:border rounded-md mt-2 text-xs md:text-sm">
				<div className="md:flex">
					<div className="py-3 md:px-4">
						<label className="text-xs">CheckIn</label>
						<input
							type="date"
							value={checkIn}
							onChange={(e) => setCheckIn(e.target.value)}
						/>
					</div>
					<div className="py-3 md:px-4 md:border-l">
						<label className="text-xs">CheckOut</label>
						<input
							type="date"
							value={checkOut}
							onChange={(e) => setCheckOut(e.target.value)}
						/>
					</div>
				</div>
				<div className="py-3 md:px-4 border-t">
					<label className="text-xs">Number of guest</label>
					<input
						type="number"
						value={numberOfGuests}
						onChange={(e) => setNumbeOfGuests(e.target.value)}
						min="1"
						max={listing.maxGuests}
					/>
				</div>
				{numberOfNights > 0 && (
					<div className="py-3 md:px-4 border-t text-xs md:text-sm">
						<label className="text-xs">Full name</label>
						<input
							type="text"
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
						<label className="text-xs mt-2">Telephone</label>
						<input
							type="tel"
							value={phone}
							onChange={(e) => setPhone(e.target.value)}
						/>
					</div>
				)}
			</div>
			{isError ? (
				<p className="text-red-500 text-xs my-1 text-center">{isError}</p>
			) : (
				''
			)}
			<button
				onClick={handleBook}
				className="bg-primary w-full mt-4 py-2 rounded-md"
			>
				Reserver
			</button>
			{checkIn && checkOut && (
				<div className="flex justify-between my-2 text-xs md:text-sm flex-wrap">
					<p className="underline">
						&#8358;{listing.price} x {numberOfNights}{' '}
						{numberOfNights > 1 ? 'nights' : 'night'}
					</p>
					<p>&#8358;{numberOfNights * listing.price}</p>
				</div>
			)}
		</div>
	);
}
