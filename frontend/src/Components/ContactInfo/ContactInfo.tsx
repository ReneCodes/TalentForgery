import {FC} from 'react';
import './ContactInfo.css';
import {Container, Typography, Box} from '@mui/material';
import FaceIcon from '@mui/icons-material/Face';
import EmailIcon from '@mui/icons-material/Email';
import ApartmentIcon from '@mui/icons-material/Apartment';
import Person4Icon from '@mui/icons-material/Person4';
import Phone from '@mui/icons-material/PhoneAndroid';
import {userProfileStore} from '../../utils/zustand.store';

const baseURL = import.meta.env.VITE_BE_BASE_URL;

const ContactInfo: FC = () => {
	const {localProfileInfo} = userProfileStore();
	const info = localProfileInfo;

	const imageUrl = `${baseURL}images/profile_pictures/${info.profile_picture}`;

	return (
		<Container>
			<Typography variant="h4">Personal information</Typography>
			<Box
				mt={4}
				boxShadow={8}
				borderRadius={3}
				sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
				<Box sx={{width: '80px', height: '80px', borderRadius: 99, overflow: 'hidden', mt: 1}}>
					{info.profile_picture ? (
						<img
							style={{objectFit: 'cover', width: '100%', height: '100%'}}
							src={imageUrl}
							alt="Not found"
						/>
					) : (
						<FaceIcon sx={{width: 80, height: 80}} />
					)}
				</Box>

				<Box sx={{p: 2, display: 'flex', flexDirection: 'row', gap: '20px'}}>
					<Box sx={{p: 2, display: 'flex', flexDirection: 'column', gap: '40px'}}>
						<Typography
							sx={{display: 'flex', alignItems: 'center', gap: 1}}
							fontSize="23px">
							<Person4Icon />
							<strong>First Name:</strong> {info.first_name}
						</Typography>

						<Typography
							sx={{display: 'flex', alignItems: 'center', gap: 1}}
							fontSize="23px">
							<EmailIcon />
							<strong>Email:</strong> {info.email}
						</Typography>

						<Typography
							sx={{display: 'flex', alignItems: 'center', gap: 1}}
							fontSize="23px">
							<EmailIcon />
							<strong>Second email:</strong> {info.personal_email}
						</Typography>
					</Box>

					<Box sx={{p: 2, display: 'flex', flexDirection: 'column', gap: '40px'}}>
						<Typography
							sx={{display: 'flex', alignItems: 'center', gap: 1}}
							fontSize="23px">
							<Person4Icon />
							<strong>Last Name:</strong> {info.last_name}
						</Typography>

						<Typography
							sx={{display: 'flex', alignItems: 'center', gap: 1}}
							fontSize="23px">
							<ApartmentIcon />
							<strong>Department:</strong> {info.department}
						</Typography>

						<Typography
							sx={{display: 'flex', alignItems: 'center', gap: 1}}
							fontSize="23px">
							<Phone />
							<strong>Phone Number:</strong> {info.phone}
						</Typography>
					</Box>
				</Box>
			</Box>
		</Container>
	);
	// return <div className='contact'>
	//   <div>
	//     <h1 className='contact_title'>Personal Information</h1>
	//     <div className='row'>
	//       <div className="contact_box ">
	//         <h2 className="info">{info.firstName}</h2>
	//         <div className="line"></div>
	//         <p className="label">First Name</p>
	//       </div>
	//       <div className="contact_box">
	//         <h2 className="info">{info.lastName}</h2>
	//         <div className="line"></div>
	//         <p className="label">Last Name</p>
	//       </div>
	//     </div>
	//     <div className='row'>
	//       <div className="contact_box">
	//         <h2 className="info">{info.id}</h2>
	//         <div className="line"></div>
	//         <p className="label">ID</p>
	//       </div>
	//       <div className="contact_box">
	//         <h2 className="info">{info.department}</h2>
	//         <div className="line"></div>
	//         <p className="label">Department</p>
	//       </div>
	//     </div>
	//   </div>
	//   <h1 className='contact_title'>Contact Details</h1>
	//   <div className='contact_info'>
	//     <div className="contact_box">
	//       <h2 className="info">{info.email}</h2>
	//       <div className="line"></div>
	//       <p className="label">Email</p>
	//     </div>
	//     {info.secondEmail && (
	//       <div className="contact_box">
	//         <h2 className="info">{info.secondEmail}</h2>
	//         <div className="line"></div>
	//         <p className="label">Secondary Email</p>
	//       </div>
	//     )}
	//     {info.phoneNumber && (
	//       <div className="phone">
	//         <h2 className="info">{info.phoneNumber}</h2>
	//         <div className="line"></div>
	//         <p className="label">Phone Number</p>
	//       </div>
	//     )}
	//   </div>
	// </div>
};

export default ContactInfo;
