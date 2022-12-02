import React from "react";
import gstyles from "../../../styles/Global.module.css";
import { useAuth } from "../../../components/Authenticate/AuthContext";

import MainContent from "../../../components/Wrapper/MainContent/MainContent";
import TextBanner from "../../../components/UIElements/TextBanner/TextBanner";
import GridTemplate from "../../../components/Grid/GridTemplate/GridTemplate";
import MarginBox from "../../../components/Utility/MarginBox";
import GridCard from "../../../components/Grid/GridCard/GridCard";
import ColorPalette from "../../../styles/ColorPalette";
import LinePlotCompare from "../../../components/Plots/LinePlot/LinePlotCompare";
import LegendHorizontal from "../../../components/Plots/LegendHorizontal/LegendHorizontal";
import SizedFlexBox from "../../../components/Utility/SizedFlexBox";
import PolarPlotWLegend from "../../../components/Templates/PolarPlotWLegend";
import DoughnutPlotWLegend from "../../../components/Templates/DoughnutPlotWLegend";
import StatWLineChartNG from "../../../components/Templates/StatWLineChartNG";

const Dashboard = () => {
  const { userDetails } = useAuth();
  return (
    <MainContent>
      <TextBanner height="8vw" bgColor={ColorPalette.violet.light}>
        <p className={gstyles["banner-main-text-dark"]}>
          Hello, {userDetails.first_name} !
        </p>
        <MarginBox margin="0.3vw" />
        <p className={gstyles["banner-sub-text-dark"]}>
          Your Access Level: CRIF Admin
        </p>
      </TextBanner>
      <GridTemplate
        rows="repeat(17, 1fr)"
        cols="repeat(12, 1fr)"
        width="75vw"
        height="55vw"
      >
        <GridCard rowStart={1} rowEnd={6} colStart={1} colEnd={5}>
          <PolarPlotWLegend
            title="Application Progress Tracker"
            labels={[
              "Faculty Review",
              "FIC Review",
              "Admin Review",
              "In Progress",
            ]}
            data={[4, 6, 4, 8]}
            textColor="rgba(0,0,0,0.9)"
          />
        </GridCard>

        <GridCard rowStart={1} rowEnd={6} colStart={5} colEnd={9}>
          <DoughnutPlotWLegend
            title="Top Used Instruments"
            labels={["ESR", "LCHRMS", "NMR", "UTM", "CDORD"]}
            data={[20, 16, 12, 8, 4]}
            textColor="rgba(0,0,0,0.9)"
          />
        </GridCard>

        <GridCard rowStart={1} rowEnd={6} colStart={9} colEnd={13}>
          <PolarPlotWLegend
            title="Completion Time Tracker"
            labels={["2-3 Days", "3-5 Days", "5-7 Days", "> 7 Days"]}
            data={[4, 12, 6, 8]}
            textColor="rgba(0,0,0,0.9)"
          />
        </GridCard>

        <GridCard
          rowStart={6}
          rowEnd={13}
          colStart={1}
          colEnd={13}
          bgColor={ColorPalette.violet.light}
        >
          <SizedFlexBox
            height="18%"
            width="100%"
            justifyContent="space-between"
            alignContent="center"
          >
            <p className={gstyles["grid-card-plot-dark-title"]}>
              Annual Revenue Data
            </p>
            <LegendHorizontal
              legendItems={[
                ["Earnings", ColorPalette.blue.primary],
                //["Expenditure", ColorPalette.purple.primary],
              ]}
              key="1"
              textColor="rgba(255,255,255,0.9)"
            />
          </SizedFlexBox>
          <LinePlotCompare
            labels={[
              "",
              "M1",
              "M2",
              "M3",
              "M4",
              "M5",
              "M6",
              "M7",
              "M8",
              "M9",
              "M10",
              "M11",
              "M12",
              "",
            ]}
            label1="Earnings"
            //label2="Expenditure"
            data1={[0, 15000, 28000, 36000, 2000, 0, 0, 0, 0, 0, 0, 0, 0, 0]}
            //data2={[20, 26, 20, 26, 18, 22, 20, 26, 18, 22, 20, 26, 18, 22]}
            fill1={true}
            //fill2={true}
            bgColor1={ColorPalette.blue.transparent}
            brdColor1={ColorPalette.blue.primary}
            //bgColor2={ColorPalette.purple.transparent}
            //brdColor2={ColorPalette.purple.primary}
            width="102%"
            height="83%"
          />
        </GridCard>

        <GridCard rowStart={13} rowEnd={17} colStart={1} colEnd={5}>
          <StatWLineChartNG
            value="INR 81000"
            name="ANNUAL REVENUE GENERATED"
            hasIncreased={true}
            change="6"
            labels={["Q1", "Q2", "Q3", "Q4"]}
            data={[79000, 24000, 36840, 45000]}
            fill={true}
            bgColor={ColorPalette.green.transparent}
            brdColor={ColorPalette.green.primary}
          />
        </GridCard>

        <GridCard rowStart={13} rowEnd={17} colStart={5} colEnd={9}>
          <StatWLineChartNG
            value="INR 2000"
            name="MONTHLY REVENUE GENERATED"
            hasIncreased={false}
            change="3950"
            labels={["W1", "W2", "W3", "W4"]}
            data={[6480, 5470, 2500, 8000]}
            fill={true}
            bgColor={ColorPalette.blue.transparent}
            brdColor={ColorPalette.blue.primary}
          />
        </GridCard>

        <GridCard rowStart={13} rowEnd={17} colStart={9} colEnd={13}>
          <StatWLineChartNG
            value="16 Samples"
            name="ANNUAL RESEARCH SAMPLES"
            hasIncreased={true}
            change="6"
            labels={["Q1", "Q2", "Q3", "Q4"]}
            data={[21, 55, 36, 39]}
            fill={true}
            bgColor={ColorPalette.yellow.transparent}
            brdColor={ColorPalette.yellow.primary}
          />
        </GridCard>
      </GridTemplate>
    </MainContent>
  );
};

export default Dashboard;
