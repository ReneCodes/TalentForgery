import { Container, Box, Typography, Button } from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import FaceIcon from '@mui/icons-material/Face';

const baseURL = import.meta.env.VITE_BE_BASE_URL;

function SmallInfo({ first_name, profile_picture, accept, reject, userInfo }:
  { first_name: string, profile_picture: string, accept: any, reject: any, userInfo: any }) {
  const imageUrl = `${baseURL}images/profile_pictures/${profile_picture}`;

  return (
    <Container sx={{
      width: '250px', height: 'max-content', backgroundColor: '#ffffff', border: '2px solid black', borderRadius: 9,
      display: 'flex', flexDirection: 'row', gap: 3, justifyContent: 'start',
      alignItems: 'start', py: 1, px: 2, ':hover': { cursor: 'pointer' }
    }} onClick={() => userInfo()}>

      <Box sx={{
        width: '100%', height: 'max-content', display: 'flex',
        flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: '5px'
      }}>

        <Box sx={{
          width: '100%', height: 'max-content', display: 'flex', justifyContent: 'center', alignItems: 'start',
          flexDirection: 'column', gap: '15px'
        }}>

          <Box sx={{ width: '80px', height: '80px', borderRadius: 99, overflow: 'hidden', mt: 1 }}>
            {profile_picture ?
              <img style={{ objectFit: 'cover', width: '100%', height: '100%' }} src={imageUrl} alt="Not found" />
              :
              <FaceIcon sx={{ width: 90, height: 90 }} />
            }
          </Box>


          <Typography variant='h6' sx={{ maxWidth: '270px', color: '#00000' }}>
            {first_name}
          </Typography>

        </Box>

        <Box sx={{
          width: '200px', height: '135px', display: 'flex', flexDirection: 'column',
          gap: '10px', justifyContent: 'center', alignItems: 'center'
        }}>
          <Button onClick={accept} variant="outlined" sx={{
            minWidth: '0', p: '0',
            backgroundColor: '#008000', color: '#ffffff',
            position: 'relative', zIndex: 3,
            width: '50px', height: '50px', borderRadius: 99, display: 'flex', justifyContent: 'center',
            textAlign: 'center', ':hover': { backgroundColor: 'lightgreen' }
          }}
            startIcon={<CheckIcon sx={{ margin: '0 0 0 9px' }} />}>

          </Button>

          <Button variant="outlined" onClick={reject}
            sx={{
              minWidth: '0', p: '0',
              backgroundColor: '#ff0000', color: '#ffffff',
              width: '50px', height: '50px', borderRadius: 99, display: 'flex', justifyContent: 'center',
              position: 'relative', zIndex: 3,
              textAlign: 'center', ':hover': { backgroundColor: 'darkred' }
            }}
            startIcon={<CloseIcon sx={{ margin: '0 0 0 9px' }} />}>

          </Button>

        </Box>

      </Box>

    </Container>
  )

}

export default SmallInfo;