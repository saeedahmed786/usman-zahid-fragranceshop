import React, { Fragment } from "react";
import { BsFacebook, BsInstagram, BsLinkedin, BsTwitter, BsEnvelope, BsWhatsapp } from "react-icons/bs";
import { IoLocationOutline } from "react-icons/io5";
import { FiPhoneCall } from "react-icons/fi";
import Link from "next/link";
import { Col, Row } from "antd";
import LogoComp from "../LogoComp/LogoComp";
import styles from "./Footer.module.css"

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <section className={"py-[40px]"}>
                <div className={"mx-auto lg:container "}>
                    <Row className={" border-b border-[#333B42] mb-[44px] pb-[40px]"}>
                        <Col xs={24} md={8} lg={6} className={"flex flex-col items-start gap-5 pr-6"}>
                            <Link href="/">
                                <LogoComp />
                            </Link>
                            <p className={"text-[#A7ADBA]  text-[12px] font-[400] tracking-wide"}>
                                Lörem ipsum prektigt beren makroligt, till desena. Lasock heterok. Nir nist så keltisk tiger usat fast bior. Rebel nedyn prertad krod semigon.
                            </p>
                            <div className={'flex items-center gap-4'}>
                                {[BsFacebook, BsTwitter, BsInstagram, BsLinkedin].map((Icon, index) => {
                                    return (
                                        <Fragment key={index}>
                                            <button className={"hover:opacity-90 bg-transparent w-[40px] h-[40px] rounded-full border border-light__gray__color flex items-center justify-center"} type={"button"}>
                                                <span className={"text-lg text-white"}>
                                                    <Icon />
                                                </span>
                                            </button>
                                        </Fragment>
                                    )
                                })}
                            </div>
                        </Col>
                        <Col xs={24} md={8} lg={6} className="">
                            <h2 className={"text-white font-[700] text-[16px] leading-[24px]"}>Links</h2>
                            <ul className={"flex flex-col gap-3 mt-[16px]"}>
                                <li className={"text-[#A7ADBA]  text-[12px] font-[400]"}>
                                    <Link href="/">Home</Link>
                                </li>
                                <li className={"text-[#A7ADBA]  text-[12px] font-[400]"}>
                                    <Link href="/about-us">About Us</Link>
                                </li>
                                <li className={"text-[#A7ADBA]  text-[12px] font-[400]"}>
                                    <Link href="/">Rozaliss</Link>
                                </li>
                                <li className={"text-[#A7ADBA]  text-[12px] font-[400]"}>
                                    <Link href="/terms-and-conditions">Terms and Conditions</Link>
                                </li>
                                <li className={"text-[#A7ADBA]  text-[12px] font-[400]"}>
                                    <Link href="/privacy-policy">Privacy Policy</Link>
                                </li>
                            </ul>
                        </Col>
                        <Col xs={24} md={8} lg={6} className="text-start">
                            <h2 className={"text-white font-[700] text-[16px] leading-[24px]"}>Contact Us</h2>
                            <div className={"text-start flex flex-col gap-3 mt-[16px] md__custom:items-center"}>
                                {[{ Icon: BsEnvelope, text: 'shop@gmail.com' }, { Icon: FiPhoneCall, text: '+213543823124' }, { Icon: IoLocationOutline, text: 'Algiers, Algeria' }, { Icon: BsWhatsapp, text: '+213540070124' }].map(el => {
                                    return (
                                        <Fragment key={el.text}>
                                            <div className={"flex items-center gap-2"}>
                                                <button className={"hover:opacity-90 p-[7px] bg-transparent w-[24px] h-[24px] rounded-full border border-white flex items-center justify-center"} type={"button"}>
                                                    <span className={"text-[10px] text-white"}>
                                                        <el.Icon />
                                                    </span>
                                                </button>
                                                <p className={"text-[#A7ADBA]  text-[12px] font-[400] tracking-wide"}>{el.text}</p>
                                            </div>
                                        </Fragment>
                                    )
                                })}
                            </div>
                        </Col>
                        <Col xs={24} md={8} lg={6}>
                            <h2 className={"text-white font-[700] text-[16px] leading-[24px]"}>Subscribe</h2>
                            <div className={"flex flex-col gap-[8px] mt-[16px]"}>
                                <input type="email" placeholder="E-mail" className="font-[400] text-[16px] focus:outline-0 text-[#A7ADBA]  w-full bg-transparent px-[16px] rounded-[12px] h-[48px] border border-[#65737E]" />
                                <button type="button" className="focus:outline-0 text-white h-[48px] rounded-[12px] font-[500] text-[16px] leading-[24px]">Subscribe</button>
                            </div>
                        </Col>
                    </Row >
                </div >
            </section >
        </footer>
    )
}
export default Footer;
