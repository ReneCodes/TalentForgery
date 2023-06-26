import {FC} from "react";
import './ContactInfo.css';
import { ContactInfoComp } from "../../utils/types";

const ContactInfo: FC<ContactInfoComp> = ({info}) => {
  return <div className='contact'>
    <div>
      <h1 className='contact_title'>Personal Information</h1>
      <div className='row'>
        <div className="contact_box ">
          <h2 className="info">{info.firstName}</h2>
          <div className="line"></div>
          <p className="label">First Name</p>
        </div>
        <div className="contact_box">
          <h2 className="info">{info.lastName}</h2>
          <div className="line"></div>
          <p className="label">Last Name</p>
        </div>
      </div>
      <div className='row'>
        <div className="contact_box">
          <h2 className="info">{info.id}</h2>
          <div className="line"></div>
          <p className="label">ID</p>
        </div>
        <div className="contact_box">
          <h2 className="info">{info.department}</h2>
          <div className="line"></div>
          <p className="label">Department</p>
        </div>
      </div>
    </div>
      <h1 className='contact_title'>Contact Details</h1>
    <div className='contact_info'>
      <div className="contact_box">
          <h2 className="info">{info.email}</h2>
          <div className="line"></div>
          <p className="label">Email</p>
        </div>
        <div className="contact_box">
          <h2 className="info">{info.secondEmail}</h2>
          <div className="line"></div>
          <p className="label">Secondary Email</p>
        </div>
        <div className="phone">
          <h2 className="info">+{info.phoneNumber}</h2>
          <div className="line"></div>
          <p className="label">Phone Number</p>
        </div>
    </div>
  </div>
}

export default ContactInfo;