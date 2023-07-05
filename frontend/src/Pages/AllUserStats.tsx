import { Container, Box, Typography, TextField } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import UserCard from "../Components/UserCard/UserCard";
import { useEffect, useState } from "react";
import { User } from "../@types/Types";
import { getAllUsers, getUserStats, deleteAnUserAccount, getStaffStatistics } from "../services/Api.service";
import UserStatsCard from "../Components/Cards/UserStatsCard";
import SmallPieChart from "../Components/PieChart/SmallPieChart";


function AllUserStats() {

  const [users, setUsers] = useState<User[]>([]);
  const [usersSearched, setUsersSearched] = useState<User[]>([]);

  const [userStats, setUserStats] = useState<any>({});
  const [userForStats, setUserForStats] = useState<any>({})
  const [showStats, setShowStats] = useState(false);
  const [search, setSearch] = useState<string>('');

  const [staffStats, setStaffStats] = useState<{
    questionsRight: number,
    questionsWrong: number,
    testsPassed: number,
    testsFailed: number,
    watched: number,
    to_watch: number
  }>({
    questionsRight: 0,
    questionsWrong: 0,
    testsPassed: 0,
    testsFailed: 0,
    watched: 0,
    to_watch: 0,
  })

  useEffect(() => {
    (async () => {
      const resWithStaffStats: any = await getStaffStatistics();
      const data = await getAllUsers(setUsersSearched);
      setStaffStats(resWithStaffStats.data);
      setUsers(data);
    })();
  }, []);


  async function enableUserStats(user: User) {
    const res: any = await getUserStats(user.email);
    setUserStats(res.data);
    setUserForStats(user);
    setShowStats(true);
  };

  async function deleteAccount() {
    await deleteAnUserAccount(userForStats.email);
    const allUsersFiltered = users.filter(user => user.email !== userForStats.email);

    setUsers(allUsersFiltered);
    setUserStats({});
    setUserForStats({})
    setShowStats(false);

  };

  async function searchUser(e: any) {

    setSearch(e.target.value);

    if (e.target.value === '') setUsersSearched([...users]);
    else {
      const allUsersFiltered = users.filter(user => {
        const searchLength = search.length;
        const nameSliced = user.first_name.slice(0, searchLength + 1);
        return nameSliced === e.target.value;
      });

      setUsersSearched([...allUsersFiltered])
    }

  };

  const allUsers = usersSearched.map((user) => {
    return (
      <UserCard
        key={user.email}
        first_name={user.first_name} last_name={user.last_name}
        profile_picture={user.profile_picture} email={user.email}
        callback={() => enableUserStats(user)}
      />
    )
  });

  return (
    <Container>
      {
        showStats &&
        <UserStatsCard stats={userStats} user={userForStats} showStats={showStats}
          closeStats={() => setShowStats(false)} deleteAccount={deleteAccount}
        />
      }

      <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 10, my: 2 }}>
        <Box sx={{
          display: 'flex', flexWrap: 'wrap', flexDirection: 'column', justifyContent: 'center',
          alignItems: 'center'
        }}>
          <Typography variant='h5'>Tests</Typography>
          <SmallPieChart first_value={staffStats.testsFailed} first_text={'Failed'} second_value={staffStats.testsPassed} second_text={'Passed'} />
        </Box>
        <Box sx={{
          display: 'flex', flexWrap: 'wrap', flexDirection: 'column', justifyContent: 'center',
          alignItems: 'center'
        }}>
          <Typography variant='h5'>Questions</Typography>
          <SmallPieChart first_value={staffStats.questionsWrong} first_text={'Failed'} second_value={staffStats.questionsRight} second_text={'Passed'} />
        </Box>
        <Box sx={{
          display: 'flex', flexWrap: 'wrap', flexDirection: 'column', justifyContent: 'center',
          alignItems: 'center'
        }}>
          <Typography variant='h5'>Tutorials</Typography>
          <SmallPieChart first_value={staffStats.watched} first_text={'Not watched'} second_value={staffStats.to_watch} second_text={'Watched'} />
        </Box>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '60px' }}>
        <Typography variant="h5">Total Users: {usersSearched.length}</Typography>
        <TextField size="small" sx={{ width: '250px' }} label="Search" type="search" onChange={searchUser}
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