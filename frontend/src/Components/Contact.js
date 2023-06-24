import React from 'react'
import Navbar from './Navbar/Navbar'

export default function Contact() {
    return (
        <div className='X'>
            <div>
                <Navbar />
            </div>
            <div className='Xctct' >
                <div style={{ margin: "auto" }}>
                    <div className='Xctct-hedg'>
                       <h1>Contact Us !</h1> 
                    </div>
                </div>
                <li className='Xctct-hedg'  style={{listStyleType:"none",fontFamily:"'Nunito Sans', sans-serif" }} >
                We're always happy to hear from our readers! If you have any questions, feedback, or just want to say hi, there are several ways you can get in touch with us:
<br/><br/>
<b>Email: </b> You can send us an email at [randomexploreblog@gmail.com]. We'll do our best to respond within 48 hours.
<br/><br/>
<b>Social Media:</b> Follow us on Twitter and Instagram for the latest updates and blog posts.
<br/><br/>
We can't wait to hear from you!
<br/><br/>
Sincerely,
The [RandomExplore] Team


                </li>
            </div>
        </div>
    )
}
