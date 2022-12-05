import { Box, Card, CardContent, Chip, Grid, Skeleton } from '@mui/material';
import Image from 'next/image';
import React from 'react';
import { useSelector } from 'react-redux';

export default function AppInfo() {
  const analyzeResult = useSelector((state) => state.appInfo.info);
  return (
    <>
      {analyzeResult.length !== 0 && (
        <Card sx={{ mb: 5 }}>
          <CardContent>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                mt: 5,
                mr: 5,
                mb: 5,
              }}
            >
              <Box sx={{ pt: 1.5, mt: 1 }}>
                <Grid container rowSpacing={6} columnSpacing={1}>
                  <Grid item xs={8}>
                    <Box sx={{ fontWeight: 900 }}>
                      이름: {analyzeResult.title}
                    </Box>
                  </Grid>
                  <Grid item xs={20}>
                    <Box sx={{ fontWeight: 900 }}>
                      카테고리:{' '}
                      {analyzeResult.genres.map((item) => (
                        <Chip
                          label={item}
                          key={item}
                          sx={{ mr: 2 }}
                          variant="outlined"
                          color="primary"
                        ></Chip>
                      ))}
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box sx={{ fontWeight: 900 }}>
                      가격:{' '}
                      {analyzeResult.price > 0 ? (
                        <Chip
                          label={`${analyzeResult.price}원`}
                          variant="filled"
                          color="primary"
                        />
                      ) : (
                        <Chip
                          label="무료"
                          variant="outlined"
                          color="primary"
                        ></Chip>
                      )}
                    </Box>
                  </Grid>
                </Grid>
              </Box>
              <Image
                src={analyzeResult.icon}
                alt="image"
                width={150}
                height={150}
              />
            </Box>
          </CardContent>
        </Card>
      )}
    </>
  );
}
