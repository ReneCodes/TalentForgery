import { Container, Box, Typography } from "@mui/material";
import FaceIcon from '@mui/icons-material/Face';

const baseURL = import.meta.env.VITE_BE_BASE_URL;

function UserCard({ first_name, last_name, profile_picture, email, callback }: any) {

  const imageUrl = `${baseURL}images/profile_pictures/${profile_picture}`;

  return (
    <Container sx={{
      m: 'auto 0', width: 'max-content', height: '110px', py: 2,
      backgroundColor: '#fffff', borderRadius: 1.3, display: 'flex',
      flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer',
      boxShadow: 6, gap: 3
    }} onClick={callback}>

      <Box>
        <Typography variant="h6"><strong>{first_name} {last_name}</strong></Typography>
        <Typography>{email}</Typography>
      </Box>


      <Box sx={{ mb: 1, width: '70px', height: '70px', borderRadius: 99, overflow: 'hidden' }}>
        {profile_picture ?
          <img style={{ objectFit: 'cover', width: '100%', height: '100%' }} src={imageUrl} alt="Not found" />
          : <FaceIcon sx={{ width: 70, height: 70 }} />
        }
      </Box>

    </Container>
  )
}

export default UserCard;