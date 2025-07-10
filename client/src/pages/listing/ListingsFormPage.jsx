import Perks from '../../components/listing/Perks';
import ImageUploader from '../../components/listing/ImageUploader';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

export default function ListingFormPage() {
	const { id } = useParams();
	const navigate = useNavigate();
	const [title, setTitle] = useState('');
	const [city, setCity] = useState('');
	const [rooms, setRooms] = useState(1);
	const [type, setType] = useState('');
	const [address, setAddress] = useState('');
	const [images, setImages] = useState([]);
	const [description, setDescription] = useState('');
	const [perks, setPerks] = useState([]);
	const [checkIn, setCheckIn] = useState('');
	const [checkOut, setCheckOut] = useState('');
	const [maxGuests, setMaxGuests] = useState(1);
	const [price, setPrice] = useState(100);

	useEffect(() => {
		if (!id) {
			return;
		}

		axios.get('/api/listings/' + id).then((response) => {
			const { data } = response;
			setTitle(data.title);
			setCity(data.city);
			setType(data.type);
			setRooms(data.rooms);
			setAddress(data.address);
			setImages(data.images);
			setDescription(data.description);
			setPerks(data.perks);
			setCheckIn(data.checkIn);
			setCheckOut(data.checkOut);
			setMaxGuests(data.maxGuests);
			setPrice(data.price);
		});
	}, [id]);

	async function handleSaveListing(e) {
		e.preventDefault();
		const listingData = {
			title,
			city,
			address,
			type,
			rooms,
			images,
			description,
			perks,
			checkIn,
			checkOut,
			maxGuests,
			price,
		};

		try {
			if (id) {
				await axios.put('/api/listings', { id, ...listingData });
			} else {
				await axios.post('/api/listings', listingData);
			}

			navigate('/account/listings');
		} catch (error) {
			if (error.response?.data?.error) {
				const errorMessage = error.response.data.error;
				alert(errorMessage);
			} else {
				alert(error);
			}
		}
	}

	return (
		<div className="m-4 p-4 border rounded-md max-w-screen-md">
			<h1 className="text-2xl font-semibold pb-4 border-b">
				{id ? 'Edit post' : 'New Posting'}
			</h1>
			<form onSubmit={handleSaveListing}>
				<label className="font-semibold inline-block mt-4 mb-2">Titel</label>
				<input
					type="text"
					value={title}
					required
					onChange={(e) => setTitle(e.target.value)}
					placeholder="Given short titel"
				/>
				<label className="font-semibold inline-block my-2">By</label>
				<input
					type="text"
					value={city}
					required
					onChange={(e) => setCity(e.target.value)}
					placeholder="City name"
				/>
				<label className="font-semibold inline-block my-2">Address</label>
				<input
					type="text"
					value={address}
					required
					onChange={(e) => setAddress(e.target.value)}
					placeholder="Address"
				/>
				<label className="font-semibold inline-block my-2">House type</label>
				<select value={type} onChange={(e) => setType(e.target.value)}>
					<option value="">Selete house type</option>
					<option value="single room">Single room</option>
					<option value="apartment">Apartment</option>
					<option value="guest house">Guest house</option>
					<option value="lounge">lounge</option>
					<option value="hall">Hall</option>
				</select>
				<label className="font-semibold inline-block my-2">Images</label>
				<ImageUploader images={images} onChange={setImages} />
				<label className="font-semibold inline-block my-2">Description</label>
				<textarea
					type="text"
					value={description}
					required
					onChange={(e) => setDescription(e.target.value)}
					placeholder="House discription"
				/>
				<label className="font-semibold inline-block my-2">Benefits</label>
				<Perks selected={perks} onChange={setPerks}></Perks>
				<div className="grid gap-2 grid-cols-4 md-grid-cols-6 my-4">
					<div>
						<label className="font-semibold mb-2 inline-block">
							Checkin time
						</label>
						<input
							type="time"
							value={checkIn}
							required
							onChange={(e) => setCheckIn(e.target.value)}
							placeholder="14:00"
						/>
					</div>
					<div>
						<label className="font-semibold mb-2 inline-block">
							Checkout time
						</label>
						<input
							type="time"
							value={checkOut}
							required
							onChange={(e) => setCheckOut(e.target.value)}
							placeholder="11"
						/>
					</div>
					<div>
						<label className="font-semibold mb-2 inline-block">Max guest</label>
						<input
							type="number"
							required
							value={maxGuests}
							onChange={(e) => setMaxGuests(e.target.value)}
						/>
					</div>
					<div>
						<label className="font-semibold mb-2 inline-block">
							Price pr. night
						</label>
						<input
							type="number"
							required
							value={price}
							onChange={(e) => setPrice(e.target.value)}
						/>
					</div>
					<div>
						<label className="font-semibold mb-2 inline-block">
							Aval. rooms
						</label>
						<input
							type="number"
							required
							value={rooms}
							onChange={(e) => setRooms(e.target.value)}
						/>
					</div>
				</div>
				<button className="primary my-4">{id ? 'Update' : 'Add'}</button>
			</form>
		</div>
	);
}
