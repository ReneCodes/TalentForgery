import { Container, Box, Button, Typography } from "@mui/material";
import PieChartComp from "../Components/PieChart/PieChart";
import { useState } from "react";
import { getAdminInvite } from "../services/Api.service";

const Dashboard = () => {

  const [linkText, setLinkText] = useState<String>('Copy your link');

  function handleInviteClick() {
    getAdminInvite(setLinkText);
  }


  return (
    <Container sx={{ height: '100vh', width: '100%', display: 'flex', justifyContent: 'start' }}>

      <Box sx={{
        height: 'max-content', width: '100%',
        overflow: 'hidden', p: 5, display: 'flex', justifyContent: 'start', gap: 10,
      }}>

        <PieChartComp width={100} passed={63} todo={20} failed={30} />

        <Box
          sx={{
            width: '100%', overflow: 'hidden', p: 2, display: 'flex',
            flexDirection: 'column', justifyContent: 'center',
            alignItems: 'center', gap: 4, borderRadius: 5, backgroundColor: '#00407E',
            color: 'white'
          }}
          boxShadow={10}
        >
          <Typography variant='h5'>
            Invite new people
          </Typography>
          <Button
            sx={{ width: '200px', height: '100px', backgroundColor: '#BFA622', borderRadius: '20px' }}
            variant="contained"
            onClick={handleInviteClick}
          >
            <Typography fontSize='20px'>
              <strong>
                {linkText}
              </strong>
            </Typography>
          </Button>
        </Box>

      </Box>

    </Container>
  )

};

export default Dashboard;