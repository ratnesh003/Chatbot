import bgImg from '../../assets/Buy/house4/img1.webp';
import { useEffect } from 'react';
import Aos from 'aos';
import { Link } from 'react-router-dom';
import { rooms } from '../../Data';
const Rooms = () => {
	useEffect(() => {
		Aos.init({ duration: 2000 });
	}, []);
	return (
		<section className="">
			<div
				style={{ backgroundImage: `url(${bgImg})` }}
				className={`min-h-[50vh] relative after:left-0 after:right-0 after:absolute after:top-0 after:h-full bg-black/40 bg-center flex items-center after:w-full after:bg-bgT pt-[50px]  px-[30px] bg-cover z-[1]  `}
			>
				<div
					data-aos="zoom-in-up"
					className="relative z-[1] py-[50px] max-w-[700px]"
				>
					<h1 className="font-bold text-slate-50 text-[50px] ">Our Rooms</h1>
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
			<div className="md:container mx-auto">
				<div className="mt-4 grid grid-cols-1 md:grid-cols-4 grid-flow-row gap-4 justify-center">
					{rooms.map((item, index) => {
						return (
							<div
								key={index}
								data-aos="zoom-in-up"
								className="shadow-2xl max-w-[400px] relative rounded hover:bg-gray-300"
							>
								<div className="w-full">
									<img
										src={item.frontPic}
										alt={item.name}
										className="w-full object-center object-contain"
									/>
								</div>
								<div className="p-2 ">
									<h3 className="font-bold text-sm capitalize">{item.name}</h3>
									<p>{item.descr}</p>
								</div>
								<div className="w-full flex">
									<Link
										// onClick={() => viewHouse(property)}
										to={`rooms/${item.name}`}
										className="bg-primary hover:bg-primary/70 w-full rounded-b text-center text-slate-50 text-[12px] py-[10px] uppercase font-bold"
									>
										View Rooms
									</Link>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
};

export default Rooms;
