import React from 'react';

function Item(props) {

    if (props.armyType === "all") {
        return (
            <p data-short={props.item.short} data-header={props.item.name} onClick={props.togglePop}>{props.item.name}<br/></p>
        )
    } else if (props.item.army.includes(props.armyType) || props.item.army.includes("universal")) {
        return (
            <p data-short={props.item.short} data-header={props.item.name} onClick={props.togglePop}>{props.item.name}<br/></p>
        )
    } else {
        return false
    }
}

export default Item;