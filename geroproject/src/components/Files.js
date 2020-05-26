import React, { Component, Fragment } from 'react';
import axios from 'axios';

import { Button, Row, Col, Image } from 'react-bootstrap';

class Files extends Component {
    constructor(props) {
        super(props)
        this.state = {
            file: '',
            filename: 'Choose File',
            uploadedFile: {},
            checkFiles: [],
            refresh: false
        }
    }

    componentDidMount() {
        axios.get(`https://kvhgeronimo.herokuapp.com/getFiles`)
            .then(res => {
                this.state.checkFiles.length < 1 &&
                this.setState({ checkFiles: res.data.outputArr })
            })
            .then(err => {
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
            .then(err => {
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
                }
            });

            const { fileName, filePath } = res.data;
            this.setState({ uploadedFile: {fileName, filePath} })
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
        console.log("download: ", file)
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
            .then(err => {
                console.log(err)
            })
    }

    deleteFile = file => {
        console.log("delete: ", file)
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
            .then(err => {
                console.log(err)
            })
    }

    showFiles = () => {
        let output = []
        this.state.checkFiles.map((val, i) => {
            output.push(
                <Col className="pointer-on-hover" md={3} key={i}>
                    <span onClick={() => this.downloadFile(val)}>
                    <Image 
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQnMrUHMq61az8YEm6kg8XHJoOSvAuJWA0j1r0TdUQ-A__FJ3oj&usqp=CAU" 
                        fluid
                    />
                    <p>{val}</p>
                    </span>
                    <Button onClick={() => this.deleteFile(val)} ></Button>
                </Col>
            )
        })
        return output
    }

    handleChange = (event) => {
        this.setState({ file: event.target.files[0], filename: event.target.files[0].name })
    }

    render() {
        return (
            <Fragment>
                {this.state.uploadedFile.fileName && 
                <Row>
                    <Col>
                        <h5 style={{textAlign:"center"}}>Upload successful - {this.state.uploadedFile.fileName}</h5>
                    </Col>
                </Row>}
                <Row>
                    <form onSubmit={this.handleUpload}> 
                        <input
                            type="file"
                            onChange={this.handleChange}
                            name="uploadFile"
                            placeholder={this.state.filename}
                        />
                        <Button type="submit">Upload File</Button>
                    </form>
                </Row>
                <Row style={{padding:"15px"}}>
                    {this.showFiles()}
                </Row>
            </Fragment>
        )
    }
}

export default Files;