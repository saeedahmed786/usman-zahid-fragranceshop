import { DiscountModal } from '@/components/Commons/DiscountModal/DiscountModal';
import Footer from '@/components/Commons/Footer/Footer';
import { Navbar } from '@/components/Commons/Navbar/Navbar';
import { CartProvider } from '@/context';
import Head from 'next/head';
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {


    return (
        <>
            <Head>
                <title>My Shop</title>
            </Head>
            <CartProvider>
                <DiscountModal />
                <Navbar />
                <div className='min-h-[60vh]'>
                    <Component {...pageProps} />
                </div>
                <Footer />
            </CartProvider>
        </>
    )
}

export default MyApp;