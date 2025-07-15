import { NavLink } from 'react-router-dom';
import HeroImage from './../../assets/heroImg.jpg';
const Header = () => {
	return (
		<header className="py-[100px] shadow flex rounded-b-[30px]  flex-row justify-center bg-slate-50 w-full">
			<div className="w-full md:w-11/12 lg:w-10/12 flex flex-col md:flex-row items-center gap-[50px] justify-around md:my-10">
				<div
					data-aos="zoom-in-down"
					className="flex flex-col gap-5 max-w-[400px] md:max-w-[500px]"
				>
					<h1 className="font-bold uppercase text-2xl md:text-3xl text-center md:text-left">
						Welcome to StudioBnB.
					</h1>
					<p className="text-sm md:text-lg capitalize leading-4">
						Your Gateway to Luxury and Comfort
					</p>
					<div className="flex flex-row gap-2 justify-center">
						<NavLink
							to="/listing"
							className="bg-slate-900 px-3 py-1 text-slate-50 rounded-[2px] text-[20px] shadow-2xl  "
						>
							Explore
						</NavLink>
						<NavLink
							to="/account/listings/new"
							className="bg-primary px-3 py-1  rounded-[2px] text-[20px] shadow-2xl text-white "
						>
							List a house
						</NavLink>
					</div>
				</div>
				<div data-aos="zoom-in-down" className="">
					<img src={HeroImage} alt="" className="rounded-[50px]" />
				</div>
			</div>
		</header>
	);
};

export default Header;
