import { Container, Box, Typography } from "@mui/material";
import FaceIcon from '@mui/icons-material/Face';

const baseURL = import.meta.env.VITE_BE_BASE_URL;

function UserCard({ first_name, last_name, profile_picture, email, callback }: any) {

  const imageUrl = `${baseURL}images/profile_pictures/${profile_picture}`;

  return (
    <Container sx={{
      m: 'auto', width: '270px', height: 'max-content', py: 2,
      backgroundColor: '#F7F7F7', border: 1, borderRadius: 2, display: 'flex',
      flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'
    }} onClick={callback}>

      <Box sx={{ mb: 1, width: '100px', height: '100px', borderRadius: 99, overflow: 'hidden' }}>
        {profile_picture ?
          <img style={{ objectFit: 'cover', width: '100%', height: '100%' }} src={imageUrl} alt="Not found" />
          : <FaceIcon sx={{ width: 100, height: 100 }} />
        }
      </Box>

      <Typography><strong>Email: </strong>{email}</Typography>
      <Typography><strong>Name: </strong>{first_name} {last_name}</Typography>

    </Container>
  )
}

export default UserCard;