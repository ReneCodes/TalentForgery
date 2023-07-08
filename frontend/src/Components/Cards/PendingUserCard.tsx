import { Container, Button, Box } from "@mui/material";
import Dialog from '@mui/material/Dialog';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import EmailIcon from '@mui/icons-material/Email';
import ApartmentIcon from '@mui/icons-material/Apartment';
import Person4Icon from '@mui/icons-material/Person4';
import CheckIcon from '@mui/icons-material/Check';
import FaceIcon from '@mui/icons-material/Face';

const baseURL = import.meta.env.VITE_BE_BASE_URL;

// Icons
function PendingUsersCard(props: any) {

  const { closeStats, accept, reject, stats } = props;

  const imgPath = `${baseURL}images/profile_pictures/${stats.dataValues.profile_picture}`

  return (
    <Dialog open>

      <Container sx={{ width: '600px', height: 'max-content', p: 3 }}>

        <Box sx={{
          width: '100%', display: 'flex', gap: 6,
          justifyContent: 'start', alignItems: 'start', m: 0, p: 2,
          position: 'relative'
        }}>
          <Typography variant='h5' maxWidth='170px'>
            <span style={{ color: '#BFA622' }}> {stats.dataValues.first_name} </span>
            <span style={{ color: '#00407E' }}> {stats.dataValues.last_name} </span>
          </Typography>
          <Box sx={{
            width: '100px', height: '100px', borderRadius: 99, overflow: 'hidden',
            position: 'absolute', top: 0, left: 0, right: 0, margin: 'auto'
          }}>
            {stats.dataValues.profile_picture ?
              <img src={imgPath} style={{ objectFit: 'cover', width: '100%', height: '100%' }} alt="" />
              :
              <FaceIcon sx={{ width: '100%', height: '100%' }} />
            }
          </Box>
          <Button sx={{ position: 'absolute', top: 0, right: 0 }} onClick={closeStats}>
            <CloseIcon />
          </Button>
        </Box>

        <Box sx={{ mt: 3, p: 2, display: 'flex', flexDirection: 'column', gap: '20px' }}>

          <Typography sx={{ display: 'flex', alignItems: 'center', gap: 1 }} fontSize='20px'>
            <EmailIcon />
            <strong>Email:</strong> {stats.dataValues.email}
          </Typography>

          <Typography sx={{ display: 'flex', alignItems: 'center', gap: 1 }} fontSize='20px'>
            <ApartmentIcon />
            <strong>Department:</strong> {stats.dataValues.department}
          </Typography>

          <Typography sx={{ display: 'flex', alignItems: 'center', gap: 1 }} fontSize='20px'>
            <Person4Icon />
            <strong>Invited by:</strong> {stats.invited_by.first_name} {stats.invited_by.last_name}
          </Typography>

        </Box>

        <Box sx={{
          width: '100%', height: '135px', display: 'flex', flexDirection: 'row',
          gap: '40px', justifyContent: 'center', alignItems: 'center'
        }}>
          <Button onClick={accept} variant="outlined" sx={{
            minWidth: '0', p: '0',
            backgroundColor: '#008000', color: '#ffffff',
            width: '70px', height: '70px', borderRadius: 99, display: 'flex', justifyContent: 'center',
            textAlign: 'center', ':hover': { backgroundColor: 'lightgreen' }
          }}
            startIcon={<CheckIcon sx={{ margin: '0 0 0 9px' }} />}>

          </Button>

          <Button variant="outlined" onClick={reject}
            sx={{
              minWidth: '0', p: '0',
              backgroundColor: '#ff0000', color: '#ffffff',
              width: '70px', height: '70px', borderRadius: 99, display: 'flex', justifyContent: 'center',
              textAlign: 'center', ':hover': { backgroundColor: 'darkred' }
            }}
            startIcon={<CloseIcon sx={{ margin: '0 0 0 9px' }} />}>

          </Button>

        </Box>

      </Container>


    </Dialog>
  );
}

export default PendingUsersCard;