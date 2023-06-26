import {FC} from "react";

interface ContactInfoComp {
  info: {
    firstName: string,
    lastName: string,
    id: number,
    department: string,
    email: string,
    secondEmail: string,
    phoneNumber: string
  }
}

const ContactInfo: FC<ContactInfoComp> = ({info}) => {
  return <div className='contact'>
    <div>
      <h1 className='title'>Personal Information</h1>
      <div className='row'>
        <div className="box">
          <h2 className="info">{info.firstName}</h2>
          <div className="line"></div>
          <p className="label">First Name</p>
        </div>
        <div className="box">
          <h2 className="info">{info.lastName}</h2>
          <div className="line"></div>
          <p className="label">Last Name</p>
        </div>
      </div>
      <div className='row'>
        <div className="box">
          <h2 className="info">{info.id}</h2>
          <div className="line"></div>
          <p className="label">ID</p>
        </div>
        <div className="box">
          <h2 className="info">{info.department}</h2>
          <div className="line"></div>
          <p className="label">Department</p>
        </div>
      </div>
    </div>
      <h1 className='title'>Contact Details</h1>
    <div className='contact_info'>
      <div className="box">
          <h2 className="info">{info.email}</h2>
          <div className="line"></div>
          <p className="label">Email</p>
        </div>
        <div className="box">
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