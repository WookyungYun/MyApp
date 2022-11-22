import { Box, Card, CardContent, Chip, Grid, Typography } from '@mui/material';
import Image from 'next/image';
import React from 'react';
import { useRecoilValue } from 'recoil';
import { analyzeState } from '../../state/Analyze';

export default function AppInfo() {
  const analyzeResult = useRecoilValue(analyzeState);
  console.log(analyzeResult);
  return (
    <>
      <Card sx={{ mb: 5 }}>
        <CardContent>
          {/* AppInfo */}
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
                  <Typography fontWeight="900">
                    이름: {analyzeResult.result.title}
                  </Typography>
                </Grid>
                <Grid item xs={20}>
                  <Typography fontWeight="900">
                    카테고리:{' '}
                    {analyzeResult.result.genres.map((item) => (
                      <Chip
                        label={item}
                        key={item}
                        sx={{ mr: 2 }}
                        variant="outlined"
                        color="primary"
                      ></Chip>
                    ))}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography fontWeight="900">
                    가격:{' '}
                    {analyzeResult.result.price > 0 ? (
                      <Chip
                        label={`${analyzeResult.result.price}원`}
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
                  </Typography>
                </Grid>
              </Grid>
            </Box>

            <Image
              src={analyzeResult.result.icon}
              alt="image"
              width={150}
              height={150}
            />
          </Box>
        </CardContent>
      </Card>
    </>
  );
}
