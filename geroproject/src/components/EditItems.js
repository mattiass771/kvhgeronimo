import React, { useState } from 'react';
import axios from 'axios';

import { Container, Row } from 'react-bootstrap';
import { FaRegCheckCircle, FaRegCircle } from 'react-icons/fa';

function EditItems(props) {
    const [army, setArmy] = useState("all")
    let equipment = props.equip
    let soldier = props.soldier

    const updateItem = (short) => {
        axios.get(`https://kvhgeronimo.herokuapp.com/soldier/${localStorage.getItem("id")}`)
                .then(response => {
                    let obj = response.data.equip
                    for (let key in obj) {
                        if (key === short) {
                            obj[key] = !obj[key]
                            let equip = obj
                            axios.post(`https://kvhgeronimo.herokuapp.com/soldier/update/${localStorage.getItem("id")}`, {equip})
                                .then(res => {
                                    console.log(res.data)
                                    props.refresh()
                                })
                                .catch(err => {
                                    console.log(err)
                                })
                        }
                    }
                })
                .catch(error => {
                    console.log(error)
                }); 
    }

    const arr = equipment.map(eq => {
        for (let key in soldier) {
            if(key === eq.short) {
                return [ eq.type, eq.name, eq.short, props.soldier[key], eq.army ]
            }
        }
        return true
    })

    let onShow = []
    let final = []

    const handleChange = (event) => {
        const {value} = event.target
        setArmy(value)
    }

    // arr structure: [0: type, 1: nameFull, 2: short, 3: boolean, 4: army]

    const showItems = () => {
        let types = []
        for (let el of arr) {
            if (!types.includes(el[0])) types.push(el[0])
        }
        if (army.includes("class")) {
            types.splice(types.indexOf("CampEquip"),1)
            types.splice(types.indexOf("ArmsEquip"),1)
        } else if (!army.includes("all")) {
            types.splice(types.indexOf("CampEquip"),1)
        }
        for (let typ of types) {
            onShow.push(typ)
                for (let elem of arr) {
                    // console.log(elem, arr)
                    if (elem[4] !== undefined && elem[0] === typ && (elem[4].includes(army, "universal") || army === "all")) {
                        onShow.push(
                            <span key={elem[2]}>
                                <p lg={8} className="para" data-header={elem[1]} data-short={elem[2]} onClick={props.togglePop}>
                                    {elem[1]}
                                </p>
                                {elem[3] ? 
                                <FaRegCheckCircle className="btn-smaller" onClick={() => updateItem(elem[2])} />
                                :
                                <FaRegCircle className="btn-smaller" onClick={() => updateItem(elem[2])} />
                                }
                            <br />
                            </span>
                        )
                    }
            }
            typ &&
            final.push(
                <span key={typ}>
                    <h3>{onShow.splice(0,1)}</h3>
                    <Container>
                        <Row xl={4} md={3} sm={2} xs={1}>
                            {onShow}
                        </Row>
                    </Container>
                </span>
            )
            onShow = []
        }
        return final
    }

    return (
        <Container>
            <form>    
                <select 
                    value={army}
                    onChange={handleChange}
                    name="army"
                >
                    <option value="all">Complete</option>
                    <option value="509">509th</option>
                    <option value="101">101st</option>
                    <option value="armored">Armored</option>
                    <option value="aclass">A-Class</option>
                    <option value="bclass">B-Class</option>
                    <option value="cclass">C-Class</option>
                </select>
            </form>
            <br />
            {showItems()}
        </Container>
    )
}

export default EditItems;