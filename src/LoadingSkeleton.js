import React from "react";
import { Grid, Skeleton, Box } from "@mui/material";

const LoadingSkeleton = () => (
  <Grid container spacing={3}>
    {Array.from(new Array(6)).map((_, index) => (
      <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Skeleton variant="circle" width={40} height={40} />
          <Skeleton variant="text" width="60%" />
          <Skeleton variant="rectangular" height={200} animation="wave" />
          <Skeleton variant="text" width="80%" />
          <Skeleton variant="text" width="40%" />
        </Box>
      </Grid>
    ))}
  </Grid>
);

export default LoadingSkeleton;
