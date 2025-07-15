import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../UserContext';
import MessageIcon from '../assets/icons/MessageIcon';
import UserIcon from '../assets/icons/UserIcon';
import { deskLinks } from '../Data';

const DeskNav = () => {
	const { user } = useContext(UserContext);
	return (
		<div className="flex items-center gap-2 flex-1 justify-end text-sm xl:text-lg py-2">
			<ul className="p-1 text-green-500 h-full flex justify-left gap-2">
				{deskLinks.map((menu, i) => (
					<li
						key={i}
						className="px-2 text-primary rounded-xl hover:text-primary/40"
					>
						<Link to={menu?.link} className="px-1 lg:p-2 whitespace-nowrap">
							{menu?.name}
						</Link>
					</li>
				))}
			</ul>
			{user ? (
				<div className="bg-lightGrey rounded-full p-4 py-2 border flex gap-2">
					<MessageIcon size={24}></MessageIcon>
					<Link to={user ? '/account' : '/login'} className="flex gap-2">
						<UserIcon size={24}></UserIcon>
						{!!user && <span>{user.name}</span>}
					</Link>
				</div>
			) : (
				<div className=" flex gap-2 ">
					<Link
						to={'/login'}
						className="px-2 text-primary rounded-xl hover:text-primary/40"
					>
						Login
					</Link>
					<Link
						to={'/register'}
						className="px-2 text-primary rounded-xl hover:text-primary/40"
					>
						Register
					</Link>
				</div>
			)}
		</div>
	);
};

export default DeskNav;
