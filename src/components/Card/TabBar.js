import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Button, Tab, Tabs, Typography } from '@mui/material';
import { Box } from '@mui/system';
import Image from 'next/image';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { analyzeState } from '../../state/Analyze';
import AppInfo from './AppInfo';
import AppReview from './AppReview';
import SimilarApp from './SimilarApp';

export default function TabBar() {
  const [value, setValue] = useState('1');
  const analyzeResult = useRecoilValue(analyzeState);

  const handleChange = (e, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <Box sx={{ width: '100%', typography: 'body1' }}>
        {/* <Box display="flex" justifyContent="center" marginBottom="40px">
          <Image
            src={analyzeResult.result.icon}
            alt="image"
            width={150}
            height={150}
          />
        </Box> */}
        <TabContext value={value}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab
              label="App Review"
              value="1"
              sx={{ width: 260, fontSize: 20, fontWeight: 900 }}
            />
            <Tab
              label="Competitor"
              value="2"
              sx={{ width: 260, fontSize: 20, fontWeight: 900 }}
            />
            <Tab
              label="App Info "
              value="3"
              sx={{ width: 260, fontSize: 20, fontWeight: 900 }}
            />
          </TabList>
          <TabPanel value="1">
            <AppReview />
          </TabPanel>
          <TabPanel value="2"></TabPanel>
          <TabPanel value="3">
            <AppInfo />
            <SimilarApp />
          </TabPanel>
        </TabContext>
      </Box>
    </>
  );
}
