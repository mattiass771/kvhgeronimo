import React from 'react';

import { Col, Button } from 'react-bootstrap';
import { FaCheck } from 'react-icons/fa';


function GetSoldier(props) {

    let colStyle = {maxHeight:"750px", overflowY:"auto", margin: "10px 0px", backgroundColor: "#f1f1f1", borderRadius:"15px"}
    if (props.obj.length > 8) colStyle = {maxHeight:"500px", overflowY:"auto", margin: "10px 0px", backgroundColor: "#f1f1f1", borderRadius:"15px"} 

    const onUpdate = () => {
        return (
        props.obj.map((el, j) => {
            let tempVal = "undefined"
            let tempName = "undefined"
            return (
                el.constructor === Array &&
                <Col className="block-background" md={6} lg={3} style={colStyle} key={j}>
                    {el.map((val, i) => {
                        if (val.army[0].includes(props.armyType, "universal") || props.armyType === "all") {
                            return (
                                tempName !== val.sold ?
                                (tempName = val.sold,
                                tempVal = val.type,
                                <span key={i}> 
                                    <h2>{val.sold}
                                        <Button size="sm" variant="light" style={{margin:"0px 0px 30px 3px", padding:"0px 5px"}} data-pass={val.soldShort} onClick={props.updateSoldier}>X</Button>
                                    </h2>              
                                    <h3>{val.type}</h3>
                                    <p className="para" data-header={val.name} data-short={val.short} onClick={props.togglePop}>{val.name}</p> 
                                    {val.val && <FaCheck className="float-right btn-check" />}
                                    <br />
                                </span>) :
                                tempVal !== val.type ? 
                                (tempVal = val.type,
                                <span key={i}>                   
                                    <h3>{val.type}</h3>
                                    <p className="para" data-header={val.name} data-short={val.short} onClick={props.togglePop}>{val.name}</p> 
                                    {val.val && <FaCheck className="float-right btn-check" />}
                                    <br />
                                </span>) :
                                <span key={i}>
                                    <p className="para" data-header={val.name} data-short={val.short} onClick={props.togglePop}>{val.name}</p>
                                    {val.val && <FaCheck className="float-right btn-check" />}
                                    <br />
                                </span>
                            )
                        } 
                    return true
                }) }
                </Col>
            )
        })
    )}

    return (
        onUpdate()
)}

export default GetSoldier;