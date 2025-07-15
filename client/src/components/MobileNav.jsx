import { Link } from 'react-router-dom';
import { mobileLinks } from '../Data';
import AccountNav from './AccountNav';
import DemoNav from './DemoNav';

const MobileNav = ({ user, open, setOpen }) => {
	return (
		<ul className="flex flex-col justify-around gap-5 py-2 text-lg">
			<div>
				<button
					onClick={() => setOpen(!open)}
					className={` ${
						open ? 'text-green-900' : 'text-green-100'
					} cursor-pointer text-3xl flex items-center justify-start text-white hover:bg-primary p-1 rounded-full bg-transparent hover:shadow-md`}
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
				</button>
			</div>
			{user ? (
				<AccountNav open={open} setOpen={setOpen} />
			) : (
				<DemoNav setOpen={setOpen} />
			)}
		</ul>
	);
};

export default MobileNav;
