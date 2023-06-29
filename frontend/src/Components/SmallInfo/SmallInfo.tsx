import { Container, Box, Typography, Button } from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
const baseURL = import.meta.env.VITE_BE_BASE_URL;

function SmallInfo({ first_name, last_name, profile_picture, accept, reject }:
  { first_name: string, last_name: string, profile_picture: string, accept: any, reject: any }) {

  console.log(profile_picture);

  const imageUrl = `${baseURL}images/profile_pictures/${profile_picture}`;
  console.log(imageUrl);


  return (
    <Container key={first_name} sx={{
      width: '400px', height: 'max-content', backgroundColor: '#00407E', borderRadius: 9,
      display: 'flex', flexDirection: 'row', gap: 3, justifyContent: 'start',
      alignItems: 'center', py: 1, px: 2
    }}>

      <Box sx={{ width: '100%', height: 'max-content', display: 'flex', flexDirection: 'row', justifyContent: 'start', alignItems: 'start', gap: '5px' }}>

        <Box sx={{
          width: '100%', height: 'max-content', display: 'flex', justifyContent: 'center', alignItems: 'start',
          flexDirection: 'column', gap: '15px'
        }}>

          <Box sx={{ width: '80px', height: '80px', borderRadius: 99, overflow: 'hidden', mt: 1 }}>
            <img style={{ objectFit: 'cover', width: '100%', height: '100%' }} src={imageUrl} alt="Not found" />
          </Box>


          <Typography variant='h6' sx={{ maxWidth: '270px' }}>
            {first_name} {last_name}
          </Typography>

        </Box>

        <Box sx={{ width: 'max-content', height: '135px', display: 'flex', flexDirection: 'column', gap: '10px', justifyContent: 'center', alignItems: 'center' }}>
          <Button onClick={accept} variant="outlined" sx={{
            backgroundColor: 'green', color: 'white',
            width: '50px', height: '50px', borderRadius: 99, textAlign: 'center', ':hover': { backgroundColor: 'lightgreen' }
          }}
            startIcon={<CheckIcon />}>

          </Button>

          <Button variant="outlined" onClick={reject} sx={{
            backgroundColor: 'red', color: 'white', width: '50px', height: '50px',
            borderRadius: 99, ':hover': { backgroundColor: 'darkred' }
          }}
            startIcon={<CloseIcon />}>

          </Button>

        </Box>

      </Box>

    </Container>
  )

}

export default SmallInfo;