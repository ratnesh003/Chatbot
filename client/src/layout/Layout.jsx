import Header from '../components/Header';
import { Outlet } from 'react-router-dom';
// import AccountNav from "../components/account/AccountNav"

export default function Layout() {
	return (
		<div>
			<Header />
			<div className="pt-10">
				<Outlet />
			</div>
		</div>
	);
}
