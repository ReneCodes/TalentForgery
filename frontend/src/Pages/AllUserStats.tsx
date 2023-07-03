import { Container, Box, Typography, TextField } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import UserCard from "../Components/UserCard/UserCard";
import { useEffect, useState } from "react";
import { User } from "../@types/Types";
import { getAllUsers, getUserStats } from "../services/Api.service";
import UserStatsCard from "../Components/Cards/UserStatsCard";


function AllUserStats() {

  const [users, setUsers] = useState<User[]>([]);

  const [userStats, setUserStats] = useState<any>({});
  const [userForStats, setUserForStats] = useState<any>({})

  const [showStats, setShowStats] = useState(false);

  useEffect(() => {
    getAllUsers(setUsers);
  }, []);

  async function enableUserStats(user: User) {
    const res: any = await getUserStats(user.email);
    setUserStats(res.data);
    setUserForStats(user);
    setShowStats(true);
  };

  const allUsers = users.map((user) => {
    return (
      <UserCard
        key={user.email}
        first_name={user.first_name} last_name={user.last_name}
        profile_picture={user.profile_picture} email={user.email}
        callback={() => enableUserStats(user)}
      />
    )
  })


  return (
    <Container>
      {
        showStats &&
        <UserStatsCard stats={userStats} user={userForStats} showStats={showStats} closeStats={() => setShowStats(false)}
        />
      }

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '60px' }}>
        <Typography variant="h5">Total Users: {users.length}</Typography>
        <TextField size="small" sx={{ width: '250px' }} label="Search" type="search"
          InputProps={{
            endAdornment: <SearchIcon sx={{}} />,
          }}
        />
      </Box>
      <Box
        sx={{
          width: '100%',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          alignItems: 'start',
          justifyContent: 'start',
          gap: '20px'
        }}
      >
        {allUsers}
      </Box>

    </Container>
  )
};

export default AllUserStats;