import { mobileLinks } from '../Data';
import { Link } from 'react-router-dom';
import UserIcon from '../assets/icons/UserIcon';

const DemoNav = ({ setOpen }) => {
	return (
		<div>
			<div className="flex flex-col items-center gap-2 mt-10">
				<div className="p-4 rounded-full bg-lightGrad mt-20 ">
					<UserIcon size={35} color={'white'}></UserIcon>
				</div>
			</div>
			<ul className="py-6 p-1 text-green-500 h-full flex flex-col justify-around text-lg">
				{mobileLinks.map((menu, i) => (
					<li onClick={() => setOpen(false)} key={i}>
						<Link
							to={menu?.link}
							className="flex py-2 px-8 gap-2 text-white hover:bg-lightGrad"
						>
							<p>{menu?.name}</p>
						</Link>
					</li>
				))}
			</ul>
			<div className="w-full p-8 flex flex-col gap-3">
				<Link
					to="./login"
					className="bg-lightGrad w-full text-white p-2 rounded-md text-center"
				>
					Log in
				</Link>
				<Link
					to="./register"
					className="bg-lightGrad w-full text-white p-2 rounded-md text-center"
				>
					Register
				</Link>
			</div>
		</div>
	);
};

export default DemoNav;
