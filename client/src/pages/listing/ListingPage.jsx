import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BookingWidget from '../../components/booking/BookingWidget';
import ListingGallery from '../../components/listing/ListingGallery';
import AddressLink from '../../components/listing/AddressLink';

export default function ListingPage() {
	const { id } = useParams();
	const [listing, setListing] = useState(null);

	useEffect(() => {
		if (!id) {
			return;
		}
		axios.get(`/api/listings/${id}`).then((response) => {
			setListing(response.data);
		});
	}, [id]);

	return (
		<>
			{listing && (
				<div className="inner">
					<div className="bg-white">
						<div className="pb-6 rounded-md">
							<h1 className="text-xl md:text-3xl font-semibold">
								{listing.title}
							</h1>
							<AddressLink>
								{listing.address}, {listing.city}
							</AddressLink>
						</div>
						<ListingGallery listing={listing} />
						<div className="mt-4 md:flex justify-between gap-4">
							<div className="w-full">
								<div className="rounded-md py-4 border-b ">
									<h2 className="font-semibold text-lg md:text-xl py-2">
										About this place
									</h2>
									{listing.description}
								</div>
								<div className="rounded-md py-4 border-b">
									<h2 className="font-semibold text-lg md:text-xl py-2">
										Notice
									</h2>
									<div className="grid grid-cols-1 md:grid-cols-3 text-sm">
										<div>
											{' '}
											Checkout: <br /> {listing.checkIn}
										</div>
										<div>
											{' '}
											CheckIn:
											<br /> {listing.checkOut}
										</div>
										<div>
											{' '}
											Max guest:
											<br className='hidden md:inline-block'/> {listing.maxGuests}
										</div>
									</div>
								</div>
								<div className="rounded-md py-4 border-b">
									<h2 className="font-semibold text-xl py-2">
										This property offers
									</h2>
									<div className="flex gap-2 flex-wrap">
										{listing.perks.map((perk) => (
											<div
												key={perk}
												className="border p-1.5 md:p-2 bg-primary text-white text-xs md:text-sm"
											>
												{perk}
											</div>
										))}
									</div>
								</div>
							</div>
							<div>
								<BookingWidget listing={listing} />
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
}
