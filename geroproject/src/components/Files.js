import React, { Component, Fragment } from 'react';
import axios from 'axios';

import { Button, Row, Col, Form, ProgressBar } from 'react-bootstrap';

import { FaFileExcel, FaFilePdf, FaFileWord, FaFileImage, FaFileAlt, FaFilePowerpoint, FaFileArchive } from 'react-icons/fa';

class Files extends Component {
    constructor(props) {
        super(props)
        this.state = {
            file: '',
            filename: 'Choose File',
            uploadedFile: "",
            checkFiles: [],
            refresh: false,
            uploadPercentage: 0,
            deleteFiles: false
        }
    }

    componentDidMount() {
        axios.get(`https://kvhgeronimo.herokuapp.com/getFiles`)
            .then(res => {
                this.state.checkFiles.length < 1 &&
                this.setState({ checkFiles: res.data.outputArr })
            })
            .catch(err => {
                console.log(err)
            })
    }

    refreshFiles = () => {
        this.setState({ refresh: true })
        axios.get(`https://kvhgeronimo.herokuapp.com/getFiles`)
            .then(res => {
                this.state.refresh &&
                this.setState({ checkFiles: res.data.outputArr })
                this.setState({ refresh: false })
            })
            .catch(err => {
                console.log(err)
            })
    }

    handleUpload = async e => {
        e.preventDefault()
        const formData = new FormData();
        formData.append('file', this.state.file)

        try {
            const res = await axios.post('https://kvhgeronimo.herokuapp.com/fileUpload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                onUploadProgress: progressEvent => {
                    this.setState({ uploadPercentage: parseInt(Math.round((progressEvent.loaded * 100) / progressEvent.total)) });
                    this.state.uploadPercentage === 100 && setTimeout(() => this.setState({ uploadPercentage: 0 }), 4000);
                }
            });

            const { fileName } = res.data;
            this.setState({ uploadedFile: fileName })
            this.refreshFiles()
        } catch(err) {
            if(err.response.status === 500) {
                console.log('There was a problem with the server');
            } else {
                console.log(err.response.data.msg)
            }
        }
    }

    downloadFile = file => {
        axios.get(`https://kvhgeronimo.herokuapp.com/download`, {
            headers: {
                'Content-Type': 'application/json'
            },
            params: file
        })
            .then(() => {
                window.open(`https://kvhgeronimo.herokuapp.com/download?0=${file}`)
                console.log('Downloading')
                this.refreshFiles()
            })
            .catch(err => {
                if (err.response.status === 404) {
                    console.log("deleted.")
                } else {
                    console.log(err)
                }
            })
    }

    deleteFile = file => {
        axios.get(`https://kvhgeronimo.herokuapp.com/delete`, {
            headers: {
                'Content-Type': 'application/json'
            },
            params: file
        })
            .then(() => {
                console.log('Deleting')
                this.refreshFiles()
            })
            .catch(err => {
                console.log(err)
            })
    }

    showFiles = () => {
        let output = []
        let suffix = ""
        this.state.checkFiles.map((val, i) => {
            suffix = val.split('.')
            output.push(
                <Col className="pointer-on-hover" xs={6} md={3} lg={2} key={i}>
                    {this.state.deleteFiles && <Button size="sm" variant="outline-dark" onClick={() => this.deleteFile(val)} >Delete</Button>}
                    <span onClick={() => this.downloadFile(val)}>
                    {
                    // SHOW IMAGE ICON
                    ["jpg", "jpeg", "png", "bmp"].includes(suffix[suffix.length-1]) ? <FaFileImage style={{height:"100px", width:"100%", marginTop: "5px", marginBottom: "5px"}} fluid="true" /> :
                    // SHOW PDF ICON
                    ["pdf", "svg"].includes(suffix[suffix.length-1]) ? <FaFilePdf style={{height:"100px", width:"100%", marginTop: "5px", marginBottom: "5px"}} fluid="true" /> :
                    // SHOW EXCEL ICON
                    ["xls", "xlsx", "xlsb", "xlsm"].includes(suffix[suffix.length-1]) ? <FaFileExcel style={{height:"100px", width:"100%", marginTop: "5px", marginBottom: "5px"}} fluid="true" /> : 
                    // SHOW WORD ICON
                    ["doc", "docx", "docm"].includes(suffix[suffix.length-1]) ? <FaFileWord style={{height:"100px", width:"100%", marginTop: "5px", marginBottom: "5px"}} fluid="true" /> :
                    // SHOW ARCHIVE ICON
                    ["zip", "rar"].includes(suffix[suffix.length-1]) ? <FaFileArchive style={{height:"100px", width:"100%", marginTop: "5px", marginBottom: "5px"}} fluid="true" /> :
                    // SHOW POWERPOINT ICON
                    ["pptx", "pptm", "ppt"].includes(suffix[suffix.length-1]) ? <FaFilePowerpoint style={{height:"100px", width:"100%", marginTop: "5px", marginBottom: "5px"}} fluid="true" /> :
                    // SHOW ALT ICON
                    <FaFileAlt style={{height:"100px", width:"100%", marginTop: "5px", marginBottom: "5px"}} fluid="true" />
                    }
                    <p style={{textAlign:"center", overflow:"hidden", height: "40px"}}>{val}</p>
                    </span>
                </Col>
            )
        })
        return output
    }

    handleChange = (event) => {
        event.currentTarget.files[0] && this.setState({ file: event.currentTarget.files[0], fileName: event.currentTarget.files[0].name })
    }

    resetUploadedState = () => {
        this.setState({ uploadedFile: "" })
    }

    showMessage = () => {
        return (
        <Row style={{marginBottom: "15px"}}>
            <Col style={{ textAlign:"center", backgroundColor:"whitesmoke", margin: "0px 15%", maxHeight:"50px", overflow: "hidden", borderRadius: "15px"}}>
                <h5 style={{textAlign:"center"}}>Upload successful! <br/> {this.state.fileName}</h5>
                {setTimeout(() => this.resetUploadedState(), 3750)}
            </Col>
        </Row>
        )
    }

    toggleDelMode = () => {
        this.setState({ deleteFiles: !this.state.deleteFiles })
    }

    render() {
        return (
            <Fragment>
                {this.state.uploadedFile && this.showMessage()}
                <Row>
                    <Col>
                        <Form onSubmit={this.handleUpload}> 
                            <Form.File
                                onChange={this.handleChange}
                                name="uploadFile"
                                style={{float: "left", marginLeft: "10px"}}
                            />
                            <Button style={{marginLeft:"20px"}} size="sm" variant="dark" type="submit">Upload File</Button>
                        </Form>
                    </Col>
                </Row>
                <ProgressBar variant="dark" style={{margin:"5px 0px", background: "transparent"}} now={this.state.uploadPercentage} />
                <Row style={{padding:"15px"}}>
                    {this.showFiles()}
                </Row>
                <Row style={{textAlign: "center"}}>
                    <Col>
                        {this.state.deleteFiles ? <Button size='sm' variant="outline-dark" onClick={this.toggleDelMode}>Done Deleting</Button> : <Button variant="outline-dark" size='sm' onClick={this.toggleDelMode}>Delete Mode</Button>}
                    </Col>
                </Row>
            </Fragment>
        )
    }
}

export default Files;