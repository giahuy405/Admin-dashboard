import React from "react";
import { Box, Card, CircularProgress, Skeleton } from "@mui/material";
import Header from "components/Header";
import { ResponsiveChoropleth } from "@nivo/geo";
import { geoData } from "state/geoData";
import { useGetGeographyQuery } from "state/api";
import { useTheme } from "@emotion/react";


const Geography = () => {
  // https://nivo.rocks/choropleth/  -> docs
  const theme = useTheme();
  const { data } = useGetGeographyQuery();
  console.log(data, "geo ");
  return (
    <Box m="1.5rem 2.5rem">
      <Header title="GEOGRAPHY" content="All location of your users" />
      <Box
        mt="20px"
        mb="30px"
        height="70vh"
        border={`1px solid ${theme.palette.secondary[200]}`}
        borderRadius="4px"
      >
        {data ? (
          <ResponsiveChoropleth
            data={data}
            theme={{
              axis: {
                domain: {
                  line: {
                    stroke: theme.palette.secondary[300],
                  },
                },
                legend: {
                  text: {
                    fill: theme.palette.secondary[300],
                  },
                },
                ticks: {
                  line: {
                    stroke: theme.palette.secondary[300],
                    strokeWidth: 1,
                  },
                  text: {
                    fill: theme.palette.secondary[300],
                  },
                },
              },
              legends: {
                text: {
                  fill: theme.palette.secondary[300],
                },
              },
              tooltip: {
                container: {
                  color: theme.palette.primary[300],
                },
              },
            }}
            // phải thêm thằng này vào để biết features
            features={geoData.features}
            margin={{ top: 0, right: 0, bottom: 0, left: -50 }}
            domain={[0, 60]}
            unknownColor="#666666"
            label="properties.name"
            valueFormat=".2s"
            projectionScale={150}
            projectionTranslation={[0.45, 0.6]}
            projectionRotation={[0, 0, 0]}
            borderWidth={1.3}
            borderColor="black"
            legends={[
              {
                anchor: "bottom-right",
                direction: "column",
                justify: true,
                translateX: 0,
                translateY: -125,
                itemsSpacing: 0,
                itemWidth: 94,
                itemHeight: 18,
                itemDirection: "left-to-right",
                itemTextColor: theme.palette.secondary[200],  // màu chữ cột
                itemOpacity: 0.85,
                symbolSize: 18,
                effects: [
                  {
                    on: "hover",
                    style: {
                      itemTextColor: theme.palette.primary[200],// màu chữ cột khi hover
                      itemOpacity: 1,
                    },
                  },
                ],
              },
            ]}
          />
        ) : (
          <Box sx={{justifyContent:'center',display:'flex',alignItems:'center',width:'100%',height:'100%'}}>
           <CircularProgress />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Geography;
