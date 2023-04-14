import React from "react";
import styled from "styled-components";
import colors from "../../../styles/colors";
import { uniqueId } from "lodash";
import { SvgIconComponent } from "@mui/icons-material";

interface ShowTrailProps {
    trails: SvgIconComponent[];
    style?: React.CSSProperties;
    trail: number;
    handleSetTrailNumber: (number: number) => void;
}

export default function ShowTrail({trails, style, trail, handleSetTrailNumber}: ShowTrailProps) {
    return (
        <ShowTrailContainer style={style}>
            {trails.map((Icon, index) =>
                <div key={"trail-item-" + uniqueId()}>
                    <ShowTrailItem values={{index, trail}} onClick={() =>
                        handleSetTrailNumber(index)
                    }>
                        <Icon sx={{
                            fontSize: 15,
                            color: colors.white,
                        }}/>
                    </ShowTrailItem>
                    {!(index === trails.length - 1) && <InterLineDivision key={"trail-line-" + index}/>}
                </div>
            )}
        </ShowTrailContainer>
    );
}

const getColorBg = ({index, trail}: any) => {
    if (index === trail) {
        return colors.primary;
    }

    if (index < trail) {
        return "green";
    }

    return 'rgba(0, 0, 0, 0.1)';
}

const ShowTrailContainer = styled.div`
  position: relative;
  width: 100%;
  height: 65px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0px 10px;
`;
const ShowTrailItem = styled.div<any>`
  position: relative;
  min-width: 30px;
  min-height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({values}) => getColorBg(values)};
  border-radius: 50%;
  cursor: pointer;
`;

const InterLineDivision = styled.div`
  position: relative;
  height: 1px;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.1);
`;
