import About from '../components/landing/About';
import Header from '../components/landing/Header';
import Listing from '../components/landing/Listing';
import Footer from '../components/Footer';
import Testimonials from '../components/landing/Testimonials';
import Rooms from '../components/landing/Rooms';

export default function IndexPage() {
	return (
		<>
			<Header />
			<About />
			<Rooms />
			<Testimonials />
			<Listing />
			<Footer />
		</>
	);
}
