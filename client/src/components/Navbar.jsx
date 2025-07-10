import { useContext, useState } from 'react';
import LogoIcon from '../assets/icons/LogoIcon';
import { UserContext } from '../UserContext';
import { Link } from 'react-router-dom';
import DeskNav from './DeskNav';
import MobileNav from './MobileNav';

const Navbar = () => {
	const [open, setOpen] = useState(false);
	const { user } = useContext(UserContext);
	return (
		<nav
			className={`w-full left-0 top-0 z-[999] absolute bg-white shadow-md text-white}`}
		>
			<div className="flex items-center justify-between">
				<div className="mx-7">
					<Link to="/" className="flex items-center gap-2">
						<LogoIcon></LogoIcon>
						<span className="font-semibold md:font-bold text-lg md:text-xl text-primary">
							ILouge
						</span>
					</Link>
				</div>
				<div className="hidden md:inline-flex">
					<DeskNav user={user} />
				</div>
				<div
					onClick={() => setOpen(!open)}
					className={` ${
						open ? 'text-gray-900' : 'text-primary'
					} cursor-pointer text-3xl m-2 p-1 hover:text-primary/50 ${
						user ? `` : `md:hidden`
					} hover:bg-gray-100 rounded-full`}
				>
					<svg
						className=" h-6 w-6 md:h-8 md:w-8"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M4 6H20M4 12H20M4 18H11"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						></path>
					</svg>
				</div>

				<div
					className={`text-white fixed  w-2/3 md:w-2/6 shadow-l-md min-h-screen overflow-hidden px-7 py-2 font-medium custom-gradient top-0 duration-300 ${
						open ? 'right-0' : 'right-[-100%]'
					}`}
				>
					<MobileNav user={user} open={open} setOpen={setOpen} />
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
