import { useContext } from 'react';
import { UserContext } from '../../UserContext';
import { Navigate, useParams } from 'react-router-dom';
import ListingsPage from './ListingsPage';
import Dashboard from './Dashboard';

export default function ProfilePage() {
	let { subpage } = useParams();
	const { ready, user } = useContext(UserContext);
	if (subpage === undefined) {
		subpage = 'profile';
	}

	if (!ready) {
		return 'Loading...';
	}

	if (ready && !user) {
		return <Navigate to="/login" />;
	}

	return (
		<div className="mt-4">
			{subpage === 'profile' && (
				<div className="text-center max-w-lg mx-auto h-full">
					<Dashboard />
					<p>
						Logged in as {user.name} ({user.email}) <br />
					</p>
				</div>
			)}
			{subpage === 'listings' && <ListingsPage />}
		</div>
	);
}
