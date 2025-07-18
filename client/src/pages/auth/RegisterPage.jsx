import { Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

export default function RegisterPage() {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(null);

	async function registerUser(e) {
		e.preventDefault();
		setLoading(true);
		try {
			await axios.post('/api/register', {
				name,
				email,
				password,
			});
			setLoading(false);
			alert('Registration completed.');
		} catch (error) {
			setLoading(false);
			console.log(error);
			alert('Registration failed. Please try again later.');
		}
	}

	return (
		<div className="mt-4 grow flex items-center justify-around">
			<div className="mb-40">
				<h1 className="text-4xl text-center mb-4">Register</h1>
				<form className="max-w-md mx-auto" onSubmit={registerUser}>
					<input
						type="text"
						placeholder="John Doe"
						className="mb-2"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
					<input
						type="email"
						placeholder="Your@email.com"
						className="mb-2"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<input
						type="password"
						placeholder="Password"
						className="mb-2"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
					<button disabled={loading} className="primary">
						{loading ? 'Loading..' : 'Register'}
					</button>
				</form>
				<div className="py-2 text-gray-500">
					Already a member?{' '}
					<Link className="underline text-bl" to={'/login'}>
						Login
					</Link>
				</div>
			</div>
		</div>
	);
}
