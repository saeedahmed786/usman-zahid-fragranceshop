import React from 'react';
import styles from "./about.module.css";

const AboutPage = () => {
    return (
        <div className={styles.aboutPage}>
            <header className={styles.header}>
                <h1>Welcome to Perfume Price</h1>
                <p>Your Ultimate Destination for Fragrance Enthusiasts</p>
            </header>

            <section className={styles.section}>
                <h2>Who We Are</h2>
                <p>
                    Perfume Price was founded by a group of fragrance aficionados who were frustrated by the high costs and limited availability of premium perfumes. With years of experience in the fragrance industry, we decided to create a platform where everyone can access top-quality perfumes without breaking the bank.
                </p>
            </section>

            <section className={styles.section}>
                <h2>What We Offer</h2>
                <div className={styles.offers}>
                    <div className={styles.offerItem}>
                        <h3>Wide Selection</h3>
                        <p>We offer an extensive range of perfumes from renowned brands around the world. Whether you’re looking for a classic scent, a new release, or a niche fragrance, you’ll find it at Perfume Price.</p>
                    </div>
                    <div className={styles.offerItem}>
                        <h3>Best Prices</h3>
                        <p>Our unique sourcing methods allow us to offer competitive prices. We constantly compare our prices with other retailers to ensure you’re getting the best deal.</p>
                    </div>
                    <div className={styles.offerItem}>
                        <h3>Authenticity Guaranteed</h3>
                        <p>We guarantee the authenticity of every perfume we sell. Our partnerships with reputable suppliers ensure that you receive genuine products every time you shop with us.</p>
                    </div>
                    <div className={styles.offerItem}>
                        <h3>Customer-Centric Service</h3>
                        <p>Our dedicated customer service team is always here to help. From product recommendations to after-sales support, we are committed to providing you with an exceptional shopping experience.</p>
                    </div>
                </div>
            </section>

            <section className={styles.section}>
                <h2>Our Values</h2>
                <div className={styles.values}>
                    <div className={styles.valueItem}>
                        <h3>Quality</h3>
                        <p>We never compromise on the quality of our products. Every perfume in our collection is carefully selected to meet the highest standards.</p>
                    </div>
                    <div className={styles.valueItem}>
                        <h3>Affordability</h3>
                        <p>We believe that everyone should have access to luxury fragrances. Our pricing strategy is designed to offer the best value for your money.</p>
                    </div>
                    <div className={styles.valueItem}>
                        <h3>Trust</h3>
                        <p>Building trust with our customers is paramount. We are transparent in our dealings and committed to maintaining the highest level of integrity.</p>
                    </div>
                </div>
            </section>

            <section className={styles.section}>
                <h2>Why Choose Us</h2>
                <p>Choosing Perfume Price means choosing a reliable partner in your fragrance journey. Our passion for perfumes and commitment to our customers set us apart. We continually strive to exceed your expectations, making your shopping experience seamless and enjoyable.</p>
            </section>

            <footer className={styles.footer}>
                <p>Thank you for choosing Perfume Price. We look forward to being a part of your fragrance journey and helping you find the perfect scent that speaks to you.</p>
            </footer>
        </div>
    );
}

export default AboutPage;
