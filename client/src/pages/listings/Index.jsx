import Listing from './Listing';
import bgImg from '../../assets/Buy/house4/img1.webp';

const Index = () => {
	return (
		<div className="">
			<div
				style={{ backgroundImage: `url(${bgImg})` }}
				className={`min-h-[50vh] relative after:left-0 after:right-0 after:absolute after:top-0 after:h-full bg-black/40 bg-center flex items-center after:w-full after:bg-bgT pt-[50px]  px-[30px] bg-cover z-[1]  `}
			>
				<div
					data-aos="zoom-in-up"
					className="relative z-[1] py-[50px] max-w-[700px]"
				>
					<h1 className="font-bold text-slate-50 text-[50px] ">Our Listing</h1>
					<p className="text-slate-200 font-fonty text-[17px] ">
						Here at Ilouge, we take pride in our accommodation and make sure
						that after you check out, your definition of luxury would change.
						Our rooms are spacious and well equipped with 24 hour room service,
						luxurious bathrooms, climate control, over 30 channels satellite
						digital TV, Fridge and complimentary tea/coffee items. Also, to
						further improve our security and efficiency of operation, our doors
						are now equipped with electronic locking systems which operate using
						key cards. With top class furniture created by our own standby
						furnishing factory, a choice of carpet, tiles or granite floors, and
						24 hours electricity and water supply (via backup generators and
						storage tanks), you would never want to leave.
					</p>
				</div>
			</div>
			<div className="mt-4">
				<Listing />
			</div>
		</div>
	);
};

export default Index;
