import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import axios from 'axios';
import { UserContext } from '../../UserContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

export default function LoginPage() {
	const navigate = useNavigate();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(null);
	const { setUser } = useContext(UserContext);

	async function loginUser(e) {
		e.preventDefault();
		toast.dismiss();
		if (!email || !password) {
			return toast.error('Invalid email or password');
		}
		setLoading(true);
		true;
		try {
			const { data } = await axios.post('/api/login', {
				email,
				password,
			});
			toast.success('Login successful');
			setUser(data);
			setLoading(false);
			navigate('/');
		} catch (error) {
			setLoading(false);
			if (error.response && error.response.status === 401) {
				toast.error('Invalid email or password');
			} else {
				console.log(error);
				toast.error('Login failed');
			}
		}
	}

	return (
		<div className="mt-4 grow flex items-center justify-around">
			<div className="mb-40">
				<h1 className="text-4xl text-center mb-4">Login</h1>
				<form className="max-w-md mx-auto" onSubmit={loginUser}>
					<input
						type="email"
						className="mb-2"
						placeholder="Your@email.com"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<input
						type="password"
						className="mb-2"
						placeholder="Password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
					<button disabled={loading} className="primary">
						{loading ? 'Loading..' : 'Login'}
					</button>
				</form>
				<div className="py-2 text-gray-500">
					Don&apos;t have an account yet?{' '}
					<Link className="underline text-bl" to={'/register'}>
						Register
					</Link>
				</div>
			</div>
		</div>
	);
}
