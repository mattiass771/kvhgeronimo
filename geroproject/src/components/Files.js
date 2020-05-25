import React, { Component, Fragment } from 'react';
import axios from 'axios';

import { Button, Row, Col } from 'react-bootstrap';

class Files extends Component {
    constructor(props) {
        super(props)
        this.state = {
            file: '',
            filename: 'Choose File',
            uploadedFile: {}
        }
    }

    showUploads = () => {
        axios.get()
    }

    handleUpload = async e => {
        e.preventDefault()
        const formData = new FormData();
        formData.append('file', this.state.file)

        try {
            const res = await axios.post('http://localhost:5000/fileUpload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            const { fileName, filePath } = res.data;
            this.setState({ uploadedFile: {fileName, filePath} })
        } catch(err) {
            if(err.response.status === 500) {
                console.log('There was a problem with the server');
            } else {
                console.log(err.response.data.msg)
            }
        }
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
                <form onSubmit={this.handleUpload}> 
                    <input
                        type="file"
                        onChange={this.handleChange}
                        name="uploadFile"
                        placeholder={this.state.filename}
                    />
                    <Button type="submit">Upload File</Button>
                </form>
            </Fragment>
        )
    }
}

export default Files;