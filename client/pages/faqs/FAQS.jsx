import React from "react";
import "./FAQs.css";
import { Link } from "react-router-dom";

const FAQS = () => {
  return (
    <div className="faqs" data-aos="fade-right" data-aos-duration="1000">
      <div className="d-flex links">
        {" "}
        <Link to="/">Home</Link>
        <span className="sp mx-3">/</span>
        <Link to="#">Frequently Asked Questions</Link>
      </div>
      <div className="d-flex headlist">
        <h1>Frequently Asked Questions</h1>
      </div>
      <h4 className="py-4">Selling through AICOASTER.COM</h4>
      <p>
        If you are interested in selling your work through Aicoaster.com we
        would be delighted to hear from you. For further details, please see the
        Sell Art and Register an Artist Account pages.
      </p>
      <h4 className="py-4">Framing and mounting</h4>
      <p>
        Most of our artwork look fantastic without a frame, and are therefore
        sold unframed unless otherwise started. The majority of the customers
        prefer to hang the artworks without a frame. Some customer prefer to
        frame the artworks themselves.
      </p>
      <p>
        If a particular artwork is framed, this will be started on the artwork
        detail page, and you will see the frame with the photo of the atrtwork.
      </p>
      <h4 className="py-4">Delivery charges and times</h4>
      <p className="pb-3">
        Delivery charges (within the UK) are included in the price of the
        artwark. They are not added afterwards. The price you see on the screen
        is the price you pay.
      </p>
      <p>
        Artworks are sent direct from the artists' studio or supplying gallery.
        Therefore packaging may vary from artwork to artwork. If you purchase
        artworks from more than one different gallery or more than one different
        artist, they may be delivered to you in different packaging and on
        different dates.
      </p>
      <p>
        Packaging is provided by the artist or gallery, and must meet our
        packaging standards which are very high.
      </p>
      <p>
        Deliveries are made by selected top courier firms or if appropriate,
        first class Royal Mail postage.
      </p>
      <p>
        Artists and galleries are contracted to deliver your artwork to you
        within 14 days. If for any reason there is likely to be a delay, you
        will be contacted by the artist or gallery.
      </p>
      <h4 className="py-4">
        ACCURACY, COMPLETENESS AND TIMELINESS OF INFORMATION
      </h4>
      <p>
        We are not responsible if information made available on this site is not
        accurate, complete or current. The material on this site is provided for
        general information only and should not be relied upon or used as the
        sole basis for making decisions without consulting primary, more
        accurate, more complete or more timely sources of information. Any
        reliance on the material on this site is at your own risk.This site may
        contain certain historical information. Historical information,
        necessarily, is not current and is provided for your reference only. We
        reserve the right to modify the contents of this site at any time, but
        we have no obligation to update any information on our site. You agree
        that it is your responsibility to monitor changes to our site.
      </p>
      <h4 className="py-4">VAT and hidden charges</h4>
      <p>
        VAT İs included in the price of your artworks. The price you see on the
        screen is the price you pay. VAT-registered organisations will of course
        be able to reclaim the VAT on artworks. There are no hidden charges.
      </p>
      <h4 className="py-4">Invoicing</h4>
      <p>
        We automatically generate and send by email a full VAT invoice for every
        purchase.
      </p>
      <h4 className="py-4">Credit card security</h4>
      <p className="pb-3">
        We currently support one method of payment by credit card - Stripe.
      </p>
      <p>
        Stripe is a payment processing provider. Payments are made using 128-bit
        encryption over a secure connection.
      </p>
      <h4 className="py-4">Terms and conditions</h4>
      <p>Please be aware that by using this website, or making a purchase through ArtGallery.co.uk requires acceptance of our Terms and Conditions.</p>
    </div>
  );
};

export default FAQS;
