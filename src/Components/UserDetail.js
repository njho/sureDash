import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {Radio, Form, Grid, Header, Input, Button, Icon, Container} from 'semantic-ui-react'
import {Link} from 'react-router-dom'

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});


class Home extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Container style={{paddingTop: '4em'}}>
                <Grid style={{height: '100%', marginTop: '30px'}} verticalAlign='bottom'>
                    <Grid.Column style={{maxWidth: 450}}>
                        <Header as='h1' color='teal' textAlign='left'>
                            Driver 1
                        </Header>
                        <Form size='large'>


                            <Form.Field>
                                <label>First Name</label>
                                <Input
                                    action={{color: 'teal', labelPosition: 'left', content: 'Name'}}
                                    actionPosition='right'
                                    placeholder='User 1 '
                                >
                                    <input />
                                    <Button  color='teal' size={'tiny'} type='submit'>Submit</Button>
                                </Input>
                            </Form.Field>
                            <Form.Field>
                                <label>Last Name</label>
                                <Input
                                    action={{color: 'teal', labelPosition: 'left', content: 'Name'}}
                                    actionPosition='right'
                                    placeholder='User 1 '
                                >
                                    <input />
                                    <Button  color='teal' size={'tiny'} type='submit'>Submit</Button>
                                </Input>
                            </Form.Field>
                            <Form.Field>
                                <label>Email</label>
                                <Input
                                    action={{color: 'teal', labelPosition: 'left', content: 'Name'}}
                                    actionPosition='right'
                                    placeholder='User 1 '
                                >
                                    <input />
                                    <Button  color='teal' size={'tiny'} type='submit'>Submit</Button>
                                </Input>
                            </Form.Field>
                            <Form.Field>
                                <label>Phone Number</label>
                                <Input
                                    action={{color: 'teal', labelPosition: 'left', content: 'Name'}}
                                    actionPosition='right'
                                    placeholder='User 1 '
                                    type={'number'}
                                >
                                    <input />
                                    <Button  color='teal' size={'tiny'} type='submit'>Submit</Button>
                                </Input>
                            </Form.Field>

                        </Form>

                    </Grid.Column>
                </Grid>
            </Container>
        )
    }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));

