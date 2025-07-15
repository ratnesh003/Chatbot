import { Outlet } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../UserContext';
import { Navigate } from 'react-router-dom';

export default function AccountLayout() {
	const { ready, user } = useContext(UserContext);

	if (ready && !user) {
		return <Navigate to="/login" />;
	}

	return (
		<div className="bg-gray-200">
			<Outlet />
		</div>
	);
}
