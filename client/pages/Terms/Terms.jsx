import React from "react";
import "./Terms.css";
import { Link } from "react-router-dom";

const Terms = () => {
  return (
    <div className="terms" data-aos="fade-right" data-aos-duration="1000">
      <div className="d-flex links">
        {" "}
        <Link to="/">Home</Link>
        <span className="sp px-4">/</span>
        <Link to="#">Terms and Conditions</Link>
      </div>
      <div className="d-flex headlist my-3">
        <h1>Terms and Conditions</h1>
      </div>
      <h4 className="py-4">OVERVIEW</h4>
      <p>
        This website is operated by buyartfor LTD. Throughout the site, the
        terms "we", "us" and "our" refer to Top Pinned. Company LTD offers this
        website, including all information, tools and services available fromn
        this site to you, the user, conditioned upon your acceptance of all
        terms, conditions, policies and notices stated here.
      </p>
      <p className="py-2">
        By visiting our site and/ or purchasing something from us, you engage in
        our "Service" and agree to be bound by the following terms and
        conditions ("Terms of Service", "Terms"), including those additional
        terms and conditions and policies referenced herein and/or available by
        hyperlink. These Terms of Service apply to all users of the site,
        including without limitation users who are browsers, vendors, customers,
        merchants, and/ or contributors of content.
      </p>
      <p className="py-2">
        Please read these Terms of Service carefully before accessing or using
        our website. By accessing or using any part of the site, you agree to be
        bound by these Terms of Service. If you do not agree to all the terms
        and conditions of this agreement, then you may not access the website or
        use any services. If these Terms of Service are considered an offer,
        acceptance is expressly limited to these Terms of Service.
      </p>
      <p className="py-2">
        Any new features or tools which are added to the current store shall
        also be subject to the Termms of Service. You can review the most
        current version of the Terms of Service at any time on this page. We
        reserve the right to update, change or replace any part of these Terms
        of Service by posting updates and/or changes to our website. It is your
        responsibility to check this page periodicaly for changes. Your
        continued use ofor access to the website following the posting of any
        changes constitutes acceptance of those changes.
      </p>
      <p>
        Our store is hosted on wordpress Inc. They provide us with the online
        e-commerce platform that allows us to sell our products and services to
        you.
      </p>
      <h4 className="py-4">ONLINE STORE TERMS</h4>
      <p>
        By agreeing to these Terms of Service, you represent that you are at
        least the age of majority in your state or province of residence, or
        that you are the age of majority in your state or province of residence
        and you have given us your consent to allow any of your minor dependents
        to use this site. You may not use our products for any illegal or
        unauthorized purpose nor may you, in the use of the Service, violate any
        laws in your jurisdiction (including but not limited to copyright laws).
      </p>
      <p>
        You must not transmit any worms or viruses or any code of a destructive
        nature.
      </p>
      <p>
        A breach or violation of any of the Terms will result in an immediate
        termination of your Services.
      </p>
      <h4 className="py-4">GENERAL CONDITIONS</h4>
      <p>
        We reserve the right to refuse service to anyone for any reason at any
        time.
      </p>
      <p>
        You understand that your content (not including credit card
        information), may be transferred unencrypted and involve (a)
        transmissions over various networks; and (b) changes to conform and
        adapt to technical requirements of connecting networks or devices.
        Credit card information is always encrypted during transfer over
        networks. You agree not to reproduce, duplicate, copy, sell, resell or
        exploit any portion of the Service, use of zthe Service, or access to
        the Service or any contact on the website through which the service is
        provided, without express written permission by us. The headings used in
        this agreement are included for convenience only and will not limit or
        otherwise affect these Terms.
      </p>
      <h4 className="py-4">
        ACCURACY, COMPLETENESS AND TIMELINESS OF INFORMATION
      </h4>
      <p>
        We are not responsible if information made available on this site is not
        accurate, complete or current. The material on this site is provided for
        general information only and should not be relied upon or used as the
        sole basis for making decisions without consulting primary, more
        accurate, more complete or more timely sOurces of information. Any
        reliance on the material on this site is at your own risk.This site may
        contain certain historical information. Historical information,
        necessarily, is not current and is provided for your reference only. We
        reserve the right to modify the contents of this site at any time, but
        we have no obligation to update any information on our site. You agree
        that it is your responsibility to monitor changes to our site.
      </p>
      <h4 className="py-4">MODIFICATIONS TO THE SERVICE AND PRICES</h4>
      <p>Prices for our products are subject to change without notice.</p>
      <p>
        We reserve the right at any time to modify or discontinue the Service
        (or any part or content thereof) without notice at any time.
      </p>
      <p>
        We shall not be liable to you or to any third-party for any
        modification, price change, suspension or discontinuance of the Service.
      </p>
      <h4 className="py-4">PRODUCTS OR SERVICES (if applicable)</h4>
      <p>
        Certain products or services may be available exclusively online through
        the website. These products or services may have limited quantities and
        are subject to return or exchange only according to our Return Policy.We
        have made every effort to display as accurately as possible the colors
        and images of our products that appear at the store. We cannot guarantee
        that your computer monitor's display of any color will be accurate. We
        reserve the right, but are not obligated, to limit the sales of our
        products or Services to any person, geographic region or jurisdiction.
        We may exercise this right on a case-by-case basis. We reserve the right
        to limit the quantities of any products or services that we offer. All
        descriptions of products or product pricing are subject to change at
        anytime without notice, at the sole discretion of us. We reserve the
        right to discontinue any product at any time. Any offer for any product
        or service made on this site is void where prohibited.
      </p>
      <p>
        We do not warrant that the quality of any products, services,
        information, or other material purchased or obtained by you will meet
        your expectations, or that any errors in the Service will be corrected.
      </p>
      <div className="div-btn">
        <button className="btn-primary see">See more</button>
      </div>
    </div>
  );
};

export default Terms;
