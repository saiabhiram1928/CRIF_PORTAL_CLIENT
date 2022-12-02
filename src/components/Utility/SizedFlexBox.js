import React from 'react';

const SizedFlexBox = (props) => {
    return <div style={{height:props.height, width:props.width, display:"flex", justifyContent:props.justifyContent, alignContent:props.alignContent}}>{props.children}</div>
}

export default SizedFlexBox;