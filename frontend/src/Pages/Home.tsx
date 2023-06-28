import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { NavigateFunction, useNavigate } from 'react-router-dom';

export const Home = () => {
  const navigate: NavigateFunction = useNavigate();

  return (
    <Box id='home' position='relative' display='flex' flexDirection='column' width='100%' height='max-content' padding='40px' >

      <Button variant="contained"
        onClick={() => navigate('/login')}
        sx={{ width: '170px', height: '50px', marginLeft: 'auto', }}
        style={{ backgroundColor: '#353535', color: 'white' }}>
        Login</Button>

      <Box width='60%' margin='-50px auto 50px' display='flex' flexDirection='column' height='max-content'>
        <h1>Welcome to <br />
          <span style={{ color: '#BFA622' }}> Minon </span>
          <span style={{ color: '#00407E' }}> Mentor </span>
        </h1>
        <p style={{ color: '#636363' }}>
          Unlock the power of our web app: effortlessly compose training tutorials, craft engaging questionnaires, empower your staff through effective training, and foster a collaborative work environment for seamless knowledge sharing.
        </p>

        <Box width='100%' marginTop='10px' display='flex' flexDirection='column' height='max-content'>
          <h2>Start using <span style={{ color: '#BFA622' }}>Minon</span> <span style={{ color: '#00407E' }}>Mentor</span> <span style={{ color: 'black' }}>Today</span></h2>
          <Button variant="contained"
            onClick={() => navigate('/register')}
            sx={{ width: '200px', height: '70px', margin: 'auto auto 20px' }}
            style={{ backgroundColor: '#353535', color: 'white' }}>
            <h3>Register</h3>
          </Button>

        </Box>
      </Box>

    </Box >
  )

}
