import { Box, Dialog, Typography, Button } from "@mui/material";
import DialogContent from '@mui/material/DialogContent';
import useMediaQuery from '@mui/material/useMediaQuery';
import theme from '../../config/theme';
import EmailIcon from '@mui/icons-material/Email';
import ApartmentIcon from '@mui/icons-material/Apartment';
import Person4Icon from '@mui/icons-material/Person4';
import FaceIcon from '@mui/icons-material/Face';

const baseURL = import.meta.env.VITE_BE_BASE_URL;

function UserStatsCard(props: any) {

  const stats = props.stats;
  const user = props.user;

  const showStats = props.showStats;
  const closeStats = props.closeStats;
  const deleteAccount = props.deleteAccount;

  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const imageUrl = `${baseURL}images/profile_pictures/${user.profile_picture}`;

  console.log(user);

  return (
    <div>
      <Dialog
        open={showStats}
        fullScreen={fullScreen}
        onClose={closeStats}
        aria-labelledby="responsive-dialog-title"
      >

        <DialogContent sx={{ position: 'relative', backgroundColor: '#ffffff', p: '30px 90px', textAlign: 'center' }} >
          <Button sx={{ position: 'absolute', right: 0, top: 5, color: 'black' }} onClick={closeStats} >X</Button>
          <Box>

            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px' }}>

              <Box sx={{ width: '100px', height: '100px', display: 'flex', alignItems: 'start', justifyContent: 'start', borderRadius: 99, overflow: 'hidden', mt: 1 }}>
                {user.profile_picture ?
                  <img style={{ objectFit: 'cover', width: '100%', height: '100%' }} src={imageUrl} alt="Not found" />
                  :
                  <FaceIcon sx={{ width: '100%', height: '100%', objectFit: 'contain', m: 'auto', }} />
                }
              </Box>

              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <Box sx={{
                  width: '70px', height: '70px', borderRadius: 99,
                  overflow: 'hidden', mt: 1, backgroundColor: '#65FFA3',
                  display: 'flex', justifyContent: 'center', alignItems: 'center',
                }}>
                  <Typography>55%</Typography>
                </Box>
                <Typography>Tests</Typography>
              </Box>

              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <Box sx={{
                  width: '70px', height: '70px', borderRadius: 99,
                  overflow: 'hidden', mt: 1, backgroundColor: '#FF7575',
                  display: 'flex', justifyContent: 'center', alignItems: 'center',
                }}>
                  <Typography sx={{ margin: 'auto' }} >45%</Typography>
                </Box>
                <Typography sx={{ margin: 'auto' }}>Tests</Typography>
              </Box>

              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <Box sx={{
                  width: '70px', height: '70px', borderRadius: 99,
                  overflow: 'hidden', mt: 1, backgroundColor: '#65FFA3',
                  display: 'flex', justifyContent: 'center', alignItems: 'center',
                }}>
                  <Typography>55%</Typography>
                </Box>
                <Typography>Tests</Typography>
              </Box>

            </Box>

            <Box sx={{
              mt: 3, py: 2, display: 'flex', justifyContent: 'start',
              flexDirection: 'column', gap: '20px', alignItems: 'start',
            }}>

              <Typography sx={{ display: 'flex', alignItems: 'center', gap: 1 }} fontSize='20px'>
                <Person4Icon />
                <strong>Name:</strong> {user.first_name} {user.last_name}
              </Typography>

              <Typography sx={{ display: 'flex', alignItems: 'center', gap: 1 }} fontSize='20px'>
                <EmailIcon />
                <strong>Email:</strong> {user.email}
              </Typography>

              <Typography sx={{ display: 'flex', alignItems: 'center', gap: 1 }} fontSize='20px'>
                <ApartmentIcon />
                <strong>Department:</strong> {user.department}
              </Typography>

              <Typography sx={{ display: 'flex', alignItems: 'center', gap: 1 }} fontSize='20px'>
                <ApartmentIcon />
                <strong>Tags:</strong> {user.tags.map((tag: string) => {
                  return (
                    <Box key={tag} sx={{backgroundColor: '#848484', p: 0.7, borderRadius: 99}}>{tag}</Box>
                  )
                })}
              </Typography>


            </Box>

            <Box sx={{
              display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'start',
              gap: '10px', mt: 5,
            }}>
              <Typography variant="h5">Tests</Typography>

              <Box sx={{ display: 'flex', gap: '30px', margin: 'auto' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                  <Box sx={{
                    width: '70px', height: '70px', borderRadius: 99,
                    overflow: 'hidden', mt: 1, backgroundColor: '#65FFA3',
                    display: 'flex', justifyContent: 'center', alignItems: 'center',
                  }}>
                    <Typography>{stats.passed}</Typography>
                  </Box>
                  <Typography>Passed</Typography>
                </Box>

                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                  <Box sx={{
                    width: '70px', height: '70px', borderRadius: 99,
                    overflow: 'hidden', mt: 1, backgroundColor: '#FF7575',
                    display: 'flex', justifyContent: 'center', alignItems: 'center',
                  }}>
                    <Typography>{stats.failed}</Typography>
                  </Box>
                  <Typography>Failed</Typography>
                </Box>

                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                  <Box sx={{
                    width: '70px', height: '70px', borderRadius: 99,
                    overflow: 'hidden', mt: 1, backgroundColor: '#848484',
                    display: 'flex', justifyContent: 'center', alignItems: 'center',
                  }}>
                    <Typography>{stats.todo}</Typography>
                  </Box>
                  <Typography>Todo</Typography>
                </Box>
              </Box>



            </Box>

            <Box sx={{
              display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'start',
              gap: '10px', mt: 5,
            }}>
              <Typography variant="h5">Questions</Typography>

              <Box sx={{ display: 'flex', gap: '30px', margin: 'auto' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                  <Box sx={{
                    width: '70px', height: '70px', borderRadius: 99,
                    overflow: 'hidden', mt: 1, backgroundColor: '#65FFA3',
                    display: 'flex', justifyContent: 'center', alignItems: 'center',
                  }}>
                    <Typography>{stats.correct_questions}</Typography>
                  </Box>
                  <Typography>Passed</Typography>
                </Box>

                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                  <Box sx={{
                    width: '70px', height: '70px', borderRadius: 99,
                    overflow: 'hidden', mt: 1, backgroundColor: '#FF7575',
                    display: 'flex', justifyContent: 'center', alignItems: 'center',
                  }}>
                    <Typography>{stats.wrong_questions}</Typography>
                  </Box>
                  <Typography>Failed</Typography>
                </Box>

                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                  <Box sx={{
                    width: '70px', height: '70px', borderRadius: 99,
                    overflow: 'hidden', mt: 1, backgroundColor: '#848484',
                    display: 'flex', justifyContent: 'center', alignItems: 'center',
                  }}>
                    <Typography>{stats.todo}</Typography>
                  </Box>
                  <Typography>Todo</Typography>
                </Box>
              </Box>



            </Box>

            <Box sx={{
              display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'start',
              gap: '10px', mt: 5,
            }}>
              <Typography variant="h5">Tutorials</Typography>

              <Box sx={{ display: 'flex', gap: '30px', margin: 'auto' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                  <Box sx={{
                    width: '70px', height: '70px', borderRadius: 99,
                    overflow: 'hidden', mt: 1, backgroundColor: '#65FFA3',
                    display: 'flex', justifyContent: 'center', alignItems: 'center',
                  }}>
                    <Typography>{stats.watched}</Typography>
                  </Box>
                  <Typography>Watched</Typography>
                </Box>

                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                  <Box sx={{
                    width: '70px', height: '70px', borderRadius: 99,
                    overflow: 'hidden', mt: 1, backgroundColor: '#848484',
                    display: 'flex', justifyContent: 'center', alignItems: 'center',
                  }}>
                    <Typography>{stats.not_watched}</Typography>
                  </Box>
                  <Typography>To Watch</Typography>
                </Box>
              </Box>

            </Box>
          </Box>

          <Button sx={{
            position: 'relative', margin: 'auto', color: '#ffffff', p: 1, mt: 5,
            backgroundColor: '#ff0000', ':hover': { backgroundColor: 'darkred' }
          }} onClick={deleteAccount} >
            Delete Account
          </Button>

        </DialogContent>
      </Dialog>
    </div>
  )

};

export default UserStatsCard;