import { Box } from "@mui/material";
import { Fragment, useState } from "react";

function Test() {
  const [visible, setVisible] = useState<boolean>(false);
  return (
    <Fragment>
      <Box
        sx={{
          position:'relative'
        }}
        onPointerEnter={() => setVisible(true)}
        onPointerLeave={() => setVisible(false)}
      >
        test
        <Box
          sx={{
            position: 'absolute',
            backgroundColor:"#00000010",
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            border: '1px red dashed',
            visibility: visible ? "visible" : "hidden",
            pointerEvents: 'none'
          }}
        >
          <Box sx={{pointerEvents:'auto', position:'absolute', right:0}} onClick={()=>setVisible(false)}>
            asd
          </Box>
        </Box>
      </Box>
    </Fragment >
  );
}

export default Test;
